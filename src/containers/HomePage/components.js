export function homepageComponent () {

  window.customElements.define('hello-message', class extends HTMLElement {

    constructor () {

      super();
      const root = this.attachShadow({mode: 'open'});
      root.innerHTML = 'Hello <slot></slot>';

    }

  });

}