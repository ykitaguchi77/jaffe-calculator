import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';

function SynthesizeAstigmatism() {
  const [inputs, setInputs] = useState({
    diopter1: '', angle1: '',
    diopter2: '', angle2: ''
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const synthesizeAstigmatism = () => {
    const { diopter1, angle1, diopter2, angle2 } = inputs;
    const d1 = parseFloat(diopter1);
    const a1 = parseFloat(angle1);
    const d2 = parseFloat(diopter2);
    const a2 = parseFloat(angle2);
    
    if ([d1, a1, d2, a2].some(isNaN)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    const asg0_1 = d1 * Math.cos((a1 * 2 * Math.PI) / 180);
    const asg45_1 = d1 * Math.sin((a1 * 2 * Math.PI) / 180);
    const asg0_2 = d2 * Math.cos((a2 * 2 * Math.PI) / 180);
    const asg45_2 = d2 * Math.sin((a2 * 2 * Math.PI) / 180);

    const totalAsg0 = asg0_1 + asg0_2;
    const totalAsg45 = asg45_1 + asg45_2;

    const resultDiopter = Math.sqrt(totalAsg0 * totalAsg0 + totalAsg45 * totalAsg45);
    let resultAngle = (Math.atan2(totalAsg45, totalAsg0) * 90) / Math.PI;
    if (resultAngle < 0) resultAngle += 180;

    setResult({
      diopter: resultDiopter.toFixed(2),
      angle: resultAngle.toFixed(2),
    });
  };

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>Synthesize Astigmatism</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Diopter 1"
            name="diopter1"
            type="number"
            value={inputs.diopter1}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Angle 1"
            name="angle1"
            type="number"
            value={inputs.angle1}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Diopter 2"
            name="diopter2"
            type="number"
            value={inputs.diopter2}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Angle 2"
            name="angle2"
            type="number"
            value={inputs.angle2}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={synthesizeAstigmatism}>
            Synthesize
          </Button>
        </Grid>
      </Grid>
      {result && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Synthesized Diopter: {result.diopter}D, Angle: {result.angle}°
        </Typography>
      )}
    </Paper>
  );
}

export default SynthesizeAstigmatism;
