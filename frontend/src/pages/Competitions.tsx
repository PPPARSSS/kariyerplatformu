import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Calendar, Clock, Upload, Target, Zap } from "lucide-react";

const competitions = [
  {
    title: "İnfina Ideathon 2026",
    type: "Ideathon",
    status: "active",
    deadline: "20 Mart 2026",
    teams: 12,
    description: "Müşteri deneyimini iyileştiren yenilikçi fikirler",
    prize: "Özel Rozet + Mentorluk",
  },
  {
    title: "Data Challenge Q1",
    type: "Datathon",
    status: "upcoming",
    deadline: "1 Nisan 2026",
    teams: 0,
    description: "Kullanıcı davranış verisiyle içgörü üretme",
    prize: "Sertifika + Puan",
  },
  {
    title: "Hackathon: İç Araçlar",
    type: "Hackathon",
    status: "completed",
    deadline: "15 Şubat 2026",
    teams: 8,
    description: "İç süreçleri hızlandıran araç geliştirme",
    prize: "1. Takım: Özel Ödül",
  },
];

export default function CompetitionsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Yarışmalar</h1>
            <p className="mt-1 text-muted-foreground">Ideathon, hackathon, datathon — fikirlerini hayata geçir</p>
          </div>
          <Button><Zap className="h-4 w-4 mr-2" />Başvur</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-warning/10 p-3"><Trophy className="h-6 w-6 text-warning" /></div>
              <div><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Katıldığın Yarışma</p></div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3"><Target className="h-6 w-6 text-primary" /></div>
              <div><p className="text-2xl font-bold">1</p><p className="text-sm text-muted-foreground">Aktif Yarışma</p></div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-success/10 p-3"><Users className="h-6 w-6 text-success" /></div>
              <div><p className="text-2xl font-bold">3</p><p className="text-sm text-muted-foreground">Takım Arkadaşın</p></div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {competitions.map((c) => (
            <Card key={c.title} variant="interactive" className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <Badge variant={c.status === "active" ? "default" : c.status === "upcoming" ? "secondary" : "outline"}>
                    {c.status === "active" ? "Aktif" : c.status === "upcoming" ? "Yaklaşan" : "Tamamlandı"}
                  </Badge>
                  <Badge variant="secondary">{c.type}</Badge>
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{c.deadline}</span>
                  {c.teams > 0 && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.teams} takım</span>}
                </div>
                <p className="text-sm"><span className="font-medium text-warning">🏆 </span>{c.prize}</p>
                {c.status === "active" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Detaylar</Button>
                    <Button size="sm" variant="outline"><Upload className="h-4 w-4" /></Button>
                  </div>
                )}
                {c.status === "upcoming" && <Button size="sm" variant="outline" className="w-full">Başvuru Yap</Button>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
