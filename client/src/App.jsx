import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import TodoDemo from './components/TodoDemo';

function HomeScreen() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/demos/todo" element={<TodoDemo />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App;
