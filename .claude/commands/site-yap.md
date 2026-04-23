Kullanıcı bir web sitesi istedi. Aşağıdaki bilgileri kullan:

$ARGUMENTS

## Görevin

1. CLAUDE.md'yi oku ve tüm kurallara uy.

2. İstenen işletme/kişi/proje için bağlamı anla:
   - Ne tür bir işletme?
   - Hedef kitlesi kim?
   - Hangi hissiyat uygun? (lüks, modern, sıcak, profesyonel, oyuncu, minimal...)

3. Bu bağlama göre CESUR bir estetik yön seç:
   - Font kombinasyonu (Google Fonts'tan KARAKTERLİ seçimler — generic YASAK)
   - Renk paleti (bağlama özel, AI gradient YASAK)
   - Layout tarzı (asimetri, grid-breaking, negatif alan)
   - Animasyon stratejisi (scroll reveal, hover surprises)
   - Arka plan atmosferi (texture, gradient mesh, pattern)

4. Tek bir `index.html` dosyası oluştur:
   - Inline CSS ve JavaScript
   - Responsive (375px → 1440px)
   - Gerçekçi Türkçe içerik (lorem ipsum YASAK)
   - SEO etiketleri (title, meta, OG)
   - Scroll animasyonları (IntersectionObserver)
   - Placeholder görseller (Unsplash URL)

5. Dosyayı oluşturduktan sonra tarayıcıda aç:
   ```
   open index.html
   ```

6. Kendine sor: "Bu siteyi bir insan tasarımcı yaptı denilir mi?" Cevap hayırsa, iyileştir.

## Önemli

- Her site FARKLI görünmeli. Aynı şablonu tekrarlama.
- AI slop yapma. Generic font, generic renk, generic layout = BAŞARISIZLIK.
- Cesur ol. Sürpriz yap. Beklenmeyeni yap.
- Ama kullanılabilirliği bozma. Cesur ≠ kaotik.
