#resource #networks #software 

**OAuth2 Authentication Flow:** When you want to access someone's Google Calendar, you can't just use a username/password. Instead, Google uses OAuth2, which gives you two types of tokens:

- **Access token**: Short-lived (expires in ~1 hour), used to actually make API calls
- **Refresh token**: Long-lived, used to get new access tokens when they expire

**Why Keep It Server-Side:**

- **Security**: If someone gets physical access to your ESP32 controller, they could potentially extract the token from its memory and gain access to your Google Calendar
- **Simplicity**: The ESP32 would need to handle token expiration and refresh logic, which adds complexity
- **Single point of management**: If you need to revoke access or rotate credentials, you only update one file on the server instead of reflashing every ESP32

**What `.env` means:** A `.env` file is where you store sensitive configuration like API keys and tokens separate from your code, so they don't get accidentally committed to GitHub.

Learned about whilde doing [[Data Display Device 2 - API Game]]
