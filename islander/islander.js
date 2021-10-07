const { prisma } = require('.prisma/client');
const cron = require('node-cron');

class Islander {
	constructor(client){
		this.client = client;
	}
	GetIsland( memberID){
		return new Promise(async function(resolve,reject) {
			client.prisma.members.findUnique( {
				where: {
					ID: memberID
				},
				include: {
					i_Island: {
						include: {
							i_Building_Island: {
								include: {
									i_Building: true,
								}
							}
						}
					},
				},
			}).then( member => console.log(member));

			// client.DBconnection.query(
			// 	'SELECT * FROM Island where ID = ?',[memberID], function (error, results, fields) {
			// 		if(error != null){ client.log(error);}
			// 		if(results.length == 1 ) resolve(  new Island(results[0]));
			// 		reject();
			// 	});
		 });

		
		// return new Promise(function(resolve,reject) {
		// client.DBconnection.query(
		// 	'SELECT * FROM Island where ID = ?',[memberID], function (error, results, fields) {
		// 		if(error != null){ client.log(error);}
		// 		if(results.length == 1 ) resolve(  new Island(results[0]));
		// 		reject();
		// 	});
		// });
	}

	SpawnIsland( memberID){
		// island = await prisma.island.create({
			
		// })
		// client.DBconnection.query(
		// 	'INSERT INTO Island (ID) VALUES (?)',[memberID], function (error, results, fields) {
		// 		if(error != null){ client.log(error); }
		// 		return error == null;
		// 	});
	}
}

module.exports = Islander;