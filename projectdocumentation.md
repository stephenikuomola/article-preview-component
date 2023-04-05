# Michelle Appleton Preview Component Docs

## Overview

### User stories

- The users should be able to view the optimum layout for the component depending on device screen size.
- The users should be able to see the the social media share links when they click on the share icon.

### Features

- A share icon that acts as button which when click enables the users see the social media share icon.
- See different colour states of the icon when the button is clicked.
- The illustration zooms in when hovered.

### Screenshots

![A desktop view of the article preview component. ](/images/desktop_version.jpeg)

A desktop view of the article preview component. 

![A mobile version of the article component in its active state. ](/images/mobile_version.jpeg)

A mobile version of the article component in its active state. 

## My Process

### Tools Used

- HTML5
- CSS3
- JavaScript
- Parcel for bundling

### Learning Curves

Good project which enable me to test my HTML, CSS and JavaScript skills. During this project I got to learn how to work with states and also how the style the social media links when the icon is clicked. 

I also used this project as an opportunity to learn how to work with `aspect-ratio` along with the `object-fit` and `object-position`. More code implementations will be done below. 

The first thing I did when building the project was to establish a markup structure as this would make this easier to read for any external developer and also myself in the future. The project was done for it to be accessible as possible and i do hope I was able to achieve this. 

**Working with aspect-ratio, object-fit and object-position**

In order to make the image have a good look and fit in its parent element which is a `div` with a class of `article__image-component`, we need to make use of three properties in this case. Please note that the reason for the `aria-hidden` attribute is because the image is considered to just be an illustrative element. 

```html
<div class = "article__image-component">
    <img aria-hidden = "true" alt = "" src = "/images/drawers.jpg"/>
</div>
```

```css
div[class="article__image-component"] img {
  width: 100%; 
  aspect-ratio: 1.64; 
  object-fit: cover; 
  object-position: top 30% right 0; 
  transition: all 0.4s ease; 
}
```

`aspect-ratio`: This is used to determine the ratio of the of the `width` and the `height` of the image in this case. In the case the width was given to be the full width of its container and the aspect ratio of `1.64` meaning that the browser would do the calculation to determine the height of the image. 

`object-fit`: The object-fit CSS property is used to set how a replaced element should be resized to fits its container. The value of `cover` was used here because this will make the image to fill the entire content box while it maintains its aspect ratio and clip some of the part of the image which do not fit. 

`object-position`: The object-position property is used to specify how a replaced element like the `<img>` or `<video>` should be positioned within its container. In order to get to as close to design as possible I needed to make it 30% from top and 0 from the right of the container. 

**Making the image zoom in on hover**

Making the image sort of zoom in on hover was sort of a nice feature to add just ti make the component a bit more interactive. To do this I needed to ensure that the effect happened when I hovered parent element of the image element which has a class of `article__image-component`

and when this was done, the image need to sort of zoom in a bit or maybe grow bigger and this was done with the `transform` property with a `scale` function as its value. In order for it not to overflow its container the overflow property was set on the parent element of the image element. See the code snippet below.

```css
div[class="article__image-component"] {
  overflow: hidden; 
  border-top-left-radius: var(--radius-5); 
  border-top-right-radius: var(--radius-5); 
}

div[class="article__image-component"]:hover img {
  transform: scale(1.1); 
}
```

**Using CSS to style the different states of the button when clicked**

From the design it looked like when the button was clicked and the widget was open the colour of the button was changed. By making use of the aria-expanded attribute in-order to make it accessible to other users I was able to achieve. This is what the code snippet looks like for the html button element below

```html
<button class = "button-share" aria-controls = "share-option" aria-expanded = "false">
   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13">
		<path fill="#6E8098" d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"/>
	 </svg>
 </button>
```

The button element was styled as the design required see the code below

```css
button[class~="button-share"] {
  background-color: var(--light-grayish-blue); 
  padding-block: var(--space-2); 
  padding-inline: var(--space-2); 
  border-radius: 50%; 
  cursor: pointer; 
}
```

The next step was to determine how the background colour of the button changes when the widget is open and how the change the colour of the `svg` when the widget is also open. Looking at the state of the widget the `aria-expanded` attribute has a value of `“false”` which means that the widget is closed and when it is open it should have a value of `“true”` . This would mean that I need to write some CSS for when that condition happens. The way I was able to achieve the change in colour was to go deep into the descendant of the button element and select the path element which has a `fill` attribute. See code snippet below 

```css
button[class~="button-share"][aria-expanded="true"] {
  background-color: var(--desaturated-dark-blue); 
}

button[class~="button-share"][aria-expanded="true"] path {
  fill: var(--white); 
}

/* We use JavaScript to dynamically change the value of the aria-expanded attribute. */
```

**Implementing the functionality of the component**

The functionality of the component comes mainly by clicking the button to display the widget. This was done using classes and event bubbling. There was a need to identify the parent element of the button element which was the `div` element with a class of `share` and then make that a private property in the class. 

See the code snippet below

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {}

}

new ArticleComponent(); 
```

When the new keyword is used the constructor inside of the `class` will get called which means that we can attach the event listener to the private property inside of the constructor and listen for the `click` event on that element and attach our event handler to it using the `this` keyword. 

See code snippet below

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn); 
	}

}

new ArticleComponent(); 
```

We have to then define what will have when the `toggleBtn` method gets called. To ensure the we click the button at all times we need to find a way to search up the DOM tree till we get the `button` element and this is done using the `closest` method on the target element. This method will search up the DOM tree from the last element in the DOM to the root and returns `null` if it does not find the element. It behave opposite of the `querySelector` which start from the the top most element to the last. 

See code below. 

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn); 
	}

	#toggleBtn(evtObj) {
		const previewBtn = evtObj.target.closest('.button-share'); 

		// Ok but what happens if I didnt click the button then null is returned and this could intoduce a bug. 
		// So what need to be done? 🤷🏾‍♂️🤔
	}

}

new ArticleComponent(); 
```

From the code above assuming we do not click the `button` we wish not to be able to do anything meaning we wish not return anything we want to terminate the function to be done executing. I know I need a `return` statement and I know that `return` statement must not return anything. I want to return nothing when I do not click on the `button` meaning when `null` gets returned but null is `falsy` meaning the if block wont execute. This would require the `null` which gets interpreted to `falsy` to be changed to `truthy`. 

See code snippet below. 

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn); 
	}

	#toggleBtn(evtObj) {
		const previewBtn = evtObj.target.closest('.button-share'); 
		
		if (!previewBtn) return; 
	}
}

new ArticleComponent
```

The next step is to obtain the state of button and then dynamically change the the value of the `aria-expanded` attribute. So when the use clicks the button we want to know what the current value of the aria-expanded attribute is and if it is `“true”` we want to ensure it has the same equality of as the string of `“true”` . If it does then we want the condition to be `true` which is a boolean and if not it will short circuit to `false` the boolean. 

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn); 
	}

	#toggleBtn(evtObj) {
		const previewBtn = evtObj.target.closest('.button-share'); 
		
		if (!previewBtn) return; 

		const isOpen = previewBtn.getAttribute('aria-expanded') === 'true' || false; 
	}
}

new ArticleComponent(); 
```

Once the condition is obtained we must change the value of the `aria-expanded` attribute meaning if the value is `“true”` it must change to `“false”` and vice versa. So from the code snippet above when I click on the button the `isOpen` variable will have a condition which is a boolean of `false` so for us to change this value we have to mutate this boolean to become true and make it a string and this is done using the `setAttribute` method. 

See code snippet below

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn); 
	}

	#toggleBtn(evtObj) {
		const previewBtn = evtObj.target.closest('.button-share'); 
		
		if (!previewBtn) return; 

		const isOpen = previewBtn.getAttribute('aria-expanded') === 'true' || false;

		previewBtn.setAttribute('aria-expanded', `${!isOpen}`); 

		// Now when I click the button I obtain the state of the button and then 
		// set the new value of the aria-expanded attribute. Which means this should 
		// open the widget for the use the the the share option. 
	}
}

new ArticleComponent(); 
```

To enable the widget to be shown we need to add the `active` class to the div element that is a direct sibling to the button element. So when the `isOpen` variable holds the boolean false we have to add the `active` class since we are changing the value of the `aria-expanded` attribute to `“true”` and when the `isOpen` variable has a condition of true when change the value of the `aria-expanded` attribute to `“false”` then remove the `active` class. 

See code snippet below

```jsx
class ArticleComponent {
	#parentElement = document.querySelector("div[class='share']"); 

	constructor() {
		this.#parentElement.addEventListener('click', this.#toggleBtn); 
	}

	#toggleBtn(evtObj) {
		const previewBtn = evtObj.target.closest('.button-share'); 
		
		if (!previewBtn) return; 

		const isOpen = previewBtn.getAttribute('aria-expanded') === 'true' || false;

		previewBtn.setAttribute('aria-expanded', `${!isOpen}`); 

		if (isOpen) {
			previewBtn.nextElementSibling.classList.remove('active'); 
		} else {
			previewBtn.nextElementSibling.classList.add('active'); 		}
	}

	// The original code made use of the ternary operator instead of the if block but
	// they both do the same thing. 
}

new ArticleComponent(); 
```

### Continued Development

I do hope to get better at writing more cleaner, better and reusable code. I also do hope that to making my projects more accessible to people with disabilities. Need to keep doing more projects to achieve mastery of Frontend Web Development. 

## Resources

To achieve this project here are some of the resources which I used. 

- [Mozilla Developer Network(MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) - Learnt how to work with `object-fit` property from MDN which helped me doing this project.

- [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/web/css/@import) - Just recently discovered the `@import` CSS at-rule, so I said I should give it a try in this project. So I had to use this documentation from MDN to learn how to implement it.

- [Kevin Powell (Youtube)](https://www.youtube.com/watch?v=6yAAV-uP0po) - Kevin did justice to the object-fit property in this 6 minute video as he explained how it works and how we can use it.

- [Dom (Youtube)](https://www.youtube.com/watch?v=gj4zoaigSqI&t=9s) - DOM also does justice to it as well explaining how object fit property works.

- [w3schools](https://www.w3schools.com/cssref/css3_pr_transform.php) - Learnt how to work with the `transform` property values like `translate()` `rotate()` and `scale()`.

- [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/web/css/aspect-ratio) - I was a bit confused about aspect-ratio property and how it worked so this was nicely treated by MDN in terms of how it was explained.

- [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) - The `object-position` property was used along side the `object-fit` property to achieve the desired result. So having an understanding of how `object-position` works was really necessary.

## Acknowledgement

Massive acknowledgment to frontend mentor in what they do and how they are able to provide these challenges to the community to help self taught developers continuously improve their skills.