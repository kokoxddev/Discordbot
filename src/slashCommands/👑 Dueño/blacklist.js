const { SlashCommandBuilder, EmbedBuilder, WebhookClient, ApplicationCommandOptionType } = require("discord.js");

// Estructura de datos para almacenar los usuarios en la blacklist
const blacklist = new Map();

module.exports = {
    CMD: new SlashCommandBuilder()
       
        .setDescription("[MOD] Administra la lista negra de usuarios")
        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("Añade a un usuario a la lista negra")
                .addUserOption(option => option.setName("usuario").setDescription("Usuario a añadir a la lista negra").setRequired(true))
                .addStringOption(option => option.setName("razon").setDescription("Razón por la que se añadirá a la lista negra").setRequired(true))
                .addStringOption(option => option.setName("webhook_id").setDescription("ID del webhook para enviar la notificación").setRequired(true))
                .addStringOption(option => option.setName("webhook_token").setDescription("Token del webhook para enviar la notificación").setRequired(true))
        ),
    async execute(client, interaction) {
        if (!interaction.guild || !interaction.member.permissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: "❌ No tienes permisos para usar este comando.", ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        const subcommand = interaction.options.getSubcommand();
        const usuario = interaction.options.getUser("usuario");
        const razon = interaction.options.getString("razon");
        const webhookID = interaction.options.getString("webhook_id");
        const webhookToken = interaction.options.getString("webhook_token");

        switch (subcommand) {
            case "add": {
                try {
                    // Verificar si el usuario ya está en la blacklist
                    if (blacklist.has(usuario.id)) {
                        return interaction.editReply({ content: "❌ Este usuario ya está en la lista negra." });
                    }

                    // Añadir usuario a la blacklist
                    blacklist.set(usuario.id, { razon, moderator: interaction.user.tag });

                    // Enviar mensaje de éxito
                    await interaction.editReply({ content: `✅ Usuario ${usuario.tag} añadido a la lista negra.` });

                    // Enviar webhook con la información
                    const webhookClient = new WebhookClient({ id: webhookID, token: webhookToken });

                    const embed = new EmbedBuilder()
                        .setTitle("Usuario añadido a la lista negra")
                        .setColor("RED")
                        .setDescription(`**Usuario:** ${usuario.tag} (${usuario.id})\n**Razón:** ${razon}\n**Moderador:** ${interaction.user.tag}`)
                        .setTimestamp();

                    await webhookClient.send({ embeds: [embed] });
                } catch (error) {
                    console.error("Error al añadir a la lista negra:", error);
                    await interaction.editReply({ content: "❌ Ha ocurrido un error al añadir a la lista negra.", ephemeral: true });
                }
                break;
            }

            default:
                interaction.editReply({ content: "❌ Subcomando inválido.", ephemeral: true });
                break;
        }
    },
};
