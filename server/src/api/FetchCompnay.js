const fetch = require('node-fetch');
const convert = require('xml-js');

const { Router } = require('express');
const router = Router();

router.get('/:ico', async (req, res, next) => {
    try {
        const response = await fetch(`http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_or.cgi?ico=${ req.params.ico }&xml=0&ver=1.0.2`);
        const resXmlText = await response.text();

        const stringXmlObject = convert.xml2json(resXmlText, { compact: true, spaces: 4 });
        res.json(stringXmlObject);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
