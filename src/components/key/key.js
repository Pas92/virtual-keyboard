import HTML from './key.html';
import './key.scss';

import { htmlToElement } from '../../utils/htmlToElement';

export class Key {
  constructor(keyData) {
    this.HTML = htmlToElement(HTML);

    this.keyName = keyData[localStorage.getItem('keyboardLang') || 'eng'].char;
    this.keyNameContainer = this.HTML.querySelector('.key-name');
    this.keyNameContainer.textContent = this.keyName;

    this.code = keyData.code;
  }

  getDOM() {
    return this.HTML;
  }
}
