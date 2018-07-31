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
bot.on('ready', async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size}!`);
  bot.user.setActivity('Being Built');
});
// Start of Bot
bot.on('message', async message => {
  // Arrays!
  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  // Botception Prevention
  if (message.author.bot) return;
  // NO DM'S! (For now)
  if (message.channel.type === 'dm') {
    message.channel.send(`${message.author.username} let me be please!`);
    return;
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
  // User Query
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
