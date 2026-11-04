import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Repayments Calculator | FinCal',
  description:
    'Calculate your monthly mortgage repayments and see principal vs interest breakdown over the life of your loan.',
};

export default function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
