/**
 * SealMetrics Tracking Module for Magento 2
 * RequireJS Configuration
 */
var config = {
    map: {
        '*': {
            'sealmetricsTracking': 'SealMetrics_Tracking/js/tracking',
            'sealmetricsCart': 'SealMetrics_Tracking/js/cart-tracking'
        }
    },
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'SealMetrics_Tracking/js/catalog-add-to-cart-mixin': true
            }
        }
    }
};
