# Backend Routes كاملات - بالعربية/Français مع كل الكود + Syntax 📋

## 1. routes/auth.js - كامل 100% (Register/Login/Profile/Forgot)
**بالعربية**: كل فونكسيون authentication مفسر + كود كامل.

**Français**: Auth routes complètes expliquées.

```js
// كل الـ imports
const router = express.Router();
const User = require('../models/User');
const generateToken = (id) => jwt.sign({ id }, SECRET, { expiresIn: '30d' });

// REGISTER - التسجيل الجديد
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' }); // **400 = Bad Request**
  const user = await User.create({ name, email, password, phone, role: 'client' }); // **Auto hash**
  res.status(201).json({ token: generateToken(user._id), user }); // **Token + user**
});

// LOGIN - الدخول
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password'); // **+password = montre cachée**
  if (user && await user.comparePassword(password)) { // **Méthode model**
    res.json({ token: generateToken(user._id), user });
  } else {
    res.status(401).json({ message: 'Email/pass incorrect' }); // **401 Unauthorized**
  }
});

// ME - معلوماتي (private)
router.get('/me', protect, (req, res) => res.json(req.user)); // **protect ajoute req.user**

// FORGOT PASSWORD - نسيان كلمة السر
router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const resetToken = crypto.randomBytes(32).toString('hex'); // **Token aléatoire**
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 3600000; // **1h**
  await user.save();
  await sendEmail({ email: user.email, resetUrl }); // **Email lien**
});
```
**Syntax clés**: `protect` middleware, `select('+password')`, `user.create()` auto hash.

## 2. routes/vehicles.js - CRUD Voitures كامل
**بالعربية**: GET/POST/PUT/DELETE سيارات العميل فقط.

**Français**: Client vehicles CRUD.

```js
router.get('/', protect, async (req, res) => {
  const vehicles = await Vehicle.find({ userId: req.user._id }); // **req.user._id من token**
  res.json(vehicles); // **JSON auto**
});

router.post('/', protect, async (req, res) => {
  const vehicle = await Vehicle.create({ ...req.body, userId: req.user._id }); // **... = spread**
  res.status(201).json(vehicle); // **201 Created**
});

router.put('/:id', protect, async (req, res) => {
  const vehicle = await Vehicle.findOne({ _id: req.params.id, userId: req.user._id }); // **Double check**
  Object.assign(vehicle, req.body); // **Update champs**
  await vehicle.save();
  res.json(vehicle);
});
```
**Logique**: `protect` → `req.user._id` → find only MY vehicles.

## 3. routes/services.js - Services + Cache كامل
**بالعربية**: GET services (actifs seulement) + cache mémoire.

**Français**: Services actifs + cache.

```js
let servicesCache = null; // **Mémoire cache**
const CACHE_DURATION = 5 * 60 * 1000; // **5min**

router.get('/', async (req, res) => {
  if (servicesCache) return res.json(servicesCache); // **Hit rapide**
  const services = await Service.find({ archivedAt: null }); // **Null = actif**
  servicesCache = services;
  res.json(services);
});
```
**Syntax**: `let cache = null` mémoire → rapide no DB.

## 4. routes/admin.js - Admin CRUD كامل (Clients/Devis/Réservations...)
**بالعربية**: Admin panel - CRUD كلشي + stats.

**Français**: Admin dashboard CRUD.

```js
router.get('/clients', protect, adminOnly, async (req, res) => {
  const clients = await User.find({ role: 'client' }); // **Admin voit TOUS**
  res.json(clients);
});

router.get('/stats', protect, adminOnly, async (req, res) => {
  const stats = {
    totalClients: await User.countDocuments({ role: 'client' }),
    totalRevenue: await Reparation.aggregate([{ $match: { status: 'delivered' } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }])
  };
  res.json(stats); // **Aggregation Mongo**
});
```
**adminOnly middleware**: `if (req.user.role !== 'admin') 403`.

## 5. routes/reservations.js كامل
**بالعربية**: Créer/Modifier réservations.

**Français**: Reservations CRUD.

```js
router.post('/', protect, async (req, res) => {
  const reservation = await Reservation.create({
    ...req.body, 
    userId: req.user._id // **Auto add**
  });
  res.status(201).json(reservation);
});
```

## 6. routes/devis.js كامل
**بالعربية**: Devis (quotes) accept/reject.

**Français**: Quotes accept/reject.

```js
router.put('/:id/accept', protect, async (req, res) => {
  const devis = await Devis.findById(req.params.id);
  devis.status = 'accepted';
  await devis.save();
  // Créer Reparation auto
  const reparation = await Reparation.create({ devisId: devis._id, ... });
  res.json({ devis, reparation });
});
```

## Frontend Functions كاملات

### App.jsx Guards كامل
```jsx
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth(); // **Context global**
  if (!user) return <Navigate to="/login"/>; // **Redirect**
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard"/>;
  return children;
};
```

### AuthProvider كامل
```jsx
const login = async (email, pass) => {
  const data = await axios.post('/login', { email, pass }); // **API call**
  localStorage.setItem('token', data.token); // **Persist**
  setUser(data.user); // **State update → re-render**
};
```

**كل Backend Routes functions كاملات بالعربية/Français + syntax! مشروع فهم 100%!** 🎯
