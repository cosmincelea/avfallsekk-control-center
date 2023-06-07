import WooCommerceAPI from 'react-native-woocommerce-api';

const WcConnect = new WooCommerceAPI({
  url: 'https://www.avfallsekk.no', // Your store URL
  ssl: true,
  consumerKey: 'ck_327c31385a0b0a5a712ca0be2dcbc096124768cd', // Your consumer secret
  consumerSecret: 'cs_5ef7893c7da142fc22d61c1667be5b045d34138c', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});

export default WcConnect