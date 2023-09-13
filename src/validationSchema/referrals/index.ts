import * as yup from 'yup';

export const referralValidationSchema = yup.object().shape({
  referral_link: yup.string().required(),
  sign_ups: yup.number().integer().required(),
  purchases: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
