const express = require('express');
//use helmet to hide some headers
const morgan = require('morgan');
const cors = require('cors');

// const disambiguation = require('./routes/disambiguation');
// const scraper = require('./routes/webscraper/scrape');
const middlewares = require('./routes/middlewares');

const fetchCompany = require('./api/FetchCompnay');
require('dotenv').config();


const app = express();


//middlewares
app.use(morgan('common'));
app.use(cors({
  //only frontend can access backend
  origin: process.env.CORS_ORIGIN
}));

//parse body middleware (for JSON)
app.use(express.json());


app.use('/api/company', fetchCompany);
// app.use('/invoke', scraper);
// app.use('/test', disambiguation);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Ready at: ${ port }`);
});