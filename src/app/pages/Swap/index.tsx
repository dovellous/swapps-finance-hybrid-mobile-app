import isEqual from 'lodash/isEqual';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { PageWrapper } from 'app/components/PageWrapper';
import { SwapWidget } from './components/SwapWidget';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { Footer } from 'app/components/Footer';
import { media } from 'styles/media';
import { useDispatch, useSelector } from 'react-redux';
import { SwapDirection, SwapPair } from 'types/Swap';
import { useSwappsFinanceSlice } from './slice';
import { useWalletSlice } from 'app/slice/wallet';
import {
  selectTokens,
  selectPools,
  selectPair,
  selectPoolMetrics,
} from './slice/selectors';
import { useEffect, useRef, useState } from 'react';
import { SpicyToken } from 'types/SpicyToken';
import { getPoolByTags } from 'utils/spicy';
import PoolChart from 'app/components/PoolChart';
import {
  LocalStorageService,
  StorageKeys,
} from 'app/services/local-storage-service';
import { selectAccount, selectConnected } from 'app/slice/wallet/selectors';

export function Swap() {
  const dispatch = useDispatch();
  const storageService = new LocalStorageService();

  const { actions } = useSwappsFinanceSlice();
  const { actions: walletActions } = useWalletSlice();

  const account = useSelector(selectAccount);
  const connected = useSelector(selectConnected);
  const tokens = useSelector(selectTokens);
  const pools = useSelector(selectPools);
  const poolMetrics = useSelector(selectPoolMetrics);
  const pair = useSelector(selectPair);

  const [modalView, setModalView] = useState(false);
  const [limitView, setLimitView] = useState(false);
  const [poolView, setPoolView] = useState(false);

  const activeSwapDir = useRef<SwapDirection>();

  const toggleLimit = (show: boolean = true) => setLimitView(show);
  const togglePool = (show: boolean = true) => setPoolView(show);

  const toggleModal = (dir?: SwapDirection) => {
    if (dir) activeSwapDir.current = dir;
    setModalView(!modalView);
  };

  const onWalletConnect = async () => {
    dispatch(walletActions.connectWallet());
  };

  const setPair = (token: SpicyToken) => {
    const swapPair: SwapPair = {
      ...pair,
      [activeSwapDir.current as string]: token,
    };
    dispatch(actions.setPair(swapPair));
  };

  useEffect(() => {
    const localSwapPair = storageService.getItem<SwapPair>(
      StorageKeys.swapPair,
    );

    if (localSwapPair) {
      dispatch(actions.setPair(localSwapPair));
    }
  }, []);

  useEffect(() => {
    const localTokenMetadata = storageService.getItem<SpicyToken[]>(
      StorageKeys.tokenMetadata,
    );

    if (tokens.length === 0) {
      if (localTokenMetadata) {
        dispatch(actions.setTokens(localTokenMetadata));
      }
      dispatch(actions.loadTokens());
    }
  }, [dispatch, actions]);

  useEffect(() => {
    // When initial state does not contain pools, call api to load pools
    if (pools.length === 0) {
      dispatch(actions.loadPools());
    }
  }, [dispatch, actions]);

  useEffect(() => {
    if (pools.length && pair && pair.from && pair.to) {
      const pool = getPoolByTags(pools, pair.from.tag, pair.to.tag);

      if (!isEqual(pool, pair.pool)) {
        dispatch(actions.setPair({ ...pair, pool }));
        storageService.setItem(StorageKeys.swapPair, { ...pair, pool });
      }

      if (pool && !poolMetrics) {
        dispatch(actions.loadPoolMetrics(pool?.pairId));
      }
    }
  }, [pair, pools, actions, dispatch]);

  useEffect(() => {
    if (!pools) return;

    const refetchPoolTimer = setInterval(
      () => dispatch(actions.loadPools()),
      20000,
    );

    return () => clearInterval(refetchPoolTimer);
  }, []);

  useEffect(() => {
    dispatch(walletActions.getActiveAccount());
  }, []);

  useEffect(() => {
    if (!connected) dispatch(actions.clearUserTokenBalance());
    else if (pair) {
      dispatch(
        actions.getTokenBalance({
          pair: { from: pair.from!, to: pair.to! },
          userAddress: account!.address,
        }),
      );
    }
  }, [connected]);

  return (
    <>
      <Helmet>
        <title>Swap</title>
        <meta
          name="description"
          content="SwappsFinance is a next-generation DEX built by Genius Contracts specifically for token-to-token swaps on Tezos. 
          SwappsFinance is governed by SalsaDAO ($sDAO)."
        />
      </Helmet>
      <Wrapper>
        <Content>
          <PoolChart
            tokens={tokens}
            pools={pools}
            metrics={poolMetrics}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
            active={poolView}
          />
          <SwapWidget
            tokens={tokens}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
            onWalletConnect={onWalletConnect}
            toggleLimit={toggleLimit}
            togglePool={togglePool}
          />
        </Content>
        <Footer />
        <Toaster />
      </Wrapper>
    </>
  );
}

const Wrapper = styled(PageWrapper)`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 20px;
  gap: 28px;
  flex-direction: column-reverse;
  align-items: center;

  ${media.medium} {
    flex-direction: row;
    align-items: initial;
  }
`;
