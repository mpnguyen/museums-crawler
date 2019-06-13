import cheerio from 'cheerio'
import request from 'request-promise-native'
import crawlQueue from './crawlQueue'

import { BOT_JOB_CRAWLERS } from '../utils/constants'

export default class Bot {

  constructor(name, host) {
    this.name = name
    this.host = host // match to host field in CrawlerBot collection

    console.log(`Create Bot ${name}`) // eslint-disable-line
  }

  createCrawlerJob() { // each job only run one crawler
    crawlQueue.create(BOT_JOB_CRAWLERS, {
      name: this.name,
    }).removeOnComplete(true).save()
  }

  toggle() {
    this.isRunning = !this.isRunning
    if (this.isRunning) {
      this.createCrawlerJob()
      this.interval = setInterval(() => {
        this.createCrawlerJob()
      }, 2 * 60 * 60 * 1000) // 2 hours
    } else {
      clearInterval(this.interval)
    }
  }

  start() {
    // if (this.isRunning) {
    //   console.log(`Bot ${this.name} is running`) // eslint-disable-line
    // } else {
    //   this.isRunning = true
    //   this.createCrawlerJob()
    //   this.interval = setInterval(() => {
    //     this.createCrawlerJob()
    //   }, 2 * 60 * 60 * 1000) // 2 hours
    // }
    this.createCrawlerJob()
  }

  stop() {
    this.isRunning = false
    clearInterval(this.interval)
  }

  crawlHomePage() {
    const opts = {
      uri: this.host,
      transform: body => cheerio.load(body),
    }

    return request(opts).then(this._getHomePageArticles).catch(err => {
      return Promise.reject(err)
    })
  }

  crawlArticle(uri) {
    console.log(uri)
    const opts = {
      uri,
      transform: body => cheerio.load(body),
    }

    return request(opts).then(this._getArticleData).catch(err => {
      return Promise.reject(err)
    })
  }
}