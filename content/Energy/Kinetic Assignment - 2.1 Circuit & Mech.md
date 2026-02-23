For the Kinetic Assignment I decided to use a Dancing Robot Toy for Kids with a wind-up mechanism. By disabling the spring and connecting to a motor the user spins a stepper motor to create AC current electricity. That is transferred to DC current with a bridge rectifier, making a Gearbox Micro Motor (DC 6V 100RPM Speed Reduction Motor) spin.

I had a [[Kinetic Assignment - 2.2 Talk with Jeff]]

I started with deconstruction of the toy to understand its internal mechanism and what should I change.

![[nrg kinetic 1.webp]]

And went further inside to understand the gear:
![[nrg kinetic 8.webp]]
While also creating a bridge rectifier circuit. I found an old 3d printer stepper motor and had to look up its specs to know its wires (A+ A- / B+ B-).

![[nrg kinetic 3.webp]]

The circuit works, but not as I wish it to. I started exploring ways to make the circuit build or store electricity within its capacitors and discharge only when the user is not spinning. 
I need to further Explore BEAM robotics as they have a similar input output. 


List of parts

| Part                                                      | Link                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Micro Gear Motor                                          | https://www.amazon.com/dp/B0C9QC4SRY?ref=ppx_yo2ov_dt_b_fed_asin_title                                                                                                                                                                                                                                                                                    |
| Robot Toy                                                 | https://www.amazon.com/MQIONGJOOY-Wind-up-Dancing-Clockwork-Christmas/dp/B0CXXDF8N7?pd_rd_w=VPjxM&content-id=amzn1.sym.28c64fbb-22b3-4b43-9c44-fc03d50fe5f9&pf_rd_p=28c64fbb-22b3-4b43-9c44-fc03d50fe5f9&pf_rd_r=PV21HXP5BG8R9Y2CSDDV&pd_rd_wg=T6bkH&pd_rd_r=38dcf081-9316-460a-9f01-abf18dcc1915&pd_rd_i=B0CXXDF8N7&psc=1&ref_=pd_bap_d_grid_rp_0_1_ec_i |
| Breadboard for prototyping                                |                                                                                                                                                                                                                                                                                                                                                           |
| Bridge Rectifier: DF04M-ND BRIDGE RECT 1P 400V 1.5A 4-DIP | https://www.digikey.com/en/products/detail/onsemi/DF04M/965265                                                                                                                                                                                                                                                                                            |
| Nema23 Stepper Motor: KL23H251-28-4AP                     | Look below for Data Sheet                                                                                                                                                                                                                                                                                                                                 |
![[nrg - KL23H251-28-4AP.pdf]]