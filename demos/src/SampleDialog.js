import * as internal from '../../src/internal.js';
import CustomBackdrop from './CustomBackdrop.js';
import CustomOverlayFrame from './CustomOverlayFrame.js';
import Dialog from '../../src/Dialog.js';


class SampleDialog extends Dialog {

  get [internal.defaultState]() {
    return Object.assign(super[internal.defaultState], {
      backdropRole: CustomBackdrop,
      frameRole: CustomOverlayFrame
    });
  }

  [internal.render](/** @type {PlainObject} */ changed) {
    if (super[internal.render]) { super[internal.render](changed); }
    if (changed.frameRole) {
      // Have the dialog close itself when the user clicks anywhere within it. In
      // many cases, you'll want to have a button ("OK", "Close", etc.) that
      // performs this action.
      this[internal.ids].frame.addEventListener('click', () => {
        this.close();
      });
    }
  }

}


customElements.define('sample-dialog', SampleDialog);
export default SampleDialog;
