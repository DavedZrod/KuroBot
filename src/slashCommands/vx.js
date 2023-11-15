module.exports = {
	data: {
		name: 'vx',
		description: 'Description here',
		options: [
			{
				name: 'text',
				description: 'The text you want to send',
				type: 3,
				required: true,
			},
		],

	},
	run: ({ interaction, client, handler, }) => {
		//console.log(interaction.options)
		const userInput = interaction.options.getString("text");
		console.log(` Text: ${userInput}`)

		//define a twt link
		const twitterLinkRegex = /https:\/\/twitter\.com\/\w+\/status\/\d+/g;
		//define a link with no embed
		const noEmbed = /^<.+>$/;
		const normalTwitterLink = /https:\/\/twitter\.com/g;
		if (twitterLinkRegex.test(userInput)) {
			console.log('Twitter link detected');
			if (noEmbed.test(userInput)) {
				console.log('Twt link with no embed');
			}
			else {
				console.log('twt link with embed(?) attempting to replace with vx..');

				const replacedText = userInput.replace(normalTwitterLink, 'https://vxtwitter.com');

				interaction.reply({
					content: `${interaction.member}**:** ${replacedText}`,
					allowedMentions: { repliedUser: false },
				})
				console.log(`${interaction.member}**:** ${replacedText}`);
				return;
			}
		}
		//only runs if either no twitter links and/or the twitter link has no embed
		console.log('What do?')
		interaction.reply({
			content: 'No valid embedded twitter links, You should send it yourself \nDid you mistakenly paste the link with <>? Currently only works on twitter.com links',
			ephemeral: true,
		});

	},
	options: {
		deleted: false,
	},
};