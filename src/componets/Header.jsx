import React from 'react'

const Header = ({newInvoice}) => {
  return (
    <>
     {/* navcontent */}
     <div className='flex  items-center justify-between mb-3'>
       <h3 className='text-3xl font-medium'>Invoices</h3>
       <button onClick={newInvoice}
       className='bg-violet-600 text-white text-xl px-3 py-2 border-none outline-none rounded-xl hover:bg-violet-800 flex items-center space-x-2 gap-1'>
        <span className='text-lg bg-white rounded-full' >
          ➕</span> New Invoice</button>
     </div>
    </>
  )
}

export default Header