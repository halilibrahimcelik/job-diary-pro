import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  AreaChart,
  CartesianGrid,
  Rectangle,
  Area,
} from 'recharts';
import type { IJob } from '../types';
import { COLORS } from '../constants';
import styled from 'styled-components';
import { useState } from 'react';
type Props = {
  data: IJob[];
};

const Wrapper = styled.div`
  h2 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .toggle-btn-wrapper {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    .btn-bar {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .btn-area {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;
const DashboardChart: React.FC<Props> = ({ data }) => {
  const [toggleChart, setToggleChart] = useState<'bar' | 'area'>('bar');

  const handleToggleCart = () => {
    setToggleChart((prev) => {
      if (prev === 'bar') {
        return 'area';
      } else {
        return 'bar';
      }
    });
  };
  const createMonthlyData = () => {
    const currentYear = new Date().getFullYear();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Create a map to store months that have data
    const monthlyDataMap = new Map();

    // Process jobs for current year only
    data
      .filter((job) => new Date(job.createdAt).getFullYear() === currentYear)
      .forEach((job) => {
        const jobDate = new Date(job.createdAt);
        const monthIndex = jobDate.getMonth();
        const monthName = months[monthIndex];
        const status = job.jobStatus.toLowerCase();

        // Initialize month data if it doesn't exist
        if (!monthlyDataMap.has(monthName)) {
          monthlyDataMap.set(monthName, {
            month: monthName,
            pending: 0,
            interview: 0,
            declined: 0,
          });
        }

        // Increment the appropriate status count
        const monthData = monthlyDataMap.get(monthName);
        if (status === 'pending') {
          monthData.pending++;
        } else if (status === 'interview') {
          monthData.interview++;
        } else if (status === 'declined') {
          monthData.declined++;
        }
      });

    // Convert map to array and sort by month order
    return Array.from(monthlyDataMap.values()).sort((a, b) => {
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
  };
  // Calculate max value for responsive ticks
  const getMaxValue = () => {
    if (chartData.length === 0) return 6;

    const maxValue = Math.max(
      ...chartData.map((month) =>
        Math.max(month.pending, month.interview, month.declined)
      )
    );

    // Ensure minimum of 6, then round up to next even number
    const minTicks = 6;
    const actualMax = Math.max(maxValue, minTicks);
    return actualMax % 2 === 0 ? actualMax : actualMax + 1;
  };

  // Generate tick values (0, 2, 4, 6, 8, 10, etc.)
  const generateTicks = () => {
    const maxValue = getMaxValue();
    const ticks = [];
    for (let i = 0; i <= maxValue; i += 2) {
      ticks.push(i);
    }
    return ticks;
  };
  const chartData = createMonthlyData();
  const yAxisTicks = generateTicks();

  return (
    <Wrapper>
      <h2>Monthly Application</h2>
      <ResponsiveContainer height={400} width='100%'>
        {toggleChart === 'bar' ? (
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey='month' />
            <YAxis
              ticks={yAxisTicks}
              allowDecimals={false}
              // tickFormatter={(value) => Math.floor(value).toString()}
              domain={[0, 'dataMax']}
            />
            <Legend />
            <Tooltip
              labelStyle={{
                color: COLORS['green-900'],
              }}
            />
            <CartesianGrid stroke='#f1eded' strokeDasharray='3 3' />
            <Bar
              dataKey='pending'
              fill={COLORS['orange-400']}
              activeBar={<Rectangle fill={'#f59e0b'} stroke='blue' />}
            />
            <Bar
              dataKey='interview'
              fill={COLORS['yellewGreen-900']}
              activeBar={
                <Rectangle fill={COLORS['yellowGreen-400']} stroke='blue' />
              }
            />
            <Bar
              dataKey='declined'
              fill={COLORS['purple-900']}
              activeBar={
                <Rectangle fill={COLORS['purple-400']} stroke='blue' />
              }
            />
          </BarChart>
        ) : (
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey='month' />
            <YAxis
              ticks={yAxisTicks}

              // tickFormatter={(value) => Math.floor(value).toString()}
            />
            <Legend />
            <Tooltip
              labelStyle={{
                color: COLORS['green-900'],
              }}
            />
            <CartesianGrid stroke='#f1eded' strokeDasharray='3 3' />
            <Area
              type='monotone'
              dataKey='pending'
              stackId='1'
              stroke={COLORS['orange-100']}
              fill={COLORS['orange-400']}
            />
            <Area
              type='monotone'
              dataKey='interview'
              stackId='1'
              stroke={COLORS['yellowGreen-400']}
              fill={COLORS['yellewGreen-900']}
            />
            <Area
              type='monotone'
              dataKey='declined'
              stackId='1'
              stroke={COLORS['purple-400']}
              fill={COLORS['purple-900']}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
      <div className='toggle-btn-wrapper'>
        <button
          onClick={handleToggleCart}
          className={`btn ${
            toggleChart === 'bar' ? '' : 'btn-outline'
          } btn-bar`}
        >
          Bar{' '}
        </button>
        <button
          onClick={handleToggleCart}
          className={`btn ${
            toggleChart === 'area' ? '' : 'btn-outline'
          } btn-area`}
        >
          Area{' '}
        </button>
      </div>
    </Wrapper>
  );
};
export default DashboardChart;
