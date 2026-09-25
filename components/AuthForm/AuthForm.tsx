"use client"

import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { FormEvent, useState } from "react"

import styles from "./AuthForm.module.css"

type Mode = "login" | "signup"

interface AuthFormProps {
  mode: Mode
}

const copy = {
  login: {
    submit: "Log In",
    passwordAutoComplete: "current-password" as const,
    switchHref: "/signup",
    switchText: "New here?",
    switchLink: "Create an account",
  },
  signup: {
    submit: "Sign Up",
    passwordAutoComplete: "new-password" as const,
    switchHref: "/login",
    switchText: "Already have an account?",
    switchLink: "Log in",
  },
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const t = copy[mode]

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log({ mode, email, password })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="auth-email">
          Email
        </label>
        <input
          className={styles.input}
          id="auth-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="auth-password">
          Password
        </label>
        <div className={styles.passwordField}>
          <input
            className={styles.input}
            id="auth-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={t.passwordAutoComplete}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.toggle}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button type="submit" className="btn">
        {t.submit}
      </button>

      <p className={styles.switchPrompt}>
        {t.switchText} <Link href={t.switchHref}>{t.switchLink}</Link>
      </p>
    </form>
  )
}
