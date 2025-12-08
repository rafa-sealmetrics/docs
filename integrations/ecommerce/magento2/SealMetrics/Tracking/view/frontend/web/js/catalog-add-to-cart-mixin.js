/**
 * SealMetrics Tracking Module for Magento 2
 * Mixin for catalog add-to-cart widget to track add-to-cart events
 */
define([
    'jquery',
    'mage/utils/wrapper'
], function($, wrapper) {
    'use strict';

    return function(targetWidget) {
        $.widget('mage.catalogAddToCart', targetWidget, {
            /**
             * Override submitForm to track add-to-cart
             */
            submitForm: function(form) {
                var self = this;

                // Get product data before submission
                var $form = $(form);
                var productData = this._getProductData($form);

                // Track add-to-cart event
                if (productData && window.sealmetricsTrack) {
                    var attributeMap = window.sealmetricsAttributeMap || {};

                    // Normalize attribute names
                    var normalizedAttrs = {};
                    $.each(productData.attributes, function(key, value) {
                        var normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
                        if (attributeMap[normalizedKey]) {
                            normalizedKey = attributeMap[normalizedKey];
                        }
                        normalizedAttrs[normalizedKey] = value;
                    });

                    var properties = $.extend({sku: productData.sku}, normalizedAttrs);

                    // Filter empty values
                    $.each(properties, function(key, value) {
                        if (!value) {
                            delete properties[key];
                        }
                    });

                    var event = {
                        event: 'microconversion',
                        label: 'add-to-cart',
                        amount: productData.price * productData.qty,
                        properties: properties
                    };

                    if (window.smLog) {
                        window.smLog('Queueing add-to-cart (mixin):', event);
                    }

                    window.sealmetricsTrack.push(event);
                }

                // Call original method
                return this._super(form);
            },

            /**
             * Get product data from form
             */
            _getProductData: function($form) {
                var data = {
                    sku: '',
                    price: 0,
                    qty: 1,
                    attributes: {}
                };

                // Get quantity
                var qtyInput = $form.find('input[name="qty"]');
                if (qtyInput.length) {
                    data.qty = parseInt(qtyInput.val(), 10) || 1;
                }

                // Get SKU from sealmetrics product data (set by product_view template)
                if (window.sealmetricsProductData) {
                    data.sku = window.sealmetricsProductData.properties.sku || '';
                    data.price = window.sealmetricsProductData.price || 0;
                    data.attributes = window.sealmetricsProductData.properties || {};
                    delete data.attributes.sku;
                }

                // Try to get selected options
                $form.find('select.super-attribute-select, [data-role="swatch-options"] select').each(function() {
                    var $select = $(this);
                    var label = $select.closest('.swatch-attribute, .field').find('label, .swatch-attribute-label').text() || '';
                    var value = $select.find('option:selected').text() || '';

                    if (label && value) {
                        label = label.replace('*', '').replace(':', '').trim();
                        data.attributes[label] = value.trim();
                    }
                });

                // Get swatch selections
                $('.swatch-attribute').each(function() {
                    var $attr = $(this);
                    var label = $attr.find('.swatch-attribute-label').text() || '';
                    var $selected = $attr.find('.swatch-option.selected');
                    var value = $selected.attr('data-option-label') ||
                               $selected.attr('aria-label') ||
                               $selected.attr('title') || '';

                    if (label && value) {
                        label = label.replace('*', '').replace(':', '').trim();
                        data.attributes[label] = value.trim();
                    }
                });

                return data;
            }
        });

        return $.mage.catalogAddToCart;
    };
});
