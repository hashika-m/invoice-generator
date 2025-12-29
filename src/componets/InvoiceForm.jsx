import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleForm } from '../store/InvoiceSlice'
import { useEffect } from "react";
import { createInvoice } from '../store/InvoiceSlice';

// state to handle fields
 const initialFormState={
    id:`INV${Math.floor(Math.random()*10000)}`,
    billFrom:{name:'',city:'',post:'',country:''},
    billTo:{name:'',email:'',address:'',post:'',country:''},
    items:[{name:'',qty:'',price:''}],
    description:'',
    invoiceDate:'',
    dueDate:'',
    subtotal: 0,
    tax: 0,
    total: 0,
    
  }

const InvoiceForm = () => {
  const dispatch=useDispatch()
  const[formData,setFormData]=useState(initialFormState)


  // Bill from
    const handleBillFrom = (e) => {
      const { name, value } = e.target;
      setFormData({
      ...formData,
      billFrom: { ...formData.billFrom, [name]: value },
    });
  };
  // bill to
  const handleBillTo = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      billTo: { ...formData.billTo, [name]: value },
    });
  };

  //  Items
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setFormData({ ...formData, items: updatedItems });
   };

   const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", qty: '', price: '' }],
    }));
   };

   const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
   };
  // Claculation of total
  useEffect(() => {
  const subtotal = formData.items.reduce((acc, item) => {
    return acc + Number(item.qty) * Number(item.price);
  }, 0);

  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  setFormData((prev) => ({
    ...prev,
    subtotal,
    tax,
    total,
  }));
  }, [formData.items]);
 
  // create and cancel button
  const handleCreate = (e) => {
  e.preventDefault();
  
  setFormData(initialFormState);
  dispatch(toggleForm())
  dispatch(createInvoice(formData))
  console.log("Invoice Data:", formData);
  }
  const handleCancel = () => {
  setFormData(initialFormState);
  dispatch(toggleForm())}

  return (
    <div className='flex items-start justify-center fixed inset-0 overflow-y-auto bg-black/50'>
        <div className='bg-slate-700 my-6 p-8 rounded-lg w-full max-w-2xl text-md'>

          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>New Invoice</h2>
            <button type='button' className='text-2xl ' onClick={()=>dispatch(toggleForm())}>x</button>
          </div>
          <form className='space-y-6'>
            {/* Bill from */}
            <div className='space-y-4'>
              <h2 className='text-violet-500 font-bold'>Bill from:</h2>
              <input type='text'  placeholder='Name' required className='w-full bg-slate-800  p-3 rounded' name='name' value={formData.name} onChange={handleBillFrom}/>
              <div className='grid grid-cols-3 gap-4'>
                <input type='text' placeholder='City' required className='w-full bg-slate-800 p-3 rounded' name='city' value={formData.city} onChange={handleBillFrom}/>
                <input type='text' placeholder='Post' required className='w-full bg-slate-800 p-3 rounded' name='post' value={formData.post} onChange={handleBillFrom}/>
                <input type='text' placeholder='Country' required className='w-full bg-slate-800 p-3 rounded' name='country' value={formData.country} onChange={handleBillFrom}/>
              </div>
           </div>
            {/* Bill to */}
            <div className='space-y-4'>
              <h2 className='text-violet-500 font-bold'>Bill to:</h2>
              <div className='grid grid-cols-2 gap-4'>
                <input type='text' placeholder=' Client name' required className='w-full bg-slate-800 p-3 rounded' name='name' value={formData.name} onChange={handleBillTo}/>
                <input type='text' placeholder=' Client email' required className='w-full bg-slate-800 p-3 rounded'name='email' value={formData.email} onChange={handleBillTo}/>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <input type='text' placeholder=' Client address' required className='w-full bg-slate-800 p-3 rounded' name='address' value={formData.address} onChange={handleBillTo}/>
                <input type='text' placeholder=' Client post' required className='w-full bg-slate-800 p-3 rounded' name='post' value={formData.post} onChange={handleBillTo}/>
                <input type='text' placeholder=' Client country' required className='w-full bg-slate-800 p-3 rounded' name='country' value={formData.country} onChange={handleBillTo}/> 
              </div>
              
              <div>
                 {/* desc and dates */}
                 <div className='grid grid-cols-3 gap-4'>
                   <h2 className='text-violet-500 font-bold mb-2'>Description:</h2>
                   <h2 className='text-violet-500 font-bold mb-2'>Invoice Date:</h2>
                   <h2 className='text-violet-500 font-bold mb-2'>Due Date:</h2>
                 </div>
                 <div className='grid grid-cols-3 gap-4'>
                     <input type='text' placeholder='Description'  className='w-full bg-slate-800 p-3 rounded'name='description' value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}/> 
                     <input type='date' placeholder='InvoiceDate'  className='w-full text-slate-400 bg-slate-800 p-3 rounded'name='invoiceDtae' value={formData.invoiceDate} onChange={(e)=>setFormData({...formData,invoiceDate:e.target.value})}/>
                     <input type='date' placeholder='Due Date'  className='w-full text-slate-400 bg-slate-800 p-3 rounded'name='dueDate' value={formData.dueDate} onChange={(e)=>setFormData({...formData,dueDate:e.target.value})}/>

                 </div>
                 {/* Items list  */}
                 <h2 className='text-violet-500 font-bold my-2'>Items List:</h2>
            {/* items map() */}
               {formData.items.map((i,index)=>{
                  return(
                    <div className='grid grid-cols-4 my-2 gap-4 items-center' key={index}>
                    <input type="text" placeholder='Product-name' required className='w-full bg-slate-800 p-3 rounded' name='name' value={i.name} onChange={(e)=>handleItemChange(index,'name',e.target.value)}/>
                    <input type="number" placeholder='Quantity' required className='w-full bg-slate-800 p-3 rounded' name='qty' value={i.qty} onChange={(e)=>handleItemChange(index,'qty',e.target.value)}/>
                    <input type="number" placeholder=' Price' required className='w-full bg-slate-800 p-3 rounded'name='price' value={i.price} onChange={(e)=>handleItemChange(index,'price',e.target.value)}/>
                   {/* edit,delete buttons */}

                     {/* <button type='button' className='bg-white rounded-full w-full hover:bg-white/50' onClick={addItem}>➕ Add item</button> */}
                   <div className="div grid grid-cols-2 gap-4  items-center text-center cursor-pointer" >
                     <button type='button' className='bg-violet-800 rounded-full w-full hover:bg-violet-800/50' onClick={()=>updateItem(index)}>✏️</button>
                     <button  type='button' className='bg-red-900 rounded-full w-full hover:bg-red-900/50' onClick={()=>removeItem(index)}>x</button>
                   </div>
                 </div>
                  )
              })}
                 {/*Add item default button  */}
                  <button className='bg-slate-600 hover:bg-slate-800/20 mt-4 rounded-lg flex items-center  justify-center px-3 py-2 w-full cursor-pointer' onClick={addItem}><span>➕</span>Add items</button>
                 
                 {/* Accounts section */}
                 <div className="flex flex-col mb-4">
                  <h2 className='text-violet-500 font-bold mb-2'>Summary:</h2>
                  <p className='text-md font-thin'>Subtotal: ₹{formData.subtotal.toFixed(2)}</p>
                  <p className='text-md font-thin'>Tax (18%): ₹{formData.tax.toFixed(2)}</p>
                  <h4 className='text-xl font-medium'>Total: ₹{formData.total.toFixed(2)}</h4>
                 </div>
                 {/* buttons -crate and cancel*/}
                 <div className='grid grid-cols-2 my-4 items-center gap-4 cursor-pointer'>
                  <button type='button' className='bg-violet-500 px-3 py-2 rounded-lg hover:bg-violet-500/50' onClick={handleCancel}>Cancle</button>
                  <button  type='submit'  className='bg-violet-500 px-3 py-2 rounded-lg hover:bg-violet-500/50'onClick={handleCreate}>Create</button>
                 </div>
              </div>
           
           </div>
          </form>
        </div>
    </div>
  )
}

export default InvoiceForm