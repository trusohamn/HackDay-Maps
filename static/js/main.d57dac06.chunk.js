(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(e,t,a){e.exports=a(128)},126:function(e,t,a){},128:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(85),c=a.n(o),i=a(86),l=a(87),u=a(100),s=a(88),m=a(103),d=a(26),p=r.a.createContext({});var f=function(e){var t=Object(n.useState)(null),a=Object(d.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)("explore"),l=Object(d.a)(i,2),u=l[0],s=l[1],m=Object(n.useState)(null),f=Object(d.a)(m,2),h=f[0],b=f[1],E=Object(n.useState)(17.86208324183244),v=Object(d.a)(E,2),O=v[0],j=v[1],w=Object(n.useState)(59.30184823106963),x=Object(d.a)(w,2),y=x[0],g=x[1],I={pointId:o,setPointId:c,getPointIdData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return h.find(function(t){return t._id==e})},mode:u,setMode:s,switchMode:function(){s("explore"===u?"edit":"explore")},data:h,setData:b,lon:O,setLon:j,lat:y,setLat:g};return r.a.createElement(p.Provider,{value:I},e.children)},h=a(65),b=a(66),E={url:{API_URL:"https://db-truso-map-space.herokuapp.com"},app_id:{FACEBOOK_APPID:"383464965621720"}},v={isAuthenticated:!0,user:"5d2cd2dd1a88bd3129ed41cd",picture:"https://graph.facebook.com/10219128370309728/picture?type=large",jwToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMmNkMmRkMWE4OGJkMzEyOWVkNDFjZCIsImlhdCI6MTU2MzY1NjM5MiwiZXhwIjoxNTYzNjYzNTkyfQ.oS_qwR9qmT183NoKemPAuWRCSiK1tIgapdwdKkFupv4"},O=r.a.createContext({});var j=function(e){var t=Object(n.useState)(!!Object({NODE_ENV:"production",PUBLIC_URL:"/HackDay-Maps"}).REACT_APP_LOGEDIN),a=Object(d.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(Object({NODE_ENV:"production",PUBLIC_URL:"/HackDay-Maps"}).REACT_APP_LOGEDIN?v.user:null),l=Object(d.a)(i,2),u=l[0],s=l[1],m=Object(n.useState)(Object({NODE_ENV:"production",PUBLIC_URL:"/HackDay-Maps"}).REACT_APP_LOGEDIN?v.picture:null),p=Object(d.a)(m,2),f=p[0],h=p[1],b=Object(n.useState)(Object({NODE_ENV:"production",PUBLIC_URL:"/HackDay-Maps"}).REACT_APP_LOGEDIN?v.jwToken:null),E=Object(d.a)(b,2),j={isAuthenticated:o,setIsAuthenticated:c,user:u,setUser:s,jwToken:E[0],setJwToken:E[1],picture:f,setPicture:h};return r.a.createElement(O.Provider,{value:j},e.children)};var w=function(e){Object(n.useContext)(p);var t=Object(n.useContext)(O),a=function(){return e.inputs.reduce(function(e,t){return e[t.name]=t.default||"",e},{})},o=Object(n.useState)(a()),c=Object(d.a)(o,2),i=c[0],l=c[1],u=function(e){l(Object(b.a)({},i,Object(h.a)({},e.target.id,e.target.value)))};return r.a.createElement("div",null,r.a.createElement("form",{className:"container",onSubmit:function(n){n.preventDefault();var r=new URLSearchParams;for(var o in i)console.log(o,i[o]),r.append(o,i[o]);for(var c in e.additionalInputs)console.log(c,e.additionalInputs[c]),r.append(c,e.additionalInputs[c]);fetch(E.url.API_URL+e.apiPath,{method:"POST",credentials:"include",headers:{Authorization:"Bearer "+t.jwToken,"Content-Type":"application/x-www-form-urlencoded"},body:r}).then(function(t){l(a()),e.onSucessPost&&e.onSucessPost(t)})}},r.a.createElement("div",{className:"flexcontainer"},r.a.createElement("h3",null,e.formTitle)),r.a.createElement("div",{className:"row"},e.inputs.map(function(e){return r.a.createElement("div",{className:"col-sm",key:e.name},r.a.createElement("label",{htmlFor:e.name},e.label),e.selectType?r.a.createElement("select",{className:"form-control input-sm",id:e.name,name:e.name,value:i[e.name],onChange:u},e.options.map(function(e){return r.a.createElement("option",{key:e},e)})):r.a.createElement("input",{required:e.required,className:"form-control input-sm",placeholder:e.placeholder,type:e.type,name:e.name,id:e.name,value:i[e.name],onChange:u}))})),r.a.createElement("div",{className:"flexcontainer"},r.a.createElement("button",{type:"submit",className:"btn btn-dark btn-bg"},e.buttonTitle))))};var x=function(e){var t=Object(n.useContext)(p),a={lon:t.lon,lat:t.lat};return"explore"===t.mode?null:r.a.createElement(w,{onSucessPost:function(){return t.setData(null)},apiPath:"/api/points",formTitle:"Add new location",additionalInputs:a,inputs:[{name:"name",label:"Name:",required:!0,placeholder:"place name",type:"text"},{name:"description",label:"Description:",required:!1,placeholder:"place decription",type:"text"},{name:"type",label:"Select type:",selectType:!0,options:["camping","bonfire","view"],default:"camping"}],buttonTitle:"Add to the map"})},y=a(89);var g=function(e){return r.a.createElement(y.BallSpinner,{size:e.size,color:"#686769",loading:e.loading})},I=a(92),P=a.n(I),k=a(93),C=a.n(k),N=a(94),A=a.n(N),S=a(14),T=(a(123),a(134)),_=a(99),L=a(104),D=a(98),R=a(133),U=a(135),M=a(78),z=a(62),B=a(136),F=a(82),J=E.url.API_URL,V={camping:P.a,bonfire:C.a,view:A.a},q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(s.a)(t).call(this,e))).map=null,a.center=function(){a.map.getView().setCenter(Object(S.d)(a.context.getPointIdData().localisation)),a.map.getView().setZoom(13)},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new R.a({source:new U.a({features:[]})}),a=new R.a({source:new U.a({features:[]})});this.map=new T.a({target:this.refs.mapContainer,layers:[new L.a({source:new D.a}),t,a],view:new _.a({center:Object(S.d)([this.context.lon,this.context.lat]),zoom:6})});this.map.on("click",function(t){if("explore"===e.context.mode){var a=null;e.map.forEachFeatureAtPixel(t.pixel,function(e){a=e.get("id")||null});var n=null===a?"/location/":"/location/"+a;e.props.history.push(n)}else if("edit"===e.context.mode){var r=Object(S.h)(t.coordinate);e.context.setLon(r[0]),e.context.setLat(r[1]);var o=[],c=t.coordinate,i=new M.a({geometry:new z.a(c)});o.push(i),e.state.extraLayer.setSource(new U.a({features:o}))}}),this.setState({extraLayer:t,featuresLayer:a})}},{key:"componentDidUpdate",value:function(){var e=this;(null===this.context.data||this.state.featuresLayer.values_.source.isEmpty())&&fetch(J+"/api/points").then(function(e){return e.json()}).then(function(t){var a=[];t.forEach(function(e){var t=new B.a({opacity:1,scale:.05,src:V[e.type]}),n=new F.b({image:t}),r=Object(S.d)(e.localisation),o=new M.a({id:e._id,geometry:new z.a(r),name:e.name,description:e.description,rating:e.rating});o.setStyle(n),a.push(o)}),e.state.featuresLayer.setSource(new U.a({features:a})),e.context.setData(t)}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(g,{size:100,loading:!this.context.data}),r.a.createElement("div",{ref:"mapContainer",id:"mapContainer"}),this.context.pointId&&"edit"!==this.context.mode?r.a.createElement("button",{onClick:this.center},"center on location"):"",r.a.createElement(x,null))}}]),t}(r.a.Component);q.contextType=p;var G=q,Y=a(79),H=a(67);function K(){var e=Object(Y.a)(["\n  border-radius: 100%;\n  height: 1.5em;\n"]);return K=function(){return e},e}function Z(){var e=Object(Y.a)(["\n  border-radius: 100%;\n  height: 3.5em;\n  margin: 0em 0.5em 0em 3em;\n"]);return Z=function(){return e},e}var W=H.default.img(Z()),X=H.default.img(K());var $=function(e){var t=Object(n.useContext)(O);return r.a.createElement("div",{className:"ReviewCard flexcontainercolumn"},r.a.createElement("br",null),r.a.createElement("h5",null,e.e.title),r.a.createElement("p",null," ",e.e.description," "),r.a.createElement("h5",null,"rated: ",e.e.rating),t.isAuthenticated?r.a.createElement(X,{src:e.e.profilePicture,alt:"Profile"}):"")},Q=E.url.API_URL;var ee=function(e){var t=Object(n.useContext)(p),a=Object(n.useContext)(O),o=Object(n.useState)(""),c=Object(d.a)(o,2),i=c[0],l=c[1],u=Object(n.useState)(null),s=Object(d.a)(u,2),m=s[0],f=s[1];Object(n.useEffect)(function(){if(l(""),t.data){var e=t.data.find(function(e){return e._id===t.pointId});f(e)}},[t.data,t.pointId]);var h=function(){fetch(Q+"/api/points/"+t.pointId).then(function(e){return e.json()}).then(function(e){var t=e.map(function(e,t){return r.a.createElement($,{e:e,key:t})});l(t)})};return m&&"edit"!==t.mode?r.a.createElement("div",{className:"flexcontainercolumn"},r.a.createElement("h1",null,m.name),r.a.createElement("p",null,m.description),r.a.createElement("h5",null,"rating: ",m.rating),a.isAuthenticated?r.a.createElement("p",null,"created by: ",r.a.createElement(X,{src:m.profilePicture,alt:"Profile"})):"",r.a.createElement("button",{type:"click",onClick:h,className:"btn btn-dark btn-sm"},"Show reviews"),i,a.isAuthenticated?r.a.createElement("form",{className:"container",onSubmit:function(e){e.preventDefault();var n=new URLSearchParams,r=!0,o=!1,c=void 0;try{for(var i,l=new FormData(e.target)[Symbol.iterator]();!(r=(i=l.next()).done);r=!0){var u=i.value;n.append(u[0],u[1])}}catch(s){o=!0,c=s}finally{try{r||null==l.return||l.return()}finally{if(o)throw c}}fetch(Q+"/api/points/"+t.pointId,{method:"POST",headers:{Authorization:"Bearer "+a.jwToken,"Content-Type":"application/x-www-form-urlencoded"},body:n,withCredentials:!0,credentials:"include"}).then(function(e){return e.json()}).then(function(e){f(Object(b.a)({},m,{rating:e.newRating})),h()})}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm"},r.a.createElement("label",{htmlFor:"title"},"Title:"),r.a.createElement("input",{className:"form-control input-sm",placeholder:"title",required:!0,name:"title",id:"title"})),r.a.createElement("div",{className:"col-sm"},r.a.createElement("label",{htmlFor:"description"},"Description:"),r.a.createElement("input",{className:"form-control input-sm",placeholder:"description",name:"description",id:"description"})),r.a.createElement("div",{className:"col-sm"},r.a.createElement("label",{htmlFor:"rating"},"Rating:"),r.a.createElement("input",{className:"form-control input-sm",placeholder:"1-10",required:!0,min:"1",max:"10",name:"rating",id:"rating",type:"number"}))),r.a.createElement("div",{className:"flexcontainer"},r.a.createElement("button",{type:"submit",className:" btn btn-dark btn-bg"},"Review"))):""):""};var te=function(e){var t=Object(n.useContext)(p),a=Object(n.useContext)(O);return Object(n.useEffect)(function(){var a=e.location.pathname.match(/[^\/]+$/)?e.location.pathname.match(/[^\/]+$/)[0]:null;t.pointId!==a&&"location"!==a&&t.setPointId(a)},[e.location.pathname]),r.a.createElement("div",null,r.a.createElement(G,{history:e.history}),t.pointId&&"edit"!==t.mode?r.a.createElement("button",{onClick:function(){var e=new URLSearchParams;e.append("locationId",t.pointId),fetch(E.url.API_URL+"/api/profiles/favourites",{method:"POST",headers:{Authorization:"Bearer "+a.jwToken,"Content-Type":"application/x-www-form-urlencoded"},body:e}).then(function(e){console.log(e)})}},"add to favourites"):"",r.a.createElement(ee,null))},ae=a(50);var ne=function(){var e=Object(n.useContext)(p),t=Object(n.useContext)(O),a="explore"===e.mode?"Edit map":"Explore";return r.a.createElement("div",{className:"App"},t.isAuthenticated?r.a.createElement("button",{id:"switch modes",onClick:e.switchMode},a):null,e.redirect,r.a.createElement(ae.b,{path:"/",component:te}))},re=a(49),oe=E.url.API_URL;var ce=function(e){var t=Object(n.useContext)(O),a=Object(n.useContext)(p),o=Object(n.useState)(null),c=Object(d.a)(o,2),i=c[0],l=c[1];return t.isAuthenticated||e.history.push("/"),Object(n.useEffect)(function(){fetch(oe+"/api/profiles",{method:"GET",credentials:"include",headers:{Authorization:"Bearer "+t.jwToken}}).then(function(e){return e.json()}).then(function(e){l(e)})},[]),r.a.createElement("div",{className:"Profile"},i?r.a.createElement("div",{className:"flexcontainercolumn"},r.a.createElement("h2",null,i.user.name),r.a.createElement("h4",null,"Your locations:"),i.locations.map(function(e){return r.a.createElement(re.b,{to:"/location/"+e._id,key:e.name},e.name)}),r.a.createElement("h4",null,"Your favourites:"),i.user.favourites.map(function(e){return r.a.createElement(re.b,{to:"/location/"+e,key:e.name},a.getPointIdData(e).name)})):r.a.createElement(g,{size:80,loading:!0}))},ie=a(97),le=a.n(ie),ue=E.url.API_URL;var se=function(){var e=Object(n.useContext)(O),t=Object(n.useContext)(p),a=e.picture?r.a.createElement(W,{src:e.picture,alt:"Profile"}):"Profile";return r.a.createElement(re.a,{basename:"/HackDay-Maps"},r.a.createElement("nav",{className:"navbar navbar-dark bg-dark"},r.a.createElement(re.b,{to:"/location"},r.a.createElement("h1",{className:"text-light"},"Your Map Space")),e.isAuthenticated?r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){e.setIsAuthenticated(!1),e.setUser(null),e.setJwToken(null),t.setMode("explore")},className:"button"},"Log out"),r.a.createElement(re.b,{to:"/profile"},a)):r.a.createElement(le.a,{appId:E.app_id.FACEBOOK_APPID,autoLoad:!0,fields:"name,email,picture",callback:function(t){var a={method:"POST",body:"access_token=".concat(t.accessToken),headers:{"Content-Type":"application/x-www-form-urlencoded"},mode:"cors",cache:"default"};fetch(ue+"/api/auth/facebook",a).then(function(t){var a=t.headers.get("x-auth-token");t.json().then(function(t){a&&(e.setIsAuthenticated(!0),e.setUser(t._id),e.setJwToken(a),e.setPicture(t.photoUrl))})})}})),r.a.createElement(ae.d,null,r.a.createElement(ae.b,{path:"/location",component:ne}),r.a.createElement(ae.b,{exact:!0,path:"/"},r.a.createElement(ae.a,{to:"/location"})),r.a.createElement(ae.b,{path:"/profile",component:ce})))};a(126),a(127);c.a.render(r.a.createElement(f,null,r.a.createElement(j,null,r.a.createElement(se,null))),document.getElementById("root"))},92:function(e,t,a){e.exports=a.p+"static/media/039-tent.ebd03a54.svg"},93:function(e,t,a){e.exports=a.p+"static/media/010-bonfire.21b76057.svg"},94:function(e,t,a){e.exports=a.p+"static/media/009-binoculars.6b6a714c.svg"}},[[114,1,2]]]);
//# sourceMappingURL=main.d57dac06.chunk.js.map