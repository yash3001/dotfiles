window.onload = async () => {
  (async () => {
    const rawResponse = await fetch(
      "https://couponswala.com/extension/query/getQuery",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const content = await rawResponse.json();
    let { product1Query, product2Query, saleTime } = content.result;
    chrome.storage.sync.set({
      product1Query: product1Query,
    });
    chrome.storage.sync.set({
      product2Query: product2Query,
    });
    chrome.storage.sync.set({
      saleTime: saleTime,
    });
    InitApp();
  })();
};
const InitApp = async () => {
  var timeinterval;
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
  });
  const getQueries = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (res) => {
        resolve({
          product1Query: res.product1Query || "noquery1",
          product2Query: res.product2Query || "noquery2",
          saleTime: res.saleTime || new Date(),
        });
      });
    });
  };
  let { product1Query, product2Query, saleTime } = await getQueries();
  console.log(product1Query, product2Query, saleTime);
  // INITIALIZE FUNCTIONS
  const getTimeRemaining = (endtime) => {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };
  const fireMessage = (message) => {
    Toast.fire({
      icon: "info",
      title: message,
    });
  };
  let x;
  const clickBuyButton = () => {
    return new Promise((resolve, reject) => {
      x = setInterval(() => {
        let button1 = document.querySelector(product1Query);
        let button2 = document.querySelector(product2Query);
        console.log("clicking", saleTime);
        button1 && button1.click();
        button2 && button2.click();
      }, 5);
    });
  };
  const updateClock = () => {
    saleTime = new Date(saleTime);
    let t = getTimeRemaining(saleTime);
    console.log(t.total);
    if (t.total < -6000 && t.total > -13000) {
      fireMessage(
        "We have done our best. Hope you got it. If not try again in next 1Rs Sale"
      );
      clearInterval(timeinterval);
      clearInterval(x);
    } else if (t.total < 60000) {
      clickBuyButton();
      chrome.runtime.sendMessage(
        {
          refresh: true,
        },
        function () {}
      );
      fireMessage(
        "Script is running. We are refreshing the page in every 1 sec."
      );
    } else if (t.total < 120000) {
      fireMessage(
        "We will refresh the page in next 1 minute. Make sure you logged in."
      );
    }
  };
  timeinterval = setInterval(updateClock, 1000);
  const renderMessage = () => {
    let ti = getTimeRemaining(saleTime);
    if (ti.total > 12000) {
      fireMessage(
        "Mi 1rs sale, Fan Festival and much more. Stay logged in. We will run Auto Buy script before 2 min of sale"
      );
    }
  };
  renderMessage();
  // TOGGLE POPUP BUTTONS
};
