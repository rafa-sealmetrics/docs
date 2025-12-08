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

class PurchaseObserver implements ObserverInterface
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
            $order = $observer->getEvent()->getOrder();

            if (!$order) {
                return;
            }

            // Check if already tracked (duplicate prevention)
            if ($order->getData('sealmetrics_tracked')) {
                return;
            }

            // Calculate order total without tax
            $orderTotal = (float) $order->getSubtotal(); // Subtotal is without tax
            $currency = $order->getOrderCurrencyCode();
            $itemCount = 0;
            $skus = [];
            $attributes = [];

            foreach ($order->getAllVisibleItems() as $item) {
                $sku = $item->getSku();
                $skus[] = $sku;
                $itemCount += (int) $item->getQtyOrdered();

                // Get product options/attributes
                $productOptions = $item->getProductOptions();
                if (isset($productOptions['attributes_info'])) {
                    foreach ($productOptions['attributes_info'] as $attrInfo) {
                        $normalizedName = $this->helper->normalizeAttributeName($attrInfo['label']);
                        if (!isset($attributes[$normalizedName])) {
                            $attributes[$normalizedName] = [];
                        }
                        $value = $attrInfo['value'];
                        if (!in_array($value, $attributes[$normalizedName])) {
                            $attributes[$normalizedName][] = $value;
                        }
                    }
                }
            }

            // Flatten attributes
            $flatAttributes = [];
            foreach ($attributes as $key => $values) {
                $flatAttributes[$key] = implode(',', $values);
            }

            // Build event data
            $eventData = [
                'event' => 'conversion',
                'label' => 'purchase',
                'amount' => round($orderTotal, 2),
                'properties' => array_merge(
                    [
                        'sku' => implode(',', $skus),
                        'currency' => $currency,
                        'item_count' => $itemCount
                    ],
                    $flatAttributes
                )
            ];

            // Filter empty values
            $eventData['properties'] = array_filter($eventData['properties'], function ($v) {
                return $v !== '' && $v !== null;
            });

            // Store in session for success page JS pickup
            $this->checkoutSession->setSealmetricsPurchaseEvent($eventData);

            // Mark order as tracked (stored in session, will be picked up by success page)
            // Note: We don't modify the order object here to avoid database writes in observer

        } catch (\Exception $e) {
            // Silently fail to not break order placement
        }
    }
}
