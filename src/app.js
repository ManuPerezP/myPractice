const path = require("path");
const express = require("express");
const axios = require("axios");
const hbs = require("hbs");
const app = express();

const PORT = process.env.PORT || 3000;

const http = require("http");

const PUBLIC_KEY = `60655abf81979e27a24e886bf516ed96`;
const PRIVATE_KEY = "d2b915ba137b158234370fe57b636dc6cd9fe692";
// const URL = ` http://gateway.marvel.com/v1/public/characters?nameStartsWith=cap`//?ts=1&apikey=${KEY_PUBLIC}`
const URL = ` http://gateway.marvel.com/v1/public/characters?offset=100&limit=50`;
const URL_SEARCH = ` http://gateway.marvel.com/v1/public/characters?nameStartsWith=`;
const ts = 1000;

const hash = "4f32fddc0721a604d9a909bb3e5b29f7"; //md5(ts+privateKey+publicKey)

// const endPoint = `&ts=1000&apikey=${PUBLIC_KEY}&hash=${hash}`
const endPoint = `&ts=1000&apikey=${PUBLIC_KEY}&hash=${hash}`;

// const request = http.request(URL+endPoint,(response)=>{
//     let data = ''

//     response.on('data',(chunk)=>{
//         data = data +chunk.toString()
//     })

//     response.on('end',()=>{
//         const body = JSON.parse(data)
//         console.log(body.data.results);
//     })
// })

// request.on('error',(error)=>{
//     console.log('ERROR: ', error)
// })
// console.log(endPoint)
// // request.end()

//http://i.annihil.us/u/prod/marvel/i/mg/c/10/4c002ee7bf3f5&ts=1000&apikey=60655abf81979e27a24e886bf516ed96&hash=4f32fddc0721a604d9a909bb3e5b29f7

const publicDirectoryPath = path.join(__dirname, "../public");
//setup our public directory for our resources like js, css, etc
app.use(express.static(publicDirectoryPath));

const partialsPath = path.join(__dirname, "../templates/partials");
//set hbs para manejar template engine, desde views
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  return res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  }); //debe coincidir con el nombre de tu template
});

app.get("/characters", async (req, res) => {
  //axios(URL+endPoint)
  const searchName = req.query.name;
  if (searchName && searchName.trim() !== '') {
 
    await axios
      .get(URL_SEARCH + searchName + endPoint)
      .then(function (response) {
        // handle success
        //   console.log(response.data);
        // console.log("end::: ", response.data.data);
        return res.json({
          success: true,
          message: "success",
          data: response.data.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  } else {
    await axios
      .get(URL + endPoint)
      .then(function (response) {
        // handle success
        //   console.log(response.data);
        console.log("end::: ", endPoint);
        return res.json({
          success: true,
          message: "success",
          data: response.data.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
});

app.listen(PORT, () => {
  console.log(`Aplication running in port: ${PORT}`);
});
