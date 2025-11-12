"use client";
import PricingCard from "../General/PricingCard";

export default function BillingAndDetails() {
  return (
    <div className="my-5">
    <div className="flex flex-wrap justify-around gap-y-5 dark:bg-gray-900">
      <PricingCard
        topLabel="STANDARD PLAN"
        price="$20"
        billingInfo={
          <>
            <p>Per Day</p>
            <p>Billed Annually</p>
          </>
        }
        description="For each project we establish relationships with partners who provide value."
        imageSrc="/home/blueprint-review-onsite.jpg"
      />

      <PricingCard
        topLabel="PREMIUM PLAN"
        price="$50"
        billingInfo={
          <>
            <p>Per Week</p>
            <p>Billed Annually</p>
          </>
        }
        description="Designed for teams who need advanced collaboration and premium support."
        imageSrc="/home/demolition-work.jpg"
      />

      <PricingCard
        topLabel="ENTERPRISE PLAN"
        price="$100"
        billingInfo={
          <>
            <p>Per Month</p>
            <p>Billed Annually</p>
          </>
        }
        description="A comprehensive package for enterprises requiring tailored solutions."
        imageSrc="/home/foundation-excavation.jpg"
      />
    </div>
    </div>
  );
}