# 🧠 Kariyer Platformu - Project Brain & Identity

## 📌 Amacı (Purpose)
Kariyer Platformu, stajyerlerin, çalışanların ve yöneticilerin kariyer yollarını planlamak, takip etmek ve optimize etmek için tasarlanmış kapsamlı bir web uygulamasıdır. Açık, şeffaf, hedeflerle yönetilen (eğitimler, projeler, sınavlar vb.) bir çalışan deneyimini veriye dayalı ve merkezi bir platform üzerinden sunmayı hedefler.

## 🏗️ Sistem Mimarisi (Architecture)

### 🖥️ Frontend (İstemci - UI)
- **Çatı:** React.js ile Vite bundling sistemi.
- **Dil:** TypeScript ile statik tip güvenliği.
- **Tasarım Sistemi:** Tailwind CSS üzerine kurulu, Shadcn UI bileşen kütüphanesi. Modern, kullanıcı dostu ve şık arayüzler.

### ⚙️ Backend (Sunucu - API)
- **Platform:** Node.js üzerinde çalışan Express.js.
- **API Mimarisi:** Merkezi RESTful API.
- **Katmanlı Mimari:** Router -> Controller -> Service pattern'ı ile API servis yönetimi.
- **Modüller:** Intern (Stajyerler), Procedure (Prosedürler), Career Path (Kariyer yolları), Users (Profiller ve roller).

### 🗄️ Veritabanı ve Auth
- **Altyapı:** Supabase (PostgreSQL tabanlı BaaS).
- **Akış:** Frontend, kullanıcı girişleri ve oturumları (Auth) için doğrudan JWT tabanlı Supabase Auth kullanır. Veritabanı okuma/yazma (CRUD) işlemleri ise güvenlik ve iş mantığı izolasyonu gereği **tamamen** Node.js Express Backend sistemine taşınmıştır. Backend, ilgili servisler aracılığıyla Supabase ile konuşur.

## 🎨 Renk Paleti (Color Palette)
Kariyer Platformu kurumsal, modern ve "Infina" temalı premium bir renk şemasına sahiptir. Hem aydınlık hem karanlık mod (Dark Mode) desteklenir:

- **Arkaplan (Background):** `hsl(340, 33%, 97%)` (Açık temada yumuşak beyaz/açık pembe) ve `hsl(300, 2%, 10%)` (Koyu temada derin gri).
- **Yazı Rengi (Foreground):** `hsl(348, 8%, 12%)` (Açık temada koyu gri) ve `hsl(340, 10%, 92%)` (Koyu temada açık gri).
- **Primary (Infina Kırmızı):** `#BA2031` (hsl 354, 72%, 43%)
- **Accent (Infina Turkuaz):** `#3EBEB4` (hsl 174, 52%, 49%)
- **Success (Başarı):** `hsl(140, 70%, 40%)` (Yeşil)
- **Warning (Uyarı):** `hsl(42, 97%, 54%)` (Turuncu/Sarı)
- **Info (Bilgi/Eğitim):** `hsl(214, 85%, 33%)` (Mavi)

> **Tasarım Prensibi:** Uygulama içerisinde bol miktarda "glassmorphism", yuvarlatılmış köşeler (`radius: 0.75rem`), güçlü gölgeler (`shadow-xl`) ve gradyanlar (Örn: `gradient-primary`, `gradient-accent`) kullanılmaktadır. Eklenen herhangi bir yeni UI bileşeni bu gösterişli premium estetiğe ve tanımlanmış CSS değişkenlerine sıkı sıkıya uymalıdır.

## 🧠 Geliştirme Kuralları ve Prensipler
1. **Sınırlandırılmış Veri Erişimi:** Frontend'in `index.tsx` veya komponentleri üzerinden veritabanına doğrudan (Supabase Data API) sorgu atılması yasaktır. Her zaman `fetch("http://localhost:3000/api/...")` ile Backend REST endpointlerine gidilmelidir.
2. **Kapsüllenmiş Mantık:** Karmaşık iş kuralları Frontend'de değil Backend servis katmanında (`.service.js` dosyaları) bulunur.
3. **Mükemmel UI Deneyimi:** Her yeni sayfada yükleme (loading states), hata (error boundary) ve geri bildirim (toast/dialog) deneyimi Tailwind standartlarıyla sağlanmalıdır.
4. **Modülerlik:** Frontend tarafındaki yetki kontrolleri her daim `useAuth.tsx` kancası (hook) ve `isAtLeast` yaklaşımı kullanılarak yapılır.
