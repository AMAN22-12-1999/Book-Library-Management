console.log('This is ES6 version of Project 2');
class Book {
    constructor(givenNaam, givenAuthor, givenType) {
        this.naam = givenNaam;
        this.author = givenAuthor;
        this.type = givenType;
    }
}

class Display {
    add(book) {                                                        
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.naam.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, message) {
        let msg = document.getElementById('msg');
        let boldText;
        if(type==='success'){
            boldText = 'Successfull:';
        }
        else{
            boldText = 'Error!';
        }
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}</strong> ${message}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        setTimeout(function () {
            msg.innerHTML = '';
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
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
    else if (cooking.checked) {
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
