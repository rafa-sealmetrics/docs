/**
 * SealMetrics Tracking Module for Magento 2
 * Cart tracking handler for AJAX add-to-cart on listing pages
 */
define([
    'jquery',
    'sealmetricsTracking'
], function($, sealmetricsTracking) {
    'use strict';

    return function(config) {
        var attributeMap = sealmetricsTracking.getAttributeMap();

        /**
         * Get price from product card
         */
        function getPriceFromCard($card) {
            var priceEl = $card.find('.price-wrapper [data-price-amount], .price-box .price');
            var price = 0;

            if (priceEl.length) {
                var priceAttr = priceEl.attr('data-price-amount');
                if (priceAttr) {
                    price = parseFloat(priceAttr);
                } else {
                    var priceText = priceEl.text().replace(/[^0-9.,]/g, '').replace(',', '.');
                    price = parseFloat(priceText) || 0;
                }
            }

            return price;
        }

        /**
         * Get SKU from product card or form
         */
        function getSkuFromCard($card) {
            var sku = $card.find('[data-product-sku]').attr('data-product-sku') ||
                     $card.find('input[name="product"]').val() ||
                     $card.find('[data-product-id]').attr('data-product-id') || '';

            if (!sku) {
                var link = $card.find('.product-item-link, .product-item-name a').attr('href');
                if (link) {
                    // Extract product ID from URL if possible
                    var matches = link.match(/\/product\/(\d+)\//);
                    if (matches) {
                        sku = 'PROD-' + matches[1];
                    }
                }
            }

            return sku ? String(sku) : '';
        }

        // Listen for AJAX add to cart on category/listing pages
        $(document).on('click', '.tocart, .action.tocart', function(e) {
            var $button = $(this);
            var $form = $button.closest('form');
            var $card = $button.closest('.product-item, .product-item-info, .item');

            // Skip if this is on the product detail page (handled by observer)
            if ($('body').hasClass('catalog-product-view')) {
                return;
            }

            var sku = '';
            var price = 0;
            var qty = 1;

            // Try to get data from form
            if ($form.length) {
                sku = $form.find('input[name="product"]').val() || '';
                qty = parseInt($form.find('input[name="qty"]').val(), 10) || 1;
            }

            // Try to get data from card
            if ($card.length) {
                if (!sku) {
                    sku = getSkuFromCard($card);
                }
                price = getPriceFromCard($card);
            }

            // Get quantity from button data attribute
            var btnQty = $button.attr('data-qty');
            if (btnQty) {
                qty = parseInt(btnQty, 10) || 1;
            }

            if (sku || price > 0) {
                sealmetricsTracking.trackMicroconversion('add-to-cart', price * qty, {
                    sku: sku ? 'PROD-' + sku : ''
                });
            }
        });

        // Also handle add to cart via AJAX success
        $(document).ajaxComplete(function(event, xhr, settings) {
            if (settings.url && settings.url.indexOf('checkout/cart/add') !== -1) {
                // Cart was updated, invalidate section to get fresh event data
                setTimeout(function() {
                    sealmetricsTracking.invalidateSection();
                }, 100);
            }
        });
    };
});
