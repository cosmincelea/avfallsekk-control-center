import WcConnect from "../../containers/App/ApiConnect/WooCommerceConnect";


export function fetchOrders() {

  return new Promise((resolve, reject) => {

    WcConnect.get('orders', { status: 'processing,pending' }).then(data => { resolve(data) }).catch(error => {
      console.log(error);
    });

  });
};

