'use strict';

// Open a WebSocket.Server on port 3000
const WebSocket = require('ws');
const wss = new WebSocket.Server(
    {port: 3000}, 
    () => {console.log('listening');}
);

let clientId = 0;
var allClients = [];

// On each connection by a client, increment the number of clients
// and send a message containing the client number.
function connector (ws) { 
    if (ws.readyState == WebSocket.OPEN) { // Just to be safe
		ws.addEventListener('message', event => 
                        {event = JSON.parse(event.data);
						if (event.type == "name"){
							ws.clientName = event.data;
							allClients.push({name:ws.clientName, client: ws});
							if (clientId == 0){
								console.log(111111111111111111);
								clientId = clientId + 1;
								//allClients.push(event.data); 
								ws.send(`You are the first in this chat room \n`);
								return;	
							} else {
								var txt = "";
								wss.clients.forEach(function allClientsName (client){
									if (client != ws){
										txt += client.clientName + " ";
										client.send(ws.clientName + " joined the chat \n");
									}});
								ws.send("You're joining a chat with " + txt + "\n");
								return;		
							}
							return;	
						} else {
							console.log("I am heeeeeeeeeerrrrrrrrreeeeeeee");
							console.log(event);
							wss.clients.forEach(function allClientsMessage (client){
								if (client != ws)
									client.send(event.data);
							});
						}

						});
						
    ws.addEventListener('close', event => 
                        {wss.clients.forEach(function allClientsClose (client){
							if (client != ws)
								client.send(ws.clientName + " left the chat. \n");
						});
                         console.log(`code/reason: ${event.code}/${event.reason}`);}
                       );
    ws.addEventListener('error', event =>
                        {console.log(`WebSocket error: ${JSON.stringify(event)}`);}
                       );
	}
}
wss.on('connection', connector);
wss.on('error', err => {console.log(`Server error: ${err}`);});
