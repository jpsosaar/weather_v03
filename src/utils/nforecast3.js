const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
//  URL con Valor Correcto
    const url = 'http://api.weatherstack.com/current?access_key=5c3df6014545762fcf18956d1d9b92fe&query=' + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + '&units=m'
//  URL con Valor InCorrecto   -  se deja a los fines de prueba 
//  const url = 'http://url-non-existent-api.weatherstack.com/current?access_key=9f5764ae1bf7189018ca8f83afa04694&query=' + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + '&units=m'

    request({ url: url, json: true }, (error, response) => {
//        console.log('nforecast.js dice 1.- ================================================================================================')
//        console.log(response.body)
//        console.log(error)
        if (error) {
            callback('Unable to connect to Geocoding Service: https://api.radar.io/v1/geocode', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try anohter search', undefined)
        } else {
            const forecastIconUrl = response.body.current.weather_icons[0] 
            const forecastLocaltime = 'Hora Local       : ' + response.body.location.localtime
            const forecastWeather   = 'Clima            : ' + response.body.current.weather_descriptions[0]
            const forecastTempeture = 'Temperatura      : ' + response.body.current.temperature             + ' grados - ' + 
                                      'Sensación Térmica : ' + response.body.current.feelslike               + ' grados' 
            const forecastHumidity  = 'Humedad Relativa : ' + response.body.current.humidity                + '%'
            callback(undefined, {forecastLocaltime, forecastWeather, forecastTempeture, forecastHumidity, forecastIconUrl} )
        }
    }) 
}
module.exports = forecast