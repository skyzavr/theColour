export const keyGen = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 12;
  let result = '';
  while (result.length <= length) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
};
