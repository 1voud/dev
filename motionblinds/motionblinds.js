// import MotionGateway from 'motionblinds'

module.exports = function(RED) {
    
    var mb = require('motionblinds');

    function MotionBlinds(config) {


        RED.nodes.createNode(this,config);
        
        var node = this;

        this.gateway = RED.nodes.getNode(config.gateway);    
        console.log(this.gateway);   
        const gw = this.gateway.gw;
        // console.log(gw);
        // gw.start();
        // console.log('GW Started');
        // const devices = gw.readAllDevices();
        // const devices = [];
        gw.readAllDevices().then((result) => {
        // console.log(devices);
            MotionBlinds.devices = result; 
            var globalContext = this.context().global;
            globalContext.set("motion-blinds", result)
        })
        gw.on('report', (report) => {
            let msg = {};
            msg.payload = {};
            msg.payload = report;
            console.dir(report);
            node.send(msg);
        });
        node.on('input', function(msg) {
            // msg.payload = devices => {
            //     setTimeout(resolveInner, 1000);
            //   })
            value = msg.payload.value;
            gw.writeDevice("f4cfa2dd4a430001", "10000000", {
                targetPosition: value,
            }).then((ack) => {
                // console.log(devices);
                let msg = {};
                msg.payload = ack;
                node.send(msg);
            })
            // gw.readAllDevices().then((devices) => {
            //     // console.log(devices);
            //     let msg = {};
            //     msg.payload = devices;
            //     node.send(msg);
            //   })
        });


        node.on("close", function() {
            gw.stop();
            console.log('GW stopped');
        });

    }

    RED.nodes.registerType("motionblinds",MotionBlinds);
}
