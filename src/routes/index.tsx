import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sun, Moon, ArrowUpRight, Zap, House, Building2, BatteryCharging, Check, Menu, X, Leaf, ShieldCheck, CircleDollarSign, ChevronDown, Sparkles, Instagram, MessageCircle } from "lucide-react";
import "../solar.css";
import { Button } from "@/components/ui/button";
import heroDay from "@/assets/hero-day.png.asset.json";
import heroNight from "@/assets/hero-night.png.asset.json";
import solarHome from "@/assets/solar-home.jpg";
import solarCommercial from "@/assets/solar-commercial.jpg";
import solarBattery from "@/assets/solar-battery.jpg";
import solarInstallation from "@/assets/solar-installation.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Solar System — Energia inteligente para sua vida" },
    { name: "description", content: "Descubra seu potencial solar e simule quanto pode economizar na conta de luz." },
    { property: "og:title", content: "Solar System — Energia inteligente para sua vida" },
    { property: "og:description", content: "Energia solar com projeto inteligente, instalação segura e economia de verdade." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SolarHome,
});

function SolarHome() {
  const [introVisible, setIntroVisible] = useState(true);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroVisible(false);
      return;
    }
    document.body.classList.add("solar-intro-lock");
    const introLogo = document.querySelector<HTMLElement>(".solar-intro-wordmark");
    const headerBrand = document.querySelector<HTMLElement>(".site-header .brand");
    if (introLogo && headerBrand) {
      const target = headerBrand.getBoundingClientRect();
      introLogo.style.setProperty("--logo-dx", `${target.left + target.width / 2 - window.innerWidth / 2}px`);
      introLogo.style.setProperty("--logo-dy", `${target.top + target.height / 2 - window.innerHeight / 2}px`);
      introLogo.style.setProperty("--logo-scale", String(Math.min(1, target.width / 250)));
    }
    const finish = window.setTimeout(() => {
      setIntroVisible(false);
      document.body.classList.remove("solar-intro-lock");
    }, 5100);
    return () => {
      window.clearTimeout(finish);
      document.body.classList.remove("solar-intro-lock");
    };
  }, []);
  const skipIntro = () => {
    setIntroVisible(false);
    document.body.classList.remove("solar-intro-lock");
  };
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(
      ".trust-strip, .intro-heading, .solution-card, .benefits-visual, .benefits-copy, .calculator-copy, .calculator-card, .process-heading, .process-grid article, .projects-top, .project-gallery figure, .contact-inner, .contact-side, .footer-main"
    );
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
    targets.forEach((target) => {
      target.classList.add("reveal-item");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  const [night, setNight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bill, setBill] = useState(650);
  const [state, setState] = useState("DF");
  const [property, setProperty] = useState("Residencial");
  const [calculated, setCalculated] = useState(false);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const sunHours: Record<string, number> = { DF: 5.4, GO: 5.3, MG: 5.2, SP: 4.8, RJ: 4.7, BA: 5.7, CE: 5.8, PE: 5.6, PR: 4.5, RS: 4.3, SC: 4.4, MT: 5.4, MS: 5.2, TO: 5.5, PA: 5.1, AM: 4.7, ES: 4.8, other: 5 };
  const result = useMemo(() => {
    const tariff = 0.95;
    const consumption = bill / tariff;
    const kwp = consumption / ((sunHours[state] || 5) * 30 * 0.78);
    const panels = Math.ceil(kwp / 0.55);
    const generation = kwp * (sunHours[state] || 5) * 30 * 0.78;
    const monthlySavings = bill * 0.82;
    const investment = kwp * (property === "Comercial" ? 4200 : 4800);
    return { kwp, panels, generation, monthlySavings, annual: monthlySavings * 12, investment, payback: investment / (monthlySavings * 12), co2: generation * 0.000084 * 12 };
  }, [bill, state, property]);
  const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const sendWhatsApp = () => {
    const message = `Olá! Meu nome é ${name}. Preciso de: ${need}.`;
    window.open(`https://wa.me/61000000000?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  const [need, setNeed] = useState("");
  return <main className={night ? "solar-page night-mode" : "solar-page"}>
    {introVisible && <div className="solar-intro" role="dialog" aria-label="Abertura Solar System" aria-modal="true">
      <button className="solar-intro-skip" type="button" onClick={skipIntro}>Pular</button>
      <div className="solar-intro-scene" aria-hidden="true">
        <div className="solar-intro-orbit"><span className="solar-intro-ray ray-1"/><span className="solar-intro-ray ray-2"/><span className="solar-intro-ray ray-3"/><span className="solar-intro-ray ray-4"/><span className="solar-intro-ray ray-5"/><span className="solar-intro-ray ray-6"/><span className="solar-intro-ray ray-7"/><span className="solar-intro-ray ray-8"/><span className="solar-intro-sun"><span/></span><span className="solar-intro-beam"/></div>
        <div className="solar-intro-wordmark"><span className="solar-intro-mark"><Sun size={29} strokeWidth={1.6}/></span><span>SOLAR<span>SYSTEM</span><small>ENERGIA QUE TRANSFORMA</small></span></div>
      </div>
      <div className="solar-intro-caption">ENERGIA INTELIGENTE. NOVAS POSSIBILIDADES.</div>
    </div>}
    <header className={(night ? "site-header header-night" : "site-header header-day")}>
      <a className="brand" href="#" aria-label="Solar System início"><span className="brand-mark"><Sun size={25} strokeWidth={2.2}/></span><span>SOLAR<span className="brand-light">SYSTEM</span><small>ENERGIA QUE TRANSFORMA</small></span></a>
      <Button variant="ghost" className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X/> : <Menu/>}</Button>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"}><a href="#solucoes" onClick={() => setMenuOpen(false)}>Soluções</a><a href="#vantagens" onClick={() => setMenuOpen(false)}>Vantagens</a><a href="#processo" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a><a href="#calculadora" onClick={() => setMenuOpen(false)}>Calculadora</a><a href="#contato" onClick={() => setMenuOpen(false)}>Fale conosco</a></nav>
      <div className="header-actions">
        <a className="social-icon header-social-link" href="https://wa.me/61000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.8 11.8 0 0 0 12.13 0C5.58 0 .25 5.33.25 11.88c0 2.09.55 4.13 1.59 5.93L.15 24l6.34-1.66a11.9 11.9 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.5-8.41ZM12.14 21.75h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.76.99 1-3.67-.24-.38a9.85 9.85 0 0 1-1.51-5.23c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
        </a>
        <a className="social-icon header-social-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><Instagram size={18} strokeWidth={1.6}/></a>
        <Button variant="ghost" className="header-cta" onClick={() => goTo("contato")}>Solicitar orçamento <ArrowUpRight size={16}/></Button>
      </div>
    </header>
    <section className={night ? "hero hero-night" : "hero"}>
      <img className="hero-image hero-layer-day" src={heroDay.url} alt="Casa com energia solar durante o dia" fetchPriority="high" />
      <img className="hero-image hero-layer-night" src={heroNight.url} alt="Casa com energia solar iluminada à noite" />
      <div className="hero-content"><div className="eyebrow eyebrow-light"><span/> O futuro da energia começa no seu telhado</div><h1>O sol trabalha.<br/>Você <em>economiza.</em></h1><p>Transforme a luz do sol em liberdade financeira com energia solar feita sob medida para sua casa ou empresa.</p><div className="hero-actions"><Button variant="ghost" className="btn-primary" onClick={() => goTo("calculadora")}>Calcule sua economia <ArrowUpRight size={18}/></Button><Button variant="ghost" className="btn-ghost" onClick={() => goTo("solucoes")}>Conheça as soluções</Button><Button variant="ghost" className="hero-contact-cta" onClick={() => goTo("contato")}>Fale conosco <ArrowUpRight size={17}/></Button></div><div className="hero-proof"><div className="proof-avatars"><span>✓</span><span>☀</span><span>↗</span></div><div><strong>Energia inteligente, sem complicação.</strong></div></div></div>
      <Button variant="ghost" className="day-night-toggle" onClick={() => setNight(!night)} aria-label="Alternar imagem diurna e noturna"><span className={!night ? "toggle-icon active" : "toggle-icon"}><Sun size={16}/> Dia</span><span className={night ? "toggle-icon active" : "toggle-icon"}><Moon size={16}/> Noite</span></Button><div className="hero-caption"><span className="caption-line"/> SOLAR, DO SEU JEITO <span>01 / 04</span></div><div className="hero-stat"><span className="stat-icon"><Zap size={19}/></span><div><strong>Até <b>95%</b></strong><small>de redução na parcela de energia*</small></div></div>
    </section>
    <section className="trust-strip"><div><strong>25 anos+</strong><span>de vida útil dos painéis</span></div><i/><div><strong>Energia renovável</strong><span>mais leve para o planeta</span></div><i/><div><strong>Projeto completo</strong><span>da análise à homologação</span></div><i/><div><strong>Suporte próximo</strong><span>em cada etapa</span></div></section>
    <section className="intro-section section-wrap" id="solucoes"><div className="section-kicker">Nossas soluções</div><div className="intro-heading"><h2>Energia solar que<br/><em>faz sentido pra você.</em></h2><p>Mais do que instalar painéis, criamos um plano de energia inteligente que respeita seu espaço, sua rotina e seus objetivos.</p></div><div className="solution-grid"><article className="solution-card solution-feature"><div className="solution-top"><span className="line-icon"><House/></span><span className="card-index">01 / RESIDENCIAL</span></div><h3>Sua casa, com mais liberdade.</h3><p>Produza sua própria energia e transforme uma despesa mensal em um investimento de longo prazo.</p><Button variant="ghost" onClick={() => {setProperty("Residencial");goTo("calculadora")}}>Simular para minha casa <ArrowUpRight size={17}/></Button><img className="solution-image home-image" src={solarHome} alt="Casa com painéis solares no telhado" loading="lazy" width={1536} height={1024}/></article><article className="solution-card"><div className="solution-top"><span className="line-icon"><Building2/></span><span className="card-index">02 / COMERCIAL</span></div><h3>Mais eficiência para o seu negócio.</h3><p>Reduza custos operacionais e direcione recursos para o que faz sua empresa crescer.</p><Button variant="ghost" onClick={() => {setProperty("Comercial");goTo("calculadora")}}>Solar para empresas <ArrowUpRight size={17}/></Button><img className="solution-image business-image" src={solarCommercial} alt="Telhado comercial equipado com painéis solares" loading="lazy" width={1536} height={1024}/></article><article className="solution-card"><div className="solution-top"><span className="line-icon"><BatteryCharging/></span><span className="card-index">03 / ARMAZENAMENTO</span></div><h3>Energia pronta quando precisar.</h3><p>Conheça soluções com baterias para ampliar sua autonomia e aproveitar melhor a energia gerada.</p><Button variant="ghost" onClick={() => goTo("contato")}>Explorar possibilidades <ArrowUpRight size={17}/></Button><img className="solution-image battery-image" src={solarBattery} alt="Bateria residencial e inversor de energia solar" loading="lazy" width={1024} height={1024}/></article></div></section>
    <section className="benefits-section" id="vantagens"><div className="benefits-inner"><div className="benefits-visual"><img src={solarInstallation.url} alt="Profissionais instalando painéis solares com equipamentos de segurança" loading="lazy" width={768} height={768}/><div className="floating-note"><span><Leaf size={20}/></span><div><strong>Uma escolha que rende</strong><small>Para você e para o planeta.</small></div></div></div><div className="benefits-copy"><div className="section-kicker">Por que Solar System</div><h2>Uma decisão de hoje.<br/><em>Benefícios por anos.</em></h2><p className="benefits-lead">A energia do sol já está aí. A gente ajuda você a aproveitar cada raio com um projeto bem pensado e transparência em todas as etapas.</p><div className="benefit-list"><div><span><CircleDollarSign/></span><div><strong>Economia que você acompanha</strong><p>Entenda os números antes de investir, sem promessas vagas.</p></div><Check className="benefit-check"/></div><div><span><ShieldCheck/></span><div><strong>Equipamentos de qualidade</strong><p>Componentes selecionados e instalação profissional.</p></div><Check className="benefit-check"/></div><div><span><Sparkles/></span><div><strong>Projeto sob medida</strong><p>Dimensionamento pensado para seu consumo e imóvel.</p></div><Check className="benefit-check"/></div></div><Button variant="ghost" className="btn-dark" onClick={() => goTo("processo")}>Conheça nosso processo <ArrowUpRight size={17}/></Button></div></div></section>
    <section className="calculator-section" id="calculadora"><div className="calculator-wrap"><div className="calculator-copy"><div className="section-kicker">Simulador solar</div><h2>Quanto você pode<br/><em>deixar de pagar?</em></h2><p>Faça uma simulação rápida usando sua conta média de energia. Ajuste os dados e veja uma estimativa de potencial para seu imóvel.</p><div className="calc-assurance"><span><ShieldCheck size={18}/></span><div><strong>Simples, transparente e sem compromisso</strong><small>Estimativa inicial — o projeto final depende de avaliação técnica.</small></div></div><div className="calc-mini-stats"><div><strong>25+ anos</strong><small>de geração potencial</small></div><div><strong>100% solar</strong><small>energia renovável</small></div></div></div>
      <div className="calculator-card"><div className="calc-card-header"><div><span className="calc-step">SIMULAÇÃO PERSONALIZADA</span><h3>Seus dados de energia</h3></div><span className="calc-sun"><Sun size={23}/></span></div><label className="field-label">Tipo de imóvel</label><div className="property-options"><Button variant="ghost" className={property === "Residencial" ? "property-option selected" : "property-option"} onClick={() => {setProperty("Residencial");setCalculated(false)}}><House size={19}/> Residencial</Button><Button variant="ghost" className={property === "Comercial" ? "property-option selected" : "property-option"} onClick={() => {setProperty("Comercial");setCalculated(false)}}><Building2 size={19}/> Comercial</Button></div><label className="field-label" htmlFor="bill">Quanto é sua conta de luz?</label><div className="bill-input"><span>R$</span><input id="bill" type="number" min="50" max="20000" value={bill} onChange={e => {setBill(Math.max(50,Math.min(20000,Number(e.target.value)||50)));setCalculated(false)}}/><small>/ mês</small></div><input className="bill-range" aria-label="Valor da conta de luz" type="range" min="100" max="2500" step="50" value={Math.min(2500,Math.max(100,bill))} onChange={e => {setBill(Number(e.target.value));setCalculated(false)}}/><div className="range-labels"><span>R$ 100</span><span>R$ 2.500+</span></div><label className="field-label" htmlFor="state">Onde fica seu imóvel?</label><div className="select-wrap"><select id="state" value={state} onChange={e => {setState(e.target.value);setCalculated(false)}}><option value="DF">Distrito Federal</option><option value="GO">Goiás</option><option value="MG">Minas Gerais</option><option value="SP">São Paulo</option><option value="RJ">Rio de Janeiro</option><option value="BA">Bahia</option><option value="CE">Ceará</option><option value="PE">Pernambuco</option><option value="PR">Paraná</option><option value="RS">Rio Grande do Sul</option><option value="SC">Santa Catarina</option><option value="MT">Mato Grosso</option><option value="MS">Mato Grosso do Sul</option><option value="TO">Tocantins</option><option value="PA">Pará</option><option value="AM">Amazonas</option><option value="ES">Espírito Santo</option><option value="other">Outro estado</option></select><ChevronDown size={17}/></div><Button variant="ghost" className="btn-primary calc-submit" onClick={() => setCalculated(true)}>Calcular minha economia <ArrowUpRight size={18}/></Button>{calculated && <div className="calc-results" aria-live="polite"><div className="results-heading"><span>SUA POSSÍVEL ECONOMIA</span><strong>{money(result.monthlySavings)}<small>/mês</small></strong></div><div className="results-grid"><div><span>Economia anual</span><strong>{money(result.annual)}</strong></div><div><span>Sistema sugerido</span><strong>{result.kwp.toFixed(1).replace(".",",")} kWp</strong></div><div><span>Painéis estimados</span><strong>{result.panels} módulos</strong></div><div><span>Geração mensal</span><strong>{Math.round(result.generation)} kWh</strong></div></div><p className="results-note">Estimativa ilustrativa baseada em médias de irradiação e tarifa de referência. Não inclui custos fixos, impostos ou análise do telhado. A economia real pode variar.</p><Button variant="ghost" className="btn-dark full-btn" onClick={() => goTo("contato")}>Quero uma análise profissional <ArrowUpRight size={17}/></Button></div>}<p className="privacy-note">Seus dados não são enviados nesta simulação.</p></div></div></section>
    <section className="process-section section-wrap" id="processo"><div className="section-kicker">Do sol ao seu lar</div><div className="process-heading"><h2>Um processo claro.<br/><em>Do início ao fim.</em></h2><p>Você entende cada etapa, acompanha as decisões e sabe o que vem depois.</p></div><div className="process-grid"><article><span className="process-number">01</span><div className="process-icon"><Sparkles/></div><h3>Conversa e análise</h3><p>Entendemos seu consumo, imóvel e o que você espera do sistema.</p></article><article><span className="process-number">02</span><div className="process-icon"><Sun/></div><h3>Projeto personalizado</h3><p>Dimensionamos o sistema e apresentamos a estimativa de geração e economia.</p></article><article><span className="process-number">03</span><div className="process-icon"><Zap/></div><h3>Instalação segura</h3><p>Equipe especializada cuida da montagem e dos detalhes técnicos.</p></article><article><span className="process-number">04</span><div className="process-icon"><Check/></div><h3>Ativação e suporte</h3><p>Acompanhamos a etapa final e orientamos você no uso do sistema.</p></article></div></section>
    <section className="projects-section" id="projetos"><div className="section-wrap"><div className="projects-top"><div><div className="section-kicker">Inspiração solar</div><h2>Projetos que geram<br/><em>novas possibilidades.</em></h2></div><p>De residências a operações comerciais, cada projeto começa com uma boa pergunta: como aproveitar melhor a energia?</p></div><div className="project-gallery"><figure className="project-large"><img src={solarHome} alt="Casa com sistema de energia solar no telhado" loading="lazy" width={1536} height={1024}/><figcaption><span>01 / RESIDENCIAL</span><strong>Mais conforto, menos desperdício.</strong></figcaption></figure><figure><img src={solarCommercial} alt="Instalação solar no telhado de um galpão comercial" loading="lazy" width={1536} height={1024}/><figcaption><span>02 / COMERCIAL</span><strong>Eficiência para crescer.</strong></figcaption></figure><figure><img src={solarBattery} alt="Bateria e inversor para armazenamento de energia solar" loading="lazy" width={1024} height={1024}/><figcaption><span>03 / TECNOLOGIA</span><strong>O poder da luz solar.</strong></figcaption></figure></div></div></section>
    <section className="contact-section" id="contato"><div className="contact-inner"><div className="section-kicker">Fale conosco</div><h2>Vamos conversar<br/>sobre <em>energia solar.</em></h2><p>Conte seu nome e como podemos ajudar. Sua mensagem será preparada para envio direto pelo WhatsApp.</p><div className="contact-number"><MessageCircle size={18}/><span>WhatsApp da empresa</span><strong>61 000000000</strong></div><form className="contact-form" onSubmit={e => {e.preventDefault();sendWhatsApp()}}><label>Seu nome<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/></label><label>O que você precisa?<textarea required value={need} onChange={e=>setNeed(e.target.value)} placeholder="Conte brevemente como podemos ajudar..." rows={4}/></label><Button variant="ghost" className="btn-primary whatsapp-submit" type="submit"><MessageCircle size={18}/> Enviar mensagem pelo WhatsApp <ArrowUpRight size={18}/></Button><small>Ao continuar, o WhatsApp será aberto com sua mensagem pronta para enviar.</small></form></div><div className="contact-side"><span className="contact-sun"><Sun size={40}/></span><strong>O sol nasce todo dia.</strong><p>Faça dele parte do seu futuro.</p><div className="contact-line"/></div></section>
    <footer className="site-footer"><div className="footer-main"><a className="brand footer-brand" href="#"><span className="brand-mark"><Sun size={25}/></span><span>SOLAR<span className="brand-light">SYSTEM</span><small>ENERGIA QUE TRANSFORMA</small></span></a><p>Energia inteligente para um futuro mais leve. Projetos solares pensados para pessoas e negócios.</p><div className="footer-links"><div><strong>Explore</strong><a href="#solucoes">Soluções</a><a href="#vantagens">Vantagens</a><a href="#processo">Como funciona</a></div><div><strong>Comece aqui</strong><a href="#calculadora">Simular economia</a><a href="#projetos">Projetos</a><a href="#contato">Fale conosco</a></div></div></div><div className="footer-socials"><Button variant="ghost" className="social-icon" aria-label="Instagram" title="Instagram — perfil ainda não informado" disabled><Instagram size={20} strokeWidth={1.5}/></Button><Button variant="ghost" className="social-icon" aria-label="Entrar em contato" title="Entrar em contato" onClick={() => goTo("contato")}><MessageCircle size={20} strokeWidth={1.5}/></Button></div><div className="footer-bottom"><span>© 2026 Solar System. Site modelo demonstrativo.</span><span>Energia limpa. Escolhas melhores. <Sun size={14}/></span></div></footer>
  </main>;
}
