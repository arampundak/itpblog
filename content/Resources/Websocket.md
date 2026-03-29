#networks #software 

WebSocket is a computer communications protocol providing full-duplex, bidirectional communication channels over a single, long-lived [[TCP]] connection. Unlike HTTP, which requires constant requests for data, WebSockets enable real-time, low-latency data exchange where both client and server can send data at any time.

**Key Aspects of WebSockets:**

- **Persistent Connection:** Once established, the connection remains open, reducing the overhead of repeatedly opening/closing connections.
- **Bidirectional Flow:** Data flows in both directions simultaneously (full-duplex).
- **Protocol Upgrade:**
     It starts as an HTTP request and uses the `Upgrade` header to switch protocols to WebSocket, operating over ports 80 or 443.
- **Real-time Applications:** Ideal for apps requiring instant updates, such as chat applications, live sports tickers, online gaming, and collaborative tools.
- **Low Latency:** Eliminates the need for HTTP polling, making data transmission much faster.