{**
 * SealMetrics - Purchase Template
 * Fires purchase conversion event
 *}
<script>
(function() {
    var amount = {$sealmetrics_purchase_amount|floatval};
    var properties = {$sealmetrics_purchase_properties nofilter};

    var event = {
        event: 'conversion',
        label: 'purchase',
        amount: amount,
        properties: properties
    };

    window.smLog('Queueing purchase:', event);
    window.sealmetricsTrack.push(event);
})();
</script>
