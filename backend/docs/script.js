async function fetchStock() {
    const symbol = document.getElementById('stockSymbol').value.toUpperCase(); // Convert input to uppercase
    const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://your-server-url.com';

    try {
        const response = await fetch(`${API_BASE_URL}/trades?symbol=${symbol}`);
        console.log("API request sent to:", `${API_BASE_URL}/trades?symbol=${symbol}`);

        if (!response.ok) {
            console.log("Error response from server:", response.status);
            document.getElementById('trades-table').innerHTML = `<p>Failed to fetch stock data. Try again.</p>`;
            return;
        }

        const tradeData = await response.json();
        console.log("API response:", tradeData);

        // Clear existing table rows
        const table = document.getElementById('trades-table');
        table.innerHTML = `
            <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
            </tr>
        `;

        // Populate the table with the fetched stock data
        const trade = tradeData.trade;

        let row = table.insertRow();
        row.insertCell(0).innerHTML = tradeData.symbol || 'N/A';  // Stock symbol
        row.insertCell(1).innerHTML = trade.s || 'N/A';  // Quantity (size)
        row.insertCell(2).innerHTML = trade.p || 'N/A';  // Price
        row.insertCell(3).innerHTML = trade.t ? new Date(trade.t).toLocaleString() : 'N/A';  // Date (converted to local string)
    } catch (error) {
        console.error('Error fetching stock data:', error);
        document.getElementById('trades-table').innerHTML = `<p>Failed to fetch stock data. Try again.</p>`;
    }
}