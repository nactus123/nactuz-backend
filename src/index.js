import express from 'express';
import router from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router for the '/register' path
app.use('/user', router); // If the base path in the router is '/register', this will work

app.all('*', (req, res, next) => {
  next(new Error('Page Not Found'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ msg: err.message || 'Something went wrong' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
