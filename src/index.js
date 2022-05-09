import { Keyboard } from './components/keyboard/keyboard';
import { keyboardData } from './data/keyboard-data';

const header = document.createElement('h1');
header.textContent = 'Virtual Keyboard';
header.classList.add('main-header');
document.body.append(header);

const author = document.createElement('a');
author.textContent = 'Pas92';
author.href = 'https://github.com/Pas92';
author.target = '_blank';
author.classList.add('author');
document.body.append(author);

const terminal = document.createElement('textarea');
terminal.classList.add('terminal');
terminal.rows = 5;
document.body.append(terminal);

// terminal.addEventListener('click', () => {
//   console.log(terminal.selectionEnd);
// });

const keyboard = new Keyboard(keyboardData, terminal);
document.body.append(keyboard.getDOM());

const note = document.createElement('p');
note.classList.add('note');

const keyboardOSNote = note.cloneNode();
keyboardOSNote.textContent = 'Клавиатура создана в операционной системе Windows';
document.body.append(keyboardOSNote);

const hotkeysNote = note.cloneNode();
hotkeysNote.textContent = 'Для переключения языка комбинация: левыe Shift + Alt';
document.body.append(hotkeysNote);

note.remove();
