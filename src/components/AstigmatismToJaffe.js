import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';

function AstigmatismToJaffe() {
  const [inputs, setInputs] = useState({ diopter: '', angle: '' });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateJaffe = () => {
    const { diopter, angle } = inputs;
    const d = parseFloat(diopter);
    const a = parseFloat(angle);
    
    if (isNaN(d) || isNaN(a)) {
      alert('Please enter valid numbers for diopter and angle.');
      return;
    }

    const asg0 = d * Math.cos((a * 2 * Math.PI) / 180);
    const asg45 = d * Math.sin((a * 2 * Math.PI) / 180);

    setResult({
      asg0: asg0.toFixed(2),
      asg45: asg45.toFixed(2),
    });
  };

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>Astigmatism to Jaffe</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Diopter"
            name="diopter"
            type="number"
            value={inputs.diopter}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Angle (degrees)"
            name="angle"
            type="number"
            value={inputs.angle}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={calculateJaffe}>
            Calculate
          </Button>
        </Grid>
      </Grid>
      {result && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          asg_0°: {result.asg0}, asg_45°: {result.asg45}
        </Typography>
      )}
    </Paper>
  );
}

export default AstigmatismToJaffe;
