import {
  ArrowRight,
  Calendar,
  Calculator,
  ChartColumn,
  CircleCheckBig,
  Coins,
  FileText,
  Gauge,
  House,
  Landmark,
  Percent,
  PiggyBank,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const mortgageFeatures = [
  {
    icon: Calendar,
    title: "Year-by-year schedule",
    description:
      "Follow every payment and watch your balance fall over the life of the loan.",
  },
  {
    icon: Percent,
    title: "Principal vs interest",
    description:
      "See exactly how each repayment splits between interest and home equity.",
  },
  {
    icon: Coins,
    title: "Extra repayments",
    description:
      "Add lump sums or pay more each month and see the interest you save.",
  },
  {
    icon: Gauge,
    title: "Payoff insights",
    description:
      "Compare rates and terms to find a repayment plan that fits your budget.",
  },
];

const compoundFeatures = [
  {
    icon: TrendingUp,
    title: "Flexible compounding",
    description:
      "Run the numbers daily, monthly, quarterly, or annually in one click.",
  },
  {
    icon: PiggyBank,
    title: "Regular contributions",
    description:
      "Layer in monthly deposits and see how small habits compound over time.",
  },
  {
    icon: ChartColumn,
    title: "Growth over time",
    description:
      "Track balance, contributions, and interest earned for every year.",
  },
  {
    icon: Sparkles,
    title: "Scenario comparison",
    description:
      "Test different rates, horizons, and deposits side by side before committing.",
  },
];

const steps = [
  {
    step: "Step 1",
    icon: Calculator,
    title: "Pick a calculator",
    description:
      "Start with mortgage repayments or compound interest. Both are ready instantly.",
  },
  {
    step: "Step 2",
    icon: FileText,
    title: "Enter your numbers",
    description:
      "Add amounts, rates, and timelines with sensible defaults to guide you.",
  },
  {
    step: "Step 3",
    icon: ChartColumn,
    title: "Plan with clarity",
    description:
      "Compare outcomes and see exactly what each option costs over time.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Your numbers stay in your browser. No accounts, no tracking, no stored financial data.",
  },
  {
    icon: Zap,
    title: "Instant results",
    description:
      "Every input recalculates in real time, so you can explore ideas as fast as you think.",
  },
  {
    icon: CircleCheckBig,
    title: "Accurate maths",
    description:
      "Standard amortisation and compound interest formulas, laid out clearly.",
  },
];

const stats = [
  { value: "2", label: "Calculators in one place" },
  { value: "30s", label: "To your first answer" },
  { value: "100%", label: "Free, with no paywall" },
  { value: "$0", label: "Financial data stored" },
];

const faqs = [
  {
    value: "free",
    question: "Are the calculators free to use?",
    answer:
      "Yes. Both the mortgage repayment and compound interest calculators are completely free, with no account, trial, or paywall.",
  },
  {
    value: "formula",
    question: "How is the monthly mortgage repayment calculated?",
    answer:
      "We use the standard amortisation formula, combining principal, interest rate, and term. Your payment is then broken down into principal and interest for every month of the schedule.",
  },
  {
    value: "compounding",
    question: "How often can compound interest compound?",
    answer:
      "Choose daily, monthly, quarterly, or annual compounding. You can also add regular contributions and compare how each frequency changes the final balance.",
  },
  {
    value: "extra",
    question: "Can I model extra mortgage repayments?",
    answer:
      "Yes. Add one-off lump sums or a higher recurring payment to see how much interest you save and how many months earlier you become mortgage-free.",
  },
  {
    value: "privacy",
    question: "Is my financial data stored?",
    answer:
      "No. Every calculation runs locally in your browser. We do not store your inputs, and no financial data is sent to a server.",
  },
  {
    value: "advice",
    question: "Is this financial advice?",
    answer:
      "No. FinCal is an educational tool. Results are estimates and may not include fees, taxes, or lender-specific terms. Speak to a qualified adviser before making financial decisions.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <a href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-4" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              FinCal
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a
              href="#calculators"
              className="transition-colors hover:text-foreground"
            >
              Calculators
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#why-fincal"
              className="transition-colors hover:text-foreground"
            >
              Why FinCal
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <a href="#faq">Questions?</a>
            </Button>
            <Button size="sm" asChild>
              <a href="#calculators">
                Open calculators
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden border-b">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-muted/70 via-background to-background"
          />
          <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div className="flex flex-col items-start gap-6">
              <Badge variant="secondary">
                <Sparkles data-icon="inline-start" />
                Personal finance, made simple
              </Badge>
              <h1 className="max-w-xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Plan your mortgage. Grow your savings.
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                FinCal brings a mortgage repayment calculator and a compound
                interest calculator together in one fast, private workspace — so
                you can see the full picture before you commit.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#calculators">
                    Explore the calculators
                    <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#how-it-works">See how it works</a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CircleCheckBig className="size-4" />
                  No sign-up required
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheckBig className="size-4" />
                  Free forever
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheckBig className="size-4" />
                  Runs in your browser
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <Card className="w-full shadow-sm">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <House className="size-4 text-muted-foreground" />
                    Mortgage repayment
                  </CardTitle>
                  <CardDescription>
                    $420,000 at 6.4% over 30 years
                  </CardDescription>
                  <CardAction>
                    <Badge variant="secondary">Preview</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">
                      Estimated monthly payment
                    </span>
                    <span className="font-heading text-4xl font-semibold tracking-tight tabular-nums">
                      $2,846
                      <span className="text-base font-normal text-muted-foreground">
                        {" "}
                        /mo
                      </span>
                    </span>
                  </div>
                  <Separator />
                  <ItemGroup className="gap-1">
                    <Item size="xs">
                      <ItemContent>
                        <ItemTitle>Principal &amp; interest</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <span className="text-sm font-medium tabular-nums">
                          $2,266
                        </span>
                      </ItemActions>
                    </Item>
                    <Item size="xs">
                      <ItemContent>
                        <ItemTitle>Property tax</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <span className="text-sm font-medium tabular-nums">
                          $350
                        </span>
                      </ItemActions>
                    </Item>
                    <Item size="xs">
                      <ItemContent>
                        <ItemTitle>Home insurance</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <span className="text-sm font-medium tabular-nums">
                          $230
                        </span>
                      </ItemActions>
                    </Item>
                  </ItemGroup>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total interest
                  </span>
                  <span className="text-sm font-medium tabular-nums">
                    $604,500
                  </span>
                </CardFooter>
              </Card>

              <Card size="sm" className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-muted-foreground" />
                    Compound growth
                  </CardTitle>
                  <CardDescription>$500/mo · 7% · 20 years</CardDescription>
                  <CardAction>
                    <Badge variant="secondary">
                      <TrendingUp data-icon="inline-start" />
                      +181%
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">
                        Final balance
                      </span>
                      <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums">
                        $260,463
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm text-muted-foreground">
                        Contributions
                      </span>
                      <span className="text-sm font-medium tabular-nums">
                        $120,000
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Contributions</span>
                        <span className="tabular-nums">46%</span>
                      </div>
                      <Progress value={46} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Interest earned</span>
                        <span className="tabular-nums">54%</span>
                      </div>
                      <Progress value={54} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-heading text-3xl font-semibold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="calculators"
          className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="outline">The calculators</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Two calculators. Total clarity.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Understand what you will repay on a home loan, and what your
              savings could become. No spreadsheets, no guesswork.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card className="w-full">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <House className="size-4 text-muted-foreground" />
                  Mortgage Repayments Calculator
                </CardTitle>
                <CardDescription>
                  Turn a loan into a clear monthly plan, then see where every
                  dollar goes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <ItemGroup>
                  {mortgageFeatures.map((feature) => (
                    <Item key={feature.title} variant="outline">
                      <ItemMedia variant="icon">
                        <feature.icon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{feature.title}</ItemTitle>
                        <ItemDescription>{feature.description}</ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
                <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Landmark className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Monthly repayment
                    </span>
                  </div>
                  <span className="text-sm font-medium tabular-nums">
                    $2,846
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/mortage-repayments-calculator">
                    Try the mortgage calculator
                    <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-full">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-muted-foreground" />
                  Compound Interest Calculator
                </CardTitle>
                <CardDescription>
                  See how consistent contributions and compounding grow your
                  balance over time.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <ItemGroup>
                  {compoundFeatures.map((feature) => (
                    <Item key={feature.title} variant="outline">
                      <ItemMedia variant="icon">
                        <feature.icon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{feature.title}</ItemTitle>
                        <ItemDescription>{feature.description}</ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
                <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Receipt className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Interest earned
                    </span>
                  </div>
                  <span className="text-sm font-medium tabular-nums">
                    $140,463
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="/mortage-repayments-calculator">
                    Try the compound interest calculator
                    <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-20 border-y bg-muted/30"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
              <Badge variant="outline">How it works</Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                From question to answer in three steps
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                No onboarding, no spreadsheets to build. Just the numbers you
                need, laid out clearly.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <Card key={step.step} size="sm" className="w-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      <step.icon data-icon="inline-start" />
                      {step.step}
                    </Badge>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="why-fincal"
          className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="outline">Why FinCal</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Built for real financial decisions
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Fast enough to explore, precise enough to trust, and private by
              design.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="w-full">
                <CardHeader>
                  <ItemMedia
                    variant="icon"
                    className="mb-2 size-9 rounded-lg bg-muted"
                  >
                    <benefit.icon />
                  </ItemMedia>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <Badge variant="outline">FAQ</Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Questions, answered
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Everything you need to know before you run your first
                calculation.
              </p>
            </div>
            <Card className="mt-10 w-full">
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.value} value={faq.value}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="w-full bg-muted/50">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Calculator className="size-6" />
              </span>
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Ready to see where your money goes?
                </h2>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                  Run your first calculation in seconds — no sign-up, no
                  spreadsheets, and no data left behind.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#calculators">
                    Start with a mortgage
                    <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#calculators">Try compound interest</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-semibold">FinCal</span>
              <span className="text-xs text-muted-foreground">
                Mortgage &amp; compound interest calculators
              </span>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a
              href="#calculators"
              className="transition-colors hover:text-foreground"
            >
              Calculators
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <p className="text-center text-xs text-muted-foreground">
            © 2026 FinCal. For education, not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}


