function isMobileDevice() {
  if (navigator) {
    const isMobileDevice =
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Android/i);

    return Boolean(isMobileDevice);
  } else {
    return false;
  }
}

export { isMobileDevice };
