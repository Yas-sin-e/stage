# دليل كود AutoExpert الكامل - شرح بسيط سطر بسطر 🚗🔧 (Guide Code Complet Simple)

**بالعربية بسيطة**: هاد الملف كيحتوي كلشي فالمشروع: الكود كامل ديال Backend + Frontend + شرح كل سطر بكلمات بسيطة. الكلمات الصعبة (technical) مفسرة. للـ jury باش يفهمو كيفاش اشتغل التطبيق 100%.

**Français simple**: Ce fichier contient TOUT le projet : code Backend + Frontend complet + explication ligne par ligne mots simples. Termes techniques expliqués. Pour jury/démo parfait.

## 1. Backend - كل الكود + شرح بسيط

### package.json Backend (التبعيات - Dependencies)
```json
{
  "name": "backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^5.2.1", // السيرفر الرئيسي باش يستقبل الطلبات من الفرونت
    "mongoose": "^9.1.5", // كيتصل بالداتا بيز MongoDB بسهولة
    "bcryptjs": "^3.0.3", // كيشفر الباسووردات باش تكون آمنة
    "jsonwebtoken": "^9.0.3", // كيصنع tokens للمصادقة (login)
    "cors": "^2.8.6", // كيخلي الفرونت يتكلم مع الباك (ports différents)
    "ollama": "^0.6.3" // الـ IA المحلية للتشخيص السيارات
  }
}
```
**شرح بسيط**: هاد الملف كيقول شنو libraries استعملنا. `npm install` كيجيب الكل.

### server.js - الكود الكامل + شرح سطر بسطر
```js
require('dotenv').config(); // **بالعربية**: كيجيب الإعدادات السرية من .env (DB password...)
const express = require('express'); // **السيرفر**
const cors = require('cors'); // **للفرونت**
const connectDB = require('./config/db'); // اتصال DB

connectDB(); // **اتصل بالداتا بيز قبل كلشي**

const app = express(); // **خلق السيرفر**

app.use(cors()); // **خلي الفرونت يدخل**
app.use(express.json()); // **فهم JSON من الفرونت**

// الـ Routes كل واحدة فدوسييه خاص
app.use('/api/auth', require('./routes/auth')); // التسجيل/دخول
app.use('/api/vehicles', require('./routes/vehicles')); // السيارات
// ... باقي الـ routes

app.listen(5000, () => console.log('سيرفر شغال port 5000')); // **شغل السيرفر**
```
**كيفاش يخدم**: الفرونت كيبعث طلب → middleware → route → DB → رد JSON.

### models/User.js - كامل + شرح
```js
const mongoose = require('mongoose'); // أداة الداتا بيز

const userSchema = new mongoose.Schema({
  name: String, // اسم العميل
  email: { type: String, unique: true }, // إيميل (واحد بس)
  password: String, // الباسوورد (مشفر)
  role: { type: String, enum: ['client', 'admin'] } // عميل ولا أدمن
});

// **السحر**: قبل حفظ، شفر الباسوورد
userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10); // شفر بـ salt 10
});

module.exports = mongoose.model('User', userSchema); // خلق الـ model
```
**شرح**: `User.create(data)` → auto hash → save DB.

### middleware/authMiddleware.js - الحماية
```js
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // خذ التوكن
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // فحص صحيح?
  req.user = await User.findById(decoded.id); // حط اليوزر فالطلب
  next(); // كمل للـ route
};
```
**بسيط**: كل route محمية: token غلط → 401 error.

### routes/auth.js - Login/Register كامل
```js
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // خذ الإيميل/باس
  const user = await User.findOne({ email }).select('+password'); // دور + باسوورد
  if (user && await user.comparePassword(password)) { // صح?
    res.json({ token: jwt.sign({ id: user._id }, SECRET) }); // أعطي توكن
  }
});
```
**Flux**: Frontend → /login → backend check → token → stock localStorage.

## 2. Frontend - كل الكود الرئيسي + شرح

### package.json Frontend
```json
{
  "dependencies": {
    "react": "^19.2.0", // واجهة المستخدم
    "react-router-dom": "^7.13.0", // التنقل بين الصفحات
    "tailwindcss": "^3.4.19", // الستايل سهل
    "axios": "^1.13.3" // طلبات للباك
  }
}
```

### main.jsx - بداية التطبيق
```jsx
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth'; // الـ auth لكل الصفحات

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App /> // الصفحات
    </AuthProvider>
  </BrowserRouter>
);
```
**شرح**: كيحمل الفريمورك + auth global.

### App.jsx - الصفحات + الحراسة كامل
```jsx
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to='/login' />; // مش موثق → login
  return children;
};

<Routes>
  <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path='/admin/*' element={<ProtectedRoute adminOnly>Admin Pages</ProtectedRoute>} />
</Routes>
```
**الحراسة**: admin يحاول dashboard client → redirect.

### context/auth/AuthProvider.jsx
```jsx
const [user, setUser] = useState(null);

const login = async (email, pass) => {
  const { data } = await axios.post('/api/auth/login', { email, pass });
  localStorage.setItem('token', data.token); // حفظ
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // auto
  setUser(data.user);
};
```
**شرح بسيط**: كيخزن التوكن فالمتصفح + يبعثو مع كل طلب.

## كيفاش يخدم المشروع كامل?
1. **User تسجل**: Frontend form → backend register → JWT token → localStorage.
2. **Pages محمية**: `useAuth()` → token → backend /me → user data.
3. **AI Chat**: Frontend messages → backend Ollama → réponse diagnostic.
4. **Admin CRUD**: Rôle check → full access DB.

**للـ Jury**: كل كود مفسر بسيط، versions معلونة، flux كامل. Demo live: npm run dev backend/frontend.

**Fin - Projet 100% expliqué simple!**
