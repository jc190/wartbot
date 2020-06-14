require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

const { Commands, commandMark, getCommand } = require('./commands');
const commands = Commands();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content[0] === commandMark) {
    const { args, cmd } = getCommand(msg.content);
    if (commands[cmd]) {
      commands[cmd](msg, args);
    }
  }
});

client.login(process.env.TOKEN);
