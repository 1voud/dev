module.exports = function (RED) {

    var mb = require('motionblinds');

    function MotionBlinds(config) {

        RED.nodes.createNode(this, config);

        var node = this;

        this.gateway = RED.nodes.getNode(config.gateway);
        const gw = this.gateway.gw;

        gw.on('report', (report) => {
            let msg = {};
            msg.payload = report;

            var globalContext = this.context().global;
            blinds = globalContext.get("motion-blinds")
            blinds.forEach((blind) => {
                if (blind.mac === mac) {
                    blind.data = report.data;
                    blind.msgType = report.msgType;
                    blind.msgID = report.msgID;
                }
            });

            node.send(msg);
        });

        node.on('input', function (msg) {
            value = msg.payload.value;
            mac = msg.payload.mac;
            let data = {};
            switch (msg.payload.action) {
                case "targetPosition":
                    data["targetPosition"] = value;
                    break;
                case "operation":
                    switch (value) {
                        case "CloseDown":
                            data["operation"] = 0;
                            break;
                        case "OpenUp":
                            data["operation"] = 1;
                            break;
                        case "Stop":
                            data["operation"] = 2;
                            break;
                        case "StatusQuery":
                            data["operation"] = 5;
                            break;
                    }
                    break;
                default:
                    return;
            }
            var globalContext = this.context().global;
            blinds = globalContext.get("motion-blinds")
            blinds.forEach((blind) => {
                if (blind.mac === mac) {
                    gw.writeDevice(mac, blind.deviceType, data).then((ack) => {
                        let msg = {};
                        msg.payload = ack;
                        blind.data = ack.data;
                        blind.msgType = ack.msgType;
                        blind.msgID = ack.msgID;
                        node.send(msg);
                    });
                }
            });


        });


        node.on("close", function () {
            gw.stop();
            console.log('GW stopped');
        });

    }

    RED.nodes.registerType("motionblinds", MotionBlinds);
}
