/**
 * SealMetrics Tracking for Webflow
 *
 * Lead tracking integration with SealMetrics for Webflow sites.
 * Tracks form submissions as conversions.
 *
 * @version 1.0.0
 * @author SealMetrics
 * @license MIT
 *
 * INSTALLATION:
 * 1. Go to Webflow Project Settings > Custom Code
 * 2. Paste this script in the "Head Code" section
 * 3. Replace 'YOUR_ACCOUNT_ID' with your SealMetrics Account ID
 * 4. Optionally configure the settings below
 * 5. Publish your site
 */

(function() {
    'use strict';

    // =====================================================
    // CONFIGURATION - Edit these values
    // =====================================================
    var CONFIG = {
        // Required: Your SealMetrics Account ID
        accountId: 'YOUR_ACCOUNT_ID',

        // Enable debug mode (logs events to console)
        debugMode: false,

        // Conversion label for form submissions
        conversionLabel: 'lead',

        // Include page path in conversion properties
        trackPagePath: true,

        // Include page title in conversion properties
        trackPageTitle: true,

        // Custom form selectors (in addition to Webflow's default)
        // Add CSS selectors for any custom forms
        customFormSelectors: [
            // '.my-custom-form',
            // '#special-form'
        ],

        // Forms to exclude (CSS selectors)
        excludeFormSelectors: [
            '.w-commerce-commercecheckoutform', // Exclude Webflow e-commerce checkout
            '[data-sealmetrics-exclude]'
        ],

        // Attribute to get custom form names
        formNameAttribute: 'data-name'
    };
    // =====================================================
    // END CONFIGURATION
    // =====================================================

    // Exit if no account ID configured
    if (!CONFIG.accountId || CONFIG.accountId === 'YOUR_ACCOUNT_ID') {
        console.warn('[SealMetrics] Account ID not configured. Please set your Account ID in the CONFIG object.');
        return;
    }

    // Initialize tracking queue
    window.sealmetricsTrack = window.sealmetricsTrack || [];
    window.sealmetricsDebug = CONFIG.debugMode;
    window.sealmetricsLoaded = false;
    window.sealmetricsPageviewSent = false;

    /**
     * Debug logger
     */
    function smLog(message, data) {
        if (window.sealmetricsDebug && console && console.log) {
            console.log('[SealMetrics]', message, data || '');
        }
    }

    window.smLog = smLog;

    /**
     * Process queued events
     */
    function processQueue() {
        if (typeof sealmetrics !== 'undefined' && typeof sealmetrics.track === 'function') {
            while (window.sealmetricsTrack.length > 0) {
                var event = window.sealmetricsTrack.shift();
                smLog('Processing event:', event);
                sealmetrics.track(event);
            }
        }
    }

    // Override push to process immediately when loaded
    var originalPush = window.sealmetricsTrack.push;
    window.sealmetricsTrack.push = function() {
        var result = originalPush.apply(this, arguments);
        if (window.sealmetricsLoaded) {
            processQueue();
        }
        return result;
    };

    /**
     * Load SealMetrics script
     */
    function loadScript() {
        var script = document.createElement('script');
        script.src = 'https://cdn.sealmetrics.com/' + CONFIG.accountId + '/sm.js';
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
    }

    /**
     * Fire pageview event
     */
    function trackPageview() {
        if (!window.sealmetricsPageviewSent) {
            window.sealmetricsPageviewSent = true;
            var event = {
                event: 'pageview',
                use_session: 1
            };
            smLog('Queueing pageview:', event);
            window.sealmetricsTrack.push(event);
        }
    }

    /**
     * Get current page info
     */
    function getPageInfo() {
        var info = {};

        if (CONFIG.trackPagePath) {
            info.page_path = window.location.pathname;
        }

        if (CONFIG.trackPageTitle) {
            info.page_title = document.title || '';
        }

        return info;
    }

    /**
     * Get form name
     */
    function getFormName(form) {
        // Try data-name attribute (Webflow default)
        var name = form.getAttribute(CONFIG.formNameAttribute);
        if (name) return name;

        // Try name attribute
        name = form.getAttribute('name');
        if (name) return name;

        // Try id attribute
        name = form.getAttribute('id');
        if (name) return name;

        // Try aria-label
        name = form.getAttribute('aria-label');
        if (name) return name;

        // Default
        return 'webflow_form';
    }

    /**
     * Check if form should be excluded
     */
    function isFormExcluded(form) {
        for (var i = 0; i < CONFIG.excludeFormSelectors.length; i++) {
            try {
                if (form.matches(CONFIG.excludeFormSelectors[i])) {
                    return true;
                }
            } catch (e) {
                // Invalid selector, skip
            }
        }
        return false;
    }

    /**
     * Track lead conversion
     */
    function trackLeadConversion(formName) {
        var properties = {
            form_name: formName
        };

        // Add page info
        var pageInfo = getPageInfo();
        Object.keys(pageInfo).forEach(function(key) {
            properties[key] = pageInfo[key];
        });

        var event = {
            event: 'conversion',
            label: CONFIG.conversionLabel,
            properties: properties
        };

        smLog('Queueing lead conversion:', event);
        window.sealmetricsTrack.push(event);
    }

    // Expose globally for manual tracking
    window.sealmetricsTrackLead = trackLeadConversion;

    /**
     * Initialize form tracking
     */
    function initFormTracking() {
        // Build form selectors
        var selectors = [
            '.w-form form',           // Webflow native forms
            'form[data-name]',        // Forms with data-name attribute
        ];

        // Add custom selectors
        CONFIG.customFormSelectors.forEach(function(selector) {
            if (selector) {
                selectors.push(selector);
            }
        });

        var formSelector = selectors.join(', ');

        // ===== Method 1: Listen for Webflow form success =====
        // Webflow adds 'w-form-done' class on success
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'style' &&
                    mutation.target.classList.contains('w-form-done')) {

                    // Find the parent form wrapper
                    var formWrapper = mutation.target.closest('.w-form');
                    if (formWrapper) {
                        var form = formWrapper.querySelector('form');
                        if (form && !isFormExcluded(form)) {
                            var formName = getFormName(form);
                            smLog('Webflow form success detected:', formName);
                            trackLeadConversion(formName);
                        }
                    }
                }
            });
        });

        // Observe all success divs
        document.querySelectorAll('.w-form-done').forEach(function(successDiv) {
            observer.observe(successDiv, { attributes: true });
        });

        // ===== Method 2: Listen for form submissions =====
        document.addEventListener('submit', function(event) {
            var form = event.target;

            // Check if it's a form we should track
            if (!form.matches(formSelector)) {
                return;
            }

            // Check exclusions
            if (isFormExcluded(form)) {
                smLog('Form excluded from tracking:', form);
                return;
            }

            var formName = getFormName(form);
            smLog('Form submission detected:', formName);

            // For Webflow AJAX forms, we rely on the MutationObserver above
            // For non-AJAX forms, track on submit
            if (!form.closest('.w-form')) {
                trackLeadConversion(formName);
            }
        });

        // ===== Method 3: Listen for fetch/XHR completion (backup) =====
        (function() {
            var originalFetch = window.fetch;
            if (originalFetch) {
                window.fetch = function(url, options) {
                    var promise = originalFetch.apply(this, arguments);

                    // Check if it's a Webflow form submission
                    if (typeof url === 'string' && url.indexOf('webflow.com') !== -1) {
                        promise.then(function(response) {
                            if (response.ok) {
                                smLog('Webflow form fetch detected');
                                // The MutationObserver will handle tracking
                            }
                        }).catch(function() {});
                    }

                    return promise;
                };
            }
        })();

        smLog('Form tracking initialized');
    }

    /**
     * Initialize on DOM ready
     */
    function init() {
        loadScript();
        trackPageview();
        initFormTracking();
        smLog('SealMetrics initialized with config:', CONFIG);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
