const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')
const messageSeven = document.querySelector('#message-7')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''
messageFour.textContent = ''
messageFive.textContent = ''
messageSix.textContent = ''
messageSeven.textContent = ''

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    messageSeven.textContent = ''
//  fetch('http://localhost:3000/weather?address='+location).then((response) => {
//  fetch('https://weatherv03-production.up.railway.app/weather?address='+location).then((response) => {
//  fetch('/weather?address='+location).then((response) => {
    fetch('https://weatherv03-production.up.railway.app/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
                messageFour.textContent = ''
                messageFive.textContent = ''
                messageSix.textContent = ''
                messageSeven.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.locationLatLong
                messageThree.textContent = data.forecastLocaltime
                messageFour.innerHTML = `<img src="${data.forecastIconUrl}" alt="${data.forecastWeather}" style="width: 64px; height: 64px;">`
                messageFive.textContent = data.forecastWeather
                messageSix.textContent = data.forecastTempeture
                messageSeven.textContent = data.forecastHumidity
                
            }
            
        })    
    })    
})



