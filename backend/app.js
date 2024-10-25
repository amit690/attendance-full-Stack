const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sequelize = require('./models/database'); 

const attendanceRoutes = require('./routes/attendance');
const summaryRoutes = require('./routes/summary');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON data from incoming requests
app.use(bodyParser.json());

// routes
app.use(attendanceRoutes);
app.use(summaryRoutes);


// Sync database and start the server
sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log('Error syncing database:', err);
    });
