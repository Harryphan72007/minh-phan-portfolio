"use client";

import { useEffect, useRef, useState } from "react";

const profileLinks = {
  github: "https://github.com/Harryphan72007",
  linkedin: null,
  email: null,
  paper: null,
  openReview: null,
  resume: "/quang-minh-phan-resume.pdf",
};

const projects = [
  {
    id: "mega-asr",
    number: "01",
    title: "Mega-ASR Studio",
    category: "ML systems · Full-stack engineering",
    summary:
      "Built a local speech-to-text workspace that keeps ASR inference reliable across individual and batch transcription workflows.",
    problem:
      "Local speech models are expensive to load and can fail unpredictably when multiple files reach inference at once.",
    contribution:
      "Designed the FastAPI endpoints and React interface, reused one loaded model across requests, and implemented inference locking, validation, and operational status flows.",
    approach: "Audio input → FastAPI validation → locked local inference → transcript",
    outcome:
      "Supports microphone capture, drag-and-drop upload, audio preview, single-file and batch transcription, and explicit decode and memory error states.",
    stack: ["Python", "FastAPI", "React", "Vite", "Local ASR"],
    repository: null,
    demo: null,
  },
  {
    id: "noteflow",
    number: "02",
    title: "NoteFlow AI",
    category: "Local-first AI · Product engineering",
    summary:
      "Built a documentation-support platform that turns notes, recordings, and scans into structured records with a human review trail.",
    problem:
      "Mixed-format documentation is difficult to normalize without losing source context or accountability.",
    contribution:
      "Designed ingestion for manual notes, ASR, and OCR, then connected normalization, source comparison, review, tasks, audit logs, and exports.",
    approach: "Notes + audio + scans → extraction → comparison → human review → export",
    outcome:
      "Keeps decisions with the reviewer: the system supports documentation work and does not make autonomous diagnosis or treatment decisions.",
    stack: ["React", "TypeScript", "Vite", "ASR", "OCR", "Local AI"],
    repository: "https://github.com/Harryphan72007/NoteFlow-AI",
    demo: null,
  },
  {
    id: "asl",
    number: "03",
    title: "Sign Language Recognition",
    category: "Computer vision · Real-time ML",
    summary:
      "Built a real-time American Sign Language gesture prototype using hand landmarks and an interpretable classical ML pipeline.",
    problem:
      "Live gesture recognition needs stable features despite changing camera position, scale, and hand placement.",
    contribution:
      "Connected camera capture, MediaPipe hand detection, landmark extraction, preprocessing, and k-nearest-neighbors prediction.",
    approach: "Camera → hand detection → landmarks → feature preprocessing → k-NN",
    outcome:
      "Delivered a compact real-time prototype whose input features and predictions are straightforward to inspect and debug.",
    stack: ["Python", "OpenCV", "MediaPipe", "scikit-learn", "k-NN"],
    repository: null,
    demo: null,
  },
];

const skillGroups = [
  { label: "Programming", skills: ["Python", "C++", "Java", "TypeScript"] },
  { label: "Backend & Web", skills: ["FastAPI", "React", "Vite", "REST APIs"] },
  {
    label: "ML & Computer Vision",
    skills: ["PyTorch", "scikit-learn", "LoRA", "Model fine-tuning", "OpenCV", "MediaPipe", "k-NN"],
  },
  { label: "AI Applications", skills: ["Local ASR inference", "OCR", "Ollama", "Document workflows"] },
  { label: "Research Practice", skills: ["Git", "LaTeX", "Experiment tracking", "Multi-seed evaluation", "Result analysis"] },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Minh Phan",
  alternateName: "Quang Minh Phan",
  url: "https://harryphan72007.github.io/minh-phan-portfolio/",
  sameAs: [profileLinks.github],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Minnesota Twin Cities",
  },
  knowsAbout: [
    "Software engineering",
    "Machine learning systems",
    "Computer vision",
    "Efficient machine learning",
  ],
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ number, label, title, muted }: { number: string; label: string; title: string; muted: string }) {
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
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Minh Phan, home">MP<i /></a>
        <nav id="primary-mobile-menu" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {["Projects", "Experience", "Research", "Skills", "Education", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="icon-link" href={profileLinks.github} target="_blank" rel="noopener noreferrer" aria-label="Minh Phan on GitHub">GH</a>
          <a className="button button-small" href={profileLinks.resume} download>Résumé</a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-mobile-menu"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          ><span /><span /></button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><i /> MINH PHAN · COMPUTER SCIENCE @ UMN</div>
            <h1>Software Engineering <span>& ML Systems Student</span></h1>
            <p className="hero-intro">
              I build reliable software and practical machine-learning systems, with experience in local AI applications, computer vision experiments, and production-oriented backend development.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">Featured projects <Arrow /></a>
              <a className="button button-secondary" href={profileLinks.resume} download>Download résumé</a>
              <a className="button button-tertiary" href="#contact">Contact</a>
            </div>
            <div className="social-row" aria-label="Professional links">
              <a href={profileLinks.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a>
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
              <div><b>Software Engineering</b><b>ML Engineering</b><b>Computer Vision</b></div>
            </div>
            <div className="system-line" aria-hidden="true"><i /><i /><i /><i /></div>
          </aside>

          <div className="evidence-strip reveal is-visible">
            <span><b>01</b> Production-oriented APIs</span>
            <span><b>02</b> Local ML inference</span>
            <span><b>03</b> Reproducible CV experiments</span>
            <span><b>04</b> Human-centered AI workflows</span>
          </div>
        </section>

        <section className="section projects" id="projects">
          <SectionHeading number="01" label="FEATURED PROJECTS" title="Engineering work built around" muted="real constraints." />
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.id}>
                <div className="project-card-top"><span>{project.number}</span><span>{project.category}</span></div>
                <div className={`project-diagram project-diagram-${project.id}`} aria-hidden="true">
                  <div className="diagram-node">IN</div><i /><div className="diagram-node core">SYS</div><i /><div className="diagram-node">OUT</div>
                </div>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <dl className="project-details">
                  <div><dt>Technical approach</dt><dd>{project.approach}</dd></div>
                  <div><dt>Verified outcome</dt><dd>{project.outcome}</dd></div>
                </dl>
                <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-links">
                  <button className="text-link" type="button" onClick={() => setActiveProject(project)}>Technical case study <Arrow /></button>
                  {project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">Repository <Arrow /></a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <SectionHeading number="02" label="EXPERIENCE" title="Learning by shipping," muted="measuring, and improving." />
          <div className="experience-list">
            <article className="experience-card reveal">
              <div className="experience-side"><span>SOFTWARE ENGINEERING INTERNSHIP</span><b>MAY 2026 — PRESENT</b><small>HO CHI MINH CITY, VIETNAM</small></div>
              <div>
                <h3>Software Engineering Intern</h3>
                <p className="organization">FPT Software</p>
                <ul>
                  <li><strong>Built</strong> Mega-ASR Studio with a FastAPI backend, React interface, and reusable local speech model.</li>
                  <li><strong>Designed</strong> APIs for single-file and batch transcription while keeping one model loaded across requests.</li>
                  <li><strong>Implemented</strong> inference locking, file validation, and explicit handling for decoding and out-of-memory failures.</li>
                  <li><strong>Integrated</strong> microphone recording, upload, audio preview, and backend and model status features.</li>
                </ul>
              </div>
            </article>
            <article className="experience-card reveal">
              <div className="experience-side"><span>UNDERGRADUATE RESEARCH · VOLUNTEER</span><b>MAY 2026 — PRESENT</b><small>MINNEAPOLIS, MINNESOTA</small></div>
              <div>
                <h3>Undergraduate Research Volunteer</h3>
                <p className="organization">Ding Lab · University of Minnesota Twin Cities</p>
                <ul>
                  <li><strong>Prepared</strong> datasets for a PhD-led AI hardware and systems research project.</li>
                  <li><strong>Reviewed</strong> preprocessing outputs and flagged inconsistent or low-quality samples before evaluation.</li>
                  <li><strong>Ran</strong> computer-vision experiments and analyzed model behavior under controlled conditions.</li>
                  <li><strong>Supported</strong> reproducible workflows through structured data review and experiment execution.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="section research" id="research">
          <SectionHeading number="03" label="RESEARCH & TECHNICAL WORK" title="Experiment design that informs" muted="engineering decisions." />
          <article className="research-card reveal">
            <div className="research-copy">
              <span className="acceptance-label">ACCEPTED TO CTB AT ICML 2026</span>
              <h3>The Shape of Noise</h3>
              <p className="research-title">Layer-Wise Perturbation Profiles for Diagnosing Vision Robustness</p>
              <p>
                Contributed to a layer-wise diagnostic framework for measuring how image corruption is amplified or suppressed inside vision models. The work demonstrates paper reading, controlled experimentation, parameter-efficient adaptation, and multi-seed result analysis.
              </p>
              <ul className="research-bullets">
                <li>Designed and ran ResNet-50 and ConvNeXt-Tiny experiments on CIFAR-10 and CIFAR-10-C.</li>
                <li>Compared full fine-tuning, LoRA, and profile-selected and baseline layer subsets.</li>
                <li>Analyzed clean and corrupted accuracy, trainable parameters, and results across random seeds.</li>
              </ul>
              <div className="publication-actions">
                {profileLinks.paper && <a className="text-link" href={profileLinks.paper}>Read manuscript <Arrow /></a>}
                {profileLinks.openReview && <a className="text-link" href={profileLinks.openReview}>OpenReview <Arrow /></a>}
              </div>
            </div>
            <div className="metrics-card">
              <div className="metrics-heading"><span>CONVNEXT-TINY / CIFAR-10-C</span><span>VERIFIED RESULT</span></div>
              <div className="metric-row featured"><div><span>Top-k LoRA</span><strong>92.57<small>%</small></strong><small>corrupted accuracy</small></div><div><strong>0.04<small>M</small></strong><small>trainable parameters</small></div></div>
              <div className="metric-divider" />
              <div className="metric-row"><div><span>Full fine-tuning</span><strong>94.95<small>%</small></strong><small>corrupted accuracy</small></div><div><strong>27.83<small>M</small></strong><small>trainable parameters</small></div></div>
              <p>Top-k LoRA used approximately 696× fewer trainable parameters while retaining most corrupted accuracy in this comparison.</p>
            </div>
          </article>
        </section>

        <section className="section skills" id="skills">
          <SectionHeading number="04" label="TECHNICAL SKILLS" title="Tools used across" muted="software and ML workflows." />
          <div className="skill-matrix reveal">
            {skillGroups.map((group, index) => (
              <div className="skill-row" key={group.label}>
                <div className="skill-label"><span>0{index + 1}</span><b>{group.label}</b></div>
                <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section education" id="education">
          <SectionHeading number="05" label="EDUCATION" title="A strong academic base for" muted="technical work." />
          <article className="education-card reveal">
            <div><span>UNIVERSITY OF MINNESOTA TWIN CITIES</span><h3>Bachelor of Science in Computer Science</h3><p>Minneapolis, Minnesota</p></div>
            <dl><div><dt>Expected graduation</dt><dd>May 2028</dd></div><div><dt>GPA</dt><dd>3.93 / 4.00</dd></div><div><dt>Languages</dt><dd>Vietnamese and English</dd></div></dl>
          </article>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy reveal">
            <span className="section-number">06 / CONTACT</span>
            <h2>Interested in building <em>reliable systems.</em></h2>
            <p>I am looking for software engineering, ML engineering, ML systems, and computer vision internship opportunities.</p>
          </div>
          <div className="contact-actions reveal">
            <a href={profileLinks.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span><b>Harryphan72007</b><Arrow /></a>
            <a href={profileLinks.resume} download><span>Résumé</span><b>Download PDF</b><Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-mark">MP<i /></div>
        <div><strong>Minh Phan</strong><span>Computer Science · University of Minnesota</span></div>
        <p>Software engineering, ML systems, and computer vision.</p>
        <div className="footer-links"><a href={profileLinks.github}>GitHub</a><a href={profileLinks.resume}>Résumé</a><a href="#contact">Contact</a></div>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveProject(null)}>
          <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button ref={closeButtonRef} className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close technical case study">×</button>
            <span className="project-category">{activeProject.category}</span>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p className="modal-intro">{activeProject.summary}</p>
            <div className="modal-grid">
              <div><span>PROBLEM</span><p>{activeProject.problem}</p></div>
              <div><span>MY CONTRIBUTION</span><p>{activeProject.contribution}</p></div>
            </div>
            <div className="modal-architecture"><span>ARCHITECTURE</span><p>{activeProject.approach}</p></div>
            <div className="modal-outcome"><span>VERIFIED OUTCOME</span><p>{activeProject.outcome}</p></div>
            <div className="tag-row">{activeProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <p className="repo-pending">Repository and demo links are pending verification.</p>
          </article>
        </div>
      )}
    </>
  );
}
