const router = require('express').Router();
module.exports = router;
const axios = require('axios');

let currencyArray = []

const conversion = []
const currencies = ['USD', 'EUR', 'SGD']
for (let i = 0; i < currencies.length; i++) {
    for (let j = i + 1; j < currencies.length; j++) {
        conversion.push(`${currencies[i]}_${currencies[j]}`)
        conversion.push(`${currencies[j]}_${currencies[i]}`)
    }
}

const refreshCache = async function () {
    const responses = conversion.map(pair =>
        axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${pair}&compact=y`)
    )
    const values = await Promise.all(responses)
    currencyArray = values.map(response => response.data)

}
refreshCache()
setInterval(refreshCache, 60000);


router.get('/:currencyRequest', async (req, res, next) => {
    try {
        let currencyRequest = req.params.currencyRequest;
        const currencyExist = currencyArray.find(val => {
            let existval = Object.keys(val)
            return existval[0] === currencyRequest
        })

        res.send(currencyExist[currencyRequest])

    } catch (err) {
        next(err);
    }
});