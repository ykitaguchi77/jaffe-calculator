import React, { useState } from 'react';
import {
  Container, Typography, Grid, Paper, Box, TextField, Button,
  ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import { Calculator } from 'lucide-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const InputField = ({ label, value, onChange }) => (
  <TextField
    fullWidth
    label={label}
    variant="outlined"
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    margin="normal"
  />
);

const ResultDisplay = ({ label, value }) => (
  <Typography variant="body1">
    <strong>{label}:</strong> {value}
  </Typography>
);

function JaffeCalculator() {
  const [diopter, setDiopter] = useState('');
  const [angle, setAngle] = useState('');
  const [asg0, setAsg0] = useState('');
  const [asg45, setAsg45] = useState('');
  const [synthDiopter1, setSynthDiopter1] = useState('');
  const [synthAngle1, setSynthAngle1] = useState('');
  const [synthDiopter2, setSynthDiopter2] = useState('');
  const [synthAngle2, setSynthAngle2] = useState('');
  const [astigToJaffeResult, setAstigToJaffeResult] = useState({ asg0: '', asg45: '' });
  const [jaffeToAstigResult, setJaffeToAstigResult] = useState({ diopter: '', angle: '' });
  const [synthResult, setSynthResult] = useState({ diopter: '', angle: '' });

  const calculateAstigToJaffe = () => {
    const d = parseFloat(diopter);
    const a = parseFloat(angle);
    if (isNaN(d) || isNaN(a)) {
      alert('Please enter valid numbers for diopter and angle.');
      return;
    }
    const resultAsg0 = Math.abs(d) * Math.cos((a * 2 * Math.PI) / 180);
    const resultAsg45 = Math.abs(d) * Math.sin((a * 2 * Math.PI) / 180);
    setAstigToJaffeResult({
      asg0: resultAsg0.toFixed(2),
      asg45: resultAsg45.toFixed(2)
    });
  };

  const calculateJaffeToAstig = () => {
    const a0 = parseFloat(asg0);
    const a45 = parseFloat(asg45);
    if (isNaN(a0) || isNaN(a45)) {
      alert('Please enter valid numbers for asg_0° and asg_45°.');
      return;
    }
    const resultDiopter = Math.sqrt(a0 * a0 + a45 * a45);
    const resultAngle = (Math.atan2(a45, a0) * 90) / Math.PI;
    setJaffeToAstigResult({
      diopter: resultDiopter.toFixed(2),
      angle: resultAngle.toFixed(2)
    });
  };

  const calculateSynthesis = () => {
    const d1 = parseFloat(synthDiopter1);
    const a1 = parseFloat(synthAngle1);
    const d2 = parseFloat(synthDiopter2);
    const a2 = parseFloat(synthAngle2);
    if (isNaN(d1) || isNaN(a1) || isNaN(d2) || isNaN(a2)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    const x = d1 * Math.cos(2 * a1 * Math.PI / 180) + d2 * Math.cos(2 * a2 * Math.PI / 180);
    const y = d1 * Math.sin(2 * a1 * Math.PI / 180) + d2 * Math.sin(2 * a2 * Math.PI / 180);
    const resultDiopter = Math.sqrt(x * x + y * y);
    const resultAngle = Math.atan2(y, x) * 90 / Math.PI;
    setSynthResult({
      diopter: resultDiopter.toFixed(2),
      angle: resultAngle.toFixed(2)
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom align="center" sx={{ mt: 4, mb: 2 }}>
          Jaffe Astigmatism Analyzer
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa' }}>
          <Typography variant="body1">
            The Jaffe method, introduced by Norman Jaffe in 1967, is a vector analysis technique for astigmatism. 
            It represents astigmatism as two orthogonal components: asg_0° (with-the-rule or against-the-rule) 
            and asg_45° (oblique). This method allows for more precise astigmatism calculations and comparisons, 
            especially useful in refractive surgery and contact lens fitting.
          </Typography>
        </Paper>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img src="/api/placeholder/600/400" alt="Jaffe Astigmatism Analysis Diagram" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom align="center">Astigmatism → Jaffe</Typography>
              <InputField label="Diopter (D)" value={diopter} onChange={setDiopter} />
              <InputField label="Angle (°)" value={angle} onChange={setAngle} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateAstigToJaffe}
                startIcon={<Calculator />}
                sx={{ mt: 2 }}
              >
                Calculate
              </Button>
              {astigToJaffeResult.asg0 && astigToJaffeResult.asg45 && (
                <Box sx={{ mt: 2 }}>
                  <ResultDisplay label="asg_0°" value={astigToJaffeResult.asg0} />
                  <ResultDisplay label="asg_45°" value={astigToJaffeResult.asg45} />
                </Box>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom align="center">Jaffe → Astigmatism</Typography>
              <InputField label="asg_0°" value={asg0} onChange={setAsg0} />
              <InputField label="asg_45°" value={asg45} onChange={setAsg45} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateJaffeToAstig}
                startIcon={<Calculator />}
                sx={{ mt: 2 }}
              >
                Calculate
              </Button>
              {jaffeToAstigResult.diopter && jaffeToAstigResult.angle && (
                <Box sx={{ mt: 2 }}>
                  <ResultDisplay label="Diopter" value={`${jaffeToAstigResult.diopter}D`} />
                  <ResultDisplay label="Angle" value={`${jaffeToAstigResult.angle}°`} />
                </Box>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom align="center">Synthesize Astigmatism</Typography>
              <InputField label="Diopter 1 (D)" value={synthDiopter1} onChange={setSynthDiopter1} />
              <InputField label="Angle 1 (°)" value={synthAngle1} onChange={setSynthAngle1} />
              <InputField label="Diopter 2 (D)" value={synthDiopter2} onChange={setSynthDiopter2} />
              <InputField label="Angle 2 (°)" value={synthAngle2} onChange={setSynthAngle2} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateSynthesis}
                startIcon={<Calculator />}
                sx={{ mt: 2 }}
              >
                Calculate
              </Button>
              {synthResult.diopter && synthResult.angle && (
                <Box sx={{ mt: 2 }}>
                  <ResultDisplay label="Synthesized Diopter" value={`${synthResult.diopter}D`} />
                  <ResultDisplay label="Synthesized Angle" value={`${synthResult.angle}°`} />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default JaffeCalculator;