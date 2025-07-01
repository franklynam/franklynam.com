import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{background: '#181b22', minHeight: '100vh', width: '100vw', overflowX: 'hidden'}}>
      {/* Hero Section */}
      <section style={{position: 'relative', width: '100vw', height: '55vh', background: 'linear-gradient(to bottom, #181b22 60%, #f8f4f1 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '55vh', background: 'url(/coastline.jpg) center/cover no-repeat', filter: 'brightness(50%)', zIndex: 0}}></div>
        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '5rem'}}>
          <span style={{fontSize: '3rem', fontWeight: 700, color: '#fff', letterSpacing: '-2px'}}>franklynam<span style={{color: '#e05c4e'}}>.com</span> <span style={{display: 'inline-block', marginLeft: '0.5rem', verticalAlign: 'middle'}}>&#9651;&#9651;</span></span>
          <div style={{color: '#ededed', fontSize: '1.2rem', marginTop: '0.5rem'}}>software engineering as craft</div>
        </div>
      </section>
      {/* Intro Section */}
      <section style={{background: '#f8f4f1', padding: '0 0 4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{marginTop: '-5rem', background: '#fff', borderRadius: '50%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
          <img src="/profile.jpg" alt="Frank Lynam" style={{width: 140, height: 140, borderRadius: '50%'}} />
        </div>
        <h1 style={{fontSize: '2.5rem', fontWeight: 700, margin: '2rem 0 1rem 0', color: '#181b22', textAlign: 'center'}}>HOW CAN I HELP?</h1>
        <p style={{maxWidth: 700, color: '#181b22', fontSize: '1.15rem', textAlign: 'center', marginBottom: '2.5rem'}}>Hi there. My name is Frank Lynam and I have for more than 20 years worked in the software industry, building products, leading teams, and delivering solutions for clients. I am always on the lookout for new projects and so, if you like what you see on this site, please do get in touch for a <a href="/contact" style={{color: '#e05c4e', textDecoration: 'underline'}}>chat</a>.</p>
        {/* Services */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: 900}}>
          {/* Coding */}
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '1rem'}}>
            <div style={{fontSize: '2.5rem', marginRight: '1rem'}}>&lt;/&gt;</div>
            <div>
              <h2 style={{fontSize: '2rem', fontWeight: 700, color: '#181b22'}}>CODING</h2>
              <p style={{color: '#181b22', fontSize: '1.1rem', margin: '1rem 0'}}>In the beginning I was a coder and I guess I may always be one. What drew me in the first place to write those first few stuttering lines of code is still what drives me on today - I really do marvel at the almost magical translation that happens when a set of instructions is interpreted and used to make things happen, whether that be as a small part of a service running in the cloud or as the primary engine keeping an embedded device ticking over...</p>
              <a href="#" style={{background: '#181b22', color: '#fff', padding: '0.8rem 2rem', borderRadius: 4, fontWeight: 600, fontSize: '1.1rem', display: 'inline-block', marginTop: '0.5rem'}}>Learn more &gt;</a>
            </div>
          </div>
          {/* Building Great Products */}
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '1rem'}}>
            <div style={{fontSize: '2.5rem', marginRight: '1rem'}}>&#128336;</div>
            <div>
              <h2 style={{fontSize: '2rem', fontWeight: 700, color: '#181b22'}}>BUILDING GREAT PRODUCTS</h2>
              <p style={{color: '#181b22', fontSize: '1.1rem', margin: '1rem 0'}}>What are the key ingredients of a great product? First, you have to have a great idea that meets a very real market need. Without a need and an idea to address that need you might as well forget it. Nothing you do after this point will make up for their omission. But having said that, a product will not build itself and this is where good project planning and management become so key in the life cycle of a product...</p>
              <a href="#" style={{background: '#181b22', color: '#fff', padding: '0.8rem 2rem', borderRadius: 4, fontWeight: 600, fontSize: '1.1rem', display: 'inline-block', marginTop: '0.5rem'}}>Learn more &gt;</a>
            </div>
          </div>
          {/* Communication */}
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '2rem'}}>
            <div style={{fontSize: '2.5rem', marginRight: '1rem'}}>&#129489;&#8205;&#127979;</div>
            <div>
              <h2 style={{fontSize: '2rem', fontWeight: 700, color: '#181b22'}}>COMMUNICATION</h2>
              <p style={{color: '#181b22', fontSize: '1.1rem', margin: '1rem 0'}}>When I was in my mid twenties, I took a sabbatical from the development world and duly enrolled in a degree in Ancient History/Archaeology and Italian. I wanted to broaden my horizons a little bit. And nine years later I came out the other end of that decision with a BA, MPhil and PhD. I learnt a lot from those years but undoubtedly the most significant of those learnings was to be found in my newly acquired ability to communicate effectively...</p>
              <a href="#" style={{background: '#181b22', color: '#fff', padding: '0.8rem 2rem', borderRadius: 4, fontWeight: 600, fontSize: '1.1rem', display: 'inline-block', marginTop: '0.5rem'}}>Learn more &gt;</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
