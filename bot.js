const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

// EVERYONE VE HERE \\
let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);
client.on("message", async function(msg) {
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.member.roles.find("name", "Owner Of  Bruh")) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg
              .reply("maalesef `everyone` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("maalesef `here` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }
    }
  }
});
// EVERYONE VE HERE \\

// CAPSLOCK \\

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `✋ ${msg.author},Bu sunucuda, büyük harf kullanımı engellenmekte!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

// CAPSLOCK \\

// CHAT LOG \\
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  var yapan = message.author;

  var kanal = await db.fetch(`chatlog_${message.guild.id}`);
  if (!kanal) return;
  var kanalbul = message.guild.channels.find("name", kanal);

  const chatembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Silindi!`, yapan.avatarURL)
    .addField("Kullanıcı Tag", yapan.tag, true)
    .addField("ID", yapan.id, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(yapan.avatarURL);
  kanalbul.send(chatembed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;

  var yapan = oldMsg.author;

  var kanal = await db.fetch(`chatlog_${oldMsg.guild.id}`);
  if (!kanal) return;
  var kanalbul = oldMsg.guild.channels.find("name", kanal);

  const chatembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Mesaj Düzenlendi!`, yapan.avatarURL)
    .addField("Kullanıcı Tag", yapan.tag, true)
    .addField("ID", yapan.id, true)
    .addField("Eski Mesaj", "```" + oldMsg.content + "```")
    .addField("Yeni Mesaj", "```" + newMsg.content + "```")
    .setThumbnail(yapan.avatarURL);
  kanalbul.send(chatembed);
});
// CHAT LOG \\

// REKLAM \\
client.on("message", async message => {
  if (message.member.roles.find("name", "Owner Of  Bruh")) return;
  let links = message.content.match(
    /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi
  );
  if (!links) return;
  if (message.deletable) message.delete();
  message.channel.send(`Hey ${message.author}, sunucuda link paylaşamazsın!`);
});
// REKLAM \\

// KANAL KORUMA \\
client.on("channelDelete", async channel => {
  if (!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });
  let member = guild.members.get(logs.entries.first().executor.id);
  if (!member) return;
  if (member.hasPermission("ADMINISTRATOR")) return;
  channel
    .clone(channel.name, true, true, "Kanal silme koruması sistemi")
    .then(async klon => {
      if (!db.has(`korumalog_${guild.id}`)) return;
      let logs = guild.channels.find(
        ch => ch.id === db.fetch(`korumalog_${guild.id}`)
      );
      if (!logs) return db.delete(`korumalog_${guild.id}`);
      else {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Silinen Kanal: <#${klon.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`
          )
          .setColor("RED")
          .setAuthor(member.user.tag, member.user.displayAvatarURL);
        logs.send(embed);
      }
      await klon.setParent(channel.parent);
      await klon.setPosition(channel.position);
    });
});
// KANAL KORUMA \\

// BAN LİMİT \\
client.on("guildBanAdd", async (guild, user) => {
  if (guild.id !== "412157160064155660") return; //ID kısmına sunucu ID'nizi giriniz.
  const banlayan = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  let banlayancek = guild.members.get(banlayan.exucutor.id);
  if (banlayancek.bot) return;

  let banlar = await db.fetch(`banlayaninbanlari_${banlayancek.id}`);
  if (!banlar) {
    db.set(`banlayaninbanlari_${banlayancek.id}`, 1);
    return;
  }

  let limit = "3"; // 3 kısmına ban limitinin kaç olmasını istiyorsanız yazınız.
  if (banlar >= limit) {
    guild.member.kick(user, {
      reason: "CODE, Atıldınız. (Ban limitinizi aştınız.)"
    });
    db.delete(`banlayaninbanlari_${banlayancek.id}`);
    return;
  }

  db.add(`banlayaninbanlari_${banlayancek.id}`, 1);
});
// BAN LİMİT \\

// GÖRSEL \\
client.on("message", m => {
  let kanal = m.guild.channels.find("name", "photo-chat"); // uyari yerine kanal adınızı yazınız.

  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      `${m.author}, photo chat kanalına resim harici bir şey göndermek yasak olduğundan dolayı mesajınız silindi.`
    )
    .setTimestamp();

  if (m.author.id === m.guild.ownerID) return;
  if (m.channel.id !== "770685599899189298") {
    // Buraya o kanalın ID'si yazılacaktır.
    return;
  }
  if (m.author.id === m.guild.ownerID) return;
  if (m.attachments.size < 1) {
    m.delete().then(kanal.send(embed));
  }
});
// GÖRSEL \\

//GÜNAYDIN\\
client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes("günaydın"))
    msg.reply(" 🌕 Sana da Günaydın");
  if (msg.content.toLowerCase().includes("herkese günaydın"))
    msg.reply("🌞 Günaydın :)");
  if (msg.content.toLowerCase().includes("iyi geceler"))
    msg.reply(" 🌙 Sana da iyi geceler");
  if (msg.content.toLowerCase().includes("iyi akşamlar"))
    msg.reply("🌓 sana da iyi akşamlar");
  if (msg.content.toLowerCase().includes("hayırlı sahurlar"))
    msg.reply("🍳 Hayırlı Sahurlar");
  if (msg.content.toLowerCase().includes("Hayırlı Sahurlar"))
    msg.reply("🍳 Hayırlı Sahurlar");
  if (msg.content.toLowerCase().includes("hayırlı iftarlar"))
    msg.reply("🍔 🍟 Hayırlı İftarlar");
  if (msg.content.toLowerCase().includes("ne zaman çıkıcak"))
    msg.reply("Belli bir tarihi yok mayısın sonu diye söylenti var");
});

client.on("ready", () => {
  client.channels.get("771152351263195196").join();
});
//GÜNAYDIN\\

//OTOROLE\\
client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
  let otorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
  let arole = otorole[member.guild.id].sayi;
  let giriscikis = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("Otorol Sistemi")
    .setDescription(
      `:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `
    )
    .setColor("GREEN")
    .setFooter("XiR", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(763037119882592276);
    giriscikiskanali.send(
      `:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`
    );
  } catch (e) {
    // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e);
  }
});
//Kullanıcı sunucudan ayrıldığında ayarlanan kanala mesaj gönderelim.
client.on("guildMemberAdd", async member => {
  let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
  let role = autorole[member.guild.id].sayi;

  member.addRole(role);
});
//OTOROLE\\

client.on("guildMemberAdd", member => {
  member.addRole("754271199797968906"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

// TAG ALANA ROL

client.on("userUpdate", async user => {
  let sunucuid = "707679335598915736"; //Buraya sunucunuzun IDsini yazın
  let tag = "Ϟ"; //Buraya tagınızı yazın
  let rol = "770373782447587379"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds
    .get(sunucuid)
    .channels.find(x => x.name == "tag-log"); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol);
      const tagalma = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(
          `<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`
        )
        .setTimestamp();
      channel.send(tagalma);
    }
  } else {
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol);
      const tagsilme = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(
          `<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`
        )
        .setTimestamp();
      channel.send(tagsilme);
    }
  }
});

//AFK\\

client.on("message", async msg => {
  if (msg.content.startsWith(ayarlar.prefix + "afk")) return;

  let afk = msg.mentions.users.first();

  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`);

  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`);
  if (afk) {
    const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`);
    const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`);
    if (msg.content.includes(kisi3)) {
      msg.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`);
    }
  }
  if (msg.author.id === kisi) {
    msg.reply(`Afk'lıktan Çıktınız`);
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`);
    msg.member.setNickname(isim);
  }
});

//YASAKLI TAG\\

client.on("guildMemberAdd", member => {
  if (member.user.username.includes("ㄔ", "❅", "yasaklı tag gir")) {
    //kod yapımcısı ben .d
    member.addRole("765631754350231563");
    member.removeRole("754271199797968906");
    member.send(
      "Sunucumuzun Yasaklı Tagında Bulunuyorsunuz, Yetkililere ulaşıp bildirebilirsiniz."
    );
  }
});


///////////////
client.on('messageDelete', message => {
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
})
/////////////////

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(codare => {
      invites[g.id] = codare;
    });
  });
});

client.on("guildMemberAdd", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;

const ei = invites[member.guild.id];
invites[member.guild.id] = codare;

const seni_kim_davet_etti = await codare.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
const ben_ettim = member.guild.members.get(seni_kim_davet_etti.inviter.id);

data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, +1);
data.add(`toplambebeğiiiiim.${ben_ettim.id}.${member.guild.id}`, +1);
  
 let zaman = require("moment").duration(new Date().getTime() - client.users.get(member.id).createdAt.getTime())
 if(zaman < 1296000000) { data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
 data.add(`fake.${ben_ettim.id}_${member.guild.id}`, +1); }
  
 data.set(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`, ben_ettim.id);
  
let ölç_bakalım = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);

let davetsayi;
if(!ölç_bakalım) { davetsayi = 0; } 
else { davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`); }
  
if(zaman < 1296000000){
member.guild.channels.get(channel).send(`**${member.user.username}** (**fake**), sunucuya **${ben_ettim.user.tag}** (**${davetsayi}**) sayesinde giriş yaptı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmedi.`)
} else {
member.guild.channels.get(channel).send(`**${member.user.username}**, sunucuya **${ben_ettim.user.tag}** (**${davetsayi}**)  sayesinde giriş yaptı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Yeni davet sayınız **${davetsayi}** olarak güncellendi.`)
  }});
});// codare

client.on("guildMemberRemove", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.get(member.id); 
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;
const seni_kim_davet_etti = await data.fetch(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`);
const ben_ettim = member.guild.members.get(seni_kim_davet_etti);
  
let zaman = require("moment").duration(new Date().getTime() - client.users.get(member.id).createdAt.getTime())

if(zaman < 1296000000){
  data.add(`fake.${ben_ettim.id}.${member.guild.id}`, -1);
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); }
} else {
  data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
  if(seni_kim_davet_etti) {
  data.delete(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`); } }
  
const davetsayi = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);
if(zaman < 1296000000){
if(!seni_kim_davet_etti) {
return member.guild.channels.get(channel).send(`**${member.user.username}** (**fake**), sunucudan çıkış yaptı. (davet eden bulunamadı)`);
} else {
member.guild.channels.get(channel).send(`**${member.user.username}** (**fake**), sunucudan çıkış yaptı. Davet eden: ${ben_ettim.user.tag} (**${davetsayi ? davetsayi : '0'}**)`); }
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna siz davet etmiştiniz, şimdi çıkış yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmeid.`)
} else {
if(!seni_kim_davet_etti) {
return member.guild.channels.get(channel).send(`**${member.user.username}**, sunucudan çıkış yaptı. (davet eden bulunamadı)`); 
} else {
member.guild.channels.get(channel).send(`**${member.user.username}**, sunucudan çıkış yaptı. Davet eden: **${ben_ettim.user.tag}** (**${davetsayi ? davetsayi : '0'}**)`); }
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna siz davet etmiştiniz, şimdi çıkış yaptı.
Yeni davet sayınız **${davetsayi}** olarak güncellendi.`)
}
})
});// codare

//////////////////

