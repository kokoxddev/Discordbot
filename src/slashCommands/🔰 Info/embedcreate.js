const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription("Envía un mensaje en embed")
    .addStringOption((option) =>
      option
        .setName("descripcion")
        .setDescription("Descripción del embed")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("everyone")
        .setDescription("Enviar embed con @everyone")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("titulo").setDescription("Título del embed")
    )
    .addStringOption((option) =>
      option.setName("footer").setDescription("Footer del embed")
    )
    .addStringOption((option) =>
      option.setName("footer-icon").setDescription("Icono del footer del embed")
    )
    .addStringOption((option) =>
      option.setName("imagen").setDescription("Imagen que llevará el embed")
    )
    .addChannelOption((option) =>
      option.setName("canal").setDescription("Canal a enviar el embed")
    )
    .addStringOption((option) =>
      option
        .setName("publicacion-id")
        .setDescription("ID de la publicación del canal de foro")
    ),
  async execute(client, interaction) {
    const linkRegex = new RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g
    );

    const channelOption = interaction.options.getChannel("canal");
    const everyone = interaction.options.getBoolean("everyone");
    const title = interaction.options.getString("titulo");
    const description = interaction.options.getString("descripcion");
    const footer = interaction.options.getString("footer");
    const footerIcon = interaction.options.getString("footer-icon");
    const imagen = interaction.options.getString("imagen");

    if (channelOption) {
      const channel = channelOption; // Assign the channel to a variable
      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(description);

      if (title) embed.setTitle(title);

      if (footer) {
        if (footerIcon) {
          if (!footerIcon.match(linkRegex))
            return interaction.reply({
              content: "Indica el URL de una imagen válida",
              ephemeral: true,
            });
        }
        embed.setFooter({
          text: footer,
          iconURL: footerIcon || null,
        });
      }

      if (imagen) {
        if (!imagen.match(linkRegex))
          return interaction.reply({
            content: "Indica el URL de una imagen válida",
            ephemeral: true,
          });
        embed.setImage(imagen);
      }

      channel.send({ embeds: [embed] });
      if (everyone === true) channel.send("@everyone").then((x) => x.delete());
      interaction.reply({ content: "Embed enviado", ephemeral: true });
    } else {
      interaction.reply({ content: "Canal no especificado", ephemeral: true });
    }
  },
};