import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.swappsFinance || initialState;

export const selectTokens = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.tokens,
);

export const selectPools = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.pools,
);

export const selectPoolMetrics = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.poolMetrics,
);

export const selectLoading = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.error,
);

export const selectPair = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.pair,
);

export const selectSwapParameters = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.swap,
);

export const selectFromAmount = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.fromAmount,
);

export const selectToAmount = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.toAmount,
);

export const selectIsSwapping = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.swapping,
);

export const selectUserBalance = createSelector(
  [selectDomain],
  swappsFinanceState => swappsFinanceState.userBalance,
);
