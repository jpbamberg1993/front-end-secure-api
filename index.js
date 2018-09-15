const API_URL = 'http://localhost:3000'

let ACCESS_TOKEN = localStorage.getItem('access_token') || undefined
const webAuth = new auth0.WebAuth({
  domain: 'bambam.auth0.com',
  clientID: process.env.AUTH0_CLIENTID,
  responseType: 'token',
  audience: 'egghead-demo',
  scope: '',
  redirectUri: window.location.href
})

const headlineBtn = document.querySelector('#headline')
const secretBtn = document.querySelector('#secret')
const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('#logoutBtn')

loginBtn.addEventListener('click', () => {
  webAuth.authorize()
})

logoutBtn.addEventListener('click', () => {
  ACCESS_TOKEN = undefined
  UIUpdate.loggedOut()
  UIUpdate.alertBox('logged out')
})

headlineBtn.addEventListener('click', () => {
  fetch(`${API_URL}/api/public`)
    .then(resp => {
      UIUpdate.alertCat(resp.status)
      return resp.text()
    })
    .then(data => { UIUpdate.alertBox(data) })
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

const parseHash = () => {
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      window.location.hash = ''
      ACCESS_TOKEN = authResult.accessToken
      UIUpdate.loggedIn(ACCESS_TOKEN)
    }
  })
}

window.addEventListener("DOMContentLoaded", parseHash)
