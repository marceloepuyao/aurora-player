const fs = require('fs')
const request = require('request')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const ioWildcard = require('socketio-wildcard')()

const port = 1618

const privateMessages = [
	'windowResize', 'windowActive', 'windowOpacityChange', 'windowSettingsChange', 
	'windowClose', 'windowShow', 'playerPlay', 'playerNext', 'playerPrev', 
	'playerProgress', 'playerVolumen', 'childChangeUrl'
]

let sockets = []

io.use(ioWildcard)

io
	.on('connection', (socket) => {
		if(!sockets.length) {
			socket.isMain = true
		}
		
		socket.emit('connected')
		sockets.push(socket)
		
		socket.on('*', (event) => {
			console.log(event);
			let data = event.data
			let messageName = data[0]
			let messageContent = data[1]
			if(
				(socket.isMain && privateMessages.indexOf(messageName) !== -1) ||
				(privateMessages.indexOf(messageName) === -1)
			) {
				socket.broadcast.emit(messageName, messageContent)
			}
		})
	});

app
	.get('/aurora-play.js', (req, res) => {
		let package = req.headers['user-agent'].split(/\|/g);
			package = package.length>1?'window.packageContent = '+package[1]+';':''
		const auroraPlayJS =
			fs.readFileSync(__dirname+'/aurora-play.js').toString()
		const socketIOJS = 
			fs.readFileSync(__dirname+'/socket.io.js').toString()
		res.send(socketIOJS+package+auroraPlayJS)
		
	})

server.listen(port)

module.exports = {
	io,
	app
}