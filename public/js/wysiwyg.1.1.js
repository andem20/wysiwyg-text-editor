class WYSIWYG {
    constructor(container) {
        this.container = container;
        this.content = document.createElement("div");
        this.buttons = {
            "bold" : document.createElement("button"),
            "italic" : document.createElement("button"),
            "underline" : document.createElement("button"),
			"link" : document.createElement("button")
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
		menu.append(this.buttons["bold"], 
					this.buttons["italic"], 
					this.buttons["underline"], 
					this.buttons["link"]
				);

        // Add content
		this.content.contentEditable = "true";
		this.buttons["bold"].innerHTML = "<b>B</b>";
		this.buttons["italic"].innerHTML = "<i>I</i>";
		this.buttons["underline"].innerHTML = "<u>U</u>";
		this.buttons["link"].innerHTML = "<img src='public/icons/link.png' height='10px' />";
	}


	addStyle(style, value) {
		value = (value) ? value : null;
    	document.execCommand(style, false, value);
		this.buttons[style].classList.toggle("active");


    	this.content.focus();
	}

	checkType() {
		if(document.queryCommandState("bold")){
			this.buttons["bold"].classList.add("active");
		} else {
			this.buttons["bold"].classList.remove("active");
		}

		if(document.queryCommandState("italic")){
			this.buttons["italic"].classList.add("active");
		} else {
			this.buttons["italic"].classList.remove("active");
		}

		if(document.queryCommandState("underline")){
			this.buttons["underline"].classList.add("active");
		} else {
			this.buttons["underline"].classList.remove("active");
		}
	}

	init() {
		this.createEditor();
        let self = this;
		this.buttons["bold"].addEventListener("click", () => self.addStyle("bold"));

		this.buttons["italic"].addEventListener("click", () => self.addStyle("italic"));

		this.buttons["underline"].addEventListener("click", () => self.addStyle("underline"));

		this.buttons["link"].addEventListener("click", () => {
			var link = prompt("Please enter a link:", "Link");
			self.addStyle("CreateLink", link);
		});

		this.content.addEventListener("click", () => self.checkType(), false);

		this.content.addEventListener("keydown", () => self.checkType(), false);

		this.content.focus();
	}
}