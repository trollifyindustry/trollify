// =========================
// LOAD TABLE
// =========================

async function loadTable(){

  try{

    const tbody =
    document.getElementById(
      "tableBody"
    );

    const filterId =
    document
    .getElementById(
      "filterId"
    )
    .value
    .trim();

    // EMPTY
    if(!filterId){

      tbody.innerHTML = `
      <tr>
        <td colspan="6"
          class="empty-box">

          Enter User ID To View Images

        </td>
      </tr>
      `;

      document
      .getElementById(
        "countBox"
      )
      .innerText =
      "Total Images : 0";

      return;

    }

    // LOADING
    tbody.innerHTML = `
    <tr>
      <td colspan="6"
        class="empty-box">

        Loading Images...

      </td>
    </tr>
    `;

    // FETCH DATA
    const {
      data,
      error
    } =
    await supabaseClient
    .from("images")
    .select("*")
    .eq("user_id", filterId)
    .order(
      "sr",
      {
        ascending:false
      }
    );

    if(error){

      throw error;

    }

    renderTable(data);

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      "Table Load Failed",

      text:
      err.message

    });

  }

}

// =========================
// RENDER TABLE
// =========================

function renderTable(data){

  try{

    const tbody =
    document.getElementById(
      "tableBody"
    );

    const search =
    document
    .getElementById(
      "searchInput"
    )
    .value
    .toLowerCase();

    // FILTER
    const filtered =
    data.filter((item)=>{

      const name =
      item.name || "";

      return name
      .toLowerCase()
      .includes(search);

    });

    // COUNT
    document
    .getElementById(
      "countBox"
    )
    .innerText =
    `Total Images : ${filtered.length}`;

    // EMPTY
    if(filtered.length === 0){

      tbody.innerHTML = `
      <tr>
        <td colspan="6"
          class="empty-box">

          No Images Found

        </td>
      </tr>
      `;

      return;

    }

    // TABLE
    tbody.innerHTML =

    filtered.map(
      (item,index)=>`

      <tr>

        <td>
          ${index + 1}
        </td>

        <td>
          ${item.name}
        </td>

        <td>

          <img
            src="${item.image_url}">

        </td>

        <td class="url-box">

          ${item.image_url}

        </td>

        <td>

          <button
            class="action-btn"
            onclick="copyUrl(
              '${item.image_url}'
            )">

            Copy

          </button>

          <button
            class="action-btn"
            onclick="deleteImage(
              ${item.sr},
              '${item.image_url}'
            )">

            Delete

          </button>

        </td>

        <td>

          ${item.created_at}

        </td>

      </tr>

    `).join("");

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      err.message

    });

  }

}

// =========================
// COPY URL
// =========================

function copyUrl(url){

  navigator.clipboard.writeText(
    url
  );

  Swal.fire({

    icon:"success",

    title:
    "URL Copied",

    timer:1200,

    showConfirmButton:false

  });

}

// =========================
// SEARCH EVENTS
// =========================

document
.getElementById(
  "searchInput"
)
.addEventListener(
  "input",
  loadTable
);

document
.getElementById(
  "filterId"
)
.addEventListener(
  "input",
  function(){

    loadTable();

    loadUserTokens();

  }
);