document.addEventListener('DOMContentLoaded', () => {
    const viewSwitcher = document.getElementById('viewSwitcher');

    // Use chrome.storage API to get the saved view
    chrome.storage.sync.get(['selectedView'], function(result) {
        if (result.selectedView) {
            viewSwitcher.value = result.selectedView;
            switchView(result.selectedView);
        }
    });

    viewSwitcher.addEventListener('change', () => {
        const selectedView = viewSwitcher.value;
        switchView(selectedView);

        // Use chrome.storage API to save the current state
        chrome.storage.sync.set({'selectedView': selectedView}, function() {
            console.log('View is set to ' + selectedView);
        });
    });
});

function switchView(viewName) {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.style.display = 'none';
    });

    const selectedIframe = document.getElementById(viewName);
    selectedIframe.style.display = 'block';
}