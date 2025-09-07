'use client'

export const runtime = 'edge';
import { ExpenseForm } from "@/components/expense-form"

export default function AddExpensePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 h-full">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          
          <div className="px-4 lg:px-6">
            <div className="max-w-2xl mx-auto">
              <ExpenseForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
