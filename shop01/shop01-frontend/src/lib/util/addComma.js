export default function addComma (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
