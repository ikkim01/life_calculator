import axios from "axios";

export const getClock = async (domain: string) =>
  await axios.get(domain).then((res) => res.data.response);
