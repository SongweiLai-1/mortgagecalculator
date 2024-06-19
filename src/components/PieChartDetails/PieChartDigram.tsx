import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { pieForm } from './PieChartDetails';
import { HStack } from "@chakra-ui/react";

interface Props {
    data: pieForm[];
}

const PieChartDiagram = ({ data }: Props) => {

    const COLORS = ['#326788', '#4596c5', '#55bdfc', '#9FD4F3', '#0F4767'];

    // 计算所有值的总和
    const totalValue = data.reduce((acc, cur) => acc + (cur.value || 0), 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const percent = ((value / totalValue) * 100).toFixed(2);

            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name}: ${value} (${percent}%)`}</p> {/* 显示名称、值和百分比 */}
                </div>
            );
        }
        return null;
    };

    return (
        <HStack>
            <PieChart width={400} height={400}>
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
                <Tooltip content={<CustomTooltip />} /> {/* 使用自定义的 Tooltip */}
            </PieChart>
        </HStack>
    );
}

export default PieChartDiagram;
