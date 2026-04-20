export const profile = {
  name: "Rushikesh Koochana",
  handle: "rushikesh_koochana",
  role: "Senior Data Engineer",
  tagline: "I build data pipelines that scrape, transform, and serve millions of records daily.",
  location: "Remote · Working globally",
  email: "rushikesh.koochana@gmail.com",
  linkedin: "https://www.linkedin.com/in/rushikesh-koochana-759b12122/",
  github: "https://github.com/Rusheesonu",
  summary:
    "Data Engineer with 5+ years of experience building scalable web scraping systems and ETL pipelines processing millions of records daily. Expert in Python, distributed systems, and cloud infrastructure. Proven track record of reducing operational costs by 80% and improving data pipeline performance by 300%.",
};

export type Metric = { label: string; value: string; unit?: string };

export const heroMetrics: Metric[] = [
  { label: "years in data", value: "5+" },
  { label: "sites crawled daily", value: "500+" },
  { label: "records / day peak", value: "50M+" },
  { label: "monthly volume", value: "10TB+" },
  { label: "pipeline uptime", value: "99.5%" },
];

export type SkillRow = {
  category: string;
  items: string[];
};

export const skills: SkillRow[] = [
  {
    category: "languages",
    items: ["Python", "JavaScript / Node.js", "SQL", "TypeScript"],
  },
  {
    category: "orchestration & scraping",
    items: ["Airflow", "Playwright", "Selenium", "Puppeteer", "Flask"],
  },
  {
    category: "data & storage",
    items: ["MongoDB", "PostgreSQL", "AWS S3", "Redis"],
  },
  {
    category: "cloud & infra",
    items: ["AWS (Lambda, EC2, RDS, ECS)", "Docker", "CI/CD", "GitHub Actions"],
  },
  {
    category: "frontend",
    items: ["React", "Vue.js", "Angular"],
  },
  {
    category: "specializations",
    items: ["ETL Pipelines", "Web Scraping", "REST APIs", "Data Architecture", "LLM Integration"],
  },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  achievements: string[];
  stack: string[];
  metrics: Metric[];
};

export const experience: Experience[] = [
  {
    id: "deepad",
    company: "DEEP.AD",
    role: "Senior Data Engineer",
    location: "Chicago, IL · Remote",
    period: "May 2021 — Present",
    start: "2021-05",
    end: "present",
    current: true,
    summary:
      "Architected production crawling framework and ETL backbone for an ad-intelligence platform.",
    achievements: [
      "Architected and deployed production-grade web crawling framework processing 500+ websites daily with 99.5% uptime; reduced data collection latency by 60%.",
      "Built stealth scraping system with Playwright — fingerprint randomization, proxy rotation, TLS evasion — bypassing bot protection on 95% of targeted sites.",
      "Designed RESTful APIs serving 1M+ requests/day at <200ms p95, enabling real-time access for business analytics teams.",
      "Optimized Airflow ETL pipelines to process 10TB+ monthly data, cutting processing time from 8h → 2h via parallelization and incremental loading.",
      "Led MongoDB modernization with validation schemas and indexing strategies; improved query performance by 300%.",
      "Integrated GPT-4 for automated data extraction and entity resolution; lifted data quality accuracy from 85% → 97%.",
    ],
    stack: ["Python", "Playwright", "Selenium", "Airflow", "MongoDB", "AWS", "REST APIs", "Node.js", "React"],
    metrics: [
      { label: "sites / day", value: "500+" },
      { label: "uptime", value: "99.5%" },
      { label: "req / day", value: "1M+" },
      { label: "monthly volume", value: "10TB" },
    ],
  },
  {
    id: "aisle3",
    company: "Aisle 3",
    role: "Founding Data Engineer",
    location: "London, UK · Remote",
    period: "Sep 2020 — May 2021",
    start: "2020-09",
    end: "2021-05",
    summary:
      "First engineering hire. Built distributed crawling infra from scratch and led a 4-person team.",
    achievements: [
      "Built distributed crawling infrastructure from scratch as first engineering hire — scaled to 500+ websites with 99% success rate handling 2M+ product updates daily.",
      "Implemented fault-tolerant, async ETL pipelines using Airflow and AWS Lambda achieving 99.9% data freshness SLA; designed for failure-isolation and automatic retry at every stage.",
      "Built Prometheus + Grafana monitoring stack for real-time crawler health visibility, reducing incident response time by 70%.",
      "Established CI/CD with GitHub Actions and Docker, reducing deployment time from 2 hours → 15 minutes enabling 3+ daily production releases.",
      "Recruited and led a 4-person data engineering team; established code review standards, architectural patterns, and engineering best practices from the ground up.",
    ],
    stack: ["Python", "Node.js", "Airflow", "Docker", "AWS (Lambda, ECS, S3)", "CI/CD", "REST APIs", "React"],
    metrics: [
      { label: "team led", value: "4" },
      { label: "updates / day", value: "2M+" },
      { label: "SLA", value: "99.9%" },
      { label: "deploy time", value: "-87%" },
    ],
  },
  {
    id: "dataweave",
    company: "DataWeave",
    role: "Data Engineer",
    location: "Bangalore, India",
    period: "Jan 2019 — Sep 2020",
    start: "2019-01",
    end: "2020-09",
    summary:
      "Built monitoring dashboards and high-throughput pipelines for e-commerce intelligence.",
    achievements: [
      "Built internal Vue.js + Node.js dashboard tracking 250+ crawlers; cut QA workload 80% (~120 eng-hours/month).",
      "Maintained high-throughput pipelines processing 50M+ records/day with >95% data quality.",
      "Designed REST APIs for internal reporting serving 50+ stakeholders; self-service reduced ad-hoc requests 60%.",
      "Delivered analytics solutions to 10+ global clients informing $5M+ in business decisions.",
      "Hardened pipeline reliability 85% → 99.2% via retry + error-handling frameworks.",
    ],
    stack: ["Python", "Node.js", "Vue.js", "React", "MongoDB", "Selenium", "REST APIs"],
    metrics: [
      { label: "records / day", value: "50M+" },
      { label: "QA workload", value: "-80%" },
      { label: "reliability", value: "99.2%" },
      { label: "stakeholders", value: "50+" },
    ],
  },
  {
    id: "imbudesk",
    company: "Imbudesk Ens",
    role: "Program Manager (Intern)",
    location: "Hyderabad, India",
    period: "Nov 2017 — Dec 2018",
    start: "2017-11",
    end: "2018-12",
    summary:
      "Taught ML & data science to 80+ students; managed a team of 4 teaching assistants.",
    achievements: [
      "Taught ML and data science curriculum to 80+ students with 100% satisfaction.",
      "Managed team of 4 TAs; developed curriculum across Python, statistics, ML algorithms.",
      "Designed hands-on projects increasing student engagement by 40%.",
    ],
    stack: ["Python", "ML", "Teaching"],
    metrics: [
      { label: "students", value: "80+" },
      { label: "satisfaction", value: "100%" },
      { label: "TAs managed", value: "4" },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "SUCCESS" | "RUNNING" | "DEPLOYED";
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "stealth-scraper",
    name: "Stealth Scraper",
    tagline: "Bypass Cloudflare, PerimeterX, bot-protection at 95%+ success.",
    description:
      "Advanced web-scraping framework with fingerprint randomization, TLS evasion, and human-like behavior patterns. Modular architecture supporting Playwright and Puppeteer with configurable stealth plugins.",
    stack: ["Python", "Playwright", "Puppeteer", "Proxy Mgmt", "Anti-Detection"],
    status: "DEPLOYED",
    repo: "https://github.com/Rusheesonu",
  },
  {
    id: "crypto-tracker",
    name: "Crypto Tracker",
    tagline: "Real-time portfolio tracker with WebSocket price feeds.",
    description:
      "Full-stack cryptocurrency portfolio tracker streaming live prices for 100+ coins. Flask API + React client with sub-second WebSocket latency on portfolio value updates.",
    stack: ["Python", "Flask", "React", "WebSockets", "REST"],
    status: "SUCCESS",
    repo: "https://github.com/Rusheesonu",
  },
  {
    id: "dashboard-stats",
    name: "Dashboard Stats",
    tagline: "Monitoring dashboard for 250+ crawlers.",
    description:
      "Engineered real-time monitoring UI reducing QA workload by 80% and improving incident detection time by 90%. Responsive Vue.js UI with historical trends and configurable alerting.",
    stack: ["Vue.js", "Node.js", "WebSockets", "MongoDB"],
    status: "SUCCESS",
    repo: "https://github.com/Rusheesonu",
  },
  {
    id: "encrypt-decrypt",
    name: "EncryptDecrypt",
    tagline: "AES-256 + RSA signing service with API docs.",
    description:
      "Production encryption/decryption service with digital signature verification for sensitive payloads. Comprehensive API documentation and pluggable key management.",
    stack: ["Python", "Flask", "Vue.js", "Cryptography"],
    status: "SUCCESS",
    repo: "https://github.com/Rusheesonu",
  },
  {
    id: "parksense",
    name: "ParkSense",
    tagline: "Computer vision parking analytics with OCR plate recognition.",
    description:
      "OpenCV-powered real-time vehicle tracking and license-plate recognition for parking facilities. SaaS admin platform for occupancy, reports, and usage analytics.",
    stack: ["OpenCV", "Node.js", "React", "OCR", "Python"],
    status: "SUCCESS",
  },
];

export const education = {
  school: "BML Munjal University",
  degree: "B.Tech, Computer Science & Engineering",
  location: "Delhi, India",
  year: "2019",
};

export const certifications = [
  {
    name: "Ethereum Blockchain Developer with Solidity",
    issuer: "Udemy",
    date: "Jan 2022 — Mar 2022",
  },
];
