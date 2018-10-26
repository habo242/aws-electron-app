var aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "ACCESSKEY",
    secretAccessKey: "SECRETKEY",
    region: "eu-central-1"
});

var ec2 = new aws.EC2();

function printStatuses() {
    ec2.describeInstances({}, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
            var currentTime = new Date();
            console.log(currentTime.toString());

            for(var r=0,rlen=data.Reservations.length; r<rlen; r++) {
                var reservation = data.Reservations[r];
                for(var i=0,ilen=reservation.Instances.length; i<ilen; ++i) {
                    var instance = reservation.Instances[i];

                    var name = '';
                    for(var t=0,tlen=instance.Tags.length; t<tlen; ++t) {
                        if(instance.Tags[t].Key === 'Name') {
                            name = instance.Tags[t].Value;
                        }
                    }
                   if(instance.State.Name === "stopped"){
                    document.getElementById("demo").innerHTML +=('\t'+name+ '|' + '\t'+instance.InstanceId.fontcolor("black").bold()+ '|' +'\t'+instance.PublicIpAddress+ '|' +'\t'+instance.InstanceType+ '|' +'\t'+instance.ImageId+ '|' +'\t'+instance.State.Name.fontcolor("red") + "<br>");
                   } else {
                    document.getElementById("demo").innerHTML +=('\t'+name+ '|' + '\t'+instance.InstanceId.fontcolor("black").bold()+ '|' +'\t'+instance.PublicIpAddress+ '|' +'\t'+instance.InstanceType+ '|' +'\t'+instance.ImageId+ '|' +'\t'+instance.State.Name.fontcolor("green") + "<br>");
                   }
                
                }
            }
        }
    });    
}

function stopInstance(instanceId) {
    ec2.stopInstances({ InstanceIds: [instanceId] }, function(err, data) {
        if(instanceId =="" || err) {
            alert("Invalid Instance ID");
        } else {
            alert('Stop:\t' + instance.InstanceId);
           for(var i in data.stopInstances) {
                var instance = data.stopInstances[i];
                alert('Stop:\t' + instance.InstanceId);
                document.write("Instanz wird gestoppt! Bitte warten Sie")
            } 
        }
    });
}


function startInstance(start_instanceId) {
    ec2.startInstances({ InstanceIds: [start_instanceId] }, function(err, data) {
        if(start_instanceId =="" || err) {
            alert("Invalid Instance ID");
        } else {
           for(var i in data.startInstances) {
                var instance = data.startInstances[i];
                alert('Start:\t' + instance.start_InstanceId);
                document.write("Instanz wird gestartet! Bitte warten Sie")
            } 
        }
    });
}



