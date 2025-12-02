// import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
// import { demoUserUsage } from "@/utils/demo"
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useUserContext } from "@/context/UserContext"
import { useEffect } from "react"

// const chartConfig = {
//     desktop: {
//         label: "Input",
//         color: "var(--chart-1)",
//     },
//     mobile: {
//         label: "Output",
//         color: "var(--chart-2)",
//     },
// } satisfies ChartConfig


// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

// const ModelUsage = () => {

//     const demo = Object.keys(demoUserUsage.models);



//     return (
//         <div className="px-3">

//             <ChartContainer config={chartConfig}>



//                 <BarChart accessibilityLayer data={chartData}>
//                     <CartesianGrid vertical={false} />
//                     <XAxis
//                         dataKey="month"
//                         tickLine={false}
//                         tickMargin={10}
//                         axisLine={false}
//                         tickFormatter={(value) => value.slice(0, 3)}
//                     />
//                     <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//                     <ChartLegend content={<ChartLegendContent />} />
//                     <Bar
//                         dataKey="desktop"
//                         stackId="a"
//                         fill="var(--color-desktop)"
//                         radius={[0, 0, 4, 4]}
//                     />
//                     <Bar
//                         dataKey="mobile"
//                         stackId="a"
//                         fill="var(--color-mobile)"
//                         radius={[4, 4, 0, 0]}
//                     />
//                 </BarChart>

//             </ChartContainer>
//         </div>
//     )
// }

// export default ModelUsage



const ModelUsage = () => {
    const { fetchUsageData } = useUserContext()

    useEffect(() => {
        fetchUsageData("userId123")
    }, [])

    return (
        <div>ModelUsage</div>
    )
}

export default ModelUsage

