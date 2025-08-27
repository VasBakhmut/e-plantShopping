import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		showCart: false,
	},
	toggleCart: (state, action) => {
		state.showCart = action.payload // true або false
	},

	reducers: {
		addItem: (state, action) => {
			const existingItem = state.items.find(
				item => item.name === action.payload.name
			)
			if (existingItem) {
				existingItem.quantity += 1
			} else {
				state.items.push({ ...action.payload, quantity: 1 })
			}
		},
		removeItem: (state, action) => {
			console.log("Hi I'm hire")
			state.items = state.items.filter(item => item.name !== action.payload)
		},
		updateQuantity: (state, action) => {
			const { name, quantity } = action.payload
			const item = state.items.find(item => item.name === name)
			if (item && quantity > 0) {
				item.quantity = quantity
			}
		},
		toggleCart: (state, action) => {
			state.showCart = action.payload // true або false
		},
	},
})

export const { addItem, removeItem, updateQuantity, toggleCart } =
	CartSlice.actions

export default CartSlice.reducer
