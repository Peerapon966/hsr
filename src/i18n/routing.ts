import { defineRouting } from "next-intl/routing";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "const";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.keys(AVAILABLE_LOCALES),

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
