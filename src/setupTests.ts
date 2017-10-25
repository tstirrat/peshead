(global as any).requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};
