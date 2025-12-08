{**
 * SealMetrics - Header Template
 * Loads the main tracking script and fires pageview event
 *}
<script>
(function() {
    window.sealmetricsTrack = window.sealmetricsTrack || [];
    window.sealmetricsDebug = {$sealmetrics_debug nofilter};
    window.sealmetricsLoaded = false;
    window.sealmetricsPageviewSent = false;

    function smLog(message, data) {
        if (window.sealmetricsDebug && console && console.log) {
            console.log('[SealMetrics]', message, data || '');
        }
    }

    window.smLog = smLog;

    function processQueue() {
        if (typeof sealmetrics !== 'undefined' && typeof sealmetrics.track === 'function') {
            while (window.sealmetricsTrack.length > 0) {
                var event = window.sealmetricsTrack.shift();
                smLog('Processing event:', event);
                sealmetrics.track(event);
            }
        }
    }

    var originalPush = window.sealmetricsTrack.push;
    window.sealmetricsTrack.push = function() {
        var result = originalPush.apply(this, arguments);
        if (window.sealmetricsLoaded) {
            processQueue();
        }
        return result;
    };

    var script = document.createElement('script');
    script.src = 'https://cdn.sealmetrics.com/{$sealmetrics_account_id|escape:'javascript':'UTF-8'}/sm.js';
    script.async = true;
    script.onload = function() {
        window.sealmetricsLoaded = true;
        smLog('Script loaded');
        processQueue();
    };
    script.onerror = function() {
        smLog('Failed to load SealMetrics script');
    };
    document.head.appendChild(script);

    // Fire pageview immediately
    if (!window.sealmetricsPageviewSent) {
        window.sealmetricsPageviewSent = true;
        var event = {
            event: 'pageview',
            use_session: 1
        };
        smLog('Queueing pageview:', event);
        window.sealmetricsTrack.push(event);
    }
})();
</script>
