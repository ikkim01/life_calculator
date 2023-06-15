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
  const convertMonth = Number(month.slice(0, 2));

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

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

export const calculateAge = (year: string, month: string, day: string) => {
  const currentDate = new Date();

  const birthDate = new Date(`${year}-${month}-${day}`);

  var age = currentDate.getFullYear() - birthDate.getFullYear();
  var monthDiff = currentDate.getMonth() - birthDate.getMonth();
  var dayDiff = currentDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

// // 사용 예시
// const year = 2023;
// const month = 6;
// const days = getDaysInMonth(year, month);
// console.log(`년도 ${year}년 ${month}월의 일 수는 ${days}일입니다.`);
