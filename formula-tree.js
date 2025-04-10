document.addEventListener('DOMContentLoaded', function() {
    // Get the tree content from localStorage
    const treeContent = localStorage.getItem('formulaTreeContent');
    if (treeContent) {
        document.getElementById('formulaTreeContainer').innerHTML = treeContent;
    }

    // Add click handler for tree toggles
    document.addEventListener('click', function(e) {
        const header = e.target.closest('.function-header');
        if (header) {
            const content = header.nextElementSibling;
            const toggle = header.querySelector('.tree-toggle');
            if (content && toggle) {
                content.classList.toggle('collapsed');
                toggle.textContent = content.classList.contains('collapsed') ? '▶' : '▼';
            }
        }
    });
});

// Listen for messages from the parent window
chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
    if (request.type === 'FORMULA_TREE_DATA') {
        document.getElementById('formulaTreeContainer').innerHTML = request.html;
    }
});
