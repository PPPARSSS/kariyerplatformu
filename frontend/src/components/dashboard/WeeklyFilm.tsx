import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Clock } from "lucide-react";

export function WeeklyFilm() {
  return (
    <Card variant="interactive" className="overflow-hidden">
      <div className="relative aspect-[16/9]">
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop"
          alt="Haftanın Filmi"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-white/90 text-primary shadow-xl hover:bg-white hover:scale-110 transition-all"
          >
            <Play className="h-7 w-7 fill-current" />
          </Button>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Badge className="mb-2 bg-warning text-warning-foreground">
            Haftanın Teknoloji Filmi
          </Badge>
          <h3 className="mb-2 text-xl font-bold text-white">
            The Social Dilemma
          </h3>
          <p className="mb-3 text-sm text-white/80 line-clamp-2">
            Sosyal medyanın toplum üzerindeki etkilerini ve algoritmaların gücünü inceleyen çarpıcı belgesel.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              8.5
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              1s 34dk
            </span>
            <span>2020</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
