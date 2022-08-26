// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view


//Creating an Constructor Function.
function Book(givenNaam, givenAuthor, givenType) {
    this.naam = givenNaam;
    this.author = givenAuthor;
    this.type = givenType;
}


//Display Constructor
function Display() {

}

//Add method to Display prototype.
//Implementing the add() method.
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.naam}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}

//Implementing the clear() method.
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implementing the validate() method.
Display.prototype.validate = function (book) {
    if (book.naam.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}

//Implementing the show() method.
Display.prototype.show=function(type,message){
    let msg=document.getElementById("msg");
    let boldText;
    if(type=="success"){
        boldText="Successfull:";
    }
    else{
        boldText="Error!";
    }
    msg.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                      <strong>${boldText}</strong> ${message}.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
    setTimeout(function() {
        msg.innerHTML=" ";
    }, 5000);                
}


//Add submit event listener to libraryForm.
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit); //here in event Listener we Use Name Function.

function libraryFormSubmit(e) {
    console.log("You Have Submitted Library Form");
    let naam = document.getElementById('bookName').value;
    let author = document.getElementById('authorName').value;
    let type;

    let fictional = document.getElementById('fictional');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fictional.checked) {
        type = fictional.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else {
        type = cooking.value;
    }

    let book = new Book(naam, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }
    e.preventDefault();
}