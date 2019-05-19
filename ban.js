const Discord = require("discord.js");

const moment = require("moment");



module.exports.run = async (bot, message) => {

  message.delete();

  let BotSettings = bot.settings;

  let member = message.mentions.members.first() || message.guild.members.get(message.args[0]);



  let MissEmbedMember = new Discord.RichEmbed()

    .setColor("#F1C40F")

    .setTitle("Hm. Something is missing to execute this command.")

    .setDescription("Please enter a member that is on the server.");



  let MissEmbedReason = new Discord.RichEmbed()

    .setColor("#F1C40F")

    .setTitle("Hm. Something is missing to execute this command.")

    .setDescription("Please give a reason!");



  let DevError = new Discord.RichEmbed()

    .setColor("#a21018")

    .setTitle("Command execution failed")

    .setDescription("The Developer cannot be banned!");



  try {

    if (message.author.id === BotSettings.OwnerID || message.member.hasPermission("BAN_MEMBERS")) {



      let member = message.mentions.members.first() || message.guild.members.get(message.args[0]);



      if (!member)



        return message.channel.send(message.author, MissEmbedMember);



      let reason = message.args.slice(1).join(' ');





      if (!reason) return message.channel.send(message.author, MissEmbedReason);



      if (member.id === BotSettings.OwnerID) return message.channel.send(message.author, DevError);



      await member.ban(reason)



      var successEmbed = new Discord.RichEmbed()


        .setColor("#f1b158")

        .setTitle("Command was successfully executed!")

        .setDescription(`**${member.user.username}**#${member.user.discriminator} was banned off the server for **${reason}**`);



      let msgban = await message.channel.send(message.author, successEmbed);

      setTimeout(async () => {

        msgban.delete();

      }, 3000);



    } else {

      let embed = new Discord.RichEmbed()

        .setColor("#a21018")

        .setTitle("Command execution failed")

        .setDescription(`This command requires the following server rights: **Ban_Members**.`);

      message.channel.send(message.author, embed);

    }

  } catch (error) {



    let ErrEmbed = new Discord.RichEmbed()

      .setColor("#a21018")

      .setTitle("Command execution failed")

      .setDescription(`Hm. Something went wrong.\n\n\`\`\`${error}\`\`\``);



    message.channel.send(message.author, ErrEmbed);

  }

};
