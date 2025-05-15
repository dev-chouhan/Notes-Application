const connectToMongo = require('./db');
const cors = require("cors");
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
connectToMongo();

app.use(cors()); // This one is for fetching api through browser.
app.use(express.json());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res)=>{
    res.send("Hello Dev!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});