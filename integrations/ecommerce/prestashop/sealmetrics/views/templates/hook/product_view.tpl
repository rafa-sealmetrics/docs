{**
 * SealMetrics - Product View Template
 * Fires product_view microconversion event
 *}
<script>
(function() {
    var basePrice = {$sealmetrics_product_price|floatval};
    var baseProperties = {$sealmetrics_product_properties nofilter};
    var productId = {$sealmetrics_product_id|intval};
    var availableAttributes = {$sealmetrics_available_attributes nofilter};
    var attributeMap = {$sealmetrics_attribute_map nofilter};

    // Fire initial product_view
    var event = {
        event: 'microconversion',
        label: 'product_view',
        amount: basePrice,
        properties: baseProperties
    };
    window.smLog('Queueing product_view:', event);
    window.sealmetricsTrack.push(event);

    // Store product data for add-to-cart tracking
    window.sealmetricsProductData = {
        productId: productId,
        basePrice: basePrice,
        baseProperties: baseProperties,
        availableAttributes: availableAttributes,
        attributeMap: attributeMap
    };
})();
</script>
