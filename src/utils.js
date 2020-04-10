// eslint-disable-next-line import/prefer-default-export
export const calculateLockDownDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'months':
      return timeToElapse * 30;
    case 'weeks':
      return timeToElapse * 7;
    default:
      return timeToElapse;
  }
};

export const calculateAvailableBeds = (totalBeds, severeCases) => {
  const available = totalBeds * 0.35;
  return Math.trunc(available - severeCases);
};

export const calculateEconomicLoss = (
  infectionsByRequestedTime,
  avgPopulationEarning,
  avgEarnings,
  lockDownDays
) => Math.trunc((infectionsByRequestedTime * avgPopulationEarning * avgEarnings)
/ lockDownDays);

export const estimator = (
  {
    region: { avgDailyIncomePopulation, avgDailyIncomeInUSD },
    periodType,
    timeToElapse,
    reportedCases,
    // population,
    totalHospitalBeds
  },
  useCaseFigure
) => {
  // Challenge 1
  const currentlyInfected = reportedCases * useCaseFigure;
  const lockDownDays = calculateLockDownDays(periodType, timeToElapse);
  const factor = Math.trunc(lockDownDays / 3);
  const infectionsByRequestedTime = Math.trunc(currentlyInfected * 2 ** factor);

  //   Challenge 2
  const severeCasesByRequestedTime = Math.trunc(
    0.15 * infectionsByRequestedTime
  );
  const hospitalBedsByRequestedTime = calculateAvailableBeds(
    totalHospitalBeds,
    severeCasesByRequestedTime
  );
  //   Challenge 3
  const casesForICUByRequestedTime = Math.trunc(
    0.05 * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * infectionsByRequestedTime
  );
  const dollarsInFlight = calculateEconomicLoss(
    infectionsByRequestedTime,
    avgDailyIncomePopulation,
    avgDailyIncomeInUSD,
    lockDownDays
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};
