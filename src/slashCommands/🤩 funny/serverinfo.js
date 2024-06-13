const {
  EmbedBuilder,
  ChannelType,
  SlashCommandBuilder
} = require('discord.js')
const moment = require('moment')

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('ve la informacion del servidor🏧'),
  async execute (client, interaction) {
    try {
      const member = interaction.member

      let Emojis = ''
      let EmojisAnimated = ''
      let EmojiCount = 0
      let Animated = 0
      let OverallEmojis = 0

      function Emoji (id) {
        return client.emojis.cache.get(id).toString()
      }

      interaction.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++
        if (emoji.animated) {
          Animated++
          EmojisAnimated += Emoji(emoji.id)
        } else {
          EmojiCount++
          Emojis += Emoji(emoji.id)
        }
      })

      const humans = interaction.guild.members.cache.filter(
        (m) => !m.user.bot
      ).size
      const bots = interaction.guild.members.cache.filter(
        (m) => m.user.bot
      ).size

      const getChannelTypeSize = (type) =>
        interaction.guild.channels.cache.filter((channel) =>
          type.includes(channel.type)
        ).size
      const totalChannels = getChannelTypeSize([
        ChannelType.GuildText,
        ChannelType.GuildNews,
        ChannelType.GuildVoice,
        ChannelType.GuildStageVoice,
        ChannelType.GuildForum,
        ChannelType.GuildPublicThread,
        ChannelType.GuildPrivateThread,
        ChannelType.GuildNewsThread,
        ChannelType.GuildCategory
      ])

      const embed = new EmbedBuilder()
        .setAuthor({
          name: 'Información de ' + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL())
        .setColor('Red')
        .setDescription(
          `Descripción: **${
            interaction.guild.description || 'No Tiene'
          }**\nLenguaje: **${
            new Intl.DisplayNames(['es'], { type: 'language' }).of(
              interaction.guild.preferredLocale
            ) || 'No Tiene'
          }**\nURL Personalizada: **${
            interaction.guild.vanityURLCode || 'No Tiene'
          }**`
        )
        .addFields(
          {
            name: '👑 | Dueño:',
            value: `\`\`\`${member.user.tag}\`\`\``,
            inline: true
          },
          {
            name: '📅 | Creado el:',
            value: `\`\`\`${moment(interaction.guild.createdTimestamp).format(
              'D/M/Y'
            )}\n${moment(interaction.guild.createdTimestamp).format(
              'hh:mm:ss'
            )}\`\`\``,
            inline: true
          },
          {
            name: '🔢 | ID:',
            value: `\`\`\`${interaction.guild.id}\`\`\``,
            inline: true
          },

          {
            name: '👁‍🗨 | Canales:',
            value: `\`\`\`${totalChannels}\`\`\``,
            inline: true
          },
          {
            name: '💬 | Canales-Texto:',
            value: `\`\`\`${getChannelTypeSize([
              ChannelType.GuildText,
              ChannelType.GuildForum,
              ChannelType.GuildNews
            ])}\`\`\``,
            inline: true
          },
          {
            name: '🔈 | Canales-Voz:',
            value: `\`\`\`${getChannelTypeSize([
              ChannelType.GuildVoice,
              ChannelType.GuildStageVoice
            ])}\`\`\``,
            inline: true
          },

          {
            name: '🧵 | Hilos:',
            value: `\`\`\`${getChannelTypeSize([
              ChannelType.GuildPublicThread,
              ChannelType.GuildPrivateThread,
              ChannelType.GuildNewsThread
            ])}\`\`\``,
            inline: true
          },
          {
            name: '➗ | Categorias:',
            value: `\`\`\`${getChannelTypeSize([
              ChannelType.GuildCategory
            ])}\`\`\``,
            inline: true
          },
          {
            name: '👮 | Roles:',
            value: `\`\`\`${interaction.guild.roles.cache.size}\`\`\``,
            inline: true
          },

          {
            name: '📜 | Reglamento:',
            value: `\`\`\`${
              interaction.guild.rulesChannel
                ? interaction.guild.rulesChannel
                : 'Ninguno'
            }\`\`\``,
            inline: true
          },
          {
            name: '😴 | AFK:',
            value: `\`\`\`${
              interaction.guild.afkChannel
                ? interaction.guild.afkChannel
                : 'Ninguno'
            }\`\`\``,
            inline: true
          },
          {
            name: '📱 | Publicaciones:',
            value: `\`\`\`${
              interaction.guild.communityChannel
                ? interaction.guild.communityChannel
                : 'Ninguno'
            }\`\`\``,
            inline: true
          },

          {
            name: '😀 | Usuarios:',
            value: `\`\`\`${interaction.guild.memberCount}\`\`\``,
            inline: true
          },
          {
            name: '👤 | Humanos:',
            value: `\`\`\`${humans}\`\`\``,
            inline: true
          },
          { name: '🤖 | Bots:', value: `\`\`\`${bots}\`\`\``, inline: true },

          {
            name: '🐵 | Emojis Totales:',
            value: `\`\`\`${interaction.guild.emojis.cache.size}\`\`\``,
            inline: true
          },
          {
            name: '🐸 | Estáticos:',
            value: `\`\`\`${EmojiCount}\`\`\``,
            inline: true
          },
          {
            name: '🐻 | Animados:',
            value: `\`\`\`${Animated}\`\`\``,
            inline: true
          },

          {
            name: '🔝 | Mejoras:',
            value: `\`\`\`${interaction.guild.premiumSubscriptionCount.toString()}\`\`\``,
            inline: true
          },
          {
            name: '📄 | Nivel-Mejoras:',
            value: `\`\`\`${interaction.guild.premiumTier}\`\`\``,
            inline: true
          },
          {
            name: '📗 | Verificación:',
            value: `\`\`\`${interaction.guild.verificationLevel}\`\`\``,
            inline: true
          }
        )
        .setTimestamp()

      const embedEmojis = new EmbedBuilder()
        .setColor('Red')
        .setTitle(
          `🐸 | Todos los Emojis de ${interaction.guild.name} | Cantidad Total de Emojis: [${OverallEmojis}] | 🐵`
        )
        .setDescription(
          `**Emojis __ANIMADOS__:** [${Animated}]\n${EmojisAnimated}\n\n**Emojis __ESTÁTICOS__:** [${EmojiCount}]\n${Emojis}`
        )
        .setTimestamp()

      if (embedEmojis > 2000) {
        return interaction.AnimatedReply(
          interaction,
          ':x:',
          '¡El embed de emojis no se ha podido enviar porque tienes muchos emojis en tu servidor!'
        )
      }

      const embedRoles = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`👮‍♂️ | Todos los Roles de ${interaction.guild.name} | 👮‍♂️`)
        .setDescription(
          `${interaction.guild.roles.cache
            .map((roles) => `\`${roles.name}\``)
            .join(', ')}`
        )
        .setTimestamp()

      interaction.reply({
        embeds: [embed, embedEmojis, embedRoles],
        ephemeral: false
      })
    } catch (err) {
      console.log(err)
    }
  }
}
