const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require(`discord.js`);
  
  module.exports = {
    CMD: new SlashCommandBuilder()
      
      .setDescription(" 🔰 Mira mis comandos"),
  
    async execute(client, interaction) {

      const cmp = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("Menu")
        .addOptions([
          {
            label: "Menu Principal",
            description: "Menu Principal.",
            value: "uno",
            emoji: "⚙️",
          },
          {
            label: "Configuracion",
            description: "Comandos de Configuracion",
            value: "dos",
            emoji: "🔧",
          },
          {
            label: "Moderacion",
            description: "Comandos de Moderacion",
            value: "tres",
            emoji: "⛔",
          },
          {
            label: "Interaccion",
            description: "Comandos de Interaccion",
            value: "cuatro",
            emoji: "❤️",
          },
        ])
      );
      const user = interaction.user;
  
      const embed = new EmbedBuilder()
        .setTitle("Menu de ayuda")
        .setImage("https://media.discordapp.net/attachments/1086311971005136936/1091908401870680124/New_Project_1.png?width=1025&height=183")
        .setColor("#2c2d31")
        .setDescription(`**Por favor Selecciona una opcion**`);
  
      let mensaje = await interaction.reply({
        embeds: [embed],
        components: [cmp],
      });
  
      const ifiltro = i => i.user.id === interaction.user.id;
  
      let collector = interaction.channel.createMessageComponentCollector({ filter: ifiltro });
  
      const embed1 = new EmbedBuilder()
        .setTitle("Comandos de Configuración")
        .setDescription("Coming Soon...")
        .setFooter({ text: "Un texto" })
        .setTimestamp()
        .setColor("#2c2d31");
  
      const embed2 = new EmbedBuilder()
        .setTitle("Comandos de Moderación")
        .setDescription("Coming Soon...")
        .setFooter({ text: "Un texto" })
        .setTimestamp()
        .setColor("#2c2d31");
  
      const embed3 = new EmbedBuilder()
        .setTitle("Comandos de Interacción")
        .setDescription("Coming Soon...")
        .setFooter({ text: "Un texto" })
        .setTimestamp()
        .setColor("#2c2d31");
  
      collector.on("collect", async i => {
        if (i.values[0] === "uno") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed], components: [cmp] });
        }
      });
  
      collector.on("collect", async i => {
        if (i.values[0] === "dos") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed1], components: [cmp] });
        }
      });
  
      collector.on("collect", async i => {
        if (i.values[0] === "tres") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed2], components: [cmp] });
        }
      });
  
      collector.on("collect", async i => {
        if (i.values[0] === "cuatro") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed3], components: [cmp] });
        }
      });

    },
  };