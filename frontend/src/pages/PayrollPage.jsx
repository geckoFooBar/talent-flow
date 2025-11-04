import { useState } from 'react';
import { payrollData } from '../data/payroll'

const PayrollPage = () => {
    const [isSalaryPaid, setIsSalaryPaid] = useState(false)
    const markedPaid = () => {
        alert("Paid Salary")
        setIsSalaryPaid(true)
    }

    return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Employee</th>
              <th className="py-2 px-4 border-b text-left">Position</th>
              <th className="py-2 px-4 border-b text-left">Month</th>
              <th className="py-2 px-4 border-b text-left">Salary</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((pay) => (
              <tr key={pay.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{pay.name}</td>
                <td className="py-2 px-4 border-b">{pay.position}</td>
                <td className="py-2 px-4 border-b">{pay.month}</td>
                <td className="py-2 px-4 border-b">{pay.salary}</td>
                <td className={`py-2 px-4 border-b ${pay.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {pay.status}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline mr-2">View</button>
                  {pay.status === 'Pending' && (
                    <button className="text-green-600 hover:underline" onClick={markedPaid}>Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollPage;
