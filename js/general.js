// const API_BASE = 'http://localhost:4000/api';
const API_BASE = 'http://admin.dijimgroup.com/api';

const newsletterForm = document.getElementById('newsletterForm');
const msg = document.getElementById('newsletterMsg');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('newsletterEmail').value.trim();

    if (!email) {
      msg.textContent = 'Email is required';
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.message || 'Something went wrong';
        return;
      }

      msg.textContent = 'Subscribed successfully 🎉';
      newsletterForm.reset();
    } catch (err) {
      msg.textContent = 'Server error. Try again later.';
    }
  });
}
