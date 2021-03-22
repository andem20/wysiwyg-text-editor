"use strict";
 
const WYSIWYG = function(setup) {
    this.setup = setup;
    this.container = setup.container;
    this.content = document.createElement("div");
    this.content.contentEditable = "true";
    this.content.className = "wContent";
    this.buttons = {};

    // Add features
    this[this.setup.package]();

    // Create menu
    let menu = document.createElement("div");
    menu.className = "wMenu";

    // Moving pre-text to this.content
    this.content.innerHTML = this.container.innerHTML;
    this.container.innerHTML = "";

    // Append children
    this.container.append(menu, this.content);
    Object.values(this.buttons).forEach(e => menu.appendChild(e));

    this.content.focus();

    // Detect type of tag surrounding text
    this.content.addEventListener("click", () => {
        this.detectType();
    });

    this.content.addEventListener("keyup", () => {
        this.detectType();
    });
};

WYSIWYG.prototype.createButton = function(type, symbol) {
    const button = document.createElement("button");
    button.classList.add("WYSIWYG-"+ type);
    button.innerHTML = symbol;

    return button;
}

WYSIWYG.prototype.getHighlight = function() {
    return window.getSelection() || document.getSelection() || document.selection.createRange().text;
}

WYSIWYG.prototype.detectType = function() {
    Object.values(this.buttons).forEach(b => b.classList.remove("WYSIWYG-active-button"));
    let tags = [];
    let parent = this.getHighlight().anchorNode.parentNode;

    while(parent !== this.content && parent !== this.container) {
        tags.push(parent);
        parent = parent.parentNode;
    }

    tags.forEach(t => {
        let type = t.className.split("-")[2];
        if(this.buttons[type]) this.buttons[type].classList.add("WYSIWYG-active-button");
    });
}
