const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');
  
  if(!message.member.roles.some(r => ["708528748651085867" , "770668257367687179"].includes(r.id))) // rol ıd kısmına yetkili ıd yaz
    return message.reply("Bu Komutu Kullanmak İçin Yeterli Yetkin Bulunmamakta !")
  
//------------------------CONST KISMI------------------------\\
  
//---------TAG---------\\
let tag = 'Ϟ'
//---------TAG---------\\

//----------------------------Hesap Kısmı------------------------------\\
const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
let count = 0;
for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
//----------------------------Hesap Kısmı------------------------------\\
  
//----------------------------Dokunma Bu Kısma------------------------------\\
const çevirimiçi = message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size
const toplam = message.guild.memberCount
const ttag = message.guild.members.filter(m => m.user.username.includes(tag)).size
//----------------------------Dokunma Bu Kısma------------------------------\\
  
//------------------------CONST KISMI------------------------\\
                                                                                                    


//------------------------SAY KISMI------------------------\\
    const strigaembed = new Discord.RichEmbed()
        .setColor("0xb900b0")
    .setDescription(`\`>\` Sunucuda **${toplam}** adet üye.
\`>\` Şu anda toplam **${count}** kişi seslide. 
\`>\` Toplamda **${ttag}** taglı üye ailemizin bir parçası.`)
    message.channel.send(strigaembed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [""],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
}