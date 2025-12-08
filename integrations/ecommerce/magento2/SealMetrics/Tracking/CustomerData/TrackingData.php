<?php
/**
 * SealMetrics Tracking Module for Magento 2
 *
 * @author    SealMetrics
 * @copyright 2024 SealMetrics
 * @license   MIT License
 */

declare(strict_types=1);

namespace SealMetrics\Tracking\CustomerData;

use Magento\Customer\CustomerData\SectionSourceInterface;
use Magento\Checkout\Model\Session as CheckoutSession;
use SealMetrics\Tracking\Helper\Data as Helper;

class TrackingData implements SectionSourceInterface
{
    /**
     * @var CheckoutSession
     */
    protected $checkoutSession;

    /**
     * @var Helper
     */
    protected $helper;

    /**
     * Constructor
     *
     * @param CheckoutSession $checkoutSession
     * @param Helper $helper
     */
    public function __construct(
        CheckoutSession $checkoutSession,
        Helper $helper
    ) {
        $this->checkoutSession = $checkoutSession;
        $this->helper = $helper;
    }

    /**
     * Get section data
     *
     * @return array
     */
    public function getSectionData(): array
    {
        if (!$this->helper->isEnabled()) {
            return ['events' => []];
        }

        $events = [];

        // Get pending events from session
        $pendingEvents = $this->checkoutSession->getSealmetricsEvents();
        if ($pendingEvents && is_array($pendingEvents)) {
            $events = $pendingEvents;
            // Clear the session after reading
            $this->checkoutSession->unsSealmetricsEvents();
        }

        return [
            'events' => $events,
            'timestamp' => time()
        ];
    }
}
