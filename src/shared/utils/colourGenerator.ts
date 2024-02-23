export const colourGenerator = () => {
  const alphabet = 'ABCDEF0123456789';
  let colour = '#';
  for (let i = 0; i < 6; i++) {
    const value = Math.floor(Math.random() * (alphabet.length - 1));
    colour += alphabet[value];
  }
  return colour;
};
