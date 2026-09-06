import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "senda — Financial workspace demo",
  description: "A local prototype of the Senda invoice-to-reconciliation workflow.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
