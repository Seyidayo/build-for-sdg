// eslint-disable-next-line import/extensions
import { estimator } from './utils.js';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: estimator({ ...data }, 10),
  severeImpact: estimator({ ...data }, 50)
});

export default covid19ImpactEstimator;
