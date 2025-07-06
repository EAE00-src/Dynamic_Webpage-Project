console.log('login-backend.js');
//login variables
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('password');
const submitInfo = document.getElementById('submit-login');

//Event Listener for Login page Backend
loginForm.addEventListener('submit', e =>{
    e.preventDefault();
    const loginEmailValue = loginEmail.value.trim();
	const loginPasswordValue = loginPassword.value.trim();
    const apiLogin = 'http://localhost:5678/api/users/login';

    const setError = (element, message) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error-msg');

		errorDisplay.innerText = message;
		inputControl.classList.add('error');
		inputControl.classList.remove('success');
	};

	/*const setSuccess = element => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error-msg');

		errorDisplay.innerText = '';
		inputControl.classList.add('success');
		inputControl.classList.remove('error');
	};*/


    async function sendLogin(){
		//fetch request that sends the values of the email and password to the backend and receives the login token
        await fetch(apiLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': `${loginEmailValue}`, 'password': `${loginPasswordValue}`})
        }).then(response => response.json())
        .then(data =>{
			console.log(data);
			//This 'if' checks if the password entry is blank
			if(loginPasswordValue === ''){
				setError(loginPassword, 'Password is required!');
				e.preventDefault();
			}else if(data.token === undefined || data.token === null || data.token === ''){
				//this 'if' checks if there isn't a valid token that is sent back from the form submission
                setError(loginEmail, 'Invalid email or password');
                setError(loginPassword, 'Invalid email or password');
                console.log('Login Failed');
				alert(`Error: ${data.message}`)
				e.preventDefault();
            }else{
				//if the token is valid/exists then the user will be logged in and will store the token
				console.log('Login Successful');
                alert('Login successful! Welcome Admin!');
				localStorage.setItem('login-token', data.token);
				window.location.href = 'index.html';
				return
                }
            }).catch(error =>{
				//this error is related to if the fetch fails to send the values to the backend
                console.error('Error:', error);
                setError(loginEmail, 'An error has occured please try again!');
                setError(loginPassword, 'An error has occurred please try again!');
				e.preventDefault();
            });
        };
        sendLogin();
});




//const adminEmail = 'sophie.bluel@test.tld';
//const adminPW = 'S0phie';
