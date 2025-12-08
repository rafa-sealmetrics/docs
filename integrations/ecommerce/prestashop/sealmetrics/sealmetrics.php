<?php
/**
 * SealMetrics Tracking Module for PrestaShop
 *
 * @author    SealMetrics
 * @copyright 2024 SealMetrics
 * @license   MIT License
 * @version   1.0.0
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class SealMetrics extends Module
{
    /**
     * Attribute normalization map (same as WooCommerce/Magento)
     */
    private static $attributeMap = [
        'color' => 'colour',
        'colour' => 'colour',
        'colore' => 'colour',
        'couleur' => 'colour',
        'farbe' => 'colour',
        'talla' => 'size',
        'size' => 'size',
        'taille' => 'size',
        'größe' => 'size',
        'grosse' => 'size',
        'material' => 'material',
        'materiale' => 'material',
        'matière' => 'material',
        'peso' => 'weight',
        'weight' => 'weight',
        'poids' => 'weight',
    ];

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->name = 'sealmetrics';
        $this->tab = 'analytics_stats';
        $this->version = '1.0.0';
        $this->author = 'SealMetrics';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = ['min' => '1.7.0.0', 'max' => '8.99.99'];
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('SealMetrics Tracking');
        $this->description = $this->l('Advanced tracking integration with SealMetrics for PrestaShop stores.');
        $this->confirmUninstall = $this->l('Are you sure you want to uninstall SealMetrics?');
    }

    /**
     * Install module
     */
    public function install()
    {
        return parent::install()
            && $this->registerHook('displayHeader')
            && $this->registerHook('displayFooterProduct')
            && $this->registerHook('actionCartSave')
            && $this->registerHook('displayOrderConfirmation')
            && $this->registerHook('displayCheckoutProcess')
            && $this->registerHook('displayPaymentTop')
            && $this->registerHook('actionFrontControllerSetMedia')
            && Configuration::updateValue('SEALMETRICS_ACCOUNT_ID', '')
            && Configuration::updateValue('SEALMETRICS_DEBUG_MODE', false);
    }

    /**
     * Uninstall module
     */
    public function uninstall()
    {
        return parent::uninstall()
            && Configuration::deleteByName('SEALMETRICS_ACCOUNT_ID')
            && Configuration::deleteByName('SEALMETRICS_DEBUG_MODE');
    }

    /**
     * Module configuration page
     */
    public function getContent()
    {
        $output = '';

        if (Tools::isSubmit('submitSealMetricsSettings')) {
            $accountId = Tools::getValue('SEALMETRICS_ACCOUNT_ID');
            $debugMode = (bool) Tools::getValue('SEALMETRICS_DEBUG_MODE');

            Configuration::updateValue('SEALMETRICS_ACCOUNT_ID', pSQL($accountId));
            Configuration::updateValue('SEALMETRICS_DEBUG_MODE', $debugMode);

            $output .= $this->displayConfirmation($this->l('Settings updated successfully.'));
        }

        return $output . $this->renderForm();
    }

    /**
     * Render configuration form
     */
    protected function renderForm()
    {
        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitSealMetricsSettings';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = [
            'fields_value' => [
                'SEALMETRICS_ACCOUNT_ID' => Configuration::get('SEALMETRICS_ACCOUNT_ID'),
                'SEALMETRICS_DEBUG_MODE' => Configuration::get('SEALMETRICS_DEBUG_MODE'),
            ],
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        ];

        return $helper->generateForm([$this->getConfigForm()]);
    }

    /**
     * Configuration form structure
     */
    protected function getConfigForm()
    {
        return [
            'form' => [
                'legend' => [
                    'title' => $this->l('SealMetrics Settings'),
                    'icon' => 'icon-cogs',
                ],
                'input' => [
                    [
                        'type' => 'text',
                        'label' => $this->l('Account ID'),
                        'name' => 'SEALMETRICS_ACCOUNT_ID',
                        'desc' => $this->l('Enter your SealMetrics Account ID.'),
                        'required' => true,
                        'class' => 'fixed-width-xl',
                    ],
                    [
                        'type' => 'switch',
                        'label' => $this->l('Debug Mode'),
                        'name' => 'SEALMETRICS_DEBUG_MODE',
                        'desc' => $this->l('Enable debug mode to log all events to the browser console.'),
                        'is_bool' => true,
                        'values' => [
                            [
                                'id' => 'debug_on',
                                'value' => 1,
                                'label' => $this->l('Enabled'),
                            ],
                            [
                                'id' => 'debug_off',
                                'value' => 0,
                                'label' => $this->l('Disabled'),
                            ],
                        ],
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                ],
            ],
        ];
    }

    /**
     * Get Account ID
     */
    private function getAccountId()
    {
        return Configuration::get('SEALMETRICS_ACCOUNT_ID');
    }

    /**
     * Check if debug mode is enabled
     */
    private function isDebugMode()
    {
        return (bool) Configuration::get('SEALMETRICS_DEBUG_MODE');
    }

    /**
     * Normalize attribute name
     */
    public static function normalizeAttributeName($name)
    {
        $name = strtolower(trim($name));
        $name = preg_replace('/[^a-z0-9]/', '', $name);

        if (isset(self::$attributeMap[$name])) {
            return self::$attributeMap[$name];
        }

        return $name;
    }

    /**
     * Get price excluding tax
     */
    private function getPriceExcludingTax($product, $idProductAttribute = null, $quantity = 1)
    {
        $price = Product::getPriceStatic(
            (int) $product->id,
            false, // without tax
            $idProductAttribute,
            6,
            null,
            false,
            true,
            $quantity
        );

        return round((float) $price, 2);
    }

    /**
     * Get product SKU (reference)
     */
    private function getProductSku($product, $idProductAttribute = null)
    {
        if ($idProductAttribute) {
            $combination = new Combination($idProductAttribute);
            if ($combination->reference) {
                return $combination->reference;
            }
        }

        return $product->reference ?: 'PROD-' . $product->id;
    }

    /**
     * Get normalized attributes for a combination
     */
    private function getCombinationAttributes($idProductAttribute)
    {
        if (!$idProductAttribute) {
            return [];
        }

        $attributes = [];
        $combination = new Combination($idProductAttribute);
        $combinationAttributes = $combination->getAttributesName($this->context->language->id);

        foreach ($combinationAttributes as $attr) {
            $attrGroup = new AttributeGroup($attr['id_attribute_group'], $this->context->language->id);
            $normalizedName = self::normalizeAttributeName($attrGroup->name);
            $attributes[$normalizedName] = $attr['name'];
        }

        return $attributes;
    }

    /**
     * Hook: displayHeader - Load main script and pageview
     */
    public function hookDisplayHeader($params)
    {
        $accountId = $this->getAccountId();
        if (empty($accountId)) {
            return '';
        }

        $debug = $this->isDebugMode() ? 'true' : 'false';

        $this->context->smarty->assign([
            'sealmetrics_account_id' => $accountId,
            'sealmetrics_debug' => $debug,
        ]);

        return $this->display(__FILE__, 'views/templates/hook/header.tpl');
    }

    /**
     * Hook: displayFooterProduct - Product view event
     */
    public function hookDisplayFooterProduct($params)
    {
        $accountId = $this->getAccountId();
        if (empty($accountId)) {
            return '';
        }

        $product = $params['product'];
        if (!$product) {
            return '';
        }

        // Handle both array and Product object
        if (is_array($product)) {
            $productId = (int) $product['id_product'];
            $idProductAttribute = isset($product['id_product_attribute']) ? (int) $product['id_product_attribute'] : 0;
            $productObj = new Product($productId, false, $this->context->language->id);
        } else {
            $productObj = $product;
            $productId = (int) $product->id;
            $idProductAttribute = 0;
        }

        $price = $this->getPriceExcludingTax($productObj, $idProductAttribute);
        $sku = $this->getProductSku($productObj, $idProductAttribute);
        $attributes = $this->getCombinationAttributes($idProductAttribute);

        // Get all available attribute groups for this product
        $availableAttributes = [];
        $productAttributes = $productObj->getAttributeCombinations($this->context->language->id);
        foreach ($productAttributes as $attr) {
            $normalizedName = self::normalizeAttributeName($attr['group_name']);
            if (!isset($availableAttributes[$normalizedName])) {
                $availableAttributes[$normalizedName] = [];
            }
            if (!in_array($attr['attribute_name'], $availableAttributes[$normalizedName])) {
                $availableAttributes[$normalizedName][] = $attr['attribute_name'];
            }
        }

        $properties = array_merge(['sku' => $sku], $attributes);

        $this->context->smarty->assign([
            'sealmetrics_product_price' => $price,
            'sealmetrics_product_properties' => json_encode($properties),
            'sealmetrics_product_id' => $productId,
            'sealmetrics_available_attributes' => json_encode($availableAttributes),
            'sealmetrics_attribute_map' => json_encode(self::$attributeMap),
        ]);

        return $this->display(__FILE__, 'views/templates/hook/product_view.tpl');
    }

    /**
     * Hook: actionFrontControllerSetMedia - Add JS for add-to-cart tracking
     */
    public function hookActionFrontControllerSetMedia($params)
    {
        $accountId = $this->getAccountId();
        if (empty($accountId)) {
            return;
        }

        // Register add-to-cart tracking JS
        $this->context->controller->registerJavascript(
            'sealmetrics-cart',
            'modules/' . $this->name . '/views/js/cart-tracking.js',
            [
                'position' => 'bottom',
                'priority' => 200,
            ]
        );

        // Pass attribute map to JS
        Media::addJsDef([
            'sealmetricsAttributeMap' => self::$attributeMap,
        ]);
    }

    /**
     * Hook: displayCheckoutProcess - Checkout step 1
     */
    public function hookDisplayCheckoutProcess($params)
    {
        return $this->outputCheckoutEvent(1);
    }

    /**
     * Hook: displayPaymentTop - Checkout step 2/3
     */
    public function hookDisplayPaymentTop($params)
    {
        return $this->outputCheckoutEvent(2);
    }

    /**
     * Output checkout funnel event
     */
    private function outputCheckoutEvent($step)
    {
        $accountId = $this->getAccountId();
        if (empty($accountId)) {
            return '';
        }

        $cart = $this->context->cart;
        if (!Validate::isLoadedObject($cart) || !$cart->nbProducts()) {
            return '';
        }

        $cartTotal = $cart->getOrderTotal(false); // false = without tax
        $products = $cart->getProducts();
        $skus = [];
        $itemCount = 0;

        foreach ($products as $product) {
            $sku = $product['reference'] ?: 'PROD-' . $product['id_product'];
            if (!empty($product['reference_attribute'])) {
                $sku = $product['reference_attribute'];
            }
            $skus[] = $sku;
            $itemCount += (int) $product['cart_quantity'];
        }

        $properties = [
            'sku' => implode(',', $skus),
            'item_count' => $itemCount,
        ];

        $this->context->smarty->assign([
            'sealmetrics_checkout_step' => $step,
            'sealmetrics_checkout_amount' => round($cartTotal, 2),
            'sealmetrics_checkout_properties' => json_encode($properties),
        ]);

        return $this->display(__FILE__, 'views/templates/hook/checkout.tpl');
    }

    /**
     * Hook: displayOrderConfirmation - Purchase event
     */
    public function hookDisplayOrderConfirmation($params)
    {
        $accountId = $this->getAccountId();
        if (empty($accountId)) {
            return '';
        }

        $order = isset($params['order']) ? $params['order'] : null;
        if (!$order) {
            // PS 1.7.x compatibility
            $order = isset($params['objOrder']) ? $params['objOrder'] : null;
        }

        if (!$order || !Validate::isLoadedObject($order)) {
            return '';
        }

        // Check if already tracked (duplicate prevention)
        $tracked = Configuration::get('SEALMETRICS_TRACKED_' . (int) $order->id);
        if ($tracked) {
            return '';
        }

        // Mark as tracked
        Configuration::updateValue('SEALMETRICS_TRACKED_' . (int) $order->id, true);

        // Calculate order total without tax
        $orderTotal = (float) $order->total_paid_tax_excl;
        $currency = new Currency($order->id_currency);
        $currencyCode = $currency->iso_code;

        $orderProducts = $order->getProducts();
        $skus = [];
        $attributes = [];
        $itemCount = 0;

        foreach ($orderProducts as $product) {
            $sku = $product['product_reference'] ?: 'PROD-' . $product['product_id'];
            if (!empty($product['product_attribute_id'])) {
                $combination = new Combination($product['product_attribute_id']);
                if ($combination->reference) {
                    $sku = $combination->reference;
                }

                // Get attributes
                $combAttrs = $this->getCombinationAttributes($product['product_attribute_id']);
                foreach ($combAttrs as $key => $value) {
                    if (!isset($attributes[$key])) {
                        $attributes[$key] = [];
                    }
                    if (!in_array($value, $attributes[$key])) {
                        $attributes[$key][] = $value;
                    }
                }
            }
            $skus[] = $sku;
            $itemCount += (int) $product['product_quantity'];
        }

        // Flatten attributes
        $flatAttributes = [];
        foreach ($attributes as $key => $values) {
            $flatAttributes[$key] = implode(',', $values);
        }

        $properties = array_merge(
            [
                'sku' => implode(',', $skus),
                'currency' => $currencyCode,
                'item_count' => $itemCount,
            ],
            $flatAttributes
        );

        // Filter empty values
        $properties = array_filter($properties, function ($v) {
            return $v !== '' && $v !== null;
        });

        $this->context->smarty->assign([
            'sealmetrics_purchase_amount' => round($orderTotal, 2),
            'sealmetrics_purchase_properties' => json_encode($properties),
        ]);

        return $this->display(__FILE__, 'views/templates/hook/purchase.tpl');
    }

    /**
     * Hook: actionCartSave - Track add to cart via cookie for JS pickup
     */
    public function hookActionCartSave($params)
    {
        $accountId = $this->getAccountId();
        if (empty($accountId)) {
            return;
        }

        $cart = $params['cart'];
        if (!Validate::isLoadedObject($cart)) {
            return;
        }

        // This hook fires on every cart save, we'll handle tracking via JS
        // by storing the last cart state and comparing
    }
}
