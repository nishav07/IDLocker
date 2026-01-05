document.addEventListener("click", (e) => {
  if (e.target.closest("i[copyBtn]")) copybtn(e);
});



document.querySelectorAll("a[data-page]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.currentTarget.getAttribute("data-page");
    loadPage(page);
  });
});



document.addEventListener("DOMContentLoaded" , () => {
  loadPage("docs");
});


function loadPage(page) {
  fetch(`/components/${page}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
    //   initPage(page);
    });
}

const profileBtn = document.getElementById("profile");
const logoutBtn = document.getElementById("logout-section");

profileBtn.addEventListener("click", () => {
  logoutBtn.classList.toggle("hidden");
})



function flash(){
  
  const flash = document.getElementById("flash");

  if (flash) {
    setTimeout(() => {
      flash.classList.remove("opacity-0", "translate-y-6");
    }, 50);


    setTimeout(() => {
      flash.classList.add("opacity-0", "translate-y-6");
    }, 3000);
  }

}

flash();

function copybtn (e) {
   const btn = e.target.closest("i[copyBtn]");
    if (!btn) return;
    console.log("copy btn clikedddddd");
    const p = btn.closest("p");
    const docID = p.querySelector('[document-id]').innerText;
    console.log(docID);

     navigator.clipboard.writeText(docID)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
}