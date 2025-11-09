import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const NAVY = '#022140';
const BLUE = '#265078';
const GOLD = '#F4BD38';
const GRAY = '#E8E8E8';

document.title = 'FHSD Transportation';

export default function FHSDTransportation() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

function AppShell() {
  useDevSanityChecks();
  return (
    <div className={"min-h-screen bg-white text-black"}>
      <BrandFonts />
      <Header />
      <TopNav />
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/recruitment"} element={<Recruitment />} />
          <Route path={"/training"} element={<Training />} />
          <Route path={"/retention"} element={<Retention />} />
          <Route path={"/data"} element={<DataEval />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function BrandFonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;900&family=Open+Sans:wght@400;600&display=swap');
      :root{ --fh-primary:\${NAVY}; --fh-secondary:\${BLUE}; --fh-accent:\${GOLD}; --fh-neutral:\${GRAY}; }
      .font-heading{ font-family:'Raleway', sans-serif; font-weight:900; }
      .font-subhead{ font-family:'Raleway', sans-serif; font-weight:900; letter-spacing:.06em; text-transform:uppercase; font-size:1.1rem; }
      .font-body{ font-family:'Open Sans',sans-serif; }
      .focus-grid{ display:grid; grid-template-columns:1fr; gap:1rem; }
      @media (min-width:768px){ .focus-grid{ grid-template-columns:repeat(3,1fr); } }
      .bar{ height:6px; background:var(--fh-accent); width:100%; margin:.5rem 0 1rem; display:block; }
      .section{ padding:1.25rem; max-width:960px; margin:0 auto; }
      .nav a{ color:white; opacity:.95; padding:.6rem .8rem; border-radius:.5rem; text-decoration:none; }
      .nav a[aria-current='page']{ background:rgba(255,255,255,.15); }
    \`}</style>
  );
}

function Header(){
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, -10]);
  const imgOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  return (
    <motion.header style={{ backgroundColor: NAVY, position:'relative', color:'white' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.div style={{ y, opacity: imgOpacity }}>
        <BannerImg alt=\"FHSD Transportation banner\" />
      </motion.div>
    </motion.header>
  );
}

function BannerImg({alt}:{alt?:string}){
  const candidates = ['/page-header.png','/page%20header.png','/page header.png'];
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = candidates[idx] || '';
  if (failed) {
    return (
      <div style={{width:'100%', height:'250px', backgroundColor:NAVY, display:'flex', flexDirection:'column', justifyContent:'center', paddingLeft:'2rem'}} aria-label=\"FHSD banner fallback\">
        <h2 style={{color:GRAY, fontFamily:'Raleway', fontWeight:700, margin:0, fontSize:'1rem'}}>Francis Howell School District<br/>Transportation Department</h2>
        <h1 style={{fontFamily:'Raleway', fontWeight:900, margin:0, fontSize:'2rem'}}>
          <span style={{color:GOLD}}>marketing </span>
          <span style={{color:'white'}}>plan</span>
        </h1>
      </div>
    );
  }
  return (
    <img src={src} alt={alt} style={{width:'100%', display:'block', height:'250px', objectFit:'cover'}} onError={() => { if (idx < candidates.length - 1) setIdx(idx + 1); else setFailed(true); }} />
  );
}

function TopNav(){
  const { pathname } = useLocation();
  return (
    <nav className={"nav"} style={{background: BLUE}}>
      <div className={"section"} style={{display:'flex', flexWrap:'wrap', gap:'.5rem'}}>
        <NavItem to={"/"} label={"Home"} current={pathname === '/'} />
        <NavItem to={"/recruitment"} label={"Recruitment & Outreach"} current={pathname === '/recruitment'} />
        <NavItem to={"/training"} label={"Training & Growth"} current={pathname === '/training'} />
        <NavItem to={"/retention"} label={"Retention & Culture"} current={pathname === '/retention'} />
        <NavItem to={"/data"} label={"Data & Evaluation"} current={pathname === '/data'} />
      </div>
    </nav>
  );
}

function NavItem({to, label, current}:{to:string; label:string; current?:boolean;}){
  return (
    <Link to={to} aria-current={current ? 'page' : undefined} className={"font-subhead"} style={{fontSize:'.9rem'}}>
      {label}
    </Link>
  );
}

function FocusCard({title, text}:{title:string; text:string;}) {
  return (
    <div style={{padding:'0.25rem 0'}}>
      <h3 className=["font-subhead"} style={{color: NAVY}}>{title}</h3>
      <p className={"font-body"}>{text}</p>
    </div>
  );
}

function SectionPage({title, bullets}:{title:string; bullets:string[];}){
  return (
    <motion.section className={"section page"} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
      <header style={{marginBottom:'1rem'}}>
        <h2 className={"font-subhead"} style={{color: NAVY, fontSize:'2rem'}}>{title}</h2>
        <span className={"bar}" />
      </header>
      <ul className={"font-body"} style={{lineHeight:1.8, paddingLeft:'1rem', listStyle:'disc'}}>
        {bullets.map((b, i) => {
          const parts = b.split(';').map(s => s.trim()).filter(Boolean);
          const main = parts.shift() || '';
          const subs = parts.map(sub => sub.charAt(0).toUpperCase() + sub.slice(1));
          return (
            <li key={i} style={{marginBottom:'.6rem'}}>
              {main}
              {subs.length > 0 && (
                <ul style={{marginTop:'.3rem', paddingLeft:'1.25rem', listStyle:'circle'}}>
                  {subs.map((s, j) => (<li key={j}>{s}</li>))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}

function Home() {
  return (
    <motion.section className={"section"} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}>
      <h2 className={"font-heading"} style={{color: NAVY, textTransform:'uppercase', fontSize:'2rem'}}>OUR FOCUS</h2>
      <span className={"bar"} />
      <div className={"focus-grid"} style={{marginTop:'1rem'}}>
        <FocusCard title={"STUDENTS"} text={"Every decision centers on their safety, success, and future."} />
        <FocusCard title={"SAFETY"} text={"Attention to detail keeps our students and staff safe every day."} />
        <FocusCard title={"SERVICE"} text={"We act with kindness, integrity, and professionalism as role models in our community."} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          background: GOLD,
          color: NAVY,
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          marginTop: '1.25rem',
          boxShadow: \`inset 8px 0 0 \${NAVY}, rgba(0,0,0,0.05) 0px 4px 12px\`
        }}
      >
        <h3 className={"font-subhead"} style={{margin:'0 0 .35rem 0'}}>PURPOSE</h3>
        <p className={"font-body"} style={{margin:0, lineHeight:1.65}}>
          Build a safe, student-centered, service-driven transportation program by recruiting great people, growing skills, strengthening culture, and using data to continually improve outcomes for students and families.
        </p>
      </motion.div>

      <p className={"font-body"} style={{marginTop:'1rem', lineHeight:1.65, textAlign:'left'}}>
        <span style={{color:BLUE, fontWeight:'bold'}}>Francis Howell Transportation</span> connects home, school, and community. What we do matters — we care, we serve, and we shape the future. <span style={{color:BLUE, fontWeight:'bold'}}>#ONEHOWELL</span>
      </p>
    </motion.section>
  );
}

function Recruitment(){
  return (
    <SectionPage
      title={"Recruitment & Outreach"}
      bullets={[
        'Promote the essential role transportation plays in daily attendance and student success; Spotlight relationships drivers build with students; Connect transportation to daily attendance outcomes',
        'Post weekly across district channels to showcase services, drivers, and safety practices; Photos and short profiles; Day-in-the-life reels; Safety tips and quick facts',
        'Target recruitment to key demographics; Mothers of kindergarteners; Retirees; Community volunteers',
        'Highlight why FHSD is a great place to work; Competitive pay and benefits; Schedule flexibility; Paid training provided',
        'Coordinate a Ride-and-Drive aligned with kindergarten screening; Families meet drivers; Children safely explore a bus; Build comfort before day one',
        'Recruit where our audiences already gather; MRTA events; PTA meetings; Community fairs and faith-based events',
        'Build trust in the hiring journey; Clear steps to apply; Transparent timelines; Consistent follow-up with candidates',
        'Time campaigns for interest spikes; Late spring push; Early fall booster; Refresh creative quarterly',
        'Align with district plan and brand standards; Consistent visuals and tone; Shared calendar with Communications'
      ]}
    />
  );
}

function Training(){
  return (
    <SectionPage
      title={"Training & Growth"}
      bullets={[
        'Adopt a continuous growth mindset; Grounded in MOAPT, NAPT, MUSIC; Annual compliance refreshers',
        'Strengthen professional communication; With students; With parents; With school staff',
        'Use positive reinforcement to shape behavior; Clear expectations; Consistent routines; Celebrate wins',
        'Practice conflict de-escalation; CPI strategies; Scenario-based drills; Radio protocols',
        'Complete mandatory reporter training; Annual refreshers; Quick-reference guides on each bus',
        'Provide health & safety certifications; First Aid and CPR; EpiPen and Narcan; Tourniquet use and wound packing',
        'Serve students with disabilities with confidence; Understand disability categories; Appropriate supports; Collaboration with SPED teams',
        'Rehearse emergency preparedness; Security protocols; Evacuation procedures; Comprehensive vehicle inspections',
        'Grow bus operation skills; Coaching and ride-alongs; Skills competitions; Peer mentoring'
      ]}
    />
  );
}

function Retention(){
  return (
    <SectionPage
      title={"Retention & Culture"}
      bullets={[
        'Lead with recognition; Open meetings with shout-outs; Peer-to-peer appreciation; Celebrate milestones',
        'Set high and equitable standards; Clear expectations for all roles; Support plans when needed; Fair and consistent accountability',
        'Invest in personal growth; Self-reflection prompts; Staff testimonials; Pathways for advancement',
        'Model positivity and equity; Kindness in every interaction; Inclusive language; Community-first mindset',
        'Address concerns constructively; Listen first; Retraining where needed; Documented follow-up',
        'Activate advisory voices; Transportation Advisory Committee (TAC); Surface issues and co-design solutions; Close the loop on feedback',
        'Build community through fellowship; Volunteer groups (walking club, puzzle group); Welcome teams for new hires; Buddy system',
        'Create after-hours connections; Movie nights; Hayrack ride; Caroling and seasonal events',
        'Serve the community together; Department service projects; Partnerships with local orgs; Share impact stories'
      ]}
    />
  );
}

function DataEval(){
  return (
    <SectionPage
      title={"Data & Evaluation"}
      bullets={[
        'Benchmark compensation; Regional salary study; Benefits comparison; Update annually',
        'Gather satisfaction data twice a year; Staff survey; Parent survey; Student survey',
        'Learn from departures; Structured exit interviews; Theme analysis; Share lessons learned',
        'Maintain continuous feedback loops; TAC input; Student Advisory; Parent Advisory',
        'Evaluate field trips; Simple post-trip evaluation; Quick digital form; Share highlights with drivers',
        'Close the loop with transparency; Quarterly summaries; Action items and owners; Track progress publicly'
      ]}
    />
  );
}

function NotFound(){
  const { pathname } = useLocation();
  return (
    <motion.section className={"section"} initial={{opacity:0}} animate={{opacity:1}}>
      <h2 className={"font-heading}" style={{color: NAVY}}>Page Not Found</h2>
      <p className={"font-body"}>The path <code>{pathname}</code> does not exist.</p>
      <p className={"font-body"}><Link to={"/"}>Go back Home</Link></p>
    </motion.section>
  );
}

function Footer(){
  return (
    <footer style={{background: NAVY, color:'white', marginTop: '2rem'}}>
      <div className={"section"} style={{display:'flex', flexDirection:'column', gap:'.25rem', alignItems:'center'}}>
        <small className={"font-body"}>© {new Date().getFullYear()} Francis Howell School District – Transportation Department</small>
        <small className={"font-body"} style={{color:GRAY, fontStyle:'italic'}}>Written By: Dr. Scott Speer</small>
      </div>
    </footer>
  );
}

function useDevSanityChecks(){
  useEffect(()=>{
    try{
      const haveColors = ['--fh-primary','--fh-secondary','--fh-accent','--fh-neutral']
        .every(v=>getComputedStyle(document.documentElement).getPropertyValue(v));
      console.assert(haveColors, 'CSS variables should be present');
      console.assert(typeof TopNav === 'function', 'TopNav defined');
      console.assert(typeof Recruitment === 'function', 'Recruitment defined');
      console.assert(typeof Training === 'function', 'Training defined');
      console.assert(typeof Retention === 'function', 'Retention defined');
      console.assert(typeof DataEval === 'function', 'DataEval defined');
    }catch(e){
      console.warn('Sanity check warning:', e);
    }
  }, );
}
