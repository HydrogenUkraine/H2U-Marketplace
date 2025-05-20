import { useAtom } from 'jotai';
import { fetchOraclePriceAtom, updateOraclePriceAtom } from '@/lib/jotai/oracle-actions';

export const useOracle = () => {
  const [oraclePrice, fetchOraclePrice] = useAtom(fetchOraclePriceAtom);
  const [_, updateOraclePrice] = useAtom(updateOraclePriceAtom);

  return {
    oraclePrice,
    fetchOraclePrice,
    updateOraclePrice,
  };
};