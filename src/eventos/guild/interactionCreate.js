module.exports = async (client, interaction) => {
    if (!interaction.guild || !interaction.channel) return;
  
    const GUILD_DATA = client.dbGuild.getGuildData(interaction.guild.id);
    const COMANDO = client.slashCommands.get(interaction.commandName);
  
    if (COMANDO) {
      // Verificar si el comando es solo para los dueños del bot
      if (COMANDO.OWNER) {
        if (!process.env.OWNER_IDS.split(' ').includes(interaction.user.id)) {
          return interaction.reply({
            content: `❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${process.env.OWNER_IDS.split(' ').map(OWNER_ID => `<@${OWNER_ID}>`).join(', ')}`,
            ephemeral: true
          });
        }
      }
  
      // Verificar permisos del bot
      if (COMANDO.BOT_PERMISSIONS) {
        if (!interaction.guild.me.permissions.has(COMANDO.BOT_PERMISSIONS)) {
          return interaction.reply({
            content: `❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos: ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(', ')}`,
            ephemeral: true
          });
        }
      }
  
      // Verificar permisos del usuario
      if (COMANDO.PERMISSIONS) {
        if (!interaction.member.permissions.has(COMANDO.PERMISSIONS)) {
          return interaction.reply({
            content: `❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos: ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(', ')}`,
            ephemeral: true
          });
        }
      }
  
      // Ejecutar el comando
      try {
        await COMANDO.execute(client, interaction, '/', GUILD_DATA);
      } catch (error) {
        console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error);
        await interaction.reply({
          content: `❌ **Ha ocurrido un error al ejecutar el comando ${interaction.commandName}**\n*Mira la consola para más detalles.*`,
          ephemeral: true
        });
      }
    }
  };
  