const { Router } = require('express');

const router = Router();

const Owener = require('../model/Owener');
const Company = require('../model/Company');


router.get('/', async (req, res, next) => {
    try{
    //get all entries from Owener DB
    const allEntries = await Owener.find();
    res.json(allEntries);
    } catch (error){
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const newOwener = new Owener(req.body);
        //const newCompany = new Company(req.body);
        const owenerCreated = await newOwener.save();
        res.json( owenerCreated );
    } catch (error) {
        //passing to erro handler
        next(error);
    }

    // res.json({
    //     respond: "thx!"
    // })
});


module.exports = router;
