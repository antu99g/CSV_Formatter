// Input to upload file
const fileInput = document.querySelector(".upload input");
// Table
const table = document.querySelector(".table-container table");
// Table-head
const thead = document.querySelector("table thead");
// Table-body
const tbody = document.querySelector("table tbody");
// List of all headers in table-head
const header = document.querySelectorAll("thead tr th");
// List of all rows in table-body
const rowsList = document.querySelectorAll("tbody tr");
// Given input for search
const inputCol = document.querySelector(".searchBar input");



// Function for showing search results in DOM

function searchResult(){

   // Removing previous search-result from DOM
   let prevSearch = document.getElementById("searchResult");
   if(prevSearch != null){
      prevSearch.remove();
   }

   let input = inputCol.value;
   let index;  // variable holding the index of searched column

   // Matching given input with all headers in table
   header.forEach((colHead, colHeadIndex) => {
      if (input.toLowerCase() == colHead.innerText.toLowerCase()) {
         index = colHeadIndex;
      }
   });

   // Creating new table-row
   let tr = document.createElement('tr');
   tr.id = 'searchResult';

   // Adding the matched header to the created row
   let th = header[index].cloneNode(true);
   tr.appendChild(th);

   // Adding all data of matched column to the created row
   rowsList.forEach((row) => {
      let td = row.children[index].cloneNode(true);
      tr.appendChild(td);
   })
   
   // Hiding all table elements and showing the created row
   thead.style.display = 'none';
   tbody.style.display = 'none';
   table.appendChild(tr);
}



// Function to allow only csv file to get uploaded
fileInput.onchange = function ({target}) {
   var filePath = target.value;

   // Allowing file type
   var allowedExtensions = /(\.csv)$/i;

   if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type. Please upload a csv file.");
      fileInput.value = "";
   }
};



// Click event on the search button
document.onclick = function (e) {
   if(e.target.classList.contains('fa-magnifying-glass')){
      searchResult();
   }
}