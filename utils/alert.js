function alert(text) {
  const main = document.querySelector(`main`);
  const div = document.createElement(`div`);
  div.className = `alert bg-black text-white py-2 px-3 rounded-lg text-sm fixed border-2 border-white shadow-[1px_1px_19px_0px] shadow-white`;
  div.textContent = text;
  main.appendChild(div);
  removeAlert(div);
}

function removeAlert(child) {
  setTimeout(() => {
    child.classList.add(`removeAlert`);
  }, 3500);
  setTimeout(() => {
    child.remove();
  }, 5000);
}

export default alert;
