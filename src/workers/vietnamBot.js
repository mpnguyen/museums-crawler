import Bot from './botCore'

const NAME = 'vietnamBot'
const HOST = 'https://en.wikipedia.org/wiki/List_of_museums_in_Vietnam'

export default class vietnamBot extends Bot {
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