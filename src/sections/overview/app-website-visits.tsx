import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from '@/components/chart';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader, chart, ...other }: any) {
  const { labels, colors, series, options } = chart;

  const [status, setStatus] = useState({
    selectedSortType: 'milestone-completed',
    selectedDuration: '1-year'
  })

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i: any) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: any) => {
          if (typeof value !== 'undefined') {
            return `$${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap='wrap' gap={1} sx={{padding: '24px 24px 0px'}}>
        <Typography variant='h6'>{title}</Typography>
        <Stack direction="row" alignItems="center" gap={1} flexWrap='wrap'>
          <Select
            value={status.selectedSortType}
            onChange={e => setStatus({...status, selectedSortType: e.target.value})}
          >
            <MenuItem value={'milestone-completed'}>Sort by: <b>Milestones Completed</b></MenuItem>
          </Select>
          <Select
            value={status.selectedDuration}
            onChange={e => setStatus({...status, selectedDuration: e.target.value})}
          >
            <MenuItem value={'1-year'}>This year</MenuItem>
          </Select>
        </Stack>
      </Stack>

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
