const { AuditLogEvent, EmbedBuilder } = require('discord.js')
module.exports = async (client, member) => {
  const channelID = '1063571623845839039'
  const channel = member.guild.channels.cache.get(channelID)
  channel.guild
    .fetchAuditLogs({
      type: AuditLogEvent.ChannelCreate
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first()

      const name = channel.name
      const id = channel.id
      let type = channel.type

      if (type === 0) type = 'Texto'
      if (type === 2) type = 'Voz'
      if (type === 13) type = 'Stage'
      if (type === 15) type = 'Foro'
      if (type === 5) type = 'Announcememnt'
      if (type === 4) type = 'Categoria'

      const Channel = await channel.guild.channels.cache.get(channelID)

      const embed = new EmbedBuilder()
        .setTitle('Canal Creado')
        .addFields({ name: 'Nombre del canal', value: `${name} (<#${id}>)` })
        .addFields({ name: 'Tipo de canal', value: `${type}` })
        .addFields({ name: 'ID del canal', value: `${id}` })
        .addFields({ name: 'Creado por', value: `${executor.tag}` })
        .setTimestamp()

      Channel.send({ embeds: [embed] })
    })
}
