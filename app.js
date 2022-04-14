const express = require('express');
const { spawn } = require('child_process')
const app = express();
const PORT = process.env.PORT || 3000;

// Body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Set The View Engine
app.set('view engine', 'ejs');

// Set The Static Path
app.use(express.static('public'));

app.get('/', (req, res) => {
    try {
        const search = req.query.search;
        if (search) {
            const python = spawn('python', ['sha-256.py', search]);
            python.stdout.on('data', (data) => {
                res.json({
                    'search': search,
                    'hash': data.toString()
                });
            });
        }
        else {
            res.render('index');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});