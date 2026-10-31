import { Terminal, Shield, Workflow, Code, Database, Globe, Server, Activity } from 'lucide-react';
import { Project, SkillCategory, TimelineEvent } from './types';

export const NAV_LINKS = [
  { name: 'Identity', href: '#about' },
  { name: 'Capabilities', href: '#skills' },
  { name: 'Operations', href: '#projects' },
  { name: 'Uplink', href: '#contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Testing & Automation',
    icon: Terminal,
    description: "End-to-end UI, API, performance, and unit testing frameworks with comprehensive reporting.",
    skills: ['Selenium', 'Playwright', 'TestNG', 'Maven', 'Jest', 'React Testing Library', 'Postman', 'Apache JMeter', 'Allure'],
  },
  {
    title: 'DevOps & CI/CD',
    icon: Workflow,
    description: "Automated build and release pipelines, container orchestration, and version control integration.",
    skills: ['Jenkins', 'Docker', 'Docker Compose', 'Kubernetes', 'Git', 'Gitea', 'GitHub'],
  },
  {
    title: 'DevSecOps & Security',
    icon: Shield,
    description: "Shift-left code quality analysis, container scanning, secret detection, and automated security gates.",
    skills: ['SonarQube', 'Trivy', 'Gitleaks', 'OWASP Dependency-Check', 'OWASP ZAP'],
  },
  {
    title: 'Infrastructure & Cloud',
    icon: Server,
    description: "Virtualization, Linux administration, networking, and reverse proxy configuration.",
    skills: ['Proxmox VE', 'Linux', 'Ubuntu', 'Nginx'],
  },
  {
    title: 'Monitoring & Observability',
    icon: Activity,
    description: "Metrics collection, container telemetry, centralized logging, and production observability dashboards.",
    skills: ['Prometheus', 'Grafana', 'Loki'],
  },
  {
    title: 'Programming Languages',
    icon: Code,
    description: "Core languages for automation frameworks, backend services, tooling, and pipeline scripting.",
    skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Groovy', 'Bash'],
  },
  {
    title: 'Databases & Messaging',
    icon: Database,
    description: "Document storage, in-memory caching, time-series telemetry, and event messaging protocols.",
    skills: ['MongoDB', 'Redis', 'InfluxDB', 'MQTT'],
  },
  {
    title: 'Frontend Technologies',
    icon: Globe,
    description: "Modern component-driven web interfaces, responsive styling, and fast build tooling.",
    skills: ['React', 'Vite', 'Tailwind CSS', 'SCSS', 'HTML', 'CSS'],
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'OmniTest: Unified Automation Framework',
    category: 'SDET',
    problem: "Fragmented testing tools for Web, API, and Mobile led to high maintenance costs and flaky execution.",
    solution: "Architected a hybrid framework using TypeScript and Playwright that handles UI and API tests in a single repo with shared types and utilities.",
    impact: "Achieved 95% code reuse between functional and regression suites and cut execution time by 40% via parallelization.",
    tools: ['TypeScript', 'Playwright', 'Jest', 'Allure Reports', 'GitHub Actions'],
    github: 'https://github.com/RamKumarPeriyasamy/PlaywrightScript'
  },
  {
    id: '2',
    title: 'Sentinel: Secure CI/CD Pipeline',
    category: 'SecOps',
    problem: "Deployment velocity was high, but security vulnerabilities were being detected too late in production.",
    solution: "Designed a fortified CI/CD pipeline integrating automated SAST (SonarQube) and DAST (OWASP ZAP) gates that block builds upon critical vulnerability detection.",
    impact: "Reduced production vulnerabilities by 70% and shifted security compliance left, saving 20+ dev hours per sprint.",
    tools: ['Jenkins', 'SonarQube', 'OWASP ZAP', 'Docker', 'Trivy'],
    github: 'https://github.com/RamKumarPeriyasamy/jenkins_pipeline_script/tree/templates'
  },
  {
    id: '3',
    title: 'Role-Based Access Dashboard',
    category: 'DevOps',
    problem: "Internal admin tools lacked granular permission controls, posing an insider threat risk.",
    solution: "Developed a secure Admin Dashboard with strict RBAC implementation, JWT authentication, and comprehensive audit logging for all sensitive actions.",
    impact: "Zero unauthorized access incidents post-launch; fully compliant with ISO 27001 audit requirements.",
    tools: ['React', 'Node.js', 'Firebase Auth', 'Express', 'Audit Logs'],
    github: 'https://github.com/RamKumarPeriyasamy/jenkins_pipeline_script/tree/templates/tech/Jenkins-pipelines/MANIFESTS/dwinzo'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2022',
    role: 'Master of Mathematics',
    description: 'Built strong analytical and problem-solving foundations. Applied mathematical thinking to understand complex systems, algorithmic patterns, and logical reasoning.',
    icon: 'rocket'
  },
  {
    year: '2023',
    role: 'Software Development and Test Automation',
    description: 'Developed and maintained automated test scripts using Selenium and Playwright with Java, JavaScript, and TypeScript. Implemented unit and component testing with Jest and React Testing Library, validated APIs with Postman, and performed functional and regression testing.',
    icon: 'code'
  },
  {
    year: '2024',
    role: 'SDET and Quality Engineering',
    description: 'Architected scalable UI and API automation frameworks using TestNG and Maven. Conducted functional, regression, and integration testing suites, executed performance testing with Apache JMeter, and generated comprehensive Allure reports.',
    icon: 'test'
  },
  {
    year: '2024',
    role: 'CI/CD Pipeline Engineering',
    description: 'Created and maintained automated Jenkins CI/CD pipelines. Integrated Git and Gitea repositories with Jenkins to automate build workflows, test executions, and streamlined delivery pipelines.',
    icon: 'workflow'
  },
  {
    year: '2025',
    role: 'DevOps and Infrastructure Management',
    description: 'Built and managed Docker images and multi-container Docker Compose deployments. Worked with Kubernetes and Proxmox virtualization, administered Linux and Ubuntu servers, and configured Nginx reverse proxies, NAT, networking, and port forwarding.',
    icon: 'server'
  },
  {
    year: '2025',
    role: 'DevSecOps and Security Automation',
    description: 'Integrated SonarQube code quality analysis into Jenkins pipelines. Implemented container vulnerability scanning with Trivy, dependency vulnerability analysis using OWASP Dependency-Check, secret detection with Gitleaks, and automated security quality gates.',
    icon: 'shield'
  },
  {
    year: 'Present',
    role: 'Monitoring and Infrastructure Operations',
    description: 'Configured Prometheus and Grafana for server, application, and Docker container monitoring. Implemented centralized logging and telemetry with Loki, performing proactive operational troubleshooting to ensure high infrastructure reliability.',
    icon: 'monitor'
  }
];

