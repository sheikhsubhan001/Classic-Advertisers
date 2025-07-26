import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // make sure logo is placed in src/assets/

const ReceiptPage = () => {
  const { state } = useLocation();
  const receiptRef = useRef();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const win = window.open("", "", "width=800,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class='bg-white text-black'>
          ${printContents}
        </body>
      </html>`);
    win.document.close();
    win.print();
  };

  const downloadPDF = () => {
    const element = receiptRef.current;
    const opt = {
      margin: 0.5,
      filename: "receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "A5", orientation: "landscape" },
    };
    window.html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
        </div>

        <div ref={receiptRef} className="bg-gray-800 p-6 border border-gray-700 rounded-xl shadow-lg text-white space-y-4">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <img src={logo} alt="Logo" className="w-32 h-auto" />
            <h2 className="text-2xl font-bold">Receipt</h2>
          </div>

          <div className="space-y-2 text-sm">
            <p><strong>Customer Name:</strong> {customer.name || "N/A"}</p>
            <p><strong>Phone Number:</strong> {customer.phone || "N/A"}</p>
            <p><strong>Address:</strong> {customer.address || "N/A"}</p>
          </div>

          <div className="mt-4 border-t border-gray-700 pt-4 text-sm space-y-1">
            <p><strong>Size:</strong> {state?.size || "N/A"}</p>
            <p><strong>Qty:</strong> {state?.qty || "N/A"}</p>
            <p><strong>Sq. Ft.:</strong> {state?.sft || "N/A"}</p>
            <p><strong>Total Price:</strong> Rs. {state?.totalPrice || "0"}</p>
          </div>

          <div className="text-center pt-4 border-t border-gray-700 text-xs text-gray-400">
            <p>Thank you for your purchase!</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            onClick={handlePrint}
          >
            Print Bill
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
