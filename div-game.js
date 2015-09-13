"use strict";

(function(){

    var TOTAL_CELLS = 32;
    var cellContents = []; //this isn;t used currently...do I need it?
    var score = 0;
    var scoreDiv = document.getElementById('score');
    

    function makeDivs() {
        var container = document.getElementById('grid-container');
        var cell;
        
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;
            
            cell.item = Math.floor(Math.random() * 10);
            if (cell.item <= 1) {
                cell.item = 'BOMB';
                cell.style.color = 'red';
            } else {
                cell.item *= 10;
            }



            //event listener for click
            cell.onclick = function() {
                this.style.background = 'white';
                this.innerHTML = '<p class="item">' + this.item + '</p>';
                if (typeof(this.item) === 'number') {
                    score += this.item;
                    scoreDiv.innerHTML = score;
                } else if (this.item === 'BOMB') {
                    //nothing yet...

                }               
            }

            container.appendChild(cell);
        }

        return cellContents;
    }


    


    cellContents = makeDivs();
    





}());