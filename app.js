const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const googleTrends = require('google-trends-api');
const https = require('https');
const app = express();

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// cors
app.use(cors());

app.get('/g', asyncHandler(async (req, res, next) => {
    try {
        googleTrends.dailyTrends({ geo: req.query.country })
            .then(function (results) {
                const finalRes = JSON.parse(results)
                res.status(200).json(finalRes);
                next();
            })
            .catch(function (err) {
                next(err)
            });
    } catch (error) {
        next(error);
    }
}));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
