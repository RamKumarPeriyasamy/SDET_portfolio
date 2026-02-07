import { Terminal, Shield, Workflow, Code, Database, Globe, Server, Lock } from 'lucide-react';
import { Project, SkillCategory, TimelineEvent } from './types';

export const NAV_LINKS = [
  { name: 'Identity', href: '#about' },
  { name: 'Capabilities', href: '#skills' },
  { name: 'Operations', href: '#projects' },
  { name: 'Uplink', href: '#contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'SDET / Testing',
    icon: Terminal,
    description: "I don't just verify; I certify.",
    skills: ['UI Automation (Playwright & Selenium)', 'API Testing (Postman)', 'Framework Architecture', 'Performance (JMeter)', 'Chaos Engineering'],
  },
  {
    title: 'SecOps / Security',
    icon: Shield,
    description: "Secure by design, not by chance.",
    skills: ['SAST / DAST Implementation', 'OWASP Top 10 Mitigation', 'Container Security (Trivy)', 'Secret Management', 'Vulnerability Scanning'],
  },
  {
    title: 'DevOps / CI-CD',
    icon: Workflow,
    description: "Automating the path to production.",
    skills: ['Jenkins & GitHub Actions', 'Docker', 'Infrastructure as Code', 'Observability (Prometheus)', 'Release Engineering'],
  },
  {
    title: 'Development',
    icon: Code,
    description: "Building tools that build software.",
    skills: ['JavaScript', 'TypeScript', 'React & Node.js', 'Structured Query Language', 'Java', 'Tooling Development'],
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
    year: '2025',
    role: 'SDET & SecOps Engineer',
    description: 'Building secure, resilient systems through automated security testing. Implementing SAST/DAST pipelines and container security scanning with tools like Trivy.',
    icon: 'shield'
  },
  {
    year: '2024',
    role: 'Test Automation Engineer',
    description: 'Architecting scalable test frameworks using Playwright and Selenium. Integrating automated tests into CI/CD pipelines with Jenkins and GitHub Actions.',
    icon: 'code'
  },
  {
    year: '2023',
    role: 'Test Engineer',
    description: 'Transitioned from manual testing to automation. Developed API test suites with Postman and learned the fundamentals of test-driven development.',
    icon: 'test'
  },
  {
    year: '2022',
    role: 'Master of Mathematics',
    description: 'Built strong analytical and problem-solving foundations. Applied mathematical thinking to understand complex systems and logical reasoning.',
    icon: 'rocket'

  }
];
