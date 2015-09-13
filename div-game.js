"use strict";

(function(){

    //treat these as constants
    var TOTAL_CELLS = 32;
    var ROW_LENGTH = 8;
    var POINTS_SCALE = 10;
    var POINTS_MIN = 10;
    var POINTS_MAX = 200;


    var score = 0;
    var scoreDiv = document.getElementById('score');
    


    function makeDivs(items) {
        var container = document.getElementById('grid-container');
        var cell;
        
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;
            
            cell.item = items[i];
        
            //event listener for cell
            cell.onclick = function() {
                this.style.background = 'white';
                this.innerHTML = '<p class="item">' + this.item + '</p>';
                if (typeof(this.item) === 'number') {
                    score += this.item;
                    scoreDiv.innerHTML = score;
                } else if (this.item === 'BOMB') {
                    this.style.color = 'red';
                }
            }               
            
            container.appendChild(cell);
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




    //run game
    makeDivs(makeItems());
    





}());