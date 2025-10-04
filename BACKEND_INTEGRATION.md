# تكامل الباك إند - Backend Integration

## ✅ تم التكامل مع Laravel Sanctum

### 1. نوع نظام المصادقة
- [x] Laravel Sanctum ✅
- [ ] Laravel Passport
- [ ] JWT (JSON Web Tokens)
- [ ] نظام آخر: ___________

### 2. Endpoints المطلوبة

#### تسجيل الدخول
```
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**الاستجابة من Laravel:**
```json
{
  "message": "Login successful",
  "access_token": "your_token_here",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "اسم المستخدم",
    "email": "user@example.com",
    "roles": [
      {
        "id": 1,
        "name": "student",
        "description": "Student role"
      }
    ]
  }
}
```

#### تسجيل مستخدم جديد
```
POST /api/register
Content-Type: application/json

{
  "name": "اسم المستخدم",
  "email": "user@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

**الاستجابة من Laravel:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "اسم المستخدم",
    "email": "user@example.com",
    "roles": []
  },
  "access_token": "your_token_here",
  "token_type": "Bearer"
}
```

#### تسجيل الخروج
```
POST /api/logout
Authorization: Bearer your_token_here
```

#### جلب بيانات المستخدم
```
GET /api/user
Authorization: Bearer your_token_here
```

**الاستجابة من Laravel:**
```json
{
  "id": 1,
  "name": "اسم المستخدم",
  "email": "user@example.com",
  "roles": [
    {
      "id": 1,
      "name": "student",
      "description": "Student role"
    }
  ]
}
```

### 3. CSRF Protection
- [ ] نعم، نستخدم CSRF tokens
- [ ] لا، لا نستخدم CSRF tokens

إذا كنت تستخدم CSRF:
- Endpoint: `/sanctum/csrf-cookie`
- Header: `X-CSRF-TOKEN`

### 4. CORS Configuration
تأكد من إعداد CORS في الباك إند:

```php
// config/cors.php
'allowed_origins' => [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:5178',
    'http://localhost:5179',
    'http://localhost:5180'
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### 5. إعدادات البيئة (.env)
```env
# Frontend URL
FRONTEND_URL=http://localhost:5173

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5178,http://localhost:5179,http://localhost:5180

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:5174,localhost:5175,localhost:5176,localhost:5177,localhost:5178,localhost:5179,localhost:5180
```

## اختبار التكامل

### 1. اختبار CSRF
```bash
curl -X GET http://localhost:8000/sanctum/csrf-cookie
```

### 2. اختبار تسجيل الدخول
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### 3. اختبار التسجيل
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password","password_confirmation":"password","role":"student"}'
```

## ملاحظات مهمة

1. **تنسيق الاستجابة**: تأكد من أن الاستجابة تحتوي على `access_token` و `user` object
2. **الأدوار**: استخدم `student`, `instructor`, `admin` كقيم للأدوار
3. **CSRF**: إذا كنت تستخدم Sanctum، تأكد من إعداد CSRF cookies بشكل صحيح
4. **CORS**: تأكد من إعداد CORS للسماح بالطلبات من الفرونت إند

## استكشاف الأخطاء

### خطأ 419 (CSRF)
- تأكد من طلب CSRF cookie أولاً
- تأكد من إرسال CSRF token في header

### خطأ CORS
- تأكد من إعداد CORS في الباك إند
- تأكد من إضافة الفرونت إند URL إلى allowed origins

### خطأ 401 (Unauthorized)
- تأكد من إرسال token في Authorization header
- تأكد من صحة token

### خطأ 422 (Validation)
- تأكد من إرسال جميع الحقول المطلوبة
- تأكد من صحة تنسيق البيانات