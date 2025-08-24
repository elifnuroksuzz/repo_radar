# 🔍 Repo Radar

> **GitHub depolarını keşfetmek hiç bu kadar kolay olmamıştı!** 🚀

Repo Radar, GitHub API'sini kullanarak popüler ve trend olan depoları keşfetmenizi, filtrelemenizi ve takip etmenizi sağlayan modern bir web uygulamasıdır. Geliştiriciler için tasarlanan bu araç, yeni projeler keşfetme ve ilham alma sürecinizi kolaylaştırır.
<img width="1730" height="902" alt="image" src="https://github.com/user-attachments/assets/b9da7d7c-6cad-4eb1-8e0c-0e0d98e293da" />
<img width="1359" height="694" alt="image" src="https://github.com/user-attachments/assets/7f8b98a2-5f90-4136-a918-518afbb5892b" />
<img width="1608" height="786" alt="image" src="https://github.com/user-attachments/assets/8a671b16-ef2f-4988-abf5-6d64bd6a7050" />

## ✨ Özellikler

- 🔥 **Trend Depolar**: En popüler GitHub depolarını keşfedin
- 🎯 **Akıllı Filtreleme**: Dil, yıldız sayısı ve tarih bazlı filtreleme
- 📊 **Detaylı İstatistikler**: Fork, yıldız ve katkıda bulunan sayıları
- 🌙 **Karanlık/Aydınlık Tema**: Gözlerinizi yormuyan tema seçenekleri
- 📱 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- ⚡ **Hızlı Arama**: Gerçek zamanlı arama özelliği
- 🔖 **Favoriler**: Beğendiğiniz depoları kaydedin
- 📈 **Aktivite Takibi**: Depo aktivitelerini izleyin

## 🛠️ Kurulum ve Kullanım

### Ön Gereksinimler

- Node.js (v16 veya üzeri) 📦
- npm veya yarn paket yöneticisi 📋
- GitHub API Token (opsiyonel, daha yüksek rate limit için) 🔑

### Kurulum Adımları

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/elifnuroksuzz/repo_radar.git
   cd repo_radar
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Ortam değişkenlerini ayarlayın**
   ```bash
   cp .env.example .env
   # .env dosyasını editleyerek GitHub API token'ınızı ekleyin
   ```

4. **Uygulamayı başlatın**
   ```bash
   npm start
   # veya
   yarn start
   ```

5. **Tarayıcınızda açın**
   ```
   http://localhost:3000
   ```

### Kullanım

1. 🌟 Ana sayfada trend depoları görüntüleyin
2. 🔍 Arama çubuğunu kullanarak spesifik depolar arayın
3. 🎛️ Filtreleri kullanarak sonuçları daraltın
4. ❤️ Beğendiğiniz depoları favorilere ekleyin
5. 📊 Detaylar sayfasında kapsamlı bilgilere ulaşın

## 🎨 Ekran Görüntüleri

```
┌─────────────────────────────────────────┐
│  🔍 Repo Radar                         │
│  ┌─────────────────┐  [🔥 Trend] [⭐]   │
│  │ Arama...       │                    │
│  └─────────────────┘                    │
│                                         │
│  📦 awesome-project      ⭐ 15.2k       │
│  JavaScript • MIT License               │
│  └─ 🍴 2.1k    👥 45    📅 2 days ago   │
│                                         │
│  📦 cool-framework       ⭐ 8.7k        │
│  Python • Apache-2.0                   │
│  └─ 🍴 1.3k    👥 23    📅 1 week ago   │
└─────────────────────────────────────────┘
```

## 🛡️ Teknolojiler

- **Frontend**: React.js, TypeScript ⚛️
- **Styling**: Tailwind CSS, Framer Motion 🎨
- **API**: GitHub REST API v4 🔌
- **State Management**: Context API / Redux 🗃️
- **Build Tool**: Vite ⚡
- **Testing**: Jest, React Testing Library 🧪

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isteyenler için rehber:

### Katkı Türleri
- 🐛 Bug raporları ve düzeltmeleri
- ✨ Yeni özellik önerileri
- 📚 Dokümantasyon iyileştirmeleri
- 🎨 UI/UX geliştirmeleri
- 🧪 Test coverage artırımı

### Katkı Süreci

1. **Fork'layın** 🍴
   ```bash
   # GitHub'da "Fork" butonuna tıklayın
   ```

2. **Yeni branch oluşturun** 🌿
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Değişikliklerinizi commit'leyin** 💾
   ```bash
   git commit -m "feat: add amazing feature"
   ```

4. **Branch'inizi push'layın** 🚀
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Pull Request açın** 📤

### Kod Standartları
- ESLint ve Prettier kurallarına uyun 📏
- Anlamlı commit mesajları yazın (Conventional Commits) 📝
- Test coverage'ı %80'in üzerinde tutun 🎯
- TypeScript türlerini doğru kullanın 🔤

## 🧪 Testler

```bash
# Tüm testleri çalıştır
npm test

# Coverage raporu
npm run test:coverage

# E2E testler
npm run test:e2e
```

## 📈 Yol Haritası

- [ ] 🌐 Çoklu dil desteği (i18n)
- [ ] 📱 Mobil uygulama (React Native)
- [ ] 🔔 Bildirim sistemi
- [ ] 📊 Gelişmiş analitikler
- [ ] 🤖 AI destekli öneri sistemi
- [ ] 💾 Offline destek
- [ ] 🔄 Auto-sync özelliği

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

```
MIT License © 2025 Elif Nur Öksüz
```

## 📞 İletişim ve Destek

- 👩‍💻 **Geliştirici**: [Elif Nur Öksüz](https://github.com/elifnuroksuzz)
- 📧 **Email**: elifnur@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/elifnuroksuzz/repo_radar/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/elifnuroksuzz/repo_radar/discussions)
- 🐦 **Twitter**: [@elifnuroksuzz](https://twitter.com/elifnuroksuzz)

## 🙏 Teşekkürler

Bu projeyi mümkün kılan herkese teşekkürler:

- GitHub API ekibi 🚀
- Açık kaynak topluluğu 🌍
- Beta test kullanıcıları 🧪
- Katkıda bulunan geliştiriciler 👥

---

⭐ **Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

🔄 **Son güncelleme**: Ağustos 2025

---

<div align="center">

**[⬆ Başa Dön](#-repo-radar)**
**[🚀 Demo](http://192.168.56.1:3001)**

Made with ❤️ by [Elif Nur Öksüz] (https://github.com/elifnuroksuzz)

</div>
