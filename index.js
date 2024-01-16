const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')


app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({     
  extended: false
})); 

//app.use(bodyParser());

app.set('view engine', 'ejs') 

app.get('/', (req, res) => {
  res.render("index")
})

app.post('/wetter', async (req, res) => {
  const city1 = req.body.stadt
  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=c3cb29d220a4a55f5e99add50cc9014d&units=metric`)
  .then((r) => r.json())
  .then((data => {
    const city = req.body.stadt
    let temp = Math.round(data.main.temp)
    res.render("wetter",{
      stadt: city,
      temp: temp
    })
  }))

 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})