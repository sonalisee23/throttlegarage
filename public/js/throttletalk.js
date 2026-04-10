document.addEventListener('DOMContentLoaded', function() {
    // Channel data
    const channels = {
        'diy': {
            name: '🛠️ DIY Mods & Builds',
            description: 'Share your custom builds, modifications, and DIY projects with the community. Get feedback and help from experienced builders.',
            rules: [
                'Post clear pictures of your work',
                'Include parts list when possible',
                'Tag your post with bike model',
                'Be specific about questions'
            ]
        },
        'tech-help': {
            name: '❓ Tech Help',
            description: 'Get technical assistance from the community. Share your expertise and help others solve their bike issues.',
            rules: [
                'Describe the problem clearly',
                'Include bike model and year',
                'Share relevant photos/videos',
                'Follow up with results'
            ]
        },
        'events': {
            name: '🏍️ Ride Events',
            description: 'Find and organize rides, track days, and meetups with fellow riders in your area.',
            rules: [
                'Include date, time, and location',
                'Specify ride difficulty level',
                'List any requirements',
                'Update if event changes'
            ]
        },
        'showcase': {
            name: '📸 Show Your Ride',
            description: 'Show off your bike, share your latest upgrades, and get feedback from the community.',
            rules: [
                'High-quality photos only',
                'List major modifications',
                'One showcase post per week',
                'No advertisements'
            ]
        },
        'deals': {
            name: '🔥 Deals & Drops',
            description: 'Exclusive deals, discounts, and new product releases for community members.',
            rules: [
                'Verify deals before posting',
                'Include expiration dates',
                'No referral links',
                'Tag deals by category'
            ]
        },
        'general': {
            name: '💬 General Chat',
            description: 'Discuss anything motorcycle-related with the community.',
            rules: [
                'Keep it motorcycle-related',
                'Be respectful to others',
                'No spam or ads',
                'Use appropriate language'
            ]
        }
    };

    // DOM Elements
    const channelLinks = document.querySelectorAll('.channel-item');
    const currentChannelTitle = document.getElementById('currentChannel');
    const channelDescription = document.getElementById('channelDescription');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const onlineMembersList = document.getElementById('onlineMembers');

    // Sample user data (replace with actual user authentication)
    const currentUser = {
        id: 'user1',
        name: 'John Rider',
        avatar: 'images/avatars/user1.jpg'
    };

    // Sample online members (replace with actual real-time data)
    const onlineMembers = [
        { id: 'user1', name: 'John Rider', avatar: 'images/avatars/user1.jpg' },
        { id: 'user2', name: 'Sarah Biker', avatar: 'images/avatars/user2.jpg' },
        { id: 'user3', name: 'Mike Mechanic', avatar: 'images/avatars/user3.jpg' }
    ];

    // Initialize online members
    function updateOnlineMembers() {
        onlineMembersList.innerHTML = '';
        onlineMembers.forEach(member => {
            const memberEl = document.createElement('div');
            memberEl.className = 'member-avatar online';
            memberEl.title = member.name;
            memberEl.innerHTML = `<img src="${member.avatar}" alt="${member.name}">`;
            onlineMembersList.appendChild(memberEl);
        });
    }

    // Channel switching
    channelLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const channelId = this.getAttribute('data-channel');
            const channel = channels[channelId];

            // Update active state
            channelLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Update channel info
            currentChannelTitle.textContent = channel.name;
            channelDescription.textContent = channel.description;

            // Load channel messages
            loadChannelMessages(channelId);
        });
    });

    // Load channel messages
    function loadChannelMessages(channelId) {
        // Clear existing messages
        messagesContainer.innerHTML = '';

        // Sample messages (replace with actual message loading)
        const messages = getSampleMessages(channelId);
        messages.forEach(message => {
            const messageEl = createMessageElement(message);
            messagesContainer.appendChild(messageEl);
        });

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Create message element
    function createMessageElement(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.innerHTML = `
            <div class="message-avatar">
                <img src="${message.author.avatar}" alt="${message.author.name}">
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${message.author.name}</span>
                    <span class="message-time">${formatTime(message.timestamp)}</span>
                </div>
                <div class="message-text">${message.content}</div>
                ${message.attachments ? createAttachmentsHTML(message.attachments) : ''}
            </div>
        `;
        return messageEl;
    }

    // Create attachments HTML
    function createAttachmentsHTML(attachments) {
        return `
            <div class="message-attachments">
                ${attachments.map(att => `
                    <img src="${att}" alt="Attachment" class="message-image">
                `).join('')}
            </div>
        `;
    }

    // Format timestamp
    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Handle message submission
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = messageInput.value.trim();
        if (!content) return;

        // Create new message
        const message = {
            author: currentUser,
            content: content,
            timestamp: new Date(),
            attachments: []
        };

        // Add message to UI
        const messageEl = createMessageElement(message);
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Clear input
        messageInput.value = '';

        // TODO: Send message to server
    });

    // Sample messages generator
    function getSampleMessages(channelId) {
        const baseMessages = [
            {
                author: { id: 'user2', name: 'Sarah Biker', avatar: 'images/avatars/user2.jpg' },
                content: 'Just installed the new exhaust system from the Track Day Kit. The sound is amazing! 🏍️',
                timestamp: new Date(Date.now() - 1000 * 60 * 15),
                attachments: ['images/exhaust-installed.jpg']
            },
            {
                author: { id: 'user3', name: 'Mike Mechanic', avatar: 'images/avatars/user3.jpg' },
                content: 'Nice installation! Make sure to check the mounting brackets after the first ride.',
                timestamp: new Date(Date.now() - 1000 * 60 * 10)
            },
            {
                author: { id: 'user1', name: 'John Rider', avatar: 'images/avatars/user1.jpg' },
                content: 'Thanks for the tip! Will do that tomorrow after work.',
                timestamp: new Date(Date.now() - 1000 * 60 * 5)
            }
        ];

        // Add channel-specific messages
        if (channelId === 'diy') {
            baseMessages.unshift({
                author: { id: 'user4', name: 'Tech Master', avatar: 'images/avatars/user4.jpg' },
                content: 'Here\'s a guide for installing the quick-shifter from the Track Day Kit:',
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
                attachments: ['images/quickshifter-guide.jpg']
            });
        }

        return baseMessages;
    }

    // Initialize
    updateOnlineMembers();
    loadChannelMessages('diy');

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const channelsSidebar = document.querySelector('.channels-sidebar');

    menuBtn.addEventListener('click', function() {
        channelsSidebar.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !channelsSidebar.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            channelsSidebar.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            channelsSidebar.classList.remove('active');
        }
    });
}); 