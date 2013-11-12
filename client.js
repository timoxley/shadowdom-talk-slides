require('polyfill-webcomponents')
var hljs = require('highlight.js')

var slides, currentSlide
var slice = Function.call.bind(Array.prototype.slice)

var matches = function(el, selector) {
  var match = el.matches ||
    el.matchesSelector ||
    el.webkitMatchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.oMatchesSelector
  return match.call(el, selector)
}

function splitwrap(parent, wrapper, splitSelector) {
  if (window.ShadowDOMPolyfill) {
    wrapper = window.ShadowDOMPolyfill.wrapIfNeeded(wrapper)
  }
  parent = parent
  var els = slice(parent.children)
  return els.reduce(function(sections, el) {
    if (!sections.lastChild || matches(el, splitSelector)) {
      sections.appendChild(wrapper.cloneNode(true))
    }
    if (window.ShadowDOMPolyfill) {
      el = window.ShadowDOMPolyfill.wrapIfNeeded(el)
    }

    sections.lastChild.appendChild(el)
    return sections
  }, document.createDocumentFragment())
}

function nextSlide() {
  var next = slides[slides.indexOf(currentSlide) + 1] || slides[0] 
  if (currentSlide === next) return
  currentSlide = next
  goto(currentSlide)
}

function prevSlide() {
  var prev = slides[slides.indexOf(currentSlide) - 1] || slides[slides.length - 1]
  if (currentSlide === prev) return
  currentSlide = prev
  goto(currentSlide)
}

function goto(el) {
  document.location.hash = el.id
  slice(document.querySelectorAll('.current')).forEach(function(el) {
    el.classList.remove('current')
  })
  el.classList.add('current')
  el.scrollIntoView(true)
}

window.addEventListener('WebComponentsReady', function() {
  var section = document.createElement('section')

  section.classList.add('slide')

  document.body.appendChild(splitwrap(document.body, section, 'h1, h2, hr'))
  slides = slice(document.querySelectorAll('.slide'))

  slides.forEach(function(slide, index) {
    var firstChild = slide.firstChild
    slide.id = firstChild.textContent.toLowerCase().trim().replace(/[\s^\W]/g, '-') || 'slide-'+index
    if (firstChild.nodeName === 'H1') slide.classList.add('important')
  })

  currentSlide = document.location.hash && document.querySelector(document.location.hash) || slides[0]

  window.addEventListener('keyup', function(e) {
    switch (e.keyIdentifier) {
      case 'Down':
      case 'Right':
        nextSlide()
      break
      case 'Left':
      case 'Up':
        prevSlide()
      break
    
    }
  })

  window.addEventListener('resize', function(e) {
    goto(currentSlide)
  })

  goto(currentSlide)

  var PlayScriptProto = Object.create(HTMLScriptElement.prototype)

  PlayScriptProto.enteredViewCallback = function() {
    this.addEventListener('click', function() {
      eval(this.script) 
    }.bind(this))
    var view = this.createShadowRoot()
    view.innerHTML = '<style>@import "highlight.css"; * { cursor:pointer; -webkit-user-select: none;}</style>'
    var pre = document.createElement('pre')
    this.script = this.innerHTML
    pre.innerHTML = '<code>' + hljs.highlight('javascript', this.script).value.trim() + '</code>'
    view.appendChild(pre)
  }

  document.register('play-script', {
    prototype: PlayScriptProto
  })
})
