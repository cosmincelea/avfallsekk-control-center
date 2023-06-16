import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  themeReducer,
  rtlReducer,
  customizerReducer,
  newOrderTableReducer,
  sidebarReducer,
  authReducer,
  roundBordersReducer,
  blocksShadowsReducer,
  ordersReducer,
  cryptoTrendsReducer,
  globalQuotesReducer,
  quotesBySymbolReducer,
  topTenReducer,
  cryptoHistoryReducer,
} from '@/redux/reducers/index';
import appConfigReducer from '@/redux/reducers/appConfigReducer';
import covidReducer from '../Maps/VectorMapWithRequestData/redux/covidReducer';
import todoReducer from '../Todo/redux/reducer';
import zipZonesReducer from '../../redux/reducers/zipZonesReducer';

const reducer = combineReducers({
  theme: themeReducer,
  rtl: rtlReducer,
  border: roundBordersReducer,
  shadow: blocksShadowsReducer,
  appConfig: appConfigReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
  sidebar: sidebarReducer,
  user: authReducer,
  covid: covidReducer,
  todo: todoReducer,
  orders: ordersReducer,
  zip_zones: zipZonesReducer,
  cryptoTrends: cryptoTrendsReducer,
  globalQuotes: globalQuotesReducer,
  quotesBySymbol: quotesBySymbolReducer,
  topTen: topTenReducer,
  cryptoHistory: cryptoHistoryReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
