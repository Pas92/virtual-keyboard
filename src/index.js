import { Keyboard } from './components/keyboard/keyboard';
import { keyboardData } from './data/keyboard-data';

const terminal = document.createElement('textarea');
terminal.classList.add('terminal');
terminal.rows = 5;
document.body.append(terminal);

const keyboard = new Keyboard(keyboardData);
document.body.append(keyboard.getDOM());

document.addEventListener('keydown', (e) => {
  console.log(e.code);
});
