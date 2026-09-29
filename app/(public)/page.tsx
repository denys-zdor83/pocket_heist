// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> show this splash

import { Clock8, Target, UsersRound, Trophy } from "lucide-react"
import Link from "next/link"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.splash}>
      <section className={styles.hero} aria-label="Hero">
        <h1 aria-label="Pocket Heist">
          P<Clock8 className="logo" strokeWidth={2.75} aria-hidden="true" focusable="false" />cket Heist
        </h1>
        <p className={styles.tagline}>Steal the day.</p>
        <p className={styles.lede}>
          Turn office drudgery into tiny missions. Plan the job, rally your
          crew, and clock out with the loot.
        </p>
        <Link href="/signup" className={`btn ${styles.cta}`}>
          Join the crew
        </Link>
        <p className={styles.loginPrompt}>
          Already on the job? <Link href="/login">Sign in</Link>
        </p>
      </section>

      <section className={styles.features} aria-label="Features">
        <article className={styles.feature}>
          <Target size={32} strokeWidth={2} aria-hidden="true" focusable="false" />
          <h2>Case the job</h2>
          <p>
            Turn any office task into a heist worth pulling off, with clear
            objectives and a payout.
          </p>
        </article>
        <article className={styles.feature}>
          <UsersRound size={32} strokeWidth={2} aria-hidden="true" focusable="false" />
          <h2>Assemble the crew</h2>
          <p>Rally teammates, hand out roles, and split the take.</p>
        </article>
        <article className={styles.feature}>
          <Trophy size={32} strokeWidth={2} aria-hidden="true" focusable="false" />
          <h2>Pull it off</h2>
          <p>
            Track the score, log the wins, and steal the day — one workday at
            a time.
          </p>
        </article>
      </section>
    </div>
  )
}
