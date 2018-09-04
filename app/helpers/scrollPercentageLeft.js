function scrollPercentageLeft() {
  const pixelsTotal = document.body.scrollHeight - window.innerHeight;

  const pixelsLeft = pixelsTotal - window.scrollY;

  const pixelsLeftPercentage = Math.floor(
    (pixelsLeft / pixelsTotal) * 100,
  );

  return pixelsLeftPercentage;
}

export default scrollPercentageLeft;
