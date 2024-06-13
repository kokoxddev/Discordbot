const { abbreviateNumber } = require('../../helpers/helpers')
const GuildDB = require('../../database/schemas/Guild.db')
const { ActivityType, PresenceUpdateStatus } = require('discord.js')
module.exports = {
  DESCRIPTION: 'Actualiza la Presencia del bot',
  execute (client, message, args, prefix, GUILD_DATA) {
    client.user.setPresence({
      activities: [
        {
          name: `${abbreviateNumber(new GuildDB().getGuildAllData().length)} servers`,
          type: ActivityType.Watching
        }
      ],
      status: PresenceUpdateStatus.Online
    })
    return message.reply('`Presencia actualizada`')
  }
}
