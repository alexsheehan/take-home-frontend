require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3842;

app.use(cors());

app.use(express.static(path.join('./dist')));

app.use('/search/:query', (req, res) => {
  axios({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${req.params.query}&api_key=${process.env.GIPHY_API_KEY}&limit=${req.query.limit || 30}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      console.log(req.query.limit);
      res.send(result.data.data);
    })
    .catch(e => console.log(e));
});

app.use('/trending', (req, res) => {
  axios({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/trending?&api_key=${process.env.GIPHY_API_KEY}&limit=${req.query.limit || 30}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      res.send(result.data.data);
    })
    .catch(e => console.log(e));
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
