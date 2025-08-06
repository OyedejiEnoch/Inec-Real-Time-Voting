"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { party: "APC", votes: 7275, fill: "var(--color-chrome)" },
  { party: "PDP", votes: 5200, fill: "var(--color-safari)" },
  { party: "LP", votes: 2287, fill: "var(--color-firefox)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


const OverviewCard = () => {

   const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.votes, 0)
  }, [])

  return (
    <div>
      <h1 className='text-lg font-medium mb-6'>Total Presidential Votes</h1>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="votes"
              nameKey="party"
              innerRadius={60}
              strokeWidth={5}
            >

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Votes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
        </PieChart>
      </ChartContainer>
      
       <div className="flex items-center gap-2 text-center leading-none font-medium">
          Total Presidential Votes per perty <TrendingUp className="h-4 w-4" />
        </div>

    </div>
  )
}

export default OverviewCard
