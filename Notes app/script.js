const notesContainer =document.querySelector('.notes_container');
const createBtn =document.querySelector('.btn');
let notes=document.querySelectorAll(".input_box");

function showNotes() {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes !== null) {
        storedNotes.forEach(note => {
            const inputBox = document.createElement("p");
            inputBox.className = "input_box";
            inputBox.setAttribute("contenteditable", "true");
            inputBox.textContent = note.content;
            
            const img = document.createElement("img");
            img.src = 'images/delete.png';
            
            notesContainer.appendChild(inputBox).appendChild(img);
        });
    }
}

function updateStorage() {
    const notes = [];
    document.querySelectorAll(".input_box").forEach(note => {
        notes.push({ content: note.textContent });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    inputBox.className = "input_box";
    inputBox.setAttribute("contenteditable", "true");
    
    const img = document.createElement("img");
    img.src = 'images/delete.png';
    img.addEventListener("click", () => {
        inputBox.remove();
        updateStorage();
    });
    
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage(); // Update storage when a new note is added
});

// Event listener to update storage when the content of a note is edited
notesContainer.addEventListener("input", updateStorage);

// Event listener to update storage when a note is deleted
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Call showNotes() when the page is loaded
showNotes();