module.exports = (client) => {
    console.log(`Prêt sous le nom de ${client.user.tag}, dans ${client.channels.cache.size} salons, dans ${client.guilds.cache.size} serveurs, pour un total de ${client.users.cache.size} utilisateurs.`);
};