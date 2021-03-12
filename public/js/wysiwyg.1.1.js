class WYSIWYG {
    constructor(container) {
        this.container = container;
        this.content = document.createElement("div");
        this.buttons = {
            "bold" : document.createElement("button"),
            "italic" : document.createElement("button"),
            "underline" : document.createElement("button"),
			"CreateLink" : document.createElement("button")
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
		this.buttons["CreateLink"].innerHTML = "<img src='public/icons/link.png' height='10px' />";
	}


	addStyle(style, value) {
    	document.execCommand(style, false, value);
		this.buttons[style].classList.toggle("active");
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
			this.buttons[key].addEventListener("click", () => self.addStyle(key));
		});

		this.buttons["CreateLink"].addEventListener("click", () => {
			let link = prompt("Please enter a link:", "Link");
			self.addStyle("CreateLink", link);
		});

		this.content.addEventListener("click", () => self.checkType(), false);
		this.content.addEventListener("keydown", () => self.checkType(), false);

		this.content.focus();
	}
}