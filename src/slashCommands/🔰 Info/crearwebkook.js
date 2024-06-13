const { SlashCommandBuilder, WebhookClient, ChannelType } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setName('create-webhook')
        .setDescription('Crea un webhook en un canal específico')
        .addChannelOption(option => 
            option.setName('canal')
                .setDescription('Selecciona el canal donde se creará el webhook')
                .setRequired(true)
                .addChannelTypes([ChannelType.GuildText])),
    async execute(client, interaction) {
        if (!interaction.guild || !interaction.member.permissions.has('MANAGE_WEBHOOKS')) {
            return interaction.reply({ content: '❌ No tienes permisos para usar este comando.', ephemeral: true });
        }

        const canal = interaction.options.getChannel('canal');

        try {
            const webhook = await canal.createWebhook('Nuevo Webhook', {
                avatar: client.user.displayAvatarURL({ format: 'png' }),
            });

            await interaction.reply({
                content: `✅ Webhook creado en el canal ${canal} con nombre "${webhook.name}".`,
                ephemeral: true,
            });
        } catch (error) {
            console.error('Error al crear el webhook:', error);
            await interaction.reply({ content: '❌ Ha ocurrido un error al crear el webhook.', ephemeral: true });
        }
    },
};
