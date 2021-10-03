module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            client.log(error);
            await interaction.reply({ content: 'Issue executing commmand, alert niels', ephemeral: true });
        }	
    },
};