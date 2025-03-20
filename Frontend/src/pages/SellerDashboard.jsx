/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Layout from '../components/admin/SellerLayout';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for the graph
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Items Sold',
        data: [50, 75, 150, 100, 200, 250],
        borderColor: '#111',
        backgroundColor: 'rgba(17, 17, 17, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Seller Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Sales
                </Typography>
                <Typography variant="h4">₹1,20,000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Items Sold
                </Typography>
                <Typography variant="h4">1,200</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Pending Orders
                </Typography>
                <Typography variant="h4">45</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Stock Remaining
                </Typography>
                <Typography variant="h4">350</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Graph */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sales Overview
                </Typography>
                <Line data={data} options={options} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
