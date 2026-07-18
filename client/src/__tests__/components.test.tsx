import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { PageHero } from "@/components/page-hero";
import { EmptyState } from "@/components/empty-state";
import { ContactForm } from "@/components/contact-form";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

describe("ThemeToggle", () => {
  it("renders a button with aria-label", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    expect(btn).toBeInTheDocument();
  });
});

describe("PageHero", () => {
  it("renders title", () => {
    render(<PageHero title="Test Title" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Title");
  });

  it("renders eyebrow when provided", () => {
    render(<PageHero title="Title" eyebrow="Eyebrow" />);
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<PageHero title="Title" subtitle="Subtitle text" />);
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });

  it("does not render eyebrow when not provided", () => {
    render(<PageHero title="Title" />);
    expect(screen.queryByText("Eyebrow")).not.toBeInTheDocument();
  });
});

describe("EmptyState", () => {
  it("renders books illustration for books type", () => {
    render(<EmptyState type="books" message="No books" />);
    expect(screen.getByText("No books")).toBeInTheDocument();
  });

  it("renders seminars illustration for seminars type", () => {
    render(<EmptyState type="seminars" message="No seminars" />);
    expect(screen.getByText("No seminars")).toBeInTheDocument();
  });
});

describe("ContactForm", () => {
  it("renders form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("has required attributes on required fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/message/i)).toHaveAttribute("required");
  });
});
