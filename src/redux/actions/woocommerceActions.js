import { createAction } from "redux-actions";
import WcConnect from "../../containers/App/ApiConnect/WooCommerceConnect";

export const fetchOrdersRequest = createAction('FETCH_ORDERS_REQUEST');
export const fetchOrdersSuccess = createAction('FETCH_ORDERS_SUCCESS');
export const fetchOrdersError = createAction('FETCH_ORDERS_ERROR');

export const fetchOrders = count => async (dispatch) => {
  try {
    dispatch(fetchOrdersRequest());
    const results = await WcConnect.get('orders', { status: 'processing,pending' })
    dispatch(fetchOrdersSuccess(results));

  } catch (e) {
    dispatch(fetchOrdersError());
  }
};
