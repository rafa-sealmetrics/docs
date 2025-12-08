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
use SealMetrics\Tracking\Helper\Data as Helper;

class Tracking extends Template
{
    /**
     * @var Helper
     */
    protected $helper;

    /**
     * Constructor
     *
     * @param Context $context
     * @param Helper $helper
     * @param array $data
     */
    public function __construct(
        Context $context,
        Helper $helper,
        array $data = []
    ) {
        $this->helper = $helper;
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
     * Get Account ID
     *
     * @return string
     */
    public function getAccountId(): string
    {
        return $this->helper->getAccountId();
    }

    /**
     * Check if debug mode is enabled
     *
     * @return bool
     */
    public function isDebugMode(): bool
    {
        return $this->helper->isDebugMode();
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
