import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Users,
  MessageSquare,
  Target,
  BookOpen,
  Play,
  Clock,
  ChevronRight,
} from "lucide-react";

const pathways = [
  {
    title: "Takım Liderliği Temelleri",
    description: "Etkili 1e1, geri bildirim ve delegasyon",
    modules: 8,
    completed: 5,
    duration: "12 saat",
    level: "Takım Lideri",
  },
  {
    title: "Koçluk ve Mentorluk",
    description: "Çalışan gelişimini destekleme teknikleri",
    modules: 6,
    completed: 2,
    duration: "9 saat",
    level: "Yönetici",
  },
  {
    title: "Stratejik Liderlik",
    description: "Vizyon oluşturma, karar alma ve stratejik iletişim",
    modules: 10,
    completed: 0,
    duration: "15 saat",
    level: "Üst Yönetici",
  },
  {
    title: "Çatışma Yönetimi",
    description: "Ekip içi anlaşmazlıkları yapıcı yönetme",
    modules: 5,
    completed: 3,
    duration: "6 saat",
    level: "Tüm Liderler",
  },
];

export default function LeadershipPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Liderlik Gelişimi</h1>
          <p className="mt-1 text-muted-foreground">
            Takım lideri, yönetici ve üst yönetici için gelişim patikaları
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3"><Award className="h-6 w-6 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Aktif Patika</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-success/10 p-3"><Target className="h-6 w-6 text-success" /></div>
              <div>
                <p className="text-2xl font-bold">10/29</p>
                <p className="text-sm text-muted-foreground">Modül Tamamlandı</p>
              </div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-accent/10 p-3"><Users className="h-6 w-6 text-accent" /></div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">1e1 Bu Ay</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((p) => (
            <Card key={p.title} variant="interactive" className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                  </div>
                  <Badge variant="secondary">{p.level}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{p.modules} modül</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{p.duration}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{p.completed}/{p.modules} tamamlandı</span>
                    <span className="font-medium text-primary">{Math.round((p.completed / p.modules) * 100)}%</span>
                  </div>
                  <Progress value={(p.completed / p.modules) * 100} className="h-2" />
                </div>
                <Button variant={p.completed > 0 ? "default" : "outline"} className="w-full">
                  {p.completed > 0 ? "Devam Et" : "Başla"} <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
