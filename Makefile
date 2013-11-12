index.html: _head.html _tail.html slides.md build.js
	cat _head.html > index.html
	cat slides.md | node convert.js >> index.html
	cat _tail.html >> index.html

build.js: client.js
	browserify client.js > build.js
