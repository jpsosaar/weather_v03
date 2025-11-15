const geocode = require('./utils/ngeocode3.js')
const forecast = require('./utils/nforecast3.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { error } = require('console')

const app = express()
//const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Juan Pablo Sosa',
        footerName:'JPS'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Juan Pablo Sosa',
        footerName:'JPS'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Juan Pablo Sosa',
        msg: 'Comunicate a la Mesa de Ayuda de My Weather App',
        footerName:'JPS'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }
    // 1. Inicia Geocodificación
    geocode(req.query.address, (error, data) => {   
        if (error){
            return res.send({
                error: 'Geocode Error: ' + error
            })
        }
        // *Guardamos los datos de geocodificación*
        const geoData = {
            address: data.formattedAddress,
            latitude: data.latitude,
            longitude: data.longitude
        }
        // 2. Llama a Forecast con los datos obtenidos
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
           if (error){
                // Si forecast falla, enviamos el error de forecast
                return res.send({ error: 'Forecast Error: ' + error })
            }
            // 3. ÉXITO FINAL: Combinamos y enviamos UNA ÚNICA RESPUESTA
            res.send({
                location: geoData.address,
                locationLatLong: '( latitud: ' + geoData.latitude + ' , longitud: ' + geoData.longitude + ' )',
                latitude: geoData.latitude,
                longitude: geoData.longitude,
                forecastLocaltime: forecastData.forecastLocaltime,
                forecastWeather: forecastData.forecastWeather,
                forecastTempeture: forecastData.forecastTempeture,
                forecastHumidity: forecastData.forecastHumidity,
                forecastIconUrl: forecastData.forecastIconUrl
            })                
        })
    })
})

app.get('/products', (req, res) => {
    /*http://localhost:3000/products?search=games&rating=5*/
    if (!req.query.search) {
        return res.send({
            error:'You must provide a serch term'
        })
    }
    console.log(req.query.search)
    if (req.query.rating){
        console.log(req.query.rating)
    }
    
    
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juan Pablo Sosa',
        errorMessage: 'Help Page not found.'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juan Pablo Sosa',
        errorMessage: 'About Page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Juan Pablo Sosa',
        errorMessage: 'ooops! Page not found.'
    })
})                                


// Start up the Server
//app.listen(port, () => {
//    console.log('Server is up on port ' + port)
//})
  app.listen(3000, () => {  
    console.log('Server is up on port 3000')
})



//******************************************************//
// app.com
// app.com/about
// app.com/help
// app.com/weather
//     req = request - res = response
//-----------------------------------------------------*//