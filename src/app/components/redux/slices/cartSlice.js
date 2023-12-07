
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0 ,
}


// Load state from localStorage if available
const savedCartState = JSON.parse(localStorage.getItem("cartState"));
const initialStateWithLocalStorage = savedCartState || initialState;

const cartSlice = createSlice({
    name: "cart",
    initialState: initialStateWithLocalStorage,
    reducers: {
        addItem: (state, action)=>{
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item=> item.id === newItem.id);

            state.totalQuantity++

            if(!existingItem){
                state.cartItems.push({
                    id: newItem.id,
                    nomprod: newItem.nomprod,
                    prix: newItem.prix,
                    prixF: newItem.prixF,
                    qty: newItem.qty,
                    nomF: newItem.nomF,
                    contactF: newItem.contactF,
                    adresseF: newItem.adresseF,
                    localF: newItem.localF,
                    categoryId: newItem.categoryId,
                    chilCategoryId: newItem.chilCategoryId,
                    totalPrice: newItem.price,
                    productphotos: JSON.stringify(newItem.productphotos),
                })
            }

            else{
                existingItem.qty++;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number
                (newItem.prix)
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total+
            Number(item.prix) * Number(item.qty), 0
            );

            localStorage.setItem("cartState", JSON.stringify(state));
        },

        
    suppItem: (state, action) => {
      const RemoveItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === RemoveItem.id);

      if (existingItem) {
        if (existingItem.qty === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== RemoveItem.id
          );
          state.totalQuantity = Math.max(0, state.totalQuantity - 1); // Ensure totalQuantity is never below 0
        } else {
          existingItem.qty--;
          existingItem.totalPrice =
            Number(existingItem.totalPrice) - Number(existingItem.prix);
          state.totalQuantity = Math.max(0, state.totalQuantity - 1); // Ensure totalQuantity is never below 0
        }

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.prix) * Number(item.qty),
          0
        );

        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
    
   
        deleteItem:(state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find((item) => item.id === id)
            
             if(existingItem)
            {
                state.cartItems = state.cartItems.filter((item) => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.qty;
            }
    
            state.totalAmount = state.cartItems.reduce((total, item) =>
             total + Number(item.prix) * Number(item.qty),0
             );
    
           
        },
        

        viderPanier: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.removeItem("cartState");
          },

   
        

    },

    

   

});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;



