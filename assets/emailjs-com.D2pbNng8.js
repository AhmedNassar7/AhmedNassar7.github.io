const e={_origin:"https://api.emailjs.com"},t=(e,t,s)=>{if(!e)throw"The user ID is required. Visit https://dashboard.emailjs.com/admin/integration";if(!t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!s)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";return!0};class s{constructor(e){this.status=e.status,this.text=e.responseText}}const r=(t,r,i={})=>new Promise(((n,a)=>{const o=new XMLHttpRequest;o.addEventListener("load",(({target:e})=>{const t=new s(e);200===t.status||"OK"===t.text?n(t):a(t)})),o.addEventListener("error",(({target:e})=>{a(new s(e))})),o.open("POST",e._origin+t,!0),Object.keys(i).forEach((e=>{o.setRequestHeader(e,i[e])})),o.send(r)})),i={init:(t,s="https://api.emailjs.com")=>{e._userID=t,e._origin=s},send:(s,i,n,a)=>{const o=a||e._userID;t(o,s,i);const d={lib_version:"3.2.0",user_id:o,service_id:s,template_id:i,template_params:n};return r("/api/v1.0/email/send",JSON.stringify(d),{"Content-type":"application/json"})},sendForm:(s,i,n,a)=>{const o=a||e._userID,d=(e=>{let t;if(t="string"==typeof e?document.querySelector(e):e,!t||"FORM"!==t.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of form";return t})(n);t(o,s,i);const p=new FormData(d);return p.append("lib_version","3.2.0"),p.append("service_id",s),p.append("template_id",i),p.append("user_id",o),r("/api/v1.0/email/send-form",p)}};export{i as e};