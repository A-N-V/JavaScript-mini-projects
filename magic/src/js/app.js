"use strict"

const board = document.querySelector('#board');
const SQUARES_NUMBER = 504;
const colors = ['#A887A6', '#5D89A4', '#5D92B2', '#4E6074', '#6D9DB3', '#AAC8AD', '#345F8C', '#BBDD30', '#5A647E', '#4E9FC5', '#C1BBEB', '#C476DC', '#FCA5BA', '#EDA8CB', '#A576D6', '#F92C85', '#061283', '#FD3C3C', '#FFB74C', '#138D90', '#F34A4A'];

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => {
        setColor(square);
    });

    square.addEventListener('mouseleave', () => {
        removeColor(square);
    });

    board.append(square);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.background = '#1d1d1d';
    element.style.boxShadow = `0 0 2px #000`;
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}