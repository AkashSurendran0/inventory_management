import React from "react";

function LedgerTable({customerLedgerData}) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 mb-6">
      {customerLedgerData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800">
                <th className="px-6 py-3 text-left font-semibold text-white">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-semibold text-white">
                  Product
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {customerLedgerData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-700 transition-colors duration-200 hover:bg-slate-800 ${
                    index % 2 === 0 ? "bg-slate-900" : "bg-slate-800/50"
                  }`}
                >
                  <td className="px-6 py-4 text-slate-300">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-300">{item.productName}</td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-400">
                    ${item.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-slate-400">
            No transactions found for this customer
          </p>
        </div>
      )}
    </div>
  );
}

export default LedgerTable;
