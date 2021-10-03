class Islander {
	constructor(client){
		this.client = client;
	}
	GetIslandStats(){
		client.DBconnection.query(
			'Select ID from Members', function (error, results, fields) {
				if(error != null){ client.log(error)}
				results.forEach(result => knownUserCache.push(result.ID))
			});
	}
}

module.exports = Islander;