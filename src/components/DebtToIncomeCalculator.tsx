import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputs {
  monthlyGrossIncome: number;
  currentRentMortgage: number;
  newMortgagePayment: number;
  carPayment: number;
  creditCards: number;
  studentLoans: number;
  personalLoans: number;
  otherDebts: number;
  includeNewMortgage: boolean;
}

const schema = z.object({
  monthlyGrossIncome: z.number().min(1, "Income must be greater than 0"),
  currentRentMortgage: z.number().min(0, "Must be 0 or greater"),
  newMortgagePayment: z.number().min(0, "Must be 0 or greater"),
  carPayment: z.number().min(0, "Must be 0 or greater"),
  creditCards: z.number().min(0, "Must be 0 or greater"),
  studentLoans: z.number().min(0, "Must be 0 or greater"),
  personalLoans: z.number().min(0, "Must be 0 or greater"),
  otherDebts: z.number().min(0, "Must be 0 or greater"),
  includeNewMortgage: z.boolean(),
});

const DebtToIncomeCalculator: React.FC = () => {
  const [ratio, setRatio] = useState<number | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthlyGrossIncome: 0,
      currentRentMortgage: 0,
      newMortgagePayment: 0,
      carPayment: 0,
      creditCards: 0,
      studentLoans: 0,
      personalLoans: 0,
      otherDebts: 0,
      includeNewMortgage: false,
    },
  });

  const includeNewMortgage = watch('includeNewMortgage');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const totalDebts = 
      data.currentRentMortgage +
      (data.includeNewMortgage ? data.newMortgagePayment : 0) +
      data.carPayment +
      data.creditCards +
      data.studentLoans +
      data.personalLoans +
      data.otherDebts;

    const calculatedRatio = (totalDebts / data.monthlyGrossIncome) * 100;
    setRatio(calculatedRatio);
  };

  const getRatioClassification = (ratio: number): string => {
    if (ratio <= 36) return "Good";
    if (ratio <= 43) return "Fair";
    return "Poor";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Debt-to-Income Ratio Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="monthlyGrossIncome">Monthly Gross Income</Label>
          <Input
            type="number"
            id="monthlyGrossIncome"
            {...register('monthlyGrossIncome', { valueAsNumber: true })}
          />
          {errors.monthlyGrossIncome && <p className="text-red-500 text-sm">{errors.monthlyGrossIncome.message}</p>}
        </div>

        <div>
          <Label htmlFor="currentRentMortgage">Current Rent/Mortgage</Label>
          <Input
            type="number"
            id="currentRentMortgage"
            {...register('currentRentMortgage', { valueAsNumber: true })}
          />
          {errors.currentRentMortgage && <p className="text-red-500 text-sm">{errors.currentRentMortgage.message}</p>}
        </div>

        <div>
          <Label htmlFor="newMortgagePayment">New Mortgage Payment</Label>
          <Input
            type="number"
            id="newMortgagePayment"
            {...register('newMortgagePayment', { valueAsNumber: true })}
          />
          {errors.newMortgagePayment && <p className="text-red-500 text-sm">{errors.newMortgagePayment.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="includeNewMortgage" {...register('includeNewMortgage')} />
          <Label htmlFor="includeNewMortgage">Include New Mortgage Payment</Label>
        </div>

        <div>
          <Label htmlFor="carPayment">Car Payment</Label>
          <Input
            type="number"
            id="carPayment"
            {...register('carPayment', { valueAsNumber: true })}
          />
          {errors.carPayment && <p className="text-red-500 text-sm">{errors.carPayment.message}</p>}
        </div>

        <div>
          <Label htmlFor="creditCards">Credit Cards</Label>
          <Input
            type="number"
            id="creditCards"
            {...register('creditCards', { valueAsNumber: true })}
          />
          {errors.creditCards && <p className="text-red-500 text-sm">{errors.creditCards.message}</p>}
        </div>

        <div>
          <Label htmlFor="studentLoans">Student Loans</Label>
          <Input
            type="number"
            id="studentLoans"
            {...register('studentLoans', { valueAsNumber: true })}
          />
          {errors.studentLoans && <p className="text-red-500 text-sm">{errors.studentLoans.message}</p>}
        </div>

        <div>
          <Label htmlFor="personalLoans">Personal Loans</Label>
          <Input
            type="number"
            id="personalLoans"
            {...register('personalLoans', { valueAsNumber: true })}
          />
          {errors.personalLoans && <p className="text-red-500 text-sm">{errors.personalLoans.message}</p>}
        </div>

        <div>
          <Label htmlFor="otherDebts">Other Debts</Label>
          <Input
            type="number"
            id="otherDebts"
            {...register('otherDebts', { valueAsNumber: true })}
          />
          {errors.otherDebts && <p className="text-red-500 text-sm">{errors.otherDebts.message}</p>}
        </div>

        <Button type="submit" className="w-full">Calculate Ratio</Button>
      </form>

      {ratio !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <p className="text-lg">Your Debt-to-Income Ratio: <span className="font-bold">{ratio.toFixed(2)}%</span></p>
          <p className="text-lg">Classification: <span className={`font-bold ${
            ratio <= 36 ? 'text-green-600' : ratio <= 43 ? 'text-yellow-600' : 'text-red-600'
          }`}>{getRatioClassification(ratio)}</span></p>
        </div>
      )}
    </div>
  );
};

export default DebtToIncomeCalculator;
