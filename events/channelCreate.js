module.exports = {
	name: 'channelCreate',
	execute(channel) {
        if(channel instanceof (client.discord.VoiceChannel)){
            if(channel.guild.id == "530537522355240961"){
                console.log("new flaming palm voice channel made");
                client.DBconnection.query(
                    'INSERT INTO Channel (ID,ChannelName) VALUES (?,?)',[channel.id,channel.name], function (error, results, fields) {
                        if(error != null){ console.log(error);}
                    });
            }
        }	
    },
};