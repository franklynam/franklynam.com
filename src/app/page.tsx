import Image from 'next/image';
import Head from 'next/head';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@700;800&family=Karla:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.root}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          {/* Left: Text */}
          <div className={styles.heroText}>
            <h1>
              I'm <span style={{ color: '#fff' }}>Frank Lynam</span><br />
              <span style={{ color: '#e38525' }}>Engineering Leader</span>
            </h1>
            <p className={styles.bodyText}>
              A blend of creativity, empathy, and technical expertise. I strive to design and build solutions that not only work, but delight users at every interaction.
            </p>
            <div className={styles.ctas}>
              <a href="#" className={styles.ctaPrimary + ' ' + styles.bodyText}>
                Download Resume
              </a>
              <a href="#" className={styles.ctaSecondary + ' ' + styles.bodyText}>
                <span>▶</span>
                Intro Video
              </a>
            </div>
          </div>
          {/* Right: Headshot */}
          <div className={styles.heroHeadshot}>
            <Image src="/flynam.png" alt="Frank Lynam" fill style={{ objectFit: 'cover' }} />
          </div>
        </section>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section[style*='display: flex'] {
            flex-direction: column;
            align-items: stretch !important;
          }
          section[style*='display: flex'] > div:last-child {
            margin-left: 0 !important;
            margin-right: 0 !important;
            max-width: 100vw !important;
          }
          .hero-text {
            margin-top: 400px !important;
          }
        }
        @media (max-width: 550px) {
          .hero-text {
            margin-top: 200px !important;
          }
        }
      `}</style>
    </>
  );
} 