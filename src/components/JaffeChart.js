import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const data = [
  { x: 0, y: 0, z: 100 },
  { x: 1, y: 1, z: 150 },
  { x: -1, y: 1, z: 200 },
  { x: 1, y: -1, z: 200 },
  { x: -1, y: -1, z: 150 },
];

function JaffeChart() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Jaffe Vector Representation</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="asg_0°" unit="" />
          <YAxis type="number" dataKey="y" name="asg_45°" unit="" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Astigmatism" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default JaffeChart;
