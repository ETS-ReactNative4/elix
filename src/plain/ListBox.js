import * as internal from "../base/internal.js";
import * as template from "../core/template.js";
import ListBox from "../base/ListBox.js";

class PlainListBox extends ListBox {
  get [internal.template]() {
    const result = super[internal.template];
    result.content.append(
      template.html`
        <style>
          :host {
            border: 1px solid gray;
          }

          ::slotted(*) {
            padding: 0.25em;
          }

          ::slotted([selected]) {
            background: highlight;
            color: highlighttext;
          }

          @media (pointer: coarse) {
            ::slotted(*) {
              padding: 1em;
            }
          }
        </style>
      `.content
    );
    return result;
  }
}

export default PlainListBox;
