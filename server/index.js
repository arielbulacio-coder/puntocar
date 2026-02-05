const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize, User, Car } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Middleware to verify JWT
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ error: 'Please authenticate.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
        res.status(201).send({ user: { email: user.email, role: user.role }, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Unable to login');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
        res.send({ user: { email: user.email, role: user.role }, token });
    } catch (e) {
        res.status(400).send({ error: 'Invalid login credentials' });
    }
});

app.get('/api/cars', async (req, res) => {
    const cars = await Car.findAll();
    res.send(cars);
});

app.get('/api/cars/:id', async (req, res) => {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).send();
    res.send(car);
});

app.post('/api/cars', auth, async (req, res) => {
    // Only admin or simulation
    const car = await Car.create(req.body);
    res.status(201).send(car);
});

// Seed data function
const seedData = async () => {
    await sequelize.sync({ force: true });

    // Create admin
    const hashedPassword = await bcrypt.hash('admin123', 8);
    await User.create({ email: 'admin@puntocar.com', password: hashedPassword, role: 'admin' });

    // Create sample cars
    const sampleCars = [
        {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2022,
            price: 25000,
            mileage: 15000,
            transmission: 'Automatic',
            fuel: 'Gasoline',
            color: 'White',
            description: 'Excellent condition, like new.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1621339011221-16089853905c?q=80&w=1000&auto=format&fit=crop']),
            status: 'available'
        },
        {
            brand: 'Honda',
            model: 'Civic',
            year: 2021,
            price: 22000,
            mileage: 30000,
            transmission: 'Automatic',
            fuel: 'Gasoline',
            color: 'Black',
            description: 'Well maintained, one owner.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1594508601248-20d755714341?q=80&w=1000&auto=format&fit=crop']),
            status: 'available'
        },
        {
            brand: 'Volkswagen',
            model: 'Golf',
            year: 2023,
            price: 28000,
            mileage: 5000,
            transmission: 'Manual',
            fuel: 'Gasoline',
            color: 'Red',
            description: 'Sporty and reliable.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000&auto=format&fit=crop']),
            status: 'available'
        },
        {
            brand: 'Ford',
            model: 'Mustang',
            year: 2020,
            price: 45000,
            mileage: 20000,
            transmission: 'Automatic',
            fuel: 'Gasoline',
            color: 'Blue',
            description: 'Iconic muscle car, raw power.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1584345604481-0304e76993a4?q=80&w=1000&auto=format&fit=crop']),
            status: 'available'
        },
        {
            brand: 'BMW',
            model: 'Series 3',
            year: 2022,
            price: 38000,
            mileage: 12000,
            transmission: 'Automatic',
            fuel: 'Gasoline',
            color: 'Grey',
            description: 'Luxury and performance combined.',
            images: JSON.stringify(['https://images.unsplash.com/photo-1555214107-f2e7c485a488?q=80&w=1000&auto=format&fit=crop']),
            status: 'available'
        }
    ];

    await Car.bulkCreate(sampleCars);
    console.log('Database seeded!');
};

sequelize.authenticate().then(() => {
    console.log('Database connected!');
    seedData();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log('Error connecting to database: ' + err));
