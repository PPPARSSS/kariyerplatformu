import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VisualSkillTree } from "@/components/dashboard/VisualSkillTree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Users,
  Zap,
  Trophy,
  GitBranch,
  BookOpen,
  Code,
  Palette,
  Database,
  Shield,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  completed: boolean;
  inProgress?: boolean;
  children?: SkillNode[];
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  progress: number;
  totalCourses: number;
  completedCourses: number;
  skills: SkillNode[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Geliştirme",
    icon: Code,
    color: "text-primary",
    progress: 75,
    totalCourses: 12,
    completedCourses: 9,
    skills: [
      {
        id: "html-css",
        name: "HTML & CSS",
        level: 1,
        completed: true,
        children: [
          {
            id: "responsive",
            name: "Responsive Design",
            level: 2,
            completed: true,
            children: [
              { id: "tailwind", name: "Tailwind CSS", level: 3, completed: true },
              { id: "sass", name: "SASS/SCSS", level: 3, completed: true },
            ],
          },
          {
            id: "animations",
            name: "CSS Animations",
            level: 2,
            completed: true,
          },
        ],
      },
      {
        id: "javascript",
        name: "JavaScript",
        level: 1,
        completed: true,
        children: [
          {
            id: "es6",
            name: "ES6+ Features",
            level: 2,
            completed: true,
            children: [
              { id: "typescript", name: "TypeScript", level: 3, completed: true },
              { id: "testing", name: "Testing (Jest)", level: 3, inProgress: true, completed: false },
            ],
          },
          {
            id: "react",
            name: "React",
            level: 2,
            completed: true,
            children: [
              { id: "hooks", name: "React Hooks", level: 3, completed: true },
              { id: "patterns", name: "Advanced Patterns", level: 3, inProgress: true, completed: false },
              { id: "nextjs", name: "Next.js", level: 3, completed: false },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Geliştirme",
    icon: Database,
    color: "text-accent",
    progress: 45,
    totalCourses: 10,
    completedCourses: 4,
    skills: [
      {
        id: "nodejs",
        name: "Node.js",
        level: 1,
        completed: true,
        children: [
          { id: "express", name: "Express.js", level: 2, completed: true },
          { id: "nestjs", name: "NestJS", level: 2, completed: false },
        ],
      },
      {
        id: "databases",
        name: "Databases",
        level: 1,
        completed: true,
        children: [
          { id: "sql", name: "SQL", level: 2, completed: true },
          { id: "mongodb", name: "MongoDB", level: 2, inProgress: true, completed: false },
        ],
      },
    ],
  },
  {
    id: "design",
    name: "UI/UX Tasarım",
    icon: Palette,
    color: "text-warning",
    progress: 30,
    totalCourses: 8,
    completedCourses: 2,
    skills: [
      {
        id: "figma",
        name: "Figma",
        level: 1,
        completed: true,
        children: [
          { id: "components", name: "Component Design", level: 2, completed: true },
          { id: "prototyping", name: "Prototyping", level: 2, completed: false },
        ],
      },
    ],
  },
  {
    id: "security",
    name: "Güvenlik",
    icon: Shield,
    color: "text-destructive",
    progress: 20,
    totalCourses: 6,
    completedCourses: 1,
    skills: [
      {
        id: "auth",
        name: "Authentication",
        level: 1,
        completed: true,
        children: [
          { id: "oauth", name: "OAuth 2.0", level: 2, completed: false },
          { id: "jwt", name: "JWT", level: 2, completed: false },
        ],
      },
    ],
  },
  {
    id: "softskills",
    name: "Soft Skills",
    icon: Brain,
    color: "text-success",
    progress: 60,
    totalCourses: 5,
    completedCourses: 3,
    skills: [
      {
        id: "leadership",
        name: "Liderlik",
        level: 1,
        completed: true,
        children: [
          { id: "communication", name: "Etkili İletişim", level: 2, completed: true },
          { id: "teamwork", name: "Takım Çalışması", level: 2, completed: true },
        ],
      },
    ],
  },
];

interface Teammate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  matchScore: number;
  commonSkills: string[];
}

const potentialTeammates: Teammate[] = [
  {
    id: "1",
    name: "Zeynep Kaya",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zeynep",
    role: "Backend Developer",
    matchScore: 85,
    commonSkills: ["Node.js", "TypeScript", "SQL"],
  },
  {
    id: "2",
    name: "Can Özkan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=can",
    role: "Full Stack Developer",
    matchScore: 78,
    commonSkills: ["React", "TypeScript", "Express.js"],
  },
  {
    id: "3",
    name: "Elif Şahin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elif",
    role: "Frontend Developer",
    matchScore: 72,
    commonSkills: ["React", "Tailwind CSS", "Figma"],
  },
  {
    id: "4",
    name: "Mehmet Demir",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet",
    role: "UI/UX Designer",
    matchScore: 65,
    commonSkills: ["Figma", "CSS Animations"],
  },
];

function SkillTreeNode({ node, depth = 0 }: { node: SkillNode; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Connection line */}
      {depth > 0 && (
        <div
          className="absolute -left-6 top-0 h-6 w-6 border-l-2 border-b-2 border-border rounded-bl-lg"
          style={{ marginTop: "-12px" }}
        />
      )}

      <div
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg transition-all cursor-pointer hover:bg-muted/50",
          node.completed && "text-foreground",
          node.inProgress && "text-primary",
          !node.completed && !node.inProgress && "text-muted-foreground"
        )}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )
        ) : (
          <div className="w-4" />
        )}

        {node.completed ? (
          <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
        ) : node.inProgress ? (
          <div className="relative">
            <Circle className="h-5 w-5 text-primary shrink-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        ) : (
          <Circle className="h-5 w-5 shrink-0" />
        )}

        <span className={cn("font-medium", node.completed && "line-through opacity-70")}>
          {node.name}
        </span>

        {node.inProgress && (
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
            Devam Ediyor
          </Badge>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="ml-8 space-y-1 border-l-2 border-border/50 pl-4 mt-1">
          {node.children!.map((child) => (
            <SkillTreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("frontend");
  const [viewMode, setViewMode] = useState<"tree" | "visual">("visual");
  const selectedCategoryData = skillCategories.find((c) => c.id === selectedCategory);

  const totalCompleted = skillCategories.reduce((acc, cat) => acc + cat.completedCourses, 0);
  const totalCourses = skillCategories.reduce((acc, cat) => acc + cat.totalCourses, 0);
  const overallProgress = Math.round((totalCompleted / totalCourses) * 100);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            İlerleme Ağacım
          </h1>
          <p className="mt-1 text-muted-foreground">
            Yetkinliklerini görselleştir ve potansiyel takım arkadaşlarını keşfet
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCompleted}/{totalCourses}</p>
                  <p className="text-sm text-muted-foreground">Eğitim Tamamlandı</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-success/10 p-3">
                  <Trophy className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                  <p className="text-sm text-muted-foreground">Genel İlerleme</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-accent/10 p-3">
                  <GitBranch className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{skillCategories.length}</p>
                  <p className="text-sm text-muted-foreground">Yetkinlik Alanı</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="stats">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-warning/10 p-3">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Aktif Seri</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "visual" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("visual")}
          >
            <Zap className="h-4 w-4 mr-2" />
            Görsel Ağaç
          </Button>
          <Button
            variant={viewMode === "tree" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("tree")}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Liste Görünümü
          </Button>
        </div>

        {/* Visual Skill Tree */}
        {viewMode === "visual" && (
          <VisualSkillTree />
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Skill Tree - List View */}
          {viewMode === "tree" && (
          <div className="lg:col-span-2 space-y-4">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  Yetkinlik Ağacı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    {skillCategories.map((cat) => (
                      <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className="flex items-center gap-2"
                      >
                        <cat.icon className={cn("h-4 w-4", cat.color)} />
                        <span className="hidden md:inline">{cat.name.split(" ")[0]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {skillCategories.map((cat) => (
                    <TabsContent key={cat.id} value={cat.id} className="space-y-4">
                      {/* Category Header */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={cn("rounded-xl p-3 bg-background", cat.color)}>
                            <cat.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{cat.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {cat.completedCourses}/{cat.totalCourses} eğitim tamamlandı
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{cat.progress}%</p>
                          <Progress value={cat.progress} className="w-24 h-2 mt-1" />
                        </div>
                      </div>

                      {/* Tree */}
                      <div className="space-y-2 p-4">
                        {cat.skills.map((skill) => (
                          <SkillTreeNode key={skill.id} node={skill} />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Potential Teammates */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-accent" />
                  Potansiyel Takım Arkadaşları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {potentialTeammates.map((teammate) => (
                  <div
                    key={teammate.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teammate.avatar} />
                      <AvatarFallback>{teammate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{teammate.name}</p>
                        <Badge
                          className={cn(
                            "shrink-0",
                            teammate.matchScore >= 80
                              ? "bg-success/10 text-success"
                              : teammate.matchScore >= 60
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          %{teammate.matchScore}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{teammate.role}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {teammate.commonSkills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Tümünü Gör
                </Button>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gösterge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm">Tamamlandı</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Circle className="h-5 w-5 text-primary" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  </div>
                  <span className="text-sm">Devam Ediyor</span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Başlanmadı</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
