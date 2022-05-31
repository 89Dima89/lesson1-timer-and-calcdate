const timerBlockName = 'timer_block';
const dateBlockName = 'date_block';
let timerBlock = document.getElementById(timerBlockName);
let dateBlock = document.getElementById(dateBlockName);

/*
 * функция инициализации модуля
 */
function init() {
  switchBlock(timerBlockName, false);
  switchBlock(dateBlockName, false);
}

/*
 * функция для переключения функционала страницы
 */
export function switchBlock(elementId, isShowElement) {
  if (!timerBlock || !dateBlock)
    return;

  let style = isShowElement ? 'block' : 'none';
  switch (elementId) {
    // если выбран блок таймера
    case timerBlockName:
      // показываем или прячем блок таймера
      timerBlock.style.display = style;
      // блок калькулятора даты всегда при этом выключен
      dateBlock.style.display = 'none';
      break;

    // если выбран блок калькулятора даты
    case dateBlockName:
      // показываем или прячем калькулятора даты
      dateBlock.style.display = style;
      // блок таймера всегда при этом выключен
      timerBlock.style.display = 'none';
      break;

    // при выборе любого блока
    default:
      return;
  }
}

// перед первой загрузкой страницы прячем оба блока на странице
init();
