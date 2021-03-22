// Helper functions
function isActive(button) {
    return button.classList.contains("WYSIWYG-active-button");
}

function removeDuplicateChildren(addedStyle, removedStyle, element) {
    if(element.childNodes < 1) return;
    element.forEach(e => {
        if(e.classList !== undefined && (e.classList.contains("WYSIWYG-" + addedStyle) || e.classList.contains("WYSIWYG-" + removedStyle))) {
            let text = document.createTextNode(e.innerText);
            e.parentNode.insertBefore(text, e)
            e.parentNode.removeChild(e);
        }
        removeDuplicateChildren(addedStyle, removedStyle, e.childNodes);
    });
}

function cleanupParents(addedStyle, removedStyle, wrapper) {
    let parentContent = "";
    let parent = wrapper.parentNode;

    while(parent !== this.content) {
        // Get children of parent and add their text
        parent.childNodes.forEach(e => {
            if(e.nodeType === Node.TEXT_NODE) parentContent += e.textContent;
        });

        let grandParent = parent.parentNode;

        // Remove parent if it has no text
        if(parentContent == "") {
            let hasAddedStyle = parent.classList.contains("WYSIWYG-" + addedStyle);
            let hasRemovedStyle = parent.classList.contains("WYSIWYG-" + removedStyle);
            if(hasAddedStyle || hasRemovedStyle) {  
                console.dir(parent);          
                parent.parentNode.insertBefore(wrapper, parent); 
                parent.remove();

                grandParent = wrapper.parentNode;
            } else {
                wrapper = parent;
            }
        }

        // Get next parent
        parent = grandParent;
    }
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
    // Get selected text
    let selection = this.getHighlight().getRangeAt(0);
    
    // Create wrapper for apllied style
    let wrapper = document.createElement("span");
    // Collect content of selection
    let contents = selection.extractContents();

    // Append content to wrapper
    wrapper.appendChild(contents);
    
    // Add style to wrapper
    wrapper.classList.add("WYSIWYG-" + addedStyle);
    // Insert into selected position
    selection.insertNode(wrapper);

    // If selection is empty, add invisible char
    if(selection.toString().length === 0) wrapper.innerHTML = "&zwnj;";

    // Cleanup
    cleanupParents(addedStyle, removedStyle, wrapper);
    removeDuplicateChildren(addedStyle, removedStyle, wrapper.childNodes);

    // Set cursor 
    selection.setStartAfter(wrapper);

    this.content.normalize();
    this.content.focus();
}


// Init deafult package
WYSIWYG.prototype.default = function() {
    this.buttons.bold = this.bold();
    this.buttons.italic = this.italic();
}