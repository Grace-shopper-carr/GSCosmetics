import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./products";
import singleProductReducer from "./singleProduct";
import createUserReducer from "./createUser";
import cartReducer from "./cart";
import cartProductReducer from "./cartProduct";

const reducer = combineReducers({
    auth,
    products,
    singleProductReducer,
    createUserReducer,
    cartReducer,
    cartProductReducer,
});
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
