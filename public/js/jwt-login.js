const API_URL = 'http://localhost:8080/api';

function handleLogin() {

fetch( API_URL + '/jwt-login', {
    method: 'post',
    body: JSON.stringify({ email: 'pepe@pepe.com', password: '123'}),
    headers: { 'Content-Type' : 'application/json'},
})
.then((res) => res.json())
.then((json) => {
    console.log(json.payload);
    // localStorage.setItem('token', json.payload)
});
}

function handleFetchProfile() {
    /* const token = localStorage.getItem('token'); */
    fetch(API_URL + '/jwt-profile'
    // , {
    //     method: 'get',
    //     headers : {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    // }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }