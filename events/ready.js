module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.logChannel = client.channels.cache.get("894190067747262464");
		console.log(client.logChannel);
		client.log(`Ready! Logged in as ${client.user.tag}`);
		client.channels.fetch("561128481384300554").then()
		.then(channel => channel.messages.fetch({limit: 100})) 
		.catch( err => client.log(err)
		);
		require("../modules/statistics.js")(client);
		require("../modules/webapi.js")(client);
	},
};