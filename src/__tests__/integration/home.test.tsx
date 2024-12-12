import { HomeContent } from "@/[locale]/home/content/HomeContent";
import { NextIntlClientProvider } from "next-intl";
import { render, screen, act } from "@testing-library/react";

const HomePage = () => (
  <NextIntlClientProvider locale="en-us">
    <HomeContent />
  </NextIntlClientProvider>
);

describe("Integration test on the home page", () => {
  it("should successfully render the home page", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const header = await screen.findByText("Voice of the Galaxy");
    const himeko = await screen.findByText("Himeko");
    const nextBtn = await screen.findByAltText("Next button");

    expect(header).toBeInTheDocument();
    expect(himeko).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    expect(himeko.parentElement?.tagName).toBe("A");
  });
});
