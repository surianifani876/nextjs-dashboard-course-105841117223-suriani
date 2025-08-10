import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <div>
      <h1 className="mb-8 text-xl font-bold">Create Invoice</h1>
      <Form customers={customers} />
    </div>
  );
}