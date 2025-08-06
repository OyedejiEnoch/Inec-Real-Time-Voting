"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "../ui/button"

const chartData = [
  { month: "Oyo", desktop: 2486, mobile: 80 },
  { month: "Lagos", desktop: 2305, mobile: 200 },
  { month: "Ogun", desktop: 1237, mobile: 120 },
  { month: "Kaduna", desktop: 973, mobile: 190 },
  { month: "Abuja", desktop: 809, mobile: 130 },
  { month: "Delta", desktop: 714, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const VotesPerStates = () => {
  return (
    <div>
       <h1 className='text-lg font-medium mb-6'>Top Votes Per State</h1>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="flex justify-between items-center gap-2 leading-none font-medium mt-4">
          <div className="flex items-center gap-2">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <Button >View More</Button>
        </div>

    </div>
  )
}

export default VotesPerStates
