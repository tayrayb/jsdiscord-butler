const Giphy = require('giphy-api')('xlBIG4vhISXCkzpjWHhmtkH2XtbJGF1S');
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

    if (message.content === prefix + 'ping' && message.author.id != bot.user.id) {
     message.channel.send('!ping');
    }
});
//Random Gif
bot.on('message', message => {
    if (message.content === prefix + 'gifrandom') {
     Giphy.random({
         rating: 'g'
        },function (err, res) {
         message.channel.send(res.data.url)
        })
        /*Giphy.trending({
            limit: 1
        },function(err, res){
            res.data.forEach(ele => {
                message.channel.send(ele.url)
            })
        })*/
    }
});
//What is my avatar?
bot.on('message', message => {
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.avatarURL)
        message.channel.send('You are awesome')
    }
});
//Avatar of another User
bot.on('message', message => {
    if (message.content === new RegExp('\\' + prefix + ' * \\' )) {
        message.channel.send(message.mentions[0].user.avatarURL)
    }
})

//Bot Login
bot.login(token);