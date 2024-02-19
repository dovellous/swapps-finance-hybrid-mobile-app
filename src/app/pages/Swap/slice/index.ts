import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { swappsFinanceSaga } from './saga';
import { SwappsFinanceState, SwappsFinanceErrorType } from './types';
import { SpicyToken } from 'types/SpicyToken';
import {
  SingleTokenBalanceRequest,
  SwapPair,
  SwapParameters,
  TokenBalanceRequest,
  TokenBalanceResponse,
  UserSwapParameters,
} from 'types/Swap';
import { SpicyPool, SpicyPoolMetric } from 'types/SpicyPool';
import { defaultFrom, defaultTo } from 'app/common/const';
import { Transaction, TransactionStatus } from 'types/transaction';
import toast from 'react-hot-toast';
import { toastConfig } from 'app/common/toast';

export const initialState: SwappsFinanceState = {
  tokens: [],
  pools: [],
  txLog: [],
  poolMetrics: null,
  loading: false,
  error: null,
  fromAmount: 0,
  fromAmountUsd: 0,
  toAmount: 0,
  toAmountUsd: 0,
  swap: null,
  swapping: false,
  pair: { from: defaultFrom, to: defaultTo },
  userBalance: [],
};

const slice = createSlice({
  name: 'swappsFinance',
  initialState,
  reducers: {
    setPair(state, action: PayloadAction<SwapPair>) {
      state.pair = action.payload;
    },
    setSwapParameters(state, action: PayloadAction<SwapParameters>) {
      state.swap = action.payload;
    },
    setFromAmount(state, action: PayloadAction<number>) {
      state.fromAmount = action.payload;
    },
    setToAmount(state, action: PayloadAction<number>) {
      state.toAmount = action.payload;
    },
    loadPools(state) {
      state.loading = true;
      state.error = null;
    },
    poolsLoaded(state, action: PayloadAction<SpicyPool[]>) {
      const pools = action.payload;
      state.pools = pools;
      state.loading = false;
    },
    poolsError(state, action: PayloadAction<SwappsFinanceErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadPoolMetrics(state, action: PayloadAction<number>) {
      state.error = null;
    },
    poolMetricsLoaded(state, action: PayloadAction<SpicyPoolMetric[]>) {
      const metrics = action.payload;
      state.poolMetrics = metrics;
    },
    poolMetricsError(state, action: PayloadAction<SwappsFinanceErrorType>) {
      state.error = action.payload;
    },
    setTokens(state, action: PayloadAction<SpicyToken[]>) {
      state.tokens = action.payload;
    },
    loadTokens(state) {
      state.loading = true;
      state.error = null;
      state.tokens = [];
    },
    tokensLoaded(state, action: PayloadAction<SpicyToken[]>) {
      const tokens = action.payload;
      state.tokens = tokens;
      state.loading = false;
    },
    tokensError(state, action: PayloadAction<SwappsFinanceErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    getTokenBalance(state, action: PayloadAction<TokenBalanceRequest>) {},
    getSingleTokenBalance(
      state,
      action: PayloadAction<SingleTokenBalanceRequest>,
    ) {},
    setUserTokenBalance(state, action: PayloadAction<TokenBalanceResponse>) {
      const prevBalance = state.userBalance.findIndex(
        b => b.token?.symbol === action.payload.token?.symbol,
      );

      if (prevBalance !== -1) {
        state.userBalance[prevBalance] = action.payload;
      } else {
        state.userBalance = [...state.userBalance, action.payload];
      }
    },
    clearUserTokenBalance(state) {
      state.userBalance = [];
    },
    executeSwap(state, action: PayloadAction<UserSwapParameters>) {
      state.swapping = true;
    },
    executeTezSwap(state, action: PayloadAction<UserSwapParameters>) {
      state.swapping = true;
    },
    executeSwapToTez(state, action: PayloadAction<UserSwapParameters>) {
      state.swapping = true;
    },
    executeWtzWrap(state, action: PayloadAction<UserSwapParameters>) {
      state.swapping = true;
    },
    transactionUpdate(state, action: PayloadAction<Transaction>) {
      action.payload.status === TransactionStatus.CONFIRMED
        ? toast.success('Swap confirmed!', {
            ...toastConfig,
            icon: '🐸',
          })
        : toast.error('Swap failed. Please try again.', {
            ...toastConfig,
          });

      state.swapping = false;
      state.txLog.push(action.payload);
    },
  },
});

export const { actions: swappsFinanceActions, reducer } = slice;

export const useSwappsFinanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: swappsFinanceSaga });
  return { actions: slice.actions };
};
