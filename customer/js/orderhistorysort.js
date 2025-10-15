
    document.addEventListener('DOMContentLoaded', function() {
        // Get references to the DOM elements
        const sortDropdown = document.getElementById('orderSort');
        const orderList = document.getElementById('orderHistoryList'); 
        
        // Check if both elements exist before proceeding
        if (!sortDropdown || !orderList) {
            console.error("Sorting elements not found in the DOM.");
            return; 
        }

        // Helper function to extract relevant data (date and price) from an order card
        function getOrderData(card) {
            // Find the date text, clean up whitespace
            const dateStr = card.querySelector('.mm-order-date').textContent.trim();
            // Find the total price text, remove currency symbol (₱), and clean up whitespace
            const priceStr = card.querySelector('.mm-total-amount-display').textContent.replace('₱', '').trim();
            
            return {
                element: card,
                // Convert date string to a millisecond timestamp (numerical value for sorting)
                timestamp: new Date(dateStr).getTime(), 
                // Convert price string to a floating-point number
                price: parseFloat(priceStr)
            };
        }

        function sortOrders() {
            const sortBy = sortDropdown.value;
            // Convert the live HTMLCollection of order cards into an array to use the .sort() method
            const ordersArray = Array.from(orderList.children); 

            // Sort the array based on the selected criteria
            ordersArray.sort((a, b) => {
                const dataA = getOrderData(a);
                const dataB = getOrderData(b);
                
                if (sortBy === 'newest') {
                    // Sort descending by date (Newest first, highest timestamp)
                    return dataB.timestamp - dataA.timestamp; 
                } else if (sortBy === 'oldest') {
                    // Sort ascending by date (Oldest first, lowest timestamp)
                    return dataA.timestamp - dataB.timestamp;
                } else if (sortBy === 'high-price') {
                    // Sort descending by price (Highest price first)
                    return dataB.price - dataA.price;
                } else if (sortBy === 'low-price') {
                    // Sort ascending by price (Lowest price first)
                    return dataA.price - dataB.price;
                }
                // Default return case (no change)
                return 0;
            });

            // Re-append the sorted elements to the DOM
            // Appending existing elements automatically removes them from their current position 
            // and places them at the end of the container in the new, sorted order.
            ordersArray.forEach(order => {
                orderList.appendChild(order);
            });
        }

        // 1. Set default sorting (Newest Date) on page load.
        // The HTML defaults to 'newest' being selected, so we call sortOrders() once to apply it.
        sortOrders(); 

        // 2. Attach the event listener: run sortOrders() every time the dropdown value changes.
        sortDropdown.addEventListener('change', sortOrders);
    });
