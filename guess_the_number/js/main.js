"use strict";

const boxes = document.querySelectorAll('.boxes__box');
const audio = new Audio('audio/Mountain Audio - Menu Click.mp3')
const restartBtn = document.querySelector('.restart_btn');
const tries = document.querySelector('.tries');
const checkbox = document.querySelector('.checkbox');
const answer = document.querySelector('.answer');
const checkAnswerBtn = document.querySelector('.check_answer');
const info = document.querySelector('.info');
const champion = document.querySelector('.record');
const body = document.querySelector('body');
let number = 20;
let randomNumber = Math.round(Math.random() * 20);
let value;
let record = 0;
let buf = 1000;

restartBtn.addEventListener('click', restart);
checkAnswerBtn.addEventListener('click', check);

function restart() {
    audio.play();
    tries.textContent = '20';
    checkbox.textContent = '?';
    answer.value = '';
    randomNumber = Math.round(Math.random() * 20);
    info.textContent = 'Угадай число';
    number = 20;
    record = 0;
    body.classList.remove('green');
    answer.classList.remove('green');
}

function check() {
    audio.play();
    if (number != 0) {
        value = answer.value;
        value = Number(value);
        if (!value) {
            info.textContent = 'Введите число!!!';
        }
        else if (value === '') {
            info.textContent = 'Введите число!!!';
        }
        else if (value === randomNumber) {
            info.textContent = 'Верно';
            checkbox.textContent = `${randomNumber}`;
            body.classList.add('green');
            answer.classList.add('green');
            if (record < buf) {
                champion.textContent = `${record}`;
                buf = record;
            }
        }
        else if (value > randomNumber) {
            info.textContent = 'Больше чем надо';
            tries.textContent = `${number -= 1}`;
            record += 1;
        }
        else if (value < randomNumber) {
            info.textContent = 'Меньше чем надо';
            tries.textContent = `${number -= 1}`;
            record += 1;
        }
    }
    else {
        info.textContent = 'Попытки кончились, попробуй заново';
    }
}



