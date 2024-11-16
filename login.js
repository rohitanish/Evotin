document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');

    function toggleForm(form) {
        if (form === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    }

    loginToggle.addEventListener('click', function() {
        toggleForm('login');
    });

    signupToggle.addEventListener('click', function() {
        toggleForm('signup');
    });

    signupForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const voterIdInput = signupForm.querySelector('input[placeholder="Voter Id"]');
      const voterId = voterIdInput.value;
      if (validateVoterID(voterId)) {
          const formData = new FormData(signupForm);
          const data = {
              username: formData.get('username'),
              email: formData.get('email'),
              password: formData.get('password'),
              voter_id: formData.get('voter_id'),
              state: formData.get('state')
          };

          console.log('Sending signup data:', data);

          try {
              const response = await fetch('http://localhost:3000/signup', { // Ensure the URL is correct
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              });

              if (response.ok) {
                  alert('Sign up successful!');
              } else {
                  alert('Failed to register user.');
              }
          } catch (error) {
              console.error('Error:', error);
              alert('An error occurred while registering the user.');
          }
      } else {
          alert('Invalid Voter ID. Please enter a valid Voter ID.');
      }
  });

  loginForm.addEventListener('submit', async function(event) {
event.preventDefault();
const formData = new FormData(loginForm);
const data = {
  email: formData.get('email'),
  password: formData.get('password'),
};

console.log('Sending login data:', data);

try {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Login response:', result); // Log the response
    if (result.success) {
      alert('Login successful!');
      sessionStorage.setItem('username', result.name); // Store the username
      sessionStorage.setItem('state', result.state); // Store the state
      sessionStorage.setItem('voter-id', result.voter_id);
      window.location.href = "dash.html"; // Redirect to dashboard
    } else {
      alert('Invalid email or password.');
    }
  } else {
    alert('Failed to authenticate user.');
  }
} catch (error) {
  console.error('Error:', error);
  alert('An error occurred while logging in.');
}
});

    


    
    

    function validateVoterID(voterID) {
        const voterIDPattern = /^[A-Z]{3}[0-9]{7}$/;
        return voterIDPattern.test(voterID);
    }
});
