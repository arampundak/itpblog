03.02.26

We started with talking about readings. At what point can technology disappear? Turning from manual drive to automatic to robotaxi. Tech innovation -> tech knowledge getting lost. When tech being tech we stop learning how it works - its never going away - but how do we maintain it?

---
- **PSK (Pre-Shared Key)** = a **shared secret**, usually a Wi-Fi password.
- **WPA / WPA2 / WPA3** = **security protocols** that define _how_ devices authenticate and encrypt traffic.
On the NYU net we use WPA-Enterprise (802.1X / EAP) on enterprise - theres not a shared password - every time you log in on the network my device checks on the nyu network if I have the correct ID and Pass. 
**What _actually_ happens on NYU Wi-Fi**
1. Your device connects to the access point
2. The access point asks NYU’s authentication server:
    > “Is this user allowed?”
3. You authenticate with:
- NetID
- password
- sometimes certificates 
1. A **unique encryption key** is generated _per session_

If I have Arduino on 370jaystreet network - I can connect to it from NYU's network in Abu-Dabi. Like connecting to the NYU library from home.
VPN - Ill operate my virtual network on your physical network with your consent - Albert login - you can only access if you are on the network. My machine is given an IP address from the network, its going through a VPN gateway router - maintaining that address to access a server.

---
We used `netcat` to listen to TCP and logging to a file by using the program `tee`. `tte -a` 

---
Servers:

**Setting Up a Virtual Host**
https://itp.nyu.edu/networks/setting-up-a-virtual-host/
We are going to set up a host on Virtual Ocean (Tom likes Virtual Ocean). Set up a website, like Wix but without GUI. Charged by bandwidth usage. You get an IP address and build your website from the terminal ground up. Like Amazon AWS. We will be making a new Droplet (your site is a droplet in the ocean). Choose Region -> Datacenter 2 -> Ubunto (version of Linux) -> Disk type: SSD -> Generate an SSH Key. We did things on the terminal to create an SSH key in a folder - it has public and hidden files. 
SSH - is like putting your password in an envelope. 
A host has to have an IP address, names comes after number - the droplet is a host (a virtual computer that can run server - servers can serve websites). Host->Server->Site.

Network - we are trying to connect, being vulnerable - in theater can be good in IT is bad.

**Firewall**
Block ports that are not being used. UFD
Open the virtual host in the terminal `sudo ufw status` to see what ports are ALLOWed and what are DENYed. 

---
