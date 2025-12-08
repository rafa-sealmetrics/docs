/**
 * SealMetrics Tracking Module for Magento 2
 * Main tracking utility module
 */
define([
    'jquery',
    'Magento_Customer/js/customer-data'
], function($, customerData) {
    'use strict';

    return {
        /**
         * Get attribute map
         */
        getAttributeMap: function() {
            return window.sealmetricsAttributeMap || {};
        },

        /**
         * Normalize attribute name
         */
        normalizeAttributeName: function(name) {
            var map = this.getAttributeMap();
            name = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (map[name]) {
                return map[name];
            }
            return name;
        },

        /**
         * Queue an event
         */
        track: function(eventData) {
            if (window.sealmetricsTrack) {
                if (window.smLog) {
                    window.smLog('Queueing event:', eventData);
                }
                window.sealmetricsTrack.push(eventData);
            }
        },

        /**
         * Track microconversion
         */
        trackMicroconversion: function(label, amount, properties) {
            this.track({
                event: 'microconversion',
                label: label,
                amount: amount,
                properties: properties
            });
        },

        /**
         * Track conversion
         */
        trackConversion: function(label, amount, properties) {
            this.track({
                event: 'conversion',
                label: label,
                amount: amount,
                properties: properties
            });
        },

        /**
         * Invalidate customer data section
         */
        invalidateSection: function() {
            customerData.invalidate(['sealmetrics']);
        }
    };
});
