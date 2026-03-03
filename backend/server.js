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
const internRoutes = require('./src/routes/intern.routes');
const careerRoutes = require('./src/routes/career.routes');
const procedureRoutes = require('./src/routes/procedure.routes');
const userRoutes = require('./src/routes/user.routes');

app.use('/api/interns', internRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/procedures', procedureRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
