const express = require('express');
//use helmet to hide some headers
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 5555;
const feRoute = 'http://localhost:3000';

const app = express();

//middlewares
app.use(morgan('common'));
app.use(cors({
  //only frontend can access backend
  origin: feRoute,
}));






app.listen( port, () => {
  console.log(`Ready at: ${port}`);
});