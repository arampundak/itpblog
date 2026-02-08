Previous episodes [[Device Project 1 - Ideation]]

A building with great wifi:
![[condev building with great wifi.webp]]
(King Kong 1933)

Fabri and I met to develop our concept. We explored different protocols on the local network to understand what information is actually visible. We really liked the idea of showing what machines are talking to other machines, and to discover what is there expect for the printers on the itp floor. Through ARP scans and mDNS discovery, ==we learned that NYU intentionally protects its network: devices are isolated, peer discovery is limited, and most activity is deliberately hidden.== What you see is not “what’s going on,” but what the infrastructure allows you to see.

On NYU Wi-Fi, you **cannot truly “see” other devices around you** in a concrete, identifiable way. -More details are in the end of this post-

In order to know everything and everyone on a network - including who is talking to whom - we would need to create our own network, where we control the rules of visibility. This seems to be the situation in [[Invisible Roommates - Eran Hilleli & Nicole He]] project. ==Visibility comes from **ownership and consent**, not from scanning public infrastructure.==

At that point, we realized this direction wasn’t very interesting on its own.

From there, the conversation shifted.

We spoke with **Ryan**, who introduced us to [[WIRESHARK]]. Using it, we suddenly saw **a huge amount of activity**: many protocols, constant connections, packets flowing everywhere. This revealed that even when identities are hidden, the network is extremely alive.
![[condev wireshark 1.webp]]

Ryan explained that **looking at Wi-Fi networks on the ITP floor alone wouldn’t give us much insight**, because the scale is too small and the network is heavily controlled. He suggested **changing the scale of observation**.

Instead of focusing on one room or one floor, we could move to the **city scale**.

If we walk through the street with a network sniffer (we still need to find the right word and metaphor), we can detect:

- how many networks exist in different buildings - but tackle one building at a time.
- which buildings are network-dense and which are sparse - and what does that tell us about them
- how “healthy” or “outdated” they appear.

This opens a way to see the city differently - not through architecture or people, but through **invisible digital infrastructure**.  
==The street becomes readable in a new way, revealing patterns about our surroundings that are normally impossible to see.==


---

if all else fails: 'CHEESE'

“Opt-in neighbors” - ask people for consent to be seen by the Arduino scanning. Open the camera on your laptop and take "group" photo with whom said yes to be seen by you.

Make the “neighbors” be devices that **choose to announce themselves**.
- You + Fabri each have a microcontroller (or laptop script) that broadcasts:
    - a tiny identifier (e.g., “FabriBot”, “AramBot”)
    - a few signals (mood/role/status)
- The room becomes “inhabited” when people opt in by joining your system.

**How to sense them (safe):**
- **MQTT presence**: each device publishes a heartbeat (“I’m alive”)
- **BLE beacons**: devices broadcast advertisements that you read locally
- **mDNS/Bonjour / SSDP**: service discovery on a network you control

**Why it works:** You get real “entities,” real interaction, and you’re not surveilling strangers.

---
More details:
Because NYU uses **enterprise Wi-Fi with client isolation, proxy ARP, MAC randomization, and filtered multicast** we can't see shit in it - The network is selectively opaque.
## ARP scan
ARP entries appear when:  your computer talks to something, **or** something talks to you, **or** the network infrastructure proxies traffic on your behalf.
I ran `arp -a` ->
And got from my terminal:
```
nyuny-1471-gw.wireless.net.nyu.edu (10.20.0.1) at 0:0:5e:0:1:32 on en0 ifscope [ethernet] 
10-20-3-237.dynapool.wireless.nyu.edu (10.20.3.237) at da:af:87:1b:a0:49 on en0 ifscope [ethernet] 
10-20-10-89.dynapool.wireless.nyu.edu (10.20.10.89) at 82:7f:c6:aa:b5:f3 on en0 ifscope [ethernet] 
10-20-16-29.dynapool.wireless.nyu.edu (10.20.16.29) at 9a:7a:11:d9:bd:3f on en0 ifscope [ethernet] 
10-20-23-219.dynapool.wireless.nyu.edu (10.20.23.219) at f2:24:12:dd:ec:8c on en0 ifscope [ethernet] 
10-20-27-33.dynapool.wireless.nyu.edu (10.20.27.33) at 26:8e:8f:7c:e1:e4 on en0 ifscope [ethernet] 
10-20-28-92.dynapool.wireless.nyu.edu (10.20.28.92) at 16:bb:1d:12:51:14 on en0 ifscope [ethernet] 
10-20-32-38.dynapool.wireless.nyu.edu (10.20.32.38) at 6a:54:6d:a8:53:70 on en0 ifscope [ethernet] 
10-20-38-113.dynapool.wireless.nyu.edu (10.20.38.113) at aa:64:e0:28:40:58 on en0 ifscope [ethernet] 
10-20-48-218.dynapool.wireless.nyu.edu (10.20.48.218) at 22:d0:38:6:9b:e2 on en0 ifscope [ethernet] 
10-20-51-13.dynapool.wireless.nyu.edu (10.20.51.13) at 5c:e9:1e:6b:88:34 on en0 ifscope [ethernet] 
10-20-52-44.dynapool.wireless.nyu.edu (10.20.52.44) at 42:cd:24:a2:3a:99 on en0 ifscope [ethernet] 
10-20-56-106.dynapool.wireless.nyu.edu (10.20.56.106) at 9e:5e:d5:b9:18:77 on en0 ifscope [ethernet] 
10-20-74-2.dynapool.wireless.nyu.edu (10.20.74.2) at 86:87:b4:b9:5:c3 on en0 ifscope [ethernet] 
10-20-82-250.dynapool.wireless.nyu.edu (10.20.82.250) at 6e:1d:24:1:1:30 on en0 ifscope [ethernet] 
10-20-95-187.dynapool.wireless.nyu.edu (10.20.95.187) at 3c:6:30:1b:5e:87 on en0 ifscope [ethernet] 
10-20-102-164.dynapool.wireless.nyu.edu (10.20.102.164) at 72:17:74:e9:7e:c6 on en0 ifscope [ethernet] 
10-20-104-6.dynapool.wireless.nyu.edu (10.20.104.6) at f0:18:98:57:bd:d5 on en0 ifscope [ethernet] 
10-20-108-51.dynapool.wireless.nyu.edu (10.20.108.51) at e2:10:d3:50:f5:a9 on en0 ifscope [ethernet] 
10-20-110-16.dynapool.wireless.nyu.edu (10.20.110.16) at 74:a6:cd:d3:63:39 on en0 ifscope [ethernet] 
10-20-110-136.dynapool.wireless.nyu.edu (10.20.110.136) at 36:aa:40:35:fc:3b on en0 ifscope [ethernet] 
10-20-123-80.dynapool.wireless.nyu.edu (10.20.123.80) at c6:1d:7e:8a:5a:74 on en0 ifscope [ethernet] 
10-20-123-237.dynapool.wireless.nyu.edu (10.20.123.237) at 7c:f3:4d:e5:d8:8c on en0 ifscope [ethernet] 
10-20-125-133.dynapool.wireless.nyu.edu (10.20.125.133) at c6:1b:65:93:3b:bf on en0 ifscope [ethernet] 
10-20-127-12.dynapool.wireless.nyu.edu (10.20.127.12) at 1e:46:6f:1a:8:53 on en0 ifscope [ethernet] 
10-20-127-255.dynapool.wireless.nyu.edu (10.20.127.255) at ff:ff:ff:ff:ff:ff on en0 ifscope [ethernet] mdns.mcast.net (224.0.0.251) at 1:0:5e:0:0:fb on en0 ifscope permanent [ethernet]
```

`nyuny-1471-gw.wireless.net.nyu.edu (10.20.0.1)` - ==The default gateway==, This is the router that connects you to the rest of the network / internet.
`10-20-XX-YY.dynapool.wireless.nyu.edu` - Other NYU Wi-Fi clients represented via **proxy ARP**, Often abstracted by the controller.

```
da:af:87:1b:a0:49
9a:7a:11:d9:bd:3f
f2:24:12:dd:ec:8c
```
These are ==locally administered MAC addresses==. Modern OSes (iOS, Android, macOS) randomize MACs, Enterprise Wi-Fi enforces this for privacy. So you _cannot_ reliably infer vendor anymore

`10-20-127-255 ... ff:ff:ff:ff:ff:ff`
==Broadcast address==

`mdns.mcast.net (224.0.0.251)` - ==mDNS multicast address==

## DNS scan
Lists **service types** being advertised via Bonjour/mDNS on the local link.
I ran `dns-sd -B _services._dns-sd._udp` ->
and got from my terminal:
```
Browsing for _services._dns-sd._udp 
DATE: ---Sat 07 Feb 2026--- 17:48:05.432 
...STARTING... 
Timestamp A/R Flags if Domain Service Type Instance Name 
17:48:05.433 Add 3 1 . _tcp.local. _airplay 
17:48:05.433 Add 3 1 . _tcp.local. _raop 
17:48:05.433 Add 3 1 . _tcp.local. _companion-link 
17:48:05.433 Add 3 14 . _tcp.local. _airplay 
17:48:05.433 Add 3 14 . _tcp.local. _raop 
17:48:05.433 Add 3 14 . _tcp.local. _companion-link 
17:48:05.433 Add 3 1 . _udp.local. _asquic 
17:48:05.433 Add 2 14 . _udp.local. _asquic
```

Im seeing these service _types_:
- **`_airplay._tcp`**  
AirPlay receiver discovery (Apple TV, Mac, speaker, projector, etc.)
- **`_raop._tcp`**
RAOP = _Remote Audio Output Protocol_ (AirPlay audio)
- **`_companion-link._tcp`**  
Apple’s “companion” connectivity (used for nearby Apple device pairing/continuity-type features)
- **`_asquic._udp`**  
Apple QUIC-related discovery (Apple uses QUIC in a bunch of local/nearby service contexts)

So: my space is advertising **Apple-oriented media + nearby-device services**

I ran `dns-sd -B _airplay._tcp` to see more about it ->
recived in the terminal:
```
Browsing for _airplay._tcp 
DATE: ---Sat 07 Feb 2026--- 
17:52:02.046 
...STARTING... 
Timestamp A/R Flags if Domain Service Type Instance Name 
17:52:02.047 Add 3 1 local. _airplay._tcp. Aram’s MacBook Pro 
17:52:02.047 Add 2 14 local. _airplay._tcp. Aram’s MacBook Pro
```
- My **own MacBook** is advertising itself as an **AirPlay receiver**
- It is doing so via **mDNS / Bonjour**
- The network is allowing **self-advertised local services**, but not broad peer discovery
On **NYU / ITP enterprise Wi-Fi**:
- Client-to-client mDNS discovery is **filtered or isolated**
- Devices can: announce themselves & hear infrastructure
- ==But cannot freely see each other==



---
