var cartAmazon = 0;
console.log("amazon script works");
let saletime;
let saleStarted = false;
let buttonNotClicked = true;

let currentURL = window.location.href;

const checkForMobiles = (query) => {
  return new Promise((resolve, reject) => {
    let x = setInterval(function () {
      let mobiles = document.getElementsByClassName(query);
      if (mobiles.length > 0) {
        clearInterval(x);
        resolve(mobiles);
      }
    }, 5);
  });
};

const checkForCheckWrapper = (query) => {
  return new Promise((resolve, reject) => {
    let x = setInterval(function () {
      let checkWrapper = document.getElementsByClassName(query);
      if (checkWrapper.length) {
        clearInterval(x);
        resolve(checkWrapper);
      } else {
        clearInterval(x);
        reject();
      }
    }, 5);
  });
};

function appendRadioButton(mobiles) {
  checkForCheckWrapper("checkWrapper")
    .then((checkWrapper) => {
      for (let i = 0; i < checkWrapper.length; i++) {
        let checkBox = checkWrapper[i];
        let checkBoxId = checkBox.children[0].getAttribute("id");
        // chrome.storage.sync.get(null, (res) => {
        //     let storageArr = Object.keys(res);
        //     if (storageArr.includes(checkBoxId)) {
        //         document.getElementById(checkBoxId).checked = res[checkBoxId];
        //         checkForAddToCart(checkBoxId)
        //     }
        // });
        checkForAddToCart(checkBoxId);
      }
    })
    .catch(() => {
      for (let i = 0; i < mobiles.length; i++) {
        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("id", `checkbox${i}`);
        check.checked = true;
        var newlabel = document.createElement("Label");
        newlabel.setAttribute("for", `checkbox${i}`);
        newlabel.innerHTML = "Check to add to cart";
        var div = document.createElement("div");
        div.setAttribute("class", "checkWrapper");
        div.style.display = "flex";
        let info = document.getElementsByClassName("dealDetailContainer");
        div.appendChild(check);
        div.appendChild(newlabel);

        if (info[i]) {
          info[i].appendChild(div);
          check.onclick = function () {
            let thisOne = this.id;
            // chrome.storage.sync.get(this.id, (res) => {
            //     if (res[this.id]) {
            //         chrome.storage.sync.set({ [this.id]: false });
            //     } else {
            //         chrome.storage.sync.set({ [this.id]: true });
            //     }
            // })
            checkForAddToCart(this.id);
          };
        }
      }
    });
}

function checkForAddToCart(checkBoxId) {
  if (saleStarted && buttonNotClicked) {
    return new Promise((resolve, reject) => {
      let checked = document.getElementById(checkBoxId).checked;
      if (checked) {
        if (document.getElementById(checkBoxId)) {
          let addCart = document.getElementById(checkBoxId).parentNode
            .previousSibling.previousSibling;
          if (addCart) {
            let btn = addCart.querySelector("button");
            console.log("add", btn);
            if (btn) {
              addCart.querySelector("button").click();
            }
          }
        }
      }
    });
  }
}

// setTimeout(function () {
// }, 5000)

// Listening message to timer script to iitialize the endtime on which script gets started
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // var endtime = "Thu Feb 28 2019 23:42:00 GMT+0530";
  // console.log("on message works", request)
  if (request.message == "amazonscript") {
    chrome.storage.sync.get(null, (res) => {
      if (res) {
        let productName;
        for (var key in res) {
          if (res.hasOwnProperty(key)) {
            // console.log("ressssss", res);
            if (res[key].URL == currentURL) {
              // saletime = res.time || {};
              saletime = res[key].time;
              productName = res[key].productName;
              // console.log("saaaleeeeeee", saletime);
              if (saletime) {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "bottom-end",
                  showCloseButton: false,
                });

                Toast.fire({
                  title: productName,
                  html: getFormattedDate(saletime),
                });
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

          var ampm = hour >= 12 ? "pm" : "am";

          var str =
            "Next sale is on : " +
            day +
            "-" +
            month +
            "-" +
            date.getFullYear() +
            " at " +
            hour +
            ":" +
            min +
            ":" +
            sec +
            ampm;

          /*alert(str);*/

          return str;
        }

        timerStartScript(saletime);
      }
    });

    function animationFrame() {
      checkForMobiles("dealView").then((mobiles) => {
        appendRadioButton(mobiles);
      });
      window.requestAnimationFrame(animationFrame);
    }
    animationFrame();
  }
});

//Function which will start the script to buy product just 2 min before the sale

function timerStartScript(endtime) {
  var countDownDate = new Date(endtime).getTime();
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    // console.log("Distance", distance);
    if (distance < 30000 && distance >= -30000) {
      clearInterval(x);
      // amazonScript();
      saleStarted = true;
    }
  }, 5);
}
// 16180651031;

//-----------------Amazon script to add product to cart--------------------------------//
//*********************************************************************************//

function amazonScript() {
  // const numberOfMobile = document.getElementsByClassName("dealDetailContainer");
  // const mobileDiv = document.getElementsByClassName("dealView");

  // appendRadioButton(mobileDiv);

  console.log("calling amazon func");
  checkMobile();
  function checkMobile() {
    if (!numberOfMobile.length) {
      console.log("content not loaded");
      window.requestAnimationFrame(checkMobile);
    } else {
      const childrenNumber = document.getElementsByClassName(
        "dealDetailContainer"
      )[numberOfMobile.length - 1].children.length;
      console.log("content has loaded");
      console.log("children number = " + childrenNumber);
      checkAllChildren(childrenNumber);
    }
  }

  function checkAllChildren(childrenNumber) {
    if (childrenNumber <= 2) {
      window.requestAnimationFrame(checkAllChildren);
    } else {
      checkNameLoaded();
    }
  }

  function checkNameLoaded() {
    var allMobDetail = [];
    let temp = numberOfMobile[0].children[4].innerHTML;
    if (!temp.length) {
      window.requestAnimationFrame(checkNameLoaded);
    } else {
      for (let i = 0; i < numberOfMobile.length; i++) {
        temp = numberOfMobile[i].children[4].innerHTML;
        temp = temp.replace(/[()\s,]/g, "");
        temp = temp.toLowerCase();
        allMobDetail.push(temp);
      }
      // console.log("Mobile name loaded");
      // console.log(allMobDetail);
      clickSelected(allMobDetail);
    }
  }

  function clickSelected(allMobDetail) {
    chrome.storage.sync.get("colorAmazon", function (update) {
      colorAmazon = update.colorAmazon;
      colorAmazon = colorAmazon.replace(/\s/g, "");
      colorAmazon = colorAmazon.toLowerCase();

      chrome.storage.sync.get("varientAmazon", function (update) {
        varientAmazon = update.varientAmazon;
        varientAmazon = varientAmazon.replace(/[+\s]/g, "");
        varientAmazon = varientAmazon.toLowerCase();
        pos = varientAmazon.indexOf("gb");
        varientAmazon = varientAmazon.slice(pos + 2);

        chrome.storage.sync.get("AmazonProName", function (update) {
          AmazonProName = update.AmazonProName;
          AmazonProName = AmazonProName.replace(/\s/g, "");
          AmazonProName = AmazonProName.toLowerCase();
          posPro = AmazonProName.indexOf("(");
          AmazonProName = AmazonProName.slice(0, posPro);

          console.log(
            "user selected: " + AmazonProName + colorAmazon + varientAmazon
          );

          let valSearch = AmazonProName + colorAmazon + varientAmazon;
          for (let i = 0; i < allMobDetail.length; i++) {
            if (
              allMobDetail[i].includes(valSearch) ||
              !allMobDetail[i].includes(valSearch)
            ) {
              console.log("mobile found");
              document
                .getElementsByClassName("dealDetailContainer")
                [
                  i
                ].children[9].children[0].children[0].children[0].children[0].children[0].click();
            } else {
              console.log("mobile not found");
              console.log("checking Again...");

              setTimeout(checkMobile(), 1000);
            }
          }

          cartAmazon++;
          chrome.runtime.sendMessage({
            cartAmazon: cartAmazon,
            refresh: false,
          });
        });
      });
    });
  }
}

//---------------------Amazon script to add product to cart Ends----------------------------//
//*********************************************************************************//
