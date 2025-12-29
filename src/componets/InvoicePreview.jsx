import React from "react";
import { useSelector,useDispatch } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { closePreview } from "../store/InvoiceSlice";


const InvoicePreview = () => {
  const dispatch = useDispatch();
  const invoice = useSelector(
    (state) => state.invoices.selectedInvoice
   
  );
 console.log(invoice)
  if (!invoice) return null;
  
//  downloading pdf code-
  const downloadPDF = () => {
    const input = document.getElementById("invoice-preview");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`Invoice-${invoice.id}.pdf`);
    });
  };


  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white text-black p-10 rounded-lg w-[90%] max-w-3xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold ">Invoice Preview</h2>
          <button onClick={() => dispatch(closePreview())}className="text-red-600 text-xl font-bold" > ✕</button>
        </div>

        {/* Invoice Content */}
    
        <div id="invoice-preview">
            <div className="flex flex-col text-xl my-3"> 
                <p><b>Invoice ID:</b> {invoice.id}</p>
               <p><b>Invoice Date:</b> {invoice.invoiceDate}</p>
           </div>

           {/* sender info */}
            <h2 className="text-xl font-bold my-3 items-center underline">Sender Info:</h2>
          <div className="flex flex-col items-start gap-1">
          <p className="text-lg "><b >Name :</b> {invoice.billFrom.name}</p>
          <p className="text-lg "><b>Address : </b> {invoice.billFrom.city},{invoice.billFrom.post},{invoice.billFrom.country}</p>
          </div>

          {/* Client info */}
            <h2 className="text-xl font-bold my-3 items-center underline">Client Info:</h2>
          <div className="flex flex-col items-start gap-1">
          <p className="text-lg "><b >Name :</b> {invoice.billTo.name}</p>
          <p className="text-lg "><b>Email : </b> {invoice.billTo.email}</p>
          <p><b>Address : </b>{invoice.billTo.address},{invoice.billTo.post},{invoice.billTo.country}</p>
          </div>


       {/* summary of item and amount */}

           <h2 className="text-xl font-bold underline my-5">Summary:</h2>
          <hr className="my-3" />
           
          {invoice.items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.qty}</span>
              <span>{item.price}</span>
              <span>{item.qty} × ₹{item.price}</span>
            </div>
          ))}

          <hr className="my-3" />
          <h2 className="text-lg font-bold">Sub total : ₹ {invoice.subtotal}</h2>
          <h2 className="text-lg font-bold">Tax(18%) : ₹ {invoice.tax}</h2>
          <h3 className="text-lg font-bold my-5"> Total : ₹ {invoice.total}</h3>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-3">
          <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded">
            Download PDF
          </button>

          <button onClick={() => dispatch(closePreview())} className="bg-gray-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
