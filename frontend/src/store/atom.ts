import { atom } from "recoil";
import { URLProps } from "../utils/interfaces";

export const isAuthenticatedAtom = atom<boolean | null>({
  default: null,
  key: "isAuthenticatedAtom",
});

export const urlAtom = atom<URLProps[]>({
  default: [],
  key: "urlAtom",
});

export const URLServerError = atom<string>({
  default: "",
  key: "URLServerError",
});
