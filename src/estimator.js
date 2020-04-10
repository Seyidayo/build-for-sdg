import { estimator } from './utils';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: estimator({ ...data }, 10),
  severeImpact: estimator({ ...data }, 50)
});

export default covid19ImpactEstimator;
