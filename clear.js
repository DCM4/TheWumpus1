const Discord = require("discord.js");


module.exports.run = async (bot, message) => {
    let BotSettings = bot.settings;

    let MissEmbedNumber = new Discord.RichEmbed()
        .setColor("#F1C40F")
        .setTitle("Hm. Something is missing to execute this command.")
        .setDescription("Please enter a number between **2** and **100**.");

    if (message.author.id === BotSettings.OwnerID || message.member.hasPermission("MANAGE_MESSAGES")) {

        let deleteCount = parseInt(message.args[0], 10);

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) return message.channel.send(message.author, MissEmbedNumber);

        let deleted = await message.channel.bulkDelete(deleteCount + 1).catch(error => {
            let ErrEmbed = new Discord.RichEmbed()
                .setColor("#a21018")
                .setTitle("Command execution failed")
                .setDescription(`Hm. Something went wrong.\n\n\`\`\`${error}\`\`\``);

            message.channel.send(message.author, ErrEmbed);
        });

        var successEmbed = new Discord.RichEmbed()

            .setColor(`#35711e`)
            .setTitle("Command was successfully executed!")
            .setDescription(`**${deleted.size}** messages have been deleted.`);

        let msg1 = await message.channel.send(message.author, successEmbed);
        setTimeout(async () => {
            msg1.delete();
        }, 3000);

    } else {
        let ErrEmbed = new Discord.RichEmbed()
            .setColor("#a21018")
            .setTitle("Command execution failed")
            .setDescription("This command requires the following server rights: **Manage_Messages**.");
        message.channel.send(message.author, ErrEmbed);
    }
};
