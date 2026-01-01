
  const flash = document.getElementById("flash");

  if (flash) {
    // show
    setTimeout(() => {
      flash.classList.remove("opacity-0", "translate-y-6");
    }, 50);

    // hide
    setTimeout(() => {
      flash.classList.add("opacity-0", "translate-y-6");
    }, 3000);
  }



