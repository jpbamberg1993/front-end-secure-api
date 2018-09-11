const API_URL = 'http://localhost:3000'
const AUTH_URL = 'http://localhost:8888'

let ACCESS_TOKEN = undefined

const headlineBtn = document.querySelector('#headline')
const secretBtn = document.querySelector('#secret')
const loginBtn = document.querySelector('#login')
const logoutBtn = document.querySelector('#logoutBtn')

loginBtn.addEventListener('click', (event) => {
  modal.style.display = 'none'
  fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(UIUpdate.getUsernamePassword())
  }).then(resp => {
    UIUpdate.alertCat(resp.status)
    if (resp.status == 200) {
      return resp.json()
    } else {
      return resp.text()
    }
  }).then(data => {
    if (data.access_token) {
      ACCESS_TOKEN = data.access_token
      data = `Access Token: ${ACCESS_TOKEN}`
      UIUpdate.loggedIn(ACCESS_TOKEN)
    }
    UIUpdate.alertBox(data)
  })
})

logoutBtn.addEventListener('click', () => {
  ACCESS_TOKEN = undefined
  UIUpdate.loggedOut()
  UIUpdate.alertBox('logged out')
})

headlineBtn.addEventListener('click', () => {
  fetch(`${API_URL}/api/public`)
    .then(response => response.text())
    .then(data => UIUpdate.alertBox(data))
})

secretBtn.addEventListener('click', () => {
  let headers = {}
  if (ACCESS_TOKEN) {
    headers = {
      "Authorization": `Bearer ${ACCESS_TOKEN}`
    }
  }
  fetch(`${API_URL}/api/private`, { headers })
    .then(resp => {
      UIUpdate.alertCat(resp.status) 
      return resp.text()
    })
    .then(data => {
      UIUpdate.alertBox(data)
    })
})
