document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const topicItems = document.querySelectorAll('.topic-item');

    if (!searchInput || !topicItems.length) {
        return;
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            topicItems.forEach(item => {
                item.classList.remove('hidden');
                if (item.tagName === 'DETAILS') {
                    item.open = false;
                    item.querySelectorAll('.sub-topic-link').forEach(link => link.classList.remove('hidden'));
                }
            });
            return;
        }

        topicItems.forEach(item => {
            let hasMatch = false;

            const mainTitle = item.querySelector('.accordion-title')?.textContent.toLowerCase() || '';
            if (mainTitle.includes(query)) {
                hasMatch = true;
            }

            if (item.tagName === 'DETAILS') {
                const subLinks = item.querySelectorAll('.sub-topic-link');
                let hasSubTopicMatch = false;

                subLinks.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    if (linkText.includes(query)) {
                        hasMatch = true;
                        hasSubTopicMatch = true;
                        link.classList.remove('hidden');
                    } else {
                        link.classList.add('hidden');
                    }
                });

                if (hasSubTopicMatch) {
                    item.open = true;
                }
            }
            
            if (hasMatch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});