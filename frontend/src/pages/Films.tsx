import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Play, Star, Clock, ChevronRight } from "lucide-react";

const films = [
  { title: "The Social Network", year: 2010, rating: 7.8, duration: "2s 0dk", category: "Girişimcilik", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop" },
  { title: "The Imitation Game", year: 2014, rating: 8.0, duration: "1s 54dk", category: "Teknoloji", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=250&fit=crop" },
  { title: "Steve Jobs", year: 2015, rating: 7.2, duration: "2s 2dk", category: "Liderlik", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop" },
  { title: "Ex Machina", year: 2014, rating: 7.7, duration: "1s 48dk", category: "Yapay Zeka", image: "https://images.unsplash.com/photo-1518676590747-1e3dcf5a13be?w=400&h=250&fit=crop" },
  { title: "Moneyball", year: 2011, rating: 7.6, duration: "2s 13dk", category: "Veri Analizi", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=250&fit=crop" },
  { title: "The Internship", year: 2013, rating: 6.3, duration: "1s 59dk", category: "Kariyer", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=250&fit=crop" },
];

export default function FilmsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Film Önerileri</h1>
          <p className="mt-1 text-muted-foreground">Haftanın teknolojik filmleri ve ilham veren yapımlar</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <Card key={film.title} variant="interactive" className="group overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img src={film.image} alt={film.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-14 w-14 rounded-full bg-white/90 text-primary shadow-lg hover:bg-white">
                    <Play className="h-6 w-6 fill-current" />
                  </Button>
                </div>
                <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground">{film.category}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{film.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{film.year}</span>
                  <span className="flex items-center gap-1 text-warning"><Star className="h-3.5 w-3.5 fill-current" />{film.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{film.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
