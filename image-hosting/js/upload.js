// =========================
// IMAGE PREVIEW
// =========================

imageFile.addEventListener(
  "change",
  showPreview
);

function showPreview() {

  try {

    const file =
      imageFile.files[0];

    if (!file) return;

    preview.src =
      URL.createObjectURL(file);

    preview.style.display =
      "block";

  } catch (err) {

    Swal.fire({

      icon: "error",

      title: err.message

    });

  }

}

// =========================
// DRAG DROP
// =========================

dropArea.addEventListener(
  "click",
  function () {

    imageFile.click();

  }
);

dropArea.addEventListener(
  "dragover",
  function (e) {

    e.preventDefault();

    dropArea.style.borderColor =
      "#ff7b00";

  }
);

dropArea.addEventListener(
  "dragleave",
  function () {

    dropArea.style.borderColor =
      "#ffb347";

  }
);

dropArea.addEventListener(
  "drop",
  function (e) {

    e.preventDefault();

    imageFile.files =
      e.dataTransfer.files;

    showPreview();

  }
);

// =========================
// PROGRESS
// =========================

function startProgress() {

  let width = 0;

  progressBar.style.width =
    "0%";

  progressText.innerText =
    "0%";

  const interval =
    setInterval(() => {

      if (width >= 90) {

        clearInterval(interval);

      } else {

        width++;

        progressBar.style.width =
          width + "%";

        progressText.innerText =
          width + "%";

      }

    }, 40);

}

// =========================
// IMAGE COMPRESS
// =========================

async function compressImage(file) {

  return new Promise((resolve) => {

    const img =
      new Image();

    img.onload = () => {

      const canvas =
        document.createElement(
          "canvas"
        );

      let width =
        img.width;

      let height =
        img.height;

      const maxWidth =
        1920;

      if (width > maxWidth) {

        height *=
          maxWidth / width;

        width =
          maxWidth;

      }

      canvas.width =
        width;

      canvas.height =
        height;

      const ctx =
        canvas.getContext("2d");

      ctx.drawImage(
        img,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(

        (blob) => {

          resolve(blob);

        },

        "image/jpeg",

        0.7

      );

    };

    img.src =
      URL.createObjectURL(file);

  });

}

// =========================
// UPLOAD IMAGE
// =========================

uploadBtn.addEventListener(
  "click",
  async function () {

    try {

      const file =
        imageFile.files[0];

      const userId =
        document
          .getElementById("userId")
          .value
          .trim();

      const imageName =
        document
          .getElementById("imageName")
          .value
          .trim();

      const quality =
        document
          .getElementById("quality")
          .value;

      // =====================
      // VALIDATION
      // =====================

      if (!file) {

        Swal.fire({

          icon: "warning",

          title:
            "Select Image"

        });

        return;

      }

      if (!userId) {

        Swal.fire({

          icon: "warning",

          title:
            "Enter User ID"

        });

        return;

      }

      if (!imageName) {

        Swal.fire({

          icon: "warning",

          title:
            "Enter Image Name"

        });

        return;

      }

      // =====================
      // CHECK USER
      // =====================

      const {
        data: userData,
        error: userError
      } =
        await supabaseClient
          .from("users")
          .select("*")
          .eq("user_id", userId);

      if (userError) {

        throw userError;

      }

      // USER NOT FOUND
      if (
        !userData ||
        userData.length === 0
      ) {

        Swal.fire({

          icon: "error",

          title:
            "User Not Found",

          text:
            "Please Buy Tokens First"

        });

        return;

      }

      // TOKEN
      const remaining =
        userData[0].tokens || 0;

      // NO TOKEN
      if (remaining <= 0) {

        Swal.fire({

          icon: "error",

          title:
            "No Tokens Left",

          text:
            "Please Buy Tokens"

        });

        return;

      }

      // =====================
      // START LOADING
      // =====================

      startProgress();

      Swal.fire({

        title:
          "Uploading...",

        text:
          "Please Wait",

        allowOutsideClick: false,

        didOpen: () => {

          Swal.showLoading();

        }

      });

      // =====================
      // FILE PROCESS
      // =====================

      let finalFile =
        file;

      if (
        quality === "low"
      ) {

        finalFile =
          await compressImage(file);

      }

      // =====================
      // FILE NAME
      // =====================

      const fileName =

        Date.now()
        + "_"
        + imageName
        + ".jpg";

      // =====================
      // UPLOAD STORAGE
      // =====================

      const {
        error: uploadError
      } =
        await supabaseClient
          .storage
          .from(BUCKET_NAME)
          .upload(
            fileName,
            finalFile
          );

      if (uploadError) {

        throw uploadError;

      }

      // =====================
      // PUBLIC URL
      // =====================

      const publicUrl =
        supabaseClient
          .storage
          .from(BUCKET_NAME)
          .getPublicUrl(
            fileName
          );

      const imageUrl =
        publicUrl
          .data
          .publicUrl;

      // =====================
      // SAVE IMAGE DATABASE
      // =====================

      const {
        error: dbError
      } =
        await supabaseClient
          .from("images")
          .insert([{

            user_id:
              userId,

            name:
              imageName,

            image_url:
              imageUrl,

            created_at:
              new Date()
                .toLocaleString()

          }]);

      if (dbError) {

        throw dbError;

      }

      // =====================
      // UPDATE TOKEN
      // =====================

      const {
        error: updateError
      } =
        await supabaseClient
          .from("users")
          .update({

            tokens:
              remaining - 1

          })
          .eq(
            "user_id",
            userId
          );

      if (updateError) {

        throw updateError;

      }

      // =====================
      // COMPLETE
      // =====================

      progressBar.style.width =
        "100%";

      progressText.innerText =
        "100%";

      // COPY URL
      navigator.clipboard.writeText(
        imageUrl
      );

      Swal.fire({

        icon: "success",

        title:
          "Upload Successful",

        text:
          "Image URL Copied"

      });

      // =====================
      // AUTO SEARCH
      // =====================

      document
        .getElementById(
          "filterId"
        )
        .value =
        userId;

      // =====================
      // RESET
      // =====================

      imageFile.value = "";

      preview.style.display =
        "none";

      document
        .getElementById(
          "imageName"
        )
        .value = "";

      // =====================
      // RELOAD
      // =====================

      loadUserTokens();

      loadTable();

    } catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title:
          "Upload Failed",

        text:
          err.message

      });

    }

  }
);