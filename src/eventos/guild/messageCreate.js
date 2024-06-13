const { Collection } = require('discord.js');

// Creamos una colección para almacenar los cooldowns de cada comando por usuario
const cooldowns = new Collection();

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;

  const GUILD_DATA = client.dbGuild.getGuildData(message.guild.id);
  const prefix = GUILD_DATA.prefix;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift()?.toLowerCase();

  const comando = client.commands.get(cmd) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(cmd));

  if (comando) {
    if (comando.OWNER) {
      if (!process.env.OWNER_IDS.split(' ').includes(message.author.id)) {
        return message.reply(`❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${process.env.OWNER_IDS.split(' ').map(OWNER_ID => `<@${OWNER_ID}>`).join(', ')}`);
      }
    }

    if (comando.BOT_PERMISSIONS) {
      if (!message.guild.me.permissions.has(comando.BOT_PERMISSIONS)) {
        return message.reply(`❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${comando.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(', ')}`);
      }
    }

    if (comando.PERMISSIONS) {
      if (!message.member.permissions.has(comando.PERMISSIONS)) {
        return message.reply(`❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${comando.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(', ')}`);
      }
    }

    // Verificar cooldown del comando
    const now = Date.now();
    const cooldownAmount = (comando.COOLDOWN || 3) * 1000; // El cooldown en segundos, por defecto 3 segundos

    if (cooldowns.has(`${comando.NAME}-${message.author.id}`)) {
      const expirationTime = cooldowns.get(`${comando.NAME}-${message.author.id}`) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`❌ Debes esperar ${timeLeft.toFixed(1)} segundos antes de usar el comando \`${comando.NAME}\` nuevamente.`);
      }
    }

    // Actualizamos el cooldown del comando
    cooldowns.set(`${comando.NAME}-${message.author.id}`, now);
    setTimeout(() => cooldowns.delete(`${comando.NAME}-${message.author.id}`), cooldownAmount);

    try {
      // Ejecutar el comando
      await comando.execute(client, message, args, prefix, GUILD_DATA);
    } catch (error) {
      console.error(`Error al ejecutar el comando ${comando.NAME}:`, error);
      message.reply(`**Ha ocurrido un error al ejecutar el comando \`${comando.NAME}\`**\n*Mira la consola para más detalle.*`);
    }
  }
};
