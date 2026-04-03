https://itp.nyu.edu/networks/explanations/a-gentle-introduction-to-http/#id.cawiu339co1i

![[condev - client server.webp]]
1. The client and server establish a **connection,** technically called a **session.**

2. The client starts off by asking to make a TCP/IP connection to the server using the domain name (eg. http://bobcat.library.nyu.edu/) or its IP number equivalent (128.122.149.83, in the case of our example site) and the specific port number given in the address (Borrowing a metaphor from Charles Severance’s [introductory course to Internet technologies](https://www.google.com/url?q=https://www.coursera.org/learn/internet-history&sa=D&ust=1513305734108000&usg=AFQjCNGr9MUtXNvIZkPzkFXQa5o-8IJMDw), if a domain name or IP were to be taken as a phone number for an organization, a port would be the extension to locate a specific person inside this organization, here are some [common port numbers).](https://www.google.com/url?q=http://www.meridianoutpost.com/resources/articles/well-known-tcpip-ports.php&sa=D&ust=1513305734109000&usg=AFQjCNEUi5DBFb6bObIMOcwFS8b1uZAx2A) 
3. The server accepts the connection.

4. The client sends a request to the server. A request is a document, or a set of [ASCII characters](https://www.google.com/url?q=https://ascii.cl/&sa=D&ust=1513305734109000&usg=AFQjCNHK-6t2MRdTcQbQ1PaZLJ2Jv_PPPg) where it defines what it wants to do with the server (it might want to get a specific resource, post information to the server, or even delete stuff from it. More on this on [Section 4).](https://itp.nyu.edu/networks/explanations/a-gentle-introduction-to-http/#h.k0wjg4v1ker1) 
5. The server answers to the client’s request with a document in HTML format (this is the actual resource a browser requests) and a message to notify the client if it has been successful or not in attending its demands (see [Section 5](https://itp.nyu.edu/networks/explanations/a-gentle-introduction-to-http/#h.1fteiab9iz4a) for some examples of these responses).

6. The server ends the connection, or the session, when the full resource has been transferred.

References:
- The Real Difference Between a URL and a URI: https://danielmiessler.com/blog/difference-between-uri-url
- Mozilla Overview of HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
- The Original HTTP as defined in 1991: https://www.w3.org/Protocols/HTTP/AsImplemented.html
- 