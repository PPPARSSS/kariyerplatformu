<div align="center">

# İnfina Core — Kariyer Platformu

**Kurumsal kariyer geliştirme, stajyer yönetimi ve organizasyonel büyüme için eksiksiz bir platform.**

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.98.0-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

[Genel Bakış](#-genel-bakış) •
[Özellikler](#-özellikler) •
[Mimari](#-mimari) •
[Teknolojiler](#-teknoloji-yığını) •
[Kurulum](#-kurulum) •
[API Referansı](#-api-referansı) •
[Veritabanı](#-veritabanı-şeması) •
[Roller & İzinler](#-roller--izinler)

</div>

---

## Genel Bakış

İnfina Core Kariyer Platformu; stajyerlerden üst yöneticilere kadar tüm organizasyonu kapsayan, **kariyer yolları**, **eğitim programları**, **performans değerlendirmeleri** ve **insan kaynakları analitiği** konularında bütüncül bir çözüm sunar.

Platform; modern glassmorphism tasarım dili, rol tabanlı erişim kontrolü ve gerçek zamanlı veri yönetimi ile kurumsal kullanıma hazır biçimde geliştirilmiştir.

### Temel Hedefler

- Kariyer gelişim süreçlerini şeffaf ve ölçülebilir hale getirmek
- Stajyer ve çalışan eğitimlerini merkezi olarak yönetmek
- Yöneticilere ve İK'ya gerçek zamanlı analitik sağlamak
- Organizasyonel yapı ve ekip yönetimini kolaylaştırmak

---

## Özellikler

### Çalışan & Stajyer Deneyimi
- **Ana Pano** — Kişiselleştirilmiş istatistikler, aktif kurslar, aktivite akışı, yaklaşan görevler
- **Kurs Kataloğu** — Tüm eğitim içeriklerine göz atma ve filtreleme
- **Beceri Ağacı / İlerleme** — Görsel öğrenme yolu ve tamamlama takibi
- **Stajyer Programları** — Eğitim programları, dersler ve değerlendirmeler
- **İngilizce Modülü** — Dil geliştirme içerikleri
- **Soft Beceriler** — Kişisel gelişim kursları
- **Kariyer Haritası** — Kişisel kariyer seviyesi ve yol haritası
- **Topluluk & Yarışmalar** — İç ağ ve rekabetçi görevler
- **Haftalık Filmler** — Eğitim video içerikleri
- **Haberler & Makaleler** — Şirket güncellemeleri ve bilgi bankası

### Yönetici & Lider Araçları
- **Kariyer Yolu Editörü** — Ağaç yapısında sürükle-bırak kariyer düğümü oluşturma
- **Organizasyon Görünümü** — Ekip yapısı ve hiyerarşi yönetimi
- **İK Analitiği** — KPI panolar, departman istatistikleri, risk uyarıları
- **Takım Arkadaşları** — Ekip profilleri ve yönetimi
- **Liderlik & Kurumsal** — Üst düzey eğitim modülleri

### Süper Admin
- **Kullanıcı Yönetimi** — Rol atama, arama ve filtreleme
- **İzin Matrisi** — Rol tabanlı sayfa erişim kontrolü
- **Prosedür Yönetimi** — Şirket prosedürleri oluşturma ve düzenleme

---

## Mimari

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│  Port: 8080 (dev)                                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Hooks   │  │  Config  │   │
│  │ (23 adet)│  │ (shadcn) │  │ useAuth  │  │permissions│  │
│  └────┬─────┘  └──────────┘  └──────────┘  └──────────┘   │
│       │ React Query / Fetch API                              │
└───────┼─────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Express)                        │
│  Port: 3000                                                  │
│                                                              │
│  Routes → Controllers → Services → Supabase Client          │
│                                                              │
│  /api/users  /api/interns  /api/careers  /api/procedures    │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL)                     │
│                                                              │
│  Auth (JWT) + RLS Policies + 10 Tablo + Triggerlar          │
└─────────────────────────────────────────────────────────────┘
```

### Mimari Kararlar

| Karar | Gerekçe |
|-------|---------|
| Frontend Supabase'i doğrudan sorgulamaz | Tüm veri erişimi Express backend üzerinden geçer; güvenlik katmanı korunur |
| Rol tabanlı erişim iki katmanda | Hem React (ProtectedRoute) hem PostgreSQL (RLS) seviyesinde uygulanır |
| Express 5 (beta) | Async hata yönetimi ve modern middleware desteği |
| TanStack Query | Önbellekleme, yeniden doğrulama ve optimistik güncellemeler |

---

## Teknoloji Yığını

### Frontend

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| **React** | 18.3.1 | UI çerçevesi |
| **TypeScript** | 5.8.3 | Tür güvenliği |
| **Vite** | 5.4.19 | Hızlı derleme ve HMR |
| **Tailwind CSS** | 3.4.17 | Utility-first stil sistemi |
| **shadcn/ui** | latest | Radix UI tabanlı bileşen kitaplığı |
| **React Router DOM** | 6.30.1 | İstemci taraflı yönlendirme |
| **TanStack Query** | 5.83.0 | Sunucu durumu yönetimi |
| **React Hook Form** | 7.61.1 | Form yönetimi |
| **Zod** | latest | Şema doğrulama |
| **Recharts** | 2.15.4 | Veri görselleştirme |
| **Supabase JS** | 2.98.0 | Auth entegrasyonu |
| **Sonner** | latest | Toast bildirimleri |
| **next-themes** | latest | Açık/koyu tema desteği |
| **Embla Carousel** | latest | Slider bileşeni |
| **Lucide React** | latest | İkon seti |

### Backend

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| **Node.js** | 20 (Alpine) | Çalışma ortamı |
| **Express.js** | 5.2.1 | REST API çerçevesi |
| **Supabase JS** | 2.98.0 | Veritabanı istemcisi |
| **dotenv** | latest | Ortam değişkenleri |
| **CORS** | latest | Cross-Origin istek yönetimi |

### Altyapı & Dağıtım

| Teknoloji | Amaç |
|-----------|------|
| **Supabase** | PostgreSQL veritabanı, kimlik doğrulama, RLS |
| **Docker** | Konteynerleştirme |
| **HuggingFace Spaces** | Bulut dağıtımı (port 7860) |
| **Git** | Sürüm kontrolü |

---

## Proje Yapısı

```
kariyer-platformu/
├── frontend/                        # React + Vite uygulaması
│   ├── src/
│   │   ├── App.tsx                  # Ana yönlendirme ve provider kurulumu
│   │   ├── main.tsx                 # Giriş noktası
│   │   ├── pages/                   # 23 sayfa bileşeni
│   │   │   ├── Index.tsx            # Ana pano
│   │   │   ├── Auth.tsx             # Giriş / Kayıt
│   │   │   ├── Intern.tsx           # Stajyer programları
│   │   │   ├── CareerMap.tsx        # Kariyer haritası
│   │   │   ├── CareerPathEditor.tsx # Kariyer yolu editörü
│   │   │   ├── HrAnalytics.tsx      # İK analitiği
│   │   │   ├── AdminUsers.tsx       # Kullanıcı yönetimi
│   │   │   └── ...                  # Diğer sayfa bileşenleri
│   │   ├── components/
│   │   │   ├── layout/              # MainLayout, AppSidebar, Header
│   │   │   ├── dashboard/           # Pano widget bileşenleri
│   │   │   ├── ui/                  # 30+ shadcn/ui bileşeni
│   │   │   └── ProtectedRoute.tsx   # Rol tabanlı route koruma
│   │   ├── hooks/
│   │   │   ├── useAuth.tsx          # Auth context ve rol yönetimi
│   │   │   └── use-toast.ts         # Toast bildirimleri
│   │   ├── config/
│   │   │   ├── api.ts               # Merkezi API URL yapılandırması
│   │   │   └── permissions.ts       # Ekran izin tanımları
│   │   ├── integrations/
│   │   │   └── supabase/
│   │   │       └── client.ts        # Supabase istemci kurulumu
│   │   └── supabase/
│   │       └── migrations/          # SQL migrasyon dosyaları
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                         # Express.js REST API
│   ├── server.js                    # Uygulama giriş noktası
│   ├── src/
│   │   ├── config/
│   │   │   └── supabaseClient.js    # Supabase bağlantısı
│   │   ├── routes/                  # Rota tanımları
│   │   │   ├── user.routes.js
│   │   │   ├── intern.routes.js
│   │   │   ├── career.routes.js
│   │   │   └── procedure.routes.js
│   │   ├── controllers/             # HTTP istek işleyicileri
│   │   │   ├── user.controller.js
│   │   │   ├── intern.controller.js
│   │   │   ├── career.controller.js
│   │   │   └── procedure.controller.js
│   │   └── services/                # İş mantığı ve Supabase sorguları
│   │       ├── user.service.js
│   │       ├── intern.service.js
│   │       ├── career.service.js
│   │       └── procedure.service.js
│   └── package.json
│
├── hf_space/                        # HuggingFace Spaces dağıtımı
│   ├── Dockerfile
│   ├── backend/                     # Backend kopyası
│   └── frontend/                    # Frontend kopyası
│
├── GEMINI.md                        # Proje spesifikasyonu ve tasarım belgesi
└── README.md                        # Bu dosya
```

---

## Sayfalar

| Sayfa | Bileşen | Minimum Rol | Açıklama |
|-------|---------|-------------|----------|
| `/auth` | Auth | Herkese açık | Giriş / Kayıt |
| `/` | Index | stajyer | Ana pano |
| `/catalog` | Catalog | stajyer | Kurs kataloğu |
| `/progress` | Progress | stajyer | Beceri ağacı ve öğrenme ilerlemesi |
| `/english` | English | stajyer | İngilizce eğitim modülü |
| `/soft-skills` | SoftSkills | stajyer | Soft beceri kursları |
| `/intern` | Intern | stajyer | Stajyer program yönetimi |
| `/onboarding` | Onboarding | stajyer | İşe alım süreci |
| `/community` | Community | stajyer | İç topluluk ve ağ |
| `/competitions` | Competitions | stajyer | Yarışmalar ve meydan okumalar |
| `/films` | Films | stajyer | Eğitim video içerikleri |
| `/news` | News | stajyer | Şirket haberleri |
| `/articles` | Articles | stajyer | Bilgi bankası makaleleri |
| `/settings` | Settings | stajyer | Profil ve tercih ayarları |
| `/career-map` | CareerMap | personel | Kariyer gelişim görselleştirme |
| `/leadership` | Leadership | personel | Liderlik eğitimi |
| `/corporate` | Corporate | personel | Kurumsal eğitim ve oryantasyon |
| `/teammates` | Teammates | personel | Ekip profilleri |
| `/organization` | Organization | takim_lideri | Organizasyon yapısı |
| `/career-path-editor` | CareerPathEditor | yonetici | Kariyer yolu oluşturma ve düzenleme |
| `/hr-analytics` | HrAnalytics | yonetici | İK KPI'ları ve analitik |
| `/admin/users` | AdminUsers | ust_yonetici | Kullanıcı ve rol yönetimi |

---

## Kurulum

### Ön Gereksinimler

- **Node.js** >= 20
- **npm** >= 9
- **Supabase** hesabı ve projesi

### 1. Depoyu Klonlayın

```bash
git clone <repo-url>
cd "Kariyer Platformu"
```

### 2. Backend Kurulumu

```bash
cd backend
npm install
```

`backend/.env` dosyası oluşturun:

```env
SUPABASE_URL=https://<proje-id>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
PORT=3000
```

Backend'i başlatın:

```bash
node server.js
# veya geliştirme modunda:
npm run dev
```

Backend `http://localhost:3000` adresinde çalışır.

### 3. Frontend Kurulumu

```bash
cd frontend
npm install
```

İsteğe bağlı olarak `frontend/.env` dosyası oluşturun:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://<proje-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Frontend'i başlatın:

```bash
npm run dev
# Uygulama http://localhost:8080 adresinde açılır
```

### 4. Veritabanı Kurulumu

Supabase projenizde SQL Editörü'nü açın ve `frontend/src/supabase/migrations/` klasöründeki migrasyon dosyalarını sırasıyla çalıştırın.

### 5. Docker ile Çalıştırma (HuggingFace Spaces)

```bash
cd hf_space
docker build -t kariyer-platform .
docker run -p 7860:7860 \
  -e SUPABASE_URL=<url> \
  -e SUPABASE_ANON_KEY=<key> \
  kariyer-platform
```

Uygulama `http://localhost:7860` adresinde erişilebilir olur.

---

## API Referansı

**Temel URL**: `http://localhost:3000/api`

### Durum Kontrolü

```
GET /api/status
→ { "status": "running", "skills": "active" }
```

---

### Kullanıcı Yönetimi `/api/users`

| Metot | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/api/users` | Tüm kullanıcıları rolleriyle listele |
| `GET` | `/api/users/profiles` | Tüm profil özetleri |
| `GET` | `/api/users/:id/profile` | Tekil kullanıcı profili |
| `GET` | `/api/users/:id/roles` | Kullanıcı rolleri |
| `PUT` | `/api/users/:id/roles` | Kullanıcı rollerini güncelle |

---

### Stajyer Programları `/api/interns`

| Metot | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/api/interns/programs` | Program listesi |
| `POST` | `/api/interns/programs` | Program oluştur |
| `GET` | `/api/interns/lessons` | Ders listesi |
| `POST` | `/api/interns/lessons` | Ders ekle |
| `GET` | `/api/interns/evaluations` | Değerlendirme listesi |
| `POST` | `/api/interns/evaluations` | Değerlendirme oluştur |
| `GET` | `/api/interns/evaluation-parameters` | Değerlendirme parametreleri |
| `POST` | `/api/interns/evaluation-parameters` | Parametre oluştur |
| `GET` | `/api/interns/assignments` | Program atamaları |
| `DELETE` | `/api/interns/:table/:id` | Tablodan öğe sil |

---

### Kariyer Yolları `/api/careers`

| Metot | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/api/careers/paths` | Kariyer yollarını listele |
| `POST` | `/api/careers/paths` | Kariyer yolu oluştur |
| `GET` | `/api/careers/nodes` | Düğümleri getir (`?pathId=uuid` ile filtrele) |
| `POST` | `/api/careers/nodes` | Düğüm oluştur |
| `PUT` | `/api/careers/nodes/:id` | Düğüm güncelle |
| `DELETE` | `/api/careers/nodes/:id` | Düğüm sil |

---

### Prosedürler `/api/procedures`

| Metot | Endpoint | Açıklama |
|-------|----------|----------|
| `GET` | `/api/procedures` | Şirket prosedürleri listesi |
| `POST` | `/api/procedures` | Prosedür ekle |
| `DELETE` | `/api/procedures/:id` | Prosedür sil |

---

## Veritabanı Şeması

### Tablo Listesi

| Tablo | Açıklama |
|-------|----------|
| `profiles` | Kullanıcı profilleri ve pozisyon bilgileri |
| `user_roles` | Kullanıcı-rol eşleştirmeleri |
| `career_paths` | Kişiselleştirilmiş kariyer geliştirme yolları |
| `career_nodes` | Kariyer yolu ağaç düğümleri |
| `intern_programs` | Stajyer eğitim programları |
| `intern_lessons` | Program dersleri ve içerikleri |
| `evaluation_parameters` | Değerlendirme ağırlık kriterleri |
| `intern_evaluations` | Değerlendirme kayıtları ve puanlar |
| `intern_program_assignments` | Stajyer-program atamaları |
| `procedures` | Şirket prosedürleri |

### Temel Tablolar

**`profiles`**
```sql
id              UUID PRIMARY KEY
user_id         UUID REFERENCES auth.users
full_name       TEXT
avatar_url      TEXT
department      TEXT
position        TEXT
level           TEXT
manager_id      UUID REFERENCES profiles(id)
target_role     TEXT
phone           TEXT
bio             TEXT
start_date      DATE
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

**`user_roles`**
```sql
id       UUID PRIMARY KEY
user_id  UUID REFERENCES auth.users
role     app_role  -- ENUM: stajyer | personel | takim_lideri | yonetici | ust_yonetici | ik
```

**`career_nodes`**
```sql
id              UUID PRIMARY KEY
career_path_id  UUID REFERENCES career_paths
parent_node_id  UUID REFERENCES career_nodes (öz referans)
title           TEXT
node_type       TEXT  -- skill | training | project | exam | assignment | milestone
status          TEXT  -- locked | in_progress | completed
priority        INT
difficulty      TEXT  -- kolay | orta | zor | ileri
description     TEXT
requirements    TEXT
resources       TEXT
estimated_hours INT
position_x      FLOAT
position_y      FLOAT
```

**`intern_evaluations`**
```sql
id               UUID PRIMARY KEY
intern_user_id   UUID REFERENCES auth.users
program_id       UUID REFERENCES intern_programs
parameter_id     UUID REFERENCES evaluation_parameters
evaluation_type  TEXT  -- custom | quiz | report | project
title            TEXT
score            NUMERIC
max_score        NUMERIC
notes            TEXT
evaluated_by     UUID REFERENCES auth.users
```

### Güvenlik

- **Row-Level Security (RLS)** tüm tablolarda aktif
- `has_role()` ve `is_manager_of()` güvenlik fonksiyonları
- Kayıt sırasında otomatik profil oluşturma (trigger)
- `updated_at` alanları için otomatik güncelleme trigger'ı

---

## Roller & İzinler

### Rol Hiyerarşisi

```
stajyer  <  personel  <  takim_lideri  <  yonetici  <  ust_yonetici
                                       +  ik  (geniş erişim)
```

### İzin Matrisi

| Özellik / Sayfa | stajyer | personel | takim_lideri | yonetici | ust_yonetici | ik |
|-----------------|:-------:|:--------:|:------------:|:--------:|:------------:|:--:|
| Ana Pano | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Kurs Kataloğu | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Stajyer Programları | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Kariyer Haritası | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Organizasyon Görünümü | — | — | ✓ | ✓ | ✓ | ✓ |
| Kariyer Yolu Editörü | — | — | — | ✓ | ✓ | — |
| İK Analitiği | — | — | — | ✓ | ✓ | ✓ |
| Kullanıcı Yönetimi | — | — | — | — | ✓ | — |

### `useAuth` Hook

```tsx
const { user, role, isAtLeast, signOut } = useAuth();

// Rol kontrolü
if (isAtLeast('yonetici')) {
  // Yönetici ve üzeri roller için içerik
}

// Kullanılabilir kontroller
isAtLeast('stajyer')       // En az stajyer
isAtLeast('personel')      // En az personel
isAtLeast('takim_lideri')  // En az takım lideri
isAtLeast('yonetici')      // En az yönetici
isAtLeast('ust_yonetici')  // Üst yönetici
```

---

## Tasarım Sistemi

### Renk Paleti (İnfina Core)

| Token | Renk | Kullanım |
|-------|------|----------|
| `primary` | `#BA2031` (Kırmızı) | CTA'lar, butonlar, vurgu |
| `accent` | `#3EBEB4` (Turkuaz) | İkincil vurgu, ikonlar |
| `success` | `hsl(140, 70%, 40%)` | Tamamlanan durumlar |
| `warning` | `hsl(42, 97%, 54%)` | Uyarılar |
| `info` | `hsl(214, 85%, 33%)` | Bilgilendirme |

### Tasarım İlkeleri

- **Glassmorphism**: `backdrop-blur` ile buzlu cam efekti kartlar
- **Köşe Yuvarlaklığı**: Varsayılan `0.75rem`
- **Gölgeler**: `shadow-xl`, `shadow-glow` vurgu için
- **Gradyanlar**: `gradient-primary`, `gradient-accent`
- **Karanlık Mod**: `next-themes` ile tam destek
- **Duyarlı Tasarım**: Tüm ekran boyutları için optimize

---

## Geliştirme Kuralları

> Aşağıdaki kurallar `GEMINI.md` proje kılavuzundan alınmıştır.

1. **Veri Erişimi**: Frontend, Supabase'i **doğrudan sorgulamaz**. Tüm veri akışı `http://localhost:3000/api/...` üzerinden geçer.

2. **İş Mantığı**: Karmaşık iş kuralları backend servis dosyalarına (`*.service.js`) ait; frontend'de yer almaz.

3. **UI/UX Standartları**: Her sayfa yükleme durumu, hata sınırı ve toast bildirimi içermeli; glassmorphic tasarım diline uyulmalı.

4. **Modülerlik**: Rol tabanlı bileşenler `useAuth().isAtLeast()` yöntemi üzerinden kontrol edilir.

5. **Kod Organizasyonu**:
   - **Frontend**: Pages → Components → Hooks → Config
   - **Backend**: Routes → Controllers → Services → Supabase

---

## Kariyer Seviyeleri

Platform, aşağıdaki kariyer seviyelerini destekler:

| Seviye | Unvan | Süre |
|--------|-------|------|
| A1 | Analist I | Başlangıç |
| A2 | Analist II | 6-12 ay |
| S1 | Kıdemli Analist I | 12-24 ay |
| S2 | Kıdemli Analist II | 24-36 ay |
| L1 | Lider I | 36+ ay |
| ... | ... | ... |
| ÜYD | Ürün Direktörü | Üst düzey |

Her seviye için; süre gereklilikleri, sertifikasyon şartları, KPI hedefleri ve onay iş akışları tanımlanmıştır.

---

## Katkı Sağlama

1. Bu depoyu fork'layın
2. Özellik dalı oluşturun: `git checkout -b feature/yeni-ozellik`
3. Değişikliklerinizi commit'leyin: `git commit -m 'feat: yeni özellik ekle'`
4. Dalı push'layın: `git push origin feature/yeni-ozellik`
5. Pull Request açın

### Commit Mesajı Formatı

```
feat:     yeni özellik
fix:      hata düzeltme
refactor: kod yeniden düzenleme
style:    stil/format değişiklikleri
docs:     dokümantasyon güncellemesi
chore:    yapılandırma ve bağımlılık güncellemeleri
```

---

## Lisans

Bu proje İnfina Core bünyesinde geliştirilmektedir. Tüm hakları saklıdır.

---

<div align="center">

**İnfina Core** tarafından geliştirilmiştir.

*Kariyer gelişimini herkes için erişilebilir kılmak.*

</div>
