<?php
/**
 * Plugin Name: SealMetrics Tracking for WooCommerce
 * Plugin URI: https://sealmetrics.com
 * Description: Advanced tracking integration with SealMetrics for WooCommerce stores.
 * Version: 1.0.0
 * Author: SealMetrics
 * Author URI: https://sealmetrics.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: sealmetrics-tracking
 * Requires at least: 5.0
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.0
 */

defined('ABSPATH') || exit;

/**
 * Main SealMetrics Tracking Class
 */
final class SealMetrics_Tracking {

    /**
     * Plugin version
     */
    const VERSION = '1.0.0';

    /**
     * Single instance
     */
    private static $instance = null;

    /**
     * Attribute normalization map
     */
    private static $attribute_map = [
        'pa_color'    => 'colour',
        'pa_colour'   => 'colour',
        'pa_talla'    => 'size',
        'pa_size'     => 'size',
        'pa_material' => 'material',
        'pa_talle'    => 'size',
        'pa_tamano'   => 'size',
        'pa_tamaño'   => 'size',
        'pa_peso'     => 'weight',
        'pa_weight'   => 'weight',
    ];

    /**
     * Get single instance
     */
    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Admin settings
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);

        // Only load tracking if WooCommerce is active
        if (!$this->is_woocommerce_active()) {
            add_action('admin_notices', [$this, 'woocommerce_missing_notice']);
            return;
        }

        // Frontend tracking
        add_action('wp_head', [$this, 'output_tracking_script'], 1);
        add_action('wp_footer', [$this, 'output_pageview_event'], 5);
        add_action('woocommerce_after_single_product', [$this, 'output_product_view_event']);
        add_action('wp_footer', [$this, 'output_add_to_cart_handler']);
        add_action('woocommerce_before_checkout_form', [$this, 'output_checkout_event']);
        add_action('woocommerce_thankyou', [$this, 'output_purchase_event']);

        // AJAX add to cart for variable products
        add_action('wp_footer', [$this, 'output_ajax_add_to_cart_tracking']);

        // HPOS compatibility
        add_action('before_woocommerce_init', function() {
            if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
                \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
            }
        });
    }

    /**
     * Check if WooCommerce is active
     */
    private function is_woocommerce_active() {
        return class_exists('WooCommerce');
    }

    /**
     * WooCommerce missing notice
     */
    public function woocommerce_missing_notice() {
        ?>
        <div class="notice notice-error">
            <p><?php esc_html_e('SealMetrics Tracking requires WooCommerce to be installed and active.', 'sealmetrics-tracking'); ?></p>
        </div>
        <?php
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            __('SealMetrics', 'sealmetrics-tracking'),
            __('SealMetrics', 'sealmetrics-tracking'),
            'manage_options',
            'sealmetrics',
            [$this, 'render_settings_page']
        );
    }

    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('sealmetrics_settings', 'sealmetrics_account_id', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '',
        ]);

        register_setting('sealmetrics_settings', 'sealmetrics_debug_mode', [
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
            'default' => false,
        ]);

        add_settings_section(
            'sealmetrics_main_section',
            __('Configuration', 'sealmetrics-tracking'),
            null,
            'sealmetrics'
        );

        add_settings_field(
            'sealmetrics_account_id',
            __('Account ID', 'sealmetrics-tracking'),
            [$this, 'render_account_id_field'],
            'sealmetrics',
            'sealmetrics_main_section'
        );

        add_settings_field(
            'sealmetrics_debug_mode',
            __('Debug Mode', 'sealmetrics-tracking'),
            [$this, 'render_debug_mode_field'],
            'sealmetrics',
            'sealmetrics_main_section'
        );
    }

    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('sealmetrics_settings');
                do_settings_sections('sealmetrics');
                submit_button(__('Save Settings', 'sealmetrics-tracking'));
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Render Account ID field
     */
    public function render_account_id_field() {
        $value = get_option('sealmetrics_account_id', '');
        ?>
        <input type="text"
               id="sealmetrics_account_id"
               name="sealmetrics_account_id"
               value="<?php echo esc_attr($value); ?>"
               class="regular-text"
               placeholder="your-account-id">
        <p class="description"><?php esc_html_e('Enter your SealMetrics Account ID.', 'sealmetrics-tracking'); ?></p>
        <?php
    }

    /**
     * Render Debug Mode field
     */
    public function render_debug_mode_field() {
        $value = get_option('sealmetrics_debug_mode', false);
        ?>
        <label for="sealmetrics_debug_mode">
            <input type="checkbox"
                   id="sealmetrics_debug_mode"
                   name="sealmetrics_debug_mode"
                   value="1"
                   <?php checked($value, true); ?>>
            <?php esc_html_e('Enable debug mode (logs all events to browser console)', 'sealmetrics-tracking'); ?>
        </label>
        <?php
    }

    /**
     * Get Account ID
     */
    private function get_account_id() {
        return get_option('sealmetrics_account_id', '');
    }

    /**
     * Check if debug mode is enabled
     */
    private function is_debug_mode() {
        return (bool) get_option('sealmetrics_debug_mode', false);
    }

    /**
     * Output main tracking script (loaded only once)
     */
    public function output_tracking_script() {
        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        $debug = $this->is_debug_mode() ? 'true' : 'false';
        ?>
        <script>
        (function() {
            window.sealmetricsTrack = window.sealmetricsTrack || [];
            window.sealmetricsDebug = <?php echo $debug; ?>;
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
            script.src = 'https://cdn.sealmetrics.com/<?php echo esc_js($account_id); ?>/sm.js';
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
        })();
        </script>
        <?php
    }

    /**
     * Output pageview event
     */
    public function output_pageview_event() {
        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }
        ?>
        <script>
        (function() {
            if (!window.sealmetricsPageviewSent) {
                window.sealmetricsPageviewSent = true;
                var event = {
                    event: 'pageview',
                    use_session: 1
                };
                window.smLog('Queueing pageview:', event);
                window.sealmetricsTrack.push(event);
            }
        })();
        </script>
        <?php
    }

    /**
     * Normalize attribute name
     */
    private function normalize_attribute_name($attribute) {
        $attribute = strtolower($attribute);

        if (isset(self::$attribute_map[$attribute])) {
            return self::$attribute_map[$attribute];
        }

        // Remove pa_ prefix for unmapped attributes
        if (strpos($attribute, 'pa_') === 0) {
            return substr($attribute, 3);
        }

        return $attribute;
    }

    /**
     * Get product price excluding tax
     */
    private function get_price_excluding_tax($product, $qty = 1) {
        if (!$product) {
            return 0;
        }
        return (float) wc_get_price_excluding_tax($product, ['qty' => $qty]);
    }

    /**
     * Get product attributes normalized
     */
    private function get_normalized_attributes($product, $variation_attributes = []) {
        $attributes = [];

        if ($product->is_type('variation')) {
            $variation_attrs = $product->get_variation_attributes();
            foreach ($variation_attrs as $key => $value) {
                $normalized_key = $this->normalize_attribute_name($key);
                if (!empty($value)) {
                    $attributes[$normalized_key] = $value;
                }
            }
        }

        // Override with provided variation attributes
        foreach ($variation_attributes as $key => $value) {
            $normalized_key = $this->normalize_attribute_name($key);
            if (!empty($value)) {
                $attributes[$normalized_key] = $value;
            }
        }

        return $attributes;
    }

    /**
     * Output product view event
     */
    public function output_product_view_event() {
        global $product;

        if (!$product || !is_a($product, 'WC_Product')) {
            return;
        }

        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        $sku = $product->get_sku();
        $price = $this->get_price_excluding_tax($product);
        $attributes = [];

        if ($product->is_type('variable')) {
            // For variable products, get all possible attribute names
            $variation_attributes = $product->get_variation_attributes();
            foreach (array_keys($variation_attributes) as $attr_name) {
                $normalized = $this->normalize_attribute_name($attr_name);
                $attributes[$normalized] = '';
            }
        } else {
            // For simple products with attributes
            $product_attributes = $product->get_attributes();
            foreach ($product_attributes as $attr_name => $attr) {
                $normalized = $this->normalize_attribute_name($attr_name);
                if (is_a($attr, 'WC_Product_Attribute')) {
                    $values = $attr->get_options();
                    if (!empty($values)) {
                        $term_names = [];
                        foreach ($values as $value) {
                            if (is_numeric($value)) {
                                $term = get_term($value);
                                if ($term && !is_wp_error($term)) {
                                    $term_names[] = $term->name;
                                }
                            } else {
                                $term_names[] = $value;
                            }
                        }
                        $attributes[$normalized] = implode(', ', $term_names);
                    }
                }
            }
        }

        $properties = array_merge(['sku' => $sku], $attributes);
        $properties = array_filter($properties, function($v) { return $v !== '' && $v !== null; });

        ?>
        <script>
        (function() {
            var event = {
                event: 'microconversion',
                label: 'product_view',
                amount: <?php echo esc_js($price); ?>,
                properties: <?php echo wp_json_encode($properties); ?>
            };
            window.smLog('Queueing product_view:', event);
            window.sealmetricsTrack.push(event);
        })();
        </script>
        <?php
    }

    /**
     * Output add to cart handler for simple products
     */
    public function output_add_to_cart_handler() {
        if (!is_product()) {
            return;
        }

        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        global $product;
        if (!$product || !is_a($product, 'WC_Product')) {
            return;
        }

        $sku = $product->get_sku();
        $price = $this->get_price_excluding_tax($product);

        // Prepare attribute map for JS
        $attr_map = [];
        foreach (self::$attribute_map as $key => $value) {
            $attr_map[$key] = $value;
            // Also map attribute_ prefix
            $attr_map['attribute_' . $key] = $value;
        }

        ?>
        <script>
        (function() {
            var attrMap = <?php echo wp_json_encode($attr_map); ?>;
            var basePrice = <?php echo esc_js($price); ?>;
            var baseSku = <?php echo wp_json_encode($sku); ?>;
            var isVariable = <?php echo $product->is_type('variable') ? 'true' : 'false'; ?>;

            function normalizeAttrName(name) {
                name = name.toLowerCase().replace('attribute_', '');
                if (attrMap[name]) {
                    return attrMap[name];
                }
                if (attrMap['pa_' + name]) {
                    return attrMap['pa_' + name];
                }
                if (name.indexOf('pa_') === 0) {
                    return name.substring(3);
                }
                return name;
            }

            function getSelectedAttributes() {
                var attrs = {};
                var selects = document.querySelectorAll('.variations select');
                selects.forEach(function(select) {
                    var name = select.getAttribute('name') || select.getAttribute('data-attribute_name') || '';
                    var value = select.value;
                    if (name && value) {
                        var normalizedName = normalizeAttrName(name);
                        attrs[normalizedName] = value;
                    }
                });
                return attrs;
            }

            function getQuantity() {
                var qtyInput = document.querySelector('input.qty, input[name="quantity"]');
                return qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
            }

            function getCurrentPrice() {
                if (isVariable) {
                    var priceEl = document.querySelector('.woocommerce-variation-price .amount, .single_variation_wrap .amount');
                    if (priceEl) {
                        var priceText = priceEl.textContent || '';
                        var price = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
                        if (!isNaN(price)) {
                            return price;
                        }
                    }
                }
                return basePrice;
            }

            function getCurrentSku() {
                if (isVariable) {
                    var skuEl = document.querySelector('.sku');
                    if (skuEl) {
                        return skuEl.textContent || baseSku;
                    }
                }
                return baseSku;
            }

            // Handle form submission
            var form = document.querySelector('form.cart');
            if (form) {
                form.addEventListener('submit', function(e) {
                    var qty = getQuantity();
                    var price = getCurrentPrice();
                    var sku = getCurrentSku();
                    var attrs = getSelectedAttributes();

                    var properties = Object.assign({sku: sku}, attrs);

                    var event = {
                        event: 'microconversion',
                        label: 'add-to-cart',
                        amount: price * qty,
                        properties: properties
                    };

                    window.smLog('Queueing add-to-cart:', event);
                    window.sealmetricsTrack.push(event);
                });
            }

            // Handle AJAX add to cart buttons (archive pages)
            document.addEventListener('click', function(e) {
                var button = e.target.closest('.add_to_cart_button, .ajax_add_to_cart');
                if (button && !button.closest('form.cart')) {
                    var productId = button.getAttribute('data-product_id');
                    var sku = button.getAttribute('data-product_sku') || '';
                    var qty = parseInt(button.getAttribute('data-quantity'), 10) || 1;

                    // Get price from data attribute or nearby price element
                    var priceAttr = button.getAttribute('data-price');
                    var price = priceAttr ? parseFloat(priceAttr) : 0;

                    if (!price) {
                        var priceEl = button.closest('.product')?.querySelector('.price .amount');
                        if (priceEl) {
                            price = parseFloat(priceEl.textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
                        }
                    }

                    var event = {
                        event: 'microconversion',
                        label: 'add-to-cart',
                        amount: price * qty,
                        properties: {
                            sku: sku
                        }
                    };

                    window.smLog('Queueing add-to-cart (ajax):', event);
                    window.sealmetricsTrack.push(event);
                }
            });
        })();
        </script>
        <?php
    }

    /**
     * Output AJAX add to cart tracking for archive pages
     */
    public function output_ajax_add_to_cart_tracking() {
        if (is_product()) {
            return; // Already handled by product page handler
        }

        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        ?>
        <script>
        (function() {
            document.addEventListener('click', function(e) {
                var button = e.target.closest('.add_to_cart_button, .ajax_add_to_cart');
                if (button) {
                    var sku = button.getAttribute('data-product_sku') || '';
                    var qty = parseInt(button.getAttribute('data-quantity'), 10) || 1;

                    var priceEl = button.closest('.product')?.querySelector('.price .amount');
                    var price = 0;
                    if (priceEl) {
                        price = parseFloat(priceEl.textContent.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
                    }

                    var event = {
                        event: 'microconversion',
                        label: 'add-to-cart',
                        amount: price * qty,
                        properties: {
                            sku: sku
                        }
                    };

                    window.smLog('Queueing add-to-cart (archive):', event);
                    window.sealmetricsTrack.push(event);
                }
            });
        })();
        </script>
        <?php
    }

    /**
     * Output checkout event
     */
    public function output_checkout_event() {
        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        $cart = WC()->cart;
        if (!$cart || $cart->is_empty()) {
            return;
        }

        $cart_total = (float) $cart->get_cart_contents_total();
        $item_count = $cart->get_cart_contents_count();
        $skus = [];

        foreach ($cart->get_cart() as $cart_item) {
            $product = $cart_item['data'];
            if ($product) {
                $sku = $product->get_sku();
                if ($sku) {
                    $skus[] = $sku;
                }
            }
        }

        $properties = [
            'sku' => implode(',', $skus),
            'item_count' => $item_count,
        ];

        ?>
        <script>
        (function() {
            var checkoutStep = 1;
            var totalAmount = <?php echo esc_js($cart_total); ?>;
            var properties = <?php echo wp_json_encode($properties); ?>;

            // Track checkout1 immediately
            var event1 = {
                event: 'microconversion',
                label: 'checkout1',
                amount: totalAmount,
                properties: properties
            };
            window.smLog('Queueing checkout1:', event1);
            window.sealmetricsTrack.push(event1);

            // Track checkout2 when billing details are filled
            var billingFields = document.querySelectorAll('#billing_email, #billing_phone');
            var checkout2Sent = false;

            billingFields.forEach(function(field) {
                field.addEventListener('blur', function() {
                    if (!checkout2Sent && this.value) {
                        checkout2Sent = true;
                        var event2 = {
                            event: 'microconversion',
                            label: 'checkout2',
                            amount: totalAmount,
                            properties: properties
                        };
                        window.smLog('Queueing checkout2:', event2);
                        window.sealmetricsTrack.push(event2);
                    }
                });
            });

            // Track checkout3 when payment method is selected or place order is clicked
            var checkout3Sent = false;

            document.addEventListener('click', function(e) {
                var paymentMethod = e.target.closest('.wc_payment_method input[type="radio"]');
                if (paymentMethod && !checkout3Sent) {
                    checkout3Sent = true;
                    var event3 = {
                        event: 'microconversion',
                        label: 'checkout3',
                        amount: totalAmount,
                        properties: properties
                    };
                    window.smLog('Queueing checkout3:', event3);
                    window.sealmetricsTrack.push(event3);
                }
            });

            // Also track checkout3 on place order button click
            var placeOrderBtn = document.querySelector('#place_order');
            if (placeOrderBtn) {
                placeOrderBtn.addEventListener('click', function() {
                    if (!checkout3Sent) {
                        checkout3Sent = true;
                        var event3 = {
                            event: 'microconversion',
                            label: 'checkout3',
                            amount: totalAmount,
                            properties: properties
                        };
                        window.smLog('Queueing checkout3:', event3);
                        window.sealmetricsTrack.push(event3);
                    }
                });
            }
        })();
        </script>
        <?php
    }

    /**
     * Output purchase event
     */
    public function output_purchase_event($order_id) {
        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        $order = wc_get_order($order_id);
        if (!$order) {
            return;
        }

        // Check if already tracked to avoid duplicates
        $tracked = $order->get_meta('_sealmetrics_tracked', true);
        if ($tracked === 'yes') {
            return;
        }

        // Mark as tracked
        $order->update_meta_data('_sealmetrics_tracked', 'yes');
        $order->save();

        // Calculate total excluding tax
        $order_total = (float) $order->get_total() - (float) $order->get_total_tax();
        $currency = $order->get_currency();
        $item_count = $order->get_item_count();
        $skus = [];
        $attributes = [];

        foreach ($order->get_items() as $item) {
            $product = $item->get_product();
            if (!$product) {
                continue;
            }

            $sku = $product->get_sku();
            if ($sku) {
                $skus[] = $sku;
            }

            // Get attributes for variations
            if ($product->is_type('variation')) {
                $variation_attrs = $product->get_variation_attributes();
                foreach ($variation_attrs as $attr_name => $attr_value) {
                    $normalized = $this->normalize_attribute_name($attr_name);
                    if (!isset($attributes[$normalized])) {
                        $attributes[$normalized] = [];
                    }
                    if ($attr_value && !in_array($attr_value, $attributes[$normalized])) {
                        $attributes[$normalized][] = $attr_value;
                    }
                }
            }

            // Check item meta for selected attributes
            $item_meta = $item->get_meta_data();
            foreach ($item_meta as $meta) {
                $key = $meta->key;
                if (strpos($key, 'pa_') === 0 || strpos($key, 'attribute_') === 0) {
                    $normalized = $this->normalize_attribute_name(str_replace('attribute_', '', $key));
                    $value = $meta->value;
                    if (!isset($attributes[$normalized])) {
                        $attributes[$normalized] = [];
                    }
                    if ($value && !in_array($value, $attributes[$normalized])) {
                        $attributes[$normalized][] = $value;
                    }
                }
            }
        }

        // Flatten attributes
        $flat_attributes = [];
        foreach ($attributes as $key => $values) {
            $flat_attributes[$key] = implode(',', $values);
        }

        $properties = array_merge(
            [
                'sku' => implode(',', $skus),
                'currency' => $currency,
                'item_count' => $item_count,
            ],
            $flat_attributes
        );

        // Filter out empty values
        $properties = array_filter($properties, function($v) { return $v !== '' && $v !== null; });

        ?>
        <script>
        (function() {
            var event = {
                event: 'conversion',
                label: 'purchase',
                amount: <?php echo esc_js($order_total); ?>,
                properties: <?php echo wp_json_encode($properties); ?>
            };
            window.smLog('Queueing purchase:', event);
            window.sealmetricsTrack.push(event);
        })();
        </script>
        <?php
    }
}

/**
 * Initialize plugin
 */
function sealmetrics_tracking_init() {
    return SealMetrics_Tracking::instance();
}

add_action('plugins_loaded', 'sealmetrics_tracking_init');
