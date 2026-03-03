import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Clock, TrendingUp, ChevronRight, ExternalLink } from "lucide-react";

const news = [
  { title: "GPT-5 Duyuruldu: Ürün Yönetimine Etkileri", category: "Yapay Zeka", time: "2 saat önce", hot: true },
  { title: "React 20 ile Gelen Yenilikler", category: "Frontend", time: "5 saat önce", hot: true },
  { title: "Türkiye'de Yazılım İstihdamı %18 Arttı", category: "Sektör", time: "1 gün önce", hot: false },
  { title: "Agile 2026: Yeni Framework Önerileri", category: "Metodoloji", time: "1 gün önce", hot: false },
  { title: "Siber Güvenlik Trendleri 2026", category: "Güvenlik", time: "2 gün önce", hot: true },
  { title: "Remote Çalışma: 2026 Raporu Yayınlandı", category: "İK", time: "3 gün önce", hot: false },
];

export default function NewsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Haberler</h1>
          <p className="mt-1 text-muted-foreground">Teknoloji dünyasından önemli gelişmeler</p>
        </div>

        <div className="space-y-3">
          {news.map((item) => (
            <Card key={item.title} variant="interactive" className="p-5 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <Newspaper className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <Badge variant="secondary">{item.category}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{item.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.hot && <TrendingUp className="h-4 w-4 text-destructive" />}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
