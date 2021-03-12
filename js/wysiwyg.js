var WYSIWYG = function(C){
	var o = {},
		m = "menu",
		c = "content",
		b = "bold",
		i = "italic",
		u = "underline",
		l = "CreateLink",
		_this = this,

	createEditor = function(){
		o[m] = document.createElement("div");
		o[m].className = "wMenu";
		C.appendChild(o[m]);

		o[c] = document.createElement("div");
		o[c].className = "wContent";
		o[c].contentEditable = "true";
		C.appendChild(o[c]);

		o[b] = document.createElement("button");
		o[b].innerHTML = "<b>B</b>";
		o[m].appendChild(o[b]);

		o[i] = document.createElement("button");
		o[i].innerHTML = "<i>I</i>";
		o[m].appendChild(o[i]);

		o[u] = document.createElement("button");
		o[u].innerHTML = "<u>U</u>";
		o[m].appendChild(o[u]);

		o[l] = document.createElement("button");
		o[l].innerHTML = "<img src='icons/link.png' height='10px' />";
		o[m].appendChild(o[l]);
	},
	addStyle = function(style, value) {
		value = (value) ? value : null;
    	document.execCommand(style, false, value);
    		if(document.queryCommandState(style)){
				o[style].classList.add("active");
			} else {
				o[style].classList.remove("active");
			}
    	o[c].focus();
	},
	checkType = function(){
		if(document.queryCommandState("bold")){
			o[b].classList.add("active");
		} else {
			o[b].classList.remove("active");
		}

		if(document.queryCommandState("italic")){
			o[i].classList.add("active");
		} else {
			o[i].classList.remove("active");
		}

		if(document.queryCommandState("underline")){
			o[u].classList.add("active");
		} else {
			o[u].classList.remove("active");
		}
	},
	init = function(){
		createEditor();
		o[b].addEventListener("click", function(){
			addStyle("bold");
		});

		o[i].addEventListener("click", function(){
			addStyle("italic");
		});

		o[u].addEventListener("click", function(){
			addStyle("underline");
		});

		o[l].addEventListener("click", function(){
			var link = prompt("Please enter a link:", "Link");
			addStyle("CreateLink", link);
		});

		o[c].addEventListener("click", checkType, false);

		o[c].addEventListener("keydown", checkType, false);

		o[c].focus();
	}

	init();
}