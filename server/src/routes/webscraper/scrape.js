const axios = require("axios");
const cheerio = require("cheerio");

/*  Axios guides
  https://www.youtube.com/watch?v=qM4G1Ai2ZpE
  https://www.youtube.com/watch?v=6LyagkoRWYA
*/

/*cheerio guides: 
  https://www.youtube.com/watch?v=LoziivfAAjE
  https://www.youtube.com/watch?v=xTxo83RtmPY
*/

const { Router } = require("express");
const router = Router();

const justiceURL = "https://or.justice.cz/ias/ui/";
const serachParams = "rejstrik-$firma?ico=";

// validation formula: https://cs.wikipedia.org/wiki/Identifika%C4%8Dn%C3%AD_%C4%8D%C3%ADslo_osoby#Struktura_I%C4%8CO
function validateICO (ico) {
  let icoString = ico.toString();
  let icoLen = icoString.length;
  let weight = 2;
  let sum = 0;

  //dont use the last number
  for (let i = icoLen - 2; i >= 0; i--)
    sum += parseInt(icoString.charAt(i), 10) * weight++;

  let tmp = sum % 11;
  tmp = (11 - tmp) % 10;

  return parseInt(icoString.charAt(icoLen - 1), 10) == tmp ? true : false;
}

async function fetchData (myUrl) {
  try {
    const response = await axios({
      method: "get",
      url: myUrl,
    });

    if (response.status == 200) {
      const data = parseData(response);
      if (data != false || data.length == 0)
        return {
          nazev: data[ 0 ],
          ico: parseInt(data[ 1 ], 10),
          spisZn: data[ 2 ],
          denZapisu: data[ 3 ],
          sidlo: data[ 4 ]
        };
    }
  } catch (error) {
    console.error(error);
  }
}

function isCompany (data) {
  let $ = cheerio.load(data);

  const num = $(".fl")
    .children("span")
    .text();

  // if found 1 result = the company exists
  return num.includes("1");
}

function parseData (fetchedResponse) {
  if (!isCompany(fetchedResponse.data))
    return false;

  let $ = cheerio.load(fetchedResponse.data);

  const resultTable = [];
  $(".result-details tbody tr")
    .each((i, e) => {
      //first column
      const valueFirst = $(e).find('td')
        .first()
        .text()
        .replace(/\s\s+/g, "")
        .trim();

      // second column
      const valueSecond = $(e).find('td')
        .eq(1)
        .text()
        .replace(/\s\s+/g, "")
        .trim();

      resultTable.push(valueFirst);
      resultTable.push(valueSecond);
    });

  return resultTable;
}

router.get("/generate", async (req, res, next) => {
  let register = [];

  // small has to be set in place, otherwise it shuts down the web server
  for (let ico = 29448310; ico < 29448340; ico++)
    if (validateICO(ico)) {
      const companyData = await fetchData(`${ justiceURL }${ serachParams }${ ico }`);
      register.push(companyData);
      console.log(`Company with ICO ${ ico } has been proccessed.`);
    }
  res.json(register);
});

router.post("/getico", async (req, res, next) => {
  const ico = req.body.ico;
  if (validateICO(ico)) {
    const companyData = await fetchData(`${ justiceURL }${ serachParams }${ ico }`);
    console.log(`Company with ICO ${ ico } has been proccessed.`);
    res.json(companyData);
  }
});


module.exports = router;;
