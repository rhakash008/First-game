import { useState } from 'react';

export default function Learn() {
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/learn", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Upload CSV</h1>
      <input type="file" accept=".csv" onChange={handleUpload} />
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
