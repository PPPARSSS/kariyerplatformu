import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { NewsWidget } from "@/components/dashboard/NewsWidget";
import { WeeklyFilm } from "@/components/dashboard/WeeklyFilm";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const featuredCourses = [
  {
    title: "React Advanced Patterns",
    category: "Frontend",
    instructor: "Dr. Mehmet Öz",
    duration: "4 saat",
    participants: 234,
    rating: 4.9,
    progress: 65,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    isMandatory: true,
  },
  {
    title: "TypeScript Temelleri",
    category: "Programlama",
    instructor: "Ayşe Yıldız",
    duration: "3 saat",
    participants: 567,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    isNew: true,
  },
  {
    title: "Liderlik ve İletişim",
    category: "Soft Skills",
    instructor: "Prof. Ali Kaya",
    duration: "2.5 saat",
    participants: 789,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=225&fit=crop",
  },
  {
    title: "Agile & Scrum Metodolojisi",
    category: "Yönetim",
    instructor: "Zeynep Demir",
    duration: "5 saat",
    participants: 345,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
  },
];

const Index = () => {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] || 'Kullanıcı';

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-card/90 to-card/40 border shadow-lg backdrop-blur-xl md:min-h-[220px] flex items-center transition-all duration-500 hover:shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent z-10" />

          {/* Animated Background Elements */}
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:translate-x-10" />
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:-translate-x-10" />

          {/* AI Generated Image (Nano Banana Pro) - Side Illustration */}
          <div className="absolute right-0 top-0 h-full w-full md:w-1/2 z-0 opacity-40 md:opacity-80 saturate-150 mix-blend-overlay md:mix-blend-normal [mask-image:linear-gradient(to_right,transparent,black_40%)]">
            <img
              src="/home-hero.png"
              alt="Learning & Growth"
              className="h-full w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
          </div>

          <div className="relative z-20 flex w-full flex-col gap-6 p-8 md:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Sparkles className="h-4 w-4" />
                <span>Harika gidiyorsun!</span>
              </div>
              <h1 className="text-3xl font-extrabold text-foreground md:text-5xl tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                Hoş Geldin, {firstName}! 👋
              </h1>
              <p className="mt-3 text-lg font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000">
                Bugün öğrenmeye devam edelim. Bu hafta tam <strong>3 eğitim</strong> tamamladın! Hedeflerine bir adım daha yaklaştın.
              </p>
            </div>
            <Button variant="gradient" size="lg" className="shrink-0 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1">
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
              Eğitimleri Keşfet
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Tamamlanan Eğitimler"
            value={12}
            icon={BookOpen}
            trend={{ value: 25, isPositive: true }}
            color="primary"
          />
          <StatsCard
            title="Kazanılan Rozetler"
            value={8}
            icon={Award}
            trend={{ value: 15, isPositive: true }}
            color="warning"
          />
          <StatsCard
            title="Toplam Öğrenme Saati"
            value="47 saat"
            icon={Clock}
            trend={{ value: 20, isPositive: true }}
            color="accent"
          />
          <StatsCard
            title="Sıralama"
            value="#15"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            color="success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 */}
          <div className="space-y-6 lg:col-span-2">
            {/* Continue Learning */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Kaldığın Yerden Devam Et</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aktif eğitimlerini tamamla
                  </p>
                </div>
                <Button variant="ghost" className="text-primary">
                  Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-6 md:flex-row">
                  <ProgressRing progress={65} size={100} />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-foreground">
                      React Advanced Patterns
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Modül 4: Custom Hooks ve Context API
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                      <span>Kalan: 1 saat 20 dk</span>
                      <span>•</span>
                      <span>Son aktivite: Dün</span>
                    </div>
                  </div>
                  <Button variant="gradient" size="lg">
                    Devam Et
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Courses */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Öne Çıkan Eğitimler</h2>
                <Button variant="ghost" className="text-primary">
                  Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {featuredCourses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>
            </div>

            {/* Weekly Film */}
            <WeeklyFilm />
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            <UpcomingTasks />
            <ActivityFeed />
            <NewsWidget />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
