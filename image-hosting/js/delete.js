// =========================
// DELETE IMAGE
// =========================

async function deleteImage(
  sr,
  imageUrl
){

  try{

    // CONFIRM
    const confirm =
    await Swal.fire({

      title:
      "Delete Image?",

      text:
      "This action cannot be undone",

      icon:
      "warning",

      showCancelButton:true,

      confirmButtonText:
      "Delete",

      cancelButtonText:
      "Cancel"

    });

    if(!confirm.isConfirmed){

      return;

    }

    // FILE NAME
    const fileName =
    imageUrl
    .split("/")
    .pop();

    // DELETE STORAGE
    const {
      error:storageError
    } =
    await supabaseClient
    .storage
    .from(BUCKET_NAME)
    .remove([
      fileName
    ]);

    if(storageError){

      throw storageError;

    }

    // DELETE DATABASE
    const {
      error:dbError
    } =
    await supabaseClient
    .from("images")
    .delete()
    .eq("sr", sr);

    if(dbError){

      throw dbError;

    }

    // SUCCESS
    Swal.fire({

      icon:"success",

      title:
      "Image Deleted",

      timer:1500,

      showConfirmButton:false

    });

    // RELOAD
    loadTable();

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      "Delete Failed",

      text:
      err.message

    });

  }

}