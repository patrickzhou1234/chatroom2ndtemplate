const socket = io();
socket.emit("joined");

socket.on("joined", () => {
  msgs.innerHTML += "A user has joined. <br>";
});

socket.on("leave", () => {
  console.log(name+" left");
  msgs.innerHTML += "A user has left. <br>";
});

msginput = document.getElementById("msginput");
username = document.getElementById("username");
msgs = document.getElementById("msgs");

function sendmsg() {
  socket.emit('chatmsg', username.value, msginput.value);
  msginput.value = "";
}

socket.on('chatmsg', function(user, msg) {
  msgs.innerHTML += user+": "+msg+"<br>";
  msgs.scrollTop = msgs.scrollHeight;
});

function welc() {
  username.style.display = "none";
  document.getElementById("submituser").style.display = "none";
  msginput.style.display = "block";
  document.getElementById("chatbtn").style.display = "block";
  socket.emit('welc', username.value);
}

socket.on('welc', function(user) {
  msgs.innerHTML += "Bot🤖: Welcome to the chat "+user+". <br>";
  msgs.scrollTop = msgs.scrollHeight;
});

function checkinput(event, element) {
  if (event.keyCode == "13") {
    if (element == "msginput") {
      sendmsg();
    } else {
      welc();
    }
  }
}
