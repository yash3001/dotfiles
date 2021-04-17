window.onload = function () {
  // console.log("ads script");
  let buyNowButton;
  document.querySelector(".aMaAEs")
    ? (buyNowButton = document.querySelector(".aMaAEs"))
    : document.querySelector("#unifiedPrice_feature_div")
    ? (buyNowButton = document.querySelector("#unifiedPrice_feature_div"))
    : (buyNowButton = null);

  // Check page on interval to display popup
  setInterval(() => {
    if (
      document.querySelector(".aMaAEs") ||
      document.querySelector("#unifiedPrice_feature_div")
    ) {
      if (document.querySelector(".autobuy"))
        document.querySelector(".autobuy").style.display = "flex";
    } else {
      if (document.querySelector(".autobuy"))
        document.querySelector(".autobuy").style.display = "none";
    }
  }, 2000);

  if (buyNowButton) {
    let autobuy = document.createElement("div");
    autobuy.setAttribute("class", "autobuy");
    let btn1 = document.createElement("img");
    btn1.setAttribute("class", "autobuy-button-one");
    btn1.style.display = "none";
    btn1.setAttribute("src", "https://i.ibb.co/vmfk0TP/offer.png");
    btn1.style.boxShadow = "grey 0px 0px 1px";
    let btn2 = document.createElement("img");
    btn2.setAttribute("class", "autobuy-button-two");
    btn2.setAttribute("src", "https://i.ibb.co/JRdJw09/product.png");
    btn2.style.boxShadow = "grey 0px 0px 1px";
    btn2.style.display = "none";
    autobuy.appendChild(btn1);
    autobuy.appendChild(btn2);

    document.getElementsByTagName("body")[0].appendChild(autobuy);
    var obj, y, prev_y;

    function drag(e) {
      obj = e.target;
      prev_y = y - obj.offsetTop;
    }
    function move(e) {
      if (e.pageX) {
        y = e.pageY;
      }
      if (obj) {
        obj.style.top = y - prev_y + "px";
      }
    }
    function drop() {
      obj = false;
    }
    document.querySelector(".autobuy").onmousedown = drag;
    document.onmousemove = move;
    document.onmouseup = drop;

    //Popup Div
    let popup = document.createElement("div");
    popup.setAttribute("class", "popupdiv");

    //Pricealert body
    let pricealertbody = document.createElement("div");
    pricealertbody.setAttribute("class", "pricealertbody");
    let popupheader = document.createElement("div");
    popupheader.setAttribute("class", "popupheader");
    let popupclose = document.createElement("button");
    popupclose.setAttribute("class", "popupclose");
    popupclose.innerText = "x";

    popupclose.addEventListener("click", () => {
      let popupdiv = document.querySelector(".popupdiv");
      popupdiv.style.visibility = "hidden";
    });

    let popupheading = document.createElement("h3");
    popupheading.setAttribute("class", "popupheading");
    popupheading.innerText = "AutoBuy";

    let logout = document.createElement("button");
    logout.setAttribute("class", "logoutbtn");
    logout.innerText = "Logout";
    logout.style.display = "none";
    logout.addEventListener("click", () => {
      logout.innerText = ".......";
      chrome.storage.sync.get(null, (res) => {
        let token = res.abtoken;
        // console.log(token);
        if (token) {
          fetch("https://couponswala.com/extension/api/autobuy/logout", {
            method: "delete",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-auth": token,
            },
            withCredentials: true,
          })
            .then((response) => {
              // console.log(response);
              response.json().then(function (data) {
                if (data.success) {
                  // console.log(data);
                  chrome.storage.sync.set({ ablog: false });
                  document.querySelector(".modale").style.display = "unset";
                  document.querySelector(".logoutbtn").style.display = "none";
                  // document.querySelector(".nameinput").value = "";
                  document.querySelector(".emailinput").value = "";
                  document.querySelector(".otpinput").value = "";
                  document.querySelector(".modal-header").style.display =
                    "none";
                  document.querySelector(".modal-footer").style.display =
                    "none";
                  document.querySelector(".inputdiv").style.display = "none";
                  document.querySelector(".subtitle").innerHTML =
                    "<h3>Greetings!!!</h3>" +
                    "<p>Sign In to get access to Features like Price Graph, Price Drop Alert & Best Price for FREE</p>";
                  document.querySelector(".subtitle").style.display = "unset";
                  document.querySelector(".loginbutton").style.display =
                    "unset";
                  document.querySelector(".modale").style.background = "white";
                  logout.innerText = "Logout";
                  chrome.storage.sync.set({ abemail: null });
                } else {
                  logout.innerText = "Logout";
                }
              });
            })
            .then((res) => {})
            .catch(function (err) {
              console.log(err);
            });
        }
      });
    });

    //Appending
    popupheading.append(logout);
    popupheader.appendChild(popupheading);
    popupheader.appendChild(popupclose);
    popup.appendChild(popupheader);

    //Usesale
    let usesale_container = document.createElement("div");
    usesale_container.setAttribute("class", "usesale-container");

    //Price Alert
    let modale = document.createElement("div");
    modale.setAttribute("class", "modale");
    modale.setAttribute("aria-hidden", "true");
    modale.background = "white";

    let modale_dialog = document.createElement("div");
    let modalHeader = document.createElement("div");
    modale_dialog.setAttribute("class", "modal-dialog");
    modalHeader.setAttribute("class", "modal-header");
    let h2 = document.createElement("h2");
    h2.innerText = "Sign up";
    modalHeader.style.display = "none";
    let p = document.createElement("p");
    p.setAttribute("class", "subtitle");
    p.innerHTML =
      "<h3>Greetings!!!</h3>" +
      "<p>Sign In to get access to Features like Price Graph, Price Drop Alert & Best Price for FREE</p>";
    let modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    let inputdiv = document.createElement("div");
    inputdiv.setAttribute("class", "inputdiv");
    inputdiv.style.display = "none";

    // let name = document.createElement("input");
    // name.setAttribute("class", "nameinput");
    // name.setAttribute("type", "text");
    // name.setAttribute("name", "name");
    // name.setAttribute("placeholder", "Name");

    let input = document.createElement("input");
    input.setAttribute("class", "emailinput");
    input.setAttribute("type", "text");
    input.setAttribute("name", "email");
    input.setAttribute("placeholder", "Email");

    let modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");
    modalFooter.style.display = "none";

    let generateOtp = document.createElement("button");
    generateOtp.setAttribute("class", "generateotp");
    generateOtp.innerText = "Grenerate OTP";

    let Otp = document.createElement("input");
    Otp.setAttribute("class", "otpinput");
    Otp.setAttribute("type", "text");
    Otp.setAttribute("name", "otp");
    Otp.setAttribute("placeholder", "OTP");

    let aConfirm = document.createElement("button");
    aConfirm.setAttribute("class", "btnconfirm");
    aConfirm.innerText = "Confirm";

    let aClose = document.createElement("button");
    aClose.setAttribute("class", "btnclose");
    aClose.innerText = "Cancel";

    aClose.addEventListener("click", () => {
      let popupdiv = document.querySelector(".popupdiv");
      popupdiv.style.visibility = "hidden";
    });

    let loginbutton = document.createElement("button");
    loginbutton.setAttribute("class", "loginbutton");
    loginbutton.innerText = "SIGN IN";

    loginbutton.addEventListener("click", () => {
      document.querySelector(".modal-header").style.display = "block";
      document.querySelector(".modal-footer").style.display = "flex";
      document.querySelector(".inputdiv").style.display = "flex";
      document.querySelector(".subtitle").innerText = "";
      document.querySelector(".loginbutton").style.display = "none";
      document.querySelector(".modale").style.background =
        "rgba(0, 0, 0, 0.24)";
    });

    modalFooter.appendChild(aConfirm);
    modalFooter.appendChild(aClose);
    modalBody.appendChild(p);
    // inputdiv.appendChild(name);
    inputdiv.appendChild(input);
    inputdiv.appendChild(generateOtp);
    inputdiv.appendChild(Otp);
    modalBody.appendChild(inputdiv);
    modalBody.appendChild(loginbutton);
    modalBody.appendChild(modalFooter);
    modalHeader.appendChild(h2);
    modale_dialog.appendChild(modalHeader);
    modale_dialog.appendChild(modalBody);
    modale.appendChild(modale_dialog);
    pricealertbody.appendChild(modale);

    //Generateopt Onclick event
    generateOtp.addEventListener("click", () => {
      let email = document.querySelector(".emailinput").value;
      document.querySelector(".subtitle").innerText = "Sending....";
      fetch("https://couponswala.com/extension/api/autobuy/getEmailOTP", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then(function (response) {
          // console.log(response);
          response.json().then(function (data) {
            // console.log(data);
            if (data.success == true) {
              document.querySelector(".subtitle").innerText = "OTP Sent";
              document.querySelector(".subtitle").style.color =
                "rgb(44, 193, 134)";
              setTimeout(() => {
                document.querySelector(".subtitle").innerText = "";
                document.querySelector(".subtitle").style.color = "black";
              }, 5000);
            } else {
              document.querySelector(".subtitle").innerText =
                "Something went wrong";
              document.querySelector(".subtitle").style.color = "red";
              setTimeout(() => {
                document.querySelector(".subtitle").innerText = "";
                document.querySelector(".subtitle").style.color = "black";
              }, 5000);
            }
          });
        })
        .then(function (res) {})
        .catch(function (err) {
          console.log(err);
        });
    });

    //Login confirm onclick
    aConfirm.addEventListener("click", () => {
      let email = document.querySelector(".emailinput").value;
      let otp = document.querySelector(".otpinput").value;
      document.querySelector(".subtitle").innerText = "Loading...";
      fetch("https://couponswala.com/extension/api/autobuy/signin", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({ email, otp }),
      })
        .then((response) => {
          let abtoken = response.headers.get("x-auth");
          response.json().then(function (data) {
            if (data.success == true) {
              chrome.storage.sync.set({ abtoken: abtoken });
              chrome.storage.sync.set({ abemail: data.user.email });
              getdroplist();
              document.querySelector(".logoutbtn").style.display = "unset";
              document.querySelector(".modale").style.display = "none";
              document.querySelector(".subtitle").innerText = "";
            } else {
              document.querySelector(".subtitle").innerText =
                "Something went Wronng / Invalid OTP";
              document.querySelector(".subtitle").style.color = "red";
              setTimeout(() => {
                document.querySelector(".subtitle").innerText = "";
                document.querySelector(".subtitle").style.color = "black";
              }, 5000);
            }
          });
        })
        .then((res) => {})
        .catch(function (err) {
          console.log(err);
        });
    });

    //Graph Div
    let highchartfigure = document.createElement("figure");
    highchartfigure.setAttribute("class", "highcharts-figure");
    let chartcontainer = document.createElement("div");
    chartcontainer.setAttribute("id", "chart-container");
    let chartdata = document.createElement("div");
    chartdata.setAttribute("class", "chartdata");

    let highprice = document.createElement("div");
    highprice.setAttribute("class", "chartdata-highprice");
    let highpricetext = document.createElement("h4");
    highpricetext.setAttribute("class", "chartdata-highpricetext");
    highpricetext.innerText = "Highest";
    let highpricevalue = document.createElement("p");
    highpricevalue.setAttribute("class", "chartdata-highpricevalue");
    highpricevalue.innerText = "0";
    highprice.appendChild(highpricetext);
    highprice.appendChild(highpricevalue);

    let lowprice = document.createElement("div");
    lowprice.setAttribute("class", "chartdata-lowprice");
    let lowpricetext = document.createElement("h4");
    lowpricetext.setAttribute("class", "chartdata-lowpricetext");
    lowpricetext.innerText = "Lowest";
    let lowpricevalue = document.createElement("p");
    lowpricevalue.setAttribute("class", "chartdata-lowpricevalue");
    lowpricevalue.innerText = "0";

    lowprice.appendChild(lowpricetext);
    lowprice.appendChild(lowpricevalue);
    chartdata.appendChild(highprice);
    chartdata.appendChild(lowprice);

    let suggestion = document.createElement("p");
    suggestion.setAttribute("class", "suggestion");
    suggestion.innerText =
      "Since the price graph is constant for a couple of weeks, it would be a great choice to buy this product now.";

    let pricealertdiv = document.createElement("div");
    pricealertdiv.setAttribute("class", "pricealert");

    let icon = document.createElement("img");
    icon.setAttribute("class", "pricealert-icon");
    icon.setAttribute(
      "src",
      "https://i.ibb.co/VYS4vMt/icons8-jingle-bell-35.png"
    );
    // icon.innerText = "A";

    let pricealertdata = document.createElement("div");
    pricealertdata.setAttribute("class", "pricealert-data");

    let pricealertdata_title = document.createElement("div");
    pricealertdata_title.setAttribute("class", "pricealert-title");
    pricealertdata_title.innerText = "Add to DropList";

    let pricealertdata_sub = document.createElement("div");
    pricealertdata_sub.setAttribute("class", "pricealert-sub");
    pricealertdata_sub.innerText = "Notify of price drop.";

    let pricealertbtn = document.createElement("button");
    pricealertbtn.setAttribute("class", "pricealert-button");
    pricealertbtn.innerText = "+";

    pricealertdata.appendChild(pricealertdata_title);
    pricealertdata.appendChild(pricealertdata_sub);
    pricealertdiv.appendChild(icon);
    pricealertdiv.appendChild(pricealertdata);
    pricealertdiv.appendChild(pricealertbtn);

    let collapse = document.createElement("div");
    collapse.setAttribute("class", "collapse-div");

    let pricealert_collapse = document.createElement("div");
    pricealert_collapse.setAttribute("class", "pricealert-collapse");

    let pricealertitem = document.createElement("div");
    pricealertitem.setAttribute("class", "pricealertitem");
    let pricealertimgdiv = document.createElement("div");
    pricealertimgdiv.setAttribute("class", "pricealertimg-div");
    let currentproduct = pageanalyse();
    let pricealertimg = document.createElement("img");
    pricealertimg.src = currentproduct.imgsrc;
    pricealertimg.setAttribute("class", "pricealert-collapse-img");
    let pricealerttitle = document.createElement("h4");
    pricealerttitle.setAttribute("class", "pricealert-collapse-title");
    pricealerttitle.innerText = currentproduct.title;
    let pricealertprice = document.createElement("p");
    pricealertprice.setAttribute("class", "pricealert-collapse-price");
    pricealertprice.innerText = "Rs." + currentproduct.currentprice;

    pricealertitem.appendChild(pricealerttitle);
    pricealertitem.appendChild(pricealertprice);
    pricealertimgdiv.appendChild(pricealertimg);
    pricealert_collapse.appendChild(pricealertimgdiv);
    pricealert_collapse.appendChild(pricealertitem);

    let pricealertoption = document.createElement("div");
    pricealertoption.setAttribute("class", "pricealert-option");
    pricealertoption.innerHTML +=
      '<div class="pricealert-option-days">' +
      '<label for="Days">Days to watch:</label>' +
      '<select name="days" id="daytowatch">' +
      '<option value="30">30</option>' +
      '<option value="60">60</option>' +
      '<option value="90">90</option>' +
      '<option value="120">120</option>' +
      "</select>" +
      "</div>" +
      '<div class="pricealert-option-percentage">' +
      '<label for="Percentage">Drop Percentage:</label>' +
      '<select name="percentage" id="droppercentage">' +
      '<option value="5">5%</option>' +
      '<option value="10">10%</option>' +
      '<option value="15">15%</option>' +
      '<option value="20">20%</option>' +
      '<option value="25">25%</option>' +
      '<option value="30">30%</option>' +
      '<option value="35">35%</option>' +
      '<option value="40">40%</option>' +
      '<option value="45">45%</option>' +
      '<option value="50">50%</option>' +
      '<option value="55">55%</option>' +
      '<option value="60">60%</option>' +
      '<option value="65">65%</option>' +
      '<option value="70">70%</option>' +
      '<option value="75">75%</option>' +
      '<option value="80">80%</option>' +
      '<option value="85">85%</option>' +
      '<option value="90">90%</option>' +
      '<option value="95">95%</option>' +
      "</select>" +
      "</div>";

    pricealertbtn.addEventListener("click", () => {
      var content = document.querySelector(".pricealert-button").parentElement
        .nextElementSibling;

      if (document.querySelector(".pricealert-button").innerText == "+") {
        document.querySelector(".pricealert-button").innerText = "-";
        content.style.display = "none";
      } else {
        document.querySelector(".pricealert-button").innerText = "+";
        content.style.display = "block";
      }
    });

    let addtodroplist = document.createElement("button");
    addtodroplist.setAttribute("class", "addtodroplist");
    addtodroplist.innerText = "Add to DropList";
    addtodroplist.style.display = "none";
    addtodroplist.addEventListener("click", () => {
      chrome.storage.sync.get(null, (res) => {
        document.querySelector(".addtodroplist").innerText = "Adding...";
        let email = res.abemail;
        // console.log(email);
        let obj = pageanalyse();
        let watchday = document.querySelector("#daytowatch").value;
        let percentage = document.querySelector("#droppercentage").value;
        fetch("https://couponswala.com/extension/api/pricealert/addPriceDrop", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            producturl: obj.producturl,
            productid: obj.productid,
            currentprice: obj.currentprice,
            watchday,
            percentage,
            site: obj.site,
          }),
        })
          .then((response) => {
            response.json().then(function (data) {
              console.log(data);
              if (data.success == true) {
                if (
                  addtodroplist.innerText == "Update DropList" ||
                  addtodroplist.innerText == "Updated DropList"
                ) {
                  document.querySelector(".addtodroplist").innerText =
                    "Updated Droplist";
                  document.querySelector(".removefromdroplist").style.display =
                    "unset";
                } else {
                  document.querySelector(".addtodroplist").innerText =
                    "Added to Droplist";
                  document.querySelector(".removefromdroplist").style.display =
                    "unset";
                }

                setTimeout(() => {
                  document.querySelector(".addtodroplist").innerText =
                    "Update DropList";
                }, 1500);
              }
            });
          })
          .then((res) => {})
          .catch(function (err) {
            console.log(err);
          });
      });
    });

    let removefromdroplist = document.createElement("button");
    removefromdroplist.setAttribute("class", "removefromdroplist");
    removefromdroplist.innerText = "Remove from Droplist";
    removefromdroplist.style.display = "none";
    removefromdroplist.addEventListener("click", () => {
      chrome.storage.sync.get(null, (res) => {
        document.querySelector(".removefromdroplist").innerText = "Removing...";
        let email = res.abemail;
        let obj = pageanalyse();
        fetch(
          "https://couponswala.com/extension/api/pricealert/removePriceDrop",
          {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, productid: obj.productid }),
          }
        )
          .then((response) => {
            response.json().then(function (data) {
              if (data.success == true) {
                document.querySelector(".removefromdroplist").innerText =
                  "Removed";
                setTimeout(() => {
                  document.querySelector(".addtodroplist").innerText =
                    "Add to DropList";
                  document.querySelector(".removefromdroplist").style.display =
                    "none";
                }, 1500);
              }
            });
          })
          .then((res) => {})
          .catch(function (err) {
            console.log(err);
          });
      });
    });

    highchartfigure.appendChild(chartcontainer);
    highchartfigure.appendChild(chartdata);
    pricealertbody.appendChild(highchartfigure);
    pricealertbody.appendChild(suggestion);
    pricealertbody.appendChild(pricealertdiv);
    collapse.appendChild(pricealert_collapse);
    collapse.appendChild(pricealertoption);
    collapse.appendChild(addtodroplist);
    collapse.appendChild(removefromdroplist);
    pricealertbody.appendChild(collapse);

    let comparediv = document.createElement("div");
    comparediv.setAttribute("class", "comparediv");

    let comparedivhead = document.createElement("h4");
    comparedivhead.setAttribute("class", "comparehead");
    comparedivhead.innerText = "Compare Prices on Other Sites";

    let comparebody = document.createElement("div");
    comparebody.setAttribute("class", "comparebody");

    comparediv.appendChild(comparedivhead);
    comparediv.appendChild(comparebody);
    pricealertbody.appendChild(comparediv);

    //Append to popup
    popup.appendChild(usesale_container);
    popup.appendChild(pricealertbody);

    //popup footer
    let popupfooter = document.createElement("div");
    popupfooter.setAttribute("class", "popupfooter");
    popupfooter.innerText = "PoweredBy@FairPe";
    popup.appendChild(popupfooter);

    //Attach popupdiv to body
    let fbody = document.getElementsByTagName("body")[0];
    fbody.prepend(popup);

    //getdroplist function
    getdroplist();

    //Load graph data
    getGraphData();

    //load best Prices
    bestPrice();

    //Check current sales
    checkActiveSales();

    btn1.addEventListener("click", () => {
      document.querySelector(".usesale-container").style.display = "none";
      document.querySelector(".pricealertbody").style.display = "flex";
      chrome.storage.sync.get(null, (res) => {
        let loggedin = res.ablog;
        if (loggedin) {
          document.querySelector(".modale").style.display = "none";
          document.querySelector(".logoutbtn").style.display = "unset";
        } else {
          document.querySelector(".modale").style.display = "unset";
          document.querySelector(".logoutbtn").style.display = "none";
        }
        let popupdiv = document.querySelector(".popupdiv");
        popupdiv.style.visibility = "visible";
      });
    });

    btn2.addEventListener("click", () => {
      document.querySelector(".pricealertbody").style.display = "none";
      document.querySelector(".usesale-container").style.display = "unset";
      document.querySelector(".logoutbtn").style.display = "none";
      let popupdiv = document.querySelector(".popupdiv");
      popupdiv.style.visibility = "visible";
    });

    chrome.storage.sync.get(null, (res) => {
      let token = res.abtoken;
      // console.log(token);
      if (token) {
        fetch("https://couponswala.com/extension/api/autobuy/user/me?", {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth": token,
          },
          withCredentials: true,
        })
          .then((response) => {
            response.json().then(function (data) {
              // console.log(data);
              if (data.user) {
                chrome.storage.sync.set({ ablog: true });
                btn1.style.display = "unset";
              } else {
                chrome.storage.sync.set({ ablog: false });
                btn1.style.display = "unset";
              }
            });
          })
          .then((res) => {})
          .catch(function (err) {
            console.log(err);
            chrome.storage.sync.set({ ablog: false });
            btn1.style.display = "unset";
          });
      } else {
        chrome.storage.sync.set({ ablog: false });
        btn1.style.display = "unset";
      }
    });
  }
};
