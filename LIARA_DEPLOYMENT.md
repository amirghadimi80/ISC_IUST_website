# راهنمای دیپلوی در لیارا

## پیش‌نیازها
1. حساب کاربری در [لیارا](https://liara.ir)
2. نصب [Liara CLI](https://docs.liara.ir/cli/install)
3. Git نصب شده باشد

## مراحل دیپلوی

### 1. نصب Liara CLI
```bash
npm install -g @liara/cli
```

یا با استفاده از curl:
```bash
curl -fsSL https://cli.liara.ir/install.sh | bash
```

### 2. لاگین به لیارا
```bash
liara login
```

### 3. ایجاد فایل .env
یک فایل `.env` در روت پروژه بساز و این متغیرها رو اضافه کن:

```env
SECRET_KEY=your-very-secure-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=your-app-name.liara.run,yourdomain.com

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

**نکته مهم:** SECRET_KEY رو حتماً تغییر بده. می‌تونی با این دستور یکی بسازی:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. آماده‌سازی پروژه
```bash
cd ISC_IUST
python manage.py collectstatic --noinput
```

### 5. ایجاد برنامه در لیارا
```bash
liara create --app isc-iust --platform django
```

یا از داشبورد لیارا یک برنامه Django جدید بساز.

### 6. تنظیم متغیرهای محیطی در لیارا
از داشبورد لیارا:
1. وارد برنامه خود شو
2. به بخش "تنظیمات" > "متغیرهای محیطی" برو
3. این متغیرها رو اضافه کن:
   - `SECRET_KEY`: کلید امنیتی خودت
   - `DEBUG`: False
   - `ALLOWED_HOSTS`: isc-iust.liara.run (یا دامنه خودت)

### 7. دیپلوی پروژه
```bash
liara deploy --app isc-iust --port 8000
```

یا با استفاده از Git:
```bash
git init
git add .
git commit -m "Initial commit"
liara deploy --app isc-iust
```

### 8. اجرای Migration
بعد از دیپلوی، از داشبورد لیارا:
1. به بخش "کنسول" برو
2. این دستورات رو اجرا کن:
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 9. تنظیم دامنه (اختیاری)
اگه دامنه شخصی داری:
1. از داشبورد لیارا به بخش "دامنه‌ها" برو
2. دامنه خودت رو اضافه کن
3. DNS رو طبق راهنمای لیارا تنظیم کن
4. `ALLOWED_HOSTS` رو در متغیرهای محیطی آپدیت کن

## نکات مهم

### دیتابیس
- لیارا به صورت پیش‌فرض از SQLite استفاده می‌کنه
- برای production بهتره از PostgreSQL استفاده کنی:
  1. از داشبورد لیارا یک دیتابیس PostgreSQL بساز
  2. `psycopg2-binary` رو به requirements.txt اضافه کن
  3. تنظیمات دیتابیس رو در settings.py آپدیت کن

### فایل‌های Media
برای ذخیره فایل‌های آپلود شده:
1. از Object Storage لیارا استفاده کن
2. یا یک دیسک به برنامه اضافه کن:
```bash
liara disk create --app isc-iust --name media --size 5
```

### لاگ‌ها
برای مشاهده لاگ‌ها:
```bash
liara logs --app isc-iust
```

### آپدیت پروژه
برای آپدیت کردن پروژه:
```bash
git add .
git commit -m "Update message"
liara deploy --app isc-iust
```

## عیب‌یابی

### خطای Static Files
اگه فایل‌های static لود نمی‌شن:
```bash
python manage.py collectstatic --clear --noinput
liara deploy --app isc-iust
```

### خطای 500
1. لاگ‌ها رو چک کن: `liara logs --app isc-iust`
2. DEBUG رو موقتاً True کن تا خطا رو ببینی
3. مطمئن شو SECRET_KEY و ALLOWED_HOSTS درست تنظیم شدن

### خطای Database
```bash
liara shell --app isc-iust
python manage.py migrate
```

## لینک‌های مفید
- [مستندات Django در لیارا](https://docs.liara.ir/app-deploy/django/getting-started)
- [راهنمای CLI لیارا](https://docs.liara.ir/cli/install)
- [تنظیمات دامنه](https://docs.liara.ir/domains/management)

## پشتیبانی
در صورت بروز مشکل:
- [مستندات لیارا](https://docs.liara.ir)
- [انجمن لیارا](https://community.liara.ir)
- پشتیبانی لیارا: support@liara.ir
