import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer.js";
import cartReducer from "./cartReducer.js";
import recentProductsReducer from "@/store/recentProductsReducer";
import cookie from 'js-cookie'

function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state.cart);
        const serialisedRecentProducts = JSON.stringify(state.recentProducts);
        sessionStorage.setItem("persistantCart", serialisedState);
        sessionStorage.setItem("recentProducts", serialisedRecentProducts);
    } catch (e) {
        console.warn(e);
    }
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    recentProducts: recentProductsReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;