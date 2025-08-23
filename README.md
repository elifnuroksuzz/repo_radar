# 🚀 Repo Radar

> GitHub kullanıcı profillerini detaylı analiz eden modern web uygulaması
<img width="1730" height="902" alt="image" src="https://github.com/user-attachments/assets/b9da7d7c-6cad-4eb1-8e0c-0e0d98e293da" />
<img width="1359" height="694" alt="image" src="https://github.com/user-attachments/assets/7f8b98a2-5f90-4136-a918-518afbb5892b" />
<img width="1608" height="786" alt="image" src="https://github.com/user-attachments/assets/8a671b16-ef2f-4988-abf5-6d64bd6a7050" />


**Repo Radar**, GitHub kullanıcılarının profillerini, repository'lerini, programlama dillerini ve aktivite geçmişlerini görselleştiren modern bir web uygulamasıdır. Herhangi bir GitHub kullanıcısının kodlama alışkanlıklarını, projelerini ve gelişim sürecini detaylı analiz etmenizi sağlar.

---

## 📋 İçindekiler

- [✨ Özellikler](#-özellikler)
- [🛠️ Teknoloji Stack](#️-teknoloji-stack)
- [🚀 Kurulum](#-kurulum)
- [📱 Kullanım](#-kullanım)
- [🔧 Yapılandırma](#-yapılandırma)
- [📊 Örnek Çıktılar](#-örnek-çıktılar)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)
- [📞 İletişim](#-iletişim)

---

## ✨ Özellikler

### 👤 **Kullanıcı Profil Analizi**
- Detaylı GitHub profil görüntüleme
- Takipçi/takip edilen istatistikleri
- Hesap yaşı ve aktivite durumu analizi
- Bio ve lokasyon bilgileri

### 📊 **Repository İstatistikleri**
- Toplam repository sayısı
- En popüler projeler (⭐ yıldız sayısına göre sıralama)
- Fork edilmiş ve orijinal projeler ayrımı
- Son güncellenme tarihleri
- Repository boyut analizleri

### 💻 **Programlama Dili Analizi**
- Kullanılan programlama dillerinin yüzdelik dağılımı
- Dil bazında kod satırı istatistikleri
- İnteraktif pasta grafikleri ile görselleştirme
- En çok kullanılan teknolojiler sıralaması

### 📈 **Aktivite Görselleştirme**
- GitHub contribution calendar görüntüleme
- Commit geçmişi aktivite haritası
- Haftalık ve aylık aktivite trendleri
- Aktif çalışma saatleri analizi

### 🎨 **Modern Kullanıcı Deneyimi**
- Responsive tasarım (📱 mobil uyumlu)
- Dark/Light tema desteği
- Smooth geçiş animasyonları
- Kullanıcı dostu ve sezgisel arayüz

---

## 🛠️ Teknoloji Stack

### **Frontend**
- **React.js** ⚛️ - Modern UI framework
- **JavaScript ES6+** - Modern JavaScript özellikleri
- **CSS3/SCSS** - Responsive ve modern styling
- **Chart.js** 📊 - Veri görselleştirme kütüphanesi
- **React Router** - Single Page Application yönlendirme

### **API & Veri**
- **GitHub REST API** 🔗 - Gerçek zamanlı GitHub verileri
- **Fetch API** - HTTP istekleri
- **JSON** - Veri formatı

### **Geliştirme Araçları**
- **Webpack** - Module bundler
- **Babel** - JavaScript transpiler
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Kurulum

### **Ön Gereksinimler**
- Node.js (v14.0.0 veya üstü)
- npm veya yarn
- Modern web tarayıcısı

### **Kurulum Adımları**

1. **Repository'yi klonlayın**
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

3. **Geliştirme sunucusunu başlatın**
```bash
npm start
# veya  
yarn start
```

4. **Uygulamayı tarayıcıda açın**
```
http://localhost:3000
```

### **Production Build**
```bash
npm run build
# veya
yarn build
```

---

## 🔧 Yapılandırma

### **GitHub API Token (Opsiyonel)**
Daha yüksek API limiti için GitHub Personal Access Token kullanabilirsiniz:

1. `.env` dosyası oluşturun
2. Token'ınızı ekleyin:
```env
REACT_APP_GITHUB_TOKEN=your_personal_access_token_here
```

> **Not:** Token olmadan da uygulama çalışır, ancak API limiti daha düşük olacaktır (saatte 60 istek).

---

## 📱 Kullanım

### **1. GitHub Kullanıcısı Arama**
- Ana sayfada GitHub kullanıcı adını girin
- "Analiz Et" butonuna tıklayın
- Sonuçların yüklenmesini bekleyin

### **2. Profil Keşfi**
- **Overview Tab:** Genel profil bilgileri ve istatistikler
- **Repositories Tab:** Repository listesi ve detayları
- **Languages Tab:** Programlama dili analizi
- **Activity Tab:** Commit aktivite haritası

### **3. Veri Filtreleme ve Sıralama**
- Repository'leri yıldız sayısına göre sıralama
- Dil bazında filtreleme seçenekleri
- Tarih aralığı seçimi
- Arama ve gelişmiş filtreleme

---

## 📊 Örnek Çıktılar

### **Kullanıcı Profil Kartı**
```
👤 John Doe
📍 San Francisco, CA
👥 150 takipçi | 89 takip edilen
📅 GitHub'da 3 yıl
⭐ 1,234 toplam yıldız
📦 47 repository
```

### **Programlama Dili Dağılımı**
```
JavaScript    45.2%  ████████████████████▓
Python       28.7%  ████████████▓
HTML/CSS     15.1%  ███████▓
TypeScript   11.0%  █████▓
```

### **Popüler Repository'ler**
```
⭐ 234  awesome-project        JavaScript
⭐ 156  data-visualization     Python  
⭐ 89   mobile-app            React Native
```

---

## 🎨 Tema Desteği

Uygulamada yerleşik tema seçenekleri:

- 🌞 **Light Theme:** Gündüz kullanımı için optimize edilmiş
- 🌙 **Dark Theme:** Gece kullanımı için göz dostu
- 🎨 **Auto Theme:** Sistem temasını otomatik takip eder

---

## 🤝 Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz:

1. **Fork** yapın
2. **Feature branch** oluşturun:
   ```bash
   git checkout -b feature/harika-ozellik
   ```
3. **Değişiklikleri commit** edin:
   ```bash
   git commit -m "✨ Harika özellik eklendi"
   ```
4. **Branch'i push** edin:
   ```bash
   git push origin feature/harika-ozellik
   ```
5. **Pull Request** oluşturun

### **Katkı Kuralları**
- Code style'a uyun (ESLint + Prettier)
- Mümkünse test ekleyin
- Commit mesajlarında emoji kullanın
- README'yi güncelleyin (gerekirse)

### **Geliştirme Ortamı**
```bash
# Linting kontrolü
npm run lint

# Format kontrolü
npm run format

# Test çalıştırma
npm test
```

---

## 🐛 Bilinen Sorunlar ve Sınırlamalar

- ⚠️ GitHub API rate limit (saatte 60 istek, token ile 5000)
- ⚠️ Çok büyük repository'ler için yavaş yükleme
- ⚠️ Private repository'ler görüntülenmiyor
- ⚠️ Bazı organizasyon repository'leri kısıtlı erişim

---

## 📄 Lisans

Bu proje [MIT Lisansı](https://choosealicense.com/licenses/mit/) ile lisanslanmıştır.

```
MIT License

Copyright (c) 2024 Elif Nur Öksüz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 İletişim

**Elif Nur Öksüz**

- 🌐 **GitHub:** [@elifnuroksuzz](https://github.com/elifnuroksuzz)
- 📧 **Email:** [elifnuroksuz4@gmail.com](mailto:elifnuroksuz4@gmail.com)
- 💼 **LinkedIn:** [elifnuroksuz](https://www.linkedin.com/in/elifnuroksuz/)

### **Geri Bildirim**
- 🐛 **Bug Report:** [Issues sayfası](https://github.com/elifnuroksuzz/repo_radar/issues)
- 💡 **Feature Request:** [Discussions](https://github.com/elifnuroksuzz/repo_radar/discussions)
- ⭐ **Projeyi beğendiyseniz yıldızlamayı unutmayın!**

---

## 🙏 Teşekkürler

- **GitHub** - API'sini ücretsiz sağladığı için
- **React Topluluğu** - Harika framework için
- **Chart.js** - Güzel görselleştirme kütüphanesi için
- **Açık Kaynak Topluluğu** - İlham verici projeler için

---

<div align="center">

**⭐ Bu projeyi faydalı bulduysanız yıldızlamayı unutmayın!**

🚀 **Fork'layın ve kendi özelliklerinizi ekleyin!**

</div>
