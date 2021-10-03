module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.channels.fetch("561128481384300554").then()
		.then(channel => channel.messages.fetch({limit: 100})) 
		.catch( err => console.log(err)
		);
	},
};