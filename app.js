// App logic: rendering, cart, filters, checkout, auth, theme
var curG="all", cart=[], curP=null, pdQ=1, pdSz="", curList=[];

function goShop(gender, tag){
  swG(gender);
  var btns=document.querySelectorAll(".cp");
  for(var i=0;i<btns.length;i++){
    var oc=btns[i].getAttribute("onclick")||"";
    if(oc.indexOf("'"+tag+"'")>=0){
      btns[i].click();
      return;
    }
  }
}
curList=allP.slice();

function swG(g) {
  curG=g;
  document.getElementById("tA").classList.remove("on");
  document.getElementById("tW").classList.remove("on");
  document.getElementById("tM").classList.remove("on");
  if(g==="all") document.getElementById("tA").classList.add("on");
  else if(g==="women") document.getElementById("tW").classList.add("on");
  else document.getElementById("tM").classList.add("on");
  var isM=(g==="men"), isW=(g==="women");
  document.getElementById("hSec").className="hero "+(isM?"mh":"wh");
  document.getElementById("cStr").className="cs "+(isM?"mm":"wm");
  document.getElementById("nlSc").className="nlsc "+(isM?"m":"w");
  document.getElementById("sFtr").className="ftl "+(isM?"m":"w");
  document.getElementById("hLbl").textContent=isM?"SS 2026 Men Collection":isW?"SS 2026 Women Collection":"SS 2026 New Collection";
  document.getElementById("hTtl").innerHTML=isM?"MEN<br><em>Style</em>":isW?"WOMEN<br><em>Collection</em>":"RM LUXURY<br><em>Collection</em>";
  document.getElementById("hSub").textContent=isM?"Streetwear, Smart Casual and Formal fits. Ships to Cambodia and worldwide.":"Curated luxury for women and men. Ships to Cambodia and worldwide.";
  document.getElementById("hS1").textContent=isM?"12":isW?"23":"35";
  document.getElementById("hS2").textContent=isM?"5":isW?"6":"10";
  document.getElementById("hBS").className="bp "+(isM?"m":"w");
  var hArr=isM?hM:hW;
  document.getElementById("hImg").innerHTML=hArr.map(function(s,i){return "<div class=\"hi\"><img src=\""+s+"\" alt=\"Look\"></div>";}).join("");
  buildCats(g);
  buildSBar(g);
  buildTrust(g);
  buildPromo(g);
  updFtrCls(g);
  var base=g==="all"?allP:allP.filter(function(p){return p.gender===g;});
  curList=base.slice();
  render(curList);
  document.getElementById("prods").scrollIntoView({behavior:"smooth"});
}

var wCats=["All","Women","Y2K Street","Dresses","Outerwear","New","Sale"];
var wTags=["all","women","street","dress","outerwear","new","sale"];
var mCats=["All","Men","Streetwear","Smart Casual","Formal","Outerwear","New","Sale"];
var mTags=["all","men","street","smart","formal","outerwear","new","sale"];
var aCats=["All","Women","Men","New","Sale"];
var aTags=["all","women","men","new","sale"];

function buildCats(g) {
  var cats=g==="men"?mCats:g==="women"?wCats:aCats;
  var tags=g==="men"?mTags:g==="women"?wTags:aTags;
  document.getElementById("cPls").innerHTML=cats.map(function(c,i){
    return "<button class=\"cp"+(i===0?" on":"")+"\" onclick=\"fcCat('"+tags[i]+"',this)\">"+c+"</button>";
  }).join("");
}

function fcCat(tag,el) {
  document.querySelectorAll(".cp").forEach(function(b){b.classList.remove("on");});
  if(el){
    el.classList.add("on");
  }else{
    var btns=document.querySelectorAll(".cp");
    for(var i=0;i<btns.length;i++){
      var oc=btns[i].getAttribute("onclick")||"";
      if(oc.indexOf("'"+tag+"'")>=0){btns[i].classList.add("on");break;}
    }
  }
  var base=curG==="all"?allP:allP.filter(function(p){return p.gender===curG;});
  if(tag==="all") curList=base.slice();
  else if(tag==="new") curList=base.filter(function(p){return p.badge==="New";});
  else if(tag==="sale") curList=base.filter(function(p){return p.badge==="Sale";});
  else curList=base.filter(function(p){return p.tag===tag;});
  render(curList);
  document.getElementById("prods").scrollIntoView({behavior:"smooth"});
}

function buildSBar(g) {
  var isM=(g==="men"), cls=isM?"m":"w", ac=isM?"var(--go)":"var(--pk)";
  var cats=isM?"<div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\" checked><label class=\"form-check-label\" style=\"font-size:13px\">All Men (12)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Streetwear (3)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Smart Casual (3)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Formal (2)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Outerwear (3)</label></div>":"<div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\" checked><label class=\"form-check-label\" style=\"font-size:13px\">All Women (23)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Y2K Street (4)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Dresses (8)</label></div><div class=\"form-check mb-2\"><input class=\"form-check-input\" type=\"checkbox\"><label class=\"form-check-label\" style=\"font-size:13px\">Outerwear (5)</label></div>";
  document.getElementById("sBr").innerHTML="<div class=\"sbt "+cls+"\">Category</div><div class=\"mb-3\">"+cats+"</div><div class=\"sbt "+cls+"\">Price Range</div><input type=\"range\" class=\"form-range mb-1\" style=\"accent-color:"+ac+"\" min=\"20\" max=\"150\" value=\"100\" oninput=\"document.getElementById('pv').textContent='$'+this.value\"><div class=\"d-flex justify-content-between mb-3\" style=\"font-size:11px;color:var(--tl)\"><span>$20</span><span id=\"pv\">$100</span></div><div class=\"sbt "+cls+"\">Rating</div><div class=\"mb-3\"><div class=\"form-check mb-1\"><input class=\"form-check-input\" type=\"radio\" name=\"rt\"><label class=\"form-check-label\" style=\"font-size:13px;color:"+ac+"\">5 Stars</label></div><div class=\"form-check mb-1\"><input class=\"form-check-input\" type=\"radio\" name=\"rt\"><label class=\"form-check-label\" style=\"font-size:13px;color:"+ac+"\">4+ Stars</label></div></div><div class=\"sbt "+cls+"\">Color</div><div class=\"d-flex flex-wrap gap-2 mb-3\"><div class=\"sw "+cls+" on\" style=\"background:#1a1a1a\"></div><div class=\"sw "+cls+"\" style=\"background:#fff;border-color:#ddd\"></div><div class=\"sw "+cls+"\" style=\"background:"+(isM?"#C9A84C":"#E91E8C")+"\"></div><div class=\"sw "+cls+"\" style=\"background:#d4b896\"></div><div class=\"sw "+cls+"\" style=\"background:#888\"></div></div><button style=\"background:none;border:none;cursor:pointer;color:"+ac+";font-size:12px;text-decoration:underline;font-family:'DM Sans',sans-serif;padding:0\" onclick=\"clearF()\">Clear filters</button>";
}

function buildTrust(g) {
  var isM=(g==="men"), cls=isM?"m":"w";
  var ic=isM?"var(--go)":"var(--pk)", tt=isM?"#fff":"var(--pp)", ts=isM?"#555":"var(--pd)";
  var items=[{i:"bi-truck",t:"Free Shipping",s:"Orders over $50"},{i:"bi-shield-check",t:"Secure Payment",s:"100% safe"},{i:"bi-arrow-repeat",t:"30-Day Returns",s:"Free"},{i:"bi-headset",t:"24/7 Support",s:"Always here"}];
  document.getElementById("tStI").innerHTML="<div class=\"tst "+cls+"\"><div class=\"container-fluid px-4\"><div class=\"row g-3\">"+items.map(function(t){return "<div class=\"col-6 col-md-3\"><div class=\"d-flex align-items-center gap-2\"><div style=\"width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;color:"+ic+";background:"+(isM?"#2a2a2a":"var(--pa)")+";border:1px solid "+(isM?"#333":"var(--pm)")+";flex-shrink:0\"><i class=\"bi "+t.i+"\"></i></div><div><div style=\"font-size:12px;font-weight:600;color:"+tt+"\">"+t.t+"</div><div style=\"font-size:11px;color:"+ts+"\">"+t.s+"</div></div></div></div>";}).join("")+"</div></div></div>";
}

function buildPromo(g) {
  var isM=(g==="men"), cls=isM?"m":"w";
  var desc=isM?"Premium mens fashion at unbeatable prices.":"Women styles - dresses, Y2K and more.";
  document.getElementById("prBox").innerHTML="<div class=\"promo "+cls+"\"><div class=\"row align-items-center\"><div class=\"col-md-8\"><h3>END OF SEASON SALE UP TO 40% OFF</h3><p>"+desc+"</p><div class=\"pcode "+cls+"\">Use code <strong>RMLUX40</strong></div></div><div class=\"col-md-4 text-md-end mt-3 mt-md-0\"><button class=\"bp "+cls+"\" onclick=\"fcCat('sale',null)\">Shop Sale</button></div></div></div>";
}

function updFtrCls(g) {
  var isM=(g==="men"), cls=isM?"m":"w";
  document.querySelectorAll(".fh").forEach(function(e){e.className="fh "+cls;});
  document.querySelectorAll(".fl").forEach(function(e){e.className="fl "+cls;});
  document.querySelectorAll(".fso").forEach(function(e){e.className="fso "+cls;});
  document.querySelectorAll(".fsu").forEach(function(e){e.className="fsu "+cls;});
  document.getElementById("nlSc").className="nlsc "+cls;
  document.querySelector(".nli").className="nli "+cls;
  document.querySelector(".nlb").className="nlb "+cls;
}

function render(list) {
  var g=document.getElementById("pgrid"), nr=document.getElementById("noRes");
  document.getElementById("rTx").textContent="Showing "+list.length+" item"+(list.length!==1?"s":"");
  if(!list.length){g.innerHTML="";nr.classList.remove("d-none");return;}
  nr.classList.add("d-none");
  g.innerHTML=list.map(function(p){
    var cls=p.gender;
    var st="";for(var i=0;i<Math.floor(p.rating);i++)st+="star";for(var j=0;j<5-Math.floor(p.rating);j++)st+="-";
    var stars="";for(var i=0;i<Math.floor(p.rating);i++)stars+="&#9733;";for(var j=0;j<5-Math.floor(p.rating);j++)stars+="&#9734;";
    var badge=p.badge?"<div class=\"pbg "+p.badge.toLowerCase()+" "+cls+"\">"+p.badge+"</div>":"";
    var oldp=p.oldPrice?"<span class=\"pol\">$"+p.oldPrice+"</span>":"";
    var dots=p.dots.map(function(c){return "<div class=\"dot\" style=\"background:"+c+";border-color:"+(c==="#ffffff"?"#ddd":c)+"\">&nbsp;</div>";}).join("");
    return "<div class=\"col-6 col-sm-4 col-xl-3\"><div class=\"pc "+cls+"\" onclick=\"opnP("+p.id+")\"><div class=\"piw "+cls+"\"><img src=\""+p.img+"\" alt=\""+p.name+"\" loading=\"lazy\">"+badge+"<button class=\"wb\" onclick=\"event.stopPropagation();togW(this,'"+cls+"')\"><span class=\"icn-svg\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z\"></path></svg></span></button><div class=\"pov "+cls+"\"><button class=\"ob "+cls+"\" onclick=\"event.stopPropagation();opnP("+p.id+")\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z'/><circle cx='12' cy='12' r='3'/></svg></span></button><button class=\"ob "+cls+"\" onclick=\"event.stopPropagation();qadd("+p.id+")\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 8h12l1.2 12.5a1.5 1.5 0 0 1-1.5 1.5H6.3a1.5 1.5 0 0 1-1.5-1.5L6 8z'/><path d='M9 8V6a3 3 0 1 1 6 0v2'/><line x1='12' y1='11.5' x2='12' y2='16.5'/><line x1='9.5' y1='14' x2='14.5' y2='14'/></svg></span></button></div><button class=\"qa "+cls+"\" onclick=\"event.stopPropagation();qadd("+p.id+")\">Quick Add</button></div><div class=\"pi\"><div class=\"pct "+cls+"\">"+p.cat+"</div><div class=\"pnm\">"+p.name+"</div><div class=\"d-flex align-items-center gap-1 mb-1\"><span class=\"pst "+cls+"\">"+stars+"</span><span class=\"prv\">("+p.rev+")</span></div><div class=\"d-flex align-items-baseline gap-2\"><span class=\"ppr "+cls+"\">$"+p.price+"</span>"+oldp+"</div><div class=\"pdt\">"+dots+"</div></div></div></div>";
  }).join("");
}

function dSort(v) {
  if(v==="low") curList.sort(function(a,b){return a.price-b.price;});
  else if(v==="high") curList.sort(function(a,b){return b.price-a.price;});
  else if(v==="rate") curList.sort(function(a,b){return b.rating-a.rating;});
  else { var base=curG==="all"?allP:allP.filter(function(p){return p.gender===curG;}); curList=base.slice(); }
  render(curList);
}

function opnP(id) {
  var p=allP.find(function(x){return x.id===id;});
  if(!p) return;
  curP=p; pdQ=1; pdSz="";
  var cls=p.gender, isM=(cls==="men");
  document.getElementById("pdImg").src=p.img;
  document.getElementById("pdCat").textContent=p.cat;
  document.getElementById("pdCat").className="pdcl "+cls;
  document.getElementById("pdNm").textContent=p.name;
  var stars="";for(var i=0;i<Math.floor(p.rating);i++)stars+="&#9733;";for(var j=0;j<5-Math.floor(p.rating);j++)stars+="&#9734;";
  document.getElementById("pdSt").innerHTML=stars;
  document.getElementById("pdSt").style.color=isM?"var(--go)":"var(--pk)";
  document.getElementById("pdRv").textContent="("+p.rev+" reviews)";
  document.getElementById("pdPr").textContent="$"+p.price.toFixed(2);
  document.getElementById("pdPr").className="pdpr "+cls;
  document.getElementById("pdQ").textContent="1";
  var ol=document.getElementById("pdOl"), of=document.getElementById("pdOf");
  if(p.oldPrice && p.oldPrice>0){ol.textContent="$"+p.oldPrice;ol.style.display="inline";of.textContent=Math.round((1-p.price/p.oldPrice)*100)+"% OFF";of.style.display="inline";of.className="pdof "+cls;}
  else{ol.style.display="none";of.style.display="none";}
  document.getElementById("pdDv").className="pddv "+cls;
  document.getElementById("pdIP").className="col-md-5 pdip "+cls;
  document.getElementById("pdTr").className="pdtr "+cls;
  document.getElementById("pdTr").innerHTML=p.thumbs.map(function(t,i){
    return "<div class=\"pth"+(i===0?" on "+cls:"")+" \" onclick=\"swTh(this,'"+cls+"')\"><img src=\""+t+"\" alt=\"\"></div>";
  }).join("");
  document.getElementById("pdCl").textContent=p.colors[0];
  document.getElementById("pdCols").innerHTML=p.colors.map(function(c,i){
    return "<button class=\"cb "+cls+(i===0?" on":" ")+" \" onclick=\"selC(this,'"+c+"')\">"+c+"</button>";
  }).join("");
  document.getElementById("pdSzL").textContent="Select Size";
  document.getElementById("pdSzs").innerHTML=["XS","S","M","L","XL","XXL"].map(function(s){
    return "<button class=\"szb "+cls+"\" onclick=\"selSz(this,'"+s+"')\">"+s+"</button>";
  }).join("");
  document.getElementById("pdQW").className="qw "+cls+" mb-3";
  document.querySelectorAll(".qb").forEach(function(b){b.className="qb "+cls;});
  document.getElementById("pdAdd").className="pda "+cls;
  document.getElementById("pdBuy").className="pdb "+cls;
  document.getElementById("pdTrust").innerHTML=[{i:"bi-truck",l:"Free Shipping",s:"Over $50"},{i:"bi-arrow-repeat",l:"30-Day Returns",s:"Free"},{i:"bi-shield-check",l:"Secure Pay",s:"100% safe"}].map(function(t){
    return "<div class=\"ti "+cls+"\"><div class=\"tic "+cls+"\"><i class=\"bi "+t.i+"\"></i></div><div class=\"tlb\">"+t.l+"</div><div class=\"tsb\">"+t.s+"</div></div>";
  }).join("");
  new bootstrap.Modal(document.getElementById("pdMod")).show();
}

function swTh(el,cls){
  document.querySelectorAll(".pth").forEach(function(t){t.className="pth";});
  el.className="pth on "+cls;
  document.getElementById("pdImg").src=el.querySelector("img").src;
}
function selC(btn,n){document.querySelectorAll(".cb").forEach(function(b){b.classList.remove("on");});btn.classList.add("on");document.getElementById("pdCl").textContent=n;}
function selSz(btn,s){document.querySelectorAll(".szb").forEach(function(b){b.classList.remove("on");});btn.classList.add("on");pdSz=s;document.getElementById("pdSzL").textContent=s;}
function chQ(d){pdQ=Math.max(1,pdQ+d);document.getElementById("pdQ").textContent=pdQ;}
function addMod(){if(!curP)return;if(!pdSz){toast("Please select a size");return;}addC(curP,pdSz,pdQ);bootstrap.Modal.getInstance(document.getElementById("pdMod")).hide();}
function buyNow(){if(!curP)return;if(!pdSz){toast("Please select a size");return;}addC(curP,pdSz,pdQ);bootstrap.Modal.getInstance(document.getElementById("pdMod")).hide();new bootstrap.Offcanvas(document.getElementById("cOC")).show();}

function addC(p,sz,qty){
  var ex=cart.find(function(i){return i.id===p.id&&i.size===sz;});
  if(ex) ex.qty+=qty;
  else cart.push(Object.assign({},p,{size:sz,qty:qty}));
  updCart();
  toast(p.name+" added to cart");
}
function qadd(id){var p=allP.find(function(x){return x.id===id;});if(p) addC(p,"M",1);}
function updCart(){
  var tot=cart.reduce(function(s,i){return s+i.price*i.qty;},0);
  var cnt=cart.reduce(function(s,i){return s+i.qty;},0);
  document.getElementById("cCnt").textContent=cnt;
  document.getElementById("cTot").textContent="$"+tot.toFixed(2);
  var b=document.getElementById("cBody");
  if(!cart.length){b.innerHTML="<div class=\"text-center py-5\"><span class=\"icn-svg\" style=\"font-size:46px;color:#eee\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 8h12l1.2 12.5a1.5 1.5 0 0 1-1.5 1.5H6.3a1.5 1.5 0 0 1-1.5-1.5L6 8z'/><path d='M9 8V6a3 3 0 1 1 6 0v2'/></svg></span><div class=\"mt-3\" style=\"font-size:14px;color:var(--tl)\">Your cart is empty.</div></div>";return;}
  b.innerHTML=cart.map(function(it,idx){
    return "<div class=\"cr\"><div class=\"cri\"><img src=\""+it.img+"\" alt=\""+it.name+"\"></div><div class=\"flex-grow-1\"><div class=\"cnm\">"+it.name+"</div><div class=\"cmt\">Size: "+it.size+"</div><div class=\"cpr\">$"+(it.price*it.qty).toFixed(2)+"</div><div class=\"cqc\"><button class=\"cqb\" onclick=\"cq("+idx+",-1)\">-</button><span style=\"font-size:13px;min-width:18px;text-align:center\">"+it.qty+"</span><button class=\"cqb\" onclick=\"cq("+idx+",1)\">+</button></div></div><button onclick=\"remI("+idx+")\" style=\"background:none;border:none;color:#ccc;font-size:17px;cursor:pointer;align-self:flex-start\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round'><line x1='5' y1='5' x2='19' y2='19'/><line x1='19' y1='5' x2='5' y2='19'/></svg></span></button></div>";
  }).join("");
}
function cq(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);updCart();}
function remI(i){cart.splice(i,1);updCart();}

function checkout(){
  if(!cart.length){toast("Your cart is empty");return;}
  buildCkoSummary();
  var ocEl=document.getElementById("cOC");
  function showCkoModal(){
    var m=bootstrap.Modal.getOrCreateInstance(document.getElementById("ckoMod"));
    m.show();
  }
  if(ocEl.classList.contains("show")){
    ocEl.addEventListener("hidden.bs.offcanvas", showCkoModal, {once:true});
    var oc=bootstrap.Offcanvas.getOrCreateInstance(ocEl);
    oc.hide();
  } else {
    showCkoModal();
  }
}
function selPay(el){
  document.querySelectorAll(".pay-opt").forEach(function(o){o.classList.remove("sel");});
  el.closest(".pay-opt").classList.add("sel");
}
function buildCkoSummary(){
  var sub=cart.reduce(function(s,i){return s+i.price*i.qty;},0);
  var ship=sub>50?0:5;
  var total=sub+ship;
  var rows=cart.map(function(it){
    return "<div class=\"cko-sumrow\"><span>"+it.name+" x"+it.qty+" (Size "+it.size+")</span><span>$"+(it.price*it.qty).toFixed(2)+"</span></div>";
  }).join("");
  rows+="<div class=\"cko-sumrow\"><span>Subtotal</span><span>$"+sub.toFixed(2)+"</span></div>";
  rows+="<div class=\"cko-sumrow\"><span>Shipping</span><span>"+(ship===0?"Free":"$"+ship.toFixed(2))+"</span></div>";
  rows+="<div class=\"cko-sumrow total\"><span>Total</span><span class=\"amt\">$"+total.toFixed(2)+"</span></div>";
  document.getElementById("ckoSummary").innerHTML=rows;
}
function placeOrder(){
  var name=document.getElementById("ckName").value.trim();
  var phone=document.getElementById("ckPhone").value.trim();
  var email=document.getElementById("ckEmail").value.trim();
  var addr=document.getElementById("ckAddr").value.trim();
  var city=document.getElementById("ckCity").value.trim();
  var ok=true;
  document.getElementById("ckErrName").style.display=name?"none":"block";
  if(!name) ok=false;
  var phoneOk=phone.length>=8;
  document.getElementById("ckErrPhone").style.display=phoneOk?"none":"block";
  if(!phoneOk) ok=false;
  var emailOk=email.indexOf("@")>0 && email.indexOf(".")>0;
  document.getElementById("ckErrEmail").style.display=emailOk?"none":"block";
  if(!emailOk) ok=false;
  document.getElementById("ckErrAddr").style.display=addr?"none":"block";
  if(!addr) ok=false;
  document.getElementById("ckErrCity").style.display=city?"none":"block";
  if(!city) ok=false;
  if(!ok) return;
  var payMEl=document.querySelector("input[name=payM]:checked");
  var payM=payMEl?payMEl.value:"cod";
  var payLabels={cod:"Cash on Delivery",aba:"ABA / Bank Transfer",khqr:"KHQR",card:"Credit / Debit Card"};
  var orderId="RM"+Math.floor(100000+Math.random()*900000);
  var sub=cart.reduce(function(s,i){return s+i.price*i.qty;},0);
  var ship=sub>50?0:5;
  var total=sub+ship;
  document.getElementById("ckoContent").innerHTML=
    "<div class=\"cko-success\">"
    +"<div class=\"ic\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor'><circle cx='12' cy='12' r='10'/><path d='M8 12.5l2.5 2.5L16 9' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span></div>"
    +"<h4>ORDER PLACED</h4>"
    +"<p>Thank you, "+name+"! Your order has been received.</p>"
    +"<div class=\"ordid\">Order ID: "+orderId+"</div>"
    +"<div style=\"font-size:13px;color:var(--tl);margin-top:10px;line-height:1.8\">"
    +"Payment Method: <strong>"+payLabels[payM]+"</strong><br>"
    +"Shipping to: "+addr+", "+city+"<br>"
    +"Total: <strong style=\"color:var(--pd)\">$"+total.toFixed(2)+"</strong>"
    +"</div>"
    +"<button class=\"cko-place\" style=\"margin-top:20px\" onclick=\"closeCko()\">Continue Shopping</button>"
    +"</div>";
  cart=[];
  updCart();
}
function closeCko(){
  bootstrap.Modal.getInstance(document.getElementById("ckoMod")).hide();
  setTimeout(function(){location.reload();},300);
}


function lSrch(q){
  var s=q.toLowerCase().trim(), dd=document.getElementById("sDrop");
  if(!s){dd.classList.remove("open");return;}
  var found=allP.filter(function(p){return p.name.toLowerCase().indexOf(s)>=0||p.cat.toLowerCase().indexOf(s)>=0;});
  dd.innerHTML=found.length?found.slice(0,6).map(function(p){return "<div class=\"sr\" onclick=\"opnP("+p.id+")\" ><img src=\""+p.img+"\" alt=\"\"><div><div style=\"font-size:13px;font-weight:500\">"+p.name+"</div><div style=\"font-size:11px;color:#999\">"+p.cat+" $"+p.price+"</div></div></div>";}).join(""):"<div style=\"padding:14px;font-size:13px;color:#999\">No results.</div>";
  dd.classList.add("open");
}
function dSrch(){lSrch(document.getElementById("sIn").value);document.getElementById("prods").scrollIntoView({behavior:"smooth"});}
document.addEventListener("click",function(e){if(!e.target.closest(".mnav"))document.getElementById("sDrop").classList.remove("open");});
function clearF(){var base=curG==="all"?allP:allP.filter(function(p){return p.gender===curG;});curList=base.slice();render(curList);toast("Filters cleared");}
var SVG_HEART='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z"></path></svg>';
var SVG_HEART_FILL='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z"></path></svg>';
function togW(btn,cls){btn.classList.toggle("on");var ic=btn.querySelector("span");ic.innerHTML=btn.classList.contains("on")?SVG_HEART_FILL:SVG_HEART;btn.style.color=btn.classList.contains("on")?(cls==="men"?"var(--go)":"var(--pk)"):"" ;}
function subNL(){var v=document.getElementById("nlE").value;if(!v||v.indexOf("@")<0){toast("Please enter a valid email");return;}toast("You are subscribed! Welcome to RM Luxury.");document.getElementById("nlE").value="";}
var tT;
function toast(msg){document.getElementById("tMsg").textContent=msg;var t=document.getElementById("tBox");t.classList.add("show");clearTimeout(tT);tT=setTimeout(function(){t.classList.remove("show");},3200);}
document.querySelectorAll(".sw").forEach(function(s){s.addEventListener("click",function(){s.parentElement.querySelectorAll(".sw").forEach(function(x){x.classList.remove("on");});s.classList.add("on");});});


var SVG_MOON='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
var SVG_SUN='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"></line><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"></line><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"></line></svg>';
function toggleTheme(){
  var html=document.documentElement;
  var cur=html.getAttribute("data-theme");
  var isDark=cur==="dark";
  if(isDark){
    html.removeAttribute("data-theme");
    document.getElementById("themeIcon").innerHTML=SVG_MOON;
    localStorage.setItem("rmTheme","light");
  }else{
    html.setAttribute("data-theme","dark");
    document.getElementById("themeIcon").innerHTML=SVG_SUN;
    localStorage.setItem("rmTheme","dark");
  }
}
(function(){
  var saved=localStorage.getItem("rmTheme");
  if(saved==="dark"){
    document.documentElement.setAttribute("data-theme","dark");
  }
})();
document.addEventListener("DOMContentLoaded",function(){
  if(document.documentElement.getAttribute("data-theme")==="dark"){
    document.getElementById("themeIcon").innerHTML=SVG_SUN;
  }
});

var authMode="signin", isLoggedIn=false, curUserName="";

function openAuth(){
  if(isLoggedIn){
    bootstrap.Modal.getOrCreateInstance(document.getElementById("authMod")).show();
    showAccountPanel();
    return;
  }
  bootstrap.Modal.getOrCreateInstance(document.getElementById("authMod")).show();
  switchAuthTab("signin");
}

function switchAuthTab(mode){
  authMode=mode;
  var siT=document.getElementById("atSignIn"), suT=document.getElementById("atSignUp");
  if(!siT||!suT) return;
  if(mode==="signin"){
    siT.classList.add("on"); suT.classList.remove("on");
    document.getElementById("authSubmitBtn").innerHTML="SIGN IN &rarr;";
    document.getElementById("authFP").style.display="inline-block";
    document.getElementById("authFoot").innerHTML="New to RM Luxury? <a onclick=\"switchAuthTab('signup')\">Create an account</a>";
  }else{
    suT.classList.add("on"); siT.classList.remove("on");
    document.getElementById("authSubmitBtn").innerHTML="CREATE ACCOUNT &rarr;";
    document.getElementById("authFP").style.display="none";
    document.getElementById("authFoot").innerHTML="Already have an account? <a onclick=\"switchAuthTab('signin')\">Sign in</a>";
  }
  document.getElementById("authErrEmail").style.display="none";
  document.getElementById("authErrPass").style.display="none";
}

function doAuth(){
  var email=document.getElementById("authEmail").value.trim();
  var pass=document.getElementById("authPass").value;
  var ok=true;
  var emailOk=email.indexOf("@")>0 && email.indexOf(".")>0;
  document.getElementById("authErrEmail").style.display=emailOk?"none":"block";
  if(!emailOk) ok=false;
  var passOk=pass.length>=6;
  document.getElementById("authErrPass").style.display=passOk?"none":"block";
  if(!passOk) ok=false;
  if(!ok) return;
  isLoggedIn=true;
  curUserName=email.split("@")[0];
  var verb=authMode==="signin"?"Welcome back":"Account created";
  document.getElementById("authContent").innerHTML=
    "<div class=\"auth-success\">"
    +"<div class=\"ic2\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor'><circle cx='12' cy='12' r='10'/><path d='M8 12.5l2.5 2.5L16 9' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span></div>"
    +"<h4>"+verb.toUpperCase()+"</h4>"
    +"<p>Hi "+curUserName+", you are now signed in to RM Luxury.</p>"
    +"<button class=\"auth-submit\" style=\"margin-top:20px\" onclick=\"bootstrap.Modal.getInstance(document.getElementById('authMod')).hide()\">Continue Shopping</button>"
    +"</div>";
  toast("Signed in as "+curUserName);
}

function socialAuth(provider){
  isLoggedIn=true;
  curUserName=provider+" User";
  bootstrap.Modal.getInstance(document.getElementById("authMod")).hide();
  toast("Connected with "+provider+" - Welcome!");
}

function showAccountPanel(){
  document.getElementById("authContent").innerHTML=
    "<div class=\"auth-hero\">"
    +"<button type=\"button\" class=\"ac\" data-bs-dismiss=\"modal\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round'><line x1='5' y1='5' x2='19' y2='19'/><line x1='19' y1='5' x2='5' y2='19'/></svg></span></button>"
    +"<div class=\"ic\">RM</div>"
    +"<h3>RM LUXURY</h3>"
    +"<p>Clothes Collection &middot; Members Club</p>"
    +"</div>"
    +"<div class=\"auth-success\">"
    +"<div class=\"ic2\"><span class=\"icn-svg\"><svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='4'></circle><path d='M4 21c0-4 3.6-6 8-6s8 2 8 6'></path></svg></span></div>"
    +"<h4>HI, "+curUserName.toUpperCase()+"</h4>"
    +"<p>You are signed in to RM Luxury.</p>"
    +"<button class=\"auth-submit\" style=\"margin-top:20px\" onclick=\"signOut()\">Sign Out</button>"
    +"</div>";
}

function signOut(){
  isLoggedIn=false; curUserName="";
  bootstrap.Modal.getInstance(document.getElementById("authMod")).hide();
  toast("Signed out");
}

swG("all");
