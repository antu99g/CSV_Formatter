const express = require('express');
const port = 8000;
const app = express();

const upload = require('express-fileupload');


// Rendering static files
app.use(express.static("./assets"));

// Middleware for uploading file
app.use(upload({
   createParentPath: true
}));

// Setup view-engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', require('./routes/index'));


app.listen(port, (err) => {
   if(err){
      console.log(`Error in running the server: ${err}`);
   }
   console.log(`Server is running on port: ${port}`);
})