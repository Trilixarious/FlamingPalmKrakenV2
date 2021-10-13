//const cron = require('node-cron');

class Islander {
	constructor(client){
		this.client = client;
	}
	GetMemberIsland( memberID){
		return new Promise(async function(resolve,reject) {
			client.prisma.members.findUnique( {
				where: {
					ID: memberID,
				},
				include: {
					i_Island: {
						include: {
							i_Building_Island: {
								include: {
									i_Building: true,
									i_BuildingLevel: true
								}
							}
						}
					}
				}
			}).then( member => resolve(member));
		 });
	}

	SpawnIsland(memberID){
		return new Promise(async function(resolve,reject) {
			let island = await client.prisma.i_Island.create({
				data:{
					ID: memberID,
					Wood: 50,
					i_Building_Island: {
						create: [
							{BuildingID: 1,level: 1},
							{BuildingID: 2,level: 1},
							{BuildingID: 3,level: 1},
							{BuildingID: 4,level: 1},
						]
					}
				}
			});
			resolve(island);
		});
	}

	GetBuildable(memberID){
		return new Promise(async function(resolve,reject) {
			let member = await client.islander.GetMemberIsland(memberID);
			let buildings = await client.prisma.i_BuildingLevel.findMany({
				where:{
					TClevel:{lte: member.i_Island.i_Building_Island[0].level + 1},
					Level: 1,
					BuildingID: {notIn: member.i_Island.i_Building_Island.map(x => x.BuildingID)}
				}
			})
			resolve({ m: member,b: buildings});
		});
	}

	GetUpgradable(memberID){
		return new Promise(async function(resolve,reject) {
			let member = await client.islander.GetMemberIsland(memberID);
			let buildings = await client.prisma.i_BuildingLevel.findMany({
				where:{
					//TClevel:{lte: member.i_Island.i_Building_Island[0].level},
					BuildingID: {in: member.i_Island.i_Building_Island.map(x => x.BuildingID)}
				}
			})
			buildings = buildings.filter(x => x.Level == (member.i_Island.i_Building_Island.find(q => q.BuildingID == x.BuildingID).level)+1)
			resolve({ m: member,b: buildings});
		});
	}
}

module.exports = Islander;