const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed,MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'store',
    data: new SlashCommandBuilder()
        .setName('store')
        .setDescription('shows the flamingpalm points store'),
    async execute(interaction) {
        let embed = new MessageEmbed()
            .setColor('#FD8612')
            .setTitle("Store")
            .setAuthor(interaction.user.username, 'https://cdn.discordapp.com/avatars/' + interaction.user.id + '/' + interaction.user.avatar, 'https://flamingpalm.com')
            .setDescription('Flamingpalm points store')
            //.setThumbnail('https://i.imgur.com/AfFp7pu.png')

            //.setImage('https://www.kenney.nl/assets/hexagon-kit/sample.png')
            .setTimestamp()
            .setFooter('Work in progress flamingpalm store', 'https://flamingpalm.com/images/FlamingPalmLogoSmall.png');
        let rewards = await client.prisma.reward.findMany({
            include:{RewardItem: true}
        })
        rewards.forEach(reward =>{
            embed.addField(reward.Title, `${reward.Description }\n **${reward.Price}:palm_tree:**` , false);
        })
        let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://flamingpalm.com/members')
                    .setLabel('Redeem on website')
                    .setStyle('LINK'));
        interaction.reply({embeds: [embed], content: "store is still work in progress",components: [row], ephemeral: false});
    },
    isGuild: true
};