import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';


export default async function CustomersPage() {
  const customers = await fetchFilteredCustomers('');

  return <CustomersTable customers={customers} />;
}
