module.exports = function(RED) {

    var mb = require('motionblinds');

    function MotionBlindsGateway(n) {

        RED.nodes.createNode(this,n);
        var node = this;
        this.apikey = n.apikey;

        this.gw = new mb.MotionGateway({ key: this.apikey });
        console.log(this.gw);

        this.gw.start();
        
        console.log('MotionBlindsGateway Started');

        node.on("close", function() {
            gw.stop();
            console.log('MotionBlindsGateway Stopped');
        });
    }
    RED.nodes.registerType("motionblinds-gateway",MotionBlindsGateway);
}

