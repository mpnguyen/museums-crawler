import kue from 'kue'
import redis from 'redis'
import { get } from 'lodash'
import fs from 'fs'

import configs from '../configs'
import bots from './bots'
import {
  BOT_JOB_CRAWLERS,
  MAX_CRAWLER_PROCESS,
} from '../utils/constants'


// instantiate a client
const redisClient = redis.createClient()

const queue = kue.createQueue({
  prefix: process.env.KUE_PREFIX || `QS${configs.PORT || 0}`,
  createClientFactory: () => redisClient,
})
queue.setMaxListeners(300)

if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', _exit)
  // re-queue all stuck job (active job)
  queue.active(function (err, ids) {
    ids.forEach(function (id) {
      kue.Job.get(id, function (err, job) {
        if (job.type === BOT_JOB_CRAWLERS) {
          job.inactive() // re-queue
        }
      })
    })
  })
} else {
  // kue store job in redis db
  // remove all keys in previous run, make sure no job will be execute each time server restart
  // in prod, keep all job when app restart
  // Object.keys(bots).map(id => {

  // })
  redisClient.flushdb((err, succeeded) => {
    console.log('Redis remove all keys: ' + succeeded) // eslint-disable-line
  })
}

function _exit() {
  // Reset all: stop queue, reset bot status  --> user must start bot manually
  queue.shutdown(0, function (err) {
    console.log(err) // eslint-disable-line
    process.exit()
  })
}

queue.process(BOT_JOB_CRAWLERS, MAX_CRAWLER_PROCESS, async (job, done) => {
  const { name } = job.data
  const bot = get(bots, [name, 'bot'])
  if (!bot) return done()

  const articles = await bot.crawlHomePage()
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]

    if (article.url && article.url[0] !== '#') {
      try {
        const { thumb } = await bot.crawlArticle('https://wikipedia.org' + article.url)
        if (thumb) {
          articles[i].thumb = thumb
          console.log(thumb) // eslint-disable-line
        }
      } catch (error) {
        // console.log(error) // eslint-disable-line
      }
    }
  }

  fs.writeFile(name + '.json', JSON.stringify(articles), 'utf8', () => {
    console.log('Done') // eslint-disable-line
  })

  done()
})

export default queue

