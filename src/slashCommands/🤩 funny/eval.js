const { SlashCommandBuilder } = require('discord.js')
require('dotenv').config()

module.exports = {
  CMD: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluate a code!')
    .addStringOption((option) =>
      option
        .setName('code')
        .setDescription('Write the code to evaluate.')
        .setRequired(true)
    ),
  OWNER: true,
  async execute (client, interaction) {
    await interaction.deferReply({ ephemeral: true })

    /* if (interaction.user.id !== 'ID DEL DESARROLLADOR') {
          return interaction.editReply('Only the bot developer can run the command.')
        } */

    try {
      const code = interaction.options.getString('code')
      // eslint-disable-next-line no-eval
      let evalued = await eval(code)
      if (typeof evalued !== 'string') {
        evalued = require('util').inspect(evalued, { depth: 2 })
      }

      const txt = `${evalued}`

      if (txt.length > 1950) {
        const elements = txt.split('')
        const blocks = []
        while (elements.length > 0) {
          blocks.push(elements.splice(0, 1950))
        }
        for (const block of blocks) {
          interaction.user.send('``js\n' + block.join('') + '\n``')
        }
      } else {
        interaction.editReply('``js\n' + txt + '\n``')
      }
    } catch (err) {
      interaction.editReply('``js\n' + err + '\n``')
    }
  }
};

(async () => await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json())()
