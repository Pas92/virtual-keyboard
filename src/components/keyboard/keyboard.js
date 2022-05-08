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

    this.isCaps = false;

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
    this.keys[keyName].press();
    if (keyName === 'CapsLock') {
      if (this.isCaps) {
        this.isCaps = false;
      } else {
        this.isCaps = true;
      }
    }
  }

  releaseKey(event) {
    event.preventDefault();
    const keyName = event.code || event.currentTarget.dataset.code;

    if (keyName === 'CapsLock') {
      if (!this.isCaps) {
        this.keys[keyName].release();
      }
    } else {
      this.keys[keyName].release();
    }
  }

  initKeysEvents() {
    Object.values(this.keys).forEach((e) => {
      e.HTML.addEventListener('pointerdown', this.pressKey);
      e.HTML.addEventListener('pointerup', this.releaseKey);
    });
  }
}
