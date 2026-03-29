#software #networks 

POP3 (Post Office Protocol version 3) is ==a standard, application-layer Internet protocol used by email clients (such as Outlook, Thunderbird, or Apple Mail) to retrieve emails from a remote mail server over a TCP/IP connection==. It is designed as a "download-and-delete" protocol, where messages are transferred from the server to a single local device and typically removed from the server, making it ideal for users who access email from only one computer.

**Key Characteristics of POP3**

- **One-Way Synchronization:** POP3 only downloads emails from the server to the client; it does not sync changes (like "read" status or folders) back to the server.
- **Single-Device Focus:** Because messages are usually deleted from the server after download, they cannot be easily accessed from a second device.
- **Offline Access:** Once downloaded, emails are stored locally on the user's device, allowing them to be read without an internet connection.
- **Simple Operation:** It is easy to configure and maintain, designed for simple "store-and-forward" functionality.
- **Port Numbers:** POP3 uses port **110** for unencrypted communication, while **995** is used for secure (SSL/TLS) connections.

**How POP3 Works**

1. **Connection:** The email client connects to the mail server.
2. **Authentication:** The server verifies the username and password.
3. **Download:** The client downloads all new messages.
4. **Deletion:** By default, the server deletes the downloaded messages to free up space.
5. **Closing:** The connection is closed.  
    _Note: Some email clients allow settings to "leave a copy of messages on the server" for a set period, but this does not enable true synchronization like IMAP._