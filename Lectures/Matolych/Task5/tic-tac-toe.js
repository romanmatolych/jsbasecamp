// Class for Xs and Os game
class TicTacToe {
    /**
     * @return {HTMLDivElement} Div container with all elements of the game inside. Lazy rendering
     */
    getElt() {
        if (!this._elt) this.render();
        return this._elt;
    }

    // Creates and stores all parts of the game
    render() {
        this._elt = document.createElement("div");
        this._elt.className = "tic-tac-toe";

        this._board = this._createBoard();
        this._elt.appendChild(this._board);
        
        const players = this._createPlayers();
        this._elt.appendChild(players);

        const refreshButton = document.createElement("button");
        refreshButton.type = "button";
        refreshButton.textContent = "Refresh";
        refreshButton.addEventListener("click", this.refresh.bind(this));
        this._elt.appendChild(refreshButton);

        new DragManager(players, this._board);

        this._board.addEventListener("dragended", this._ondragended);
    }

    _createBoard() {
        const table = document.createElement("table");

        for (let i = 0; i < 3; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j < 3; j++) {
                const td = document.createElement("td");
                td.classList.add("droppable", "available");
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }

    _createPlayers() {
        const X = document.createElement("span");
        X.textContent = "X";
        X.classList.add("draggable");
        
        const O = document.createElement("span");
        O.textContent = "O";
        O.classList.add("draggable");

        const players = document.createElement("div");
        players.classList.add("players");
        players.appendChild(X);
        const delimiter = " | ";
        players.appendChild(document.createTextNode(delimiter)); 
        players.appendChild(O);
        return players;
    }

    // Clears game board
    refresh() {
        if (!this._board) return;
        
        Array.prototype.forEach.call(this._board.rows, 
            row => Array.prototype.forEach.call(row.cells, cell => {
                while (cell.firstChild) 
                    cell.removeChild(cell.firstChild);
                cell.classList.add("available");
            }));
    }

    // Listener for 'dragended' event
    _ondragended(event) {
        const droppable = event.detail.droppable, 
            dragged = event.detail.dragged;
        if (droppable.classList.contains("available")) {
            droppable.classList.remove("available");
            while (droppable.firstChild) 
                droppable.removeChild(droppable.firstChild);
            
            // Drop dragged element
            const new_elt = dragged.cloneNode(true);
            new_elt.classList.remove("draggable");
            droppable.appendChild(new_elt);
        }
    }
}