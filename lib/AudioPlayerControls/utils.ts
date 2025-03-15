export function getNextIndex(
  currentIndex: number,
  tracksLength: number,
  direction: number,
): number {
  return (currentIndex + direction + tracksLength) % tracksLength;
}

export function getRandomNumber(min: number, max: number, excludeArray: number[] = []): number {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (excludeArray.includes(randomNumber)) {
    return getRandomNumber(min, max, excludeArray);
  }
  return randomNumber;
}
