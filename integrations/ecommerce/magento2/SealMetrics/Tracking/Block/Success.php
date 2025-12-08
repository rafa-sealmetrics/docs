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

class Success extends Template
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
     * Get purchase event data
     *
     * @return array|null
     */
    public function getPurchaseEventData(): ?array
    {
        $eventData = $this->checkoutSession->getSealmetricsPurchaseEvent();

        if ($eventData) {
            // Clear the session to prevent duplicate tracking on refresh
            $this->checkoutSession->unsSealmetricsPurchaseEvent();
            return $eventData;
        }

        return null;
    }

    /**
     * Get purchase event as JSON
     *
     * @return string
     */
    public function getPurchaseEventJson(): string
    {
        $data = $this->getPurchaseEventData();
        if (!$data) {
            return 'null';
        }
        return json_encode($data);
    }
}
