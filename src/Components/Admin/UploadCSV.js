import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../auth/connection'; // Ensure the correct path

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('student'); // Default to student

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTypeChange = (e) => {
    setUploadType(e.target.value);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = uploadType === 'student' ? `${baseURL}/api/upload-student` : `${baseURL}/api/upload-faculty`;

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        alert('File uploaded successfully');
      })
      .catch(error => {
        console.error('There was an error uploading the file!', error);
        alert('Error uploading file');
      });
  };

  return (
    <div>
      <h1>Upload CSV</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="uploadType">Upload Type:</label>
          <select id="uploadType" value={uploadType} onChange={handleTypeChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div>
          <label htmlFor="file">File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadCSV;
