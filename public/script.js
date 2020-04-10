// eslint-disable-next-line import/extensions
import covid19ImpactEstimator from '../src/estimator.js';

const form = document.querySelector('form');
const display = document.querySelector('article');
// const submitButton = form.querySelector('[data-goestimate]');

const getValuesFromFields = () => ({
  region: {
    name: form.querySelector('[data-region-name]').value,
    avgAge: Number(form.querySelector('[data-avg-age]').value),
    avgDailyIncomeInUSD: Number(
      form.querySelector('[data-avg-daily-income-usd]').value
    ),
    avgDailyIncomePopulation: Number(
      form.querySelector('[data-avg-daily-income-population]').value
    )
  },
  population: Number(form.querySelector('[data-population]').value),
  timeToElapse: Number(form.querySelector('[data-time-to-elapse]').value),
  reportedCases: Number(form.querySelector('[data-reported-cases').value),
  totalHospitalBeds: Number(
    form.querySelector('[data-total-hospital-beds]').value
  ),
  periodType: form.querySelector('[data-period-type]').value
});

const setFieldsFromValues = ({ impact, severeImpact }) => {
  // Setting Impact
  document.querySelector('[data-impact-currently-infected]').value =
    impact.currentlyInfected;
  document.querySelector('[data-impact-infection]').value =
    impact.infectionsByRequestedTime;
  document.querySelector('[data-impact-severe-cases ]').value =
    impact.severeCasesByRequestedTime;
  document.querySelector('[data-impact-available-beds]').value =
    impact.hospitalBedsByRequestedTime;
  document.querySelector('[data-impact-icu-cases]').value =
    impact.casesForICUByRequestedTime;
  document.querySelector('[data-impact-ventilator-cases]').value =
    impact.casesForVentilatorsByRequestedTime;
  document.querySelector('[data-impact-dollar-inFlight]').value =
    impact.dollarsInFlight;

  // Setting Severe Impact
  document.querySelector('[data-severe-impact-currently-infected]').value =
    severeImpact.currentlyInfected;
  document.querySelector('[data-severe-impact-infection]').value =
    severeImpact.infectionsByRequestedTime;
  document.querySelector('[data-severe-impact-severe-cases ]').value =
    severeImpact.severeCasesByRequestedTime;
  document.querySelector('[data-severe-impact-available-beds]').value =
    severeImpact.hospitalBedsByRequestedTime;
  document.querySelector('[data-severe-impact-icu-cases]').value =
    severeImpact.casesForICUByRequestedTime;
  document.querySelector('[data-severe-impact-ventilator-cases]').value =
    severeImpact.casesForVentilatorsByRequestedTime;
  document.querySelector('[data-severe-impact-dollar-inFlight]').value =
    severeImpact.dollarsInFlight;
};

function predict(event) {
  event.preventDefault();
  const data = getValuesFromFields();
  const estimation = covid19ImpactEstimator(data);
  setFieldsFromValues(estimation);
  display.classList.remove('hide');
}

form.addEventListener('submit', predict);
