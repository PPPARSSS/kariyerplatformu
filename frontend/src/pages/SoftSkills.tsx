import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Heart,
  Users,
  Lightbulb,
  MessageSquare,
  Play,
  Clock,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    title: "Etkili İletişim",
    icon: MessageSquare,
    courses: 6,
    completed: 4,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Takım Çalışması",
    icon: Users,
    courses: 5,
    completed: 3,
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Problem Çözme",
    icon: Lightbulb,
    courses: 4,
    completed: 1,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Duygusal Zeka",
    icon: Heart,
    courses: 4,
    completed: 2,
    color: "bg-destructive/10 text-destructive",
  },
  {
    title: "Sunum Becerileri",
    icon: Award,
    courses: 3,
    completed: 0,
    color: "bg-success/10 text-success",
  },
  {
    title: "Zaman Yönetimi",
    icon: Clock,
    courses: 3,
    completed: 1,
    color: "bg-info/10 text-info",
  },
];

export default function SoftSkillsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Soft Skills</h1>
          <p className="mt-1 text-muted-foreground">
            Liderlik, iletişim ve kişisel gelişim eğitimleri
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.title} variant="interactive" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-3 ${cat.color}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground">{cat.courses} eğitim</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{cat.completed}/{cat.courses}</span>
                    <span className="font-medium text-primary">{Math.round((cat.completed / cat.courses) * 100)}%</span>
                  </div>
                  <Progress value={(cat.completed / cat.courses) * 100} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Play className="h-4 w-4 mr-2" />Keşfet
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
