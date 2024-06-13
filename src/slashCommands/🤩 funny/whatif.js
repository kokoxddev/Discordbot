const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { randomAnswer } = require('../../helpers/helpers')
module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('whatif')
    .setDescription('Sirve para hacer una pregunta al bot.')
    .addStringOption((option) =>
      option
        .setName('pregunta')
        .setDescription('Menciona la pregunta')
        .setRequired(true)
    ),
  execute (client, interaction, prefix, GUILD_DATA) {
    const pregunta = interaction.options.getString('pregunta')
    const respuesta = randomAnswer()

    const Embed = new EmbedBuilder()
      .setTitle('🎱 8Ball')
      .addFields([{ name: 'Pregunta:', value: `${pregunta}` }])
      .addFields([{ name: 'Respuesta:', value: `${respuesta}` }])
      .setColor('Purple')

    interaction.reply({ embeds: [Embed] })
  }
}
