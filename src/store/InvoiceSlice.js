import {  createSlice } from "@reduxjs/toolkit";

const invoiceSlice=createSlice({
    name:'invoices',
    initialState:{
        invoices:[],
        selectedInvoice:null,
        isFormOpen:false,
    },
    reducers:{
         toggleForm:(state)=>{
            state.isFormOpen=!state.isFormOpen
            if(!state.isFormOpen){
                state.selectedInvoice=null
            }
        },
         createInvoice:(state,action)=>{
            state.invoices.push(action.payload)
            state.selectedInvoice=action.payload
            state.isFormOpen=false

         },
         selectInvoice:(state,action)=>{
            state.selectedInvoice=action.payload
         },
         closePreview: (state) => {
           state.selectedInvoice = null;
         },
    }
})

export const {toggleForm,createInvoice,selectInvoice,closePreview} = invoiceSlice.actions

export default invoiceSlice.reducer