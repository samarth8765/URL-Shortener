import { atom } from "recoil";

export const isAuthenticatedAtom = atom<boolean | null>({
  default: null,
  key: "isAuthenticatedAtom",
});
