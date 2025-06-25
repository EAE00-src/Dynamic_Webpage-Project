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
            if(data.token === undefined || data.token === null || data.token === ''){
                setError(loginEmail, 'Invalid email or password');
                setError(loginPassword, 'Invalid email or password');
                console.log('Login Failed');
				alert(`Error: ${data.message}`)
            }else{
				console.log('Login Successful');
                alert('Login successful! Welcome Admin!');
				localStorage.setItem('login-token', data.token);
				window.location.href = 'index.html';
                }
            }).catch(error =>{
                console.error('Error:', error);
                setError(loginEmail, 'An error has occured please try again!');
                setError(loginPassword, 'An error has occurred please try again!');
            });
        };
        sendLogin();
});



//Event Listener for Login page

/*loginForm.addEventListener('submit', event =>{
	event.preventDefault();

	const setError = (element, message) => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error-msg');

		errorDisplay.innerText = message;
		inputControl.classList.add('error');
		inputControl.classList.remove('success');
	};

	const setSuccess = element => {
		const inputControl = element.parentElement;
		const errorDisplay = inputControl.querySelector('.error-msg');

		errorDisplay.innerText = '';
		inputControl.classList.add('success');
		inputControl.classList.remove('error');
	};

	function loginValidation(){
		const adminEmail = 'sophie.bluel@test.tld';
		const adminPW = 'S0phie';
		const loginEmailValue = loginEmail.value.trim();
		const loginPasswordValue = loginPassword.value.trim();

		//checks if fields are blank
		if(loginEmailValue === '' && loginPasswordValue === ''){
			setError(loginPassword, 'Both email & password are required!');
            setError(loginEmail, 'Both email & password are required!');
			event.preventDefault();
			return false;
		}

		//checks if the respective fields match with the correct password & email
		if(loginEmailValue === adminEmail && loginPasswordValue === adminPW){
			setSuccess(loginEmail);
			setSuccess(loginPassword);
			return true;

		}else if(loginEmailValue === adminEmail && loginPasswordValue !== adminPW){
			setSuccess(loginEmail);
            setError(loginPassword, 'Incorrect password, login attempt failed! Please try again.')
			event.preventDefault();
			return false;

		}else if(loginPasswordValue === adminPW && loginEmailValue !== adminEmail){
			setError(loginEmail, 'Incorrect email, login attempt failed! Please try again.');
            setSuccess(loginPassword);
			event.preventDefault();
			return false;

		}else{
			setError(loginEmail, 'Incorrect email, login failed! Please try again.')
            setError(loginPassword,'Incorrect password, login failed! Please try again.')
			event.preventDefault();
			return false;
		};

		
	};
	loginValidation();
	//checks if loginValidation is true or false (correct credentials inputted). If true then the user moves onto the admin page. If false then they get an error
    if(loginValidation()){
        alert('Login successful! Welcome Admin!');
        window.location.href = 'admin.html';
    }else{
        event.preventDefault();
        return false;
    }

});*/