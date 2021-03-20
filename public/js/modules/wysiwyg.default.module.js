// Helper functions

function isActive(button) {
    return button.classList.contains("WYSIWYG-active-button");
}

function removeDuplicateChildren(addedStyle, removedStyle, element) {
    if(element.childNodes > 0) return;
    element.forEach(e => {
        if(e.classList !== undefined && (e.classList.contains("WYSIWYG-" + addedStyle) || e.classList.contains("WYSIWYG-" + removedStyle))) {
            let text = document.createTextNode(e.innerText);
            e.parentNode.insertBefore(text, e)
            e.parentNode.removeChild(e);
        }
        removeDuplicateChildren(addedStyle, removedStyle, e.childNodes);
    });
}


// Styles
WYSIWYG.prototype.bold = function() {
    const button = this.createButton("bold", "B");

    button.addEventListener("click", () => {
        if(isActive(button)) {
            this.addTags("weight-normal", "weight-bold");
        } else {
            this.addTags("weight-bold", "weight-normal"); 
        } 
    });

    return button;
};

WYSIWYG.prototype.italic = function() {
    const button = this.createButton("italic", "I");

    button.addEventListener("click", () => {
        if(isActive(button)) {
            this.addTags("style-normal", "style-italic");
        } else {
            this.addTags("style-italic", "style-normal"); 
        } 
    });

    return button;
};

// Add tags
WYSIWYG.prototype.addTags = function(addedStyle, removedStyle) {
    let selection = this.getHighlight().getRangeAt(0);
    
    let element = document.createElement("span");
    let contents = selection.extractContents();
    
    removeDuplicateChildren(addedStyle, removedStyle, contents.childNodes);

    element.appendChild(contents);
    
    element.classList.add("WYSIWYG-" + addedStyle);
    selection.insertNode(element);

    if(selection.toString().length === 0) element.innerHTML = "&zwnj;";

    let parentContent = "";
    let parent = element.parentNode;

    // TODO fix for different styles
    while(parent !== this.content) {
        console.log(parent);
        // Get children of parent and add their text
        parent.childNodes.forEach(e => {
            if(e.nodeType === 3) parentContent += e.textContent;
        });

        // Remove parent if it has no text
        if(parentContent == "" && (parent.classList.contains("WYSIWYG-" + addedStyle) || parent.classList.contains("WYSIWYG-" + removedStyle))) {
            parent.parentNode.insertBefore(element, parent);
            parent.remove();
        }

        parent = parent.parentNode;
    }

    selection.setStartAfter(element);

    this.content.normalize();
    this.content.focus();
}


// Init deafult package
WYSIWYG.prototype.default = function() {
    this.buttons.bold = this.bold();
    this.buttons.italic = this.italic();
}