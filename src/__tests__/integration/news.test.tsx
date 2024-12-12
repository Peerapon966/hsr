import { NewsContent } from "@/[locale]/news/content/NewsContent";
import { NextIntlClientProvider } from "next-intl";
import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { fetchNewsItems } from "@/services/content/fetchNewsItems";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

const NewsPage = () => (
  <NextIntlClientProvider locale="en-us">
    <NewsContent />
  </NextIntlClientProvider>
);

describe("Integration test on the news page", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<NewsPage />);
    });
  });

  afterEach(cleanup);

  test("whether the NewsPage component is functioning properly or not", async () => {
    const eventsBtn = await screen.findByText("Events");
    const readMoreBtn = await screen.findByText("Read more");
    const latestNewsItem = screen
      .queryByText("Version 2.6 Annals of Pinecany's Mappou Age Update Details")
      ?.closest("div.select-none");

    expect(eventsBtn).toBeInTheDocument();
    expect(readMoreBtn).toBeInTheDocument();
    expect(latestNewsItem).toBeInTheDocument();
    expect(latestNewsItem?.parentElement?.childElementCount).toBe(5);

    await act(async () => {
      fireEvent.click(readMoreBtn);
    });

    const oldestNewsItem = screen
      .queryByText(
        'Version 2.5 "Flying Aureus Shot to Lupine Rue" Version Update'
      )
      ?.closest("div.select-none");

    expect(latestNewsItem?.parentElement?.childElementCount).toBe(10);
    expect(oldestNewsItem).toBeInTheDocument();
    expect(readMoreBtn).not.toBeInTheDocument();
    expect(fetchNewsItems).toHaveBeenCalledTimes(2);
  });
});
