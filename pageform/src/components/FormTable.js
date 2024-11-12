"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const FormTable = () => {
  const [formData, setFormData] = useState({ name: '', age: '', movie: '', actor: '', song: '' });
  const [tableData, setTableData] = useState([]);
  const router = useRouter();

  // Retrieve data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...tableData, formData];
    setTableData(newData);
    localStorage.setItem('tableData', JSON.stringify(newData));
    setFormData({ name: '', age: '', movie: '', actor: '', song: '' });
    router.push('/pages');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-400 shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Form Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block font-medium mb-1">Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"/>
        </div>
        <div>
          <label className="block font-medium mb-1">Favorite Movie:</label>
          <input type="text" name="movie" value={formData.movie} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block font-medium mb-1">Favorite Actor:</label>
          <input type="text" name="actor" value={formData.actor} onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block font-medium mb-1">Favorite Song:</label>
          <input  type="text" name="song" value={formData.song}onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default FormTable;
