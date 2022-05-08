import HTML from './key.html';
import './key.scss';

import { htmlToElement } from '../../utils/htmlToElement';

const customStyles = {
  Backspace: 'key_backspace',
  Tab: 'key_tab',
  CapsLock: 'key_caps-lock',
  Delete: 'key_delete',
  Enter: 'key_enter',
  ShiftLeft: 'key_shift',
  ShiftRight: 'key_shift',
  ControlLeft: 'key_ctrl',
  ControlRight: 'key_ctrl',
  MetaLeft: 'key_meta',
  AltLeft: 'key_alt',
  AltRight: 'key_alt',
  Space: 'key_space',
};

export class Key {
  constructor(keyData) {
    this.HTML = htmlToElement(HTML);
    this.keyData = keyData;

    this.keyName = keyData[localStorage.getItem('keyboardLang') || 'eng'].char;
    this.keyNameContainer = this.HTML.querySelector('.key-name');
    this.keyNameContainer.textContent = this.keyName;

    this.code = keyData.code;
    this.HTML.dataset.code = keyData.code;
    this.isFunc = keyData.isFunc;
    this.isRow = keyData.isRow;

    if (this.isFunc) {
      this.HTML.classList.add(customStyles[this.code]);
    }

    if (this.isRow) {
      this.HTML.classList.add('key_row');
    }
  }

  getDOM() {
    return this.HTML;
  }

  press() {
    this.HTML.classList.add('key_push');
  }

  release() {
    this.HTML.classList.remove('key_push');
  }

  setKeyChar(option) {
    this.keyNameContainer.textContent = this.keyData[localStorage.getItem('keyboardLang')][option];
  }
}
