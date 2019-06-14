import Bot from './botCore'

const NAME = 'singoporeBot'
const HOST = 'https://en.wikipedia.org/wiki/List_of_museums_in_Singapore'

export default class singoporeBot extends Bot {
  constructor() {
    super(NAME, HOST)
  }

  _getHomePageArticles($) {
    const articles = []
    // listing
    $('li').each((_, el) => {
      const title = $(el).text().trim()
      articles.push({
        url: $(el).children('a').attr('href'),
        title,
      })
    })

    return Promise.resolve(articles)
  }

  _getArticleData($) {
    const thumb = $('img').first().attr('src')
    return Promise.resolve({ thumb })
  }
}