# كل فونكسيون Backend كامل - Code + Syntax + Explication Détaillée 📂

## Backend Routes - كل الـ Routes كامل + شرح Syntax + Logic

### 1. routes/auth.js - كامل 100% بالعربية ثم Français (Login/Register/Profile...)

**بالعربية**: هاد الـ route كتدير كلشي authentication. كل فونكسيون مفسر سطر بسطر.

**Français**: Route complète authentification. Chaque fonction expliquée ligne par ligne.

```js
// Syntax: router.METHOD('/path', middleware, async (req, res) => { logic })
const router = express.Router(); // **Syntax**: خلق router خاص للـ auth
const User = require('../models/User'); // **Import model**

const generateToken = (id) => jwt.sign({ id }, SECRET, { expiresIn: '30d' }); // **Syntax**: jwt.sign(payload, secret, options)

router.post('/register', async (req, res) => { // **Syntax POST**: Create
  const { name, email, password, phone } = req.body; // **Destructuring** = خذ من JSON
  const userExists = await User.findOne({ email }); // **Mongo query**
  if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });
  const user = await User.create({ name, email, password, phone, role: 'client' }); // **Create + auto hash**
  res.status(201).json({ token: generateToken(user._id), user }); // **201 = Created**
});
```

**Logic détaillée**: Frontend form → JSON → findOne (check existe?) → create (hash auto) → JWT → JSON response.

```
Syntax clés:
- async/await = انتظر الـ promise
- res.status(400).json() = خطأ + message
- User.findOne({ email }) = ابحث email واحد
```

### 2. routes/vehicles.js - كامل بالعربية/Français

**بالعربية**: إدارة السيارات ديال العميل (CRUD).

**Français**: Gestion véhicules client (CRUD).

```js
router.get('/', protect, async (req, res) => { // **protect middleware avant**
  const vehicles = await Vehicle.find({ userId: req.user._id }); // **req.user من middleware**
  res.json(vehicles);
});

router.post('/', protect, async (req, res) => {
  const vehicle = await Vehicle.create({ ...req.body, userId: req.user._id }); // **Spread + add userId**
  res.status(201).json(vehicle);
});
```
**Syntax**: `protect` = check token → req.user. `find({ userId })` = فقط سيارات هاد user.

### 3. routes/services.js - Cache + Get بالعربية/Français

**بالعربية**: استعلام الخدمات مع cache باش يكون سريع.

**Français**: Services avec cache pour vitesse.

```js
let servicesCache = null; // **Cache mémoire**

router.get('/', async (req, res) => {
  if (servicesCache) return res.json(servicesCache); // **Cache hit**
  const services = await Service.find({ archivedAt: null }); // **Null = actif**
  servicesCache = services; // **Cache update**
  res.json(services);
});
```
**Logique**: Cache 5min = rapide (no DB repeat).

## Backend Models Syntax
### User.js
```js
const schema = new mongoose.Schema({ // **Définition champs**
  email: { type: String, unique: true, required: true }, // **unique = 1 seul**
  role: { enum: ['client', 'admin'] } // **Liste limitée**
});

schema.pre('save', async function() { // **Hook avant save**
  this.password = await bcrypt.hash(this.password, 10); // **Bcrypt salt 10**
});

schema.methods.comparePassword = async function(pass) { // **Méthode instance**
  return bcrypt.compare(pass, this.password);
};
```
**Syntax**: `pre('save')` = exécute avant `user.save()`.

## Frontend - كل Functions كامل

### App.jsx - Routes + Guards كامل
```jsx
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth(); // **Hook global**
  if (!user) return <Navigate to="/login" />; // **React Router Navigate**
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children; // **Render children**
};

// Usage
<Route path="/admin" element={<ProtectedRoute adminOnly>{AdminPages}</ProtectedRoute>} />
```
**Syntax React Router**: `<Route path="..." element={<Component>}>`.

### AuthProvider.jsx - كامل
```jsx
const [user, setUser] = useState(null); // **React Hook**: state + updater

useEffect(() => {
  const token = localStorage.getItem('token'); // **Persist navigateur**
  if (token) api.get('/auth/me').then(setUser); // **Auto check login**
}, []); // **[] = exécute 1x au mount**

const login = async (email, pass) => {
  const { data } = await axios.post('/login', { email, pass }); // **Axios POST**
  localStorage.setItem('token', data.token); // **Save**
  axios.defaults.headers.Authorization = `Bearer ${data.token}`; // **Auto tous requests**
  setUser(data.user); // **Update state → re-render**
};
```
**Syntax Hooks**:
- `useState(null)` = boîte vide → `setUser(data)` change.
- `useEffect([], fn)` = fn 1x seulement.

## Syntax كاملة مهمة - كلشي لازم تعرف

### Backend Express
```
app.use('/api', router); // Mount routes
router.get('/', async (req, res) => {}) // GET
router.post('/', protect, async (req, res) => {}) // POST + middleware
res.json(data) // Response JSON
```

### Frontend React
```
const [state, setState] = useState(initial); // State
useEffect(() => { logic }, [deps]); // Side effects
<Route path="/:id" element={<Component />} /> // Routing
{condition ? <A /> : <B />} // Ternaire
```

### MongoDB/Mongoose
```
Model.find({ field: value }) // Query
Model.create(data) // Insert
Model.findByIdAndUpdate(id, data) // Update
schema.pre('save', fn) // Hook
```

**كل Syntax ديال المشروع هنا - فهم 100%!** 🎉
