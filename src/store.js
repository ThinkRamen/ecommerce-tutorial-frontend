import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
	productDetailsReducer,
	productListReducer
} from './reducers/productsReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer
} from './reducers/userReducers'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage }
}

const middleWare = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
