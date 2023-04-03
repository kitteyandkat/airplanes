const express = require('express');
const cors = require('cors');
const { create, read, update, remove }  = require('./db/index.js');

const port = 3001;
const app = express();
app.use(express.json());

// 3. Add CORS to your server
app.use(cors({
  origin: '*'
}));



app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// My Tables
/*
  airport
  flight
  model
  plane
*/

// My Routes

// GET /airports  -  Get all airports
app.get('/airports', read.airports);

// GET /airport/:id  -  Get airport by id
app.get('/airport/:airportcod', read.airport);

// GET /flights  -  Get all flights
app.get('/flights', read.flights);

// GET /flight/:id  -  Get flight by id
app.get('/flight/:flightcod', read.flight);

// GET /models  -  Get all models
app.get('/models', read.models);

// GET /model/:id  -  Get model by id
app.get('/model/:id', read.model);

// GET /planes  -  Get all planes
app.get('/planes', read.planes);

// GET /plane/:id  -  Get plane by id
app.get('/plane/:id', read.plane);

// DELETE /flight/:flightcod  -  Delete airport by id
app.delete('/flight/:flightcod', remove.flight);

// DELETE /plane/:planecod  -  Delete plane by id
app.delete('/plane/:id', remove.plane);

// POST /flight  -  Create flight
app.post('/flight', create.flight);

// POST /plane  -  Create plane
app.post('/plane', create.plane);

// PUT /flight/:id  -  Update flight by id
app.put('/flight/:id', update.flight);

// PUT /plane/:id  -  Update plane by id
app.put('/plane/:id', update.plane);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
