import React, {useContext} from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import InvoiceContext from "../../context/InvoiceContext.jsx";

function DashboardCard04() {
  const {invoices} = useContext(InvoiceContext)

  const chartData = {
    labels: invoices.map((invoice) => invoice.date),
    datasets: [
      // Light blue bars
      {
        label: 'Total',
        data: invoices.map((invoice) => {
          return  invoice.totalPrice
        }),
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-blackFactory">Total Sales Revenue</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
