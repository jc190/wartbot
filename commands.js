const fs = require('fs');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const { dirname } = require('path');

const commands = {};

commands.ascii = async (msg, args) => {
  try {
    switch (args[0]) {
      case 'pikachu':
        await getAscii('pika', msg);
        break;
      case 'monkas':
        await getAscii('monkas', msg);
        break;
      case 'pogchamp':
        await getAscii('pogchamp', msg);
        break;
      default:
        msg.reply(`Sorry did not find what you are looking for. Here is a list of available ascii art: ${['pikachu', 'monkas', 'pogchamp'].join(', ')}.`);
        break;
    }
  } catch (err) {
    console.error(err);
    msg.reply('Sorry something went really wrong...');
  }
}

commands.gamedeals = async (msg) => {
  try {
    await fetch('https://old.reddit.com/r/GameDeals/.json?limit=10')
      .then((data) => data.json())
      .then((json) => {
        return json.data.children.map((post) => {
          return `${post.data.title} (<${post.data.url}>)\n`;
        });
      })
      .then((data) => {
        msg.author.send('Here are 10 trending deals going on today. Source (<https://reddit.com/r/gamedeals>)');
        data.map((d) => msg.author.send(d));
      })
      .catch((err) => {
        console.log(err);
        msg.author.send("Sorry was unable to fetch the gamedeals data. :(");
      });
  } catch (err) {
    console.error(err);
    msg.reply('Sorry something went really wrong...');
  }
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

function getAscii(name, msg) {
  fs.readFile(`./ascii/${name}.ascii`, {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;
    msg.channel.send(data);
  });
}

exports.Commands = () => commands;
exports.getCommand = (str) => getCommand(str);
exports.commandMark = "!";
