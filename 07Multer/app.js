const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req,file,cb){ 
        cb(null,'./public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    // limits: { fileSize: 1000000 },
}).single("myimage");

// Set EJS Engine
app.set('view engine', 'ejs');

// static folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send("Multer is Working ....");
});

//Description: upload.single("myImage") - myImage is the name of the input field in the form

app.post('/upload', (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.render('index', {
                    message: error
                })
        } else {
                    res.render('index', {
                    message: 'File Uploaded Succesfully...!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    );
});



app.listen(port, () => console.log(`listening on http://localhost:${port}`));
