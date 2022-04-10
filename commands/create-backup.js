const backup = require('discord-backup');
const config = require('../config.json');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(":x: Vous devez disposer de l'autorisation **ADMINISTRATEUR** pour créer une sauvegarde sur ce serveur.");
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Sauvegarde créée ! Voici son identifiant ❤️ : `'+backupData.id+'`! Utilise `'+config.prefix+'load-backup '+backupData.id+'` pour charger la sauvegarde sur un autre serveur !');

    }).catch(() => {

        return message.channel.send(":x: Une erreur s'est produite, veuillez vérifier si le bot est administrateur !");

    });

};
