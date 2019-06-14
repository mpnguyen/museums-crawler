import Bot from './botCore'

const NAME = 'bangkokBot'
const HOST = 'https://en.wikipedia.org/wiki/List_of_museums_and_art_galleries_in_Bangkok'

export default class bangkokBot extends Bot {
  constructor() {
    super(NAME, HOST)
  }

  _getHomePageArticles($) {
    const articles = []
    // listing
    $('tr').each((_, el) => {
      const title = $(el).children('td').first().text().trim()

      articles.push({
        url: $(el).children('td').first().children('a').attr('href'),
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