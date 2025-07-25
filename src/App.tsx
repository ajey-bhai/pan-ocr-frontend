import React, { useState } from 'react';
import './App.css';

interface PanDetails {
  pan_number: string | null;
  name: string | null;
  father_name: string | null;
  dob: string | null;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState<PanDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDetails(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setDetails(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(
        'https://pan-ocr-backend-production.up.railway.app/extract_pan',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Failed to extract PAN details.');
      }
      const data = await response.json();
      setDetails(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>PAN Card OCR</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.heic,.pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Extracting...' : 'Upload & Extract'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {details && (
        <div className="result">
          <h2>Extracted Details</h2>
          <p><strong>PAN Number:</strong> {details.pan_number || <em>Not found</em>}</p>
          <p><strong>Name:</strong> {details.name || <em>Not found</em>}</p>
          <p><strong>Father's Name:</strong> {details.father_name || <em>Not found</em>}</p>
          <p><strong>Date of Birth:</strong> {details.dob || <em>Not found</em>}</p>
        </div>
      )}
      <footer>
        <small>Powered by OpenAI Vision OCR</small>
      </footer>
    </div>
  );
}

export default App;
