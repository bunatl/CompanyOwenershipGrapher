const express = require('express');
//use helmet to hide some headers
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const disambiguation = require('./routes/disambiguation');

require('dotenv').config();

const middlewares = require('./routes/middlewares');
const port = process.env.PORT || 5555;

const app = express();
//parse body middleware (for JSON)
app.use(express.json());

//DB connections
mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//middlewares
app.use(morgan('common'));
app.use(cors({
  //only frontend can access backend
  origin: process.env.CORS_ORIGIN,
}));

//custom routes/middlewares
app.get('/', (req, res) => {
  res.json({
    message: "Hello world",
  })
})

app.use('/test', disambiguation);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


app.listen( port, () => {
  console.log(`Ready at: ${port}`);
});