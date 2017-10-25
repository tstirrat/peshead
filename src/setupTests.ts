// Silence React 16 requestAnimationFrame error in non-dom environments
(global as any).requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};
