import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectInvoice } from "../store/InvoiceSlice";

const InvoiceList = () => {
  const invoices = useSelector((state) => state.invoices.invoices);
  const dispatch = useDispatch();

  return (
    <div className='space-y-4'>
      {invoices.map((i, index) => (
        <div key={index} className='bg-slate-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-700 cursor-pointer'>
          {/* invoice list */}
          <div className='flex items-center flex-row space-x-6'>
            <span className='text-slate-400'>{i.id}</span>
            <span className='text-slate-400'>Due: {i.dueDate}</span>
            <span className='text-slate-400'>{i.billTo.name}</span>
          </div>

          {/* Amount */}
          <div className='grid grid-cols-2 items-center space-x-6'>
            <span className='text-white text-xl'>Amount to pay: ₹{i.total}</span>
            <button
              onClick={() => dispatch(selectInvoice(i))}
              className='bg-transparent px-3 py-2 rounded-lg hover:bg-violet-700 cursor-pointer'
            >
              Preview
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceList;
