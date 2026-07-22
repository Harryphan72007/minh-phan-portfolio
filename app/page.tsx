"use client";

import { FormEvent, useEffect, useState } from "react";

const profileLinks = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  email: "",
  paper: "#research",
  openReview: "#research",
  resume: "/quang-minh-phan-resume.pdf",
};

const researchContributions = [
  "Designed and ran ResNet-50 and ConvNeXt-Tiny experiments",
  "Evaluated CIFAR-10 and CIFAR-10-C robustness",
  "Compared full fine-tuning with LoRA adaptation",
  "Tested profile-selected and baseline layer subsets",
  "Analyzed clean and corrupted accuracy across seeds",
  "Compared trainable parameters and experimental results",
];

const projects = [
  {
    id: "mega-asr",
    number: "01",
    title: "Mega-ASR Studio",
    category: "Speech AI · Full-stack AI application",
    description:
      "A local speech-to-text application pairing a FastAPI backend with a focused React interface and reusable local inference.",
    role: "Full-stack AI developer",
    challenge: "Making heavyweight local inference reliable across concurrent uploads.",
    learning: "Model lifecycle and operational safeguards matter as much as inference quality.",
    stack: ["Python", "FastAPI", "React", "Vite", "Local ASR"],
    features: [
      "Microphone recording and drag-and-drop upload",
      "Single-file and batch transcription",
      "Model reuse and inference concurrency control",
      "Decode, validation, and memory error handling",
      "Audio preview and live system status",
    ],
  },
  {
    id: "noteflow",
    number: "02",
    title: "NoteFlow AI",
    category: "Local-first documentation intelligence",
    description:
      "A documentation-support platform that turns notes, audio, and scans into structured, reviewable, and auditable records.",
    role: "Product and AI application developer",
    challenge: "Preserving source traceability while normalizing mixed-format inputs.",
    learning: "Human review and auditability are core product features in high-context workflows.",
    stack: ["React", "TypeScript", "Vite", "ASR", "OCR", "Local AI"],
    features: [
      "Manual notes, audio transcription, and OCR ingestion",
      "Text normalization and source comparison",
      "Human review workflow and task tracking",
      "Audit logs and document exports",
      "Local-first processing for practical privacy",
    ],
    note: "Supports human documentation workflows. It does not make autonomous diagnoses or treatment decisions.",
  },
  {
    id: "asl",
    number: "03",
    title: "AI Sign Language Recognition",
    category: "Computer Vision · Real-time ML",
    description:
      "A real-time American Sign Language hand-gesture prototype built around landmarks and interpretable classical ML.",
    role: "Computer vision developer",
    challenge: "Building stable features from live hand landmarks under changing camera conditions.",
    learning: "A clear data pipeline can make compact classical models effective for real-time interaction.",
    stack: ["Python", "OpenCV", "MediaPipe", "scikit-learn", "k-NN"],
    features: [
      "Live camera capture and hand detection",
      "Landmark extraction and feature preprocessing",
      "k-nearest neighbors classification",
      "Real-time prediction feedback",
      "Compact, inspectable ML pipeline",
    ],
  },
];

const skillGroups = [
  { label: "Programming", skills: ["Python", "C++", "Java"] },
  {
    label: "Machine Learning",
    skills: ["PyTorch", "scikit-learn", "LoRA", "Fine-tuning", "Computer vision", "OpenCV", "MediaPipe", "k-NN"],
  },
  { label: "AI Applications", skills: ["Local ASR", "OCR", "Ollama", "Document workflows"] },
  { label: "Web Development", skills: ["FastAPI", "React", "TypeScript", "Vite", "REST APIs"] },
  { label: "Research Tools", skills: ["Git", "LaTeX", "Experiment tracking", "Multi-seed evaluation", "Result analysis"] },
];

const focusAreas = [
  {
    index: "01",
    title: "Efficient Computer Vision",
    text: "Comparing CNNs, Vision Transformers, Mamba, and self-supervised methods.",
  },
  {
    index: "02",
    title: "Vision Robustness",
    text: "Understanding how perturbations propagate through model layers.",
  },
  {
    index: "03",
    title: "Parameter-Efficient Adaptation",
    text: "Studying LoRA, layer selection, and efficient fine-tuning.",
  },
  {
    index: "04",
    title: "AI Hardware & Systems",
    text: "Learning how architecture, computation, and hardware constraints interact.",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function NeuralVisual() {
  return (
    <div className="neural-visual" aria-label="Abstract visualization of clean and corrupted image representations moving through neural network layers">
      <div className="visual-toolbar">
        <span>ROBUSTNESS / LAYER TRACE</span>
        <span className="live-dot">LIVE</span>
      </div>
      <div className="visual-grid" aria-hidden="true">
        <div className="input-patch">
          {Array.from({ length: 16 }).map((_, index) => (
            <i key={index} style={{ "--i": index } as React.CSSProperties} />
          ))}
          <span>INPUT</span>
        </div>
        <div className="layer layer-one"><b>L1</b><i /><i /><i /></div>
        <div className="layer layer-two"><b>L2</b><i /><i /><i /><i /></div>
        <div className="layer layer-three"><b>L3</b><i /><i /><i /></div>
        <div className="representation">
          <span className="clean-node">CLEAN</span>
          <span className="corrupt-node">CORRUPT</span>
        </div>
        <div className="signal clean-signal" />
        <div className="signal corrupt-signal" />
      </div>
      <div className="visual-legend">
        <span><i className="legend-clean" /> clean representation</span>
        <span><i className="legend-corrupt" /> perturbed representation</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio conversation"));
    const body = encodeURIComponent(
      `From: ${String(data.get("name"))}\nEmail: ${String(data.get("email"))}\n\n${String(data.get("message"))}`,
    );
    setFormStatus("Opening a ready-to-send email draft in your mail app.");
    window.location.href = `mailto:${profileLinks.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Quang Minh Phan, home">
          <span>QMP</span><i />
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {["About", "Research", "Experience", "Projects", "Skills", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="icon-link" href={profileLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">GH</a>
          <a className="icon-link" href={profileLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">LI</a>
          <a className="button button-small" href={profileLinks.resume} download>Résumé</a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
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
            <div className="eyebrow"><i /> ML RESEARCH · COMPUTER VISION · EFFICIENT AI</div>
            <h1>Building and studying <span>efficient AI systems.</span></h1>
            <p className="hero-intro">
              I am <strong>Quang Minh Phan</strong>, a Computer Science student at the University of Minnesota working on computer vision, model robustness, efficient fine-tuning, and practical AI applications.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">View my work <ArrowIcon /></a>
              <a className="button button-secondary" href={profileLinks.resume} download>Download résumé</a>
            </div>
            <div className="social-row" aria-label="Social links">
              <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
              <a href="#contact">Email <ArrowIcon /></a>
            </div>
          </div>
          <div className="hero-visual reveal is-visible">
            <NeuralVisual />
            <div className="status-strip">
              <span>Undergraduate Researcher</span>
              <span>Software Engineering Intern</span>
              <span>ICML Workshop Co-author</span>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><i /></a>
        </section>

        <section className="section about" id="about">
          <div className="section-heading reveal">
            <span className="section-number">01 / ABOUT</span>
            <h2>Curious about how models <em>learn, adapt,</em> and behave.</h2>
          </div>
          <div className="about-layout">
            <div className="about-copy reveal">
              <p className="lead">I am a Computer Science undergraduate at the University of Minnesota Twin Cities interested in understanding how machine-learning models behave under real-world conditions.</p>
              <p>My work combines computer-vision research with practical AI development. I have contributed to research on layer-wise vision robustness and parameter-efficient adaptation, while building local AI applications involving speech recognition, OCR, document processing, and human review.</p>
              <p>My long-term goal is to work on efficient AI and machine-learning systems that connect model design, experimentation, and real-world deployment.</p>
            </div>
            <dl className="facts-grid reveal">
              <div><dt>University</dt><dd>University of Minnesota</dd></div>
              <div><dt>Program</dt><dd>B.S. Computer Science</dd></div>
              <div><dt>Graduation</dt><dd>May 2028</dd></div>
              <div><dt>GPA</dt><dd>3.93 <span>/ 4.00</span></dd></div>
              <div><dt>Based in</dt><dd>Minneapolis, Minnesota</dd></div>
              <div><dt>Languages</dt><dd>Vietnamese & English</dd></div>
            </dl>
          </div>
        </section>

        <section className="section research" id="research">
          <div className="section-kicker reveal"><span className="section-number">02 / RESEARCH</span><span>FEATURED PUBLICATION · 2026</span></div>
          <article className="publication-card reveal">
            <div className="publication-main">
              <div className="publication-label"><i /> ACCEPTED TO CTB AT ICML 2026</div>
              <h2><span>The Shape of Noise:</span> Layer-Wise Perturbation Profiles for Diagnosing Vision Robustness</h2>
              <p>This work introduces the Perturbation Evaluation Framework, a layer-wise diagnostic method for studying how image corruption is amplified or suppressed inside vision models.</p>
              <div className="publication-actions">
                <a className="text-link" href={profileLinks.paper}>Read paper <ArrowIcon /></a>
                <a className="text-link" href={profileLinks.openReview}>View OpenReview <ArrowIcon /></a>
                <button className="text-link" type="button" onClick={() => document.querySelector("#research-details")?.scrollIntoView({ behavior: "smooth" })}>Research summary ↓</button>
              </div>
            </div>
            <div className="research-pipeline" aria-label="Clean image to perturbation profile pipeline">
              <div className="pipeline-step"><span>01</span><b>Clean image</b><i className="mini-pixels" /></div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step"><span>02</span><b>Corruption</b><i className="mini-pixels noisy" /></div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step layers-mini"><span>03</span><b>Layers</b><i /><i /><i /></div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step profile-mini"><span>04</span><b>Profile</b><i /><i /><i /><i /></div>
            </div>
          </article>

          <div className="research-details" id="research-details">
            <div className="contributions reveal">
              <div className="subheading"><span>MY CONTRIBUTIONS</span><span>06 EXPERIMENTAL AREAS</span></div>
              <ul>
                {researchContributions.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}
              </ul>
            </div>
            <div className="metrics-card reveal">
              <div className="subheading"><span>EFFICIENCY / ROBUSTNESS</span><span>CONVNEXT-TINY</span></div>
              <h3>Strong corrupted accuracy with <em>~696× fewer</em> trainable parameters.</h3>
              <div className="metric-row metric-featured">
                <div><span>Top-k LoRA</span><strong>92.57<small>%</small></strong><small>corrupted accuracy</small></div>
                <div><strong>0.04<small>M</small></strong><small>trainable parameters</small></div>
              </div>
              <div className="bar"><i style={{ width: "92.57%" }} /></div>
              <div className="metric-row">
                <div><span>Full fine-tuning</span><strong>94.95<small>%</small></strong><small>corrupted accuracy</small></div>
                <div><strong>27.83<small>M</small></strong><small>trainable parameters</small></div>
              </div>
              <div className="bar bar-muted"><i style={{ width: "94.95%" }} /></div>
              <p className="metric-note">Accuracy shown on CIFAR-10-C. Parameter comparison is not encoded by bar length.</p>
            </div>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-heading reveal">
            <span className="section-number">03 / EXPERIENCE</span>
            <h2>Research rigor, <em>production thinking.</em></h2>
          </div>
          <div className="timeline">
            <article className="experience-card reveal">
              <div className="timeline-marker"><i /><span>2026—</span></div>
              <div className="experience-meta"><span>MAY 2026 — PRESENT</span><span>MINNEAPOLIS, MN</span></div>
              <h3>Undergraduate Research Volunteer</h3>
              <p className="organization">Ding Lab · University of Minnesota Twin Cities</p>
              <ul>
                <li>Support a PhD-led AI hardware and systems research project.</li>
                <li>Prepare, review, and label training and evaluation datasets.</li>
                <li>Identify inconsistent or low-quality preprocessing outputs.</li>
                <li>Run and analyze reproducible computer-vision experiments.</li>
              </ul>
            </article>
            <article className="experience-card reveal">
              <div className="timeline-marker"><i /><span>2026—</span></div>
              <div className="experience-meta"><span>MAY 2026 — PRESENT</span><span>HO CHI MINH CITY, VN</span></div>
              <h3>Software Engineering Intern</h3>
              <p className="organization">FPT Software</p>
              <ul>
                <li>Built Mega-ASR Studio with FastAPI, React, and Vite.</li>
                <li>Designed APIs for single-file and batch transcription.</li>
                <li>Reused a local ASR model with inference locking and validation.</li>
                <li>Handled decoding, out-of-memory, recording, and system status flows.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-heading reveal">
            <span className="section-number">04 / SELECTED PROJECTS</span>
            <h2>Practical systems for <em>real inputs.</em></h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.id}>
                <div className="project-number">{project.number}</div>
                <div className={`project-diagram project-diagram-${project.id}`} aria-hidden="true">
                  <span>{project.category.split(" · ")[0]}</span>
                  <div className="diagram-core"><i /><i /><i /><i /></div>
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="project-links">
                    <a className="text-link" href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
                    <button className="text-link" type="button" onClick={() => setActiveProject(project)}>Case study <ArrowIcon /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="section-heading reveal">
            <span className="section-number">05 / TECHNICAL SKILLS</span>
            <h2>A toolkit for <em>experiments to interfaces.</em></h2>
          </div>
          <div className="skill-matrix reveal">
            {skillGroups.map((group, groupIndex) => (
              <div className="skill-row" key={group.label}>
                <div className="skill-label"><span>0{groupIndex + 1}</span><b>{group.label}</b></div>
                <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section focus">
          <div className="section-heading reveal">
            <span className="section-number">06 / WHAT I AM EXPLORING</span>
            <h2>Questions shaping <em>what comes next.</em></h2>
          </div>
          <div className="focus-grid">
            {focusAreas.map((area) => (
              <article className="focus-card reveal" key={area.title}>
                <span>{area.index}</span><i />
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </div>
          <div className="interests reveal">
            <span>BEYOND THE LAB</span>
            <p>Outside research and development, I enjoy <strong>chess</strong>, mathematical problem solving, competitive programming, technical presentations, and maintaining an active lifestyle.</p>
            <div>♙ · ∑ · &lt;/&gt; · ↗</div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy reveal">
            <span className="section-number">07 / CONTACT</span>
            <h2>Let&apos;s build something <em>worth studying.</em></h2>
            <p>I am interested in research opportunities, machine-learning internships, computer-vision projects, and collaborations involving efficient AI.</p>
            <div className="contact-links">
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
              <a href={profileLinks.resume} download>Résumé <ArrowIcon /></a>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={handleContact}>
            <div className="form-row">
              <label><span>Name</span><input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            </div>
            <label><span>Subject</span><input name="subject" type="text" placeholder="Research, internship, or collaboration" required /></label>
            <label><span>Message</span><textarea name="message" rows={5} placeholder="Tell me a little about what you are working on..." required /></label>
            <button className="button" type="submit">Start a conversation <ArrowIcon /></button>
            <p className="form-status" aria-live="polite">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-mark">QMP<i /></div>
        <div><strong>Quang Minh Phan</strong><span>University of Minnesota Twin Cities</span></div>
        <p>Designed around research, learning, and practical AI.</p>
        <div className="footer-links"><a href={profileLinks.github}>GitHub</a><a href={profileLinks.linkedin}>LinkedIn</a><a href="#contact">Email</a></div>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveProject(null)}>
          <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close case study">×</button>
            <span className="project-category">{activeProject.category}</span>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p className="modal-intro">{activeProject.description}</p>
            <div className="modal-grid">
              <div><span>MY ROLE</span><p>{activeProject.role}</p></div>
              <div><span>MAIN CHALLENGE</span><p>{activeProject.challenge}</p></div>
              <div><span>KEY LEARNING</span><p>{activeProject.learning}</p></div>
            </div>
            <h3>System highlights</h3>
            <ul>{activeProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            {activeProject.note && <p className="modal-note">{activeProject.note}</p>}
            <div className="tag-row">{activeProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </article>
        </div>
      )}
    </>
  );
}
