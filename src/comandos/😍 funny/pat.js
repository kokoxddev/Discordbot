const anime = require("anime-actions");
const { SlashCommandBuilder, EmbedBuilder, Message } = require("discord.js");

module.exports = {
 

  /**
   * @param {Message} message
   */

  async execute(client, message) {
    const user = message.author.toString();
    const target = message.mentions.users.first();
    if (!target)
      return message.channel.send({
        content: `Debes mecionar a alguien, ${user}!`,
      });
    const url = await anime.pat();

    const embed = new EmbedBuilder()
      .setDescription(`**${user}** acaricia a <@${target.id}> :3`)
      .setColor("DarkButNotBlack")
      .setImage(url);

    await message.channel.send({ embeds: [embed] });
  },
};