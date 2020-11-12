////////////////////////////////////////////
let rolid = "765631754350231563"; // BURAYA KULLANICININ TÜM ROLLERİ ALINDIKTAN SONRA VERİLECEK ROLÜN İDSİNİ YAZIN YAZMAZSANIZ TÜM ROLLERİ ALIR SADECE. 
///////////////////////////////////////////
exports.run = async (client, message, args) => {
  if (!message.member.roles.has("708528748651085867"))
    return message.channel.send(
      `Bu komutu kullanabilmek için <Owner Of Bruh> yetkisine sahip olmasınız.`
    );
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**Yetkin yok.**");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.channel.send("**Hapishaneye Atılacak Üyeyi Etiketleyin**");
    if(rolid.match(/(\d{17,19})/g)) {
        member.roles.forEach(role => member.removeRole(role));
        member.addRole(rolid);
    }
    else member.roles.forEach(role => member.removeRole(role));
    return message.channel.send(`**Kullanıcının tüm rolleri ${rolid.match(/(\d{17,19})/g) ? `alınıp \`${message.guild.roles.get(rolid).name}\` rolü verildi.**` : 'alındı.**'}`);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["hapset"],
    permLevel: 0
};

exports.help = {
    name: "jail",
    description: 'Birini jaillersiniz.',
    usage: 'jail <kullanıcı>'
};
