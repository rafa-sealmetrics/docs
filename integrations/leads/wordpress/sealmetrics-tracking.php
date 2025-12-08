<?php
/**
 * Plugin Name: SealMetrics Tracking
 * Plugin URI: https://sealmetrics.com
 * Description: Lead tracking integration with SealMetrics for WordPress. Tracks form submissions as conversions.
 * Version: 1.0.0
 * Author: SealMetrics
 * Author URI: https://sealmetrics.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: sealmetrics-tracking
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

defined('ABSPATH') || exit;

/**
 * Main SealMetrics Tracking Class for WordPress
 */
final class SealMetrics_WP_Tracking {

    /**
     * Plugin version
     */
    const VERSION = '1.0.0';

    /**
     * Single instance
     */
    private static $instance = null;

    /**
     * Supported form plugins
     */
    private static $supported_forms = [
        'contact_form_7' => 'Contact Form 7',
        'wpforms' => 'WPForms',
        'gravity_forms' => 'Gravity Forms',
        'ninja_forms' => 'Ninja Forms',
        'formidable' => 'Formidable Forms',
        'elementor_forms' => 'Elementor Forms',
        'html_forms' => 'HTML Forms / Native',
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

        // Frontend tracking
        add_action('wp_head', [$this, 'output_tracking_script'], 1);
        add_action('wp_footer', [$this, 'output_pageview_event'], 5);
        add_action('wp_footer', [$this, 'output_form_tracking_script'], 20);

        // Form plugin integrations (server-side hooks for AJAX forms)
        $this->init_form_hooks();
    }

    /**
     * Initialize form plugin hooks
     */
    private function init_form_hooks() {
        // Contact Form 7
        add_action('wpcf7_mail_sent', [$this, 'track_cf7_submission']);

        // WPForms
        add_action('wpforms_process_complete', [$this, 'track_wpforms_submission'], 10, 4);

        // Gravity Forms
        add_action('gform_after_submission', [$this, 'track_gravity_forms_submission'], 10, 2);

        // Ninja Forms
        add_action('ninja_forms_after_submission', [$this, 'track_ninja_forms_submission']);

        // Formidable Forms
        add_action('frm_after_create_entry', [$this, 'track_formidable_submission'], 10, 2);
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

        register_setting('sealmetrics_settings', 'sealmetrics_conversion_label', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => 'lead',
        ]);

        register_setting('sealmetrics_settings', 'sealmetrics_track_page_type', [
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
            'default' => true,
        ]);

        add_settings_section(
            'sealmetrics_main_section',
            __('General Configuration', 'sealmetrics-tracking'),
            null,
            'sealmetrics'
        );

        add_settings_section(
            'sealmetrics_conversion_section',
            __('Conversion Settings', 'sealmetrics-tracking'),
            [$this, 'render_conversion_section_description'],
            'sealmetrics'
        );

        // General fields
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

        // Conversion fields
        add_settings_field(
            'sealmetrics_conversion_label',
            __('Conversion Label', 'sealmetrics-tracking'),
            [$this, 'render_conversion_label_field'],
            'sealmetrics',
            'sealmetrics_conversion_section'
        );

        add_settings_field(
            'sealmetrics_track_page_type',
            __('Track Page Type', 'sealmetrics-tracking'),
            [$this, 'render_track_page_type_field'],
            'sealmetrics',
            'sealmetrics_conversion_section'
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

            <hr>

            <h2><?php esc_html_e('Detected Form Plugins', 'sealmetrics-tracking'); ?></h2>
            <table class="widefat" style="max-width: 500px;">
                <thead>
                    <tr>
                        <th><?php esc_html_e('Form Plugin', 'sealmetrics-tracking'); ?></th>
                        <th><?php esc_html_e('Status', 'sealmetrics-tracking'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach (self::$supported_forms as $key => $name): ?>
                        <tr>
                            <td><?php echo esc_html($name); ?></td>
                            <td>
                                <?php if ($this->is_form_plugin_active($key)): ?>
                                    <span style="color: green;">&#10004; <?php esc_html_e('Active', 'sealmetrics-tracking'); ?></span>
                                <?php else: ?>
                                    <span style="color: #999;">&#8212; <?php esc_html_e('Not detected', 'sealmetrics-tracking'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <p class="description">
                <?php esc_html_e('Native HTML forms are automatically tracked via JavaScript.', 'sealmetrics-tracking'); ?>
            </p>
        </div>
        <?php
    }

    /**
     * Check if a form plugin is active
     */
    private function is_form_plugin_active($plugin) {
        switch ($plugin) {
            case 'contact_form_7':
                return defined('WPCF7_VERSION');
            case 'wpforms':
                return defined('WPFORMS_VERSION');
            case 'gravity_forms':
                return class_exists('GFForms');
            case 'ninja_forms':
                return class_exists('Ninja_Forms');
            case 'formidable':
                return class_exists('FrmAppHelper');
            case 'elementor_forms':
                return defined('ELEMENTOR_VERSION') && class_exists('\ElementorPro\Plugin');
            case 'html_forms':
                return true; // Always available
            default:
                return false;
        }
    }

    /**
     * Render conversion section description
     */
    public function render_conversion_section_description() {
        echo '<p>' . esc_html__('Configure how form submissions are tracked as conversions.', 'sealmetrics-tracking') . '</p>';
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
     * Render Conversion Label field
     */
    public function render_conversion_label_field() {
        $value = get_option('sealmetrics_conversion_label', 'lead');
        ?>
        <input type="text"
               id="sealmetrics_conversion_label"
               name="sealmetrics_conversion_label"
               value="<?php echo esc_attr($value); ?>"
               class="regular-text"
               placeholder="lead">
        <p class="description">
            <?php esc_html_e('The label used for form submission conversions (e.g., "lead", "contact", "signup").', 'sealmetrics-tracking'); ?>
        </p>
        <?php
    }

    /**
     * Render Track Page Type field
     */
    public function render_track_page_type_field() {
        $value = get_option('sealmetrics_track_page_type', true);
        ?>
        <label for="sealmetrics_track_page_type">
            <input type="checkbox"
                   id="sealmetrics_track_page_type"
                   name="sealmetrics_track_page_type"
                   value="1"
                   <?php checked($value, true); ?>>
            <?php esc_html_e('Include page type in conversion properties (page, post, landing_page, etc.)', 'sealmetrics-tracking'); ?>
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
     * Get conversion label
     */
    private function get_conversion_label() {
        return get_option('sealmetrics_conversion_label', 'lead') ?: 'lead';
    }

    /**
     * Get current page type
     */
    private function get_page_type() {
        if (is_front_page()) {
            return 'home';
        } elseif (is_singular('landing_page') || is_page_template('landing-page.php')) {
            return 'landing_page';
        } elseif (is_page()) {
            return 'page';
        } elseif (is_single()) {
            return 'post';
        } elseif (is_archive()) {
            return 'archive';
        } elseif (is_search()) {
            return 'search';
        }
        return 'other';
    }

    /**
     * Get current page slug
     */
    private function get_page_slug() {
        global $post;
        if ($post && $post->post_name) {
            return $post->post_name;
        }
        return '';
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
     * Output form tracking script
     */
    public function output_form_tracking_script() {
        $account_id = $this->get_account_id();
        if (empty($account_id)) {
            return;
        }

        $conversion_label = $this->get_conversion_label();
        $track_page_type = get_option('sealmetrics_track_page_type', true);
        $page_type = $this->get_page_type();
        $page_slug = $this->get_page_slug();
        ?>
        <script>
        (function() {
            var conversionLabel = <?php echo wp_json_encode($conversion_label); ?>;
            var trackPageType = <?php echo $track_page_type ? 'true' : 'false'; ?>;
            var pageType = <?php echo wp_json_encode($page_type); ?>;
            var pageSlug = <?php echo wp_json_encode($page_slug); ?>;

            // Track conversion helper
            function trackLeadConversion(formName) {
                var properties = {};

                if (formName) {
                    properties.form_name = formName;
                }

                if (trackPageType) {
                    properties.page_type = pageType;
                    if (pageSlug) {
                        properties.page_slug = pageSlug;
                    }
                }

                var event = {
                    event: 'conversion',
                    label: conversionLabel,
                    properties: properties
                };

                window.smLog('Queueing lead conversion:', event);
                window.sealmetricsTrack.push(event);
            }

            // Expose globally for form plugin integrations
            window.sealmetricsTrackLead = trackLeadConversion;

            // ===== Contact Form 7 =====
            document.addEventListener('wpcf7mailsent', function(event) {
                var formName = '';
                if (event.detail && event.detail.contactFormId) {
                    formName = 'cf7_' + event.detail.contactFormId;
                }
                trackLeadConversion(formName);
            });

            // ===== WPForms =====
            if (typeof jQuery !== 'undefined') {
                jQuery(document).on('wpformsAjaxSubmitSuccess', function(event, response) {
                    var formName = '';
                    if (response && response.data && response.data.form_id) {
                        formName = 'wpforms_' + response.data.form_id;
                    }
                    trackLeadConversion(formName);
                });
            }

            // ===== Gravity Forms =====
            if (typeof jQuery !== 'undefined') {
                jQuery(document).on('gform_confirmation_loaded', function(event, formId) {
                    trackLeadConversion('gf_' + formId);
                });
            }

            // ===== Ninja Forms =====
            if (typeof jQuery !== 'undefined') {
                jQuery(document).on('nfFormSubmitResponse', function(event, response) {
                    var formName = '';
                    if (response && response.data && response.data.form_id) {
                        formName = 'nf_' + response.data.form_id;
                    }
                    trackLeadConversion(formName);
                });
            }

            // Also listen for Ninja Forms 3.x
            if (typeof Marionette !== 'undefined' && typeof nfRadio !== 'undefined') {
                try {
                    var channel = nfRadio.channel('forms');
                    channel.on('submit:response', function(response) {
                        var formName = response && response.data && response.data.form_id
                            ? 'nf_' + response.data.form_id
                            : '';
                        trackLeadConversion(formName);
                    });
                } catch (e) {}
            }

            // ===== Formidable Forms =====
            if (typeof jQuery !== 'undefined') {
                jQuery(document).on('frmFormComplete', function(event, form, response) {
                    var formName = '';
                    if (form && form.attr('id')) {
                        formName = 'frm_' + form.attr('id').replace('form_', '');
                    }
                    trackLeadConversion(formName);
                });
            }

            // ===== Elementor Forms =====
            if (typeof jQuery !== 'undefined') {
                jQuery(document).on('submit_success', '.elementor-form', function(event) {
                    var formName = jQuery(this).find('input[name="form_id"]').val() || '';
                    if (formName) {
                        formName = 'elementor_' + formName;
                    }
                    trackLeadConversion(formName);
                });
            }

            // ===== Native HTML Forms =====
            document.addEventListener('submit', function(event) {
                var form = event.target;

                // Skip if it's a known form plugin (they have their own events)
                if (form.classList.contains('wpcf7-form') ||
                    form.classList.contains('wpforms-form') ||
                    form.classList.contains('gform_wrapper') ||
                    form.classList.contains('nf-form') ||
                    form.classList.contains('frm-show-form') ||
                    form.classList.contains('elementor-form')) {
                    return;
                }

                // Check if it looks like a contact/lead form
                var hasEmailField = form.querySelector('input[type="email"], input[name*="email"]');
                var hasNameField = form.querySelector('input[name*="name"], input[name*="nombre"]');
                var hasMessageField = form.querySelector('textarea');
                var hasPhoneField = form.querySelector('input[type="tel"], input[name*="phone"], input[name*="telefono"]');

                // Only track if it looks like a lead form
                if (hasEmailField || (hasNameField && (hasMessageField || hasPhoneField))) {
                    var formName = form.getAttribute('name') ||
                                   form.getAttribute('id') ||
                                   'html_form';

                    // Use a small delay to let the form submit
                    setTimeout(function() {
                        trackLeadConversion(formName);
                    }, 100);
                }
            });

            // ===== Fetch/XHR interception for AJAX forms =====
            (function() {
                var originalFetch = window.fetch;
                if (originalFetch) {
                    window.fetch = function() {
                        var url = arguments[0];
                        if (typeof url === 'string' &&
                            (url.indexOf('wpcf7') !== -1 ||
                             url.indexOf('wpforms') !== -1 ||
                             url.indexOf('gf_') !== -1)) {
                            // Form submission detected, but let the specific handlers deal with it
                        }
                        return originalFetch.apply(this, arguments);
                    };
                }
            })();

        })();
        </script>
        <?php
    }

    /**
     * Track Contact Form 7 submission (server-side backup)
     */
    public function track_cf7_submission($contact_form) {
        // This is a server-side backup; client-side JS handles most cases
        // Store in session for next page load if needed
        $this->store_pending_conversion('cf7_' . $contact_form->id());
    }

    /**
     * Track WPForms submission
     */
    public function track_wpforms_submission($fields, $entry, $form_data, $entry_id) {
        $this->store_pending_conversion('wpforms_' . $form_data['id']);
    }

    /**
     * Track Gravity Forms submission
     */
    public function track_gravity_forms_submission($entry, $form) {
        $this->store_pending_conversion('gf_' . $form['id']);
    }

    /**
     * Track Ninja Forms submission
     */
    public function track_ninja_forms_submission($form_data) {
        $form_id = isset($form_data['form_id']) ? $form_data['form_id'] : '';
        $this->store_pending_conversion('nf_' . $form_id);
    }

    /**
     * Track Formidable Forms submission
     */
    public function track_formidable_submission($entry_id, $form_id) {
        $this->store_pending_conversion('frm_' . $form_id);
    }

    /**
     * Store pending conversion for non-AJAX fallback
     */
    private function store_pending_conversion($form_name) {
        if (!session_id()) {
            @session_start();
        }

        if (!isset($_SESSION['sealmetrics_pending_conversions'])) {
            $_SESSION['sealmetrics_pending_conversions'] = [];
        }

        $_SESSION['sealmetrics_pending_conversions'][] = [
            'form_name' => $form_name,
            'timestamp' => time(),
        ];
    }
}

/**
 * Initialize plugin
 */
function sealmetrics_wp_tracking_init() {
    return SealMetrics_WP_Tracking::instance();
}

add_action('plugins_loaded', 'sealmetrics_wp_tracking_init');
