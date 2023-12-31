export const copyUrl = (url: string) => {
  const myUrl = document.location.href;
  var copyText = document.createElement("textarea");
  document.body.appendChild(copyText);
  copyText.value = myUrl.slice(0, myUrl.length - 1) + url;
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
  alert("클립보드에 주소가 복사되었습니다.");
};

/*  음력 달력 배열
     음력은 모든 달이 29일 ~ 30일 으로만 이루어짐
     음력에도 윤달이 있을 경우 2월에 1일이 추가되는 식이 아니라
     한달이 추가되어짐
     1-> 29일, 2->30일
     3, 4, 5, 6은 윤달이 추가로 생성됨
     3-> 29일 + 윤29일, 4-> 29일 + 윤30일
     5-> 30일 + 윤29일, 6-> 30일 + 윤30일
 */
const lunarMonthTable = [
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2] /* 1891 */,
  [1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1] /* 1901 */,
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2] /* 1911 */,
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 5, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2] /* 1921 */,
  [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
  [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1] /* 1931 */,
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1] /* 1941 */,
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2] /* 1951 */,
  [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1961 */,
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
  [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2] /* 1971 */,
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
  [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
  [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2] /* 1981 */,
  [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2] /* 1991 */,
  [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
  [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
  [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
  [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 4, 1, 2, 1, 2, 2, 1, 2] /* 2050 */,
];

export const convert0Number = (num: number) => {
  return num > 9 ? num : `0${num}`;
};

export const setCookie = (
  cookie_name: string,
  value: string,
  minutes: number
) => {
  const expires = new Date();

  expires.setMinutes(expires.getMinutes() + minutes);

  document.cookie =
    cookie_name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
};

export const getDaysInMonth = (year: string, month: string) => {
  // 2월의 일 수를 계산하기 위한 윤년 여부 확인
  const convertMonth = Number(month);

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInMonth = [
    31, // 1월
    isLeapYear(Number(year)) ? 29 : 28, // 2월
    31, // 3월
    30, // 4월
    31, // 5월
    30, // 6월
    31, // 7월
    31, // 8월
    30, // 9월
    31, // 10월
    30, // 11월
    31, // 12월
  ];

  return daysInMonth[convertMonth - 1]; // 인덱스는 0부터 시작하므로 입력받은 월에서 1을 빼줌
};

export const getDaysInLunarMonth = (year: string, month: string) => {
  const numberYear = Number(year);
  const numberMonth = Number(month) - 1;
  const dataNumber = numberYear - 1891;

  const dayNumberInLunarCalendar =
    dataNumber >= 0 &&
    numberMonth >= 0 &&
    lunarMonthTable[dataNumber][numberMonth];

  if (
    dayNumberInLunarCalendar === 1 ||
    dayNumberInLunarCalendar === 3 ||
    dayNumberInLunarCalendar === 4
  ) {
    return 29;
  } else if (
    dayNumberInLunarCalendar === 2 ||
    dayNumberInLunarCalendar === 5 ||
    dayNumberInLunarCalendar === 6
  ) {
    return 30;
  }
};

export const calculateAge = (year: string, month: string, day: string) => {
  const currentDate = new Date();

  const birthDate = new Date(`${year}-${month}-${day}`);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  let monthDiff = currentDate.getMonth() - birthDate.getMonth();
  let dayDiff = currentDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

const lunarCalc = (year: number, month: number, day: number) => {
  let solYear: number, solMonth: number, solDay: number;
  let lunYear: number, lunMonth: number, lunDay: number;
  let lunLeapMonth: number, lunMonthDay: number;
  let lunIndex: number;

  const solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /* 속도 개선을 위해 기준 일자를 여러개로 한다 */
  if (year >= 2000) {
    /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
    solYear = 2000;
    solMonth = 1;
    solDay = 1;
    lunYear = 1999;
    lunMonth = 11;
    lunDay = 25;
    lunLeapMonth = 0;

    solMonthDay[1] = 29; /* 2000 년 2월 28일 */
    lunMonthDay = 30; /* 1999년 11월 */
  } else if (year >= 1970) {
    /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
    solYear = 1970;
    solMonth = 1;
    solDay = 1;
    lunYear = 1969;
    lunMonth = 11;
    lunDay = 24;
    lunLeapMonth = 0;

    solMonthDay[1] = 28; /* 1970 년 2월 28일 */
    lunMonthDay = 30; /* 1969년 11월 */
  } else if (year >= 1940) {
    /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
    solYear = 1940;
    solMonth = 1;
    solDay = 1;
    lunYear = 1939;
    lunMonth = 11;
    lunDay = 22;
    lunLeapMonth = 0;

    solMonthDay[1] = 29; /* 1940 년 2월 28일 */
    lunMonthDay = 29; /* 1939년 11월 */
  } else {
    /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
    solYear = 1900;
    solMonth = 1;
    solDay = 1;
    lunYear = 1899;
    lunMonth = 12;
    lunDay = 1;
    lunLeapMonth = 0;

    solMonthDay[1] = 28; /* 1900 년 2월 28일 */
    lunMonthDay = 30; /* 1899년 12월 */
  }

  lunIndex = lunYear - 1891;

  while (true) {
    if (year == solYear && month == solMonth && day == solDay) {
      return {
        year: lunYear,
        month: lunMonth,
        day: lunDay,
        leapMonth: lunLeapMonth,
        plusYear: "",
        plusMonth: "",
        plusDay: "",
      };
    }

    /* add a day of solar calendar */
    if (solMonth == 12 && solDay == 31) {
      solYear++;
      solMonth = 1;
      solDay = 1;

      /* set monthDay of Feb */
      if (solYear % 400 == 0) solMonthDay[1] = 29;
      else if (solYear % 100 == 0) solMonthDay[1] = 28;
      else if (solYear % 4 == 0) solMonthDay[1] = 29;
      else solMonthDay[1] = 28;
    } else if (solMonthDay[solMonth - 1] == solDay) {
      solMonth++;
      solDay = 1;
    } else solDay++;

    /* add a day of lunar calendar */
    if (
      lunMonth == 12 &&
      ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) ||
        (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))
    ) {
      lunYear++;
      lunMonth = 1;
      lunDay = 1;

      lunIndex = lunYear - 1891;

      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
    } else if (lunDay == lunMonthDay) {
      if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
        lunDay = 1;
        lunLeapMonth = 1;
      } else {
        lunMonth++;
        lunDay = 1;
        lunLeapMonth = 0;
      }

      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3) lunMonthDay = 29;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 0
      )
        lunMonthDay = 29;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 1
      )
        lunMonthDay = 30;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 0
      )
        lunMonthDay = 30;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 1
      )
        lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6) lunMonthDay = 30;
    } else lunDay++;
  }
};
function solarCalc(year: number, month: number, day: number) {
  let solYear: number, solMonth: number, solDay: number;
  let lunYear: number, lunMonth: number, lunDay: number;
  let lunLeapMonth: number, lunMonthDay: number;
  let lunIndex: number;

  const solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /* 속도 개선을 위해 기준 일자를 여러개로 한다 */
  if (year >= 2000) {
    /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
    solYear = 2000;
    solMonth = 1;
    solDay = 1;
    lunYear = 1999;
    lunMonth = 11;
    lunDay = 25;
    lunLeapMonth = 0;

    solMonthDay[1] = 29; /* 2000 년 2월 28일 */
    lunMonthDay = 30; /* 1999년 11월 */
  } else if (year >= 1970) {
    /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
    solYear = 1970;
    solMonth = 1;
    solDay = 1;
    lunYear = 1969;
    lunMonth = 11;
    lunDay = 24;
    lunLeapMonth = 0;

    solMonthDay[1] = 28; /* 1970 년 2월 28일 */
    lunMonthDay = 30; /* 1969년 11월 */
  } else if (year >= 1940) {
    /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
    solYear = 1940;
    solMonth = 1;
    solDay = 1;
    lunYear = 1939;
    lunMonth = 11;
    lunDay = 22;
    lunLeapMonth = 0;

    solMonthDay[1] = 29; /* 1940 년 2월 28일 */
    lunMonthDay = 29; /* 1939년 11월 */
  } else {
    /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
    solYear = 1900;
    solMonth = 1;
    solDay = 1;
    lunYear = 1899;
    lunMonth = 12;
    lunDay = 1;
    lunLeapMonth = 0;

    solMonthDay[1] = 28; /* 1900 년 2월 28일 */
    lunMonthDay = 30; /* 1899년 12월 */
  }

  lunIndex = lunYear - 1891;

  while (true) {
    if (year == lunYear && month == lunMonth && day == lunDay) {
      const newDate = new Date(
        solYear + "-" + convert0Number(solMonth) + "-" + convert0Number(solDay)
      );
      if (
        lunarMonthTable[lunIndex][lunMonth - 1] === 3 ||
        lunarMonthTable[lunIndex][lunMonth - 1] === 4
      ) {
        const maxLunarCommonDay = 29;

        const convertPlusDate = new Date(
          newDate.setDate(newDate.getDate() + maxLunarCommonDay)
        );

        return {
          year: solYear,
          month: solMonth,
          day: solDay,
          leapMonth: 0,
          plusYear: convertPlusDate.getFullYear(),
          plusMonth: convertPlusDate.getMonth() + 1,
          plusDay: convertPlusDate.getDate(),
        };
      } else if (
        lunarMonthTable[lunIndex][lunMonth - 1] === 5 ||
        lunarMonthTable[lunIndex][lunMonth - 1] === 6
      ) {
        const maxLunarCommonDay = 30;

        const convertPlusDate = new Date(
          newDate.setDate(newDate.getDate() + maxLunarCommonDay)
        );

        return {
          year: solYear,
          month: solMonth,
          day: solDay,
          leapMonth: 0,
          plusYear: convertPlusDate.getFullYear(),
          plusMonth: convertPlusDate.getMonth() + 1,
          plusDay: convertPlusDate.getDay(),
        };
      } else {
        return {
          year: solYear,
          month: solMonth,
          day: solDay,
          leapMonth: 0,
          plusYear: "",
          plusMonth: "",
          plusDay: "",
        };
      }
    }

    /* add a day of solar calendar */
    if (solMonth == 12 && solDay == 31) {
      solYear++;
      solMonth = 1;
      solDay = 1;

      /* set monthDay of Feb */
      if (solYear % 400 == 0) solMonthDay[1] = 29;
      else if (solYear % 100 == 0) solMonthDay[1] = 28;
      else if (solYear % 4 == 0) solMonthDay[1] = 29;
      else solMonthDay[1] = 28;
    } else if (solMonthDay[solMonth - 1] == solDay) {
      solMonth++;
      solDay = 1;
    } else solDay++;

    /* add a day of lunar calendar */
    if (
      lunMonth == 12 &&
      ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) ||
        (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))
    ) {
      lunYear++;
      lunMonth = 1;
      lunDay = 1;

      lunIndex = lunYear - 1891;

      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
    } else if (lunDay == lunMonthDay) {
      if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
        lunDay = 1;
        lunLeapMonth = 1;
      } else {
        lunMonth++;
        lunDay = 1;
        lunLeapMonth = 0;
      }

      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3) lunMonthDay = 29;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 0
      )
        lunMonthDay = 29;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
        lunLeapMonth == 1
      )
        lunMonthDay = 30;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 0
      )
        lunMonthDay = 30;
      else if (
        lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
        lunLeapMonth == 1
      )
        lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6) lunMonthDay = 30;
    } else lunDay++;
  }
}

export const dayCalcDisplay = (
  startYear: string,
  startMonth: string,
  startDay: string,
  type: 1 | 2
) => {
  const convertYear = Number(startYear);
  const convertMonth = Number(startMonth);
  const convertDay = Number(startDay);

  const date =
    type === 1
      ? lunarCalc(convertYear, convertMonth, convertDay)
      : solarCalc(convertYear, convertMonth, convertDay);

  return date;
};

export const convertImg = (file: File, format: string) => {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          resolve(
            new File([blob], file.name.replace(".png", `.${format}`), {
              type: `image/${format}`,
            })
          );
        }, `image/${format}`);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

export const convertBytes = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const convertedValue = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${convertedValue} ${sizes[i]}`;
};

export const convertNumberToKorean = (num: string) => {
  if (num == "0") return "영";
  var number = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  var unit = ["", "만", "억", "조"];
  var smallUnit = ["천", "백", "십", ""];
  var result = [];
  var unitCnt = Math.ceil(num.length / 4);
  num = num.padStart(unitCnt * 4, "0");
  var regexp = /[\w\W]{4}/g;
  var array = num.match(regexp);

  if (array) {
    for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
      var hanValue = _makeHan(array[i]);
      if (hanValue == "") continue;
      result.unshift(hanValue + unit[unitCnt]);
    }
  }

  function _makeHan(text: any) {
    var str = "";
    for (var i = 0; i < text.length; i++) {
      var num = text[i];
      if (num == "0")
        //0은 읽지 않는다
        continue;
      str += number[num] + smallUnit[i];
    }
    return str;
  }

  return result.join("");
};

function calculateMonthlyInterest(principal, rate, months) {
  let monthlyRate = rate / 12 / 100;
  let totalAmount = principal * (Math.pow(1 + monthlyRate, months) - 1);
  return totalAmount;
}

function calculateSimpleInterest(principal, rate, months) {
  let totalAmount = principal * (1 + rate / 100);
  return totalAmount - principal;
}

export const calculateDepositInterest = (
  principal: string,
  rateType: "simple" | "monthCompound",
  rate: string,
  months: string,
  tax: "discount" | "normal"
) => {
  const numberPrincipal = Number(principal.replace(/,/g, ""));
  const numberRate = Number(rate);
  const numberMonth = Number(months);

  let interest = 0;

  switch (rateType) {
    case "monthCompound":
      interest = calculateMonthlyInterest(
        numberPrincipal,
        numberRate,
        numberMonth
      );
      break;
    case "simple":
      interest = calculateSimpleInterest(
        numberPrincipal,
        numberRate,
        numberMonth
      );
      break;
  }

  const taxRate = tax === "normal" ? 0.154 : 0.014;
  const taxAmount = interest * taxRate;

  return {
    tax: Math.round(taxAmount),
    interest: Math.round(interest),
    money: numberPrincipal,
  };
};

function calculateMonthlyCompoundInterest(
  monthlyDeposit,
  annualInterestRate,
  months
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  let interest = 0;
  let balance = 0;

  for (let i = 0; i < months; i++) {
    balance += monthlyDeposit;
    const monthlyInterest = balance * monthlyInterestRate;
    balance += monthlyInterest;
    interest += monthlyInterest;
  }

  return interest;
}

function calculateMonthlySimpleInterest(
  monthlyDeposit,
  annualInterestRate,
  months
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  let interest = 0;
  let balance = 0;

  for (let i = 0; i < months; i++) {
    balance += monthlyDeposit;
    interest += balance * monthlyInterestRate;
  }

  return interest;
}

export const calculateSavingsInterest = (
  principal: string,
  rateType: "simple" | "monthCompound",
  rate: string,
  months: string,
  tax: "discount" | "normal"
) => {
  const numberPrincipal = Number(principal.replace(/,/g, ""));
  const numberRate = Number(rate);
  const numberMonth = Number(months);
  const totalMoney = numberPrincipal * numberMonth;
  let interest = 0;

  switch (rateType) {
    case "monthCompound":
      interest = calculateMonthlyCompoundInterest(
        numberPrincipal,
        numberRate,
        numberMonth
      );
      break;
    case "simple":
      interest = calculateMonthlySimpleInterest(
        numberPrincipal,
        numberRate,
        numberMonth
      );
      break;
  }

  const taxRate = tax === "normal" ? 0.154 : 0.014;
  const taxAmount = interest * taxRate;

  return {
    tax: Math.round(taxAmount),
    interest: Math.round(interest),
    money: totalMoney,
  };
};
