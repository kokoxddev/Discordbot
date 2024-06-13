const { EmbedBuilder } = require('discord.js')
const { randomAnswer } = require('../../helpers/helpers')
module.exports = {
  DESCRIPTION: 'Sirve para hacer una pregunta al bot.',
  async execute (client, message, args, prefix, GUILD_DATA) {
    const texto = args.join(' ')
    if (!texto) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              ':closed_book: Debes introducir un texto para responderte a algo'
            )
            .setThumbnail(
              'https://emojipedia-us.s3.amazonaws.com/source/skype/289/pool-8-ball_1f3b1.png'
            )
            .setDescription('Mi preddicion ha fallado! :x:')
        ]
      })
    }
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${message.author.username} pregunto: **${texto}**`)
          .setThumbnail(
            'https://emojipedia-us.s3.amazonaws.com/source/skype/289/pool-8-ball_1f3b1.png'
          )
          .setDescription(`**Mi respuesta es:** ${randomAnswer()}`)
      ]
    })
  }
}
