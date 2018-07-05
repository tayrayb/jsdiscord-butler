const conf = require('./conf.js');
const Giphy = require('giphy-api')(conf.giphyAPI);
var prefix = '!'
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

    
    }
})
bot.login(token)