# SealMetrics Integrations

Official tracking integrations for SealMetrics. These plugins and scripts enable seamless tracking across various platforms.

## E-commerce Integrations

Full e-commerce tracking: pageviews, product views, add-to-cart, checkout funnel, and purchases.

| Platform | Type | Location |
|----------|------|----------|
| [WooCommerce](./ecommerce/woocommerce/) | WordPress Plugin | `ecommerce/woocommerce/` |
| [PrestaShop](./ecommerce/prestashop/) | PrestaShop Module | `ecommerce/prestashop/` |
| [Magento 2](./ecommerce/magento2/) | Magento Module | `ecommerce/magento2/` |
| [BigCommerce](./ecommerce/bigcommerce/) | JavaScript | `ecommerce/bigcommerce/` |

### Events Tracked (E-commerce)

| Event | Type | Description |
|-------|------|-------------|
| `pageview` | pageview | Every page load |
| `product_view` | microconversion | Product detail page |
| `add-to-cart` | microconversion | Item added to cart |
| `checkout1` | microconversion | Cart / checkout start |
| `checkout2` | microconversion | Shipping / billing info |
| `checkout3` | microconversion | Payment selection |
| `purchase` | conversion | Order completed |

## Lead Tracking Integrations

Form submission tracking for lead generation sites.

| Platform | Type | Location |
|----------|------|----------|
| [WordPress](./leads/wordpress/) | WordPress Plugin | `leads/wordpress/` |
| [Webflow](./leads/webflow/) | JavaScript | `leads/webflow/` |

### Events Tracked (Leads)

| Event | Type | Description |
|-------|------|-------------|
| `pageview` | pageview | Every page load |
| `lead` | conversion | Form submission |

## Common Architecture

All integrations share the same architecture:

1. **Single script load** - SealMetrics JS loaded once (async)
2. **Global queue** - `window.sealmetricsTrack` array
3. **Pageview first** - Always fires before other events
4. **Debug mode** - Optional console logging

### Attribute Normalization

All e-commerce integrations normalize product attributes for cross-platform consistency:

| Original | Normalized |
|----------|------------|
| color, colour, colore, couleur, farbe | `colour` |
| size, talla, taille, größe | `size` |
| material, materiale, matière | `material` |
| weight, peso, poids | `weight` |

### Privacy

All integrations are privacy-focused:

- ❌ No order IDs or transaction IDs
- ❌ No email addresses
- ❌ No personal identifiable information (PII)
- ✅ Only anonymous behavioral data
- ✅ GDPR compliant

## Installation

See each integration's README for specific installation instructions.

## Support

For issues or questions, contact support@sealmetrics.com
