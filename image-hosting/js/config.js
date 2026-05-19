// =========================
// SUPABASE CONFIG
// =========================

const SUPABASE_URL =
"https://clnqgiheelibwkpgeiac.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbnFnaWhlZWxpYndrcGdlaWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMTg4NjAsImV4cCI6MjA5NDY5NDg2MH0.pckszMCl8UdUAlOJYc8kEusupFzxtV0zcvib08sMkAU";

// =========================
// STORAGE BUCKET
// =========================

const BUCKET_NAME =
"images";

// =========================
// RAZORPAY KEY
// =========================
// live rzp_live_SgT2z3HNRQRyXW
// test rzp_test_SgbaNVkd8iQjXE

const RAZORPAY_KEY =
"rzp_live_SgT2z3HNRQRyXW";

// =========================
// CREATE CLIENT
// =========================

const supabaseClient =
window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// =========================
// CHECK LIBRARY
// =========================

if(
  typeof window.supabase
  === "undefined"
){

  Swal.fire({

    icon:"error",

    title:
    "Supabase Failed To Load"

  });

}

// =========================
// GLOBAL ELEMENTS
// =========================

const imageFile =
document.getElementById(
  "imageFile"
);

const preview =
document.getElementById(
  "preview"
);

const uploadBtn =
document.getElementById(
  "uploadBtn"
);

const progressBar =
document.getElementById(
  "progressBar"
);

const progressText =
document.getElementById(
  "progressText"
);

const dropArea =
document.getElementById(
  "dropArea"
);

const tokenBox =
document.getElementById(
  "tokenBox"
);