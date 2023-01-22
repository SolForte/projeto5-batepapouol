let user_name;
/*
let message_data = [];
function display_message_data {
    let message_data_display_content_query = document.querySelector('.content');
    message_data_display_content_query.innerHTML = "";
    for(let i = 0; i < message_data.length; index++){
        let message_data_template = `
            <li>
                ${message_data[i].titulo}
            </li>
        `;
        message_data_display_content_query.innerHTML = message_data_display_content_query.innerHTML + message_data_template;
    }
}
*/
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
    alert("Apelido já em uso ou apelido inválido.");
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
    promise.then(display_messages)
}
function display_messages(message){
    let feed = document.querySelector(".feed");
    feed.innerHTML="";
    for (let i = 0; i < message.data.length; i++ ){
        if (message.data[i].type === "status"){
            feed.innerHTML = feed.innerHTML + `
            <li class="message status">
                <span class="time">(${message.data[i].time}) </span><span class="name">${message.data[i].from} </span> ${message.data[i].text}
            </li>
            `
        } else if(message.data[i].type === "message"){
            feed.innerHTML = feed.innerHTML + `
            <li class="message all">
                <span class="time">(${message.data[i].time}) </span><span class="name">${message.data[i].from}</span> para <span class="name">${message.data[i].to}</span>: ${message.data[i].text}
            </li>
            `
        } else if (message.data[i].type === "private_message" && (message.data[i].to === user_name || message.data[i].from === user_name)){
            feed.innerHTML = feed.innerHTML + `
            <li class="message whisper">
                <span class="time">(${message.data[i].time}) </span><span class="name">${message.data[i].from}</span> reservadamente para <span class="name">${message.data[i].to}</span>: ${message.data[i].text}
            </li>
            `
        }
    }
}
request_user_name()