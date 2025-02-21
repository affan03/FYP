import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Works from './components/Works';
import MyProfile from './components/Profile/MyProfile';
import Login from './components/Login';
import Signup from './components/Signup';
import UploadPic from './components/Profile/UploadPic';
import EditForm from './components/Profile/EditForm';
import ModalPage from './components/Profile/ModalPage';
import ChatbotComponent from './components/ChatbotComponent';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/howitworks" element={<Works />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadPic />} />
          <Route path="/modal-page" element={<ModalPage />} />
          <Route path="/editform" element={<EditForm />} />
        </Routes>
        <ChatbotComponent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
