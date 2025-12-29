import React from 'react'
import Header from './Header'
import InvoiceList from './InvoiceList'
import InvoiceForm from './InvoiceForm'
import { useDispatch,useSelector } from 'react-redux'
import { toggleForm } from '../store/InvoiceSlice'
import InvoicePreview from './InvoicePreview'




const Conetnt = () => {

  const dispatch=useDispatch()

  
  const {isFormOpen, selectedInvoice}=useSelector((state)=>state.invoices)
  const handleNewInvoice=()=>{
    dispatch(toggleForm())
  }
  return (
    <>
    {/* app-container */}
     <div className='bg-slate-900 text-white min-h-screen ' >
        <div className='max-w-5xl mx-auto px-4 py-12'>
           <Header newInvoice={handleNewInvoice}/>
           <InvoiceList/>
           {/* <InvoiceForm/> */}
           {isFormOpen && <InvoiceForm/>  }
           {/* Invoice Preview */}
           {selectedInvoice && <InvoicePreview/>}
        </div>
       
     </div>
    </> 
  )
}

export default Conetnt