// Imports
const conf = require('./conf.js');
const Giphy = require('giphy-api')(conf.giphyAPI);
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
// Prefix
const prefix = conf.prefix;
const talkedRecently = new Set();
// Discord Constants
const bot = new Discord.Client();
const token = conf.discordAPI;

// Command Ready
bot.on('ready', () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} server/s!`);
  bot.user.setActivity('Being Built');
});
// Start of Bot
bot.on('message', message => {
  // Prevent Bot spam from one user
  if (talkedRecently.has(message.author.id)) { return; }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  // Arrays!
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  // Botception Prevention
  if (message.author.bot) return;
  // NO DM'S! (For now)
  if (message.channel.type === 'dm') {
    if (cmd === `${prefix}help`) {
      let sicon = bot.user.avatarURL;
      let serverembed = new Discord.RichEmbed()
        .setDescription('Bot Help')
        .setThumbnail(sicon)
        .addField('!serverinfo:', 'Display server info')
        .addField('!yt:', 'Play Youtube Music in the voice channel. eg. !yt youtubelink')
        .addField('!gif:', 'Search for a gif. No arguments will search for a random gif. (Only one tag works for now)');
      return message.channel.send(serverembed);
    }
  }
  // Guild Info
  if (message.guild.available) {
    if (cmd === `${prefix}serverinfo`) {
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
        .setDescription('Server Information')
        .setThumbnail(sicon)
        .addField('Server Name', message.guild.name)
        .addField('Server Created', message.guild.createdAt)
        .addField('Member Count', message.guild.memberCount)
        .addField('You Joined', message.member.joinedAt);
      return message.channel.send(serverembed);
    }
  }
  // Youtube
  if (message.guild.available) {
    if (cmd === `${prefix}yt`) {
      if (!args[0]) {
        message.channel.send('Please give me a Youtube link!');
        return;
      }
      if (args[0].length > 0) {
        if (ytdl.validateURL(args[0])) {
          message.channel.send('Valid Youtube Link!');
          if (message.member.voiceChannel) {
            message.channel.send('Joining Voice!');
            message.member.voiceChannel.join()
              .then(conn => {
                message.channel.send('Successfully Joined Voice Channel');
                conn.playStream(ytdl(args[0]));
              }).catch(console.log);
          } else {
            message.channel.send('Failed to join voice channel, please join a voice channel first!');
          }
        } else if (args[0] === `stop`) {
          if (message.guild.voiceConnection) {
            message.channel.send('Leaving Voice Channel');
            message.member.voiceChannel.leave();
          } else {
            message.channel.send('I have already left the voice channel');
          }
        }
      }
    }
  }
});
// Bot Login
bot.login(token);
// Webpage Monitor
const express = require('express');
const expressmonitor = require('express-status-monitor')({ path: '' });
const app = express();
// Heroku Shutdown Avoidance
app.use(expressmonitor.middleware);
app.get('/', expressmonitor.pageRoute);
app.listen(8080, () => {
  console.log('Now listening!');
});
