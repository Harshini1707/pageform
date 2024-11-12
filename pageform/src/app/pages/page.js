"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SubmittedData = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState({}); // To track selected checkboxes
  const [deletedRows, setDeletedRows] = useState([]); // To store deleted entries for undo

  // Retrieve the data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
  }, []);

  // Filter out rows where all fields are empty
  const filteredTableData = tableData.filter(
    (row) => Object.values(row).some((value) => value !== '')
  );

  // Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle checkbox selection
    }));
  };

  // Function to clear selected data
  const handleClearSelected = () => {
    const newTableData = tableData.filter((_, index) => !selectedRows[index]);
    const removedEntries = tableData.filter((_, index) => selectedRows[index]);

    setDeletedRows(removedEntries); // Save the removed entries for undo
    setTableData(newTableData);
    localStorage.setItem('tableData', JSON.stringify(newTableData));
    setSelectedRows({}); // Reset selected checkboxes
  };

  // Function to undo last deletion
  const handleUndo = () => {
    if (deletedRows.length > 0) {
      const updatedTableData = [...tableData, ...deletedRows];
      setTableData(updatedTableData);
      localStorage.setItem('tableData', JSON.stringify(updatedTableData));
      setDeletedRows([]); // Clear the deleted rows
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Submitted Data</h3>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-4">Select</th>
            <th className="border border-gray-300 py-2 px-4">Name</th>
            <th className="border border-gray-300 py-2 px-4">Age</th>
            <th className="border border-gray-300 py-2 px-4">Favorite Movie</th>
            <th className="border border-gray-300 py-2 px-4">Favorite Actor</th>
            <th className="border border-gray-300 py-2 px-4">Favorite Song</th>
          </tr>
        </thead>
        <tbody>
          {filteredTableData.length > 0 ? (
            filteredTableData.map((data, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 py-2 px-4">
                  <input
                    type="checkbox"
                    checked={!!selectedRows[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="border border-gray-300 py-2 px-4">{data.name}</td>
                <td className="border border-gray-300 py-2 px-4">{data.age}</td>
                <td className="border border-gray-300 py-2 px-4">{data.movie}</td>
                <td className="border border-gray-300 py-2 px-4">{data.actor}</td>
                <td className="border border-gray-300 py-2 px-4">{data.song}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-2">No data submitted</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between"> {/* Flex container for buttons */}
        <div className="flex space-x-2"> {/* Horizontal space between buttons */}
          <button
            className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
            onClick={handleClearSelected}
          >
            Clear Selected
          </button>
          <button
            className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700"
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={() => router.push('/')}
        >
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default SubmittedData;
