import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  BookOpen,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const kpis = [
  { title: "Toplam Çalışan", value: "248", trend: 3.2, icon: Users, color: "bg-primary/10 text-primary" },
  { title: "Eğitim Tamamlama", value: "%78", trend: 5.1, icon: BookOpen, color: "bg-success/10 text-success" },
  { title: "Ortalama Performans", value: "82/100", trend: 1.8, icon: Target, color: "bg-accent/10 text-accent" },
  { title: "Terfi Hazır Çalışan", value: "14", trend: -2, icon: Award, color: "bg-warning/10 text-warning" },
];

const risks = [
  { name: "Zeynep Kaya", dept: "Ürün", risk: "Zorunlu eğitim gecikti", level: "high" },
  { name: "Burak Kılıç", dept: "Altyapı", risk: "1e1 3 aydır yapılmadı", level: "medium" },
  { name: "Ayşe Yıldız", dept: "Veri", risk: "KPI hedefin altında", level: "high" },
];

const deptStats = [
  { name: "Ürün Grubu", employees: 31, avgPerformance: 85, trainingRate: 82 },
  { name: "Yazılım Grubu", employees: 55, avgPerformance: 80, trainingRate: 75 },
  { name: "DevOps", employees: 3, avgPerformance: 88, trainingRate: 90 },
  { name: "Bilgi Teknolojileri", employees: 3, avgPerformance: 83, trainingRate: 85 },
  { name: "Kalite Güvence", employees: 3, avgPerformance: 82, trainingRate: 88 },
  { name: "İş Geliştirme & Satış", employees: 17, avgPerformance: 79, trainingRate: 78 },
  { name: "Pazarlama", employees: 3, avgPerformance: 84, trainingRate: 92 },
  { name: "Finans", employees: 5, avgPerformance: 81, trainingRate: 95 },
  { name: "İnsan Kaynakları & İdari İşler", employees: 10, avgPerformance: 79, trainingRate: 95 },
];

export default function HrAnalyticsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">İK & Analitik</h1>
          <p className="mt-1 text-muted-foreground">Performans, yetenek havuzu ve eğitim etkinliği — sadece yetkili kullanıcılar</p>
        </div>

        <Badge variant="destructive" className="text-xs">🔒 İK, Yönetici ve Üst Yönetici Erişimi</Badge>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title} variant="stats">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-3 ${kpi.color}`}><kpi.icon className="h-6 w-6" /></div>
                  <div>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className={`text-xs flex items-center gap-0.5 mt-1 ${kpi.trend > 0 ? "text-success" : "text-destructive"}`}>
                      {kpi.trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(kpi.trend)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Department Stats */}
          <div className="lg:col-span-2">
            <Card variant="glass">
              <CardHeader><CardTitle>Departman Performansı</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {deptStats.map((dept) => (
                  <div key={dept.name} className="p-4 rounded-lg border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{dept.name}</h4>
                      <span className="text-sm text-muted-foreground">{dept.employees} kişi</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ort. Performans</p>
                        <Progress value={dept.avgPerformance} className="h-2" />
                        <p className="text-xs font-medium mt-1">{dept.avgPerformance}/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Eğitim Tamamlama</p>
                        <Progress value={dept.trainingRate} className="h-2" />
                        <p className="text-xs font-medium mt-1">%{dept.trainingRate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk Alerts */}
          <Card variant="glass">
            <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" />Risk Sinyalleri</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {risks.map((r) => (
                <div key={r.name} className="p-3 rounded-lg border border-border space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{r.name}</p>
                    <Badge variant={r.level === "high" ? "destructive" : "secondary"}>
                      {r.level === "high" ? "Yüksek" : "Orta"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.dept}</p>
                  <p className="text-sm text-destructive">{r.risk}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
