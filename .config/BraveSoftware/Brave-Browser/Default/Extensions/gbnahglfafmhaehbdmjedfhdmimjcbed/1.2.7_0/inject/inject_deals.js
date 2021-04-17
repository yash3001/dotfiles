dealShow = (DATA) => {
  if (!document.getElementById("deal-box")) {
    const body = document.getElementsByTagName("body").item(0);

    const main_div = document.createElement("div");
    main_div.setAttribute("id", "deal-box");
    body.appendChild(main_div);

    // const close = document.createElement("span");
    // close.setAttribute("id", "close");
    // close.innerText = "x";
    // main_div.appendChild(close);

    const show_text = document.createElement("p");
    show_text.setAttribute("id", "show_text");
    show_text.innerHTML = "Deals";
    main_div.appendChild(show_text);

    const deal_container = document.createElement("div");
    deal_container.setAttribute("id", "deal_container");
    main_div.appendChild(deal_container);

    const Title = document.createElement("h3");
    Title.setAttribute("id", "title");
    Title.innerHTML = "Trending Flipkart Deal";
    deal_container.appendChild(Title);

    const DealInnerContainer = document.createElement("div");
    DealInnerContainer.setAttribute("id", "deal_inner_container");
    deal_container.appendChild(DealInnerContainer);

    let Render = "";

    for (let i = 0; i < DATA.length; i++) {
      Render += `<a class = "each_deal"> ${DATA[i].title} </a>`;
    }

    DealInnerContainer.innerHTML = Render;

    //Click Listener to close All

    // document.getElementById("close").addEventListener("click", () => {
    //   document.getElementById("deal_box").style.display = "none";
    // });

    // Click Listener to show Deals
    document.getElementById("deal-box").addEventListener("click", () => {
      if (document.getElementById("deal_container").style.right == "60px")
        document.getElementById("deal_container").style.right = "-350px";
      else document.getElementById("deal_container").style.right = "60px";
    });
  }
};

// Deals Design Launcher

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.DEALS) {
    dealShow(request.DEALS);
  }
  sendResponse("Done");
});
