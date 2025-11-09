const request = require('postman-request')

const geocode = (address, callback) => {
//  URL con Valor Correcto    
    const url = 'https://api.radar.io/v1/geocode/forward?query='+address+'&limit=1'
//  URL con Valor InCorrecto   -  se deja a los fines de prueba 
//    const url = 'https://url-non-existent-api.radar.io/v1/geocode/forward?query='+address+'&limit=1'
    const headers = {
        'Authorization': 'prj_test_pk_4d71509b42a8093decd39c5be2b6bad64f553167' 
    }
    request({ url: url, json: true, headers:headers }, (error, response) => {
//        console.log('ngeocode.js dice 1.- ================================================================================================')
//        console.log(response.body)
//        console.log(response.body.meta)
//        console.log(response.body.addresses)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
//      Verifica si 'addresses' existe Y si su longitud es 0.
        else if (!response.body.addresses || response.body.addresses.length === 0) { 
            let errorMessage = 'Unable to find location. Try another search.'
            if (response.body.meta && response.body.meta.message) {
                errorMessage = `API Error: ${response.body.meta.message}`
            }
            callback(errorMessage, undefined)
        }
        else {
            // 2. Extracción de datos exitosa
            const addressData = response.body.addresses[0]
            callback(undefined, {
                latitude: addressData.latitude,
                longitude: addressData.longitude,
                formattedAddress: 'Ciudad : ' + addressData.city + ' - Prov. : ' + addressData.state + ' , Pais : ' + addressData.country,
                city: addressData.city,
                state: addressData.state,
                country: addressData.country,
                forecastLocaltime: addressData.forecastLocaltime
            })
        }
    })
}
module.exports = geocode