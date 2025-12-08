{**
 * SealMetrics - Checkout Template
 * Fires checkout funnel microconversion events
 *}
<script>
(function() {
    var step = {$sealmetrics_checkout_step|intval};
    var amount = {$sealmetrics_checkout_amount|floatval};
    var properties = {$sealmetrics_checkout_properties nofilter};

    // Prevent duplicate events for this step
    var sentKey = 'sealmetrics_checkout' + step + '_sent';
    if (window[sentKey]) {
        return;
    }
    window[sentKey] = true;

    var event = {
        event: 'microconversion',
        label: 'checkout' + step,
        amount: amount,
        properties: properties
    };

    window.smLog('Queueing checkout' + step + ':', event);
    window.sealmetricsTrack.push(event);

    // Track checkout3 when payment method is selected
    if (step === 2) {
        var checkout3Sent = false;
        document.addEventListener('click', function(e) {
            var paymentOption = e.target.closest('.payment-option, [data-module-name]');
            if (paymentOption && !checkout3Sent) {
                checkout3Sent = true;
                var event3 = {
                    event: 'microconversion',
                    label: 'checkout3',
                    amount: amount,
                    properties: properties
                };
                window.smLog('Queueing checkout3:', event3);
                window.sealmetricsTrack.push(event3);
            }
        });

        // Also track on confirm order button
        var confirmBtn = document.querySelector('#payment-confirmation button, .js-payment-confirmation');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                if (!checkout3Sent) {
                    checkout3Sent = true;
                    var event3 = {
                        event: 'microconversion',
                        label: 'checkout3',
                        amount: amount,
                        properties: properties
                    };
                    window.smLog('Queueing checkout3:', event3);
                    window.sealmetricsTrack.push(event3);
                }
            });
        }
    }
})();
</script>
