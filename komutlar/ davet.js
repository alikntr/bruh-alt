const Discord = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {// chimp#0110
if(!message.member.hasPermission('MANAGE_GUILD')) return;
let prefix = '.'// botun prefixi

let ar = ['göster', 'sil', 'purge', 'süpür', 'oluştur', 'kanal-ayarla', 'kanal-sıfırla', 'kim-etti?']

if(!ar.includes(args[0])) return message.channel.send(`Argümanları kullanın:

${prefix}davet **göster** @kişi  •  Etiketlenen kişinin davet sayısını gösterir.
${prefix}davet **sil** @kişi **toplam**/**gerçek**/**sahte** **sayı**  •  Etiketlenen kişinin belirttiğiniz kadar belirttiğiniz davetini siler.
${prefix}davet **purge** @kişi  •  Etiketlenen kişinin tüm davetlerini sıfırlar.
${prefix}davet **süpür** @kişi **toplam**/**gerçek**/**sahte**  •  Etiketlenen kişinin belirttiğiniz tüm davetini siler.
${prefix}davet **oluştur**  •  Bot sizin için bir davet linki oluşturur.
${prefix}davet **kanal-ayarla**/**kanal-sıfırla** #kanal  •  Davet kanalını ayarlarsınız/sıfırlarsınız.
${prefix}davet **kim-etti?** @kişi  •  Etiketlediğin kişiyi sunucuya kimin davet ettiğini size gösterir.`)
  
if(!args[0]) return message.channel.send(`Argümanları kullanın:

${prefix}davet **göster** @kişi  •  Etiketlenen kişinin davet sayısını gösterir.
${prefix}davet **sil** **toplam**/**gerçek**/**sahte** @kişi **sayı**  •  Etiketlenen kişinin belirttiğiniz kadar belirttiğiniz davetini siler.
${prefix}davet **purge** @kişi  •  Etiketlenen kişinin tüm davetlerini sıfırlar.
${prefix}davet **süpür** **toplam**/**gerçek**/**sahte** @kişi  •  Etiketlenen kişinin belirttiğiniz tüm davetini siler.
${prefix}davet **oluştur**  •  Bot sizin için bir davet linki oluşturur.
${prefix}davet **kanal-ayarla**/**kanal-sıfırla** #kanal  •  Davet kanalını ayarlarsınız/sıfırlarsınız.
${prefix}davet **kim-etti?** @kişi  •  Etiketlediğin kişiyi sunucuya kimin davet ettiğini size gösterir.`)
  
  
  if(args[0] === 'sil') {
  let mention = message.mentions.users.first()
  if(!args[1]) return message.channel.send(`Birini etiketlemelisin.`)
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
    
  if(!args[2]) return message.channel.send(`${mention} kişinin hangi davetlerini sileceğini belirtmelisin: toplam/gerçek/sahte`)
  let yo = ['toplam', 'gerçek', 'sahte']
  if(!yo.includes(args[2])) return message.channel.send(`Sadece, toplam/gerçek/sahte davetlerini silebilirsin.`)
  
  const say_baştan = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  if(!say_baştan) return message.channel.send(`Bu kişinin hiç daveti yok.`)
    
  if(args[2] === 'toplam') {
  const say_baştan = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  if(!say_baştan) return message.channel.send(`Bu kişinin hiç daveti yok.`)
    
  if(!args[3]) return message.channel.send(`Ne kadar davet sileceğini de yazmalısın..`)
  if(isNaN(args[3])) return message.channel.send(`Sadece sayı girebilirsin.`)
  if(say_baştan < args[3]) return message.channel.send(`Bu kişinin ${args[3]} **toplam** daveti yok.`)
  if(say_baştan === args[3]) return message.channel.send(`Kişinin tüm davetlerini silmek için ${prefix}davet **süpür** @kişi **toplam** komutunu kullan.`)
  message.channel.send(`${mention} kişisinin ${args[3]} kadar **toplam** daveti silindi: Kalan daveti: **${say_baştan}**`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${args[3]}** kadar **toplam** davetin silindi: Kalan davetin: **{say_baştan}**`)
  data.add(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`, -args[3]) } 
  
  if(args[2] === 'gerçek') {
  const say_baştan = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
  if(!say_baştan) return message.channel.send(`Bu kişinin hiç gerçek daveti yok.`)
    
  if(!args[3]) return message.channel.send(`Ne kadar davet sileceğini de yazmalısın..`)
  if(isNaN(args[3])) return message.channel.send(`Sadece sayı girebilirsin.`)
  if(say_baştan < args[3]) return message.channel.send(`Bu kişinin ${args[3]} **gerçek** daveti yok.`)
    
  const gerçek = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
  if(gerçek === args[3]) return message.channel.send(`Kişinin tüm davetlerini silmek için ${prefix}davet **süpür** @kişi **gerçek** komutunu kullan.`)

  message.channel.send(`${mention} kişisinin ${args[3]} kadar **gerçek** daveti silindi: Kalan daveti: **${gerçek}**`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${args[3]}** kadar **gerçek** davetin silindi: Kalan davetin: **${gerçek}**`)
  data.add(`chimp.${mention.id}.${message.guild.id}`, -args[3]) } 
  
  if(args[2] === 'sahte') {
  const say_baştan = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
  if(!say_baştan) return message.channel.send(`Bu kişinin hiç sahte daveti yok.`)
    
  if(!args[3]) return message.channel.send(`Ne kadar davet sileceğini de yazmalısın..`)
  if(isNaN(args[3])) return message.channel.send(`Sadece sayı girebilirsin.`)
  if(say_baştan < args[3]) return message.channel.send(`Bu kişinin ${args[3]} **sahte** daveti yok.`)
    
  const sahte = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
  if(sahte === args[3]) return message.channel.send(`Kişinin tüm davetlerini silmek için ${prefix}davet **süpür** @kişi **sahte** komutunu kullan.`)

  message.channel.send(`${mention} kişisinin ${args[3]} kadar **sahte** daveti silindi: Kalan daveti: **${sahte}**`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${args[3]}** kadar **sahte** davetin silindi: Kalan davetin: **${sahte}**`) }  
  data.add(`fake.${mention.id}.${message.guild.id}`, -args[3])
  }
  
  if(args[0] === 'purge') {
  let mention = message.mentions.users.first()
  if(!args[1]) return message.channel.send(`Birini etiketlemelisin.`)
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
    
  const say_baştan = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  if(!say_baştan) return message.channel.send(`Bu kişinin hiç daveti yok.`)
    
  const gerçek = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
  const sahte = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
  const toplam = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  
  message.channel.send(`${mention} kişisinin **${gerçek}** gerçek daveti, **${sahte}** sahte daveti ve **${toplam}** toplam daveti yok oldu. :)`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${gerçek}** gerçek davetin, **${sahte}** sahte davetin ve **${toplam}** toplam davetin yok edildi.`)
  await data.add(`chimp.${mention.id}.${message.guild.id}`, -gerçek) 
  await data.add(`fake.${mention.id}.${message.guild.id}`, -sahte)
  await data.add(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`, -toplam) }
  
  if(args[0] === 'süpür') {
  let mention = message.mentions.users.first()
  if(!args[1]) return message.channel.send(`Birini etiketlemelisin.`)
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
    
  if(!args[2]) return message.channel.send(`${mention} kişinin hangi davetlerini sileceğini belirtmelisin: toplam/gerçek/sahte`)
  let yo = ['toplam', 'gerçek', 'sahte']
  if(!yo.includes(args[2])) return message.channel.send(`Sadece, toplam/gerçek/sahte davetlerini silebilirsin.`)
  
  const say_baştan = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  if(!say_baştan) return message.channel.send(`Bu kişinin hiç daveti yok.`)
    
  const gerçek = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
  const sahte = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
  const toplam = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)  
  
  if(args[1] === 'toplam') {
  message.channel.send(`${mention} kişisinin **${toplam}** toplam daveti yok oldu. :)`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${toplam}** toplam davetin yok edildi.`)
  await data.add(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`, -toplam) }

  if(args[1] === 'gerçek') {
  message.channel.send(`${mention} kişisinin **${gerçek}** gerçek daveti yok oldu. :)`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${gerçek}** gerçek davetin yok edildi.`)
  await data.add(`chimp.${mention.id}.${message.guild.id}`, -gerçek) }
  
  if(args[1] === 'sahte') {
  message.channel.send(`${mention} kişisinin **${sahte}** sahte daveti yok oldu. :)`)
  mention.send(`**${message.guild.name}** sunucusunda **${message.author.username}** tarafından **${sahte}** sahte davetin yok edildi.`)
  await data.add(`fake.${mention.id}.${message.guild.id}`, -sahte) }  
  
  }
  
  if(args[0] === 'kim-etti?') {
  if(!args[1]) return message.channel.send(`Birini etiketlemelisin.`)
    
  let mention = message.mentions.users.first();
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
  const asd = await data.fetch(`seni_kim_davet_etti?.${mention.id}.${message.guild.id}`)
  if(!asd) return message.channel.send(`Davet eden kişi bulunamadı.`)
    
  const embed = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTitle(`${mention.username}:`)
  .setDescription(`Davet eden: ${client.users.get(asd)}`)
  .setColor('BLUE')
  .setTimestamp()
  .setFooter(`Codare`)
  message.channel.send(embed)
  }
  
  if(args[0] === 'göster') {
  if(!args[1]) return message.channel.send(`Birini etiketlemelisin.`)
    
  let mention = message.mentions.users.first();
  if(!mention) return message.channel.send(`Etiketlediğin kişiyi bulamıyorum.`)
    
  const gerçek = await data.fetch(`chimp.${mention.id}.${message.guild.id}`)
  const sahte = await data.fetch(`fake.${mention.id}.${message.guild.id}`)
  const toplam = await data.fetch(`toplambebeğiiiiim.${mention.id}.${message.guild.id}`)
  
  const embed = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTitle(`${mention.username}:`)
  .setDescription(`Toplam: ${toplam ? toplam : '0'} | Gerçek: ${gerçek ? gerçek : '0'} | Fake(sahte): ${sahte ? sahte : '0'}`)
  .setColor('BLUE')
  .setTimestamp()
  .setFooter(`Codare`)
  message.channel.send(embed) } 
  
  if(args[0] === 'oluştur') {
  let invite = await message.channel.createInvite({
      maxAge: args.age * 60,
      maxUses: args.uses
    });
  return message.channel.send(`Kodun başarıyla oluşturuldu: **${invite.code}** (discord.gg/**${invite.code}**)`)
  }
  
  if(args[0] === 'kanal-ayarla') {
  const asd = await data.fetch(`kanal.${message.guild.id}`)
  if(asd) return message.channel.send(`Sistemin kanalı zaten ayarlı: ${client.channels.get(asd)}`)
  let ment = message.mentions.channels.first()
  if(!args[1]) return message.channel.send(`Bir kanal etiketlemelisin.`)
  if(!ment) return message.channel.send(`Etiketlediğin kanalı bulamıyorum.`)
  data.set(`kanal.${message.guild.id}`, ment.id)
  message.channel.send(`Davet logunun tutulacağı kanal ${ment} olarak ayarlandı.`)
  }
  
  if(args[0] === 'kanal-sıfırla') {
  const asd = await data.fetch(`kanal.${message.guild.id}`)
  if(!asd) return message.channel.send(`Sistemin kanalı zaten ayarlı değil.`)

  data.delete(`kanal.${message.guild.id}`)
  message.channel.send(`Davet logunun tutulacağı kanal sıfırlandı.`)
  }
 
};
 exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ranks', 'rank'],
    permLevel: 0
};
exports.help = {
    name: 'davet'
};// codare