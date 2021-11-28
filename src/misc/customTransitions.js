export const flipVertically = (node, { delay = 0, duration = 500 }) => {
  return {
    delay,
    duration,
    css: (t, u) => `
      transform: rotateY(${1 - u * 180}deg);
      opacity: ${1 - u};
    `,
  };
};

export const flipHorizontally = (node, { delay = 0, duration = 500 }) => {
  return {
    delay,
    duration,
    css: (t, u) => `
      transform: rotateX(${1 - u * 180}deg);
      opacity: ${1 - u};
    `,
  };
};
