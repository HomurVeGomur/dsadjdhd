require("express")().listen(1343);
const ayarlar = require("./ayarlar.json");
const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
const fetch = require("node-fetch");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(` Bot Pinglenmedi`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://canary-difficult-match.glitch.me/`);//buraya showlinkini ekle
}, 280000);
let prefix = ayarlar.prefix;
let token = ayarlar.token;
let durum = ayarlar.durum;

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: durum }, status: "online" }); // bot durumu; idle, dnd, online
});

client.login(process.env.token);

setInterval(() => {
  var links = db.get("links");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pong! Requests sent");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("links"))) {
    db.set("links", []);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == `${prefix}add`) {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("links")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send(
            new discord.MessageEmbed()
              .setCıkır("RED")
              .setDescription(
                `> **<a::> \`Error Link\` \n\n Bot **Already added our system** Please Enter **Other** **Links**`
              )
              .setThumbnail(
                message.author.avatarURL({
                  dynamic: true,
                  format: "png",
                  size: 1024
                })
              )
              .setTimestamp()
              .setFooter(
                `Request by: ${message.author.tag}!`,
                message.author.avatarURL()
              )
          );
        message.channel.send(
          new discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `> <:bloboof:1058596434359890052> \`Successfully\` \n\n Your bot succcessfully added our system. \n\n Thanks choose our bot.`
            )
            .setThumbnail(
              message.author.avatarURL({
                dynamic: true,
                format: "png",
                size: 1024
              })
            )
            .setTimestamp()
            .setFooter(
              `Request by: ${message.author.tag}!`,
              message.author.avatarURL()
            )
        );
        db.push("links", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(
          new discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
              `> **False used!** \n\n You already and either entered error links.\n\n **Use example:** \n > ${prefix}add <link> \n `
            )
            .setThumbnail(
              message.author.avatarURL({
                dynamic: true,
                format: "png",
                size: 1024
              })
            )
            .setTimestamp()
            .setFooter(
              `Request by: ${message.author.tag}!`,
              message.author.avatarURL()
            )
        );
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == `${prefix}links`) {
    var link = spl[1];
    message.channel.send(
      new discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Erasty code Uptime System`)
        .setDescription(
          `**\`${db.get("links").length}\`** bot project and **\`${
            client.guilds.cache.size
          }\`** bot get supported.\n\n> If have add your own bot on our system **\`${prefix}add\`** use by command. \n\n  Free Nitro Uptime have a good days.`
        )
        .setThumbnail(
          message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })
        )
        .setTimestamp()
        .setFooter(
          `Request by: ${message.author.tag}!`,
          message.author.avatarURL()
        )
    );
  }
});


client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get("1059428680729890856");
  console.log("**Bot Ses Kanalına bağlandı !**");
  if (botVoiceChannel)
    botVoiceChannel
      .join()
      .catch(err => console.error("**Bot ses kanalına bağlanamadı !**"));
});