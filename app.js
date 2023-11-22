const express = require("express");
const productShippingRoutes = require("./routes/productShippingRoutes");
const app = express();

// Middleware untuk parsing body dari request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gunakan rute untuk product shipping
app.use("/api", productShippingRoutes);

// Middleware untuk penanganan kesalahan jika rute tidak ditemukan
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Middleware untuk penanganan kesalahan lainnya
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
