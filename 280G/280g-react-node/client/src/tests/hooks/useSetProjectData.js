import { useSetCompanyTestData } from './useSetCompanyTestData';
import { useSetExecutiveIds } from './useSetExecutiveIds';
import { useSetExecutiveTestData } from './useSetExecutiveTestData';
import { useSetCompensationTestData } from './useSetCompensationTestData';
import { useSetNonEquityPaymentIds } from './useSetNonEquityPaymentIds';
import { useSetNonEquityPaymentTestData } from './useSetNonEquityPaymentTestData';
import { useSetGrantIds } from './useSetGrantIds';
import { useSetEquityGrantTestData } from './useSetEquityGrantTestData';
import { useSetVestingScheduleTestData } from './useSetVestingScheduleTestData';

export const useSetProjectData = (company, executiveIds, executives, compensation, nonEquityPayments, grants, vesting) => {

  const loadingCompany = useSetCompanyTestData(company);
  const loadingExecutiveIds = useSetExecutiveIds(executiveIds);
  const loadingExecutive0 = useSetExecutiveTestData(executives[0]);
  const loadingExecutive1 = useSetExecutiveTestData(executives[1]);
  const loadingCompensation0 = useSetCompensationTestData(compensation[0]);
  const loadingCompensation1 = useSetCompensationTestData(compensation[1]);
  const loadingNonEquityPaymentIds0 = useSetNonEquityPaymentIds(nonEquityPayments[0]);
  const loadingNonEquityPaymentIds1 = useSetNonEquityPaymentIds(nonEquityPayments[1]);
  const loadingNonEquityPayments2 = useSetNonEquityPaymentTestData(nonEquityPayments[2]);
  const loadingNonEquityPayments3 = useSetNonEquityPaymentTestData(nonEquityPayments[3]);
  const loadingNonEquityPayments4 = useSetNonEquityPaymentTestData(nonEquityPayments[4]);
  const loadingNonEquityPayments5 = useSetNonEquityPaymentTestData(nonEquityPayments[5]);
  const loadingGrantIds0 = useSetGrantIds(grants[0]);
  const loadingGrantIds1 = useSetGrantIds(grants[1]);
  const loadingGrant2 = useSetEquityGrantTestData(grants[2]);
  const loadingGrant3 = useSetEquityGrantTestData(grants[3]);
  const loadingGrant4 = useSetEquityGrantTestData(grants[4]);
  const loadingGrant5 = useSetEquityGrantTestData(grants[5]);
  const loadingVesting2 = useSetVestingScheduleTestData(vesting[2]);
  const loadingVesting3 = useSetVestingScheduleTestData(vesting[3]);
  const loadingVesting4 = useSetVestingScheduleTestData(vesting[4]);
  const loadingVesting5 = useSetVestingScheduleTestData(vesting[5]);

  return loadingCompany ||
         loadingExecutiveIds ||
         loadingExecutive0 ||
         loadingExecutive1 ||
         loadingCompensation0 ||
         loadingCompensation1 ||
         loadingNonEquityPaymentIds0 ||
         loadingNonEquityPaymentIds1 ||
         loadingNonEquityPayments2 ||
         loadingNonEquityPayments3 ||
         loadingNonEquityPayments4 ||
         loadingNonEquityPayments5 ||
         loadingGrantIds0 ||
         loadingGrantIds1 ||
         loadingGrant2 ||
         loadingGrant3 ||
         loadingGrant4 ||
         loadingGrant5 ||
         loadingVesting2 ||
         loadingVesting3 ||
         loadingVesting4 ||
         loadingVesting5;

};