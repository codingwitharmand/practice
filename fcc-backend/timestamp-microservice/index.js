const express = require('express');
const app = express();

app.get('/api/:value?', (req, res) => {
    let value = req.params.value;
    console.log(`Val: ${value}`);
    if(value === undefined){
    const now = new Date();
    res.json({
        'unix': Math.floor(now.getTime() / 1000),
        'utc': now.toUTCString()
    });
    }

    value = isNaN(Number(value)) ? value : parseInt(value)
    const timestamp = new Date(value);

    if (isNaN(timestamp.getTime())) {
        return res.status(400).json({ error: 'Invalid date'});
    }

    const utc = timestamp.toUTCString();
    const unix = timestamp.getTime() / 1000;

    res.json({ unix, utc });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});