(this["webpackJsonpcms.esembico.de"]=this["webpackJsonpcms.esembico.de"]||[]).push([[0],{197:function(e,t,a){},201:function(e,t,a){},202:function(e,t,a){},204:function(e,t,a){},205:function(e,t,a){},207:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(0),c=a.n(r),i=a(37),o=a.n(i),s=a(6),l=a(2),u=a(73),d=a(74),b=a(23),j={allIds:[],byIds:{},byPage:{},error:null,status:"idle",lastPage:1,currentPage:1,selectedId:null,editedData:null,filteredData:[],pageLoaded:{}};function p(e){var t=e.replace(" ","_").toUpperCase();return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"SELECT_".concat(t,"_ID"):return Object(l.a)(Object(l.a)({},e),{},{selectedId:a.selectedId});case"SET_PAGE_".concat(t):return Object(l.a)(Object(l.a)({},e),{},{currentPage:a.page});case"SET_EDITED_DATA_".concat(t):var n=-1===a.id?{}:e.byIds[a.id];return Object(l.a)(Object(l.a)({},e),{},{editedData:n});case"UPDATE_EDITED_DATA_".concat(t):var r=Object(l.a)(Object(l.a)({},e.editedData),{},Object(b.a)({},a.field,a.value));return Object(l.a)(Object(l.a)({},e),{},{editedData:r});case"UPDATE_".concat(t):var c=e.byPage[1];return a.new&&c.unshift(a.data.id),Object(l.a)(Object(l.a)({},e),{},{byIds:Object(l.a)(Object(l.a)({},e.byIds),{},Object(b.a)({},a.data.id,a.data)),pageLoaded:{}});case"FETCH_".concat(t,"_PENDING"):return Object(l.a)(Object(l.a)({},e),{},{status:"loading"});case"SET_FILTERED_DATA_".concat(t):return Object(l.a)(Object(l.a)({},e),{},{filteredData:a.data});case"FETCH_".concat(t,"_SUCCESS"):var i=[],o={},s=[],u=a.payload,d=u.data,p=u.page,h=u.nextPage;d.forEach((function(e){s.push(e.id),i.push(e.id),o[e.id]=e}));var m=Object(l.a)(Object(l.a)({},e.byIds),o),f=Math.max(e.lastPage,h||e.lastPage);return Object(l.a)(Object(l.a)({},e),{},{allIds:i,byIds:m,byPage:Object(l.a)(Object(l.a)({},e.byPage),{},Object(b.a)({},p,s)),status:"idle",lastPage:f,currentPage:p,pageLoaded:Object(l.a)(Object(l.a)({},e.pageLoaded),{},Object(b.a)({},p,Date.now()))});case"FETCH_".concat(t,"_ERROR"):return Object(l.a)(Object(l.a)({},e),{},{error:a.error,status:"idle"});default:return e}}}function h(e){var t={"Content-Type":"application/json"};return e&&(t.Authorization="Token ".concat(e)),t}function m(e,t){return new Promise((function(a,n){fetch(e,t).then((function(e){e.ok?204!==e.status?e.json().then((function(e){a(e)})):a():e.json().then((function(t){n({status:e.status,message:t})}))})).catch(n)}))}function f(e,t){var a=e.replace(" ","_").toUpperCase(),n=function(n,r){return function(c,i){var o=i(),s=Q.getSelector(e,"getPageLastLoaded")(o,n),l=Date.now()-s;!r&&l<6e4?c({type:"SET_PAGE_".concat(a),page:n}):(c({type:"FETCH_".concat(a,"_PENDING")}),m("".concat("http://api.esembico.de","/").concat(t,"/?page=").concat(n),{headers:h()}).then((function(t){var r=Q.getOption(e,"getNextPageNumber")(t);return c({type:"FETCH_".concat(a,"_SUCCESS"),payload:{data:t.results,page:n,nextPage:r}}),t.results})).catch((function(e){c({type:"FETCH_".concat(a,"_ERROR"),error:e})})))}};return{getPageAction:n,fetchAction:function(){return n(1)},selectItemAction:function(e){return function(t){t({type:"SELECT_".concat(a,"_ID"),selectedId:e})}},setEditedDataAction:function(e){return function(t){t({type:"SET_EDITED_DATA_".concat(a),id:e})}},updateEditedDataAction:function(e,t){return function(n){n({type:"UPDATE_EDITED_DATA_".concat(a),field:e,value:t})}},commitDataAction:function(e){return function(n,r){var c=r().auth.token;m("".concat("http://api.esembico.de","/").concat(t,"/").concat(e.id?"".concat(e.id,"/"):""),{method:e.id?"PUT":"POST",headers:h(c),body:JSON.stringify(e)}).then((function(t){n({type:"UPDATE_".concat(a),data:t,new:!e.id})})).catch((function(e){n({type:"FETCH_".concat(a,"_ERROR"),error:e})}))}},setFilteredDataAction:function(e){return function(n){m("".concat("http://api.esembico.de","/").concat(t,"/?search=").concat(e),{headers:h()}).then((function(e){n({type:"SET_FILTERED_DATA_".concat(a),data:e.results})})).catch((function(e){n({type:"FETCH_".concat(a,"_ERROR"),error:e})}))}},deleteItemAction:function(r){return function(c,i){var o=i(),s=o.auth.token,l=Q.getSelector(e,"getCurrentPage");m("".concat("http://api.esembico.de","/").concat(t,"/").concat(r,"/"),{method:"DELETE",headers:h(s)}).then((function(){var e=l(o);c(n(e,!0))})).catch((function(e){c({type:"FETCH_".concat(a,"_ERROR"),error:e})}))}}}}var g=a(10);function O(e){return{mapStateToProps:function(t){var a=Q.getSelectors(e),n=a.getError,r=a.getStatus,c=a.getCurrentPageData,i=a.getLastPage,o=a.getCurrentPage,s=a.getSelectedId,l=a.getSelectedData,u=a.getEditedData;return{error:n(t),status:r(t),data:c(t),lastPage:i(t),currentPage:o(t),selectedId:s(t),selectedData:l(t),editedData:u(t)}},mapDispatchToProps:function(t){var a=Q.getActions(e),n=a.fetchAction,r=a.getPageAction,c=a.selectItemAction,i=a.setEditedDataAction,o=a.updateEditedDataAction,s=a.commitDataAction,l=a.deleteItemAction;return Object(g.b)({fetchData:n,selectPage:r,selectItem:c,setEditedData:i,updateEditedData:o,commitData:s,deleteItem:l},t)}}}function v(e){var t=function(t){return t[e]},a=function(e){return t(e)?t(e).allIds:[]},n=function(e,a){return t(e)?Object(l.a)(Object(l.a)({},t(e).byIds[a]),{},{id:a}):{}},r=function(e,a){return(t(e)?t(e).byPage[a]:[])||[]},c=function(e){return t(e)?t(e).currentPage:1},i=function(e){return t(e)?t(e).selectedId:null};return{getState:t,getList:a,getById:n,get:function(e){return a(e).map((function(t){return n(e,t)}))},getPage:r,getCurrentPage:c,getLastPage:function(e){return t(e)?t(e).lastPage:1},getCurrentPageData:function(e){var t=c(e);return r(e,t).map((function(t){return n(e,t)}))},getStatus:function(e){return t(e)?t(e).status:"idle"},getError:function(e){return t(e)?t(e).error:null},getSelectedId:i,getSelectedData:function(e){return i(e)?n(e,i(e)):{}},getEditedData:function(e){return t(e)?t(e).editedData:null},getFilteredData:function(e){return t(e)?t(e).filteredData:[]},getPageLastLoaded:function(e,a){var n=t(e);return n&&n.pageLoaded[a]?n.pageLoaded[a]:0}}}function y(e){return e.charAt(0).toUpperCase()+e.slice(1)}a(85);function x(e,t){return e?"object"!==typeof e?e:"string"===typeof t?e[t]:"function"===typeof t?t(e):"":""}a(86);function D(e){var t=e.lastPage,a=e.selectedPage,c=e.onPageChange,i=e.align,o=Object(r.useState)(!1),l=Object(s.a)(o,2),u=l[0],d=l[1],b=Object(r.useState)(!1),j=Object(s.a)(b,2),p=j[0],h=j[1],m=Object(r.useState)([]),f=Object(s.a)(m,2),g=f[0],O=f[1];return Object(r.useEffect)((function(){1!==a&&d(!0),a!==t&&h(!0);for(var e=[],n=1;n<=t;n++)e.push(n);O(e)}),[t,a]),Object(n.jsxs)("div",{className:"pagination",style:{float:i||"left"},children:[u&&Object(n.jsx)("a",{onClick:function(e){e.preventDefault(),c(a-1)},href:"#page-".concat(a-1),children:"\xab"}),g.map((function(e){return Object(n.jsx)("a",{onClick:function(t){t.preventDefault(),c(e)},className:a===e?"active":"",href:"#page-".concat(e),children:e},e)})),p&&Object(n.jsx)("a",{onClick:function(e){e.preventDefault(),c(a+1)},href:"#page-".concat(a+1),children:"\xbb"})]})}function E(e){var t=e.data,a=e.columns,r=e.pageData,i=e.onPageChange,o=e.onSelect,s=e.selected;return Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)("div",{className:"data-table-container",children:Object(n.jsxs)("table",{className:"data-table",children:[Object(n.jsx)("thead",{children:Object(n.jsx)("tr",{children:a.map((function(e){return Object(n.jsx)("th",{children:e.header},e.header)}))})}),Object(n.jsx)("tbody",{children:t.map((function(e){return Object(n.jsx)("tr",{className:s===e.id?"active":"",onClick:function(){return o(e.id)},children:a.map((function(t){return Object(n.jsx)("td",{children:x(e,t.display)},"".concat(t.header,"-").concat(e.id))}))},e.id)}))})]})}),Object(n.jsx)(D,{align:"right",lastPage:r.last,onPageChange:i,selectedPage:r.current})]})}function P(e){var t=e.children;return Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)("h1",{children:t}),Object(n.jsx)("hr",{})]})}var S=a(11),C=a(76),T=a.n(C);function _(e){var t=e.show;return Object(n.jsx)(c.a.Fragment,{children:t&&Object(n.jsx)("div",{style:{margin:"40px auto 0 auto",width:"0px",height:"40px"},children:Object(n.jsx)(T.a,{color:"white",size:80})})})}a(95);function k(e){var t=e.data,a=e.primaryProperty,r=e.selected,i=e.onSelect,o=e.onPageChange,s=e.pageData;return Object(n.jsx)(c.a.Fragment,{children:Object(n.jsxs)("div",{className:"hide-on-mobile data-list-container",children:[Object(n.jsxs)("ul",{className:"data-list",children:[Object(n.jsx)("li",{className:"header",children:a.header}),t.map((function(e){return Object(n.jsx)("li",{onClick:function(){return i(e.id)},className:r===e.id?"entry active":"entry",children:x(e,a.display)},e.id)}))]}),Object(n.jsx)(D,{align:"right",lastPage:s.last,onPageChange:o,selectedPage:s.current})]})})}function N(e){var t=e.children;return Object(n.jsx)("div",{className:"container",children:t})}function A(e){var t=e.children;return Object(n.jsx)("div",{className:"row",children:t})}function I(e){var t=e.children,a=e.width;return Object(n.jsx)("div",{className:"col col-".concat(a),children:t})}var w=a(16);function F(e){var t=e.children,a=e.color,r=e.className,c=Object(w.a)(e,["children","color","className"]);return Object(n.jsx)("div",{className:"button-container",children:Object(n.jsx)("button",Object(l.a)(Object(l.a)({type:"button",className:"contained ".concat(a||"primary"," ").concat(r||"")},c),{},{children:t}))})}function R(e){var t=e.columns,a=e.primaryProperty,i=e.Editor,o=e.entity,l=Q.getMappers(o),u=l.mapStateToProps,d=l.mapDispatchToProps;return Object(S.b)(u,d)((function(e){var l=e.data,u=e.status,d=e.lastPage,b=e.currentPage,j=e.editedData,p=e.fetchData,h=e.selectPage,m=e.selectItem,f=e.selectedId,g=e.setEditedData,O=e.updateEditedData,v=e.commitData,y=e.deleteItem,x=Object(r.useState)("view"),D=Object(s.a)(x,2),S=D[0],C=D[1],T=Object(r.useState)({}),w=Object(s.a)(T,2),R=w[0],L=w[1],U=Q.getOption(o,"validateData");Object(r.useEffect)((function(){p()}),[p]),Object(r.useEffect)((function(){var e=U(j||{});L(e||{})}),[j,U]);var H=function(e){h(e)},V=function(e){C("edit"),g(e)};return Object(n.jsxs)("div",{children:[Object(n.jsx)(P,{children:Q.getOption(o,"header")}),Object(n.jsx)(_,{show:"loading"===u}),"loading"!==u&&Object(n.jsx)(c.a.Fragment,{children:Object(n.jsxs)(N,{children:[Object(n.jsx)(A,{children:Object(n.jsx)(F,{className:"edit"===S?"hide-on-mobile":"",onClick:function(){C("edit"),g(-1),m(null)},children:"New"})}),"view"===S&&Object(n.jsx)(E,{pageData:{current:b,last:d},data:l,columns:t,onPageChange:H,onSelect:function(e){V(e),m(e)},selected:f}),"edit"===S&&Object(n.jsxs)(A,{children:[Object(n.jsx)(I,{width:25,children:Object(n.jsx)(k,{data:l,pageData:{current:b,last:d},primaryProperty:a,selected:f,onPageChange:H,onSelect:function(e){V(e),m(e)}})}),Object(n.jsx)(I,{width:75,children:i&&Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)(i,{errors:R,onUpdate:O,data:j}),Object(n.jsxs)(I,{width:100,children:[Object(n.jsx)(F,{onClick:function(){0===Object.keys(R).length&&v(j)},children:"Save"}),Object(n.jsx)(F,{onClick:function(){return C("view")},children:"Cancel"}),Object(n.jsx)(F,{onClick:function(){y(f)},color:"danger",children:"Delete"})]})]})})]})]})})]})}))}function L(e){var t=e.errors;return Object(n.jsx)(c.a.Fragment,{children:t&&Object(n.jsx)(c.a.Fragment,{children:Array.isArray(t)?Object(n.jsx)(c.a.Fragment,{children:t.map((function(e,t){return Object(n.jsx)("span",{className:"error",children:e},t)}))}):Object(n.jsx)("span",{className:"error",children:t})})})}function U(e){var t=e.value,a=e.label,r=e.multiline,c=e.rows,i=e.type,o=e.errors,s=Object(w.a)(e,["value","label","multiline","rows","type","errors"]),u=[];return t&&u.push("has-value"),o&&u.push("has-errors"),Object(n.jsxs)("div",{className:"form-group",children:[r&&Object(n.jsx)("textarea",Object(l.a)({className:u.join(" "),rows:c||3,value:t||""},s)),!r&&Object(n.jsx)("input",Object(l.a)({className:u.join(" "),type:i||"text",value:t||""},s)),Object(n.jsx)("label",{className:"control-label",children:a}),Object(n.jsx)("i",{className:"bar"}),Object(n.jsx)(L,{errors:o})]})}function H(e){var t=e.label,a=e.entity,i=e.value,o=e.onChange,l=e.errors,u=Object(r.useState)(i),d=Object(s.a)(u,2),b=d[0],j=d[1],p=Object(r.useState)(!1),h=Object(s.a)(p,2),m=h[0],f=h[1],g=Object(r.useState)(-1),O=Object(s.a)(g,2),v=O[0],y=O[1],D=Object(S.d)().getState(),E=Q.getAction(a,"setFilteredDataAction"),P=Q.getSelector(a,"getFilteredData")(D),C=Q.getOption(a,"primaryProperty"),T=Object(S.c)();Object(r.useEffect)((function(){j(i)}),[i]);var _=function(e){f(!1),o(e)};return Object(n.jsx)(c.a.Fragment,{children:Object(n.jsxs)("div",{className:"searchable-container",children:[Object(n.jsx)(U,{label:t,value:x(b,C.display),onChange:function(e){var t=e.target.value;f(!!t),j(t),T(E(t)),t||o(null)},onKeyDown:function(e){var t=v;40===e.keyCode?t++:38===e.keyCode?t--:13===e.keyCode&&_(P[v]),t!==v&&(t<0?t=0:t>=P.length&&(t=P.length-1),j(P[t]),y(t))},onBlur:function(){f(!1)},errors:l}),m&&Object(n.jsx)("div",{className:"searchable-field-dropdown",children:P.map((function(e,t){return Object(n.jsx)("a",{onClick:function(t){t.preventDefault(),_(e)},className:t===v?"active":"",href:"#entry-".concat(e.id),children:x(e,C.display)},e.id)}))})]})})}var V=a(77),B=a.n(V),M=a(49),G=a.n(M),J=a(38),K=(a(194),a(195),a(196),a(197),{vba:J.languageVBA,python:J.languagePython}),z={code:function(e){var t=e.language,a=e.value;return Object(n.jsx)(J.CodeHighlighter,{getLanguageFunction:function(e,t){return t(K[e])},language:t,children:a})},image:function(e){return Object(n.jsx)("img",Object(l.a)({className:"responsive-image"},e))}};function W(e){var t=e.label,a=e.value,c=e.onChange,i=e.errors,o=Object(r.useState)("write"),l=Object(s.a)(o,2),u=l[0],d=l[1];return Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{className:"markdown-label ".concat(i?"has-errors":""),children:t}),Object(n.jsx)(G.a,{value:a,onChange:c,selectedTab:u,onTabChange:d,generateMarkdownPreview:function(e){return Promise.resolve(Object(n.jsx)(B.a,{renderers:z,source:e}))}}),Object(n.jsx)(L,{errors:i})]})}function X(e){var t=e.label,a=e.value,r=e.options,c=(e.identifierProperty,e.errors),i=Object(w.a)(e,["label","value","options","identifierProperty","errors"]),o=[];return a&&o.push("has-value"),c&&o.push("has-errors"),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsxs)("select",Object(l.a)(Object(l.a)({className:o.join(" "),value:a},i),{},{children:[Object(n.jsx)("option",{}),r.map((function(e,t){return Object(n.jsx)("option",{value:e.value,children:e.display},t)}))]})),Object(n.jsx)("label",{className:"control-label",children:t}),Object(n.jsx)("i",{className:"bar"}),Object(n.jsx)(L,{errors:c})]})}function q(e){var t=e.property,a=e.data,r=e.onUpdate,i=Object(w.a)(e,["property","data","onUpdate"]);if(t.if&&!t.if(a))return Object(n.jsx)(c.a.Fragment,{});var o=t.label;switch("function"===typeof o&&(o=o(a)),t.type){case"select":return Object(n.jsx)(X,Object(l.a)({label:o,value:a[t.name],onChange:function(e){return r(t.name,e.target.value)},options:t.options},i));case"text":return Object(n.jsx)(U,Object(l.a)({label:o,value:a[t.name],multiline:t.multiline,onChange:function(e){return r(t.name,e.target.value)}},i));case"number":return Object(n.jsx)(U,Object(l.a)({label:o,value:a[t.name],multiline:t.multiline,onChange:function(e){return r(t.name,e.target.value||null)}},i));case"reference":return Object(n.jsx)(H,Object(l.a)({label:o,entity:t.to,value:a[t.name],onChange:function(e){return r(t.name,e)}},i));case"markdown":return Object(n.jsx)(W,Object(l.a)({label:o,value:a[t.name],onChange:function(e){return r(t.name,e)}},i));default:return Object(n.jsx)("span",{children:a[t.name]})}}function Z(e){var t=e.proprties;return function(e){var a=e.data,r=e.onUpdate,i=e.errors;return Object(n.jsx)(c.a.Fragment,{children:Object(n.jsx)(A,{children:t.map((function(e){return Object(n.jsx)(c.a.Fragment,{children:q({property:e,data:a,onUpdate:r,errors:i[e.name]})},e.name)}))})})}}var Q=new(function(){function e(){Object(u.a)(this,e),this.states={},this.defaultOptions={validateData:function(){}},this.globalOptions={}}return Object(d.a)(e,[{key:"setGlobalOptions",value:function(e){this.globalOptions=e}},{key:"register",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=Object(l.a)(Object(l.a)(Object(l.a)({},this.defaultOptions),this.globalOptions),t),n=t.editor;Array.isArray(n)&&(n=Z({proprties:n})),this.states[e]=Object(l.a)(Object(l.a)({},a),{},{actions:f(e,a.endpoint||e),selectors:v(e),mappers:O(e,a.endpoint),reducer:p(e),header:a.header||y(e),editor:n})}},{key:"getRoutes",value:function(){var e=[];return Object.entries(this.states).forEach((function(t){var a=Object(s.a)(t,2),n=a[0],r=a[1];e.push({name:n,path:"/".concat(n),component:r.pageComponent||R({columns:r.columns,primaryProperty:r.primaryProperty,entity:n,Editor:r.editor})})})),e}},{key:"getOption",value:function(e,t,a){return this.states[e][t]||a}},{key:"getActions",value:function(e){return this.states[e].actions}},{key:"getAction",value:function(e,t){return this.states[e].actions[t]}},{key:"getSelectors",value:function(e){return this.states[e].selectors}},{key:"getSelector",value:function(e,t){return this.states[e].selectors[t]}},{key:"getMappers",value:function(e){return this.states[e].mappers}},{key:"getReducer",value:function(e){return this.states[e].reducer}},{key:"getReducers",value:function(){var e={};return Object.entries(this.states).forEach((function(t){var a,n=Object(s.a)(t,2),r=n[0],c=n[1];e[(a=r,a.replace(/(?:^\w|[A-Z]|\b\w)/g,(function(e,t){return 0===t?e.toLowerCase():e.toUpperCase()})).replace(/\s+/g,""))]=c.reducer})),e}}]),e}());function Y(e,t,a,n){a[n]||(e[n]||(e[n]=[]),e[n].push("".concat(t," is required")))}var $={endpoint:"members",columns:[{header:"Name",display:"name"},{header:"Artist name",display:"artist_name"},{header:"Title",display:"titles"}],primaryProperty:{display:function(e){return"".concat(e.name," (").concat(e.artist_name,")")},header:"Name"},editor:[{type:"text",label:"Name",name:"name"},{type:"text",label:"Artist name",name:"artist_name"},{type:"text",label:"Titles",name:"titles"},{type:"text",label:"Bio",name:"bio",multiline:!0},{type:"reference",label:"Image",name:"image",to:"images"}],validateData:function(e){var t={};return Y(t,"Name",e,"name"),Y(t,"Artist name",e,"artist_name"),Y(t,"Titles",e,"titles"),Y(t,"Bio",e,"bio"),Y(t,"Image",e,"image"),t}},ee=a(21),te=a(22),ae={columns:[{header:"Type",display:function(e){switch(e.type){case"movie":return Object(n.jsx)(ee.a,{icon:te.b});case"misc":return Object(n.jsx)(ee.a,{icon:te.c});default:return e.type}}},{header:"Title",display:"title"},{header:"Description",display:"description"}],primaryProperty:{header:"Title",display:"title"},editor:[{type:"select",label:"Type",name:"type",options:[{value:"misc",display:"Misc"},{value:"movie",display:"Movie"}]},{type:"text",label:"Url",name:"url"},{type:"text",label:"Title",name:"title"},{type:"reference",label:"Image",name:"image",to:"images"},{type:"text",label:"Description",name:"description",if:function(e){return"misc"===e.type}},{type:"text",label:function(e){if("movie"===e.type)return"FSK Rating"},name:"field1",if:function(e){return"movie"===e.type}},{type:"text",label:function(e){if("movie"===e.type)return"Release year"},name:"field2",if:function(e){return"movie"===e.type}},{type:"text",label:"Field3",name:"field3",if:function(){return!1}},{type:"text",label:"Field4",name:"field4",if:function(){return!1}},{type:"text",label:"Field5",name:"field5",if:function(){return!1}}],validateData:function(e){var t={};return Y(t,"Type",e,"type"),Y(t,"Url",e,"url"),Y(t,"Title",e,"title"),Y(t,"Image",e,"image"),"misc"===e.type?Y(t,"Description",e,"description"):"movie"===e.type&&(Y(t,"FSK Rating",e,"field1"),Y(t,"Release year",e,"field2")),t}},ne={columns:[{header:"Url",display:"url"},{header:"Alternate text",display:"alt"},{header:"Dimension",display:function(e){return"".concat(e.width||"auto"," x ").concat(e.height||"auto")}}],primaryProperty:{header:"Url",display:"url"},editor:[{type:"text",label:"Url",name:"url"},{type:"text",label:"Alt",name:"alt"},{type:"number",label:"Width",name:"width"},{type:"number",label:"Height",name:"height"}],validateData:function(e){var t={};return Y(t,"Url",e,"url"),Y(t,"Alt",e,"alt"),t}},re={columns:[{header:"Title",display:"title"},{header:"Subtitle",display:"subtitle"}],primaryProperty:{header:"Title",display:"title"},editor:[{type:"text",label:"Title",name:"title"},{type:"text",label:"Subtitle",name:"subtitle"},{type:"text",label:"Url",name:"url"},{type:"reference",label:"Image",name:"image",to:"images"},{type:"text",label:"Challenge",name:"challenge",multiline:!0},{type:"text",label:"Solution",name:"solution",multiline:!0},{type:"text",label:"Rough details",name:"rough_details",multiline:!0}],validateData:function(e){var t={};return Y(t,"Title",e,"title"),Y(t,"Subtitle",e,"subtitle"),Y(t,"Url",e,"url"),Y(t,"Image",e,"image"),Y(t,"Challenge",e,"challenge"),Y(t,"Solution",e,"solution"),Y(t,"Rough details",e,"rough_details"),t}},ce={columns:[{header:"Name",display:"name"},{header:"Slug",display:"slug"}],primaryProperty:{header:"Name",display:"name"},editor:[{type:"text",label:"Name",name:"name"},{type:"text",label:"Slug",name:"slug"},{type:"markdown",label:"Content",name:"content"}],validateData:function(e){var t={};return Y(t,"Name",e,"name"),Y(t,"Slug",e,"slug"),Y(t,"Content",e,"content"),t}};Q.setGlobalOptions({getNextPageNumber:function(e){if(e.next){var t=e.next.match(/[\w\W]*page=([0-9]*)/);return parseInt(t[1])}return null}}),Q.register("team",$),Q.register("recommendations",ae),Q.register("images",ne),Q.register("prototypes",re),Q.register("pages",ce);var ie=a(26),oe=a(5);a(201);function se(e){var t=e.label,a=e.checked,r=e.onClick;return Object(n.jsxs)("div",{children:[Object(n.jsxs)("label",{className:"switch",children:[Object(n.jsx)("input",{defaultChecked:a,type:"checkbox",onClick:function(e){return r(e)}}),Object(n.jsx)("span",{className:"slider"})]}),Object(n.jsx)("span",{className:"switch-label",children:t})]})}a(202);var le=[{to:"/",text:"Home"},{to:"/team",text:"Team"},{to:"/prototypes",text:"Prototypes"},{to:"/recommendations",text:"Recommendations"},{to:"/pages",text:"Pages"},{to:"/images",text:"Images"}];function ue(e){var t=e.visible,a=e.setVisible,c=Object(r.useState)(!0),i=Object(s.a)(c,2),o=i[0],l=i[1];Object(r.useEffect)((function(){var e=document.getElementsByTagName("body")[0];o?(e.classList.remove("light"),e.classList.add("dark")):(e.classList.remove("dark"),e.classList.add("light"))}),[o]);return Object(n.jsxs)("div",{className:"sidenav ".concat(t?"show":""),children:[Object(n.jsx)("div",{className:"close-sidebar",children:Object(n.jsx)("a",{href:"#close-sidebar",onClick:function(e){e.preventDefault(),a(!1)},children:Object(n.jsx)(ee.a,{icon:te.d})})}),le.map((function(e){return Object(n.jsx)(ie.b,{className:"nav-link",exact:!0,to:e.to,children:e.text},e.text)})),Object(n.jsx)("div",{className:"theme-toggle",children:Object(n.jsx)(se,{checked:o,onClick:function(e){return l(e.target.checked)},label:"Theme"})})]})}var de="SET_TOKEN",be="SET_USERNAME",je="SET_AUTH_ERROR",pe="SET_SIDEBAR_VISIBLE",he={token:localStorage.getItem("token"),username:null};function me(e,t){return function(a){m("".concat("http://api.esembico.de","/auth/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}).then((function(t){t.non_field_errors?a({type:je,error:t.non_field_errors}):(a({type:de,token:t.token}),a({type:be,username:e}))})).catch((function(e){a({type:je,error:e})}))}}var fe={sidebarVisible:!1};function ge(e){return function(t){t({type:pe,visible:e})}}var Oe=Object(S.b)((function(e){return{token:e.auth.token}}))((function(e){var t=e.token,a=e.component,r=Object(w.a)(e,["token","component"]);return Object(n.jsx)(oe.b,Object(l.a)(Object(l.a)({},r),{},{render:function(e){return t?Object(n.jsx)(a,Object(l.a)({},e)):Object(n.jsx)(oe.a,{to:"/login"})}}))}));a(204),a(205),a(206);function ve(){return Object(n.jsx)("div",{children:Object(n.jsx)(P,{children:"Home"})})}function ye(){return Object(n.jsx)("div",{children:Object(n.jsx)("h1",{children:"Page not found"})})}var xe=Object(S.b)((function(e){return{token:e.auth.token}}),(function(e){var t=me;return Object(g.b)({auth:t},e)}))((function(e){var t=e.auth,a=e.token,c=Object(r.useState)(""),i=Object(s.a)(c,2),o=i[0],l=i[1],u=Object(r.useState)(""),d=Object(s.a)(u,2),b=d[0],j=d[1];return Object(n.jsxs)(N,{children:[a&&Object(n.jsx)(oe.a,{to:"/"}),Object(n.jsx)(U,{label:"Username",value:o,onChange:function(e){return l(e.target.value)}}),Object(n.jsx)(U,{label:"Password",type:"password",value:b,onChange:function(e){return j(e.target.value)}}),Object(n.jsx)(F,{onClick:function(e){e.preventDefault(),t(o,b)},children:"Login"})]})}));var De=Object(S.b)((function(e){return{token:e.auth.token,sidebarVisible:e.pageState.sidebarVisible}}),(function(e){var t=ge;return Object(g.b)({setSidebarVisible:t},e)}))((function(e){var t=e.token,a=e.sidebarVisible,r=e.setSidebarVisible,i=Q.getRoutes();return Object(S.c)()((function(e,t){var a=t();m("".concat("http://api.esembico.de","/current-user/"),{headers:h(a.auth.token)}).then((function(t){e({type:be,username:t.username})})).catch((function(t){e({type:de,token:null}),e({type:je,error:t})}))})),Object(n.jsxs)(ie.a,{children:[t&&Object(n.jsx)(c.a.Fragment,{children:Object(n.jsx)(ue,{visible:a,setVisible:r})}),Object(n.jsxs)("div",{className:t?"main":"",children:[Object(n.jsx)("div",{className:"show-sidebar",children:Object(n.jsx)("a",{onClick:function(e){e.preventDefault(),r(!0)},href:"#show-sidebar",children:Object(n.jsx)(ee.a,{icon:te.a})})}),Object(n.jsxs)(oe.d,{children:[Object(n.jsx)(oe.b,{exact:!0,path:"/login",component:xe}),i.map((function(e){return Object(n.jsx)(Oe,{exact:!0,path:e.path,component:e.component},e.name)})),Object(n.jsx)(Oe,{exact:!0,path:"/",component:ve}),Object(n.jsx)(Oe,{path:"*",component:ye})]})]})]})})),Ee=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,209)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),c(e),i(e)}))},Pe=Object(g.c)(Object(l.a)(Object(l.a)({},Q.getReducers()),{},{auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case de:return localStorage.setItem("token",t.token),Object(l.a)(Object(l.a)({},e),{},{token:t.token});case be:return Object(l.a)(Object(l.a)({},e),{},{username:t.username});case je:return Object(l.a)(Object(l.a)({},e),{},{error:t.error});default:return e}},pageState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case pe:return Object(l.a)(Object(l.a)({},e),{},{sidebarVisible:t.visible});default:return e}}})),Se=[a(78).a],Ce=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||g.d,Te=Object(g.e)(Pe,Ce(g.a.apply(void 0,Se)));o.a.render(Object(n.jsx)(S.a,{store:Te,children:Object(n.jsx)(De,{})}),document.getElementById("root")),Ee()},85:function(e,t,a){},86:function(e,t,a){},95:function(e,t,a){}},[[207,1,2]]]);
//# sourceMappingURL=main.377a58da.chunk.js.map