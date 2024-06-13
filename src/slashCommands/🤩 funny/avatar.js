const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription('Mostrar el avatar de un usuario')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Elegir a un usuario')
        .setRequired(false)
    ),

  async execute(client, interaction, prefix) {
    const usuario = interaction.options.getMember('usuario') || interaction.user;

    if (usuario) { // Ensure usuario is defined
      const AvatarEmbed = new EmbedBuilder()
        .setTitle(`Avatar de ${usuario.user.username}`)
        .setImage(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor(process.env.COLOR);

      interaction.reply({ embeds: [AvatarEmbed] });
    } else {
      interaction.reply('No se pudo encontrar el usuario especificado.');
    }
  }
};