import api from "@/api/api";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useUserContext } from "@/context/UserContext";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Custom Tooltip Component
const CustomTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                <p className="font-semibold text-sm mb-2">{data.model}</p>
                <div className="flex items-center gap-2 text-xs mb-1">
                    <ArrowBigDownDash size={14} className='text-green-600' />
                    <span className="opacity-70">Input:</span>
                    <span className="font-medium">{data.input}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <ArrowBigUpDash size={14} className='text-red-600' />
                    <span className="opacity-70">Output:</span>
                    <span className="font-medium">{data.output}</span>
                </div>
            </div>
        );
    }

    return null;
};

const ModelUsage = () => {
    const { usageData, usageDataValidity, setUsageData, setUsageDataValidity } = useUserContext()
    const [isLoading, setIsLoading] = useState(false);
    const fetchUsageData = async (): Promise<any> => {
        try {
            const res = await api.get(`/usage`);
            if (!res) throw new Error("No data")
            setUsageData(res.data.data);
            return res.data;
        }
        catch (err) {
            console.log(err)
            return null
        }
    }
    useEffect(() => {
        if (usageData !== null && Date.now() < usageDataValidity) {
            return
        }
        else {
            ; (async function () {
                setIsLoading(true)
                await fetchUsageData()
                setUsageDataValidity(Date.now() + 60_000)
                setIsLoading(false)
            })();
        }
    }, [usageDataValidity])

    useEffect(() => {
        const interval = setInterval(() => {
            setUsageDataValidity(Date.now())
        }, 59_999);
        return () => clearInterval(interval);
    }, [])

    if (isLoading && usageData === null) {
        return <div className="absolute top-0 left-0 flex justify-center z-80 items-center h-full w-full">
            <Spinner />
        </div>
    }
    const chartConfig = {
        input: {
            label: "Input",
            color: "#16a34a",
        },
        output: {
            label: "Output",
            color: "#dc2626"
        }
    }
    let chartData = Object.values(usageData?.models || {})
    chartData = chartData.map(({ eval_count, prompt_eval_count, model }: any) => ({
        input: prompt_eval_count,
        output: eval_count,
        model: model
    }))

    return (
        <div className="relative px-3 w-full h-full flex flex-col select-none">
            <div className="h-full w-full overflow-x-auto">
                <ChartContainer className="w-full h-full" config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="model"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.split(":")[0]}
                        />
                        <ChartTooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="input"
                            stackId="a"
                            fill="#16a34a75"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="output"
                            stackId="a"
                            fill="#dc262675"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </div>

            <div className="flex items-center justify-center gap-5 pt-3">
                <div className="flex items-center gap-2 justify-between text-xs font-medium">
                    <span><ArrowBigDownDash size={18} className='text-green-600' /> </span>
                    <span className="opacity-70">Input</span>
                </div>
                <div className="flex items-center gap-2 justify-between text-xs font-medium">
                    <span><ArrowBigUpDash size={18} className='text-red-600' /> </span>
                    <span className="opacity-70">Output</span>
                </div>
            </div>
            <div className="flex items-center justify-between pt-3">
                <p className="text-sm">
                    <span className="opacity-75">Total Tokens: </span>
                    <span>{usageData?.totalTokens}</span>
                </p>

                <div className="flex gap-3 items-center justify-center">
                    <p className="opacity-75 text-sm">Models Used: </p>
                    <select className="bg-accent text-center py-3 text-sm px-5 rounded-full appearance-none">
                        {chartData.map((model: any, index) => (
                            <option key={index}>{model.model}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ModelUsage


