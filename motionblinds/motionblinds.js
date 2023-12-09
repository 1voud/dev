module.exports = function(RED) {
    
    var mb = require('motionblinds');

    function MotionBlinds(config) {

        RED.nodes.createNode(this,config);
        
        var node = this;

        this.gateway = RED.nodes.getNode(config.gateway);    
        const gw = this.gateway.gw;

        gw.on('report', (report) => {
            let msg = {};
            msg.payload = report;
            console.log(msg);
            node.send(msg);
        });

        node.on('input', function(msg) {
            value = msg.payload.value;
            mac = msg.payload.mac;
            let data = {};
            switch(msg.payload.action) {
                case "targetPosition":
                    data["targetPosition"] = value;
                    break;
                case "operation":
                    switch(value) {
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


              gw.writeDevice(mac, "10000000", data
            ).then((ack) => {
                let msg = {};
                msg.payload = ack;
                node.send(msg);
            })
        });


        node.on("close", function() {
            gw.stop();
            console.log('GW stopped');
        });

    }

    RED.nodes.registerType("motionblinds",MotionBlinds);
}
