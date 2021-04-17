function pageanalyse() {
  let currentprice = "";
  let producturl = window.location.href;
  let site = producturl.includes("flipkart.com")
    ? "flipkart"
    : producturl.includes("amazon.in")
    ? "amazon"
    : "";
  let productid = "";
  let imgsrc = "";
  let title = "";
  if (site == "flipkart") {
    let pos = producturl.indexOf("pid=");
    let newStr = producturl.slice(pos + 4);
    pos = newStr.indexOf("&");
    newStr = newStr.slice(0, pos);
    productid = newStr;
    if (document.querySelector("._30jeq3._16Jk6d")) {
      currentprice = document
        .querySelector("._30jeq3._16Jk6d")
        .innerText.slice(1)
        .replace(",", "");
    } else {
      currentprice = "0";
    }

    imgsrc = document.querySelector("._1BweB8 img").src;
    title = document.querySelector(".B_NuCI").innerText;
  }
  if (site == "amazon") {
    let pos = producturl.indexOf("/dp/");
    let newStr = producturl.slice(pos + 4);
    productid = newStr.slice(0, 10);
    if (document.querySelector("#price #priceblock_ourprice")) {
      pos = document
        .querySelector("#price #priceblock_ourprice")
        .innerText.slice(2)
        .replace(",", "")
        .indexOf(".");

      currentprice = document
        .querySelector("#price #priceblock_ourprice")
        .innerText.slice(2)
        .replace(",", "")
        .slice(0, pos);
    } else if (document.querySelector("#price #priceblock_dealprice")) {
      pos = document
        .querySelector("#price #priceblock_dealprice")
        .innerText.slice(2)
        .replace(",", "")
        .indexOf(".");

      currentprice = document
        .querySelector("#price #priceblock_dealprice")
        .innerText.slice(2)
        .replace(",", "")
        .slice(0, pos);
    }

    imgsrc = document.querySelector(".a-dynamic-image-container img").src;
    title = document.querySelector("#productTitle").innerText;
  }
  let obj = {
    producturl,
    currentprice,
    productid,
    site,
    imgsrc,
    title,
  };
  return obj;
}

//Add usesalehtml add new
function AddNewProduct() {
  document.querySelector(".usesale-container").innerHTML =
    '<h3 class="addproduct-heading">New Product</h3>' +
    '<p class="addproduct-p"></p>' +
    '<form class="addproduct-form">' +
    '<input type="text" id="input" name="username" class="addproduct-username" maxlength="15" placeholder="Name" required="required">' +
    '<input type="text" id="input" class="addproduct-model" name="model" maxlength="50" placeholder="Model name with color and varient" required="required">' +
    '<input type="email" id="input"class="addproduct-email" name="email" placeholder="Email" required="required">' +
    '<input type="text" id="input" class="addproduct-mobile" name="mobile" placeholder="Mobile" maxlength="10" required="required">' +
    '<input class="addproduct-generateotp" value="Get OTP" type="button">' +
    '<input type="text" id="input" class="addproduct-otp" placeholder="OTP" name="otp" required="required">' +
    '<label  class="addproduct-label">Screenshot</label>' +
    '<input type="file" id="input" name="screenshot" class="addproduct-screenshot" accept="image/*" required="required">' +
    '<input class="addproduct-confirm" value="POST" type="submit">' +
    "</form >" +
    '<button class="addproduct-cancel">Back</button>';

  let usesale_otp_button = document.querySelector(".addproduct-generateotp");
  usesale_otp_button.addEventListener("click", (e) => {
    e.preventDefault();
    let mobileNumber = document.querySelector(".addproduct-mobile").value;
    let username = document.querySelector(".addproduct-username").value;
    let user = { mobileNumber, username };
    // console.log(mobileNumber, username)
    if (mobileNumber && username) {
      fetch("https://couponswala.com/extension/api/salebs/getMobileOtp", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          response.json().then(function (data) {
            if (data.success == true) {
              document.querySelector(".addproduct-p").innerText = "OTP Sent";
              document.querySelector(".addproduct-p").style.color =
                "rgb(44, 193, 134)";
            } else {
              document.querySelector(".addproduct-p").innerText =
                "Something went wrong";
              document.querySelector(".addproduct-p").style.color = "red";
            }
            setTimeout(() => {
              document.querySelector(".addproduct-p").innerText = "";
              document.querySelector(".addproduct-p").style.color = "black";
            }, 5000);
          });
        })
        .then((res) => {})
        .catch(function (err) {
          console.log(err);
        });
    } else {
      document.querySelector(".addproduct-p").innerText =
        "Enter your Name and Mobile number";
      document.querySelector(".addproduct-p").style.color = "red";
      setTimeout(() => {
        document.querySelector(".addproduct-p").innerText = "";
        document.querySelector(".addproduct-p").style.color = "black";
      }, 5000);
    }
  });

  let usesale_post_button = document.querySelector(".addproduct-confirm");
  usesale_post_button.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".addproduct-p").innerText = "Posting..";
    let model = document.querySelector(".addproduct-model").value;
    let username = document.querySelector(".addproduct-username").value;
    let mobile = document.querySelector(".addproduct-mobile").value;
    let email = document.querySelector(".addproduct-email").value;
    let otp = document.querySelector(".addproduct-otp").value;
    let screenshot = document.querySelector(".addproduct-screenshot").files[0];

    if (model && username && mobile && email && otp && screenshot) {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("model", model);
      formData.append("mobile", parseInt(mobile));
      formData.append("email", email);
      formData.append("otp", otp);
      formData.append("screenshot", screenshot);

      fetch("https://couponswala.com/extension/api/salebs/createSale", {
        method: "post",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: formData,
      })
        .then((response) => {
          // console.log(response)
          response.json().then(function (data) {
            if (data.success == true) {
              document.querySelector(".addproduct-p").innerText =
                "Great!! You have posted the product online";
              document.querySelector(".addproduct-p").style.color =
                "rgb(44, 193, 134)";
              setTimeout(() => {
                document.querySelector(".addproduct-p").innerText = "";
                document.querySelector(".addproduct-p").style.color = "black";
                checkActiveSales();
              }, 2000);
            } else {
              document.querySelector(".addproduct-p").innerText =
                "Something went wrong";
              setTimeout(() => {
                document.querySelector(".addproduct-p").innerText = "";
                document.querySelector(".addproduct-p").style.color = "black";
              }, 2000);
            }
          });
        })
        .then((res) => {})
        .catch(function (err) {
          console.log(err);
        });
    } else {
      document.querySelector(".addproduct-p").innerText =
        "Please fill all the fields and continue";
      document.querySelector(".addproduct-p").style.color = "red";
      setTimeout(() => {
        document.querySelector(".addproduct-p").innerText = "";
        document.querySelector(".addproduct-p").style.color = "black";
      }, 5000);
    }
  });

  let usesale_cancel_button = document.querySelector(".addproduct-cancel");
  usesale_cancel_button.addEventListener("click", () => {
    checkActiveSales();
  });
}

//Add usesalehtml sale page
function SalePage(saledata, maxtime) {
  let activesale = "Active Sale |";
  saledata.forEach((data) => {
    activesale += `${data.brand}|`;
  });
  document.querySelector(".usesale-container").innerHTML =
    '<div class="usesale-container-head">' +
    '<p class="usesale-container-head-p">Got a new mobile in your cart?</p>' +
    '<div class="addsale">Let people know</div>' +
    "</div>" +
    '<p class="usesale-container-head-subtitle">This page will be available, one hour after the sale starts. To know more, have a look <a href="https://autobuyapp.com/buy-and-sell/" target="_blank">here</a></p>' +
    '<p class="activesale">Active Sale |Redmi|Motorola|Realme</p>';

  document.querySelector(".usesale-container").innerHTML +=
    '<div class="usesale-body"></div>';
  let usesalebutton = document.querySelector(".addsale");
  usesalebutton.addEventListener("click", () => {
    AddNewProduct();
  });
  document.querySelector(
    ".usesale-container .activesale"
  ).innerText = activesale;
  document.querySelector(".usesale-body").innerHTML =
    '<p class="usesale-body-loading" >Loading...</p>';

  fetch("https://couponswala.com/extension/api/salebs/getActiveSale", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      saleTime: maxtime,
    }),
  })
    .then((response1) => {
      response1.json().then(function (data1) {
        if (data1.success) {
          document.querySelector(".usesale-body").innerHTML = "";
          for (let i = 0; i < data1.activeSales.length; i++) {
            let postid = data1.activeSales[i]._id;
            fetch(
              `https://couponswala.com/extension/api/salebs/getScreenshot/${postid}`,
              {
                method: "get",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response2) => {
                document.querySelector(
                  ".usesale-container .usesale-body"
                ).innerHTML +=
                  '<div class="usesale-item">' +
                  '<div class="usesale-item-top">' +
                  '<div class="usesale-item-top-name">' +
                  '<p class="usesale-item-top-p">' +
                  data1.activeSales[i].username +
                  "</p>" +
                  '<h4 class="usesale-item-top-head">' +
                  data1.activeSales[i].model +
                  "</div>" +
                  '<div class="usesale-product-imgdiv">' +
                  '<a href="' +
                  response2.url +
                  '" target="_blank">' +
                  '<img class="usesale-product-img" src="' +
                  response2.url +
                  '" >' +
                  "</a>" +
                  "</div>" +
                  "</div>" +
                  '<div class="usesale-product-bottom">' +
                  '<div class="usesale-product-bottom-mobilediv">' +
                  '<img src="https://i.ibb.co/g9RCF57/icons8-android-24.png">' +
                  '<p class="usesale-product-mobile">' +
                  data1.activeSales[i].mobile +
                  "</p>" +
                  "</div>" +
                  '<div class="usesale-product-bottom-emaildiv">' +
                  '<img src="https://i.ibb.co/LJgKPVV/icons8-send-email-24.png">' +
                  '<p class="usesale-product-email">' +
                  data1.activeSales[i].email +
                  "</p>" +
                  "</div>" +
                  "</div>" +
                  "</div>";
              })
              .then((res) => {})
              .catch(function (err) {
                console.log(err);
              });
          }
        } else {
          document.querySelector(".usesale-body").innerHTML =
            '<p class="usesale-body-loading" >Be the First one to post Today..!!</p>';
        }
      });
    })
    .then((res) => {})
    .catch(function (err) {
      console.log(err);
    });
}

//Check DB droplist
function getdroplist() {
  chrome.storage.sync.get(null, (res) => {
    let email = res.abemail;
    let obj = pageanalyse();
    // console.log(obj)
    fetch("https://couponswala.com/extension/api/pricealert/checkDropList", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, productid: obj.productid }),
    })
      .then((response) => {
        response.json().then(function (data) {
          // console.log(data)
          if (data.success == true) {
            document.querySelector(".addtodroplist").innerText =
              "Update DropList";
            document.querySelector(".addtodroplist").style.display = "unset";
            document.querySelector(".removefromdroplist").style.display =
              "unset";
          } else {
            document.querySelector(".addtodroplist").innerText =
              "Add to DropList";
            document.querySelector(".addtodroplist").style.display = "unset";
            document.querySelector(".removefromdroplist").style.display =
              "none";
          }
        });
      })
      .then((res) => {})
      .catch(function (err) {
        console.log(err);
      });
  });
}

function getGraphData() {
  let url = window.location.href;
  let userid = "";
  let high = 0;
  let low = 0;
  chrome.storage.sync.get(null, (res) => {
    userid = res.userid;
    Highcharts.getJSON(
      `https://data.unscart.com/ext?url=${url}&userid=${userid}`,
      function (data) {
        // console.log(data);
        if (data.length > 2) {
          for (let i = 0; i < data.length; i++) {
            var timestamp = Date.parse(
              data[i][0].split("-").reverse().join("-")
            );
            data[i][0] = timestamp;
            data[i][1] = Number(data[i][1]);
            if (i == 0) {
              low = data[i][1];
            }
            if (high < data[i][1]) {
              high = data[i][1];
            }
            if (low > data[i][1]) {
              low = data[i][1];
            }
            if (i == data.length - 1) {
              document.querySelector(
                ".chartdata-highpricevalue"
              ).innerText = high;
              document.querySelector(
                ".chartdata-lowpricevalue"
              ).innerText = low;
              Highcharts.chart("chart-container", {
                chart: {
                  zoomType: "x",
                },
                title: {
                  text: "Price History Graph",
                },
                subtitle: {
                  text:
                    document.ontouchstart === undefined
                      ? "Click and drag in the plot area to zoom in"
                      : "Pinch the chart to zoom in",
                },
                xAxis: {
                  type: "datetime",
                },
                yAxis: {
                  title: {
                    text: "Price",
                  },
                },
                legend: {
                  enabled: false,
                },
                plotOptions: {
                  area: {
                    fillColor: {
                      linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                      },
                      stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [
                          1,
                          Highcharts.color(Highcharts.getOptions().colors[0])
                            .setOpacity(0)
                            .get("rgba"),
                        ],
                      ],
                    },
                    marker: {
                      radius: 2,
                    },
                    lineWidth: 1,
                    states: {
                      hover: {
                        lineWidth: 1,
                      },
                    },
                    threshold: null,
                  },
                },
                series: [
                  {
                    type: "area",
                    name: "Price in Rs",
                    data: data,
                  },
                ],
              });
              if (document.querySelector(".highcharts-exporting-group"))
                document.querySelector(".highcharts-exporting-group").remove();
            }
          }
        } else {
          document.querySelector("#chart-container").innerHTML =
            "The Price has not changed for a long time";
          document.querySelector("#chart-container").style.padding = "30px";
          document.querySelector("#chart-container").style.color = "grey";
          document.querySelector("#chart-container").style.fontWeight = "500";
          document.querySelector("#chart-container").style.fontSize = "14px";
          document.querySelector("#chart-container").style.textAlign = "center";
          let pagedata = pageanalyse();
          document.querySelector(".chartdata-highpricevalue").innerText =
            pagedata.currentprice;
          document.querySelector(".chartdata-lowpricevalue").innerText =
            pagedata.currentprice;
        }
      }
    );
  });
}

function checkActiveSales() {
  fetch("https://couponswala.com/extension/api/autobuy/flashsale", {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      let tempSale = [];
      let saleProducts = [];
      response.json().then(function (data) {
        // console.log(data);
        data.forEach((sale) => {
          let saleTime = new Date(JSON.parse(sale.saleDateTime)).getTime();
          let currentTime = new Date().getTime();
          if (
            currentTime > saleTime &&
            currentTime < saleTime + 1 * 60 * 60 * 1000
          ) {
            tempSale.push(sale);
          }
        });
        if (tempSale.length > 0) {
          let obj = pageanalyse();
          let btnstatus = false;
          // console.log(tempSale);
          for (let i = 0; i < tempSale.length; i++) {
            let datetime = new Date(
              JSON.parse(tempSale[i].saleDateTime)
            ).getTime();
            // console.log("datetime", datetime);
            saleProducts.push(datetime);
            for (let j = 0; j < tempSale[i].varient.length; j++) {
              // console.log(tempSale[i].varient[j].productUrl);
              // console.log(obj.productid);
              if (tempSale[i].varient[j].productUrl.includes(obj.productid)) {
                btnstatus = true;
              }
              if (
                j == tempSale[i].varient.length - 1 &&
                i == tempSale.length - 1
              ) {
                if (btnstatus) {
                  document.querySelector(".autobuy-button-two").style.display =
                    "unset";
                  let maxSaleTime = Math.max(...saleProducts);
                  // console.log("tempSale", tempSale);
                  // console.log("maxsaletime", maxSaleTime);
                  SalePage(tempSale, maxSaleTime);
                }
              }
            }
          }
        }
      });
    })
    .then((res) => {})
    .catch(function (err) {
      console.log(err);
    });
}

//Best price
function bestPrice() {
  // let productitem = document.createElement("div");
  // productitem.setAttribute("class", "p-item");

  // let productitem_p = document.createElement("p");
  // productitem_p.setAttribute("class", "p-item-p");
  // productitem_p.innerText =
  //   "Get best price for this product from offline and online store";

  // let productitem_img = document.createElement("img");
  // productitem_img.setAttribute("class", "productitem-img");
  // productitem_img.setAttribute(
  //   "src",
  //   "https://i.ibb.co/0rSj95s/best-price.jpg"
  // );

  // productitem.appendChild(productitem_p);
  // productitem.appendChild(productitem_img);
  // productitem.appendChild(buybutton);
  // document.querySelector(".comparebody").appendChild(productitem);

  let obj = pageanalyse();
  let tempurl = obj.producturl;
  // console.log(obj);
  // console.log(tempurl);

  chrome.storage.sync.get(null, (res) => {
    let token = res.abtoken;
    // console.log(token);
    // console.log(tempurl);
    fetch(
      `https://couponswala.com/extension/api/searchProduct/search?url=${tempurl}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth": token,
        },
        withCredentials: true,
      }
    )
      .then((response) => {
        response.json().then(function (data) {
          // console.log("data", data);
          // console.log("data",data.Sites)
          let pcWrapper = document.createElement("div");
          pcWrapper.setAttribute("class", "pcWrapper");

          let headerWrapper = document.createElement("div");
          headerWrapper.setAttribute("class", "headerWrapper");

          let pcTitle = document.createElement("h2");
          pcTitle.setAttribute("class", "pcTitle");

          let imgWrapper = document.createElement("div");
          imgWrapper.setAttribute("class", "imgWrapper");

          let pcImage = document.createElement("img");
          pcImage.setAttribute("class", "pcImage");

          imgWrapper.appendChild(pcImage);

          pcTitle.innerText = data.title;
          pcImage.src = data.image;

          // Appending
          headerWrapper.appendChild(pcTitle);
          headerWrapper.appendChild(imgWrapper);

          pcWrapper.appendChild(headerWrapper);

          let storesWrap = document.createElement("div");
          storesWrap.setAttribute("class", "storesWrap");

          if (data.Sites) {
            data.Sites.forEach((site) => {
              for (const [key, value] of Object.entries(site)) {
                value.forEach((obj) => {
                  console.log(key, obj.price, obj.productUrl);

                  let objWrap = document.createElement("div");
                  objWrap.setAttribute("class", "objWrap");

                  let storeLabel = document.createElement("h4");
                  storeLabel.setAttribute("class", "storeLabel");
                  storeLabel.innerText = key;

                  let priceLabel = document.createElement("h5");
                  priceLabel.setAttribute("class", "priceLabel");
                  priceLabel.innerText = "₹" + obj.price;

                  let storeButton = document.createElement("button");
                  storeButton.setAttribute("class", "storeButton");
                  storeButton.innerText = "Buy now";
                  storeButton.setAttribute("id", obj.productUrl);

                  storeButton.onclick = function () {
                    chrome.runtime.sendMessage({
                      type: "pricecompare",
                      productUrl: this.id,
                    });
                    // console.log()
                    // chrome.tabs.create({url:this.id})
                    // chrome.tabs.create({ url: action_url });
                  };

                  // Appending
                  objWrap.appendChild(storeLabel);
                  objWrap.appendChild(priceLabel);
                  objWrap.appendChild(storeButton);

                  storesWrap.appendChild(objWrap);
                });
              }
            });

            pcWrapper.appendChild(storesWrap);
            document.querySelector(".comparebody").appendChild(pcWrapper);
          } else {
            let pcPara = document.createElement("p");
            pcPara.setAttribute("class", "pcPara");
            pcPara.innerText = "You already have a better Price here. 😃";
            document.querySelector(".comparebody").appendChild(pcPara);
          }
        });
      })
      .then((res) => {})
      .catch(function (err) {
        console.log(err);
      });
  });

  // buybutton.innerText = `Redirecting in ${n + 1}...`;
  // let si1 = setInterval(() => {
  //   buybutton.innerText = `Redirecting in ${n}...`;
  //   n--;
  //   if (n < 1) {
  //     clearInterval(si1);
  //     if (Fpurl != null) {
  //       chrome.runtime.sendMessage({
  //         message: "fairpeurl",
  //         RedirectUrl: Fpurl,
  //       });
  //       buybutton.innerText = "Compare Price";
  //     } else {
  //       buybutton.innerText = "Already a better Price";
  //       setTimeout(() => {
  //         buybutton.innerText = "Compare Price";
  //       }, 1500);
  //     }
  //   }
  // }, 1000);
  // });
}
