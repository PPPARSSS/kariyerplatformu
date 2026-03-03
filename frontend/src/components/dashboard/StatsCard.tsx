import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "accent";
}

const colorClasses = {
  primary: "from-primary/10 to-primary/5 text-primary",
  success: "from-success/10 to-success/5 text-success",
  warning: "from-warning/10 to-warning/5 text-warning",
  accent: "from-accent/10 to-accent/5 text-accent",
};

const iconBgClasses = {
  primary: "bg-primary/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
  accent: "bg-accent/10",
};

export function StatsCard({ title, value, icon: Icon, trend, color = "primary" }: StatsCardProps) {
  return (
    <Card variant="interactive" className={cn("bg-gradient-to-br", colorClasses[color])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {trend && (
              <p
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                {Math.abs(trend.value)}% bu ay
              </p>
            )}
          </div>
          <div className={cn("rounded-xl p-3", iconBgClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
