import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data"
import CustomersTable from "@/app/ui/customers/table"
import { lusitana } from "@/app/ui/fonts"
import Search from "@/app/ui/search"
import { CustomersTableSkeleton } from "@/app/ui/skeletons"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Customers",
}

type SearchParams = {
  query?: string
  page?: string
}
interface Props {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <Suspense fallback={<CustomersTableSkeleton />} key={query}>
        <CustomersTable query={query} />
      </Suspense>
    </div>
  )
}
