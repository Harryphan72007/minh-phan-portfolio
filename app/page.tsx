"use client";

import { useEffect, useRef, useState } from "react";

const profileLinks = {
  github: "https://github.com/Harryphan72007",
  email: "mailto:phan0368@umn.edu",
  paper: "https://openreview.net/pdf?id=k1P5W70u2V",
  openReview: "https://openreview.net/forum?id=k1P5W70u2V",
  resume: "/quang-minh-phan-resume.pdf",
};

const projects = [
  {
    id: "shape-of-noise",
    number: "01",
    title: "The Shape of Noise",
    category: "Computer vision · Robustness research",
    status: "Accepted · CTB at ICML 2026",
    summary:
      "Layer-wise perturbation profiles for diagnosing how image corruptions are amplified or suppressed inside vision models.",
    problem:
      "Aggregate robustness scores show whether a model fails, but not where internal representations become fragile.",
    contribution:
      "Contributed controlled ResNet-50 and ConvNeXt-Tiny experiments, LoRA and layer-subset comparisons, and multi-seed analysis.",
    approach:
      "CIFAR-10/C corruptions → layer-wise profiles → selected adaptation targets → multi-seed evaluation",
    outcome:
      "Accepted to the CTB workshop at ICML 2026. The public manuscript is the source of record; no lab code is redistributed here.",
    stack: ["PyTorch", "Computer Vision", "Robustness", "LoRA", "Multi-seed evaluation"],
    link: "https://openreview.net/forum?id=k1P5W70u2V",
    linkLabel: "OpenReview",
    image: null,
  },
  {
    id: "aerial",
    number: "02",
    title: "Aerial Detection Benchmark",
    category: "ML systems · Reproducible evaluation",
    status: "In progress · Results TBD",
    summary:
      "A fair VisDrone comparison across CNN, DETR, Vision Mamba, and RT-DETR detector families.",
    problem:
      "Detector comparisons become misleading when data splits, search budgets, evaluation code, and hardware reporting differ.",
    contribution:
      "Designed one shared protocol, VisDrone-to-COCO conversion, provenance capture, append-only results, CI, and resumable Optuna studies.",
    approach:
      "VisDrone → shared configs → equal-budget studies → COCO metrics + latency/memory evidence",
    outcome:
      "The tested benchmark scaffold is public. Every result remains explicitly TBD until timestamped experiment artifacts exist.",
    stack: ["Python", "VisDrone", "COCO", "Optuna", "CI"],
    link: "https://github.com/Harryphan72007/aerial-object-detection-benchmark",
    linkLabel: "Repository",
    image: null,
  },
  {
    id: "noteflow",
    number: "03",
    title: "NoteFlow AI",
    category: "Local-first AI · Product engineering",
    status: "Prototype · Synthetic demo data",
    summary:
      "A documentation workflow that turns notes, recordings, and scans into reviewable records with an audit trail.",
    problem:
      "Mixed-format documentation is difficult to normalize without losing source context, model uncertainty, or accountability.",
    contribution:
      "Connected React and FastAPI ingestion with ASR/OCR records, corrections, comparisons, tasks, audit history, and exports.",
    approach:
      "Notes + audio + scans → extraction → comparison → human review → export",
    outcome:
      "The stabilization branch passes 19 backend tests plus frontend lint, type checking, tests, and production build. Not for clinical use.",
    stack: ["FastAPI", "React", "TypeScript", "ASR", "OCR", "SQLAlchemy"],
    link: "https://github.com/Harryphan72007/NoteFlow-AI",
    linkLabel: "Repository",
    image: "/noteflow-dashboard.png",
  },
];

const skillGroups = [
  { label: "Programming", skills: ["Python", "C++", "Java", "TypeScript"] },
  { label: "ML engineering", skills: ["PyTorch", "scikit-learn", "Optuna", "Experiment tracking"] },
  { label: "Computer vision", skills: ["Robustness", "Object detection", "OpenCV", "LoRA"] },
  { label: "Systems & backend", skills: ["FastAPI", "SQLAlchemy", "REST APIs", "Local inference"] },
  { label: "Frontend & practice", skills: ["React", "Vite", "Git", "LaTeX", "CI"] },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Minh Phan",
  alternateName: "Quang Minh Phan",
  email: "phan0368@umn.edu",
  url: "https://harryphan72007.github.io/minh-phan-portfolio/",
  sameAs: [profileLinks.github],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Minnesota Twin Cities",
  },
  knowsAbout: [
    "Machine learning systems",
    "Computer vision",
    "Efficient machine learning",
    "Software engineering",
  ],
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({
  number,
  label,
  title,
  muted,
}: {
  number: string;
  label: string;
  title: string;
  muted: string;
}) {
  return (
    <div className="section-heading reveal">
      <span className="section-number">{number} / {label}</span>
      <h2>{title} <em>{muted}</em></h2>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setActiveProject(null);
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Minh Phan, home">MP<i /></a>
        <nav
          id="primary-mobile-menu"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          aria-label="Primary navigation"
        >
          {["Projects", "Experience", "Research", "Skills", "Education", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="icon-link"
            href={profileLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Minh Phan on GitHub"
          >
            GH
          </a>
          <a className="button button-small" href={profileLinks.resume} download>Résumé</a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-mobile-menu"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><i /> MINH PHAN · COMPUTER SCIENCE @ UMN</div>
            <h1>ML Engineering <span>& Systems</span></h1>
            <p className="hero-intro">
              I build reproducible computer-vision experiments and reliable ML products, from
              evaluation protocols and local inference to backend APIs and human review workflows.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">View evidence <Arrow /></a>
              <a className="button button-secondary" href={profileLinks.resume} download>
                Download résumé
              </a>
              <a className="button button-tertiary" href={profileLinks.email}>Email me</a>
            </div>
            <div className="social-row" aria-label="Professional links">
              <a href={profileLinks.github} target="_blank" rel="noopener noreferrer">
                GitHub <Arrow />
              </a>
              <a href={profileLinks.openReview} target="_blank" rel="noopener noreferrer">
                OpenReview <Arrow />
              </a>
            </div>
          </div>

          <aside className="candidate-panel reveal is-visible" aria-label="Candidate profile summary">
            <div className="panel-header"><span>CANDIDATE PROFILE</span><i>OPEN TO INTERNSHIPS</i></div>
            <div className="candidate-core">
              <span className="candidate-initials" aria-hidden="true">MP</span>
              <div><strong>Minh Phan</strong><span>Minneapolis, Minnesota</span></div>
            </div>
            <dl className="candidate-facts">
              <div><dt>Education</dt><dd>B.S. Computer Science</dd></div>
              <div><dt>Graduation</dt><dd>May 2028</dd></div>
              <div><dt>GPA</dt><dd>3.93 / 4.00</dd></div>
              <div><dt>Current work</dt><dd>SWE Intern + Research Volunteer</dd></div>
            </dl>
            <div className="target-block">
              <span>TARGET ROLES</span>
              <div><b>ML Engineering</b><b>ML Systems</b><b>Computer Vision</b><b>Software Engineering</b></div>
            </div>
            <div className="system-line" aria-hidden="true"><i /><i /><i /><i /></div>
          </aside>

          <div className="evidence-strip reveal is-visible">
            <span><b>01</b> Accepted robustness research</span>
            <span><b>02</b> Reproducible benchmark design</span>
            <span><b>03</b> Tested full-stack ML prototype</span>
            <span><b>04</b> Production-minded internship work</span>
          </div>
        </section>

        <section className="section projects" id="projects">
          <SectionHeading
            number="01"
            label="FEATURED WORK"
            title="Evidence before"
            muted="claims."
          />
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.id}>
                <div className="project-card-top">
                  <span>{project.number}</span><span>{project.category}</span>
                </div>
                {project.image ? (
                  <img
                    className="project-image"
                    src={project.image}
                    alt="NoteFlow dashboard showing synthetic demo data"
                  />
                ) : (
                  <div className={`project-diagram project-diagram-${project.id}`} aria-hidden="true">
                    <div className="diagram-node">DATA</div><i />
                    <div className="diagram-node core">EVAL</div><i />
                    <div className="diagram-node">EVID</div>
                  </div>
                )}
                <span className="project-status">{project.status}</span>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <dl className="project-details">
                  <div><dt>Technical approach</dt><dd>{project.approach}</dd></div>
                  <div><dt>Verified outcome</dt><dd>{project.outcome}</dd></div>
                </dl>
                <div className="tag-row">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="project-links">
                  <button
                    className="text-link"
                    type="button"
                    onClick={() => setActiveProject(project)}
                  >
                    Technical case study <Arrow />
                  </button>
                  <a
                    className="text-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linkLabel} <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <SectionHeading
            number="02"
            label="EXPERIENCE"
            title="Engineering across"
            muted="models and products."
          />
          <div className="experience-list">
            <article className="experience-card reveal">
              <div className="experience-side">
                <span>SOFTWARE ENGINEERING INTERNSHIP</span>
                <b>MAY 2026 — PRESENT</b>
                <small>HO CHI MINH CITY, VIETNAM</small>
              </div>
              <div>
                <h3>Software Engineering Intern</h3>
                <p className="organization">FPT Software</p>
                <ul>
                  <li><strong>Built</strong> a FastAPI and React workspace around reusable local speech inference.</li>
                  <li><strong>Designed</strong> single-file and batch transcription APIs while keeping one model loaded.</li>
                  <li><strong>Implemented</strong> inference locking, validation, and explicit decode and memory error handling.</li>
                  <li><strong>Integrated</strong> recording, upload, preview, and service-status flows.</li>
                </ul>
              </div>
            </article>
            <article className="experience-card reveal">
              <div className="experience-side">
                <span>UNDERGRADUATE RESEARCH · VOLUNTEER</span>
                <b>MAY 2026 — PRESENT</b>
                <small>MINNEAPOLIS, MINNESOTA</small>
              </div>
              <div>
                <h3>Undergraduate Research Volunteer</h3>
                <p className="organization">Ding Lab · University of Minnesota Twin Cities</p>
                <ul>
                  <li><strong>Prepared</strong> datasets for a PhD-led AI hardware and systems research project.</li>
                  <li><strong>Reviewed</strong> preprocessing output and flagged inconsistent or low-quality samples.</li>
                  <li><strong>Ran</strong> controlled computer-vision experiments and analyzed model behavior.</li>
                  <li><strong>Supported</strong> reproducible workflows through structured review and execution.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="section research" id="research">
          <SectionHeading
            number="03"
            label="RESEARCH"
            title="Controlled experiments,"
            muted="measured tradeoffs."
          />
          <article className="research-card reveal">
            <div className="research-copy">
              <span className="acceptance-label">ACCEPTED TO CTB AT ICML 2026</span>
              <h3>The Shape of Noise</h3>
              <p className="research-title">
                Layer-Wise Perturbation Profiles for Diagnosing Vision Robustness
              </p>
              <p>
                The work studies where image corruption changes internal representations and how
                that signal can guide parameter-efficient adaptation.
              </p>
              <ul className="research-bullets">
                <li>ResNet-50 and ConvNeXt-Tiny experiments on CIFAR-10 and CIFAR-10-C.</li>
                <li>Full fine-tuning, LoRA, and profile-selected layer-subset comparisons.</li>
                <li>Clean/corrupted accuracy, parameter counts, and multi-seed analysis.</li>
              </ul>
              <div className="publication-actions">
                <a className="text-link" href={profileLinks.paper} target="_blank" rel="noopener noreferrer">
                  Read manuscript <Arrow />
                </a>
                <a className="text-link" href={profileLinks.openReview} target="_blank" rel="noopener noreferrer">
                  OpenReview <Arrow />
                </a>
              </div>
            </div>
            <div className="metrics-card">
              <div className="metrics-heading">
                <span>CONVNEXT-TINY / CIFAR-10-C</span><span>PAPER RESULT</span>
              </div>
              <div className="metric-row featured">
                <div><span>Top-k LoRA</span><strong>92.57<small>%</small></strong><small>corrupted accuracy</small></div>
                <div><strong>0.04<small>M</small></strong><small>trainable parameters</small></div>
              </div>
              <div className="metric-divider" />
              <div className="metric-row">
                <div><span>Full fine-tuning</span><strong>94.95<small>%</small></strong><small>corrupted accuracy</small></div>
                <div><strong>27.83<small>M</small></strong><small>trainable parameters</small></div>
              </div>
              <p>
                Top-k LoRA used about 696× fewer trainable parameters while retaining most corrupted
                accuracy in this reported comparison.
              </p>
            </div>
          </article>
        </section>

        <section className="section skills" id="skills">
          <SectionHeading
            number="04"
            label="TECHNICAL SKILLS"
            title="Tools organized by"
            muted="engineering workflow."
          />
          <div className="skill-matrix reveal">
            {skillGroups.map((group, index) => (
              <div className="skill-row" key={group.label}>
                <div className="skill-label"><span>0{index + 1}</span><b>{group.label}</b></div>
                <div className="skill-tags">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section education" id="education">
          <SectionHeading
            number="05"
            label="EDUCATION"
            title="A rigorous base for"
            muted="systems work."
          />
          <article className="education-card reveal">
            <div>
              <span>UNIVERSITY OF MINNESOTA TWIN CITIES</span>
              <h3>Bachelor of Science in Computer Science</h3>
              <p>Minneapolis, Minnesota</p>
            </div>
            <dl>
              <div><dt>Expected graduation</dt><dd>May 2028</dd></div>
              <div><dt>GPA</dt><dd>3.93 / 4.00</dd></div>
              <div><dt>Languages</dt><dd>Vietnamese and English</dd></div>
            </dl>
          </article>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy reveal">
            <span className="section-number">06 / CONTACT</span>
            <h2>Let&apos;s build <em>reliable ML systems.</em></h2>
            <p>
              I am seeking ML engineering, ML systems, computer vision, and software engineering
              internship opportunities.
            </p>
          </div>
          <div className="contact-actions reveal">
            <a href={profileLinks.email}><span>Email</span><b>phan0368@umn.edu</b><Arrow /></a>
            <a href={profileLinks.github} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span><b>Harryphan72007</b><Arrow />
            </a>
            <a href={profileLinks.resume} download><span>Résumé</span><b>Download PDF</b><Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-mark">MP<i /></div>
        <div><strong>Minh Phan</strong><span>Computer Science · University of Minnesota</span></div>
        <p>ML systems, computer vision, and software engineering.</p>
        <div className="footer-links">
          <a href={profileLinks.github}>GitHub</a>
          <a href={profileLinks.email}>Email</a>
          <a href={profileLinks.resume}>Résumé</a>
        </div>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setActiveProject(null)
          }
        >
          <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button
              ref={closeButtonRef}
              className="modal-close"
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close technical case study"
            >
              ×
            </button>
            <span className="project-category">{activeProject.category}</span>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p className="modal-intro">{activeProject.summary}</p>
            <div className="modal-grid">
              <div><span>PROBLEM</span><p>{activeProject.problem}</p></div>
              <div><span>MY CONTRIBUTION</span><p>{activeProject.contribution}</p></div>
            </div>
            <div className="modal-architecture">
              <span>ARCHITECTURE</span><p>{activeProject.approach}</p>
            </div>
            <div className="modal-outcome">
              <span>VERIFIED OUTCOME</span><p>{activeProject.outcome}</p>
            </div>
            <div className="tag-row">
              {activeProject.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <a
              className="text-link modal-primary-link"
              href={activeProject.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activeProject.linkLabel} <Arrow />
            </a>
          </article>
        </div>
      )}
    </>
  );
}
