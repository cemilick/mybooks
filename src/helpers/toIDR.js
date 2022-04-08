export default function toIDR(price) {
  const result = [];
  price
    .split('')
    .reverse()
    .map((key, i) => {
      if (i !== 0 && i % 3 === 0) result.push('.');
      result.push(key);
    });
  return result.reverse();
}
