<?php
/**
 * SealMetrics Tracking Module for Magento 2
 *
 * @author    SealMetrics
 * @copyright 2024 SealMetrics
 * @license   MIT License
 */

declare(strict_types=1);

namespace SealMetrics\Tracking\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;
use Magento\Catalog\Model\Product;
use Magento\ConfigurableProduct\Model\Product\Type\Configurable;

class Data extends AbstractHelper
{
    /**
     * Configuration paths
     */
    const XML_PATH_ENABLED = 'sealmetrics/general/enabled';
    const XML_PATH_ACCOUNT_ID = 'sealmetrics/general/account_id';
    const XML_PATH_DEBUG_MODE = 'sealmetrics/general/debug_mode';

    /**
     * Attribute normalization map (same as WooCommerce/PrestaShop)
     */
    const ATTRIBUTE_MAP = [
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
     * Check if module is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabled(?int $storeId = null): bool
    {
        return $this->scopeConfig->isSetFlag(
            self::XML_PATH_ENABLED,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get Account ID
     *
     * @param int|null $storeId
     * @return string
     */
    public function getAccountId(?int $storeId = null): string
    {
        return (string) $this->scopeConfig->getValue(
            self::XML_PATH_ACCOUNT_ID,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if debug mode is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDebugMode(?int $storeId = null): bool
    {
        return $this->scopeConfig->isSetFlag(
            self::XML_PATH_DEBUG_MODE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Normalize attribute name using central map
     *
     * @param string $name
     * @return string
     */
    public function normalizeAttributeName(string $name): string
    {
        $name = strtolower(trim($name));
        $name = preg_replace('/[^a-z0-9]/', '', $name);

        if (isset(self::ATTRIBUTE_MAP[$name])) {
            return self::ATTRIBUTE_MAP[$name];
        }

        return $name;
    }

    /**
     * Get price excluding tax
     *
     * @param Product $product
     * @param float|null $price
     * @return float
     */
    public function getPriceExcludingTax(Product $product, ?float $price = null): float
    {
        if ($price === null) {
            $price = (float) $product->getFinalPrice();
        }

        // If tax is included in price, extract it
        $priceIncludesTax = $this->scopeConfig->isSetFlag(
            'tax/calculation/price_includes_tax',
            ScopeInterface::SCOPE_STORE
        );

        if ($priceIncludesTax) {
            $taxClassId = $product->getTaxClassId();
            if ($taxClassId) {
                // Simplified: assume we need to remove tax
                // In production, use Magento's tax calculation service
                $taxRate = $this->getProductTaxRate($product);
                if ($taxRate > 0) {
                    $price = $price / (1 + ($taxRate / 100));
                }
            }
        }

        return round($price, 2);
    }

    /**
     * Get product tax rate (simplified)
     *
     * @param Product $product
     * @return float
     */
    protected function getProductTaxRate(Product $product): float
    {
        // Default implementation - in production use TaxCalculation service
        return 0.0;
    }

    /**
     * Get product SKU
     *
     * @param Product $product
     * @return string
     */
    public function getProductSku(Product $product): string
    {
        return $product->getSku() ?: 'PROD-' . $product->getId();
    }

    /**
     * Get normalized attributes for a product
     *
     * @param Product $product
     * @param array $selectedOptions
     * @return array
     */
    public function getNormalizedAttributes(Product $product, array $selectedOptions = []): array
    {
        $attributes = [];

        // Get configurable attributes if this is a simple product of a configurable
        if ($product->getTypeId() === 'simple') {
            $parentIds = $this->getParentIds($product);
            if (!empty($parentIds)) {
                // Get the configurable product's super attributes
                foreach ($selectedOptions as $code => $value) {
                    $normalizedName = $this->normalizeAttributeName($code);
                    $attributes[$normalizedName] = $value;
                }
            }
        }

        // Get custom options/attributes from product
        $productAttributes = $product->getAttributes();
        foreach ($productAttributes as $attribute) {
            $code = $attribute->getAttributeCode();
            if (strpos($code, 'color') !== false ||
                strpos($code, 'colour') !== false ||
                strpos($code, 'size') !== false ||
                strpos($code, 'talla') !== false ||
                strpos($code, 'material') !== false) {

                $value = $product->getAttributeText($code);
                if ($value) {
                    $normalizedName = $this->normalizeAttributeName($code);
                    $attributes[$normalizedName] = is_array($value) ? implode(',', $value) : $value;
                }
            }
        }

        // Override with selected options
        foreach ($selectedOptions as $code => $value) {
            $normalizedName = $this->normalizeAttributeName($code);
            if (!empty($value)) {
                $attributes[$normalizedName] = $value;
            }
        }

        return $attributes;
    }

    /**
     * Get parent product IDs for a simple product
     *
     * @param Product $product
     * @return array
     */
    protected function getParentIds(Product $product): array
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $configurable = $objectManager->get(Configurable::class);
        return $configurable->getParentIdsByChild($product->getId());
    }

    /**
     * Get attribute map for JS
     *
     * @return array
     */
    public function getAttributeMap(): array
    {
        return self::ATTRIBUTE_MAP;
    }
}
