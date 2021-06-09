// Dependencies
const express = require('express');
const path = require('path');

// Tells Node that we are creating an express server
// Sets up the Express App (Tells Node that we are creating an express server)
const app = express();

// set inital portc
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// databse
const tables = [
    { customerName: 'Valerie', phoneNumber: '555-111-2222', customerEmail: 'valerie@aol.com', customerID: '123123', },
    { customerName: 'Scott', phoneNumber: '555-111-2222', customerEmail: 'scott@aol.com', customerID: '123123', }
];

const waitlist = [
    { customerName: 'Waiting', phoneNumber: '555-111-2222', customerEmail: 'wait@aol.com', customerID: '123123', }
];

// Routes
// Basic route that sends the user first to the AJAX page
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/home.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, './public/tables.html')));

app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, './public/reservation.html')));

// get all Tables
app.get('/api/tables', (req, res) => res.json(tables));

// get waitlisted
app.get('/api/waitlist', (req, res) => res.json(waitlist));

app.post('/api/tables', (req, res) => {

    const newTable = req.body;
    console.log(newTable);
    if (tables.length < 2) {
        tables.push(newTable);
        res.json(true);
    } else {
        waitlist.push(newTable);
        res.json(false);
    }
});

//clear data
app.post('/api/clear', (req, res) => {
    tables.length = 0;
    waitlist.length = 0;

    res.json({ ok: true });
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
