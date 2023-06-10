const socket = io();

const chatBox = document.getElementById("input-msg");
let userEmail = "";

async function emailInput() {
    const { value: email } = await Swal.fire({
      title: "Enter your email address",
      input: "text",
      inputLabel: "Your email",
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
        formato = formato + "<p>user " + msg.user + ": " + msg.message + "</p>";
    });
    divMsgs.innerHTML = formato;
});