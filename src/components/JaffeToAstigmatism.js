import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';

function JaffeToAstigmatism() {
  const [inputs, setInputs] = useState({ asg0: '', asg45: '' });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateAstigmatism = () => {
    const { asg0, asg45 } = inputs;
    const a0 = parseFloat(asg0);
    const a45 = parseFloat(asg45);
    
    if (isNaN(a0) || isNaN(a45)) {
      alert('Please enter valid numbers for asg_0° and asg_45°.');
      return;
    }

    const diopter = Math.sqrt(a0 * a0 + a45 * a45);
    let angle = (Math.atan2(a45, a0) * 90) / Math.PI;
    if (angle < 0) angle += 180;

    setResult({
      diopter: diopter.toFixed(2),
      angle: angle.toFixed(2),
    });
  };

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>Jaffe to Astigmatism</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="asg_0°"
            name="asg0"
            type="number"
            value={inputs.asg0}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="asg_45°"
            name="asg45"
            type="number"
            value={inputs.asg45}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={calculateAstigmatism}>
            Calculate
          </Button>
        </Grid>
      </Grid>
      {result && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Diopter: {result.diopter}D, Angle: {result.angle}°
        </Typography>
      )}
    </Paper>
  );
}

export default JaffeToAstigmatism;
