import { memo } from 'react';
import ApexChart from 'react-apexcharts';

import { alpha, styled } from '@mui/material/styles';

import { bgBlur } from 'src/theme/css';

// ----------------------------------------------------------------------

const Chart = styled(ApexChart)(({ theme }: { theme: any }) => ({
  '& .apexcharts-canvas': {
    // Tooltip
    '& .apexcharts-tooltip': {
      ...bgBlur({
        color: theme.palette.background.default,
      }),
      backgroundColor: 'rgba(43, 41, 41, 0.7)',
      color: 'white',
      padding: '10px 20px',
      alignItems: 'flex-start',
      boxShadow: theme.customShadows.dropdown,
      borderRadius: '12px',
      '&.apexcharts-theme-light': {
        borderColor: 'transparent',
        ...bgBlur({
          color: theme.palette.background.default,
        }),
      },
      '.apexcharts-tooltip-text': {
        fontSize: '1.3rem !important',
        fontWeight: '600',
        lineHeight: '1'
      },
      '.apexcharts-tooltip-marker': {
        display: 'none !important',
        width: 0
      }
    },
    '& .apexcharts-xaxistooltip': {
      ...bgBlur({
        color: theme.palette.background.default,
      }),
      borderColor: 'transparent',
      color: 'black',
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.25,
      '&:before': {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24),
      },
      '&:after': {
        borderBottomColor: alpha(theme.palette.background.default, 0.8),
      },
    },
    '& .apexcharts-tooltip-title': {
      textAlign: 'center',
      fontWeight: 500,
      backgroundColor: 'transparent', //alpha(theme.palette.grey[500], 0.08),
      color: '#e2e8f0',
      order: 2,
      fontSize: '0.85rem !important',
      padding: '0px',
      paddingLeft: '6px'
    },
    '& .apexcharts-tooltip-series-group': {
      order: 1,
      padding: '0px'
    },

    // LEGEND
    '& .apexcharts-legend': {
      padding: 0,
    },
    '& .apexcharts-legend-series': {
      display: 'inline-flex !important',
      alignItems: 'center',
    },
    '& .apexcharts-legend-marker': {
      marginRight: 8,
    },
    '& .apexcharts-legend-text': {
      lineHeight: '18px',
      textTransform: 'capitalize',
    },
  },
}));

export default memo(Chart);
