# Hướng dẫn tích hợp Supabase vào Smart Pharmacy

## 1. Cài đặt dependencies

### Backend
```bash
cd backend
npm install @supabase/supabase-js
```

### Frontend
```bash
cd frontend
npm install @supabase/supabase-js
```

## 2. Lấy Supabase credentials

1. Truy cập https://supabase.com và tạo project mới
2. Vào **Settings** > **API**
3. Copy các thông tin:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY` (frontend)
   - **service_role** key → `SUPABASE_SERVICE_KEY` (backend)

## 3. Cấu hình Environment Variables

### Backend: Tạo file `backend/.env`
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...your-service-key
```

### Frontend: Tạo file `frontend/.env`
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
```

## 4. Tạo Database Schema trên Supabase

Vào **SQL Editor** trên Supabase Dashboard và chạy:

```sql
-- Bảng pharmacies
CREATE TABLE pharmacies (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng users
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'staff',
  pharmacy_id BIGINT REFERENCES pharmacies(id),
  status TEXT DEFAULT 'active',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng products
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  pharmacy_id BIGINT REFERENCES pharmacies(id),
  sku TEXT,
  name TEXT NOT NULL,
  category TEXT,
  unit TEXT,
  storage TEXT,
  default_min_stock INT DEFAULT 10,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng batches (lô hàng)
CREATE TABLE batches (
  id BIGSERIAL PRIMARY KEY,
  pharmacy_id BIGINT REFERENCES pharmacies(id),
  product_id BIGINT REFERENCES products(id),
  batch_code TEXT,
  expiry_date DATE,
  qty_in INT DEFAULT 0,
  qty_out INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng orders
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  pharmacy_id BIGINT REFERENCES pharmacies(id),
  order_date DATE DEFAULT CURRENT_DATE,
  total DECIMAL(15,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 5. Cấu hình Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- Policy: Users chỉ xem data của pharmacy mình
CREATE POLICY "Users view own pharmacy products"
  ON products FOR SELECT
  USING (pharmacy_id = (current_setting('app.pharmacy_id')::bigint));

CREATE POLICY "Users view own pharmacy orders"
  ON orders FOR SELECT
  USING (pharmacy_id = (current_setting('app.pharmacy_id')::bigint));
```

## 6. Ví dụ sử dụng

### Frontend - Authentication
```javascript
import { supabase } from './config/supabase';

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();
```

### Frontend - Query data
```javascript
import { supabase } from './config/supabase';

// Lấy danh sách products
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('pharmacy_id', pharmacyId)
  .order('id', { ascending: false });

// Tạo product mới
const { data, error } = await supabase
  .from('products')
  .insert([
    { name: 'Amoxicillin', pharmacy_id: 1, category: 'Antibiotic' }
  ])
  .select();
```

### Backend - Admin operations
```javascript
const supabase = require('./config/supabase');

// Service key có full access
const { data, error } = await supabase
  .from('pharmacies')
  .select('*, users(count)');
```

## 7. Realtime Subscriptions (Bonus)

```javascript
// Lắng nghe thay đổi realtime
const channel = supabase
  .channel('products-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'products' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();
```

## 8. Migration từ MySQL sang Supabase

Nếu muốn migrate data từ MySQL hiện tại:

1. Export data từ MySQL
2. Dùng Supabase SQL Editor để import
3. Hoặc dùng tool: https://github.com/supabase-community/supabase-migration-tool

## Lưu ý quan trọng

⚠️ **Service Role Key** chỉ dùng trong backend, KHÔNG expose ra frontend
✅ **Anon Key** có thể public, được bảo vệ bởi RLS policies
🔒 Luôn enable RLS cho các bảng chứa data nhạy cảm
📝 Test kỹ RLS policies trước khi deploy production

## So sánh MySQL vs Supabase

| Feature | MySQL (hiện tại) | Supabase |
|---------|------------------|----------|
| Database | MySQL | PostgreSQL |
| Auth | Custom JWT | Built-in Auth |
| Realtime | Không | Có sẵn |
| Storage | Tự setup | Built-in |
| API | Tự code | Auto-generated REST/GraphQL |
| Hosting | Tự host | Managed cloud |

## Tài liệu tham khảo

- Supabase Docs: https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript
- Auth Guide: https://supabase.com/docs/guides/auth
- Database Guide: https://supabase.com/docs/guides/database
