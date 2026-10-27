import { PaperButton } from "@/components/ui/PaperButton";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="page__title">
        Nothing on <em>this page.</em>
      </h1>
      <p>The page you were looking for doesn&apos;t exist or has moved.</p>
      <PaperButton href="/" className="mt-4">
        Back to home
      </PaperButton>
    </section>
  );
}
