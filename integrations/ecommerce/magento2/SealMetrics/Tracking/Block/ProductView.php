<?php
/**
 * SealMetrics Tracking Module for Magento 2
 *
 * @author    SealMetrics
 * @copyright 2024 SealMetrics
 * @license   MIT License
 */

declare(strict_types=1);

namespace SealMetrics\Tracking\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Framework\Registry;
use SealMetrics\Tracking\Helper\Data as Helper;

class ProductView extends Template
{
    /**
     * @var Helper
     */
    protected $helper;

    /**
     * @var Registry
     */
    protected $registry;

    /**
     * Constructor
     *
     * @param Context $context
     * @param Helper $helper
     * @param Registry $registry
     * @param array $data
     */
    public function __construct(
        Context $context,
        Helper $helper,
        Registry $registry,
        array $data = []
    ) {
        $this->helper = $helper;
        $this->registry = $registry;
        parent::__construct($context, $data);
    }

    /**
     * Check if module is enabled
     *
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->helper->isEnabled();
    }

    /**
     * Get current product
     *
     * @return \Magento\Catalog\Model\Product|null
     */
    public function getProduct()
    {
        return $this->registry->registry('current_product');
    }

    /**
     * Get product data for tracking
     *
     * @return array|null
     */
    public function getProductData(): ?array
    {
        $product = $this->getProduct();
        if (!$product) {
            return null;
        }

        $price = $this->helper->getPriceExcludingTax($product);
        $sku = $this->helper->getProductSku($product);
        $attributes = $this->helper->getNormalizedAttributes($product);

        return [
            'sku' => $sku,
            'price' => $price,
            'attributes' => $attributes
        ];
    }

    /**
     * Get product data as JSON
     *
     * @return string
     */
    public function getProductDataJson(): string
    {
        $data = $this->getProductData();
        if (!$data) {
            return '{}';
        }

        $properties = array_merge(['sku' => $data['sku']], $data['attributes']);
        $properties = array_filter($properties, function ($v) {
            return $v !== '' && $v !== null;
        });

        return json_encode([
            'price' => $data['price'],
            'properties' => $properties
        ]);
    }

    /**
     * Get attribute map as JSON
     *
     * @return string
     */
    public function getAttributeMapJson(): string
    {
        return json_encode($this->helper->getAttributeMap());
    }
}
