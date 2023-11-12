//commands.js

//Ping command
function pingCommand(message) {
	const startTime = Date.now(); 

	message.reply({
		content: "Right back at 'ya!", allowedMentions: {
			repliedUser: false
		}
	})
		.then((pingMsg) => {
			//calculate latency
			const botLatency = pingMsg.createdTimestamp - startTime;
			//calculate bot response time
			const responseTime = Date.now() - startTime;
			//edit the ping msg
			pingMsg.edit({
				content: `Right back at 'ya! \nBot Latency: \`${botLatency}ms\` \nResponse Time: \`${responseTime}ms\``, allowedMentions: {
					repliedUser: false
				}
			})
			console.log('pinged back')
		})
}
//shutdown command
function shutdownCommand(message, botOwnerID, client) {
	if (message.author.id == botOwnerID) {
		console.log('Shutting down...')
		message.channel.send('Shutting down...')
			.then(() => {
				process.exit(0);
			});
	} else {
		message.channel.send('You dont have the permission')
	}
}
module.exports = {
	pingCommand,
	shutdownCommand
};
