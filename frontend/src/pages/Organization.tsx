import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrgUnit {
  name: string;
  count?: number;
  head?: string;
  headTitle?: string;
  children?: OrgUnit[];
  positions?: string[];
}

const orgData: OrgUnit = {
  name: "Yönetim Kurulu",
  head: "Kurucu Ortaklar & YK Üyeleri",
  children: [
    {
      name: "Üst Yönetim",
      children: [
        { name: "GMY (Genel Müdür Yardımcıları)", count: 4 },
        { name: "CPO (Chief Product Officer)", count: 1 },
        { name: "CFO (Chief Financial Officer)", count: 1 },
        { name: "İK ve İdari İşler Direktörü", count: 1 },
      ],
    },
    {
      name: "Ar-Ge Merkezi",
      head: "Ar-Ge Merkezi Yöneticisi",
      children: [
        {
          name: "Mühendislik",
          head: "Head of Engineering",
          headTitle: "Mühendislik Direktörü",
          children: [
            {
              name: "Yazılım Grubu - İnfleks Varlık",
              count: 14,
              head: "Yazılım Geliştirme Direktörü",
              positions: [
                "Kıdemli Yazılım Geliştirme Mühendisi",
                "Yazılım Geliştirme Mühendisi",
                "Jr. Yazılım Geliştirme Mühendisi",
              ],
            },
            {
              name: "Yazılım Grubu - İnfleks Trade",
              count: 14,
              head: "Kıdemli Yazılım Geliştirme Direktörü",
              positions: [
                "Kıdemli Yazılım Geliştirme Mühendisi",
                "Yazılım Geliştirme Mühendisi",
                "Jr. Yazılım Geliştirme Mühendisi",
              ],
            },
            {
              name: "Yazılım Grubu - İnfleks Operasyon",
              count: 8,
              head: "Yazılım Geliştirme Ekip Lideri",
              positions: [
                "Kıdemli Yazılım Geliştirme Mühendisi",
                "Yazılım Geliştirme Mühendisi",
                "Jr. Yazılım Geliştirme Mühendisi",
              ],
            },
            {
              name: "Yazılım Grubu - FES/DES",
              count: 8,
              positions: [
                "Kıdemli Yazılım Geliştirme Mühendisi",
                "Yazılım Geliştirme Mühendisi",
                "Jr. Frontend Yazılım Mühendisi",
              ],
            },
            {
              name: "Yazılım Grubu - Services",
              count: 6,
              positions: [
                "Kıdemli Yazılım Geliştirme Mühendisi",
                "Yazılım Geliştirme Mühendisi",
              ],
            },
            {
              name: "Yazılım Grubu - I-Suite",
              count: 5,
              positions: [
                "Kıdemli Yazılım Geliştirme Mühendisi",
                "Yazılım Geliştirme Mühendisi",
              ],
            },
          ],
        },
        {
          name: "Ürün Grubu",
          count: 31,
          children: [
            {
              name: "İnfleks Varlık Ürün",
              count: 7,
              head: "Ürün Direktörü",
              positions: [
                "Kıdemli Ürün Yöneticisi",
                "Ürün Yöneticisi",
                "Ürün Yönetici Yardımcısı",
              ],
            },
            {
              name: "İnfleks Trade Ürün",
              count: 7,
              head: "Ürün Direktörü",
              positions: [
                "Kıdemli Ürün Yöneticisi",
                "Ürün Yöneticisi",
                "Ürün Yönetici Yardımcısı",
              ],
            },
            {
              name: "İnfleks Operasyon Ürün",
              count: 9,
              head: "Ürün Direktörü",
              positions: [
                "Ürün Lideri",
                "Kıdemli Ürün Yöneticisi",
                "Ürün Yöneticisi",
                "Ürün Yönetici Yardımcısı",
              ],
            },
            {
              name: "Kalite Uyum ve Geliştirme Grubu",
              count: 5,
              head: "Kalite Uyum Direktörü",
              positions: [
                "Ürün Yöneticisi",
                "Ürün Yönetici Yardımcısı",
              ],
            },
          ],
        },
        {
          name: "Bilgi Teknolojileri",
          count: 3,
          positions: [
            "Sistem ve Network Uzmanı",
            "Sistem ve Bilgi Güvenliği Uzmanı",
            "BT Destek Personeli",
          ],
        },
        {
          name: "DevOps",
          count: 3,
          head: "DevOps Direktörü",
          positions: ["DevOps Uzmanı"],
        },
        {
          name: "Kalite Güvence (QA)",
          count: 3,
          positions: [
            "Jr. Test Uzmanı",
            "Jr. Qlik Sense Yazılım Mühendisi",
          ],
        },
      ],
    },
    {
      name: "İş Geliştirme & Satış",
      children: [
        { name: "Satış", count: 3, head: "Satış Operasyon Yöneticisi" },
        { name: "İş Geliştirme", count: 11, head: "İş Geliştirme ve Stratejik Planlama Direktörü" },
        { name: "Müşteri Başarı Yönetimi", count: 3 },
      ],
    },
    {
      name: "Destek Birimleri",
      children: [
        { name: "Pazarlama", count: 3, positions: ["Pazarlama Uzmanı"] },
        { name: "Finans", count: 5, head: "Muhasebe Müdürü", positions: ["Muhasebe Uzmanı"] },
        { name: "İnsan Kaynakları", count: 3, head: "İK ve İdari İşler Uzmanı" },
        { name: "İdari İşler", count: 7, positions: ["Servis Elemanı"] },
        { name: "Hukuk", count: 1, positions: ["Avukat"] },
      ],
    },
  ],
};

function OrgNode({ unit, depth = 0 }: { unit: OrgUnit; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = unit.children && unit.children.length > 0;
  const hasPositions = unit.positions && unit.positions.length > 0;

  return (
    <div className={cn("border-l-2 pl-4", depth === 0 ? "border-primary" : depth === 1 ? "border-accent" : "border-border")}>
      <div
        className={cn("flex items-center gap-2 py-2 cursor-pointer group", hasChildren && "hover:bg-muted/30 rounded-lg px-2 -ml-2")}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />
        ) : (
          <div className="w-4" />
        )}
        <Building2 className={cn("h-4 w-4 shrink-0", depth === 0 ? "text-primary" : "text-muted-foreground")} />
        <span className={cn("font-medium text-sm", depth === 0 ? "text-foreground font-bold text-base" : "text-foreground")}>{unit.name}</span>
        {unit.count && (
          <Badge variant="secondary" className="text-xs ml-1">
            <Users className="h-3 w-3 mr-1" />{unit.count}
          </Badge>
        )}
      </div>
      {(unit.head || unit.headTitle) && (
        <div className="ml-8 mb-1">
          <p className="text-xs text-primary font-medium">{unit.headTitle || unit.head}</p>
        </div>
      )}
      {hasPositions && expanded && (
        <div className="ml-8 mb-2 flex flex-wrap gap-1">
          {unit.positions!.map(p => (
            <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
          ))}
        </div>
      )}
      {hasChildren && expanded && (
        <div className="ml-2 space-y-1">
          {unit.children!.map(child => (
            <OrgNode key={child.name} unit={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrganizationPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Organizasyon Şeması</h1>
          <p className="mt-1 text-muted-foreground">İnfina Yazılım organizasyon yapısı ve departman hiyerarşisi</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Toplam Çalışan", value: "~160", color: "bg-primary/10 text-primary" },
            { label: "Yazılım Grupları", value: "6", color: "bg-blue-500/10 text-blue-600" },
            { label: "Ürün Grupları", value: "4", color: "bg-amber-500/10 text-amber-600" },
            { label: "Departman", value: "12+", color: "bg-emerald-500/10 text-emerald-600" },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Org Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Organizasyon Ağacı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrgNode unit={orgData} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
