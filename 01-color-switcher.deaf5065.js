const t=document.body,e=t.querySelector("[data-start]"),a=t.querySelector("[data-stop]");let n=null;e.addEventListener("click",(function(){e.disabled=!0,n=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),a.addEventListener("click",(function(){clearInterval(n),e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.deaf5065.js.map
