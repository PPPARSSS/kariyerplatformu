import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Ayarlar</h1>
          <p className="mt-1 text-muted-foreground">Hesap ve uygulama tercihleri</p>
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Profil</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label>Ad Soyad</Label><Input defaultValue="Ahmet Yılmaz" className="mt-1" /></div>
              <div><Label>E-posta</Label><Input defaultValue="ahmet@infina.com.tr" className="mt-1" /></div>
              <div><Label>Departman</Label><Input defaultValue="Ürün Yönetimi" className="mt-1" disabled /></div>
              <div><Label>Rol</Label><Input defaultValue="PM-II" className="mt-1" disabled /></div>
            </div>
            <Button>Kaydet</Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Bildirimler</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>E-posta bildirimleri</Label><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Eğitim hatırlatmaları</Label><Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Yarışma duyuruları</Label><Switch />
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" />Görünüm</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Koyu tema</Label><Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
