const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

const commands = {};

commands.gamedeals = (msg) => {
  fetch('https://old.reddit.com/r/GameDeals/.json?limit=4')
    .then((data) => data.json())
    .then((json) => {
      return json.data.children.map((post) => {
        return `${post.data.title} (<${post.data.url}>)`;
      });
    })
    .then((data) => {
      msg.author.send('Here are the top 5 deals going on today. Source (<https://reddit.com/r/gamedeals>)');
      msg.author.send(data.join("\n\n"))
        .catch(() => msg.author.send('Something went terribly wrong :('));
    })
    .catch((err) => {
      console.log(err);
      msg.author.send("Sorry was unable to fetch the gamedeals data. :(");
    });
};

commands.help = (msg) => msg.reply(`Command list: ${listCommands()}`);

commands.ping = (msg) => msg.reply('pong');

commands.poggers = (msg) => {
  const attachment = new MessageAttachment('https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/3x.png');
  return msg.channel.send(attachment);
};

function listCommands() {
  return Object.keys(commands).join(', ');
}

function getCommand(str) {
  const arr = str.slice(1).split(' ');
  const cmd = arr[0];
  const args = arr.slice(1);
  return { cmd, args };
}

exports.Commands = () => commands;
exports.getCommand = (str) => getCommand(str);
exports.commandMark = "!";
