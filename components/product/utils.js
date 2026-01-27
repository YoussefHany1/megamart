export const formatPrice = (price) => {
  if (!price) return "N/A";
  return price.replace(/[.]/, " LE");
};

export const extractNumber = (str) => {
  if (!str) return "";
  return Number(str.replace(/[^0-9.]/g, ""));
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
