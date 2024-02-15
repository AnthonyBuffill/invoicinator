document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('user-logout');

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          
          window.location.href = '/';
        } else {
          console.error('Failed to logout');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    });
  }
});
