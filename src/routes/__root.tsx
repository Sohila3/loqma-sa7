import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

import {
  Footer,
  Navbar,
  WhatsAppButton,
} from "@/components/bakery";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "لقمة صح | مخبوزات طازة كل يوم",
      },
      {
        name: "description",
        content:
          "مخبوزات لقمة صح الطازة بالدقيق الأبيض ودقيق الحبة الكاملة، والحجز بسهولة عبر واتساب.",
      },
      {
        name: "author",
        content: "لقمة صح",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "لقمة صح | مخبوزات طازة كل يوم",
      },
      {
        property: "og:description",
        content:
          "مخبوزات لقمة صح الطازة بالدقيق الأبيض ودقيق الحبة الكاملة، والحجز بسهولة عبر واتساب.",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
{
  rel: "icon",
  href: "/Loqma.jpeg",
  type: "image/jpeg",
},
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700&family=Reem+Kufi:wght@500;600;700&display=swap",
      },
    ],
  }),

  component: RootShell,

  notFoundComponent: NotFoundComponent,
});

function RootShell() {
  return (
    <>
      <HeadContent />

      <QueryClientProvider client={queryClient}>
        <div
          lang="ar"
          dir="rtl"
          className="min-h-screen overflow-x-hidden"
        >
          <Navbar />

          <main>
            <Outlet />
          </main>

          <Footer />
          <WhatsAppButton />
        </div>
      </QueryClientProvider>

      <Scripts />
    </>
  );
}

function NotFoundComponent() {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background px-6 text-center"
    >
      <div className="max-w-md">
        <h1 className="mb-4 text-5xl font-bold text-primary">404</h1>

        <h2 className="mb-3 text-2xl font-bold">
          الصفحة غير موجودة
        </h2>

        <p className="mb-6 text-muted-foreground">
          عذرًا، الصفحة التي تبحثين عنها غير موجودة.
        </p>

        <a
          href="/"
          className="inline-flex rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}