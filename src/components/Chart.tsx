import { PieChart } from '@mui/x-charts'
import React from 'react'


interface ChartProps {
    checkedTodos: number,
    uncheckedTodos: number
}

const Chart = ({ checkedTodos, uncheckedTodos }: ChartProps) => {


    return (
        <PieChart
            sx={{
                width: 400,
                height: 400,
            }}
            series={[
                {
                    data: [
                        { id: 0, value: checkedTodos, label: 'Complete' },
                        { id: 1, value: uncheckedTodos, label: 'UnComplete' },

                    ],
                    innerRadius: 10,
                    outerRadius: 70,
                    paddingAngle: 2,
                    cornerRadius: 5,
                },
            ]}

        />
    )
}

export default Chart
