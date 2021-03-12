# wysiwyg-text-editor
Simple WYSIWYG text editor made in javascript.

![preview](https://github.com/andem20/wysiwyg-text-editor/blob/master/preview.png)
<p>
  Implementation:
</p>

```javascript
window.onload = function(){
	let element = document.getElementsByClassName("wEditor");
	let editors = [];
	for(let i = 0; i < element.length; i++){
		editors[i] = new WYSIWYG(element[i]);
	}
}
```

```html
<body>
	<div class="wEditor"></div>
</body>
```
