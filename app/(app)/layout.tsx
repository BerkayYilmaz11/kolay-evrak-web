import { FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="flex h-16 items-center justify-between w-full px-8">
          <div className="mr-4 flex">
            <FileText className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold">KolayEvrak</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="outline" size="icon">
              <Settings className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}