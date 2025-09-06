# Axon - مركز القيادة لمشروعك
## The Nerve Center for Your Project

![Axon Logo](https://via.placeholder.com/200x80/1E40AF/FFFFFF?text=AXON)

### نظرة عامة
**Axon** هو مركز قيادة مبسط لفريق واحد ومشروع واحد، مصمم لإزالة التعقيد من أدوات إدارة المشاريع التقليدية والتركيز على الزخم والتقدم.

### المميزات الأساسية
- 🎯 **التركيز المفرد:** فريق واحد، مشروع واحد
- ⚡ **الزخم المدمج:** تحفيز مستمر واحتفال بالتقدم
- 🎨 **البساطة الجذرية:** واجهة بسيطة، ميزات أساسية فقط

### التقنيات المستخدمة
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Hosting:** Vercel
- **Database:** PostgreSQL with Prisma ORM

### البدء السريع

#### 1. استنساخ المشروع
```bash
git clone https://github.com/yourusername/axon-project.git
cd axon-project
```

#### 2. إعداد متغيرات البيئة
```bash
cp .env.example .env.local
# قم بتعديل القيم في .env.local
```

#### 3. تثبيت التبعيات
```bash
cd frontend
npm install
```

#### 4. إعداد قاعدة البيانات
```bash
npx prisma db push
```

#### 5. تشغيل المشروع
```bash
npm run dev
```

### هيكل المشروع
```
axon-project/
├── frontend/           # Next.js application
├── supabase/          # Supabase functions & migrations
├── prisma/            # Database schema
├── docs/              # Documentation
└── .github/           # GitHub Actions
```

### المساهمة
نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) للمزيد من التفاصيل.

### الترخيص
هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

### الدعم
- 📧 البريد الإلكتروني: support@axon.app
- 📖 الوثائق: [docs.axon.app](https://docs.axon.app)
- 🐛 تقرير الأخطاء: [GitHub Issues](https://github.com/yourusername/axon-project/issues)

---

**English Summary:** Axon is a focused command center for single-project teams, built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. It emphasizes radical simplicity, integrated momentum, and singular focus to help small teams achieve ambitious goals.
