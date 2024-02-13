

const showLoginForm = (event) => {
  event.preventDefault();
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.style.display = (loginForm.style.display === 'block') ? 'none' : 'block';
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/home';
    } else {
      alert('Failed to log in');
    }
  }
};

document.getElementById('login-link').addEventListener('click', function (event) {
  event.preventDefault();
  showLoginForm(event);
});

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);



const signupFormHandler = async (event) => {
  
  event.preventDefault();

  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();
  
    if (name && email && password && confirmPassword && password === confirmPassword) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        window.location.href = '/home';
      } else {
        alert('Failed to sign up');
      }
    } else {
      alert('Passwords do not match or some fields are empty');
    }
  };

const signupForm = document.querySelector('.signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', signupFormHandler);
} else {
  console.error('Signup form element not found in the DOM.');
}}

document.onload = (event) =>{
  document.getElementById('signup-button') = (event) =>{
    // if(event.target.)
  };
};
