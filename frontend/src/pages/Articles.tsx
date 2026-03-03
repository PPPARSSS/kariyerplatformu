import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, BookOpen, Bookmark, ChevronRight } from "lucide-react";

const articles = [
  { title: "Ürün Yöneticisinin 2026 Yetkinlik Haritası", category: "Ürün", readTime: "8 dk", saved: true },
  { title: "Etkili 1e1 Toplantıları İçin 10 İpucu", category: "Liderlik", readTime: "5 dk", saved: false },
  { title: "Veri Odaklı Karar Alma Kültürü", category: "Veri", readTime: "12 dk", saved: true },
  { title: "Mikroservis Mimarisine Geçiş Deneyimi", category: "Teknik", readTime: "15 dk", saved: false },
  { title: "OKR vs KPI: Hangisi Ne Zaman?", category: "Strateji", readTime: "7 dk", saved: false },
  { title: "Çalışan Bağlılığını Artırmanın 5 Yolu", category: "İK", readTime: "6 dk", saved: true },
];

export default function ArticlesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Makaleler</h1>
          <p className="mt-1 text-muted-foreground">Trend okuma önerileri ve derinlemesine içerikler</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <Card key={a.title} variant="interactive" className="p-5 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 mt-0.5">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{a.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <Badge variant="secondary">{a.category}</Badge>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.readTime}</span>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <Bookmark className={`h-4 w-4 ${a.saved ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
