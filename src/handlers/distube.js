const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

module.exports = (client, Discord) => {
    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        savePreviousSongs: true,
        nsfw: false,
        plugins: [
            new SpotifyPlugin(),
            new SoundCloudPlugin(),
        ],
    });

    client.distube.on("playSong", (queue, song) => {
        const embed = new EmbedBuilder()
            .setDescription(`\n<:logo1:1104791779317907496><:logo2:1104791792903262309> **| Sistema de Musica** \n<:logo3:1104791808002768957><:logo4:1104791819910397993> **| Reproduciendo**\n\n<:numeral:1104223855255506965> ${song.name}\n<:esperando:1104793092411887786> ${song.formattedDuration}\n\n_La cancion se esta reproduciendo ahora mismo!_`)
            .setThumbnail('https://cdn.discordapp.com/attachments/1072297927986393138/1101221170872864808/logo_MDPRP.png')
            .setColor('#737373')
            .setFooter({
                text: "MDP Roleplay",
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('Pause')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setLabel('Skip')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('stop')
                    .setLabel('Stop')
                    .setStyle(ButtonStyle.Danger)
            );

        queue.textChannel.send({
            embeds: [embed],
            components: [row]
        });
    });

    client.distube.on("addSong", (queue, song) => {
        const embed = new EmbedBuilder()
            .setDescription(`\n<:logo1:1104791779317907496><:logo2:1104791792903262309> **| Sistema de Musica** \n<:logo3:1104791808002768957><:logo4:1104791819910397993> **| Cancion agregada**\n\n<:tilde:1104790645857603705> ${song.name}\n<:esperando:1104793092411887786> ${song.formattedDuration}\n\n_La cancion se agrego con exito, espera que termine la actual!_`)
            .setThumbnail('https://cdn.discordapp.com/attachments/1072297927986393138/1101221170872864808/logo_MDPRP.png')
            .setColor('#737373')
            .setFooter({
                text: "MDP Roleplay",
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        queue.textChannel.send({
            embeds: [embed]
        });
    });

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;

        const queue = client.distube.getQueue(interaction.guildId);

        if (!queue) return interaction.reply({ content: 'No hay canciones en la cola.', ephemeral: true });

        switch (interaction.customId) {
            case 'pause':
                if (queue.paused) {
                    queue.resume();
                    await interaction.reply('Reproducción resumida.');
                } else {
                    queue.pause();
                    await interaction.reply('Reproducción pausada.');
                }
                break;
            case 'skip':
                queue.skip();
                await interaction.reply('Canción saltada.');
                break;
            case 'stop':
                queue.stop();
                await interaction.reply('Reproducción detenida.');
                break;
        }
    });
};
