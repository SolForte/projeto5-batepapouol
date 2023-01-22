let user_name;
let messages = document.querySelector(".message_container");
function request_user_name () { 
    user_name = prompt("Insira seu apelido:");
    post_user_name();
}
function post_user_name () {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
    {
        name: user_name
    });
    promise.then(post_user_name_success)
    promise.catch(post_user_name_error)
}
function post_user_name_success (success){
    console.log("Status code: "+success.status);
    setInterval(user_connection_status, 5000);
    fetch_messages();
    setInterval(fetch_messages, 3000);
    
}
function post_user_name_error (error) {
    console.log(error.response.status+": "+error.response.data);
    alert("Apelido já em uso ou apelido inválido. Digite outro apelido.");
    request_user_name();
}
function user_connection_status (){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
    {
        name: user_name
    })
    console.log("User is connected")
}
function fetch_messages (){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(display_messages);
}
function display_messages(message){
    messages = document.querySelector(".message_container");
    messages.innerHTML="";
    for (let i = 0; i < message.data.length; i++ ){
        if (message.data[i].type === "status"){
            messages.innerHTML = messages.innerHTML + `
            <li class="message status">
                <span class="time">(${message.data[i].time}) </span><span class="name">${message.data[i].from} </span> ${message.data[i].text}
            </li>
            `
        } else if(message.data[i].type === "message"){
            messages.innerHTML = messages.innerHTML + `
            <li class="message all">
                <span class="time">(${message.data[i].time}) </span><span class="name">${message.data[i].from}</span> para <span class="name">${message.data[i].to}</span>: ${message.data[i].text}
            </li>
            `
        } else if (message.data[i].type === "private_message" && (message.data[i].to === user_name || message.data[i].from === user_name)){
            messages.innerHTML = messages.innerHTML + `
            <li class="message whisper">
                <span class="time">(${message.data[i].time}) </span><span class="name">${message.data[i].from}</span> reservadamente para <span class="name">${message.data[i].to}</span>: ${message.data[i].text}
            </li>
            `
        }
    }
    auto_message_scroll()
}
function auto_message_scroll(){
    document.querySelector(".message_container li:nth-last-child(1)").scrollIntoView();
}
function send_message(){
    const input = document.querySelector(`input`).value;
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
        from: user_name, to: "Todos", text: input, type: "message"
    })
    promise.then(display_messages);
    promise.catch(widow.location.reload());
}
request_user_name()