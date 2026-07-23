from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = [
    ROOT / "public" / "quang-minh-phan-resume.pdf",
    ROOT / "outputs" / "quang-minh-phan-resume.pdf",
]

INK = HexColor("#10141B")
MUTED = HexColor("#5D6674")
CYAN = HexColor("#087F91")
LINE = HexColor("#D9DEE5")

regular = "Helvetica"
bold = "Helvetica-Bold"
mono = "Courier"

font_root = Path("C:/Windows/Fonts")
if (font_root / "arial.ttf").exists():
    pdfmetrics.registerFont(TTFont("PortfolioSans", str(font_root / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("PortfolioSansBold", str(font_root / "arialbd.ttf")))
    regular = "PortfolioSans"
    bold = "PortfolioSansBold"

styles = {
    "name": ParagraphStyle("name", fontName=bold, fontSize=23, leading=25, textColor=INK, spaceAfter=5),
    "title": ParagraphStyle("title", fontName=regular, fontSize=9.2, leading=13, textColor=MUTED),
    "section": ParagraphStyle("section", fontName=mono, fontSize=7.5, leading=9, textColor=CYAN, spaceBefore=9, spaceAfter=6, uppercase=True),
    "role": ParagraphStyle("role", fontName=bold, fontSize=10.2, leading=12.5, textColor=INK),
    "meta": ParagraphStyle("meta", fontName=mono, fontSize=6.8, leading=8.5, textColor=MUTED, alignment=TA_RIGHT),
    "org": ParagraphStyle("org", fontName=regular, fontSize=8.5, leading=10.5, textColor=CYAN, spaceAfter=3),
    "body": ParagraphStyle("body", fontName=regular, fontSize=8.2, leading=11.2, textColor=MUTED),
    "bullet": ParagraphStyle("bullet", fontName=regular, fontSize=7.8, leading=10.4, textColor=MUTED, leftIndent=8, firstLineIndent=-7, bulletIndent=0, spaceAfter=1.5),
    "skill": ParagraphStyle("skill", fontName=regular, fontSize=7.4, leading=10.2, textColor=MUTED),
}


def section(label):
    return [Paragraph(label.upper(), styles["section"]), Table([[""]], colWidths=[7.3 * inch], rowHeights=[0.5], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), LINE)]))]


def experience(role, org, dates, location, bullets):
    heading = Table(
        [[Paragraph(role, styles["role"]), Paragraph(f"{dates}<br/>{location}", styles["meta"])]],
        colWidths=[5.4 * inch, 1.9 * inch],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]),
    )
    story = [heading, Paragraph(org, styles["org"])]
    story += [Paragraph(f"- {item}", styles["bullet"]) for item in bullets]
    story.append(Spacer(1, 4))
    return KeepTogether(story)


def project(title, category, description, stack):
    return KeepTogether([
        Table(
            [[Paragraph(title, styles["role"]), Paragraph(category.upper(), styles["meta"])]],
            colWidths=[4.8 * inch, 2.5 * inch],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]),
        ),
        Paragraph(description, styles["body"]),
        Paragraph(f"<font name='{mono}' color='#087F91'>{stack}</font>", styles["skill"]),
        Spacer(1, 4),
    ])


def page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CYAN)
    canvas.rect(0, 0, 0.12 * inch, letter[1], fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(0.55 * inch, 0.42 * inch, letter[0] - 0.55 * inch, 0.42 * inch)
    canvas.setFont(mono, 6.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.55 * inch, 0.25 * inch, "MINH PHAN / RESUME")
    canvas.drawRightString(letter[0] - 0.55 * inch, 0.25 * inch, "2026")
    canvas.restoreState()


story = [
    Table(
        [[Paragraph("Minh Phan", styles["name"]), Paragraph("MINNEAPOLIS, MINNESOTA<br/>VIETNAMESE + ENGLISH", styles["meta"])]],
        colWidths=[5.4 * inch, 1.9 * inch],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]),
    ),
    Paragraph("Computer Science student building reliable software, ML systems, local AI applications, and computer vision experiments.", styles["title"]),
]

story += section("Education")
story.append(experience(
    "B.S. Computer Science",
    "University of Minnesota Twin Cities",
    "EXPECTED MAY 2028",
    "GPA 3.93 / 4.00",
    ["Focus: computer vision, vision robustness, efficient deep learning, parameter-efficient fine-tuning, and AI systems."],
))

story += section("Research and Experience")
story.append(experience(
    "Software Engineering Intern",
    "FPT Software",
    "MAY 2026 - PRESENT",
    "HO CHI MINH CITY, VN",
    [
        "Built Mega-ASR Studio with FastAPI, React, Vite, and reusable local ASR inference.",
        "Implemented batch and single-file APIs, inference locking, validation, recording, previews, system status, and decode/memory error handling.",
    ],
))
story.append(experience(
    "Undergraduate Research Volunteer",
    "Ding Lab - University of Minnesota Twin Cities",
    "MAY 2026 - PRESENT",
    "MINNEAPOLIS, MN",
    [
        "Prepared datasets, reviewed preprocessing outputs, and flagged inconsistent or low-quality samples for a PhD-led AI hardware and systems project.",
        "Ran and analyzed computer-vision experiments while supporting reproducible research workflows.",
    ],
))

story += section("Research Work")
story.append(experience(
    "The Shape of Noise",
    "Layer-Wise Perturbation Profiles for Diagnosing Vision Robustness - accepted to CTB at ICML 2026",
    "WORKSHOP CO-AUTHOR",
    "COMPUTER VISION",
    [
        "Designed and ran ResNet-50 and ConvNeXt-Tiny experiments on CIFAR-10 and CIFAR-10-C; compared full fine-tuning, LoRA, layer subsets, multi-seed results, and parameter counts.",
        "Top-k LoRA on ConvNeXt-Tiny reached 92.57% corrupted accuracy with 0.04M trainable parameters.",
    ],
))

story += section("Selected Projects")
story.append(project("NoteFlow AI", "Local-first AI", "Transforms notes, audio, and scans into structured, reviewable documentation with OCR, ASR, source comparison, audit logs, and human review.", "React / TypeScript / Vite / ASR / OCR"))
story.append(project("AI Sign Language Recognition", "Real-time CV", "Recognizes ASL hand gestures through MediaPipe landmarks, feature preprocessing, and k-nearest-neighbors prediction.", "Python / OpenCV / MediaPipe / scikit-learn"))

story += section("Technical Skills")
skills = [
    [Paragraph("PROGRAMMING", styles["meta"]), Paragraph("Python, C++, Java", styles["skill"])],
    [Paragraph("ML + VISION", styles["meta"]), Paragraph("PyTorch, scikit-learn, LoRA, fine-tuning, OpenCV, MediaPipe, model evaluation", styles["skill"])],
    [Paragraph("AI APPLICATIONS", styles["meta"]), Paragraph("Local ASR, OCR, Ollama, document-processing workflows", styles["skill"])],
    [Paragraph("WEB + RESEARCH", styles["meta"]), Paragraph("FastAPI, React, TypeScript, Vite, REST APIs, Git, LaTeX, multi-seed evaluation", styles["skill"])],
]
story.append(Table(skills, colWidths=[1.25 * inch, 6.05 * inch], style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 2), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)])))

for output in OUTPUTS:
    output.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(str(output), pagesize=letter, leftMargin=0.55 * inch, rightMargin=0.55 * inch, topMargin=0.42 * inch, bottomMargin=0.5 * inch, title="Minh Phan Resume", author="Minh Phan")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=page)])
    doc.build(list(story))

print("\n".join(str(output) for output in OUTPUTS))
