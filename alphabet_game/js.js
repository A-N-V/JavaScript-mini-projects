"use strict";

const win = new Audio('audio/huge win.wav');
const audio = new Audio('audio/Mountain Audio - Menu Click.mp3');
const boxes = document.querySelectorAll('.boxes__box');
const ARRAY = ['box_a', 'box_b', 'box_c', 'box_d', 'box_e', 'box_f'];

for (const box of boxes) {
    box.addEventListener('click', () => {
        audio.play();

        if (box.previousElementSibling == null) {
            box.nextElementSibling.after(box);
        }
        else if(box.nextElementSibling == null) {
            box.previousElementSibling.before(box);
        }
        else {
            box.previousElementSibling.before(box);
        }

        let arr = [];
        let big = document.querySelectorAll('.boxes__box');
        for (const box of big) {
            arr.push(box.classList[1]);
        }
        if (JSON.stringify(arr) === JSON.stringify(ARRAY)) {
            win.play();
        }
    });
}
console.dir(window);