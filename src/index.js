import { Keyboard } from './components/keyboard/keyboard';
import { keyboardData } from './data/keyboard-data';

const keyboard = new Keyboard(keyboardData);
document.body.append(keyboard.getDOM());

document.addEventListener('keydown', (e) => {
  console.log(e.code);
});
