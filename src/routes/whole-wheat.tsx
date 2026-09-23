
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProductGrid } from "@/components/bakery";
export const Route = createFileRoute("/whole-wheat")({ head: () => ({ meta: [{ title: "منتجات الحبة الكاملة | لقمة صح" }, { name: "description", content: "17 منتجًا غنيًا من مخبوزات دقيق الحبة الكاملة." }, { property: "og:title", content: "مخبوزات الحبة الكاملة | لقمة صح" }, { property: "og:description", content: "حبوب كاملة ونكهة قمح غنية لاختيار يومي مشبع." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });

function Page() {
  return (
    <main>
      <PageIntro
        eyebrow="17 منتج"
        title="مخبوزات الحبة الكاملة"
        description="اختيارات غنية بطعم القمح والحبوب، متوازنة ومشبعة من غير تنازل عن الطعم."
      />

      <section className="site-container py-12 sm:py-18">
        <ProductGrid initialFilter="whole" />
      </section>
    </main>
  );
}

