const Discord = require('discord.js')
const client = new Discord.Client({
  ws: [
    Discord.GatewayIntentBits.GuildPresences,
    Discord.IntentsBitField.Flags.GuildPresences
  ]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.login('911072574082003014')
