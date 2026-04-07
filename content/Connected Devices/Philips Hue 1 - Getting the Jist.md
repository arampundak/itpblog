For Philips Hue, changing state uses **PUT**.
The CLIP debugger lets you **test API calls from your browser** without writing a single line of code. Ill use it to test my commands.
HUE JS example by Tom: https://tigoe.github.io/hue-control/client-example-js/index.html?ip=172.22.151.226
API Debugger: http://172.22.151.226/debug/clip.html

### Tried light 1
PUT 
`/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights/1/state
Got `"resource not available"`. 
Light 1 doesn't exist on this bridge.
![[condev - philips hue 3 not avaliable.webp]]

### Discovered light 3 exists
by PUT
`/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights/3/state
Got a `"success"` turning it off. But light 3 is `reachable: false`, so the bridge accepted the command but the bulb didn't actually respond.
![[condev - philips hue 4.webp]]

### GET on /lights 
Did a GET on `/lights` and got back the full map of all lights (3–9) with all their properties. This is how I **discover**ed what's available.
![[condev - philips hue 5 light state.webp]]

### Change lights Hue
PUT to light 7 
with `{"on": true, "hue": 43690, "sat": 254, "bri": 127}` 
and got back **four separate success confirmations** - one for each property you changed.
![[condev - philips hue 6 change light hue.webp]]
![[condev - philips hue 1 PUT.mp4]]

### Changed back
![[condev - philips hue 2 PUT.mp4]]

in the URL
/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights
With Message Body 
{"on": false}
Pressed GET
### received a JSON
``` JSON
{
	"3": {
		"state": {
			"on": false,
			"bri": 127,
			"hue": 14987,
			"sat": 141,
			"effect": "colorloop",
			"xy": [
				0.4572,
				0.4099
			],
			"ct": 366,
			"alert": "select",
			"colormode": "ct",
			"mode": "homeautomation",
			"reachable": false
		},
		"swupdate": {
			"state": "noupdates",
			"lastinstall": "2026-01-31T19:19:21"
		},
		"type": "Extended color light",
		"name": "Nook lamp",
		"modelid": "LCT001",
		"manufacturername": "Signify Netherlands B.V.",
		"productname": "Hue color lamp",
		"capabilities": {
			"certified": true,
			"control": {
				"mindimlevel": 5000,
				"maxlumen": 600,
				"colorgamuttype": "B",
				"colorgamut": [
					[
						0.675,
						0.322
					],
					[
						0.409,
						0.518
					],
					[
						0.167,
						0.04
					]
				],
				"ct": {
					"min": 153,
					"max": 500
				}
			},
			"streaming": {
				"renderer": true,
				"proxy": false
			}
		},
		"config": {
			"archetype": "sultanbulb",
			"function": "mixed",
			"direction": "omnidirectional",
			"startup": {
				"mode": "safety",
				"configured": true
			}
		},
		"uniqueid": "00:17:88:01:00:d8:af:4c-0b",
		"swversion": "67.116.10"
	},
	"4": {
		"state": {
			"on": true,
			"bri": 254,
			"hue": 64999,
			"sat": 75,
			"effect": "none",
			"xy": [
				0.4676,
				0.3543
			],
			"ct": 383,
			"alert": "select",
			"colormode": "hs",
			"mode": "homeautomation",
			"reachable": true
		},
		"swupdate": {
			"state": "noupdates",
			"lastinstall": "2026-01-30T21:30:39"
		},
		"type": "Extended color light",
		"name": "Hue lightstrip outdoor 1",
		"modelid": "LST004",
		"manufacturername": "Signify Netherlands B.V.",
		"productname": "Hue lightstrip outdoor",
		"capabilities": {
			"certified": true,
			"control": {
				"mindimlevel": 2000,
				"colorgamuttype": "C",
				"colorgamut": [
					[
						0.6915,
						0.3083
					],
					[
						0.17,
						0.7
					],
					[
						0.1532,
						0.0475
					]
				],
				"ct": {
					"min": 153,
					"max": 500
				}
			},
			"streaming": {
				"renderer": true,
				"proxy": true
			}
		},
		"config": {
			"archetype": "huelightstrip",
			"function": "decorative",
			"direction": "omnidirectional",
			"startup": {
				"mode": "safety",
				"configured": true
			}
		},
		"uniqueid": "00:17:88:01:03:a3:9a:94-0b",
		"swversion": "1.116.8",
		"swconfigid": "067EB7B0",
		"productid": "Philips-LST004-1-LedStripsOutv1"
	},
	"5": {
		"state": {
			"on": true,
			"bri": 254,
			"hue": 0,
			"sat": 30,
			"effect": "none",
			"xy": [
				0.3141,
				0.3299
			],
			"ct": 156,
			"alert": "select",
			"colormode": "ct",
			"mode": "homeautomation",
			"reachable": true
		},
		"swupdate": {
			"state": "notupdatable",
			"lastinstall": "2026-01-30T21:39:15"
		},
		"type": "Extended color light",
		"name": "standing lamp bottom",
		"modelid": "AE 280 C",
		"manufacturername": "innr",
		"productname": "Extended color light",
		"capabilities": {
			"certified": false,
			"control": {
				"colorgamuttype": "other",
				"colorgamut": [
					[
						0.68,
						0.31
					],
					[
						0.11,
						0.82
					],
					[
						0.13,
						0.04
					]
				],
				"ct": {
					"min": 153,
					"max": 555
				}
			},
			"streaming": {
				"renderer": false,
				"proxy": false
			}
		},
		"config": {
			"archetype": "classicbulb",
			"function": "mixed",
			"direction": "omnidirectional"
		},
		"uniqueid": "0c:43:14:ff:fe:7c:7d:a7-01",
		"swversion": "2.2"
	},
	"6": {
		"state": {
			"on": true,
			"bri": 254,
			"hue": 0,
			"sat": 30,
			"effect": "none",
			"xy": [
				0.3141,
				0.3299
			],
			"ct": 156,
			"alert": "select",
			"colormode": "ct",
			"mode": "homeautomation",
			"reachable": true
		},
		"swupdate": {
			"state": "notupdatable",
			"lastinstall": "2026-01-30T21:39:23"
		},
		"type": "Extended color light",
		"name": "standing lamp top",
		"modelid": "AE 280 C",
		"manufacturername": "innr",
		"productname": "Extended color light",
		"capabilities": {
			"certified": false,
			"control": {
				"colorgamuttype": "other",
				"colorgamut": [
					[
						0.68,
						0.31
					],
					[
						0.11,
						0.82
					],
					[
						0.13,
						0.04
					]
				],
				"ct": {
					"min": 153,
					"max": 555
				}
			},
			"streaming": {
				"renderer": false,
				"proxy": false
			}
		},
		"config": {
			"archetype": "classicbulb",
			"function": "mixed",
			"direction": "omnidirectional"
		},
		"uniqueid": "2c:11:65:ff:fe:f2:6a:00-01",
		"swversion": "2.2"
	},
	"7": {
		"state": {
			"on": true,
			"bri": 254,
			"hue": 47000,
			"sat": 43,
			"effect": "none",
			"xy": [
				0.4717,
				0.3286
			],
			"ct": 454,
			"alert": "select",
			"colormode": "ct",
			"mode": "homeautomation",
			"reachable": true
		},
		"swupdate": {
			"state": "notupdatable",
			"lastinstall": "2026-02-24T13:06:09"
		},
		"type": "Extended color light",
		"name": "Extended color light 1",
		"modelid": "TRADFRI bulb E12 CWS globe 800l",
		"manufacturername": "IKEA of Sweden",
		"productname": "Extended color light",
		"capabilities": {
			"certified": false,
			"control": {
				"colorgamuttype": "other",
				"colorgamut": [
					[
						0,
						0
					],
					[
						0,
						0
					],
					[
						0,
						0
					]
				],
				"ct": {
					"min": 250,
					"max": 454
				}
			},
			"streaming": {
				"renderer": false,
				"proxy": false
			}
		},
		"config": {
			"archetype": "classicbulb",
			"function": "mixed",
			"direction": "omnidirectional"
		},
		"uniqueid": "8c:65:a3:ff:fe:c9:41:26-01",
		"swversion": "1.0.38"
	},
	"8": {
		"state": {
			"on": true,
			"bri": 140,
			"hue": 60000,
			"sat": 254,
			"effect": "none",
			"xy": [
				0.3,
				0.3
			],
			"ct": 346,
			"alert": "select",
			"colormode": "hs",
			"mode": "homeautomation",
			"reachable": true
		},
		"swupdate": {
			"state": "notupdatable",
			"lastinstall": "2026-02-24T13:07:58"
		},
		"type": "Extended color light",
		"name": "Extended color light 2",
		"modelid": "TRADFRI bulb E12 CWS globe 800l",
		"manufacturername": "IKEA of Sweden",
		"productname": "Extended color light",
		"capabilities": {
			"certified": false,
			"control": {
				"colorgamuttype": "other",
				"colorgamut": [
					[
						0,
						0
					],
					[
						0,
						0
					],
					[
						0,
						0
					]
				],
				"ct": {
					"min": 250,
					"max": 454
				}
			},
			"streaming": {
				"renderer": false,
				"proxy": false
			}
		},
		"config": {
			"archetype": "classicbulb",
			"function": "mixed",
			"direction": "omnidirectional"
		},
		"uniqueid": "44:e2:f8:ff:fe:3b:0e:d5-01",
		"swversion": "1.0.38"
	},
	"9": {
		"state": {
			"on": true,
			"bri": 142,
			"hue": 5643,
			"sat": 236,
			"effect": "none",
			"xy": [
				0.4364,
				0.4087
			],
			"ct": 346,
			"alert": "select",
			"colormode": "hs",
			"mode": "homeautomation",
			"reachable": true
		},
		"swupdate": {
			"state": "notupdatable",
			"lastinstall": "2026-02-24T13:09:20"
		},
		"type": "Extended color light",
		"name": "Extended color light 3",
		"modelid": "TRADFRI bulb E12 CWS globe 800l",
		"manufacturername": "IKEA of Sweden",
		"productname": "Extended color light",
		"capabilities": {
			"certified": false,
			"control": {
				"colorgamuttype": "other",
				"colorgamut": [
					[
						0,
						0
					],
					[
						0,
						0
					],
					[
						0,
						0
					]
				],
				"ct": {
					"min": 250,
					"max": 454
				}
			},
			"streaming": {
				"renderer": false,
				"proxy": false
			}
		},
		"config": {
			"archetype": "classicbulb",
			"function": "mixed",
			"direction": "omnidirectional"
		},
		"uniqueid": "44:e2:f8:ff:fe:3a:cb:69-01",
		"swversion": "1.0.38"
	}
}
```

###
This teaches me about the lights around me

To change a light
add the light number and `/state` at the end:
`/api/QL6AHnxaf3-3YER9xoBCp8DRDsfweUcfuuAtmqP5/lights/9/state`




