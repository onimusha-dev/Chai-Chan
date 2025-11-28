import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { demoUserUsage } from "../../utils/demo"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

  export function Dashboard() {
    const models = Object.values(demoUserUsage.models);

    return (
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Usage Dashboard</h1>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Tokens</CardTitle>
              <CardDescription>All models combined</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{demoUserUsage.totalTokens.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Models Used</CardTitle>
              <CardDescription>Unique model entries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{models.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Updated</CardTitle>
              <CardDescription>Data timestamp</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                {new Date(demoUserUsage.updatedAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Model Table */}
        <Card>
          <CardHeader>
            <CardTitle>Model Statistics</CardTitle>
            <CardDescription>Token usage & duration per model</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Prompt Tokens</TableHead>
                  <TableHead>Eval Tokens</TableHead>
                  <TableHead>Total Duration (s)</TableHead>
                  <TableHead>Prompt Duration (s)</TableHead>
                  <TableHead>Eval Duration (s)</TableHead>
                </TableRow>
              </TableHead>

              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.model}>
                    <TableCell className="font-medium">{m.model}</TableCell>
                    <TableCell>{m.prompt_eval_count.toLocaleString()}</TableCell>
                    <TableCell>{m.eval_count.toLocaleString()}</TableCell>
                    <TableCell>{m.total_duration}</TableCell>
                    <TableCell>{m.prompt_eval_duration}</TableCell>
                    <TableCell>{m.eval_duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  )
}

export default Dashboard