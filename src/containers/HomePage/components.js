export function homepageComponent() {

  // Create a class for the element
  class XProduct extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();

      // Create a shadow root
      var shadow = this.attachShadow({ mode: 'open' });

      // Create a standard img element and set it's attributes.
      var img = document.createElement('img');
      img.alt = this.getAttribute('data-name');
      img.src = this.getAttribute('data-img');
      img.width = '150';
      img.height = '150';
      img.className = 'product-img';

      // Add the image to the shadow root.
      shadow.appendChild(img);

      // Add an event listener to the image.
      img.addEventListener('click', () => {
        window.location = this.getAttribute('data-url');
      });

      // Create a link to the product.
      var link = document.createElement('a');
      link.innerText = this.getAttribute('data-name');
      link.href = this.getAttribute('data-url');
      link.className = 'product-name';

      // Add the link to the shadow root.
      shadow.appendChild(link);
    }
  }

// Define the new element
  window.customElements.define('x-product', XProduct);

  // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
  class FancyButton extends HTMLButtonElement {
    constructor() {
      super(); // always call super() first in the ctor.
      this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
    }

    // Material design ripple animation.
    drawRipple(x, y) {
      let div = document.createElement('div');
      div.classList.add('ripple');
      this.appendChild(div);
      div.style.top = `${y - div.clientHeight / 2}px`;
      div.style.left = `${x - div.clientWidth / 2}px`;
      div.style.backgroundColor = 'currentColor';
      div.classList.add('run');
      div.addEventListener('transitionend', e => div.remove());
    }
  }

  window.customElements.define('fancy-button', FancyButton, { extends: 'button' });

  class HelloMessage extends HTMLElement {

    constructor() {

      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = 'Hello <slot></slot>';

    }

    connectedCallback() {
      console.log('here');
    }

    disconnectedCallback() {

    }

  }

  window.customElements.define('hello-message', HelloMessage);

}