module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Issue executing commmand, alert niels', ephemeral: true });
        }	
    },
};