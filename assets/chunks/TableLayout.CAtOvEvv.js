import{Z as v,a as i,b as _,G as T,B as P,m as H,f,L as j,p as d,q as c,t as b,H as S,u as o,I as F,M as w,O as M,F as z,a7 as D,Q as $,K as B,U as K,D as E,R as U,aw as V}from"./framework.ByRx3r4Z.js";import{r as L,s as q}from"./theme.D1IV2eHo.js";const G=t=>{const n=async()=>{const{pageNum:u,pageSize:y,...h}=a.params;a.loading.value=!0;try{const{data:p,total:g}=await t.loadMethod({pageNum:u,pageSize:y,...h});a.tableData.value=p,a.total.value=g,p.length===0&&g>0&&(a.params.pageNum=Math.ceil(g/y),n().finally())}catch(p){console.error(p)}a.loading.value=!1},a={refresh:n,reset:()=>{a.params.pageNum=1;for(const u in a.params)["pageNum","pageSize"].includes(u)||(a.params[u]=void 0);n().finally()},saveMethod:t.saveMethod,formInitMethod:t.formInitMethod,formDialog:v({ref:i(null),open:()=>{}}),formRef:i(null),formData:v({}),formRules:t.formRules,loading:i(!1),delete:u=>{if(!t.deleteMethod)throw new Error("deleteMethod is not provided");return t.deleteMethod({row:u,params:a.params})},params:v({pageNum:1,pageSize:10}),tableData:i([]),total:i(0),deleteConfirmDialogRef:i(null),allColumns:i([]),hideColumns:i([])};return _(()=>({pageNum:a.params.pageNum,pageSize:a.params.pageSize}),()=>{n().finally()},{deep:!0,immediate:t.immediate??!0}),T(t.layoutKey||"tableStore",a),a},R=t=>{const n=P(t||"tableStore");if(!n)throw new Error("tableStore is not provided");return n},O=t=>["string","symbol"].includes(typeof t)?R(t):t?G(t):R(),Q=Symbol("inner_table_key"),Y=b("div",{class:"flex-grow"},null,-1),Z={key:1,class:"flex-grow relative"},A={class:"absolute inset-0"},J={key:2,class:"flex gap-1 mt-4"},W=b("div",{class:"flex-grow"},null,-1),X=H({__name:"TableLayout",props:{maxHeight:{default:void 0},rowKey:{type:[String,Function],default:void 0},layoutKey:{default:void 0},footer:{type:Boolean,default:!0},border:{type:Boolean,default:!1},stripe:{type:Boolean,default:!0}},setup(t){var k;const a=O(t.layoutKey);T(Q,a);const u=e=>{a.params.pageSize=e},y=e=>{a.params.pageNum=e},h=f(()=>a.tableData.value),p=f({get:()=>a.params.pageNum,set:e=>{a.params.pageNum=e}}),g=f({get:()=>a.params.pageSize,set:e=>{a.params.pageSize=e}}),I=f(()=>a.total.value),m=j();a.allColumns.value=(((k=m.default)==null?void 0:k.call(m))||[]).map(e=>{var s,r,l,N;if((s=e==null?void 0:e.props)!=null&&s.prop&&((r=e==null?void 0:e.props)==null?void 0:r.prop)!=="handler")return{prop:(l=e==null?void 0:e.props)==null?void 0:l.prop,label:(N=e==null?void 0:e.props)==null?void 0:N.label}}).filter(e=>e);const C=f(()=>{var e;return((e=m.default)==null?void 0:e.call(m).filter(s=>{var r,l;return!((l=a.hideColumns.value)!=null&&l.includes((r=s.props)==null?void 0:r.prop))}))||[]});return(e,s)=>(d(),c(z,null,[b("div",{class:F(["flex flex-wrap items-center gap-4",[e.$style["option-bar"],{"pb-4":e.$slots.opt||e.$slots["opt-left"]||e.$slots["opt-right"]}]])},[S(e.$slots,"opt",{params:o(a).params},()=>[S(e.$slots,"opt-left",{params:o(a).params}),Y,S(e.$slots,"opt-right",{params:o(a).params})])],2),e.maxHeight?(d(),w(o(L),B({key:0,data:o(h),"row-key":e.rowKey,"max-height":e.maxHeight,border:e.border,stripe:e.stripe},e.$attrs),{default:M(()=>[(d(!0),c(z,null,D(o(C),(r,l)=>(d(),w($(r),{key:l}))),128))]),_:1},16,["data","row-key","max-height","border","stripe"])):(d(),c("div",Z,[b("div",A,[K(o(L),B({data:o(h),"row-key":e.rowKey,border:e.border,stripe:e.stripe,height:"100%"},e.$attrs),{default:M(()=>[(d(!0),c(z,null,D(o(C),(r,l)=>(d(),w($(r),{key:l}))),128))]),_:1},16,["data","row-key","border","stripe"])])])),e.footer?(d(),c("div",J,[W,K(o(q),{"current-page":o(p),"onUpdate:currentPage":s[0]||(s[0]=r=>E(p)?p.value=r:null),"page-size":o(g),"onUpdate:pageSize":s[1]||(s[1]=r=>E(g)?g.value=r:null),"page-sizes":[10,20,50,100],size:"small",background:"",layout:"total, sizes, prev, pager, next, jumper",total:o(I),onSizeChange:u,onCurrentChange:y},null,8,["current-page","page-size","total"])])):U("",!0)],64))}}),x={"option-bar":"_option-bar_nzxbb_1"},ee={$style:x},re=V(X,[["__cssModules",ee]]);export{Q as I,re as T,O as u};
