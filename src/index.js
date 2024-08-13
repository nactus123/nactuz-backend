import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.all('*', (req, res, next) => {
  next(new Error('Page Not Found', 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
