const Discord = require('discord.js');
const moment = require('moment')
const talkedRecently = new Set();
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
const prefix = ayarlar.prefix;

exports.run = async (bot, message, args, client) => {


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＹＥＴＫＩ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  
  
if(!message.member.roles.some(r => ["708528748651085867", "765636095085510667","714604106752458803"].includes(r.id))) // ROL ID yazan kısıma yetkili id gir
return message.reply("Bu Komutu Kullanmak İçin Yeterli Yetkin Bulunmamakta !") 

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＬＯＧ ＡＹＡＲＬＡＭＡ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  
  
const kanal = message.guild.channels.find(banlog => banlog.id === "765641470744068116") 
const save = message.guild.channels.find(banlog => banlog.id === "765641470744068116")
  

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＤＯＫＵＮＭＡ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  
  
   let reason = args.slice(1).join(' ')
    
    if (!args[0]) return message.channel.send(`Kimi Banlamam Gerekiyor ?`)
    let user = message.mentions.users.first() || bot.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
    if (!user) return message.channel.send(` Etiketlenen Kişi Sunucuda  Bulamadım.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`Etiketlenen Kişiyi Sunucuda Bulamadım.`)
    if (member.hasPermission("BAN_MEMBERS")) return message.channel.send(` Bu kişiyi yasaklayamam.`)
   member.send(`${message.guild.name} (${message.guild.id}) Sunucusundan ${message.author} (${message.author.id}) Tarafından ${reason} Sebebiyle Yasaklandın.`)
        member.ban({reason: reason})
                    message.channel.send(
            new Discord.RichEmbed()
             .setAuthor(`⚜️ YASAKLANDI ⚜️`)
             .setColor('0x2f3136')
             .setDescription(`**<@${member.id}>** Kullanıcısı, **<@${message.author.id}>** Tarafından Sunucudan Yasaklandı.`)

            ).then(msg => msg.delete(5000));
  
  
  
  
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＭＥＴＩＮＬＥＲ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
        const embed = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setColor('GREEN')
.setDescription(`<@${user.id}> (\`${user.id}\`) üyesi sunucudan yasaklandı.

• Sebep: \`${reason}\``)
kanal.send(embed)

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＥＸＴＲＡ ＬＯＧ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

        const savelog = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setColor(`GREEN`)
  .setDescription(`• Yetkili: <@${message.author.id}> | \`${message.author.id}\`
• Banlanan Kullanıcı: ${user} | \`${user.id}\`
• Sebebi: \`${reason}\`
• Kanal: \`${message.channel.name}\`
`)
.setTimestamp()
save.send(savelog)

}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Etiketlediğiniz kişiyi sebebi ile sunucudan banlar.',
	usage: 'ban kişi sebep',
  kategori: '**MODERASYON**',
  permLvl: '**Bulunmuyor.** (.ban-yetkilisi ayarla)'
};