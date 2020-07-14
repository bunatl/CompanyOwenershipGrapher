const axios = require('axios');
// const request = require('request');
const cheerio = require('cheerio');

// const https = require('https');

/*  Axios guides
https://www.youtube.com/watch?v=qM4G1Ai2ZpE
https://www.youtube.com/watch?v=6LyagkoRWYA
*/

// cheerio guide: https://www.youtube.com/watch?v=LoziivfAAjE

const { Router } = require('express');
const router = Router();

function validateICO( ico ){
    let icoString = ico.toString();
    let icoLen = icoString.length;
    let sum = 0;
    let weight = 2;

    //dont use the last number
    for( let i = icoLen-2; i >= 0; i-- )
        sum += parseInt( icoString.charAt(i), 10 ) * weight++;

    let tmp = sum % 11;
    tmp = ( 11 - tmp ) % 10;

    return ( parseInt( icoString.charAt(icoLen -1 ), 10 ) == tmp ) ? true : false;
}

async function fetchData( myUrl ){
    try{
        const response = await axios({
            method: "get",
            url: myUrl,
        });
    
    parseData( response );
 
    } catch (error) {
        console.error(error);
    }
}

function parseData( fetchedResponse ){
    let $ = cheerio.load(fetchedResponse.data);

    // $('a').each( (i, e) => {
    //     let links = $(e).attr('href');      
    //     console.log($(e).text());
    // })
    const byClass = $('.result-details');
    const temp = byClass.children('tbody');
    console.log(temp.text());
    // $('.result-details tr').each( (i, el) => {
    //     console.log();
    // })
    // console.log( $('table').has('.result-details').text() );
}

router.get('/', (req, res, next) => {
    console.log("scraping...");

    const justiceURL = "https://or.justice.cz/ias/ui/";
    const serachParams = "rejstrik-$firma?ico=";

    //100000-39999999
    // for(let ico = 9999999; ico < 10999999; ico++)
    //     if ( validateICO( ico ) )
    //         console.log(ico);//fetchData ( `${justiceURL}${serachParams}${ico}` );
    fetchData(`${justiceURL}${serachParams}29448310`);
    res.send("done");
});

module.exports = router;
