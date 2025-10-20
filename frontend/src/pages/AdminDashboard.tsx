import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetch('http://localhost:5000/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) setMessage(data.message);
        else setError(data.error || 'Unauthorized');
      })
      .catch(() => setError('Network error'));
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }

  return (
    <Box maxWidth={600} mx="auto" mt={10} p={4} boxShadow={2} borderRadius={2} bgcolor="white">
      <Typography variant="h4" fontWeight={700} mb={2} textAlign="center">Admin Dashboard</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
}
