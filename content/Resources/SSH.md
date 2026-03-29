#software #networks 

Secure Shell (SSH) is ==a cryptographic network protocol used to securely operate network services, log into remote machines, and execute commands over unsecured networks==. It provides strong encryption to prevent eavesdropping and connection hijacking. Common uses include remote server administration, secure file transfers (SFTP), and creating secure tunnels.

**How SSH Works**

- **Encryption:** SSH uses asymmetric cryptography (public-key) to authenticate the server/client and symmetric cryptography to encrypt the session data.
- **Connection:** It operates on TCP port 22 by default, providing a secure, encrypted channel through firewalls.
- **Structure:** Comprises three layers: the transport layer (encryption/security), user authentication, and the connection layer (channel management).

**Benefits of SSH**

- **Security:** Protects against unauthorized access and eavesdropping.
- **Remote Access:** Allows full control of a remote computer's terminal.
- **Port Forwarding/Tunneling:** Can securely tunnel other network protocols, such as VNC or database traffic. 

**Common SSH Clients**

- **OpenSSH:** The premier, default client in Linux, macOS, and Windows.
- **PuTTY:** A popular open-source client for Windows.
- **SecureCRT:** A commercial SSH client with advanced features.
- **Built-in Terminals:** Windows PowerShell/CMD and macOS/Linux Terminal.