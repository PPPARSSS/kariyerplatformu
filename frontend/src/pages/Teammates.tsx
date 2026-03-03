import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, GitBranch } from "lucide-react";

const teammates = [
  { name: "Zeynep Kaya", role: "Kıdemli Ürün Yöneticisi", dept: "Ürün Grubu - İnfleks Varlık", skills: ["Product Strategy", "Stakeholder Mgmt", "Data Analysis"], match: 85, avatar: "zeynep" },
  { name: "Can Özkan", role: "Kıdemli Yazılım Geliştirme Mühendisi", dept: "Yazılım Grubu - İnfleks Trade", skills: ["React", "TypeScript", ".NET"], match: 78, avatar: "can" },
  { name: "Elif Şahin", role: "Jr. Frontend Yazılım Mühendisi", dept: "Yazılım Grubu - FES/DES", skills: ["React", "Tailwind", "Figma"], match: 72, avatar: "elif" },
  { name: "Mehmet Demir", role: "Ürün Yönetici Yardımcısı", dept: "Ürün Grubu - İnfleks Operasyon", skills: ["User Research", "Jira", "Prototyping"], match: 65, avatar: "mehmet" },
  { name: "Ayşe Yıldız", role: "Ürün Yöneticisi", dept: "Ürün Grubu - İnfleks Trade", skills: ["VoC", "Roadmapping", "SQL"], match: 55, avatar: "ayse" },
  { name: "Burak Kılıç", role: "DevOps Uzmanı", dept: "DevOps", skills: ["Docker", "K8s", "Azure"], match: 48, avatar: "burak" },
  { name: "Selin Arslan", role: "Yazılım Geliştirme Mühendisi", dept: "Yazılım Grubu - İnfleks Varlık", skills: ["C#", ".NET", "SQL Server"], match: 70, avatar: "selin" },
  { name: "Emre Çelik", role: "Sistem ve Bilgi Güvenliği Uzmanı", dept: "Bilgi Teknolojileri", skills: ["InfoSec", "Network", "Firewall"], match: 40, avatar: "emre" },
  { name: "Deniz Korkmaz", role: "Jr. Test Uzmanı", dept: "Kalite Güvence", skills: ["Test Automation", "Selenium", "QA"], match: 52, avatar: "deniz" },
];

export default function TeammatesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Takım Arkadaşları</h1>
          <p className="mt-1 text-muted-foreground">Ortak yetkinliklere göre proje eşleştirmeleri</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="İsim, rol veya yetkinlik ara..." className="pl-10" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teammates.map((t) => (
            <Card key={t.name} variant="interactive" className="p-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}`} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-muted-foreground">{t.dept}</p>
                  </div>
                  <Badge className={t.match >= 70 ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                    %{t.match}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {t.skills.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1"><MessageSquare className="h-4 w-4 mr-1" />Mesaj</Button>
                  <Button size="sm" variant="outline" className="flex-1"><GitBranch className="h-4 w-4 mr-1" />Profil</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
