import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  ThumbsUp,
  Users,
  Plus,
  Search,
  TrendingUp,
  BookOpen,
  Gamepad2,
  Dumbbell,
} from "lucide-react";

const forums = [
  { title: "Yapay Zeka ve Ürün Yönetimi", posts: 23, members: 45, hot: true },
  { title: "Remote Çalışma Deneyimleri", posts: 18, members: 32, hot: false },
  { title: "Yeni Teknoloji Trendleri 2026", posts: 31, members: 67, hot: true },
  { title: "Ürün Tasarımında Erişilebilirlik", posts: 12, members: 28, hot: false },
];

const clubs = [
  { name: "Kitap Kulübü", icon: BookOpen, members: 34, color: "bg-primary/10 text-primary" },
  { name: "Oyun Topluluğu", icon: Gamepad2, members: 22, color: "bg-accent/10 text-accent" },
  { name: "Spor & Fitness", icon: Dumbbell, members: 41, color: "bg-success/10 text-success" },
  { name: "Teknoloji Tartışmaları", icon: TrendingUp, members: 56, color: "bg-warning/10 text-warning" },
];

const recentPosts = [
  { author: "Zeynep K.", avatar: "zeynep", content: "GPT-5 ile ürün roadmap oluşturma deneyimimi paylaşıyorum...", likes: 12, replies: 5, time: "2 saat önce" },
  { author: "Can Ö.", avatar: "can", content: "Sprint retrospektif için yeni bir format denedik, sonuçlar çok iyi!", likes: 8, replies: 3, time: "5 saat önce" },
  { author: "Elif Ş.", avatar: "elif", content: "Erişilebilirlik audit checklist'i hazırladım, paylaşıyorum.", likes: 15, replies: 7, time: "1 gün önce" },
];

export default function CommunityPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Topluluk & Forum</h1>
            <p className="mt-1 text-muted-foreground">Fikir tartış, kulüplere katıl, bilgi paylaş</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Yeni Konu</Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Konu veya kulüp ara..." className="pl-10" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Forums */}
          <div className="lg:col-span-2 space-y-4">
            <Card variant="glass">
              <CardHeader><CardTitle>Popüler Konular</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {forums.map((f) => (
                  <div key={f.title} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{f.title}</h4>
                        <p className="text-sm text-muted-foreground">{f.posts} gönderi · {f.members} üye</p>
                      </div>
                    </div>
                    {f.hot && <Badge className="bg-destructive/10 text-destructive">Trend</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card variant="glass">
              <CardHeader><CardTitle>Son Paylaşımlar</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.content} className="p-4 rounded-lg border border-border space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatar}`} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{post.replies}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Clubs */}
          <Card variant="glass">
            <CardHeader><CardTitle>Kulüpler</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {clubs.map((club) => (
                <div key={club.name} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className={`rounded-lg p-2 ${club.color}`}><club.icon className="h-5 w-5" /></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{club.name}</p>
                    <p className="text-xs text-muted-foreground">{club.members} üye</p>
                  </div>
                  <Button size="sm" variant="outline">Katıl</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
