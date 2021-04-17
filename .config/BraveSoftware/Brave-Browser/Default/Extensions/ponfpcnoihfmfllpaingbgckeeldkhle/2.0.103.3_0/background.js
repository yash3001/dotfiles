/*
##
##  Enhancer for YouTube™
##  =====================
##
##  Author: Maxime RF <https://www.mrfdev.com>
##
##  This file is protected by copyright laws and international copyright
##  treaties, as well as other intellectual property laws and treaties.
##
##  All rights not expressly granted to you are retained by the author.
##  Read the license.txt file for more details.
##
##  © MRFDEV.com - All Rights Reserved
##
*/
(function(){function q(){chrome.windows.getAll({populate:!0},function(b){b.forEach(function(a){a.tabs.forEach(function(c){chrome.tabs.executeScript(c.id,{file:"init.js"},function(f){chrome.runtime.lastError&&(document.documentElement.dataset.e=1)})})})})}function p(b){chrome.windows.getAll({populate:!0},function(a){a.forEach(function(c){c.tabs.forEach(function(f){chrome.tabs.sendMessage(f.id,b,function(h){chrome.runtime.lastError&&(document.documentElement.dataset.e=1)})})})})}function l(b){chrome.cookies.get({url:"https://www.youtube.com",
name:"PREF"},function(a){a=a?a.value.split("&"):[];if(b.theme){var c=a.findIndex(function(f){return/f6=[\w\d]+/.test(f)});-1===c&&(c=a.length);a[c]="light"===b.theme?"f6=80800":"f6=400"}b.autoplay&&(c=a.findIndex(function(f){return/f5=[\w\d]+/.test(f)}),-1===c&&(c=a.length),a[c]=b.autoplay);0<a.length&&chrome.cookies.set({url:"https://www.youtube.com",name:"PREF",value:a.join("&"),domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926})})}chrome.runtime.onInstalled.addListener(function(b){"install"===
b.reason?(chrome.tabs.create({url:"options.html",active:!1}),chrome.tabs.create({url:"https://www.mrfdev.com/event?n=install&b=chrome&e=enhancer-for-youtube&v="+chrome.runtime.getManifest().version,active:!0}),n=Date.now(),chrome.storage.local.set({date:n}),q()):"update"!==b.reason||"2.0.103"!==b.previousVersion&&"2.0.103.1"!==b.previousVersion?"update"===b.reason&&/2\.0\.(9|10[0-1])/.test(b.previousVersion)&&chrome.storage.local.get({autopausevideos:!0,customtheme:"",disablepreloading:!1,enablefilters:!1,
pinnedplayer:!0,pinnedplayerposition:"_top-left",pinnedplayersize:"_400x225",quality1:"hd1080",quality2:"hd720",removeads:!1,removeannotations:!1,theme:"default",toolbarbuttons:"clean,cinema,resize,detach,boost,loop,slowdown,speed,speedup,filters,script",script:""},function(a){a.customcolors={"--main-color":"#00adee","--main-background":"#111111","--second-background":"#181818","--hover-background":"#232323","--main-text":"#eff0f1","--dimmer-text":"#cccccc","--shadow":"#000000"};a.customcssrules=
a.customtheme;a.customtheme="custom"===a.theme?!0:!1;"default"===a.theme||"custom"===a.theme?(a.themevariant="youtube-deep-dark.css",a.theme="default-light"):(a.themevariant=a.theme,a.theme="youtube-deep-dark",l({theme:"dark"}));a.controls=[];a.controls.push("loop");a.controls.push("reverse-playlist");0<=a.toolbarbuttons.indexOf("boost")&&a.controls.push("volume-booster");a.controls.push("not-interested");0<=a.toolbarbuttons.indexOf("cinema")&&a.controls.push("cinema-mode");0<=a.toolbarbuttons.indexOf("resize")&&
a.controls.push("size");a.controls.push("pop-up-player");0<=a.toolbarbuttons.indexOf("slowdown")&&a.controls.push("speed-minus");a.controls.push("speed");0<=a.toolbarbuttons.indexOf("speedup")&&a.controls.push("speed-plus");a.controls.push("video-filters");a.controls.push("screenshot");a.controls.push("keyboard-shortcuts");0<=a.toolbarbuttons.indexOf("script")&&a.controls.push("custom-script");0<=a.toolbarbuttons.indexOf("options")&&a.controls.push("options");delete a.toolbarbuttons;a.applyvideofilters=
a.enablefilters;delete a.enablefilters;a.blockads=a.removeads;delete a.removeads;a.blockautoplay=a.autopausevideos;delete a.autopausevideos;a.customscript=a.script;delete a.script;a.hidecardsendscreens=a.removeannotations;delete a.removeannotations;a.miniplayer=a.pinnedplayer;delete a.pinnedplayer;a.miniplayerposition=a.pinnedplayerposition;delete a.pinnedplayerposition;a.miniplayersize=a.pinnedplayersize;delete a.pinnedplayersize;a.qualityembeds=a.quality2;a.qualityembedsfullscreen=a.quality1;a.qualityplaylists=
a.quality1;a.qualityplaylistsfullscreen=a.quality1;a.qualityvideos=a.quality1;a.qualityvideosfullscreen=a.quality1;delete a.quality1;delete a.quality2;a.stopvideos=a.disablepreloading;delete a.disablepreloading;a.update=Date.now();a.message=!0;a.reload=!0;chrome.storage.local.set(a);chrome.storage.local.remove("autofocusevents autopausevideos disablepreloading enablefilters permissions pinnedplayer pinnedplayerposition pinnedplayersize quality1 quality2 quality3 quality4 removeads removeannotations script slideeffect toolbarbackgroundcolor toolbarbordercolor toolbarbuttons toolbarcolor toolbarcoloractive toolbaropacity toolbartooltips transparency visitor_info1_live".split(" "))}):
chrome.storage.local.get({controls:"loop reverse-playlist volume-booster not-interested size pop-up-player speed video-filters keyboard-shortcuts".split(" ")},function(a){a.controls.push("options");chrome.storage.local.set({update:Date.now(),message:!0,reload:!0,controls:a.controls})});"update"===b.reason&&q()});chrome.runtime.setUninstallURL("https://www.mrfdev.com/event?n=uninstall&b=chrome&e=enhancer-for-youtube&v="+chrome.runtime.getManifest().version+"&d="+n+"-"+Date.now());chrome.runtime.onMessage.addListener(function(b,
a,c){c=b.request;if("get-messages"===c){var f=chrome.i18n.getMessage("locale_code"),h="add_to_whitelist boost_volume brightness cinema_mode color_inversion contrast custom_script expand flip_horizontally flip_vertically gaussian_blur grayscale hue_rotation keyboard_shortcuts loop loop_end loop_start message options pop_up_player remove_ads remove_from_whitelist reset reverse_playlist saturation screenshot sepia shrink skip_ads speed stop toggle_visibility video_filters".split(" ");chrome.storage.local.get({localecode:f},
function(d){var e={};if(f===d.localecode){for(d=h.length-1;0<=d;d--)e[h[d]]=chrome.i18n.getMessage(h[d]);chrome.tabs.sendMessage(a.tab.id,{message:"set-messages",messages:e},function(k){chrome.runtime.lastError&&(document.documentElement.dataset.e=1)})}else fetch(`_locales/${d.localecode}/messages.json`).then(function(k){return k.json()}).then(function(k){for(var m=h.length-1;0<=m;m--)e[h[m]]=k[h[m]].message;chrome.tabs.sendMessage(a.tab.id,{message:"set-messages",messages:e},function(t){chrome.runtime.lastError&&
(document.documentElement.dataset.e=1)})})})}else if("pause-videos"===c)p({message:"pause-video"});else if("set-cookie"===c)chrome.cookies.set({url:b.url,name:b.name,value:b.value,domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926});else if("pop-up-player"===c){c="https://www.youtube.com/pop-up-player/";var r=g.popuplayersize.split("x");b.playlist?(window.playlist=b.params,c+=b.params.videos[b.params.index]+"?autoplay=0&playlist"):c+=b.params;chrome.windows.create({url:c,
type:"popup",height:parseInt(r[1],10)+9+30,width:parseInt(r[0],10)+16,incognito:b.incognito,focused:!0},function(d){chrome.windows.update(d.id,{drawAttention:!0})})}else"playlist"===c?chrome.tabs.sendMessage(a.tab.id,{message:"playlist",playlist:window.playlist},function(d){chrome.runtime.lastError&&(document.documentElement.dataset.e=1);delete window.playlist}):"configure-keyboard-shortcuts"===c?chrome.tabs.create({url:"chrome://extensions/shortcuts",active:!0}):"keyboard-shortcuts"===c?chrome.tabs.create({url:"https://www.mrfdev.com/youtube-keyboard-shortcuts",
active:!0}):"always-on-top"===c?chrome.tabs.create({url:"https://www.mrfdev.com/always-on-top",active:!0}):"content-scripts"===c?(chrome.tabs.executeScript(a.tab.id,{file:"start.js"}),chrome.tabs.executeScript(a.tab.id,{file:"content.js"})):"custom-script"===c?chrome.storage.local.get({customscript:""},function(d){chrome.tabs.sendMessage(a.tab.id,{message:"custom-script",customscript:d.customscript},function(e){chrome.runtime.lastError&&(document.documentElement.dataset.e=1)})}):"whitelist"===c?chrome.storage.local.get({whitelist:""},
function(d){d=""!==d.whitelist?d.whitelist.split(","):[];var e=b.channel.replace(/,/g,"").trim();if("add"===b.action&&0>d.indexOf(e)){d.push(e);try{d.sort(function(k,m){return k.localeCompare(m)})}catch(k){d.sort()}}else"remove"===b.action&&(e=d.indexOf(e),-1!==e&&d.splice(e,1));chrome.storage.local.set({whitelist:d.toString()})}):"pref-cookie"===c?l(b.obj):"options-page"===c?chrome.runtime.openOptionsPage():"message-page"===c&&chrome.storage.local.set({message:!1},function(){"2.0.103.2"===chrome.runtime.getManifest().version?
chrome.tabs.create({url:"update.html",active:!0}):chrome.tabs.create({url:"message.html",active:!0})})});chrome.storage.onChanged.addListener(function(b,a){for(var c in b)"undefined"!==typeof b[c].newValue&&("customscript"!==c&&"popuplayersize"!==c&&p({message:"preference-changed",name:c,value:b[c].newValue}),"theme"===c?l({theme:"default-light"===b[c].newValue?"light":"dark"}):"disableautoplay"===c?l({autoplay:!0===b[c].newValue?"f5=30000":"f5=20000"}):"popuplayersize"===c&&(g.popuplayersize=b[c].newValue))});
chrome.commands.onCommand.addListener(function(b){var a={"c070-toggle-loop":"loop","c080-stop-video":"stop","c090-reverse-playlist":"reverse-playlist","c100-toggle-volume-booster":"volume-booster","c110-whitelist":"whitelist","c120-clear-ads":"not-interested","c130-toggle-annotations":"cards-end-screens","c140-toggle-cinema-mode":"cinema-mode","c150-toggle-player-size":"size","c160-center-video-player":"size","c170-pop-up-player":"pop-up-player","c180-decrease-speed":"speed-minus","c190-increase-speed":"speed-plus",
"c200-default-speed":"speed","c210-normal-speed":"speed","c220-toggle-video-filters":"video-filters","c230-flip-horizontally":"flip-horizontally","c240-flip-vertically":"flip-vertically","c250-take-screenshot":"screenshot","c260-keyboard-shortcuts":"keyboard-shortcuts","c270-custom-script":"custom-script"};switch(b){case "c000-options-page":chrome.runtime.openOptionsPage();break;case "c010-theme-youtube-light":chrome.storage.local.set({theme:"default-light"});break;case "c020-theme-youtube-dark":chrome.storage.local.set({theme:"default-dark"});
break;case "c030-theme-youtube-deep-dark":chrome.storage.local.set({theme:"youtube-deep-dark"});break;case "c040-theme-youtube-deep-dark-custom":chrome.storage.local.set({theme:"youtube-deep-dark-custom"});break;case "c050-theme-custom-theme":chrome.storage.local.get({customtheme:!1},function(c){chrome.storage.local.set({customtheme:!c.customtheme})});break;default:p({message:"command",command:b,control:a[b]?a[b]:""})}});chrome.browserAction.onClicked.addListener(function(b){chrome.runtime.openOptionsPage()});
var n,g={date:Date.now(),disableautoplay:!1,popuplayersize:"640x360",theatermode:!1,theme:"default"};chrome.storage.local.get(g,function(b){g=b;n=g.date;"default"!==g.theme&&"default-light"!==g.theme&&l({theme:"dark"});g.disableautoplay&&l({autoplay:"f5=30000"});g.theatermode&&chrome.cookies.set({url:"https://www.youtube.com",name:"wide",value:"1",domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926})})})();