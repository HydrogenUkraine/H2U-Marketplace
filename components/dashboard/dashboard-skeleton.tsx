import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  )
}
