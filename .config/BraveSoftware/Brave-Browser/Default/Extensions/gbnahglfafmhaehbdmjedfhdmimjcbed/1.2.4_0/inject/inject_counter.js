console.log("counter injected");

renderCounter = () => {
  if (!document.getElementById("ab-counter-box")) {
    const body = document.getElementsByTagName("body").item(0);

    const main_div = document.createElement("div");
    main_div.setAttribute("id", "ab-counter-box");
    body.appendChild(main_div);

    const div_1 = document.createElement("div");
    div_1.setAttribute("class", "ab-left");
    div_1.setAttribute("style", "display:block;");
    main_div.appendChild(div_1);

    const div_2 = document.createElement("div");
    div_2.setAttribute("class", "ab-right");
    main_div.appendChild(div_2);

    const div_1_1 = document.createElement("div");
    div_1_1.setAttribute("id", "ab-counter");

    div_1.appendChild(div_1_1);

    const div_1_2 = document.createElement("div");
    div_1_2.setAttribute("id", "ab-message");

    div_1.appendChild(div_1_2);

    const div_1_3 = document.createElement("div");
    div_1_3.setAttribute("id", "ab-cross");
    div_1_3.innerHTML = "x";
    div_1.appendChild(div_1_3);

    const div_2_1 = document.createElement("div");
    const img = document.createElement("img");
    div_2_1.setAttribute("id", "ab-circle-toggle");
    img.setAttribute("src", "http://i68.tinypic.com/oa447n.png");
    div_2_1.appendChild(img);
    div_2.appendChild(div_2_1);

    const div_1_1_1 = document.createElement("div");
    const span_1 = document.createElement("span");
    span_1.setAttribute("class", "days");
    const div_1_1_1_1 = document.createElement("div");
    div_1_1_1_1.setAttribute("class", "smalltext");
    div_1_1_1_1.innerHTML = "Days";
    div_1_1_1.appendChild(span_1);
    div_1_1_1.appendChild(div_1_1_1_1);
    div_1_1.appendChild(div_1_1_1);

    const div_1_1_2 = document.createElement("div");
    const span_2 = document.createElement("span");
    span_2.setAttribute("class", "hours");
    const div_1_1_1_2 = document.createElement("div");
    div_1_1_1_2.setAttribute("class", "smalltext");
    div_1_1_1_2.innerHTML = "Hours";
    div_1_1_2.appendChild(span_2);
    div_1_1_2.appendChild(div_1_1_1_2);
    div_1_1.appendChild(div_1_1_2);

    const div_1_1_3 = document.createElement("div");
    const span_3 = document.createElement("span");
    span_3.setAttribute("class", "minutes");
    const div_1_1_1_3 = document.createElement("div");
    div_1_1_1_3.setAttribute("class", "smalltext");
    div_1_1_1_3.innerHTML = "Minutes";
    div_1_1_3.appendChild(span_3);
    div_1_1_3.appendChild(div_1_1_1_3);
    div_1_1.appendChild(div_1_1_3);

    const div_1_1_4 = document.createElement("div");
    const span_4 = document.createElement("span");
    span_4.setAttribute("class", "seconds");
    const div_1_1_1_4 = document.createElement("div");
    div_1_1_1_4.setAttribute("class", "smalltext");
    div_1_1_1_4.innerHTML = "Seconds";
    div_1_1_4.appendChild(span_4);
    div_1_1_4.appendChild(div_1_1_1_4);
    div_1_1.appendChild(div_1_1_4);

    document.getElementById("ab-cross").addEventListener("click", function() {
      document.getElementsByClassName("ab-left")[0].style.display = "none";
    });
  }
};

const URL = window.location.href;

chrome.storage.sync.get(null, data => {
  const Keys = Object.keys(data);
  for (let i = 0; i < Keys.length; i++) {
    if (data[Keys[i]].URL.includes(URL)) {
      renderCounter();
      return data[Keys[i]].time;
    } else return null;
  }
});
