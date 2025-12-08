/**
 * SealMetrics - Add to Cart Tracking
 * Handles add-to-cart event tracking for PrestaShop
 */
(function() {
    'use strict';

    var attributeMap = window.sealmetricsAttributeMap || {};

    /**
     * Normalize attribute name using the central map
     */
    function normalizeAttributeName(name) {
        name = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (attributeMap[name]) {
            return attributeMap[name];
        }
        return name;
    }

    /**
     * Get selected attributes from product page
     */
    function getSelectedAttributes() {
        var attrs = {};

        // PrestaShop 1.7+ uses product-variants
        var selects = document.querySelectorAll('.product-variants select, #add-to-cart-or-refresh select');
        selects.forEach(function(select) {
            var groupName = select.closest('.product-variants-item, .form-group')?.querySelector('label, .control-label')?.textContent || '';
            var value = select.options[select.selectedIndex]?.text || '';

            if (groupName && value) {
                groupName = groupName.replace(':', '').trim();
                var normalizedName = normalizeAttributeName(groupName);
                attrs[normalizedName] = value.trim();
            }
        });

        // Also check radio buttons
        var radios = document.querySelectorAll('.product-variants input[type="radio"]:checked, #add-to-cart-or-refresh input[type="radio"]:checked');
        radios.forEach(function(radio) {
            var groupName = radio.closest('.product-variants-item, .form-group')?.querySelector('label, .control-label')?.textContent || '';
            var labelEl = document.querySelector('label[for="' + radio.id + '"]');
            var value = labelEl ? labelEl.textContent.trim() : radio.value;

            if (groupName && value) {
                groupName = groupName.replace(':', '').trim();
                var normalizedName = normalizeAttributeName(groupName);
                attrs[normalizedName] = value.trim();
            }
        });

        // Check color/image swatches
        var swatches = document.querySelectorAll('.product-variants .color:checked, .product-variants .input-color:checked');
        swatches.forEach(function(swatch) {
            var groupName = swatch.closest('.product-variants-item')?.querySelector('.control-label')?.textContent || '';
            var value = swatch.getAttribute('title') || swatch.value;

            if (groupName && value) {
                groupName = groupName.replace(':', '').trim();
                var normalizedName = normalizeAttributeName(groupName);
                attrs[normalizedName] = value.trim();
            }
        });

        return attrs;
    }

    /**
     * Get current quantity
     */
    function getQuantity() {
        var qtyInput = document.querySelector('#quantity_wanted, input[name="qty"], input.qty');
        return qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
    }

    /**
     * Get current price from page
     */
    function getCurrentPrice() {
        // Try to get price from PrestaShop's prestashop object
        if (window.prestashop && window.prestashop.product && window.prestashop.product.price_tax_excl) {
            return parseFloat(window.prestashop.product.price_tax_excl);
        }

        // Try from product data stored by product_view
        if (window.sealmetricsProductData && window.sealmetricsProductData.basePrice) {
            return window.sealmetricsProductData.basePrice;
        }

        // Fallback: parse from displayed price
        var priceEl = document.querySelector('.current-price-value, .product-price, [itemprop="price"]');
        if (priceEl) {
            var priceText = priceEl.getAttribute('content') || priceEl.textContent;
            var price = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
            if (!isNaN(price)) {
                return price;
            }
        }

        return 0;
    }

    /**
     * Get current SKU
     */
    function getCurrentSku() {
        // Try from product data
        if (window.sealmetricsProductData && window.sealmetricsProductData.baseProperties && window.sealmetricsProductData.baseProperties.sku) {
            return window.sealmetricsProductData.baseProperties.sku;
        }

        // Try from page
        var skuEl = document.querySelector('.product-reference span, [itemprop="sku"]');
        if (skuEl) {
            return skuEl.textContent.trim();
        }

        return '';
    }

    /**
     * Track add to cart event
     */
    function trackAddToCart() {
        var qty = getQuantity();
        var price = getCurrentPrice();
        var sku = getCurrentSku();
        var attrs = getSelectedAttributes();

        var properties = Object.assign({ sku: sku }, attrs);

        // Filter empty values
        Object.keys(properties).forEach(function(key) {
            if (!properties[key]) {
                delete properties[key];
            }
        });

        var event = {
            event: 'microconversion',
            label: 'add-to-cart',
            amount: price * qty,
            properties: properties
        };

        if (window.smLog) {
            window.smLog('Queueing add-to-cart:', event);
        }

        if (window.sealmetricsTrack) {
            window.sealmetricsTrack.push(event);
        }
    }

    /**
     * Initialize tracking
     */
    function init() {
        // Track on add to cart button click
        document.addEventListener('click', function(e) {
            var addToCartBtn = e.target.closest('.add-to-cart, [data-button-action="add-to-cart"], #add-to-cart-or-refresh button[type="submit"]');
            if (addToCartBtn) {
                // Small delay to ensure form values are captured
                setTimeout(trackAddToCart, 50);
            }
        });

        // Also listen for PrestaShop's custom event
        if (window.prestashop) {
            prestashop.on('updateCart', function(event) {
                if (event && event.reason && event.reason.idProduct) {
                    // Cart was updated with a product
                    // This fires after AJAX add to cart
                }
            });
        }

        // Track AJAX add to cart for listing pages
        document.addEventListener('click', function(e) {
            var quickAddBtn = e.target.closest('.ajax_add_to_cart_button, .add-to-cart-listing');
            if (quickAddBtn) {
                var productCard = quickAddBtn.closest('.product-miniature, .product-item, article');
                if (productCard) {
                    var sku = productCard.querySelector('[data-id-product]')?.getAttribute('data-id-product') || '';
                    var priceEl = productCard.querySelector('.price, .product-price');
                    var price = 0;

                    if (priceEl) {
                        price = parseFloat(priceEl.textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
                    }

                    var event = {
                        event: 'microconversion',
                        label: 'add-to-cart',
                        amount: price,
                        properties: {
                            sku: sku ? 'PROD-' + sku : ''
                        }
                    };

                    if (window.smLog) {
                        window.smLog('Queueing add-to-cart (listing):', event);
                    }

                    if (window.sealmetricsTrack) {
                        window.sealmetricsTrack.push(event);
                    }
                }
            }
        });
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
