---
date: 2026-10-09
tags: []
draft: false
author:
url:
---
## Matrix Scanning

Ways to drive LED:
An LED is a diode, current can go over it in just one way.

Float state - is like connecting pin to nothing

![[ped - 6 1.webp]]

![[ped - 6 2.webp]]

![[ped - 6 3.webp]]

![[ped - 6 4.webp]]

specify pinMode to tell a pin if its reading or writing
default for pin is output - meaning write
the default is not high or low - its nothing

to reset animation set all dW to LOW

pM(OUT) = GND
pM(IN) = reading = float = nothing