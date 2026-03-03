import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TrendingUp,
  Target,
  Clock,
  ChevronRight,
  Users,
  MessageSquare,
  ArrowUp,
  ArrowLeftRight,
  Info,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

// --- Promotion Criteria per level ---
interface PromotionCriteria {
  levelCode: string;
  minDuration: string;
  maxDuration?: string;
  yetkinlikMatrisi: string;
  jiraMin: number;
  kpiMin: number;
  performansMin: number;
  egitimSertifika: string;
  minTerfiPuan: number;
  terfiOnay: { talep: string; gorus: string; onay: string };
}

const promotionCriteria: PromotionCriteria[] = [
  { levelCode: "A1", minDuration: "1 yıl", yetkinlikMatrisi: "Değerlendirmelerden 100 üzerinden beklenen ort. 80", jiraMin: 90, kpiMin: 80, performansMin: 80, egitimSertifika: "-", minTerfiPuan: 75, terfiOnay: { talep: "Ürün Direktörü/GMY", gorus: "CPO", onay: "CEO" } },
  { levelCode: "A2", minDuration: "2 yıl", yetkinlikMatrisi: "Değerlendirmelerden 100 üzerinden min ort. 80", jiraMin: 90, kpiMin: 80, performansMin: 80, egitimSertifika: "-", minTerfiPuan: 75, terfiOnay: { talep: "Ürün Direktörü/GMY", gorus: "CPO", onay: "CEO" } },
  { levelCode: "ÜY1", minDuration: "2 yıl", maxDuration: "5 yıl", yetkinlikMatrisi: "Değerlendirmelerden 100 üzerinden min ort. 80", jiraMin: 90, kpiMin: 80, performansMin: 80, egitimSertifika: "İK tarafından açıklanacak eğitimlerden en az N tanesini almak", minTerfiPuan: 75, terfiOnay: { talep: "Ürün Direktörü/GMY", gorus: "CPO, Teknik Ürün Lideri, Ürün Lideri, İK", onay: "CEO" } },
  { levelCode: "ÜY2", minDuration: "2 yıl", maxDuration: "5 yıl", yetkinlikMatrisi: "Değerlendirmelerden 100 üzerinden min ort. 80", jiraMin: 90, kpiMin: 80, performansMin: 80, egitimSertifika: "İK tarafından açıklanacak eğitimlerden en az N tanesini almak", minTerfiPuan: 75, terfiOnay: { talep: "Ürün Direktörü/GMY", gorus: "CPO, Teknik Ürün Lideri, Ürün Lideri, İK", onay: "CEO" } },
  { levelCode: "ÜY3", minDuration: "5 yıl", yetkinlikMatrisi: "Değerlendirmelerden 100 üzerinden min ort. 80", jiraMin: 90, kpiMin: 80, performansMin: 80, egitimSertifika: "İK tarafından açıklanacak eğitimlerden en az N tanesini almak", minTerfiPuan: 75, terfiOnay: { talep: "Ürün Direktörü/GMY", gorus: "CPO, Teknik Ürün Lideri, Ürün Lideri, İK", onay: "CEO" } },
  { levelCode: "ÜY4", minDuration: "5 yıl", yetkinlikMatrisi: "Değerlendirmelerden 100 üzerinden min ort. 80", jiraMin: 90, kpiMin: 80, performansMin: 80, egitimSertifika: "İK tarafından açıklanacak eğitimlerden en az N tanesini almak", minTerfiPuan: 75, terfiOnay: { talep: "GMY/CPO", gorus: "Diğer Gruplar Ürün Direktörü, İK", onay: "CEO" } },
];

// --- Career Levels ---
interface CareerLevel {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  description: string;
  duration: string;
  tier: "analyst" | "specialist" | "manager" | "leader" | "director";
}

const careerLevels: CareerLevel[] = [
  { id: "a1", code: "A1", title: "Product Analyst", titleEn: "Product Analyst - I", description: "Eğitim/Gelişim aşamasındaki aday analist", duration: "1 yıl", tier: "analyst" },
  { id: "a2", code: "A2", title: "Sr. Product Analyst", titleEn: "Product Analyst - II", description: "Ürün yöneticilerine yardım eder, destek verir, küçük projelerde analiz yapar", duration: "2 yıl", tier: "analyst" },
  { id: "uy1", code: "ÜY1", title: "Product Specialist", titleEn: "PM-I / TPM-I", description: "Temel ürün yönetimi görevlerini yapar. Ürün yönetiminde giriş seviyesi", duration: "2 yıl", tier: "specialist" },
  { id: "uy2", code: "ÜY2", title: "Product Manager", titleEn: "PM-II / TPM-II", description: "Ürün geliştirme, proje yönetimi / orta seviye", duration: "2-5 yıl", tier: "manager" },
  { id: "uy3", code: "ÜY3", title: "Sr. Product Manager", titleEn: "SrPM / SrTPM", description: "Çoklu proje yönetebilir. Deneyimli", duration: "5 yıl", tier: "manager" },
  { id: "uy4", code: "ÜY4", title: "Product Leader", titleEn: "PML / TPML", description: "Liderlik seviyesi, teknik veya iş kolunda uzmanlık", duration: "-", tier: "leader" },
  { id: "uyd", code: "ÜYD", title: "Product Director", titleEn: "Ürün Direktörü (PD)", description: "Tüm ürün hatlarının stratejik yönetimi", duration: "-", tier: "director" },
];

// --- Dual Track ---
const dualTrack = [
  { level: "A1", pmTitle: "Product Analyst", tpmTitle: "Product Analyst" },
  { level: "A2", pmTitle: "Product Analyst", tpmTitle: "Product Analyst" },
  { level: "ÜY1", pmTitle: "Product Manager - I", tpmTitle: "Technical Product Manager - I" },
  { level: "ÜY2", pmTitle: "Product Manager - II", tpmTitle: "Technical Product Manager - II" },
  { level: "ÜY3", pmTitle: "Sr. Product Manager", tpmTitle: "Sr. Technical Product Manager" },
  { level: "ÜY4", pmTitle: "Product Leader (PML)", tpmTitle: "Technical Product Leader (TPML)" },
];

// --- Role Comparison ---
const roleComparisons = [
  { kriter: "Odağı", pm: "İş hedefleri, müşteri ihtiyaçları, pazar ve kârlılık", tpm: "Teknik detaylar, yazılım geliştirme, sistem entegrasyonu" },
  { kriter: "Eğitim", pm: "İşletme, İktisat, Sermaye Piyasaları vb.", tpm: "Bilgisayar/Yazılım Müh., Endüstri Müh., Teknik bölümler" },
  { kriter: "Bilgi Alanı", pm: "Finansal ürünler, müşteri ihtiyaçları, mevzuat", tpm: "Yazılım mimarisi, API, veri tabanı, entegrasyonlar" },
  { kriter: "Görevler", pm: "Yol haritası, vizyon, pazar analizi, müşteri iletişimi", tpm: "Sprint planlama, backlog teknik ayrıştırma, entegrasyon yönetimi" },
  { kriter: "Müşteri İlişkisi", pm: "İş diliyle iletişim, ihtiyaç toplama", tpm: "Teknik gereksinimleri anlama ve çözüm önerme" },
  { kriter: "Ekiplerle İletişim", pm: "Satış, destek, uyum, yönetim", tpm: "Yazılım, QA, DevOps, teknik mimarlar" },
  { kriter: "Başarı Ölçütü", pm: "Ürün kârlılığı, müşteri memnuniyeti, pazar başarısı", tpm: "Teslim edilen teknik işlerin kalitesi, süreklilik, SLA'ler" },
];

// --- 1:1 Meeting Info ---
const oneToOneData = [
  { profil: "Yeni başlayan (A1)", siklik: "Aylık", amac: "Adaptasyon, güven inşası, hızlı feedback" },
  { profil: "Yeni başlayan (A2)", siklik: "Aylık", amac: "Gelişim, motivasyon, yetkinlik matrisi takibi" },
  { profil: "ÜY1", siklik: "Aylık", amac: "Road map ilerleme takibi, risk azaltma" },
  { profil: "ÜY2", siklik: "Aylık", amac: "Gelişim, motivasyon, yetkinlik matrisi takibi" },
  { profil: "ÜY3", siklik: "Aylık", amac: "Mentorluk, stratejik gelişim, uzun vadeli hedefler" },
];

const senSorSorulari = [
  "Senin son dönemin nasıl geçti?",
  "En çok işinle ilgili motive eden şeyler neler oldu?",
  "İşinde hangi konuda iyi olduğunu düşünüyorsun?",
  "İletişimle ilgili hangi konuda daha iyi hissediyorsun?",
  "Kendinde geliştirmen gereken neler olduğunu düşünüyorsun?",
  "Neyi daha iyi yapabilirdik, neleri iyi yaptık, nasıl daha iyi yapabiliriz?",
  "Şirketten, yöneticinden ve ekip arkadaşlarından bundan sonraki süreçte beklentilerin neler?",
];

const senAnlatSorulari = [
  "Ekip olarak seninle nasıl bir dönem geçti?",
  "Neleri iyi yaptık?",
  "Neleri daha iyi yapabilirdik?",
  "Biz senden neler bekliyoruz? (Daha önce konuşulan beklenti ve hedefleri hatırlatmak güncellemek)",
  "Bir sonraki dönem hedefimiz ne olmalı?",
  "Benim senin hedeflerine ulaşabilmen için yapabileceğim bir şey var mı?",
  "Tıkandığın ve takıldığın konular var mı?",
];

const meetingFlow = [
  { step: 1, title: "Check-In", duration: "5dk", questions: ["Son zamanlarda seni en çok ne motive etti?", "Şu an seni zorlayan bir konu var mı?"] },
  { step: 2, title: "Güncel İşler ve Road Map", duration: "10dk", questions: ["Bu sprintte seni en çok zorlayan deliverable ne oldu?", "Road map'in hangi kısmında daha çok desteğe ihtiyaç duyuyorsun?"] },
  { step: 3, title: "Yetkinlik Matrisine Göre Gelişim", duration: "10dk", questions: ["Hangi becerilerini son dönemde geliştirdiğini hissediyorsun?", "Matristen hangi alanda daha çok sorumluluk almak istersin?"] },
  { step: 4, title: "Geri Bildirim ve Planların Gözden Geçirilmesi", duration: "10dk", questions: ["Benim liderlik tarzımda değiştirmemi istediğin bir şey var mı?", "Bir sonraki seviye için hangi fırsatları sana açmamı isterdin?"] },
  { step: 5, title: "Kapanış", duration: "5dk", questions: ["1–2 net aksiyon maddesi belirlenir.", "Moral artırıcı pozitif bir cümle ile bitirilir."] },
];

// --- Competency Matrix Data ---
interface CompetencySkill {
  area: string;
  skill: string;
  focus: string;
  description: string;
  targetScore: number;
}

const competencyAreas = [
  { key: "Product Execution", skills: ["Feature Specification", "Product Delivery", "Product Quality Assurance"] },
  { key: "Customer Insight", skills: ["Fluency with Data", "Voice of the Customer", "User Experience Design"] },
  { key: "Product Strategy", skills: ["Business Outcome Ownership", "Product Vision & Roadmapping", "Strategic Impact"] },
  { key: "Influencing People", skills: ["Stakeholder Management", "Team Leadership", "Managing Up"] },
];

const competencyByLevel: Record<string, CompetencySkill[]> = {
  A1: [
    { area: "Product Execution", skill: "Feature Specification", focus: "Netlik & Doğru Dokümantasyon", description: "Sektörün ve sermaye piyasalarının temel terimlerini öğrenir. Kritikliği düşük konularda yazılım yaşam döngüsünü uçtan uca uygulama kabiliyeti kazanır. User story / iş kuralı / ekran akışı standartlarını dikkate alarak tanımlar.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Delivery", focus: "Sürece Uyum & Disiplin", description: "Dahil olduğu ürünün müşteri yaklaşımına sahiptir. Stabil ve sürdürülebilir ürün kavramına hakimdir. Gecikme veya belirsizlikleri erken bildirir.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Quality Assurance", focus: "Ortam & Senaryo Disiplini", description: "Ekip içi / müşteri test süreçlerine katılım sağlar. Test ortamı/UAT/Prod ayrımlarını bilir. Issue'ları gereken standartta açabilir.", targetScore: 4 },
    { area: "Customer Insight", skill: "Fluency with Data", focus: "Veri Noktalarını Tanıma", description: "Kullandığı uygulamaların veri kaynağını bilir. Müşteri / ürün bazında verileri toplar ve sunar.", targetScore: 4 },
    { area: "Customer Insight", skill: "Voice of the Customer", focus: "Müşteri Söylediğini Doğru Anlama ve Aktarma", description: "Müşterilerden gelen şikayetleri/talepleri doğru kategoriye ayırabilir. SPK mevzuatını düzenli olarak okur.", targetScore: 4 },
    { area: "Customer Insight", skill: "User Experience Design", focus: "Akışları Doğru Takip", description: "Kullandığı ekranların hangi iş akışına hizmet ettiğini bilir. Kullanıcı deneyimi bakış açısıyla bakmayı öğrenir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Business Outcome Ownership", focus: "Sonuç Farkındalığı", description: "Temel son kullanıcı değerlerini bilir. Yaptığı işin hangi operasyonel çıktıyı etkilediğini anlar.", targetScore: 4 },
    { area: "Product Strategy", skill: "Product Vision & Roadmapping", focus: "Yönü Anlama", description: "Grubun ürünlerinin hedeflerini, vizyonunu ve değer önerisini temel seviyede açıklayabilir. Yol haritasını bilir ve takip eder.", targetScore: 4 },
    { area: "Product Strategy", skill: "Strategic Impact", focus: "Etkiyi Fark Etme", description: "Stratejik karar alma süreçlerindeki faktörleri öğrenir. Kısa vadeli çözüm ile kalıcı çözüm arasındaki farkı ayırt eder.", targetScore: 4 },
    { area: "Influencing People", skill: "Stakeholder Management", focus: "Doğru Aktarım", description: "Hem kendi grubundaki hem de müşteri tarafındaki rolleri öğrenir. Paydaştan gelen talep veya geri bildirimi yorum katmadan doğru aktarır.", targetScore: 4 },
    { area: "Influencing People", skill: "Team Leadership", focus: "Takım Disiplini", description: "Öğrenme sürecini kendi kendine yönetir. Ekip içi bilgi paylaşımına aktif olarak katılır.", targetScore: 4 },
    { area: "Influencing People", skill: "Managing Up", focus: "Doğru Bilgi Akışı", description: "Kendisinden beklentileri kesin bir şekilde anlar. Risk veya hata görürse inisiyatif alır ve dikkat çeker.", targetScore: 4 },
  ],
  A2: [
    { area: "Product Execution", skill: "Feature Specification", focus: "Tutarlılık & Risk Farkındalığı", description: "Sermaye piyasaları mevzuatına orta seviyede hakimdir. Gereksinimleri uçtan uca senaryo mantığıyla yazar. Edge-case'leri tanımlar.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Delivery", focus: "Bağımlılık Farkındalığı", description: "Hizmet verilen kurumların sistemlerini tanır. Teslim sonrası hataları öngörür. Versiyon planını takip eder.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Quality Assurance", focus: "Test Disiplini ve Kombinasyon Farkındalığı", description: "L2 seviyesindeki sorunları bağımsız çözer. Birden çok özelliğin birbiriyle ilişkisini anlayabilir. Performans testini yapabilir.", targetScore: 4 },
    { area: "Customer Insight", skill: "Fluency with Data", focus: "Veriyle Anlam Kurma", description: "Kendi portföyündeki müşterilerin kullanım verilerini analiz eder. Monitoring tool üzerinde izleme yapabilir.", targetScore: 4 },
    { area: "Customer Insight", skill: "Voice of the Customer", focus: "Talep–Sorun Ayrımı", description: "Müşterinin söylediği çözüm ile yaşadığı gerçek problemi ayırt eder (design thinking). İş argümanına çevirir.", targetScore: 4 },
    { area: "Customer Insight", skill: "User Experience Design", focus: "Hata ve Risk Noktalarını Görme", description: "Kullanıcıyı hataya sürükleyen ekran veya akışları fark eder. Figma'nın temel fonksiyonlarını kullanabilir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Business Outcome Ownership", focus: "Operasyonel Etki Bilinci", description: "Bir fonksiyonun yanlış çalışmasının kurum ve müşteri tarafındaki sonucunu yorumlayabilir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Product Vision & Roadmapping", focus: "Yol Haritası Bağlamı", description: "Sorumlusu olduğu ürünlerin hedeflerine ve vizyonuna hakimdir. Bunları müşterilere açıklayabilir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Strategic Impact", focus: "Etkiyi Yorumlama", description: "Stratejik karar alma süreçlerine somut katkıda bulunabilir. Kısa vadeli kazanımların uzun vadeli risklerini işaretler.", targetScore: 4 },
    { area: "Influencing People", skill: "Stakeholder Management", focus: "Bağlamı Görme", description: "Kendi grubundaki tüm ekip arkadaşlarıyla iyi çalışma ilişkisi içindedir. Müşterideki paydaşlarla güven oluşturmuştur.", targetScore: 4 },
    { area: "Influencing People", skill: "Team Leadership", focus: "Güvenilir Takım Üyesi", description: "A1 seviyesindeki ekip arkadaşlarına örnek olur. Proaktiftir, gördüğü problemleri kendisine sorulmadan gündeme getirir.", targetScore: 4 },
    { area: "Influencing People", skill: "Managing Up", focus: "Risk Sinyali", description: "Kendisinden beklenler ile ilgili öngörü sahibidir ve proaktif paylaşır. Karar verme süreçlerine katkı sunar.", targetScore: 4 },
  ],
  "ÜY1": [
    { area: "Product Execution", skill: "Feature Specification", focus: "Problem & Çözüm Netliği", description: "Temel konuların yürütümünü A1-2 seviyeleri ile yapar. Müşteriyle kapsam ve analiz dokümanını tek başına hazırlayabilir.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Delivery", focus: "Kontrollü Teslim", description: "Orta büyüklükteki entegrasyon/sürüm geçiş süreçlerini tek başına yürütebilir. Dar kapsamlı müşterinin canlıya çıkışını koordine eder.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Quality Assurance", focus: "Test Kapsamı Sahipliği", description: "Versiyonun kalitesinden birincil derecede sorumludur. Canlıya çıkış sonrası yakın takip yapar ve monitoring ile hataları öngörür.", targetScore: 4 },
    { area: "Customer Insight", skill: "Fluency with Data", focus: "Karar Öncesi Veri Kullanımı", description: "Müşteri için önemli olan veriyi bilir. Destek KPI'larını bilir ve aksiyonlarını bu bilinçle alır.", targetScore: 4 },
    { area: "Customer Insight", skill: "Voice of the Customer", focus: "Doğru Temsil", description: "Geniş kapsamlı ve birden fazla dar kapsamlı müşterinin temsilciliğini tek başına yapabilir.", targetScore: 4 },
    { area: "Customer Insight", skill: "User Experience Design", focus: "Kullanılabilirlik Sahipliği", description: "Mevcut kullanıcı deneyiminin kalitesini ölçüm metotları kullanarak değerlendirebilir. Somut önerilerde bulunabilir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Business Outcome Ownership", focus: "Sonuca Sahip Çıkma", description: "Grubundaki ürünlerin müşterilere oluşturduğu katma değeri tam olarak bilir. Riskli müşterileri bilir ve planlama yapar.", targetScore: 4 },
    { area: "Product Strategy", skill: "Product Vision & Roadmapping", focus: "Yönü Takip Etme", description: "Roadmap'te tanımlı önceliklere göre işlerini şekillendirir. Sprint'leri doğrultuda takip eder.", targetScore: 4 },
    { area: "Product Strategy", skill: "Strategic Impact", focus: "Kararların Etkisini Takip", description: "Aldığı kararların ürün yönüne etkisini takip eder. Mevcut stratejik çerçeveyi uygular.", targetScore: 4 },
    { area: "Influencing People", skill: "Stakeholder Management", focus: "Şeffaf Koordinasyon", description: "İç ekipler ve müşteri arasında aynı bilginin dolaştığından emin olur. Çelişkili talepleri görünür hale getirir.", targetScore: 4 },
    { area: "Influencing People", skill: "Team Leadership", focus: "Temel Ekip Koordinasyonu", description: "A1 ve A2 seviyesindeki arkadaşlara örnek olur. Süreç liderliğini üstlenir. Geri bildirimleri yapıcı ve zamanında iletir.", targetScore: 4 },
    { area: "Influencing People", skill: "Managing Up", focus: "Net Sunum", description: "Hangi konunun acil olup olmadığını bilir. Üst yönetime iletilecek bilgiyi net, kısa ve bağlamlı hazırlar.", targetScore: 4 },
  ],
  "ÜY2": [
    { area: "Product Execution", skill: "Feature Specification", focus: "Kalite & Test Edilebilirlik", description: "Karmaşık işlevleri etkili bir şekilde düşünebilir. Düzenleyicilerin koyduğu kuralları anlar ve talebe dönüştürür. Global örnekleri araştırarak çıktı üretebilir.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Delivery", focus: "Güvenli Canlıya Çıkış", description: "Büyük kapsamlı müşterinin canlıya çıkışını tek başına koordine edebilir. Birden fazla geniş/dar kapsamlı müşteri temsilciliği yapabilir.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Quality Assurance", focus: "Ortam & Versiyon Bazlı Kalite", description: "Karmaşık/riskli müşteri entegrasyonunu üstlenebilir. Tüm pazar/piyasa testlerinin kapsamını bilir.", targetScore: 4 },
    { area: "Customer Insight", skill: "Fluency with Data", focus: "Anlamlı Karşılaştırma", description: "Veri setlerinden paternler çıkarabilir. Rakip ürünleri performans çıktılarıyla analiz eder. Sprint bazında verisel raporlama yapar.", targetScore: 4 },
    { area: "Customer Insight", skill: "Voice of the Customer", focus: "Dengeli Temsil", description: "Birden fazla geniş kapsamlı müşterinin temsilciliğini tek başına yapar. Karar alma sürecine müşteri sesini entegre eder.", targetScore: 4 },
    { area: "Customer Insight", skill: "User Experience Design", focus: "Hatasız ve Hızlı Deneyim", description: "Yeni ürünün tasarım süreçlerini yöneticiden bağımsız yürütebilir. Modüller arası UX tutarsızlıklarını tespit eder.", targetScore: 4 },
    { area: "Product Strategy", skill: "Business Outcome Ownership", focus: "Ölçülebilir İş Değeri", description: "Sektörü takip eder, yorumlayabilir. Müşteri baskısıyla alınan kararların iş sonuçlarını görünür kılar.", targetScore: 4 },
    { area: "Product Strategy", skill: "Product Vision & Roadmapping", focus: "Tutarlı Yol Haritası", description: "Roadmap'i öncelik ve gerekçe seti olarak yönetir. Rakip hareketlerini roadmap bağlamında değerlendirir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Strategic Impact", focus: "Bilinçli Yönlendirme", description: "Grubundaki tüm ürünlerin ve şirketin stratejik yönü hakkında ileri seviyede bilgi sahibidir. Günlük kararları vizyon ile hizalar.", targetScore: 4 },
    { area: "Influencing People", skill: "Stakeholder Management", focus: "Dengeli Yönetim", description: "Şirketteki diğer ekiplerdeki rolleri ve etki alanlarını tam olarak bilir. Satış, operasyon ve müşteri vaatlerini ürün gerçekliğiyle hizalar.", targetScore: 4 },
    { area: "Influencing People", skill: "Team Leadership", focus: "Güvenli Çalışma Ortamı", description: "Mentorluk yapar, süreçleri tasarlar ve uygular. Hataların saklanmadığı bir atmosfer yaratır.", targetScore: 4 },
    { area: "Influencing People", skill: "Managing Up", focus: "Bilinçli Eskalasyon", description: "Tekrarlayan problemleri tespit edip veri setini anlaşılabilir şekilde sunarak yöneticisi ile paylaşır.", targetScore: 4 },
  ],
  "ÜY3": [
    { area: "Product Execution", skill: "Feature Specification", focus: "Tutarlılık & Öncelik", description: "Tüm müşteri tiplerini üst seviyede bilir. Yöneticisine hiç ihtiyaç duymadan paydaşlarla netleştirir. Tek başına müşteri onboarding yapabilir.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Delivery", focus: "Zaman Öngörüsü", description: "Projeler arası zorlu trade-off kararları verir. Versiyonları öngörülebilir hale getirir. Büyük projeleri parçaya böler.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Quality Assurance", focus: "Öngörülebilir Kalite Riski", description: "Tüm müşterilerin test süreçlerinin kusursuz işlediğinden emin olur. Test otomasyonu ile yakın çalışır.", targetScore: 4 },
    { area: "Customer Insight", skill: "Fluency with Data", focus: "Veriyi Stratejik Kullanım", description: "Grubun tüm müşterileriyle ilgili içgörü analizleri yapabilir. Verileri satış argümanlarına dönüştürür.", targetScore: 4 },
    { area: "Customer Insight", skill: "Voice of the Customer", focus: "Müşteri Sinyallerinde Öngörü", description: "Stratejik değeri en yüksek müşterilerin temsilciliğini tek başına yapabilir. SPK bültenlerini takip eder.", targetScore: 4 },
    { area: "Customer Insight", skill: "User Experience Design", focus: "Hatasız ve Hızlı Deneyim", description: "Fintech tasarım uygulamalarını araştırarak güncel kalır. Şirketin ürünleri arasında tutarlılık sağlayabilir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Business Outcome Ownership", focus: "Öngörülebilir İş Etkisi", description: "Rekabet analizi yapabilir. Benzer geliştirmelerin geçmişte yarattığı iş sonuçlarını analiz eder.", targetScore: 4 },
    { area: "Product Strategy", skill: "Product Vision & Roadmapping", focus: "Öngörülü Yön", description: "Ürünün 3-6-12 aylık evrimini teknik ve iş boyutuyla kurgular. Şirket vizyonuna hakimdir.", targetScore: 4 },
    { area: "Product Strategy", skill: "Strategic Impact", focus: "Öngörülü Stratejik Etki", description: "Hangi kararların ürünü ileri taşıdığını, hangilerinin yük eklediğini ayırt eder. Stratejiye liderlik eder.", targetScore: 4 },
    { area: "Influencing People", skill: "Stakeholder Management", focus: "Öngörülü İlişki Yönetimi", description: "Yüksek riskli ve kritik hesapları devralabilir. Yanlış beklenti oluşumunu baştan önler.", targetScore: 4 },
    { area: "Influencing People", skill: "Team Leadership", focus: "Sürdürülebilir Takım Performansı", description: "Ekibin gelişimiyle ilgili aktif gözlem yapar. Kişiler/ekipler arası yük dengesini gözetir.", targetScore: 4 },
    { area: "Influencing People", skill: "Managing Up", focus: "Güven İnşası", description: "Somut çözüm önerilerini oluşturur. Müşteri hassasiyeti ve kriz konularında doğru zamanda doğru kişilere bilgi verir.", targetScore: 4 },
  ],
  "ÜY4": [
    { area: "Product Execution", skill: "Feature Specification", focus: "Organizasyonel Standart", description: "Ekip düzeyinde değişiklikler yapar. Spesifikasyon süreçlerini sürekli iyileştirir. Piyasa bilgi birikimini kullanır. Bu alandaki tüm deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Delivery", focus: "Organizasyonel Teslim Güveni", description: "Müşteri başarısı süreçlerinin verimliliğinden ve kalitesinden birincil sorumlu. Büyük müşteri ve mevzuat risklerini kişisel olarak sahiplenir.", targetScore: 4 },
    { area: "Product Execution", skill: "Product Quality Assurance", focus: "Öngörülebilir Kalite Riski", description: "Test ve güvenlik süreçlerinin sürekli iyileşmesini sağlar. Kalite seviyelerinin şeffaf raporlanmasını ve takibini sağlar. Tüm deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Customer Insight", skill: "Fluency with Data", focus: "Veriyi Stratejik Kullanım", description: "Ürün stratejisine rehberlik eder. Verileri satış argümanlarına dönüştürür. Dönemsel raporlar oluşturur. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Customer Insight", skill: "Voice of the Customer", focus: "Müşteri Sinyallerinde Öngörü", description: "Stratejik değeri en yüksek müşterilerin temsilciliği. Şirketin ürünlerinin müşteri vizyonlarında nereye konumlanacağına hakimdir. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Customer Insight", skill: "User Experience Design", focus: "Hatasız ve Hızlı Deneyim", description: "Ürün bütünlüğünü ve müşteri bütünlüğünü optimize ederek yönlendirir. Başarılı örnekleri uygulatır. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Product Strategy", skill: "Business Outcome Ownership", focus: "Öngörülebilir İş Etkisi", description: "Grubun müşterileri için nasıl maksimum fayda üretilebileceğini değerlendirir. Net fayda–maliyet dengesini değerlendirir. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Product Strategy", skill: "Product Vision & Roadmapping", focus: "Öngörülü Yön", description: "Roadmap'in başarı oranını analiz eder. Ürünün evrimini teknik ve iş boyutuyla kurgular. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Product Strategy", skill: "Strategic Impact", focus: "Öngörülü Stratejik Etki", description: "Karar alma sürecine öncülük eder. Stratejik olarak yanlış yönde birikmiş işleri temizler. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Influencing People", skill: "Stakeholder Management", focus: "Öngörülü İlişki Yönetimi", description: "Yeni müşteri sürecini/projeyi tek başına yürütebilir. İç ekiplerin sürdürülemez talepler altında ezilmesini engeller. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Influencing People", skill: "Team Leadership", focus: "Sürdürülebilir Takım Performansı", description: "Bilginin kişilerde değil ekipte kalmasını sağlar. Ekibin potansiyelini maksimize eder. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
    { area: "Influencing People", skill: "Managing Up", focus: "Güven İnşası", description: "Müşteri hassasiyeti ve potansiyel kriz konularında doğru zamanda doğru kişilere bilgi verir. Deneyimi yaygınlaştırmaktan sorumludur.", targetScore: 4 },
  ],
};

const levelCodeMap: Record<string, string> = { a1: "A1", a2: "A2", uy1: "ÜY1", uy2: "ÜY2", uy3: "ÜY3", uy4: "ÜY4" };

// --- Tier colors ---
const tierConfig: Record<string, { bg: string; text: string; border: string }> = {
  analyst: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/30" },
  specialist: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/30" },
  manager: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30" },
  leader: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/30" },
  director: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
};

const areaColors: Record<string, string> = {
  "Product Execution": "text-blue-600 bg-blue-500/10",
  "Customer Insight": "text-emerald-600 bg-emerald-500/10",
  "Product Strategy": "text-amber-600 bg-amber-500/10",
  "Influencing People": "text-purple-600 bg-purple-500/10",
};

export default function CareerMapPage() {
  const { profile } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedMatrixLevel, setSelectedMatrixLevel] = useState("A1");
  const currentLevelIndex = 2;

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Kariyer Haritası</h1>
          <p className="text-muted-foreground">
            İnfina ürün yönetimi kariyer yolculuğunu keşfet, hedef rolünü belirle ve terfi hazırlığını takip et.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-lift">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mevcut Seviye</p>
                <p className="text-xl font-bold text-foreground">ÜY1 - Product Specialist</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Terfi Hazırlık Skoru</p>
                <p className="text-xl font-bold text-foreground">%68</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seviyedeki Süre</p>
                <p className="text-xl font-bold text-foreground">1 yıl 4 ay</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 lg:w-auto lg:inline-grid">
            <TabsTrigger value="roadmap">Kariyer Yolu</TabsTrigger>
            <TabsTrigger value="criteria">Terfi Kriterleri</TabsTrigger>
            <TabsTrigger value="competency">Yetkinlik Matrisi</TabsTrigger>
            <TabsTrigger value="evaluation">Dönemsel Değ.</TabsTrigger>
            <TabsTrigger value="tracks">PM vs TPM</TabsTrigger>
            <TabsTrigger value="responsibilities">Görev Matrisi</TabsTrigger>
            <TabsTrigger value="onetoone">1:1 Görüşmeler</TabsTrigger>
            <TabsTrigger value="questionbank">Soru Bankası</TabsTrigger>
          </TabsList>

          {/* === TAB 1: Career Roadmap === */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Terfi Yol Haritası
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-1">
                    {careerLevels.map((level, idx) => {
                      const isCurrent = idx === currentLevelIndex;
                      const isPast = idx < currentLevelIndex;
                      const isFuture = idx > currentLevelIndex;
                      const tc = tierConfig[level.tier];
                      return (
                        <div
                          key={level.id}
                          className={cn("relative flex items-start gap-4 rounded-xl p-4 transition-all cursor-pointer", isCurrent && "bg-primary/5 ring-1 ring-primary/20", selectedLevel === level.id && "bg-muted")}
                          onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                        >
                          <div className={cn("relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold", isPast && "bg-accent border-accent text-accent-foreground", isCurrent && "bg-primary border-primary text-primary-foreground animate-pulse", isFuture && "bg-muted border-border text-muted-foreground")}>
                            {level.code}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className={cn("font-semibold text-foreground", isFuture && "text-muted-foreground")}>{level.title}</h3>
                              <Badge variant="outline" className={cn("text-xs", tc.text, tc.border, tc.bg)}>{level.titleEn}</Badge>
                              {isCurrent && <Badge className="bg-primary text-primary-foreground text-xs">Mevcut</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Min. süre: {level.duration}</span>
                              {isPast && <Badge variant="outline" className="text-xs text-accent border-accent/30 bg-accent/10">Tamamlandı</Badge>}
                            </div>
                            {selectedLevel === level.id && (() => {
                              const criteria = promotionCriteria.find(c => c.levelCode === level.code);
                              return (
                                <div className="mt-4 p-4 rounded-lg bg-muted/50 space-y-4 animate-fade-in">
                                  <h4 className="text-sm font-semibold text-foreground">Terfi Gereksinimleri</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    {[
                                      { label: "Yetkinlik Matrisi (%35)", val: isPast ? 100 : isCurrent ? 72 : 0 },
                                      { label: "KPI Puanı (%35)", val: isPast ? 100 : isCurrent ? 65 : 0 },
                                      { label: "Jira Değerlendirmesi (%10)", val: isPast ? 100 : isCurrent ? 80 : 0 },
                                      { label: "Performans Notu (%20)", val: isPast ? 100 : isCurrent ? 55 : 0 },
                                    ].map(item => (
                                      <div key={item.label} className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">{item.label}</span>
                                          <span className="text-xs font-medium text-foreground">{item.val}/100</span>
                                        </div>
                                        <Progress value={item.val} className="h-2" />
                                      </div>
                                    ))}
                                  </div>
                                  {criteria && (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
                                      <div className="text-xs"><span className="text-muted-foreground">Min. süre:</span> <span className="font-medium text-foreground">{criteria.minDuration}{criteria.maxDuration ? ` – ${criteria.maxDuration}` : ""}</span></div>
                                      <div className="text-xs"><span className="text-muted-foreground">Min. puan:</span> <span className="font-bold text-primary">{criteria.minTerfiPuan}</span></div>
                                      <div className="text-xs"><span className="text-muted-foreground">Onay:</span> <span className="font-medium text-foreground">{criteria.terfiOnay.onay}</span></div>
                                    </div>
                                  )}
                                  <p className="text-xs text-muted-foreground italic">Terfi Puanı = Yetkinlik (%35) + KPI (%35) + Jira (%10) + Performans (%20) | Min. {criteria?.minTerfiPuan ?? 75} puan</p>
                                </div>
                              );
                            })()}
                          </div>
                          <ChevronRight className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", selectedLevel === level.id && "rotate-90")} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB: Terfi Kriterleri === */}
          <TabsContent value="criteria" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Terfi Kriterleri Detayları</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b-2 border-border"><th className="text-left p-3 font-semibold text-foreground">Seviye</th><th className="text-left p-3 font-semibold text-foreground">Min. Süre</th><th className="text-left p-3 font-semibold text-foreground">Yetkinlik Matrisi</th><th className="text-center p-3 font-semibold text-foreground">Jira Min.</th><th className="text-center p-3 font-semibold text-foreground">KPI Min.</th><th className="text-center p-3 font-semibold text-foreground">Perf. Min.</th><th className="text-center p-3 font-semibold text-primary">Min. Puan</th></tr></thead>
                    <tbody>
                      {promotionCriteria.map(c => (
                        <tr key={c.levelCode} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-bold text-foreground">{c.levelCode}</td>
                          <td className="p-3 text-muted-foreground">{c.minDuration}{c.maxDuration ? ` – ${c.maxDuration}` : ""}</td>
                          <td className="p-3 text-muted-foreground text-xs">{c.yetkinlikMatrisi}</td>
                          <td className="p-3 text-center font-semibold text-foreground">{c.jiraMin}</td>
                          <td className="p-3 text-center font-semibold text-foreground">{c.kpiMin}</td>
                          <td className="p-3 text-center font-semibold text-foreground">{c.performansMin}</td>
                          <td className="p-3 text-center font-bold text-primary">{c.minTerfiPuan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Terfi Puanı Formülü</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[{ w: "%35", l: "Yetkinlik Matrisi" }, { w: "%35", l: "Yarıyıl KPI Puanı" }, { w: "%10", l: "Jira Değerlendirme" }, { w: "%20", l: "Performans Değerleme" }].map(i => (
                      <div key={i.l} className="text-center p-3 rounded-lg bg-card border border-border">
                        <p className="text-2xl font-bold text-foreground">{i.w}</p>
                        <p className="text-xs text-muted-foreground">{i.l}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center italic">Minimum olması gereken puan: <span className="font-bold text-primary">75</span></p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent" />Terfi Onay Zinciri</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b-2 border-border"><th className="text-left p-3 font-semibold text-foreground">Seviye</th><th className="text-left p-3 font-semibold text-foreground">Eğitim Sertifikası</th><th className="text-left p-3 font-semibold text-amber-600">Talep</th><th className="text-left p-3 font-semibold text-blue-600">Görüş</th><th className="text-left p-3 font-semibold text-accent">Onay</th></tr></thead>
                    <tbody>
                      {promotionCriteria.map(c => (
                        <tr key={c.levelCode} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-bold text-foreground">{c.levelCode}</td>
                          <td className="p-3 text-xs text-muted-foreground">{c.egitimSertifika}</td>
                          <td className="p-3 text-sm text-foreground">{c.terfiOnay.talep}</td>
                          <td className="p-3 text-sm text-foreground">{c.terfiOnay.gorus}</td>
                          <td className="p-3 text-sm font-semibold text-foreground">{c.terfiOnay.onay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB: Yetkinlik Matrisi === */}
          <TabsContent value="competency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />Yetkinlik Matrisi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Object.keys(competencyByLevel).map(lvl => (
                    <Button key={lvl} size="sm" variant={selectedMatrixLevel === lvl ? "default" : "outline"} onClick={() => setSelectedMatrixLevel(lvl)}>{lvl}</Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Hedef puan: 4 üzerinden değerlendirme yapılır. Her yetkinlik alanı için odak ve beklenti tanımları aşağıda listelenmiştir.</p>
                <Accordion type="multiple" className="space-y-2">
                  {competencyAreas.map(area => {
                    const skills = (competencyByLevel[selectedMatrixLevel] || []).filter(s => s.area === area.key);
                    const colorClass = areaColors[area.key] || "";
                    return (
                      <AccordionItem key={area.key} value={area.key} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                            <Badge className={cn("text-xs", colorClass)}>{area.key}</Badge>
                            <span className="text-sm font-medium">{skills.length} alt yetkinlik</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 pt-2">
                          {skills.map(skill => (
                            <div key={skill.skill} className="p-4 rounded-lg border border-border/50 bg-muted/20 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm text-foreground">{skill.skill}</h4>
                                <Badge variant="outline" className="text-xs">Hedef: {skill.targetScore}/4</Badge>
                              </div>
                              <p className="text-xs font-medium text-primary">Odak: {skill.focus}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB: Dönemsel Değerlendirme === */}
          <TabsContent value="evaluation" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" />Dönemsel Değerlendirme Formu</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Değerlendirme Süreci</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Her kişi için bir Excel dosyası oluşturulur</li>
                    <li>Her dönem (6 aylık) için bir sayfa açılır</li>
                    <li>Dönem başında önceki dönemdeki ödevler değerlendirilir</li>
                    <li>Ayda 1 veya en az 3 ayda 1 kere 1:1 yapılır</li>
                    <li>Dönem değerleme puanı hesaplanır (12 yetkinlik × 4 üzerinden)</li>
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-border/50">
                    <CardHeader className="pb-3"><CardTitle className="text-base">Yetkinlik Değerlendirme Alanları</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {competencyAreas.map(area => (
                          <div key={area.key} className="p-3 rounded-lg bg-muted/30">
                            <Badge className={cn("text-xs mb-2", areaColors[area.key])}>{area.key}</Badge>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {area.skills.map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardHeader className="pb-3"><CardTitle className="text-base">Dönemsel Hedef ve Ödevler Yapısı</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">En az 1 ana alan ve alt başlıkta hedef/ödev verilmelidir.</p>
                      <div className="space-y-2">
                        {["Mevcut Durum", "Olması Gereken", "Aksiyonlar", "Beklentiler"].map((b, i) => (
                          <div key={b} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</div>
                            <span className="text-sm font-medium text-foreground">{b}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <h4 className="text-sm font-semibold text-foreground mb-1">Dönem Değerleme Puanı Hesaplama</h4>
                  <p className="text-sm text-muted-foreground">12 yetkinlik × Hedef 4 puan = Toplam 48 puan üzerinden. Yüzdelik olarak hesaplanır. Değerlendirme notu 100 üzerinden min. 80 olmalıdır.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB: PM vs TPM === */}
          <TabsContent value="tracks" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><ArrowLeftRight className="h-5 w-5 text-accent" />İkili Kariyer Patikası: PM vs TPM</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-0 items-stretch">
                  <div className="p-3 text-center font-bold text-sm bg-blue-500/10 text-blue-600 rounded-tl-lg border-b border-border">Ürün Yöneticisi (PM)</div>
                  <div className="p-3 text-center font-bold text-sm bg-muted text-muted-foreground border-b border-border">Seviye</div>
                  <div className="p-3 text-center font-bold text-sm bg-emerald-500/10 text-emerald-600 rounded-tr-lg border-b border-border">Teknik Ürün Yöneticisi (TPM)</div>
                  {dualTrack.map((row, idx) => (
                    <div key={row.level} className="contents">
                      <div className={cn("p-3 text-sm text-foreground border-b border-border", idx % 2 === 0 && "bg-muted/30")}>{row.pmTitle}</div>
                      <div className={cn("p-3 text-center text-sm font-bold border-b border-border flex items-center justify-center gap-1", idx % 2 === 0 && "bg-muted/30", idx === currentLevelIndex && "text-primary")}>{row.level}{idx < dualTrack.length - 1 && <ArrowUp className="h-3 w-3 text-muted-foreground" />}</div>
                      <div className={cn("p-3 text-sm text-foreground border-b border-border", idx % 2 === 0 && "bg-muted/30")}>{row.tpmTitle}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">ÜY1 seviyesinden itibaren PM ve TPM yolları ayrışır. Her iki yol da eşit kariyer fırsatları sunar. Yan geçişler mümkündür.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Rol Nitelikleri Karşılaştırması</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border"><th className="text-left p-3 font-semibold text-foreground">Kriter</th><th className="text-left p-3 font-semibold text-blue-600">PM</th><th className="text-left p-3 font-semibold text-emerald-600">TPM</th></tr></thead>
                    <tbody>{roleComparisons.map(row => (<tr key={row.kriter} className="border-b border-border/50 hover:bg-muted/30 transition-colors"><td className="p-3 font-medium text-foreground">{row.kriter}</td><td className="p-3 text-muted-foreground">{row.pm}</td><td className="p-3 text-muted-foreground">{row.tpm}</td></tr>))}</tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB: Responsibilities Matrix === */}
          <TabsContent value="responsibilities" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Rollerden Beklenen Görevler</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border"><th className="text-left p-3 font-semibold text-foreground min-w-[140px]">Alan</th><th className="text-left p-3 font-semibold text-blue-600 min-w-[200px]">PM</th><th className="text-left p-3 font-semibold text-emerald-600 min-w-[200px]">TPM</th><th className="text-left p-3 font-semibold text-purple-600 min-w-[200px]">Ürün Mimarı</th></tr></thead>
                    <tbody>
                      {[
                        { alan: "Ana Odak", pm: "Ürünün iş değeri ve müşteri ihtiyaçları", tpm: "Ürünün teknik kararlılığı, bakım, regülasyon ve entegrasyon uyumu", arch: "Ürün hattının uzun vadeli mimari vizyonu ve entegrasyon bütünlüğü" },
                        { alan: "Müşteri İlişkisi", pm: "Müşteri toplantıları, ihtiyaç analizi, demo", tpm: "Teknik içerikli müşteri görüşmeleri", arch: "Ürünler arası entegrasyon ve roadmap uyumu" },
                        { alan: "Regülasyon", pm: "Regülasyonların iş etkisini anlamak", tpm: "Teknik etkilerini analiz etmek, deadline uyumu", arch: "Ürün mimarisine etkisini önceden öngörmek" },
                        { alan: "Roadmap", pm: "Yeni özellikler, büyüme alanları, müşteri değerine göre öncelik", tpm: "Teknik yapılabilirliği değerlendirme", arch: "Tüm ürün hattı için mimari uyumu sağlama" },
                        { alan: "Deployment", pm: "Prod, ODM, müşteri test ortamlarının takibi", tpm: "Yükleme süreçleri koordinasyonu, log takibi", arch: "İyileştirme noktalarının belirlenmesi" },
                        { alan: "Backlog Yönetimi", pm: "İş gereksinimleri, kullanıcı hikayeleri, kabul kriterleri", tpm: "Teknik backlog (entegrasyon, hata, bakım)", arch: "Backlog'lara mimari rehberlik sağlar" },
                        { alan: "Sprint Katkısı", pm: "Build ekibinde yeni özellikleri yönlendirir", tpm: "Run ekibinde bakım, regülasyon ve teknik işler", arch: "Sprint'lere doğrudan girmez, tasarım danışmanı" },
                        { alan: "Ekip İlişkisi", pm: "Satış, müşteri destek, UX, analistler", tpm: "Developer, QA, DevOps, teknik mimar", arch: "PM, TPM ve CTO ekibi ile yatay çalışır" },
                      ].map(row => (<tr key={row.alan} className="border-b border-border/50 hover:bg-muted/30 transition-colors"><td className="p-3 font-medium text-foreground">{row.alan}</td><td className="p-3 text-muted-foreground">{row.pm}</td><td className="p-3 text-muted-foreground">{row.tpm}</td><td className="p-3 text-muted-foreground">{row.arch}</td></tr>))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TAB: 1:1 Meetings === */}
          <TabsContent value="onetoone" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent" />1:1 Görüşme Sıklığı</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {oneToOneData.map(item => (
                      <div key={item.profil} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <Badge variant="outline" className="shrink-0">{item.siklik}</Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{item.profil}</p>
                          <p className="text-xs text-muted-foreground">{item.amac}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />Görüşme Akışı (40dk)</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetingFlow.map(step => (
                      <div key={step.step} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{step.step}</div>
                          <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                          <Badge variant="outline" className="ml-auto text-xs">{step.duration}</Badge>
                        </div>
                        <div className="ml-9 space-y-1">
                          {step.questions.map((q, qi) => (<p key={qi} className="text-xs text-muted-foreground flex items-start gap-1.5"><span className="text-primary mt-0.5">•</span>{q}</p>))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* === TAB: Soru Bankası === */}
          <TabsContent value="questionbank" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-blue-600"><MessageSquare className="h-5 w-5" />Sen Sor</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">Çalışana sorulacak sorular:</p>
                  <div className="space-y-2">
                    {senSorSorulari.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold">{i + 1}</div>
                        <p className="text-sm text-foreground">{s}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-emerald-600"><MessageSquare className="h-5 w-5" />Sen Anlat</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">Yöneticinin çalışana aktarması gereken konular:</p>
                  <div className="space-y-2">
                    {senAnlatSorulari.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">{i + 1}</div>
                        <p className="text-sm text-foreground">{s}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
