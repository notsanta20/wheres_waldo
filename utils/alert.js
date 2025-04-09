function alert(text) {
  const body = document.querySelector(`main`);
  const div = document.createElement(`div`);
  div.className = `bg-black text-white py-2 px-3 rounded-lg text-sm fixed right-[30px] top-[200px]`;
  div.textContent = text;
  body.appendChild(div);
}

export default alert;
