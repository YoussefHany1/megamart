export const formatPrice = (price: string | number) => {
  if (!price) return "N/A";
  if (typeof price === 'number') return price.toString().replace(/[.]/, " LE");
  return price.replace(/[.]/, " LE");
};

export const extractNumber = (str: string | number) => {
  if (!str) return "";
  if (typeof str === 'number') return str;
  return Number(str.replace(/[^0-9.]/g, ""));
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
