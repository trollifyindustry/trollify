// =========================
// USER INPUT
// =========================

const userIdInput =
document.getElementById(
  "userId"
);

const tokenBalance =
document.getElementById(
  "tokenBalance"
);

const historyTable =
document.getElementById(
  "historyTable"
);

// =========================
// AUTO LOAD
// =========================

userIdInput.addEventListener(
  "input",
  function(){

    loadWallet();

  }
);

// =========================
// LOAD WALLET
// =========================

async function loadWallet(){

  try{

    const userId =
    userIdInput.value.trim();

    if(!userId){

      tokenBalance.innerText =
      "0";

      historyTable.innerHTML = `
      <tr>
        <td colspan="5"
          class="empty">

          Enter User ID

        </td>
      </tr>
      `;

      return;

    }

    // =====================
    // LOAD TOKENS
    // =====================

    const {
      data:userData,
      error:userError
    } =
    await supabaseClient
    .from("users")
    .select("*")
    .eq("user_id", userId);

    if(userError){

      throw userError;

    }

    // USER NOT FOUND
    if(
      !userData ||
      userData.length === 0
    ){

      tokenBalance.innerText =
      "0";

    }else{

      tokenBalance.innerText =
      userData[0].tokens || 0;

    }

    // =====================
    // LOAD PAYMENTS
    // =====================

    const {
      data:payments,
      error:paymentError
    } =
    await supabaseClient
    .from("payments")
    .select("*")
    .eq("user_id", userId)
    .order(
      "id",
      {
        ascending:false
      }
    );

    if(paymentError){

      throw paymentError;

    }

    // EMPTY
    if(
      !payments ||
      payments.length === 0
    ){

      historyTable.innerHTML = `
      <tr>
        <td colspan="5"
          class="empty">

          No Transactions

        </td>
      </tr>
      `;

      return;

    }

    // TABLE
    historyTable.innerHTML =

    payments.map(
      (item,index)=>`

      <tr>

        <td>
          ${index + 1}
        </td>

        <td>
          ${item.payment_id}
        </td>

        <td>
          ₹${item.amount}
        </td>

        <td>
          ${item.tokens_added}
        </td>

        <td>
          ${new Date(
            item.created_at
          ).toLocaleString()}
        </td>

      </tr>

    `
    ).join("");

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      "Wallet Load Failed",

      text:
      err.message

    });

  }

}

// =========================
// BUY TOKENS
// =========================

async function buyTokens(
  amount,
  tokens
){

  try{

    const userId =
    userIdInput.value.trim();

    // VALIDATION
    if(!userId){

      Swal.fire({

        icon:"warning",

        title:
        "Enter User ID"

      });

      return;

    }

    // =====================
    // RAZORPAY
    // =====================

    const options = {

      key:
      RAZORPAY_KEY,

      amount:
      amount * 100,

      currency:
      "INR",

      name:
      "Trolify Infotech",

      description:
      tokens + " Tokens",

      theme:{
        color:"#ff7b00"
      },

      handler:
      async function(response){

        try{

          // PAYMENT ID
          const paymentId =
          response
          .razorpay_payment_id;

          // =================
          // CHECK USER
          // =================

          const {
            data:userData
          } =
          await supabaseClient
          .from("users")
          .select("*")
          .eq("user_id", userId);

          // EXISTING TOKENS
          let currentTokens = 0;

          if(
            userData &&
            userData.length > 0
          ){

            currentTokens =
            userData[0].tokens || 0;

            // UPDATE
            await supabaseClient
            .from("users")
            .update({

              tokens:
              currentTokens + tokens

            })
            .eq(
              "user_id",
              userId
            );

          }else{

            // CREATE USER
            await supabaseClient
            .from("users")
            .insert([{

              user_id:userId,

              tokens:tokens

            }]);

          }

          // =================
          // SAVE PAYMENT
          // =================

          await supabaseClient
          .from("payments")
          .insert([{

            user_id:userId,

            amount:amount,

            tokens_added:tokens,

            payment_id:paymentId

          }]);

          // SUCCESS
          Swal.fire({

            icon:"success",

            title:
            "Payment Successful",

            text:
            tokens +
            " Tokens Added"

          });

          // RELOAD
          loadWallet();

        }catch(err){

          console.log(err);

          Swal.fire({

            icon:"error",

            title:
            "Payment Save Failed",

            text:
            err.message

          });

        }

      }

    };

    // OPEN PAYMENT
    const razorpay =
    new Razorpay(options);

    razorpay.open();

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:
      "Payment Failed",

      text:
      err.message

    });

  }

}

// =========================
// AUTO LOAD LAST USER
// =========================

window.addEventListener(
  "load",
  function(){

    const savedUser =

    localStorage.getItem(
      "wallet_user_id"
    );

    if(savedUser){

      userIdInput.value =
      savedUser;

      loadWallet();

    }

  }
);

// =========================
// SAVE USER
// =========================

userIdInput.addEventListener(
  "input",
  function(){

    localStorage.setItem(

      "wallet_user_id",

      userIdInput.value

    );

  }
);