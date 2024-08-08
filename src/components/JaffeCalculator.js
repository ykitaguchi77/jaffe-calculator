import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Tabs, Tab, Box } from '@mui/material';
import AstigmatismToJaffe from './AstigmatismToJaffe';
import JaffeToAstigmatism from './JaffeToAstigmatism';
import SynthesizeAstigmatism from './SynthesizeAstigmatism';
import JaffeChart from './JaffeChart';

function JaffeCalculator() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Jaffe Astigmatism Analyzer
      </Typography>
      <Box sx={{ bgcolor: '#f8d7da', border: 1, borderColor: '#f5c6cb', color: '#721c24', p: 2, borderRadius: 1, mb: 2 }}>
        <Typography variant="body1">
          The Jaffe method, introduced by Norman Jaffe in 1967, is a vector analysis technique for astigmatism. 
          It represents astigmatism as two orthogonal components: asg_0° (with-the-rule or against-the-rule) 
          and asg_45° (oblique). This method allows for more precise astigmatism calculations and comparisons, 
          especially useful in refractive surgery and contact lens fitting.
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <img src="/api/placeholder/400/300" alt="Jaffe Astigmatism Analysis Diagram" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Astigmatism → Jaffe" />
              <Tab label="Jaffe → Astigmatism" />
              <Tab label="Synthesize Astigmatism" />
            </Tabs>
          </Paper>
          {activeTab === 0 && <AstigmatismToJaffe />}
          {activeTab === 1 && <JaffeToAstigmatism />}
          {activeTab === 2 && <SynthesizeAstigmatism />}
        </Grid>
        <Grid item xs={12} md={4}>
          <JaffeChart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default JaffeCalculator;
