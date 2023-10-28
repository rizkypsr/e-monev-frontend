import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function useSearchParamsState(initialParams) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamsState, setParamsState] = useState(initialParams);

  // const searchParamsState = {};

  // // eslint-disable-next-line no-restricted-syntax
  // for (const [key, defaultValue] of Object.entries(initialParams)) {
  //   const acquiredSearchParam = searchParams.get(key);
  //   searchParamsState[key] = acquiredSearchParam || defaultValue;
  // }

  const setSearchParamsState = (newState) => {
    const next = {
      ...[...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      ...newState,
    };
    setSearchParams(next);
    setParamsState(next);
  };

  return [searchParamsState, setSearchParamsState];
}

export default useSearchParamsState;
