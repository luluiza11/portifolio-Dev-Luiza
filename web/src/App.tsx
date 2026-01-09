import React, { useState } from 'react';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">Luiza</h1>
          <nav className="nav">
            <a href="#home">Início</a>
            <a href="#about">Sobre</a>
            <a href="#work">Trabalhos</a>
            <a href="#contact">Contato</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h2 className="hero-title">Desenvolvedora Front-End</h2>
          <p className="hero-subtitle">
            Crio interfaces modernas, responsivas e acessíveis com React, TypeScript e muito cuidado com a experiência do usuário.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Vamos trabalhar juntos</a>
            <a href="#work" className="btn btn-secondary">Ver projetos</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">Sobre mim</h3>
          <p className="section-description">Desenvolvedora Júnior apaixonada por código limpo e design responsivo</p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <h4>Front-End Moderno</h4>
            <p>React, Vue.js, TypeScript e as melhores práticas de desenvolvimento web.</p>
          </div>
          <div className="about-card">
            <h4>Responsivo & Acessível</h4>
            <p>Interfaces que funcionam em qualquer dispositivo e são acessíveis para todos.</p>
          </div>
          <div className="about-card">
            <h4>PWA & Performance</h4>
            <p>Aplicações web progressivas, otimizadas para velocidade e offline-first.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const projects = [
    {
      title: "E-commerce Moderno",
      description: "Plataforma completa com React, carrinho persistente e pagamento integrado.",
      tech: ["React", "TypeScript", "Stripe"]
    },
    {
      title: "Dashboard Analytics",
      description: "Painel administrativo com gráficos interativos e dados em tempo real.",
      tech: ["Vue.js", "Chart.js", "Firebase"]
    },
    {
      title: "App PWA Responsivo",
      description: "Aplicação web progressiva com suporte offline e sincronização de dados.",
      tech: ["React", "PWA", "TypeScript"]
    }
  ];

  return (
    <section id="work" className="work">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">Trabalhos Recentes</h3>
          <p className="section-description">Alguns dos projetos mais impactantes que desenvolvi</p>
        </div>
        <div className="work-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="work-card">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((t, i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    const phone = '5598984970428';
    const text = `*Novo contato*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Assunto:* ${encodeURIComponent(subject)}%0A%0A*Mensagem:*%0A${encodeURIComponent(message)}`;
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, '_blank');
    setFormData({ name: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">Vamos Conversar</h3>
          <p className="section-description">Estou sempre aberta para novas oportunidades</p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Assunto</label>
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Tema da mensagem"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem..."
              rows={5}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Luiza</h4>
            <p>Desenvolvedora Front-End & Designer</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#about">Sobre</a></li>
              <li><a href="#work">Projetos</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Redes</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Luiza. Desenvolvido com React + TypeScript + PWA.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="app-root">
      <Header />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
