import { useQuery } from "@tanstack/react-query"

// Example invoice type
interface Invoice {
  id: string
  amount: number
  status: "paid" | "pending"
  company: string
  date: string
  logo: string
}

// Example API function
async function fetchInvoices(): Promise<Invoice[]> {
  // This is a mock implementation
  // Replace with actual API call
  return [
    {
      id: "INV001",
      amount: 1250.00,
      status: "paid",
      company: "Acme Corp",
      date: "2024-03-20",
      logo: "https://images.unsplash.com/photo-1625765951205-e68f4c2e0095?w=50&h=50&fit=crop&q=80"
    },
    {
      id: "INV002",
      amount: 850.00,
      status: "pending",
      company: "Globex Inc",
      date: "2024-03-19",
      logo: "https://images.unsplash.com/photo-1568122506284-e8662b0f6a8d?w=50&h=50&fit=crop&q=80"
    },
    {
      id: "INV003",
      amount: 2340.00,
      status: "paid",
      company: "TechStart",
      date: "2024-03-18",
      logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=50&h=50&fit=crop&q=80"
    }
  ]
}

export function useInvoices() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  })
}