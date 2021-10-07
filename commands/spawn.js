const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spawn')
		.setDescription('Create a brand new island'),
	async execute(interaction) {
        wasMade = client.islander.SpawnIsland(interaction.member.user.id);
		await interaction.reply({ content: "succesfull island spawn: " + wasMade , ephemeral: true });
	},
    isGuild: true
};