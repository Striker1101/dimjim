const API = 'http://localhost:4000/api/newsletter';
const ADMIN_PASSWORD = 'admin';

const modal = document.getElementById('authModal');
const app = document.getElementById('app');
const tableBody = document.getElementById('newsletterTable');
const searchInput = document.getElementById('searchInput');

let emails = [];

// Auth
function authenticate() {
  const pass = document.getElementById('adminPass').value;
  const err = document.getElementById('authError');

  if (pass !== ADMIN_PASSWORD) {
    err.textContent = 'Invalid password';
    return;
  }

  modal.style.display = 'none';
  app.classList.remove('hidden');
  loadEmails();
}

// Fetch data
async function loadEmails() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    emails = data.data || [];
    renderTable(emails);
  } catch (err) {
    alert('Failed to load data');
  }
}

// Render table
function renderTable(list) {
  tableBody.innerHTML = '';

  if (!list.length) {
    tableBody.innerHTML = `<tr><td colspan="2">No records found</td></tr>`;
    return;
  }

  list.forEach(item => {
    const row = `
      <tr>
        <td>${item.email}</td>
        <td>${new Date(item.created_at).toLocaleString()}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

// Search
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = emails.filter(e =>
    e.email.toLowerCase().includes(q)
  );
  renderTable(filtered);
});
