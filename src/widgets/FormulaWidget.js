import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSourceById } from '../redux/cartoSlice';
import { WrapperWidgetUI, FormulaWidgetUI } from '../ui';
import { getFormula } from './models';

export default function FormulaWidget(props) {
  const [formulaData, setFormulaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const { data, credentials, filters } = source;

  useEffect(() => {
    const abortController = new AbortController();

    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewport))
    ) {
      setLoading(true);
      getFormula({
        ...props,
        data,
        filters,
        credentials,
        viewport,
        opts: { abortController },
      })
        .then((data) => {
          data && data[0] && setFormulaData(data[0].value);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;
          if (props.onError) props.onError(error);
        });
    } else {
      setFormulaData(undefined);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, data, filters, viewport, props]);

  return (
    <WrapperWidgetUI title={props.title} expandable={true} loading={loading}>
      <FormulaWidgetUI data={formulaData} formatter={props.formatter} unitBefore={true} />
    </WrapperWidgetUI>
  );
}