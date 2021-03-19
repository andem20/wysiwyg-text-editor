// Helper functions

function isActive(button) {
    return button.classList.contains("WYSIWYG-active-button");
}

function removeDuplicateStyles(style, element) {
    if(element.childNodes > 0) return 0;
    element.forEach(e => {
        if(e.classList !== undefined && e.classList.contains("WYSIWYG-style-" + style)) {
            let text = document.createTextNode(e.innerText);
            e.parentNode.insertBefore(text, e)
            e.parentNode.removeChild(e);
        }
        removeDuplicateStyles(style, e.childNodes);
    });
}


// Styles
WYSIWYG.prototype.bold = function() {
    const button = this.createButton("bold", "B");

    button.addEventListener("click", () => {
        if(isActive(button)) {
            this.addTags("weight-normal");
        } else {
            this.addTags("weight-bold"); 
        } 
    });

    return button;
};

WYSIWYG.prototype.italic = function() {
    const button = this.createButton("italic", "I");

    button.addEventListener("click", () => {
        if(isActive(button)) {
            this.addTags("style-normal");
        } else {
            this.addTags("style-italic"); 
        } 
    });

    return button;
};

// Add tags
WYSIWYG.prototype.addTags = function(style) {
    let selection = this.getHighlight().getRangeAt(0);
    
    let element = document.createElement("span");
    let contents = selection.extractContents();

    removeDuplicateStyles(style, contents.childNodes);

    element.appendChild(contents);
    // Taverse childnodes and unwrap dublicated styles
    element.classList.add("WYSIWYG-" + style);
    selection.insertNode(element);

    if(selection.toString().length === 0) {
        element.innerHTML = "&zwnj;";
    }

    selection.setStartAfter(element);
    this.content.focus();
}


// Init deafult package
WYSIWYG.prototype.default = function() {
    this.buttons.bold = this.bold();
    this.buttons.italic = this.italic();
}