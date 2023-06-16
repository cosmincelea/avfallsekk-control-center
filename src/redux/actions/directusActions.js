import { createAction } from "redux-actions";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { fetchOrders } from "./wcAPI";

export const fetchZipZonesRequest = createAction('FETCH_ORDERS_REQUEST');
export const fetchZipZonesSuccess = createAction('FETCH_ORDERS_SUCCESS');
export const fetchZipZonesError = createAction('FETCH_ORDERS_ERROR');

const client = new ApolloClient({
  link: new createHttpLink(
    {
      uri: "http://localhost:8055/graphql"
    }
  ),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors'
  }
});

export const fetchZipZones = count => async (dispatch) => {
  dispatch(fetchZipZonesRequest)

  try {

    var ranges = []
    var results = [{ 'range_id': 'no_zone', 'range_name': 'No Zone', 'range_min': null, 'range_max': null, 'orders': [] }]

    await client
      .query({
        query: gql`
        query {
          pickup_zones {
            zip_range
            range_name
            id
          }
        }
      `,
      })
      .then((result) => { ranges = result });

    ranges?.data?.pickup_zones?.forEach(element => {
      const zip_ranges = element.zip_range.split("-")
      results.push({ 'range_id': element.id, 'range_name': element.range_name, 'range_min': parseInt(zip_ranges[0]), 'range_max': parseInt(zip_ranges[1]), 'orders': [] })
    });

    const wcOrders = await fetchOrders()

    wcOrders.forEach(function (element) {
      var standardSekk = 0;
      var storSekk = 0;

      element.line_items.forEach(function (product) {

        if (product.name === "Standard sekk") {
          standardSekk += 1
        } else if (product.name === "Stor sekk") {
          storSekk += 1
        }

      })

      element.stor_sekk = storSekk;
      element.standard_sekk = standardSekk;

      const order_type = element.meta_data.filter(function (el) {
        return el.key === '_order_type'
      })[0]?.value

      if (order_type === "waste") {
        element.total = element.total + " kr"

        element.henting_address = element.meta_data.filter(function (el) {
          return el.key === '_henting_address'
        })[0]?.value;

        element.henting_city = element.meta_data.filter(function (el) {
          return el.key === '_henting_city'
        })[0]?.value;

        element.henting_dato = element.meta_data.filter(function (el) {
          return el.key === '_henting_dato'
        })[0]?.value;

        element.henting_postcode = element.meta_data.filter(function (el) {
          return el.key === '_henting_postcode'
        })[0]?.value;

        element.henting_address_1 = element.meta_data.filter(function (el) {
          return el.key === '_henting_address_1'
        })[0]?.value;

        const i = results.findIndex(range => parseInt(element.henting_postcode) >= range.range_min && parseInt(element.henting_postcode) <= range.range_max)

        if (i === -1) {
          results[0].orders.push(element)
        } else {
          results[i].orders.push(element)
        }
      }

    });
    dispatch(fetchZipZonesSuccess(results))

  } catch (e) {
    dispatch(fetchZipZonesError());
  }
};

