//Imports
const conf = require('./conf.js');
const Giphy = require('giphy-api')(conf.giphyAPI);
const Discord = require('discord.js');
//Prefix
var prefix = conf.prefix;
//Discord Constants
const bot = new Discord.Client();
const token = conf.discordAPI;
//Command Ready
bot.on('ready', () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Being Built");
});
//Start of Bot
bot.on('message', message => {
    //Prevent bot from talking to itself
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    //Set cmd and arrays
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    //Ping pong!
    if (cmd === `${prefix}ping`) {
        message.channel.send('pong')
        return;
    }
    //Avatar commands
    if (cmd === `${prefix}avatar`) {
            message.channel.send(message.member.user.avatarURL)
            return;
    }
    //Gif Commands
    if (cmd === `${prefix}gif`) {
        if (args[0] === 'random') {
            Giphy.random({
                rating: 'g',
                fmt: 'json'
            }, function (err, res) {
                message.channel.send(res.data.url);
                console.log(res.data.url);
                return;
            })
        } else if (args[0] === 'search'){
            Giphy.random({
                tag: args[1],
                rating: 'g',
                fmt: 'json'
            }, function (err, res) {
                message.channel.send(res.data.url);
                console.log(res.data.url);
                return;
            });
        }
    }
})
//Bot Login
bot.login(token)