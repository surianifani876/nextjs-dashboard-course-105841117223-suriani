import {
  fetchCardData,
  fetchLatestInvoices,
  fetchRevenue,
} from '@/app/lib/data';

import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { CardWrapper, Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';

export default async function DashboardPage() {
  const cardData = await fetchCardData();
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} text-2xl mb-4`}>Dashboard</h1>

      {/* Summary Cards */}
      <CardWrapper>
        <Card
          title="Collected"
          value={cardData.totalPaidInvoices}
          type="collected"
        />
        <Card
          title="Pending"
          value={cardData.totalPendingInvoices}
          type="pending"
        />
        <Card
          title="Total Invoices"
          value={cardData.numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Total Customers"
          value={cardData.numberOfCustomers}
          type="customers"
        />
      </CardWrapper>

      {/* Charts & Latest Invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
