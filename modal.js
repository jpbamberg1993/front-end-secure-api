const modal = document.querySelector('.modal')
const loginModalBtn = document.querySelector('#loginModalBtn')
const closeBtn = document.querySelector('.close')

loginModalBtn.addEventListener('click', function() {
  modal.style.display = 'block'
})

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none'
})
