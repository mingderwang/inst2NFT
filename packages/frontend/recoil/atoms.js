import { atom } from "recoil";

export const connectState = atom({
  key: "connectState-key", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
