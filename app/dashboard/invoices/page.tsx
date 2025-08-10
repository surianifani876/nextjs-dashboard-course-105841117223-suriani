import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data';
import InvoicesTable from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/invoices/pagination';

// Force dynamic rendering - don't prerender at build time
// export const dynamic = 'force-dynamic';

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParamsResolved = await props.searchParams;
  const query =
    typeof searchParamsResolved?.query === 'string' ? searchParamsResolved.query : '';
  const pageParam =
    typeof searchParamsResolved?.page === 'string' ? searchParamsResolved.page : '1';
  const currentPage = Number(pageParam) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">

      <InvoicesTable query={query} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
