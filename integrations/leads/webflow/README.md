# SealMetrics Tracking for Webflow

Lead tracking integration with SealMetrics for Webflow sites. Tracks form submissions as conversions.

## Installation

### Option 1: Quick Setup (Recommended)

1. Go to your Webflow project **Settings** > **Custom Code**
2. In the **Head Code** section, paste the following:

```html
<script>
(function(){"use strict";var e={accountId:"YOUR_ACCOUNT_ID",debugMode:false,conversionLabel:"lead",trackPagePath:true,trackPageTitle:true,customFormSelectors:[],excludeFormSelectors:[".w-commerce-commercecheckoutform","[data-sealmetrics-exclude]"],formNameAttribute:"data-name"};if(!e.accountId||"YOUR_ACCOUNT_ID"===e.accountId)return void console.warn("[SealMetrics] Account ID not configured.");window.sealmetricsTrack=window.sealmetricsTrack||[],window.sealmetricsDebug=e.debugMode,window.sealmetricsLoaded=!1,window.sealmetricsPageviewSent=!1;function t(e,t){window.sealmetricsDebug&&console&&console.log&&console.log("[SealMetrics]",e,t||"")}window.smLog=t;function n(){if("undefined"!=typeof sealmetrics&&"function"==typeof sealmetrics.track)for(;window.sealmetricsTrack.length>0;){var e=window.sealmetricsTrack.shift();t("Processing event:",e),sealmetrics.track(e)}}var r=window.sealmetricsTrack.push;function o(){var t=document.createElement("script");t.src="https://cdn.sealmetrics.com/"+e.accountId+"/sm.js",t.async=!0,t.onload=function(){window.sealmetricsLoaded=!0,n()},t.onerror=function(){},document.head.appendChild(t)}function a(){if(!window.sealmetricsPageviewSent){window.sealmetricsPageviewSent=!0;var e={event:"pageview",use_session:1};t("Queueing pageview:",e),window.sealmetricsTrack.push(e)}}function i(){var t={};return e.trackPagePath&&(t.page_path=window.location.pathname),e.trackPageTitle&&(t.page_title=document.title||""),t}function c(t){var n=t.getAttribute(e.formNameAttribute);return n||(n=t.getAttribute("name"))||(n=t.getAttribute("id"))||(n=t.getAttribute("aria-label"))||"webflow_form"}function s(t){for(var n=0;n<e.excludeFormSelectors.length;n++)try{if(t.matches(e.excludeFormSelectors[n]))return!0}catch(t){}return!1}function l(n){var r={form_name:n},o=i();Object.keys(o).forEach(function(e){r[e]=o[e]});var a={event:"conversion",label:e.conversionLabel,properties:r};t("Queueing lead conversion:",a),window.sealmetricsTrack.push(a)}function u(){var n=[".w-form form","form[data-name]"];e.customFormSelectors.forEach(function(e){e&&n.push(e)});var r=n.join(", "),o=new MutationObserver(function(e){e.forEach(function(e){if("attributes"===e.type&&"style"===e.attributeName&&e.target.classList.contains("w-form-done")){var n=e.target.closest(".w-form");if(n){var r=n.querySelector("form");if(r&&!s(r)){var o=c(r);t("Webflow form success:",o),l(o)}}}})});document.querySelectorAll(".w-form-done").forEach(function(e){o.observe(e,{attributes:!0})}),document.addEventListener("submit",function(e){var n=e.target;n.matches(r)&&!s(n)&&(t("Form submit:",c(n)),n.closest(".w-form")||l(c(n)))})}function d(){o(),a(),u()}window.sealmetricsTrack.push=function(){var e=r.apply(this,arguments);return window.sealmetricsLoaded&&n(),e},window.sealmetricsTrackLead=l,"loading"===document.readyState?document.addEventListener("DOMContentLoaded",d):d()})();
</script>
```

3. Replace `YOUR_ACCOUNT_ID` with your SealMetrics Account ID
4. **Publish** your site

### Option 2: Full Script (with comments)

For more configuration options, use the full `sealmetrics-tracking.js` file and paste it in a `<script>` tag.

## Configuration

Edit the `CONFIG` object at the top of the script:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `accountId` | string | `'YOUR_ACCOUNT_ID'` | **Required.** Your SealMetrics Account ID |
| `debugMode` | boolean | `false` | Enable console logging for debugging |
| `conversionLabel` | string | `'lead'` | Label for conversion events |
| `trackPagePath` | boolean | `true` | Include page path in properties |
| `trackPageTitle` | boolean | `true` | Include page title in properties |
| `customFormSelectors` | array | `[]` | Additional CSS selectors for custom forms |
| `excludeFormSelectors` | array | `[...]` | CSS selectors for forms to exclude |
| `formNameAttribute` | string | `'data-name'` | Attribute to get form name |

### Example Configuration

```javascript
var CONFIG = {
    accountId: 'my-company-id',
    debugMode: true,  // Enable for testing
    conversionLabel: 'contact',
    trackPagePath: true,
    trackPageTitle: true,
    customFormSelectors: [
        '#newsletter-form',
        '.custom-contact-form'
    ],
    excludeFormSelectors: [
        '.w-commerce-commercecheckoutform',
        '[data-sealmetrics-exclude]',
        '#search-form'  // Exclude search forms
    ],
    formNameAttribute: 'data-name'
};
```

## Events Tracked

### Pageview

Fired on every page load:

```javascript
{
    event: 'pageview',
    use_session: 1
}
```

### Lead Conversion

Fired when a form is successfully submitted:

```javascript
{
    event: 'conversion',
    label: 'lead',  // Or your custom conversionLabel
    properties: {
        form_name: 'Contact Form',
        page_path: '/contact',
        page_title: 'Contact Us - My Company'
    }
}
```

## Excluding Forms

To exclude a specific form from tracking, add the `data-sealmetrics-exclude` attribute:

```html
<form data-sealmetrics-exclude>
    <!-- This form will not be tracked -->
</form>
```

Or add the form selector to `excludeFormSelectors` in the configuration.

## Manual Tracking

You can manually track a lead conversion from custom JavaScript:

```javascript
// Track with a form name
window.sealmetricsTrackLead('Custom Form Name');

// Or push directly to the queue
window.sealmetricsTrack.push({
    event: 'conversion',
    label: 'lead',
    properties: {
        form_name: 'Custom Form',
        custom_field: 'custom_value'
    }
});
```

## Webflow Form Detection

The script automatically detects Webflow form submissions by:

1. **MutationObserver**: Watches for Webflow's success state (`.w-form-done` becoming visible)
2. **Submit Event**: Listens for form submit events as a fallback
3. **Fetch Interception**: Monitors AJAX requests to Webflow's form endpoint

This ensures reliable tracking for both AJAX and non-AJAX form submissions.

## Privacy

This integration does **NOT** collect or store:
- Email addresses
- Names or personal information
- User IDs or identifiers
- Any form field values

Only the following anonymous data is tracked:
- Form name (from `data-name` attribute)
- Page path
- Page title

## Troubleshooting

### Forms not being tracked

1. Enable `debugMode: true` in the configuration
2. Open browser console and look for `[SealMetrics]` logs
3. Ensure the form has a `data-name` attribute set in Webflow
4. Check that the form is not in `excludeFormSelectors`

### Script not loading

1. Verify your Account ID is correct
2. Check browser console for errors
3. Ensure the script is in the **Head Code** section (not Footer)

### Duplicate events

The script has built-in duplicate prevention. If you see duplicates:
1. Ensure the script is only included once
2. Check for multiple form success handlers

## Support

For issues or questions, contact support@sealmetrics.com
