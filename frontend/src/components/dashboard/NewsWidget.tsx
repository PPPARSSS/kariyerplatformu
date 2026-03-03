import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  isHot?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "2025'te Öne Çıkacak 10 Teknoloji Trendi",
    category: "Teknoloji",
    readTime: "5 dk",
    isHot: true,
  },
  {
    id: "2",
    title: "Yapay Zeka ve İş Hayatının Geleceği",
    category: "AI",
    readTime: "8 dk",
    isHot: true,
  },
  {
    id: "3",
    title: "Etkili Liderlik İçin 7 Altın Kural",
    category: "Liderlik",
    readTime: "4 dk",
  },
  {
    id: "4",
    title: "Remote Çalışmada Verimlilik Artırma",
    category: "Kariyer",
    readTime: "6 dk",
  },
];

export function NewsWidget() {
  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Trend Haberler</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          Tümü <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.readTime}
                  </span>
                </div>
              </div>
              {item.isHot && (
                <div className="flex items-center gap-1 text-warning">
                  <TrendingUp className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
