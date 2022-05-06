import KeyboardHTML from './keyboard.html';
import KeyboardRowHTML from './keyboard-row.html';
import './keyboard.scss';

import { htmlToElement } from '../../utils/htmlToElement';
import { Key } from '../key/key';

export class Keyboard {
  constructor(keyboardRows) {
    this.HTML = htmlToElement(KeyboardHTML);
    this.keys = {};

    keyboardRows.forEach((e) => {
      this.createRow(e);
    });
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
}
