import { fetchPromoter, manualRun } from "@/app/actions";
import { PromoterHistoryChart } from "@/components/promoter-history-chart";
import PromoterHistoryTable from "@/components/promoter-history-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { Pencil, RefreshCw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PromoterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();

  const promoter = await fetchPromoter(id);

  const handleManualRun = async () => {
    "use server";
    await manualRun(id);
  };

  if (!promoter || "error" in promoter) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Promoter Details</CardTitle>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/promoter/edit/${promoter.id}`}>
              <Pencil className="w-4 h-4" />
              <span className="sr-only">Edit promoter</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-lg">{promoter.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Enabled</p>
              <p className="text-lg">{promoter.isEnabled ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Source</p>
              <p className="text-lg break-all">{promoter.source}</p>
            </div>
            <div>
              <form action={handleManualRun}>
                <Button type="submit">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Run Job
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <PromoterHistoryChart historyData={promoter.data} promoterId={id} />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Historical Data</CardTitle>
        </CardHeader>
        <CardContent>
          <PromoterHistoryTable
            history={promoter.data}
            promoterId={id}
            userId={userId as string}
          />
        </CardContent>
      </Card>
    </div>
  );
}
