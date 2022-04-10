const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(":x: Vous devez disposer de l'autorisation **ADMINISTRATEUR** pour créer une sauvegarde sur ce serveur.");
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(':x: Veuillez spécifier un ID de sauvegarde valide !');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('ℹ️ Sauvegarde | MyBackups', backup.data.iconURL)
            .addField('Nom du serveur:', backup.data.name)
            .addField('Taille de la sauvegarde:', backup.size + ' kb')
            .addField('Créé à:', formattedDate)
            .setFooter('ID de sauvegarde: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send(":x: Aucune sauvegarde trouvée pour l'ID '+backupID+'!");
        else
            return message.channel.send(":x: Une erreur s'est produite :"+(typeof err === 'string') ? err : JSON.stringify(err));

    });

};
