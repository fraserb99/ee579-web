export const rules = [
    {
        "id": "a956ea14-7380-4b0c-a5a3-b5dd97606cb8",
        "name": "Rule 1",
        "inputDevices": [
            {
                "duration": 1000,
                "device": {
                    "id": "00:0a:95:9d:68:16",
                    "name": "Fraser's Msp430",
                    "deviceState": "Claimed"
                },
                "type": "ButtonPushed"
            }
        ],
        "outputDevices": [
            {
                "duration": 5000,
                "device": {
                    "id": "00:14:22:01:23:45",
                    "name": "Ross' Msp430",
                    "deviceState": "Claimed"
                },
                "type": "BuzzerOn"
            },
            {
                "period": 500,
                "colour": "Green",
                "peripheral": "Led3",
                "device": {
                    "id": "00:A0:C9:14:C8:29",
                    "name": "Maddie's Msp430",
                    "deviceState": "Claimed"
                },
                "type": "LedBlink"
            }
        ]
    },
    {
        "id": "a956ea14-7380-4b0c-a5a3-b5dd97606cb9",
        "name": "Custom Rule Name",
        "inputDevices": [
            {
                "duration": 5000,
                "device": {
                    "id": "00:0a:95:9d:68:16",
                    "name": "Amanda's Msp430",
                    "deviceState": "Claimed"
                },
                "type": "ButtonPushed"
            }
        ],
        "outputDevices": [
            {
                "duration": 10000,
                "device": {
                    "id": "00:14:22:01:23:45",
                    "name": "Aoife's Msp430",
                    "deviceState": "Claimed"
                },
                "type": "BuzzerOn"
            },
        ]
    }
]