// подключаем модуль timer и импортируем все функции из этого модуля
import * as timerModule from "./timer/timer.js";
import * as datecalcModule from "./datecalc/datecalc.js";
import * as switchingModule from "./switching/switchingPage.js";

window.SwitchModule = switchingModule.switchBlock;
window.ValidateModule = datecalcModule.Validate;
window.ClearFormModule = datecalcModule.ClearForm;

console.log('Все модули успешно загружены!');
