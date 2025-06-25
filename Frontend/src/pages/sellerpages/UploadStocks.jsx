/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Box, Typography, Card, CardContent, Snackbar, Alert, CircularProgress } from '@mui/material';
import SellerLayout from '../../components/SellerLayout';
import { DiamondContext } from '../../context/DiamondContext';

export default function UploadStocks() {
  const [file, setFile] = useState(null);

  const { product, upload } = useContext(DiamondContext);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert('Please upload a valid CSV file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        alert('Please select a CSV file to upload.');
        return;
      }
      await upload(file);
      setFile('');
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <SellerLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Upload Stocks
        </Typography>
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Upload Diamond Stock Details
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Please upload your diamond stock details in CSV format
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-medium" htmlFor="file">
                  Select CSV File*
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".csv"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                  onChange={handleFileChange}
                />
              </div>
              {product.error && <p className='text-red-500 font-semibold mt-2'>{product.error}</p>}

              <button
                type="submit"
                disabled={product.isLoading}
                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center"
              >
                {product.isLoading ? (
                  <>
                    <CircularProgress size={20} color="inherit" className="mr-2" />
                    Uploading...
                  </>
                ) : (
                  'Upload'
                )}
              </button>
            </form>
          </CardContent>
        </Card>


      </Box>
    </SellerLayout>
  );
}
