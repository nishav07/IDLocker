document.addEventListener("click", (e) => {
  if (e.target.closest("i[copyBtn]")) copybtn(e);

  if(e.target.closest("[delete-btn]")) delbtn(e);
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
        showToast("text copied :)")
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
}

async function delbtn (e) {
  const btn = e.target.closest("[delete-btn]");
    if (!btn) return;
    console.log("delete-btn-clicked")
   const postID = btn.dataset.id;
   const publicId = btn.dataset.publicId;

   console.log(postID,publicId);
   showLoader();


  try {
    const res =  await fetch("/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID })
    });

    if(res.status === 200)
      hideLoader();
     showToast("Document deleted","success",1000);
     setTimeout(() => {
      window.location.href = "Dashboard";
     },1000);
  } catch (error) {
    console.log("error aa gya yaar",error);
  }
}

function showToast(message, type = "success", time = 2500) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-msg");

    msg.innerText = message;

    toast.className = toast.className.replace(/bg-\S+/g, "");
    toast.classList.add(type === "success" ? "bg-green-600" : "bg-red-600");

    toast.classList.remove("hidden");
    toast.classList.add("opacity-0", "-translate-y-1/3");

    toast.offsetHeight;

    toast.classList.remove("opacity-0", "-translate-y-1/3");
    toast.classList.add("opacity-100", "-translate-y-1/2");

    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0", "-translate-y-20");

      setTimeout(() => {
        toast.classList.add("hidden");
      }, 500);
    }, time);
  }

   function showLoader() {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    loader.classList.add("opacity-100");
  }

  function hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  }
