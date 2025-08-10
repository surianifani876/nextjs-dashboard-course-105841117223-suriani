
import Image from 'next/image';
import { DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import Search from '../search';
import { lusitana } from '../fonts';
import { Button } from '@/app/ui/button';
import Link from 'next/link';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="w-full">
      {/* Header dengan tombol create di kanan */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>Invoices</h1>
        <Link href="/dashboard/invoices/create">
          <Button>Create Invoice</Button>
        </Link>
      </div>

      <Search placeholder="Search invoices..." />

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Mobile view */}
            <div className="md:hidden">
              {invoices?.map((invoice) => (
                <div
                  key={invoice.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        #{invoice.id.slice(0, 8)}...
                      </p>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={invoice.image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${invoice.name}'s profile picture`}
                        />
                        <p>{invoice.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{invoice.email}</p>
                    </div>
                    <InvoiceStatus status={invoice.status} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <p>{formatDateToLocal(invoice.date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
                        <Button>Edit</Button>
                      </Link>
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop view */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">#</th>
                  <th scope="col" className="px-4 py-5 font-medium">Customer</th>
                  <th scope="col" className="px-3 py-5 font-medium">Email</th>
                  <th scope="col" className="px-3 py-5 font-medium">Amount</th>
                  <th scope="col" className="px-3 py-5 font-medium">Date</th>
                  <th scope="col" className="px-3 py-5 font-medium">Status</th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {invoices?.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none
                      [&:first-child>td:first-child]:rounded-tl-lg
                      [&:first-child>td:last-child]:rounded-tr-lg
                      [&:last-child>td:first-child]:rounded-bl-lg
                      [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 text-gray-500">
                      {invoice.id.slice(0, 8)}...
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={invoice.image_url}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${invoice.name}'s profile picture`}
                        />
                        <p>{invoice.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">{invoice.email}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(invoice.date)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <InvoiceStatus status={invoice.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
                          <Button>Edit</Button>
                        </Link>
                        <DeleteInvoice id={invoice.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}