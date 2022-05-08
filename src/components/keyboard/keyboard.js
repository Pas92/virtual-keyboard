import KeyboardHTML from './keyboard.html';
import KeyboardRowHTML from './keyboard-row.html';
import './keyboard.scss';

import { htmlToElement } from '../../utils/htmlToElement';
import { Key } from '../key/key';

export class Keyboard {
  constructor(keyboardRows) {
    this.HTML = htmlToElement(KeyboardHTML);
    this.keys = {};
    this.pressKey = this.pressKey.bind(this);
    this.releaseKey = this.releaseKey.bind(this);
    this.initKeysEvents = this.initKeysEvents.bind(this);
    this.changeLang = this.changeLang.bind(this);

    this.isCaps = false;
    this.isShift = false;

    this.pressedKeys = new Set();

    if (!localStorage.getItem('keyboardLang')) {
      localStorage.setItem('keyboardLang', 'eng');
    }
    this.keyboardLang = localStorage.getItem('keyboardLang') || 'eng';

    keyboardRows.forEach((e) => {
      this.createRow(e);
    });

    document.addEventListener('keydown', this.pressKey);
    document.addEventListener('keyup', this.releaseKey);

    this.initKeysEvents();
  }

  createRow(rowData) {
    const row = htmlToElement(KeyboardRowHTML);

    rowData.forEach((e) => {
      const key = new Key(e);
      this.keys[key.code] = key;
      row.append(key.getDOM());
    });

    this.HTML.append(row);
  }

  getDOM() {
    console.log(this.keys);
    return this.HTML;
  }

  pressKey(event) {
    event.preventDefault();
    const keyName = event.code || event.currentTarget.dataset.code;
    if (!this.keys[keyName]) return;

    this.keys[keyName].press();
    this.pressedKeys.add(keyName);

    if (keyName === 'CapsLock') {
      if (this.isCaps) {
        this.isCaps = false;
      } else {
        this.isCaps = true;
      }
    }

    if (this.pressedKeys.has('AltLeft') && this.pressedKeys.has('ShiftLeft')) {
      this.changeLang();
    }
  }

  releaseKey(event) {
    event.preventDefault();
    const keyName = event.code || event.currentTarget.dataset.code;
    if (!this.keys[keyName]) return;

    if (keyName === 'CapsLock') {
      if (!this.isCaps) {
        this.keys[keyName].release();
        this.pressedKeys.delete(keyName);
      }
    } else {
      this.keys[keyName].release();
      this.pressedKeys.delete(keyName);
    }
  }

  initKeysEvents() {
    Object.values(this.keys).forEach((e) => {
      e.HTML.addEventListener('pointerdown', this.pressKey);
      e.HTML.addEventListener('pointerup', this.releaseKey);
    });
  }

  changeLang() {
    let option = '';
    switch (true) {
      case this.isCaps && this.isShift:
        option = 'shiftCapsChar';
        break;
      case this.isCaps:
        option = 'capsChar';
        break;
      case this.isShift:
        option = 'shiftChar';
        break;
      default:
        option = 'char';
    }

    this.keyboardLang = this.keyboardLang === 'eng' ? 'rus' : 'eng';
    localStorage.setItem('keyboardLang', this.keyboardLang);

    Object.values(this.keys).forEach((e) => {
      e.setKeyChar(option);
    });
  }
}
