import  PaystackPop from "@paystack/inline-js"
import { paystackKey } from "./urlConfig";
import { toast } from "react-toastify";
import { toastObject } from "../redux/toastObject";
const payWithPaystack =({
  email,
  amount,
  isCAccount,
  renewal,
  accountName,
  isFirst,
  currency,
  exchangeRate,
  confirmFromServer
})=>{
  let fee = 0 ;
  if(isFirst){
fee = amount * (currency === "NGN" ? exchangeRate.naira : currency === "GBP" ? exchangeRate.pounds : 1) * (renewal === "Annually" ? 12 : 1)
    
  } else{
fee = amount * (currency === "NGN" ? exchangeRate.naira : currency === "GBP" ? exchangeRate.pounds : 1) * (renewal === "Annually" ? 12 : 1)
  }
  let handler = PaystackPop.setup({
    key: paystackKey,
    "email": `${email}`,
    "amount": `${fee * 100}`,
    "currency": `${currency}`,
    "metadata": {
      "custom_fields":[{ 
        isCAccount,
        accountName,
        renewal
      }]
    },
    // label: "Optional string that replaces customer email"
    onClose: function(){
      toast.error('Payment canceled', toastObject);

    },
    callback: function(response){
      let message = 'Payment complete! Reference: ' + response.reference;
      confirmFromServer(response.reference)

    }
  });

  handler.openIframe();
}


export {payWithPaystack}