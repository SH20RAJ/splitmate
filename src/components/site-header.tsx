import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="absolute left-4 lg:left-6" />
        <Separator
          orientation="vertical"
          className="absolute left-12 lg:left-16 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="SplitMate Logo" 
            width={20} 
            height={20}
            className="object-contain"
          />
          <h1 className="text-base font-medium">SplitMate</h1>
        </div>
        <div className="absolute right-4 lg:right-6 flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
        </div>
      </div>
    </header>
  )
}
