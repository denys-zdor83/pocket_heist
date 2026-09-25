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
  <div>Steal the day.</div>

  <p className="mt-6">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat.
  </p>

  <p className="mt-4">
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
  non proident, sunt in culpa qui officia deserunt mollit anim id est
  laborum.
  </p>

  <p className="mt-4">
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
  quae ab illo inventore veritatis et quasi architecto beatae vitae
  dicta sunt explicabo.
  </p>

  <p className="mt-4">
  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
  fugit, sed quia consequuntur magni dolores eos qui ratione
  voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
  ipsum quia dolor sit amet, consectetur, adipisci velit.
  </p>
  </div>
  </div>
  )
}
