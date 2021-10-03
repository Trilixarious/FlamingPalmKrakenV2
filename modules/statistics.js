
const cron = require('node-cron');
var knownUserCache = [];

module.exports = function (client) {
    //client.log("loading statistics module");
    client.DBconnection.query(
        'Select ID from Members', function (error, results, fields) {
            if(error != null){ client.log(error)}
            results.forEach(result => knownUserCache.push(result.ID))
        });
    cron.schedule('30 0,15,30,45 * * * *', () => {
        client.log('running statistics tracking cron job');
        client.DBconnection.query(
            'Select ID from Channel', function (error, results, fields) {
                if(error != null){ client.log(error)}
                var trackedChannels = [];
                results.forEach(result => trackedChannels.push(result.ID));
                trackedChannels.forEach(channelID =>{
                    client.channels.fetch(channelID, false)
                    .then(channel => Array.from(channel.members.values()).forEach(member => {
                        if(!knownUserCache.includes(member.id)){
                            client.DBconnection.query(
                                'INSERT INTO Members (ID,DisplayName,avatar) VALUES (?,?,?)',
                                [member.user.id, member.user.username, member.user.avatar], function (error, results, fields) {
                                    if(error != null){ client.log(error)}
                                });
                            knownUserCache.push(member.id)
                        }
                        client.DBconnection.query(
                        'INSERT INTO VoiceConnected (ID, ChannelID) VALUES (?, ?)',
                        [member.user.id, channelID], function (error, results, fields) {
                            if(error != null){ client.log(error)}
                        });
                    }) )
                    .catch( err => client.log(err));
                });   
            });
    });
}



