const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(":x: Vous devez disposer de l'autorisation **ADMINISTRATEUR** pour créer une sauvegarde sur ce serveur.");
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send(':warning: Tous les canaux, rôles et paramètres du serveur seront effacés. Voulez-vous continuer? Envoyez `-confirm` or `cancel` !');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('Sauvegarde chargée avec succès !');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                    return message.channel.send(":x: Aucune sauvegarde trouvée pour l'ID '+backupID+'!");
                else
                    return message.channel.send(":x: Une erreur s'est produite :"+(typeof err === 'string') ? err : JSON.stringify(err));
        
            });

            } else {
                return message.channel.send(':x: Action annulée.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: La commande a expiré ! Veuillez réessayer.');
        })

    }).catch(() => {
        return message.channel.send(":x: Aucune sauvegarde trouvée pour l'ID '+backupID+'!");
    });

};
