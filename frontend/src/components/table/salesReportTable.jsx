import React from "react";

function SalesReportTable({filteredSalesData}) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
      {filteredSalesData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800">
                <th className="px-6 py-3 text-left font-semibold text-white">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-semibold text-white">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-white">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white">
                  Price per Unit
                </th>
                <th className="px-6 py-3 text-right font-semibold text-white">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSalesData.map((sale, index) => (
                <tr
                  key={sale._id}
                  className={`border-b border-slate-700 transition-colors duration-200 hover:bg-slate-800 ${
                    index % 2 === 0 ? "bg-slate-900" : "bg-slate-800/50"
                  }`}
                >
                  <td className="px-6 py-4 text-slate-300">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-300">{sale.productName}</td>
                  <td className="px-6 py-4 text-slate-300">{sale.customerName}</td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    {sale.quantity}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    ${sale.pricePerUnit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-400">
                    ${sale.totalAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-slate-400">
            No sales data available for the selected filters
          </p>
        </div>
      )}
    </div>
  );
}

export default SalesReportTable;
