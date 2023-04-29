"use strict";

const btns = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');

for (const btn of btns) {
    btn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
});