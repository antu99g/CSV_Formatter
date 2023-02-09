const fs = require('fs');
const path = require("path");
const csv = require("csvtojson");


// Rendering home page with list of all uploaded files
module.exports.home = function (req, res) {
   let files = fs.readdirSync(path.join(__dirname, '..', 'uploads'));
   return res.render("home", {files, json: []});
}


// Uploading a file
module.exports.uploadFile = async function (req, res) {
   try{
      // checking for csv filetype
      if (req.files && req.files.file.mimetype == "text/csv") {
         // Storing new csv file to uploads folder
         let file = req.files.file;
         let filePath = path.join(__dirname, "..", "uploads", file.name);
   
         await file.mv(filePath, function (err) {
            if (err) {
               console.log("Error: ", err);
            } else {
               console.log("File uploaded");
            }
         });
      }
      return res.redirect("/");
   }catch(err){
      console.log(err);
      return res.redirect("/");
   }
};


// Rendering a csv and parsing into json
module.exports.getData = function (req, res) {
   // Reading all file names from uploads folder
   let files = fs.readdirSync(path.join(__dirname, "..", "uploads"));
   let csvpath = path.join(__dirname, "..", "uploads", req.params.csv);

   csv()
   .fromFile(csvpath)
   .then((json) => {
      return res.render("home", { files, json });
   })
   .catch((err) => {
      console.log("Error in parsing csv", err);
      return res.redirect('/');
   });
}


module.exports.deleteFile = async function (req, res) {
   try{
      console.log('filename', req.params.filename);
      if(fs.existsSync(path.join(__dirname, "..", 'uploads', req.params.filename))){
         fs.unlinkSync(path.join(__dirname, "..", 'uploads', req.params.filename));
         return;
      } else {
         throw new Error('File not found');
      }
   } catch (err) {
      console.log('Error in deleting file', err);
   }

};