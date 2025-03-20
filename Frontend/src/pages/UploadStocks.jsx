/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Box, Typography, Card, CardContent, Snackbar, Alert, CircularProgress } from '@mui/material';
import SellerLayout from '../components/admin/SellerLayout';
import { DiamondContext } from '../context/DiamondContext';

export default function UploadStocks() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const { uploadDiamonds, loading } = useContext(DiamondContext);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid CSV file.');
      setSnackbarMessage('Please upload a valid CSV file.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file to upload.');
      setSnackbarMessage('Please select a CSV file to upload.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const result = await uploadDiamonds(file);
      if (result.success) {
        setSnackbarMessage(`${result.message} (${result.count} records processed)`);
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage(result.message);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setFile(null);
      // Reset file input
      e.target.reset();
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
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center"
              >
                {loading ? (
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
        
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </SellerLayout>
  );
}
