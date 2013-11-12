var marked = require('marked')
var hljs = require('highlight.js')

marked.setOptions({
  gfm: true,
  sanitize: false,
  breaks: false,
  highlight: function (code, lang) {
    lang = lang === 'html' ? 'xml' : lang
    lang = lang === 'js' ? 'javascript' : lang
    var r = hljs.highlight(lang, code).value;
    return r
  }
});

console.log(marked(require('fs').readFileSync(__dirname + '/slides.md', 'utf8')))
