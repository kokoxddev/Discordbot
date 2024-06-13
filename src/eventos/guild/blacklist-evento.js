const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const blacklistcommandsSchema = require("../../database/schemas/blacklist");

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const command = interaction.commandName;

    if (command === "blacklist") {
        await executeBlacklistCommand(client, interaction);
    }
};

async function executeBlacklistCommand(client, interaction) {
    const subcommand = interaction.options.getSubcommand();
    const usuario = interaction.options.getUser("usuario");
    const reason_add = interaction.options.getString("razon-add");
    const user_id = interaction.options.getUser("user-id");
    const reason_delete = interaction.options.getString("razon-delete");

    switch (subcommand) {
        case "add": {
            try {
                const data = await blacklistcommandsSchema.findOne({ UserID: usuario.id });

                if (data) {
                    const warning_blacklistrepeat = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle("**Blacklist Aviso**")
                        .setDescription("No puedes aplicar el blacklist, este usuario ya se encuentra blacklisteado");
                    return interaction.reply({ embeds: [warning_blacklistrepeat], content: "**Operación fallida, detalles a continuación:**" });
                }

                if (usuario.id === interaction.user.id) {
                    const warning_reblacklist = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle("**Blacklist Aviso**")
                        .setDescription("No puedes aplicarte un blacklist de comandos a ti mismo, eso generaría problemas");
                    return interaction.reply({ embeds: [warning_reblacklist], content: "**Operación fallida, detalles a continuación:**" });
                }

                await interaction.reply({ content: "**Agregando usuario a la blacklist de mis comandos, espera por favor...**" });

                const añadir_blacklist = new EmbedBuilder()
                    .setTitle("**Usuario añadido a la blacklist de Mecha-Deg**")
                    .setDescription("El usuario ha sido blacklisteado de los comandos con la siguiente información:")
                    .addFields(
                        { name: "Razón:", value: `\`\`\`js\n${reason_add}\`\`\`` },
                        { name: "Usuario:", value: `\`\`\`js\n${usuario.username}\`\`\``, inline: true },
                        { name: "ID del usuario:", value: `\`\`\`js\n${usuario.id}\`\`\``, inline: true }
                    )
                    .setTimestamp();
                await interaction.editReply({ embeds: [añadir_blacklist], content: "**Operación completada con éxito, detalles a continuación:**" });

                await blacklistcommandsSchema.create({
                    UserID: usuario.id,
                    Reason: reason_add,
                });

                const avise_blacklist = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("**Blacklisteado de los comandos de Mecha-Deg**")
                    .setDescription(`El developer del bot te bloqueó el acceso a mis comandos, por la siguiente razón:\n\n${reason_add}\n\nSi crees que esto es un error, puedes apelar ante el developer este blacklisteo.`);
                await usuario.send({ embeds: [avise_blacklist] });
            } catch (error) {
                console.error("Error al intentar añadir a la blacklist:", error);
                await interaction.reply({ content: "❌ Ha ocurrido un error al intentar añadir a la blacklist.", ephemeral: true });
            }
            break;
        }

        case "remove": {
            try {
                const data = await blacklistcommandsSchema.findOne({ UserID: user_id.id });

                if (!data) {
                    const warning_doubleunblacklist = new EmbedBuilder()
                        .setTitle("**Blacklist Aviso**")
                        .setDescription("Este usuario no se encuentra en la blacklist");
                    return interaction.reply({ embeds: [warning_doubleunblacklist], content: "**Operación fallida, detalles a continuación:**" });
                }

                if (user_id.id === interaction.user.id) {
                    const warning_unblacklist = new EmbedBuilder()
                        .setTitle("**Blacklist Aviso**")
                        .setDescription("No puedes quitarte una blacklist de comandos a ti mismo, eso generaría problemas");
                    return interaction.reply({ embeds: [warning_unblacklist], content: "**Operación fallida, detalles a continuación:**" });
                }

                const quitar_blacklist = new EmbedBuilder()
                    .setTitle("**Usuario quitado de la blacklist de Mecha-Deg**")
                    .setDescription("El usuario ha sido quitado de la blacklist de los comandos con la siguiente información:")
                    .addFields(
                        { name: "Razón:", value: `\`\`\`js\n${reason_delete}\`\`\`` },
                        { name: "Usuario:", value: `\`\`\`js\n${user_id.username}\`\`\``, inline: true },
                        { name: "ID del usuario:", value: `\`\`\`js\n${user_id.id}\`\`\``, inline: true }
                    )
                    .setTimestamp();
                await interaction.reply({ embeds: [quitar_blacklist], content: "**Operación completada con éxito, detalles a continuación:**" });

                await blacklistcommandsSchema.findOneAndDelete({ UserID: user_id.id });

                const avise_unblacklist = new EmbedBuilder()
                    .setTitle("**Puedes usar los comandos con normalidad**")
                    .setDescription(`Hola, el developer del bot te dio acceso de nuevo a mis comandos, por la siguiente razón:\n\n${reason_delete}\n\nSi apelaste o el developer te perdonó, puedes omitir este mensaje, en caso omiso de no haber solicitado este unblacklisteo, por favor comunícate con el developer para resolver el caso.`);
                await user_id.send({ embeds: [avise_unblacklist] });
            } catch (error) {
                console.error("Error al intentar remover de la blacklist:", error);
                await interaction.reply({ content: "❌ Ha ocurrido un error al intentar remover de la blacklist.", ephemeral: true });
            }
            break;
        }

        default:
            interaction.reply({ content: "❌ Subcomando inválido.", ephemeral: true });
            break;
    }
}
