module.exports = {
	name: 'messageReactionAdd',
	execute(reaction, user) {
        if(reaction.message.channel.id  == "561128481384300554"){
            try{ 
                reaction.message.guild.roles.fetch()
                .then(
                    roles => {
                        reaction.message.guild.member(user).roles.add(Array.from(roles.cache.values()).find(val => val.name == reaction.message.content));
                    })
                .catch(err => console.log(err))
            }
            catch(e){console.log(e);}
        }
    },
};