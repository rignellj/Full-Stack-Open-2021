(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),r=t(15),i=t.n(r),o=t(3),u=t(4),l=t.n(u),s="/api/persons",d={getAll:function(){return l.a.get(s)},create:function(e){return l.a.post(s,e)},deleteAddress:function(e){return l.a.delete("".concat(s,"/").concat(e))},update:function(e,n){return l.a.put("".concat(s,"/").concat(e),n)}},j=t(0),b=function(e){var n=e.onSubmitHandler,t=e.onNameChangeHandler,c=e.newName,a=e.onNumberChangeHandler,r=e.newNumber;return Object(j.jsxs)("form",{onSubmit:n,children:[Object(j.jsxs)("div",{children:["name: ",Object(j.jsx)("input",{onChange:t,value:c})]}),Object(j.jsxs)("div",{children:["number: ",Object(j.jsx)("input",{onChange:a,value:r})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"submit",children:"Add"})})]})},f=function(e){var n=e.name,t=e.number,c=e.id,r=e.setPersons,i=e.setNotification;return Object(j.jsx)(a.a.Fragment,{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:n}),Object(j.jsx)("td",{children:t}),Object(j.jsx)("td",{children:Object(j.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(n,"?"))&&(d.deleteAddress(e).then((function(e){console.log(e,"delete address")})),i(["Deleted ".concat(n),"deleted"]),setTimeout((function(){i([null,null])}),5e3),d.getAll().then((function(e){r(e.data)})))}(c)},children:"Delete"})})]})})},m=function(e){var n,t=e.persons,c=e.filterName,a=e.setPersons,r=e.setNotification;if(void 0===t)return Object(j.jsx)("p",{children:"Loading..."});var i=t.filter((function(e){return e.name.includes(c)}));return n=i.length||c?i.map((function(e){return Object(j.jsx)(f,{setNotification:r,setPersons:a,id:e.id,name:e.name,number:e.number},e.name)})):t.map((function(e){return Object(j.jsx)(f,{setNotification:r,setPersons:a,id:e.id,name:e.name,number:e.number},e.name)})),Object(j.jsx)("table",{children:Object(j.jsx)("tbody",{children:n})})},h=function(e){var n=e.filterName,t=e.filterCHangeHandler;return Object(j.jsxs)("div",{children:["filter: ",Object(j.jsx)("input",{onChange:t,value:n})]})},O=t(5),x=t.n(O),g=function(e){var n=e.notification,t=Object(o.a)(n,2),c=t[0],a=t[1];return null===c?null:a?Object(j.jsx)("div",{className:"".concat(x.a.notification," ").concat(x.a.ok),children:c}):Object(j.jsx)("div",{className:"".concat(x.a.notification," ").concat(x.a.error),children:c})},v=(t(39),function(){var e=Object(c.useState)(void 0),n=Object(o.a)(e,2),t=n[0],r=n[1],i=Object(c.useState)(""),u=Object(o.a)(i,2),l=u[0],s=u[1],f=Object(c.useState)(""),O=Object(o.a)(f,2),x=O[0],v=O[1],p=Object(c.useState)(""),N=Object(o.a)(p,2),w=N[0],C=N[1],H=Object(c.useState)([null,null]),A=Object(o.a)(H,2),S=A[0],_=A[1];return Object(c.useEffect)((function(){d.getAll().then((function(e){console.log(e),r(e.data)}))}),[]),Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)("h2",{children:"Phonebook"}),Object(j.jsx)(g,{notification:S}),Object(j.jsx)(h,{filterCHangeHandler:function(e){return C(e.target.value)},filterName:w}),Object(j.jsx)("h3",{children:"Add a new"}),Object(j.jsx)(b,{onSubmitHandler:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===l.trim()}));if(0===n.length){var c={name:l,number:x};d.create(c).then((function(e){r(t.concat(e.data))})),_(["Added ".concat(c.name),"added"])}else{var a=window.confirm("".concat(l.trim()," is already added to phonebook, replace the old with a new one?")),i=n[0];if(a){var o={name:l.trim(),number:x};d.update(i.id,o).then((function(e){console.log(e.data),_(["Number was changed for ".concat(o.name),"changed"])})).catch((function(e){console.log(e),_(["Address ".concat(o.name," was already deleted from server"),null])}))}}setTimeout((function(){_([null,null])}),5e3),s(""),v("")},onNameChangeHandler:function(e){return s(e.target.value)},onNumberChangeHandler:function(e){return v(e.target.value)},newName:l,newNumber:x}),Object(j.jsx)("h2",{children:"Numbers"}),Object(j.jsx)(m,{setNotification:_,filterName:w,persons:t,setPersons:r})]})});i.a.render(Object(j.jsx)(v,{}),document.getElementById("root"))},5:function(e,n,t){e.exports={notification:"Notification_notification__pERJa",error:"Notification_error__3R2sS",ok:"Notification_ok__23aTD"}}},[[40,1,2]]]);
//# sourceMappingURL=main.8d7f4bb1.chunk.js.map