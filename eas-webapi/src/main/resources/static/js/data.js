//存储IP和
var map_ip={};

//主机绑定数据
function getSetServer (selectIDs) {
   $.ajax({
       url:'/kl_eas/v1/monitor/servers',

       method:'get',
       async: false,
       dataType:'json',
       error: function (data) {
           console.log(data);

       },
       success:function (data){
           console.log(data )
           bindData(data,selectIDs)
       }
   });

}

function bindData(data,selectIDs) {

    var data1 = data.data;
    data1 = JSON.parse(data1);
    data1 = data1.servers;
    var addrs = [];
    var map_vdaip={};
    for (var j = 0; j < data1.length; j++) {
        // console.log(data1[j]);
        var server = data1[j]
        var addr = server.addresses;
        for (net in addr) {
            addresses = addr[net]
            for (var k = 0; k < addresses.length; k++) {
                var addresse = addresses[k]
                if (addresse['OS-EXT-IPS:type'] == "floating") {
                    // console.log(addresse['addr'])
                    addrs.push(addresse['addr']);
                    map_ip[addresse['addr']]=server.id;
                }
		if (addresse['OS-EXT-IPS:type'] == "fixed") {
		    map_vdaip[server.id]=addresse['addr']
		}

            }

        }

    }

    for(var j=0;j<selectIDs.length;j++){
        var master1 = document.getElementById(selectIDs[j]);
        master1.innerHTML="";
        for (var i = 0; i < addrs.length; i++) {
	    var id=map_ip[addrs[i]]
	    var vdaip = map_vdaip[id]
            master1.innerHTML += "<li data-value="+addrs[i]+" local_ip="+vdaip +">"+addrs[i]+"</li>";
        }

    }

}


function  getMonitorData(ip,data_id,dataType) {

    var mydata;
    $.ajax({
        url: "/kl_eas/v1/monitor/"+ip+"/"+data_id+"/%22vda_log_type%22%3A%22"+dataType+"%22",

        method: 'get',
        async: false,
        dataType: 'json',
        error: function (data) {
            console.log(data);

        },
        success: function (data) {
            console.log(ip);
            console.log(data_id);
            console.log(dataType);


            console.log(data)
            mydata=data;
        }
    });
    return mydata;
}



function  getMonitorServerData(ip) {
    var mydata;
    $.ajax({
        url: "/kl_eas/v1/monitor/"+map_ip[ip],
        // url: "/kl_eas/v1/monitor/"+map_ip[ip],

        method: 'get',
        async: false,
        dataType: 'json',
        error: function (data) {
            console.log(data);

        },
        success: function (data) {

            console.log(data)
            console.log(map_ip[ip])
            if(data.state){
                mydata=data.data
            }

        }
    });
    return mydata;
}


//------------------------------------
datasource ()
var map_config={};
function datasource () {
    $.ajax({
        url: '/kl_eas/v1/datasource',


        method: 'get',
        dataType: 'json',
        error: function (data) {
            console.log(data);
        },
        success: function (data) {
                if(data.state) {
                    get(data,"title","field")
                }

        }
    });
}


function get(data,cell1,cell2) {
    data=data.data;
    if(data.length>0){
        config = data[0].config;
        config=JSON.parse(config);
        for(var k=1;k<=9;k++){
            var con = config[k];
            var comm=[];
            for(var key in con){
                if(con[key].type==0){
                    var ccc={};
                    ccc[cell1]=key;
                    ccc[cell2]=con[key].key;
                    ccc["align"]="center";
                    ccc["valign"]="middle";
                    ccc["sortable"]=true;
                    comm.push(ccc);
                }
            }
            map_config[k]=comm;
        }
    }
}