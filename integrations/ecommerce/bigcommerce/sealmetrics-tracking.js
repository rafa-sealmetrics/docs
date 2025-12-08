/**
 * SealMetrics Tracking for BigCommerce
 *
 * Advanced e-commerce tracking integration with SealMetrics for BigCommerce stores.
 * Tracks pageviews, product views, add-to-cart, checkout funnel, and purchases.
 *
 * @version 1.0.0
 * @author SealMetrics
 * @license MIT
 *
 * INSTALLATION:
 * 1. Go to BigCommerce Admin > Storefront > Script Manager
 * 2. Click "Create a Script"
 * 3. Name: SealMetrics Tracking
 * 4. Location: Head
 * 5. Pages: All Pages
 * 6. Script type: Script
 * 7. Paste this script content
 * 8. Replace 'YOUR_ACCOUNT_ID' with your SealMetrics Account ID
 * 9. Save
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

        // Attribute normalization (same as WooCommerce/Magento/PrestaShop)
        attributeMap: {
            'color': 'colour',
            'colour': 'colour',
            'colore': 'colour',
            'couleur': 'colour',
            'farbe': 'colour',
            'talla': 'size',
            'size': 'size',
            'taille': 'size',
            'größe': 'size',
            'grosse': 'size',
            'material': 'material',
            'materiale': 'material',
            'matière': 'material',
            'peso': 'weight',
            'weight': 'weight',
            'poids': 'weight'
        }
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
     * Normalize attribute name
     */
    function normalizeAttributeName(name) {
        if (!name) return '';
        name = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (CONFIG.attributeMap[name]) {
            return CONFIG.attributeMap[name];
        }
        return name;
    }

    /**
     * Get price excluding tax (BigCommerce provides both)
     */
    function getPriceExcludingTax(priceWithTax, priceWithoutTax) {
        if (typeof priceWithoutTax === 'number' && priceWithoutTax > 0) {
            return priceWithoutTax;
        }
        if (typeof priceWithTax === 'number') {
            return priceWithTax;
        }
        return 0;
    }

    /**
     * Parse price from string
     */
    function parsePrice(priceStr) {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr) return 0;
        var cleaned = priceStr.replace(/[^0-9.,]/g, '').replace(',', '.');
        return parseFloat(cleaned) || 0;
    }

    /**
     * Get current page type
     */
    function getPageType() {
        var body = document.body;
        if (body.classList.contains('page-type-product')) return 'product';
        if (body.classList.contains('page-type-category')) return 'category';
        if (body.classList.contains('page-type-cart')) return 'cart';
        if (body.classList.contains('page-type-checkout')) return 'checkout';
        if (body.classList.contains('page-type-orderconfirmation')) return 'order_confirmation';
        if (body.classList.contains('page-type-default')) return 'home';
        return 'other';
    }

    /**
     * Get product data from BigCommerce's context
     */
    function getProductFromContext() {
        // Try to get from BCData (Stencil themes)
        if (window.BCData && window.BCData.product_attributes) {
            return window.BCData.product_attributes;
        }

        // Try jsContext (older method)
        if (window.jsContext && window.jsContext.product) {
            return window.jsContext.product;
        }

        return null;
    }

    /**
     * Extract product data from page
     */
    function extractProductData() {
        var data = {
            sku: '',
            price: 0,
            attributes: {}
        };

        // Try structured data (JSON-LD)
        var jsonLd = document.querySelector('script[type="application/ld+json"]');
        if (jsonLd) {
            try {
                var structured = JSON.parse(jsonLd.textContent);
                if (structured['@type'] === 'Product') {
                    data.sku = structured.sku || '';
                    if (structured.offers) {
                        var offers = Array.isArray(structured.offers) ? structured.offers[0] : structured.offers;
                        data.price = parsePrice(offers.price);
                    }
                }
            } catch (e) {}
        }

        // Try meta tags
        if (!data.sku) {
            var skuMeta = document.querySelector('meta[itemprop="sku"]');
            if (skuMeta) {
                data.sku = skuMeta.getAttribute('content') || '';
            }
        }

        // Try data attributes
        if (!data.sku) {
            var productEl = document.querySelector('[data-product-sku]');
            if (productEl) {
                data.sku = productEl.getAttribute('data-product-sku') || '';
            }
        }

        // Try price from page
        if (!data.price) {
            var priceEl = document.querySelector('.productView-price .price--withoutTax, .productView-price .price-value, [data-product-price-without-tax]');
            if (priceEl) {
                data.price = parsePrice(priceEl.textContent || priceEl.getAttribute('data-product-price-without-tax'));
            }
        }

        // Fallback to any price
        if (!data.price) {
            var anyPrice = document.querySelector('.productView-price .price, .price--main');
            if (anyPrice) {
                data.price = parsePrice(anyPrice.textContent);
            }
        }

        return data;
    }

    /**
     * Get selected options from product form
     */
    function getSelectedOptions() {
        var options = {};

        // Select dropdowns
        document.querySelectorAll('.productView-options select, .form-field--increments select, [data-product-option-change] select').forEach(function(select) {
            var label = '';
            var labelEl = select.closest('.form-field')?.querySelector('.form-label, label');
            if (labelEl) {
                label = labelEl.textContent.replace(/[*:]/g, '').trim();
            }
            var value = select.options[select.selectedIndex]?.text || '';

            if (label && value && value !== 'Choose an option') {
                var normalizedLabel = normalizeAttributeName(label);
                options[normalizedLabel] = value.trim();
            }
        });

        // Radio buttons
        document.querySelectorAll('.productView-options input[type="radio"]:checked, [data-product-option-change] input[type="radio"]:checked').forEach(function(radio) {
            var label = '';
            var fieldset = radio.closest('.form-field, fieldset');
            if (fieldset) {
                var labelEl = fieldset.querySelector('.form-label, legend');
                if (labelEl) {
                    label = labelEl.textContent.replace(/[*:]/g, '').trim();
                }
            }
            var value = radio.nextElementSibling?.textContent || radio.value || '';

            if (label && value) {
                var normalizedLabel = normalizeAttributeName(label);
                options[normalizedLabel] = value.trim();
            }
        });

        // Swatch inputs
        document.querySelectorAll('.form-option-swatch input:checked, .productView-options .form-option input:checked').forEach(function(input) {
            var label = '';
            var fieldset = input.closest('.form-field, fieldset');
            if (fieldset) {
                var labelEl = fieldset.querySelector('.form-label, legend');
                if (labelEl) {
                    label = labelEl.textContent.replace(/[*:]/g, '').trim();
                }
            }
            var value = input.getAttribute('aria-label') ||
                       input.closest('.form-option')?.getAttribute('data-product-attribute-value') ||
                       input.value || '';

            if (label && value) {
                var normalizedLabel = normalizeAttributeName(label);
                options[normalizedLabel] = value.trim();
            }
        });

        return options;
    }

    /**
     * Get current quantity
     */
    function getQuantity() {
        var qtyInput = document.querySelector('.form-input--incrementTotal, input[name="qty[]"], .productView-info input[type="number"]');
        return qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
    }

    /**
     * Track product view
     */
    function trackProductView() {
        var productData = extractProductData();

        if (!productData.sku && !productData.price) {
            smLog('No product data found');
            return;
        }

        var options = getSelectedOptions();
        var properties = Object.assign({ sku: productData.sku }, options);

        // Filter empty values
        Object.keys(properties).forEach(function(key) {
            if (!properties[key]) delete properties[key];
        });

        var event = {
            event: 'microconversion',
            label: 'product_view',
            amount: productData.price,
            properties: properties
        };

        smLog('Queueing product_view:', event);
        window.sealmetricsTrack.push(event);

        // Store for add-to-cart
        window.sealmetricsProductData = productData;
    }

    /**
     * Track add to cart
     */
    function trackAddToCart(sku, price, qty, attributes) {
        var properties = Object.assign({ sku: sku || '' }, attributes || {});

        // Filter empty values
        Object.keys(properties).forEach(function(key) {
            if (!properties[key]) delete properties[key];
        });

        var event = {
            event: 'microconversion',
            label: 'add-to-cart',
            amount: (price || 0) * (qty || 1),
            properties: properties
        };

        smLog('Queueing add-to-cart:', event);
        window.sealmetricsTrack.push(event);
    }

    /**
     * Track checkout step
     */
    function trackCheckoutStep(step, amount, skus, itemCount) {
        var event = {
            event: 'microconversion',
            label: 'checkout' + step,
            amount: amount || 0,
            properties: {
                sku: skus || '',
                item_count: itemCount || 0
            }
        };

        smLog('Queueing checkout' + step + ':', event);
        window.sealmetricsTrack.push(event);
    }

    /**
     * Track purchase
     */
    function trackPurchase(amount, skus, itemCount, currency, attributes) {
        var properties = Object.assign({
            sku: skus || '',
            currency: currency || 'USD',
            item_count: itemCount || 0
        }, attributes || {});

        // Filter empty values
        Object.keys(properties).forEach(function(key) {
            if (!properties[key] && properties[key] !== 0) delete properties[key];
        });

        var event = {
            event: 'conversion',
            label: 'purchase',
            amount: amount || 0,
            properties: properties
        };

        smLog('Queueing purchase:', event);
        window.sealmetricsTrack.push(event);
    }

    /**
     * Get cart data from BigCommerce
     */
    function getCartData() {
        return new Promise(function(resolve) {
            // Try Storefront API
            fetch('/api/storefront/carts', {
                method: 'GET',
                credentials: 'include'
            })
            .then(function(response) { return response.json(); })
            .then(function(carts) {
                if (carts && carts.length > 0) {
                    var cart = carts[0];
                    var skus = [];
                    var itemCount = 0;
                    var attributes = {};

                    // Physical items
                    if (cart.lineItems && cart.lineItems.physicalItems) {
                        cart.lineItems.physicalItems.forEach(function(item) {
                            skus.push(item.sku || 'PROD-' + item.productId);
                            itemCount += item.quantity;

                            // Get options
                            if (item.options) {
                                item.options.forEach(function(opt) {
                                    var normalizedName = normalizeAttributeName(opt.name);
                                    if (!attributes[normalizedName]) {
                                        attributes[normalizedName] = [];
                                    }
                                    if (attributes[normalizedName].indexOf(opt.value) === -1) {
                                        attributes[normalizedName].push(opt.value);
                                    }
                                });
                            }
                        });
                    }

                    // Digital items
                    if (cart.lineItems && cart.lineItems.digitalItems) {
                        cart.lineItems.digitalItems.forEach(function(item) {
                            skus.push(item.sku || 'PROD-' + item.productId);
                            itemCount += item.quantity;
                        });
                    }

                    // Flatten attributes
                    var flatAttrs = {};
                    Object.keys(attributes).forEach(function(key) {
                        flatAttrs[key] = attributes[key].join(',');
                    });

                    resolve({
                        amount: cart.baseAmount || 0, // Without tax
                        skus: skus.join(','),
                        itemCount: itemCount,
                        currency: cart.currency && cart.currency.code ? cart.currency.code : 'USD',
                        attributes: flatAttrs
                    });
                } else {
                    resolve(null);
                }
            })
            .catch(function() {
                resolve(null);
            });
        });
    }

    /**
     * Initialize add-to-cart tracking
     */
    function initAddToCartTracking() {
        // Listen for add to cart button clicks
        document.addEventListener('click', function(e) {
            var addBtn = e.target.closest('#form-action-addToCart, .card-figcaption-button, [data-button-type="add-cart"]');
            if (!addBtn) return;

            var productData = window.sealmetricsProductData || extractProductData();
            var options = getSelectedOptions();
            var qty = getQuantity();

            // Small delay to ensure options are captured
            setTimeout(function() {
                trackAddToCart(productData.sku, productData.price, qty, options);
            }, 100);
        });

        // Listen for AJAX cart updates
        var originalFetch = window.fetch;
        if (originalFetch) {
            window.fetch = function(url, options) {
                var promise = originalFetch.apply(this, arguments);

                if (typeof url === 'string' && url.indexOf('/cart') !== -1 && options && options.method === 'POST') {
                    promise.then(function(response) {
                        if (response.ok) {
                            smLog('Cart updated via fetch');
                        }
                    }).catch(function() {});
                }

                return promise;
            };
        }

        smLog('Add-to-cart tracking initialized');
    }

    /**
     * Initialize checkout tracking
     */
    function initCheckoutTracking() {
        var pageType = getPageType();

        if (pageType === 'cart') {
            // Track checkout1 when on cart page
            getCartData().then(function(cart) {
                if (cart) {
                    trackCheckoutStep(1, cart.amount, cart.skus, cart.itemCount);
                }
            });

            // Track checkout2 when proceeding to checkout
            document.addEventListener('click', function(e) {
                var checkoutBtn = e.target.closest('.cart-actions .button--primary, [data-cart-checkout]');
                if (checkoutBtn) {
                    getCartData().then(function(cart) {
                        if (cart) {
                            trackCheckoutStep(2, cart.amount, cart.skus, cart.itemCount);
                        }
                    });
                }
            });
        }

        if (pageType === 'checkout') {
            // Track checkout2 on checkout page load
            getCartData().then(function(cart) {
                if (cart) {
                    // Check if checkout2 already sent
                    if (!window.sealmetricsCheckout2Sent) {
                        window.sealmetricsCheckout2Sent = true;
                        trackCheckoutStep(2, cart.amount, cart.skus, cart.itemCount);
                    }
                }
            });

            // Track checkout3 on payment selection
            document.addEventListener('click', function(e) {
                var paymentOption = e.target.closest('.checkout-step--payment .form-checklist-item, [data-test="payment-method"]');
                if (paymentOption && !window.sealmetricsCheckout3Sent) {
                    window.sealmetricsCheckout3Sent = true;
                    getCartData().then(function(cart) {
                        if (cart) {
                            trackCheckoutStep(3, cart.amount, cart.skus, cart.itemCount);
                        }
                    });
                }
            });

            // Track checkout3 on place order button
            document.addEventListener('click', function(e) {
                var placeOrderBtn = e.target.closest('#checkout-payment-continue, [data-test="place-order-button"]');
                if (placeOrderBtn && !window.sealmetricsCheckout3Sent) {
                    window.sealmetricsCheckout3Sent = true;
                    getCartData().then(function(cart) {
                        if (cart) {
                            trackCheckoutStep(3, cart.amount, cart.skus, cart.itemCount);
                        }
                    });
                }
            });
        }

        smLog('Checkout tracking initialized');
    }

    /**
     * Initialize purchase tracking (order confirmation page)
     */
    function initPurchaseTracking() {
        var pageType = getPageType();

        if (pageType !== 'order_confirmation') return;

        // Check for duplicate tracking
        var trackingKey = 'sealmetrics_purchase_tracked';
        var orderIdEl = document.querySelector('.orderConfirmation-section [data-test="order-confirmation-order-number"]');
        var orderId = orderIdEl ? orderIdEl.textContent.trim() : '';

        if (orderId) {
            var trackedOrders = JSON.parse(localStorage.getItem(trackingKey) || '[]');
            if (trackedOrders.indexOf(orderId) !== -1) {
                smLog('Purchase already tracked for order');
                return;
            }
            trackedOrders.push(orderId);
            // Keep only last 50 orders
            if (trackedOrders.length > 50) {
                trackedOrders = trackedOrders.slice(-50);
            }
            localStorage.setItem(trackingKey, JSON.stringify(trackedOrders));
        }

        // Extract order data from page
        var amount = 0;
        var subtotalEl = document.querySelector('.orderConfirmation-section [data-test="order-confirmation-subtotal"], .order-summary .cart-priceItem--subtotal .cart-priceItem-value');
        if (subtotalEl) {
            amount = parsePrice(subtotalEl.textContent);
        }

        var currency = 'USD';
        var currencyEl = document.querySelector('[data-currency-code]');
        if (currencyEl) {
            currency = currencyEl.getAttribute('data-currency-code') || 'USD';
        }

        // Get items from order confirmation
        var skus = [];
        var itemCount = 0;
        var attributes = {};

        document.querySelectorAll('.productList-item, .orderConfirmation-product').forEach(function(item) {
            var skuEl = item.querySelector('[data-test="product-sku"], .productList-item-sku');
            var sku = skuEl ? skuEl.textContent.replace('SKU:', '').trim() : '';
            if (sku) skus.push(sku);

            var qtyEl = item.querySelector('[data-test="product-quantity"], .productList-item-quantity');
            var qty = qtyEl ? parseInt(qtyEl.textContent.replace(/[^0-9]/g, ''), 10) : 1;
            itemCount += qty;

            // Get options
            item.querySelectorAll('.productList-item-option, .definitionList-value').forEach(function(optEl) {
                var text = optEl.textContent.trim();
                var parts = text.split(':');
                if (parts.length === 2) {
                    var normalizedName = normalizeAttributeName(parts[0]);
                    var value = parts[1].trim();
                    if (!attributes[normalizedName]) {
                        attributes[normalizedName] = [];
                    }
                    if (attributes[normalizedName].indexOf(value) === -1) {
                        attributes[normalizedName].push(value);
                    }
                }
            });
        });

        // Flatten attributes
        var flatAttrs = {};
        Object.keys(attributes).forEach(function(key) {
            flatAttrs[key] = attributes[key].join(',');
        });

        if (amount > 0 || skus.length > 0) {
            trackPurchase(amount, skus.join(','), itemCount, currency, flatAttrs);
        }

        smLog('Purchase tracking initialized');
    }

    /**
     * Initialize all tracking
     */
    function init() {
        loadScript();
        trackPageview();

        var pageType = getPageType();
        smLog('Page type:', pageType);

        switch (pageType) {
            case 'product':
                trackProductView();
                initAddToCartTracking();
                break;
            case 'category':
                initAddToCartTracking();
                break;
            case 'cart':
            case 'checkout':
                initCheckoutTracking();
                break;
            case 'order_confirmation':
                initPurchaseTracking();
                break;
        }

        smLog('SealMetrics initialized');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for manual tracking
    window.sealmetricsTrackProductView = trackProductView;
    window.sealmetricsTrackAddToCart = trackAddToCart;
    window.sealmetricsTrackCheckout = trackCheckoutStep;
    window.sealmetricsTrackPurchase = trackPurchase;

})();
