import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout';
import PrivateLayout from './layouts/PrivateLayout';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Projects from './pages/Projects';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
          </Route>

          <Route path="/projects" element={<PrivateLayout />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
