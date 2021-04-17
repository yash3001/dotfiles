console.log("flipkart script");

var status3 = 0;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var endtime = request.time || "";
  var lid = request.lid || "";
  timerStartScript(endtime, lid);
  let currentURL = window.location.href;
  if (request.message == "flipkartscript") {
    chrome.storage.sync.get(null, (res) => {
      if (res) {
        for (var key in res) {
          console.log("key", key)
          if (res.hasOwnProperty(key)) {
            if (key !== 'affliate') {
              if (res[key].URL == currentURL) {
                // saletime = res.time || {};
                saletime = res[key].time
                console.log("saaaleeeeeee", saletime);
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'bottom-end',
                  showCloseButton: false,
                })

                Toast.fire({
                  title: getFormattedDate(saletime)
                })
              }
            }
          }
        }
        // saletime = "2020-03-05T12:55:01.281Z";
        function getFormattedDate(st) {
          var date = new Date(st);

          var month = date.getMonth() + 1;
          var day = date.getDate();
          var hour = date.getHours();
          var min = date.getMinutes();
          var sec = date.getSeconds();

          month = (month < 10 ? "0" : "") + month;
          day = (day < 10 ? "0" : "") + day;
          hour = (hour < 10 ? "0" : "") + hour;
          min = (min < 10 ? "0" : "") + min;
          sec = (sec < 10 ? "0" : "") + sec;

          var ampm = hour >= 12 ? 'pm' : 'am';

          var str = "Next sale is on : " + day + "-" + month + "-" + date.getFullYear() + " at " + hour + ":" + min + ":" + sec + ampm;

          /*alert(str);*/

          return str;
        }

        timerStartScript(saletime);
      }
    })
  }
});

// Function which will start the script to buy product just 2 min before the sale
function timerStartScript(endtime, lid) {
  var countDownDate = new Date(endtime).getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    //console.log("checking Time....");

    if (distance <= 120000 && distance >= -120000) {
      chrome.runtime.sendMessage({ refresh: true });
      clearInterval(x);
      flipkartScript(lid);
    }
  }, 1000);
}

// Function to get the Http Request
function getXMLHTTPRequest() {
  req = new XMLHttpRequest();
  return req;
}

/*-----------------------------------------------------------*/
//*************Flipkart Script to click add to cart button started----------//

function flipkartScript(lid) {
  // console.log("Flipkart Script started");
  var winloc1 = window.location.href;
  var httpq4 = new getXMLHTTPRequest();
  httpq4.open("POST", "/api/5/cart", true);

  httpq4.onreadystatechange = function () {
    if (httpq4.readyState == 4) {
      if (httpq4.status == 200) {
        var mytext = httpq4.responseText;
        console.log(
          "hello:" + JSON.parse(mytext).RESPONSE.cartResponse[lid].presentInCart
        );
        if (
          JSON.parse(mytext).RESPONSE.cartResponse[lid].presentInCart === true
        ) {
          status3++;
          chrome.runtime.sendMessage({ status3: status3, refresh: false });
        }

        try {
          if (
            JSON.parse(mytext).RESPONSE.cartResponse[id].presentInCart === true
          ) {
            if (ptfkckout) {
              setCookie("flippt", 1, 30, "/checkout/init");
            }

            //if (fkoco) setCookie("fsocb", 1, 30, "/checkout/init");
            //setCookie("CONG", 1, 180, "/");
            //history.pushState(null, null, location.href);
            setCookie("flipptcomplete", 1, 250, "/");
            if (
              winloc1.search("/viewcart") > 0 ||
              winloc1.search("/checkout/init") > 0 ||
              winloc1.search("/orderresponse") > 0
            ) {
              winloc1 = winloc1;
            } else {
              window.location = "https://www.flipkart.com/checkout/init";
            }
            //return true;
          }
        } catch (err) {
          // return false;
        }
      }
    }
  };

  httpq4.setRequestHeader("Content-type", "application/json");
  httpq4.setRequestHeader(
    "X-user-agent",
    navigator.userAgent + " FKUA/website/41/website/Desktop"
  );
  httpq4.send('{"cartContext":{"' + lid + '":{"quantity":1}}}');
}



//------------------Flipkart Script to click add to cart button ends.-------//
/*--------------------------------------------------------------------------*/
