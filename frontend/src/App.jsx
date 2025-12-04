import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllCategoriesPage from './pages/AllCategoriesPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AllProductsPage from './pages/AllProductsPage';
import DiscountedPage from './pages/DiscountedPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<AllCategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/all-products" element={<AllProductsPage />} />
        <Route path="/discounted" element={<DiscountedPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}