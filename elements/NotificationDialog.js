//
// NOTE: This is a prototype, and not yet ready for real use.
//

import Dialog from './Dialog.js';
import renderArrayAsElements from '../mixins/renderArrayAsElements.js';
import symbols from '../mixins/symbols.js';


const choices = Symbol('choices');


class NotificationDialog extends Dialog {

  [symbols.shadowCreated]() {
    if (super[symbols.shadowCreated]) { super[symbols.shadowCreated](); }
    this.$.buttonContainer.addEventListener('click', event => {
      // TODO: Ignore clicks on buttonContainer background.
      if (event.target instanceof HTMLElement) {
        const button = event.target;
        this.close(button.textContent);
      }
    });
  }

  get choices() {
    return this[choices];
  }
  set choices(choices) {
    this[choices] = choices;
    if (!this.shadowRoot) {
      console.warn(`NotificationDialog couldn't find its own shadowRoot.`);
      return;
    }
    const slot = this.shadowRoot.querySelector('slot[name="buttons"]');
    if (!slot) {
      console.warn(`NotificationDialog couldn't find its default slot.`);
      return;
    }
    renderArrayAsElements(choices, slot, (choice, button) => {
      if (!button) {
        button = document.createElement('button');
      }
      button.textContent = choice;
      return button;
    });
  }

  static get OK() {
    return ['OK'];
  }

  static get OK_CANCEL() {
    return ['OK', 'Cancel'];
  }

  [symbols.template](fillers = {}) {
    const defaultFiller = typeof fillers === 'string' ?
      fillers :
      fillers.default || `<slot></slot>`;
    const buttonFiller = fillers.buttons || `<slot name="buttons"><button>OK</button></slot>`;
    return super[symbols.template](`
      <style>
        #container {
          padding: 1em;
        }

        #buttonContainer {
          margin-top: 1em;
        }

        button {
          font-family: inherit;
          font-size: inherit;
        }

        button:not(:first-child) {
          margin-left: 0.25em;
        }
      </style>
      <div id="container">
        ${defaultFiller}
        <div id="buttonContainer">
          ${buttonFiller}
        </div>
      </div>
    `);
  }

}


customElements.define('elix-notification-dialog', NotificationDialog);
export default NotificationDialog;
