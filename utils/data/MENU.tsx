type objectType = {
  key: string;
  heading: string;
  explain: string;
  address: string;
  img: string;
};
type menuType = {
  key: string;
  name: string;
  img: string;
  explain: string;
  childMenu: objectType[];
};

const MENU: menuType[] = [
  {
    key: "HOME",
    name: "메인 메뉴",
    img: "",
    explain:
      "만 나이 계산, 양력 음력 변환, JPG -> JPEG 변환등 생활에 필요한 도구를 손쉽게 사용해보세요.",
    childMenu: [
      {
        key: "home",
        heading: "메인 메뉴",
        explain: "메인으로 가기",
        address: "/",
        img: "",
      },
    ],
  },

  {
    key: "CALCULATOR",
    name: "생활 계산기",
    img: "/img/calcuratorIcon.svg",
    explain: "만 나이 계산 , 양력,음력 변환, 금리계산등 손쉽게 계산합니다.",
    childMenu: [
      {
        key: "age",
        heading: "만 나이 계산기",
        explain: "날짜를 기준으로 만 나이를 계산해줍니다.",
        address: "/age",
        img: "/img/ageIcon.svg",
      },
      {
        key: "moon",
        heading: "양력 > 음력 계산기",
        explain: "양력을 음력으로 바꿔줍니다.",
        address: "/moon",
        img: "/img/moonIcon.svg",
      },
      {
        key: "sun",
        heading: "음력 > 양력 계산기",
        explain: "음력을 양력으로 바꿔즙니다.",
        address: "/sun",
        img: "/img/sunIcon.svg",
      },
      {
        key: "bank",
        heading: "예금 / 적금 계산기",
        explain: "은행 금리를 계산해줍니다.",
        address: "/bank",
        img: "/img/bankIcon.svg",
      },
      {
        key: "clock",
        heading: "서버 시간 계산기",
        explain: "해당 주소의 서버 시간을 알려줍니다.",
        address: "/clock",
        img: "/img/clockIcon.svg",
      },
    ],
  },
  {
    key: "CONVERTER",
    name: "생활 변환기",
    img: "/img/convertIcon.svg",
    explain: "JPG -> JPEG, PNG -> JPEG 등등 이미지 확장자를 손쉽게 변환합니다.",
    childMenu: [
      {
        key: "jpeg",
        heading: "JPG > JPEG 변환",
        explain: "이미지의 확장자를 변환합니다.",
        address: "/jpgtojpeg",
        img: "/img/jpgIcon.svg",
      },
      {
        key: "jpg",
        heading: "JPEG > JPG 변환",
        explain: "이미지의 확장자를 변환합니다.",
        address: "/jpegtojpg",
        img: "/img/jpgIcon.svg",
      },
    ],
  },
];

export default MENU;
