export default function RegistrationThreeValues() {
  const locationOptions = [
    { value: "Please Select" },
    {
      value: "London",
    },
    {
      value: "North East",
    },
    {
      value: "North West",
    },
    {
      value: "Yorkshire",
    },
    {
      value: "East Midlands",
    },
    {
      value: "West Midlands",
    },
    {
      value: "South East",
    },
    {
      value: "South West",
    },
    {
      value: "East of England",
    },
    {
      value: "Wales",
    },
    {
      value: "Scotland",
    },
  ];

  const distanceOptions = [
    { value: "Please Select" },
    {
      value: "0.5 Miles",
    },
    {
      value: "1 Miles",
    },
    {
      value: "2 Miles",
    },
    {
      value: "3 Miles",
    },
    {
      value: "4 Miles",
    },
    {
      value: "5 Miles",
    },
    {
      value: "6 Miles",
    },
    {
      value: "7 Miles",
    },
    {
      value: "8 Miles",
    },
    {
      value: "9 Miles",
    },
    {
      value: "10 Miles",
    },
    {
      value: "15 Miles",
    },
    {
      value: "20+ Miles",
    },
  ];

  const tierValue = [
    { value: "Please Select" },
    {
      value: "Bronze",
    },
    {
      value: "Silver",
    },
    {
      value: "Gold",
    },
    {
      value: "Platinum",
    },
  ];

  return {
    locationOptions,
    distanceOptions,
    tierValue,
  };
}
