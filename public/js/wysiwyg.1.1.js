class WYSIWYG {
    constructor(container) {
        this.container = container;
        this.content = document.createElement("div");
        this.buttons = {
            "bold" : document.createElement("button"),
            "italic" : document.createElement("button"),
            "underline" : document.createElement("button"),
			"createLink" : document.createElement("button"),
			"justifyLeft" : document.createElement("button"),
			"justifyCenter" : document.createElement("button"),
			"justifyRight" : document.createElement("button"),
			"justifyFull" : document.createElement("button")
        };

        this.init();
    }

    createEditor() {
        // Create elements
        let menu = document.createElement("div");

        // Append style
		this.content.className = "wContent";
		menu.className = "wMenu";

        // Append children
		this.container.append(menu, this.content);
		Object.values(this.buttons).forEach(e => menu.appendChild(e));

        // Add content
		this.content.contentEditable = "true";
		this.buttons["bold"].innerHTML = "<b>B</b>";
		this.buttons["italic"].innerHTML = "<i>I</i>";
		this.buttons["underline"].innerHTML = "<u>U</u>";
		// TODO do it with css instead
		this.buttons["createLink"].innerHTML = "<img src='public/icons/link.png' height='10px' />";
		this.buttons["justifyLeft"].innerHTML = "<img src='public/icons/left-align.png' height='15px' />";
		this.buttons["justifyCenter"].innerHTML = "<img src='public/icons/center-align.png' height='15px' />";
		this.buttons["justifyRight"].innerHTML = "<img src='public/icons/right-align.png' height='15px' />";
		this.buttons["justifyFull"].innerHTML = "<img src='public/icons/justify-align.png' height='15px' />";
	}

	addStyle(style, value) {
    	document.execCommand(style, false, value);
		this.buttons[style].classList.toggle("active");
		this.checkType();
    	this.content.focus();
	}

	checkType() {
		Object.keys(this.buttons).forEach(key => {
			this.buttons[key].classList.remove("active");
			if(document.queryCommandState(key)) this.buttons[key].classList.add("active");
		});
	}

	init() {
		this.createEditor();
        let self = this;

		Object.keys(this.buttons).forEach(key => {
			self.buttons[key].addEventListener("click", () => self.addStyle(key));
		});

		this.buttons["createLink"].addEventListener("click", () => {
			let link = prompt("Please enter a link:", "Link");
			self.addStyle("createLink", link);
		});

		this.content.addEventListener("click", () => self.checkType(), false);
		this.content.addEventListener("keydown", () => self.checkType(), false);

		this.content.focus();
	}
}