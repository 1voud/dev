module.exports = function (RED) {

    var mb = require('motionblinds');

    function MotionBlindsGateway(n) {

        RED.nodes.createNode(this, n);
        var node = this;
        this.apikey = n.apikey;

        this.gw = new mb.MotionGateway({ key: this.apikey });
        // console.log(this.gw);

        this.gw.start();

        node.status('MotionBlindsGateway Started');
        this.gw.readAllDevices().then((result) => {
            var globalContext = this.context().global;
            globalContext.set("motion-blinds", result)
            node.status('Read all devices');
        })


        node.on("close", function () {
            gw.stop();
            node.status('MotionBlindsGateway Stopped');
        });
    }
    RED.nodes.registerType("motionblinds-gateway", MotionBlindsGateway);
}

