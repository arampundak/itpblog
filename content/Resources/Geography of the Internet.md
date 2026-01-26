#networks #software 

from [[ConDev - 1st class - Assignments]]

https://itp.nyu.edu/classes/undnet/geography-of-the-internet/

A **network** a series of _nodes_ connected by _links_. 
**Random Network**: distance is measured in links, a distributed network
![[network_hops.webp]]
**Centralized Networks**: all nodes are linked to one central node. Looks like star. Tight control, inflexible. 
**Decentralized networks** are collections of  several hubs of nodes. Each hub has a central node, but the hubs are all linked together through other links.
**Complete Network**: every node is connected directly to every other node. Pentagram shaped with star connecting all vertices.  
![[complete_-networks-1.webp]]

**Small Worlds Network**: The greater the density of links in a network, the more possible paths there are for the message to get through to the end point, and the less critical any node is to the functioning of the network. The more possible paths there are for your messages, the more reliable their service will be. _It's like finding a job through a friend of a friend._
![[small_worlds_network.webp]]
**How are computer networks structured?**

There are  different standards of interconnection, Organizations like the  [International Standards Organization (ISO)](https://www.iso.org/home.html), the [Institute of Electrical and Electronics Engineers (IEEE)](https://www.ieee.org/about/ieee-history.html) and the United Nations’ [International Telecommunication Union (ITU)](https://www.itu.int/en/Pages/default.aspx) all negotiate between governments, corporations and other industry stakeholders to develop and maintain these standards.

Open Systems Interconnection Model (OSI)
This model breaks a network into several layers, enables different companies to concentrate on different layers, and know that their hardware and software will interoperate with other companies’ equipment. 
"Please Do Not Throw Sausage Pizza Away" - Physical, Data Link, Network, Transport, Session, Presentation, and Application.

The **internet protocol (IP)** is the most ubiquitous network-layer protocol. It ==defines what kinds of devices get to define a network, and how they assign addresses==. A **router** on an IP network is a device which defines the network and the range of addresses assigned to other devices when they’re connected to that network.
Sending information across the internet will lead to 1 and 0 transmitted in the form of electrical signals,
192.88.1.1
(8 bits) . (8 bits) . (8 bits) . (8 bits) = 32 bits total
Each block is a byte, meaning IP address is composed of (8X4=) 32 numbers. Each “byte” (the numbers separated by dots) can be **0–255**  because 8 bits → 2⁸ = **256 possibilities**
Every IP address is split into two logical parts: (NETWROK) (HOST). - **Network part** → identifies _which network_ **Host part** → identifies _which device on that network_
NAT - taking multiple addresses from inside your network and presents a single IP address pointing out towards the internet.  ![[_media/private-public-ip.webp]]

**Media Access Control (MAC)** - A unique ==hardware identifier for network devices==. Each address is six bytes long and identifies a network interface of a device. A laptop that has a WiFi radio and an Ethernet jack has two network interfaces, and therefore two MAC addresses.
![[MAC-Address.webp]]

An **ARP (Address Resolution Protocol)** request is ==a broadcast packet sent across a local network (LAN) to map a known IPv4 address to an unknown physical MAC address==
