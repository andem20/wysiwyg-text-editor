class WYSIWYG {
    constructor(container) {
        this.container = container;
        this.content = document.createElement("div");
        this.boldBtn = document.createElement("button");
        this.italicBtn = document.createElement("button");
        this.underlineBtn = document.createElement("button");
        this.linkBtn = document.createElement("button");
        this.buttons = {
            "bold" : this.boldBtn,
            "italic" : this.italicBtn,
            "underline" : this.underlineBtn
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
		this.container.appendChild(menu);
		this.container.appendChild(this.content);
		menu.appendChild(this.boldBtn);
		menu.appendChild(this.italicBtn);
		menu.appendChild(this.underlineBtn);
		menu.appendChild(this.linkBtn);

        // Add content
		this.content.contentEditable = "true";
		this.boldBtn.innerHTML = "<b>B</b>";
		this.italicBtn.innerHTML = "<i>I</i>";
		this.underlineBtn.innerHTML = "<u>U</u>";
		this.linkBtn.innerHTML = "<img src='icons/link.png' height='10px' />";
	}


	addStyle(style, value) {
		value = (value) ? value : null;
    	document.execCommand(style, false, value);
		if(document.queryCommandState(style)){
			this.buttons[style].classList.add("active");
		} else {
			this.buttons[style].classList.remove("active");
		}

    	this.content.focus();
	}

	checkType() {
		if(document.queryCommandState("bold")){
			this.boldBtn.classList.add("active");
		} else {
			this.boldBtn.classList.remove("active");
		}

		if(document.queryCommandState("italic")){
			this.italicBtn.classList.add("active");
		} else {
			this.italicBtn.classList.remove("active");
		}

		if(document.queryCommandState("underline")){
			this.underlineBtn.classList.add("active");
		} else {
			this.underlineBtn.classList.remove("active");
		}
	}

	init() {
		this.createEditor();
        let self = this;
		this.boldBtn.addEventListener("click", () => self.addStyle("bold"));

		this.italicBtn.addEventListener("click", () => self.addStyle("italic"));

		this.underlineBtn.addEventListener("click", () => self.addStyle("underline"));

		this.linkBtn.addEventListener("click", () => {
			var link = prompt("Please enter a link:", "Link");
			self.addStyle("CreateLink", link);
		});

		this.content.addEventListener("click", () => self.checkType(), false);

		this.content.addEventListener("keydown", () => self.checkType(), false);

		this.content.focus();
	}
}