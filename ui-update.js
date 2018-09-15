let UIUpdate = {}

UIUpdate.alertBox = function(message) {
  const alertBox = document.querySelector('.alert')
  alertBox.innerHTML = message
}

UIUpdate.alertCat = function(status) {
  const catBox = document.querySelector('#httpcat')
  catBox.src = `http://http.cat/${status}`
}

UIUpdate.getUsernamePassword = function() {
  return {
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }
}

UIUpdate.loggedIn = function(token) {
  localStorage.setItem('access_token', token)
  loginBtn.classList.add('d-none')
  logoutBtn.classList.remove('d-none')
  UIUpdate.alertBox(`Access Token: ${token}`)
}

UIUpdate.loggedOut = function() {
  localStorage.removeItem('access_token')
  loginBtn.classList.remove('d-none')
  logoutBtn.classList.add('d-none')
}
