"use strict";

(function(){

    var TOTAL_CELLS = 32;
    
    function makeDivs() {
        var container = document.getElementById('grid-container');
        var cell;
        
        for (var i = 0; i < TOTAL_CELLS; i++) {
            cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = i;

            container.appendChild(cell);

        }

    }




    makeDivs();





}());