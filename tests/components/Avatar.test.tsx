import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import Avatar from "@/components/Avatar"

describe("Avatar", () => {
  it("renders the first letter uppercased for a lowercase name", () => {
    render(<Avatar name="alice" />)
    expect(screen.getByText("A")).toBeInTheDocument()
  })

  it("renders the first two uppercase letters for a PascalCase name", () => {
    render(<Avatar name="JohnDoe" />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders just the first letter for a name with a single uppercase", () => {
    render(<Avatar name="John" />)
    expect(screen.getByText("J")).toBeInTheDocument()
  })
})
