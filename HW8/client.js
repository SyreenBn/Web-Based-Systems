

const whoami = document.querySelector("#chatMonitor");
const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener('open', 
                        event=>{console.log('Connected to server.');});
						
var clientName;

document.getElementById('sendMessage').onclick = function(){
	
	var text =document.getElementById('message').value+"\n";
	document.getElementById('message').value = "";
	socket.send(JSON.stringify({
		type: "message",
		data: clientName + ": " + text
	}));
	whoami.innerHTML += "You: " + text +"";
};

document.getElementById('sendName').onclick = function(){
	
	clientName = document.getElementById('name').value;
	if (clientName != "") {
		document.getElementById("userName").style.display = "none";
		document.getElementById("MessageToolBar").style.display = "block";
		socket.send(JSON.stringify({
			type: "name",
			data: clientName
		}));
	} else {
		document.getElementById('mesg').innerHTML = "Please Enter Your Name";
	}
};

socket.addEventListener('message', 
                        event=>{
							whoami.innerHTML += event.data;
						});
						
socket.addEventListener('close', 
                        event=>{
							document.getElementById("MessageToolBar").style.display = "none";
							document.getElementById("mesg").innerHTML = "Connection with server has been closed";
							console.log("I am heeeeeeeeeerrrrrrrrreeeeeeee");
							console.log(event);
						});

					
