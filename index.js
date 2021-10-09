// Require the necessary discord.js classes
const fs = require('fs');
const { Client,Collection, Intents } = require('discord.js');
const { token,DBHOST,DBPASS } = require('./config.js');

const { PrismaClient } = require( '@prisma/client');
const mysql = require('mysql');
//const Islander = require('./islander/Islander')



class ClientDecorator extends Client{
    constructor(){
        super({
            intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.DIRECT_MESSAGES],
            partials: ['MESSAGE', 'CHANNEL', 'REACTION']
         });
         this.DBconnection = mysql.createPool({
            connectionLimit : 10,
            host            : DBHOST,
            user            : 'root',
            password        : DBPASS,
            database        : 'discordstats'
          });
        
        this.prisma = new PrismaClient()
        this.logChannel;
        //this.islander = new Islander(this);
    }
    log(loggText){
        console.log(loggText);
        //test
    }
    channelLog(){
        this.logChannel.send(loggText.toString());
    }
}
global.client = new ClientDecorator();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord with your client's token
client.login(token);