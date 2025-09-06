# دليل النشر - Axon Project

## النشر على Vercel + Supabase

### 1. إعداد Supabase

```bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# إنشاء مشروع جديد
supabase projects create axon-project

# ربط المشروع المحلي
supabase link --project-ref your-project-ref
```

### 2. إعداد قاعدة البيانات

```bash
# تطبيق المخطط
npx prisma db push

# أو استخدام migrations
npx prisma migrate dev --name init
```

### 3. إعداد Vercel

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel

# ربط متغيرات البيئة
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4. متغيرات البيئة المطلوبة

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:password@db-host:5432/axon

# Email Service
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=noreply@axon.app

# Slack Integration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
```

### 5. اختبار النشر

```bash
# اختبار محلي
npm run dev

# اختبار البناء
npm run build

# اختبار الإنتاج
vercel --prod
```

### 6. مراقبة الأداء

- **Vercel Analytics:** مراقبة الأداء والاستخدام
- **Supabase Dashboard:** مراقبة قاعدة البيانات
- **GitHub Actions:** مراقبة CI/CD

## استكشاف الأخطاء

### مشاكل شائعة

1. **خطأ في متغيرات البيئة**
   - تأكد من إعداد جميع المتغيرات المطلوبة
   - تحقق من صحة المفاتيح

2. **خطأ في قاعدة البيانات**
   - تأكد من تطبيق Prisma schema
   - تحقق من اتصال Supabase

3. **خطأ في البناء**
   - تحقق من TypeScript errors
   - تأكد من تثبيت جميع التبعيات

### الدعم

- 📧 البريد الإلكتروني: support@axon.app
- 📖 الوثائق: [docs.axon.app](https://docs.axon.app)
- 🐛 تقرير الأخطاء: [GitHub Issues](https://github.com/yourusername/axon-project/issues)
