<script>
  const flash = document.querySelector(".flash-toast");

  if (flash) {
    // show
    setTimeout(() => {
      flash.classList.remove("opacity-0", "translate-y-6");
      flash.classList.add("opacity-100", "translate-y-0");
    }, 100);

    // hide
    setTimeout(() => {
      flash.classList.remove("opacity-100", "translate-y-0");
      flash.classList.add("opacity-0", "translate-y-6");
    }, 3500);
  }
</script>
