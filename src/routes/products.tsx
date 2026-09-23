
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProductGrid } from "@/components/bakery";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title: "كل المنتجات | لقمة صح",
      },
      {
        name: "description",
        content:
          "تصفح 29 منتجًا من مخبوزات لقمة صح بالدقيق الأبيض والحبة الكاملة.",
      },
      {
        property: "og:title",
        content: "منتجات لقمة صح",
      },
      {
        property: "og:description",
        content:
          "29 اختيارًا طازجًا من مخبوزات الدقيق الأبيض والحبة الكاملة.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="29 منتج طازج"
        title="كل المخبوزات"
        description="اكتشف تشكيلتنا واستخدم التصفية للوصول بسرعة إلى اختيارك المفضل."
      />

      <section className="site-container py-12 sm:py-18">
        <ProductGrid />
      </section>
    </main>
  );
}

