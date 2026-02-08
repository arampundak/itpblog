#software 
![[invisable roomates.webp]]

https://vimeo.com/569763074
Behind the scenes - https://nicolehe.substack.com/p/behind-the-scenes-on-invisible-roommates
by [[Nicole He]]

Invisible Roommates reveals the secret lives of the devices you share your home with.
- Exploring the theme of Privacy & Trust in the home
- Making invisible things - visible
- In a way that was particularly playful and accessible to a non-technical audience.
- capture the network traffic between devices
- being able to visualize some level of what is going on between them

> "all the connected objects in our homes are a little bit like house spirits, constantly doing secret things and talking to each other behind our backs" - Nicole He

>It was also cool to see, for example, that when I had the computer and printer characters in the scene, and I sent a print job from my computer, the printer would awaken from it’s “sleeping” state, the computer would send it paper airplanes, and my actual printer would print something out.

>Technology is ~happening~ all around us, and I think there is value in making the invisible things visible, as well as in taking a more playful approach to visualizing something as dense and inscrutable as packet sniffing

How its done:
Mainly - its all local to a netwrok they know and control. Not something encrypted like NYU's... They used a Node.js library called **`local-devices`** to find devices that are _connected to the same Wi-Fi network_ as the computer running the server. It works by:
- Running `arp -a` underneath (a command that lists all devices the system knows about on your local network), and
- **Getting the IP + MAC addresses** of those devices.
A MAC address is a unique identifier for a network interface on a device — it doesn’t reveal personal info, but it _lets you distinguish separate devices_.

**Packet sniffing** lets you _see actual network traffic that’s flowing over the local network interface_, including:
- The _source_ MAC address (who sent a packet)
- The _destination_ MAC address (who it was sent to)

Ideas:
- A device that lets you see interactions between devices - maybe a camera with a screen that shows whats infront of you