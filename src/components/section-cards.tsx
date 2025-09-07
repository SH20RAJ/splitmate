import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Pill, PillDelta } from "@/components/ui/kibo-ui/pill"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NumberTicker from "@/components/magicui/number-ticker"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹<NumberTicker value={12450} className="font-semibold" />
          </CardTitle>
          <CardAction>
            <Pill variant="outline">
              <IconTrendingUp />
              +15.2%
              <PillDelta delta={15.2} />
            </Pill>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total spent across all groups
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Groups</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={8} className="font-semibold" />
          </CardTitle>
          <CardAction>
            <Pill variant="outline">
              <IconTrendingUp />
              +2
              <PillDelta delta={33.3} />
            </Pill>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing social circle <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Groups you're actively splitting with
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Friends Connected</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={24} className="font-semibold" />
          </CardTitle>
          <CardAction>
            <Pill variant="outline">
              <IconTrendingUp />
              +6
              <PillDelta delta={33.3} />
            </Pill>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong network growth <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Connected friends and contacts</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Settlement Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={87} className="font-semibold" />%
          </CardTitle>
          <CardAction>
            <Pill variant="outline">
              <IconTrendingUp />
              +12%
              <PillDelta delta={12} />
            </Pill>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Excellent payment reliability <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Expenses settled on time</div>
        </CardFooter>
      </Card>
    </div>
  )
}
           