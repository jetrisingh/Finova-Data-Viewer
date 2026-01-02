async function fetchCryptoData() {
  const coins = ["bitcoin", "ethereum", "ripple", "binancecoin", "solana"];
  const tableBody = document.getElementById("cryptoTableBody");

  // Clear any existing rows
  tableBody.innerHTML = "";

  for (const coin of coins) {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
      const data = await response.json();

      const name = data.name;
      const price = `$${data.market_data.current_price.usd.toLocaleString()}`;
      const marketCap = `$${(data.market_data.market_cap.usd / 1e9).toFixed(1)} billion`;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>${marketCap}</td>
      `;
      tableBody.appendChild(row);
    } catch (error) {
      console.error(`Error fetching ${coin}:`, error);
    }
  }
}

// Run the function when the page loads
window.addEventListener("DOMContentLoaded", fetchCryptoData);

// Refresh every 60 seconds
setInterval(fetchCryptoData, 60000);
