const Discord = require("discord.js");
const { Client, IntentsBitField, TextChannel } = require('discord.js');
const keepAlive = require("../server");

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

const token = process.env['TOKEN'];
const botOwnerID = process.env['botOwnerID']
const commands = require('./commands');

client.on('ready', (c) => {
	console.log(`${c.user.username} is online`);
});

client.on('messageCreate', (message) => {
	//Only continue if the message isn't from a bot
	if (message.author.bot) {
		return;
	}

	const textChannel = message.channel //get the channel from where the message is
	//console.log(message.content);
	console.log(message.author.username, ": ", message.content);

	//use a prefix, "k,"
	if (message.content.startsWith('k,')) {
		const args = message.content.slice(2).trim().split(/ +/);
		const userCommand = args.shift().toLocaleLowerCase();
		if (userCommand === 'ping') {
			commands.pingCommand(message);
		} else if (userCommand === 'shutdown' || userCommand === 'off') {
			commands.shutdownCommand(message, botOwnerID, client);
		}
	}

	if (message.content === 'loli') {
		message.reply({
			content: 'Uoh :sob:', allowedMentions: {
				repliedUser: false
			}
		});
	}

	if (message.content === 'Flatorte') {
		message.reply({
			content: ':smiling_face_with_3_hearts: :heart:', allowedMentions: {
				repliedUser: false
			}
		});
	}

	// Define a regular expression to match the Twitter link pattern
	const twitterLinkRegex = /https:\/\/twitter\.com\/\w+\/status\/\d+/g; //define a twt link
	const noEmbed = /^<.+>$/; //define a link with no embed
	const normalTwitterLink = /https:\/\/twitter\.com/g;
	if (twitterLinkRegex.test(message.content)) {
		console.log('Twitter link detected');
		if (noEmbed.test(message.content)) {
			console.log('Twt link with no embed');
		}
		else {
			console.log('twt link with embed(?) attempting to replace with vx..');

			const replacedText = message.content.replace(normalTwitterLink, 'https://vxtwitter.com');
			textChannel.send(replacedText);
			message.delete()
		}


	}

})
keepAlive()
client.login(token);