import { useState } from "react";

const S = ({ n, title, sub, children }) => (
  <div style={{ marginBottom: 72, scrollMarginTop: 40 }}>
    <div style={{ marginBottom: 24 }}>
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, fontWeight: 500, color: "#7A8B5C", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
        {String(n).padStart(2, "0")}
      </span>
      <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A", margin: 0, lineHeight: 1.3, letterSpacing: -0.3 }}>
        {title}
      </h2>
      {sub && <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#999", margin: "6px 0 0", fontWeight: 400 }}>{sub}</p>}
    </div>
    {children}
  </div>
);

const T = ({ children, s }) => (
  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14, lineHeight: 1.8, color: "#4A4A4A", margin: "0 0 14px", maxWidth: 640, fontWeight: 400, ...s }}>{children}</p>
);

const Note = ({ children, type }) => (
  <div style={{
    borderLeft: `3px solid ${type === "warn" ? "#D4A843" : type === "good" ? "#7A8B5C" : "#C4C4C4"}`,
    padding: "14px 18px", margin: "18px 0",
    background: type === "warn" ? "#FFFBF0" : type === "good" ? "#F6F8F2" : "#F8F8F8",
    borderRadius: "0 8px 8px 0", maxWidth: 640
  }}>
    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, lineHeight: 1.7, color: "#3A3A3A", margin: 0 }}>{children}</p>
  </div>
);

const Pill = ({ children, on }) => (
  <span style={{
    display: "inline-block", padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600,
    fontFamily: "Montserrat, sans-serif", letterSpacing: 0.5,
    border: on ? "1.5px solid #7A8B5C" : "1px solid #D9D9D9",
    color: on ? "#4A6030" : "#999", background: on ? "#EFF3E8" : "transparent",
    marginRight: 6, marginBottom: 6
  }}>{children}</span>
);

const Dot = ({ color, size }) => (
  <div style={{ width: size || 8, height: size || 8, borderRadius: "50%", background: color || "#7A8B5C", flexShrink: 0, marginTop: size ? 0 : 6 }} />
);

const FlowStep = ({ n, title, desc, last }) => (
  <div>
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #7A8B5C", display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700,
        fontFamily: "Montserrat, sans-serif", color: "#4A6030", background: "#F6F8F2", flexShrink: 0
      }}>{n}</div>
      <div>
        <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 13, fontWeight: 700, color: "#1A1A1A", marginBottom: 3 }}>{title}</div>
        <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#777", lineHeight: 1.65, maxWidth: 560 }}>{desc}</div>
      </div>
    </div>
    {!last && <div style={{ width: 1, height: 16, background: "#D9D9D9", marginLeft: 14 }} />}
  </div>
);

const ChCard = ({ name, tag, why, what, timeline }) => (
  <div style={{
    border: "1px solid #E6E6E6", borderRadius: 10, padding: "18px 20px", marginBottom: 14,
    maxWidth: 640, background: tag === "now" ? "#FAFCF6" : "#FFF"
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>{name}</span>
      <Pill on={tag === "now"}>{tag === "now" ? "priority" : tag === "m2" ? "month 2-3" : "month 4+"}</Pill>
    </div>
    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#666", lineHeight: 1.65, marginBottom: 6 }}>
      <span style={{ color: "#4A6030", fontWeight: 600 }}>Why — </span>{why}
    </div>
    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#666", lineHeight: 1.65, marginBottom: 6 }}>
      <span style={{ color: "#4A6030", fontWeight: 600 }}>What to do — </span>{what}
    </div>
    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#666", lineHeight: 1.65 }}>
      <span style={{ color: "#4A6030", fontWeight: 600 }}>Timeline — </span>{timeline}
    </div>
  </div>
);

const Metric = ({ num, label }) => (
  <div style={{ textAlign: "center", flex: 1, minWidth: 100, padding: "16px 0" }}>
    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 26, fontWeight: 800, color: "#1A1A1A", letterSpacing: -1 }}>{num}</div>
    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: 10, color: "#999", fontWeight: 500, marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
  </div>
);

export default function Strategy() {
  const [month, setMonth] = useState(0);

  const roadmap = [
    { label: "Month 1", title: "Foundation and audit", items: [
      "Talk to 10-15 existing customers. Understand why they bought, what convinced them, how they describe Magenta to others. This language becomes your copy.",
      "Audit website analytics. Where is traffic coming from, what pages get attention, where do visitors drop off before booking a demo.",
      "Set up proper tracking. GA4 events on every CTA, UTM parameters on all outbound links, conversion tracking on the demo form.",
      "Rebuild the demo booking flow. Replace the 3-step form with a single step: name, email, phone. Qualify on the sales call, not the form.",
      "Rewrite the homepage hero. Lead with the buyer's problem, not the product's features. Test two versions.",
      "Set up CRM hygiene and email infrastructure (deliverability, domain warm-up if needed).",
      "Audit and document the current sales process. Understand what happens after a lead comes in. Map the handoff."
    ]},
    { label: "Month 2", title: "First campaigns live", items: [
      "Launch LinkedIn content from Vikas's personal profile. 3x per week. Mix of industry insights, customer stories, and product thinking. Personal voice, not brand voice.",
      "Start targeted LinkedIn outreach to ICP profiles. Connection request with context, then value-first DM sequence. No hard sell on first touch.",
      "Build the first email nurture sequence. 5-7 emails over 3 weeks. Pain point, peer proof, product walkthrough, case study, soft demo CTA.",
      "Publish 2 rebuilt case studies with specific before/after outcomes (Supertron's 21% sales increase, Kansuee's 80% data-driven decisions).",
      "Create 2 industry-specific landing pages (IT/electronics distribution + FMCG). Same product, different framing and language.",
      "Set up lead scoring. Fit score (company size, industry, ERP used) + behavior score (email opens, page visits, demo page views)."
    ]},
    { label: "Month 3-4", title: "Optimize what works", items: [
      "Review data from first 60 days. Which content drove demo bookings? Which outreach messages got replies? Which emails got clicks? Double down on what works.",
      "Launch partner outreach. Identify 20-30 CAs and Tally consultants in Gujarat. Offer referral structure or co-branded webinars.",
      "Start monthly webinar or live demo series. One per industry vertical. Promote through LinkedIn and email. Record and repurpose.",
      "Begin SEO groundwork. Publish content targeting pain-point keywords: 'how to track salesperson performance,' 'Tally reporting problems,' 'distribution analytics.'",
      "Build comparison and alternative pages. Magenta vs Excel, Magenta vs Power BI, Magenta vs manual MIS.",
      "Improve nurture sequences based on drop-off data. Where are people going cold? Add more relevant touchpoints at those gaps."
    ]},
    { label: "Month 5-6", title: "Predictable system", items: [
      "By now, 2-3 channels should be producing consistent demo bookings. If not, diagnose why and restructure.",
      "The nurture system should be converting cold leads into warm demos. Measure the lag time and optimize for shorter cycles.",
      "Sales and marketing handoff should be clean. Sales knows what marketing promised, marketing knows what sales needs.",
      "Monthly review cadence is established. Metrics reviewed, experiments planned, budget allocated based on performance.",
      "Test one new channel. Industry events, WhatsApp outreach, Google Ads on high-intent keywords. Small bets, measured results.",
      "Document everything. Playbooks for each channel, templates for content, SOPs for lead handling. The system shouldn't depend on memory."
    ]}
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#FCFBF8", padding: "0 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 680, margin: "0 auto", paddingTop: 56, paddingBottom: 36, borderBottom: "1px solid #E6E6E6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7A8B5C" }} />
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 11, fontWeight: 600, color: "#7A8B5C", letterSpacing: 2, textTransform: "uppercase" }}>Marketing strategy</span>
        </div>
        <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 32, fontWeight: 800, color: "#1A1A1A", margin: "0 0 10px", lineHeight: 1.2, letterSpacing: -0.5 }}>Magenta Insights</h1>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 14, color: "#777", margin: "0 0 20px", lineHeight: 1.6, maxWidth: 540 }}>
          A practical 6-month plan to build a predictable demand generation engine — from zero to system.
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Pill>B2B SaaS</Pill><Pill>ERP analytics</Pill><Pill>SME distribution</Pill><Pill>founder-led</Pill>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", paddingTop: 48 }}>

        <S n={1} title="Where things stand" sub="Current state of Magenta's marketing">
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap", margin: "20px 0 24px", borderRadius: 10, overflow: "hidden", border: "1px solid #E6E6E6", maxWidth: 640 }}>
            <Metric num="500+" label="companies" /><Metric num="3,000+" label="users" /><Metric num="₹36K" label="starting price/yr" /><Metric num="4" label="case studies" />
          </div>
          <T>The product is strong. Real customers across trading, distribution, and manufacturing. Case studies with measurable outcomes — Supertron Electronics saw 21% sales increase and 17% faster payment realization, April3rd Foods grew sales by 19% and expanded from Karnataka to PAN India, Kansuee Stationery moved to 80% data-driven decisions with 2x team efficiency.</T>
          <T>But the marketing infrastructure is nearly non-existent. There is no dedicated marketing function, no funnel, no consistent lead generation system. The website positions features before pain. The demo form has three steps that create unnecessary friction. Only one industry has a visible case study path. Social proof claims on the homepage are unverified. Product screenshots break on mobile.</T>
          <Note type="good">The product has outgrown the marketing. That's a good problem. The job is not to fix a broken product — it's to build the engine that takes a proven product to market properly.</Note>
        </S>

        <S n={2} title="The real competition" sub="It's not another BI tool">
          <T>There are BI tools in the market — WovV, intelligence360, Merito, and larger players like Zoho Analytics and Power BI. But the actual competitor is not a software product.</T>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, margin: "28px 0", flexWrap: "wrap" }}>
            <div style={{ padding: "14px 22px", border: "1px solid #D9D9D9", borderRadius: 24, fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#999" }}>Other BI tools</div>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12, color: "#CCC", fontWeight: 600 }}>vs</span>
            <div style={{ padding: "14px 22px", border: "2px solid #7A8B5C", borderRadius: 24, fontFamily: "Montserrat, sans-serif", fontSize: 13, color: "#4A6030", fontWeight: 700, background: "#EFF3E8", position: "relative" }}>
              Excel + manual MIS
              <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 600, color: "#7A8B5C", letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>real competitor</div>
            </div>
          </div>
          <T>The buyer isn't comparing Magenta with WovV. They're comparing it with their current process — the MIS person pulling data from Tally, pasting it into Excel, and sending a report on WhatsApp at 6pm that the owner reads over dinner. That is what Magenta replaces.</T>
          <T>Every piece of marketing should be framed around this. Not "why Magenta is the best BI tool" but "why your current reporting process is costing you money, time, and missed opportunities."</T>
        </S>

        <S n={3} title="Who we are talking to" sub="The buying circle for Magenta">
          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
            <svg width="260" height="260" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="90" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              {[{l:"Decides",x:130,y:30},{l:"Influences",x:230,y:130},{l:"Uses",x:130,y:230},{l:"Blocks",x:30,y:130}].map((p,i)=>(
                <g key={i}><circle cx={p.x} cy={p.y} r={7} fill="#3A5A1C" />
                <text x={p.x} y={p.y+(p.y<80?-16:p.y>180?22:0)} dx={p.x>180?16:p.x<80?-16:0} textAnchor={p.x>180?"start":p.x<80?"end":"middle"} fill="#1A1A1A" fontSize="12" fontFamily="Montserrat, sans-serif" fontWeight="600">{p.l}</text></g>
              ))}
              <circle cx="130" cy="130" r="4" fill="#C5D94A" />
              <text x="130" y="145" textAnchor="middle" fill="#BBB" fontSize="9" fontFamily="Montserrat, sans-serif" fontWeight="500">buying circle</text>
              {[45,135,225,315].map((a,i)=>{const r=(a*Math.PI)/180;const ax=130+90*Math.cos(r);const ay=130+90*Math.sin(r);const t=r+Math.PI/2;return(<polygon key={i} points={`${ax+4*Math.cos(t)},${ay+4*Math.sin(t)} ${ax-4*Math.cos(t)},${ay-4*Math.sin(t)} ${ax+6*Math.cos(t)+3.5*Math.cos(t+Math.PI/2)},${ay+6*Math.sin(t)+3.5*Math.sin(t+Math.PI/2)}`} fill="#1A1A1A"/>);})}
            </svg>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 640, marginBottom: 20 }}>
            {[
              {role:"Decides",who:"Promoter / MD / Director",desc:"45-55 yrs, runs a ₹25-500Cr trading or distribution business. Uses Tally. Gets reports on WhatsApp. Makes decisions on gut feel because data arrives late and incomplete."},
              {role:"Influences",who:"Head of Sales / Branch heads",desc:"Wants visibility into team performance, territory gaps, customer trends. Currently flies blind or depends on monthly Excel summaries."},
              {role:"Uses daily",who:"MIS / Accounts team",desc:"Currently spending 3-4 hours daily creating manual reports from Tally. Will be the primary user of Magenta dashboards."},
              {role:"Can block",who:"IT / Tally admin",desc:"Worried about data security, ERP integration breaking something, extra work on their plate. Needs reassurance that integration is seamless."}
            ].map((item,i)=>(
              <div key={i} style={{border:"1px solid #E6E6E6",borderRadius:10,padding:"14px 16px"}}>
                <Pill on>{item.role}</Pill>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:13,fontWeight:700,color:"#1A1A1A",margin:"8px 0 4px"}}>{item.who}</div>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:11.5,color:"#888",lineHeight:1.6}}>{item.desc}</div>
              </div>
            ))}
          </div>
          <Note type="warn">This buyer is not searching for "best BI tool for distributors" on Google. They don't know this category exists. They need to be found through trust-based channels — not mass advertising.</Note>
        </S>

        <S n={4} title="Positioning pillars" sub="Three reasons someone should care about Magenta">
          <T>Every piece of messaging — website copy, LinkedIn post, case study, sales pitch — should connect back to one of these three pillars.</T>
          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
            <svg width="300" height="260" viewBox="0 0 300 260">
              <circle cx="150" cy="88" r="78" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              <circle cx="95" cy="172" r="78" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              <circle cx="205" cy="172" r="78" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              <text x="150" y="60" textAnchor="middle" fill="#7A8B5C" fontSize="12" fontFamily="Montserrat, sans-serif" fontWeight="600">Time saved</text>
              <text x="68" y="200" textAnchor="middle" fill="#7A8B5C" fontSize="12" fontFamily="Montserrat, sans-serif" fontWeight="600">Money found</text>
              <text x="232" y="200" textAnchor="middle" fill="#7A8B5C" fontSize="12" fontFamily="Montserrat, sans-serif" fontWeight="600">Clarity gained</text>
              <circle cx="150" cy="150" r="3" fill="#C5D94A" />
            </svg>
          </div>
          <div style={{ maxWidth: 640 }}>
            {[
              {p:"Time saved",d:"Your MIS team spends 3-4 hours daily making reports. Magenta makes that one click. One person at Kansuee now does the work that used to take three."},
              {p:"Money found",d:"Slow-moving stock, lost customers, missed cross-sell opportunities. Supertron found sales gaps across Gujarat and increased sales by 21%. These aren't new features — they're missed revenue hiding in your data."},
              {p:"Clarity gained",d:"You're making ₹50Cr+ decisions based on stale, incomplete data. April3rd Foods went from regional presence to PAN India distribution because they could finally see where the gaps were."}
            ].map((item,i)=>(
              <div key={i} style={{borderBottom:i<2?"1px solid #EBEBEB":"none",padding:"14px 0"}}>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:13,fontWeight:700,color:"#4A6030",marginBottom:4}}>{item.p}</div>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:12.5,color:"#777",lineHeight:1.65}}>{item.d}</div>
              </div>
            ))}
          </div>
        </S>

        <S n={5} title="Funnel design" sub="How a stranger becomes a customer">
          <T>This funnel needs to work for a buyer who doesn't know this product category exists. We can't just optimize a checkout page. We have to build awareness, create desire, and make the next step easy.</T>
          <div style={{ maxWidth: 640 }}>
            <FlowStep n={1} title="Awareness" desc="The buyer realizes their current reporting process is costing them time and money. This happens through LinkedIn content, partner referrals, industry events, founder-led posts, or a conversation with their CA." />
            <FlowStep n={2} title="Interest" desc="The buyer sees Magenta and thinks 'this might solve my problem.' They visit the website, read a case study, watch a product video, or hear about it from a peer." />
            <FlowStep n={3} title="Consideration" desc="The buyer wants to evaluate. They book a demo, read detailed case studies, maybe talk to a reference customer. The email nurture sequence does heavy lifting here for leads that aren't ready yet." />
            <FlowStep n={4} title="Demo booked" desc="Single-step form. Name, phone, email. Sales calls within 2 hours. Everything else — company size, ERP, industry — gets captured on the call, not the form." />
            <FlowStep n={5} title="Conversion" desc="Sales closes. Marketing's role: provide tailored collateral — case studies relevant to the buyer's industry, ROI proof points, objection handling docs." />
            <FlowStep n={6} title="Didn't convert yet?" desc="Goes into nurture. Drip of case studies, product updates, use cases every 10-12 days. Not pushy, just present. When they're ready, they come back." last />
          </div>
        </S>

        <S n={6} title="Channel strategy" sub="Where to spend time and money, and when">
          <T>Not every channel matters from day one. The priority is based on where the buyer actually pays attention and what can be activated with a small team and limited budget.</T>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "20px 0 24px", maxWidth: 640, flexWrap: "wrap" }}>
            <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:"50%",background:"#3A5A1C"}}/><span style={{fontFamily:"Montserrat, sans-serif",fontSize:11,color:"#666"}}>Start now</span></div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:16}}><div style={{width:10,height:10,borderRadius:"50%",background:"#B4B2A9"}}/><span style={{fontFamily:"Montserrat, sans-serif",fontSize:11,color:"#666"}}>Month 2-3</span></div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:16}}><div style={{width:10,height:10,borderRadius:"50%",border:"1.5px dashed #CCC"}}/><span style={{fontFamily:"Montserrat, sans-serif",fontSize:11,color:"#666"}}>Month 4+</span></div>
          </div>
          <ChCard name="LinkedIn (organic + outreach)" tag="now" why="The buyer — business owners, directors — is on LinkedIn. They may not post, but they scroll. Founder-led content builds trust faster than any brand page or ad." what="3 posts per week from Vikas's personal profile. Industry insights, customer stories, product thinking. In parallel: targeted connection requests and DM outreach to ICP profiles. Value-first, no hard sell on first touch." timeline="First demo bookings from LinkedIn in 6-8 weeks. Content compounds over time." />
          <ChCard name="Email nurture system" tag="now" why="Most leads won't convert on first touch. Without nurture, they're wasted. This is the system that turns a cold enquiry into a warm demo booking over weeks." what="5-7 email sequence. Pain point, peer proof, case study with real numbers (Supertron's 21% sales increase), product walkthrough, soft CTA. Then ongoing monthly touchpoints." timeline="Nurture starts converting leads in 4-6 weeks of entering the sequence." />
          <ChCard name="Partner and referral channels" tag="m2" why="CAs, Tally consultants, ERP partners already talk to your buyer daily. They have trust you can't buy with ads. This is Magenta's unfair advantage channel." what="Identify 20-30 CAs and Tally partners in Gujarat. Offer a referral structure or co-branded webinar. Build a simple one-pager they can share with clients." timeline="Slow to start (relationship-driven), but high-quality leads. Traction by month 3-4." />
          <ChCard name="Webinars and live demos" tag="m2" why="This buyer wants to see the product working before committing. A 30-min live demo with Q&A is more convincing than any landing page." what="Monthly webinar targeted by industry (FMCG distributors, IT/electronics, auto parts). Promote through LinkedIn and email. Record and repurpose as content." timeline="Each webinar generates 5-15 registrations initially. Conversion happens in follow-up." />
          <ChCard name="SEO and content marketing" tag="later" why="The buyer isn't searching for BI tools. But they are searching for things like 'how to track salesperson performance' or 'Tally reports for distribution business.'" what="Blog content targeting pain-point queries, not product queries. 'How to reduce dead stock,' 'How to track territory-wise sales without Excel.' Each post with a soft CTA to book a demo." timeline="SEO is a 4-6 month game. Start writing in month 2-3, expect meaningful traffic by month 5-6." />
          <ChCard name="Paid ads (Google / Meta)" tag="later" why="Not a priority initially. Search volume for this category is low, and Meta is not where this buyer makes software decisions." what="If tested, start with branded search and high-intent keywords only. Small budget (₹20-30K/month). Measure cost per demo booking, not cost per click." timeline="Only worth testing after month 4 when landing pages and messaging are proven to convert." />
        </S>

        <S n={7} title="Content pillars" sub="What to say, and why">
          <T>Content should serve the funnel, not fill a posting calendar. Every piece should either make the buyer feel the problem, show them proof, or make them trust Magenta enough to take the next step.</T>
          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
            <svg width="300" height="260" viewBox="0 0 300 260">
              <circle cx="150" cy="88" r="78" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              <circle cx="95" cy="172" r="78" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              <circle cx="205" cy="172" r="78" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              <text x="150" y="55" textAnchor="middle" fill="#7A8B5C" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="600">Pain</text>
              <text x="150" y="68" textAnchor="middle" fill="#7A8B5C" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="600">education</text>
              <text x="68" y="198" textAnchor="middle" fill="#7A8B5C" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="600">Proof</text>
              <text x="68" y="211" textAnchor="middle" fill="#7A8B5C" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="600">stories</text>
              <text x="232" y="198" textAnchor="middle" fill="#7A8B5C" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="600">Product</text>
              <text x="232" y="211" textAnchor="middle" fill="#7A8B5C" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="600">clarity</text>
              <circle cx="150" cy="150" r="3" fill="#C5D94A" />
            </svg>
          </div>
          <div style={{ maxWidth: 640 }}>
            {[
              {p:"Pain education",d:"Make the buyer feel the cost of their current process. 'Your MIS team spends ₹40,000/month in salary creating reports you barely trust.' Industry stats, time-waste reality checks, common mistakes distributors make.",f:"LinkedIn posts, blog articles, short videos"},
              {p:"Proof stories",d:"Real customer outcomes with real numbers. Not 'we implemented Magenta' but 'before Magenta, our MD waited 3 days for a sales report. Now he opens the app at 8am and knows exactly where things stand.' Supertron's 21% sales increase, April3rd's PAN India expansion, Kansuee's 2x efficiency.",f:"Case studies, video testimonials, LinkedIn carousels"},
              {p:"Product clarity",d:"Show the product doing the work. Screen recordings, feature walkthroughs, 'watch us connect Magenta to your Tally data in 2 hours.' Remove the mystery. Let the buyer see what they'll actually get.",f:"Demo videos, feature explainers, comparison pages"}
            ].map((item,i)=>(
              <div key={i} style={{borderBottom:i<2?"1px solid #EBEBEB":"none",padding:"14px 0"}}>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:13,fontWeight:700,color:"#1A1A1A",marginBottom:3}}>{item.p}</div>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:12.5,color:"#777",lineHeight:1.65,marginBottom:6}}>{item.d}</div>
                <span style={{fontFamily:"Montserrat, sans-serif",fontSize:11,color:"#7A8B5C",fontWeight:600}}>Formats: {item.f}</span>
              </div>
            ))}
          </div>
        </S>

        <S n={8} title="Website — quick wins" sub="Changes that improve conversion without a full redesign">
          <div style={{ maxWidth: 640 }}>
            <FlowStep n={1} title="Simplify the demo form" desc="Replace the 3-step form with a single step — name, email, phone. Everything else gets captured on the sales call. This alone can significantly increase form completions." />
            <FlowStep n={2} title="Rewrite the hero section" desc="Lead with the buyer's pain. 'Your team spends hours on reports you barely trust. Magenta connects to your Tally in 2 hours and gives you the truth, live.' Then CTA." />
            <FlowStep n={3} title="Case studies on the homepage" desc="Right now they're buried in the nav. Put 2-3 named case studies with real outcomes (Supertron: 21% sales increase, Kansuee: 80% data-driven decisions) above the fold." />
            <FlowStep n={4} title="Industry-specific pages" desc="One page each for FMCG, IT/electronics distribution, stationery, auto parts. Same product, different language and pain points on each page." />
            <FlowStep n={5} title="Embed the product video" desc="'Watch Overview' currently goes to YouTube. Embed it on-page. YouTube is a distraction machine — keep the visitor on your site." />
            <FlowStep n={6} title="Add pricing indication" desc="Even 'plans start at ₹3,000/month' gives the visitor a frame. No pricing makes buyers assume it's either too expensive or not serious." />
            <FlowStep n={7} title="Fix mobile screenshots" desc="Product screenshots have annotations that get cut off on mobile ('Visualization & Ana...', 'Review rmance.'). Need to be readable at mobile width." last />
          </div>
        </S>

        <S n={9} title="6-month roadmap" sub="What gets done when">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "20px 0 8px" }}>
            {roadmap.map((_, i) => (
              <div key={i} onClick={() => setMonth(i)} style={{
                width: i === month ? 16 : 12, height: i === month ? 16 : 12, borderRadius: "50%",
                background: i < month ? `rgba(122,139,92,${0.4 + i * 0.2})` : i === month ? "#C5D94A" : "transparent",
                border: i > month ? "1.5px dashed #CCC" : "none", transition: "all 0.3s", cursor: "pointer"
              }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
            {roadmap.map((m, i) => (
              <button key={i} onClick={() => setMonth(i)} style={{
                padding: "6px 14px", borderRadius: 16, fontSize: 12, fontWeight: month === i ? 700 : 400,
                fontFamily: "Montserrat, sans-serif", cursor: "pointer",
                border: month === i ? "1.5px solid #7A8B5C" : "1px solid #D9D9D9",
                background: month === i ? "#EFF3E8" : "transparent", color: month === i ? "#4A6030" : "#999"
              }}>{m.label}</button>
            ))}
          </div>
          <div style={{ border: "1px solid #E6E6E6", borderRadius: 12, padding: "22px 24px", maxWidth: 640, margin: "0 auto", background: "#FAFCF6", minHeight: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <Pill on>{roadmap[month].label}</Pill>
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{roadmap[month].title}</span>
            </div>
            {roadmap[month].items.map((task, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <Dot color="#7A8B5C" />
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: 12.5, color: "#555", lineHeight: 1.65 }}>{task}</span>
              </div>
            ))}
          </div>
        </S>

        <S n={10} title="How to think about every task" sub="The loop before every execution">
          <T>Before running any campaign, publishing any content, or testing any channel — run it through this loop. If you can't answer all four clearly, don't start.</T>
          <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
            <svg width="260" height="260" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="90" fill="none" stroke="#1A1A1A" strokeWidth="0.8" />
              {[{l:"Why",x:130,y:30},{l:"Goal",x:230,y:130},{l:"Steps",x:130,y:230},{l:"Measure",x:30,y:130}].map((p,i)=>(
                <g key={i}><circle cx={p.x} cy={p.y} r={7} fill="#3A5A1C" />
                <text x={p.x} y={p.y+(p.y<80?-16:p.y>180?22:0)} dx={p.x>180?16:p.x<80?-16:0} textAnchor={p.x>180?"start":p.x<80?"end":"middle"} fill="#1A1A1A" fontSize="12" fontFamily="Montserrat, sans-serif" fontWeight="600">{p.l}</text></g>
              ))}
              {[45,135,225,315].map((a,i)=>{const r=(a*Math.PI)/180;const ax=130+90*Math.cos(r);const ay=130+90*Math.sin(r);const t=r+Math.PI/2;return(<polygon key={i} points={`${ax+4*Math.cos(t)},${ay+4*Math.sin(t)} ${ax-4*Math.cos(t)},${ay-4*Math.sin(t)} ${ax+6*Math.cos(t)+3.5*Math.cos(t+Math.PI/2)},${ay+6*Math.sin(t)+3.5*Math.sin(t+Math.PI/2)}`} fill="#1A1A1A"/>);})}
              <circle cx="130" cy="130" r="4" fill="#C5D94A" />
            </svg>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 640 }}>
            {[
              {q:"Why are we doing this?",a:"If the answer is 'because everyone does it' or 'because we should,' don't do it. Every action needs a clear business reason."},
              {q:"What's the goal?",a:"Tie every action to a measurable outcome — demo bookings, qualified leads, website conversion rate, pipeline value."},
              {q:"What are the steps?",a:"Break it into the smallest executable steps. Ship the first version fast. Perfection is the enemy of progress."},
              {q:"How do we measure?",a:"Set the metric before you start, not after. If you can't measure it, you can't improve it, and you can't prove it worked."}
            ].map((item,i)=>(
              <div key={i} style={{padding:14,border:"1px solid #E6E6E6",borderRadius:10}}>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:12,fontWeight:700,color:"#4A6030",marginBottom:4}}>{item.q}</div>
                <div style={{fontFamily:"Montserrat, sans-serif",fontSize:11.5,color:"#888",lineHeight:1.6}}>{item.a}</div>
              </div>
            ))}
          </div>
        </S>

        <S n={11} title="What this is not" sub="Setting the right expectation">
          <T>This is not a promise of specific lead numbers or revenue targets. Those depend on budget, sales capacity, product-market resonance, and variables that only become clear after the first 60 days of real data.</T>
          <T>This is a system. A repeatable way to find the right people, tell them the right story, and give them a reason to book a demo. The numbers come from executing this consistently and optimizing based on what the data says.</T>
          <Note type="good">The goal for month 6 is not a magic number. It's a machine that works — a website that converts, channels that produce, nurture that warms, and a clear feedback loop between marketing and sales.</Note>
        </S>

        <div style={{ borderTop: "1px solid #E6E6E6", padding: "36px 0 72px", marginTop: 32, textAlign: "center" }}>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 10, color: "#CCC", fontWeight: 500, letterSpacing: 2, textTransform: "uppercase" }}>
            Prepared by Aman Raj — April 2026
          </p>
        </div>
      </div>
    </div>
  );
}
