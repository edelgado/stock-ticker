import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Styled } from 'direflow-component';
import styles from './Ticker.css';

const getData = (symbol, setHandler) => {
  fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=${symbol}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": ""
    }
  })
    .then(response => response.json())
    .then(data => {
      setHandler(data);
      // setTimeout(() => getData(symbol, setHandler), 5000);
    })
    .catch(err => {
      console.log(err);
    });
};

const Ticker = (props) => {
  const { symbol } = props;
  const [data, setData] = useState(null);

  /*
  {
    price : {
      regularMarketOpen: {
        fmt: "805.00"
      },
      regularMarketPrice: {
        fmt: "778.60"
      },
      regularMarketChange: {
        raw: 34.6780,
        fmt: "34.70"
      },
      regularMarketChangePercent: {
        fmt: "4.67%"
      },
      regularMarketPreviousClose: {
        fmt: "743.62"
      },
      currencySymbol: "$",
      symbol: "TSLA",
      shortName: 'Tesla, Inc.',
    }
  }
  */

  useEffect(() => {
    if (symbol) {
      getData(symbol, setData);
    }
    // const intervalId = setInterval(() => getData(symbol, setData), 10000);
    // return () => clearInterval(intervalId);
  }, [symbol]);

  return (
    <Styled styles={styles}>
      <div>
        {!data &&
        <div className="round_regular color-bg_night padding-regular">
          <div className="placeholder font-type_neat color_ash font-size_x-small text-align_center">Loading...</div>
        </div>
        }
        {data &&
        <div
          className={`round_regular ${(data.price.regularMarketChange.raw) > 0 ? 'color-bg_pine' : 'color-bg_canyon'} padding-regular`}>
          <div className="font-size_large font-type_terminator font-size_large color_ash text-align_right">{data.price.symbol}</div>
          <div className="font-type_chill color_fog font-size_small text-align_right">{data.price.shortName}</div>
          <div className="font-size_large font-type_terminator font-size_large color_ash">{data.price.currencySymbol}{data.price.regularMarketPrice.fmt}</div>
          <div className="font-type_neat color_ash font-size_small text-align_right margin-bottom_small">{data.price.regularMarketChange.fmt} ({data.price.regularMarketChangePercent.fmt})</div>
          <div className="font-type_neat font-size_x-small color_fog text-align_right">Previous Close: {data.price.currencySymbol}{data.price.regularMarketPreviousClose.fmt}</div>
        </div>
        }
      </div>
    </Styled>
  )
};

Ticker.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export default Ticker;
