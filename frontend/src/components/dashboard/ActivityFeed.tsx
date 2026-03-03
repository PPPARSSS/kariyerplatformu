import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, BookOpen, Trophy, MessageSquare, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "completed" | "started" | "achievement" | "comment" | "joined";
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "completed",
    user: { name: "Zeynep Kaya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zeynep", initials: "ZK" },
    content: "React Advanced Patterns eğitimini tamamladı",
    time: "5 dakika önce",
  },
  {
    id: "2",
    type: "achievement",
    user: { name: "Mehmet Demir", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet", initials: "MD" },
    content: "'10 Eğitim Tamamlandı' rozetini kazandı",
    time: "1 saat önce",
  },
  {
    id: "3",
    type: "started",
    user: { name: "Ayşe Yıldız", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ayse", initials: "AY" },
    content: "TypeScript Temelleri eğitimine başladı",
    time: "2 saat önce",
  },
  {
    id: "4",
    type: "comment",
    user: { name: "Can Özkan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=can", initials: "CO" },
    content: "Node.js eğitimine yorum ekledi",
    time: "3 saat önce",
  },
  {
    id: "5",
    type: "joined",
    user: { name: "Elif Şahin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elif", initials: "EŞ" },
    content: "Platforma yeni katıldı",
    time: "5 saat önce",
  },
];

const iconMap = {
  completed: { icon: CheckCircle2, color: "text-success bg-success/10" },
  started: { icon: BookOpen, color: "text-primary bg-primary/10" },
  achievement: { icon: Trophy, color: "text-warning bg-warning/10" },
  comment: { icon: MessageSquare, color: "text-info bg-info/10" },
  joined: { icon: UserPlus, color: "text-accent bg-accent/10" },
};

export function ActivityFeed() {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const { icon: Icon, color } = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium text-foreground">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.content}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <div className={cn("rounded-lg p-2", color)}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
