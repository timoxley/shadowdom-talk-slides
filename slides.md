# Shadow DOM
### Huh? What?

## Light DOM vs Shadow DOM
### Light DOM is what you use today.
### Shadow DOM is what you will be using in the future.

## Shadow DOM visually replaces existing Elements.
<h3>Hello World</h3>

```html
<h3>Hello World</h3>
```
<play-script>
var heading = currentSlide.querySelector('h3')
var root = heading.createShadowRoot()
</play-script>

## Shadow DOM is a sub-tree inside a DOM node
#### Like a mini-iframe that replaces an Element.

<h3>Light DOM</h3>

```html
<h3>Light DOM</h3>
```
<play-script>
var heading = currentSlide.querySelector('h3')
var root = heading.createShadowRoot()
root.innerHTML = '<a href="#">Shadow DOM</a>'
</play-script>

* * *

### Shadow DOM = view
### HTML = model

## You can inject your original content into the Shadow DOM

<a href="#" id="anchor">Light DOM</a>
```html
<a href="#" id="anchor">Light DOM</a>
```
<play-script>
var anchor = currentSlide.querySelector('#anchor')
var root = anchor.createShadowRoot()
root.innerHTML = '\
  <a href="#">Shadow DOM</a>\
  <content></content>'
</play-script>

## How is this useful?
## Remember the idea of semantic markup?
## Decouple content from presentation.

<font size="30px">HEADING</font>

```html
<font size="30px">HEADING</font>
<!-- bad -->
```

## CSS
### Great on small scale.
### Terrible on big scale.

```html
<!-- vertically centered content -->
<div class="Center-Container is-Table">
  <div class="Table-Cell">
    <div class="Center-Block">
    <!-- content -->
    </div>
  </div>
</div>
```
```css
.Center-Container.is-Table { display: table; }
.is-Table .Table-Cell {
  display: table-cell;
  vertical-align: middle;
}
.is-Table .Center-Block {
  width: 50%;
  margin: 0 auto;
}
```

## But are divs & classes really 'semantic'?
### divs + class abuse is about as good as we get in HTML4

```html
<!-- Bootstrap 2 Panels -->
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Panel title</h3>
  </div>
  <div class="panel-body">
    Panel content
  </div>
</div>
```

## Things are getting better
### Progress on both ends of the spectrum

## HTML5 gives us a lot more semantic elements to work with

```html
<heading>Heading</heading>
<main>Content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>
```

## Reality: HTML5 can't save you from CSS

```html
<div class="page-wrapper">
  <div class="page-wrapper-inner">
    <heading><span>Heading</span></heading>
    <div class="main-wrapper">
      <main>
        <div class="wrapper">
          Content
        </div>
      </main>
    </div>
    <aside>Sidebar</aside>
    <footer><span>Footer</span></footer>
  </div>
</div>
<!-- div spam -->
```

## CSS Flexbox makes CSS more powerful for layouts
### [Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/)
```html
<body class="HolyGrail">
  <header>...</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">...</main>
    <nav class="HolyGrail-nav">...</nav>
    <aside class="HolyGrail-ads">...</aside>
  </div>
  <footer>...</footer>
</body>
```
```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 12em is the width of the columns */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* put the nav on the left */
  order: -1;
}
```

## When you need a div you need a div

## Pseudo Elements :before :after

```css
#example:before {
   content: "";
   display: block;
   width: 100px;
   height: 100px;
}
```

## Shadow DOM

## Hide non-semantic DOM in the Shadow DOM

<main>Main Content</main>
```html
<main>Main Content</main>
```

<play-script>
// wrap main in a div
var main = currentSlide.querySelector('main')
var root = main.createShadowRoot()
root.innerHTML = '\
  <div style="border: 1px solid;">\
    <content></content>\
  </div>'
</play-script>

## Use templates to keep things tidy

<main>Main Content</main>
<template id="template1">
  <div style="border: 1px solid;">
    <content></content>
  </div>
</template>


```html
<main>Main Content</main>
<template>
  <div style="border: 1px solid;">
    <content></content>
  </div>
</template>
```

<play-script>
// wrap main in a div
var main = currentSlide.querySelector('main')
var template = currentSlide.querySelector('template')
var root = main.createShadowRoot()
root.appendChild(template.content) 
</play-script>

## Wrap different content

<div class="body">
  <heading>Heading</heading>
  <main id="content">Content</main>
</div>
<template>
  <style>
    .green {
      color: green;
    }
    .blue {
      color: blue;
    }
  </style>
  <div class="green"><content select="heading"></content></div>
  <div class="blue"><content select="main"></content></div>
</template>

```html
<div class="body">
  <heading>Heading</heading>
  <main class="content">Content</main>
</div>
<template>
  <style>
    .green {
      color: green;
    }
    .blue {
      color: blue;
    }
  </style>
  <div class="green">
    <content select="heading"></content>
  </div>
  <div class="blue">
    <content select=".content"></content>
  </div>
</template>
```

<play-script>
var body = currentSlide.querySelector('.body')
var template = currentSlide.querySelector('template')
var root = body.createShadowRoot()
root.appendChild(template.content) 
</play-script>

## Hide style in the Shadow DOM
### Specificity wars suck
<main style="color: red;">Main Content</main>
```html
<main>Main Content</main>
```
```css

/* someone else's CSS */
.slide div main * {
  color: blue;
}

/* need highly specific selector */
/* to override */
body .slide div main * {
  color: red;
}
```

## Ignore the rest of the DOM

<main>Main Content</main>
<template>
  <style>
    * {
      color: red;
    }
  </style>
  <content></content>
</template>

```html
<main>Main Content</main>
<template>
  <style>
    * {
      color: red;
    }
  </style>
  <content></content>
</template>
```

<play-script>
var main = currentSlide.querySelector('main')
var template = currentSlide.querySelector('template')
var root = main.createShadowRoot()
root.appendChild(template.content)
</play-script>

## Shadow DOM elements are unaffected by existing page styles

<a href="#" id="anchor">Light DOM</a>
<template>
  <a href="#">Shadow DOM</a>
</template>

```html
<a href="#" id="anchor">Light DOM</a>
<template>
  <a href="#">Shadow DOM</a>
</template>
```

```css
a {
  color: #B22D1A; /* red */
  text-decoration: none;
}
```

<play-script>
var anchor = currentSlide.querySelector('#anchor')
var template = currentSlide.querySelector('template')
var root = anchor.createShadowRoot()
root.appendChild(template.content)
</play-script>

## Applying page styles

<main>Main Content</main>
<template>
  <a href="#"><content></content></a>
</template>

```html
<main>Main Content</main>
<template>
  <a href="#"><content></content></a>
</template>
```
<play-script>
var main = currentSlide.querySelector('main')
var template = currentSlide.querySelector('template')
root = main.createShadowRoot()
root.appendChild(template.content)
</play-script>

<play-script>
/* Toggle apply page styles */
root.applyAuthorStyles = !root.applyAuthorStyles
</play-script>

## Inheriting Styles

<main>Main Content</main>
<template>
  <a href="#"><content></content></a>
</template>

```html
<main>Main Content</main>
<template>
  <a href="#"><content></content></a>
</template>
```

<play-script>
var main = currentSlide.querySelector('main')
var template = currentSlide.querySelector('template')
root = main.createShadowRoot()
root.appendChild(template.content)
</play-script>

<play-script>
/* Toggle reset inherited styles */
root.resetStyleInheritance = !root.resetStyleInheritance
</play-script>

## Allowing external styling

<main id="content">Main Content</main>
<style>
#content::x-thumb {
  background: green;
  width: 10px;
  height: 10px;
  display: block;
}
</style>

```html
<main id="content">Main Content</main>
<style>
#content::x-thumb {
  background: green;
  width: 10px;
  height: 10px;
  display: block;
}
</style>
```

<play-script>
var main = currentSlide.querySelector('main')
var template = currentSlide.querySelector('template')
var root = main.createShadowRoot()
var thumb = document.createElement('div');
thumb.part = 'x-thumb';
root.appendChild(thumb);
</play-script>

## Styling Native Elements

<progress value="35" max="100"></progress>

```html
<progress value="35" max="100"></progress>
```


```css
/* important: disable native styling */
progress.custom {
  -webkit-appearance: none;
}

/* style pseudo-elements */
progress.custom::-webkit-progress-bar {
  background: burlywood;
}

progress.custom::-webkit-progress-value {
  background: coral;
}

```

<play-script>
progress = currentSlide.querySelector('progress')
progress.value += 5
progress.value %= 100
</play-script>

<play-script>
progress.classList.add('custom')
</play-script>



## Styling native elements is crucial

### Rebuilding native elements is awful.
### You will get it wrong.
### Many elements starting to expose their Shadow DOM
#### [https://gist.github.com/afabbro/3759334](https://gist.github.com/afabbro/3759334)

## Browser Support

### Evergreen Browsers, kinda.

<ul>
  <li>Chrome</li>
  <li>Canary</li>
  <li>Chrome Android</li>
  <li>Firefox</li>
  <li>Safari 6+</li>
  <li>Mobile Safari</li>
  <li>Internet Explorer 10+</li>
</ul>


## Shadow DOM is what you will be using in the future.
### Keep up or be left behind.

## Questions?
