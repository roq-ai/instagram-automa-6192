import * as yup from 'yup';

export const pricingValidationSchema = yup.object().shape({
  package_name: yup.string().required(),
  price: yup.number().integer().required(),
  features: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
