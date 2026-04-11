// Simple test to verify the website functionality
console.log('Testing G318 Travel Website...');

// Test that the updatePhotoDisplay function works
if (typeof updatePhotoDisplay === 'function') {
    console.log('✓ updatePhotoDisplay function exists');
} else {
    console.log('✗ updatePhotoDisplay function missing');
}

// Test that initPhotoGallery function works
if (typeof initPhotoGallery === 'function') {
    console.log('✓ initPhotoGallery function exists');
} else {
    console.log('✗ initPhotoGallery function missing');
}

// Test that showNotification function works
if (typeof showNotification === 'function') {
    console.log('✓ showNotification function exists');
} else {
    console.log('✗ showNotification function missing');
}

// Test that CSS variables are defined
if (typeof getComputedStyle === 'function' && document.documentElement) {
    const style = getComputedStyle(document.documentElement);
    if (style.getPropertyValue('--color-mountain') &&
        style.getPropertyValue('--color-lake') &&
        style.getPropertyValue('--color-culture') &&
        style.getPropertyValue('--color-road')) {
        console.log('✓ CSS travel theme variables defined');
    } else {
        console.log('✗ CSS travel theme variables missing');
    }
} else {
    console.log('? Unable to test CSS variables (no DOM)');
}

console.log('Test completed.');