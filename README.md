# node-red-motionblinds
Motionblinds gateway for Node-RED

Only tested with Hornbach blinds.
To be used with a Wifi gateway (Like <a href="https://support.motionblinds.com/en/motionblinds-wi-fi-bridge-cmd-01/">CMD-01</a>)


Supports:

  - CloseDown
  - OpenUp
  - Stop
  - StatusQuery
  - TargetPosition

Listens and reports all changes send by the gateway.

All devices states are saved in the global context using the key motion-blinds. It gets updated on all status messages.

## Notes:
  This node is build on top of <a href="https://github.com/jhurliman/node-motionblinds">node-motion-blinds</a>. (Thanks to the author) Since the gateway makes use of multicast to send updates, we can have some trouble receiving them in virtualized environments like docker and LXC.

  When running node-red in docker we can workaround the issue, by using:
  
    network_mode: host


## Samples:

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

Releases:
- v0.0.3 - Enhancements and fixes
    - Add IP address to gateway settings
    - Fix label of gateway
    - Fix report updates
    - Catch errors

- v0.0.2 - Fix crash
    - Catch Exception crashing Node-RED

- v0.0.1 - Initial release
    - Limited local testing