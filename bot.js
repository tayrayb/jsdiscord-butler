const conf = require('./conf.js');
const Giphy = require('giphy-api')(conf.giphyAPI);
var prefix = conf.prefix;
const Discord = require('discord.js');
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
    //Gif Commands
    if (cmd === `${prefix}gif`) {
        if (args[0] === 'random') {
            Giphy.random({
                rating: 'g',
                fmt: 'json'
            }, function (err, res) {
                message.channel.send(res.data.url);
                console.log(res.data.url);
            })
        } else if (args[0] === 'search'){
            Giphy.search({
                q: args[1],
                fmt: 'json',
                limit: 1
            }, function (err, res) {
                message.channel.send(res.data[0].url);
                console.log(res.data[0].url);
                return;
            });
        }
    }
})
bot.login(token)