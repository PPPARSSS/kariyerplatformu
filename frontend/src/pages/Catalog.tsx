import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Code,
  Palette,
  Database,
  Brain,
  Shield,
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryIcon: React.ElementType;
  instructor: string;
  duration: string;
  participants: number;
  rating: number;
  level: "beginner" | "intermediate" | "advanced";
  thumbnail: string;
  progress?: number;
  isNew?: boolean;
  isMandatory?: boolean;
  isPopular?: boolean;
}

const categories = [
  { id: "all", name: "Tümü", icon: BookOpen },
  { id: "frontend", name: "Frontend", icon: Code },
  { id: "backend", name: "Backend", icon: Database },
  { id: "design", name: "UI/UX", icon: Palette },
  { id: "security", name: "Güvenlik", icon: Shield },
  { id: "softskills", name: "Soft Skills", icon: Brain },
  { id: "management", name: "Yönetim", icon: TrendingUp },
];

const courses: Course[] = [
  {
    id: "1",
    title: "React Advanced Patterns",
    description: "React'te ileri seviye tasarım kalıpları ve best practices öğrenin.",
    category: "frontend",
    categoryIcon: Code,
    instructor: "Dr. Mehmet Öz",
    duration: "4 saat",
    participants: 234,
    rating: 4.9,
    level: "advanced",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    progress: 65,
    isMandatory: true,
  },
  {
    id: "2",
    title: "TypeScript Temelleri",
    description: "TypeScript ile tip güvenli JavaScript uygulamaları geliştirin.",
    category: "frontend",
    categoryIcon: Code,
    instructor: "Ayşe Yıldız",
    duration: "3 saat",
    participants: 567,
    rating: 4.8,
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    isNew: true,
  },
  {
    id: "3",
    title: "Liderlik ve İletişim",
    description: "Etkili liderlik becerileri ve iletişim stratejileri.",
    category: "softskills",
    categoryIcon: Brain,
    instructor: "Prof. Ali Kaya",
    duration: "2.5 saat",
    participants: 789,
    rating: 4.7,
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=225&fit=crop",
    isPopular: true,
  },
  {
    id: "4",
    title: "Agile & Scrum Metodolojisi",
    description: "Proje yönetiminde Agile ve Scrum metodolojilerini öğrenin.",
    category: "management",
    categoryIcon: TrendingUp,
    instructor: "Zeynep Demir",
    duration: "5 saat",
    participants: 345,
    rating: 4.6,
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
  },
  {
    id: "5",
    title: "Node.js ile API Geliştirme",
    description: "RESTful API'ler oluşturun ve production-ready backend geliştirin.",
    category: "backend",
    categoryIcon: Database,
    instructor: "Can Özkan",
    duration: "6 saat",
    participants: 423,
    rating: 4.8,
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
    progress: 30,
  },
  {
    id: "6",
    title: "Figma ile UI Tasarımı",
    description: "Modern UI tasarımları oluşturmak için Figma'yı ustalaşın.",
    category: "design",
    categoryIcon: Palette,
    instructor: "Elif Şahin",
    duration: "4 saat",
    participants: 567,
    rating: 4.9,
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    isNew: true,
  },
  {
    id: "7",
    title: "Web Güvenliği Temelleri",
    description: "OWASP Top 10 ve güvenli kod yazma prensipleri.",
    category: "security",
    categoryIcon: Shield,
    instructor: "Mehmet Demir",
    duration: "3.5 saat",
    participants: 234,
    rating: 4.7,
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    isMandatory: true,
  },
  {
    id: "8",
    title: "PostgreSQL Veritabanı Yönetimi",
    description: "PostgreSQL ile veritabanı tasarımı ve optimizasyonu.",
    category: "backend",
    categoryIcon: Database,
    instructor: "Hakan Yılmaz",
    duration: "5 saat",
    participants: 312,
    rating: 4.6,
    level: "advanced",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop",
  },
  {
    id: "9",
    title: "Sunum Teknikleri",
    description: "Etkili sunum hazırlama ve sunma becerileri.",
    category: "softskills",
    categoryIcon: Brain,
    instructor: "Selin Arslan",
    duration: "2 saat",
    participants: 654,
    rating: 4.5,
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=225&fit=crop",
    isPopular: true,
  },
  {
    id: "10",
    title: "CSS Grid & Flexbox Mastery",
    description: "Modern CSS layout teknikleriyle responsive tasarımlar.",
    category: "frontend",
    categoryIcon: Code,
    instructor: "Deniz Kara",
    duration: "3 saat",
    participants: 478,
    rating: 4.8,
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=225&fit=crop",
  },
  {
    id: "11",
    title: "Docker & Kubernetes",
    description: "Container teknolojileri ve orkestrasyon.",
    category: "backend",
    categoryIcon: Database,
    instructor: "Burak Çelik",
    duration: "7 saat",
    participants: 289,
    rating: 4.7,
    level: "advanced",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=225&fit=crop",
  },
  {
    id: "12",
    title: "Proje Yönetimi Temelleri",
    description: "Başarılı proje yönetimi için temel kavramlar ve araçlar.",
    category: "management",
    categoryIcon: TrendingUp,
    instructor: "Gamze Aydın",
    duration: "4 saat",
    participants: 543,
    rating: 4.6,
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop",
  },
];

const levelLabels = {
  beginner: { label: "Başlangıç", color: "bg-success/10 text-success" },
  intermediate: { label: "Orta", color: "bg-primary/10 text-primary" },
  advanced: { label: "İleri", color: "bg-warning/10 text-warning" },
};

function CourseCard({ course, viewMode }: { course: Course; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card variant="interactive" className="overflow-hidden">
        <div className="flex">
          <div className="relative w-48 shrink-0">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
            {course.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            )}
          </div>
          <CardContent className="flex flex-1 items-center justify-between p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {course.isNew && (
                  <Badge className="bg-warning text-warning-foreground">Yeni</Badge>
                )}
                {course.isMandatory && (
                  <Badge className="bg-destructive text-destructive-foreground">Zorunlu</Badge>
                )}
                {course.isPopular && (
                  <Badge className="bg-accent text-accent-foreground">Popüler</Badge>
                )}
                <Badge variant="outline" className={levelLabels[course.level].color}>
                  {levelLabels[course.level].label}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {course.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{course.instructor}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.participants}
                </span>
                <span className="flex items-center gap-1 text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  {course.rating}
                </span>
              </div>
            </div>
            <Button variant={course.progress ? "default" : "gradient"}>
              {course.progress ? "Devam Et" : "Başla"}
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="interactive" className="group overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="ghost"
            className="h-14 w-14 rounded-full bg-white/90 text-primary shadow-lg hover:bg-white hover:scale-110"
          >
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </div>

        <div className="absolute left-3 top-3 flex gap-2">
          {course.isNew && (
            <Badge className="bg-warning text-warning-foreground">Yeni</Badge>
          )}
          {course.isMandatory && (
            <Badge className="bg-destructive text-destructive-foreground">Zorunlu</Badge>
          )}
          {course.isPopular && (
            <Badge className="bg-accent text-accent-foreground">Popüler</Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            <course.categoryIcon className="mr-1 h-3 w-3" />
            {categories.find((c) => c.id === course.category)?.name}
          </Badge>
          <Badge variant="outline" className={cn("bg-white/90", levelLabels[course.level].color)}>
            {levelLabels[course.level].label}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <p className="mb-3 text-sm text-muted-foreground">
          {course.instructor}
        </p>

        {course.progress !== undefined && (
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">İlerleme</span>
              <span className="font-medium text-primary">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.participants}
          </span>
          <span className="flex items-center gap-1 text-warning">
            <Star className="h-3.5 w-3.5 fill-current" />
            {course.rating}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.participants - a.participants;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default:
        return 0;
    }
  });

  const inProgressCourses = courses.filter((c) => c.progress !== undefined);
  const mandatoryCourses = courses.filter((c) => c.isMandatory);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Eğitim Kataloğu
            </h1>
            <p className="mt-1 text-muted-foreground">
              {courses.length} eğitim mevcut • Yetkinliklerini geliştir
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Eğitim</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-xl bg-warning/10 p-3">
                <Play className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressCourses.length}</p>
                <p className="text-sm text-muted-foreground">Devam Eden</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-xl bg-destructive/10 p-3">
                <Award className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mandatoryCourses.length}</p>
                <p className="text-sm text-muted-foreground">Zorunlu</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-xl bg-success/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Tamamlanan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Eğitim, eğitmen veya konu ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Level Filter */}
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Seviye" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Seviyeler</SelectItem>
                  <SelectItem value="beginner">Başlangıç</SelectItem>
                  <SelectItem value="intermediate">Orta</SelectItem>
                  <SelectItem value="advanced">İleri</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">En Popüler</SelectItem>
                  <SelectItem value="rating">En Yüksek Puan</SelectItem>
                  <SelectItem value="newest">En Yeni</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex gap-1 rounded-lg border border-border p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs & Courses */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              >
                <cat.icon className="mr-2 h-4 w-4" />
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            {sortedCourses.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Eğitim bulunamadı</h3>
                <p className="text-muted-foreground">
                  Arama kriterlerinize uygun eğitim bulunmamaktadır.
                </p>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} viewMode="list" />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
