"use client";

import { useEffect, useRef, useState } from "react";

const profileLinks = {
  github: "https://github.com/Harryphan72007",
  email: "mailto:quangminhph07@gmail.com",
  paper: "https://openreview.net/pdf?id=k1P5W70u2V",
  openReview: "https://openreview.net/forum?id=k1P5W70u2V",
  workshop: "https://sites.google.com/view/icml-ctb/technical-program/accepted-papers",
  resume: "/quang-minh-phan-resume.pdf",
};

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  status: string;
  year: string;
  summary: string;
  problem: string;
  built: string[];
  approach: string;
  evidence: string;
  stack: string[];
  links: ProjectLink[];
  image: string | null;
};

const projects: Project[] = [
  {
    id: "aerial",
    number: "01",
    title: "Aerial Object Detection Benchmark",
    category: "ML systems · Reproducible evaluation",
    status: "Infrastructure built · GPU runs pending",
    year: "2026",
    summary:
      "A single-protocol VisDrone comparison across four detector families, built so the comparison stays fair when data splits, search budgets, and hardware differ.",
    problem:
      "Detector comparisons become misleading when data splits, search budgets, evaluation code, and hardware reporting differ between architectures. Published rankings rarely ship the machinery needed to reproduce them.",
    built: [
      "Implemented four detector adapters behind one interface: Faster R-CNN with ResNet-50, Swin-T, and VMamba-T backbones, plus RT-DETRv2-L.",
      "Built the VisDrone-to-COCO conversion, annotation validation, class-collapse tracks, and dataset manifests that every model consumes.",
      "Built resumable Optuna studies, checkpoint lifecycle management, and a GPU adapter smoke gate that refuses to start training until each model passes on the target hardware.",
      "Wrote schema-validated result bundles and a publication path so a claimed number always carries its provenance.",
    ],
    approach:
      "VisDrone → COCO conversion → shared configs → equal-budget Optuna studies → COCO metrics + latency/memory probes → validated result bundles",
    evidence:
      "498 tests collected across 67 modules, 5 GitHub Actions workflows green, 16 notebooks, and 4 model adapters. The repository states its own limits: no benchmark result exists yet, and `results/` holds scaffolding only.",
    stack: ["Python", "PyTorch", "MMDetection", "Optuna", "VisDrone2019", "COCO"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Harryphan72007/aerial-object-detection-benchmark",
      },
    ],
    image: null,
  },
  {
    id: "noteflow",
    number: "02",
    title: "NoteFlow AI",
    category: "Local-first AI · Product engineering",
    status: "Released v0.1.0 · Prototype",
    year: "2026",
    summary:
      "A documentation workflow that turns notes, recordings, and scans into reviewable records, keeping source, model output, and human correction separate.",
    problem:
      "Most documentation pipelines collapse source material and model output into one generated record, so a reviewer cannot tell what the system received, what a model produced, and who changed it.",
    built: [
      "Built the FastAPI backend as the system of record: SQLAlchemy entities, Alembic migrations, and ownership checks across documents, tasks, audits, and exports.",
      "Implemented correctable ASR and OCR records that retain both the original and the edited value rather than overwriting model output.",
      "Implemented the comparison service computing word error rate, character error rate, and numeric-mismatch detection between source and corrected text.",
      "Built the React and TypeScript review interface and wired optional local ASR, PaddleOCR, and Ollama adapters that fail visibly instead of silently degrading.",
    ],
    approach:
      "Notes + audio + scans → extraction → WER/CER comparison → human review → audit trail → export",
    evidence:
      "Tagged release v0.1.0 (July 2026) with 19 backend tests, plus frontend lint, type checking, tests, and production build enforced in CI. All demo data is synthetic; not for clinical use.",
    stack: ["FastAPI", "React", "TypeScript", "SQLAlchemy", "Alembic", "ASR", "OCR", "Ollama"],
    links: [{ label: "Repository", href: "https://github.com/Harryphan72007/NoteFlow-AI" }],
    image: "/noteflow-dashboard.png",
  },
  {
    id: "legal",
    number: "03",
    title: "Vietnamese Legal AI",
    category: "Retrieval & conflict detection · Early stage",
    status: "Architecting · Scaffolding published",
    year: "2026",
    summary:
      "A four-repository design for screening draft legal clauses against existing Vietnamese law, split so retrieval, conflict analysis, and evidence-grounded explanation stay separable.",
    problem:
      "Checking whether a draft clause contradicts existing law is a retrieval problem and a reasoning problem at once, and collapsing them into one model makes the result impossible to audit against a cited source.",
    built: [
      "Designed the pipeline as four independent services: corpus processing, hybrid retrieval, pairwise conflict classification, and evidence-grounded RAG.",
      "Published the walking skeleton for each: packaged Python project, typed configuration, structured logging, CLI entry point, Dockerfile, Makefile, and CI.",
      "Planned, not yet implemented: document parsing, clause schemas, lexical and dense retrieval, ANN search, ranking, conflict classification, evaluation, and citation-grounded generation.",
    ],
    approach:
      "Legal documents → corpus processing → clause representation → hybrid retrieval → candidate generation → conflict analysis → evidence-grounded explanation",
    evidence:
      "Each repository currently holds one commit of scaffolding with a CLI smoke test under CI. No retrieval, parsing, or conflict-detection code is implemented yet, and none is claimed here.",
    stack: ["Python", "CLI", "Docker", "GitHub Actions"],
    links: [
      { label: "LegalConflict-RAG", href: "https://github.com/Harryphan72007/LegalConflict-RAG" },
      { label: "VietLegalCorpus", href: "https://github.com/Harryphan72007/VietLegalCorpus" },
      { label: "HybridClauseSearch", href: "https://github.com/Harryphan72007/HybridClauseSearch" },
      {
        label: "ClauseConflictEngine",
        href: "https://github.com/Harryphan72007/ClauseConflictEngine",
      },
    ],
    image: null,
  },
];

const skillGroups = [
  { label: "Languages", skills: ["Python", "TypeScript", "Java"] },
  {
    label: "ML & computer vision",
    skills: ["PyTorch", "MMDetection", "Optuna", "LoRA", "COCO evaluation"],
  },
  {
    label: "ML systems & evaluation",
    skills: [
      "Reproducible pipelines",
      "Hyperparameter search",
      "Checkpoint lifecycles",
      "Latency & memory profiling",
      "Multi-seed analysis",
    ],
  },
  {
    label: "Backend & data",
    skills: ["FastAPI", "SQLAlchemy", "Alembic", "REST APIs", "SQLite"],
  },
  { label: "Frontend", skills: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
  {
    label: "Applied AI",
    skills: ["Local ASR", "OCR", "Ollama", "Human-review workflows"],
  },
  {
    label: "Developer tooling",
    skills: ["Git", "GitHub Actions", "pytest", "ESLint", "Docker"],
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Minh Phan",
  alternateName: "Quang Minh Phan",
  email: "quangminhph07@gmail.com",
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
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Arming the hidden state here — rather than in the stylesheet — keeps every section readable
    // when this script does not run at all.
    const documentElement = document.documentElement;
    documentElement.classList.add("js-reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      documentElement.classList.remove("js-reveal");
    };
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
          {["Projects", "Research", "Experience", "Skills", "Education", "Contact"].map((item) => (
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
              Computer Science undergraduate working across ML systems, computer vision, and
              backend engineering. I build the infrastructure that makes an experiment
              reproducible and a model&apos;s output reviewable — evaluation protocols, detector
              benchmarks, local inference services, and human-review workflows.
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
            <span><b>01</b> ICML 2026 workshop paper · co-author</span>
            <span><b>02</b> 498 tests · 5 CI workflows</span>
            <span><b>03</b> Released v0.1.0 · 19 backend tests</span>
            <span><b>04</b> SWE intern · local ASR APIs</span>
          </div>
        </section>

        <section className="section projects" id="projects">
          <SectionHeading
            number="01"
            label="ENGINEERING WORK"
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
                  <div>
                    <dt>What I built</dt>
                    <dd>
                      <ul className="built-list">
                        {project.built.slice(0, 2).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div><dt>Evidence</dt><dd>{project.evidence}</dd></div>
                </dl>
                <div className="tag-row">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                {project.links.length > 1 && (
                  <div className="repo-group">
                    <span>Repositories</span>
                    <div>
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
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
                    href={project.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.links.length > 1 ? "Primary repository" : project.links[0].label}{" "}
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="section-footnote reveal">
            Coursework and earlier projects — a Flask emotion-analysis service, a Java
            recommendation engine, and a static site — stay on{" "}
            <a href={profileLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>{" "}
            rather than here.
          </p>
        </section>

        <section className="section research" id="research">
          <SectionHeading
            number="02"
            label="RESEARCH"
            title="Controlled experiments,"
            muted="measured tradeoffs."
          />
          <article className="research-card reveal">
            <div className="research-copy">
              <span className="acceptance-label">
                ACCEPTED · POSTER · CTB WORKSHOP AT ICML 2026
              </span>
              <h3>The Shape of Noise</h3>
              <p className="research-title">
                Layer-Wise Perturbation Profiles for Diagnosing Vision Robustness
              </p>
              <p className="research-authors">
                Son Nguyen · V. G. Bao · <strong>Quang M. Phan</strong> · Trong P. Le
              </p>
              <p>
                Aggregate robustness scores show whether a model fails, not where its internal
                representations become fragile. The paper profiles corruption effects layer by
                layer and uses that signal to choose where to adapt a model.
              </p>
              <ul className="research-bullets">
                <li>
                  <strong>My contribution:</strong> ran the controlled ResNet-50 and ConvNeXt-Tiny
                  experiments on CIFAR-10 and CIFAR-10-C.
                </li>
                <li>Compared full fine-tuning, LoRA, and profile-selected layer subsets.</li>
                <li>Analyzed clean and corrupted accuracy, parameter counts, and multi-seed variance.</li>
              </ul>
              <div className="publication-actions">
                <a className="text-link" href={profileLinks.paper} target="_blank" rel="noopener noreferrer">
                  Read manuscript <Arrow />
                </a>
                <a className="text-link" href={profileLinks.openReview} target="_blank" rel="noopener noreferrer">
                  OpenReview <Arrow />
                </a>
                <a className="text-link" href={profileLinks.workshop} target="_blank" rel="noopener noreferrer">
                  Workshop program <Arrow />
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
                accuracy. Figures as reported in the manuscript; the lab&apos;s experiment code is not
                redistributed here.
              </p>
            </div>
          </article>
        </section>

        <section className="section experience" id="experience">
          <SectionHeading
            number="03"
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
                  <li><strong>Designed</strong> single-file and batch transcription APIs that keep one model resident across requests.</li>
                  <li><strong>Implemented</strong> inference locking, input validation, and explicit decode and memory error handling.</li>
                  <li><strong>Integrated</strong> recording, upload, preview, and service-status flows.</li>
                </ul>
                <p className="experience-note">Employer code and checkpoints are private and not published.</p>
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
                <p className="experience-note">Lab code is not redistributed.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section skills" id="skills">
          <SectionHeading
            number="04"
            label="TECHNICAL SKILLS"
            title="Tools backed by"
            muted="public repositories."
          />
          <div className="skill-matrix reveal">
            {skillGroups.map((group, index) => (
              <div className="skill-row" key={group.label}>
                <div className="skill-label">
                  <span>{String(index + 1).padStart(2, "0")}</span><b>{group.label}</b>
                </div>
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
            <a href={profileLinks.email}><span>Email</span><b>quangminhph07@gmail.com</b><Arrow /></a>
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
              <div><span>STATUS</span><p>{activeProject.status} · {activeProject.year}</p></div>
            </div>
            <div className="modal-architecture">
              <span>WHAT I BUILT</span>
              <ul className="built-list">
                {activeProject.built.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="modal-architecture">
              <span>PIPELINE</span><p>{activeProject.approach}</p>
            </div>
            <div className="modal-outcome">
              <span>EVIDENCE</span><p>{activeProject.evidence}</p>
            </div>
            <div className="tag-row">
              {activeProject.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="modal-links">
              {activeProject.links.map((link) => (
                <a
                  key={link.href}
                  className="text-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} <Arrow />
                </a>
              ))}
            </div>
          </article>
        </div>
      )}
    </>
  );
}
