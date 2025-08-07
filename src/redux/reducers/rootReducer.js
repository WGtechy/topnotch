import { combineReducers } from "redux";
import {
  signInReducer,
  signUpReducer,
  membersReducers,
  mediaReducer,
  createAccountReducer,
  cartReducer,
  appReducer,
  otpReducer,
  contactUsReducer,
  // paystackReducer,
  dialogModalReducer,
  
  orderReducer,
} from ".";
import { commentsReducer, likesReducer, paystackReducer, postReducer, productReducer } from "./product.reducer";
import { userProfileReducer } from "./auth-reducers";

const reducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  users: membersReducers,
  media: mediaReducer,
  cart: cartReducer,
  app: appReducer,
  products: productReducer,
  createAccount: createAccountReducer,
  otp: otpReducer,
  contactUs: contactUsReducer,
  order: orderReducer,
  dialogModal: dialogModalReducer,
  userProfile: userProfileReducer,
  newTransaction: paystackReducer,
  comments: commentsReducer,
  likes: likesReducer,
  posts: postReducer
});
export default reducer;
