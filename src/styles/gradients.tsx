const gradients = {
  appGradient: {
    colors: [
      "hsla(169, 19%, 28%, 1)",
      "hsla(225, 55%, 16%, 1)",
      "hsla(225, 55%, 16%, 1) 100%)",
    ] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  redGradient: {
    colors: ["#e52d27", "#b31217"] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  demoPrimary: {
    colors: [
      "hsla(169, 19%, 28%, 1)",
      "hsla(225, 55%, 16%, 1)",
      "hsla(225, 55%, 16%, 1) 100%)",
    ] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  demoSecondary: {
    colors: ["hsla(34, 85%, 55%, 1)", "hsla(23, 99%, 66%, 1)"] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
};

export default gradients;
