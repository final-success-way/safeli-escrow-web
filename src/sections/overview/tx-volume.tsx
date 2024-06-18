import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chart, { useChart } from '@/components/chart';
import { MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

// ----------------------------------------------------------------------

export default function TxVolume({ title, subheader, chart, ...other }: any) {
  const { labels, colors, series, options } = chart;
  const theme = useTheme() as any;
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
    <Card {...other} sx={{boxShadow: theme.shadows[20]}}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap='wrap' gap={1} sx={{padding: '24px 24px 0px'}}>
        <Typography variant='h6'>{title}</Typography>
        <Stack direction="row" alignItems="center" gap={1} flexWrap='wrap'>
          <StyledSelect>
            <Select
              value={status.selectedSortType}
              onChange={e => setStatus({...status, selectedSortType: e.target.value})}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value={'milestone-completed'}>Sort by: <b>Milestones Completed</b></MenuItem>
            </Select>
          </StyledSelect>
          <StyledSelect>
            <Select
              value={status.selectedDuration}
              onChange={e => setStatus({...status, selectedDuration: e.target.value})}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value={'1-year'}>This year</MenuItem>
            </Select>
          </StyledSelect>
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

TxVolume.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};


const StyledSelect = styled.div`
  > div {
    > div {
      padding: 10px 15px;
    }
  }
`