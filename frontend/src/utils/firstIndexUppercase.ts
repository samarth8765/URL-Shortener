export const firstIndexUppercase = (str: string) => {
  if (str[0] >= "a" || str <= "z") {
    str = str[0].toUpperCase() + str.slice(1);
  }
  return str;
};
