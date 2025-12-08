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
use Magento\Checkout\Model\Session as CheckoutSession;
use SealMetrics\Tracking\Helper\Data as Helper;

class Checkout extends Template
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
     * @param Context $context
     * @param Helper $helper
     * @param CheckoutSession $checkoutSession
     * @param array $data
     */
    public function __construct(
        Context $context,
        Helper $helper,
        CheckoutSession $checkoutSession,
        array $data = []
    ) {
        $this->helper = $helper;
        $this->checkoutSession = $checkoutSession;
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
     * Get cart data for tracking
     *
     * @return array
     */
    public function getCartData(): array
    {
        $quote = $this->checkoutSession->getQuote();
        if (!$quote || !$quote->getItemsCount()) {
            return [
                'amount' => 0,
                'skus' => '',
                'item_count' => 0
            ];
        }

        $skus = [];
        $itemCount = 0;

        foreach ($quote->getAllVisibleItems() as $item) {
            $skus[] = $item->getSku();
            $itemCount += (int) $item->getQty();
        }

        // Get subtotal (without tax)
        $amount = (float) $quote->getSubtotal();

        return [
            'amount' => round($amount, 2),
            'skus' => implode(',', $skus),
            'item_count' => $itemCount
        ];
    }

    /**
     * Get cart data as JSON
     *
     * @return string
     */
    public function getCartDataJson(): string
    {
        return json_encode($this->getCartData());
    }
}
