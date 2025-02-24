"use client";
import { FileText, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/utils/auth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    void auth.logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="flex h-16 items-center justify-between w-full px-8">
          <div className="mr-4 flex">
            <FileText className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold">KolayEvrak</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Ayarlar</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
