(function(t){function e(e){for(var i,s,r=e[0],c=e[1],u=e[2],m=0,p=[];m<r.length;m++)s=r[m],a[s]&&p.push(a[s][0]),a[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(i=!1)}i&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},a={app:0},o=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var i=n("64a9"),a=n.n(i);a.a},"06dc":function(t,e,n){"use strict";var i=n("ad6e"),a=n.n(i);a.a},"0e2a":function(t,e,n){"use strict";var i=n("d9bc"),a=n.n(i);a.a},1:function(t,e){},"18c6":function(t,e,n){},2:function(t,e){},"38eb":function(t,e,n){},"4cf8":function(t,e,n){"use strict";var i=n("897e"),a=n.n(i);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("generator")],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"generator"}},[t.generatorType?n("generator-type-selector"):t._e(),n("form",[t.generatorType?n("div",{staticClass:"settings type-settings"},[n("div",{staticClass:"display-btn",on:{click:function(e){t.displaySwitch("type")}}},[t._v("x")]),n("h2",{staticClass:"setting-name",on:{click:function(e){t.displaySwitch("type")}}},[t._v(t._s(t.generatorType)+" settings")]),"logo"===t.generatorType&&t.showTypeSettings?n("logo-settings"):t._e(),"image"===t.generatorType&&t.showTypeSettings?n("image-settings"):t._e(),"grid"===t.generatorType&&t.showTypeSettings?n("grid-settings"):t._e(),"template"===t.generatorType&&t.showTypeSettings?n("template-settings"):t._e(),t.showTypeSettings?n("button",{attrs:{id:"generate-btn",type:"button",name:"button"},on:{click:t.update}},[t._v("Generate")]):t._e()],1):t._e(),n("div",{staticClass:"settings"},[n("div",{staticClass:"display-btn",on:{click:function(e){t.displaySwitch("common")}}},[t._v("x")]),n("h2",{staticClass:"setting-name",on:{click:function(e){t.displaySwitch("common")}}},[t._v("Common settings")]),t.showCommonSettings?n("common-settings"):t._e()],1)]),n("decent-canvas",{on:{showExportSettings:t.showExportSettings}}),t.exportSettingsPopup?n("export-settings",{on:{closeExportSettings:t.hideExportSettings,save:t.save}}):t._e()],1)},r=[],c=(n("7f7f"),{beer:[[0,0,2,0,2,0,0],[0,0,0,1,0,0,0],[0,0,2,0,2,0,0],[0,0,0,1,0,0,0],[0,0,2,0,2,0,0],[0,0,0,1,0,0,0],[0,0,2,0,2,0,0],[0,2,0,1,0,2,0],[2,0,1,0,1,0,2],[0,1,0,1,0,1,0],[2,0,1,0,1,0,2],[0,1,0,1,0,1,0],[2,0,1,0,1,0,2],[0,1,0,1,0,1,0],[2,0,1,0,1,0,2],[0,1,0,1,0,1,0],[2,0,1,0,1,0,2],[0,1,0,1,0,1,0],[2,0,2,0,2,0,2]]}),u=c;function l(t){return u[t]}function m(){return p(4,4)}function p(t,e){var n=[];t=2*t-1,e=2*e-1;for(var i=0;i<e;i++){for(var a=[],o=i%2===0,s=0;s<t;s++){var r=void 0;r=o?s%2===0?1:0:s%2===0?0:1,a.push(r)}n.push(a)}return n}function d(t,e,n,i){return new Promise(function(a,o){var s=new Image;s.src=t,s.onload=function(){var t=document.createElement("canvas");t.width=this.naturalWidth,t.height=this.naturalHeight;var o=t.getContext("2d");o.drawImage(this,0,0);for(var s=[],r=0,c=0;c<this.height;c+=e){var u=[];r+=1;for(var l=0;l<this.width;l+=e){var m=e,p=e;l+e>this.width&&(m=e-(l+e-this.width)),c+p>this.height&&(p=e-(c+e-this.height));var d=o.getImageData(l,c,m,p),v=g(d);v.opacity<n?u.push(0):v.color<i?u.push(1):u.push(0)}var h=r%2===0,y=f(u,h);s.push(y)}return a(s)}})}function f(t,e){for(var n=[],i=0;i<t.length;i++)if(1===t[i]){var a=t[i]>t[i-1],o=t[i]>t[i+1],s=i%2===0;s&&e||!s&&!e?a||o?n.push(2):n.push(1):n.push(0)}else n.push(t[i]);return n}function g(t){if(t.data&&t.data.length){for(var e=t.data,n=e.length/4,i=0,a=0,o=0;o<e.length;o+=4)i+=e[o]+e[o+1]+e[o+2],a+=e[o+3];return{color:i/(3*n),opacity:a/n}}return{color:255,opacity:0}}var v={imageGrid:d,templateGrid:l,simpleGrid:p,logoGrid:m};n("7514"),n("ac6a");function h(t,e,n,i,a){var o={0:[],1:[],2:[],3:[],logo:[]};t.forEach(function(t,e){t.forEach(function(t,i){o[t].push({x:i,y:e,size:Math.random()*(2*n-n/2)+n/2})})}),e=e<=o["1"].length?e:o["1"].length;var s=0;if(a){y(o,i);while(o["1"].length)r()}else while(s<e)r();function r(){var t=Math.round(Math.random()*(o["1"].length-1)),e=o["1"][t];if(e){var n=_(o,e,i);n&&(e.pair=n,s+=1,o["3"].push(e),o["1"].splice(t,1))}}return o}function y(t,e){for(var n=0;n<5;n++){var i=Math.round(Math.random()*(t["1"].length-1)),a=t["1"][i];if(a){var o=_(t,a,e);o&&(a.pair=o,t["logo"].push(a),t["1"].splice(i,1))}}}function _(t,e,n){var i=[-1,1],a={},o=Math.round(Math.random()),s=Math.round(Math.random());"diagonal"===n?(a.x=e.x+i[o],a.y=e.y+i[s]):"vertical"===n?(a.x=e.x,a.y=e.y+i[s]):"horizontal"===n&&(a.x=e.x+i[o],a.y=e.y);var r=t.logo.find(function(t){return t.x===a.x&&t.y===a.y});return r?null:a}var b=h,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"decent-canvas"},[n("button",{attrs:{type:"button",name:"button"},on:{click:t.showExportSettings}},[t._v("Export settings")]),n("zoom"),t._l(t.projectStates,function(e,i){return"logo"===t.generatorType?n("div",{staticClass:"canvas-container"},[n("h2",[t._v(t._s(i))]),n("preview",{attrs:{project:e,name:t.generatorType+"_"+i}})],1):t._e()}),"logo"!==t.generatorType?n("preview",{staticClass:"canvas-simple",attrs:{name:t.generatorType}}):t._e()],2)},w=[],C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"preview"},[n("vue-p5",{staticClass:"canvas",on:{setup:t.setup,draw:t.draw}})],1)},S=[],$=(n("6c7b"),n("e25d")),z=n.n($),T={components:{"vue-p5":z.a},props:["project","name","exportZoom"],data:function(){return{resizeCanvas:null,canvas:null}},computed:{zoom:function(){return this.exportZoom?this.exportZoom:this.$store.getters.getZoomValue},color:function(){return this.$store.state.color},transformedData:function(){return this.$store.getters.getTransformedData},distance:function(){return this.$store.state.distance*this.zoom},radius:function(){return this.$store.state.radius},frameRate:function(){return this.$store.state.frameRate},grid:function(){return this.$store.state.grid},canvasHeight:function(){return this.grid.length?(this.grid.length-1)*this.distance+this.margin:400},canvasWidth:function(){return this.grid.length?(this.grid[0].length-1)*this.distance+this.margin:400},margin:function(){return 4*this.distance},generatorType:function(){return this.$store.state.generatorType}},watch:{grid:function(t){this.resizeCanvas&&t&&this.resizeCanvas(this.canvasWidth,this.canvasHeight)},distance:function(t){this.resizeCanvas(this.canvasWidth,this.canvasHeight)},name:function(t){this.canvas&&this.canvas.canvas&&this.canvas.canvas.setAttribute("name",t)}},methods:{setup:function(t){this.resizeCanvas=function(e,n){t.resizeCanvas(e,n)},this.canvas=t.createCanvas(this.canvasWidth,this.canvasHeight),this.canvas.canvas.setAttribute("name",this.name),t.frameRate(this.frameRate)},draw:function(t){t.background("white"),this.$store.state.loop&&"logo"!==this.generatorType&&this.$store.dispatch("transformData"),this.drawDot(t),this.drawFix(t),this.drawLogo(t),this.drawPaint(t)},drawDot:function(t){var e=this;t.fill("black"),t.strokeWeight(0),this.transformedData["1"].forEach(function(n){var i=e.getPixels(n);t.ellipse(i.x,i.y,n.size*e.zoom,n.size*e.zoom)})},drawFix:function(t){var e=this;t.fill("black"),t.strokeWeight(0),this.transformedData["2"].forEach(function(n){var i=e.getPixels(n);t.ellipse(i.x,i.y,2*e.radius*e.zoom,2*e.radius*e.zoom)})},drawPaint:function(t){var e=this;t.stroke("black");var n="number"===typeof this.project?this.radius*(this.project/4+.7)*this.zoom:2*this.radius*this.zoom;t.strokeWeight(n),this.transformedData["3"].forEach(function(n){var i=e.getPixels(n);t.line(i.x,i.y,i.x2,i.y2)})},drawLogo:function(t){var e=this;t.strokeWeight(0),t.fill(this.color),this.transformedData["logo"].forEach(function(n,i){var a=e.getPixels(n);i<=e.project?(t.fill(e.color),t.ellipse(a.x,a.y,e.radius*(e.project/4+1)*e.zoom,e.radius*(e.project/4+1)*e.zoom)):(t.stroke("black"),t.strokeWeight(e.radius*(e.project/4+.7)*e.zoom),t.line(a.x,a.y,a.x2,a.y2))})},getPixels:function(t){var e={x:t.x*this.distance+this.margin/2,y:t.y*this.distance+this.margin/2};return t.pair&&(e.x2=t.pair.x*this.distance+this.margin/2,e.y2=t.pair.y*this.distance+this.margin/2),e}}},E=T,N=(n("b399"),n("2877")),P=Object(N["a"])(E,C,S,!1,null,null,null);P.options.__file="preview.vue";var j=P.exports,k=(n("6b81"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"zoom"},[n("div",{staticClass:"zoom-in",on:{click:function(e){t.zoom("zoomIn")}}},[t._v("+")]),n("div",{staticClass:"zoom-out",on:{click:function(e){t.zoom("zoomOut")}}},[t._v("-")])])}),A=[],M={name:"zoom",methods:{zoom:function(t){this.$store.commit("updateZoomValue",t)}}},D=M,O=(n("0e2a"),Object(N["a"])(D,k,A,!1,null,null,null));O.options.__file="zoom.vue";var R=O.exports,G={name:"decentCanvas",components:{preview:j,zoom:R},computed:{generatorType:function(){return this.$store.state.generatorType},projectStates:function(){return this.$store.getters.getProjectStates}},methods:{showExportSettings:function(){this.$emit("showExportSettings")}},watch:{generatorType:function(t){this.$store.dispatch("generateGrid")}}},L=G,I=(n("06dc"),Object(N["a"])(L,x,w,!1,null,"7236e4d4",null));I.options.__file="decentCanvas.vue";var U=I.exports,F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting common-settings"},[n("div",{staticClass:"section"},[n("div",{staticClass:"input color-input"},[n("label",[t._v("Select color")]),n("div",{staticClass:"color-picker"},[n("div",{staticClass:"selected-color",style:{backgroundColor:t.selectedColor},on:{click:t.selectColor}}),t.select?n("color-palette",{on:{closePalette:t.close}}):t._e()],1)]),n("div",{staticClass:"input"},[n("label",{attrs:{for:"distance"}},[t._v("Distance")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.distance,expression:"distance",modifiers:{number:!0}}],attrs:{type:"number",name:"distance"},domProps:{value:t.distance},on:{input:function(e){e.target.composing||(t.distance=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",{staticClass:"input"},[n("label",{attrs:{for:"radius"}},[t._v("Average point radius")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.radius,expression:"radius",modifiers:{number:!0}}],attrs:{type:"number",name:"radius"},domProps:{value:t.radius},on:{input:function(e){e.target.composing||(t.radius=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",{staticClass:"input"},[n("label",{attrs:{for:"paintnum"}},[t._v("Number of paints")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.paintNum,expression:"paintNum",modifiers:{number:!0}}],attrs:{type:"number",name:"paintnum"},domProps:{value:t.paintNum},on:{input:function(e){e.target.composing||(t.paintNum=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",{staticClass:"input"},[n("label",{attrs:{for:"direction"}},[t._v("Direction")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.direction,expression:"direction"}],attrs:{name:"direction"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.direction=e.target.multiple?n:n[0]}}},[n("option",{domProps:{value:"diagonal"}},[t._v("diagonal")]),n("option",{domProps:{value:"horizontal"}},[t._v("horizontal")]),n("option",{domProps:{value:"vertical"}},[t._v("vertical")])])]),n("div",{staticClass:"input"},[n("label",[t._v("Animation")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.loop,expression:"loop"}],attrs:{type:"checkbox",id:"loop"},domProps:{checked:Array.isArray(t.loop)?t._i(t.loop,null)>-1:t.loop},on:{change:function(e){var n=t.loop,i=e.target,a=!!i.checked;if(Array.isArray(n)){var o=null,s=t._i(n,o);i.checked?s<0&&(t.loop=n.concat([o])):s>-1&&(t.loop=n.slice(0,s).concat(n.slice(s+1)))}else t.loop=a}}})])])])},W=[],V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"color-palette"},t._l(t.palette,function(e){return n("div",{staticClass:"color-elem",style:{backgroundColor:e},on:{click:function(n){t.selectColor(e)}}})}))},Z=[],B=(n("c345"),n("468d")),H=n.n(B),J={name:"colorPicker",components:{Swatches:H.a},data:function(){return{palette:["#233ec4","#8823c4","#c4239e","#000000","#ffffff","#fc5316","#16a09c"]}},computed:{color:{get:function(){return this.$store.state.color},set:function(t){this.$store.commit("updateColor",t)}}},methods:{selectColor:function(t){this.color=t,this.$emit("closePalette")}}},X=J,Y=(n("9c22"),Object(N["a"])(X,V,Z,!1,null,"adf2097a",null));Y.options.__file="colorPicker.vue";var q=Y.exports,K={name:"commonSettings",components:{colorPalette:q},data:function(){return{select:!1}},methods:{selectColor:function(){this.select=!this.select},close:function(){this.select=!1}},computed:{selectedColor:function(){return this.$store.state.color},loop:{set:function(t){this.$store.commit("updateLoop",t)},get:function(){return this.$store.state.loop}},distance:{set:function(t){t>=1&&this.$store.commit("updateDistance",t)},get:function(){return this.$store.state.distance}},radius:{set:function(t){t>0&&(this.$store.commit("updateRadius",t),this.$store.dispatch("transformData"))},get:function(){return this.$store.state.radius}},paintNum:{set:function(t){t>=0&&(this.$store.commit("updatePaintNum",t),this.$store.dispatch("transformData"))},get:function(){return this.$store.state.paintNum}},direction:{set:function(t){this.$store.commit("updateDirection",t),this.$store.dispatch("transformData")},get:function(){return this.$store.state.direction}}}},Q=K,tt=(n("7ca0"),Object(N["a"])(Q,F,W,!1,null,null,null));tt.options.__file="commonSettings.vue";var et=tt.exports,nt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"generator-type-selector"},[n("label",{class:"logo"===t.generatorType?"selected":"",attrs:{for:"template"},on:{click:function(e){t.select("logo")}}},[t._v("LOGO")]),n("label",{class:"grid"===t.generatorType?"selected":"",attrs:{for:"grid"},on:{click:function(e){t.select("grid")}}},[t._v("GRID")]),n("label",{class:"image"===t.generatorType?"selected":"",attrs:{for:"image"},on:{click:function(e){t.select("image")}}},[t._v("IMAGE")]),n("label",{class:"template"===t.generatorType?"selected":"",attrs:{for:"template"},on:{click:function(e){t.select("template")}}},[t._v("TEMPLATE")])])},it=[],at={name:"generatorTypeSelector",computed:{generatorType:{get:function(){return this.$store.state.generatorType},set:function(t){this.$store.commit("updateGeneratorType",t)}}},methods:{select:function(t){this.generatorType=t}}},ot=at,st=(n("b49f"),Object(N["a"])(ot,nt,it,!1,null,null,null));st.options.__file="gridTypeSelector.vue";var rt=st.exports,ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting image-settings"},[n("div",{staticClass:"section"},[n("div",{staticClass:"input"},[n("label",{staticClass:"file",attrs:{for:"file"}},[t._v("Choose image")]),n("input",{attrs:{name:"file",type:"file",accept:"image/png, image/jpeg"},on:{change:t.imageChange}})]),n("div",{staticClass:"input"},[n("label",{attrs:{for:""}},[t._v("Image sample")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.imageRes,expression:"imageRes",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.imageRes},on:{input:function(e){e.target.composing||(t.imageRes=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",{staticClass:"input"},[n("label",[t._v("Opacity")]),n("vue-slider",{ref:"slider",staticClass:"slider",attrs:{"tooltip-dir":"bottom",tooltip:"hover",min:0,max:255},model:{value:t.opacity,callback:function(e){t.opacity=e},expression:"opacity"}})],1),n("div",{staticClass:"input"},[n("label",[t._v("Lightness")]),n("vue-slider",{ref:"slider",staticClass:"slider",attrs:{"tooltip-dir":"bottom",tooltip:"hover",min:0,max:255},model:{value:t.lightness,callback:function(e){t.lightness=e},expression:"lightness"}})],1)])])},ut=[],lt=n("6f79"),mt=n.n(lt),pt={name:"imageSettings",components:{vueSlider:mt.a},computed:{imageUrl:{set:function(t){this.$store.commit("updateImageUrl",t)},get:function(){return this.$store.state.imageUrl}},imageRes:{set:function(t){this.$store.commit("updateImageRes",t)},get:function(){return this.$store.state.imageRes}},opacity:{set:function(t){this.$store.commit("updateOpacityLimit",t)},get:function(){return this.$store.state.opacityLimit}},lightness:{set:function(t){this.$store.commit("updateLightnessLimit",t)},get:function(){return this.$store.state.lightnessLimit}}},methods:{imageChange:function(t){var e=this,n=t.target.files[0],i=new FileReader;i.addEventListener("load",function(){e.imageUrl=i.result},!1),n&&i.readAsDataURL(n)}}},dt=pt,ft=(n("62da"),Object(N["a"])(dt,ct,ut,!1,null,null,null));ft.options.__file="imageSettings.vue";var gt=ft.exports,vt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting grid-settings"},[n("div",{staticClass:"section"},[n("div",{staticClass:"input"},[n("label",[t._v("Number of X segments")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.xSize,expression:"xSize",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.xSize},on:{input:function(e){e.target.composing||(t.xSize=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),n("div",{staticClass:"input"},[n("label",[t._v("Number of Y segments")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.ySize,expression:"ySize",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.ySize},on:{input:function(e){e.target.composing||(t.ySize=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})])])])},ht=[],yt={name:"gridSettings",computed:{xSize:{set:function(t){this.$store.commit("updateGridSize",{x:t})},get:function(){return this.$store.state.gridSize.x}},ySize:{set:function(t){this.$store.commit("updateGridSize",{y:t})},get:function(){return this.$store.state.gridSize.y}}}},_t=yt,bt=Object(N["a"])(_t,vt,ht,!1,null,null,null);bt.options.__file="gridSettings.vue";var xt=bt.exports,wt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting template-settings"},[n("div",{staticClass:"section"},[n("div",{staticClass:"input"},[n("label",[t._v("Choose template")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.templateName,expression:"templateName"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.templateName=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"beer"}},[t._v("beer")])])])])])},Ct=[],St={name:"template-settings",computed:{templateName:{set:function(t){this.$store.commit("updateTemplateName",t)},get:function(){return this.$store.state.templateName}}}},$t=St,zt=(n("698f"),Object(N["a"])($t,wt,Ct,!1,null,null,null));zt.options.__file="templateSettings.vue";var Tt=zt.exports,Et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting animation-settings"},[n("div",{staticClass:"section"},[n("div",{staticClass:"input"},[n("label",{attrs:{for:"loop"}},[t._v("loop")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.loop,expression:"loop"}],attrs:{type:"checkbox",id:"loop"},domProps:{checked:Array.isArray(t.loop)?t._i(t.loop,null)>-1:t.loop},on:{change:function(e){var n=t.loop,i=e.target,a=!!i.checked;if(Array.isArray(n)){var o=null,s=t._i(n,o);i.checked?s<0&&(t.loop=n.concat([o])):s>-1&&(t.loop=n.slice(0,s).concat(n.slice(s+1)))}else t.loop=a}}})]),t.loop?n("div",{staticClass:"input"},[n("label",[t._v("animation mode")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.animationMode,expression:"animationMode"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.animationMode=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"basic"}},[t._v("basic")]),n("option",{attrs:{value:"increment"}},[t._v("increment")]),n("option",{attrs:{value:"decrement"}},[t._v("decrement")])])]):t._e()])])},Nt=[],Pt={name:"animation-settings",mounted:function(){this.$store.commit("updateAnimationMode","basic")},computed:{loop:{set:function(t){this.$store.commit("updateLoop",t)},get:function(){return this.$store.state.loop}},animationMode:{set:function(t){this.$store.commit("updateAnimationMode",t)},get:function(){return this.$store.state.animationMode}}}},jt=Pt,kt=Object(N["a"])(jt,Et,Nt,!1,null,null,null);kt.options.__file="animationSettings.vue";var At=kt.exports,Mt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Dt=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logo-settings"},[n("div",{staticClass:"section"})])}],Ot={name:"logoSettings",data:function(){return{}},methods:{},computed:{}},Rt=Ot,Gt=(n("9396"),Object(N["a"])(Rt,Mt,Dt,!1,null,"2f13db0c",null));Gt.options.__file="logoSettings.vue";var Lt=Gt.exports,It=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"export-settings"},[n("div",{staticClass:"popup"},[n("div",{staticClass:"close",on:{click:t.close}},[t._v("x")]),n("h2",[t._v("Export: "+t._s(t.generatorType))]),n("form",{attrs:{action:"index.html",method:"post"}},[n("div",{staticClass:"row"},[n("h4",[t._v("Project name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.projectName,expression:"projectName"}],attrs:{type:"text",name:"file-name"},domProps:{value:t.projectName},on:{input:function(e){e.target.composing||(t.projectName=e.target.value)}}})]),n("div",{staticClass:"row"},[n("h4",[t._v("Export as")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.fileFormat,expression:"fileFormat"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.fileFormat=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"png"}},[t._v("png")]),n("option",{attrs:{value:"jpg"}},[t._v("jpg")]),n("option",{attrs:{value:"gif"}},[t._v("gif")])])]),t._m(0),n("div",{staticClass:"row"},t._l(t.constSizes,function(e,i){return n("div",{staticClass:"input"},[n("label",[t._v(t._s(i))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.sizes[i],expression:"sizes[key]"}],attrs:{type:"checkbox",name:i},domProps:{checked:Array.isArray(t.sizes[i])?t._i(t.sizes[i],null)>-1:t.sizes[i]},on:{change:function(e){var n=t.sizes[i],a=e.target,o=!!a.checked;if(Array.isArray(n)){var s=null,r=t._i(n,s);a.checked?r<0&&t.$set(t.sizes,i,n.concat([s])):r>-1&&t.$set(t.sizes,i,n.slice(0,r).concat(n.slice(r+1)))}else t.$set(t.sizes,i,o)}}})])})),t.useCustom?n("div",{staticClass:"row"},[n("h4",[t._v("Custom size")]),n("span",[t._v("Width")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.custom.w,expression:"custom.w"}],attrs:{type:"number",name:"custom-w"},domProps:{value:t.custom.w},on:{input:function(e){e.target.composing||t.$set(t.custom,"w",e.target.value)}}}),n("span",[t._v("Height")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.custom.h,expression:"custom.h"}],attrs:{type:"number",name:"custom-h"},domProps:{value:t.custom.h},on:{input:function(e){e.target.composing||t.$set(t.custom,"h",e.target.value)}}})]):t._e()]),n("button",{attrs:{type:"button",name:"button"},on:{click:t.save}},[t._v("Export")]),n("button",{attrs:{type:"button",name:"button"},on:{click:t.close}},[t._v("Cancel")])])])},Ut=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("h4",[t._v("Export sizes")])])}],Ft=(n("456d"),{archived:0,concept:1,prototype:2,published:3,spinoff:4}),Wt={LOGO:"logo",GRID:"grid",IMAGE:"image",TEMPLATE:"template"},Vt={HORIZONTAL:"horizontal",VERTICAL:"vertical",DIAGONAL:"diagonal"},Zt={BEER:"beer"},Bt={INCREMENT:"increment",DECREMENT:"decrement",BASIC:"basic"},Ht={thumbnail:300,medium:1e3,large:2e3},Jt={name:"export-settings",created:function(){var t=this;Object.keys(this.constSizes).forEach(function(e){t.sizes[e]=!0})},data:function(){return{constSizes:Ht,sizes:{},useCustom:!1,custom:{w:1280,h:720}}},computed:{fileFormat:{get:function(){return this.$store.state.fileFormat},set:function(t){this.$store.commit("updateFileFormat",t)}},projectName:{get:function(){return this.$store.state.projectName},set:function(t){this.$store.commit("updateProjectName",t)}},generatorType:function(){return this.$store.state.generatorType}},methods:{save:function(){this.$emit("save",{exportSizes:this.sizes})},close:function(){this.$emit("closeExportSettings")}}},Xt=Jt,Yt=(n("e973"),Object(N["a"])(Xt,It,Ut,!1,null,"a8c5d08a",null));Yt.options.__file="exportSettings.vue";var qt=Yt.exports,Kt=n("be94"),Qt=(n("5df3"),n("7c39")),te=n.n(Qt),ee=n("21a6"),ne=n.n(ee),ie=n("2f62");i["a"].use(ie["a"]);var ae=new ie["a"].Store({state:{generatorType:Wt.GRID,templateName:Zt.BEER,gridSize:{x:4,y:4},imageUrl:null,imageRes:2,distance:20,direction:Vt.DIAGONAL,radius:8,grid:[],transformedData:null,loop:!1,paintNum:5,animationMode:Bt.BASIC,animationMax:100,animationMin:0,animationPaint:0,frameRate:3,opacityLimit:150,lightnessLimit:220,color:"#000000",zoomValue:2,projectName:"Decent",fileFormat:"png"},getters:{getGeneratorType:function(t){return t.generatorType},getTransformedData:function(t){return t.transformedData},getProjectStates:function(){return Ft},getZoomValue:function(t){return t.zoomValue}},mutations:{updateProjectName:function(t,e){t.projectName=e},updateFileFormat:function(t,e){t.fileFormat=e},updateZoomValue:function(t,e){t.zoomValue="zoomIn"===e?1.5*t.zoomValue:.75*t.zoomValue},updateColor:function(t,e){t.color=e},updateAnimationPaint:function(t,e){e===Bt.BASIC&&(t.animationPaint=t.paintNum),e===Bt.INCREMENT&&(t.animationPaint+=10),e===Bt.DECREMENT&&(t.animationPaint-=10)},updateAnimationMode:function(t,e){t.animationMode=e,"basic"===t.animationMode?t.animationPaint=t.paintNum:"increment"===t.animationMode?t.animationPaint=0===t.animationMin?0:t.animationMin/100*(t.transformedData["1"].length-1):"decrement"===t.animationMode&&(t.animationPaint=0===t.animationMax?0:t.animationMax/100*(t.transformedData["1"].length-1))},updateGeneratorType:function(t,e){t.generatorType!==e&&(t.generatorType=e)},updateLoop:function(t,e){t.loop=e},updateTemplateName:function(t,e){t.templateName=e},updateImageUrl:function(t,e){t.imageUrl=e},updateLightnessLimit:function(t,e){t.lightnessLimit=e},updateOpacityLimit:function(t,e){t.opacityLimit=e},updateGridSize:function(t,e){e.x&&(t.gridSize.x=e.x),e.y&&(t.gridSize.y=e.y)},updateImageRes:function(t,e){t.imageRes=e},updateDistance:function(t,e){t.distance=e},updateDirection:function(t,e){t.direction=e},updateRadius:function(t,e){t.radius=e},updatePaintNum:function(t,e){t.paintNum=e},updateGrid:function(t,e){t.grid=e},updateTransformedData:function(t,e){t.transformedData=e}},actions:{generateGrid:function(t){console.log("GENERATE");var e=t.state.generatorType;if("image"===e)t.commit("updateGrid",[]),t.dispatch("transformData"),v.imageGrid(t.state.imageUrl,t.state.imageRes,t.state.opacityLimit,t.state.lightnessLimit).then(function(e){t.commit("updateGrid",e),t.dispatch("transformData")});else{var n=[];"grid"===e?n=v.simpleGrid(t.state.gridSize.x,t.state.gridSize.y):"template"===e?n=v.templateGrid(t.state.templateName):"logo"===e&&(n=v.logoGrid()),t.commit("updateGrid",n),t.dispatch("transformData")}},transformData:function(t){console.log("TRANSFORM"),t.commit("updateAnimationPaint",t.state.animationMode);var e=b(t.state.grid,t.state.animationPaint,t.state.radius,t.state.direction,"logo"===t.state.generatorType);t.commit("updateTransformedData",e)}}});function oe(t){var e=[],n=[],i=new te.a,a=i.folder(ae.state.projectName),o=se(),s=Object.keys(Ht).filter(function(e){return t.exportSizes[e]}).map(function(t){return Ht[t]});o.forEach(function(t,n){var i=t.getAttribute("name"),a=t.width/t.height;e.push(new Promise(function(e,n){t.toBlob(function(t){var n=URL.createObjectURL(t);e({url:n,canvasName:i,aspect:a})})}))}),Promise.all(e).then(function(t){t.forEach(function(t,e){s.forEach(function(e){n.push(new Promise(function(n,i){var a=new Image;a.src=t.url;var o=Math.round(e*t.aspect),s=e,r=document.createElement("canvas");r.width=o,r.height=s;var c=r.getContext("2d");a.onload=function(){c.drawImage(this,0,0,o,s),r.toBlob(function(e){n({name:"".concat(t.canvasName,"/").concat(t.canvasName,"_").concat(o,"x").concat(s),data:e})})}}))})}),Promise.all(n).then(function(t){var e=ae.state.fileFormat;t.forEach(function(t){a.file("".concat(t.name,".").concat(e),t.data)}),i.generateAsync({type:"blob"}).then(function(t){ne()(t,"decent_generator.zip")})})})}function se(){var t=ae.state.generatorType,e=[],n="logo"===t?Ft:{generatorType:t};return Object.keys(n).forEach(function(i){var o=a("".concat(t,"_").concat(i),n[i]);e.push(o.canvas.canvas),o.$destroy()}),e;function a(t,e){return new i["a"](Object(Kt["a"])({},j,{propsData:{exportZoom:10,name:t,project:e},store:ae})).$mount()}}var re=oe,ce={name:"generator",components:{commonSettings:et,decentCanvas:U,generatorTypeSelector:rt,gridSettings:xt,imageSettings:gt,templateSettings:Tt,animationSettings:At,logoSettings:Lt,exportSettings:qt},mounted:function(){this.$store.dispatch("generateGrid")},data:function(){return{showCommonSettings:!1,showAnimSettings:!1,showTypeSettings:!1,exportSettingsPopup:!1}},computed:{generatorType:function(){return this.$store.getters.getGeneratorType}},methods:{save:function(t){re(t),this.hideExportSettings()},hideExportSettings:function(){this.exportSettingsPopup=!1},showExportSettings:function(){this.exportSettingsPopup=!0},update:function(){this.$store.dispatch("generateGrid")},displaySwitch:function(t){"type"===t?this.showTypeSettings=!this.showTypeSettings:"animation"===t?this.showAnimSettings=!this.showAnimSettings:"common"===t&&(this.showCommonSettings=!this.showCommonSettings)}}},ue=ce,le=(n("4cf8"),Object(N["a"])(ue,s,r,!1,null,null,null));le.options.__file="generator.vue";var me=le.exports,pe={name:"app",components:{generator:me}},de=pe,fe=(n("034f"),Object(N["a"])(de,a,o,!1,null,null,null));fe.options.__file="App.vue";var ge=fe.exports;i["a"].config.productionTip=!1,new i["a"]({store:ae,render:function(t){return t(ge)}}).$mount("#app")},5998:function(t,e,n){},"62da":function(t,e,n){"use strict";var i=n("18c6"),a=n.n(i);a.a},"64a9":function(t,e,n){},"698f":function(t,e,n){"use strict";var i=n("c98e"),a=n.n(i);a.a},7548:function(t,e,n){},"7ca0":function(t,e,n){"use strict";var i=n("9fd4"),a=n.n(i);a.a},"86ed":function(t,e,n){},"897e":function(t,e,n){},9396:function(t,e,n){"use strict";var i=n("7548"),a=n.n(i);a.a},"9c22":function(t,e,n){"use strict";var i=n("f12f"),a=n.n(i);a.a},"9fd4":function(t,e,n){},ad6e:function(t,e,n){},b399:function(t,e,n){"use strict";var i=n("5998"),a=n.n(i);a.a},b49f:function(t,e,n){"use strict";var i=n("86ed"),a=n.n(i);a.a},c98e:function(t,e,n){},d9bc:function(t,e,n){},e973:function(t,e,n){"use strict";var i=n("38eb"),a=n.n(i);a.a},f12f:function(t,e,n){}});
//# sourceMappingURL=app.158d6575.js.map