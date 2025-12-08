<?php
/**
 * SealMetrics Tracking Module for Magento 2
 *
 * @author    SealMetrics
 * @copyright 2024 SealMetrics
 * @license   MIT License
 */

declare(strict_types=1);

namespace SealMetrics\Tracking\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use SealMetrics\Tracking\Helper\Data as Helper;

class AddToCartObserver implements ObserverInterface
{
    /**
     * @var Helper
     */
    protected $helper;

    /**
     * @var CheckoutSession
     */
    protected $checkoutSession;

    /**
     * Constructor
     *
     * @param Helper $helper
     * @param CheckoutSession $checkoutSession
     */
    public function __construct(
        Helper $helper,
        CheckoutSession $checkoutSession
    ) {
        $this->helper = $helper;
        $this->checkoutSession = $checkoutSession;
    }

    /**
     * Execute observer
     *
     * @param Observer $observer
     * @return void
     */
    public function execute(Observer $observer): void
    {
        if (!$this->helper->isEnabled()) {
            return;
        }

        try {
            $product = $observer->getEvent()->getProduct();
            $request = $observer->getEvent()->getRequest();

            if (!$product) {
                return;
            }

            $qty = (int) ($request->getParam('qty') ?: 1);
            $price = $this->helper->getPriceExcludingTax($product);
            $sku = $this->helper->getProductSku($product);

            // Get selected options
            $selectedOptions = [];
            $superAttribute = $request->getParam('super_attribute');
            if ($superAttribute && is_array($superAttribute)) {
                $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                $eavConfig = $objectManager->get(\Magento\Eav\Model\Config::class);

                foreach ($superAttribute as $attributeId => $optionId) {
                    $attribute = $eavConfig->getAttribute('catalog_product', $attributeId);
                    if ($attribute) {
                        $optionText = $attribute->getSource()->getOptionText($optionId);
                        $selectedOptions[$attribute->getAttributeCode()] = $optionText;
                    }
                }
            }

            $attributes = $this->helper->getNormalizedAttributes($product, $selectedOptions);

            // Build event data
            $eventData = [
                'event' => 'microconversion',
                'label' => 'add-to-cart',
                'amount' => $price * $qty,
                'properties' => array_merge(['sku' => $sku], $attributes)
            ];

            // Filter empty values
            $eventData['properties'] = array_filter($eventData['properties'], function ($v) {
                return $v !== '' && $v !== null;
            });

            // Store in session for JS pickup
            $pendingEvents = $this->checkoutSession->getSealmetricsEvents() ?: [];
            $pendingEvents[] = $eventData;
            $this->checkoutSession->setSealmetricsEvents($pendingEvents);

        } catch (\Exception $e) {
            // Silently fail to not break checkout
        }
    }
}
