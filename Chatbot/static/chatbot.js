var chatbox=document.getElementById("chat");
var messageinput=document.getElementById("message");
var sendbutton=document.getElementById("send-btn");

function addmessage(text,who){
    var newmessage=document.createElement("div");
    newmessage.className="message" + who;
    newmessage.innerText=text;
    chatbox.appendChild(newmessage);
}

function sendmessage(){
    var text=messageinput.value;

    if(text===""){
        return
    }

    addmessage(text, "user");
    messageinput.value = "";

    fetch("/chat" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: text})
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        addmessage(data.reply, "bot");
    })
}

sendbutton.onclick=sendmessage;

messageinput.onkeydown= function(event){
    if(event.key === "Enter"){
        sendmessage();
    }
}