import React, {useContext} from 'react';
import LineChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import InvoiceContext from "../../context/InvoiceContext.jsx";

function DashboardCard08() {
  const {invoices} = useContext(InvoiceContext)

  const chartData = {
    labels: invoices.map((invoice) => invoice.date),
    datasets: [
      // Indigo line
      {
        label: 'Current',
        data: invoices.map((invoice) => invoice.totalPrice),
        borderColor: tailwindConfig().theme.colors.indigo[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
      },

      // Green line
      {
        label: 'Average',
        data: [
          122, 170, 192, 86, 102, 124, 115,
          115, 56, 104, 0, 72, 208, 186,
          223, 188, 114, 162, 200, 150, 118,
          118, 76, 122, 230, 268,
        ],
        borderColor: tailwindConfig().theme.colors.green[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Sales Over Time (all stores)</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
