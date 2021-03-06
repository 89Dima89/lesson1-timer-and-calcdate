function GoodYear(year) {
  return (year < 1900 ? year + 1900 : year);
}

function LeapYear(year) {
  if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) return true;
  else return false;
}

function KolDays(d1, m1, d2, m2, y) {
  var i, s;
  var mondays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  if (LeapYear(y) == true) mondays[1] = 29;
  if (m1 == m2) s = d2 - d1;
  else {
    s = mondays[m1 - 1] - d1 + 1;
    for (i = m1 + 1; i < m2; i++) s += mondays[i - 1];
    s += (d2 - 1);
  }
  return s;
}

function DaysBetween(day1, mon1, year1, day2, mon2, year2) {
  var i, f;
  if (year1 == year2) f = KolDays(day1, mon1, day2, mon2, year1);
  else {
    f = KolDays(day1, mon1, 31, 12, year1) + 1;
    for (i = year1 + 1; i < year2; i++) {
      f += 365;
      if (LeapYear(i)) f++;
    }
    f += (KolDays(1, 1, day2, mon2, year2));
  }
  return f;
}

function WeekDay(day, month, year) {
  if (month < 3) month += 10; else month -= 2;
  if (month > 10) year--;
  var cent = Math.floor(year / 100);
  year %= 100;
  var dday = Math.floor(2.6 * month - 0.2) + day + year + Math.floor(year / 4) + Math.floor(cent / 4) - 2 * cent;
  dday = Math.floor((dday + 777) % 7);
  return ((dday == 0) ? 7 : dday);
}

function PutInForm(d) {
  let s;
  if (((d % 100) > 9) && ((d % 100) < 21))
    s = "дней";
  else
    if ((d % 10) == 1)
      s = "день"
    else
      if (((d % 10) > 1) && ((d % 10) < 5))
        s = "дн\я"
      else
        s = "дней";
  document.Q.kol.value = d + ' ' + s;
}

function InitForm() {
  var wkd = new Array("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс");
  var today = new Date();
  d = today.getDate();
  m = today.getMonth();
  y = GoodYear(today.getYear());
  document.Q.day2.value = d;
  document.Q.month2.selectedIndex = m;
  document.Q.year2.value = y;
  m++;
  t = DaysBetween(1, 1, 2000, d, m, y);
  PutInForm(t);
  w = WeekDay(d, m, y);
  document.Q.wk2.value = wkd[w - 1];
  First = true;
}

export function ClearForm() {
  if (window.confirm("Очистить форму?")) {
    document.Q.wk1.value = "Сб";
    document.Q.day1.value = "1";
    document.Q.month1.selectedIndex = 0;
    document.Q.year1.value = "2000";
    InitForm();
  }
  return true;
}

function CorrectDate(d, m, y) {
  var mondays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  if (y < 1) {
    return false;
  }
  if (LeapYear(y) == true) mondays[1] = 29;
  if ((d < 1) || (d > mondays[m - 1])) {
    return false;
  }
  return true;
}

export function Validate() { //Оценить правильность ввода данных в форму
  var wkd = new Array("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс");
  var d1, m1, y1, d2, m2, y2, t, d, w;
  d1 = parseInt(document.Q.day1.value);
  m1 = document.Q.month1.selectedIndex + 1;
  y1 = parseInt(document.Q.year1.value);
  d2 = parseInt(document.Q.day2.value);
  m2 = document.Q.month2.selectedIndex + 1;
  y2 = parseInt(document.Q.year2.value);
  if ((isNaN(d1) == true) || (isNaN(d2) == true) || (isNaN(y1) == true) || (isNaN(y2) == true)) {
    window.alert("Введен недопустимый день или год! Пожалуйста, исправьте данные в форме.");
    return false;
  }
  t = CorrectDate(d1, m1, y1);
  if (t == false) {
    window.alert("Введена недопустима\я начальна\я дата! Пожалуйста, исправьте данные в форме.");
    return false;
  }
  t = CorrectDate(d2, m2, y2);
  if (t == false) {
    window.alert("Введена недопустима\я конечна\я дата! Пожалуйста, исправьте данные в форме.");
    return false;
  }
  if ((y1 > y2) || (y1 == y2) && ((m1 > m2) || (m1 == m2) && (d1 > d2))) {
    window.alert("Начальна\я дата больше конечной! Пожалуйста, исправьте данные в форме.");
    return false;
  }
  d = DaysBetween(d1, m1, y1, d2, m2, y2);
  PutInForm(d);
  w = WeekDay(d1, m1, y1);
  document.Q.wk1.value = wkd[w - 1];
  w = WeekDay(d2, m2, y2);
  document.Q.wk2.value = wkd[w - 1];
  return true;
}