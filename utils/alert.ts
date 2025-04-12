function alert(text: string) {
  const main: HTMLElement | null = document.querySelector(`main`);
  const div: HTMLDivElement | null = document.createElement(`div`);
  if (div) {
    div.className = `alert bg-black text-white py-2 px-3 rounded-lg text-sm fixed border-2 border-white shadow-[1px_1px_19px_0px] shadow-white`;
    div.textContent = text;
    if (main) {
      main.appendChild(div);
    }
    removeAlert(div);
  }
}

function removeAlert(child: HTMLDivElement) {
  setTimeout(() => {
    child.classList.add(`removeAlert`);
  }, 3500);
  setTimeout(() => {
    child.remove();
  }, 5000);
}

export default alert;
