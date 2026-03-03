

# Uygulama Plani: Yetkinlik Matrisi ve Organizasyon Semasi Entegrasyonu

## Ozet
XLSX dokumani, urun yonetimi kariyer yolundaki her seviye (A1, A2, PM-I, PM-II, SrPM, PML) icin 4 ana alan ve 12 alt baslikta detayli yetkinlik beklentilerini, donemsel degerlendirme formunu ve 1:1 gorusme rehberini icermektedir. PDF ise Infina Yazilim organizasyon semasini icerir. Bu veriler asagidaki sayfalara entegre edilecek.

---

## 1. Kariyer Haritasi Sayfasini Zenginlestir (`src/pages/CareerMap.tsx`)

Mevcut sayfadaki "Terfi Kriterleri" sekmesi basit bir tablo gosterir. XLSX'teki detayli yetkinlik verileri ile zenginlestirilecek.

**Yeni sekme: "Yetkinlik Matrisi"**
- Her kariyer seviyesi (A1, A2, PM-I, PM-II, SrPM, PML) icin 4 ana alan gosterilecek:
  - **Product Execution**: Feature Specification, Product Delivery, Product Quality Assurance
  - **Customer Insight**: Fluency with Data, Voice of the Customer, User Experience Design
  - **Product Strategy**: Business Outcome Ownership, Product Vision & Roadmapping, Strategic Impact
  - **Influencing People**: Stakeholder Management, Team Leadership, Managing Up
- Kullanici seviye sectiginde ilgili yetkinlik kartlari accordion/collapse ile acilacak
- Her yetkinlik icin: Odak basligi, detayli beklenti tanimi, hedef puani ve degerlendirme alani

**Yeni sekme: "Donemsel Degerlendirme"**
- 6 aylik donem bazli degerlendirme form yapisi
- Mevcut Durum / Olmasi Gereken / Aksiyonlar / Beklentiler bolumlerini gosteren sablonlar
- Donem degerleme puani hesaplama gorsellestirilmesi

**1:1 Gorusme sekmesi guncelleme**
- XLSX'teki "Sen Sor" ve "Sen Anlat" soru listelerinin eklenmesi (sayfa 1'deki rehber)
- Mevcut gorusme akisi korunacak, sorular zenginlestirilecek

---

## 2. Organizasyon Semasi Sayfasi Olustur (`src/pages/Organization.tsx`)

PDF'deki organizasyon semasi icin yeni bir sayfa olusturulacak.

**Icerik:**
- Yonetim Kurulu yapisi (Kurucu Ortaklar, YK Uyeleri)
- Ust Yonetim: GMY'ler, CPO, CFO, IK Direktoru
- Ar-Ge Organizasyonu: Head of Engineering, yazilim gruplari, urun gruplari
- Urun Grubu: Urun Direktorleri, Kidemli Urun Yoneticileri, Urun Yoneticileri, Urun Yonetici Yardimcilari
- Yazilim Grubu: Jr/Mid/Sr Muhendisler, DevOps, QA
- Diger birimler: Pazarlama, Satis, Finans, IK, Idari Isler, Hukuk

**Gorsel:**
- Hiyerarsik kart yapisi (tree layout)
- Her birim icin kisi sayilari
- Tiklanabilir departman kartlari

**Yonlendirme:**
- `App.tsx`'e `/organization` rotasi eklenecek
- `AppSidebar.tsx`'e "Organizasyon" linki eklenecek (Ana Menu grubuna)

---

## 3. Takım Arkadaslari Sayfasini Guncelle (`src/pages/Teammates.tsx`)

Mevcut hardcoded veri, organizasyon semasindaki gercek departman ve pozisyon yapisiyla guncellenecek.

**Degisiklikler:**
- Departmanlar organizasyon semasindaki birimlere gore duzenlenir: Urun Grubu, Yazilim Grubu, Bilgi Teknolojileri, DevOps, Kalite Guvence, Pazarlama, Satis, Finans, IK
- Pozisyon isimleri gercek unvanlarla guncellenir (Jr. Yazilim Gelistirme Muhendisi, Urun Yonetici Yardimcisi vb.)

---

## 4. IK Analitik Sayfasini Guncelle (`src/pages/HrAnalytics.tsx`)

Departman performans verilerini organizasyon semasindaki gercek birimlere gore guncelle.

**Degisiklikler:**
- `deptStats` dizisindeki departman isimleri gercek organizasyon yapisina uyumlu hale getirilir
- Urun Grubu, Yazilim Grubu, DevOps, BT, Kalite Guvence gibi gercek birimler eklenir

---

## Teknik Detaylar

### Dosya Degisiklikleri

| Dosya | Islem |
|-------|-------|
| `src/pages/CareerMap.tsx` | Guncelle - Yetkinlik Matrisi ve Donemsel Degerlendirme sekmeleri ekle |
| `src/pages/Organization.tsx` | Yeni - Organizasyon semasi sayfasi |
| `src/pages/Teammates.tsx` | Guncelle - Departman/pozisyon verilerini duzelt |
| `src/pages/HrAnalytics.tsx` | Guncelle - Departman isimlerini duzelt |
| `src/App.tsx` | Guncelle - `/organization` rotasi ekle |
| `src/components/layout/AppSidebar.tsx` | Guncelle - Organizasyon linki ekle |

### Veri Yapisi (Yetkinlik Matrisi)

Her seviye icin 4 ana alan x 3 alt baslik = 12 yetkinlik tanimi saklanacak. Veriler statik olarak component icinde tutulacak (veritabani gerektirmez). Her yetkinlik icin:
- `area`: Ana alan (Product Execution, Customer Insight, vb.)
- `skill`: Alt baslik (Feature Specification, vb.)
- `focus`: Odak basligi
- `description`: Detayli beklenti tanimi
- `targetScore`: Hedef puan (4)
- `evaluationScore`: Degerlendirme puani

### Organizasyon Semasi Gorsel Yapisi

Organizasyon agaci icin nested Card yapisinda hiyerarsik gorunum kullanilacak. Her departman icin:
- Birim adi ve kisi sayisi
- Pozisyon listesi
- Alt birimler (collapsible)

