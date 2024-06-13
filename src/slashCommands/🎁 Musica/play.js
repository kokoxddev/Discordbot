const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    CMD: new SlashCommandBuilder()
        
        .setDescription("Reproduce una canción")
        .addStringOption(option =>
            option.setName("cancion")
                .setDescription("Nombre de la canción")
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.guildId) return;

        await interaction.deferReply({ ephemeral: true });

        try {
            const cancion = interaction.options.getString("cancion");

            // Aquí va tu lógica para reproducir la canción
            // Este es solo un ejemplo de respuesta
            await interaction.editReply(`Reproduciendo la canción: ${cancion}`);
        } catch (error) {
            console.error("Error al ejecutar el comando play:", error);
            await interaction.editReply("❌ Ha ocurrido un error al ejecutar el comando.");
        }
    },
};
