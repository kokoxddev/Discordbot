const {  EmbedBuilder } = require("discord.js");

module.exports = {
  DESCRIPTION: '⭐ Mira la latencia\'s ping',
  execute(client, message, args, prefix, GUILD_DATA) {
    const embed = new EmbedBuilder()
      .setTitle("Bot's Ping")
      .setDescription(`Client: \`${client.ws.ping}ms\` 😎`);

    message.channel.send({ embeds: [embed] });
  }
}