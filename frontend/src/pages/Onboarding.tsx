import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Circle,
  Rocket,
  BookOpen,
  Users,
  Shield,
  Clock,
  Building2,
  Coffee,
  CalendarDays,
  Heart,
  Lock,
  Monitor,
  Award,
  GraduationCap,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Onboarding Checklist ---
const phases = [
  {
    title: "1. Hafta — Hoş Geldin",
    items: [
      { name: "İnfina Kültürü ve Değerler", done: true },
      { name: "Ekip Tanıtımı", done: true },
      { name: "Araçlar ve Erişimler", done: true },
      { name: "Güvenlik Oryantasyonu", done: false },
    ],
  },
  {
    title: "2-4. Hafta — Öğrenme",
    items: [
      { name: "Ürün Ailesi Tanıtımı", done: false },
      { name: "Teknik Altyapı Eğitimi", done: false },
      { name: "Süreç ve İş Akışları", done: false },
    ],
  },
  {
    title: "30-60-90 Gün Hedefleri",
    items: [
      { name: "İlk görev teslimi", done: false },
      { name: "İlk sprint katılımı", done: false },
      { name: "Mentor değerlendirmesi", done: false },
    ],
  },
];

// --- Company History ---
const history = [
  { year: "1995", text: "İnfina, finans kurumlarından bağımsız yapısıyla bir ortaklık A.Ş. olarak kurulmuştur." },
  { year: "1996", text: "FinBase ürün ailesi geliştirilip piyasaya sunulmuş, kısa sürede birçok kurumda kullanılmaya başlanmıştır." },
  { year: "2004", text: "İsviçreli yazılım şirketi Expersoft System AG ile stratejik iş birliği yapılmıştır." },
  { year: "2007", text: "INFLEKS'in geliştirme çalışmalarına başlanmıştır. Sermaye Piyasalarının ihtiyaçlarını geniş kapsamda karşılamaktadır." },
  { year: "2019", text: "İnfina UK kurulmuş ve Öneriver İnfina'nın ilk spin-off'u olarak robo-danışmanlık hizmeti vermeye başlamıştır." },
  { year: "2022", text: "INFLEKS ürünleri Türkiye'de 85, UK'de 1 olmak üzere toplam 86 kurumda başarıyla kullanılmaktadır." },
];

// --- Life Guide Sections ---
interface GuideSection {
  icon: React.ElementType;
  title: string;
  items: string[];
}

const guideSections: GuideSection[] = [
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    items: [
      "Çalışma saatleri: 09:00 – 18:00",
      "Öğlen molası: 12:30 – 13:30",
      "Prensip olarak fazla mesai yapılmasına karşı olmakla birlikte, işimiz gerektirdiğinde işimizi bitirmeden çıkmayız.",
      "Akşam yemeği için 500 TL hakkınız mevcuttur.",
      "Saat 21:00'den sonraki mesailerde taksi fişi ile eve dönüş masrafları karşılanır.",
    ],
  },
  {
    icon: Coffee,
    title: "Yemek",
    items: [
      "Öğle yemekleri şirket kafeteryasında anlaşmalı yemek firması tarafından hazırlanır.",
      "Dışarıda olduğunuzda, belirlenen limitler içerisinde Mali İşler'e fiş sunarak dışarıda yemek yiyebilirsiniz.",
    ],
  },
  {
    icon: Heart,
    title: "Deneme Süresi ve Yan Haklar",
    items: [
      "Deneme süresi: 2 ay",
      "Sağlık sigortası: İşe başlama + 2 ay sonra yatarak kapsamlı başlar.",
      "2. ayı dolduran çalışanlar tamamlayıcı sağlık sigortasına hak kazanır.",
      "Her ay yol ve internet desteği olarak maaşa ek 3.500 TL nakit ödeme yapılır.",
      "Maaşlar çalışılan ayı takip eden ayın ilk iş günü ödenir.",
      "Avita ile psikolojik danışmanlık, veteriner, mevzuat gibi alanlarda ücretsiz destek.",
      "Her çalışan doğum gününde 1 gün izinli sayılır.",
    ],
  },
  {
    icon: CalendarDays,
    title: "İzin Hakları",
    items: [
      "1-3 yıl kıdem: 14 iş günü yıllık izin",
      "4-10 yıl kıdem: 20 iş günü yıllık izin",
      "11+ yıl kıdem: 26 iş günü yıllık izin + 16 saat ek izin",
      "Çocuğu olan çalışanlar: Okulların açıldığı ilk gün ve karne günleri yarım gün izinli.",
      "Rahatsızlanan çalışanlar: Yılda 10 günü geçmeyecek şekilde raporsuz izin veya evden çalışma hakkı.",
    ],
  },
  {
    icon: Lock,
    title: "Bilgi Güvenliği",
    items: [
      "Herkese Açık: Şirket iletişim bilgileri, pazarlama materyalleri, internet sitesi içerikleri.",
      "Şirkete Özel: Kaynak kod, analiz dokümanları — yönetici onayı olmadan paylaşılmaz.",
      "Gizli: Kişisel veriler, hassas iş bilgileri — sadece yetkili kişinin erişimine açık.",
      "Müşteri bilgileri kesinlikle gizli tutulur, İnfina yazılı onayı olmadan paylaşılmaz.",
    ],
  },
  {
    icon: Monitor,
    title: "Teknolojik Güvenlik",
    items: [
      "Hesap bilgileri Sistem Destek Grubu tarafından bildirilir — kimseyle paylaşma.",
      "Masandan ayrılırken bilgisayarını kilitle.",
      "Zararlı yazılım şüphesi taşıyan mailleri açmadan sil.",
      "VPN kullanıcı adı ve şifreni kimseyle paylaşma.",
      "Kişisel dosyalarını DATA sürücüsünde sakla.",
      "5651 sayılı yasa gereği internet trafiği izlenmekte ve kayıt altına alınmaktadır.",
    ],
  },
  {
    icon: Award,
    title: "Performans Değerlendirme",
    items: [
      "Her yıl Eylül-Ekim aylarında yetkinlik bazlı performans değerlendirme yapılır.",
      "Başarılı yönler ve iyileştirilmesi gereken alanlar birlikte planlanır.",
      "Bölümler arası geçiş, terfi, ücret iyileştirmesi ve eğitim ihtiyaçları görüşülür.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Eğitim ve Yüksek Lisans Desteği",
    items: [
      "Performans değerlendirme dönemlerinde eğitim ihtiyaçları yöneticiyle planlanır.",
      "İç eğitim koordinasyonu için Eğitim Komitesi bulunmaktadır.",
      "Yüksek lisans desteği: Min. 1 yıl kıdem, İK ve yönetici onayı gerekli.",
      "Her yıl maksimum 10 kişi yüksek lisans desteğinden yararlanabilir.",
    ],
  },
];

// --- Company Values ---
const companyValues = [
  "Müşterilerimize karşı daima nazik ve ölçülüyüz.",
  "Müşterinin küçük büyük tüm sorunları ciddiye alınır.",
  "Her sorun tümüyle çözülene kadar takip edilir.",
  "İletişim her şeydir — iç iletişime çok önem veririz.",
  "Gizli dokümanları yönetici onayı almadan paylaşmayız.",
  "Birbirimizin taleplerine öncelik veririz.",
  "Yazılı ortamda tartışma yapmayız.",
  "Nezaketten taviz vermeyiz.",
  "Birlikçi ve çözüm odaklı yaklaşırız.",
  "Birbirimizin sorumluluk alanlarına saygı duyarız.",
];

const socialEvents = [
  "Yaza Merhaba Pikniği",
  "Ramazan Yemeği",
  "Yılbaşı Yemeği",
  "Happy Hour etkinlikleri",
  "Bölüm yemekleri (yılda 2 kez)",
];

export default function OnboardingPage() {
  const total = phases.reduce((s, p) => s + p.items.length, 0);
  const done = phases.reduce((s, p) => s + p.items.filter((i) => i.done).length, 0);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Onboarding</h1>
          <p className="mt-1 text-muted-foreground">İnfina'ya hoş geldin — kültür, kurallar, araçlar ve ilk hedeflerin</p>
        </div>

        {/* Progress Card */}
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3"><Rocket className="h-6 w-6 text-primary" /></div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Onboarding İlerlemesi</p>
              <p className="text-2xl font-bold text-foreground">{done}/{total} adım</p>
              <Progress value={(done / total) * 100} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="checklist" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="checklist">Görev Listesi</TabsTrigger>
            <TabsTrigger value="guide">Yaşam Rehberi</TabsTrigger>
            <TabsTrigger value="history">Tarihçe</TabsTrigger>
            <TabsTrigger value="values">Kültür & Değerler</TabsTrigger>
          </TabsList>

          {/* === TAB 1: Checklist === */}
          <TabsContent value="checklist" className="space-y-4">
            {phases.map((phase) => (
              <Card key={phase.title}>
                <CardHeader><CardTitle className="text-lg">{phase.title}</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {phase.items.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      {item.done ? (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={item.done ? "line-through text-muted-foreground" : "font-medium text-foreground"}>{item.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* === TAB 2: Life Guide === */}
          <TabsContent value="guide" className="space-y-4">
            {guideSections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <section.icon className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* === TAB 3: History === */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  İnfina Yazılım Tarihçesi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {history.map((h) => (
                      <div key={h.year} className="relative flex items-start gap-4 pl-1">
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {h.year.slice(2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{h.year}</p>
                          <p className="text-sm text-muted-foreground mt-1">{h.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB 4: Culture & Values === */}
          <TabsContent value="values" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  İletişim Anlayışımız
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companyValues.map((v, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
                      <span className="text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Sosyal Etkinlikler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {socialEvents.map((e) => (
                    <Badge key={e} variant="secondary" className="text-sm py-1.5 px-3">
                      {e}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Bu etkinliklerin bir kısmına ailelerimiz de katılır. Çocuklarımız birlikte büyür. Bu etkinlikler bizim birlikte iş yapma gücümüzü güçlendirir.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
