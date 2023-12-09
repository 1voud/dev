# node-red-motionblinds
Motionblinds gateway for Node-RED

Only tested with Hornbach blinds

Supports:

  - CloseDown
  - OpenUp
  - operation
  - StatusQuery
  - TargetPosition

Listens and reports all changes send by the gateway.

All devices states are saved in the global context using the key motion-blinds. It gets updated on all status messages.

Samples:

Move to target position:

    {
        "mac": "a3cfb2ad4a430001",
        "value": 22,
        "action": "targetPosition"
    }

Open the blind (Move up)

    {
        "mac": "a3cfb2ad4a430001",
        "value": "OpenUp",
        "action": "operation"
    }

Get the current status

    {
        "mac": "a3cfb2ad4a430001",
        "value": "StatusQuery",
        "action": "operation"
    }
