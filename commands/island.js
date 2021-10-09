const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed,MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('island')
		.setDescription('Check progress on your island'),
	async execute(interaction) {
        client.islander.GetIsland(interaction.user.id).then(island =>  {
            const embed = new MessageEmbed()
            .setColor('#FD8612')
           
            .setTitle( interaction.user.username + "'s island")
            //.setURL('https://discord.js.org/')
            .setAuthor('Islander', 'https://flamingpalm.com/images/FlamingPalmLogoSmall.png', 'https://flamingpalm.com/Islander')
            //.setDescription('Some description here')
            //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Town center', value: 'lvl '+ island.buildings.find( x => x.name = "TownCenter").level  },
                //{ name: '\u200B', value: '\u200B' },
                
            )
            .setImage('https://www.kenney.nl/assets/hexagon-kit/sample.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://flamingpalm.com/images/FlamingPalmLogoSmall.png');
            console.log(island);
            island.buildings.filter(x => x.name != "TownCenter" ).forEach((b) =>{
                if( b.level > 0 ){
                    embed.addField(b.name, 'lvl ' + b.level, true);
                }
            });

            const hiddenEmbed = new MessageEmbed()
            .setColor('#98FFFF')
            .setTitle( "your private stats")
            //.setURL('https://discord.js.org/')
            //.setAuthor('Islander', 'https://flamingpalm.com/images/FlamingPalmLogoSmall.png', 'https://flamingpalm.com/Islander')
            .setDescription(island.Wood+'🪵 '+island.Stone+'🧱 '+island.Food+'🍞 '+island.Currency+'🪙')
            .setImage('https://flamingpalm.com/images/banner.png')
            .addFields(
                { name: 'Units', value: 'no units '  },
                { name: 'Expeditions', value: 'no active expeditions'},
                //{ name: '\u200B', value: '\u200B' },
                
            )
            
            //interaction.channel.send({ embeds: [exampleEmbed] });
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('islanderBuild')
					.setLabel('Build')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('islanderUpgrade')
					.setLabel('Upgrade')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('islanderBuyUnits')
					.setLabel('Buy units')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('islanderBuyShips')
					.setLabel('Buy ships')
					.setStyle('SECONDARY'),
                new MessageButton()
					.setCustomId('islanderExpedition')
					.setLabel('Start expedition')
					.setStyle('SECONDARY'),
			);

            interaction.reply({ embeds: [embed] , ephemeral: false });
            interaction.followUp({ embeds: [hiddenEmbed] , components: [row] ,ephemeral: true });
        },error =>{
             interaction.reply({ content: "Island not avaible", ephemeral: true });
        });
	},
    isGuild: true
};