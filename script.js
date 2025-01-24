const notesContainer = document.querySelector(".notesContainer");
const createBtn = document.querySelector(".createBtn");

let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML=localStorage.getItem("notes") || '';
    notes= document.querySelectorAll(".input-box");
   
    notes.forEach(nt =>{
        nt.onkeyup = function(){
            updateStorage();
        };
    });
}
showNotes();
function updateStorage(){
    localStorage.setItem("notes" , notesContainer.innerHTML);
}


createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "notes-app-img/images/delete.png";
    notesContainer.appendChild(inputBox);
    inputBox.appendChild(img);
    updateStorage();
});

notesContainer.addEventListener("click", function(e){

    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "p"){
        notes= document.querySelectorAll(".input-box");
        notes.forEach(nt =>{
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }


});

document.addEventListener ("keydown" , event =>{
    if(event.key === "Enter"){
        event.preventDefault();
        document.execCommand("insertLineBreak");
    }

});

notesContainer.addEventListener("keydown", function (e) {
    if (e.target.tagName === "P" && e.target.isContentEditable) {
        if (e.key === "Backspace" || e.key === "Delete") {
            const cursorPos = window.getSelection().getRangeAt(0).startOffset;
            const pElement = e.target;

            const firstChild = pElement.firstChild;
            if (firstChild && firstChild.tagName === "IMG" && cursorPos === 0) {
                e.preventDefault();
            }
        }
    }
});

updateStorage();

