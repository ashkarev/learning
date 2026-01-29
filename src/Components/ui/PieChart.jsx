"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/Components/ui/card";
import { ChartContainer } from "@/Components/ui/chart";

const chartData = [
  { browser: "react", visitors: 10, color: "hsl(var(--chart-2))" },
  { browser: "node", visitors: 9, color: "hsl(var(--chart-2))" },
  { browser: "express", visitors: 8, color: "hsl(var(--chart-3))" },
  { browser: "mongo", visitors: 12, color: "hsl(var(--chart-4))" },

];

export default function PieChartCard() {
  return (
    <Card className="flex flex-col border-0">
      <CardHeader className="items-center pb-0 ">
        <CardTitle className="text-3xl text-bold text-blue-500">Growth</CardTitle>
        <CardDescription>Student Learning Stats</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center  p-6">
        Active Listening   in hrs
        <PieChart width={320} height={320}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={50}
            dataKey="visitors"
            fill="#00BFFF"
            stroke="#000"
            strokeWidth={2}
            label
          />
        </PieChart>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm my-[-25px]">
        <div className="flex items-center gap-1 font-medium">
          up by 5.2% this month <TrendingUp className="h-1 w-1" />
        </div>
        <div className="text-muted-foreground">
          Showing student activity distribution
        </div>
      </CardFooter>
      {/* { console.log('hai')} */}
    </Card>

  );
}
