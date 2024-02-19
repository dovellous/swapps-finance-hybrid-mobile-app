import { SwapDirection, SwapPair } from 'types/Swap';
import {
  Subtext,
  SwapSelection,
  SwapSelectionAmountInput,
  SwapSelectionArrowIcon,
  SwapSelectionAsset,
  SwapSelectionScrollIcon,
  SwapSelectionTokenIcon,
  TitleText,
} from './SwapSelection';
import { A } from 'app/components/A';
import { useSwappsFinanceSlice } from '../../slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFromAmount,
  selectToAmount,
  selectUserBalance,
} from '../../slice/selectors';
import { ChangeEvent, useEffect } from 'react';
import { getSwapAmount } from '../../util/price';
import { constructSwapParameters, switchPairDirection } from '../../util/pair';
import { handleSwapKeyPress } from './input-helper';
import { selectAccount } from 'app/slice/wallet/selectors';
interface SwapAssetSelectionProps {
  toggleModal: (dir?: SwapDirection) => void;
  pair?: SwapPair;
  showSwitch?: boolean;
}

export function SwapAssetSelection({
  toggleModal,
  pair,
  showSwitch = true,
}: SwapAssetSelectionProps) {
  const { actions } = useSwappsFinanceSlice();
  const dispatch = useDispatch();

  const fromAmount = useSelector(selectFromAmount);
  const toAmount = useSelector(selectToAmount);
  const userBalances = useSelector(selectUserBalance);
  const account = useSelector(selectAccount);

  const fromBalance =
    userBalances.find(b => b.token?.symbol === pair?.from?.symbol)?.balance ||
    0;
  const toBalance =
    userBalances.find(b => b.token?.symbol === pair?.to?.symbol)?.balance || 0;

  const handleTokenClick = (dir: SwapDirection) => {
    toggleModal(dir);
  };

  const handlePairSwitch = () => {
    if (pair) {
      const pairSwitched = switchPairDirection(pair);
      dispatch(actions.setPair(pairSwitched));
    }
  };

  const retrieveAndSetTokenBalances = (pair, userAddress) => {
    dispatch(
      actions.getTokenBalance({
        pair: { from: pair.from, to: pair.to },
        userAddress,
      }),
    );
  };

  const handleFillBalance = (dir: SwapDirection) => {
    if (dir === 'from' && fromBalance) {
      dispatch(actions.setFromAmount(fromBalance));
    }
  };

  const handleFromAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fromInputValue = Number(event.target.value);
    dispatch(actions.setFromAmount(fromInputValue));
  };

  const handleToAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const toInputValue = Number(event.target.value);
    dispatch(actions.setToAmount(toInputValue));
  };

  useEffect(() => {
    if (pair && pair.pool) {
      const { rate, toAmount, impact } = getSwapAmount({
        pair,
        fromAmount,
      });

      const swapParameters = constructSwapParameters({
        pair,
        fromAmount,
        toAmount,
        rate,
        impact,
      });

      dispatch(actions.setToAmount(Number(toAmount.toPrecision(14))));
      dispatch(actions.setSwapParameters({ ...swapParameters }));
    }
  }, [pair, fromAmount]);

  useEffect(() => {
    if (account && pair && pair.from && pair.to) {
      retrieveAndSetTokenBalances(pair, account.address);
    }
  }, [pair]);

  return (
    <>
      <SwapSelection>
        <Subtext>From</Subtext>
        <A
          onClick={() => {
            handleTokenClick('from');
          }}
        >
          <SwapSelectionAsset>
            {pair && pair.from ? (
              <>
                <SwapSelectionTokenIcon url={pair.from.img} />
                {pair.from.symbol}
              </>
            ) : (
              'Select Token'
            )}
            <SwapSelectionArrowIcon />
          </SwapSelectionAsset>
        </A>
        <TitleText
          onClick={() => {
            handleFillBalance('from');
          }}
          selectable
        >
          {`Balance: ${fromBalance}`}
        </TitleText>
        <SwapSelectionAmountInput
          type="number"
          onChange={handleFromAmountChange}
          placeholder="0.00000000"
          min={0}
          step={0.000000000001}
          maxLength={14}
          onKeyPress={handleSwapKeyPress}
          value={fromAmount || ''}
        />
      </SwapSelection>
      {showSwitch ? (
        <SwapSelectionScrollIcon onClick={handlePairSwitch} />
      ) : null}
      <SwapSelection>
        <Subtext>To</Subtext>
        <A
          onClick={() => {
            handleTokenClick('to');
          }}
        >
          <SwapSelectionAsset>
            {pair && pair.to ? (
              <>
                <SwapSelectionTokenIcon url={pair.to.img} />
                {pair.to.symbol}
              </>
            ) : (
              'Select Token'
            )}
            <SwapSelectionArrowIcon />
          </SwapSelectionAsset>
        </A>
        <TitleText>{`Balance: ${toBalance}`}</TitleText>
        <SwapSelectionAmountInput
          type="number"
          onChange={handleToAmountChange}
          min={0}
          step={0.000000000001}
          placeholder="0.00000000"
          value={toAmount || ''}
          maxLength={14}
          onInput={handleSwapKeyPress}
        />
      </SwapSelection>
    </>
  );
}
