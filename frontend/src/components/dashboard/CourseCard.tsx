import { Clock, Users, Star, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  category: string;
  instructor: string;
  duration: string;
  participants: number;
  rating: number;
  progress?: number;
  thumbnail: string;
  isNew?: boolean;
  isMandatory?: boolean;
}

export function CourseCard({
  title,
  category,
  instructor,
  duration,
  participants,
  rating,
  progress,
  thumbnail,
  isNew,
  isMandatory,
}: CourseCardProps) {
  return (
    <Card variant="interactive" className="group overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-14 w-14 rounded-full bg-white/90 text-primary shadow-lg hover:bg-white hover:scale-110">
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {isNew && (
            <Badge className="bg-warning text-warning-foreground">Yeni</Badge>
          )}
          {isMandatory && (
            <Badge className="bg-destructive text-destructive-foreground">Zorunlu</Badge>
          )}
        </div>

        {/* Category */}
        <Badge variant="secondary" className="absolute bottom-3 left-3 bg-white/90 text-foreground">
          {category}
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Instructor */}
        <p className="mb-3 text-sm text-muted-foreground">
          {instructor}
        </p>

        {/* Progress (if started) */}
        {progress !== undefined && (
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">İlerleme</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {participants}
          </span>
          <span className="flex items-center gap-1 text-warning">
            <Star className="h-3.5 w-3.5 fill-current" />
            {rating}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
