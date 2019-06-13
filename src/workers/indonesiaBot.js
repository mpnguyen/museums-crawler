import Bot from './botCore'

const NAME = 'indonesiaBot'
const HOST = 'https://en.wikipedia.org/wiki/List_of_museums_and_cultural_institutions_in_Indonesia'

export default class indonesiaBot extends Bot {
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
    const thumb = $('img').first().attr('scr')
    console.log(thumb)
    return Promise.resolve({ thumb })
  }
}