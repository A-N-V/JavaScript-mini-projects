"use strict"

const saveBtn = document.querySelector('.add_toDo_btn');
const inputText = document.querySelector('.add_toDo_input');
const removeBtn = document.querySelector('.removeBtn');
let done = Number(document.querySelector('.doneText').textContent);
let progress = Number(document.querySelector('.progress').textContent);
let trashBtn = document.querySelectorAll('.trash');
let pencilBtn = document.querySelectorAll('.pencil');
let checkBtn = document.querySelectorAll('.check');
init(trashBtn, removeItem);
init(checkBtn, checkItem);
init(pencilBtn, rewriteItem);

removeBtn.addEventListener('click', () => {
    const doneBtns = document.querySelectorAll('.done');
    for (let btn of doneBtns) {
        done -= 1;
        document.querySelector('.doneText').textContent = done;
        btn.parentElement.remove();
    }
});

saveBtn.addEventListener('click', () => {
    if (inputText.value === "") {
        inputText.placeholder = "Nothing to add";
    }
    else {
        inputText.placeholder = "Input your task";
        addItem(inputText.value);
        inputText.value = "";
        trashBtn = document.querySelectorAll('.trash');
        init(trashBtn, removeItem);
        checkBtn = document.querySelectorAll('.check');
        init(checkBtn, checkItem);
        let pencilBtn = document.querySelectorAll('.pencil');
        init(pencilBtn, rewriteItem);
        progress += 1;
        document.querySelector('.progress').textContent = progress;
    }
});


function init(elem, func){
    for(let btn of elem) {
        btn.addEventListener('click', func);
    }
}

function rewriteItem() {
    this.parentElement.previousElementSibling.removeAttribute('readonly');
    this.parentElement.classList.add('invisible');
    const btn = this.parentElement.nextElementSibling;
    btn.classList.remove('invisible');
    btn.addEventListener('click', () => {
        if (this.parentElement.previousElementSibling.value === "") {
            this.parentElement.previousElementSibling.classList.add('red');
        }
        else {
            this.parentElement.previousElementSibling.classList.remove('red');
            this.parentElement.previousElementSibling.setAttribute('readonly', 'readonly');
            this.parentElement.classList.remove('invisible');
            btn.classList.add('invisible');
        }
    });
}

function checkItem() {
    this.parentElement.previousElementSibling.classList.toggle('line');
    if (this.parentElement.previousElementSibling.classList.contains('line')) {
        progress -= 1;
        document.querySelector('.progress').textContent = progress;
        done += 1;
        document.querySelector('.doneText').textContent = done;
        this.parentElement.previousElementSibling.classList.add('done')
    }
    else {
        progress += 1;
        document.querySelector('.progress').textContent = progress;
        done -= 1;
        document.querySelector('.doneText').textContent = done;
        this.parentElement.previousElementSibling.classList.remove('done')
    }
}

function removeItem() {
    this.parentElement.parentElement.remove();
    if (this.parentElement.previousElementSibling.classList.contains('done')) {
        done -= 1;
        document.querySelector('.doneText').textContent = done;
    }
    else {
        progress -= 1;
        document.querySelector('.progress').textContent = progress;
    }

}

function addItem(text) {
    const toDoList = document.querySelector('.toDo_list');
    toDoList.insertAdjacentHTML('beforeend', 
    `
    <div class="toDo_list_item">
        <input type="text" readonly value="${text}" class="toDo_list_item_input">
        <div class="toDo_list_item_iconsBox">
            <img src="icons/trash.svg" alt="trash" class="trash">
            <img src="icons/pencil.svg" alt="pencil" class="pencil">
            <img src="icons/check-circle.svg" alt="check" class="check">
        </div>
        <button class="toDo_list_item_saveBtn invisible">save</button>
    </div>
    `);
}