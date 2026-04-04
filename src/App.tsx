import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';import { MapPin, Calendar, Sun, Moon, Briefcase, Code2, Wrench, Mail, Github, Linkedin, Terminal, Brain, ArrowRight, ArrowLeft, FileSpreadsheet, MessageSquare, Cloud, Zap, Cpu, GitBranch, Activity, Smartphone, Layers, Monitor, Sparkles, Home, User, Download, Award } from 'lucide-react';
import CustomCursor from './components/CustomCursor'
import aboutImage from '/images/about-me.jpg';

const Typewriter = ({ phrases }: { phrases: string[] }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 30 : 80;
    const delay = !isDeleting && text === currentPhrase 
      ? 2500 
      : isDeleting && text === '' 
        ? 500 
        : typeSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <span className="inline-block" aria-live="polite">
      {text}<span className="animate-pulse text-theme-muted font-sans font-light" aria-hidden="true">|</span>
    </span>
  );
};

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setHasEntered(true);
      }
    };
    if (!hasEntered) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [hasEntered]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const experience = [
    {
      role: "Software Test Engineer",
      company: "Works Applications Co. Ltd",
      duration: "Jan 2020 - Present",
      location: "Singapore",
      description: [
        "Delivered QA for HUE EBM (JIIMA-certified compliance system) and Datagate (SaaS data platform)",
        "Validated large-scale data migrations (HVR/DMS) and integrations with SQL (Oracle, Postgres)",
        "Executed backend batch validations across AWS and on-premise environments",
        "Owned end-to-end automation strategy, building framework and 2k+ regression suite from scratch using Selenium, Cucumber, RestAssured, and Serenity BDD for web and api.",
        "Built AWS SSM (EC2) runners and Jenkins pipelines for CI supporting parallel executions",
        "Developed real-time test reporting via Google Chat webhooks",
        "Implemented OAuth/SSO security test suites and conducted JMeter performance testing"
      ],
      tags: ["Selenium", "Cucumber", "RestAssured", "Serenity BDD", "AWS", "Jenkins", "JMeter", "SQL"]
    },
    {
      role: "Test Automation Engineer",
      company: "Pepper Financial Services Group",
      duration: "Jan 2019 - Dec 2019",
      location: "Sydney, Australia",
      description: [
        "Delivered QA for loan application systems across UI, backend processing, and reporting",
        "Automated framework (Selenium, TestNG, RestAssured, Winium); transitioned to BDD (Cucumber)",
        "Migrated 800+ integration tests, reducing the regression cycle from 5 days to 2 days",
        "Configured Docker and Jenkins pipelines for scheduled nightly/weekly regression runs",
        "Built a BDD test generator (Google Apps Script) to automate Cucumber scenario creation",
        "Validated MuleSoft APIs and expanded functional test coverage by 80%"
      ],
      tags: ["Selenium", "TestNG", "RestAssured", "Cucumber", "Docker", "Jenkins", "MuleSoft"]
    },
    {
      role: "Test Automation Engineer",
      company: "Appsolutely Inc",
      duration: "Oct 2017 - Dec 2018",
      location: "Manila, Philippines",
      description: [
        "Delivered QA for F&B systems (Starbucks, Bistro Group, FamilyMart) related to payments and POS integration",
        "Built web and mobile automation frameworks from scratch (Selenium Java, Appium Python)",
        "Developed API regression suites (Postman, JavaScript)",
        "Managed automated runs in TeamCity and defect tracking (JIRA, Rally)"
      ],
      tags: ["Selenium", "Java", "Appium", "Python", "Postman", "TeamCity"]
    },
    {
      role: "Software Test Engineer",
      company: "Capgemini",
      duration: "Aug 2014 - Sep 2017",
      location: "Multiple Locations",
      description: [
        "Supported QA for Global Payments credit card acquiring systems.",
        "Developed test cases, smoke/functional automation test scripts in Selenium-Java.",
        "Validated data integrity using SQL (MySQL, Oracle) and track defects via HPQC-ALM",
        "Delivered daily stakeholder status reports and collaborating across multiple locations (Japan, India, USA)"
      ],
      tags: ["Selenium", "Java", "SQL", "HPQC-ALM"]
    }
  ];

  const internalTools = [
    {
      title: "BDD Test Case Generator",
      description: "Google Apps Script tool that writes structured Cucumber scenarios to Sheets, complete with dropdowns and dashboards.",
      tags: ["Google Apps Script", "Cucumber", "Google Sheets"],
      icon: FileSpreadsheet
    },
    {
      title: "Test Report Alert Cards",
      description: "Rich Cards v1 webhook payloads for Google Chat - surfacing build health directly to the team.",
      tags: ["Google Chat", "Webhooks", "Reporting"],
      icon: MessageSquare
    },
    {
      title: "AWS Regression Runner",
      description: "SSM Run Command automation to trigger Selenium suites on EC2 - no pipeline changes required.",
      tags: ["AWS SSM", "EC2", "Selenium"],
      icon: Cloud
    },
    {
      title: "Playwright Migration",
      description: "Migrated legacy Selenium test suites to Playwright with parallel execution to drastically reduce test run times.",
      tags: ["Playwright", "Selenium", "Parallel Execution"],
      icon: Zap
    }
  ];

  const SKILLS_DATA = [
    { title: 'Automation Framework', icon: Cpu, skills: ['Selenium', 'Playwright', 'TestNG', 'Cucumber', 'Maven', 'Junit'] },
    { title: 'Programming Language', icon: Code2, skills: ['Java', 'Python', 'JavaScript', 'AppScript'] },
    { title: 'AI Related', icon: Brain, skills: ['GitHub Copilot', 'Cursor', 'GenAI Test Design', 'Model Validation', 'AI Reporting'] },
    { title: 'API Testing', icon: Sparkles, skills: ['Postman', 'REST Assured', 'SoapUI'] },
    { title: 'CI/CD Tools', icon: GitBranch, skills: ['Jenkins', 'GitLab CI', 'GitHub Actions'] },
    { title: 'Performance Testing', icon: Activity, skills: ['Jmeter', 'Taurus'] },
    { title: 'Mobile & Database', icon: Smartphone, skills: ['Appium', 'Emulators', 'Postgres', 'Oracle', 'MySQL'] },
    { title: 'Infrastructure', icon: Cloud, skills: ['AWS', 'Azure'] },
    { title: 'Testing Management', icon: Layers, skills: ['JIRA', 'HPQCALM', 'Rally', 'Confluence', 'Teams'] },
    { title: 'IDE & Process', icon: Monitor, skills: ['IntelliJ', 'Visual Studio', 'Agile'] },
  ];

  return (
    <>
      <CustomCursor />
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-screen w-screen flex flex-col items-center justify-center text-theme-main fixed inset-0 z-50 cursor-pointer focus-visible:ring-4 focus-visible:ring-theme-accent focus-visible:outline-none"
          onClick={() => setHasEntered(true)}
          role="button"
          tabIndex={0}
          aria-label="Enter portfolio"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setHasEntered(true);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif tracking-[0.2em] uppercase font-light px-4">
              Jahdiel Reeve<br/><span className="text-theme-muted">Macatangay</span>
            </h1>
            <p className="text-theme-muted tracking-[0.3em] uppercase text-xs md:text-sm">
              Software Test Engineer
            </p>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="pt-12 text-[10px] text-theme-muted tracking-[0.3em] uppercase"
              aria-hidden="true"
            >
              [ Enter ]
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen relative pb-24"
        >
          
          {/* Main Content */}
          <main className="container-narrow pt-16 md:pt-20 flex flex-col gap-8 pb-8 items-center">
            
            {/* Hero Section */}
            <section id="home" className="min-h-[70vh] flex flex-col justify-center items-center text-center w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-6 items-center w-full"
              >
                <div className="flex items-center justify-center gap-2 text-theme-muted text-xs tracking-[0.2em] uppercase font-medium mb-4">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Singapore</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-theme-main leading-[1.3] text-center w-full text-balance">
                  I <span className="font-serif italic font-normal text-theme-accent"><Typewriter phrases={['test', 'break', 'question', 'predict', 'protect']} /></span> the things<br className="hidden sm:block" />
                  you ship to the world.
                </h1>
                
                <p className="text-[10px] sm:text-xs md:text-sm text-theme-muted tracking-[0.2em] uppercase max-w-xl leading-relaxed text-center mt-8 text-balance">
                  Automation &middot; QA Strategy &middot; AI-Driven Testing
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4">
                  <button onClick={() => scrollTo('work')} className="bg-theme-main text-theme-bg px-6 py-3 rounded-full font-medium hover:opacity-90 transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none">
                    View Work
                  </button>
                  <button onClick={() => scrollTo('contact')} className="glass-pill text-theme-main px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-theme-glass transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Contact
                  </button>
                </div>
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="flex flex-col gap-8 scroll-mt-32 items-center text-center w-full">

              <div className="relative">
                <div className="absolute inset-0 bg-theme-accent/20 blur-xl rounded-full"></div>
                <img
                  src={aboutImage}
                  alt="Jahdiel Reeve Macatangay"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-theme-border relative z-10 shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <button 
                onClick={() => setHasEntered(false)}
                className="group flex items-center justify-center gap-3 text-lg sm:text-xl font-serif text-theme-main hover:text-theme-accent transition-colors focus-visible:outline-none"
                aria-label="Back to intro"
                title="Back to intro"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" aria-hidden="true" />
                <h2>Jahdiel Reeve Macatangay</h2>
              </button>

              <div className="flex items-center divide-x divide-theme-muted/10 border border-theme-muted/10 rounded-lg overflow-hidden w-fit mt-2">
                <div className="px-4 py-2 text-xs font-mono text-theme-accent tracking-widest">10+ yrs</div>
                <div className="px-4 py-2 text-xs font-mono text-theme-muted tracking-widest">AI-driven</div>
                <div className="px-4 py-2 text-xs font-mono text-theme-muted tracking-widest">Fintech, ETL & SaaS</div>
  
              </div>

              <div className="flex flex-col max-w-2xl">

                <p className="font-serif text-xl sm:text-2xl text-theme-primary font-normal leading-snug mb-5">
                  I'm a full-stack tester with 10+ years of hands-on experience bridging the gap between traditional testing and modern AI tools.
                </p>

                <div className="flex flex-col gap-4 text-sm sm:text-base text-theme-muted leading-relaxed text-justify indent-4">
                  <p>I don't want QA to be the bottleneck. Across every team I've worked with, the challenges are the same: matching deployment speeds, scaling complex infrastructure, and spending way too much time fixing old scripts.</p>
                  <p>My goal is to turn AI potential into practical results, using self-healing automation and predictive risk assessment to enable faster, more confident delivery.</p>
                  <p>I'm currently leaning into AI-driven testing and creating proactive, low-maintenance testing solutions, particularly in ETL and SaaS space.</p>
                </div>

                <div className="flex items-start gap-3 mt-6 pt-6 border-t border-theme-muted/10">
                  <div className="w-1 h-1 rounded-full bg-amber-600/70 mt-2 shrink-0" />
                  <p className="text-xs sm:text-sm text-theme-muted/60 leading-relaxed font-mono tracking-wide">
                    Beyond work, i collect Miffy things, drink lots of matcha, try new recipes and enjoy weekend walks with a camera.
                  </p>
                </div>

              </div>
            </section>

            {/* Work / Experience Section */}
            <section id="work" className="flex flex-col gap-8 scroll-mt-32 items-center text-center w-full">
              <div className="flex items-center justify-center gap-3 text-lg sm:text-xl font-serif text-theme-main">
                <Briefcase className="w-5 h-5 opacity-70" aria-hidden="true" />
                <h2>Work Experience</h2>
              </div>
              
              <div className="w-full text-left flex flex-col gap-6">
                {experience.map((job, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.15, 
                      ease: [0.21, 0.47, 0.32, 0.98] 
                    }}
                    className="glass-pill p-6 md:p-8 rounded-2xl flex flex-col hover:bg-theme-glass hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 w-full"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                      <div className="flex flex-col text-center md:text-left">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-theme-main text-balance">
                          {job.role}
                        </h3>
                        <div className="text-theme-muted mt-1 text-sm sm:text-base md:text-lg text-balance">
                          {job.company}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-xs md:text-sm text-theme-muted items-center md:items-end">
                        <span className="flex items-center md:justify-end"><Calendar className="w-4 h-4 mr-2 opacity-70" aria-hidden="true" />{job.duration}</span>
                        <span className="flex items-center md:justify-end"><MapPin className="w-4 h-4 mr-2 opacity-70" aria-hidden="true" />{job.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      <ul className="space-y-3 mb-8">
                        {job.description.map((bullet, i) => (
                          <li key={i} className="text-theme-muted leading-relaxed text-sm md:text-base flex items-start">
                            <span className="text-theme-accent mr-3 mt-1.5 text-[10px]">✦</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-theme-border/50">
                        {job.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 bg-theme-glass text-theme-main rounded-md border border-theme-border">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Tools Section */}
            <section id="tools" className="flex flex-col gap-8 scroll-mt-32 items-center text-center w-full">
              <div className="flex flex-col gap-4 items-center">
                <div className="flex items-center justify-center gap-3 text-lg sm:text-xl font-serif text-theme-main">
                  <Wrench className="w-5 h-5 opacity-70" aria-hidden="true" />
                  <h2>Things I've Built, Broken and Fixed</h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-theme-muted leading-relaxed font-serif max-w-2xl text-center text-pretty">
                  Beyond testing, I build internal tools to make our team's life easier. Here are a few things I've created to speed up our workflows:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {internalTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <div key={index} className="glass-pill p-8 rounded-2xl flex flex-col items-center text-center h-full hover:bg-theme-glass hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
                      <div className="mb-5 text-theme-muted flex justify-center">
                        <Icon className="w-8 h-8" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium text-theme-main mb-3 text-balance">
                        {tool.title}
                      </h3>
                      <p className="text-theme-muted mb-8 text-xs sm:text-sm leading-relaxed flex-grow text-pretty">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mt-auto">
                        {tool.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 bg-theme-glass text-theme-main rounded-md border border-theme-border">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="flex flex-col gap-8 scroll-mt-32 items-center text-center w-full">
              <div className="flex items-center justify-center gap-3 text-lg sm:text-xl font-serif text-theme-main">
                <Code2 className="w-5 h-5 opacity-70" aria-hidden="true" />
                <h2>Technical Skills</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 w-full">
                {SKILLS_DATA.map((category) => (
                  <div key={category.title} className="flex flex-col gap-4 items-center">
                    <h3 className="text-xs text-theme-muted font-bold uppercase tracking-wider flex items-center justify-center space-x-2">
                      <category.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{category.title}</span>
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {category.skills.map(tool => (
                        <span key={tool} className="text-xs px-3 py-1.5 glass-pill text-theme-main rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="flex flex-col gap-8 scroll-mt-32 items-center text-center w-full">
              <div className="flex items-center justify-center gap-3 text-lg sm:text-xl font-serif text-theme-main">
                <Award className="w-5 h-5 opacity-70" aria-hidden="true" />
                <h2>Certifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="glass-pill p-6 rounded-2xl flex flex-col items-center text-center h-full hover:bg-theme-glass hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-sm sm:text-base font-medium text-theme-main mb-2 text-balance">
                    ISTQB-ISEB Agile Tester Foundation Level
                  </h3>
                  <div className="mt-auto">
                    <span className="text-[10px] px-2 py-1 bg-theme-glass text-theme-main rounded-md border border-theme-border">
                      Issued Dec 2022
                    </span>
                  </div>
                </div>
                
                <div className="glass-pill p-6 rounded-2xl flex flex-col items-center text-center h-full hover:bg-theme-glass hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-sm sm:text-base font-medium text-theme-main mb-2 text-balance">
                    ISTQB-ISEB Certified Tester Foundation Level
                  </h3>
                  <div className="mt-auto">
                    <span className="text-[10px] px-2 py-1 bg-theme-glass text-theme-main rounded-md border border-theme-border">
                      Issued Dec 2014
                    </span>
                  </div>
                </div>

                <div className="glass-pill p-6 rounded-2xl flex flex-col items-center text-center h-full hover:bg-theme-glass hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-sm sm:text-base font-medium text-theme-main mb-4 text-balance">
                    ITIL V4 Foundation Level
                  </h3>
                  <div className="mt-auto">
                    <span className="text-[10px] px-2 py-1 bg-theme-glass text-theme-main rounded-md border border-theme-border">
                      Issued Nov 2014
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="flex flex-col gap-6 scroll-mt-32 items-center text-center w-full">
              <div className="flex items-center justify-center gap-3 text-lg sm:text-xl font-serif text-theme-main">
                <Mail className="w-5 h-5 opacity-70" aria-hidden="true" />
                <h2>Contact</h2>
              </div>
              <div className="flex flex-col gap-4 text-sm sm:text-base md:text-lg text-theme-muted leading-relaxed max-w-2xl text-center text-pretty">
                <p className="text-xl sm:text-2xl md:text-3xl text-theme-main mb-2 font-serif text-balance">
                  Let's build quality<br />that scales with you.
                </p>
                <p>
                  Whether you need some extra hands, rethinking your automation strategy, or exploring AI-driven testing, let's chat.
                </p>
              </div>
              
              <div className="pt-8 flex flex-col items-center gap-8">
                <div className="flex items-center justify-center space-x-4">
                  <a href="mailto:jahdiel.macatangay09@gmail.com" aria-label="Email Contact" className="p-3 glass-pill rounded-full text-theme-muted hover:text-theme-main transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a href="https://github.com/macjear" aria-label="GitHub Profile" className="p-3 glass-pill rounded-full text-theme-muted hover:text-theme-main transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none">
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a href="https://www.linkedin.com/in/macjear/" aria-label="LinkedIn Profile" className="p-3 glass-pill rounded-full text-theme-muted hover:text-theme-main transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none">
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
                
                <a
                  href="https://drive.google.com/file/d/195g2ohPvav-YOdP6-BXTWSl2j1BOTYl7/view?usp=sharing"
                  className="group flex items-center gap-2 text-sm text-theme-muted hover:text-theme-accent transition-colors pb-1 border-b border-transparent hover:border-theme-accent/50"
                  download
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </div>
            </section>

          </main>

          {/* Bottom Nav Dock */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex flex-col items-center gap-2">
              <nav className="glass-nav px-2 py-2 rounded-full flex items-center gap-1" aria-label="Main navigation">
                {[
                  { name: 'Home', icon: Home },
                  { name: 'About', icon: User },
                  { name: 'Work', icon: Briefcase },
                  { name: 'Tools', icon: Wrench },
                  { name: 'Skills', icon: Code2 }
                ].map((item) => {
                  const id = item.name.toLowerCase();
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.name}
                      onClick={() => scrollTo(id)}
                      aria-current={activeSection === id ? 'page' : undefined}
                      aria-label={item.name}
                      title={item.name}
                      className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none flex items-center justify-center ${activeSection === id ? 'bg-theme-glass text-theme-main' : 'text-theme-muted hover:text-theme-main'}`}
                    >
                      <Icon className="w-4 h-4 md:hidden" />
                      <span className="hidden md:inline">{item.name}</span>
                    </button>
                  );
                })}
                <div className="w-px h-4 bg-theme-border mx-1 md:mx-2" aria-hidden="true"></div>
                <button 
                  onClick={() => scrollTo('contact')} 
                  aria-label="Contact" 
                  title="Contact" 
                  className="bg-theme-main text-theme-bg px-3 md:px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 md:hidden" />
                  <span className="hidden md:inline">Contact</span>
                </button>
                <div className="w-px h-4 bg-theme-border mx-1 md:mx-2" aria-hidden="true"></div>
                <button 
                  onClick={() => setIsLightMode(!isLightMode)}
                  className="p-2 rounded-full text-theme-muted hover:text-theme-main transition-colors focus-visible:ring-2 focus-visible:ring-theme-accent focus-visible:outline-none"
                  aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
                  title={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {isLightMode ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
                </button>
              </nav>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
