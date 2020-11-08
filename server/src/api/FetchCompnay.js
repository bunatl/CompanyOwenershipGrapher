const fetch = require('node-fetch');
var parseString = require('xml2js').parseString;

const { Router } = require('express');
const router = Router();

router.get('/:ico', async (req, res, next) => {
    try {
        const response = await fetch(`http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_or.cgi?ico=${ req.params.ico }&xml=0`);
        const resXmlText = await response.text();

        // parse string to XML
        parseString(resXmlText, (err, result) => {
            res.json(result);
        });
        // console.log(responseJSON);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
