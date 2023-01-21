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
    console.log("Status code: "+success.status)
    setInterval(user_connection_status, 5000)
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
request_user_name();