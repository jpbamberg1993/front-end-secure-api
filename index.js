const API_URL = 'http://localhost:3000'
const AUTH_URL = 'http://localhost:8888'

const headlineBtn = document.querySelector('#headline')
const secretBtn = document.querySelector('#secret')
const loginBtn = document.querySelector('#login')
const logoutBtn = document.querySelector('#logout')

headlineBtn.addEventListener('click', () => {
  fetch(`${API_URL}/api/public`)
    .then(response => response.text())
    .then(data => UIUpdate.alertBox(data))
})
