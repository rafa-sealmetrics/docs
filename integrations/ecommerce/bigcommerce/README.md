# SealMetrics Tracking for BigCommerce

Advanced e-commerce tracking integration with SealMetrics for BigCommerce stores. Tracks pageviews, product views, add-to-cart, checkout funnel, and purchases.

## Installation

### Via Script Manager (Recommended)

1. Go to **BigCommerce Admin** > **Storefront** > **Script Manager**
2. Click **Create a Script**
3. Configure:
   - **Name**: SealMetrics Tracking
   - **Location**: Head
   - **Pages**: All Pages
   - **Script type**: Script
4. Paste the contents of `embed-snippet.html`
5. Replace `YOUR_ACCOUNT_ID` with your SealMetrics Account ID
6. Click **Save**

### Via Theme Files (Advanced)

1. Go to **Storefront** > **My Themes** > **Advanced** > **Edit Theme Files**
2. Navigate to `templates/layout/base.html`
3. Add the script before the closing `</head>` tag
4. Save and publish

## Configuration

Edit the `CONFIG` object at the top of the script:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `accountId` | string | `'YOUR_ACCOUNT_ID'` | **Required.** Your SealMetrics Account ID |
| `debugMode` | boolean | `false` | Enable console logging for debugging |
| `attributeMap` | object | `{...}` | Attribute name normalization map |

### Example Configuration

```javascript
var CONFIG = {
    accountId: 'my-company-id',
    debugMode: true,  // Enable for testing
    attributeMap: {
        'color': 'colour',
        'colour': 'colour',
        'size': 'size',
        'talla': 'size',
        'material': 'material',
        'weight': 'weight'
    }
};
```

## Events Tracked

### 1. Pageview

Fired on every page load:

```javascript
{
    event: 'pageview',
    use_session: 1
}
```

### 2. Product View (Microconversion)

Fired on product detail pages:

```javascript
{
    event: 'microconversion',
    label: 'product_view',
    amount: 29.99,  // Price excluding tax
    properties: {
        sku: 'SHIRT-001',
        colour: 'Blue',
        size: 'Large'
    }
}
```

### 3. Add to Cart (Microconversion)

Fired when a product is added to cart:

```javascript
{
    event: 'microconversion',
    label: 'add-to-cart',
    amount: 59.98,  // Price × quantity
    properties: {
        sku: 'SHIRT-001',
        colour: 'Blue',
        size: 'Large'
    }
}
```

### 4. Checkout Funnel (Microconversion)

Fired at each checkout step:

```javascript
// Cart page
{
    event: 'microconversion',
    label: 'checkout1',
    amount: 149.97,
    properties: {
        sku: 'SHIRT-001,PANTS-002,SHOES-003',
        item_count: 3
    }
}

// Checkout page (customer info)
{
    event: 'microconversion',
    label: 'checkout2',
    amount: 149.97,
    properties: { ... }
}

// Payment selection
{
    event: 'microconversion',
    label: 'checkout3',
    amount: 149.97,
    properties: { ... }
}
```

### 5. Purchase (Conversion)

Fired on order confirmation page:

```javascript
{
    event: 'conversion',
    label: 'purchase',
    amount: 149.97,  // Order total excluding tax
    properties: {
        sku: 'SHIRT-001,PANTS-002,SHOES-003',
        currency: 'USD',
        item_count: 3,
        colour: 'Blue,Black',
        size: 'Large,32'
    }
}
```

## Attribute Normalization

Product attributes are normalized for cross-platform consistency:

| Original | Normalized |
|----------|------------|
| color, colour, colore, couleur, farbe | `colour` |
| size, talla, taille, größe | `size` |
| material, materiale, matière | `material` |
| weight, peso, poids | `weight` |

## Page Type Detection

The script automatically detects page types using BigCommerce's body classes:

| Body Class | Page Type |
|------------|-----------|
| `page-type-product` | Product detail page |
| `page-type-category` | Category/listing page |
| `page-type-cart` | Cart page |
| `page-type-checkout` | Checkout page |
| `page-type-orderconfirmation` | Order confirmation |

## Data Sources

The script uses multiple data sources for maximum compatibility:

1. **Storefront API** (`/api/storefront/carts`) - Cart data
2. **JSON-LD** - Product structured data
3. **Meta tags** - Product SKU
4. **DOM elements** - Prices, options, order details

## Duplicate Prevention

Purchase events are deduplicated using localStorage:
- Stores last 50 tracked order IDs
- Prevents duplicate tracking on page refresh

## Manual Tracking

You can manually trigger tracking events:

```javascript
// Track product view
window.sealmetricsTrackProductView();

// Track add to cart
window.sealmetricsTrackAddToCart('SKU-123', 29.99, 2, { colour: 'Blue' });

// Track checkout step
window.sealmetricsTrackCheckout(1, 149.97, 'SKU-1,SKU-2', 3);

// Track purchase
window.sealmetricsTrackPurchase(149.97, 'SKU-1,SKU-2', 3, 'USD', { colour: 'Blue' });

// Push custom event
window.sealmetricsTrack.push({
    event: 'microconversion',
    label: 'custom_event',
    properties: { custom: 'value' }
});
```

## Privacy & Compliance

This integration does **NOT** collect or store:
- Order IDs or transaction IDs
- Customer email addresses
- Personal identifiable information (PII)
- Payment information

Only anonymous e-commerce data is tracked:
- Product SKUs
- Prices (excluding tax)
- Quantities
- Product attributes (color, size, etc.)
- Currency codes

## Troubleshooting

### Events not firing

1. Enable `debugMode: true` in configuration
2. Open browser console (F12)
3. Look for `[SealMetrics]` log messages
4. Verify page type is detected correctly

### Product data not captured

1. Check if JSON-LD structured data exists on product pages
2. Verify product has a SKU set in BigCommerce admin
3. Check for JavaScript errors in console

### Checkout steps not tracking

1. BigCommerce's checkout is embedded/secure
2. The script tracks checkout1/2/3 based on available hooks
3. Some custom checkouts may need manual tracking calls

### Duplicate purchases

1. Check localStorage for `sm_purch` key
2. Clear it if testing: `localStorage.removeItem('sm_purch')`

## Compatibility

- **BigCommerce Stencil themes**: Full support
- **BigCommerce Blueprint themes**: Limited support
- **Optimized checkout**: Supported
- **Custom checkouts**: May require manual tracking

## Support

For issues or questions, contact support@sealmetrics.com
