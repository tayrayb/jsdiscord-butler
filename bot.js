const Giphy = require('giphy')('xlBIG4vhISXCkzpjWHhmtkH2XtbJGF1S');
var prefix = '!'
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NDUwMTU2NjgxNzc1NTQ2MzY5.Dh786Q.qLfr6jaHxiikwd3_HOl6O4paSUI'
//Command Ready
bot.on('ready', () => {
    console.log('I am ready!');
})
//Ping Pong
bot.on('message', message => {
    if (message.content === prefix + 'ping') {
     message.channel.send('pong');
    }
});
//Gif Trending
bot.on('message', message => {

    function handleTrending(err, trend, res) {
     console.log(trend.url);
     message.channel.send(trend.url);
    }

    if (message.content === prefix + 'giftrending') {
     Giphy.trending(handleTrending);
    }
    
});
//What is my avatar?
bot.on('message', message => {
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.avatarURL)
    }
});

bot.login(token);``
