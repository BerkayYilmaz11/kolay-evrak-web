"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export function UploadInvoice({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop here
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
          <DialogDescription>
            Upload your invoice for AI-powered analysis
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            className={`relative grid w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed p-12 transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <Label htmlFor="invoice" className="text-sm font-medium">
                Drag & drop your invoice here or click to browse
              </Label>
              <p className="text-xs text-muted-foreground">
                Supports PDF, PNG, and JPEG files
              </p>
            </div>
            <input
              id="invoice"
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".pdf,.png,.jpg,.jpeg"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}