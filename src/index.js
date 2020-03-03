import { DireflowComponent } from 'direflow-component';
import Ticker from './ticker-component/Ticker';

const tickerComponent = new DireflowComponent();

const tickerProperties = {
  symbol: null,
};

const tickerPlugins = [
  {
    name: 'font-loader',
    options: {
      google: {
        families: ['Oxanium', 'Raleway'],
      },
    },
  },
];

tickerComponent.configure({
  name: 'rwc-ticker',
  useShadow: true,
  properties: tickerProperties,
  plugins: tickerPlugins,
});

tickerComponent.create(Ticker);
