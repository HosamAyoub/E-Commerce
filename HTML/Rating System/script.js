var starsArray = [];
const mouseoverHandlers = [];
const mouseleaveHandlers = [];

for (let i = 0; i < 5; i++) {
  starsArray[i] = document.getElementById(`star${i + 1}`);

  const mouseoverHandler = () => displayRate(i + 1);
  const mouseleaveHandler = () => hideRate(i + 1);
  mouseoverHandlers[i] = mouseoverHandler;
  mouseleaveHandlers[i] = mouseleaveHandler;

  starsArray[i].addEventListener("mouseover", mouseoverHandler);
  starsArray[i].addEventListener("mouseleave", mouseleaveHandler);
  starsArray[i].addEventListener("click", () => saveRate(event));
}
document.querySelector("div").addEventListener("click", () => resetRate());

function displayRate(rate) {
  for (let i = 0; i < rate; i++) {
    starsArray[i].style.color = "yellow";
  }
}

function hideRate(rate) {
  for (let i = 0; i < rate; i++) {
    starsArray[i].style.color = "black";
  }
}

function saveRate(event) {
  event.stopPropagation();
  for (let i = 0; i < 5; i++) {
    starsArray[i].removeEventListener("mouseover", mouseoverHandlers[i]);
    starsArray[i].removeEventListener("mouseleave", mouseleaveHandlers[i]);
  }
}

function resetRate() {
  for (let i = 0; i < 5; i++) {
    starsArray[i].style.color = "black";
    starsArray[i].addEventListener("mouseover", mouseoverHandlers[i]);
    starsArray[i].addEventListener("mouseleave", mouseleaveHandlers[i]);
  }
}
