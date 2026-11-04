"use client";

import { useState } from "react";
import { Home, Calculator, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentRow {
  month: number;
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  extraPayment: number;
}

function generateAccurateSchedule(
  loanAmount: number,
  interestRate: number,
  loanTermYears: number,
  extraMonthlyPayment: number = 0
): PaymentRow[] {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  const schedule: PaymentRow[] = [];
  let balance = loanAmount;

  if (monthlyRate === 0) {
    const basePayment = loanAmount / numberOfPayments;
    for (let month = 1; month <= numberOfPayments; month++) {
      schedule.push({
        month,
        year: Math.ceil(month / 12),
        payment: basePayment,
        principal: basePayment,
        interest: 0,
        balance: Math.max(0, balance - basePayment),
        extraPayment: 0,
      });
      balance -= basePayment;
    }
    return schedule;
  }

  const baseMonthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  for (let month = 1; month <= numberOfPayments && balance > 0.01; month++) {
    const interestPayment = balance * monthlyRate;
    let principalPayment = baseMonthlyPayment - interestPayment;
    const totalExtra = extraMonthlyPayment;
    
    const principalWithExtra = principalPayment + totalExtra;

    if (principalWithExtra > balance) {
      principalPayment = balance;
    } else {
      principalPayment = principalWithExtra;
    }

    const extraApplied = principalWithExtra > (baseMonthlyPayment - interestPayment) 
      ? principalWithExtra - (baseMonthlyPayment - interestPayment) 
      : 0;

    balance = balance - (principalWithExtra > balance ? balance : principalWithExtra);

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      payment: baseMonthlyPayment,
      principal: baseMonthlyPayment - interestPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      extraPayment: principalWithExtra > (baseMonthlyPayment - interestPayment) && extraMonthlyPayment > 0 
        ? Math.min(extraMonthlyPayment, balance + principalWithExtra) 
        : (extraMonthlyPayment > 0 && principalWithExtra >= (baseMonthlyPayment - interestPayment) ? extraMonthlyPayment : 0),
    });

    if (balance <= 0.01) break;
  }

  return schedule;
}

export default function MortgageRepaymentsCalculator() {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [extraPayment, setExtraPayment] = useState("0");
  const [showSchedule, setShowSchedule] = useState(false);
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("yearly");

  const loan = parseFloat(loanAmount) || 0;
  const rate = parseFloat(interestRate) || 0;
  const term = parseFloat(loanTerm) || 0;
  const extra = parseFloat(extraPayment) || 0;

  const schedule = generateAccurateSchedule(loan, rate, term, extra);
  
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;
  let baseMonthlyPayment = 0;
  if (monthlyRate === 0) {
    baseMonthlyPayment = loan / numberOfPayments;
  } else {
    baseMonthlyPayment =
      (loan * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }
  
  const totalPayment = schedule.reduce((sum, row) => sum + row.payment + row.extraPayment, 0);
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal + row.extraPayment, 0);
  const actualPayoffMonths = schedule.length;
  const actualPayoffYears = Math.floor(actualPayoffMonths / 12);
  const actualPayoffMonthsRem = actualPayoffMonths % 12;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const yearlySchedule = schedule.reduce((acc, row) => {
    const year = row.year;
    if (!acc[year]) {
      acc[year] = {
        year,
        payment: 0,
        principal: 0,
        interest: 0,
        extraPayment: 0,
        balance: 0,
      };
    }
    acc[year].payment += row.payment;
    acc[year].principal += row.principal;
    acc[year].interest += row.interest;
    acc[year].extraPayment += row.extraPayment;
    acc[year].balance = row.balance;
    return acc;
  }, {} as Record<number, any>);

  const yearlyRows = Object.values(yearlySchedule);

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="size-4" />
            </span>
            <span className="font-heading text-sm font-semibold">FinCal</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Home className="size-5 text-muted-foreground" />
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Mortgage Repayments Calculator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Calculate your monthly mortgage payments with breakdown of
              principal and interest, and see your amortization schedule.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>
                  Enter your loan amount, interest rate, term, and extra payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="loanAmount">Loan Amount (USD)</FieldLabel>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="500000"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="interestRate">
                      Interest Rate (% per year)
                    </FieldLabel>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="6.5"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="loanTerm">
                      Loan Term (years)
                    </FieldLabel>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      placeholder="30"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="extraPayment">
                      Extra Payment (USD per month)
                    </FieldLabel>
                    <Input
                      id="extraPayment"
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      placeholder="0"
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repayment Summary</CardTitle>
                <CardDescription>
                  Your monthly payment and total breakdown
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="rounded-lg bg-primary/5 p-6 text-center">
                  <div className="text-sm text-muted-foreground">
                    Monthly Repayment (Principal + Interest)
                  </div>
                  <div className="mt-2 text-3xl font-semibold tabular-nums">
                    {formatCurrency(baseMonthlyPayment)}
                  </div>
                  {extra > 0 && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      + {formatCurrency(extra)} extra = {formatCurrency(baseMonthlyPayment + extra)}
                    </div>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">
                      Loan Amount
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(loan)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">
                      Total Principal
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(totalPrincipal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">
                      Total Interest
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(totalInterest)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">
                      Total Amount Paid
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(totalPayment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">
                      Payoff Time
                    </span>
                    <span className="font-medium tabular-nums">
                      {actualPayoffYears > 0 && actualPayoffYears + " yr" + (actualPayoffYears > 1 ? "s" : "") + " "}
                      {actualPayoffMonthsRem > 0 && actualPayoffMonthsRem + " mo" + (actualPayoffMonthsRem > 1 ? "s" : "")}
                      {actualPayoffYears === 0 && actualPayoffMonthsRem === 0 && "0 months"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  All amounts are in USD. Results are estimates for educational purposes only.
                </p>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Amortization Schedule</CardTitle>
                  <CardDescription>
                    Monthly breakdown showing principal vs interest over time
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSchedule(!showSchedule)}
                >
                  {showSchedule ? (
                    <>
                      <ChevronDown className="size-4" />
                      Hide Schedule
                    </>
                  ) : (
                    <>
                      <ChevronRight className="size-4" />
                      Show Schedule
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            {showSchedule && (
              <CardContent>
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "monthly" | "yearly")}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="yearly">Yearly View</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
                  </TabsList>
                  <TabsContent value="yearly">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Payment</TableHead>
                            <TableHead className="text-right">Principal</TableHead>
                            <TableHead className="text-right">Interest</TableHead>
                            <TableHead className="text-right">Extra</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {yearlyRows.map((row: any) => (
                            <TableRow key={row.year}>
                              <TableCell className="font-medium">{row.year}</TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.payment + row.extraPayment)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.principal + row.extraPayment)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.interest)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.extraPayment)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.balance)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="monthly">
                    <div className="max-h-[400px] overflow-auto rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Payment</TableHead>
                            <TableHead className="text-right">Principal</TableHead>
                            <TableHead className="text-right">Interest</TableHead>
                            <TableHead className="text-right">Extra</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {schedule.map((row) => (
                            <TableRow key={row.month}>
                              <TableCell>{row.month}</TableCell>
                              <TableCell>{row.year}</TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.payment)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.principal)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.interest)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.extraPayment)}
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatCurrency(row.balance)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            )}
          </Card>
        </section>
      </main>
    </div>
  );
}
