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
