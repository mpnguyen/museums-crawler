import Bot from './botCore'

const NAME = 'philippinesBot'
const HOST = 'https://en.wikipedia.org/wiki/List_of_museums_in_the_Philippines'

export default class philippinesBot extends Bot {
  constructor() {
    super(NAME, HOST)
  }

  _getHomePageArticles($) {
    const articles = []
    // listing
    $('tr').each((_, el) => {
      const title = $(el).children('td').first().text().trim()
      let thumb = ''
      $(el).children('td').each((index, subEl) => {
        if (index === 1) {
          thumb = $(subEl).children('a').children('img').first().attr('src')
        }

      })

      articles.push({
        url: $(el).children('').attr('href'),
        title,
        thumb,
      })
    })

    return Promise.resolve(articles)
  }

  _getArticleData($) {
    const thumb = $('img').first().attr('src')
    return Promise.resolve({ thumb })
  }
}