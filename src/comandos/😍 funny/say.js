const Discord = require('discord.js')
module.exports = {
  DESCRIPTION: 'Mira el ping del bot',
  execute (client, message, args, prefix, GUILD_DATA) {
    const content = args.join(' ')

    if (!content) {
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle('Error')
            .setDescription('No se puede enviar un mensaje vacío.')
            .setColor('Red')
        ],
        allowedMentions: { RepliedUsers: false }
      })
    }

    const button = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('9856348172')
          .setStyle(Discord.ButtonStyle.Secondary)
          .setLabel(`Enviado por ${message.author.tag}`)
          .setDisabled(true)
      )

    message.delete().then(() => {
      message.channel.send({ content: `${content}`, components: [button], allowedMentions: { parce: ['everyone', 'here'] } })
    })
  }
}
