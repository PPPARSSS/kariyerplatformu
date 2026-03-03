import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Play, Clock, Users, FileText } from "lucide-react";

const trainings = [
  { title: "ISO 27001 Bilgi Güvenliği", type: "Zorunlu", date: "Şubat 2026", attendees: 120, duration: "2 saat" },
  { title: "OKR ve Hedef Yönetimi", type: "Genel", date: "Ocak 2026", attendees: 85, duration: "1.5 saat" },
  { title: "Agile & Scrum Workshop", type: "Teknik", date: "Aralık 2025", attendees: 45, duration: "3 saat" },
  { title: "Müşteri Deneyimi Yönetimi", type: "Genel", date: "Kasım 2025", attendees: 60, duration: "2 saat" },
  { title: "KVKK Farkındalık Eğitimi", type: "Zorunlu", date: "Ekim 2025", attendees: 130, duration: "1 saat" },
  { title: "İnfina Ürün Ailesi Tanıtımı", type: "Onboarding", date: "Eylül 2025", attendees: 25, duration: "2.5 saat" },
];

export default function CorporatePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Kurum Eğitimleri</h1>
          <p className="mt-1 text-muted-foreground">Şirket içi kayıtlı eğitimler ve sunumlar</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trainings.map((t) => (
            <Card key={t.title} variant="interactive" className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold leading-tight">{t.title}</h3>
                  <Badge variant={t.type === "Zorunlu" ? "destructive" : "secondary"}>{t.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{t.date}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{t.duration}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{t.attendees} kişi</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1"><Play className="h-4 w-4 mr-1" />İzle</Button>
                  <Button size="sm" variant="ghost"><FileText className="h-4 w-4" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
