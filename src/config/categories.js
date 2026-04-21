const categories = [
  {
    slug: "sales",
    label: "Sales",
    icon: "💼",
    color: "bg-blue-100 text-blue-700",
    description:
      "AI-powered sales tools help small businesses find prospects, automate outreach, and close more deals without a large sales team. From CRM to cold email coaching, these tools give SMBs a competitive edge.",
    faqs: [
      {
        q: "What is the best free CRM for small businesses?",
        a: "HubSpot CRM offers a generous free tier with AI email sequences, deal pipelines and contact management — ideal for teams under 10.",
      },
      {
        q: "How can AI improve my sales outreach?",
        a: "Tools like Apollo.io and Lavender use AI to identify high-intent prospects, personalise messages and score emails before you send them, dramatically improving reply rates.",
      },
      {
        q: "Do I need a dedicated SDR to use these tools?",
        a: "No. Many SMB sales tools are designed for founder-led or SDR-light teams. Apollo.io and Lavender work well as a solo operation.",
      },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    icon: "📣",
    color: "bg-pink-100 text-pink-700",
    description:
      "AI marketing tools let small businesses produce agency-quality content, ads and campaigns at a fraction of the cost. Whether you need blog posts, social copy or on-brand designs, these tools have you covered.",
    faqs: [
      {
        q: "Can AI replace a marketing agency for my small business?",
        a: "AI tools like Jasper and Canva AI can handle a significant portion of content creation, but strategy and brand positioning still benefit from human judgement.",
      },
      {
        q: "Which AI writing tool is best for a solo founder?",
        a: "Copy.ai is popular with solo founders for its workflow templates and affordable pricing. Jasper suits growing teams who need brand voice consistency.",
      },
      {
        q: "Is Canva AI worth it for a small business with no designer?",
        a: "Absolutely. Canva AI's magic tools let you create professional social media graphics, presentations and print materials without any design training.",
      },
    ],
  },
  {
    slug: "finance",
    label: "Finance",
    icon: "💰",
    color: "bg-green-100 text-green-700",
    description:
      "AI finance tools automate bookkeeping, invoicing, expense capture and cash flow forecasting so small business owners can focus on growth instead of spreadsheets.",
    faqs: [
      {
        q: "What is the best accounting software for a small business?",
        a: "QuickBooks and Xero are the two market leaders. QuickBooks is more popular in the US; Xero has a strong following in the UK, Australia and New Zealand.",
      },
      {
        q: "Is there a free accounting tool for freelancers?",
        a: "FreshBooks has a free trial and affordable plans for freelancers. Wave Accounting also offers a free tier for very early-stage businesses.",
      },
      {
        q: "How does AI help with expense management?",
        a: "Tools like Dext let you photograph receipts on your phone, and AI automatically categorises and codes them to the right account — saving hours of manual data entry.",
      },
    ],
  },
  {
    slug: "operations",
    label: "Operations",
    icon: "⚙️",
    color: "bg-orange-100 text-orange-700",
    description:
      "Operational AI tools help small teams stay organised, run better meetings, manage projects and reclaim time through smart scheduling and automation.",
    faqs: [
      {
        q: "What is the best project management tool for a small team?",
        a: "Notion AI and ClickUp AI are both excellent choices. Notion is more flexible for knowledge management; ClickUp is more structured for task and project tracking.",
      },
      {
        q: "Can AI help me run better meetings?",
        a: "Yes. Fireflies.ai and Fathom AI automatically transcribe meetings, extract action items and send follow-up summaries so nothing falls through the cracks.",
      },
      {
        q: "How can I reclaim time as a small business owner?",
        a: "Reclaim.ai analyses your calendar and automatically blocks focus time, protects your lunch break and rescheduled low-priority meetings intelligently.",
      },
    ],
  },
  {
    slug: "hr",
    label: "HR",
    icon: "👥",
    color: "bg-purple-100 text-purple-700",
    description:
      "HR tools for SMBs handle global payroll, contractor management, onboarding and compliance — letting small teams hire globally without an in-house HR department.",
    faqs: [
      {
        q: "How can a small business hire international employees?",
        a: "Deel and Oyster HR act as Employer of Record (EOR) in 150+ countries, handling local payroll, taxes and compliance on your behalf.",
      },
      {
        q: "What HR software is best for a team of 5–50?",
        a: "BambooHR is purpose-built for small and medium businesses with features for onboarding, PTO tracking, performance reviews and employee records.",
      },
      {
        q: "Is Deel or Oyster better for a bootstrapped startup?",
        a: "Both are competitive. Deel tends to have more payment options; Oyster has a strong focus on benefits and employee experience for remote teams.",
      },
    ],
  },
  {
    slug: "customer-support",
    label: "Customer Support",
    icon: "💬",
    color: "bg-cyan-100 text-cyan-700",
    description:
      "AI customer support tools let small businesses offer 24/7 chat, automated triage and a professional help centre experience without a large support team.",
    faqs: [
      {
        q: "What is the best live chat tool for a small business website?",
        a: "Tidio and Crisp are both excellent choices for SMBs. Tidio has a generous free tier and strong AI chatbot capabilities; Crisp is great for teams that need a shared inbox.",
      },
      {
        q: "Can I afford Zendesk as a small business?",
        a: "Zendesk offers SMB-focused plans. For very small teams, Tidio or Crisp may offer better value, but Zendesk scales well if you anticipate high ticket volume.",
      },
      {
        q: "Can an AI chatbot handle customer support on its own?",
        a: "AI chatbots handle 60–80% of common queries automatically. For complex issues, they can seamlessly hand off to a human agent.",
      },
    ],
  },
  {
    slug: "automation",
    label: "Automation",
    icon: "🔄",
    color: "bg-indigo-100 text-indigo-700",
    description:
      "No-code automation platforms let small businesses connect their apps, eliminate repetitive tasks and build custom workflows — no developer required.",
    faqs: [
      {
        q: "What is the best automation tool for a small business?",
        a: "Zapier is the most widely used with 6,000+ integrations. Make (formerly Integromat) offers more complex logic. Pabbly Connect is a budget-friendly alternative with one-time pricing.",
      },
      {
        q: "Is Zapier worth the cost for a small business?",
        a: "For most SMBs, yes. The time saved on repetitive tasks quickly outweighs the subscription cost. The free tier is a good starting point.",
      },
      {
        q: "What can I automate with these tools?",
        a: "Common automations include: new lead → CRM entry, form submission → email notification, invoice paid → Slack alert, new review → spreadsheet log.",
      },
    ],
  },
  {
    slug: "design",
    label: "Design",
    icon: "🎨",
    color: "bg-rose-100 text-rose-700",
    description:
      "AI design tools help small businesses create professional logos, social graphics, presentations and branded content without hiring a designer.",
    faqs: [
      {
        q: "What is the best AI design tool for a small business?",
        a: "Canva AI is the most versatile for day-to-day content. Adobe Express is strong for quick social media assets. Looka specialises in AI logo and brand identity creation.",
      },
      {
        q: "Can I create a professional logo with AI?",
        a: "Yes. Looka generates high-quality logos and complete brand kits based on your industry, style preferences and colour choices.",
      },
      {
        q: "Are AI design tools good enough to replace a graphic designer?",
        a: "For standard business collateral and social content, AI tools are excellent. For complex bespoke branding or print work, a human designer still adds significant value.",
      },
    ],
  },
  {
    slug: "analytics",
    label: "Analytics",
    icon: "📊",
    color: "bg-teal-100 text-teal-700",
    description:
      "Analytics tools give small businesses clear visibility into website traffic, user behaviour and business performance — without needing a data team.",
    faqs: [
      {
        q: "What analytics tool is best for a small business website?",
        a: "Plausible is ideal for businesses that prioritise privacy and simplicity. Google Analytics / Looker Studio offers more depth for free.",
      },
      {
        q: "Is Google Analytics free?",
        a: "Yes. Looker Studio (formerly Google Data Studio) is completely free and connects to Google Analytics, Sheets and many other data sources.",
      },
      {
        q: "What is the difference between Plausible and Google Analytics?",
        a: "Plausible is privacy-first, GDPR-compliant with no cookies required. Google Analytics is more feature-rich but requires consent management. Plausible is easier to set up and read.",
      },
    ],
  },
  {
    slug: "legal",
    label: "Legal",
    icon: "⚖️",
    color: "bg-slate-100 text-slate-700",
    description:
      "AI legal tools make contracts, compliance and business formation accessible and affordable for small businesses without expensive law firm retainers.",
    faqs: [
      {
        q: "How can a small business handle legal contracts affordably?",
        a: "DocuSign handles e-signatures; LegalZoom handles document creation; SeedLegals specialises in startup-specific agreements like employment contracts and funding rounds.",
      },
      {
        q: "Is LegalZoom safe for small business formation?",
        a: "Yes, LegalZoom is widely used for LLC formation, incorporation and basic legal documents. For complex matters, consult a qualified attorney.",
      },
      {
        q: "What is SeedLegals best for?",
        a: "SeedLegals is specifically designed for startups — it excels at funding round documents, SAFE agreements, EMI option schemes and employment contracts.",
      },
    ],
  },
  {
    slug: "content",
    label: "Content",
    icon: "✍️",
    color: "bg-amber-100 text-amber-700",
    description:
      "AI content tools help small businesses produce SEO-optimised articles, well-edited copy and data-driven content strategies that rank and convert.",
    faqs: [
      {
        q: "What is the best AI tool for writing SEO blog posts?",
        a: "Surfer SEO combined with Writesonic or Jasper gives you AI writing with real-time SEO optimisation. Surfer tells you exactly what to write to rank.",
      },
      {
        q: "Is Grammarly Business worth it for a small team?",
        a: "Yes, especially if multiple people create content. Grammarly Business adds brand tone guidelines, style enforcement and team analytics on top of the standard editor.",
      },
      {
        q: "Can AI content tools help me rank on Google?",
        a: "AI tools can produce well-structured content, but ranking requires quality, backlinks and topical authority. Surfer SEO provides the best data-driven content briefs for Google ranking.",
      },
    ],
  },
  {
    slug: "it-tech",
    label: "IT & Tech",
    icon: "💻",
    color: "bg-violet-100 text-violet-700",
    description:
      "The best AI and no-code tech tools for small businesses. Build, manage and scale your tech stack without a dedicated IT department.",
    faqs: [
      {
        q: "Can a small business build software without a developer?",
        a: "Yes. No-code tools like Bubble, Webflow and Airtable let non-technical founders build apps, websites and internal tools without writing code. AI tools like Lovable and Base44 go even further — describe what you want and the AI builds it.",
      },
      {
        q: "What is the best hosting platform for a small business?",
        a: "Vercel is the easiest for web apps and static sites. Railway is great for apps that need a database. Cloudflare handles DNS, security and CDN for any site automatically.",
      },
      {
        q: "Do I need GitHub if I'm not a developer?",
        a: "If anyone on your team writes code — even occasionally — GitHub is essential for version control and collaboration. Many no-code tools also integrate with GitHub for deployment workflows.",
      },
    ],
  },
];

export default categories;
