const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: 'running',
        skills: 'active'
    });
});

module.exports = app;
