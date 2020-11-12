 const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');




exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        
        .setTitle(`${client.user.username}`)
        .setDescription(`:envelope: **Sunucu Sınırsız Davet Linki**:https://discord.gg/napnKQrbcN`) 
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Başarıyla ${ayarlar.prefix}davet Sistemini Kullandı!`, message.author.avatarURL)
    .setColor(`GREEN`)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['invite'],
  permLevel: 0,
};

exports.help = {
  name: 'invite',
  description: 'Oyun Elitleri Davet Sistemi',
  usage: 'invite'
}; 