const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on("ready", function() {
    client.user.setActivity(`#BackYourServers 🖤 | ${client.guilds.cache.size} guilds`, { type: "PLAYING" }).catch(console.error);
    console.log("C'est bon, j'ai reussi zeubi !");
  });
    
client.config = config;


fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Événement chargé : ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`👌 Commande chargée : ${commandName}`);
    });
});

client.login(config.token);
