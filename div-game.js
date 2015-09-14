"use strict";

(function(){

    //treat these as constants
    var TOTAL_CELLS = 32;
    var ROW_LENGTH = 8;
    var POINTS_SCALE = 10;
    var POINTS_MIN = 10;
    var POINTS_MAX = 200;


    var score = 0;
    var defusers = 1;
    var multiplier = 1;
    var scoreSpan = document.getElementById('score');
    var defusersSpan = document.getElementById('defusers');
    var multiplierSpan = document.getElementById('multiplier');
    var body = document.getElementById('bg');

    var bombColumns = [];
    


    function makeDivs(items) {
        var container = document.getElementById('grid-container');
        var cell;
        
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;
            
            cell.item = items[i];
        
            cell.addEventListener('click', showItem, false);
            
            container.appendChild(cell);
        }
    }


    function showItem() {
        var column = this.id % ROW_LENGTH;

        this.removeEventListener('click', showItem, false);
        
        //check for bomb(s) in same column to give warning color
        if (bombColumns.indexOf(column) > -1) {
            this.style.background = 'yellow';
        } else {
            this.style.background = 'white';
        }

        if (typeof(this.item) === 'number') {
            this.innerHTML = '<p class="item">' + (this.item * multiplier) + '</p>';
            if (this.item < 0) {
                this.style.color = 'black';
            } else {
                this.style.color = 'green';
            }
            score += this.item * multiplier;
            scoreSpan.innerHTML = score;
        } 

        else if (this.item === 'X') {
            multiplier++;
            this.innerHTML = '<p class="item">' + this.item + ' ' + multiplier + '</p>';
            this.style.color = 'blue';
            this.style.fontWeight = 'bold';
            multiplierSpan.innerHTML = multiplier;
        } 

        else if (this.item === '1/2') {
            this.innerHTML = '<p class="item">' + this.item + '</p>'
            this.style.color = 'red';
            score = score / 2;
            scoreSpan.innerHTML = score;
        }

        else if (this.item === 'BOMB') {
            this.style.background = 'red';
            
            //flash when clicked on bomb
            bg.style.background = 'red';
            window.setTimeout(function() { bg.style.background = 'lightblue'; }, 200);

            defusers--;
            defusersSpan.innerHTML = defusers;
            if (defusers < 0) {
                defusersSpan.innerHTML = 0;
                endGame();
            }
        }               
    }


    function makeItems() {
        var items = [];
        var bombs = [];
        var column;
        var mult1, mult2;
        var sub, half;
       
        //first fill with regular points
        for (var i = 0; i < TOTAL_CELLS; i++) {
            items[i] = (Math.floor(Math.random() * POINTS_MAX / POINTS_MIN) * POINTS_SCALE) + POINTS_MIN;
        }

        //generate bombs (one per row)
        for (var row = 0; row < TOTAL_CELLS / ROW_LENGTH; row++) {
            column = Math.floor(Math.random() * ROW_LENGTH);
            bombs.push(column + row * ROW_LENGTH);
            bombColumns.push(column); //for checking for hints
            items[bombs[row]] = 'BOMB';
        }

        //add two multipliers (but don't overwrite bombs)
        do {
            mult1 = Math.floor(Math.random() * TOTAL_CELLS);
        } while (bombs.indexOf(mult1) > -1);
        do {
            mult2 = Math.floor(Math.random() * TOTAL_CELLS);
        } while (bombs.indexOf(mult2) > -1 || mult1 === mult2);

        items[mult1] = 'X'
        items[mult2] = 'X'

        //add big subtractor (without overwriting bombs/mults)
        do {
            sub = Math.floor(Math.random() * TOTAL_CELLS);
        } while (bombs.indexOf(sub) > -1 || sub === mult1 || sub === mult2);
       
        items[sub] = -300;

        //add score halver
        do {
            half = Math.floor(Math.random() * TOTAL_CELLS);
        } while (bombs.indexOf(half) > -1 || half === mult1 || half === mult2 || half === sub);
       
        items[half] = '1/2';


        return items;
    }


    function endGame() {
        var cell;
        //remove all event listeners (disable clicking on them anymore)
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.getElementById(i);
            cell.removeEventListener('click', showItem, false);
        }
        scoreSpan.className += " end-animation";
    }



    //run game
    makeDivs(makeItems());
    scoreSpan.innerHTML = score;
    defusersSpan.innerHTML = defusers;
    multiplierSpan.innerHTML = multiplier;
    





}());