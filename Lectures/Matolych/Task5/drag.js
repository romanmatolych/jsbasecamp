/**
 * @param {Element} elt 
 * @return {DOMRect} Includes scrollLeft and scrollTop properties
 */
function getBoundingDocumentRect(elt) {
    if (elt.nodeType !== Node.ELEMENT_NODE) throw new TypeError("elt is not of type 'Element'");
    const rect = elt.getBoundingClientRect();
    rect.scrollLeft = rect.left + document.documentElement.scrollLeft;
    rect.scrollTop = rect.top + document.documentElement.scrollTop;
    return rect;
}

/**
 * Class representing a dragged element
 * @param {Element} dragged Original element that is being dragged
 * @param {number} downX The horizontal coordinate, relative to the document, when dragging starts 
 * @param {number} downY The vertical coordinate, relative to the document, when dragging starts
 */
function DragElement(dragged, downX, downY) {
    if (dragged.nodeType !== Node.ELEMENT_NODE) throw new TypeError("dragged is not an Element");
    this.dragged = dragged;
    
    // Copied element to move
    this.clone = dragged.cloneNode(true);
    this.clone.style.position = "absolute";
    this.clone.style.zIndex = "999"; // Display on top of everything else

    const rect = getBoundingDocumentRect(dragged);
    this.offsetX = downX - rect.scrollLeft,
    this.offsetY = downY - rect.scrollTop;
}

// Moves cloned element to new coordinates
DragElement.prototype.move = function(newX, newY) {
    if (this.clone.parentNode !== document.body)
        document.body.appendChild(this.clone);
    
    this.clone.style.top = (newY - this.offsetY) + "px";
    this.clone.style.left = (newX - this.offsetX) + "px";
};

/**
 * Class that controlls drag operations between two elements
 * @param {(Element|HTMLDocument)} dragZone Element which contains draggable elements
 * @param {(Element|HTMLDocument)} dragTarget Element where to drop elements
 */
function DragManager(dragZone = document, dragTarget = document) {
    if ((dragZone.nodeType !== Node.ELEMENT_NODE && dragZone.nodeType !== Node.DOCUMENT_NODE) ||
        (dragTarget.nodeType !== Node.ELEMENT_NODE && dragTarget.nodeType !== Node.DOCUMENT_NODE)) throw new TypeError("Invalid arguments");

    let dragElement;

    const mousedown = function(event) {
        if (event.which !== 1) return;

        const draggable = event.target.closest(".draggable");
        if (!draggable) return;
        
        dragElement = new DragElement(draggable, event.pageX, event.pageY);
    };

    const mousemove = function(event) {
        if (!dragElement) return;
        
        dragElement.move(event.pageX, event.pageY);
    };
    
    const mouseup = function(event) {
        if (!dragElement) return;

        dragElement.clone.hidden = true; // Hide clone to get an element under the cursor
        const elem = document.elementFromPoint(event.clientX, event.clientY);
        const droppable = elem.closest(".droppable");
        dragElement.clone.hidden = false;

        let keepDefault = true;
        if (droppable && dragTarget.contains(elem)) {
            const dragended = new CustomEvent("dragended", {
                bubbles: true,
                cancelable: true,
                detail: {
                    dragged: dragElement.dragged,
                    droppable
                }
            });
            keepDefault = dragTarget.dispatchEvent(dragended);
        }

        if (keepDefault) dragElement.clone.remove(); // Get rid of clone when operation is done
        dragElement = null;
    };

    dragZone.addEventListener("mousedown", mousedown);
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
}