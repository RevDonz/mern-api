const express = require('express')

const app = express();

app.use(() => {
    console.log('Tes');
    console.log('yahaha');
})

app.listen(4000);