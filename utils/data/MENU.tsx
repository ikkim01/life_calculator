type menuType = {
  key: number;
  heading: string;
  explain: string;
  address: string;
  img: string;
};

const MENU: menuType[] = [
  {
    key: 0,
    heading: "메인 메뉴",
    explain: "메인으로 가기",
    address: "/",
    img: "",
  },
  {
    key: 1,
    heading: "만 나이 계산기",
    explain: "날짜를 기준으로 만 나이를 계산해줍니다.",
    address: "",
    img: "/img/ageIcon.svg",
  },
  {
    key: 2,
    heading: "양력 > 음력 계산기",
    explain: "양력을 음력으로 바꿔줍니다.",
    address: "",
    img: "/img/moonIcon.svg",
  },
  {
    key: 3,
    heading: "음력 > 양력 계산기",
    explain: "음력을 양력으로 바꿔즙니다.",
    address: "",
    img: "/img/sunIcon.svg",
  },
  {
    key: 4,
    heading: "은행 금리 계산기",
    explain: "은행 금리를 계산해줍니다.",
    address: "",
    img: "/img/bankIcon.svg",
  },
  {
    key: 5,
    heading: "서버 시간 계산기",
    explain: "해당 주소의 서버 시간을 알려줍니다.",
    address: "",
    img: "/img/clockIcon.svg",
  },
];

export default MENU;
