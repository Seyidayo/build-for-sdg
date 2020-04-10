import covid19ImpactEstimator from './estimator';

test('Estimator is a function', () => {
  expect(typeof covid19ImpactEstimator).toEqual('function');
});

test('Check the data structure', () => {
  const sample = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  console.log(covid19ImpactEstimator(sample));

  expect(covid19ImpactEstimator(sample)).toHaveProperty('data');
  expect(covid19ImpactEstimator(sample)).toHaveProperty('impact');
  expect(covid19ImpactEstimator(sample)).toHaveProperty('severeImpact');
});
