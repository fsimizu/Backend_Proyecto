const socket = io();

const chatBox = document.getElementById("input-msg");
let userEmail = document.getElementById("user").innerHTML;

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      user: userEmail,
      message: chatBox.value,
    });
    chatBox.value = "";
  }
});

socket.on("listado_de_msgs", (msgs) => {
  const divMsgs = document.getElementById("div-msgs");
  let formato = "";
  let align = "";
  let backgroundColor = "";
  let avatar = "";
  let left = "";
  let right = "";

  msgs.forEach((msg) => {
    if (msg.user == userEmail) {
      align = "justify-content-end";
      backgroundColor = "rgba(57, 192, 237,.2)";
      avatar = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp";
      left = "display: none";
      right = "";
    }
    else {
      align = "justify-content-start";
      backgroundColor = "#fbfbfb";
      avatar = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";
      left = "";
      right = "display: none";
    }


      formato = formato +
        '<div class="d-flex flex-row ' + align + ' ">' +
          '<p class="small mb-0">' + msg.user + '</p>' +
        '</div>'+
        '<div class="d-flex flex-row ' + align + ' mb-4">' +
          '<img src=' + avatar + ' alt="avatar 1" style="width: 45px; height: 100%; ' + left + '">' +
          '<div class="p-3 me-3" style="border-radius: 15px; background-color: ' + backgroundColor + ';">' +
              '<p class="small mb-0">' + msg.message + '</p>' +
          '</div>' +
          '<img src=' + avatar + ' alt="avatar 1" style="width: 45px; height: 100%;' + right + '">' +
        '</div>'

  });
  divMsgs.innerHTML = formato;
});