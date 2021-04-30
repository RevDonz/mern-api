const express = require('express')

const app = express();
const router = express.Router();

router.use('/product', (req, res, next) => {
    res.json({nama: "Reva Doni Aprilio"})
})

app.use('/', router)

// GET '/users' => [[nama: "Doni"]]

app.listen(4000);