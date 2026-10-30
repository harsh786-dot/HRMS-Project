import React from "react";
import "./Charts.css"
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarStack,
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  {
    name: "Mon",
    present: [0, 60],
    late: [64, 90],
    absent: [92, 100],
  },
  {
    name: "Tue",
    present: [0, 60],
    late: [64, 79],
    absent: [83, 100],
  },
  {
    name: "Wed",
    present: [0, 47],
    late: [51, 74],
    absent: [78, 100],
  },
  {
    name: "Thu",
    present: [0, 60],
    late: [64, 90],
    absent: [92, 100],
  },
  {
    name: "Fri",
    present: [0, 75],
    late: [79, 90],
    absent: [92, 100],
  },
  {
    name: "Sat",
    present: [0, 44],
    late: [49, 74],
    absent: [79, 100],
  },
  {
    name: "Sun",
    present: [0, 47],
    late: [51, 84],
    absent: [88, 100],
  },
];
const RoundedBar = ({ x, y, width, height, fill }) => {
  const barWidth = 12;

  return (
    <rect
      x={x + (width - barWidth) / 2}
      y={y}
      width={barWidth}
      height={height}
      rx={6}
      ry={6}
      fill={fill}
    />
  );
};

const Charts = () => {
  return (

    <div className="attendance-card">
    
    <div className="chart-head">
      <h1>Attendance Overview</h1>
    </div>

    <div style={{ width: "100%", height: "550px" }}>
      <ResponsiveContainer width="100%" height="100%">
        
      
        <BarChart
          data={attendanceData}
          margin={{
            top: 10,
            right: 20,
            bottom: 10,
            left: 10,
          }}
          barCategoryGap="45%" className="chart-container"
        >

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
            width={45}
          />

          <Tooltip />

          <BarStack radius={25}>
            <Bar
              dataKey="present"
              fill="#6952E8"
              maxBarSize={12}
              barSize={12}
               shape={<RoundedBar />}
              isAnimationActive={false}
            />

            <Bar
              dataKey="late"
              fill="#FFB454"
              maxBarSize={12}
              barSize={12}
               shape={<RoundedBar />}
              isAnimationActive={false}
            />

            <Bar
              dataKey="absent"
              fill="#F25564"
              maxBarSize={12}
              barSize={12}
               shape={<RoundedBar />}
              isAnimationActive={false}
            />
          </BarStack>
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default Charts;