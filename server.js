let express = require('express');
let app = express();
let morgan = require('morgan');
let mongoose=require('mongoose');
let bodyParser = require('body-parser');
let port = process.env.PORT || 9999;
require('dotenv/config');
const config ={
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
  };
let pet = require('./controllers/routes/petRoutes');

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));


app.get("/", (req, res) => res.json({message: "Welcome to our Petstore!"}));

app.route("/getcountries")
    .get(pet.getcountry);
app.route("/pets")
    .get(pet.getPets)
    .post(pet.postPet);
app.route("/pets/:id")
    .get(pet.getPet)
    .delete(pet.deletePet)
    .put(pet.updatePet);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing