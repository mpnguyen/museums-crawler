import indonesiaBot from './indonesiaBot'
import philippinesBot from './philippinesBot'
import vietnamBot from './vietnamBot'

// inst
const bot = new vietnamBot()

export default {
  indonesiaBot: {
    name: 'indonesiaBot',
    bot: new indonesiaBot(),
  },
  philippinesBot: {
    name: 'philippinesBot',
    bot: new philippinesBot(),
  },
  vietnamBot: {
    name: 'vietnamBot',
    bot,
  },
}

setTimeout(() => bot.start(), 3000)

