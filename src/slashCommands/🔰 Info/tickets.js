const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ChannelType, Permissions, MessageActionRow, MessageButton, CommandInteractionOptionResolver, Interaction, ChatInputApplicationCommandData, EmbedField, MessageActionRowComponentResolvable, MessageEmbed, InteractionReplyOptions, CommandInteraction, EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Configura un sistema avanzado de tickets')
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Selecciona un canal para los tickets')
        .setRequired(true)
        .addChannelTypes([ChannelType.GuildText])
    )
    .addRoleOption(option =>
      option.setName('rol_staff')
        .setDescription('Selecciona un rol con permisos para los tickets')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('titulo')
        .setDescription('Escribe un título para el panel de tickets')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('descripcion')
        .setDescription('Escribe una descripción para el panel de tickets')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('boton_label')
        .setDescription('Escribe el texto del botón para abrir tickets')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('boton_emoji')
        .setDescription('Selecciona un emoji para el botón de abrir tickets')
        .setRequired(true)
    ),

  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const canal = interaction.options.getChannel('canal');
    const rol = interaction.options.getRole('rol_staff');
    const titulo = interaction.options.getString('titulo');
    const descripcion = interaction.options.getString('descripcion');
    const botonLabel = interaction.options.getString('boton_label');
    const botonEmoji = interaction.options.getString('boton_emoji');

    const configEmbed = new EmbedBuilder()
      .setTitle('📩 Sistema de Tickets Configurado')
      .setDescription('El sistema de tickets se configuró correctamente.')
      .setColor('#2b2d31')
      .addField('Canal', `<#${canal.id}>`, true)
      .addField('Rol de Staff', `<@&${rol.id}>`, true)
      .addField('Título del Panel', titulo, true)
      .addField('Descripción del Panel', descripcion, true)
      .addField('Botón Label', botonLabel, true)
      .addField('Botón Emoji', botonEmoji, true);

    const panelEmbed = new EmbedBuilder()
      .setTitle(titulo)
      .setDescription(descripcion)
      .setColor('#2b2d31');

    const abrirTicketButton = new ButtonBuilder()
      .setCustomId(`abrir_ticket_${rol.id}`)
      .setLabel(botonLabel)
      .setEmoji(botonEmoji)
      .setStyle(ButtonStyle.Secondaryy);

    const filaBotones = new ActionRowBuilder()
      .addComponents(abrirTicketButton);

    try {
      await interaction.reply({
        embeds: [configEmbed],
        ephemeral: true
      });

      await canal.send({
        embeds: [panelEmbed],
        components: [filaBotones]
      });

    } catch (error) {
      console.error('Error al enviar mensaje o interactuar:', error);
      await interaction.editReply({
        content: 'Hubo un error al configurar el sistema de tickets.',
        ephemeral: true
      });
    }
  }
};
