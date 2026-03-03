import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  deadline: string;
  daysLeft: number;
  type: "training" | "exam" | "project";
  priority: "high" | "medium" | "low";
}

const tasks: Task[] = [
  {
    id: "1",
    title: "React Fundamentals Tamamla",
    deadline: "28 Ocak 2026",
    daysLeft: 1,
    type: "training",
    priority: "high",
  },
  {
    id: "2",
    title: "YDS Deneme Sınavı",
    deadline: "30 Ocak 2026",
    daysLeft: 3,
    type: "exam",
    priority: "high",
  },
  {
    id: "3",
    title: "Takım Sunumu Hazırla",
    deadline: "2 Şubat 2026",
    daysLeft: 6,
    type: "project",
    priority: "medium",
  },
  {
    id: "4",
    title: "TypeScript Advanced Eğitimi",
    deadline: "5 Şubat 2026",
    daysLeft: 9,
    type: "training",
    priority: "low",
  },
];

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-muted text-muted-foreground border-muted",
};

const typeLabels = {
  training: "Eğitim",
  exam: "Sınav",
  project: "Proje",
};

export function UpcomingTasks() {
  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Yaklaşan Görevler</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          Tümünü Gör <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50",
              priorityColors[task.priority]
            )}
          >
            <div className="space-y-1">
              <p className="font-medium text-foreground">{task.title}</p>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {task.deadline}
                </span>
                <Badge variant="outline" className="text-xs">
                  {typeLabels[task.type]}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  task.daysLeft <= 2 ? "text-destructive" : "text-muted-foreground"
                )}
              >
                <Clock className="h-4 w-4" />
                {task.daysLeft} gün
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
