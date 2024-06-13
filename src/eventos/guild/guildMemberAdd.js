const { EmbedBuilder } = require('discord.js')

module.exports = async (client, member) => {
  const { user } = member
  const channel = member.guild.channels.cache.get('1063562744210669629') // AQUÍ VA LA ID DE TU CANAL DE BIENVENIDAS

  channel.send({
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
        .setTitle('¡Hola!')
        .setDescription('Texto de bienvenida')
        .setThumbnail(`${user.avatarURL({ forceStatic: false })}`) // AQUÍ VA EL AVATAR DEL USUARIO QUE ENTRÓ
        .setImage('https://media.tenor.com/990MomrAHwEAAAAd/welcome-new-members-senko-san.gif') // EL GIF O FOTO QUE QUIERAS
        .setFooter({
          text: 'Texto que quieras, qsy'
        })
        .setColor('#ffffff')
    ]
  })
}
