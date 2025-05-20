function getNextIndex(currentIndex, tracksLength, direction) {
  return (currentIndex + direction + tracksLength) % tracksLength;
}
function getRandomNumber(min, max, excludeArray = []) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (excludeArray.includes(randomNumber)) {
    return getRandomNumber(min, max, excludeArray);
  }
  return randomNumber;
}

export { getNextIndex as a, getRandomNumber as g };
