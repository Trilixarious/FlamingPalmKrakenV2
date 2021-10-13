
const { MessageEmbed,MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');

module.exports = {
    name: "islanderUpgrade",
    async execute(interaction) {

        let response = await client.islander.GetUpgradable(interaction.user.id)

        let row1 = new MessageActionRow()
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
                    .setStyle('SECONDARY')
            );

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions(
                        response.b.map(b => {return {
                            label: b.Name + ' lvl ' + b.Level,
                            description: b.TClevel.toString(),
                            value: b.BuildingID.toString()
                        }}))
            );
        await interaction.update({ content: "Upgrades" ,components: [row1,row] , ephemeral: true });
    },
};