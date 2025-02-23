"use client"

import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useInvoices } from "@/api/hooks/use-invoices"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentInvoices() {
  const { data: invoices, isLoading, error } = useInvoices()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Skeleton className="ml-auto h-4 w-[60px]" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-sm text-destructive">
        Error loading invoices. Please try again later.
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {invoices?.map((invoice) => (
          <div key={invoice.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <img src={invoice.logo} alt={invoice.company} className="rounded-full" />
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{invoice.company}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(invoice.date).toLocaleDateString()}
              </p>
            </div>
            <div className="ml-auto font-medium">
              ${invoice.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}