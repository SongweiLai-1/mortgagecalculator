import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Label } from 'recharts';
import { pieForm } from './PieChartDetails';
import {Card, CardBody} from "@chakra-ui/react";


interface Props {
    data: pieForm[];
}



const PieChartDigram = ({ data }: Props) => {

    const COLORS = ['#326788', '#4596c5', '#55bdfc', '#9FD4F3', '#0F4767'];

    // 计算所有值的总和
    const totalValue = data.reduce((acc, cur) => acc + (cur.value || 0), 0);

    const CustomTooltip = ({ active, payload, totalValue }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const percent = (value / totalValue * 100).toFixed(2);
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name}:(${percent}%)`}</p> {/* 显示名称、值和百分比 */}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <PieChart width={380} height={380}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={5}
                    labelLine={true}
                    label={({ name }) => name} // 只显示名称
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip totalValue={totalValue} />} /> {/* 使用自定义的 Tooltip */}
            </PieChart>

        </>
    );
}

export default PieChartDigram;
