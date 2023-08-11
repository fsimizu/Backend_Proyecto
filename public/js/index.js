const socket = io();

const chatBox = document.getElementById("input-msg");
let userEmail = "";

async function emailInput() {
  const { value: email } = await Swal.fire({
    title: "Who are you?",
    input: "text",
    inputLabel: "Please enter your email",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });
  userEmail = email;
}
emailInput();

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
  msgs.forEach((msg) => {
    // formato = formato + "<p>" + msg.user + ": " + msg.message + "</p>";
    formato = formato +
    '<div class="d-flex flex-row justify-content-start mb-4">' +
      '<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1"' +
      'style="width: 45px; height: 100%;">' +
      '<div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">' +
        '<p class="small mb-0">'+ msg.message + '</p>' +
      '</div>' +
    '</div>'

  });
  divMsgs.innerHTML = formato;
});