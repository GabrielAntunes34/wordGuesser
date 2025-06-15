// Gets the number of seconds elapsed and represets it as a 
// valid data string
const formatTime = (s) => {
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

// Shuffles an array!
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export {
  formatTime,
  shuffle
}