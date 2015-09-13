"use strict";

(function(){

    //treat these as constants
    var TOTAL_CELLS = 32;
    var ROW_LENGTH = 8;
    var POINTS_SCALE = 10;
    var POINTS_MIN = 10;
    var POINTS_MAX = 200;


    var score = 0;
    var defusers = 2;
    var scoreSpan = document.getElementById('score');
    var defusersSpan = document.getElementById('defusers')
    


    function makeDivs(items) {
        var container = document.getElementById('grid-container');
        var cell;
        
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;
            
            cell.item = items[i];
        
            //event listener for cell (can't get this to work as separate function?!?!?)
            cell.addEventListener('click', showItem, false);
            
            container.appendChild(cell);
        }
    }


    function showItem() {
        this.style.background = 'white';
        this.innerHTML = '<p class="item">' + this.item + '</p>';
        if (typeof(this.item) === 'number') {
            this.style.color = 'green';
            score += this.item;
            scoreSpan.innerHTML = score;
        } else if (this.item === 'BOMB') {
            this.style.color = 'red';
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
       
        //first fill with regular points
        for (var i = 0; i < TOTAL_CELLS; i++) {
            items[i] = (Math.floor(Math.random() * POINTS_MAX / POINTS_MIN) * POINTS_SCALE) + POINTS_MIN;
        }

        //generate bombs (one per row)
        for (var row = 0; row < TOTAL_CELLS / ROW_LENGTH; row++) {
            items[Math.floor(Math.random() * ROW_LENGTH) + (row * ROW_LENGTH)] = 'BOMB';
        }

        return items;
    }


    function endGame() {
        var cell;
        //remove all event listeners (disable clicking on them anymore)
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.getElementById(i);
            cell.removeEventListener('click', showItem, false);
        }
    }



    //run game
    makeDivs(makeItems());
    scoreSpan.innerHTML = score;
    defusersSpan.innerHTML = defusers;
    





}());