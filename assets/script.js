let userName;
let messages = document.querySelector(".message_container");
function requestUserName () {
    userName = prompt("Insira seu apelido:");
    postUserName();
}
function postUserName () {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
    {
        name: userName
    });
    promise.then(postUserNameSuccess);
    promise.catch(postUserNameError);
}
function postUserNameSuccess (success){
    console.log("Status code: "+success.status);
    fetchMessages();
    setInterval(userConnectionStatus, 5000);
    setInterval(fetchMessages, 3000);
}
function postUserNameError (error) {
    console.log(error.response.status+": "+error.response.data);
    alert("Apelido já em uso ou apelido inválido. Digite outro apelido.");
    requestUserName();
}
function userConnectionStatus (){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
    {
        name: userName
    });
    promise.catch(disconnectAlert);
}
function fetchMessages (){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(displayMessages);
}
function displayMessages(message){
    messages = document.querySelector(".message_container");
    messages.innerHTML="";
    for (let i = 0; i < message.data.length; i++ ){
        if (message.data[i].type === "status"){
            messages.innerHTML = messages.innerHTML + `
            <li class="message status" data-test="message">
                <span class="time">
                (${message.data[i].time}) </span><span class="name">
                ${message.data[i].from} </span> ${message.data[i].text}
            </li>
            `;
        } else if(message.data[i].type === "message"){
            messages.innerHTML = messages.innerHTML + `
            <li class="message all" data-test="message">
                <span class="time">(${message.data[i].time}) </span><span class="name">
                ${message.data[i].from}
                </span> para <span class="name">
                ${message.data[i].to}</span>: ${message.data[i].text}
            </li>
            `;
        } else if (message.data[i].type === "private_message" && (message.data[i].to === userName || message.data[i].from === userName)){
            messages.innerHTML = messages.innerHTML + `
            <li class="message whisper" data-test="message">
                <span class="time">(${message.data[i].time}) </span><span class="name">
                ${message.data[i].from}</span> reservadamente para <span class="name">
                ${message.data[i].to}
                </span>: ${message.data[i].text}
            </li>
            `;
        }
    }
    autoMessageScroll();
}
function autoMessageScroll(){
    document.querySelector(".message_container li:nth-last-child(1)").scrollIntoView();
}
function sendMessage(){
    const input = document.querySelector(`input`).value;
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
        from: userName, to: "Todos", text: input, type: "message"
    });
    promise.then(fetchMessages);
    promise.catch(reload);
    document.querySelector(`input`).value = "";
}
function reload() {
    window.location.reload();
}
function disconnectAlert() {
    alert("Você foi desconectado por inatividade.");
    reload();
}
requestUserName();