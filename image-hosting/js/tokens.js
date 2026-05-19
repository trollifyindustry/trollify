// =========================
// LOAD USER TOKENS
// =========================

async function loadUserTokens(){

  try{

    const userId =
    document
    .getElementById("userId")
    .value
    .trim();

    if(!userId){

      tokenBox.innerText =
      "Tokens : 0";

      return;

    }

    const {
      data,
      error
    } =
    await supabaseClient
    .from("users")
    .select("tokens")
    .eq("user_id", userId)
    .single();

    if(error && error.code !== "PGRST116"){

      throw error;

    }

    const totalTokens =
    data?.tokens || 0;

    tokenBox.innerText =
    `Tokens : ${totalTokens}`;

  }catch(err){

    console.log(err);

    Swal.fire({

      icon:"error",

      title:"Token Load Failed",

      text:err.message

    });

  }

}

// =========================
// BUY TOKENS
// =========================

async function buyTokens(amount){

  try{

    const userId =
    document
    .getElementById("userId")
    .value
    .trim();

    if(!userId){

      Swal.fire({

        icon:"warning",

        title:"Enter User ID"

      });

      return;

    }

    // TOKENS
    const tokens =
    amount * 2;

    // RAZORPAY
    const options = {

      key:
      RAZORPAY_KEY,

      amount:
      amount * 100,

      currency:
      "INR",

      name:
      "Trolify Image Hosting",

      description:
      "Buy Upload Tokens",

      theme:{
        color:"#ff7b00"
      },

      handler:
      async function(response){

        try{

          // CHECK USER
          const {
            data:userData
          } =
          await supabaseClient
          .from("users")
          .select("*")
          .eq("user_id", userId)
          .single();

          // USER EXISTS
          if(userData){

            const oldTokens =
            userData.tokens || 0;

            // UPDATE
            const {
              error:updateError
            } =
            await supabaseClient
            .from("users")
            .update({

              tokens:
              oldTokens + tokens

            })
            .eq("user_id", userId);

            if(updateError){

              throw updateError;

            }

          }else{

            // CREATE USER
            const {
              error:insertError
            } =
            await supabaseClient
            .from("users")
            .insert([{

              user_id:userId,

              tokens:tokens

            }]);

            if(insertError){

              throw insertError;

            }

          }

          // SAVE PAYMENT
          const {
            error:paymentError
          } =
          await supabaseClient
          .from("payments")
          .insert([{

            user_id:userId,

            amount:amount,

            tokens_added:tokens,

            payment_id:
            response
            .razorpay_payment_id

          }]);

          if(paymentError){

            throw paymentError;

          }

          // SUCCESS
          Swal.fire({

            icon:"success",

            title:
            "Payment Successful",

            text:
            `${tokens} Tokens Added`

          });

          loadUserTokens();

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