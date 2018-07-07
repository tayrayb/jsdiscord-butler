// Imports
const conf = require('./conf.js')
const Giphy = require('giphy-api')(conf.giphyAPI)
const Discord = require('discord.js')
const ytdl = require('ytdl-core')
// Prefix
var prefix = conf.prefix
const talkedRecently = new Set()
// Discord Constants
const bot = new Discord.Client()
const token = conf.discordAPI

// Command Ready
bot.on('ready', () => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity('Being Built')
})
// Start of Bot
bot.on('message', message => {
  // Timeout check
  if (talkedRecently.has(message.author.id)) { return }
  // Add user to timeout
  talkedRecently.add(message.author.id)
  setTimeout(() => {
    talkedRecently.delete(message.author.id)
  }, 2500)
  // Prevent bot from talking to itself
  if (message.author.bot) return
  if (message.channel.type === 'dm') return
  // Set cmd and arrays
  let messageArray = message.content.split(' ')
  let cmd = messageArray[0]
  let args = messageArray.slice(1)
  let dUser = message.mentions.users.first()
  // Ping pong!
  if (cmd === `${prefix}ping`) {
    message.channel.send('pong')
    return
  }
  // Youtube music
  if (cmd === `${prefix}yt`) {
    if (ytdl.validateURL(args[0])) {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            message.channel.send('Successfully joined voice channel and will now play')
            connection.playStream(ytdl(args[0]))
          }).catch(console.log)
      } else {
        message.channel.send('You need to join an channel first!')
      }
    }
    if (!args[0]) {
      message.channel.send('Please provide a Youtube link')
      return
    }
    if (args[0] === 'stop') {
      if (message.guild.voiceConnection) {
        message.member.voiceChannel.leave()
        message.channel.send('Leaving voice channel')
      } else {
        message.channel.send('I have already left')
      }
    }
  }
  // Avatar commands
  if (cmd === `${prefix}avatar`) {
    if (args[0]) {
      message.channel.send(dUser.avatarURL)
    } else {
      message.channel.send(message.author.avatarURL)
    }
  }
  // Gif Commands
  if (cmd === `${prefix}gif`) {
    if (args[0] === 'random') {
      Giphy.random({
        rating: 'g',
        fmt: 'json'
      }, function (err, res) {
        message.channel.send(res.data.url)
        console.log(res.data.url)
        if (err) console.log(err)
      })
    } else if (args[0] === 'search') {
      Giphy.random({
        tag: args[1],
        rating: 'g',
        fmt: 'json'
      }, function (err, res) {
        message.channel.send(res.data.url)
        console.log(res.data.url)
        if (err) console.log(err)
      })
    }
  }
})
// Bot Login
bot.login(token)
