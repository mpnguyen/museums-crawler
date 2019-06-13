import indonesiaBot from './indonesiaBot'

// inst
const bot = new indonesiaBot()

export default {
  indonesiaBot: {
    name: 'indonesiaBot',
    bot,
  },
}

setTimeout(() => bot.start(), 3000)

