var bottom_box_temp = `<style>
#cnf-container-wrapper {
    width: 430px;
    position: fixed;
    right: 50px;
    bottom: 50px;
    font-family: rubik, sans-sarif;
    background: white;
    box-shadow: 0px 0px 3px 1px grey;
    z-index: 9999999999;
}
.active#cnf-container-wrapper{
    filter: hue-rotate(210deg);
}
#rf-main-cont {
    display: flex;
    position: relative;
}

#rf-icon {
    height: 70px;
    padding: 10px;
    margin-bottom: 0;
    /* color: gold; */
}
.rf-pr {
    margin-right: 6px;
    border-left: 1px solid rgb(120, 84, 247);
    margin: 12px 0;
    display: table;
    min-height: 70px;
}

.change {
    padding: 0px 0px;
    display: inline-block;
    float:left;
    vertical-align: middle;
}

.rf-ins {
    color: #939292;
    font-size: 17px;
    padding: 0 15px;
    display: table-cell;
    vertical-align: middle;
}

.loading-bar {
    width: calc( 100% + 2px);
    height: 4px;
    background: rgba(122,86,247,0.5);
    position: relative;
    overflow: hidden;
}

.loading-bar::before {
    content: '';
    width: 0px;
    height: 4px;
    background: #7A56F7;
    position: absolute;
    left: -1px;
    animation: bluebar {{ref}}s infinite;
}

@keyframes bluebar {
    100% {
        width: 100%
    }
}
@keyframes myOrbit {
    from {
        transform: rotate(0deg) translateX(6px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(6px) rotate(-360deg);
    }
}

#ec-icon2 {
    animation: myOrbit 2s linear infinite;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 40px;
    left: 60px;
    opacity: 0.6;
    display:none;
}
.active #ec-icon2{
    display:block;
}
</style>
<link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
<div id="cnf-container-wrapper">
    <div>
        <div id="rf-main-cont">
            <div style="display: inline-block;float: left;position: relative;width: 100px;">
                <img id="rf-icon" src="chrome-extension://{{myid}}/images/fs_violet.PNG">
                <img id="ec-icon2" src="chrome-extension://{{myid}}/images/magnify1.PNG">
            </div>
            <div class="change">
                <div class="rf-pr">
                    <div id="fmsg" class="rf-ins">Something went wrong, please refresh your window</div>
                </div>
            </div>
        </div>
    </div>
    <div class="loading-animation" style="">
        <div class="loading-bar"></div>
    </div>
</div>
`;
var salebutton_temp =`
<style>
.rf-main-cont{
    width: 175px;
    height: 36px;
    display: flex;
    position: fixed;
    font-family: rubik, sans-sarif;
    background: #7854f7;
    bottom: 10px;
    cursor: pointer;
    right: 10px;
    z-index: 999999999;
    padding: 0;
}
#rf-icon{
    width: 27px;
    padding: 5px 3px;
}
#rf-ins{
    color: rgb(239, 239, 245);
    font-size: 15px;
    padding: 8px 6px;
}
</style>
<button class='rf-main-cont' id="regbt">
    <img id='rf-icon' src="chrome-extension://{{myid}}/images/icon128.png">
    <div id='rf-ins'>Click for Autobuy</div>
</button>
`;
