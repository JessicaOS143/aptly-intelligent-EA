import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   APTLY INTELLIGENT & CO.
   Jessica Ocasio Salters, Principal
   ═══════════════════════════════════════════ */

/* ─── PALETTE (matched to Per Executive) ───
   Background:  #f0f2f6 / white
   Dark navy:   #1e3054
   Mid navy:    #2c4a7a
   Steel blue:  #4a6a9a
   Gold accent: #b89237
   Text primary:#1a2744
   Text muted:  #4e607a
   ─────────────────────────────────────────── */

const NAV = [
  { label: "About",        href: "#about"         },
  { label: "Services",     href: "#services"      },
  { label: "Partnerships", href: "#partnerships"  },
  { label: "Sprints",      href: "#sprints"       },
  { label: "Portfolio",   href: "#portfolio"     },
  { label: "FAQ",          href: "#faq"           },
  { label: "Contact",      href: "#contact"       },
];

const SERVICES = [
  { no: "01", title: "Executive & Admin Support",    tag: "Core",
     line: "I take the operational weight off your plate so your hours go to product, fundraising, and the decisions only you can make.",
     items: ["Inbox and calendar architecture","Priority and decision filtering","Meeting preparation and follow-ups","Executive task orchestration"] },
  { no: "02", title: "Lifestyle Assistance",          tag: "Core",
     line: "Executive life doesn't stop at the office. I handle the personal logistics that drain time and mental bandwidth so you don't have to.",
     items: ["Travel and logistics coordination","Expense tracking and organization","Research and briefing preparation","Day-to-day administrative needs"] },
  { no: "03", title: "Operations and Project Management", tag: "Core",
     line: "Ideas become shipped outcomes. I own the plan, drive the cross-functional moving parts, and keep momentum when things get noisy.",
     items: ["SOP creation and process cleanup","Team coordination and follow-through","Workflow support across initiatives","Tool optimization and dashboards"] },
  { no: "04", title: "Systems and Organization",     tag: "Core",
     line: "The infrastructure a growing company needs but rarely has time to build, set up once so the business runs without you in every loop.",
     items: ["Notion, Google Workspace, Slack, Airtable","Dashboards and operating documents","Information flow organization","Ownership and accountability clarity"] },
  { no: "05", title: "AI-Native Workflows",           tag: "Core",
     line: "AI increases velocity. I build the automations that let a small team operate like a much larger one. You stay in control.",
     items: ["AI-assisted inbox triage","Intelligent meeting summaries","SOP generation and documentation","AI copilots inside Notion, Google, Slack"] },
  { no: "06", title: "Notary and Apostille",          tag: "Specialized", geo: "Georgia",
     line: "Certified Georgia Notary providing secure document execution and Apostille coordination for domestic and international use.",
     items: ["Business contracts and power of attorney","Real estate documents","Corporate filings","Apostille processing coordination"] },
  { no: "07", title: "Digital Business Cards",        tag: "Specialized",
     line: "Modern, professional digital business cards that reflect your brand, designed, built, and deployed so you are always memorable.",
     items: ["Custom branded design","NFC and QR-ready","Contact sharing built in","One-day turnaround"] },
];

const COMPANIES = [
  "Estée Lauder Companies","MAC Cosmetics","Jo Malone London",
  "La Mer","YSL Beauté (L'Oréal)","Paramount","BET","VH1",
  "Medidata AI","International Blockchain Consulting Group"
];

const UNLOCKS = [
  "Fewer decisions landing back on your plate",
  "Faster follow-through without reminders",
  "Meetings that produce outcomes, not just conversation",
  "Clearer ownership across people, tools, and priorities",
  "Less rework, fewer dropped balls",
  "More leadership capacity for strategy, relationships, and growth",
];

const BEFORE_AFTER = {
  before: ["Constant inbox triage and decision fatigue","Meetings without follow-through","Priorities competing with no clear owner","Tools that exist but aren't trusted","Important items handled eventually"],
  after:  ["Clear priorities and predictable execution loops","Prepared meetings with action clarity","Clean handoffs and consistent follow-through","Systems that support the work instead of adding friction","Leadership time protected by design"],
};

const PLANS = [
  { label: "Foundation", hours: "Up to 20 Hours / Month", price: "$1,500+/month",
    best: "For founders and professionals who need relief from administrative overload and day-to-day coordination.",
    features: ["Calendar and meeting management","Inbox organization and follow-up","Travel coordination","Expense tracking and reporting","Document preparation","Weekly executive touchpoint"] },
  { label: "Growth", hours: "Up to 35 Hours / Month", price: "$2,700+/month",
    best: "For businesses managing multiple projects, vendors, stakeholders, and operational priorities.",
    features: ["Everything in Foundation","Project coordination","Vendor and stakeholder management","Meeting agendas and action tracking","Research and reporting","Process documentation"],
    popular: true },
  { label: "Executive", hours: "Up to 50 Hours / Month", price: "$4,500+/month",
    best: "For leaders who need a trusted strategic operations partner embedded within their business.",
    features: ["Everything in Growth","Strategic project support","Executive communications","Cross-functional coordination","Event and offsite planning","Priority management and escalation support"] },
  { label: "Executive Access", hours: "Dedicated Capacity", price: "Custom Engagement",
    best: "For organizations requiring specialized executive operations, project leadership, systems implementation, or high-touch support.",
    features: ["Dedicated monthly capacity","Expanded availability coverage","Multi-project coordination","Executive and personal support integration","High-priority response support","Custom engagement structure"],
    limited: true },
];

const EXPERTISE = [
  "Executive Operations","Project Leadership","Global Operations","Executive Support",
  "Beauty & Luxury","Media","Healthcare","Finance","Technology","Web3"
];

const SPRINTS = [
  { title: "Executive Flow Reset",       desc: "Stabilize inbox, calendar, priorities, and follow-through to restore calm and control."              },
  { title: "Systems and Organization",   desc: "Clean and align tools, workflows, documentation, and ownership so execution is reliable."             },
  { title: "Project Momentum",           desc: "Restart a stalled initiative with scope clarity, tracking, and milestone progress."                   },
  { title: "Executive Transition",       desc: "Support a new role, new team, or major shift with structure and operating rhythm."                    },
];

const TESTIMONIALS = [
  { quote: "Working with Aptly Intelligent has been transformative for my business. The organization skills and attention to detail are unmatched. I can finally focus on growing my business, knowing all the operations are in safe hands.", name: "Sarah B.", title: "Founder", industry: "Marketing Agency" },
  { quote: "I struggled to keep up with my priorities until Jessica stepped in. Clear systems, managed follow-through, and seamless execution. My productivity and peace of mind have increased dramatically.",                               name: "Michael C.", title: "Managing Partner", industry: "Law Firm" },
  { quote: "As a busy professional, I was overwhelmed trying to balance my career and personal life. Aptly Intelligent has been invaluable, helping with everything from meeting prep to travel planning. Highly recommend.",                name: "Jennifer T.", title: "VP of Operations", industry: "Technology" },
];

const PROCESS = [
  { step: "01", title: "Complete the Discovery Form",  desc: "Share your role, priorities, and what's creating friction so the conversation can be intentional."                    },
  { step: "02", title: "Receive Your Call Link",       desc: "After reviewing your submission, a personalized discovery call link is shared if aligned."                            },
  { step: "03", title: "Discovery Conversation",       desc: "We clarify priorities, determine whether a partnership or sprint makes sense, and outline scope."                     },
  { step: "04", title: "Onboarding and Momentum",      desc: "Support begins with stabilization and immediate execution improvements."                                               },
];

const FIT_YES = ["Are a founder or senior leader","Want a thinking partner, not just help","Value discretion, structure, and follow-through","Prefer proactive support over constant check-ins"];
const FIT_NO  = ["Want hourly or task-only support","Need constant direction","Are shopping for the lowest-cost option"];

const FAQS = [
  { q: "Are you hourly?",                                        a: "No. Support is structured around monthly partnerships or focused sprint engagements, not hourly tracking. This allows for proactive, judgment-based support rather than time-logged tasks." },
  { q: "Why not hire a full-time executive assistant?",          a: "A full-time hire comes with salary, benefits, onboarding time, management overhead, and long-term commitment. Aptly Intelligent & Co. provides senior-level executive operations support at a fraction of that cost, with no overhead, no HR complexity, and the flexibility to scale as your needs change." },
  { q: "What makes Aptly different from a virtual assistant?",   a: "A virtual assistant handles tasks. Aptly Intelligent & Co. provides executive operations partnership. That means strategic thinking, project leadership, systems design, and proactive support, not just task completion. The work is judgment-based, confidential, and aligned with your business priorities." },
  { q: "What systems and platforms do you work in?",             a: "Notion, Google Workspace, Microsoft 365, Slack, Airtable, HubSpot, Asana, Monday.com, Zoom, and a range of AI tools including Claude, ChatGPT, and n8n. If you use something not listed, it is likely familiar or quickly learnable." },
  { q: "Can you help build operational systems and workflows?",  a: "Yes. Designing and implementing operational systems is a core capability. This includes building SOPs, creating dashboards, structuring project management frameworks, and automating repetitive workflows using AI and no-code tools." },
  { q: "Do you provide project management support?",             a: "Yes. Project management support spans planning, stakeholder coordination, timeline management, documentation, and cross-functional follow-through. PMP-certified and experienced across complex, multi-team initiatives." },
  { q: "Can you work alongside my existing team?",               a: "Absolutely. Most engagements involve working alongside existing staff, contractors, and vendors. The focus is on filling gaps, improving coordination, and supporting team execution, not replacing existing team members." },
  { q: "Do you use AI?",                                         a: "Yes. AI tools are integrated to accelerate execution, reduce manual workflow, and increase output quality. All AI use is supervised, intentional, and in service of better results for you." },
  { q: "Do you offer Notary or Apostille services?",             a: "Yes. As a certified Georgia Notary, I provide document notarization and Apostille coordination for business contracts, real estate documents, power of attorney, corporate filings, and international documentation." },
  { q: "Can I start with a sprint instead of a partnership?",    a: "Absolutely. Focused sprints are a great way to address a specific initiative or transition with a defined scope and timeline." },
  { q: "Do you work early mornings or outside standard hours?",  a: "Yes. Support can begin as early as 5am EST for leaders who do their best thinking before the day gets loud. I also work with clients across time zones and can align availability to accommodate schedules outside standard business hours." },
  { q: "Is there a minimum commitment?",                         a: "Monthly partnerships require a 3-month minimum commitment. Sprints are project-based with a defined scope and timeline." },
  { q: "Why do I need to complete a form before booking a call?",a: "The form ensures our conversation is focused and productive. It allows me to review your situation in advance and come prepared with relevant insights." },
  { q: "Are engagements capacity-limited?",                      a: "Yes. Partnerships are selective and capacity-limited to ensure every client receives full attention and quality support." },
];

const IMG = {
  hero:    "data:image/jpeg;base64,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",
  working: "data:image/jpeg;base64,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",
  office:  "data:image/jpeg;base64,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",
};

/* ─── HOOKS ─────────────────────────────── */
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, on];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── APP ────────────────────────────────── */
export default function App() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menu,        setMenu]        = useState(false);
  const [openFaq,     setOpenFaq]     = useState(null);
  const [calcHours,   setCalcHours]   = useState(10);
  const [calcRate,    setCalcRate]    = useState(400);
  const [form,        setForm]        = useState({ name:"", email:"", role:"", company:"", need:"", friction:"", outcome:"", timeline:"", agreed:false });
  const [formSent,    setFormSent]    = useState(false);

  const w       = useWidth();
  const prog    = useProgress();
  const mobile  = w < 640;
  const tablet  = w >= 640 && w < 1024;
  const desktop = w >= 1024;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { if (desktop) setMenu(false); }, [desktop]);

  const go = (href) => {
    setMenu(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  const gutter = mobile ? "20px" : tablet ? "40px" : "max(40px, 7vw)";
  const pad    = mobile ? "52px" : tablet ? "64px" : "80px";
  const mw     = 1180;

  const monthlyCost = Math.round(calcHours * calcRate * 52 / 12);
  const annualCost  = Math.round(calcHours * calcRate * 52);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f0f2f6", color: "#1a2744", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; -webkit-text-size-adjust: 100%; }
        img { max-width: 100%; height: auto; }
        body { font-family: 'DM Sans', sans-serif; background: #f0f2f6; color: #1a2744; -webkit-font-smoothing: antialiased; }
        .disp { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; }
        ::selection { background: rgba(74,106,154,0.18); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(74,106,154,0.4); border-radius: 4px; }

        /* FOCUS */
        :focus { outline: none; }
        :focus-visible { outline: 2px solid #4a6a9a; outline-offset: 3px; border-radius: 2px; }

        /* PROGRESS BAR */
        #pbar { position: fixed; top: 0; left: 0; height: 2px; background: #4a6a9a; z-index: 201; transition: width 0.1s linear; }

        /* NAV */
        .nl {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: 0.03em; color: rgba(255,255,255,0.82);
          transition: color 0.2s, transform 0.2s; padding: 4px 2px;
          -webkit-tap-highlight-color: transparent;
        }
        .nl:hover { color: #fff; transform: translateY(-1px); }
        .nl.scrolled { color: #4e607a; }
        .nl.scrolled:hover { color: #2c4a7a; }

        /* BUTTONS */
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          background: #1e3054; color: #fff; border: none;
          padding: 14px 34px; font-size: 13.5px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
          -webkit-tap-highlight-color: transparent;
        }
        .btn-primary:hover {
          background: #2c4a7a; transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(30,48,84,0.28), 0 0 30px rgba(74,106,154,0.15);
        }
        .btn-primary:active { transform: translateY(0); box-shadow: none; }

        .btn-outline {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: #1e3054;
          border: 1.5px solid rgba(30,48,84,0.3);
          padding: 13px 32px; font-size: 13.5px; font-weight: 500;
          letter-spacing: 0.04em; cursor: pointer;
          transition: all 0.22s; -webkit-tap-highlight-color: transparent;
        }
        .btn-outline:hover {
          border-color: #4a6a9a; color: #2c4a7a; transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(30,48,84,0.12), 0 0 16px rgba(74,106,154,0.1);
        }

        .btn-ghost-white {
          display: inline-flex; align-items: center; justify-content: center;
          background: transparent; color: rgba(255,255,255,0.88);
          border: 1.5px solid rgba(255,255,255,0.3);
          padding: 13px 32px; font-size: 13.5px; font-weight: 500;
          letter-spacing: 0.04em; cursor: pointer;
          transition: all 0.22s; -webkit-tap-highlight-color: transparent;
        }
        .btn-ghost-white:hover {
          border-color: rgba(255,255,255,0.7); color: #fff; transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        /* CARDS */
        /* Service card accent colors per card number */
        .svc-card {
          background: #fff; border: 1px solid #dce4f0;
          padding: 32px 28px; height: 100%; position: relative; overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .svc-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 3px; height: 0; background: #4a6a9a;
          transition: height 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-card:hover {
          border-color: rgba(74,106,154,0.4); transform: translateY(-5px);
          box-shadow: 0 20px 52px rgba(30,48,84,0.14), 0 4px 16px rgba(74,106,154,0.09);
        }
        .svc-card:hover::before { height: 100%; }
        .svc-card.spec { background: #f2f6fc; border-color: rgba(74,106,154,0.25); }
        .svc-card.c1::before { background: #2c5282; }
        .svc-card.c2::before { background: #2b6cb0; }
        .svc-card.c3::before { background: #3182ce; }
        .svc-card.c4::before { background: #4299e1; }
        .svc-card.c1:hover { border-left-color: rgba(44,82,130,0.5); }
        .svc-card.c2:hover { border-left-color: rgba(43,108,176,0.5); }
        .svc-card.c3:hover { border-left-color: rgba(49,130,206,0.5); }
        .svc-card.c4:hover { border-left-color: rgba(66,153,225,0.5); }
        /* Number badge circles */
        .num-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          font-size: 11px; font-weight: 700; letter-spacing: 0;
          margin-bottom: 16px;
        }

        .plan-card {
          background: #fff; border: 1px solid #dce4f0; padding: 32px 28px;
          height: 100%;
          display: grid;
          grid-template-rows: auto auto auto 1fr auto;
          box-shadow: 0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .plan-card:hover {
          border-color: rgba(74,106,154,0.4); transform: translateY(-5px);
          box-shadow: 0 20px 52px rgba(30,48,84,0.13), 0 4px 16px rgba(74,106,154,0.08);
        }
        .plan-card.pop { background: #1e3054; border-color: #1e3054; color: #fff;
          box-shadow: 0 4px 18px rgba(30,48,84,0.25), 0 2px 6px rgba(0,0,0,0.15); }
        .plan-card.pop:hover { background: #2c4a7a;
          box-shadow: 0 20px 52px rgba(30,48,84,0.35), 0 4px 16px rgba(0,0,0,0.2); }

        .sprint-card {
          background: #fff; border: 1px solid #dce4f0; padding: 28px 26px; height: 100%;
          box-shadow: 0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .sprint-card:hover {
          border-color: rgba(74,106,154,0.4); transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(30,48,84,0.13), 0 4px 16px rgba(74,106,154,0.08);
        }

        .stat-cell {
          background: #fff; border: 1px solid #dce4f0; padding: 28px 16px; text-align: center;
          box-shadow: 0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .stat-cell:hover {
          border-color: rgba(74,106,154,0.4); transform: translateY(-4px);
          box-shadow: 0 16px 44px rgba(30,48,84,0.12), 0 4px 14px rgba(74,106,154,0.07);
        }

        /* FAQ ACCORDION */
        .faq-item {
          border-bottom: 1px solid #dce4f0; cursor: pointer;
          transition: background 0.2s;
        }
        .faq-item:first-child { border-top: 1px solid #dce4f0; }
        .faq-item:hover { background: rgba(74,106,154,0.04); }
        .faq-item:focus-visible { outline: 2px solid #4a6a9a; outline-offset: -2px; }

        /* FORM */
        .form-input {
          width: 100%; border: 1.5px solid #dce4f0; background: #fff;
          padding: 12px 16px; font-family: 'DM Sans', sans-serif;
          font-size: 16px; color: #1a2744; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: #4a6a9a; box-shadow: 0 0 0 3px rgba(74,106,154,0.12);
        }
        .form-label {
          display: block; font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4e607a; margin-bottom: 8px;
        }

        /* SLIDER */
        input[type=range] {
          -webkit-appearance: none; width: 100%; height: 4px;
          background: #dce4f0; border-radius: 2px; outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 18px; height: 18px;
          border-radius: 50%; background: #1e3054; cursor: pointer;
          border: 2px solid #fff; box-shadow: 0 2px 8px rgba(30,48,84,0.3);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.15); box-shadow: 0 3px 12px rgba(30,48,84,0.4);
        }

        /* WORDMARKS */
        .wmark {
          font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500;
          color: rgba(26,39,68,0.52); white-space: nowrap;
          transition: color 0.25s, transform 0.25s; cursor: default;
          letter-spacing: 0.01em;
        }
        .wmark:hover { color: #1e3054; transform: translateY(-1px); }

        /* CLIENT ROWS (light bg version) */
        .crow {
          display: flex; align-items: center; gap: 20px;
          padding: 18px 0; border-bottom: 1px solid #e4eaf4;
          transition: padding-left 0.25s;
        }
        .crow:first-child { border-top: 1px solid #e4eaf4; }
        .crow:hover { padding-left: 10px; }
        .crow:hover .cnum { color: #4a6a9a; }

        /* HAMBURGER */
        .ham {
          background: none; border: none; cursor: pointer;
          display: flex; flex-direction: column; gap: 5px; padding: 8px 6px;
          -webkit-tap-highlight-color: transparent;
        }
        .ham-line {
          display: block; width: 22px; height: 1.5px;
          background: #1a2744; transition: all 0.28s; transform-origin: center;
        }
        .ham.open .ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .ham.open .ham-line:nth-child(2) { opacity: 0; }
        .ham.open .ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* MOBILE DRAWER */
        #drawer {
          position: fixed; inset: 68px 0 0; z-index: 99;
          background: rgba(240,242,246,0.98); backdrop-filter: blur(20px);
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 8px;
          opacity: 0; pointer-events: none; transform: translateY(-10px);
          transition: opacity 0.3s, transform 0.3s;
        }
        #drawer.open { opacity: 1; pointer-events: all; transform: translateY(0); }
        #drawer .nl {
          font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500;
          color: #1a2744; padding: 12px 0;
        }
      `}</style>

      <div id="pbar" style={{ width: `${prog * 100}%` }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 68, zIndex: 100,
        padding: `0 ${gutter}`,
        background: scrolled || menu ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled || menu ? "blur(16px)" : "none",
        borderBottom: scrolled || menu ? "1px solid #dce4f0" : "none",
        transition: "background 0.3s, border-color 0.3s",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: mw, margin: "0 auto" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mobile ? 16 : 19, fontWeight: 500,
              color: scrolled ? "#1e3054" : "#fff", lineHeight: 1.2, transition: "color 0.3s" }}>
              Aptly Intelligent <span style={{ color: scrolled ? "#4a6a9a" : "rgba(255,255,255,0.7)" }}>& Co.</span>
            </div>
            {!mobile && <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
              color: scrolled ? "#7a8fa8" : "rgba(255,255,255,0.5)", marginTop: 2, transition: "color 0.3s" }}>Jessica Ocasio Salters</div>}
          </div>

          {desktop && (
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {NAV.map(l => <button key={l.label} className={`nl${scrolled ? " scrolled" : ""}`} onClick={() => go(l.href)}>{l.label}</button>)}
            </div>
          )}

          {desktop
            ? <button onClick={() => go("#contact")} style={{
                padding: "10px 22px", fontSize: 12.5, fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.22s", border: "none",
                background: scrolled ? "#1e3054" : "rgba(255,255,255,0.15)",
                color: scrolled ? "#fff" : "#fff",
                backdropFilter: scrolled ? "none" : "blur(4px)",
                outline: scrolled ? "none" : "1.5px solid rgba(255,255,255,0.4)",
              }}>Discovery Form</button>
            : <button className={`ham ${menu ? "open" : ""}`} onClick={() => setMenu(m => !m)} aria-label="Menu">
                <span className="ham-line" /><span className="ham-line" /><span className="ham-line" />
              </button>
          }
        </div>
      </nav>

      <div id="drawer" className={menu ? "open" : ""}>
        {NAV.map(l => <button key={l.label} className="nl" onClick={() => go(l.href)}>{l.label}</button>)}
        <div style={{ marginTop: 20 }}>
          <button className="btn-primary" onClick={() => go("#contact")}>Start with the Discovery Form</button>
        </div>
      </div>

      {/* ══════════════════════
          HERO, Soft blue-tinted image
      ══════════════════════ */}
      <section style={{
        minHeight: "100svh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", padding: `0 ${gutter}`, paddingTop: 68,
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#141c30", overflow: "hidden" }}>
          {/* Portrait at natural aspect ratio — full person visible, no zoom */}
          <img src={IMG.hero} alt="" role="presentation"
            style={{
              position: "absolute",
              right: 0, top: 0,
              height: "100%",
              width: "auto",
              maxWidth: "none",
              display: "block",
              filter: "brightness(0.72) saturate(0.62)",
            }} />
          {/* Left-to-right overlay — text reads clearly, portrait shows naturally on right */}
          <div style={{ position: "absolute", inset: 0,
            background: desktop
              ? "linear-gradient(to right, rgba(20,28,50,0.97) 0%, rgba(20,28,50,0.92) 30%, rgba(20,28,50,0.65) 52%, rgba(20,28,50,0.18) 75%, rgba(20,28,50,0.05) 100%)"
              : tablet
              ? "linear-gradient(to right, rgba(20,28,50,0.96) 0%, rgba(20,28,50,0.7) 45%, rgba(20,28,50,0.2) 75%, rgba(20,28,50,0) 100%)"
              : "rgba(20,28,50,0.78)"
          }} />
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", margin: "0 auto",
          padding: mobile ? "80px 0" : "100px 0",
          maxWidth: desktop ? 680 : tablet ? 560 : "100%", overflowX: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 28, height: 1.5, background: "rgba(255,255,255,0.6)" }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
              Boutique Executive Operations
            </span>
          </div>

          <h1 className="disp" style={{
            fontSize: mobile ? "clamp(32px,10vw,46px)" : tablet ? "clamp(40px,6vw,56px)" : "clamp(44px,4.8vw,64px)",
            marginBottom: 22, color: "#fff", lineHeight: 1.1,
          }}>
            When everything<br />
            depends on you,<br />
            <span style={{ color: "rgba(255,255,255,0.75)" }}>growth slows.</span>
          </h1>

          <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.78, color: "rgba(255,255,255,0.82)", marginBottom: 22, maxWidth: 520 }}>
            Executive operations, project leadership, and strategic support for founders, attorneys, executives, investors, and growing businesses that need more capacity without adding a full-time hire.
          </p>

          <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 10 }}>
            {["Recover 10 to 20 hours each week","Reduce operational friction","Keep projects moving","Create executive leverage"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.65)", flexShrink: 0 }} />
                <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => go("#contact")} style={{ background: "rgba(255,255,255,0.95)", color: "#1e3054", width: mobile ? "100%" : "auto" }}>
              Start Your Executive Discovery Form
            </button>
            <button className="btn-ghost-white" onClick={() => window.open("https://www.linkedin.com/in/jessica-ocasio/", "_blank")} style={{ width: mobile ? "100%" : "auto" }}>
              Connect on LinkedIn
            </button>
          </div>

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["PMP Certified","MPA","GA Notary Public","15+ Years"].map(t => (
              <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>+</span>{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BANNER ── */}
      <section style={{ background: "#1e3054", padding: `12px ${gutter}`, textAlign: "center" }}>
        <p style={{ fontSize: mobile ? 12.5 : 13.5, color: "rgba(255,255,255,0.82)", letterSpacing: "0.04em", lineHeight: 1.6 }}>
          Trusted by leaders across media, healthcare, beauty, technology, finance, and emerging industries for more than 15 years.
        </p>
      </section>

      {/* ══════════════════════
          TRUSTED BY LEADERS — Company Cards + Metrics
      ══════════════════════ */}
      <section id="meet-jessica" style={{ background: "#fff", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            {/* Eyebrow + headline */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 18 }}>
                Experience
              </div>
              <h2 className="disp" style={{
                fontSize: mobile ? "clamp(30px,9vw,44px)" : "clamp(34px,4.2vw,58px)",
                color: "#1e3054", marginBottom: 24, lineHeight: 1.08, maxWidth: 780,
              }}>
                Trusted by Leaders Across Industries<br />
                <span style={{ color: "#4a6a9a" }}>for 15+ Years</span>
              </h2>
              <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.82, color: "#4e607a", maxWidth: 720, marginBottom: 0 }}>
                For more than 15 years, Jessica has supported executives, leadership teams, and fast-moving organizations across beauty, media, technology, finance, insurance, events, consulting, and emerging industries. Her work spans global brands, complex operations, strategic initiatives, and high-growth environments where execution matters.
              </p>
            </div>
          </Reveal>

          {/* Company cards */}
          <Reveal delay={60}>
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 16, marginTop: 36, marginBottom: 32,
            }}>
              {[
                {
                  org: "The Estée Lauder Companies",
                  badge: "Beauty & Luxury",
                  desc: "Supported global brands including MAC Cosmetics, La Mer, and Jo Malone across large-scale events, operational planning, executive support, and cross-functional coordination.",
                },
                {
                  org: "Paramount",
                  badge: "Media & Entertainment",
                  desc: "Supported creative and executive leadership teams across BET, VH1, and Nickelodeon while managing priorities, communications, and high-visibility initiatives.",
                },
                {
                  org: "Medidata AI",
                  badge: "Healthcare Technology",
                  desc: "Provided executive-level operational support within a global life sciences technology organization serving pharmaceutical and clinical research clients.",
                },
                {
                  org: "IBC Group",
                  badge: "Blockchain & Finance",
                  desc: "Led operational improvements including CRM migration, process development, investor communications, and executive operations within a fast-paced blockchain consulting firm.",
                },
              ].map((co, i) => (
                <div key={i} style={{
                  background: "#f8fafc", border: "1px solid #dce4f0",
                  padding: "28px 26px",
                  boxShadow: "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  display: "flex", flexDirection: "column", gap: 0,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 32px rgba(30,48,84,0.13), 0 2px 8px rgba(30,48,84,0.07), 0 0 0 1px rgba(74,106,154,0.18)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)";
                  }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 10 }}>{co.badge}</div>
                  <div className="disp" style={{ fontSize: mobile ? 17 : 19, fontWeight: 600, color: "#1e3054", marginBottom: 14, lineHeight: 1.2 }}>{co.org}</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.72, color: "#4e607a", flex: 1 }}>{co.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Impact metrics — large stat display */}
          <Reveal delay={90}>
            <div style={{
              borderTop: "1px solid #dce4f0",
              borderBottom: "1px solid #dce4f0",
              padding: mobile ? "28px 0" : "36px 0",
              marginBottom: 32,
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 32, textAlign: "center" }}>
                Impact Highlights
              </div>
              {/* Three big numeric stats */}
              <div style={{
                display: "grid",
                gridTemplateColumns: mobile ? "1fr 1fr 1fr" : "repeat(3, 1fr)",
                gap: 0,
                marginBottom: 32,
              }}>
                {[
                  { stat: "15+",     sub: "Years",        label: "Supporting Executives" },
                  { stat: "25+",     sub: "Global Events",label: "Across Luxury & Media Brands" },
                  { stat: "40,000+", sub: "Records",      label: "Cleaned & Migrated" },
                ].map((m, i) => (
                  <div key={i} style={{
                    padding: mobile ? "0 8px" : "0 40px",
                    borderLeft: i > 0 ? "1px solid #dce4f0" : "none",
                    textAlign: "center",
                  }}>
                    <div className="disp" style={{ fontSize: mobile ? "clamp(28px,8vw,46px)" : 52, color: "#1e3054", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 6 }}>{m.stat}</div>
                    <div style={{ fontSize: mobile ? 11 : 13, fontWeight: 600, color: "#4a6a9a", marginBottom: 4, letterSpacing: "0.03em", textTransform: "uppercase" }}>{m.sub}</div>
                    <div style={{ fontSize: mobile ? 11 : 12.5, color: "#7a8fa8", lineHeight: 1.4 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Three descriptor badges */}
              <div style={{
                borderTop: "1px solid #e8eef8",
                paddingTop: 20,
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}>
                {[
                  "Fortune 500 & Startup Experience",
                  "Cross-Functional Program Leadership",
                  "Global Brand & Growth Company Experience",
                ].map((item, i) => (
                  <span key={i} style={{
                    fontSize: 12.5, color: "#4a6a9a", fontWeight: 500,
                    background: "rgba(74,106,154,0.07)", border: "1px solid rgba(74,106,154,0.18)",
                    padding: "5px 14px", letterSpacing: "0.02em",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Expertise chips */}
          <Reveal delay={110}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 10px", marginBottom: 16 }}>
              {EXPERTISE.map((tag, i) => (
                <span key={i}
                  style={{
                    fontSize: 13, fontWeight: 500, color: "#1e3054",
                    background: "#f4f7fc", border: "1px solid #d0ddf0",
                    padding: "8px 18px", letterSpacing: "0.03em",
                    boxShadow: "0 1px 4px rgba(30,48,84,0.06)",
                    transition: "all 0.22s", cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#1e3054";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#1e3054";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(30,48,84,0.18)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#f4f7fc";
                    e.currentTarget.style.color = "#1e3054";
                    e.currentTarget.style.borderColor = "#d0ddf0";
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(30,48,84,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Experience includes strip */}
          <Reveal delay={120}>
            <div style={{ marginBottom: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,39,68,0.45)", textAlign: "center", marginBottom: 10 }}>
                Experience Includes
              </div>
              <div style={{
                background: "#1e3054",
                padding: mobile ? "20px 20px" : "22px 36px",
                display: "flex", flexWrap: "wrap", alignItems: "center",
                justifyContent: "center", gap: "8px 0",
                boxShadow: "0 4px 20px rgba(30,48,84,0.2)",
              }}>
                {["Paramount","BET","Nickelodeon","Medidata","Estée Lauder","MAC Cosmetics","Jo Malone","La Mer","IBC Group"].map((item, i, arr) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                    <span style={{
                      fontSize: mobile ? 12 : 13, color: "rgba(255,255,255,0.82)",
                      letterSpacing: "0.04em", padding: "0 16px",
                      borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
                      lineHeight: 1, fontWeight: 400,
                    }}>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          PORTFOLIO / IMPACT
      ══════════════════════ */}
      <section id="portfolio" style={{ background: "#fff", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>Selected Work</div>
            <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054", marginBottom: 14 }}>
              Operational Leadership in Practice
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.78, color: "#4e607a", maxWidth: 640, marginBottom: 48 }}>
              Examples of the operational leadership, executive support, and strategic coordination that help organizations move faster and leaders stay focused on what matters most.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {[
              {
                org: "IBC Group", type: "Investor Operations Infrastructure",
                title: "Investor Operations Infrastructure for High-Growth Web3 Firm",
                challenge: "40,000+ records spread across spreadsheets with limited visibility, inconsistent reporting, and growing operational complexity.",
                action: "Led migration to HubSpot, coordinated internal stakeholders and engineers, removed duplicate records, built reporting infrastructure, and created operational SOPs.",
                outcome: "21,000+ duplicate records eliminated, improved investor relationship visibility, increased reporting accuracy, and established scalable operational systems.",
                tags: ["HubSpot","Investor Ops","Web3","Systems","SOPs"]
              },
              {
                org: "MAC Cosmetics", type: "Global Artist Operations",
                title: "Global Artist Operations Across 45+ NYFW Productions",
                challenge: "Delivering consistent, high-quality backstage operations for MAC's Global Artists across 45 New York Fashion Week productions in one of fashion's most demanding environments.",
                action: "Owned artist coordination, backstage logistics, scheduling, and production support from pre-show preparation through live execution across every production.",
                outcome: "45+ productions executed without operational disruption. MAC's backstage standards upheld across every show, with seamless coordination between artists, models, and production teams.",
                tags: ["NYFW","Artist Coordination","Backstage Ops","Production","Events"]
              },
              {
                org: "BET Networks", type: "Executive & Campaign Operations",
                title: "Executive Support Across 50+ Productions and Campaigns",
                challenge: "Executive priorities, campaign timelines, and cross-functional deliverables moving simultaneously across creative, marketing, and production divisions with limited operational infrastructure.",
                action: "Embedded as executive support and central coordination partner, managing priorities, tracking deliverables, facilitating stakeholder communication, and driving follow-through across teams.",
                outcome: "Smoother execution across 50+ productions and campaigns, reduced coordination friction, stronger alignment between executive leadership and production teams, and improved on-time delivery.",
                tags: ["Executive Support","Campaign Ops","Stakeholder Management","Creative Ops"]
              },
              {
                org: "Medidata AI", type: "Enterprise Operations Infrastructure",
                title: "15+ Cross-Functional Initiatives",
                challenge: "Supporting complex enterprise-wide initiatives across HR, compliance, product, and leadership teams without a centralized operational framework.",
                action: "Supported onboarding, DEIB, career development, executive transitions, and operational improvements while partnering across multiple business functions.",
                outcome: "Improved cross-functional execution across 15+ initiatives, stronger stakeholder alignment, and operational improvements that scaled across the organization.",
                tags: ["Operations","Stakeholder Management","Process Improvement","Programs"]
              },
              {
                org: "The Estée Lauder Companies", type: "Global Brand Operations",
                title: "25+ Global Brand Initiatives",
                challenge: "Coordinating operational execution across multiple luxury beauty brands with global teams, tight timelines, and high-visibility stakeholder requirements.",
                action: "Managed launches, events, stakeholder communications, and cross-functional delivery across international brand teams.",
                outcome: "25+ global brand initiatives executed on time, with improved communication flow and cross-functional coordination across luxury brand portfolios.",
                tags: ["Global Operations","Brand Launches","Cross-Functional","Project Coordination"]
              },
              {
                org: "Aptly Intelligent & Co.", type: "Modern Executive Operations",
                title: "AI-Powered Workflow Systems",
                challenge: "Executives spending significant time on administrative tasks that could be automated, reducing capacity for strategic priorities.",
                action: "Designed and deployed AI-assisted inbox triage, automated meeting summaries, SOP generation, and custom workflow systems using Claude, ChatGPT, and n8n.",
                outcome: "Measurable time savings on routine tasks, more consistent follow-through, and operational infrastructure that scales with business growth.",
                tags: ["AI Tools","Executive Support","Workflow Systems","Operations"]
              },
              {
                org: "Executive Logistics & Operations", type: "Complex Scheduling & Travel",
                title: "Multi-Timezone Executive Support",
                challenge: "Senior leaders managing high-volume calendars, international travel, and shifting priorities across multiple time zones without consistent operational support.",
                action: "Provided comprehensive calendar management, travel coordination, stakeholder communications, meeting preparation, and priority management across time zones.",
                outcome: "Protected executive time, reduced scheduling conflicts, and ensured leaders arrived prepared for every commitment regardless of complexity or location.",
                tags: ["Executive Support","Travel","Calendars","Stakeholders"]
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ background: "#fff", border: "1px solid #dce4f0", padding: "28px 26px", height: "100%",
                  boxShadow: "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a6a9a"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(30,48,84,0.12), 0 4px 14px rgba(74,106,154,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#dce4f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)"; }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#4a6a9a", background: "rgba(74,106,154,0.08)", display: "inline-block", padding: "3px 9px", marginBottom: 7 }}>{p.type}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7a8fa8" }}>{p.org}</div>
                  </div>
                  <h3 style={{ fontSize: 16.5, fontWeight: 600, color: "#1e3054", marginBottom: 16, lineHeight: 1.3 }}>{p.title}</h3>
                  {[
                    { label: "Challenge", text: p.challenge },
                    { label: "Action",    text: p.action    },
                    { label: "Outcome",   text: p.outcome   },
                  ].map(({ label, text }) => text && (
                    <div key={label} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 4 }}>{label}</div>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: "#4e607a" }}>{text}</p>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 500, color: "#4a6a9a", background: "#eef3fb", padding: "3px 10px", letterSpacing: "0.06em" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          TESTIMONIALS
      ══════════════════════ */}
      <section style={{ background: "#fff", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>What Our Clients Say</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054" }}>Testimonials</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 14 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: "#fff", border: "1px solid #dce4f0", padding: "32px 28px", height: "100%",
                  display: "flex", flexDirection: "column",
                  boxShadow: "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a6a9a"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(30,48,84,0.12), 0 4px 14px rgba(74,106,154,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#dce4f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)"; }}>
                  <div className="disp" style={{ fontSize: 36, color: "#4a6a9a", lineHeight: 1, marginBottom: 16 }}>&#8220;</div>
                  <p style={{ fontSize: 15, lineHeight: 1.78, color: "#3a4e68", marginBottom: 24, flex: 1 }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eef3fb", border: "1px solid #dce4f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#4a6a9a" }}>{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1e3054" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#4a6a9a", marginTop: 2 }}>{t.title}</div>
                      <div style={{ fontSize: 11, color: "#7a8fa8", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 1 }}>{t.industry}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

          ABOUT / APPROACH
      ══════════════════════ */}
      <section id="about" style={{ background: "#1e3054", padding: `${pad} ${gutter}`, position: "relative", overflow: "hidden" }}>
        {/* Full-bleed office image — bottom portion, since top was used in hero */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.office} alt="" role="presentation"
            style={{ width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center bottom",
              filter: "brightness(0.38) saturate(0.55)", display: "block" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(22,30,52,0.55) 0%, rgba(22,30,52,0.35) 50%, rgba(22,30,52,0.65) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: mw, margin: "0 auto" }}>
          {/* Heading row — full width */}
          <Reveal>
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>The Approach</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,52px)", color: "#fff", maxWidth: 640 }}>
                Not task-based. Not hourly.
              </h2>
            </div>
          </Reveal>
          {/* Two-column body — evenly weighted */}
          <Reveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: desktop ? 72 : 48, alignItems: "flex-start",
              borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 44 }}>
              {/* Left — Approach copy */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontSize: 17, lineHeight: 1.82, color: "rgba(255,255,255,0.75)" }}>
                  Aptly Intelligent operates as an extension of executive authority, managing priorities, execution, and operational flow so leaders can focus on decisions, direction, and growth.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.78, color: "rgba(255,255,255,0.48)" }}>
                  Support is delivered intentionally, discreetly, and per executive direction.
                </p>
              </div>
              {/* Right — Unlocks */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>What This Unlocks</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {UNLOCKS.map((u, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0, marginTop: 8 }} />
                      <span style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.78)" }}>{u}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.32)", marginTop: 22, letterSpacing: "0.04em" }}>Delegation = more time for growth</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          ROI CALCULATOR
      ══════════════════════ */}
      <section style={{ background: "#1e3054", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>Your ROI</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#fff" }}>
                The Executive Leverage Calculator
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: mobile ? 24 : 32, alignItems: "stretch", maxWidth: 900, margin: "0 auto" }}>
              {/* Sliders */}
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", padding: "40px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
                {/* Hours slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Hours per week on admin</span>
                    <span style={{ fontSize: 22, fontWeight: 600, color: "#fff" }}>{calcHours}h</span>
                  </div>
                  <input type="range" min="2" max="30" value={calcHours} onChange={e => setCalcHours(+e.target.value)}
                    style={{ background: `linear-gradient(to right, #4a6a9a ${(calcHours-2)/28*100}%, rgba(255,255,255,0.15) ${(calcHours-2)/28*100}%)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>2 hrs</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>30 hrs</span>
                  </div>
                </div>
                {/* Rate slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Your executive hourly value</span>
                    <span style={{ fontSize: 22, fontWeight: 600, color: "#fff" }}>${calcRate}</span>
                  </div>
                  <input type="range" min="100" max="1500" step="50" value={calcRate} onChange={e => setCalcRate(+e.target.value)}
                    style={{ background: `linear-gradient(to right, #4a6a9a ${(calcRate-100)/1400*100}%, rgba(255,255,255,0.15) ${(calcRate-100)/1400*100}%)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>$100/hr</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>$1,500/hr</span>
                  </div>
                </div>
              </div>
              {/* Results */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", padding: "32px 32px", flex: 1, boxShadow: "0 3px 16px rgba(0,0,0,0.16)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Monthly cost of distraction</div>
                  <div className="disp" style={{ fontSize: 44, color: "#fff", letterSpacing: "-0.02em" }}>
                    {['$', monthlyCost.toLocaleString()].join('')}
                  </div>
                </div>
                <div style={{ background: "rgba(74,106,154,0.28)", border: "1px solid rgba(74,106,154,0.45)", padding: "32px 32px", flex: 1, boxShadow: "0 3px 16px rgba(0,0,0,0.16)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Annual cost of distraction</div>
                  <div className="disp" style={{ fontSize: 44, color: "#fff", letterSpacing: "-0.02em" }}>
                    {['$', annualCost.toLocaleString()].join('')}
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
                  Most founders underestimate the cost of fragmented execution.
                </p>
                <div style={{ textAlign: "center" }}>
                  <button className="btn-primary" onClick={() => go("#contact")} style={{ background: "#fff", color: "#1e3054" }}>
                    Run Your Leverage Review
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
      <section id="services" style={{ background: "#fff", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>Services</div>
            <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054", marginBottom: 14 }}>
              How Can I Help You
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4e607a", maxWidth: 500, marginBottom: 48 }}>
              Core operations plus boutique specialized services, all delivered with precision.
            </p>
          </Reveal>

          {/* Core 4 */}
          <Reveal delay={60}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,39,68,0.35)", marginBottom: 14 }}>Core Services</div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
            {SERVICES.filter(s => s.tag === "Core").slice(0, 4).map((s, i) => {
            const [cls, bg, fg] = [["c1","#dde8f7","#1a365d"],["c2","#d6e4f5","#2a4a8a"],["c3","#cfdff3","#2c5282"],["c4","#c8daf1","#2b6cb0"]][i];
            return (
              <Reveal key={s.no} delay={i * 55}>
                <div className={`svc-card ${cls}`} style={{ display: "flex", flexDirection: "column" }}>
                  <div className="num-badge" style={{ background: bg, color: fg }}>{s.no}</div>
                  <h3 className="disp" style={{ fontSize: 20, color: "#1e3054", marginBottom: 12, lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.72, color: "#4e607a", marginBottom: 0, flex: 1 }}>{s.line}</p>
                  <div style={{ borderTop: "1px solid #eef1f8", paddingTop: 16, marginTop: 18 }}>
                    {s.items.map(it => (
                      <div key={it} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 9 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4a6a9a", flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13.5, color: "#5a6f87", lineHeight: 1.55 }}>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
          </div>

          {/* AI card full-width */}
          {SERVICES.filter(s => s.tag === "Core").slice(4).map(s => (
            <Reveal key={s.no} delay={280} style={{ marginBottom: 14 }}>
              <div className="svc-card" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : desktop ? "1fr 1px 1fr 1px 1fr" : "1fr", gap: mobile ? 24 : 0 }}>
                <div style={{ padding: mobile ? 0 : "0 28px 0 0" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "#4a6a9a", marginBottom: 14 }}>{s.no}</div>
                  <h3 className="disp" style={{ fontSize: 24, color: "#1e3054", marginBottom: 12, lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "#4e607a" }}>{s.line}</p>
                </div>
                {!mobile && <div style={{ background: "#eef1f8" }} />}
                <div style={{ padding: mobile ? 0 : "0 28px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,39,68,0.3)", marginBottom: 14 }}>Capabilities</div>
                  {s.items.slice(0, 2).map(it => (
                    <div key={it} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4a6a9a", flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: "#5a6f87" }}>{it}</span>
                    </div>
                  ))}
                </div>
                {!mobile && <div style={{ background: "#eef1f8" }} />}
                <div style={{ padding: mobile ? 0 : "0 0 0 28px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,39,68,0.3)", marginBottom: 14 }}>
                    &nbsp;
                  </div>
                  {s.items.slice(2).map(it => (
                    <div key={it} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4a6a9a", flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: "#5a6f87" }}>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Specialized */}
          <Reveal delay={60}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,39,68,0.35)", marginBottom: 14, marginTop: 8 }}>Specialized Services</div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>
            {SERVICES.filter(s => s.tag === "Specialized").map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <div className="svc-card spec">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "#4a6a9a" }}>{s.no}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {s.geo && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a8fa8", background: "#eef1f8", padding: "3px 8px" }}>{s.geo}</span>}
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4a6a9a", background: "rgba(74,106,154,0.1)", padding: "3px 8px" }}>Specialized</span>
                    </div>
                  </div>
                  <h3 className="disp" style={{ fontSize: 24, color: "#1e3054", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "#4e607a", marginBottom: 20 }}>{s.line}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", borderTop: "1px solid #dce4f0", paddingTop: 16 }}>
                    {s.items.map(it => (
                      <div key={it} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4a6a9a", flexShrink: 0 }} />
                        <span style={{ fontSize: 13.5, color: "#5a6f87" }}>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKING IMAGE STRIP ── */}
      <section style={{ height: mobile ? 200 : 280, position: "relative", overflow: "hidden" }}>
        <img src={IMG.working} alt="" role="presentation"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%",
            filter: "brightness(0.85) saturate(0.7)", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(30,48,84,0.55)" }} />
        {!mobile && (
          <div style={{ position: "absolute", left: gutter, top: "50%", transform: "translateY(-50%)", maxWidth: 500 }}>
            <p className="disp" style={{ fontSize: "clamp(20px,2.8vw,32px)", color: "#fff", lineHeight: 1.4 }}>
              Delegation is the fastest path to growth.
            </p>
          </div>
        )}
      </section>

      {/* ══════════════════════
          PARTNERSHIPS / PRICING
      ══════════════════════ */}
      <section id="partnerships" style={{ background: "#f0f2f6", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>Flexible Plans</div>
            <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054", marginBottom: 14 }}>Partnership Engagements</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4e607a", maxWidth: 500, marginBottom: 48 }}>
              Strategic executive support, intentionally scoped.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4, 1fr)", gap: 14, marginBottom: 28, alignItems: "stretch" }}>
            {PLANS.map((p, i) => (
              <Reveal key={p.label} delay={i * 60} style={{ height: "100%" }}>
                <div className={`plan-card${p.popular ? " pop" : ""}`}>
                  {/* Row 1: Badge (or empty spacer for even alignment) */}
                  <div style={{ marginBottom: 12, minHeight: 26 }}>
                    {p.limited && (
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "#4a6a9a", background: "rgba(74,106,154,0.08)", padding: "4px 10px" }}>
                        Limited Availability
                      </span>
                    )}
                    {p.popular && (
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.12)", padding: "4px 10px" }}>
                        Most Popular
                      </span>
                    )}
                  </div>
                  {/* Row 2: Title + hours + price */}
                  <div style={{ marginBottom: 16 }}>
                    <h3 className="disp" style={{ fontSize: 24, color: p.popular ? "#fff" : "#1e3054", marginBottom: 6, lineHeight: 1.15 }}>{p.label}</h3>
                    <div style={{ fontSize: 13, color: p.popular ? "rgba(255,255,255,0.55)" : "#7a8fa8", marginBottom: 14, fontWeight: 500 }}>{p.hours}</div>
                    <div className="disp" style={{ fontSize: 30, color: p.popular ? "#fff" : "#1e3054", letterSpacing: "-0.02em" }}>{p.price}</div>
                  </div>
                  {/* Row 3: Divider + Best for */}
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: p.popular ? "rgba(255,255,255,0.65)" : "#4e607a",
                    borderTop: `1px solid ${p.popular ? "rgba(255,255,255,0.15)" : "#e8edf8"}`,
                    paddingTop: 14, marginBottom: 14 }}>
                    <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                      color: p.popular ? "rgba(255,255,255,0.5)" : "#7a8fa8", display: "block", marginBottom: 6 }}>Best for</span>
                    {p.best}
                  </div>
                  {/* Row 4: Spacer (flex fill) */}
                  <div />
                  {/* Row 5: Features — pinned to bottom via grid */}
                  <div style={{ borderTop: `1px solid ${p.popular ? "rgba(255,255,255,0.1)" : "#eef2fb"}`, paddingTop: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      {p.features.map((f, fi) => (
                        <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                          <span style={{ color: p.popular ? "rgba(255,255,255,0.6)" : "#4a6a9a", fontSize: 12, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>+</span>
                          <span style={{ fontSize: 13, lineHeight: 1.52, color: p.popular ? "rgba(255,255,255,0.72)" : "#4e607a" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ background: "#fff", border: "1px solid #dce4f0", padding: mobile ? "28px 22px" : "32px 36px", marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "12px 32px", marginBottom: 20 }}>
                {[
                  "Dedicated monthly capacity reserved for your business",
                  "Weekly executive touchpoint and priority alignment",
                  "Flexible support across business and personal operations",
                  "Limited client partnerships to ensure responsiveness",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#4a6a9a", fontSize: 15, flexShrink: 0, fontWeight: 600 }}>+</span>
                    <span style={{ fontSize: 14.5, color: "#2e3d54", lineHeight: 1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12.5, color: "#9aacbe", borderTop: "1px solid #edf1f8", paddingTop: 14 }}>
                Three-month minimum engagement. 50% deposit required to reserve capacity.
              </p>
            </div>
            <p style={{ fontSize: 13, color: "#7a8fa8", textAlign: "center", marginBottom: 24 }}>
              Capacity-based partnerships. Limited client slots.
            </p>
            <div style={{ textAlign: "center" }}>
              <button className="btn-primary" onClick={() => go("#contact")} style={{ width: mobile ? "100%" : "auto" }}>Book Your Plan Today</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
      <section id="sprints" style={{ background: "#f0f2f6", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>Additional Services</div>
            <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054", marginBottom: 14 }}>Focused Executive Sprints</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4e607a", maxWidth: 500, marginBottom: 44 }}>
              Time-bound, outcome-driven engagements for specific initiatives or transitions.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
            {SPRINTS.map((s, i) => (
              <Reveal key={s.title} delay={i * 55}>
                <div className="sprint-card">
                  <h3 className="disp" style={{ fontSize: 20, color: "#1e3054", marginBottom: 12, lineHeight: 1.25 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4e607a" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <div style={{ textAlign: "center" }}>
              <button className="btn-primary" onClick={() => go("#contact")} style={{ width: mobile ? "100%" : "auto" }}>Request a Sprint Conversation</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          WHO THIS IS FOR
      ══════════════════════ */}
      <section style={{ background: "#1e3054", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Fit Assessment</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#fff" }}>Who This Is For</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", padding: "36px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 22 }}>This is a strong fit if you:</div>
                {FIT_YES.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{ color: "#6b9ad4", fontSize: 14, marginTop: 1 }}>+</span>
                    <span style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.78)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "36px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 22 }}>This may not be a fit if you:</div>
                {FIT_NO.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginTop: 1 }}>-</span>
                    <span style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          SPRINTS
      ══════════════════════ */}
          HOW IT WORKS
      ══════════════════════ */}
      <section style={{ background: "#f0f2f6", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>The Process</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054", marginBottom: 10 }}>How It Works</h2>
              <p style={{ fontSize: 15, color: "#7a8fa8" }}>A clear, low-friction process.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4, 1fr)", gap: 14, alignItems: "stretch" }}>
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 60} style={{ height: "100%" }}>
                <div style={{
                  background: "#fff", border: "1px solid #dce4f0", padding: "32px 26px",
                  height: "100%", display: "flex", flexDirection: "column",
                  boxShadow: "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a6a9a"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(30,48,84,0.12), 0 4px 14px rgba(74,106,154,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#dce4f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(30,48,84,0.07), 0 1px 3px rgba(30,48,84,0.04)"; }}>
                  <div className="disp" style={{ fontSize: 38, color: "rgba(74,106,154,0.22)", marginBottom: 18, lineHeight: 1 }}>{p.step}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e3054", marginBottom: 12, lineHeight: 1.35 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.72, color: "#5a6f87", flex: 1 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          ABOUT / JESSICA
      ══════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: `${pad} ${gutter}` }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.office} alt="" role="presentation"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.7)", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(20,35,65,0.62)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: mw, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: desktop ? 80 : 44, alignItems: "center" }}>
            <Reveal>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>About Jessica</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#fff" }}>
                The person founders quietly rely on
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {["There is a particular kind of overwhelm that arrives with growth. The systems that worked six months ago stop working. Priorities pile up. Important things start slipping.",
                   "For more than fifteen years I have helped founders and executives move from that overwhelm to a place of clarity, structure, and real momentum.",
                   "What I love most is the trust. Being the person a leader can hand the hard, unglamorous, important things to, knowing they will get done."].map((p, i) => (
                  <p key={i} style={{ fontSize: mobile ? 15 : 16.5, lineHeight: 1.88, color: i === 2 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.62)" }}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          FAQ
      ══════════════════════ */}
      <section id="faq" style={{ background: "#fff", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a6a9a", marginBottom: 14 }}>Common Questions</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,48px)", color: "#1e3054" }}>FAQ</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" tabIndex={0} role="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} onKeyDown={e => e.key === "Enter" && setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 16px", minHeight: 56 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 500, color: "#1e3054", paddingRight: 16 }}>{f.q}</span>
                  <span style={{ fontSize: 20, color: "#4a6a9a", flexShrink: 0, fontWeight: 300, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.25s" }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 16px 20px", fontSize: 15, lineHeight: 1.78, color: "#4e607a" }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════
          DISCOVERY FORM
      ══════════════════════ */}
      <section id="contact" style={{ background: "#1e3054", padding: `${pad} ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: formSent ? "1fr" : desktop ? "360px 1fr" : "1fr", gap: desktop ? 80 : 48, alignItems: "start" }}>

            {/* Left, Contact info — hidden after submit */}
            {!formSent && <Reveal>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Executive Discovery Form™</div>
              <h2 className="disp" style={{ fontSize: mobile ? "clamp(26px,8vw,38px)" : "clamp(30px,3.6vw,46px)", color: "#fff", marginBottom: 20 }}>
                The First Step Toward Operational Clarity
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.78, color: "rgba(255,255,255,0.62)", marginBottom: 16 }}>
                The Executive Discovery Form is designed to identify operational bottlenecks, leadership capacity constraints, project challenges, and support opportunities.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.48)", marginBottom: 32 }}>
                This is not a generic contact form. It is the first step in determining whether Aptly Intelligent & Co. is the right operational partner for your organization.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["Remote, US Based","By appointment only"],["jessica@aptlyintelligent.com","M-F 9am to 6pm EST"]].map(([a,b], i) => (
                  <div key={i}>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{a}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{b}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>+</span> Response time: Within 24 hours
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>+</span> Partnerships are selective and capacity-limited
                </span>
              </div>
            </Reveal>}

            {/* Right, Form */}
            <Reveal delay={80}>
              {formSent ? (
                <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: mobile ? "48px 24px" : "72px 48px" }}>
                  {/* Checkmark circle */}
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 28px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14L11 20L23 8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
                    Executive Discovery Form™
                  </div>
                  <h3 className="disp" style={{ fontSize: mobile ? 32 : 42, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
                    Thank You
                  </h3>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, marginBottom: 12, maxWidth: 480, margin: "0 auto 12px" }}>
                    Your Executive Discovery Form has been received.
                  </p>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: 440, margin: "0 auto 36px" }}>
                    I will review your submission and follow up within 24 hours with next steps.
                  </p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Submissions are reviewed personally","Capacity is selective and limited","You will hear back within 24 hours"].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", padding: mobile ? "28px 20px" : "36px 36px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>Full Name *</label>
                      <input className="form-input" placeholder="Your full name" value={form.name} onChange={e => setField("name", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} />
                    </div>
                    <div>
                      <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>Email *</label>
                      <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setField("email", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} />
                    </div>
                    <div>
                      <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>Role / Title *</label>
                      <input className="form-input" placeholder="CEO, Founder, VP..." value={form.role} onChange={e => setField("role", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} />
                    </div>
                    <div>
                      <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>Company</label>
                      <input className="form-input" placeholder="Your company" value={form.company} onChange={e => setField("company", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>Primary Need *</label>
                    <select className="form-input" value={form.need} onChange={e => setField("need", e.target.value)}
                      style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: form.need ? "#fff" : "rgba(255,255,255,0.4)" }}>
                      <option value="" style={{ color: "#1a2744" }}>Select your primary need</option>
                      <option value="partnership" style={{ color: "#1a2744" }}>Executive Partnership</option>
                      <option value="sprint" style={{ color: "#1a2744" }}>Focused Sprint</option>
                      <option value="notsure" style={{ color: "#1a2744" }}>Not sure yet</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>What's creating the most friction right now? *</label>
                    <textarea className="form-input" rows={4} placeholder="Describe the challenges you're facing..."
                      value={form.friction} onChange={e => setField("friction", e.target.value)}
                      style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff", resize: "vertical" }} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>What would "successful support" look like in 90 days? *</label>
                    <textarea className="form-input" rows={3} placeholder="Describe your ideal outcome..."
                      value={form.outcome} onChange={e => setField("outcome", e.target.value)}
                      style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#fff", resize: "vertical" }} />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label className="form-label" style={{ color: "rgba(255,255,255,0.55)" }}>Preferred Start Timeline *</label>
                    <select className="form-input" value={form.timeline} onChange={e => setField("timeline", e.target.value)}
                      style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: form.timeline ? "#fff" : "rgba(255,255,255,0.4)" }}>
                      <option value="" style={{ color: "#1a2744" }}>Select a timeline</option>
                      <option value="asap" style={{ color: "#1a2744" }}>ASAP</option>
                      <option value="2-4weeks" style={{ color: "#1a2744" }}>2 to 4 weeks</option>
                      <option value="30plus" style={{ color: "#1a2744" }}>30 or more days</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
                    <input type="checkbox" checked={form.agreed} onChange={e => setField("agreed", e.target.checked)}
                      style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, accentColor: "#4a6a9a" }} />
                    <label style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}
                      onClick={() => setField("agreed", !form.agreed)}>
                      I understand Aptly Intelligent reviews submissions before sharing a call link.
                    </label>
                  </div>
                  <button className="btn-primary" onClick={async () => {
                    if (form.name && form.email && form.role && form.need && form.friction && form.outcome && form.timeline && form.agreed) {
                      /* EmailJS notification — configure at emailjs.com:
                         1. Create a free account at https://www.emailjs.com
                         2. Add an Email Service (Gmail works)
                         3. Create a template with variables below
                         4. Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY below */
                      try {
                        // Email 1: Notify Jessica
                        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            service_id:  "service_7kcjwje",
                            template_id: "template_kjtf6y8",
                            user_id:     "g9WvBYx_reVuFI72j",
                            template_params: {
                              to_email:   "jessica@aptlyintelligent.com",
                              from_name:  form.name,
                              from_email: form.email,
                              role:       form.role,
                              company:    form.company || "Not provided",
                              need:       form.need,
                              friction:   form.friction,
                              outcome:    form.outcome,
                              timeline:   form.timeline,
                              subject:    `New Discovery Form - ${form.name} (${form.role})`,
                            }
                          })
                        });
                        // Email 2: Auto-reply to submitter
                        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            service_id:  "service_7kcjwje",
                            template_id: "template_kjtf6y8",
                            user_id:     "g9WvBYx_reVuFI72j",
                            template_params: {
                              to_email:   form.email,
                              from_name:  "Jessica Ocasio-Salters",
                              from_email: "jessica@aptlyintelligent.com",
                              role:       form.role,
                              company:    form.company || "",
                              need:       "",
                              friction:   "",
                              outcome:    "",
                              timeline:   "",
                              subject:    `Your Executive Discovery Form — Aptly Intelligent & Co.`,
                              message:    `Hi ${form.name},

Thank you for submitting your Executive Discovery Form.

I have received your submission and will review it personally. You can expect to hear from me within 24 hours with next steps.

I look forward to learning more about your work.

Warm regards,
Jessica Ocasio-Salters
Aptly Intelligent & Co.
jessica@aptlyintelligent.com`,
                            }
                          })
                        });
                      } catch (e) {
                        console.warn("Email send failed:", e);
                      }
                      setFormSent(true);
                    }
                  }}
                    style={{ width: "100%", background: "rgba(255,255,255,0.95)", color: "#1e3054", justifyContent: "center" }}>
                    Submit Your Executive Discovery Form
                  </button>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#141e36", borderTop: "1px solid rgba(255,255,255,0.06)", padding: `22px ${gutter}` }}>
        <div style={{ maxWidth: mw, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Aptly Intelligent and Co.</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 2 }}>Jessica Ocasio Salters, Principal</div>
          </div>
          {!mobile && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>Executive Operations · Notary · Digital Solutions</span>}
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)" }}>{new Date().getFullYear()}</span>
        </div>
      </footer>

    </div>
  );
}
