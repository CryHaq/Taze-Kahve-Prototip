# Web Sitesi Oluşturucu — Claude Code

Bu proje, `/site-yap` komutu ile profesyonel, benzersiz web siteleri oluşturur.

## Her Zaman İlk Yap

- **`frontend-design` skill'ini çağır** — frontend kodu yazmadan önce, her seferinde, istisnasız.
- CLAUDE.md'yi oku ve tüm kurallara uy.

---

## Tasarım Düşüncesi

Kod yazmadan ÖNCE, bağlamı anla ve CESUR bir estetik yön seç:

- **Amaç:** Bu arayüz hangi sorunu çözüyor? Kim kullanacak?
- **Ton:** Bir uç seç ve tam uygula: brutalist minimal, maksimalist kaos, retro-fütüristik, organik/doğal, lüks/rafine, oyuncu, editorial/dergi, brutalist/ham, art deco/geometrik, soft/pastel, endüstriyel...
- **Farklılaşma:** Bu siteyi UNUTULMAZ yapan ne? Birinin hatırlayacağı tek şey ne?

Net bir konsept yön seç ve hassas bir şekilde uygula. Cesur maksimalizm de, rafine minimalizm de işe yarar — önemli olan niyetlilik, yoğunluk değil.

---

## Referans Görseller

- Referans görsel verilirse: layout, spacing, tipografi ve rengi TAM eşleştir. Placeholder içerik koy. Tasarımı iyileştirme veya ekleme yapma.
- Referans görsel yoksa: sıfırdan yüksek kalitede tasarla (aşağıdaki kurallara göre).
- Çıktını screenshot'la, referansla karşılaştır, uyumsuzlukları düzelt, tekrar screenshot'la. En az 2 karşılaştırma turu yap. Görünür fark kalmayana kadar devam et.

---

## Screenshot Workflow

- Puppeteer kullanılabilir durumda.
- Screenshot aldıktan sonra PNG'yi Read tool ile oku — Claude görseli görebilir ve analiz edebilir.
- Karşılaştırırken SPESİFİK ol: "başlık 32px ama referansta ~24px görünüyor", "kart gap'i 16px ama 24px olmalı"
- Kontrol et: spacing/padding, font size/weight/line-height, renkler (exact hex), alignment, border-radius, shadows, görsel boyutları

---

## AI Slop YASAK

Bu projede oluşturulan hiçbir site generic AI çıktısı gibi görünmemeli.

### Yasak Liste
- **Fontlar:** Inter, Roboto, Arial, system-ui, system font stack'leri. Tembel, bağlamsız seçimler.
- **Renkler:** Mor gradient (#7c3aed → #3b82f6) beyaz üzerine. Default Tailwind palette (indigo-500, blue-600 vb.) birincil renk olarak. Klişe renk şemaları.
- **Layoutlar:** Cookie-cutter 3 kartlık grid, ortalanmış her şey, simetrik her şey, tahmin edilebilir component patternleri.
- **Patternler:** Aynı border-radius her yerde, aynı shadow her yerde, gradient text her yerde, `transition-all`, düz `shadow-md`.

Her tasarım FARKLI olmalı. Açık ve koyu temalar arasında değiş, farklı fontlar, farklı estetikler. ASLA ortak seçimlere yakınsama.

---

## Anti-Generic Guardrails

Bu kurallar her sitede geçerli:

### Renkler
Custom brand rengi seç ve ondan türet. Default Tailwind paleti KULLANMA. Bağlama uygun palet oluştur.

### Shadows
Düz `shadow-md` KULLANMA. Katmanlı, renk tonlu (color-tinted) shadow'lar kullan, düşük opacity ile:
```css
box-shadow:
  0 1px 2px rgba(var(--shadow-color), 0.04),
  0 4px 8px rgba(var(--shadow-color), 0.06),
  0 12px 24px rgba(var(--shadow-color), 0.08);
```

### Tipografi
Başlık ve gövde için ASLA aynı font kullanma. Display/serif + clean sans eşleştir.
- Büyük başlıklarda tight tracking: `letter-spacing: -0.03em`
- Gövde metinde generous line-height: `line-height: 1.7`
- Google Fonts'tan KARAKTERLİ fontlar seç, her proje için FARKLI kombinasyon

**İlham Havuzu (sınırlı değil):**
- Display: Playfair Display, Fraunces, Libre Baskerville, Syne, Outfit, Bricolage Grotesque, Instrument Serif, DM Serif Display, Crimson Pro, Cormorant Garamond, Archivo Black, Satoshi, Cabinet Grotesk, Newsreader
- Body: DM Sans, Plus Jakarta Sans, Source Sans 3, Work Sans, Karla, Manrope, Atkinson Hyperlegible, Figtree

### Gradientler
Tek düz gradient KULLANMA. Birden fazla radial gradient katmanla. SVG noise filter ile grain/texture ekle:
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
```

### Animasyonlar
- Sadece `transform` ve `opacity` animate et. `transition-all` YASAK.
- Spring-style easing kullan: `cubic-bezier(0.34, 1.56, 0.64, 1)` veya benzeri
- IntersectionObserver ile scroll-triggered reveal (staggered `animation-delay`)
- Sayfa yüklenişinde orchestrated entrance — her bölüm sırayla gelsin

### Interactive States
Her tıklanabilir element'te hover, focus-visible ve active state'leri OLMALI. İstisnasız.
- Hover: sadece opacity değil → transform, color shift, clip-path, scale
- Focus-visible: erişilebilirlik için belirgin outline
- Active: hafif scale-down veya renk değişimi

### Görseller
Görsellerin üzerine gradient overlay ekle ve renk treatment katmanı kullan:
```css
.img-container::after {
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}
```

### Spacing
Tutarlı spacing token sistemi kullan. Rastgele değerler KULLANMA. 8px grid sistemi:
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 48px;
--space-2xl: 80px;
--space-3xl: 120px;
```

### Derinlik (Depth)
Surface'lar bir katmanlama sistemine sahip olmalı — hepsi aynı z-plane'de durmamalı:
- **Base:** Ana arka plan
- **Elevated:** Kartlar, paneller (`translateZ` veya shadow ile)
- **Floating:** Modal, tooltip, dropdown (belirgin shadow + z-index)

---

## Arka Plan & Görsel Detaylar

Düz renk arka plan tembelliktir. Atmosfer ve derinlik yarat:

- Gradient mesh — çok noktalı, organik gradientler
- Noise texture / grain overlay — CSS SVG filter ile
- Geometric pattern — tekrarlayan CSS veya SVG
- Layered transparency — üst üste binen yarı saydam elementler
- Dramatic shadow stack'leme
- CSS-only decorative elements — pseudo-elementlerle dekoratif şekiller
- Custom cursor (bağlama uygunsa)

Bunları estetik yöne göre uygula. Maksimalist = elaborate. Minimalist = restraint ama yine atmosfer.

---

## Teknik Kurallar

- **Tek dosya:** Her site tek bir `index.html` — inline `<style>` ve `<script>`
- **Framework yok:** Saf HTML, CSS, JavaScript. Tailwind, Bootstrap, React YASAK.
- **Responsive:** Mobile-first. 375px → 1440px arası kusursuz.
- **Breakpoint'ler:** `768px` (tablet), `1024px` (desktop). İkisi yeterli.
- **Performans:** Lighthouse 90+. `loading="lazy"`, `font-display: swap`, `defer` script.
- **SEO:** `<title>`, `<meta description>`, Open Graph, semantic HTML (`header`, `main`, `section`, `footer`, `nav`), `<html lang="tr">`
- **İkonlar:** Lucide Icons inline SVG veya custom SVG çiz. Font Awesome YASAK.
- **Görseller:** Unsplash URL'leri placeholder olarak. Format: `https://images.unsplash.com/photo-XXXXX?w=800&q=80`. Her görselde anlamlı `alt` metni.
- **Favicon:** Inline SVG favicon: `<link rel="icon" href="data:image/svg+xml,...">`

---

## İçerik Kuralları

- Tüm içerik Türkçe
- CTA butonları net ve aksiyon odaklı: "Hemen Başla", "Randevu Al", "Teklif İste"
- Kısa cümleler, güçlü başlıklar, görsel hiyerarşi
- **Lorem ipsum YASAK** — gerçekçi, bağlama uygun, ikna edici içerik yaz
- Testimonial'larda gerçekçi Türk isimleri ve işletme adları kullan

---

## Varsayılan Sayfa Bölümleri

1. **Navigation** — Sticky/fixed. Logo + linkler + CTA butonu. Mobilde hamburger menü.
2. **Hero** — İlk izlenim. Büyük, cesur, UNUTULMAZ. Full-viewport yükseklik.
3. **Sosyal Kanıt** — Logo bar, rakamlar, kısa testimonial strip.
4. **Hizmetler / Özellikler** — Ne sunuyor? Neden önemli?
5. **Hakkında / Nasıl Çalışır** — Güven oluştur. 3 adımlık süreç veya hikaye.
6. **Galeri / Projeler** — Görsel showcase (bağlama uygunsa).
7. **Referanslar / Testimonials** — Müşteri yorumları. İsim + fotoğraf + yorum.
8. **SSS (FAQ)** — Accordion, smooth animasyon.
9. **CTA** — Son çağrı. Güçlü başlık + buton + atmosferik arka plan.
10. **Footer** — İletişim, sosyal medya SVG ikonları, telif, linkler.

---

## Kalite Kontrolü

Site oluşturduktan sonra:

1. **"Bunu insan tasarımcı yaptı" denilir mi?** Hayırsa → yeniden yap.
2. **Font seçimi sıradan mı?** → Karakter gerekiyor. Değiştir.
3. **Renk paleti "AI gradient" mı?** → Bağlama özel palet yap.
4. **Layout simetrik ve tahmin edilebilir mi?** → Kır. Sürpriz ekle.
5. **Mobilde güzel mi?** → Küçültme değil, yeniden düşün.
6. **Arka plan düz renk mi?** → Atmosfer ekle.
7. **Hover state'leri sıkıcı mı?** → Şaşırt.
8. **Sayfa yüklenişi cansız mı?** → Orchestrated entrance ekle.
9. **`transition-all` var mı?** → Kaldır, spesifik property animate et.
10. **Shadow'lar flat mı?** → Katmanlı, renk tonlu shadow yap.
11. **Spacing tutarsız mı?** → Token sistemi uygula.
12. **Bu başka bir AI çıktısına benziyor mu?** → Baştan.

Claude olağanüstü yaratıcı işler çıkarabilir. Kendini tutma, kutudan çık, tamamen farklı bir vizyona bağlan.

---

## Hard Rules

- Referans varsa, ekleme yapma — eşleştir
- Referans yoksa, cesur ol — generic yapma
- Screenshot karşılaştırmasını atla → YASAK
- `transition-all` → YASAK
- Default Tailwind renkleri birincil olarak → YASAK
- Aynı font combo'yu tekrarlama → YASAK
