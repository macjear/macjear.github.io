import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code2, Sparkles, ArrowRight, Mail, Github, Linkedin, MapPin, Cpu, Brain, GitBranch, Activity, Smartphone, Cloud, Layers, Monitor, FileSpreadsheet, MessageSquare, Wrench, Zap } from 'lucide-react';
import profileImage from '/images/profile.jpg';
import aboutImage from '/images/about-me.JPG';

const ModernCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'button' || 
                          target.tagName.toLowerCase() === 'a' || 
                          target.onclick != null || 
                          target.closest('button') != null || 
                          target.closest('a') != null;
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 12),
          y: mousePosition.y - (isHovering ? 24 : 12),
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          backgroundColor: isHovering ? 'rgba(141, 170, 145, 0.15)' : 'rgba(141, 170, 145, 0.4)',
          border: isHovering ? '1px solid rgba(141, 170, 145, 0.5)' : 'none'
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        <div className={`relative transition-transform duration-300 ${isHovering ? 'scale-75' : 'scale-100'}`} style={{ top: '-12px', left: '-12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9V4C7 2.89543 7.89543 2 9 2C10.1046 2 11 2.89543 11 4V9" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
            <path d="M13 9V4C13 2.89543 13.89543 2 15 2C16.1046 2 17 2.89543 17 4V9" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5 11C5 8.79086 6.79086 7 9 7H15C17.2091 7 19 8.79086 19 11V15C19 18.3137 16.3137 21 13 21H11C7.68629 21 5 18.3137 5 15V11Z" fill="white" stroke="#1A1A1A" strokeWidth="2"/>
            <circle cx="9.5" cy="13.5" r="1" fill="#1A1A1A"/>
            <circle cx="14.5" cy="13.5" r="1" fill="#1A1A1A"/>
            <path d="M11.5 16L12.5 17M12.5 16L11.5 17" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('about me');
  const [hasEntered, setHasEntered] = useState(false);
  const [introStage, setIntroStage] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (hasEntered) return;
    
    let isCancelled = false;
    const questions = [
      "what if a user does this?",
      "is the edge case covered?",
      "is this actually what the user really need?"
    ];

    const typeText = async () => {
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
      
      await delay(300);

      for (let qIndex = 0; qIndex < questions.length; qIndex++) {
        const q = questions[qIndex];
        
        for (let i = 0; i <= q.length; i++) {
          if (isCancelled) return;
          setTypedText(q.slice(0, i));
          await delay(40);
        }
        
        await delay(300);
        
        if (qIndex < questions.length - 1) {
          for (let i = q.length; i >= 0; i--) {
            if (isCancelled) return;
            setTypedText(q.slice(0, i));
            await delay(25);
          }
          await delay(300);
        }
      }
      
      if (!isCancelled) {
        setIntroStage(1);
      }
    };
    
    typeText();
    
    return () => {
      isCancelled = true;
    };
  }, [hasEntered]);

  const experience = [
    {
      role: "Software Test Engineer",
      company: "Works Applications Co., Ltd.",
      duration: "Jan 2020 - Present",
      location: "Singapore",
      description: [
        "Supported master data management and ETL pipelines by verifying complex upstream and downstream system integrations.",
        "Validated data migrations and table synchronizations using SQL scripts on Oracle and PostgreSQL.",
        "Contributed to the quality of internal cloud services across on-premise and AWS environments (DynamoDB, Cognito, Batch, DMS).",
        "Maintained automated web and API test suites using Serenity BDD and Rest Assured.",
        "Monitored system reliability by configuring Jenkins CI/CD pipelines and JMeter performance scripts.",
        "Worked alongside the Singapore development team to align testing efforts, track issues in JIRA, and manage versions via Git."
      ],
      tags: ["AWS", "SQL", "Serenity BDD", "Rest Assured", "Jenkins", "JMeter"]
    },
    {
      role: "Test Automation Engineer",
      company: "Pepper Financial Services Group",
      duration: "Jan 2019 - Jan 2020",
      location: "North Sydney, New South Wales, Australia",
      description: [
        "Participated in end-to-end testing for a Loan Application system, covering front-end interfaces, backend mortgage processing, and reporting.",
        "Executed test cycles across NextGen, Appian, FMS, and Simpology platforms within an Agile Scrum framework.",
        "Developed automated web and API test suites utilizing Playwright, Rest Assured, Postman, and SoapUI.",
        "Assisted in validating Mulesoft web services and maintaining extensive functional test collections.",
        "Scheduled nightly and weekly automated test executions in Jenkins to ensure continuous feedback.",
        "Partnered with onshore resources in Australia to document test evidence and API resources via Swagger and Confluence."
      ],
      tags: ["Playwright", "Rest Assured", "Postman", "SoapUI", "Jenkins", "Mulesoft"]
    },
    {
      role: "Test Automation Engineer",
      company: "Appsolutely, Inc.",
      duration: "Oct 2017 - Dec 2018",
      location: "Manila, Philippines",
      description: [
        "Engaged in QA testing for F&B mobile applications, focusing on payment integrations, B2B setups, and POS connectivity.",
        "Prepared test estimates, plans, and completion reports in coordination with the Manila development team.",
        "Contributed to web and mobile automation frameworks using Selenium WebDriver (Java) and Appium (Python).",
        "Built a RestAPI regression suite utilizing Postman and JavaScript.",
        "Managed daily automated test runs in TeamCity and tracked defects using JIRA and Rally.",
        "Documented testing processes and automation assets in Confluence to support team knowledge sharing."
      ],
      tags: ["Selenium", "Java", "Appium", "Python", "Postman", "TeamCity"]
    },
    {
      role: "Software Test Engineer",
      company: "Capgemini",
      duration: "Jun 2014 - Oct 2017",
      location: "Multiple Locations",
      description: [
        "Assisted in ensuring the reliability of Global Payments systems for Credit Card Acquiring Applications.",
        "Translated user stories into comprehensive test scenarios in collaboration with business stakeholders.",
        "Verified data integrity and identified test data requirements using MySQL Developer and Oracle Toad.",
        "Expanded existing automation frameworks by writing new test cases in Selenium WebDriver and Java.",
        "Conducted critical smoke tests to validate production deployments and tracked defects via HPQC-ALM.",
        "Communicated quality metrics and test results to distributed Agile teams across Japan, India, and the USA."
      ],
      tags: ["HPQC-ALM", "MySQL", "Oracle Toad", "Selenium", "Java"]
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
    { title: 'Automation Framework', icon: Cpu, skills: [
      { name: 'Selenium', description: 'Browser automation framework' },
      { name: 'Playwright', description: 'End-to-end testing for modern web apps' },
      { name: 'TestNG', description: 'Testing framework inspired by JUnit and NUnit' },
      { name: 'Cucumber', description: 'BDD testing framework' },
      { name: 'Maven', description: 'Build automation tool' },
      { name: 'Junit', description: 'Unit testing framework for Java' }
    ]},
    { title: 'Programming Language', icon: Code2, skills: [
      { name: 'Java', description: 'Object-oriented programming language' },
      { name: 'Python', description: 'High-level, general-purpose programming language' },
      { name: 'JavaScript', description: 'Core programming language of the Web' },
      { name: 'AppScript', description: 'Rapid application development platform' }
    ]},
    { title: 'AI Related', icon: Brain, skills: [
      { name: 'GitHub Copilot', description: 'AI pair programmer' },
      { name: 'Cursor', description: 'AI-first code editor' },
      { name: 'GenAI Test Design', description: 'Using generative AI for test case creation' },
      { name: 'Model Validation', description: 'Validating AI model outputs and performance' },
      { name: 'AI Reporting', description: 'AI-driven test reporting and analysis' }
    ]},
    { title: 'API Testing', icon: Sparkles, skills: [
      { name: 'Postman', description: 'API platform for building and using APIs' },
      { name: 'REST Assured', description: 'Testing and validating REST services in Java' },
      { name: 'SoapUI', description: 'Automated testing tool for SOAP and REST APIs' }
    ]},
    { title: 'CI/CD Tools', icon: GitBranch, skills: [
      { name: 'Jenkins', description: 'Open source automation server' },
      { name: 'GitLab CI', description: 'Continuous integration and deployment' },
      { name: 'GitHub Actions', description: 'Automate software workflows' }
    ]},
    { title: 'Performance Testing', icon: Activity, skills: [
      { name: 'Jmeter', description: 'Load testing and performance measurement' },
      { name: 'Taurus', description: 'Automation-friendly framework for continuous testing' }
    ]},
    { title: 'Mobile & Database', icon: Smartphone, skills: [
      { name: 'Appium', description: 'Mobile application automation framework' },
      { name: 'Emulators', description: 'Virtual devices for mobile testing' },
      { name: 'Postgres', description: 'Open source relational database' },
      { name: 'Oracle', description: 'Multi-model relational database management system' },
      { name: 'MySQL', description: 'Open-source relational database management system' }
    ]},
    { title: 'Infrastructure', icon: Cloud, skills: [
      { name: 'AWS', description: 'Amazon Web Services cloud platform' },
      { name: 'Azure', description: 'Microsoft cloud computing platform' }
    ]},
    { title: 'Testing Management', icon: Layers, skills: [
      { name: 'JIRA', description: 'Issue and project tracking software' },
      { name: 'HPQCALM', description: 'Application lifecycle management software' },
      { name: 'Rally', description: 'Enterprise agile project management' },
      { name: 'Confluence', description: 'Team workspace and documentation' },
      { name: 'Teams', description: 'Business communication platform' }
    ]},
    { title: 'IDE & Process', icon: Monitor, skills: [
      { name: 'IntelliJ', description: 'Java integrated development environment' },
      { name: 'Visual Studio', description: 'Integrated development environment from Microsoft' },
      { name: 'Agile', description: 'Iterative approach to software development' }
    ]},
  ];

  if (!hasEntered) {
    return (
      <>
        <style>{`
          * {
            cursor: none !important;
          }
        `}</style>
        <ModernCursor />
        <div className="min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 bg-grain">
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20"
        >
          <div className="relative w-full max-w-[320px] aspect-[3/4] overflow-hidden bg-[#2a2621] shrink-0 border border-[var(--color-border)] shadow-2xl">
            <img 
              src={profileImage}
              alt="hello!" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8 flex-1 relative min-h-[300px] flex flex-col justify-center">
            
            {/* Name - Quick Appear */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-text-main)] leading-tight"
            >
              hi, i'm jahdiel reeve
            </motion.h1>

            <div className="relative min-h-[300px] flex flex-col justify-start pt-4">
              <div className="space-y-3">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-sans text-sm text-[var(--color-text-main)] opacity-70 tracking-widest uppercase font-medium"
                >
                  the question i always ask
                </motion.p>
                <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-[var(--color-olive)] flex items-center flex-wrap min-h-[4rem] md:min-h-[5rem] leading-tight">
                  <span>{typedText}</span>
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1 h-6 md:h-8 lg:h-10 bg-[var(--color-olive)] ml-1 shrink-0"
                  />
                </div>
              </div>

              <AnimatePresence>
                {introStage === 1 && (
                  <motion.div
                    key="title"
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8 }}
                    className="space-y-5 pt-1"
                  >
                    <div className="space-y-4">
                        <p className="font-sans text-sm text-[var(--color-text-muted)] tracking-widest mt-4">
                            SPECIALIZING IN AUTOMATION, QA STRATEGY & CONTINUOUS TESTING
                        </p>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setHasEntered(true);
                        setActiveTab('about me');
                      }}
                      className="inline-flex items-center space-x-3 bg-[var(--color-olive-dark)] text-white px-8 py-4 font-sans text-sm font-medium hover:bg-[var(--color-olive)] transition-colors group"
                    >
                      <span>welcome</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <ModernCursor />
      <div className="min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 bg-grain">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Column - Fixed Navigation & Intro */}
        <div className="lg:col-span-4 flex flex-col space-y-12 lg:sticky lg:top-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 
              onClick={() => setHasEntered(false)}
              className="text-3xl md:text-4xl font-serif text-[var(--color-text-main)] leading-tight cursor-pointer hover:text-[var(--color-olive)] transition-colors"
            >
              Jahdiel Reeve Macatangay
            </h1>
            <div className="space-y-2">
              <p className="text-lg text-[var(--color-olive)] font-sans text-sm tracking-tight">
                Software Test Engineer
              </p>
              <div className="flex items-center space-x-2 text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Singapore</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col space-y-2 font-sans text-sm"
          >
            {['about me', 'experience', 'skills', 'tools', 'why not ai', 'contact'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`relative text-left transition-all w-fit flex items-center group py-2 ${activeTab === tab ? 'text-[var(--color-olive)] font-bold' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'}`}
              >
                <div className="relative flex items-center justify-center w-8 mr-3">
                  {activeTab === tab ? (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute text-[var(--color-olive)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <span className="h-px w-4 bg-[var(--color-border)] group-hover:w-6 group-hover:bg-[var(--color-text-main)] transition-all duration-300"></span>
                  )}
                </div>
                <span className={`relative z-10 transition-transform duration-300 ${activeTab === tab ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                  {tab === 'about me' ? '01. about me' : tab === 'experience' ? '02. experience' : tab === 'skills' ? '03. skills' : tab === 'tools' ? '04. tools' : tab === 'why not ai' ? '05. why not ai?' : '06. contact'}
                </span>
              </button>
            ))}
          </motion.nav>
        </div>

        {/* Right Column - Dynamic Content */}
        <div className="lg:col-span-8 min-h-[60vh] relative min-w-0">
          <AnimatePresence mode="popLayout">
            
            {/* ABOUT SECTION */}
            {activeTab === 'about me' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-16 w-full"
              >
                <div className="flex flex-col-reverse xl:flex-row gap-12 items-start">
                  <section className="space-y-6 flex-1">
                    <h2 className="text-2xl font-serif text-[var(--color-olive)] flex items-center space-x-3">
                      <Terminal className="w-5 h-5 opacity-70" />
                      <span>keep asking, keep solving</span>
                    </h2>
                    <div className="space-y-6 text-lg font-serif text-[var(--color-text-main)] leading-8">
                      <p>
                        The best part of my job happens in the background - the bugs that never reached production, the edge cases flagged before design ever started, the questions in a discovery call that made someone pause and say <span className="font-semibold text-[var(--color-olive)]">"yeah, we'll have to think about that more."</span>
                      </p>
                      <p className="opacity-90">
                        Having 10+ years in this field, i have learned a lot and what keeps me here isn't just the craft, it's the ownership and empathy for the product, for the people I work with (having my team's back at all times) and for whoever ends up on the other end of the screen.
                      </p>
                      <p className="opacity-90">
                        Testing for me, in a way is a form of advocacy, the one who keeps asking <span className="font-semibold text-[var(--color-olive)]">"but what if a user does this?"</span> when deployments are stacking up and everyone's moving fast. not to slow things down, but because i'd rather we catch it now than explain it later.
                      </p>
                           <p className="opacity-90">
                        Beyond work, i collect miffys, drink lots of matcha and spend weekends walking around with a camera ･༝･
                      </p>
                    </div>
                  </section>

                  <div className="relative w-full max-w-[280px] aspect-[3/4] overflow-hidden bg-[#2a2621] shrink-0 border border-[var(--color-border)]">
                    <img 
                      src={aboutImage}
                      alt="about-me" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SKILLS SECTION */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-16 w-full"
              >
                {/* Skills */}
                <section>
                  <h2 className="text-2xl font-serif text-[var(--color-olive)] flex items-center space-x-3 mb-10">
                    <Code2 className="w-5 h-5 opacity-70" />
                    <span>skills</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {SKILLS_DATA.map((category) => (
                      <div key={category.title} className="space-y-3">
                        <h3 className="text-xs font-sans text-[var(--color-olive)] font-bold uppercase tracking-wider flex items-center space-x-2">
                          <category.icon className="w-3.5 h-3.5" />
                          <span>{category.title}</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map(tool => (
                            <div key={tool.name} className="relative group">
                              <span className="font-sans text-xs px-2 py-1 bg-[var(--color-olive)]/5 text-[var(--color-text-main)] border border-[var(--color-border)] rounded-sm hover:border-[var(--color-olive)] transition-colors cursor-help inline-block">
                                {tool.name}
                              </span>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-2 bg-[var(--color-bg-dark)] text-[var(--color-text-main)] text-[11px] font-sans border border-[var(--color-border)] rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center pointer-events-none">
                                {tool.description}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-border)]"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certifications */}
                <section className="pt-12 border-t border-[var(--color-border)]">
                  <h2 className="text-xl font-serif text-[var(--color-olive)] mb-6">certifications</h2>
                  <ul className="space-y-6 font-sans text-sm text-[var(--color-text-muted)]">
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 120, damping: 10 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-[var(--color-olive)] mt-0.5">→</span>
                      <div className="flex flex-col">
                        <span className="text-[var(--color-text-main)] font-bold">ISTQB-ISEB Agile Tester Foundation Level</span>
                        <span>ISTQB® - International Software Testing Qualifications Board</span>
                        <span className="text-xs opacity-70 mt-1">Issued Dec 2022</span>
                      </div>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120, damping: 10 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-[var(--color-olive)] mt-0.5">→</span>
                      <div className="flex flex-col">
                        <span className="text-[var(--color-text-main)] font-bold">ISTQB-ISEB Certified Tester Foundation Level</span>
                        <span>ISTQB® - International Software Testing Qualifications Board</span>
                        <span className="text-xs opacity-70 mt-1">Issued Dec 2014</span>
                      </div>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 120, damping: 10 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-[var(--color-olive)] mt-0.5">→</span>
                      <div className="flex flex-col">
                        <span className="text-[var(--color-text-main)] font-bold">ITIL V4 Foundation Level</span>
                        <span className="text-xs opacity-70 mt-1">Issued November 2014</span>
                      </div>
                    </motion.li>
                  </ul>
                </section>
              </motion.div>
            )}

            {/* EXPERIENCE SECTION */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12 w-full"
              >
                <h2 className="text-2xl font-serif text-[var(--color-olive)] flex items-center space-x-3 mb-8">
                  <Code2 className="w-5 h-5 opacity-70" />
                  <span>experience</span>
                </h2>
                
                <div className="grid grid-cols-1 gap-8">
                  {experience.map((job, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className="group border border-[var(--color-border)] p-6 md:p-8 hover:border-[var(--color-olive)] transition-colors bg-[var(--color-bg-dark)] relative overflow-hidden"
                    >
                      {/* Terminal-like header */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-border)] group-hover:bg-[var(--color-olive)] transition-colors"></div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-serif text-[var(--color-text-main)] group-hover:text-[var(--color-olive)] transition-colors">
                            {job.role}
                          </h3>
                          <div className="text-lg text-[var(--color-text-muted)] mt-1">
                            {job.company}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-left md:text-right">
                          <div className="font-sans text-sm text-[var(--color-olive)]">
                            {job.duration}
                          </div>
                          <div className="text-sm text-[var(--color-text-muted)] flex items-center md:justify-end mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {job.description.map((bullet, i) => (
                          <li key={i} className="text-[var(--color-text-muted)] leading-relaxed flex items-start text-sm md:text-base">
                            <span className="text-[var(--color-olive)] mr-2 mt-1.5 text-xs">▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-3">
                        {job.tags.map(tag => (
                          <span key={tag} className="font-sans text-xs px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-main)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            )}

            {/* WHY NOT AI SECTION */}
            {activeTab === 'why not ai' && (
              <motion.div
                key="why-not-ai"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12 w-full"
              >
                <section className="space-y-8">
                  <h2 className="text-2xl font-serif text-[var(--color-olive)] flex items-center space-x-3">
                    <Brain className="w-5 h-5 opacity-70" />
                    <span>adapting in ai world</span>
                  </h2>
                  

                  
                  <div className="pt-8 border-t border-[var(--color-border)]">
                    <p className="text-xl font-serif text-[var(--color-text-main)] leading-relaxed opacity-90">
                      While AI manages the routine testing to enhance our efficiency, we focus on things that require human - evaluating the overall situation, connecting complex systems with actual user behavior and ensuring we deliver a product that the entire team can be proud of!
                    </p>
                  </div>

                  <p className="text-xl font-serif text-[var(--color-text-main)] leading-relaxed">
                    AI can generate the test cases or scripts, but it can't tell you which ones <span className="font-semibold text-[var(--color-olive)] underline decoration-[var(--color-olive)] underline-offset-4">actually matter</span>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                    {/* AI Column */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-sans text-[var(--color-text-muted)] tracking-widest uppercase font-medium">what ai does well</h3>
                      <ul className="space-y-4 font-sans text-[var(--color-text-main)] opacity-90">
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Run scripts at scale</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Generate test case templates</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Catch known pattern bugs</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Automate repetitive checks</span>
                        </li>
                      </ul>
                    </div>

                    {/* Human Column */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-sans text-[var(--color-olive)] tracking-widest uppercase font-medium">what i bring to the team</h3>
                      <ul className="space-y-4 font-sans text-[var(--color-text-main)] opacity-90">
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Sit in discovery, sense what's off</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Advocate for users before code starts</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Understand why a bug matters</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[var(--color-olive)] mt-1">▹</span>
                          <span>Being the data behind better release decisions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* TOOLS & CONTRIBUTIONS SECTION */}
            {activeTab === 'tools' && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12 w-full"
              >
                <section className="space-y-6">
                  <h2 className="text-2xl font-serif text-[var(--color-olive)] flex items-center space-x-3">
                    <Wrench className="w-5 h-5 opacity-70" />
                    <span>things i've built, broken and fixed</span>
                  </h2>
                  <p className="text-lg font-serif text-[var(--color-text-main)] leading-relaxed opacity-90">
                    Asides my manual tasks, i enjoy building internal tools that help our team's life easier, here are some solutions i've implemented to streamline our workflows:
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {internalTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <div 
                        key={index} 
                        className="group border border-[var(--color-border)] p-6 hover:border-[var(--color-olive)] transition-colors bg-[var(--color-bg-dark)] relative overflow-hidden flex flex-col h-full"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-border)] group-hover:bg-[var(--color-olive)] transition-colors"></div>
                        
                        <div className="mb-4 text-[var(--color-olive)] opacity-80 group-hover:opacity-100 transition-opacity">
                          <Icon className="w-8 h-8" />
                        </div>
                        
                        <h3 className="text-lg font-serif text-[var(--color-text-main)] mb-3 group-hover:text-[var(--color-olive)] transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-[var(--color-text-muted)] mb-6 text-sm leading-relaxed flex-grow">
                          {tool.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {tool.tags.map(tag => (
                            <span key={tag} className="font-sans text-[10px] px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-main)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* CONTACT SECTION */}
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12 w-full"
              >
                <section className="space-y-6">
                  <h2 className="text-2xl font-serif text-[var(--color-olive)] flex items-center space-x-3">
                    <Mail className="w-5 h-5 opacity-70" />
                    <span>let's chat</span>
                  </h2>
                  <div className="space-y-4 text-xl font-serif text-[var(--color-text-main)] leading-relaxed max-w-lg opacity-90">
                    <p>
                      Got a product that needs someone asking the hard questions?
                    </p>
                    <p>
                      Whether you want to chat on a project, talk about testing frameworks, or anything about life, matcha, and miffy. 
                    </p>
                    <p>
                      My inbox is always open ･ ༝ ･
                    </p>
                  </div>
                  
                  <div className="pt-8 flex items-center space-x-8">
                    <a 
                      href="mailto:jahdiel.macatangay09@gmail.com" 
                      className="inline-flex items-center space-x-3 font-sans text-[var(--color-text-main)] hover:text-[var(--color-olive)] transition-colors border border-[var(--color-border)] hover:border-[var(--color-olive)] px-6 py-3"
                    >
                      <span>Say hello!</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    
                    <div className="flex items-center space-x-6">
                      <a href="https://github.com/macjear" className="text-[var(--color-text-muted)] hover:text-[var(--color-olive)] transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href="https://www.linkedin.com/in/macjear/" className="text-[var(--color-text-muted)] hover:text-[var(--color-olive)] transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
    </>
  );
}
