import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createReferral } from 'apiSdk/referrals';
import { referralValidationSchema } from 'validationSchema/referrals';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { ReferralInterface } from 'interfaces/referral';

function ReferralCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReferralInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReferral(values);
      resetForm();
      router.push('/referrals');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReferralInterface>({
    initialValues: {
      referral_link: '',
      sign_ups: 0,
      purchases: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: referralValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Referrals',
              link: '/referrals',
            },
            {
              label: 'Create Referral',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Referral
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.referral_link}
            label={'Referral Link'}
            props={{
              name: 'referral_link',
              placeholder: 'Referral Link',
              value: formik.values?.referral_link,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Sign Ups"
            formControlProps={{
              id: 'sign_ups',
              isInvalid: !!formik.errors?.sign_ups,
            }}
            name="sign_ups"
            error={formik.errors?.sign_ups}
            value={formik.values?.sign_ups}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('sign_ups', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Purchases"
            formControlProps={{
              id: 'purchases',
              isInvalid: !!formik.errors?.purchases,
            }}
            name="purchases"
            error={formik.errors?.purchases}
            value={formik.values?.purchases}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('purchases', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/referrals')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'referral',
    operation: AccessOperationEnum.CREATE,
  }),
)(ReferralCreatePage);
