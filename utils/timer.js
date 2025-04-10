function timer(time, setTime) {
  const start = time.startTime;
  const now = new Date();
  const escapedTime = now - start;

  let min = Math.floor((escapedTime / (1000 * 60)) % 60);
  let sec = Math.floor((escapedTime / 1000) % 60);
  let mil = Math.floor((escapedTime % 1000) / 10);

  min <= 9 ? (min = `0` + min + `:`) : (min = min + `:`);
  min === `00:` ? (min = ``) : (min = min);
  sec <= 9 ? (sec = `0` + sec + `:`) : (sec = sec + `:`);
  mil <= 9 ? (mil = `0` + mil) : (mil = mil);

  setTime({
    ...time,
    currentTime: `${min}${sec}${mil}`,
  });
}

export default timer;
