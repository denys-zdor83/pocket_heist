// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Welcome to Pocket Heist — the app where you assign sneaky little missions to your coworkers.
          Steal someone's stapler. Leave a cryptic note on the printer. Rearrange the mugs.
          Small acts of chaos, tracked with precision.
        </p>
        <p>
          Create a heist, assign a target, set a deadline, and watch the office descend into delightful disorder.
        </p>
      </div>
    </div>
  )
}
