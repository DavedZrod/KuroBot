//this is for the webserver to be pinged to prevent it turning off
const express = require("express")

const server = express()
server.all("/", (req, res) => {
	res.send("Bot is running!")
})
function keepAlive() {
	server.listen(3000, () => {
		console.log("Server is ready.")
	})
}
module.exports = keepAlive