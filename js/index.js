
var ps4fw

window.addEventListener('DOMContentLoaded', loadsettings);
function CheckFW() {
    const userAgent = navigator.userAgent;
    // التعبير المنتظم يلتقط PS4 وأي نسخة
    const ps4Regex = /PlayStation(?:;\s*PlayStation)?(?: 4\/| 4 )?(\d+\.\d+)/;

    if (ps4Regex.test(userAgent)) {
        const match = userAgent.match(ps4Regex);
        const fwVersion = match ? match[1] : "Unknown";

        // عرض الفيرموير مباشرة
        const ps4fwEl = document.getElementById('PS4FW');
        ps4fwEl.textContent = `PS4 FW: ${fwVersion} | Detected`;
        ps4fwEl.style.color = 'green';
        ps4fwEl.style.fontSize = '60px';
        ps4fwEl.style.fontFamily = 'TheRaveI';

        // حفظ نسخة الفيرموير بدون النقطة للمقارنات
        const ps4fw = fwVersion.replace('.', '');

        // إظهار بعض العناصر حسب الفيرموير (يمكن التعديل لاحقًا)
        const installBtn = document.getElementById('install-psfrf');
        if (installBtn) installBtn.style.display = 'flex';

        // مثال: إخفاء أو إظهار أزرار محددة حسب الفيرموير
        if (ps4fw === '903' || ps4fw === '960') {
            const gameb = document.getElementById('gameb');
            if (gameb) gameb.style.display = 'none';
        }
        if (['900','903','960'].includes(ps4fw)) {
            const linuxb = document.getElementById('linuxb');
            if (linuxb) linuxb.style.display = 'flex';
        }

        document.title = "PSFree | " + fwVersion;

  } else {
    let platform = 'Unknown platform';
    if (/Android/.test(userAgent)) platform = 'Android';
    else if (/iPhone|iPad|iPod/.test(userAgent)) platform = 'iPhone|iPad|iPod';
    else if (/Macintosh/.test(userAgent)) platform = 'MacOS';
    else if (/Windows/.test(userAgent)) platform = 'Windows';
    else if (/Linux/.test(userAgent)) platform = 'Linux';

    /* === overlay للتظليل === */
    const overlay = document.createElement('div');
    overlay.id = 'ps-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.backdropFilter = 'blur(6px)';
    overlay.style.webkitBackdropFilter = 'blur(6px)';
    overlay.style.zIndex = '998';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 300ms ease';
    const wm = document.getElementById("consoleWatermark");
    /* نص النظام */
    const ps4fwDiv = document.createElement("div");
    ps4fwDiv.textContent = `You are not on PS4, your system is ${platform}`;
    ps4fwDiv.style.color = 'white';
    ps4fwDiv.style.fontSize = '30px';
    ps4fwDiv.style.position = "absolute";
    ps4fwDiv.style.top = "60%";
    ps4fwDiv.style.left = "50%";
    ps4fwDiv.style.transform = "translate(-50%, -50%)";
    ps4fwDiv.style.zIndex = "999";
    ps4fwDiv.style.whiteSpace = "nowrap";
    /* نص Unknown platform */
    const unplat = document.createElement("div");
    unplat.id = 'unplat';
    unplat.textContent = "Unsupported platform";
    unplat.style.color = 'red';
    unplat.style.fontSize = '40px';
    unplat.style.fontFamily = 'TheRaveI';
    unplat.style.position = "fixed";
    unplat.style.top = "50%";
    unplat.style.left = "50%";
    unplat.style.transform = "translate(-50%, -50%)";
    unplat.style.zIndex = '999';
    unplat.style.textShadow = "10 10 40px red, 0 0 100px red, 0 0 50px red";
    unplat.style.animation = "glowPulse 0.5s infinite alternate";
    unplat.style.whiteSpace = "nowrap";
    // أضف الأنيميشن لو مش موجود
    if (!document.getElementById('ps-overlay-styles')) {
      const style = document.createElement('style');
      style.id = 'ps-overlay-styles';
      style.textContent = `
        @keyframes glowPulse {
          0% {
            text-shadow: 10 10 40px red, 0 0 100px red, 0 0 50px red;


            color: red;
          }
          100% {
            text-shadow: 0 0 20px red, 0 0 40px orange, 0 0 60px yellow;
            color: #ffcccc;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 🧹 فرغ الصفحة وأضف العناصر فقط
    document.body.replaceChildren(overlay, ps4fwDiv, unplat, consoleWatermark);
    
     
    // فعل دخول التظليل تدريجيًا
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
	   wm.style.display = "block";   // إظهارها
    });
  }
}



function isHttps() {
  return window.location.protocol === 'https:';
}

function loadsettings() {
  CheckFW();
  
}


        // دالة محاكاة لوظيفة load_pkgbackup
        function empty() {
            alert("ياو فارغ اصاحبي ");
            // يمكنك إضافة الكود الفعلي هنا
        }
        
        // إضافة تفاعل إضافي للأزرار
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.main-btn');
            
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    // إضافة تأثير النقر
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
        });

//Check Cache Status
if (window.applicationCache.status=='0')
{
  window.location.replace("cache.html");
}
//Initialization of variables
var payloadData = "";
var array = "";
var PLfile = "";
localStorage.setItem("ipaddress","127.0.0.1");

//Functions
function pldone() 
{
  msgs.innerHTML= LoadedMSG;
}

//Function to 'Load' the payload file to be send to GoldHEN Bin Server.	
	var getPayload=function(payload,onLoadEndCallback)
    {
		var req=new XMLHttpRequest();
		req.open('GET',payload);
		req.send();
		req.responseType="arraybuffer";
		req.onload=function(event){
			if(onLoadEndCallback)onLoadEndCallback(req,event);
		};
	};
	
//Function to 'Send' the payload file to GoldHEN Bin Server using Html POST method. 
	var sendPayload=function(url,data,onLoadEndCallback)
    {
		var req=new XMLHttpRequest();
		req.open("POST",url,true);
		req.send(data);
		req.onload=function(event){
			if(onLoadEndCallback)onLoadEndCallback(req,event);
		};
	};

//function to check current status of the GoldHEN Bin Server
function checkbinserverstatus()
{
    var req = new XMLHttpRequest(); 
	req.open("POST", "http://"+localStorage.ipaddress+":9090/status");
	req.send();
	req.onerror = function(){
		msgs.innerHTML="<h1 style='font-size:25px;text-align:center;'>GoldHEN Bin Server Not Detected!!!</h1>";
		sessionStorage.isbinserver = "no";
	};
	req.onload = function(){
	var responseJson = JSON.parse(req.responseText);
	if (responseJson.status=="ready"){
		msgs.innerHTML="<h1 style='font-size:25px;text-align:center;'>GoldHEN Bin Server Detected, Payloads Will run over HTTP-POST!!!</h1>";
		sessionStorage.isbinserver = "yes";
		}
	};
}

//Payloads to be loaded over GoldHEN Bin Server method in BZ2 format
function LoadpayloadGoldHENBz2(PLfile)
{ //Loading Payload via Payload Param.
	   // First do an initial check to see if the BinLoader server is running, ready or busy.
	   var req = new XMLHttpRequest(); 
	   req.open("POST", "http://"+localStorage.ipaddress+":9090/status");
	   req.send();
	   req.onerror = function(){
		   alert("Cannot Load Payload Because The BinLoader Server Is Not Running");//<<If server is not running, alert message.
		   return;
	   };
		req.onload = function(){
			var responseJson = JSON.parse(req.responseText);
			if (responseJson.status=="ready"){
		    getPayload(PLfile, function (req) {
            if ((req.status === 200 || req.status === 304) && req.response) {
				   //Sending bins via IP POST Method
                    let payloadData = new Uint8Array(req.response); //Method By Hippie68
                   // Decompress
                   if (PLfile.endsWith(".bz2"))
                   {
                   try {
                    payloadData = bzip2.simple(bzip2.array(payloadData));
                   } catch (error) {
                   throw error;
                   }
                   }
                   //Send Decompress Payload to GoldHEN Bin Server
					sendPayload("http://" + localStorage.ipaddress + ":9090", payloadData.buffer, function (req) {
					   if (req.status === 200) {
						pldone();
					   }else{msgs.innerHTML = 'Cannot send payload';return;}
					})
				}
			});
			}
			else {
				alert("Cannot Load Payload Because The BinLoader Server Is Busy");//<<If server is busy, alert message.
				return;
			}
		};
	}

//Payloads to be loaded over GoldHEN Bin Server method
function LoadpayloadGoldHEN(PLfile)
{ //Loading Payload via Payload Param.
	   // First do an initial check to see if the BinLoader server is running, ready or busy.
	   var req = new XMLHttpRequest(); 
	   req.open("POST", "http://"+localStorage.ipaddress+":9090/status");
	   req.send();
	   req.onerror = function(){
		   alert("Cannot Load Payload Because The BinLoader Server Is Not Running");//<<If server is not running, alert message.
		   return;
	   };
		req.onload = function(){
			var responseJson = JSON.parse(req.responseText);
			if (responseJson.status=="ready"){
		    getPayload(PLfile, function (req) {
				if ((req.status === 200 || req.status === 304) && req.response) {
				   //Sending bins via IP POST Method
					sendPayload("http://" + localStorage.ipaddress + ":9090", req.response, function (req) {
					   if (req.status === 200) {
						pldone();
					   }else{msgs.innerHTML = 'Cannot send payload';return;}
					})
				}
			});
			}
			else {
				alert("Cannot Load Payload Because The BinLoader Server Is Busy");//<<If server is busy, alert message.
				return;
			}
		};
}

function load_pkgbackup()
{
msgs.innerHTML="<h1 style='font-size:25px;text-align:center;'>Loading PKG-Backup v1.3. Please wait!</h1>";
LoadedMSG="PKG-Backup v1.3 Loaded";
PLfile = "./payloads/pl_pkgbackup.bin";
LoadpayloadGoldHEN(PLfile);
}
