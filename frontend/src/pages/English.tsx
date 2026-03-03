import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  BookOpen,
  Headphones,
  PenTool,
  MessageSquare,
  GraduationCap,
  Trophy,
  BarChart3,
  Play,
  Clock,
  Star,
  Target,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const examTypes = [
  { name: "YDS", icon: GraduationCap, color: "bg-primary/10 text-primary" },
  { name: "TOEFL", icon: Globe, color: "bg-accent/10 text-accent" },
  { name: "IELTS", icon: BookOpen, color: "bg-warning/10 text-warning" },
  { name: "Genel İngilizce", icon: MessageSquare, color: "bg-success/10 text-success" },
];

const courses = [
  { title: "İş İngilizcesi - Temel Seviye", level: "A2", duration: "12 saat", progress: 65, lessons: 24 },
  { title: "Teknik İngilizce Yazışmalar", level: "B1", duration: "8 saat", progress: 30, lessons: 16 },
  { title: "İngilizce Sunum Teknikleri", level: "B2", duration: "6 saat", progress: 0, lessons: 12 },
  { title: "TOEFL Kelime Bankası", level: "B2-C1", duration: "15 saat", progress: 10, lessons: 30 },
  { title: "YDS Gramer Çalışması", level: "B2", duration: "20 saat", progress: 45, lessons: 40 },
  { title: "Günlük Konuşma Pratiği", level: "A2-B1", duration: "10 saat", progress: 80, lessons: 20 },
];

const skills = [
  { name: "Okuma", score: 72, icon: BookOpen },
  { name: "Dinleme", score: 58, icon: Headphones },
  { name: "Yazma", score: 45, icon: PenTool },
  { name: "Konuşma", score: 35, icon: MessageSquare },
];

export default function EnglishPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">İngilizce Geliştirme</h1>
          <p className="mt-1 text-muted-foreground">
            Sınav hazırlığı veya genel İngilizce gelişimi — tercih senin
          </p>
        </div>

        {/* Skill Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.name} variant="interactive">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <skill.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{skill.name}</p>
                    <p className="text-xl font-bold">{skill.score}/100</p>
                    <Progress value={skill.score} className="h-1.5 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exam Types */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Sınav ve Patika Seçimi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {examTypes.map((exam) => (
                <Button
                  key={exam.name}
                  variant="outline"
                  className="h-auto flex-col gap-2 p-6 hover:border-primary"
                >
                  <div className={`rounded-xl p-3 ${exam.color}`}>
                    <exam.icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold">{exam.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Eğitimler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.title} variant="interactive" className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold leading-tight">{course.title}</h3>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="h-3.5 w-3.5" />
                        {course.lessons} ders
                      </span>
                    </div>
                    {course.progress > 0 ? (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">İlerleme</span>
                          <span className="font-medium text-primary">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="w-full">
                        Başla
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
