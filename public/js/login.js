


const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      alert('Failed to log in');
    }
  }
};



document.querySelector('#login-button').addEventListener('click', loginFormHandler);



  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#password-confirm').value.trim();
  
    if ( email && password && confirmPassword && password === confirmPassword) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ confirmPassword, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        alert('Failed to sign up');
      }
    } else {
      alert('Passwords do not match or some fields are empty');
    }
  };

  document.querySelector('#signup-button').addEventListener('click', signupFormHandler);


document.onload = (event) =>{
  document.getElementById('signup-button') = (event) =>{
    // if(event.target.)
  };
};

