import { useState } from 'react';

export default function Ask() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleAsk = async () => {
    const res = await fetch(`http://localhost:8000/ask?q=${input}`);
    const data = await res.json();
    setResult(data.prediction || data.error);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Ask a Question</h1>
      <input
        type="text"
        placeholder="Enter comma-separated features"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={handleAsk} className="ml-2 px-4 py-1 bg-blue-500 text-white">Ask</button>
      {result && <p className="mt-2">{result}</p>}
    </div>
  );
}
