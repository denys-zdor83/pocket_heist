import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

import AuthForm from "@/components/AuthForm"

describe("AuthForm", () => {
  describe("login mode", () => {
    it("renders email, password, visibility toggle, submit button, and switch link", () => {
      render(<AuthForm mode="login" />)

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /show password/i })
      ).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument()

      const switchLink = screen.getByRole("link", { name: /create an account/i })
      expect(switchLink).toHaveAttribute("href", "/signup")
    })
  })

  describe("signup mode", () => {
    it("renders the signup submit label and a link back to /login", () => {
      render(<AuthForm mode="signup" />)

      expect(
        screen.getByRole("button", { name: /sign up/i })
      ).toBeInTheDocument()

      const switchLink = screen.getByRole("link", { name: /log in/i })
      expect(switchLink).toHaveAttribute("href", "/login")
    })
  })

  it("toggles password visibility and its accessible name", async () => {
    const user = userEvent.setup()
    render(<AuthForm mode="login" />)

    const password = screen.getByLabelText(/^password$/i) as HTMLInputElement
    expect(password.type).toBe("password")

    const toggle = screen.getByRole("button", { name: /show password/i })
    await user.click(toggle)

    expect(password.type).toBe("text")
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /hide password/i }))
    expect(password.type).toBe("password")
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument()
  })

  describe("submit", () => {
    let logSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    })

    afterEach(() => {
      logSpy.mockRestore()
    })

    it("logs { mode, email, password } on login submit", async () => {
      const user = userEvent.setup()
      render(<AuthForm mode="login" />)

      await user.type(screen.getByLabelText(/email/i), "alice@example.com")
      await user.type(screen.getByLabelText(/^password$/i), "hunter2")
      await user.click(screen.getByRole("button", { name: /log in/i }))

      expect(logSpy).toHaveBeenCalledTimes(1)
      expect(logSpy).toHaveBeenCalledWith({
        mode: "login",
        email: "alice@example.com",
        password: "hunter2",
      })
    })

    it("logs { mode, email, password } on signup submit", async () => {
      const user = userEvent.setup()
      render(<AuthForm mode="signup" />)

      await user.type(screen.getByLabelText(/email/i), "bob@example.com")
      await user.type(screen.getByLabelText(/^password$/i), "s3cret!")
      await user.click(screen.getByRole("button", { name: /sign up/i }))

      expect(logSpy).toHaveBeenCalledTimes(1)
      expect(logSpy).toHaveBeenCalledWith({
        mode: "signup",
        email: "bob@example.com",
        password: "s3cret!",
      })
    })
  })
})
