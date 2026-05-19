// =========================
// APP START
// =========================

window.addEventListener(
  "load",
  function(){

    initApp();

  }
);

// =========================
// INIT APP
// =========================

function initApp(){

  try{

    // INITIAL TABLE
    loadTable();

    // INITIAL TOKENS
    loadUserTokens();

    // RESET PROGRESS
    progressBar.style.width =
    "0%";

    progressText.innerText =
    "0%";

    console.log(
      "Trolify Image Hosting Started"
    );

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      "App Initialization Failed",

      text:
      err.message

    });

  }

}

// =========================
// AUTO TOKEN LOAD
// =========================

document
.getElementById(
  "userId"
)
.addEventListener(
  "input",
  function(){

    loadUserTokens();

  }
);

// =========================
// ENTER KEY SEARCH
// =========================

document
.getElementById(
  "filterId"
)
.addEventListener(
  "keypress",
  function(e){

    if(e.key === "Enter"){

      loadTable();

    }

  }
);

// =========================
// AUTO HIDE PREVIEW
// =========================

imageFile.addEventListener(
  "change",
  function(){

    if(
      imageFile.files.length
      === 0
    ){

      preview.style.display =
      "none";

    }

  }
);

// =========================
// CONNECTION CHECK
// =========================

async function checkConnection(){

  try{

    const {
      data,
      error
    } =
    await supabaseClient
    .from("users")
    .select("*")
    .limit(1);

    if(error){

      throw error;

    }

    console.log(
      "Supabase Connected"
    );

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      "Supabase Connection Failed",

      text:
      err.message

    });

  }

}

// =========================
// RUN CONNECTION CHECK
// =========================

checkConnection();

// =========================
// PAGE LOADER
// =========================

window.addEventListener(
  "beforeunload",
  function(){

    progressBar.style.width =
    "0%";

    progressText.innerText =
    "0%";

  }
);