const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const Discord = require("discord.js")

module.exports = {
    CMD: new SlashCommandBuilder()
       
        .setDescription('Muestra el ranking del servidor'),

    async execute(interaction) {
        if (!interaction.guild) {
            return interaction.reply({ content: '❌ Este comando solo puede usarse en un servidor.', ephemeral: true });
        }

        // Obtenemos todos los miembros del servidor ordenados por su puntuación (ficticio)
        const members = interaction.guild.members.cache
            .filter(member => !member.user.bot) // Filtramos los bots
            .sort((a, b) => b.user.score - a.user.score); // Ordenamos por puntuación (ficticio)

        // Creamos el lienzo (canvas)
        const canvas = createCanvas(700, 500);
        const ctx = canvas.getContext('2d');

        // Fondo del ranking
        ctx.fillStyle = '#2C2F33';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Título
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px Arial';
        ctx.fillText(`Ranking de ${interaction.guild.name}`, 50, 50);

        // Posiciones y nombres de los miembros (máximo 10)
        ctx.font = '20px Arial';
        ctx.fillText('Posición', 50, 100);
        ctx.fillText('Nombre', 200, 100);

        for (let i = 0; i < Math.min(members.size, 10); i++) {
            const member = members.array()[i]; // Usamos .array() para convertir el collection a un array y acceder por índice
            const user = member.user;

            // Posición
            ctx.fillText(`${i + 1}`, 50, 150 + i * 40);

            // Avatar
            const avatarURL = user.displayAvatarURL({ format: 'png' });
            const avatar = await loadImage(avatarURL); // Cargamos la imagen directamente desde la URL del avatar
            ctx.drawImage(avatar, 150, 130 + i * 40, 30, 30);

            // Nombre
            ctx.fillText(user.username, 200, 150 + i * 40);
        }

        // Enviar imagen del ranking
        const buffer = canvas.toBuffer(); // Convertimos el lienzo a un buffer
        const attachment = new Discord.AttachmentBuilder(buffer, 'ranking.png');
        await interaction.reply({ files: [attachment] });
    },
};
