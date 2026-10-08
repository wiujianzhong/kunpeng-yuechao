(()=>{/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Sr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Mr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},T6=0,Va=1,Z6=2;var Qa=1,au=2,En=3,sr=0,en=1,Ot=2,pr=0,Wr=1,_a=2,$a=3,ef=4,W6=5,dr=100,N6=101,B6=102,E6=103,F6=104,R6=200,U6=201,V6=202,Q6=203,Ys=204,Ds=205,_6=206,$6=207,ep=208,tp=209,np=210,rp=211,ip=212,op=213,sp=214,fu=0,pu=1,hu=2,Nr=3,cu=4,qu=5,gu=6,mu=7,tf=0,up=1,ap=2,hr=0,fp=1,pp=2,hp=3,yu=4,cp=5,qp=6,gp=7;var nf=300,_r=301,$r=302,Bi=303,Au=304,Vo=306,$t=1e3,In=1001,Li=1002,Ut=1003,Hu=1004;var ei=1005;var wt=1006,Ei=1007;var An=1008;var Dn=1009,rf=1010,of=1011,Fi=1012,lu=1013,Cr=1014,tn=1015,Hn=1016,vu=1017,Ou=1018,Ri=1020,sf=35902,uf=35899,af=1021,ff=1022,un=1023,Si=1026,Ui=1027,ju=1028,du=1029,pf=1030,Ku=1031;var Iu=1033,Qo=33776,_o=33777,$o=33778,es=33779,Pu=35840,bu=35841,xu=35842,zu=35843,Lu=36196,Su=37492,Mu=37496,Cu=37808,wu=37809,Gu=37810,Yu=37811,Du=37812,ku=37813,Ju=37814,Xu=37815,Tu=37816,Zu=37817,Wu=37818,Nu=37819,Bu=37820,Eu=37821,Fu=36492,Ru=36494,Uu=36495,Vu=36283,Qu=36284,_u=36285,$u=36286;var Br=2300,Mi=2301,Gs=2302,Da=2400,ka=2401,Ja=2402;var mp=3200,yp=3201;var hf=0,Ap=1,an="",ft="srgb",ur="srgb-linear",Ao="linear",At="srgb";var Tr=7680;var Xa=519,Hp=512,lp=513,vp=514,cf=515,Op=516,jp=517,dp=518,Kp=519,Ta=35044;var qf="300 es",wn=2e3,Ho=2001;var Zn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let o=0,s=i.length;o<s;o++)i[o].call(this,e);e.target=null}}},Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],h6=1234567,qo=Math.PI/180,Ci=180/Math.PI;function ti(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[r&255]+Ft[r>>8&255]+Ft[r>>16&255]+Ft[r>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function tt(r,e,t){return Math.max(e,Math.min(t,r))}function gf(r,e){return(r%e+e)%e}function Eh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Fh(r,e,t){return r!==e?(t-r)/(e-r):0}function go(r,e,t){return(1-t)*r+t*e}function Rh(r,e,t,n){return go(r,e,1-Math.exp(-t*n))}function Uh(r,e=1){return e-Math.abs(gf(r,e*2)-e)}function Vh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Qh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function _h(r,e){return r+Math.floor(Math.random()*(e-r+1))}function $h(r,e){return r+Math.random()*(e-r)}function e7(r){return r*(.5-Math.random())}function t7(r){r!==void 0&&(h6=r);let e=h6+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function n7(r){return r*qo}function r7(r){return r*Ci}function i7(r){return(r&r-1)===0&&r!==0}function o7(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function s7(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function u7(r,e,t,n,i){let o=Math.cos,s=Math.sin,u=o(t/2),a=s(t/2),f=o((e+n)/2),p=s((e+n)/2),h=o((e-n)/2),q=s((e-n)/2),c=o((n-e)/2),m=s((n-e)/2);switch(i){case"XYX":r.set(u*p,a*h,a*q,u*f);break;case"YZY":r.set(a*q,u*p,a*h,u*f);break;case"ZXZ":r.set(a*h,a*q,u*p,u*f);break;case"XZX":r.set(u*p,a*m,a*c,u*f);break;case"YXY":r.set(a*c,u*p,a*m,u*f);break;case"ZYZ":r.set(a*m,a*c,u*p,u*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function bi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _t(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Fn={DEG2RAD:qo,RAD2DEG:Ci,generateUUID:ti,clamp:tt,euclideanModulo:gf,mapLinear:Eh,inverseLerp:Fh,lerp:go,damp:Rh,pingpong:Uh,smoothstep:Vh,smootherstep:Qh,randInt:_h,randFloat:$h,randFloatSpread:e7,seededRandom:t7,degToRad:n7,radToDeg:r7,isPowerOfTwo:i7,ceilPowerOfTwo:o7,floorPowerOfTwo:s7,setQuaternionFromProperEuler:u7,normalize:_t,denormalize:bi},se=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*i+e.x,this.y=o*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},on=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,s,u){let a=n[i+0],f=n[i+1],p=n[i+2],h=n[i+3],q=o[s+0],c=o[s+1],m=o[s+2],A=o[s+3];if(u===0){e[t+0]=a,e[t+1]=f,e[t+2]=p,e[t+3]=h;return}if(u===1){e[t+0]=q,e[t+1]=c,e[t+2]=m,e[t+3]=A;return}if(h!==A||a!==q||f!==c||p!==m){let y=1-u,g=a*q+f*c+p*m+h*A,K=g>=0?1:-1,j=1-g*g;if(j>Number.EPSILON){let I=Math.sqrt(j),P=Math.atan2(I,g*K);y=Math.sin(y*P)/I,u=Math.sin(u*P)/I}let H=u*K;if(a=a*y+q*H,f=f*y+c*H,p=p*y+m*H,h=h*y+A*H,y===1-u){let I=1/Math.sqrt(a*a+f*f+p*p+h*h);a*=I,f*=I,p*=I,h*=I}}e[t]=a,e[t+1]=f,e[t+2]=p,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,o,s){let u=n[i],a=n[i+1],f=n[i+2],p=n[i+3],h=o[s],q=o[s+1],c=o[s+2],m=o[s+3];return e[t]=u*m+p*h+a*c-f*q,e[t+1]=a*m+p*q+f*h-u*c,e[t+2]=f*m+p*c+u*q-a*h,e[t+3]=p*m-u*h-a*q-f*c,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,o=e._z,s=e._order,u=Math.cos,a=Math.sin,f=u(n/2),p=u(i/2),h=u(o/2),q=a(n/2),c=a(i/2),m=a(o/2);switch(s){case"XYZ":this._x=q*p*h+f*c*m,this._y=f*c*h-q*p*m,this._z=f*p*m+q*c*h,this._w=f*p*h-q*c*m;break;case"YXZ":this._x=q*p*h+f*c*m,this._y=f*c*h-q*p*m,this._z=f*p*m-q*c*h,this._w=f*p*h+q*c*m;break;case"ZXY":this._x=q*p*h-f*c*m,this._y=f*c*h+q*p*m,this._z=f*p*m+q*c*h,this._w=f*p*h-q*c*m;break;case"ZYX":this._x=q*p*h-f*c*m,this._y=f*c*h+q*p*m,this._z=f*p*m-q*c*h,this._w=f*p*h+q*c*m;break;case"YZX":this._x=q*p*h+f*c*m,this._y=f*c*h+q*p*m,this._z=f*p*m-q*c*h,this._w=f*p*h-q*c*m;break;case"XZY":this._x=q*p*h-f*c*m,this._y=f*c*h-q*p*m,this._z=f*p*m+q*c*h,this._w=f*p*h+q*c*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],o=t[8],s=t[1],u=t[5],a=t[9],f=t[2],p=t[6],h=t[10],q=n+u+h;if(q>0){let c=.5/Math.sqrt(q+1);this._w=.25/c,this._x=(p-a)*c,this._y=(o-f)*c,this._z=(s-i)*c}else if(n>u&&n>h){let c=2*Math.sqrt(1+n-u-h);this._w=(p-a)/c,this._x=.25*c,this._y=(i+s)/c,this._z=(o+f)/c}else if(u>h){let c=2*Math.sqrt(1+u-n-h);this._w=(o-f)/c,this._x=(i+s)/c,this._y=.25*c,this._z=(a+p)/c}else{let c=2*Math.sqrt(1+h-n-u);this._w=(s-i)/c,this._x=(o+f)/c,this._y=(a+p)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,o=e._z,s=e._w,u=t._x,a=t._y,f=t._z,p=t._w;return this._x=n*p+s*u+i*f-o*a,this._y=i*p+s*a+o*u-n*f,this._z=o*p+s*f+n*a-i*u,this._w=s*p-n*u-i*a-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,o=this._z,s=this._w,u=s*e._w+n*e._x+i*e._y+o*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=s,this._x=n,this._y=i,this._z=o,this;let a=1-u*u;if(a<=Number.EPSILON){let c=1-t;return this._w=c*s+t*this._w,this._x=c*n+t*this._x,this._y=c*i+t*this._y,this._z=c*o+t*this._z,this.normalize(),this}let f=Math.sqrt(a),p=Math.atan2(f,u),h=Math.sin((1-t)*p)/f,q=Math.sin(t*p)/f;return this._w=s*h+this._w*q,this._x=n*h+this._x*q,this._y=i*h+this._y*q,this._z=o*h+this._z*q,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},M=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(c6.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(c6.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,o=e.x,s=e.y,u=e.z,a=e.w,f=2*(s*i-u*n),p=2*(u*t-o*i),h=2*(o*n-s*t);return this.x=t+a*f+s*h-u*p,this.y=n+a*p+u*f-o*h,this.z=i+a*h+o*p-s*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,o=e.z,s=t.x,u=t.y,a=t.z;return this.x=i*a-o*u,this.y=o*s-n*a,this.z=n*u-i*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ha.copy(this).projectOnVector(e),this.sub(ha)}reflect(e){return this.sub(ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ha=new M,c6=new on,nt=class r{constructor(e,t,n,i,o,s,u,a,f){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,u,a,f)}set(e,t,n,i,o,s,u,a,f){let p=this.elements;return p[0]=e,p[1]=i,p[2]=u,p[3]=t,p[4]=o,p[5]=a,p[6]=n,p[7]=s,p[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,o=this.elements,s=n[0],u=n[3],a=n[6],f=n[1],p=n[4],h=n[7],q=n[2],c=n[5],m=n[8],A=i[0],y=i[3],g=i[6],K=i[1],j=i[4],H=i[7],I=i[2],P=i[5],z=i[8];return o[0]=s*A+u*K+a*I,o[3]=s*y+u*j+a*P,o[6]=s*g+u*H+a*z,o[1]=f*A+p*K+h*I,o[4]=f*y+p*j+h*P,o[7]=f*g+p*H+h*z,o[2]=q*A+c*K+m*I,o[5]=q*y+c*j+m*P,o[8]=q*g+c*H+m*z,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],u=e[5],a=e[6],f=e[7],p=e[8];return t*s*p-t*u*f-n*o*p+n*u*a+i*o*f-i*s*a}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],u=e[5],a=e[6],f=e[7],p=e[8],h=p*s-u*f,q=u*a-p*o,c=f*o-s*a,m=t*h+n*q+i*c;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let A=1/m;return e[0]=h*A,e[1]=(i*f-p*n)*A,e[2]=(u*n-i*s)*A,e[3]=q*A,e[4]=(p*t-i*a)*A,e[5]=(i*o-u*t)*A,e[6]=c*A,e[7]=(n*a-f*t)*A,e[8]=(s*t-n*o)*A,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,s,u){let a=Math.cos(o),f=Math.sin(o);return this.set(n*a,n*f,-n*(a*s+f*u)+s+e,-i*f,i*a,-i*(-f*s+a*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(ca.makeScale(e,t)),this}rotate(e){return this.premultiply(ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ca=new nt;function mf(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function wi(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ip(){let r=wi("canvas");return r.style.display="block",r}var q6={};function Gi(r){r in q6||(q6[r]=!0,console.warn(r))}function Pp(r,e,t){return new Promise(function(n,i){function o(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}var g6=new nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),m6=new nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function a7(){let r={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(i,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===At&&(i.r=or(i.r),i.g=or(i.g),i.b=or(i.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[o].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===At&&(i.r=xi(i.r),i.g=xi(i.g),i.b=xi(i.b))),i},workingToColorSpace:function(i,o){return this.convert(i,this.workingColorSpace,o)},colorSpaceToWorking:function(i,o){return this.convert(i,o,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===an?Ao:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,o=this.workingColorSpace){return i.fromArray(this.spaces[o].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,o,s){return i.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,o){return Gi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,o)},toWorkingColorSpace:function(i,o){return Gi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,o)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ur]:{primaries:e,whitePoint:n,transfer:Ao,toXYZ:g6,fromXYZ:m6,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ft},outputColorSpaceConfig:{drawingBufferColorSpace:ft}},[ft]:{primaries:e,whitePoint:n,transfer:At,toXYZ:g6,fromXYZ:m6,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ft}}}),r}var ct=a7();function or(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function xi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var qi,Yi=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qi===void 0&&(qi=wi("canvas")),qi.width=e.width,qi.height=e.height;let i=qi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=qi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=wi("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let s=0;s<o.length;s++)o[s]=or(o[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(or(t[n]/255)*255):t[n]=or(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},f7=0,Kr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f7++}),this.uuid=ti(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let s=0,u=i.length;s<u;s++)i[s].isDataTexture?o.push(qa(i[s].image)):o.push(qa(i[s]))}else o=qa(i);n.url=o}return t||(e.images[this.uuid]=n),n}};function qa(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Yi.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var p7=0,ga=new M,Wt=class r extends Zn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=In,i=In,o=wt,s=An,u=un,a=Dn,f=r.DEFAULT_ANISOTROPY,p=an){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p7++}),this.uuid=ti(),this.name="",this.source=new Kr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=f,this.format=u,this.internalFormat=null,this.type=a,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ga).x}get height(){return this.source.getSize(ga).y}get depth(){return this.source.getSize(ga).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $t:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case Li:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $t:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case Li:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=nf;Wt.DEFAULT_ANISOTROPY=1;var vt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o,a=e.elements,f=a[0],p=a[4],h=a[8],q=a[1],c=a[5],m=a[9],A=a[2],y=a[6],g=a[10];if(Math.abs(p-q)<.01&&Math.abs(h-A)<.01&&Math.abs(m-y)<.01){if(Math.abs(p+q)<.1&&Math.abs(h+A)<.1&&Math.abs(m+y)<.1&&Math.abs(f+c+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let j=(f+1)/2,H=(c+1)/2,I=(g+1)/2,P=(p+q)/4,z=(h+A)/4,b=(m+y)/4;return j>H&&j>I?j<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(j),i=P/n,o=z/n):H>I?H<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(H),n=P/i,o=b/i):I<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(I),n=z/o,i=b/o),this.set(n,i,o,t),this}let K=Math.sqrt((y-m)*(y-m)+(h-A)*(h-A)+(q-p)*(q-p));return Math.abs(K)<.001&&(K=1),this.x=(y-m)/K,this.y=(h-A)/K,this.z=(q-p)/K,this.w=Math.acos((f+c+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ks=class extends Zn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);let i={width:e,height:t,depth:n.depth},o=new Wt(i);this.textures=[];let s=n.count;for(let u=0;u<s;u++)this.textures[u]=o.clone(),this.textures[u].isRenderTargetTexture=!0,this.textures[u].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Kr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends ks{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},lo=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Js=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wn=class{constructor(e=new M(1/0,1/0,1/0),t=new M(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,u=o.count;s<u;s++)e.isMesh===!0?e.getVertexPosition(s,Sn):Sn.fromBufferAttribute(o,s),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hs.copy(n.boundingBox)),hs.applyMatrix4(e.matrixWorld),this.union(hs)}let i=e.children;for(let o=0,s=i.length;o<s;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oo),cs.subVectors(this.max,oo),gi.subVectors(e.a,oo),mi.subVectors(e.b,oo),yi.subVectors(e.c,oo),yr.subVectors(mi,gi),Ar.subVectors(yi,mi),Dr.subVectors(gi,yi);let t=[0,-yr.z,yr.y,0,-Ar.z,Ar.y,0,-Dr.z,Dr.y,yr.z,0,-yr.x,Ar.z,0,-Ar.x,Dr.z,0,-Dr.x,-yr.y,yr.x,0,-Ar.y,Ar.x,0,-Dr.y,Dr.x,0];return!ma(t,gi,mi,yi,cs)||(t=[1,0,0,0,1,0,0,0,1],!ma(t,gi,mi,yi,cs))?!1:(qs.crossVectors(yr,Ar),t=[qs.x,qs.y,qs.z],ma(t,gi,mi,yi,cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},_n=[new M,new M,new M,new M,new M,new M,new M,new M],Sn=new M,hs=new Wn,gi=new M,mi=new M,yi=new M,yr=new M,Ar=new M,Dr=new M,oo=new M,cs=new M,qs=new M,kr=new M;function ma(r,e,t,n,i){for(let o=0,s=r.length-3;o<=s;o+=3){kr.fromArray(r,o);let u=i.x*Math.abs(kr.x)+i.y*Math.abs(kr.y)+i.z*Math.abs(kr.z),a=e.dot(kr),f=t.dot(kr),p=n.dot(kr);if(Math.max(-Math.max(a,f,p),Math.min(a,f,p))>u)return!1}return!0}var h7=new Wn,so=new M,ya=new M,ar=class{constructor(e=new M,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):h7.setFromPoints(e).getCenter(n);let i=0;for(let o=0,s=e.length;o<s;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;so.subVectors(e,this.center);let t=so.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(so,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ya.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(so.copy(e.center).add(ya)),this.expandByPoint(so.copy(e.center).sub(ya))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},$n=new M,Aa=new M,gs=new M,Hr=new M,Ha=new M,ms=new M,la=new M,Ir=class{constructor(e=new M,t=new M(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Aa.copy(e).add(t).multiplyScalar(.5),gs.copy(t).sub(e).normalize(),Hr.copy(this.origin).sub(Aa);let o=e.distanceTo(t)*.5,s=-this.direction.dot(gs),u=Hr.dot(this.direction),a=-Hr.dot(gs),f=Hr.lengthSq(),p=Math.abs(1-s*s),h,q,c,m;if(p>0)if(h=s*a-u,q=s*u-a,m=o*p,h>=0)if(q>=-m)if(q<=m){let A=1/p;h*=A,q*=A,c=h*(h+s*q+2*u)+q*(s*h+q+2*a)+f}else q=o,h=Math.max(0,-(s*q+u)),c=-h*h+q*(q+2*a)+f;else q=-o,h=Math.max(0,-(s*q+u)),c=-h*h+q*(q+2*a)+f;else q<=-m?(h=Math.max(0,-(-s*o+u)),q=h>0?-o:Math.min(Math.max(-o,-a),o),c=-h*h+q*(q+2*a)+f):q<=m?(h=0,q=Math.min(Math.max(-o,-a),o),c=q*(q+2*a)+f):(h=Math.max(0,-(s*o+u)),q=h>0?o:Math.min(Math.max(-o,-a),o),c=-h*h+q*(q+2*a)+f);else q=s>0?-o:o,h=Math.max(0,-(s*q+u)),c=-h*h+q*(q+2*a)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Aa).addScaledVector(gs,q),c}intersectSphere(e,t){$n.subVectors(e.center,this.origin);let n=$n.dot(this.direction),i=$n.dot($n)-n*n,o=e.radius*e.radius;if(i>o)return null;let s=Math.sqrt(o-i),u=n-s,a=n+s;return a<0?null:u<0?this.at(a,t):this.at(u,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,s,u,a,f=1/this.direction.x,p=1/this.direction.y,h=1/this.direction.z,q=this.origin;return f>=0?(n=(e.min.x-q.x)*f,i=(e.max.x-q.x)*f):(n=(e.max.x-q.x)*f,i=(e.min.x-q.x)*f),p>=0?(o=(e.min.y-q.y)*p,s=(e.max.y-q.y)*p):(o=(e.max.y-q.y)*p,s=(e.min.y-q.y)*p),n>s||o>i||((o>n||isNaN(n))&&(n=o),(s<i||isNaN(i))&&(i=s),h>=0?(u=(e.min.z-q.z)*h,a=(e.max.z-q.z)*h):(u=(e.max.z-q.z)*h,a=(e.min.z-q.z)*h),n>a||u>i)||((u>n||n!==n)&&(n=u),(a<i||i!==i)&&(i=a),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,n,i,o){Ha.subVectors(t,e),ms.subVectors(n,e),la.crossVectors(Ha,ms);let s=this.direction.dot(la),u;if(s>0){if(i)return null;u=1}else if(s<0)u=-1,s=-s;else return null;Hr.subVectors(this.origin,e);let a=u*this.direction.dot(ms.crossVectors(Hr,ms));if(a<0)return null;let f=u*this.direction.dot(Ha.cross(Hr));if(f<0||a+f>s)return null;let p=-u*Hr.dot(la);return p<0?null:this.at(p/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pt=class r{constructor(e,t,n,i,o,s,u,a,f,p,h,q,c,m,A,y){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,u,a,f,p,h,q,c,m,A,y)}set(e,t,n,i,o,s,u,a,f,p,h,q,c,m,A,y){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=o,g[5]=s,g[9]=u,g[13]=a,g[2]=f,g[6]=p,g[10]=h,g[14]=q,g[3]=c,g[7]=m,g[11]=A,g[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Ai.setFromMatrixColumn(e,0).length(),o=1/Ai.setFromMatrixColumn(e,1).length(),s=1/Ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,o=e.z,s=Math.cos(n),u=Math.sin(n),a=Math.cos(i),f=Math.sin(i),p=Math.cos(o),h=Math.sin(o);if(e.order==="XYZ"){let q=s*p,c=s*h,m=u*p,A=u*h;t[0]=a*p,t[4]=-a*h,t[8]=f,t[1]=c+m*f,t[5]=q-A*f,t[9]=-u*a,t[2]=A-q*f,t[6]=m+c*f,t[10]=s*a}else if(e.order==="YXZ"){let q=a*p,c=a*h,m=f*p,A=f*h;t[0]=q+A*u,t[4]=m*u-c,t[8]=s*f,t[1]=s*h,t[5]=s*p,t[9]=-u,t[2]=c*u-m,t[6]=A+q*u,t[10]=s*a}else if(e.order==="ZXY"){let q=a*p,c=a*h,m=f*p,A=f*h;t[0]=q-A*u,t[4]=-s*h,t[8]=m+c*u,t[1]=c+m*u,t[5]=s*p,t[9]=A-q*u,t[2]=-s*f,t[6]=u,t[10]=s*a}else if(e.order==="ZYX"){let q=s*p,c=s*h,m=u*p,A=u*h;t[0]=a*p,t[4]=m*f-c,t[8]=q*f+A,t[1]=a*h,t[5]=A*f+q,t[9]=c*f-m,t[2]=-f,t[6]=u*a,t[10]=s*a}else if(e.order==="YZX"){let q=s*a,c=s*f,m=u*a,A=u*f;t[0]=a*p,t[4]=A-q*h,t[8]=m*h+c,t[1]=h,t[5]=s*p,t[9]=-u*p,t[2]=-f*p,t[6]=c*h+m,t[10]=q-A*h}else if(e.order==="XZY"){let q=s*a,c=s*f,m=u*a,A=u*f;t[0]=a*p,t[4]=-h,t[8]=f*p,t[1]=q*h+A,t[5]=s*p,t[9]=c*h-m,t[2]=m*h-c,t[6]=u*p,t[10]=A*h+q}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(c7,e,q7)}lookAt(e,t,n){let i=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),lr.crossVectors(n,cn),lr.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),lr.crossVectors(n,cn)),lr.normalize(),ys.crossVectors(cn,lr),i[0]=lr.x,i[4]=ys.x,i[8]=cn.x,i[1]=lr.y,i[5]=ys.y,i[9]=cn.y,i[2]=lr.z,i[6]=ys.z,i[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,o=this.elements,s=n[0],u=n[4],a=n[8],f=n[12],p=n[1],h=n[5],q=n[9],c=n[13],m=n[2],A=n[6],y=n[10],g=n[14],K=n[3],j=n[7],H=n[11],I=n[15],P=i[0],z=i[4],b=i[8],O=i[12],v=i[1],L=i[5],G=i[9],D=i[13],k=i[2],C=i[6],J=i[10],R=i[14],W=i[3],ae=i[7],ge=i[11],le=i[15];return o[0]=s*P+u*v+a*k+f*W,o[4]=s*z+u*L+a*C+f*ae,o[8]=s*b+u*G+a*J+f*ge,o[12]=s*O+u*D+a*R+f*le,o[1]=p*P+h*v+q*k+c*W,o[5]=p*z+h*L+q*C+c*ae,o[9]=p*b+h*G+q*J+c*ge,o[13]=p*O+h*D+q*R+c*le,o[2]=m*P+A*v+y*k+g*W,o[6]=m*z+A*L+y*C+g*ae,o[10]=m*b+A*G+y*J+g*ge,o[14]=m*O+A*D+y*R+g*le,o[3]=K*P+j*v+H*k+I*W,o[7]=K*z+j*L+H*C+I*ae,o[11]=K*b+j*G+H*J+I*ge,o[15]=K*O+j*D+H*R+I*le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],s=e[1],u=e[5],a=e[9],f=e[13],p=e[2],h=e[6],q=e[10],c=e[14],m=e[3],A=e[7],y=e[11],g=e[15];return m*(+o*a*h-i*f*h-o*u*q+n*f*q+i*u*c-n*a*c)+A*(+t*a*c-t*f*q+o*s*q-i*s*c+i*f*p-o*a*p)+y*(+t*f*h-t*u*c-o*s*h+n*s*c+o*u*p-n*f*p)+g*(-i*u*p-t*a*h+t*u*q+i*s*h-n*s*q+n*a*p)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],u=e[5],a=e[6],f=e[7],p=e[8],h=e[9],q=e[10],c=e[11],m=e[12],A=e[13],y=e[14],g=e[15],K=h*y*f-A*q*f+A*a*c-u*y*c-h*a*g+u*q*g,j=m*q*f-p*y*f-m*a*c+s*y*c+p*a*g-s*q*g,H=p*A*f-m*h*f+m*u*c-s*A*c-p*u*g+s*h*g,I=m*h*a-p*A*a-m*u*q+s*A*q+p*u*y-s*h*y,P=t*K+n*j+i*H+o*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/P;return e[0]=K*z,e[1]=(A*q*o-h*y*o-A*i*c+n*y*c+h*i*g-n*q*g)*z,e[2]=(u*y*o-A*a*o+A*i*f-n*y*f-u*i*g+n*a*g)*z,e[3]=(h*a*o-u*q*o-h*i*f+n*q*f+u*i*c-n*a*c)*z,e[4]=j*z,e[5]=(p*y*o-m*q*o+m*i*c-t*y*c-p*i*g+t*q*g)*z,e[6]=(m*a*o-s*y*o-m*i*f+t*y*f+s*i*g-t*a*g)*z,e[7]=(s*q*o-p*a*o+p*i*f-t*q*f-s*i*c+t*a*c)*z,e[8]=H*z,e[9]=(m*h*o-p*A*o-m*n*c+t*A*c+p*n*g-t*h*g)*z,e[10]=(s*A*o-m*u*o+m*n*f-t*A*f-s*n*g+t*u*g)*z,e[11]=(p*u*o-s*h*o-p*n*f+t*h*f+s*n*c-t*u*c)*z,e[12]=I*z,e[13]=(p*A*i-m*h*i+m*n*q-t*A*q-p*n*y+t*h*y)*z,e[14]=(m*u*i-s*A*i-m*n*a+t*A*a+s*n*y-t*u*y)*z,e[15]=(s*h*i-p*u*i+p*n*a-t*h*a-s*n*q+t*u*q)*z,this}scale(e){let t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),o=1-n,s=e.x,u=e.y,a=e.z,f=o*s,p=o*u;return this.set(f*s+n,f*u-i*a,f*a+i*u,0,f*u+i*a,p*u+n,p*a-i*s,0,f*a-i*u,p*a+i*s,o*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,s){return this.set(1,n,o,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,o=t._x,s=t._y,u=t._z,a=t._w,f=o+o,p=s+s,h=u+u,q=o*f,c=o*p,m=o*h,A=s*p,y=s*h,g=u*h,K=a*f,j=a*p,H=a*h,I=n.x,P=n.y,z=n.z;return i[0]=(1-(A+g))*I,i[1]=(c+H)*I,i[2]=(m-j)*I,i[3]=0,i[4]=(c-H)*P,i[5]=(1-(q+g))*P,i[6]=(y+K)*P,i[7]=0,i[8]=(m+j)*z,i[9]=(y-K)*z,i[10]=(1-(q+A))*z,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,o=Ai.set(i[0],i[1],i[2]).length(),s=Ai.set(i[4],i[5],i[6]).length(),u=Ai.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],Mn.copy(this);let f=1/o,p=1/s,h=1/u;return Mn.elements[0]*=f,Mn.elements[1]*=f,Mn.elements[2]*=f,Mn.elements[4]*=p,Mn.elements[5]*=p,Mn.elements[6]*=p,Mn.elements[8]*=h,Mn.elements[9]*=h,Mn.elements[10]*=h,t.setFromRotationMatrix(Mn),n.x=o,n.y=s,n.z=u,this}makePerspective(e,t,n,i,o,s,u=wn,a=!1){let f=this.elements,p=2*o/(t-e),h=2*o/(n-i),q=(t+e)/(t-e),c=(n+i)/(n-i),m,A;if(a)m=o/(s-o),A=s*o/(s-o);else if(u===wn)m=-(s+o)/(s-o),A=-2*s*o/(s-o);else if(u===Ho)m=-s/(s-o),A=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return f[0]=p,f[4]=0,f[8]=q,f[12]=0,f[1]=0,f[5]=h,f[9]=c,f[13]=0,f[2]=0,f[6]=0,f[10]=m,f[14]=A,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,n,i,o,s,u=wn,a=!1){let f=this.elements,p=2/(t-e),h=2/(n-i),q=-(t+e)/(t-e),c=-(n+i)/(n-i),m,A;if(a)m=1/(s-o),A=s/(s-o);else if(u===wn)m=-2/(s-o),A=-(s+o)/(s-o);else if(u===Ho)m=-1/(s-o),A=-o/(s-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return f[0]=p,f[4]=0,f[8]=0,f[12]=q,f[1]=0,f[5]=h,f[9]=0,f[13]=c,f[2]=0,f[6]=0,f[10]=m,f[14]=A,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ai=new M,Mn=new pt,c7=new M(0,0,0),q7=new M(1,1,1),lr=new M,ys=new M,cn=new M,y6=new pt,A6=new on,Gn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,o=i[0],s=i[4],u=i[8],a=i[1],f=i[5],p=i[9],h=i[2],q=i[6],c=i[10];switch(t){case"XYZ":this._y=Math.asin(tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-p,c),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(q,f),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(u,c),this._z=Math.atan2(a,f)):(this._y=Math.atan2(-h,o),this._z=0);break;case"ZXY":this._x=Math.asin(tt(q,-1,1)),Math.abs(q)<.9999999?(this._y=Math.atan2(-h,c),this._z=Math.atan2(-s,f)):(this._y=0,this._z=Math.atan2(a,o));break;case"ZYX":this._y=Math.asin(-tt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(q,c),this._z=Math.atan2(a,o)):(this._x=0,this._z=Math.atan2(-s,f));break;case"YZX":this._z=Math.asin(tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-p,f),this._y=Math.atan2(-h,o)):(this._x=0,this._y=Math.atan2(u,c));break;case"XZY":this._z=Math.asin(-tt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(q,f),this._y=Math.atan2(u,o)):(this._x=Math.atan2(-p,c),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return y6.makeRotationFromQuaternion(e),this.setFromRotationMatrix(y6,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return A6.setFromEuler(this),this.setFromQuaternion(A6,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";var Di=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},g7=0,H6=new M,Hi=new on,er=new pt,As=new M,uo=new M,m7=new M,y7=new on,l6=new M(1,0,0),v6=new M(0,1,0),O6=new M(0,0,1),j6={type:"added"},A7={type:"removed"},li={type:"childadded",child:null},va={type:"childremoved",child:null},Nt=class r extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g7++}),this.uuid=ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new M,t=new Gn,n=new on,i=new M(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new pt},normalMatrix:{value:new nt}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Di,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(l6,e)}rotateY(e){return this.rotateOnAxis(v6,e)}rotateZ(e){return this.rotateOnAxis(O6,e)}translateOnAxis(e,t){return H6.copy(e).applyQuaternion(this.quaternion),this.position.add(H6.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(l6,e)}translateY(e){return this.translateOnAxis(v6,e)}translateZ(e){return this.translateOnAxis(O6,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(er.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?As.copy(e):As.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?er.lookAt(uo,As,this.up):er.lookAt(As,uo,this.up),this.quaternion.setFromRotationMatrix(er),i&&(er.extractRotation(i.matrixWorld),Hi.setFromRotationMatrix(er),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(j6),li.child=e,this.dispatchEvent(li),li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(A7),va.child=e,this.dispatchEvent(va),va.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),er.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),er.multiply(e.parent.matrixWorld)),e.applyMatrix4(er),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(j6),li.child=e,this.dispatchEvent(li),li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,e,m7),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,y7,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(u=>({...u,boundingBox:u.boundingBox?u.boundingBox.toJSON():void 0,boundingSphere:u.boundingSphere?u.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(u=>({...u})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function o(u,a){return u[a.uuid]===void 0&&(u[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);let u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){let a=u.shapes;if(Array.isArray(a))for(let f=0,p=a.length;f<p;f++){let h=a[f];o(e.shapes,h)}else o(e.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let u=[];for(let a=0,f=this.material.length;a<f;a++)u.push(o(e.materials,this.material[a]));i.material=u}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let u=0;u<this.children.length;u++)i.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let u=0;u<this.animations.length;u++){let a=this.animations[u];i.animations.push(o(e.animations,a))}}if(t){let u=s(e.geometries),a=s(e.materials),f=s(e.textures),p=s(e.images),h=s(e.shapes),q=s(e.skeletons),c=s(e.animations),m=s(e.nodes);u.length>0&&(n.geometries=u),a.length>0&&(n.materials=a),f.length>0&&(n.textures=f),p.length>0&&(n.images=p),h.length>0&&(n.shapes=h),q.length>0&&(n.skeletons=q),c.length>0&&(n.animations=c),m.length>0&&(n.nodes=m)}return n.object=i,n;function s(u){let a=[];for(let f in u){let p=u[f];delete p.metadata,a.push(p)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Nt.DEFAULT_UP=new M(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=new M,tr=new M,Oa=new M,nr=new M,vi=new M,Oi=new M,d6=new M,ja=new M,da=new M,Ka=new M,Ia=new vt,Pa=new vt,ba=new vt,jr=class r{constructor(e=new M,t=new M,n=new M){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Cn.subVectors(e,t),i.cross(Cn);let o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){Cn.subVectors(i,t),tr.subVectors(n,t),Oa.subVectors(e,t);let s=Cn.dot(Cn),u=Cn.dot(tr),a=Cn.dot(Oa),f=tr.dot(tr),p=tr.dot(Oa),h=s*f-u*u;if(h===0)return o.set(0,0,0),null;let q=1/h,c=(f*a-u*p)*q,m=(s*p-u*a)*q;return o.set(1-c-m,m,c)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,nr)===null?!1:nr.x>=0&&nr.y>=0&&nr.x+nr.y<=1}static getInterpolation(e,t,n,i,o,s,u,a){return this.getBarycoord(e,t,n,i,nr)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(o,nr.x),a.addScaledVector(s,nr.y),a.addScaledVector(u,nr.z),a)}static getInterpolatedAttribute(e,t,n,i,o,s){return Ia.setScalar(0),Pa.setScalar(0),ba.setScalar(0),Ia.fromBufferAttribute(e,t),Pa.fromBufferAttribute(e,n),ba.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(Ia,o.x),s.addScaledVector(Pa,o.y),s.addScaledVector(ba,o.z),s}static isFrontFacing(e,t,n,i){return Cn.subVectors(n,t),tr.subVectors(e,t),Cn.cross(tr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),tr.subVectors(this.a,this.b),Cn.cross(tr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,o){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,o=this.c,s,u;vi.subVectors(i,n),Oi.subVectors(o,n),ja.subVectors(e,n);let a=vi.dot(ja),f=Oi.dot(ja);if(a<=0&&f<=0)return t.copy(n);da.subVectors(e,i);let p=vi.dot(da),h=Oi.dot(da);if(p>=0&&h<=p)return t.copy(i);let q=a*h-p*f;if(q<=0&&a>=0&&p<=0)return s=a/(a-p),t.copy(n).addScaledVector(vi,s);Ka.subVectors(e,o);let c=vi.dot(Ka),m=Oi.dot(Ka);if(m>=0&&c<=m)return t.copy(o);let A=c*f-a*m;if(A<=0&&f>=0&&m<=0)return u=f/(f-m),t.copy(n).addScaledVector(Oi,u);let y=p*m-c*h;if(y<=0&&h-p>=0&&c-m>=0)return d6.subVectors(o,i),u=(h-p)/(h-p+(c-m)),t.copy(i).addScaledVector(d6,u);let g=1/(y+A+q);return s=A*g,u=q*g,t.copy(n).addScaledVector(vi,s).addScaledVector(Oi,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},bp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function xa(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var $e=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,ct.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ct.workingColorSpace){if(e=gf(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=xa(s,o,e+1/3),this.g=xa(s,o,e),this.b=xa(s,o,e-1/3)}return ct.colorSpaceToWorking(this,i),this}setStyle(e,t=ft){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=i[1],u=i[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=i[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){let n=bp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}copyLinearToSRGB(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return ct.workingToColorSpace(Rt.copy(this),e),Math.round(tt(Rt.r*255,0,255))*65536+Math.round(tt(Rt.g*255,0,255))*256+Math.round(tt(Rt.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(Rt.copy(this),t);let n=Rt.r,i=Rt.g,o=Rt.b,s=Math.max(n,i,o),u=Math.min(n,i,o),a,f,p=(u+s)/2;if(u===s)a=0,f=0;else{let h=s-u;switch(f=p<=.5?h/(s+u):h/(2-s-u),s){case n:a=(i-o)/h+(i<o?6:0);break;case i:a=(o-n)/h+2;break;case o:a=(n-i)/h+4;break}a/=6}return e.h=a,e.s=f,e.l=p,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=ft){ct.workingToColorSpace(Rt.copy(this),e);let t=Rt.r,n=Rt.g,i=Rt.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+t,vr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vr),e.getHSL(Hs);let n=go(vr.h,Hs.h,t),i=go(vr.s,Hs.s,t),o=go(vr.l,Hs.l,t);return this.setHSL(n,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*i,this.g=o[1]*t+o[4]*n+o[7]*i,this.b=o[2]*t+o[5]*n+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rt=new $e;$e.NAMES=bp;var H7=0,fr=class extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:H7++}),this.uuid=ti(),this.name="",this.type="Material",this.blending=Wr,this.side=sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ys,this.blendDst=Ds,this.blendEquation=dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tr,this.stencilZFail=Tr,this.stencilZPass=Tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wr&&(n.blending=this.blending),this.side!==sr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ys&&(n.blendSrc=this.blendSrc),this.blendDst!==Ds&&(n.blendDst=this.blendDst),this.blendEquation!==dr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Tr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Tr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Tr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){let s=[];for(let u in o){let a=o[u];delete a.metadata,s.push(a)}return s}if(t){let o=i(e.textures),s=i(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Nn=class extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=tf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ir=l7();function l7(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let a=0;a<256;++a){let f=a-127;f<-27?(n[a]=0,n[a|256]=32768,i[a]=24,i[a|256]=24):f<-14?(n[a]=1024>>-f-14,n[a|256]=1024>>-f-14|32768,i[a]=-f-1,i[a|256]=-f-1):f<=15?(n[a]=f+15<<10,n[a|256]=f+15<<10|32768,i[a]=13,i[a|256]=13):f<128?(n[a]=31744,n[a|256]=64512,i[a]=24,i[a|256]=24):(n[a]=31744,n[a|256]=64512,i[a]=13,i[a|256]=13)}let o=new Uint32Array(2048),s=new Uint32Array(64),u=new Uint32Array(64);for(let a=1;a<1024;++a){let f=a<<13,p=0;for(;(f&8388608)===0;)f<<=1,p-=8388608;f&=-8388609,p+=947912704,o[a]=f|p}for(let a=1024;a<2048;++a)o[a]=939524096+(a-1024<<13);for(let a=1;a<31;++a)s[a]=a<<23;s[31]=1199570944,s[32]=2147483648;for(let a=33;a<63;++a)s[a]=2147483648+(a-32<<23);s[63]=3347054592;for(let a=1;a<64;++a)a!==32&&(u[a]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:o,exponentTable:s,offsetTable:u}}function v7(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=tt(r,-65504,65504),ir.floatView[0]=r;let e=ir.uint32View[0],t=e>>23&511;return ir.baseTable[t]+((e&8388607)>>ir.shiftTable[t])}function O7(r){let e=r>>10;return ir.uint32View[0]=ir.mantissaTable[ir.offsetTable[e]+(r&1023)]+ir.exponentTable[e],ir.floatView[0]}var Pr=class{static toHalfFloat(e){return v7(e)}static fromHalfFloat(e){return O7(e)}},St=new M,ls=new se,j7=0,It=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:j7++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ta,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ls.fromBufferAttribute(this,t),ls.applyMatrix3(e),this.setXY(t,ls.x,ls.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),o=_t(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ta&&(e.usage=this.usage),e}};var vo=class extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Oo=class extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var qt=class extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}},d7=0,Kn=new pt,za=new Nt,ji=new M,qn=new Wn,ao=new Wn,kt=new M,Xt=class r extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:d7++}),this.uuid=ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mf(e)?Oo:vo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let o=new nt().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,t,n){return Kn.makeTranslation(e,t,n),this.applyMatrix4(Kn),this}scale(e,t,n){return Kn.makeScale(e,t,n),this.applyMatrix4(Kn),this}lookAt(e){return za.lookAt(e),za.updateMatrix(),this.applyMatrix4(za.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,o=e.length;i<o;i++){let s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new qt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new M(-1/0,-1/0,-1/0),new M(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let o=t[n];qn.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ar);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new M,1/0);return}if(e){let n=this.boundingSphere.center;if(qn.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let u=t[o];ao.setFromBufferAttribute(u),this.morphTargetsRelative?(kt.addVectors(qn.min,ao.min),qn.expandByPoint(kt),kt.addVectors(qn.max,ao.max),qn.expandByPoint(kt)):(qn.expandByPoint(ao.min),qn.expandByPoint(ao.max))}qn.getCenter(n);let i=0;for(let o=0,s=e.count;o<s;o++)kt.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(kt));if(t)for(let o=0,s=t.length;o<s;o++){let u=t[o],a=this.morphTargetsRelative;for(let f=0,p=u.count;f<p;f++)kt.fromBufferAttribute(u,f),a&&(ji.fromBufferAttribute(e,f),kt.add(ji)),i=Math.max(i,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));let s=this.getAttribute("tangent"),u=[],a=[];for(let b=0;b<n.count;b++)u[b]=new M,a[b]=new M;let f=new M,p=new M,h=new M,q=new se,c=new se,m=new se,A=new M,y=new M;function g(b,O,v){f.fromBufferAttribute(n,b),p.fromBufferAttribute(n,O),h.fromBufferAttribute(n,v),q.fromBufferAttribute(o,b),c.fromBufferAttribute(o,O),m.fromBufferAttribute(o,v),p.sub(f),h.sub(f),c.sub(q),m.sub(q);let L=1/(c.x*m.y-m.x*c.y);isFinite(L)&&(A.copy(p).multiplyScalar(m.y).addScaledVector(h,-c.y).multiplyScalar(L),y.copy(h).multiplyScalar(c.x).addScaledVector(p,-m.x).multiplyScalar(L),u[b].add(A),u[O].add(A),u[v].add(A),a[b].add(y),a[O].add(y),a[v].add(y))}let K=this.groups;K.length===0&&(K=[{start:0,count:e.count}]);for(let b=0,O=K.length;b<O;++b){let v=K[b],L=v.start,G=v.count;for(let D=L,k=L+G;D<k;D+=3)g(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let j=new M,H=new M,I=new M,P=new M;function z(b){I.fromBufferAttribute(i,b),P.copy(I);let O=u[b];j.copy(O),j.sub(I.multiplyScalar(I.dot(O))).normalize(),H.crossVectors(P,O);let L=H.dot(a[b])<0?-1:1;s.setXYZW(b,j.x,j.y,j.z,L)}for(let b=0,O=K.length;b<O;++b){let v=K[b],L=v.start,G=v.count;for(let D=L,k=L+G;D<k;D+=3)z(e.getX(D+0)),z(e.getX(D+1)),z(e.getX(D+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let q=0,c=n.count;q<c;q++)n.setXYZ(q,0,0,0);let i=new M,o=new M,s=new M,u=new M,a=new M,f=new M,p=new M,h=new M;if(e)for(let q=0,c=e.count;q<c;q+=3){let m=e.getX(q+0),A=e.getX(q+1),y=e.getX(q+2);i.fromBufferAttribute(t,m),o.fromBufferAttribute(t,A),s.fromBufferAttribute(t,y),p.subVectors(s,o),h.subVectors(i,o),p.cross(h),u.fromBufferAttribute(n,m),a.fromBufferAttribute(n,A),f.fromBufferAttribute(n,y),u.add(p),a.add(p),f.add(p),n.setXYZ(m,u.x,u.y,u.z),n.setXYZ(A,a.x,a.y,a.z),n.setXYZ(y,f.x,f.y,f.z)}else for(let q=0,c=t.count;q<c;q+=3)i.fromBufferAttribute(t,q+0),o.fromBufferAttribute(t,q+1),s.fromBufferAttribute(t,q+2),p.subVectors(s,o),h.subVectors(i,o),p.cross(h),n.setXYZ(q+0,p.x,p.y,p.z),n.setXYZ(q+1,p.x,p.y,p.z),n.setXYZ(q+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(u,a){let f=u.array,p=u.itemSize,h=u.normalized,q=new f.constructor(a.length*p),c=0,m=0;for(let A=0,y=a.length;A<y;A++){u.isInterleavedBufferAttribute?c=a[A]*u.data.stride+u.offset:c=a[A]*p;for(let g=0;g<p;g++)q[m++]=f[c++]}return new It(q,p,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let u in i){let a=i[u],f=e(a,n);t.setAttribute(u,f)}let o=this.morphAttributes;for(let u in o){let a=[],f=o[u];for(let p=0,h=f.length;p<h;p++){let q=f[p],c=e(q,n);a.push(c)}t.morphAttributes[u]=a}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let u=0,a=s.length;u<a;u++){let f=s[u];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let a=this.parameters;for(let f in a)a[f]!==void 0&&(e[f]=a[f]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let f=n[a];e.data.attributes[a]=f.toJSON(e.data)}let i={},o=!1;for(let a in this.morphAttributes){let f=this.morphAttributes[a],p=[];for(let h=0,q=f.length;h<q;h++){let c=f[h];p.push(c.toJSON(e.data))}p.length>0&&(i[a]=p,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let u=this.boundingSphere;return u!==null&&(e.data.boundingSphere=u.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let f in i){let p=i[f];this.setAttribute(f,p.clone(t))}let o=e.morphAttributes;for(let f in o){let p=[],h=o[f];for(let q=0,c=h.length;q<c;q++)p.push(h[q].clone(t));this.morphAttributes[f]=p}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let f=0,p=s.length;f<p;f++){let h=s[f];this.addGroup(h.start,h.count,h.materialIndex)}let u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},K6=new pt,Jr=new Ir,vs=new ar,I6=new M,Os=new M,js=new M,ds=new M,La=new M,Ks=new M,P6=new M,Is=new M,Pe=class extends Nt{constructor(e=new Xt,t=new Nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){let u=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=o}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let u=this.morphTargetInfluences;if(o&&u){Ks.set(0,0,0);for(let a=0,f=o.length;a<f;a++){let p=u[a],h=o[a];p!==0&&(La.fromBufferAttribute(h,e),s?Ks.addScaledVector(La,p):Ks.addScaledVector(La.sub(t),p))}t.add(Ks)}return t}raycast(e,t){let n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(o),Jr.copy(e.ray).recast(e.near),!(vs.containsPoint(Jr.origin)===!1&&(Jr.intersectSphere(vs,I6)===null||Jr.origin.distanceToSquared(I6)>(e.far-e.near)**2))&&(K6.copy(o).invert(),Jr.copy(e.ray).applyMatrix4(K6),!(n.boundingBox!==null&&Jr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Jr)))}_computeIntersections(e,t,n){let i,o=this.geometry,s=this.material,u=o.index,a=o.attributes.position,f=o.attributes.uv,p=o.attributes.uv1,h=o.attributes.normal,q=o.groups,c=o.drawRange;if(u!==null)if(Array.isArray(s))for(let m=0,A=q.length;m<A;m++){let y=q[m],g=s[y.materialIndex],K=Math.max(y.start,c.start),j=Math.min(u.count,Math.min(y.start+y.count,c.start+c.count));for(let H=K,I=j;H<I;H+=3){let P=u.getX(H),z=u.getX(H+1),b=u.getX(H+2);i=Ps(this,g,e,n,f,p,h,P,z,b),i&&(i.faceIndex=Math.floor(H/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{let m=Math.max(0,c.start),A=Math.min(u.count,c.start+c.count);for(let y=m,g=A;y<g;y+=3){let K=u.getX(y),j=u.getX(y+1),H=u.getX(y+2);i=Ps(this,s,e,n,f,p,h,K,j,H),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}else if(a!==void 0)if(Array.isArray(s))for(let m=0,A=q.length;m<A;m++){let y=q[m],g=s[y.materialIndex],K=Math.max(y.start,c.start),j=Math.min(a.count,Math.min(y.start+y.count,c.start+c.count));for(let H=K,I=j;H<I;H+=3){let P=H,z=H+1,b=H+2;i=Ps(this,g,e,n,f,p,h,P,z,b),i&&(i.faceIndex=Math.floor(H/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{let m=Math.max(0,c.start),A=Math.min(a.count,c.start+c.count);for(let y=m,g=A;y<g;y+=3){let K=y,j=y+1,H=y+2;i=Ps(this,s,e,n,f,p,h,K,j,H),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}}};function K7(r,e,t,n,i,o,s,u){let a;if(e.side===en?a=n.intersectTriangle(s,o,i,!0,u):a=n.intersectTriangle(i,o,s,e.side===sr,u),a===null)return null;Is.copy(u),Is.applyMatrix4(r.matrixWorld);let f=t.ray.origin.distanceTo(Is);return f<t.near||f>t.far?null:{distance:f,point:Is.clone(),object:r}}function Ps(r,e,t,n,i,o,s,u,a,f){r.getVertexPosition(u,Os),r.getVertexPosition(a,js),r.getVertexPosition(f,ds);let p=K7(r,e,t,n,Os,js,ds,P6);if(p){let h=new M;jr.getBarycoord(P6,Os,js,ds,h),i&&(p.uv=jr.getInterpolatedAttribute(i,u,a,f,h,new se)),o&&(p.uv1=jr.getInterpolatedAttribute(o,u,a,f,h,new se)),s&&(p.normal=jr.getInterpolatedAttribute(s,u,a,f,h,new M),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));let q={a:u,b:a,c:f,normal:new M,materialIndex:0};jr.getNormal(Os,js,ds,q.normal),p.face=q,p.barycoord=h}return p}var Lt=class r extends Xt{constructor(e=1,t=1,n=1,i=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:s};let u=this;i=Math.floor(i),o=Math.floor(o),s=Math.floor(s);let a=[],f=[],p=[],h=[],q=0,c=0;m("z","y","x",-1,-1,n,t,e,s,o,0),m("z","y","x",1,-1,n,t,-e,s,o,1),m("x","z","y",1,1,e,n,t,i,s,2),m("x","z","y",1,-1,e,n,-t,i,s,3),m("x","y","z",1,-1,e,t,n,i,o,4),m("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(a),this.setAttribute("position",new qt(f,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(h,2));function m(A,y,g,K,j,H,I,P,z,b,O){let v=H/z,L=I/b,G=H/2,D=I/2,k=P/2,C=z+1,J=b+1,R=0,W=0,ae=new M;for(let ge=0;ge<J;ge++){let le=ge*L-D;for(let Le=0;Le<C;Le++){let we=Le*v-G;ae[A]=we*K,ae[y]=le*j,ae[g]=k,f.push(ae.x,ae.y,ae.z),ae[A]=0,ae[y]=0,ae[g]=P>0?1:-1,p.push(ae.x,ae.y,ae.z),h.push(Le/z),h.push(1-ge/b),R+=1}}for(let ge=0;ge<b;ge++)for(let le=0;le<z;le++){let Le=q+le+C*ge,we=q+le+C*(ge+1),We=q+(le+1)+C*(ge+1),et=q+(le+1)+C*ge;a.push(Le,we,et),a.push(we,We,et),W+=6}u.addGroup(c,W,O),c+=W,q+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ni(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vt(r){let e={};for(let t=0;t<r.length;t++){let n=ni(r[t]);for(let i in n)e[i]=n[i]}return e}function I7(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function yf(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}var ea={clone:ni,merge:Vt},P7=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,b7=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gn=class extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=P7,this.fragmentShader=b7,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ni(e.uniforms),this.uniformsGroups=I7(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},jo=class extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Or=new M,b6=new se,x6=new se,Jt=class extends jo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ci*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(qo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ci*2*Math.atan(Math.tan(qo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Or.x,Or.y).multiplyScalar(-e/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Or.x,Or.y).multiplyScalar(-e/Or.z)}getViewSize(e,t){return this.getViewBounds(e,b6,x6),t.subVectors(x6,b6)}setViewOffset(e,t,n,i,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(qo*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i,s=this.view;if(this.view!==null&&this.view.enabled){let a=s.fullWidth,f=s.fullHeight;o+=s.offsetX*i/a,t-=s.offsetY*n/f,i*=s.width/a,n*=s.height/f}let u=this.filmOffset;u!==0&&(o+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},di=-90,Ki=1,Xs=class extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Jt(di,Ki,e,t);i.layers=this.layers,this.add(i);let o=new Jt(di,Ki,e,t);o.layers=this.layers,this.add(o);let s=new Jt(di,Ki,e,t);s.layers=this.layers,this.add(s);let u=new Jt(di,Ki,e,t);u.layers=this.layers,this.add(u);let a=new Jt(di,Ki,e,t);a.layers=this.layers,this.add(a);let f=new Jt(di,Ki,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,o,s,u,a]=t;for(let f of t)this.remove(f);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===Ho)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,u,a,f,p]=this.children,h=e.getRenderTarget(),q=e.getActiveCubeFace(),c=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let A=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,o),e.setRenderTarget(n,1,i),e.render(t,s),e.setRenderTarget(n,2,i),e.render(t,u),e.setRenderTarget(n,3,i),e.render(t,a),e.setRenderTarget(n,4,i),e.render(t,f),n.texture.generateMipmaps=A,e.setRenderTarget(n,5,i),e.render(t,p),e.setRenderTarget(h,q,c),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ko=class extends Wt{constructor(e=[],t=_r,n,i,o,s,u,a,f,p){super(e,t,n,i,o,s,u,a,f,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ts=class extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ko(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Lt(5,5,5),o=new gn({name:"CubemapFromEquirect",uniforms:ni(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:pr});o.uniforms.tEquirect.value=t;let s=new Pe(i,o),u=t.minFilter;return t.minFilter===An&&(t.minFilter=wt),new Xs(1,10,this).update(e,s),t.minFilter=u,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(o)}},Te=class extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}},x7={type:"move"},ki=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new M,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new M),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new M,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new M),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,s=null,u=this._targetRay,a=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){s=!0;for(let A of e.hand.values()){let y=t.getJointPose(A,n),g=this._getHandJoint(f,A);y!==null&&(g.matrix.fromArray(y.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=y.radius),g.visible=y!==null}let p=f.joints["index-finger-tip"],h=f.joints["thumb-tip"],q=p.position.distanceTo(h.position),c=.02,m=.005;f.inputState.pinching&&q>c+m?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&q<=c-m&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(a.matrix.fromArray(o.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,o.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(o.linearVelocity)):a.hasLinearVelocity=!1,o.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(o.angularVelocity)):a.hasAngularVelocity=!1));u!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(u.matrix.fromArray(i.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,i.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(i.linearVelocity)):u.hasLinearVelocity=!1,i.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(i.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(x7)))}return u!==null&&(u.visible=i!==null),a!==null&&(a.visible=o!==null),f!==null&&(f.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Te;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var br=class extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Io=class extends Wt{constructor(e=null,t=1,n=1,i,o,s,u,a,f=Ut,p=Ut,h,q){super(null,s,u,a,f,p,i,o,h,q),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Po=class extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ii=new pt,z6=new pt,bs=[],L6=new Wn,z7=new pt,fo=new Pe,po=new ar,bo=class extends Pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Po(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,z7)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),L6.copy(e.boundingBox).applyMatrix4(Ii),this.boundingBox.union(L6)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ar),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),po.copy(e.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(po)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,o=n.length+1,s=e*o+1;for(let u=0;u<n.length;u++)n[u]=i[s+u]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(fo.geometry=this.geometry,fo.material=this.material,fo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),po.copy(this.boundingSphere),po.applyMatrix4(n),e.ray.intersectsSphere(po)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,Ii),z6.multiplyMatrices(n,Ii),fo.matrixWorld=z6,fo.raycast(e,bs);for(let s=0,u=bs.length;s<u;s++){let a=bs[s];a.instanceId=o,a.object=this,t.push(a)}bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Po(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Io(new Float32Array(i*this.count),i,this.count,ju,tn));let o=this.morphTexture.source.data.data,s=0;for(let f=0;f<n.length;f++)s+=n[f];let u=this.geometry.morphTargetsRelative?1:1-s,a=i*e;o[a]=u,o.set(n,a+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Sa=new M,L7=new M,S7=new nt,rn=class{constructor(e=new M(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Sa.subVectors(n,t).cross(L7.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Sa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||S7.getNormalMatrix(e),i=this.coplanarPoint(Sa).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Xr=new ar,M7=new se(.5,.5),xs=new M,Ji=class{constructor(e=new rn,t=new rn,n=new rn,i=new rn,o=new rn,s=new rn){this.planes=[e,t,n,i,o,s]}set(e,t,n,i,o,s){let u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(i),u[4].copy(o),u[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn,n=!1){let i=this.planes,o=e.elements,s=o[0],u=o[1],a=o[2],f=o[3],p=o[4],h=o[5],q=o[6],c=o[7],m=o[8],A=o[9],y=o[10],g=o[11],K=o[12],j=o[13],H=o[14],I=o[15];if(i[0].setComponents(f-s,c-p,g-m,I-K).normalize(),i[1].setComponents(f+s,c+p,g+m,I+K).normalize(),i[2].setComponents(f+u,c+h,g+A,I+j).normalize(),i[3].setComponents(f-u,c-h,g-A,I-j).normalize(),n)i[4].setComponents(a,q,y,H).normalize(),i[5].setComponents(f-a,c-q,g-y,I-H).normalize();else if(i[4].setComponents(f-a,c-q,g-y,I-H).normalize(),t===wn)i[5].setComponents(f+a,c+q,g+y,I+H).normalize();else if(t===Ho)i[5].setComponents(a,q,y,H).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xr)}intersectsSprite(e){Xr.center.set(0,0,0);let t=M7.distanceTo(e.center);return Xr.radius=.7071067811865476+t,Xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(xs.x=i.normal.x>0?e.max.x:e.min.x,xs.y=i.normal.y>0?e.max.y:e.min.y,xs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Er=class extends fr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Zs=new M,Ws=new M,S6=new pt,ho=new Ir,zs=new ar,Ma=new M,M6=new M,xo=class extends Nt{constructor(e=new Xt,t=new Er){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,o=t.count;i<o;i++)Zs.fromBufferAttribute(t,i-1),Ws.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Zs.distanceTo(Ws);e.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(i),zs.radius+=o,e.ray.intersectsSphere(zs)===!1)return;S6.copy(i).invert(),ho.copy(e.ray).applyMatrix4(S6);let u=o/((this.scale.x+this.scale.y+this.scale.z)/3),a=u*u,f=this.isLineSegments?2:1,p=n.index,q=n.attributes.position;if(p!==null){let c=Math.max(0,s.start),m=Math.min(p.count,s.start+s.count);for(let A=c,y=m-1;A<y;A+=f){let g=p.getX(A),K=p.getX(A+1),j=Ls(this,e,ho,a,g,K,A);j&&t.push(j)}if(this.isLineLoop){let A=p.getX(m-1),y=p.getX(c),g=Ls(this,e,ho,a,A,y,m-1);g&&t.push(g)}}else{let c=Math.max(0,s.start),m=Math.min(q.count,s.start+s.count);for(let A=c,y=m-1;A<y;A+=f){let g=Ls(this,e,ho,a,A,A+1,A);g&&t.push(g)}if(this.isLineLoop){let A=Ls(this,e,ho,a,m-1,c,m-1);A&&t.push(A)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){let u=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=o}}}}};function Ls(r,e,t,n,i,o,s){let u=r.geometry.attributes.position;if(Zs.fromBufferAttribute(u,i),Ws.fromBufferAttribute(u,o),t.distanceSqToSegment(Zs,Ws,Ma,M6)>n)return;Ma.applyMatrix4(r.matrixWorld);let f=e.ray.origin.distanceTo(Ma);if(!(f<e.near||f>e.far))return{distance:f,point:M6.clone().applyMatrix4(r.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:r}}var Fr=class extends Wt{constructor(e,t,n,i,o,s,u,a,f,p,h,q){super(null,s,u,a,f,p,i,o,h,q),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var bt=class extends Wt{constructor(e,t,n,i,o,s,u,a,f){super(e,t,n,i,o,s,u,a,f),this.isCanvasTexture=!0,this.needsUpdate=!0}},zo=class extends Wt{constructor(e,t,n=Cr,i,o,s,u=Ut,a=Ut,f,p=Si,h=1){if(p!==Si&&p!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:e,height:t,depth:h};super(q,i,o,s,u,a,p,n,f),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Lo=class extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Bt=class r extends Xt{constructor(e=1,t=1,n=1,i=32,o=1,s=!1,u=0,a=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:o,openEnded:s,thetaStart:u,thetaLength:a};let f=this;i=Math.floor(i),o=Math.floor(o);let p=[],h=[],q=[],c=[],m=0,A=[],y=n/2,g=0;K(),s===!1&&(e>0&&j(!0),t>0&&j(!1)),this.setIndex(p),this.setAttribute("position",new qt(h,3)),this.setAttribute("normal",new qt(q,3)),this.setAttribute("uv",new qt(c,2));function K(){let H=new M,I=new M,P=0,z=(t-e)/n;for(let b=0;b<=o;b++){let O=[],v=b/o,L=v*(t-e)+e;for(let G=0;G<=i;G++){let D=G/i,k=D*a+u,C=Math.sin(k),J=Math.cos(k);I.x=L*C,I.y=-v*n+y,I.z=L*J,h.push(I.x,I.y,I.z),H.set(C,z,J).normalize(),q.push(H.x,H.y,H.z),c.push(D,1-v),O.push(m++)}A.push(O)}for(let b=0;b<i;b++)for(let O=0;O<o;O++){let v=A[O][b],L=A[O+1][b],G=A[O+1][b+1],D=A[O][b+1];(e>0||O!==0)&&(p.push(v,L,D),P+=3),(t>0||O!==o-1)&&(p.push(L,G,D),P+=3)}f.addGroup(g,P,0),g+=P}function j(H){let I=m,P=new se,z=new M,b=0,O=H===!0?e:t,v=H===!0?1:-1;for(let G=1;G<=i;G++)h.push(0,y*v,0),q.push(0,v,0),c.push(.5,.5),m++;let L=m;for(let G=0;G<=i;G++){let k=G/i*a+u,C=Math.cos(k),J=Math.sin(k);z.x=O*J,z.y=y*v,z.z=O*C,h.push(z.x,z.y,z.z),q.push(0,v,0),P.x=C*.5+.5,P.y=J*.5*v+.5,c.push(P.x,P.y),m++}for(let G=0;G<i;G++){let D=I+G,k=L+G;H===!0?p.push(k,k+1,D):p.push(k+1,k,D),b+=3}f.addGroup(g,b,H===!0?1:2),g+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),o=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),o+=n.distanceTo(i),t.push(o),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,o=n.length,s;t?s=t:s=e*n[o-1];let u=0,a=o-1,f;for(;u<=a;)if(i=Math.floor(u+(a-u)/2),f=n[i]-s,f<0)u=i+1;else if(f>0)a=i-1;else{a=i;break}if(i=a,n[i]===s)return i/(o-1);let p=n[i],q=n[i+1]-p,c=(s-p)/q;return(i+c)/(o-1)}getTangent(e,t){let i=e-1e-4,o=e+1e-4;i<0&&(i=0),o>1&&(o=1);let s=this.getPoint(i),u=this.getPoint(o),a=t||(s.isVector2?new se:new M);return a.copy(u).sub(s).normalize(),a}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new M,i=[],o=[],s=[],u=new M,a=new pt;for(let c=0;c<=e;c++){let m=c/e;i[c]=this.getTangentAt(m,new M)}o[0]=new M,s[0]=new M;let f=Number.MAX_VALUE,p=Math.abs(i[0].x),h=Math.abs(i[0].y),q=Math.abs(i[0].z);p<=f&&(f=p,n.set(1,0,0)),h<=f&&(f=h,n.set(0,1,0)),q<=f&&n.set(0,0,1),u.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],u),s[0].crossVectors(i[0],o[0]);for(let c=1;c<=e;c++){if(o[c]=o[c-1].clone(),s[c]=s[c-1].clone(),u.crossVectors(i[c-1],i[c]),u.length()>Number.EPSILON){u.normalize();let m=Math.acos(tt(i[c-1].dot(i[c]),-1,1));o[c].applyMatrix4(a.makeRotationAxis(u,m))}s[c].crossVectors(i[c],o[c])}if(t===!0){let c=Math.acos(tt(o[0].dot(o[e]),-1,1));c/=e,i[0].dot(u.crossVectors(o[0],o[e]))>0&&(c=-c);for(let m=1;m<=e;m++)o[m].applyMatrix4(a.makeRotationAxis(i[m],c*m)),s[m].crossVectors(i[m],o[m])}return{tangents:i,normals:o,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Xi=class extends mn{constructor(e=0,t=0,n=1,i=1,o=0,s=Math.PI*2,u=!1,a=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=s,this.aClockwise=u,this.aRotation=a}getPoint(e,t=new se){let n=t,i=Math.PI*2,o=this.aEndAngle-this.aStartAngle,s=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(s?o=0:o=i),this.aClockwise===!0&&!s&&(o===i?o=-i:o=o-i);let u=this.aStartAngle+e*o,a=this.aX+this.xRadius*Math.cos(u),f=this.aY+this.yRadius*Math.sin(u);if(this.aRotation!==0){let p=Math.cos(this.aRotation),h=Math.sin(this.aRotation),q=a-this.aX,c=f-this.aY;a=q*p-c*h+this.aX,f=q*h+c*p+this.aY}return n.set(a,f)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ns=class extends Xi{constructor(e,t,n,i,o,s){super(e,t,n,n,i,o,s),this.isArcCurve=!0,this.type="ArcCurve"}};function Af(){let r=0,e=0,t=0,n=0;function i(o,s,u,a){r=o,e=u,t=-3*o+3*s-2*u-a,n=2*o-2*s+u+a}return{initCatmullRom:function(o,s,u,a,f){i(s,u,f*(u-o),f*(a-s))},initNonuniformCatmullRom:function(o,s,u,a,f,p,h){let q=(s-o)/f-(u-o)/(f+p)+(u-s)/p,c=(u-s)/p-(a-s)/(p+h)+(a-u)/h;q*=p,c*=p,i(s,u,q,c)},calc:function(o){let s=o*o,u=s*o;return r+e*o+t*s+n*u}}}var Ss=new M,Ca=new Af,wa=new Af,Ga=new Af,Yn=class extends mn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new M){let n=t,i=this.points,o=i.length,s=(o-(this.closed?0:1))*e,u=Math.floor(s),a=s-u;this.closed?u+=u>0?0:(Math.floor(Math.abs(u)/o)+1)*o:a===0&&u===o-1&&(u=o-2,a=1);let f,p;this.closed||u>0?f=i[(u-1)%o]:(Ss.subVectors(i[0],i[1]).add(i[0]),f=Ss);let h=i[u%o],q=i[(u+1)%o];if(this.closed||u+2<o?p=i[(u+2)%o]:(Ss.subVectors(i[o-1],i[o-2]).add(i[o-1]),p=Ss),this.curveType==="centripetal"||this.curveType==="chordal"){let c=this.curveType==="chordal"?.5:.25,m=Math.pow(f.distanceToSquared(h),c),A=Math.pow(h.distanceToSquared(q),c),y=Math.pow(q.distanceToSquared(p),c);A<1e-4&&(A=1),m<1e-4&&(m=A),y<1e-4&&(y=A),Ca.initNonuniformCatmullRom(f.x,h.x,q.x,p.x,m,A,y),wa.initNonuniformCatmullRom(f.y,h.y,q.y,p.y,m,A,y),Ga.initNonuniformCatmullRom(f.z,h.z,q.z,p.z,m,A,y)}else this.curveType==="catmullrom"&&(Ca.initCatmullRom(f.x,h.x,q.x,p.x,this.tension),wa.initCatmullRom(f.y,h.y,q.y,p.y,this.tension),Ga.initCatmullRom(f.z,h.z,q.z,p.z,this.tension));return n.set(Ca.calc(a),wa.calc(a),Ga.calc(a)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new M().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function C6(r,e,t,n,i){let o=(n-e)*.5,s=(i-t)*.5,u=r*r,a=r*u;return(2*t-2*n+o+s)*a+(-3*t+3*n-2*o-s)*u+o*r+t}function C7(r,e){let t=1-r;return t*t*e}function w7(r,e){return 2*(1-r)*r*e}function G7(r,e){return r*r*e}function mo(r,e,t,n){return C7(r,e)+w7(r,t)+G7(r,n)}function Y7(r,e){let t=1-r;return t*t*t*e}function D7(r,e){let t=1-r;return 3*t*t*r*e}function k7(r,e){return 3*(1-r)*r*r*e}function J7(r,e){return r*r*r*e}function yo(r,e,t,n,i){return Y7(r,e)+D7(r,t)+k7(r,n)+J7(r,i)}var So=class extends mn{constructor(e=new se,t=new se,n=new se,i=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new se){let n=t,i=this.v0,o=this.v1,s=this.v2,u=this.v3;return n.set(yo(e,i.x,o.x,s.x,u.x),yo(e,i.y,o.y,s.y,u.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bs=class extends mn{constructor(e=new M,t=new M,n=new M,i=new M){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new M){let n=t,i=this.v0,o=this.v1,s=this.v2,u=this.v3;return n.set(yo(e,i.x,o.x,s.x,u.x),yo(e,i.y,o.y,s.y,u.y),yo(e,i.z,o.z,s.z,u.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Mo=class extends mn{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Es=class extends mn{constructor(e=new M,t=new M){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new M){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new M){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Co=class extends mn{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){let n=t,i=this.v0,o=this.v1,s=this.v2;return n.set(mo(e,i.x,o.x,s.x),mo(e,i.y,o.y,s.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wo=class extends mn{constructor(e=new M,t=new M,n=new M){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new M){let n=t,i=this.v0,o=this.v1,s=this.v2;return n.set(mo(e,i.x,o.x,s.x),mo(e,i.y,o.y,s.y),mo(e,i.z,o.z,s.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Go=class extends mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let n=t,i=this.points,o=(i.length-1)*e,s=Math.floor(o),u=o-s,a=i[s===0?s:s-1],f=i[s],p=i[s>i.length-2?i.length-1:s+1],h=i[s>i.length-3?i.length-1:s+2];return n.set(C6(u,a.x,f.x,p.x,h.x),C6(u,a.y,f.y,p.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new se().fromArray(i))}return this}},Fs=Object.freeze({__proto__:null,ArcCurve:Ns,CatmullRomCurve3:Yn,CubicBezierCurve:So,CubicBezierCurve3:Bs,EllipseCurve:Xi,LineCurve:Mo,LineCurve3:Es,QuadraticBezierCurve:Co,QuadraticBezierCurve3:wo,SplineCurve:Go}),Rs=class extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Fs[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),o=0;for(;o<i.length;){if(i[o]>=n){let s=i[o]-n,u=this.curves[o],a=u.getLength(),f=a===0?0:1-s/a;return u.getPointAt(f,t)}o++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,o=this.curves;i<o.length;i++){let s=o[i],u=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,a=s.getPoints(u);for(let f=0;f<a.length;f++){let p=a[f];n&&n.equals(p)||(t.push(p),n=p)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Fs[i.type]().fromJSON(i))}return this}},sn=class extends Rs{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Mo(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let o=new Co(this.currentPoint.clone(),new se(e,t),new se(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,o,s){let u=new So(this.currentPoint.clone(),new se(e,t),new se(n,i),new se(o,s));return this.curves.push(u),this.currentPoint.set(o,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Go(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,o,s){let u=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+u,t+a,n,i,o,s),this}absarc(e,t,n,i,o,s){return this.absellipse(e,t,n,n,i,o,s),this}ellipse(e,t,n,i,o,s,u,a){let f=this.currentPoint.x,p=this.currentPoint.y;return this.absellipse(e+f,t+p,n,i,o,s,u,a),this}absellipse(e,t,n,i,o,s,u,a){let f=new Xi(e,t,n,i,o,s,u,a);if(this.curves.length>0){let h=f.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(f);let p=f.getPoint(1);return this.currentPoint.copy(p),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Tt=class extends sn{constructor(e){super(e),this.uuid=ti(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new sn().fromJSON(i))}return this}};function X7(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,o=xp(r,0,i,t,!0),s=[];if(!o||o.next===o.prev)return s;let u,a,f;if(n&&(o=B7(r,e,o,t)),r.length>80*t){u=1/0,a=1/0;let p=-1/0,h=-1/0;for(let q=t;q<i;q+=t){let c=r[q],m=r[q+1];c<u&&(u=c),m<a&&(a=m),c>p&&(p=c),m>h&&(h=m)}f=Math.max(p-u,h-a),f=f!==0?32767/f:0}return Yo(o,s,t,u,a,f,0),s}function xp(r,e,t,n,i){let o;if(i===nc(r,e,t,n)>0)for(let s=e;s<t;s+=n)o=w6(s/n|0,r[s],r[s+1],o);else for(let s=t-n;s>=e;s-=n)o=w6(s/n|0,r[s],r[s+1],o);return o&&Ti(o,o.next)&&(ko(o),o=o.next),o}function Rr(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Ti(t,t.next)||Kt(t.prev,t,t.next)===0)){if(ko(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Yo(r,e,t,n,i,o,s){if(!r)return;!s&&o&&V7(r,n,i,o);let u=r;for(;r.prev!==r.next;){let a=r.prev,f=r.next;if(o?Z7(r,n,i,o):T7(r)){e.push(a.i,r.i,f.i),ko(r),r=f.next,u=f.next;continue}if(r=f,r===u){s?s===1?(r=W7(Rr(r),e),Yo(r,e,t,n,i,o,2)):s===2&&N7(r,e,t,n,i,o):Yo(Rr(r),e,t,n,i,o,1);break}}}function T7(r){let e=r.prev,t=r,n=r.next;if(Kt(e,t,n)>=0)return!1;let i=e.x,o=t.x,s=n.x,u=e.y,a=t.y,f=n.y,p=Math.min(i,o,s),h=Math.min(u,a,f),q=Math.max(i,o,s),c=Math.max(u,a,f),m=n.next;for(;m!==e;){if(m.x>=p&&m.x<=q&&m.y>=h&&m.y<=c&&co(i,u,o,a,s,f,m.x,m.y)&&Kt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Z7(r,e,t,n){let i=r.prev,o=r,s=r.next;if(Kt(i,o,s)>=0)return!1;let u=i.x,a=o.x,f=s.x,p=i.y,h=o.y,q=s.y,c=Math.min(u,a,f),m=Math.min(p,h,q),A=Math.max(u,a,f),y=Math.max(p,h,q),g=Za(c,m,e,t,n),K=Za(A,y,e,t,n),j=r.prevZ,H=r.nextZ;for(;j&&j.z>=g&&H&&H.z<=K;){if(j.x>=c&&j.x<=A&&j.y>=m&&j.y<=y&&j!==i&&j!==s&&co(u,p,a,h,f,q,j.x,j.y)&&Kt(j.prev,j,j.next)>=0||(j=j.prevZ,H.x>=c&&H.x<=A&&H.y>=m&&H.y<=y&&H!==i&&H!==s&&co(u,p,a,h,f,q,H.x,H.y)&&Kt(H.prev,H,H.next)>=0))return!1;H=H.nextZ}for(;j&&j.z>=g;){if(j.x>=c&&j.x<=A&&j.y>=m&&j.y<=y&&j!==i&&j!==s&&co(u,p,a,h,f,q,j.x,j.y)&&Kt(j.prev,j,j.next)>=0)return!1;j=j.prevZ}for(;H&&H.z<=K;){if(H.x>=c&&H.x<=A&&H.y>=m&&H.y<=y&&H!==i&&H!==s&&co(u,p,a,h,f,q,H.x,H.y)&&Kt(H.prev,H,H.next)>=0)return!1;H=H.nextZ}return!0}function W7(r,e){let t=r;do{let n=t.prev,i=t.next.next;!Ti(n,i)&&Lp(n,t,t.next,i)&&Do(n,i)&&Do(i,n)&&(e.push(n.i,t.i,i.i),ko(t),ko(t.next),t=r=i),t=t.next}while(t!==r);return Rr(t)}function N7(r,e,t,n,i,o){let s=r;do{let u=s.next.next;for(;u!==s.prev;){if(s.i!==u.i&&$7(s,u)){let a=Sp(s,u);s=Rr(s,s.next),a=Rr(a,a.next),Yo(s,e,t,n,i,o,0),Yo(a,e,t,n,i,o,0);return}u=u.next}s=s.next}while(s!==r)}function B7(r,e,t,n){let i=[];for(let o=0,s=e.length;o<s;o++){let u=e[o]*n,a=o<s-1?e[o+1]*n:r.length,f=xp(r,u,a,n,!1);f===f.next&&(f.steiner=!0),i.push(_7(f))}i.sort(E7);for(let o=0;o<i.length;o++)t=F7(i[o],t);return t}function E7(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){let n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function F7(r,e){let t=R7(r,e);if(!t)return e;let n=Sp(t,r);return Rr(n,n.next),Rr(t,t.next)}function R7(r,e){let t=e,n=r.x,i=r.y,o=-1/0,s;if(Ti(r,t))return t;do{if(Ti(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>o&&(o=h,s=t.x<t.next.x?t:t.next,h===n))return s}t=t.next}while(t!==e);if(!s)return null;let u=s,a=s.x,f=s.y,p=1/0;t=s;do{if(n>=t.x&&t.x>=a&&n!==t.x&&zp(i<f?n:o,i,a,f,i<f?o:n,i,t.x,t.y)){let h=Math.abs(i-t.y)/(n-t.x);Do(t,r)&&(h<p||h===p&&(t.x>s.x||t.x===s.x&&U7(s,t)))&&(s=t,p=h)}t=t.next}while(t!==u);return s}function U7(r,e){return Kt(r.prev,r,e.prev)<0&&Kt(e.next,r,r.next)<0}function V7(r,e,t,n){let i=r;do i.z===0&&(i.z=Za(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Q7(i)}function Q7(r){let e,t=1;do{let n=r,i;r=null;let o=null;for(e=0;n;){e++;let s=n,u=0;for(let f=0;f<t&&(u++,s=s.nextZ,!!s);f++);let a=t;for(;u>0||a>0&&s;)u!==0&&(a===0||!s||n.z<=s.z)?(i=n,n=n.nextZ,u--):(i=s,s=s.nextZ,a--),o?o.nextZ=i:r=i,i.prevZ=o,o=i;n=s}o.nextZ=null,t*=2}while(e>1);return r}function Za(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function _7(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function zp(r,e,t,n,i,o,s,u){return(i-s)*(e-u)>=(r-s)*(o-u)&&(r-s)*(n-u)>=(t-s)*(e-u)&&(t-s)*(o-u)>=(i-s)*(n-u)}function co(r,e,t,n,i,o,s,u){return!(r===s&&e===u)&&zp(r,e,t,n,i,o,s,u)}function $7(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!ec(r,e)&&(Do(r,e)&&Do(e,r)&&tc(r,e)&&(Kt(r.prev,r,e.prev)||Kt(r,e.prev,e))||Ti(r,e)&&Kt(r.prev,r,r.next)>0&&Kt(e.prev,e,e.next)>0)}function Kt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Ti(r,e){return r.x===e.x&&r.y===e.y}function Lp(r,e,t,n){let i=Cs(Kt(r,e,t)),o=Cs(Kt(r,e,n)),s=Cs(Kt(t,n,r)),u=Cs(Kt(t,n,e));return!!(i!==o&&s!==u||i===0&&Ms(r,t,e)||o===0&&Ms(r,n,e)||s===0&&Ms(t,r,n)||u===0&&Ms(t,e,n))}function Ms(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Cs(r){return r>0?1:r<0?-1:0}function ec(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Lp(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Do(r,e){return Kt(r.prev,r,r.next)<0?Kt(r,e,r.next)>=0&&Kt(r,r.prev,e)>=0:Kt(r,e,r.prev)<0||Kt(r,r.next,e)<0}function tc(r,e){let t=r,n=!1,i=(r.x+e.x)/2,o=(r.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&i<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Sp(r,e){let t=Wa(r.i,r.x,r.y),n=Wa(e.i,e.x,e.y),i=r.next,o=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function w6(r,e,t,n){let i=Wa(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ko(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Wa(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function nc(r,e,t,n){let i=0;for(let o=e,s=t-n;o<t;o+=n)i+=(r[s]-r[o])*(r[o+1]+r[s+1]),s=o;return i}var Na=class{static triangulate(e,t,n=2){return X7(e,t,n)}},Zr=class r{static area(e){let t=e.length,n=0;for(let i=t-1,o=0;o<t;i=o++)n+=e[i].x*e[o].y-e[o].x*e[i].y;return n*.5}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],o=[];G6(e),Y6(n,e);let s=e.length;t.forEach(G6);for(let a=0;a<t.length;a++)i.push(s),s+=t[a].length,Y6(n,t[a]);let u=Na.triangulate(n,i);for(let a=0;a<u.length;a+=3)o.push(u.slice(a,a+3));return o}};function G6(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Y6(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var Et=class r extends Xt{constructor(e=new Tt([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],o=[];for(let u=0,a=e.length;u<a;u++){let f=e[u];s(f)}this.setAttribute("position",new qt(i,3)),this.setAttribute("uv",new qt(o,2)),this.computeVertexNormals();function s(u){let a=[],f=t.curveSegments!==void 0?t.curveSegments:12,p=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,q=t.bevelEnabled!==void 0?t.bevelEnabled:!0,c=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:c-.1,A=t.bevelOffset!==void 0?t.bevelOffset:0,y=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,K=t.UVGenerator!==void 0?t.UVGenerator:rc,j,H=!1,I,P,z,b;g&&(j=g.getSpacedPoints(p),H=!0,q=!1,I=g.computeFrenetFrames(p,!1),P=new M,z=new M,b=new M),q||(y=0,c=0,m=0,A=0);let O=u.extractPoints(f),v=O.shape,L=O.holes;if(!Zr.isClockWise(v)){v=v.reverse();for(let ie=0,$=L.length;ie<$;ie++){let _=L[ie];Zr.isClockWise(_)&&(L[ie]=_.reverse())}}function D(ie){let _=10000000000000001e-36,V=ie[0];for(let Ae=1;Ae<=ie.length;Ae++){let qe=Ae%ie.length,ve=ie[qe],Qe=ve.x-V.x,Ze=ve.y-V.y,x=Qe*Qe+Ze*Ze,l=Math.max(Math.abs(ve.x),Math.abs(ve.y),Math.abs(V.x),Math.abs(V.y)),T=_*l*l;if(x<=T){ie.splice(qe,1),Ae--;continue}V=ve}}D(v),L.forEach(D);let k=L.length,C=v;for(let ie=0;ie<k;ie++){let $=L[ie];v=v.concat($)}function J(ie,$,_){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector($,_)}let R=v.length;function W(ie,$,_){let V,Ae,qe,ve=ie.x-$.x,Qe=ie.y-$.y,Ze=_.x-ie.x,x=_.y-ie.y,l=ve*ve+Qe*Qe,T=ve*x-Qe*Ze;if(Math.abs(T)>Number.EPSILON){let F=Math.sqrt(l),oe=Math.sqrt(Ze*Ze+x*x),U=$.x-Qe/F,Se=$.y+ve/F,ye=_.x-x/oe,ze=_.y+Ze/oe,ke=((ye-U)*x-(ze-Se)*Ze)/(ve*x-Qe*Ze);V=U+ve*ke-ie.x,Ae=Se+Qe*ke-ie.y;let he=V*V+Ae*Ae;if(he<=2)return new se(V,Ae);qe=Math.sqrt(he/2)}else{let F=!1;ve>Number.EPSILON?Ze>Number.EPSILON&&(F=!0):ve<-Number.EPSILON?Ze<-Number.EPSILON&&(F=!0):Math.sign(Qe)===Math.sign(x)&&(F=!0),F?(V=-Qe,Ae=ve,qe=Math.sqrt(l)):(V=ve,Ae=Qe,qe=Math.sqrt(l/2))}return new se(V/qe,Ae/qe)}let ae=[];for(let ie=0,$=C.length,_=$-1,V=ie+1;ie<$;ie++,_++,V++)_===$&&(_=0),V===$&&(V=0),ae[ie]=W(C[ie],C[_],C[V]);let ge=[],le,Le=ae.concat();for(let ie=0,$=k;ie<$;ie++){let _=L[ie];le=[];for(let V=0,Ae=_.length,qe=Ae-1,ve=V+1;V<Ae;V++,qe++,ve++)qe===Ae&&(qe=0),ve===Ae&&(ve=0),le[V]=W(_[V],_[qe],_[ve]);ge.push(le),Le=Le.concat(le)}let we;if(y===0)we=Zr.triangulateShape(C,L);else{let ie=[],$=[];for(let _=0;_<y;_++){let V=_/y,Ae=c*Math.cos(V*Math.PI/2),qe=m*Math.sin(V*Math.PI/2)+A;for(let ve=0,Qe=C.length;ve<Qe;ve++){let Ze=J(C[ve],ae[ve],qe);Ye(Ze.x,Ze.y,-Ae),V===0&&ie.push(Ze)}for(let ve=0,Qe=k;ve<Qe;ve++){let Ze=L[ve];le=ge[ve];let x=[];for(let l=0,T=Ze.length;l<T;l++){let F=J(Ze[l],le[l],qe);Ye(F.x,F.y,-Ae),V===0&&x.push(F)}V===0&&$.push(x)}}we=Zr.triangulateShape(ie,$)}let We=we.length,et=m+A;for(let ie=0;ie<R;ie++){let $=q?J(v[ie],Le[ie],et):v[ie];H?(z.copy(I.normals[0]).multiplyScalar($.x),P.copy(I.binormals[0]).multiplyScalar($.y),b.copy(j[0]).add(z).add(P),Ye(b.x,b.y,b.z)):Ye($.x,$.y,0)}for(let ie=1;ie<=p;ie++)for(let $=0;$<R;$++){let _=q?J(v[$],Le[$],et):v[$];H?(z.copy(I.normals[ie]).multiplyScalar(_.x),P.copy(I.binormals[ie]).multiplyScalar(_.y),b.copy(j[ie]).add(z).add(P),Ye(b.x,b.y,b.z)):Ye(_.x,_.y,h/p*ie)}for(let ie=y-1;ie>=0;ie--){let $=ie/y,_=c*Math.cos($*Math.PI/2),V=m*Math.sin($*Math.PI/2)+A;for(let Ae=0,qe=C.length;Ae<qe;Ae++){let ve=J(C[Ae],ae[Ae],V);Ye(ve.x,ve.y,h+_)}for(let Ae=0,qe=L.length;Ae<qe;Ae++){let ve=L[Ae];le=ge[Ae];for(let Qe=0,Ze=ve.length;Qe<Ze;Qe++){let x=J(ve[Qe],le[Qe],V);H?Ye(x.x,x.y+j[p-1].y,j[p-1].x+_):Ye(x.x,x.y,h+_)}}}Q(),re();function Q(){let ie=i.length/3;if(q){let $=0,_=R*$;for(let V=0;V<We;V++){let Ae=we[V];Ge(Ae[2]+_,Ae[1]+_,Ae[0]+_)}$=p+y*2,_=R*$;for(let V=0;V<We;V++){let Ae=we[V];Ge(Ae[0]+_,Ae[1]+_,Ae[2]+_)}}else{for(let $=0;$<We;$++){let _=we[$];Ge(_[2],_[1],_[0])}for(let $=0;$<We;$++){let _=we[$];Ge(_[0]+R*p,_[1]+R*p,_[2]+R*p)}}n.addGroup(ie,i.length/3-ie,0)}function re(){let ie=i.length/3,$=0;be(C,$),$+=C.length;for(let _=0,V=L.length;_<V;_++){let Ae=L[_];be(Ae,$),$+=Ae.length}n.addGroup(ie,i.length/3-ie,1)}function be(ie,$){let _=ie.length;for(;--_>=0;){let V=_,Ae=_-1;Ae<0&&(Ae=ie.length-1);for(let qe=0,ve=p+y*2;qe<ve;qe++){let Qe=R*qe,Ze=R*(qe+1),x=$+V+Qe,l=$+Ae+Qe,T=$+Ae+Ze,F=$+V+Ze;ot(x,l,T,F)}}}function Ye(ie,$,_){a.push(ie),a.push($),a.push(_)}function Ge(ie,$,_){gt(ie),gt($),gt(_);let V=i.length/3,Ae=K.generateTopUV(n,i,V-3,V-2,V-1);w(Ae[0]),w(Ae[1]),w(Ae[2])}function ot(ie,$,_,V){gt(ie),gt($),gt(V),gt($),gt(_),gt(V);let Ae=i.length/3,qe=K.generateSideWallUV(n,i,Ae-6,Ae-3,Ae-2,Ae-1);w(qe[0]),w(qe[1]),w(qe[3]),w(qe[1]),w(qe[2]),w(qe[3])}function gt(ie){i.push(a[ie*3+0]),i.push(a[ie*3+1]),i.push(a[ie*3+2])}function w(ie){o.push(ie.x),o.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ic(t,n,e)}static fromJSON(e,t){let n=[];for(let o=0,s=e.shapes.length;o<s;o++){let u=t[e.shapes[o]];n.push(u)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Fs[i.type]().fromJSON(i)),new r(n,e.options)}},rc={generateTopUV:function(r,e,t,n,i){let o=e[t*3],s=e[t*3+1],u=e[n*3],a=e[n*3+1],f=e[i*3],p=e[i*3+1];return[new se(o,s),new se(u,a),new se(f,p)]},generateSideWallUV:function(r,e,t,n,i,o){let s=e[t*3],u=e[t*3+1],a=e[t*3+2],f=e[n*3],p=e[n*3+1],h=e[n*3+2],q=e[i*3],c=e[i*3+1],m=e[i*3+2],A=e[o*3],y=e[o*3+1],g=e[o*3+2];return Math.abs(u-p)<Math.abs(s-f)?[new se(s,1-a),new se(f,1-h),new se(q,1-m),new se(A,1-g)]:[new se(u,1-a),new se(p,1-h),new se(c,1-m),new se(y,1-g)]}};function ic(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let o=r[n];t.shapes.push(o.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Jo=class r extends Xt{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=tt(i,0,Math.PI*2);let o=[],s=[],u=[],a=[],f=[],p=1/t,h=new M,q=new se,c=new M,m=new M,A=new M,y=0,g=0;for(let K=0;K<=e.length-1;K++)switch(K){case 0:y=e[K+1].x-e[K].x,g=e[K+1].y-e[K].y,c.x=g*1,c.y=-y,c.z=g*0,A.copy(c),c.normalize(),a.push(c.x,c.y,c.z);break;case e.length-1:a.push(A.x,A.y,A.z);break;default:y=e[K+1].x-e[K].x,g=e[K+1].y-e[K].y,c.x=g*1,c.y=-y,c.z=g*0,m.copy(c),c.x+=A.x,c.y+=A.y,c.z+=A.z,c.normalize(),a.push(c.x,c.y,c.z),A.copy(m)}for(let K=0;K<=t;K++){let j=n+K*p*i,H=Math.sin(j),I=Math.cos(j);for(let P=0;P<=e.length-1;P++){h.x=e[P].x*H,h.y=e[P].y,h.z=e[P].x*I,s.push(h.x,h.y,h.z),q.x=K/t,q.y=P/(e.length-1),u.push(q.x,q.y);let z=a[3*P+0]*H,b=a[3*P+1],O=a[3*P+0]*I;f.push(z,b,O)}}for(let K=0;K<t;K++)for(let j=0;j<e.length-1;j++){let H=j+K*e.length,I=H,P=H+e.length,z=H+e.length+1,b=H+1;o.push(I,P,b),o.push(z,b,P)}this.setIndex(o),this.setAttribute("position",new qt(s,3)),this.setAttribute("uv",new qt(u,2)),this.setAttribute("normal",new qt(f,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}};var jt=class r extends Xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let o=e/2,s=t/2,u=Math.floor(n),a=Math.floor(i),f=u+1,p=a+1,h=e/u,q=t/a,c=[],m=[],A=[],y=[];for(let g=0;g<p;g++){let K=g*q-s;for(let j=0;j<f;j++){let H=j*h-o;m.push(H,-K,0),A.push(0,0,1),y.push(j/u),y.push(1-g/a)}}for(let g=0;g<a;g++)for(let K=0;K<u;K++){let j=K+f*g,H=K+f*(g+1),I=K+1+f*(g+1),P=K+1+f*g;c.push(j,H,P),c.push(H,I,P)}this.setIndex(c),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(A,3)),this.setAttribute("uv",new qt(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Xo=class r extends Xt{constructor(e=.5,t=1,n=32,i=1,o=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:o,thetaLength:s},n=Math.max(3,n),i=Math.max(1,i);let u=[],a=[],f=[],p=[],h=e,q=(t-e)/i,c=new M,m=new se;for(let A=0;A<=i;A++){for(let y=0;y<=n;y++){let g=o+y/n*s;c.x=h*Math.cos(g),c.y=h*Math.sin(g),a.push(c.x,c.y,c.z),f.push(0,0,1),m.x=(c.x/t+1)/2,m.y=(c.y/t+1)/2,p.push(m.x,m.y)}h+=q}for(let A=0;A<i;A++){let y=A*(n+1);for(let g=0;g<n;g++){let K=g+y,j=K,H=K+n+1,I=K+n+2,P=K+1;u.push(j,H,P),u.push(H,I,P)}}this.setIndex(u),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var To=class r extends Xt{constructor(e=1,t=32,n=16,i=0,o=Math.PI*2,s=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:o,thetaStart:s,thetaLength:u},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let a=Math.min(s+u,Math.PI),f=0,p=[],h=new M,q=new M,c=[],m=[],A=[],y=[];for(let g=0;g<=n;g++){let K=[],j=g/n,H=0;g===0&&s===0?H=.5/t:g===n&&a===Math.PI&&(H=-.5/t);for(let I=0;I<=t;I++){let P=I/t;h.x=-e*Math.cos(i+P*o)*Math.sin(s+j*u),h.y=e*Math.cos(s+j*u),h.z=e*Math.sin(i+P*o)*Math.sin(s+j*u),m.push(h.x,h.y,h.z),q.copy(h).normalize(),A.push(q.x,q.y,q.z),y.push(P+H,1-j),K.push(f++)}p.push(K)}for(let g=0;g<n;g++)for(let K=0;K<t;K++){let j=p[g][K+1],H=p[g][K],I=p[g+1][K],P=p[g+1][K+1];(g!==0||s>0)&&c.push(j,H,P),(g!==n-1||a<Math.PI)&&c.push(H,I,P)}this.setIndex(c),this.setAttribute("position",new qt(m,3)),this.setAttribute("normal",new qt(A,3)),this.setAttribute("uv",new qt(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ur=class r extends Xt{constructor(e=1,t=.4,n=12,i=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:o},n=Math.floor(n),i=Math.floor(i);let s=[],u=[],a=[],f=[],p=new M,h=new M,q=new M;for(let c=0;c<=n;c++)for(let m=0;m<=i;m++){let A=m/i*o,y=c/n*Math.PI*2;h.x=(e+t*Math.cos(y))*Math.cos(A),h.y=(e+t*Math.cos(y))*Math.sin(A),h.z=t*Math.sin(y),u.push(h.x,h.y,h.z),p.x=e*Math.cos(A),p.y=e*Math.sin(A),q.subVectors(h,p).normalize(),a.push(q.x,q.y,q.z),f.push(m/i),f.push(c/n)}for(let c=1;c<=n;c++)for(let m=1;m<=i;m++){let A=(i+1)*c+m-1,y=(i+1)*(c-1)+m-1,g=(i+1)*(c-1)+m,K=(i+1)*c+m;s.push(A,y,K),s.push(y,g,K)}this.setIndex(s),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(a,3)),this.setAttribute("uv",new qt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Bn=class r extends Xt{constructor(e=new wo(new M(-1,-1,0),new M(-1,1,0),new M(1,1,0)),t=64,n=1,i=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:o};let s=e.computeFrenetFrames(t,o);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let u=new M,a=new M,f=new se,p=new M,h=[],q=[],c=[],m=[];A(),this.setIndex(m),this.setAttribute("position",new qt(h,3)),this.setAttribute("normal",new qt(q,3)),this.setAttribute("uv",new qt(c,2));function A(){for(let j=0;j<t;j++)y(j);y(o===!1?t:0),K(),g()}function y(j){p=e.getPointAt(j/t,p);let H=s.normals[j],I=s.binormals[j];for(let P=0;P<=i;P++){let z=P/i*Math.PI*2,b=Math.sin(z),O=-Math.cos(z);a.x=O*H.x+b*I.x,a.y=O*H.y+b*I.y,a.z=O*H.z+b*I.z,a.normalize(),q.push(a.x,a.y,a.z),u.x=p.x+n*a.x,u.y=p.y+n*a.y,u.z=p.z+n*a.z,h.push(u.x,u.y,u.z)}}function g(){for(let j=1;j<=t;j++)for(let H=1;H<=i;H++){let I=(i+1)*(j-1)+(H-1),P=(i+1)*j+(H-1),z=(i+1)*j+H,b=(i+1)*(j-1)+H;m.push(I,P,b),m.push(P,z,b)}}function K(){for(let j=0;j<=t;j++)for(let H=0;H<=i;H++)f.x=j/t,f.y=H/i,c.push(f.x,f.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Fs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var rt=class extends fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hf,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xt=class extends rt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new $e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Us=class extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vs=class extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Zo=class extends Er{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ws(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function oc(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Vr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],o=t[n-1];n:{e:{let s;t:{r:if(!(e<i)){for(let u=n+2;;){if(i===void 0){if(e<o)break r;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===u)break;if(o=i,i=t[++n],e<i)break e}s=t.length;break t}if(!(e>=o)){let u=t[1];e<u&&(n=2,o=u);for(let a=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){let u=n+s>>>1;e<t[u]?s=u:n=u+1}if(i=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,i)}return this.interpolate_(n,o,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i;for(let s=0;s!==i;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qs=class extends Vr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Da,endingEnd:Da}}intervalChanged_(e,t,n){let i=this.parameterPositions,o=e-2,s=e+1,u=i[o],a=i[s];if(u===void 0)switch(this.getSettings_().endingStart){case ka:o=e,u=2*t-n;break;case Ja:o=i.length-2,u=t+i[o]-i[o+1];break;default:o=e,u=n}if(a===void 0)switch(this.getSettings_().endingEnd){case ka:s=e,a=2*n-t;break;case Ja:s=1,a=n+i[1]-i[0];break;default:s=e-1,a=t}let f=(n-t)*.5,p=this.valueSize;this._weightPrev=f/(t-u),this._weightNext=f/(a-n),this._offsetPrev=o*p,this._offsetNext=s*p}interpolate_(e,t,n,i){let o=this.resultBuffer,s=this.sampleValues,u=this.valueSize,a=e*u,f=a-u,p=this._offsetPrev,h=this._offsetNext,q=this._weightPrev,c=this._weightNext,m=(n-t)/(i-t),A=m*m,y=A*m,g=-q*y+2*q*A-q*m,K=(1+q)*y+(-1.5-2*q)*A+(-.5+q)*m+1,j=(-1-c)*y+(1.5+c)*A+.5*m,H=c*y-c*A;for(let I=0;I!==u;++I)o[I]=g*s[p+I]+K*s[f+I]+j*s[a+I]+H*s[h+I];return o}},_s=class extends Vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let o=this.resultBuffer,s=this.sampleValues,u=this.valueSize,a=e*u,f=a-u,p=(n-t)/(i-t),h=1-p;for(let q=0;q!==u;++q)o[q]=s[f+q]*h+s[a+q]*p;return o}},$s=class extends Vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},yn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ws(t,this.TimeBufferType),this.values=ws(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ws(e.times,Array),values:ws(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $s(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new _s(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qs(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Br:t=this.InterpolantFactoryMethodDiscrete;break;case Mi:t=this.InterpolantFactoryMethodLinear;break;case Gs:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return Mi;case this.InterpolantFactoryMethodSmooth:return Gs}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,o=0,s=i-1;for(;o!==i&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==i){o>=s&&(s=Math.max(s,1),o=s-1);let u=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*u,s*u)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let u=0;u!==o;u++){let a=n[u];if(typeof a=="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,u,a),e=!1;break}if(s!==null&&s>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,u,a,s),e=!1;break}s=a}if(i!==void 0&&oc(i))for(let u=0,a=i.length;u!==a;++u){let f=i[u];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,u,f),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Gs,o=e.length-1,s=1;for(let u=1;u<o;++u){let a=!1,f=e[u],p=e[u+1];if(f!==p&&(u!==1||f!==e[0]))if(i)a=!0;else{let h=u*n,q=h-n,c=h+n;for(let m=0;m!==n;++m){let A=t[h+m];if(A!==t[q+m]||A!==t[c+m]){a=!0;break}}}if(a){if(u!==s){e[s]=e[u];let h=u*n,q=s*n;for(let c=0;c!==n;++c)t[q+c]=t[h+c]}++s}}if(o>0){e[s]=e[o];for(let u=o*n,a=s*n,f=0;f!==n;++f)t[a+f]=t[u+f];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=Mi;var xr=class extends yn{constructor(e,t,n){super(e,t,n)}};xr.prototype.ValueTypeName="bool";xr.prototype.ValueBufferType=Array;xr.prototype.DefaultInterpolation=Br;xr.prototype.InterpolantFactoryMethodLinear=void 0;xr.prototype.InterpolantFactoryMethodSmooth=void 0;var eu=class extends yn{constructor(e,t,n,i){super(e,t,n,i)}};eu.prototype.ValueTypeName="color";var tu=class extends yn{constructor(e,t,n,i){super(e,t,n,i)}};tu.prototype.ValueTypeName="number";var nu=class extends Vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let o=this.resultBuffer,s=this.sampleValues,u=this.valueSize,a=(n-t)/(i-t),f=e*u;for(let p=f+u;f!==p;f+=4)on.slerpFlat(o,0,s,f-u,s,f,a);return o}},Wo=class extends yn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new nu(this.times,this.values,this.getValueSize(),e)}};Wo.prototype.ValueTypeName="quaternion";Wo.prototype.InterpolantFactoryMethodSmooth=void 0;var zr=class extends yn{constructor(e,t,n){super(e,t,n)}};zr.prototype.ValueTypeName="string";zr.prototype.ValueBufferType=Array;zr.prototype.DefaultInterpolation=Br;zr.prototype.InterpolantFactoryMethodLinear=void 0;zr.prototype.InterpolantFactoryMethodSmooth=void 0;var ru=class extends yn{constructor(e,t,n,i){super(e,t,n,i)}};ru.prototype.ValueTypeName="vector";var zi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},iu=class{constructor(e,t,n){let i=this,o=!1,s=0,u=0,a,f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(p){u++,o===!1&&i.onStart!==void 0&&i.onStart(p,s,u),o=!0},this.itemEnd=function(p){s++,i.onProgress!==void 0&&i.onProgress(p,s,u),s===u&&(o=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(p){i.onError!==void 0&&i.onError(p)},this.resolveURL=function(p){return a?a(p):p},this.setURLModifier=function(p){return a=p,this},this.addHandler=function(p,h){return f.push(p,h),this},this.removeHandler=function(p){let h=f.indexOf(p);return h!==-1&&f.splice(h,2),this},this.getHandler=function(p){for(let h=0,q=f.length;h<q;h+=2){let c=f[h],m=f[h+1];if(c.global&&(c.lastIndex=0),c.test(p))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Mp=new iu,Lr=class{constructor(e){this.manager=e!==void 0?e:Mp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,o){n.load(e,i,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Lr.DEFAULT_MATERIAL_NAME="__DEFAULT";var rr={},Ba=class extends Error{constructor(e,t){super(e),this.response=t}},ou=class extends Lr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=zi.get(`file:${e}`);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(rr[e]!==void 0){rr[e].push({onLoad:t,onProgress:n,onError:i});return}rr[e]=[],rr[e].push({onLoad:t,onProgress:n,onError:i});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),u=this.mimeType,a=this.responseType;fetch(s).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;let p=rr[e],h=f.body.getReader(),q=f.headers.get("X-File-Size")||f.headers.get("Content-Length"),c=q?parseInt(q):0,m=c!==0,A=0,y=new ReadableStream({start(g){K();function K(){h.read().then(({done:j,value:H})=>{if(j)g.close();else{A+=H.byteLength;let I=new ProgressEvent("progress",{lengthComputable:m,loaded:A,total:c});for(let P=0,z=p.length;P<z;P++){let b=p[P];b.onProgress&&b.onProgress(I)}g.enqueue(H),K()}},j=>{g.error(j)})}}});return new Response(y)}else throw new Ba(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(a){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(p=>new DOMParser().parseFromString(p,u));case"json":return f.json();default:if(u==="")return f.text();{let h=/charset="?([^;"\s]*)"?/i.exec(u),q=h&&h[1]?h[1].toLowerCase():void 0,c=new TextDecoder(q);return f.arrayBuffer().then(m=>c.decode(m))}}}).then(f=>{zi.add(`file:${e}`,f);let p=rr[e];delete rr[e];for(let h=0,q=p.length;h<q;h++){let c=p[h];c.onLoad&&c.onLoad(f)}}).catch(f=>{let p=rr[e];if(p===void 0)throw this.manager.itemError(e),f;delete rr[e];for(let h=0,q=p.length;h<q;h++){let c=p[h];c.onError&&c.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Pi=new WeakMap,su=class extends Lr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=zi.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0);else{let h=Pi.get(s);h===void 0&&(h=[],Pi.set(s,h)),h.push({onLoad:t,onError:i})}return s}let u=wi("img");function a(){p(),t&&t(this);let h=Pi.get(this)||[];for(let q=0;q<h.length;q++){let c=h[q];c.onLoad&&c.onLoad(this)}Pi.delete(this),o.manager.itemEnd(e)}function f(h){p(),i&&i(h),zi.remove(`image:${e}`);let q=Pi.get(this)||[];for(let c=0;c<q.length;c++){let m=q[c];m.onError&&m.onError(h)}Pi.delete(this),o.manager.itemError(e),o.manager.itemEnd(e)}function p(){u.removeEventListener("load",a,!1),u.removeEventListener("error",f,!1)}return u.addEventListener("load",a,!1),u.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(u.crossOrigin=this.crossOrigin),zi.add(`image:${e}`,u),o.manager.itemStart(e),u.src=e,u}};var No=class extends Lr{constructor(e){super(e)}load(e,t,n,i){let o=this,s=new Io,u=new ou(this.manager);return u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setPath(this.path),u.setWithCredentials(o.withCredentials),u.load(e,function(a){let f;try{f=o.parse(a)}catch(p){if(i!==void 0)i(p);else{console.error(p);return}}f.image!==void 0?s.image=f.image:f.data!==void 0&&(s.image.width=f.width,s.image.height=f.height,s.image.data=f.data),s.wrapS=f.wrapS!==void 0?f.wrapS:In,s.wrapT=f.wrapT!==void 0?f.wrapT:In,s.magFilter=f.magFilter!==void 0?f.magFilter:wt,s.minFilter=f.minFilter!==void 0?f.minFilter:wt,s.anisotropy=f.anisotropy!==void 0?f.anisotropy:1,f.colorSpace!==void 0&&(s.colorSpace=f.colorSpace),f.flipY!==void 0&&(s.flipY=f.flipY),f.format!==void 0&&(s.format=f.format),f.type!==void 0&&(s.type=f.type),f.mipmaps!==void 0&&(s.mipmaps=f.mipmaps,s.minFilter=An),f.mipmapCount===1&&(s.minFilter=wt),f.generateMipmaps!==void 0&&(s.generateMipmaps=f.generateMipmaps),s.needsUpdate=!0,t&&t(s,f)},n,i),s}},Qr=class extends Lr{constructor(e){super(e)}load(e,t,n,i){let o=new Wt,s=new su(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(u){o.image=u,o.needsUpdate=!0,t!==void 0&&t(o)},n,i),o}},Zi=class extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Bo=class extends Zi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ya=new pt,D6=new M,k6=new M,Ea=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ji,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;D6.setFromMatrixPosition(e.matrixWorld),t.position.copy(D6),k6.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(k6),t.updateMatrixWorld(),Ya.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ya,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Eo=class extends jo{constructor(e=-1,t=1,n=1,i=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,o=n-e,s=n+e,u=i+t,a=i-t;if(this.view!==null&&this.view.enabled){let f=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,s=o+f*this.view.width,u-=p*this.view.offsetY,a=u-p*this.view.height}this.projectionMatrix.makeOrthographic(o,s,u,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fa=class extends Ea{constructor(){super(new Eo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Wi=class extends Zi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Fa}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Fo=class extends Zi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var uu=class extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Hf="\\[\\]\\.:\\/",sc=new RegExp("["+Hf+"]","g"),lf="[^"+Hf+"]",uc="[^"+Hf.replace("\\.","")+"]",ac=/((?:WC+[\/:])*)/.source.replace("WC",lf),fc=/(WCOD+)?/.source.replace("WCOD",uc),pc=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lf),hc=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lf),cc=new RegExp("^"+ac+fc+pc+hc+"$"),qc=["material","materials","bones","map"],Ra=class{constructor(e,t,n){let i=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,o=n.length;i!==o;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(sc,"")}static parseTrackName(e){let t=cc.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let o=n.nodeName.substring(i+1);qc.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(o){for(let s=0;s<o.length;s++){let u=o[s];if(u.name===t||u.uuid===t)return u;let a=n(u.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,o=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let p=0;p<e.length;p++)if(e[p].name===f){f=p;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}let s=e[i];if(s===void 0){let f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+i+" but it wasn't found.",e);return}let u=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?u=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(u=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(o!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}a=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(a=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][u]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=Ra;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var d4=new Float32Array(1);var J6=new pt,Ro=class{constructor(e,t,n=0,i=1/0){this.ray=new Ir(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Di,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return J6.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(J6),this}intersectObject(e,t=!0,n=[]){return Ua(e,this,n,t),n.sort(X6),n}intersectObjects(e,t=!0,n=[]){for(let i=0,o=e.length;i<o;i++)Ua(e[i],this,n,t);return n.sort(X6),n}};function X6(r,e){return r.distance-e.distance}function Ua(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let o=r.children;for(let s=0,u=o.length;s<u;s++)Ua(o[s],e,t,!0)}}var Ni=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=tt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(tt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Uo=class extends Zn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function vf(r,e,t,n){let i=gc(n);switch(t){case af:return r*e;case ju:return r*e/i.components*i.byteLength;case du:return r*e/i.components*i.byteLength;case pf:return r*e*2/i.components*i.byteLength;case Ku:return r*e*2/i.components*i.byteLength;case ff:return r*e*3/i.components*i.byteLength;case un:return r*e*4/i.components*i.byteLength;case Iu:return r*e*4/i.components*i.byteLength;case Qo:case _o:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case $o:case es:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bu:case zu:return Math.max(r,16)*Math.max(e,8)/4;case Pu:case xu:return Math.max(r,8)*Math.max(e,8)/2;case Lu:case Su:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Mu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Cu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case wu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Gu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Yu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Du:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ku:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ju:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Xu:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Tu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Zu:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Wu:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Nu:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Bu:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Eu:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Fu:case Ru:case Uu:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Vu:case Qu:return Math.ceil(r/4)*Math.ceil(e/4)*8;case _u:case $u:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gc(r){switch(r){case Dn:case rf:return{byteLength:1,components:1};case Fi:case of:case Hn:return{byteLength:2,components:1};case vu:case Ou:return{byteLength:2,components:4};case Cr:case lu:case tn:return{byteLength:4,components:1};case sf:case uf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nh(){let r=null,e=!1,t=null,n=null;function i(o,s){t(o,s),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function mc(r){let e=new WeakMap;function t(u,a){let f=u.array,p=u.usage,h=f.byteLength,q=r.createBuffer();r.bindBuffer(a,q),r.bufferData(a,f,p),u.onUploadCallback();let c;if(f instanceof Float32Array)c=r.FLOAT;else if(typeof Float16Array<"u"&&f instanceof Float16Array)c=r.HALF_FLOAT;else if(f instanceof Uint16Array)u.isFloat16BufferAttribute?c=r.HALF_FLOAT:c=r.UNSIGNED_SHORT;else if(f instanceof Int16Array)c=r.SHORT;else if(f instanceof Uint32Array)c=r.UNSIGNED_INT;else if(f instanceof Int32Array)c=r.INT;else if(f instanceof Int8Array)c=r.BYTE;else if(f instanceof Uint8Array)c=r.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)c=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:q,type:c,bytesPerElement:f.BYTES_PER_ELEMENT,version:u.version,size:h}}function n(u,a,f){let p=a.array,h=a.updateRanges;if(r.bindBuffer(f,u),h.length===0)r.bufferSubData(f,0,p);else{h.sort((c,m)=>c.start-m.start);let q=0;for(let c=1;c<h.length;c++){let m=h[q],A=h[c];A.start<=m.start+m.count+1?m.count=Math.max(m.count,A.start+A.count-m.start):(++q,h[q]=A)}h.length=q+1;for(let c=0,m=h.length;c<m;c++){let A=h[c];r.bufferSubData(f,A.start*p.BYTES_PER_ELEMENT,p,A.start,A.count)}a.clearUpdateRanges()}a.onUploadCallback()}function i(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function o(u){u.isInterleavedBufferAttribute&&(u=u.data);let a=e.get(u);a&&(r.deleteBuffer(a.buffer),e.delete(u))}function s(u,a){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){let p=e.get(u);(!p||p.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}let f=e.get(u);if(f===void 0)e.set(u,t(u,a));else if(f.version<u.version){if(f.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,u,a),f.version=u.version}}return{get:i,remove:o,update:s}}var yc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ac=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Oc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jc=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kc=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ic=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xc=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zc=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Lc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,kc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Jc=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tc=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ec="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fc=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Rc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Uc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vc=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_c=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$c=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,eq=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tq=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nq=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rq=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,iq=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,oq=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sq=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uq=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,aq=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fq=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pq=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hq=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cq=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qq=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gq=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mq=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yq=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Aq=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Oq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jq=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dq=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kq=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Iq=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pq=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bq=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xq=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zq=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lq=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sq=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mq=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cq=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wq=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gq=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yq=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dq=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kq=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jq=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xq=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tq=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zq=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wq=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nq=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bq=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eq=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fq=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rq=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Uq=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vq=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qq=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,_q=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$q=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ng=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ig=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ug=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ag=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,mg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:yc,alphahash_pars_fragment:Ac,alphamap_fragment:Hc,alphamap_pars_fragment:lc,alphatest_fragment:vc,alphatest_pars_fragment:Oc,aomap_fragment:jc,aomap_pars_fragment:dc,batching_pars_vertex:Kc,batching_vertex:Ic,begin_vertex:Pc,beginnormal_vertex:bc,bsdfs:xc,iridescence_fragment:zc,bumpmap_pars_fragment:Lc,clipping_planes_fragment:Sc,clipping_planes_pars_fragment:Mc,clipping_planes_pars_vertex:Cc,clipping_planes_vertex:wc,color_fragment:Gc,color_pars_fragment:Yc,color_pars_vertex:Dc,color_vertex:kc,common:Jc,cube_uv_reflection_fragment:Xc,defaultnormal_vertex:Tc,displacementmap_pars_vertex:Zc,displacementmap_vertex:Wc,emissivemap_fragment:Nc,emissivemap_pars_fragment:Bc,colorspace_fragment:Ec,colorspace_pars_fragment:Fc,envmap_fragment:Rc,envmap_common_pars_fragment:Uc,envmap_pars_fragment:Vc,envmap_pars_vertex:Qc,envmap_physical_pars_fragment:aq,envmap_vertex:_c,fog_vertex:$c,fog_pars_vertex:eq,fog_fragment:tq,fog_pars_fragment:nq,gradientmap_pars_fragment:rq,lightmap_pars_fragment:iq,lights_lambert_fragment:oq,lights_lambert_pars_fragment:sq,lights_pars_begin:uq,lights_toon_fragment:fq,lights_toon_pars_fragment:pq,lights_phong_fragment:hq,lights_phong_pars_fragment:cq,lights_physical_fragment:qq,lights_physical_pars_fragment:gq,lights_fragment_begin:mq,lights_fragment_maps:yq,lights_fragment_end:Aq,logdepthbuf_fragment:Hq,logdepthbuf_pars_fragment:lq,logdepthbuf_pars_vertex:vq,logdepthbuf_vertex:Oq,map_fragment:jq,map_pars_fragment:dq,map_particle_fragment:Kq,map_particle_pars_fragment:Iq,metalnessmap_fragment:Pq,metalnessmap_pars_fragment:bq,morphinstance_vertex:xq,morphcolor_vertex:zq,morphnormal_vertex:Lq,morphtarget_pars_vertex:Sq,morphtarget_vertex:Mq,normal_fragment_begin:Cq,normal_fragment_maps:wq,normal_pars_fragment:Gq,normal_pars_vertex:Yq,normal_vertex:Dq,normalmap_pars_fragment:kq,clearcoat_normal_fragment_begin:Jq,clearcoat_normal_fragment_maps:Xq,clearcoat_pars_fragment:Tq,iridescence_pars_fragment:Zq,opaque_fragment:Wq,packing:Nq,premultiplied_alpha_fragment:Bq,project_vertex:Eq,dithering_fragment:Fq,dithering_pars_fragment:Rq,roughnessmap_fragment:Uq,roughnessmap_pars_fragment:Vq,shadowmap_pars_fragment:Qq,shadowmap_pars_vertex:_q,shadowmap_vertex:$q,shadowmask_pars_fragment:eg,skinbase_vertex:tg,skinning_pars_vertex:ng,skinning_vertex:rg,skinnormal_vertex:ig,specularmap_fragment:og,specularmap_pars_fragment:sg,tonemapping_fragment:ug,tonemapping_pars_fragment:ag,transmission_fragment:fg,transmission_pars_fragment:pg,uv_pars_fragment:hg,uv_pars_vertex:cg,uv_vertex:qg,worldpos_vertex:gg,background_vert:mg,background_frag:yg,backgroundCube_vert:Ag,backgroundCube_frag:Hg,cube_vert:lg,cube_frag:vg,depth_vert:Og,depth_frag:jg,distanceRGBA_vert:dg,distanceRGBA_frag:Kg,equirect_vert:Ig,equirect_frag:Pg,linedashed_vert:bg,linedashed_frag:xg,meshbasic_vert:zg,meshbasic_frag:Lg,meshlambert_vert:Sg,meshlambert_frag:Mg,meshmatcap_vert:Cg,meshmatcap_frag:wg,meshnormal_vert:Gg,meshnormal_frag:Yg,meshphong_vert:Dg,meshphong_frag:kg,meshphysical_vert:Jg,meshphysical_frag:Xg,meshtoon_vert:Tg,meshtoon_frag:Zg,points_vert:Wg,points_frag:Ng,shadow_vert:Bg,shadow_frag:Eg,sprite_vert:Fg,sprite_frag:Rg},Ke={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},Rn={basic:{uniforms:Vt([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:Vt([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,Ke.lights,{emissive:{value:new $e(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:Vt([Ke.common,Ke.specularmap,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,Ke.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:Vt([Ke.common,Ke.envmap,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.roughnessmap,Ke.metalnessmap,Ke.fog,Ke.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:Vt([Ke.common,Ke.aomap,Ke.lightmap,Ke.emissivemap,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.gradientmap,Ke.fog,Ke.lights,{emissive:{value:new $e(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:Vt([Ke.common,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,Ke.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:Vt([Ke.points,Ke.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:Vt([Ke.common,Ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:Vt([Ke.common,Ke.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:Vt([Ke.common,Ke.bumpmap,Ke.normalmap,Ke.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:Vt([Ke.sprite,Ke.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:Vt([Ke.common,Ke.displacementmap,{referencePosition:{value:new M},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:Vt([Ke.lights,Ke.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};Rn.physical={uniforms:Vt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};var ta={r:0,b:0,g:0},ri=new Gn,Ug=new pt;function Vg(r,e,t,n,i,o,s){let u=new $e(0),a=o===!0?0:1,f,p,h=null,q=0,c=null;function m(j){let H=j.isScene===!0?j.background:null;return H&&H.isTexture&&(H=(j.backgroundBlurriness>0?t:e).get(H)),H}function A(j){let H=!1,I=m(j);I===null?g(u,a):I&&I.isColor&&(g(I,1),H=!0);let P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(r.autoClear||H)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(j,H){let I=m(H);I&&(I.isCubeTexture||I.mapping===Vo)?(p===void 0&&(p=new Pe(new Lt(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:ni(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(P,z,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(p)),ri.copy(H.backgroundRotation),ri.x*=-1,ri.y*=-1,ri.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),p.material.uniforms.envMap.value=I,p.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=H.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(Ug.makeRotationFromEuler(ri)),p.material.toneMapped=ct.getTransfer(I.colorSpace)!==At,(h!==I||q!==I.version||c!==r.toneMapping)&&(p.material.needsUpdate=!0,h=I,q=I.version,c=r.toneMapping),p.layers.enableAll(),j.unshift(p,p.geometry,p.material,0,0,null)):I&&I.isTexture&&(f===void 0&&(f=new Pe(new jt(2,2),new gn({name:"BackgroundMaterial",uniforms:ni(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(f)),f.material.uniforms.t2D.value=I,f.material.uniforms.backgroundIntensity.value=H.backgroundIntensity,f.material.toneMapped=ct.getTransfer(I.colorSpace)!==At,I.matrixAutoUpdate===!0&&I.updateMatrix(),f.material.uniforms.uvTransform.value.copy(I.matrix),(h!==I||q!==I.version||c!==r.toneMapping)&&(f.material.needsUpdate=!0,h=I,q=I.version,c=r.toneMapping),f.layers.enableAll(),j.unshift(f,f.geometry,f.material,0,0,null))}function g(j,H){j.getRGB(ta,yf(r)),n.buffers.color.setClear(ta.r,ta.g,ta.b,H,s)}function K(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0)}return{getClearColor:function(){return u},setClearColor:function(j,H=1){u.set(j),a=H,g(u,a)},getClearAlpha:function(){return a},setClearAlpha:function(j){a=j,g(u,a)},render:A,addToRenderList:y,dispose:K}}function Qg(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=q(null),o=i,s=!1;function u(v,L,G,D,k){let C=!1,J=h(D,G,L);o!==J&&(o=J,f(o.object)),C=c(v,D,G,k),C&&m(v,D,G,k),k!==null&&e.update(k,r.ELEMENT_ARRAY_BUFFER),(C||s)&&(s=!1,H(v,L,G,D),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function a(){return r.createVertexArray()}function f(v){return r.bindVertexArray(v)}function p(v){return r.deleteVertexArray(v)}function h(v,L,G){let D=G.wireframe===!0,k=n[v.id];k===void 0&&(k={},n[v.id]=k);let C=k[L.id];C===void 0&&(C={},k[L.id]=C);let J=C[D];return J===void 0&&(J=q(a()),C[D]=J),J}function q(v){let L=[],G=[],D=[];for(let k=0;k<t;k++)L[k]=0,G[k]=0,D[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:G,attributeDivisors:D,object:v,attributes:{},index:null}}function c(v,L,G,D){let k=o.attributes,C=L.attributes,J=0,R=G.getAttributes();for(let W in R)if(R[W].location>=0){let ge=k[W],le=C[W];if(le===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(le=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(le=v.instanceColor)),ge===void 0||ge.attribute!==le||le&&ge.data!==le.data)return!0;J++}return o.attributesNum!==J||o.index!==D}function m(v,L,G,D){let k={},C=L.attributes,J=0,R=G.getAttributes();for(let W in R)if(R[W].location>=0){let ge=C[W];ge===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(ge=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(ge=v.instanceColor));let le={};le.attribute=ge,ge&&ge.data&&(le.data=ge.data),k[W]=le,J++}o.attributes=k,o.attributesNum=J,o.index=D}function A(){let v=o.newAttributes;for(let L=0,G=v.length;L<G;L++)v[L]=0}function y(v){g(v,0)}function g(v,L){let G=o.newAttributes,D=o.enabledAttributes,k=o.attributeDivisors;G[v]=1,D[v]===0&&(r.enableVertexAttribArray(v),D[v]=1),k[v]!==L&&(r.vertexAttribDivisor(v,L),k[v]=L)}function K(){let v=o.newAttributes,L=o.enabledAttributes;for(let G=0,D=L.length;G<D;G++)L[G]!==v[G]&&(r.disableVertexAttribArray(G),L[G]=0)}function j(v,L,G,D,k,C,J){J===!0?r.vertexAttribIPointer(v,L,G,k,C):r.vertexAttribPointer(v,L,G,D,k,C)}function H(v,L,G,D){A();let k=D.attributes,C=G.getAttributes(),J=L.defaultAttributeValues;for(let R in C){let W=C[R];if(W.location>=0){let ae=k[R];if(ae===void 0&&(R==="instanceMatrix"&&v.instanceMatrix&&(ae=v.instanceMatrix),R==="instanceColor"&&v.instanceColor&&(ae=v.instanceColor)),ae!==void 0){let ge=ae.normalized,le=ae.itemSize,Le=e.get(ae);if(Le===void 0)continue;let we=Le.buffer,We=Le.type,et=Le.bytesPerElement,Q=We===r.INT||We===r.UNSIGNED_INT||ae.gpuType===lu;if(ae.isInterleavedBufferAttribute){let re=ae.data,be=re.stride,Ye=ae.offset;if(re.isInstancedInterleavedBuffer){for(let Ge=0;Ge<W.locationSize;Ge++)g(W.location+Ge,re.meshPerAttribute);v.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ge=0;Ge<W.locationSize;Ge++)y(W.location+Ge);r.bindBuffer(r.ARRAY_BUFFER,we);for(let Ge=0;Ge<W.locationSize;Ge++)j(W.location+Ge,le/W.locationSize,We,ge,be*et,(Ye+le/W.locationSize*Ge)*et,Q)}else{if(ae.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)g(W.location+re,ae.meshPerAttribute);v.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let re=0;re<W.locationSize;re++)y(W.location+re);r.bindBuffer(r.ARRAY_BUFFER,we);for(let re=0;re<W.locationSize;re++)j(W.location+re,le/W.locationSize,We,ge,le*et,le/W.locationSize*re*et,Q)}}else if(J!==void 0){let ge=J[R];if(ge!==void 0)switch(ge.length){case 2:r.vertexAttrib2fv(W.location,ge);break;case 3:r.vertexAttrib3fv(W.location,ge);break;case 4:r.vertexAttrib4fv(W.location,ge);break;default:r.vertexAttrib1fv(W.location,ge)}}}}K()}function I(){b();for(let v in n){let L=n[v];for(let G in L){let D=L[G];for(let k in D)p(D[k].object),delete D[k];delete L[G]}delete n[v]}}function P(v){if(n[v.id]===void 0)return;let L=n[v.id];for(let G in L){let D=L[G];for(let k in D)p(D[k].object),delete D[k];delete L[G]}delete n[v.id]}function z(v){for(let L in n){let G=n[L];if(G[v.id]===void 0)continue;let D=G[v.id];for(let k in D)p(D[k].object),delete D[k];delete G[v.id]}}function b(){O(),s=!0,o!==i&&(o=i,f(o.object))}function O(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:u,reset:b,resetDefaultState:O,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:z,initAttributes:A,enableAttribute:y,disableUnusedAttributes:K}}function _g(r,e,t){let n;function i(f){n=f}function o(f,p){r.drawArrays(n,f,p),t.update(p,n,1)}function s(f,p,h){h!==0&&(r.drawArraysInstanced(n,f,p,h),t.update(p,n,h))}function u(f,p,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,f,0,p,0,h);let c=0;for(let m=0;m<h;m++)c+=p[m];t.update(c,n,1)}function a(f,p,h,q){if(h===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let m=0;m<f.length;m++)s(f[m],p[m],q[m]);else{c.multiDrawArraysInstancedWEBGL(n,f,0,p,0,q,0,h);let m=0;for(let A=0;A<h;A++)m+=p[A]*q[A];t.update(m,n,1)}}this.setMode=i,this.render=o,this.renderInstances=s,this.renderMultiDraw=u,this.renderMultiDrawInstances=a}function $g(r,e,t,n){let i;function o(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let z=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(z){return!(z!==un&&n.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(z){let b=z===Hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==Dn&&n.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==tn&&!b)}function a(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=t.precision!==void 0?t.precision:"highp",p=a(f);p!==f&&(console.warn("THREE.WebGLRenderer:",f,"not supported, using",p,"instead."),f=p);let h=t.logarithmicDepthBuffer===!0,q=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),c=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),K=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),j=r.getParameter(r.MAX_VARYING_VECTORS),H=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,P=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:a,textureFormatReadable:s,textureTypeReadable:u,precision:f,logarithmicDepthBuffer:h,reversedDepthBuffer:q,maxTextures:c,maxVertexTextures:m,maxTextureSize:A,maxCubemapSize:y,maxAttributes:g,maxVertexUniforms:K,maxVaryings:j,maxFragmentUniforms:H,vertexTextures:I,maxSamples:P}}function em(r){let e=this,t=null,n=0,i=!1,o=!1,s=new rn,u=new nt,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(h,q){let c=h.length!==0||q||n!==0||i;return i=q,n=h.length,c},this.beginShadows=function(){o=!0,p(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(h,q){t=p(h,q,0)},this.setState=function(h,q,c){let m=h.clippingPlanes,A=h.clipIntersection,y=h.clipShadows,g=r.get(h);if(!i||m===null||m.length===0||o&&!y)o?p(null):f();else{let K=o?0:n,j=K*4,H=g.clippingState||null;a.value=H,H=p(m,q,j,c);for(let I=0;I!==j;++I)H[I]=t[I];g.clippingState=H,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=K}};function f(){a.value!==t&&(a.value=t,a.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function p(h,q,c,m){let A=h!==null?h.length:0,y=null;if(A!==0){if(y=a.value,m!==!0||y===null){let g=c+A*4,K=q.matrixWorldInverse;u.getNormalMatrix(K),(y===null||y.length<g)&&(y=new Float32Array(g));for(let j=0,H=c;j!==A;++j,H+=4)s.copy(h[j]).applyMatrix4(K,u),s.normal.toArray(y,H),y[H+3]=s.constant}a.value=y,a.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,y}}function tm(r){let e=new WeakMap;function t(s,u){return u===Bi?s.mapping=_r:u===Au&&(s.mapping=$r),s}function n(s){if(s&&s.isTexture){let u=s.mapping;if(u===Bi||u===Au)if(e.has(s)){let a=e.get(s).texture;return t(a,s.mapping)}else{let a=s.image;if(a&&a.height>0){let f=new Ts(a.height);return f.fromEquirectangularTexture(r,s),e.set(s,f),s.addEventListener("dispose",i),t(f.texture,s.mapping)}else return null}}return s}function i(s){let u=s.target;u.removeEventListener("dispose",i);let a=e.get(u);a!==void 0&&(e.delete(u),a.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}var Qi=4,Cp=[.125,.215,.35,.446,.526,.582],si=20,Of=new Eo,wp=new $e,jf=null,df=0,Kf=0,If=!1,oi=(1+Math.sqrt(5))/2,Vi=1/oi,Gp=[new M(-oi,Vi,0),new M(oi,Vi,0),new M(-Vi,0,oi),new M(Vi,0,oi),new M(0,oi,-Vi),new M(0,oi,Vi),new M(-1,1,-1),new M(1,1,-1),new M(-1,1,1),new M(1,1,1)],nm=new M,$i=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,o={}){let{size:s=256,position:u=nm}=o;jf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),Kf=this._renderer.getActiveMipmapLevel(),If=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,i,a,u),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jf,df,Kf),this._renderer.xr.enabled=If,e.scissorTest=!1,na(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_r||e.mapping===$r?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),Kf=this._renderer.getActiveMipmapLevel(),If=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Hn,format:un,colorSpace:ur,depthBuffer:!1},i=Yp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yp(e,t,n);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rm(o)),this._blurMaterial=im(o,e,t)}return i}_compileMaterial(e){let t=new Pe(this._lodPlanes[0],e);this._renderer.compile(t,Of)}_sceneToCubeUV(e,t,n,i,o){let a=new Jt(90,1,t,n),f=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],h=this._renderer,q=h.autoClear,c=h.toneMapping;h.getClearColor(wp),h.toneMapping=hr,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));let A=new Nn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),y=new Pe(new Lt,A),g=!1,K=e.background;K?K.isColor&&(A.color.copy(K),e.background=null,g=!0):(A.color.copy(wp),g=!0);for(let j=0;j<6;j++){let H=j%3;H===0?(a.up.set(0,f[j],0),a.position.set(o.x,o.y,o.z),a.lookAt(o.x+p[j],o.y,o.z)):H===1?(a.up.set(0,0,f[j]),a.position.set(o.x,o.y,o.z),a.lookAt(o.x,o.y+p[j],o.z)):(a.up.set(0,f[j],0),a.position.set(o.x,o.y,o.z),a.lookAt(o.x,o.y,o.z+p[j]));let I=this._cubeSize;na(i,H*I,j>2?I:0,I,I),h.setRenderTarget(i),g&&h.render(y,a),h.render(e,a)}y.geometry.dispose(),y.material.dispose(),h.toneMapping=c,h.autoClear=q,e.background=K}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===_r||e.mapping===$r;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dp());let o=i?this._cubemapMaterial:this._equirectMaterial,s=new Pe(this._lodPlanes[0],o),u=o.uniforms;u.envMap.value=e;let a=this._cubeSize;na(t,0,0,3*a,2*a),n.setRenderTarget(t),n.render(s,Of)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let o=1;o<i;o++){let s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),u=Gp[(i-o-1)%Gp.length];this._blur(e,o-1,o,s,u)}t.autoClear=n}_blur(e,t,n,i,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,i,"latitudinal",o),this._halfBlur(s,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,s,u){let a=this._renderer,f=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let p=3,h=new Pe(this._lodPlanes[i],f),q=f.uniforms,c=this._sizeLods[n]-1,m=isFinite(o)?Math.PI/(2*c):2*Math.PI/(2*si-1),A=o/m,y=isFinite(o)?1+Math.floor(p*A):si;y>si&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${si}`);let g=[],K=0;for(let z=0;z<si;++z){let b=z/A,O=Math.exp(-b*b/2);g.push(O),z===0?K+=O:z<y&&(K+=2*O)}for(let z=0;z<g.length;z++)g[z]=g[z]/K;q.envMap.value=e.texture,q.samples.value=y,q.weights.value=g,q.latitudinal.value=s==="latitudinal",u&&(q.poleAxis.value=u);let{_lodMax:j}=this;q.dTheta.value=m,q.mipInt.value=j-n;let H=this._sizeLods[i],I=3*H*(i>j-Qi?i-j+Qi:0),P=4*(this._cubeSize-H);na(t,I,P,3*H,2*H),a.setRenderTarget(t),a.render(h,Of)}};function rm(r){let e=[],t=[],n=[],i=r,o=r-Qi+1+Cp.length;for(let s=0;s<o;s++){let u=Math.pow(2,i);t.push(u);let a=1/u;s>r-Qi?a=Cp[s-r+Qi-1]:s===0&&(a=0),n.push(a);let f=1/(u-2),p=-f,h=1+f,q=[p,p,h,p,h,h,p,p,h,h,p,h],c=6,m=6,A=3,y=2,g=1,K=new Float32Array(A*m*c),j=new Float32Array(y*m*c),H=new Float32Array(g*m*c);for(let P=0;P<c;P++){let z=P%3*2/3-1,b=P>2?0:-1,O=[z,b,0,z+2/3,b,0,z+2/3,b+1,0,z,b,0,z+2/3,b+1,0,z,b+1,0];K.set(O,A*m*P),j.set(q,y*m*P);let v=[P,P,P,P,P,P];H.set(v,g*m*P)}let I=new Xt;I.setAttribute("position",new It(K,A)),I.setAttribute("uv",new It(j,y)),I.setAttribute("faceIndex",new It(H,g)),e.push(I),i>Qi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yp(r,e,t){let n=new Pn(r,e,t);return n.texture.mapping=Vo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function na(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function im(r,e,t){let n=new Float32Array(si),i=new M(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function Dp(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function kp(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function Yf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function om(r){let e=new WeakMap,t=null;function n(u){if(u&&u.isTexture){let a=u.mapping,f=a===Bi||a===Au,p=a===_r||a===$r;if(f||p){let h=e.get(u),q=h!==void 0?h.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==q)return t===null&&(t=new $i(r)),h=f?t.fromEquirectangular(u,h):t.fromCubemap(u,h),h.texture.pmremVersion=u.pmremVersion,e.set(u,h),h.texture;if(h!==void 0)return h.texture;{let c=u.image;return f&&c&&c.height>0||p&&c&&i(c)?(t===null&&(t=new $i(r)),h=f?t.fromEquirectangular(u):t.fromCubemap(u),h.texture.pmremVersion=u.pmremVersion,e.set(u,h),u.addEventListener("dispose",o),h.texture):null}}}return u}function i(u){let a=0,f=6;for(let p=0;p<f;p++)u[p]!==void 0&&a++;return a===f}function o(u){let a=u.target;a.removeEventListener("dispose",o);let f=e.get(a);f!==void 0&&(e.delete(a),f.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function sm(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Gi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function um(r,e,t,n){let i={},o=new WeakMap;function s(h){let q=h.target;q.index!==null&&e.remove(q.index);for(let m in q.attributes)e.remove(q.attributes[m]);q.removeEventListener("dispose",s),delete i[q.id];let c=o.get(q);c&&(e.remove(c),o.delete(q)),n.releaseStatesOfGeometry(q),q.isInstancedBufferGeometry===!0&&delete q._maxInstanceCount,t.memory.geometries--}function u(h,q){return i[q.id]===!0||(q.addEventListener("dispose",s),i[q.id]=!0,t.memory.geometries++),q}function a(h){let q=h.attributes;for(let c in q)e.update(q[c],r.ARRAY_BUFFER)}function f(h){let q=[],c=h.index,m=h.attributes.position,A=0;if(c!==null){let K=c.array;A=c.version;for(let j=0,H=K.length;j<H;j+=3){let I=K[j+0],P=K[j+1],z=K[j+2];q.push(I,P,P,z,z,I)}}else if(m!==void 0){let K=m.array;A=m.version;for(let j=0,H=K.length/3-1;j<H;j+=3){let I=j+0,P=j+1,z=j+2;q.push(I,P,P,z,z,I)}}else return;let y=new(mf(q)?Oo:vo)(q,1);y.version=A;let g=o.get(h);g&&e.remove(g),o.set(h,y)}function p(h){let q=o.get(h);if(q){let c=h.index;c!==null&&q.version<c.version&&f(h)}else f(h);return o.get(h)}return{get:u,update:a,getWireframeAttribute:p}}function am(r,e,t){let n;function i(q){n=q}let o,s;function u(q){o=q.type,s=q.bytesPerElement}function a(q,c){r.drawElements(n,c,o,q*s),t.update(c,n,1)}function f(q,c,m){m!==0&&(r.drawElementsInstanced(n,c,o,q*s,m),t.update(c,n,m))}function p(q,c,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,o,q,0,m);let y=0;for(let g=0;g<m;g++)y+=c[g];t.update(y,n,1)}function h(q,c,m,A){if(m===0)return;let y=e.get("WEBGL_multi_draw");if(y===null)for(let g=0;g<q.length;g++)f(q[g]/s,c[g],A[g]);else{y.multiDrawElementsInstancedWEBGL(n,c,0,o,q,0,A,0,m);let g=0;for(let K=0;K<m;K++)g+=c[K]*A[K];t.update(g,n,1)}}this.setMode=i,this.setIndex=u,this.render=a,this.renderInstances=f,this.renderMultiDraw=p,this.renderMultiDrawInstances=h}function fm(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,u){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=u*(o/3);break;case r.LINES:t.lines+=u*(o/2);break;case r.LINE_STRIP:t.lines+=u*(o-1);break;case r.LINE_LOOP:t.lines+=u*o;break;case r.POINTS:t.points+=u*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function pm(r,e,t){let n=new WeakMap,i=new vt;function o(s,u,a){let f=s.morphTargetInfluences,p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,h=p!==void 0?p.length:0,q=n.get(u);if(q===void 0||q.count!==h){let O=function(){z.dispose(),n.delete(u),u.removeEventListener("dispose",O)};q!==void 0&&q.texture.dispose();let c=u.morphAttributes.position!==void 0,m=u.morphAttributes.normal!==void 0,A=u.morphAttributes.color!==void 0,y=u.morphAttributes.position||[],g=u.morphAttributes.normal||[],K=u.morphAttributes.color||[],j=0;c===!0&&(j=1),m===!0&&(j=2),A===!0&&(j=3);let H=u.attributes.position.count*j,I=1;H>e.maxTextureSize&&(I=Math.ceil(H/e.maxTextureSize),H=e.maxTextureSize);let P=new Float32Array(H*I*4*h),z=new lo(P,H,I,h);z.type=tn,z.needsUpdate=!0;let b=j*4;for(let v=0;v<h;v++){let L=y[v],G=g[v],D=K[v],k=H*I*4*v;for(let C=0;C<L.count;C++){let J=C*b;c===!0&&(i.fromBufferAttribute(L,C),P[k+J+0]=i.x,P[k+J+1]=i.y,P[k+J+2]=i.z,P[k+J+3]=0),m===!0&&(i.fromBufferAttribute(G,C),P[k+J+4]=i.x,P[k+J+5]=i.y,P[k+J+6]=i.z,P[k+J+7]=0),A===!0&&(i.fromBufferAttribute(D,C),P[k+J+8]=i.x,P[k+J+9]=i.y,P[k+J+10]=i.z,P[k+J+11]=D.itemSize===4?i.w:1)}}q={count:h,texture:z,size:new se(H,I)},n.set(u,q),u.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)a.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let c=0;for(let A=0;A<f.length;A++)c+=f[A];let m=u.morphTargetsRelative?1:1-c;a.getUniforms().setValue(r,"morphTargetBaseInfluence",m),a.getUniforms().setValue(r,"morphTargetInfluences",f)}a.getUniforms().setValue(r,"morphTargetsTexture",q.texture,t),a.getUniforms().setValue(r,"morphTargetsTextureSize",q.size)}return{update:o}}function hm(r,e,t,n){let i=new WeakMap;function o(a){let f=n.render.frame,p=a.geometry,h=e.get(a,p);if(i.get(h)!==f&&(e.update(h),i.set(h,f)),a.isInstancedMesh&&(a.hasEventListener("dispose",u)===!1&&a.addEventListener("dispose",u),i.get(a)!==f&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,f))),a.isSkinnedMesh){let q=a.skeleton;i.get(q)!==f&&(q.update(),i.set(q,f))}return h}function s(){i=new WeakMap}function u(a){let f=a.target;f.removeEventListener("dispose",u),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:s}}var rh=new Wt,Jp=new zo(1,1),ih=new lo,oh=new Js,sh=new Ko,Xp=[],Tp=[],Zp=new Float32Array(16),Wp=new Float32Array(9),Np=new Float32Array(4);function eo(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,o=Xp[i];if(o===void 0&&(o=new Float32Array(i),Xp[i]=o),e!==0){n.toArray(o,0);for(let s=1,u=0;s!==e;++s)u+=t,r[s].toArray(o,u)}return o}function Gt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Yt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function oa(r,e){let t=Tp[e];t===void 0&&(t=new Int32Array(e),Tp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function cm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function qm(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2fv(this.addr,e),Yt(t,e)}}function gm(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;r.uniform3fv(this.addr,e),Yt(t,e)}}function mm(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4fv(this.addr,e),Yt(t,e)}}function ym(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(Gt(t,n))return;Np.set(n),r.uniformMatrix2fv(this.addr,!1,Np),Yt(t,n)}}function Am(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(Gt(t,n))return;Wp.set(n),r.uniformMatrix3fv(this.addr,!1,Wp),Yt(t,n)}}function Hm(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(Gt(t,n))return;Zp.set(n),r.uniformMatrix4fv(this.addr,!1,Zp),Yt(t,n)}}function lm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function vm(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2iv(this.addr,e),Yt(t,e)}}function Om(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3iv(this.addr,e),Yt(t,e)}}function jm(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4iv(this.addr,e),Yt(t,e)}}function dm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Km(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2uiv(this.addr,e),Yt(t,e)}}function Im(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3uiv(this.addr,e),Yt(t,e)}}function Pm(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4uiv(this.addr,e),Yt(t,e)}}function bm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let o;this.type===r.SAMPLER_2D_SHADOW?(Jp.compareFunction=cf,o=Jp):o=rh,t.setTexture2D(e||o,i)}function xm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||oh,i)}function zm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||sh,i)}function Lm(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ih,i)}function Sm(r){switch(r){case 5126:return cm;case 35664:return qm;case 35665:return gm;case 35666:return mm;case 35674:return ym;case 35675:return Am;case 35676:return Hm;case 5124:case 35670:return lm;case 35667:case 35671:return vm;case 35668:case 35672:return Om;case 35669:case 35673:return jm;case 5125:return dm;case 36294:return Km;case 36295:return Im;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return xm;case 35680:case 36300:case 36308:case 36293:return zm;case 36289:case 36303:case 36311:case 36292:return Lm}}function Mm(r,e){r.uniform1fv(this.addr,e)}function Cm(r,e){let t=eo(e,this.size,2);r.uniform2fv(this.addr,t)}function wm(r,e){let t=eo(e,this.size,3);r.uniform3fv(this.addr,t)}function Gm(r,e){let t=eo(e,this.size,4);r.uniform4fv(this.addr,t)}function Ym(r,e){let t=eo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Dm(r,e){let t=eo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function km(r,e){let t=eo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Jm(r,e){r.uniform1iv(this.addr,e)}function Xm(r,e){r.uniform2iv(this.addr,e)}function Tm(r,e){r.uniform3iv(this.addr,e)}function Zm(r,e){r.uniform4iv(this.addr,e)}function Wm(r,e){r.uniform1uiv(this.addr,e)}function Nm(r,e){r.uniform2uiv(this.addr,e)}function Bm(r,e){r.uniform3uiv(this.addr,e)}function Em(r,e){r.uniform4uiv(this.addr,e)}function Fm(r,e,t){let n=this.cache,i=e.length,o=oa(t,i);Gt(n,o)||(r.uniform1iv(this.addr,o),Yt(n,o));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||rh,o[s])}function Rm(r,e,t){let n=this.cache,i=e.length,o=oa(t,i);Gt(n,o)||(r.uniform1iv(this.addr,o),Yt(n,o));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||oh,o[s])}function Um(r,e,t){let n=this.cache,i=e.length,o=oa(t,i);Gt(n,o)||(r.uniform1iv(this.addr,o),Yt(n,o));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||sh,o[s])}function Vm(r,e,t){let n=this.cache,i=e.length,o=oa(t,i);Gt(n,o)||(r.uniform1iv(this.addr,o),Yt(n,o));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||ih,o[s])}function Qm(r){switch(r){case 5126:return Mm;case 35664:return Cm;case 35665:return wm;case 35666:return Gm;case 35674:return Ym;case 35675:return Dm;case 35676:return km;case 5124:case 35670:return Jm;case 35667:case 35671:return Xm;case 35668:case 35672:return Tm;case 35669:case 35673:return Zm;case 5125:return Wm;case 36294:return Nm;case 36295:return Bm;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Vm}}var bf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Sm(t.type)}},xf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qm(t.type)}},zf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let o=0,s=i.length;o!==s;++o){let u=i[o];u.setValue(e,t[u.id],n)}}},Pf=/(\w+)(\])?(\[|\.)?/g;function Bp(r,e){r.seq.push(e),r.map[e.id]=e}function _m(r,e,t){let n=r.name,i=n.length;for(Pf.lastIndex=0;;){let o=Pf.exec(n),s=Pf.lastIndex,u=o[1],a=o[2]==="]",f=o[3];if(a&&(u=u|0),f===void 0||f==="["&&s+2===i){Bp(t,f===void 0?new bf(u,r,e):new xf(u,r,e));break}else{let h=t.map[u];h===void 0&&(h=new zf(u),Bp(t,h)),t=h}}}var _i=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let o=e.getActiveUniform(t,i),s=e.getUniformLocation(t,o.name);_m(o,s,this)}}setValue(e,t,n,i){let o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,s=t.length;o!==s;++o){let u=t[o],a=n[u.id];a.needsUpdate!==!1&&u.setValue(e,a.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,o=e.length;i!==o;++i){let s=e[i];s.id in t&&n.push(s)}return n}};function Ep(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var $m=37297,ey=0;function ty(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=i;s<o;s++){let u=s+1;n.push(`${u===e?">":" "} ${u}: ${t[s]}`)}return n.join(`
`)}var Fp=new nt;function ny(r){ct._getMatrix(Fp,ct.workingColorSpace,r);let e=`mat3( ${Fp.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(r)){case Ao:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Rp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),o=(r.getShaderInfoLog(e)||"").trim();if(n&&o==="")return"";let s=/ERROR: 0:(\d+)/.exec(o);if(s){let u=parseInt(s[1]);return t.toUpperCase()+`

`+o+`

`+ty(r.getShaderSource(e),u)}else return o}function ry(r,e){let t=ny(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function iy(r,e){let t;switch(e){case fp:t="Linear";break;case pp:t="Reinhard";break;case hp:t="Cineon";break;case yu:t="ACESFilmic";break;case qp:t="AgX";break;case gp:t="Neutral";break;case cp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ra=new M;function oy(){ct.getLuminanceCoefficients(ra);let r=ra.x.toFixed(4),e=ra.y.toFixed(4),t=ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ts).join(`
`)}function uy(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ay(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let o=r.getActiveAttrib(e,i),s=o.name,u=1;o.type===r.FLOAT_MAT2&&(u=2),o.type===r.FLOAT_MAT3&&(u=3),o.type===r.FLOAT_MAT4&&(u=4),t[s]={type:o.type,location:r.getAttribLocation(e,s),locationSize:u}}return t}function ts(r){return r!==""}function Up(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var fy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lf(r){return r.replace(fy,hy)}var py=new Map;function hy(r,e){let t=it[e];if(t===void 0){let n=py.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Lf(t)}var cy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qp(r){return r.replace(cy,qy)}function qy(r,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function _p(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gy(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Qa?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===au?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function my(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case _r:case $r:e="ENVMAP_TYPE_CUBE";break;case Vo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yy(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===$r&&(e="ENVMAP_MODE_REFRACTION"),e}function Ay(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case tf:e="ENVMAP_BLENDING_MULTIPLY";break;case up:e="ENVMAP_BLENDING_MIX";break;case ap:e="ENVMAP_BLENDING_ADD";break}return e}function Hy(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ly(r,e,t,n){let i=r.getContext(),o=t.defines,s=t.vertexShader,u=t.fragmentShader,a=gy(t),f=my(t),p=yy(t),h=Ay(t),q=Hy(t),c=sy(t),m=uy(o),A=i.createProgram(),y,g,K=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ts).join(`
`),y.length>0&&(y+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ts).join(`
`),g.length>0&&(g+=`
`)):(y=[_p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),g=[_p(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+p:"",t.envMap?"#define "+h:"",q?"#define CUBEUV_TEXEL_WIDTH "+q.texelWidth:"",q?"#define CUBEUV_TEXEL_HEIGHT "+q.texelHeight:"",q?"#define CUBEUV_MAX_MIP "+q.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hr?"#define TONE_MAPPING":"",t.toneMapping!==hr?it.tonemapping_pars_fragment:"",t.toneMapping!==hr?iy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,ry("linearToOutputTexel",t.outputColorSpace),oy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ts).join(`
`)),s=Lf(s),s=Up(s,t),s=Vp(s,t),u=Lf(u),u=Up(u,t),u=Vp(u,t),s=Qp(s),u=Qp(u),t.isRawShaderMaterial!==!0&&(K=`#version 300 es
`,y=[c,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",t.glslVersion===qf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let j=K+y+s,H=K+g+u,I=Ep(i,i.VERTEX_SHADER,j),P=Ep(i,i.FRAGMENT_SHADER,H);i.attachShader(A,I),i.attachShader(A,P),t.index0AttributeName!==void 0?i.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(A,0,"position"),i.linkProgram(A);function z(L){if(r.debug.checkShaderErrors){let G=i.getProgramInfoLog(A)||"",D=i.getShaderInfoLog(I)||"",k=i.getShaderInfoLog(P)||"",C=G.trim(),J=D.trim(),R=k.trim(),W=!0,ae=!0;if(i.getProgramParameter(A,i.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,A,I,P);else{let ge=Rp(i,I,"vertex"),le=Rp(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(A,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+C+`
`+ge+`
`+le)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(J===""||R==="")&&(ae=!1);ae&&(L.diagnostics={runnable:W,programLog:C,vertexShader:{log:J,prefix:y},fragmentShader:{log:R,prefix:g}})}i.deleteShader(I),i.deleteShader(P),b=new _i(i,A),O=ay(i,A)}let b;this.getUniforms=function(){return b===void 0&&z(this),b};let O;this.getAttributes=function(){return O===void 0&&z(this),O};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(A,$m)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ey++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=I,this.fragmentShader=P,this}var vy=0,Sf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Mf(e),t.set(e,n)),n}},Mf=class{constructor(e){this.id=vy++,this.code=e,this.usedTimes=0}};function Oy(r,e,t,n,i,o,s){let u=new Di,a=new Sf,f=new Set,p=[],h=i.logarithmicDepthBuffer,q=i.vertexTextures,c=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(O){return f.add(O),O===0?"uv":`uv${O}`}function y(O,v,L,G,D){let k=G.fog,C=D.geometry,J=O.isMeshStandardMaterial?G.environment:null,R=(O.isMeshStandardMaterial?t:e).get(O.envMap||J),W=R&&R.mapping===Vo?R.image.height:null,ae=m[O.type];O.precision!==null&&(c=i.getMaxPrecision(O.precision),c!==O.precision&&console.warn("THREE.WebGLProgram.getParameters:",O.precision,"not supported, using",c,"instead."));let ge=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,le=ge!==void 0?ge.length:0,Le=0;C.morphAttributes.position!==void 0&&(Le=1),C.morphAttributes.normal!==void 0&&(Le=2),C.morphAttributes.color!==void 0&&(Le=3);let we,We,et,Q;if(ae){let ht=Rn[ae];we=ht.vertexShader,We=ht.fragmentShader}else we=O.vertexShader,We=O.fragmentShader,a.update(O),et=a.getVertexShaderID(O),Q=a.getFragmentShaderID(O);let re=r.getRenderTarget(),be=r.state.buffers.depth.getReversed(),Ye=D.isInstancedMesh===!0,Ge=D.isBatchedMesh===!0,ot=!!O.map,gt=!!O.matcap,w=!!R,ie=!!O.aoMap,$=!!O.lightMap,_=!!O.bumpMap,V=!!O.normalMap,Ae=!!O.displacementMap,qe=!!O.emissiveMap,ve=!!O.metalnessMap,Qe=!!O.roughnessMap,Ze=O.anisotropy>0,x=O.clearcoat>0,l=O.dispersion>0,T=O.iridescence>0,F=O.sheen>0,oe=O.transmission>0,U=Ze&&!!O.anisotropyMap,Se=x&&!!O.clearcoatMap,ye=x&&!!O.clearcoatNormalMap,ze=x&&!!O.clearcoatRoughnessMap,ke=T&&!!O.iridescenceMap,he=T&&!!O.iridescenceThicknessMap,je=F&&!!O.sheenColorMap,Ne=F&&!!O.sheenRoughnessMap,Je=!!O.specularMap,de=!!O.specularColorMap,Ve=!!O.specularIntensityMap,Y=oe&&!!O.transmissionMap,me=oe&&!!O.thicknessMap,He=!!O.gradientMap,Me=!!O.alphaMap,pe=O.alphaTest>0,ee=!!O.alphaHash,De=!!O.extensions,_e=hr;O.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(_e=r.toneMapping);let at={shaderID:ae,shaderType:O.type,shaderName:O.name,vertexShader:we,fragmentShader:We,defines:O.defines,customVertexShaderID:et,customFragmentShaderID:Q,isRawShaderMaterial:O.isRawShaderMaterial===!0,glslVersion:O.glslVersion,precision:c,batching:Ge,batchingColor:Ge&&D._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&D.instanceColor!==null,instancingMorph:Ye&&D.morphTexture!==null,supportsVertexTextures:q,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ur,alphaToCoverage:!!O.alphaToCoverage,map:ot,matcap:gt,envMap:w,envMapMode:w&&R.mapping,envMapCubeUVHeight:W,aoMap:ie,lightMap:$,bumpMap:_,normalMap:V,displacementMap:q&&Ae,emissiveMap:qe,normalMapObjectSpace:V&&O.normalMapType===Ap,normalMapTangentSpace:V&&O.normalMapType===hf,metalnessMap:ve,roughnessMap:Qe,anisotropy:Ze,anisotropyMap:U,clearcoat:x,clearcoatMap:Se,clearcoatNormalMap:ye,clearcoatRoughnessMap:ze,dispersion:l,iridescence:T,iridescenceMap:ke,iridescenceThicknessMap:he,sheen:F,sheenColorMap:je,sheenRoughnessMap:Ne,specularMap:Je,specularColorMap:de,specularIntensityMap:Ve,transmission:oe,transmissionMap:Y,thicknessMap:me,gradientMap:He,opaque:O.transparent===!1&&O.blending===Wr&&O.alphaToCoverage===!1,alphaMap:Me,alphaTest:pe,alphaHash:ee,combine:O.combine,mapUv:ot&&A(O.map.channel),aoMapUv:ie&&A(O.aoMap.channel),lightMapUv:$&&A(O.lightMap.channel),bumpMapUv:_&&A(O.bumpMap.channel),normalMapUv:V&&A(O.normalMap.channel),displacementMapUv:Ae&&A(O.displacementMap.channel),emissiveMapUv:qe&&A(O.emissiveMap.channel),metalnessMapUv:ve&&A(O.metalnessMap.channel),roughnessMapUv:Qe&&A(O.roughnessMap.channel),anisotropyMapUv:U&&A(O.anisotropyMap.channel),clearcoatMapUv:Se&&A(O.clearcoatMap.channel),clearcoatNormalMapUv:ye&&A(O.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&A(O.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&A(O.iridescenceMap.channel),iridescenceThicknessMapUv:he&&A(O.iridescenceThicknessMap.channel),sheenColorMapUv:je&&A(O.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&A(O.sheenRoughnessMap.channel),specularMapUv:Je&&A(O.specularMap.channel),specularColorMapUv:de&&A(O.specularColorMap.channel),specularIntensityMapUv:Ve&&A(O.specularIntensityMap.channel),transmissionMapUv:Y&&A(O.transmissionMap.channel),thicknessMapUv:me&&A(O.thicknessMap.channel),alphaMapUv:Me&&A(O.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(V||Ze),vertexColors:O.vertexColors,vertexAlphas:O.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!C.attributes.uv&&(ot||Me),fog:!!k,useFog:O.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:O.flatShading===!0&&O.wireframe===!1,sizeAttenuation:O.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:be,skinning:D.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Le,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:O.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:_e,decodeVideoTexture:ot&&O.map.isVideoTexture===!0&&ct.getTransfer(O.map.colorSpace)===At,decodeVideoTextureEmissive:qe&&O.emissiveMap.isVideoTexture===!0&&ct.getTransfer(O.emissiveMap.colorSpace)===At,premultipliedAlpha:O.premultipliedAlpha,doubleSided:O.side===Ot,flipSided:O.side===en,useDepthPacking:O.depthPacking>=0,depthPacking:O.depthPacking||0,index0AttributeName:O.index0AttributeName,extensionClipCullDistance:De&&O.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&O.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:O.customProgramCacheKey()};return at.vertexUv1s=f.has(1),at.vertexUv2s=f.has(2),at.vertexUv3s=f.has(3),f.clear(),at}function g(O){let v=[];if(O.shaderID?v.push(O.shaderID):(v.push(O.customVertexShaderID),v.push(O.customFragmentShaderID)),O.defines!==void 0)for(let L in O.defines)v.push(L),v.push(O.defines[L]);return O.isRawShaderMaterial===!1&&(K(v,O),j(v,O),v.push(r.outputColorSpace)),v.push(O.customProgramCacheKey),v.join()}function K(O,v){O.push(v.precision),O.push(v.outputColorSpace),O.push(v.envMapMode),O.push(v.envMapCubeUVHeight),O.push(v.mapUv),O.push(v.alphaMapUv),O.push(v.lightMapUv),O.push(v.aoMapUv),O.push(v.bumpMapUv),O.push(v.normalMapUv),O.push(v.displacementMapUv),O.push(v.emissiveMapUv),O.push(v.metalnessMapUv),O.push(v.roughnessMapUv),O.push(v.anisotropyMapUv),O.push(v.clearcoatMapUv),O.push(v.clearcoatNormalMapUv),O.push(v.clearcoatRoughnessMapUv),O.push(v.iridescenceMapUv),O.push(v.iridescenceThicknessMapUv),O.push(v.sheenColorMapUv),O.push(v.sheenRoughnessMapUv),O.push(v.specularMapUv),O.push(v.specularColorMapUv),O.push(v.specularIntensityMapUv),O.push(v.transmissionMapUv),O.push(v.thicknessMapUv),O.push(v.combine),O.push(v.fogExp2),O.push(v.sizeAttenuation),O.push(v.morphTargetsCount),O.push(v.morphAttributeCount),O.push(v.numDirLights),O.push(v.numPointLights),O.push(v.numSpotLights),O.push(v.numSpotLightMaps),O.push(v.numHemiLights),O.push(v.numRectAreaLights),O.push(v.numDirLightShadows),O.push(v.numPointLightShadows),O.push(v.numSpotLightShadows),O.push(v.numSpotLightShadowsWithMaps),O.push(v.numLightProbes),O.push(v.shadowMapType),O.push(v.toneMapping),O.push(v.numClippingPlanes),O.push(v.numClipIntersection),O.push(v.depthPacking)}function j(O,v){u.disableAll(),v.supportsVertexTextures&&u.enable(0),v.instancing&&u.enable(1),v.instancingColor&&u.enable(2),v.instancingMorph&&u.enable(3),v.matcap&&u.enable(4),v.envMap&&u.enable(5),v.normalMapObjectSpace&&u.enable(6),v.normalMapTangentSpace&&u.enable(7),v.clearcoat&&u.enable(8),v.iridescence&&u.enable(9),v.alphaTest&&u.enable(10),v.vertexColors&&u.enable(11),v.vertexAlphas&&u.enable(12),v.vertexUv1s&&u.enable(13),v.vertexUv2s&&u.enable(14),v.vertexUv3s&&u.enable(15),v.vertexTangents&&u.enable(16),v.anisotropy&&u.enable(17),v.alphaHash&&u.enable(18),v.batching&&u.enable(19),v.dispersion&&u.enable(20),v.batchingColor&&u.enable(21),v.gradientMap&&u.enable(22),O.push(u.mask),u.disableAll(),v.fog&&u.enable(0),v.useFog&&u.enable(1),v.flatShading&&u.enable(2),v.logarithmicDepthBuffer&&u.enable(3),v.reversedDepthBuffer&&u.enable(4),v.skinning&&u.enable(5),v.morphTargets&&u.enable(6),v.morphNormals&&u.enable(7),v.morphColors&&u.enable(8),v.premultipliedAlpha&&u.enable(9),v.shadowMapEnabled&&u.enable(10),v.doubleSided&&u.enable(11),v.flipSided&&u.enable(12),v.useDepthPacking&&u.enable(13),v.dithering&&u.enable(14),v.transmission&&u.enable(15),v.sheen&&u.enable(16),v.opaque&&u.enable(17),v.pointsUvs&&u.enable(18),v.decodeVideoTexture&&u.enable(19),v.decodeVideoTextureEmissive&&u.enable(20),v.alphaToCoverage&&u.enable(21),O.push(u.mask)}function H(O){let v=m[O.type],L;if(v){let G=Rn[v];L=ea.clone(G.uniforms)}else L=O.uniforms;return L}function I(O,v){let L;for(let G=0,D=p.length;G<D;G++){let k=p[G];if(k.cacheKey===v){L=k,++L.usedTimes;break}}return L===void 0&&(L=new ly(r,v,O,o),p.push(L)),L}function P(O){if(--O.usedTimes===0){let v=p.indexOf(O);p[v]=p[p.length-1],p.pop(),O.destroy()}}function z(O){a.remove(O)}function b(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:H,acquireProgram:I,releaseProgram:P,releaseShaderCache:z,programs:p,dispose:b}}function jy(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let u=r.get(s);return u===void 0&&(u={},r.set(s,u)),u}function n(s){r.delete(s)}function i(s,u,a){r.get(s)[u]=a}function o(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:o}}function dy(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function $p(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function eh(){let r=[],e=0,t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function s(h,q,c,m,A,y){let g=r[e];return g===void 0?(g={id:h.id,object:h,geometry:q,material:c,groupOrder:m,renderOrder:h.renderOrder,z:A,group:y},r[e]=g):(g.id=h.id,g.object=h,g.geometry=q,g.material=c,g.groupOrder=m,g.renderOrder=h.renderOrder,g.z=A,g.group=y),e++,g}function u(h,q,c,m,A,y){let g=s(h,q,c,m,A,y);c.transmission>0?n.push(g):c.transparent===!0?i.push(g):t.push(g)}function a(h,q,c,m,A,y){let g=s(h,q,c,m,A,y);c.transmission>0?n.unshift(g):c.transparent===!0?i.unshift(g):t.unshift(g)}function f(h,q){t.length>1&&t.sort(h||dy),n.length>1&&n.sort(q||$p),i.length>1&&i.sort(q||$p)}function p(){for(let h=e,q=r.length;h<q;h++){let c=r[h];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:u,unshift:a,finish:p,sort:f}}function Ky(){let r=new WeakMap;function e(n,i){let o=r.get(n),s;return o===void 0?(s=new eh,r.set(n,[s])):i>=o.length?(s=new eh,o.push(s)):s=o[i],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function Iy(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new M,color:new $e};break;case"SpotLight":t={position:new M,direction:new M,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new M,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new M,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new M,halfWidth:new M,halfHeight:new M};break}return r[e.id]=t,t}}}function Py(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var by=0;function xy(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function zy(r){let e=new Iy,t=Py(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new M);let i=new M,o=new pt,s=new pt;function u(f){let p=0,h=0,q=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let c=0,m=0,A=0,y=0,g=0,K=0,j=0,H=0,I=0,P=0,z=0;f.sort(xy);for(let O=0,v=f.length;O<v;O++){let L=f[O],G=L.color,D=L.intensity,k=L.distance,C=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)p+=G.r*D,h+=G.g*D,q+=G.b*D;else if(L.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(L.sh.coefficients[J],D);z++}else if(L.isDirectionalLight){let J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let R=L.shadow,W=t.get(L);W.shadowIntensity=R.intensity,W.shadowBias=R.bias,W.shadowNormalBias=R.normalBias,W.shadowRadius=R.radius,W.shadowMapSize=R.mapSize,n.directionalShadow[c]=W,n.directionalShadowMap[c]=C,n.directionalShadowMatrix[c]=L.shadow.matrix,K++}n.directional[c]=J,c++}else if(L.isSpotLight){let J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(G).multiplyScalar(D),J.distance=k,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,n.spot[A]=J;let R=L.shadow;if(L.map&&(n.spotLightMap[I]=L.map,I++,R.updateMatrices(L),L.castShadow&&P++),n.spotLightMatrix[A]=R.matrix,L.castShadow){let W=t.get(L);W.shadowIntensity=R.intensity,W.shadowBias=R.bias,W.shadowNormalBias=R.normalBias,W.shadowRadius=R.radius,W.shadowMapSize=R.mapSize,n.spotShadow[A]=W,n.spotShadowMap[A]=C,H++}A++}else if(L.isRectAreaLight){let J=e.get(L);J.color.copy(G).multiplyScalar(D),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),n.rectArea[y]=J,y++}else if(L.isPointLight){let J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){let R=L.shadow,W=t.get(L);W.shadowIntensity=R.intensity,W.shadowBias=R.bias,W.shadowNormalBias=R.normalBias,W.shadowRadius=R.radius,W.shadowMapSize=R.mapSize,W.shadowCameraNear=R.camera.near,W.shadowCameraFar=R.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=C,n.pointShadowMatrix[m]=L.shadow.matrix,j++}n.point[m]=J,m++}else if(L.isHemisphereLight){let J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(D),J.groundColor.copy(L.groundColor).multiplyScalar(D),n.hemi[g]=J,g++}}y>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ke.LTC_FLOAT_1,n.rectAreaLTC2=Ke.LTC_FLOAT_2):(n.rectAreaLTC1=Ke.LTC_HALF_1,n.rectAreaLTC2=Ke.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=h,n.ambient[2]=q;let b=n.hash;(b.directionalLength!==c||b.pointLength!==m||b.spotLength!==A||b.rectAreaLength!==y||b.hemiLength!==g||b.numDirectionalShadows!==K||b.numPointShadows!==j||b.numSpotShadows!==H||b.numSpotMaps!==I||b.numLightProbes!==z)&&(n.directional.length=c,n.spot.length=A,n.rectArea.length=y,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=K,n.directionalShadowMap.length=K,n.pointShadow.length=j,n.pointShadowMap.length=j,n.spotShadow.length=H,n.spotShadowMap.length=H,n.directionalShadowMatrix.length=K,n.pointShadowMatrix.length=j,n.spotLightMatrix.length=H+I-P,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=z,b.directionalLength=c,b.pointLength=m,b.spotLength=A,b.rectAreaLength=y,b.hemiLength=g,b.numDirectionalShadows=K,b.numPointShadows=j,b.numSpotShadows=H,b.numSpotMaps=I,b.numLightProbes=z,n.version=by++)}function a(f,p){let h=0,q=0,c=0,m=0,A=0,y=p.matrixWorldInverse;for(let g=0,K=f.length;g<K;g++){let j=f[g];if(j.isDirectionalLight){let H=n.directional[h];H.direction.setFromMatrixPosition(j.matrixWorld),i.setFromMatrixPosition(j.target.matrixWorld),H.direction.sub(i),H.direction.transformDirection(y),h++}else if(j.isSpotLight){let H=n.spot[c];H.position.setFromMatrixPosition(j.matrixWorld),H.position.applyMatrix4(y),H.direction.setFromMatrixPosition(j.matrixWorld),i.setFromMatrixPosition(j.target.matrixWorld),H.direction.sub(i),H.direction.transformDirection(y),c++}else if(j.isRectAreaLight){let H=n.rectArea[m];H.position.setFromMatrixPosition(j.matrixWorld),H.position.applyMatrix4(y),s.identity(),o.copy(j.matrixWorld),o.premultiply(y),s.extractRotation(o),H.halfWidth.set(j.width*.5,0,0),H.halfHeight.set(0,j.height*.5,0),H.halfWidth.applyMatrix4(s),H.halfHeight.applyMatrix4(s),m++}else if(j.isPointLight){let H=n.point[q];H.position.setFromMatrixPosition(j.matrixWorld),H.position.applyMatrix4(y),q++}else if(j.isHemisphereLight){let H=n.hemi[A];H.direction.setFromMatrixPosition(j.matrixWorld),H.direction.transformDirection(y),A++}}}return{setup:u,setupView:a,state:n}}function th(r){let e=new zy(r),t=[],n=[];function i(p){f.camera=p,t.length=0,n.length=0}function o(p){t.push(p)}function s(p){n.push(p)}function u(){e.setup(t)}function a(p){e.setupView(t,p)}let f={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:f,setupLights:u,setupLightsView:a,pushLight:o,pushShadow:s}}function Ly(r){let e=new WeakMap;function t(i,o=0){let s=e.get(i),u;return s===void 0?(u=new th(r),e.set(i,[u])):o>=s.length?(u=new th(r),s.push(u)):u=s[o],u}function n(){e=new WeakMap}return{get:t,dispose:n}}var Sy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,My=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cy(r,e,t){let n=new Ji,i=new se,o=new se,s=new vt,u=new Us({depthPacking:yp}),a=new Vs,f={},p=t.maxTextureSize,h={[sr]:en,[en]:sr,[Ot]:Ot},q=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:Sy,fragmentShader:My}),c=q.clone();c.defines.HORIZONTAL_PASS=1;let m=new Xt;m.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let A=new Pe(m,q),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qa;let g=this.type;this.render=function(P,z,b){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||P.length===0)return;let O=r.getRenderTarget(),v=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),G=r.state;G.setBlending(pr),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let D=g!==En&&this.type===En,k=g===En&&this.type!==En;for(let C=0,J=P.length;C<J;C++){let R=P[C],W=R.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",R,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ae=W.getFrameExtents();if(i.multiply(ae),o.copy(W.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(o.x=Math.floor(p/ae.x),i.x=o.x*ae.x,W.mapSize.x=o.x),i.y>p&&(o.y=Math.floor(p/ae.y),i.y=o.y*ae.y,W.mapSize.y=o.y)),W.map===null||D===!0||k===!0){let le=this.type!==En?{minFilter:Ut,magFilter:Ut}:{};W.map!==null&&W.map.dispose(),W.map=new Pn(i.x,i.y,le),W.map.texture.name=R.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();let ge=W.getViewportCount();for(let le=0;le<ge;le++){let Le=W.getViewport(le);s.set(o.x*Le.x,o.y*Le.y,o.x*Le.z,o.y*Le.w),G.viewport(s),W.updateMatrices(R,le),n=W.getFrustum(),H(z,b,W.camera,R,this.type)}W.isPointLightShadow!==!0&&this.type===En&&K(W,b),W.needsUpdate=!1}g=this.type,y.needsUpdate=!1,r.setRenderTarget(O,v,L)};function K(P,z){let b=e.update(A);q.defines.VSM_SAMPLES!==P.blurSamples&&(q.defines.VSM_SAMPLES=P.blurSamples,c.defines.VSM_SAMPLES=P.blurSamples,q.needsUpdate=!0,c.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Pn(i.x,i.y)),q.uniforms.shadow_pass.value=P.map.texture,q.uniforms.resolution.value=P.mapSize,q.uniforms.radius.value=P.radius,r.setRenderTarget(P.mapPass),r.clear(),r.renderBufferDirect(z,null,b,q,A,null),c.uniforms.shadow_pass.value=P.mapPass.texture,c.uniforms.resolution.value=P.mapSize,c.uniforms.radius.value=P.radius,r.setRenderTarget(P.map),r.clear(),r.renderBufferDirect(z,null,b,c,A,null)}function j(P,z,b,O){let v=null,L=b.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(L!==void 0)v=L;else if(v=b.isPointLight===!0?a:u,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){let G=v.uuid,D=z.uuid,k=f[G];k===void 0&&(k={},f[G]=k);let C=k[D];C===void 0&&(C=v.clone(),k[D]=C,z.addEventListener("dispose",I)),v=C}if(v.visible=z.visible,v.wireframe=z.wireframe,O===En?v.side=z.shadowSide!==null?z.shadowSide:z.side:v.side=z.shadowSide!==null?z.shadowSide:h[z.side],v.alphaMap=z.alphaMap,v.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,v.map=z.map,v.clipShadows=z.clipShadows,v.clippingPlanes=z.clippingPlanes,v.clipIntersection=z.clipIntersection,v.displacementMap=z.displacementMap,v.displacementScale=z.displacementScale,v.displacementBias=z.displacementBias,v.wireframeLinewidth=z.wireframeLinewidth,v.linewidth=z.linewidth,b.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let G=r.properties.get(v);G.light=b}return v}function H(P,z,b,O,v){if(P.visible===!1)return;if(P.layers.test(z.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&v===En)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,P.matrixWorld);let D=e.update(P),k=P.material;if(Array.isArray(k)){let C=D.groups;for(let J=0,R=C.length;J<R;J++){let W=C[J],ae=k[W.materialIndex];if(ae&&ae.visible){let ge=j(P,ae,O,v);P.onBeforeShadow(r,P,z,b,D,ge,W),r.renderBufferDirect(b,null,D,ge,P,W),P.onAfterShadow(r,P,z,b,D,ge,W)}}}else if(k.visible){let C=j(P,k,O,v);P.onBeforeShadow(r,P,z,b,D,C,null),r.renderBufferDirect(b,null,D,C,P,null),P.onAfterShadow(r,P,z,b,D,C,null)}}let G=P.children;for(let D=0,k=G.length;D<k;D++)H(G[D],z,b,O,v)}function I(P){P.target.removeEventListener("dispose",I);for(let b in f){let O=f[b],v=P.target.uuid;v in O&&(O[v].dispose(),delete O[v])}}}var wy={[fu]:pu,[hu]:gu,[cu]:mu,[Nr]:qu,[pu]:fu,[gu]:hu,[mu]:cu,[qu]:Nr};function Gy(r,e){function t(){let Y=!1,me=new vt,He=null,Me=new vt(0,0,0,0);return{setMask:function(pe){He!==pe&&!Y&&(r.colorMask(pe,pe,pe,pe),He=pe)},setLocked:function(pe){Y=pe},setClear:function(pe,ee,De,_e,at){at===!0&&(pe*=_e,ee*=_e,De*=_e),me.set(pe,ee,De,_e),Me.equals(me)===!1&&(r.clearColor(pe,ee,De,_e),Me.copy(me))},reset:function(){Y=!1,He=null,Me.set(-1,0,0,0)}}}function n(){let Y=!1,me=!1,He=null,Me=null,pe=null;return{setReversed:function(ee){if(me!==ee){let De=e.get("EXT_clip_control");ee?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),me=ee;let _e=pe;pe=null,this.setClear(_e)}},getReversed:function(){return me},setTest:function(ee){ee?re(r.DEPTH_TEST):be(r.DEPTH_TEST)},setMask:function(ee){He!==ee&&!Y&&(r.depthMask(ee),He=ee)},setFunc:function(ee){if(me&&(ee=wy[ee]),Me!==ee){switch(ee){case fu:r.depthFunc(r.NEVER);break;case pu:r.depthFunc(r.ALWAYS);break;case hu:r.depthFunc(r.LESS);break;case Nr:r.depthFunc(r.LEQUAL);break;case cu:r.depthFunc(r.EQUAL);break;case qu:r.depthFunc(r.GEQUAL);break;case gu:r.depthFunc(r.GREATER);break;case mu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Me=ee}},setLocked:function(ee){Y=ee},setClear:function(ee){pe!==ee&&(me&&(ee=1-ee),r.clearDepth(ee),pe=ee)},reset:function(){Y=!1,He=null,Me=null,pe=null,me=!1}}}function i(){let Y=!1,me=null,He=null,Me=null,pe=null,ee=null,De=null,_e=null,at=null;return{setTest:function(ht){Y||(ht?re(r.STENCIL_TEST):be(r.STENCIL_TEST))},setMask:function(ht){me!==ht&&!Y&&(r.stencilMask(ht),me=ht)},setFunc:function(ht,st,Mt){(He!==ht||Me!==st||pe!==Mt)&&(r.stencilFunc(ht,st,Mt),He=ht,Me=st,pe=Mt)},setOp:function(ht,st,Mt){(ee!==ht||De!==st||_e!==Mt)&&(r.stencilOp(ht,st,Mt),ee=ht,De=st,_e=Mt)},setLocked:function(ht){Y=ht},setClear:function(ht){at!==ht&&(r.clearStencil(ht),at=ht)},reset:function(){Y=!1,me=null,He=null,Me=null,pe=null,ee=null,De=null,_e=null,at=null}}}let o=new t,s=new n,u=new i,a=new WeakMap,f=new WeakMap,p={},h={},q=new WeakMap,c=[],m=null,A=!1,y=null,g=null,K=null,j=null,H=null,I=null,P=null,z=new $e(0,0,0),b=0,O=!1,v=null,L=null,G=null,D=null,k=null,C=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,R=0,W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(W)[1]),J=R>=1):W.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),J=R>=2);let ae=null,ge={},le=r.getParameter(r.SCISSOR_BOX),Le=r.getParameter(r.VIEWPORT),we=new vt().fromArray(le),We=new vt().fromArray(Le);function et(Y,me,He,Me){let pe=new Uint8Array(4),ee=r.createTexture();r.bindTexture(Y,ee),r.texParameteri(Y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(Y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let De=0;De<He;De++)Y===r.TEXTURE_3D||Y===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,Me,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(me+De,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return ee}let Q={};Q[r.TEXTURE_2D]=et(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=et(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=et(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=et(r.TEXTURE_3D,r.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),u.setClear(0),re(r.DEPTH_TEST),s.setFunc(Nr),_(!1),V(Va),re(r.CULL_FACE),ie(pr);function re(Y){p[Y]!==!0&&(r.enable(Y),p[Y]=!0)}function be(Y){p[Y]!==!1&&(r.disable(Y),p[Y]=!1)}function Ye(Y,me){return h[Y]!==me?(r.bindFramebuffer(Y,me),h[Y]=me,Y===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=me),Y===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=me),!0):!1}function Ge(Y,me){let He=c,Me=!1;if(Y){He=q.get(me),He===void 0&&(He=[],q.set(me,He));let pe=Y.textures;if(He.length!==pe.length||He[0]!==r.COLOR_ATTACHMENT0){for(let ee=0,De=pe.length;ee<De;ee++)He[ee]=r.COLOR_ATTACHMENT0+ee;He.length=pe.length,Me=!0}}else He[0]!==r.BACK&&(He[0]=r.BACK,Me=!0);Me&&r.drawBuffers(He)}function ot(Y){return m!==Y?(r.useProgram(Y),m=Y,!0):!1}let gt={[dr]:r.FUNC_ADD,[N6]:r.FUNC_SUBTRACT,[B6]:r.FUNC_REVERSE_SUBTRACT};gt[E6]=r.MIN,gt[F6]=r.MAX;let w={[R6]:r.ZERO,[U6]:r.ONE,[V6]:r.SRC_COLOR,[Ys]:r.SRC_ALPHA,[np]:r.SRC_ALPHA_SATURATE,[ep]:r.DST_COLOR,[_6]:r.DST_ALPHA,[Q6]:r.ONE_MINUS_SRC_COLOR,[Ds]:r.ONE_MINUS_SRC_ALPHA,[tp]:r.ONE_MINUS_DST_COLOR,[$6]:r.ONE_MINUS_DST_ALPHA,[rp]:r.CONSTANT_COLOR,[ip]:r.ONE_MINUS_CONSTANT_COLOR,[op]:r.CONSTANT_ALPHA,[sp]:r.ONE_MINUS_CONSTANT_ALPHA};function ie(Y,me,He,Me,pe,ee,De,_e,at,ht){if(Y===pr){A===!0&&(be(r.BLEND),A=!1);return}if(A===!1&&(re(r.BLEND),A=!0),Y!==W6){if(Y!==y||ht!==O){if((g!==dr||H!==dr)&&(r.blendEquation(r.FUNC_ADD),g=dr,H=dr),ht)switch(Y){case Wr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _a:r.blendFunc(r.ONE,r.ONE);break;case $a:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ef:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}else switch(Y){case Wr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _a:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case $a:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ef:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}K=null,j=null,I=null,P=null,z.set(0,0,0),b=0,y=Y,O=ht}return}pe=pe||me,ee=ee||He,De=De||Me,(me!==g||pe!==H)&&(r.blendEquationSeparate(gt[me],gt[pe]),g=me,H=pe),(He!==K||Me!==j||ee!==I||De!==P)&&(r.blendFuncSeparate(w[He],w[Me],w[ee],w[De]),K=He,j=Me,I=ee,P=De),(_e.equals(z)===!1||at!==b)&&(r.blendColor(_e.r,_e.g,_e.b,at),z.copy(_e),b=at),y=Y,O=!1}function $(Y,me){Y.side===Ot?be(r.CULL_FACE):re(r.CULL_FACE);let He=Y.side===en;me&&(He=!He),_(He),Y.blending===Wr&&Y.transparent===!1?ie(pr):ie(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),s.setFunc(Y.depthFunc),s.setTest(Y.depthTest),s.setMask(Y.depthWrite),o.setMask(Y.colorWrite);let Me=Y.stencilWrite;u.setTest(Me),Me&&(u.setMask(Y.stencilWriteMask),u.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),u.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),qe(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?re(r.SAMPLE_ALPHA_TO_COVERAGE):be(r.SAMPLE_ALPHA_TO_COVERAGE)}function _(Y){v!==Y&&(Y?r.frontFace(r.CW):r.frontFace(r.CCW),v=Y)}function V(Y){Y!==T6?(re(r.CULL_FACE),Y!==L&&(Y===Va?r.cullFace(r.BACK):Y===Z6?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):be(r.CULL_FACE),L=Y}function Ae(Y){Y!==G&&(J&&r.lineWidth(Y),G=Y)}function qe(Y,me,He){Y?(re(r.POLYGON_OFFSET_FILL),(D!==me||k!==He)&&(r.polygonOffset(me,He),D=me,k=He)):be(r.POLYGON_OFFSET_FILL)}function ve(Y){Y?re(r.SCISSOR_TEST):be(r.SCISSOR_TEST)}function Qe(Y){Y===void 0&&(Y=r.TEXTURE0+C-1),ae!==Y&&(r.activeTexture(Y),ae=Y)}function Ze(Y,me,He){He===void 0&&(ae===null?He=r.TEXTURE0+C-1:He=ae);let Me=ge[He];Me===void 0&&(Me={type:void 0,texture:void 0},ge[He]=Me),(Me.type!==Y||Me.texture!==me)&&(ae!==He&&(r.activeTexture(He),ae=He),r.bindTexture(Y,me||Q[Y]),Me.type=Y,Me.texture=me)}function x(){let Y=ge[ae];Y!==void 0&&Y.type!==void 0&&(r.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function l(){try{r.compressedTexImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function T(){try{r.compressedTexImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function F(){try{r.texSubImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function oe(){try{r.texSubImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function U(){try{r.compressedTexSubImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Se(){try{r.compressedTexSubImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ye(){try{r.texStorage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ze(){try{r.texStorage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ke(){try{r.texImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function he(){try{r.texImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function je(Y){we.equals(Y)===!1&&(r.scissor(Y.x,Y.y,Y.z,Y.w),we.copy(Y))}function Ne(Y){We.equals(Y)===!1&&(r.viewport(Y.x,Y.y,Y.z,Y.w),We.copy(Y))}function Je(Y,me){let He=f.get(me);He===void 0&&(He=new WeakMap,f.set(me,He));let Me=He.get(Y);Me===void 0&&(Me=r.getUniformBlockIndex(me,Y.name),He.set(Y,Me))}function de(Y,me){let Me=f.get(me).get(Y);a.get(me)!==Me&&(r.uniformBlockBinding(me,Me,Y.__bindingPointIndex),a.set(me,Me))}function Ve(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),p={},ae=null,ge={},h={},q=new WeakMap,c=[],m=null,A=!1,y=null,g=null,K=null,j=null,H=null,I=null,P=null,z=new $e(0,0,0),b=0,O=!1,v=null,L=null,G=null,D=null,k=null,we.set(0,0,r.canvas.width,r.canvas.height),We.set(0,0,r.canvas.width,r.canvas.height),o.reset(),s.reset(),u.reset()}return{buffers:{color:o,depth:s,stencil:u},enable:re,disable:be,bindFramebuffer:Ye,drawBuffers:Ge,useProgram:ot,setBlending:ie,setMaterial:$,setFlipSided:_,setCullFace:V,setLineWidth:Ae,setPolygonOffset:qe,setScissorTest:ve,activeTexture:Qe,bindTexture:Ze,unbindTexture:x,compressedTexImage2D:l,compressedTexImage3D:T,texImage2D:ke,texImage3D:he,updateUBOMapping:Je,uniformBlockBinding:de,texStorage2D:ye,texStorage3D:ze,texSubImage2D:F,texSubImage3D:oe,compressedTexSubImage2D:U,compressedTexSubImage3D:Se,scissor:je,viewport:Ne,reset:Ve}}function Yy(r,e,t,n,i,o,s){let u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new se,p=new WeakMap,h,q=new WeakMap,c=!1;try{c=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(x,l){return c?new OffscreenCanvas(x,l):wi("canvas")}function A(x,l,T){let F=1,oe=Ze(x);if((oe.width>T||oe.height>T)&&(F=T/Math.max(oe.width,oe.height)),F<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){let U=Math.floor(F*oe.width),Se=Math.floor(F*oe.height);h===void 0&&(h=m(U,Se));let ye=l?m(U,Se):h;return ye.width=U,ye.height=Se,ye.getContext("2d").drawImage(x,0,0,U,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+U+"x"+Se+")."),ye}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),x;return x}function y(x){return x.generateMipmaps}function g(x){r.generateMipmap(x)}function K(x){return x.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?r.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function j(x,l,T,F,oe=!1){if(x!==null){if(r[x]!==void 0)return r[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let U=l;if(l===r.RED&&(T===r.FLOAT&&(U=r.R32F),T===r.HALF_FLOAT&&(U=r.R16F),T===r.UNSIGNED_BYTE&&(U=r.R8)),l===r.RED_INTEGER&&(T===r.UNSIGNED_BYTE&&(U=r.R8UI),T===r.UNSIGNED_SHORT&&(U=r.R16UI),T===r.UNSIGNED_INT&&(U=r.R32UI),T===r.BYTE&&(U=r.R8I),T===r.SHORT&&(U=r.R16I),T===r.INT&&(U=r.R32I)),l===r.RG&&(T===r.FLOAT&&(U=r.RG32F),T===r.HALF_FLOAT&&(U=r.RG16F),T===r.UNSIGNED_BYTE&&(U=r.RG8)),l===r.RG_INTEGER&&(T===r.UNSIGNED_BYTE&&(U=r.RG8UI),T===r.UNSIGNED_SHORT&&(U=r.RG16UI),T===r.UNSIGNED_INT&&(U=r.RG32UI),T===r.BYTE&&(U=r.RG8I),T===r.SHORT&&(U=r.RG16I),T===r.INT&&(U=r.RG32I)),l===r.RGB_INTEGER&&(T===r.UNSIGNED_BYTE&&(U=r.RGB8UI),T===r.UNSIGNED_SHORT&&(U=r.RGB16UI),T===r.UNSIGNED_INT&&(U=r.RGB32UI),T===r.BYTE&&(U=r.RGB8I),T===r.SHORT&&(U=r.RGB16I),T===r.INT&&(U=r.RGB32I)),l===r.RGBA_INTEGER&&(T===r.UNSIGNED_BYTE&&(U=r.RGBA8UI),T===r.UNSIGNED_SHORT&&(U=r.RGBA16UI),T===r.UNSIGNED_INT&&(U=r.RGBA32UI),T===r.BYTE&&(U=r.RGBA8I),T===r.SHORT&&(U=r.RGBA16I),T===r.INT&&(U=r.RGBA32I)),l===r.RGB&&(T===r.UNSIGNED_INT_5_9_9_9_REV&&(U=r.RGB9_E5),T===r.UNSIGNED_INT_10F_11F_11F_REV&&(U=r.R11F_G11F_B10F)),l===r.RGBA){let Se=oe?Ao:ct.getTransfer(F);T===r.FLOAT&&(U=r.RGBA32F),T===r.HALF_FLOAT&&(U=r.RGBA16F),T===r.UNSIGNED_BYTE&&(U=Se===At?r.SRGB8_ALPHA8:r.RGBA8),T===r.UNSIGNED_SHORT_4_4_4_4&&(U=r.RGBA4),T===r.UNSIGNED_SHORT_5_5_5_1&&(U=r.RGB5_A1)}return(U===r.R16F||U===r.R32F||U===r.RG16F||U===r.RG32F||U===r.RGBA16F||U===r.RGBA32F)&&e.get("EXT_color_buffer_float"),U}function H(x,l){let T;return x?l===null||l===Cr||l===Ri?T=r.DEPTH24_STENCIL8:l===tn?T=r.DEPTH32F_STENCIL8:l===Fi&&(T=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):l===null||l===Cr||l===Ri?T=r.DEPTH_COMPONENT24:l===tn?T=r.DEPTH_COMPONENT32F:l===Fi&&(T=r.DEPTH_COMPONENT16),T}function I(x,l){return y(x)===!0||x.isFramebufferTexture&&x.minFilter!==Ut&&x.minFilter!==wt?Math.log2(Math.max(l.width,l.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?l.mipmaps.length:1}function P(x){let l=x.target;l.removeEventListener("dispose",P),b(l),l.isVideoTexture&&p.delete(l)}function z(x){let l=x.target;l.removeEventListener("dispose",z),v(l)}function b(x){let l=n.get(x);if(l.__webglInit===void 0)return;let T=x.source,F=q.get(T);if(F){let oe=F[l.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&O(x),Object.keys(F).length===0&&q.delete(T)}n.remove(x)}function O(x){let l=n.get(x);r.deleteTexture(l.__webglTexture);let T=x.source,F=q.get(T);delete F[l.__cacheKey],s.memory.textures--}function v(x){let l=n.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),n.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(l.__webglFramebuffer[F]))for(let oe=0;oe<l.__webglFramebuffer[F].length;oe++)r.deleteFramebuffer(l.__webglFramebuffer[F][oe]);else r.deleteFramebuffer(l.__webglFramebuffer[F]);l.__webglDepthbuffer&&r.deleteRenderbuffer(l.__webglDepthbuffer[F])}else{if(Array.isArray(l.__webglFramebuffer))for(let F=0;F<l.__webglFramebuffer.length;F++)r.deleteFramebuffer(l.__webglFramebuffer[F]);else r.deleteFramebuffer(l.__webglFramebuffer);if(l.__webglDepthbuffer&&r.deleteRenderbuffer(l.__webglDepthbuffer),l.__webglMultisampledFramebuffer&&r.deleteFramebuffer(l.__webglMultisampledFramebuffer),l.__webglColorRenderbuffer)for(let F=0;F<l.__webglColorRenderbuffer.length;F++)l.__webglColorRenderbuffer[F]&&r.deleteRenderbuffer(l.__webglColorRenderbuffer[F]);l.__webglDepthRenderbuffer&&r.deleteRenderbuffer(l.__webglDepthRenderbuffer)}let T=x.textures;for(let F=0,oe=T.length;F<oe;F++){let U=n.get(T[F]);U.__webglTexture&&(r.deleteTexture(U.__webglTexture),s.memory.textures--),n.remove(T[F])}n.remove(x)}let L=0;function G(){L=0}function D(){let x=L;return x>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+i.maxTextures),L+=1,x}function k(x){let l=[];return l.push(x.wrapS),l.push(x.wrapT),l.push(x.wrapR||0),l.push(x.magFilter),l.push(x.minFilter),l.push(x.anisotropy),l.push(x.internalFormat),l.push(x.format),l.push(x.type),l.push(x.generateMipmaps),l.push(x.premultiplyAlpha),l.push(x.flipY),l.push(x.unpackAlignment),l.push(x.colorSpace),l.join()}function C(x,l){let T=n.get(x);if(x.isVideoTexture&&ve(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&T.__version!==x.version){let F=x.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(T,x,l);return}}else x.isExternalTexture&&(T.__webglTexture=x.sourceTexture?x.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,T.__webglTexture,r.TEXTURE0+l)}function J(x,l){let T=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&T.__version!==x.version){Q(T,x,l);return}t.bindTexture(r.TEXTURE_2D_ARRAY,T.__webglTexture,r.TEXTURE0+l)}function R(x,l){let T=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&T.__version!==x.version){Q(T,x,l);return}t.bindTexture(r.TEXTURE_3D,T.__webglTexture,r.TEXTURE0+l)}function W(x,l){let T=n.get(x);if(x.version>0&&T.__version!==x.version){re(T,x,l);return}t.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+l)}let ae={[$t]:r.REPEAT,[In]:r.CLAMP_TO_EDGE,[Li]:r.MIRRORED_REPEAT},ge={[Ut]:r.NEAREST,[Hu]:r.NEAREST_MIPMAP_NEAREST,[ei]:r.NEAREST_MIPMAP_LINEAR,[wt]:r.LINEAR,[Ei]:r.LINEAR_MIPMAP_NEAREST,[An]:r.LINEAR_MIPMAP_LINEAR},le={[Hp]:r.NEVER,[Kp]:r.ALWAYS,[lp]:r.LESS,[cf]:r.LEQUAL,[vp]:r.EQUAL,[dp]:r.GEQUAL,[Op]:r.GREATER,[jp]:r.NOTEQUAL};function Le(x,l){if(l.type===tn&&e.has("OES_texture_float_linear")===!1&&(l.magFilter===wt||l.magFilter===Ei||l.magFilter===ei||l.magFilter===An||l.minFilter===wt||l.minFilter===Ei||l.minFilter===ei||l.minFilter===An)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(x,r.TEXTURE_WRAP_S,ae[l.wrapS]),r.texParameteri(x,r.TEXTURE_WRAP_T,ae[l.wrapT]),(x===r.TEXTURE_3D||x===r.TEXTURE_2D_ARRAY)&&r.texParameteri(x,r.TEXTURE_WRAP_R,ae[l.wrapR]),r.texParameteri(x,r.TEXTURE_MAG_FILTER,ge[l.magFilter]),r.texParameteri(x,r.TEXTURE_MIN_FILTER,ge[l.minFilter]),l.compareFunction&&(r.texParameteri(x,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(x,r.TEXTURE_COMPARE_FUNC,le[l.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(l.magFilter===Ut||l.minFilter!==ei&&l.minFilter!==An||l.type===tn&&e.has("OES_texture_float_linear")===!1)return;if(l.anisotropy>1||n.get(l).__currentAnisotropy){let T=e.get("EXT_texture_filter_anisotropic");r.texParameterf(x,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(l.anisotropy,i.getMaxAnisotropy())),n.get(l).__currentAnisotropy=l.anisotropy}}}function we(x,l){let T=!1;x.__webglInit===void 0&&(x.__webglInit=!0,l.addEventListener("dispose",P));let F=l.source,oe=q.get(F);oe===void 0&&(oe={},q.set(F,oe));let U=k(l);if(U!==x.__cacheKey){oe[U]===void 0&&(oe[U]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,T=!0),oe[U].usedTimes++;let Se=oe[x.__cacheKey];Se!==void 0&&(oe[x.__cacheKey].usedTimes--,Se.usedTimes===0&&O(l)),x.__cacheKey=U,x.__webglTexture=oe[U].texture}return T}function We(x,l,T){return Math.floor(Math.floor(x/T)/l)}function et(x,l,T,F){let U=x.updateRanges;if(U.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,l.width,l.height,T,F,l.data);else{U.sort((he,je)=>he.start-je.start);let Se=0;for(let he=1;he<U.length;he++){let je=U[Se],Ne=U[he],Je=je.start+je.count,de=We(Ne.start,l.width,4),Ve=We(je.start,l.width,4);Ne.start<=Je+1&&de===Ve&&We(Ne.start+Ne.count-1,l.width,4)===de?je.count=Math.max(je.count,Ne.start+Ne.count-je.start):(++Se,U[Se]=Ne)}U.length=Se+1;let ye=r.getParameter(r.UNPACK_ROW_LENGTH),ze=r.getParameter(r.UNPACK_SKIP_PIXELS),ke=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,l.width);for(let he=0,je=U.length;he<je;he++){let Ne=U[he],Je=Math.floor(Ne.start/4),de=Math.ceil(Ne.count/4),Ve=Je%l.width,Y=Math.floor(Je/l.width),me=de,He=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ve),r.pixelStorei(r.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(r.TEXTURE_2D,0,Ve,Y,me,He,T,F,l.data)}x.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ye),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ze),r.pixelStorei(r.UNPACK_SKIP_ROWS,ke)}}function Q(x,l,T){let F=r.TEXTURE_2D;(l.isDataArrayTexture||l.isCompressedArrayTexture)&&(F=r.TEXTURE_2D_ARRAY),l.isData3DTexture&&(F=r.TEXTURE_3D);let oe=we(x,l),U=l.source;t.bindTexture(F,x.__webglTexture,r.TEXTURE0+T);let Se=n.get(U);if(U.version!==Se.__version||oe===!0){t.activeTexture(r.TEXTURE0+T);let ye=ct.getPrimaries(ct.workingColorSpace),ze=l.colorSpace===an?null:ct.getPrimaries(l.colorSpace),ke=l.colorSpace===an||ye===ze?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,l.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,l.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let he=A(l.image,!1,i.maxTextureSize);he=Qe(l,he);let je=o.convert(l.format,l.colorSpace),Ne=o.convert(l.type),Je=j(l.internalFormat,je,Ne,l.colorSpace,l.isVideoTexture);Le(F,l);let de,Ve=l.mipmaps,Y=l.isVideoTexture!==!0,me=Se.__version===void 0||oe===!0,He=U.dataReady,Me=I(l,he);if(l.isDepthTexture)Je=H(l.format===Ui,l.type),me&&(Y?t.texStorage2D(r.TEXTURE_2D,1,Je,he.width,he.height):t.texImage2D(r.TEXTURE_2D,0,Je,he.width,he.height,0,je,Ne,null));else if(l.isDataTexture)if(Ve.length>0){Y&&me&&t.texStorage2D(r.TEXTURE_2D,Me,Je,Ve[0].width,Ve[0].height);for(let pe=0,ee=Ve.length;pe<ee;pe++)de=Ve[pe],Y?He&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,de.width,de.height,je,Ne,de.data):t.texImage2D(r.TEXTURE_2D,pe,Je,de.width,de.height,0,je,Ne,de.data);l.generateMipmaps=!1}else Y?(me&&t.texStorage2D(r.TEXTURE_2D,Me,Je,he.width,he.height),He&&et(l,he,je,Ne)):t.texImage2D(r.TEXTURE_2D,0,Je,he.width,he.height,0,je,Ne,he.data);else if(l.isCompressedTexture)if(l.isCompressedArrayTexture){Y&&me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Me,Je,Ve[0].width,Ve[0].height,he.depth);for(let pe=0,ee=Ve.length;pe<ee;pe++)if(de=Ve[pe],l.format!==un)if(je!==null)if(Y){if(He)if(l.layerUpdates.size>0){let De=vf(de.width,de.height,l.format,l.type);for(let _e of l.layerUpdates){let at=de.data.subarray(_e*De/de.data.BYTES_PER_ELEMENT,(_e+1)*De/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,_e,de.width,de.height,1,je,at)}l.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,de.width,de.height,he.depth,je,de.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,Je,de.width,de.height,he.depth,0,de.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Y?He&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,de.width,de.height,he.depth,je,Ne,de.data):t.texImage3D(r.TEXTURE_2D_ARRAY,pe,Je,de.width,de.height,he.depth,0,je,Ne,de.data)}else{Y&&me&&t.texStorage2D(r.TEXTURE_2D,Me,Je,Ve[0].width,Ve[0].height);for(let pe=0,ee=Ve.length;pe<ee;pe++)de=Ve[pe],l.format!==un?je!==null?Y?He&&t.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,de.width,de.height,je,de.data):t.compressedTexImage2D(r.TEXTURE_2D,pe,Je,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Y?He&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,de.width,de.height,je,Ne,de.data):t.texImage2D(r.TEXTURE_2D,pe,Je,de.width,de.height,0,je,Ne,de.data)}else if(l.isDataArrayTexture)if(Y){if(me&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Me,Je,he.width,he.height,he.depth),He)if(l.layerUpdates.size>0){let pe=vf(he.width,he.height,l.format,l.type);for(let ee of l.layerUpdates){let De=he.data.subarray(ee*pe/he.data.BYTES_PER_ELEMENT,(ee+1)*pe/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ee,he.width,he.height,1,je,Ne,De)}l.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,je,Ne,he.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Je,he.width,he.height,he.depth,0,je,Ne,he.data);else if(l.isData3DTexture)Y?(me&&t.texStorage3D(r.TEXTURE_3D,Me,Je,he.width,he.height,he.depth),He&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,je,Ne,he.data)):t.texImage3D(r.TEXTURE_3D,0,Je,he.width,he.height,he.depth,0,je,Ne,he.data);else if(l.isFramebufferTexture){if(me)if(Y)t.texStorage2D(r.TEXTURE_2D,Me,Je,he.width,he.height);else{let pe=he.width,ee=he.height;for(let De=0;De<Me;De++)t.texImage2D(r.TEXTURE_2D,De,Je,pe,ee,0,je,Ne,null),pe>>=1,ee>>=1}}else if(Ve.length>0){if(Y&&me){let pe=Ze(Ve[0]);t.texStorage2D(r.TEXTURE_2D,Me,Je,pe.width,pe.height)}for(let pe=0,ee=Ve.length;pe<ee;pe++)de=Ve[pe],Y?He&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,je,Ne,de):t.texImage2D(r.TEXTURE_2D,pe,Je,je,Ne,de);l.generateMipmaps=!1}else if(Y){if(me){let pe=Ze(he);t.texStorage2D(r.TEXTURE_2D,Me,Je,pe.width,pe.height)}He&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,je,Ne,he)}else t.texImage2D(r.TEXTURE_2D,0,Je,je,Ne,he);y(l)&&g(F),Se.__version=U.version,l.onUpdate&&l.onUpdate(l)}x.__version=l.version}function re(x,l,T){if(l.image.length!==6)return;let F=we(x,l),oe=l.source;t.bindTexture(r.TEXTURE_CUBE_MAP,x.__webglTexture,r.TEXTURE0+T);let U=n.get(oe);if(oe.version!==U.__version||F===!0){t.activeTexture(r.TEXTURE0+T);let Se=ct.getPrimaries(ct.workingColorSpace),ye=l.colorSpace===an?null:ct.getPrimaries(l.colorSpace),ze=l.colorSpace===an||Se===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,l.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,l.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,l.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let ke=l.isCompressedTexture||l.image[0].isCompressedTexture,he=l.image[0]&&l.image[0].isDataTexture,je=[];for(let ee=0;ee<6;ee++)!ke&&!he?je[ee]=A(l.image[ee],!0,i.maxCubemapSize):je[ee]=he?l.image[ee].image:l.image[ee],je[ee]=Qe(l,je[ee]);let Ne=je[0],Je=o.convert(l.format,l.colorSpace),de=o.convert(l.type),Ve=j(l.internalFormat,Je,de,l.colorSpace),Y=l.isVideoTexture!==!0,me=U.__version===void 0||F===!0,He=oe.dataReady,Me=I(l,Ne);Le(r.TEXTURE_CUBE_MAP,l);let pe;if(ke){Y&&me&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Me,Ve,Ne.width,Ne.height);for(let ee=0;ee<6;ee++){pe=je[ee].mipmaps;for(let De=0;De<pe.length;De++){let _e=pe[De];l.format!==un?Je!==null?Y?He&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De,0,0,_e.width,_e.height,Je,_e.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De,Ve,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De,0,0,_e.width,_e.height,Je,de,_e.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De,Ve,_e.width,_e.height,0,Je,de,_e.data)}}}else{if(pe=l.mipmaps,Y&&me){pe.length>0&&Me++;let ee=Ze(je[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Me,Ve,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(he){Y?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,je[ee].width,je[ee].height,Je,de,je[ee].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ve,je[ee].width,je[ee].height,0,Je,de,je[ee].data);for(let De=0;De<pe.length;De++){let at=pe[De].image[ee].image;Y?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De+1,0,0,at.width,at.height,Je,de,at.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De+1,Ve,at.width,at.height,0,Je,de,at.data)}}else{Y?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Je,de,je[ee]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ve,Je,de,je[ee]);for(let De=0;De<pe.length;De++){let _e=pe[De];Y?He&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De+1,0,0,Je,de,_e.image[ee]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,De+1,Ve,Je,de,_e.image[ee])}}}y(l)&&g(r.TEXTURE_CUBE_MAP),U.__version=oe.version,l.onUpdate&&l.onUpdate(l)}x.__version=l.version}function be(x,l,T,F,oe,U){let Se=o.convert(T.format,T.colorSpace),ye=o.convert(T.type),ze=j(T.internalFormat,Se,ye,T.colorSpace),ke=n.get(l),he=n.get(T);if(he.__renderTarget=l,!ke.__hasExternalTextures){let je=Math.max(1,l.width>>U),Ne=Math.max(1,l.height>>U);oe===r.TEXTURE_3D||oe===r.TEXTURE_2D_ARRAY?t.texImage3D(oe,U,ze,je,Ne,l.depth,0,Se,ye,null):t.texImage2D(oe,U,ze,je,Ne,0,Se,ye,null)}t.bindFramebuffer(r.FRAMEBUFFER,x),qe(l)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,F,oe,he.__webglTexture,0,Ae(l)):(oe===r.TEXTURE_2D||oe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,F,oe,he.__webglTexture,U),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ye(x,l,T){if(r.bindRenderbuffer(r.RENDERBUFFER,x),l.depthBuffer){let F=l.depthTexture,oe=F&&F.isDepthTexture?F.type:null,U=H(l.stencilBuffer,oe),Se=l.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=Ae(l);qe(l)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,U,l.width,l.height):T?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,U,l.width,l.height):r.renderbufferStorage(r.RENDERBUFFER,U,l.width,l.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Se,r.RENDERBUFFER,x)}else{let F=l.textures;for(let oe=0;oe<F.length;oe++){let U=F[oe],Se=o.convert(U.format,U.colorSpace),ye=o.convert(U.type),ze=j(U.internalFormat,Se,ye,U.colorSpace),ke=Ae(l);T&&qe(l)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ke,ze,l.width,l.height):qe(l)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ke,ze,l.width,l.height):r.renderbufferStorage(r.RENDERBUFFER,ze,l.width,l.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ge(x,l){if(l&&l.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,x),!(l.depthTexture&&l.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let F=n.get(l.depthTexture);F.__renderTarget=l,(!F.__webglTexture||l.depthTexture.image.width!==l.width||l.depthTexture.image.height!==l.height)&&(l.depthTexture.image.width=l.width,l.depthTexture.image.height=l.height,l.depthTexture.needsUpdate=!0),C(l.depthTexture,0);let oe=F.__webglTexture,U=Ae(l);if(l.depthTexture.format===Si)qe(l)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0,U):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0);else if(l.depthTexture.format===Ui)qe(l)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0,U):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function ot(x){let l=n.get(x),T=x.isWebGLCubeRenderTarget===!0;if(l.__boundDepthTexture!==x.depthTexture){let F=x.depthTexture;if(l.__depthDisposeCallback&&l.__depthDisposeCallback(),F){let oe=()=>{delete l.__boundDepthTexture,delete l.__depthDisposeCallback,F.removeEventListener("dispose",oe)};F.addEventListener("dispose",oe),l.__depthDisposeCallback=oe}l.__boundDepthTexture=F}if(x.depthTexture&&!l.__autoAllocateDepthBuffer){if(T)throw new Error("target.depthTexture not supported in Cube render targets");let F=x.texture.mipmaps;F&&F.length>0?Ge(l.__webglFramebuffer[0],x):Ge(l.__webglFramebuffer,x)}else if(T){l.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(r.FRAMEBUFFER,l.__webglFramebuffer[F]),l.__webglDepthbuffer[F]===void 0)l.__webglDepthbuffer[F]=r.createRenderbuffer(),Ye(l.__webglDepthbuffer[F],x,!1);else{let oe=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=l.__webglDepthbuffer[F];r.bindRenderbuffer(r.RENDERBUFFER,U),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,U)}}else{let F=x.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(r.FRAMEBUFFER,l.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,l.__webglFramebuffer),l.__webglDepthbuffer===void 0)l.__webglDepthbuffer=r.createRenderbuffer(),Ye(l.__webglDepthbuffer,x,!1);else{let oe=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,U=l.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,U),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,U)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function gt(x,l,T){let F=n.get(x);l!==void 0&&be(F.__webglFramebuffer,x,x.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),T!==void 0&&ot(x)}function w(x){let l=x.texture,T=n.get(x),F=n.get(l);x.addEventListener("dispose",z);let oe=x.textures,U=x.isWebGLCubeRenderTarget===!0,Se=oe.length>1;if(Se||(F.__webglTexture===void 0&&(F.__webglTexture=r.createTexture()),F.__version=l.version,s.memory.textures++),U){T.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(l.mipmaps&&l.mipmaps.length>0){T.__webglFramebuffer[ye]=[];for(let ze=0;ze<l.mipmaps.length;ze++)T.__webglFramebuffer[ye][ze]=r.createFramebuffer()}else T.__webglFramebuffer[ye]=r.createFramebuffer()}else{if(l.mipmaps&&l.mipmaps.length>0){T.__webglFramebuffer=[];for(let ye=0;ye<l.mipmaps.length;ye++)T.__webglFramebuffer[ye]=r.createFramebuffer()}else T.__webglFramebuffer=r.createFramebuffer();if(Se)for(let ye=0,ze=oe.length;ye<ze;ye++){let ke=n.get(oe[ye]);ke.__webglTexture===void 0&&(ke.__webglTexture=r.createTexture(),s.memory.textures++)}if(x.samples>0&&qe(x)===!1){T.__webglMultisampledFramebuffer=r.createFramebuffer(),T.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let ye=0;ye<oe.length;ye++){let ze=oe[ye];T.__webglColorRenderbuffer[ye]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,T.__webglColorRenderbuffer[ye]);let ke=o.convert(ze.format,ze.colorSpace),he=o.convert(ze.type),je=j(ze.internalFormat,ke,he,ze.colorSpace,x.isXRRenderTarget===!0),Ne=Ae(x);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ne,je,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,T.__webglColorRenderbuffer[ye])}r.bindRenderbuffer(r.RENDERBUFFER,null),x.depthBuffer&&(T.__webglDepthRenderbuffer=r.createRenderbuffer(),Ye(T.__webglDepthRenderbuffer,x,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(U){t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture),Le(r.TEXTURE_CUBE_MAP,l);for(let ye=0;ye<6;ye++)if(l.mipmaps&&l.mipmaps.length>0)for(let ze=0;ze<l.mipmaps.length;ze++)be(T.__webglFramebuffer[ye][ze],x,l,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ze);else be(T.__webglFramebuffer[ye],x,l,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);y(l)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ye=0,ze=oe.length;ye<ze;ye++){let ke=oe[ye],he=n.get(ke),je=r.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(je=x.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(je,he.__webglTexture),Le(je,ke),be(T.__webglFramebuffer,x,ke,r.COLOR_ATTACHMENT0+ye,je,0),y(ke)&&g(je)}t.unbindTexture()}else{let ye=r.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ye=x.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ye,F.__webglTexture),Le(ye,l),l.mipmaps&&l.mipmaps.length>0)for(let ze=0;ze<l.mipmaps.length;ze++)be(T.__webglFramebuffer[ze],x,l,r.COLOR_ATTACHMENT0,ye,ze);else be(T.__webglFramebuffer,x,l,r.COLOR_ATTACHMENT0,ye,0);y(l)&&g(ye),t.unbindTexture()}x.depthBuffer&&ot(x)}function ie(x){let l=x.textures;for(let T=0,F=l.length;T<F;T++){let oe=l[T];if(y(oe)){let U=K(x),Se=n.get(oe).__webglTexture;t.bindTexture(U,Se),g(U),t.unbindTexture()}}}let $=[],_=[];function V(x){if(x.samples>0){if(qe(x)===!1){let l=x.textures,T=x.width,F=x.height,oe=r.COLOR_BUFFER_BIT,U=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Se=n.get(x),ye=l.length>1;if(ye)for(let ke=0;ke<l.length;ke++)t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);let ze=x.texture.mipmaps;ze&&ze.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ke=0;ke<l.length;ke++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(oe|=r.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(oe|=r.STENCIL_BUFFER_BIT)),ye){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Se.__webglColorRenderbuffer[ke]);let he=n.get(l[ke]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,he,0)}r.blitFramebuffer(0,0,T,F,0,0,T,F,oe,r.NEAREST),a===!0&&($.length=0,_.length=0,$.push(r.COLOR_ATTACHMENT0+ke),x.depthBuffer&&x.resolveDepthBuffer===!1&&($.push(U),_.push(U),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,_)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,$))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ye)for(let ke=0;ke<l.length;ke++){t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.RENDERBUFFER,Se.__webglColorRenderbuffer[ke]);let he=n.get(l[ke]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.TEXTURE_2D,he,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&a){let l=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[l])}}}function Ae(x){return Math.min(i.maxSamples,x.samples)}function qe(x){let l=n.get(x);return x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&l.__useRenderToTexture!==!1}function ve(x){let l=s.render.frame;p.get(x)!==l&&(p.set(x,l),x.update())}function Qe(x,l){let T=x.colorSpace,F=x.format,oe=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||T!==ur&&T!==an&&(ct.getTransfer(T)===At?(F!==un||oe!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",T)),l}function Ze(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(f.width=x.naturalWidth||x.width,f.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(f.width=x.displayWidth,f.height=x.displayHeight):(f.width=x.width,f.height=x.height),f}this.allocateTextureUnit=D,this.resetTextureUnits=G,this.setTexture2D=C,this.setTexture2DArray=J,this.setTexture3D=R,this.setTextureCube=W,this.rebindTextures=gt,this.setupRenderTarget=w,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=be,this.useMultisampledRTT=qe}function Dy(r,e){function t(n,i=an){let o,s=ct.getTransfer(i);if(n===Dn)return r.UNSIGNED_BYTE;if(n===vu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Ou)return r.UNSIGNED_SHORT_5_5_5_1;if(n===sf)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===uf)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===rf)return r.BYTE;if(n===of)return r.SHORT;if(n===Fi)return r.UNSIGNED_SHORT;if(n===lu)return r.INT;if(n===Cr)return r.UNSIGNED_INT;if(n===tn)return r.FLOAT;if(n===Hn)return r.HALF_FLOAT;if(n===af)return r.ALPHA;if(n===ff)return r.RGB;if(n===un)return r.RGBA;if(n===Si)return r.DEPTH_COMPONENT;if(n===Ui)return r.DEPTH_STENCIL;if(n===ju)return r.RED;if(n===du)return r.RED_INTEGER;if(n===pf)return r.RG;if(n===Ku)return r.RG_INTEGER;if(n===Iu)return r.RGBA_INTEGER;if(n===Qo||n===_o||n===$o||n===es)if(s===At)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Qo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===es)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Qo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_o)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$o)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===es)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pu||n===bu||n===xu||n===zu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Pu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lu||n===Su||n===Mu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Lu||n===Su)return s===At?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Mu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Cu||n===wu||n===Gu||n===Yu||n===Du||n===ku||n===Ju||n===Xu||n===Tu||n===Zu||n===Wu||n===Nu||n===Bu||n===Eu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Cu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Gu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Du)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ku)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ju)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Tu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eu)return s===At?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fu||n===Ru||n===Uu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Fu)return s===At?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ru)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vu||n===Qu||n===_u||n===$u)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Vu)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Qu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_u)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$u)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ri?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var ky=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Cf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Lo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gn({vertexShader:ky,fragmentShader:Jy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pe(new jt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wf=class extends Zn{constructor(e,t){super();let n=this,i=null,o=1,s=null,u="local-floor",a=1,f=null,p=null,h=null,q=null,c=null,m=null,A=typeof XRWebGLBinding<"u",y=new Cf,g={},K=t.getContextAttributes(),j=null,H=null,I=[],P=[],z=new se,b=null,O=new Jt;O.viewport=new vt;let v=new Jt;v.viewport=new vt;let L=[O,v],G=new uu,D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let re=I[Q];return re===void 0&&(re=new ki,I[Q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Q){let re=I[Q];return re===void 0&&(re=new ki,I[Q]=re),re.getGripSpace()},this.getHand=function(Q){let re=I[Q];return re===void 0&&(re=new ki,I[Q]=re),re.getHandSpace()};function C(Q){let re=P.indexOf(Q.inputSource);if(re===-1)return;let be=I[re];be!==void 0&&(be.update(Q.inputSource,Q.frame,f||s),be.dispatchEvent({type:Q.type,data:Q.inputSource}))}function J(){i.removeEventListener("select",C),i.removeEventListener("selectstart",C),i.removeEventListener("selectend",C),i.removeEventListener("squeeze",C),i.removeEventListener("squeezestart",C),i.removeEventListener("squeezeend",C),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",R);for(let Q=0;Q<I.length;Q++){let re=P[Q];re!==null&&(P[Q]=null,I[Q].disconnect(re))}D=null,k=null,y.reset();for(let Q in g)delete g[Q];e.setRenderTarget(j),c=null,q=null,h=null,i=null,H=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(z.width,z.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){u=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||s},this.setReferenceSpace=function(Q){f=Q},this.getBaseLayer=function(){return q!==null?q:c},this.getBinding=function(){return h===null&&A&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(j=e.getRenderTarget(),i.addEventListener("select",C),i.addEventListener("selectstart",C),i.addEventListener("selectend",C),i.addEventListener("squeeze",C),i.addEventListener("squeezestart",C),i.addEventListener("squeezeend",C),i.addEventListener("end",J),i.addEventListener("inputsourceschange",R),K.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(z),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ye=null,Ge=null;K.depth&&(Ge=K.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=K.stencil?Ui:Si,Ye=K.stencil?Ri:Cr);let ot={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:o};h=this.getBinding(),q=h.createProjectionLayer(ot),i.updateRenderState({layers:[q]}),e.setPixelRatio(1),e.setSize(q.textureWidth,q.textureHeight,!1),H=new Pn(q.textureWidth,q.textureHeight,{format:un,type:Dn,depthTexture:new zo(q.textureWidth,q.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:K.stencil,colorSpace:e.outputColorSpace,samples:K.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1})}else{let be={antialias:K.antialias,alpha:!0,depth:K.depth,stencil:K.stencil,framebufferScaleFactor:o};c=new XRWebGLLayer(i,t,be),i.updateRenderState({baseLayer:c}),e.setPixelRatio(1),e.setSize(c.framebufferWidth,c.framebufferHeight,!1),H=new Pn(c.framebufferWidth,c.framebufferHeight,{format:un,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:K.stencil,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1})}H.isXRRenderTarget=!0,this.setFoveation(a),f=null,s=await i.requestReferenceSpace(u),et.setContext(i),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function R(Q){for(let re=0;re<Q.removed.length;re++){let be=Q.removed[re],Ye=P.indexOf(be);Ye>=0&&(P[Ye]=null,I[Ye].disconnect(be))}for(let re=0;re<Q.added.length;re++){let be=Q.added[re],Ye=P.indexOf(be);if(Ye===-1){for(let ot=0;ot<I.length;ot++)if(ot>=P.length){P.push(be),Ye=ot;break}else if(P[ot]===null){P[ot]=be,Ye=ot;break}if(Ye===-1)break}let Ge=I[Ye];Ge&&Ge.connect(be)}}let W=new M,ae=new M;function ge(Q,re,be){W.setFromMatrixPosition(re.matrixWorld),ae.setFromMatrixPosition(be.matrixWorld);let Ye=W.distanceTo(ae),Ge=re.projectionMatrix.elements,ot=be.projectionMatrix.elements,gt=Ge[14]/(Ge[10]-1),w=Ge[14]/(Ge[10]+1),ie=(Ge[9]+1)/Ge[5],$=(Ge[9]-1)/Ge[5],_=(Ge[8]-1)/Ge[0],V=(ot[8]+1)/ot[0],Ae=gt*_,qe=gt*V,ve=Ye/(-_+V),Qe=ve*-_;if(re.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Qe),Q.translateZ(ve),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ge[10]===-1)Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let Ze=gt+ve,x=w+ve,l=Ae-Qe,T=qe+(Ye-Qe),F=ie*w/x*Ze,oe=$*w/x*Ze;Q.projectionMatrix.makePerspective(l,T,F,oe,Ze,x),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function le(Q,re){re===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(re.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let re=Q.near,be=Q.far;y.texture!==null&&(y.depthNear>0&&(re=y.depthNear),y.depthFar>0&&(be=y.depthFar)),G.near=v.near=O.near=re,G.far=v.far=O.far=be,(D!==G.near||k!==G.far)&&(i.updateRenderState({depthNear:G.near,depthFar:G.far}),D=G.near,k=G.far),G.layers.mask=Q.layers.mask|6,O.layers.mask=G.layers.mask&3,v.layers.mask=G.layers.mask&5;let Ye=Q.parent,Ge=G.cameras;le(G,Ye);for(let ot=0;ot<Ge.length;ot++)le(Ge[ot],Ye);Ge.length===2?ge(G,O,v):G.projectionMatrix.copy(O.projectionMatrix),Le(Q,G,Ye)};function Le(Q,re,be){be===null?Q.matrix.copy(re.matrixWorld):(Q.matrix.copy(be.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(re.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ci*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(q===null&&c===null))return a},this.setFoveation=function(Q){a=Q,q!==null&&(q.fixedFoveation=Q),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=Q)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(G)},this.getCameraTexture=function(Q){return g[Q]};let we=null;function We(Q,re){if(p=re.getViewerPose(f||s),m=re,p!==null){let be=p.views;c!==null&&(e.setRenderTargetFramebuffer(H,c.framebuffer),e.setRenderTarget(H));let Ye=!1;be.length!==G.cameras.length&&(G.cameras.length=0,Ye=!0);for(let w=0;w<be.length;w++){let ie=be[w],$=null;if(c!==null)$=c.getViewport(ie);else{let V=h.getViewSubImage(q,ie);$=V.viewport,w===0&&(e.setRenderTargetTextures(H,V.colorTexture,V.depthStencilTexture),e.setRenderTarget(H))}let _=L[w];_===void 0&&(_=new Jt,_.layers.enable(w),_.viewport=new vt,L[w]=_),_.matrix.fromArray(ie.transform.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale),_.projectionMatrix.fromArray(ie.projectionMatrix),_.projectionMatrixInverse.copy(_.projectionMatrix).invert(),_.viewport.set($.x,$.y,$.width,$.height),w===0&&(G.matrix.copy(_.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ye===!0&&G.cameras.push(_)}let Ge=i.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&A){h=n.getBinding();let w=h.getDepthInformation(be[0]);w&&w.isValid&&w.texture&&y.init(w,i.renderState)}if(Ge&&Ge.includes("camera-access")&&A){e.state.unbindTexture(),h=n.getBinding();for(let w=0;w<be.length;w++){let ie=be[w].camera;if(ie){let $=g[ie];$||($=new Lo,g[ie]=$);let _=h.getCameraImage(ie);$.sourceTexture=_}}}}for(let be=0;be<I.length;be++){let Ye=P[be],Ge=I[be];Ye!==null&&Ge!==void 0&&Ge.update(Ye,re,f||s)}we&&we(Q,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),m=null}let et=new nh;et.setAnimationLoop(We),this.setAnimationLoop=function(Q){we=Q},this.dispose=function(){}}},ii=new Gn,Xy=new pt;function Ty(r,e){function t(y,g){y.matrixAutoUpdate===!0&&y.updateMatrix(),g.value.copy(y.matrix)}function n(y,g){g.color.getRGB(y.fogColor.value,yf(r)),g.isFog?(y.fogNear.value=g.near,y.fogFar.value=g.far):g.isFogExp2&&(y.fogDensity.value=g.density)}function i(y,g,K,j,H){g.isMeshBasicMaterial||g.isMeshLambertMaterial?o(y,g):g.isMeshToonMaterial?(o(y,g),h(y,g)):g.isMeshPhongMaterial?(o(y,g),p(y,g)):g.isMeshStandardMaterial?(o(y,g),q(y,g),g.isMeshPhysicalMaterial&&c(y,g,H)):g.isMeshMatcapMaterial?(o(y,g),m(y,g)):g.isMeshDepthMaterial?o(y,g):g.isMeshDistanceMaterial?(o(y,g),A(y,g)):g.isMeshNormalMaterial?o(y,g):g.isLineBasicMaterial?(s(y,g),g.isLineDashedMaterial&&u(y,g)):g.isPointsMaterial?a(y,g,K,j):g.isSpriteMaterial?f(y,g):g.isShadowMaterial?(y.color.value.copy(g.color),y.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function o(y,g){y.opacity.value=g.opacity,g.color&&y.diffuse.value.copy(g.color),g.emissive&&y.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(y.map.value=g.map,t(g.map,y.mapTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,t(g.alphaMap,y.alphaMapTransform)),g.bumpMap&&(y.bumpMap.value=g.bumpMap,t(g.bumpMap,y.bumpMapTransform),y.bumpScale.value=g.bumpScale,g.side===en&&(y.bumpScale.value*=-1)),g.normalMap&&(y.normalMap.value=g.normalMap,t(g.normalMap,y.normalMapTransform),y.normalScale.value.copy(g.normalScale),g.side===en&&y.normalScale.value.negate()),g.displacementMap&&(y.displacementMap.value=g.displacementMap,t(g.displacementMap,y.displacementMapTransform),y.displacementScale.value=g.displacementScale,y.displacementBias.value=g.displacementBias),g.emissiveMap&&(y.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,y.emissiveMapTransform)),g.specularMap&&(y.specularMap.value=g.specularMap,t(g.specularMap,y.specularMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest);let K=e.get(g),j=K.envMap,H=K.envMapRotation;j&&(y.envMap.value=j,ii.copy(H),ii.x*=-1,ii.y*=-1,ii.z*=-1,j.isCubeTexture&&j.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),y.envMapRotation.value.setFromMatrix4(Xy.makeRotationFromEuler(ii)),y.flipEnvMap.value=j.isCubeTexture&&j.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=g.reflectivity,y.ior.value=g.ior,y.refractionRatio.value=g.refractionRatio),g.lightMap&&(y.lightMap.value=g.lightMap,y.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,y.lightMapTransform)),g.aoMap&&(y.aoMap.value=g.aoMap,y.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,y.aoMapTransform))}function s(y,g){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,g.map&&(y.map.value=g.map,t(g.map,y.mapTransform))}function u(y,g){y.dashSize.value=g.dashSize,y.totalSize.value=g.dashSize+g.gapSize,y.scale.value=g.scale}function a(y,g,K,j){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,y.size.value=g.size*K,y.scale.value=j*.5,g.map&&(y.map.value=g.map,t(g.map,y.uvTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,t(g.alphaMap,y.alphaMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest)}function f(y,g){y.diffuse.value.copy(g.color),y.opacity.value=g.opacity,y.rotation.value=g.rotation,g.map&&(y.map.value=g.map,t(g.map,y.mapTransform)),g.alphaMap&&(y.alphaMap.value=g.alphaMap,t(g.alphaMap,y.alphaMapTransform)),g.alphaTest>0&&(y.alphaTest.value=g.alphaTest)}function p(y,g){y.specular.value.copy(g.specular),y.shininess.value=Math.max(g.shininess,1e-4)}function h(y,g){g.gradientMap&&(y.gradientMap.value=g.gradientMap)}function q(y,g){y.metalness.value=g.metalness,g.metalnessMap&&(y.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,y.metalnessMapTransform)),y.roughness.value=g.roughness,g.roughnessMap&&(y.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,y.roughnessMapTransform)),g.envMap&&(y.envMapIntensity.value=g.envMapIntensity)}function c(y,g,K){y.ior.value=g.ior,g.sheen>0&&(y.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),y.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(y.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,y.sheenColorMapTransform)),g.sheenRoughnessMap&&(y.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,y.sheenRoughnessMapTransform))),g.clearcoat>0&&(y.clearcoat.value=g.clearcoat,y.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(y.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,y.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(y.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===en&&y.clearcoatNormalScale.value.negate())),g.dispersion>0&&(y.dispersion.value=g.dispersion),g.iridescence>0&&(y.iridescence.value=g.iridescence,y.iridescenceIOR.value=g.iridescenceIOR,y.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(y.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,y.iridescenceMapTransform)),g.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),g.transmission>0&&(y.transmission.value=g.transmission,y.transmissionSamplerMap.value=K.texture,y.transmissionSamplerSize.value.set(K.width,K.height),g.transmissionMap&&(y.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,y.transmissionMapTransform)),y.thickness.value=g.thickness,g.thicknessMap&&(y.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=g.attenuationDistance,y.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(y.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(y.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=g.specularIntensity,y.specularColor.value.copy(g.specularColor),g.specularColorMap&&(y.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,y.specularColorMapTransform)),g.specularIntensityMap&&(y.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,y.specularIntensityMapTransform))}function m(y,g){g.matcap&&(y.matcap.value=g.matcap)}function A(y,g){let K=e.get(g).light;y.referencePosition.value.setFromMatrixPosition(K.matrixWorld),y.nearDistance.value=K.shadow.camera.near,y.farDistance.value=K.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Zy(r,e,t,n){let i={},o={},s=[],u=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function a(K,j){let H=j.program;n.uniformBlockBinding(K,H)}function f(K,j){let H=i[K.id];H===void 0&&(m(K),H=p(K),i[K.id]=H,K.addEventListener("dispose",y));let I=j.program;n.updateUBOMapping(K,I);let P=e.render.frame;o[K.id]!==P&&(q(K),o[K.id]=P)}function p(K){let j=h();K.__bindingPointIndex=j;let H=r.createBuffer(),I=K.__size,P=K.usage;return r.bindBuffer(r.UNIFORM_BUFFER,H),r.bufferData(r.UNIFORM_BUFFER,I,P),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,j,H),H}function h(){for(let K=0;K<u;K++)if(s.indexOf(K)===-1)return s.push(K),K;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function q(K){let j=i[K.id],H=K.uniforms,I=K.__cache;r.bindBuffer(r.UNIFORM_BUFFER,j);for(let P=0,z=H.length;P<z;P++){let b=Array.isArray(H[P])?H[P]:[H[P]];for(let O=0,v=b.length;O<v;O++){let L=b[O];if(c(L,P,O,I)===!0){let G=L.__offset,D=Array.isArray(L.value)?L.value:[L.value],k=0;for(let C=0;C<D.length;C++){let J=D[C],R=A(J);typeof J=="number"||typeof J=="boolean"?(L.__data[0]=J,r.bufferSubData(r.UNIFORM_BUFFER,G+k,L.__data)):J.isMatrix3?(L.__data[0]=J.elements[0],L.__data[1]=J.elements[1],L.__data[2]=J.elements[2],L.__data[3]=0,L.__data[4]=J.elements[3],L.__data[5]=J.elements[4],L.__data[6]=J.elements[5],L.__data[7]=0,L.__data[8]=J.elements[6],L.__data[9]=J.elements[7],L.__data[10]=J.elements[8],L.__data[11]=0):(J.toArray(L.__data,k),k+=R.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,G,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function c(K,j,H,I){let P=K.value,z=j+"_"+H;if(I[z]===void 0)return typeof P=="number"||typeof P=="boolean"?I[z]=P:I[z]=P.clone(),!0;{let b=I[z];if(typeof P=="number"||typeof P=="boolean"){if(b!==P)return I[z]=P,!0}else if(b.equals(P)===!1)return b.copy(P),!0}return!1}function m(K){let j=K.uniforms,H=0,I=16;for(let z=0,b=j.length;z<b;z++){let O=Array.isArray(j[z])?j[z]:[j[z]];for(let v=0,L=O.length;v<L;v++){let G=O[v],D=Array.isArray(G.value)?G.value:[G.value];for(let k=0,C=D.length;k<C;k++){let J=D[k],R=A(J),W=H%I,ae=W%R.boundary,ge=W+ae;H+=ae,ge!==0&&I-ge<R.storage&&(H+=I-ge),G.__data=new Float32Array(R.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=H,H+=R.storage}}}let P=H%I;return P>0&&(H+=I-P),K.__size=H,K.__cache={},this}function A(K){let j={boundary:0,storage:0};return typeof K=="number"||typeof K=="boolean"?(j.boundary=4,j.storage=4):K.isVector2?(j.boundary=8,j.storage=8):K.isVector3||K.isColor?(j.boundary=16,j.storage=12):K.isVector4?(j.boundary=16,j.storage=16):K.isMatrix3?(j.boundary=48,j.storage=48):K.isMatrix4?(j.boundary=64,j.storage=64):K.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",K),j}function y(K){let j=K.target;j.removeEventListener("dispose",y);let H=s.indexOf(j.__bindingPointIndex);s.splice(H,1),r.deleteBuffer(i[j.id]),delete i[j.id],delete o[j.id]}function g(){for(let K in i)r.deleteBuffer(i[K]);s=[],i={},o={}}return{bind:a,update:f,dispose:g}}var ia=class{constructor(e={}){let{canvas:t=Ip(),context:n=null,depth:i=!0,stencil:o=!1,alpha:s=!1,antialias:u=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:f=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:q=!1}=e;this.isWebGLRenderer=!0;let c;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");c=n.getContextAttributes().alpha}else c=s;let m=new Uint32Array(4),A=new Int32Array(4),y=null,g=null,K=[],j=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let H=this,I=!1;this._outputColorSpace=ft;let P=0,z=0,b=null,O=-1,v=null,L=new vt,G=new vt,D=null,k=new $e(0),C=0,J=t.width,R=t.height,W=1,ae=null,ge=null,le=new vt(0,0,J,R),Le=new vt(0,0,J,R),we=!1,We=new Ji,et=!1,Q=!1,re=new pt,be=new M,Ye=new vt,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ot=!1;function gt(){return b===null?W:1}let w=n;function ie(d,X){return t.getContext(d,X)}try{let d={alpha:!0,depth:i,stencil:o,antialias:u,premultipliedAlpha:a,preserveDrawingBuffer:f,powerPreference:p,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",He,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",pe,!1),w===null){let X="webgl2";if(w=ie(X,d),w===null)throw ie(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(d){throw console.error("THREE.WebGLRenderer: "+d.message),d}let $,_,V,Ae,qe,ve,Qe,Ze,x,l,T,F,oe,U,Se,ye,ze,ke,he,je,Ne,Je,de,Ve;function Y(){$=new sm(w),$.init(),Je=new Dy(w,$),_=new $g(w,$,e,Je),V=new Gy(w,$),_.reversedDepthBuffer&&q&&V.buffers.depth.setReversed(!0),Ae=new fm(w),qe=new jy,ve=new Yy(w,$,V,qe,_,Je,Ae),Qe=new tm(H),Ze=new om(H),x=new mc(w),de=new Qg(w,x),l=new um(w,x,Ae,de),T=new hm(w,l,x,Ae),he=new pm(w,_,ve),ye=new em(qe),F=new Oy(H,Qe,Ze,$,_,de,ye),oe=new Ty(H,qe),U=new Ky,Se=new Ly($),ke=new Vg(H,Qe,Ze,V,T,c,a),ze=new Cy(H,T,_),Ve=new Zy(w,Ae,_,V),je=new _g(w,$,Ae),Ne=new am(w,$,Ae),Ae.programs=F.programs,H.capabilities=_,H.extensions=$,H.properties=qe,H.renderLists=U,H.shadowMap=ze,H.state=V,H.info=Ae}Y();let me=new wf(H,w);this.xr=me,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let d=$.get("WEBGL_lose_context");d&&d.loseContext()},this.forceContextRestore=function(){let d=$.get("WEBGL_lose_context");d&&d.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(d){d!==void 0&&(W=d,this.setSize(J,R,!1))},this.getSize=function(d){return d.set(J,R)},this.setSize=function(d,X,B=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=d,R=X,t.width=Math.floor(d*W),t.height=Math.floor(X*W),B===!0&&(t.style.width=d+"px",t.style.height=X+"px"),this.setViewport(0,0,d,X)},this.getDrawingBufferSize=function(d){return d.set(J*W,R*W).floor()},this.setDrawingBufferSize=function(d,X,B){J=d,R=X,W=B,t.width=Math.floor(d*B),t.height=Math.floor(X*B),this.setViewport(0,0,d,X)},this.getCurrentViewport=function(d){return d.copy(L)},this.getViewport=function(d){return d.copy(le)},this.setViewport=function(d,X,B,E){d.isVector4?le.set(d.x,d.y,d.z,d.w):le.set(d,X,B,E),V.viewport(L.copy(le).multiplyScalar(W).round())},this.getScissor=function(d){return d.copy(Le)},this.setScissor=function(d,X,B,E){d.isVector4?Le.set(d.x,d.y,d.z,d.w):Le.set(d,X,B,E),V.scissor(G.copy(Le).multiplyScalar(W).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(d){V.setScissorTest(we=d)},this.setOpaqueSort=function(d){ae=d},this.setTransparentSort=function(d){ge=d},this.getClearColor=function(d){return d.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(d=!0,X=!0,B=!0){let E=0;if(d){let Z=!1;if(b!==null){let fe=b.texture.format;Z=fe===Iu||fe===Ku||fe===du}if(Z){let fe=b.texture.type,Ie=fe===Dn||fe===Cr||fe===Fi||fe===Ri||fe===vu||fe===Ou,Ce=ke.getClearColor(),xe=ke.getClearAlpha(),Fe=Ce.r,Re=Ce.g,Be=Ce.b;Ie?(m[0]=Fe,m[1]=Re,m[2]=Be,m[3]=xe,w.clearBufferuiv(w.COLOR,0,m)):(A[0]=Fe,A[1]=Re,A[2]=Be,A[3]=xe,w.clearBufferiv(w.COLOR,0,A))}else E|=w.COLOR_BUFFER_BIT}X&&(E|=w.DEPTH_BUFFER_BIT),B&&(E|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(E)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),ke.dispose(),U.dispose(),Se.dispose(),qe.dispose(),Qe.dispose(),Ze.dispose(),T.dispose(),de.dispose(),Ve.dispose(),F.dispose(),me.dispose(),me.removeEventListener("sessionstart",Mt),me.removeEventListener("sessionend",qr),Xn.stop()};function He(d){d.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let d=Ae.autoReset,X=ze.enabled,B=ze.autoUpdate,E=ze.needsUpdate,Z=ze.type;Y(),Ae.autoReset=d,ze.enabled=X,ze.autoUpdate=B,ze.needsUpdate=E,ze.type=Z}function pe(d){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",d.statusMessage)}function ee(d){let X=d.target;X.removeEventListener("dispose",ee),De(X)}function De(d){_e(d),qe.remove(d)}function _e(d){let X=qe.get(d).programs;X!==void 0&&(X.forEach(function(B){F.releaseProgram(B)}),d.isShaderMaterial&&F.releaseShaderCache(d))}this.renderBufferDirect=function(d,X,B,E,Z,fe){X===null&&(X=Ge);let Ie=Z.isMesh&&Z.matrixWorld.determinant()<0,Ce=fs(d,X,B,E,Z);V.setMaterial(E,Ie);let xe=B.index,Fe=1;if(E.wireframe===!0){if(xe=l.getWireframeAttribute(B),xe===void 0)return;Fe=2}let Re=B.drawRange,Be=B.attributes.position,S=Re.start*Fe,N=(Re.start+Re.count)*Fe;fe!==null&&(S=Math.max(S,fe.start*Fe),N=Math.min(N,(fe.start+fe.count)*Fe)),xe!==null?(S=Math.max(S,0),N=Math.min(N,xe.count)):Be!=null&&(S=Math.max(S,0),N=Math.min(N,Be.count));let te=N-S;if(te<0||te===1/0)return;de.setup(Z,E,Ce,B,xe);let ne,Oe=je;if(xe!==null&&(ne=x.get(xe),Oe=Ne,Oe.setIndex(ne)),Z.isMesh)E.wireframe===!0?(V.setLineWidth(E.wireframeLinewidth*gt()),Oe.setMode(w.LINES)):Oe.setMode(w.TRIANGLES);else if(Z.isLine){let ue=E.linewidth;ue===void 0&&(ue=1),V.setLineWidth(ue*gt()),Z.isLineSegments?Oe.setMode(w.LINES):Z.isLineLoop?Oe.setMode(w.LINE_LOOP):Oe.setMode(w.LINE_STRIP)}else Z.isPoints?Oe.setMode(w.POINTS):Z.isSprite&&Oe.setMode(w.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Gi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Oe.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if($.get("WEBGL_multi_draw"))Oe.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let ue=Z._multiDrawStarts,Ue=Z._multiDrawCounts,Ee=Z._multiDrawCount,Ht=xe?x.get(xe).bytesPerElement:1,yt=qe.get(E).currentProgram.getUniforms();for(let Ct=0;Ct<Ee;Ct++)yt.setValue(w,"_gl_DrawID",Ct),Oe.render(ue[Ct]/Ht,Ue[Ct])}else if(Z.isInstancedMesh)Oe.renderInstances(S,te,Z.count);else if(B.isInstancedBufferGeometry){let ue=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ue=Math.min(B.instanceCount,ue);Oe.renderInstances(S,te,Ue)}else Oe.render(S,te)};function at(d,X,B){d.transparent===!0&&d.side===Ot&&d.forceSinglePass===!1?(d.side=en,d.needsUpdate=!0,hi(d,X,B),d.side=sr,d.needsUpdate=!0,hi(d,X,B),d.side=Ot):hi(d,X,B)}this.compile=function(d,X,B=null){B===null&&(B=d),g=Se.get(B),g.init(X),j.push(g),B.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),d!==B&&d.traverseVisible(function(Z){Z.isLight&&Z.layers.test(X.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),g.setupLights();let E=new Set;return d.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let fe=Z.material;if(fe)if(Array.isArray(fe))for(let Ie=0;Ie<fe.length;Ie++){let Ce=fe[Ie];at(Ce,B,Z),E.add(Ce)}else at(fe,B,Z),E.add(fe)}),g=j.pop(),E},this.compileAsync=function(d,X,B=null){let E=this.compile(d,X,B);return new Promise(Z=>{function fe(){if(E.forEach(function(Ie){qe.get(Ie).currentProgram.isReady()&&E.delete(Ie)}),E.size===0){Z(d);return}setTimeout(fe,10)}$.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ht=null;function st(d){ht&&ht(d)}function Mt(){Xn.stop()}function qr(){Xn.start()}let Xn=new nh;Xn.setAnimationLoop(st),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(d){ht=d,me.setAnimationLoop(d),d===null?Xn.stop():Xn.start()},me.addEventListener("sessionstart",Mt),me.addEventListener("sessionend",qr),this.render=function(d,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(X),X=me.getCamera()),d.isScene===!0&&d.onBeforeRender(H,d,X,b),g=Se.get(d,j.length),g.init(X),j.push(g),re.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),We.setFromProjectionMatrix(re,wn,X.reversedDepth),Q=this.localClippingEnabled,et=ye.init(this.clippingPlanes,Q),y=U.get(d,K.length),y.init(),K.push(y),me.enabled===!0&&me.isPresenting===!0){let fe=H.xr.getDepthSensingMesh();fe!==null&&Zt(fe,X,-1/0,H.sortObjects)}Zt(d,X,0,H.sortObjects),y.finish(),H.sortObjects===!0&&y.sort(ae,ge),ot=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,ot&&ke.addToRenderList(y,d),this.info.render.frame++,et===!0&&ye.beginShadows();let B=g.state.shadowsArray;ze.render(B,d,X),et===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();let E=y.opaque,Z=y.transmissive;if(g.setupLights(),X.isArrayCamera){let fe=X.cameras;if(Z.length>0)for(let Ie=0,Ce=fe.length;Ie<Ce;Ie++){let xe=fe[Ie];Gr(E,Z,d,xe)}ot&&ke.render(d);for(let Ie=0,Ce=fe.length;Ie<Ce;Ie++){let xe=fe[Ie];zn(y,d,xe,xe.viewport)}}else Z.length>0&&Gr(E,Z,d,X),ot&&ke.render(d),zn(y,d,X);b!==null&&z===0&&(ve.updateMultisampleRenderTarget(b),ve.updateRenderTargetMipmap(b)),d.isScene===!0&&d.onAfterRender(H,d,X),de.resetDefaultState(),O=-1,v=null,j.pop(),j.length>0?(g=j[j.length-1],et===!0&&ye.setGlobalState(H.clippingPlanes,g.state.camera)):g=null,K.pop(),K.length>0?y=K[K.length-1]:y=null};function Zt(d,X,B,E){if(d.visible===!1)return;if(d.layers.test(X.layers)){if(d.isGroup)B=d.renderOrder;else if(d.isLOD)d.autoUpdate===!0&&d.update(X);else if(d.isLight)g.pushLight(d),d.castShadow&&g.pushShadow(d);else if(d.isSprite){if(!d.frustumCulled||We.intersectsSprite(d)){E&&Ye.setFromMatrixPosition(d.matrixWorld).applyMatrix4(re);let Ie=T.update(d),Ce=d.material;Ce.visible&&y.push(d,Ie,Ce,B,Ye.z,null)}}else if((d.isMesh||d.isLine||d.isPoints)&&(!d.frustumCulled||We.intersectsObject(d))){let Ie=T.update(d),Ce=d.material;if(E&&(d.boundingSphere!==void 0?(d.boundingSphere===null&&d.computeBoundingSphere(),Ye.copy(d.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),Ye.copy(Ie.boundingSphere.center)),Ye.applyMatrix4(d.matrixWorld).applyMatrix4(re)),Array.isArray(Ce)){let xe=Ie.groups;for(let Fe=0,Re=xe.length;Fe<Re;Fe++){let Be=xe[Fe],S=Ce[Be.materialIndex];S&&S.visible&&y.push(d,Ie,S,B,Ye.z,Be)}}else Ce.visible&&y.push(d,Ie,Ce,B,Ye.z,null)}}let fe=d.children;for(let Ie=0,Ce=fe.length;Ie<Ce;Ie++)Zt(fe[Ie],X,B,E)}function zn(d,X,B,E){let Z=d.opaque,fe=d.transmissive,Ie=d.transparent;g.setupLightsView(B),et===!0&&ye.setGlobalState(H.clippingPlanes,B),E&&V.viewport(L.copy(E)),Z.length>0&&Qn(Z,X,B),fe.length>0&&Qn(fe,X,B),Ie.length>0&&Qn(Ie,X,B),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function Gr(d,X,B,E){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[E.id]===void 0&&(g.state.transmissionRenderTarget[E.id]=new Pn(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?Hn:Dn,minFilter:An,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace}));let fe=g.state.transmissionRenderTarget[E.id],Ie=E.viewport||L;fe.setSize(Ie.z*H.transmissionResolutionScale,Ie.w*H.transmissionResolutionScale);let Ce=H.getRenderTarget(),xe=H.getActiveCubeFace(),Fe=H.getActiveMipmapLevel();H.setRenderTarget(fe),H.getClearColor(k),C=H.getClearAlpha(),C<1&&H.setClearColor(16777215,.5),H.clear(),ot&&ke.render(B);let Re=H.toneMapping;H.toneMapping=hr;let Be=E.viewport;if(E.viewport!==void 0&&(E.viewport=void 0),g.setupLightsView(E),et===!0&&ye.setGlobalState(H.clippingPlanes,E),Qn(d,B,E),ve.updateMultisampleRenderTarget(fe),ve.updateRenderTargetMipmap(fe),$.has("WEBGL_multisampled_render_to_texture")===!1){let S=!1;for(let N=0,te=X.length;N<te;N++){let ne=X[N],Oe=ne.object,ue=ne.geometry,Ue=ne.material,Ee=ne.group;if(Ue.side===Ot&&Oe.layers.test(E.layers)){let Ht=Ue.side;Ue.side=en,Ue.needsUpdate=!0,pi(Oe,B,E,ue,Ue,Ee),Ue.side=Ht,Ue.needsUpdate=!0,S=!0}}S===!0&&(ve.updateMultisampleRenderTarget(fe),ve.updateRenderTargetMipmap(fe))}H.setRenderTarget(Ce,xe,Fe),H.setClearColor(k,C),Be!==void 0&&(E.viewport=Be),H.toneMapping=Re}function Qn(d,X,B){let E=X.isScene===!0?X.overrideMaterial:null;for(let Z=0,fe=d.length;Z<fe;Z++){let Ie=d[Z],Ce=Ie.object,xe=Ie.geometry,Fe=Ie.group,Re=Ie.material;Re.allowOverride===!0&&E!==null&&(Re=E),Ce.layers.test(B.layers)&&pi(Ce,X,B,xe,Re,Fe)}}function pi(d,X,B,E,Z,fe){d.onBeforeRender(H,X,B,E,Z,fe),d.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,d.matrixWorld),d.normalMatrix.getNormalMatrix(d.modelViewMatrix),Z.onBeforeRender(H,X,B,E,d,fe),Z.transparent===!0&&Z.side===Ot&&Z.forceSinglePass===!1?(Z.side=en,Z.needsUpdate=!0,H.renderBufferDirect(B,X,E,Z,d,fe),Z.side=sr,Z.needsUpdate=!0,H.renderBufferDirect(B,X,E,Z,d,fe),Z.side=Ot):H.renderBufferDirect(B,X,E,Z,d,fe),d.onAfterRender(H,X,B,E,Z,fe)}function hi(d,X,B){X.isScene!==!0&&(X=Ge);let E=qe.get(d),Z=g.state.lights,fe=g.state.shadowsArray,Ie=Z.state.version,Ce=F.getParameters(d,Z.state,fe,X,B),xe=F.getProgramCacheKey(Ce),Fe=E.programs;E.environment=d.isMeshStandardMaterial?X.environment:null,E.fog=X.fog,E.envMap=(d.isMeshStandardMaterial?Ze:Qe).get(d.envMap||E.environment),E.envMapRotation=E.environment!==null&&d.envMap===null?X.environmentRotation:d.envMapRotation,Fe===void 0&&(d.addEventListener("dispose",ee),Fe=new Map,E.programs=Fe);let Re=Fe.get(xe);if(Re!==void 0){if(E.currentProgram===Re&&E.lightsStateVersion===Ie)return ro(d,Ce),Re}else Ce.uniforms=F.getUniforms(d),d.onBeforeCompile(Ce,H),Re=F.acquireProgram(Ce,xe),Fe.set(xe,Re),E.uniforms=Ce.uniforms;let Be=E.uniforms;return(!d.isShaderMaterial&&!d.isRawShaderMaterial||d.clipping===!0)&&(Be.clippingPlanes=ye.uniform),ro(d,Ce),E.needsLights=Tn(d),E.lightsStateVersion=Ie,E.needsLights&&(Be.ambientLightColor.value=Z.state.ambient,Be.lightProbe.value=Z.state.probe,Be.directionalLights.value=Z.state.directional,Be.directionalLightShadows.value=Z.state.directionalShadow,Be.spotLights.value=Z.state.spot,Be.spotLightShadows.value=Z.state.spotShadow,Be.rectAreaLights.value=Z.state.rectArea,Be.ltc_1.value=Z.state.rectAreaLTC1,Be.ltc_2.value=Z.state.rectAreaLTC2,Be.pointLights.value=Z.state.point,Be.pointLightShadows.value=Z.state.pointShadow,Be.hemisphereLights.value=Z.state.hemi,Be.directionalShadowMap.value=Z.state.directionalShadowMap,Be.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Be.spotShadowMap.value=Z.state.spotShadowMap,Be.spotLightMatrix.value=Z.state.spotLightMatrix,Be.spotLightMap.value=Z.state.spotLightMap,Be.pointShadowMap.value=Z.state.pointShadowMap,Be.pointShadowMatrix.value=Z.state.pointShadowMatrix),E.currentProgram=Re,E.uniformsList=null,Re}function ci(d){if(d.uniformsList===null){let X=d.currentProgram.getUniforms();d.uniformsList=_i.seqWithValue(X.seq,d.uniforms)}return d.uniformsList}function ro(d,X){let B=qe.get(d);B.outputColorSpace=X.outputColorSpace,B.batching=X.batching,B.batchingColor=X.batchingColor,B.instancing=X.instancing,B.instancingColor=X.instancingColor,B.instancingMorph=X.instancingMorph,B.skinning=X.skinning,B.morphTargets=X.morphTargets,B.morphNormals=X.morphNormals,B.morphColors=X.morphColors,B.morphTargetsCount=X.morphTargetsCount,B.numClippingPlanes=X.numClippingPlanes,B.numIntersection=X.numClipIntersection,B.vertexAlphas=X.vertexAlphas,B.vertexTangents=X.vertexTangents,B.toneMapping=X.toneMapping}function fs(d,X,B,E,Z){X.isScene!==!0&&(X=Ge),ve.resetTextureUnits();let fe=X.fog,Ie=E.isMeshStandardMaterial?X.environment:null,Ce=b===null?H.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:ur,xe=(E.isMeshStandardMaterial?Ze:Qe).get(E.envMap||Ie),Fe=E.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Re=!!B.attributes.tangent&&(!!E.normalMap||E.anisotropy>0),Be=!!B.morphAttributes.position,S=!!B.morphAttributes.normal,N=!!B.morphAttributes.color,te=hr;E.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(te=H.toneMapping);let ne=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Oe=ne!==void 0?ne.length:0,ue=qe.get(E),Ue=g.state.lights;if(et===!0&&(Q===!0||d!==v)){let Qt=d===v&&E.id===O;ye.setState(E,d,Qt)}let Ee=!1;E.version===ue.__version?(ue.needsLights&&ue.lightsStateVersion!==Ue.state.version||ue.outputColorSpace!==Ce||Z.isBatchedMesh&&ue.batching===!1||!Z.isBatchedMesh&&ue.batching===!0||Z.isBatchedMesh&&ue.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&ue.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&ue.instancing===!1||!Z.isInstancedMesh&&ue.instancing===!0||Z.isSkinnedMesh&&ue.skinning===!1||!Z.isSkinnedMesh&&ue.skinning===!0||Z.isInstancedMesh&&ue.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&ue.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&ue.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&ue.instancingMorph===!1&&Z.morphTexture!==null||ue.envMap!==xe||E.fog===!0&&ue.fog!==fe||ue.numClippingPlanes!==void 0&&(ue.numClippingPlanes!==ye.numPlanes||ue.numIntersection!==ye.numIntersection)||ue.vertexAlphas!==Fe||ue.vertexTangents!==Re||ue.morphTargets!==Be||ue.morphNormals!==S||ue.morphColors!==N||ue.toneMapping!==te||ue.morphTargetsCount!==Oe)&&(Ee=!0):(Ee=!0,ue.__version=E.version);let Ht=ue.currentProgram;Ee===!0&&(Ht=hi(E,X,Z));let yt=!1,Ct=!1,io=!1,dt=Ht.getUniforms(),jn=ue.uniforms;if(V.useProgram(Ht.program)&&(yt=!0,Ct=!0,io=!0),E.id!==O&&(O=E.id,Ct=!0),yt||v!==d){V.buffers.depth.getReversed()&&d.reversedDepth!==!0&&(d._reversedDepth=!0,d.updateProjectionMatrix()),dt.setValue(w,"projectionMatrix",d.projectionMatrix),dt.setValue(w,"viewMatrix",d.matrixWorldInverse);let nn=dt.map.cameraPosition;nn!==void 0&&nn.setValue(w,be.setFromMatrixPosition(d.matrixWorld)),_.logarithmicDepthBuffer&&dt.setValue(w,"logDepthBufFC",2/(Math.log(d.far+1)/Math.LN2)),(E.isMeshPhongMaterial||E.isMeshToonMaterial||E.isMeshLambertMaterial||E.isMeshBasicMaterial||E.isMeshStandardMaterial||E.isShaderMaterial)&&dt.setValue(w,"isOrthographic",d.isOrthographicCamera===!0),v!==d&&(v=d,Ct=!0,io=!0)}if(Z.isSkinnedMesh){dt.setOptional(w,Z,"bindMatrix"),dt.setOptional(w,Z,"bindMatrixInverse");let Qt=Z.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),dt.setValue(w,"boneTexture",Qt.boneTexture,ve))}Z.isBatchedMesh&&(dt.setOptional(w,Z,"batchingTexture"),dt.setValue(w,"batchingTexture",Z._matricesTexture,ve),dt.setOptional(w,Z,"batchingIdTexture"),dt.setValue(w,"batchingIdTexture",Z._indirectTexture,ve),dt.setOptional(w,Z,"batchingColorTexture"),Z._colorsTexture!==null&&dt.setValue(w,"batchingColorTexture",Z._colorsTexture,ve));let dn=B.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&he.update(Z,B,Ht),(Ct||ue.receiveShadow!==Z.receiveShadow)&&(ue.receiveShadow=Z.receiveShadow,dt.setValue(w,"receiveShadow",Z.receiveShadow)),E.isMeshGouraudMaterial&&E.envMap!==null&&(jn.envMap.value=xe,jn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),E.isMeshStandardMaterial&&E.envMap===null&&X.environment!==null&&(jn.envMapIntensity.value=X.environmentIntensity),Ct&&(dt.setValue(w,"toneMappingExposure",H.toneMappingExposure),ue.needsLights&&gr(jn,io),fe&&E.fog===!0&&oe.refreshFogUniforms(jn,fe),oe.refreshMaterialUniforms(jn,E,W,R,g.state.transmissionRenderTarget[d.id]),_i.upload(w,ci(ue),jn,ve)),E.isShaderMaterial&&E.uniformsNeedUpdate===!0&&(_i.upload(w,ci(ue),jn,ve),E.uniformsNeedUpdate=!1),E.isSpriteMaterial&&dt.setValue(w,"center",Z.center),dt.setValue(w,"modelViewMatrix",Z.modelViewMatrix),dt.setValue(w,"normalMatrix",Z.normalMatrix),dt.setValue(w,"modelMatrix",Z.matrixWorld),E.isShaderMaterial||E.isRawShaderMaterial){let Qt=E.uniformsGroups;for(let nn=0,pa=Qt.length;nn<pa;nn++){let Yr=Qt[nn];Ve.update(Yr,Ht),Ve.bind(Yr,Ht)}}return Ht}function gr(d,X){d.ambientLightColor.needsUpdate=X,d.lightProbe.needsUpdate=X,d.directionalLights.needsUpdate=X,d.directionalLightShadows.needsUpdate=X,d.pointLights.needsUpdate=X,d.pointLightShadows.needsUpdate=X,d.spotLights.needsUpdate=X,d.spotLightShadows.needsUpdate=X,d.rectAreaLights.needsUpdate=X,d.hemisphereLights.needsUpdate=X}function Tn(d){return d.isMeshLambertMaterial||d.isMeshToonMaterial||d.isMeshPhongMaterial||d.isMeshStandardMaterial||d.isShadowMaterial||d.isShaderMaterial&&d.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(d,X,B){let E=qe.get(d);E.__autoAllocateDepthBuffer=d.resolveDepthBuffer===!1,E.__autoAllocateDepthBuffer===!1&&(E.__useRenderToTexture=!1),qe.get(d.texture).__webglTexture=X,qe.get(d.depthTexture).__webglTexture=E.__autoAllocateDepthBuffer?void 0:B,E.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(d,X){let B=qe.get(d);B.__webglFramebuffer=X,B.__useDefaultFramebuffer=X===void 0};let Ln=w.createFramebuffer();this.setRenderTarget=function(d,X=0,B=0){b=d,P=X,z=B;let E=!0,Z=null,fe=!1,Ie=!1;if(d){let xe=qe.get(d);if(xe.__useDefaultFramebuffer!==void 0)V.bindFramebuffer(w.FRAMEBUFFER,null),E=!1;else if(xe.__webglFramebuffer===void 0)ve.setupRenderTarget(d);else if(xe.__hasExternalTextures)ve.rebindTextures(d,qe.get(d.texture).__webglTexture,qe.get(d.depthTexture).__webglTexture);else if(d.depthBuffer){let Be=d.depthTexture;if(xe.__boundDepthTexture!==Be){if(Be!==null&&qe.has(Be)&&(d.width!==Be.image.width||d.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(d)}}let Fe=d.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Ie=!0);let Re=qe.get(d).__webglFramebuffer;d.isWebGLCubeRenderTarget?(Array.isArray(Re[X])?Z=Re[X][B]:Z=Re[X],fe=!0):d.samples>0&&ve.useMultisampledRTT(d)===!1?Z=qe.get(d).__webglMultisampledFramebuffer:Array.isArray(Re)?Z=Re[B]:Z=Re,L.copy(d.viewport),G.copy(d.scissor),D=d.scissorTest}else L.copy(le).multiplyScalar(W).floor(),G.copy(Le).multiplyScalar(W).floor(),D=we;if(B!==0&&(Z=Ln),V.bindFramebuffer(w.FRAMEBUFFER,Z)&&E&&V.drawBuffers(d,Z),V.viewport(L),V.scissor(G),V.setScissorTest(D),fe){let xe=qe.get(d.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe.__webglTexture,B)}else if(Ie){let xe=X;for(let Fe=0;Fe<d.textures.length;Fe++){let Re=qe.get(d.textures[Fe]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Fe,Re.__webglTexture,B,xe)}}else if(d!==null&&B!==0){let xe=qe.get(d.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,xe.__webglTexture,B)}O=-1},this.readRenderTargetPixels=function(d,X,B,E,Z,fe,Ie,Ce=0){if(!(d&&d.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=qe.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&Ie!==void 0&&(xe=xe[Ie]),xe){V.bindFramebuffer(w.FRAMEBUFFER,xe);try{let Fe=d.textures[Ce],Re=Fe.format,Be=Fe.type;if(!_.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=d.width-E&&B>=0&&B<=d.height-Z&&(d.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ce),w.readPixels(X,B,E,Z,Je.convert(Re),Je.convert(Be),fe))}finally{let Fe=b!==null?qe.get(b).__webglFramebuffer:null;V.bindFramebuffer(w.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(d,X,B,E,Z,fe,Ie,Ce=0){if(!(d&&d.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=qe.get(d).__webglFramebuffer;if(d.isWebGLCubeRenderTarget&&Ie!==void 0&&(xe=xe[Ie]),xe)if(X>=0&&X<=d.width-E&&B>=0&&B<=d.height-Z){V.bindFramebuffer(w.FRAMEBUFFER,xe);let Fe=d.textures[Ce],Re=Fe.format,Be=Fe.type;if(!_.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let S=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,S),w.bufferData(w.PIXEL_PACK_BUFFER,fe.byteLength,w.STREAM_READ),d.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ce),w.readPixels(X,B,E,Z,Je.convert(Re),Je.convert(Be),0);let N=b!==null?qe.get(b).__webglFramebuffer:null;V.bindFramebuffer(w.FRAMEBUFFER,N);let te=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Pp(w,te,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,S),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,fe),w.deleteBuffer(S),w.deleteSync(te),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(d,X=null,B=0){let E=Math.pow(2,-B),Z=Math.floor(d.image.width*E),fe=Math.floor(d.image.height*E),Ie=X!==null?X.x:0,Ce=X!==null?X.y:0;ve.setTexture2D(d,0),w.copyTexSubImage2D(w.TEXTURE_2D,B,0,0,Ie,Ce,Z,fe),V.unbindTexture()};let mr=w.createFramebuffer(),ps=w.createFramebuffer();this.copyTextureToTexture=function(d,X,B=null,E=null,Z=0,fe=null){fe===null&&(Z!==0?(Gi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=Z,Z=0):fe=0);let Ie,Ce,xe,Fe,Re,Be,S,N,te,ne=d.isCompressedTexture?d.mipmaps[fe]:d.image;if(B!==null)Ie=B.max.x-B.min.x,Ce=B.max.y-B.min.y,xe=B.isBox3?B.max.z-B.min.z:1,Fe=B.min.x,Re=B.min.y,Be=B.isBox3?B.min.z:0;else{let dn=Math.pow(2,-Z);Ie=Math.floor(ne.width*dn),Ce=Math.floor(ne.height*dn),d.isDataArrayTexture?xe=ne.depth:d.isData3DTexture?xe=Math.floor(ne.depth*dn):xe=1,Fe=0,Re=0,Be=0}E!==null?(S=E.x,N=E.y,te=E.z):(S=0,N=0,te=0);let Oe=Je.convert(X.format),ue=Je.convert(X.type),Ue;X.isData3DTexture?(ve.setTexture3D(X,0),Ue=w.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(ve.setTexture2DArray(X,0),Ue=w.TEXTURE_2D_ARRAY):(ve.setTexture2D(X,0),Ue=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,X.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,X.unpackAlignment);let Ee=w.getParameter(w.UNPACK_ROW_LENGTH),Ht=w.getParameter(w.UNPACK_IMAGE_HEIGHT),yt=w.getParameter(w.UNPACK_SKIP_PIXELS),Ct=w.getParameter(w.UNPACK_SKIP_ROWS),io=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,ne.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ne.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Fe),w.pixelStorei(w.UNPACK_SKIP_ROWS,Re),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Be);let dt=d.isDataArrayTexture||d.isData3DTexture,jn=X.isDataArrayTexture||X.isData3DTexture;if(d.isDepthTexture){let dn=qe.get(d),Qt=qe.get(X),nn=qe.get(dn.__renderTarget),pa=qe.get(Qt.__renderTarget);V.bindFramebuffer(w.READ_FRAMEBUFFER,nn.__webglFramebuffer),V.bindFramebuffer(w.DRAW_FRAMEBUFFER,pa.__webglFramebuffer);for(let Yr=0;Yr<xe;Yr++)dt&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,qe.get(d).__webglTexture,Z,Be+Yr),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,qe.get(X).__webglTexture,fe,te+Yr)),w.blitFramebuffer(Fe,Re,Ie,Ce,S,N,Ie,Ce,w.DEPTH_BUFFER_BIT,w.NEAREST);V.bindFramebuffer(w.READ_FRAMEBUFFER,null),V.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(Z!==0||d.isRenderTargetTexture||qe.has(d)){let dn=qe.get(d),Qt=qe.get(X);V.bindFramebuffer(w.READ_FRAMEBUFFER,mr),V.bindFramebuffer(w.DRAW_FRAMEBUFFER,ps);for(let nn=0;nn<xe;nn++)dt?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,dn.__webglTexture,Z,Be+nn):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,dn.__webglTexture,Z),jn?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Qt.__webglTexture,fe,te+nn):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Qt.__webglTexture,fe),Z!==0?w.blitFramebuffer(Fe,Re,Ie,Ce,S,N,Ie,Ce,w.COLOR_BUFFER_BIT,w.NEAREST):jn?w.copyTexSubImage3D(Ue,fe,S,N,te+nn,Fe,Re,Ie,Ce):w.copyTexSubImage2D(Ue,fe,S,N,Fe,Re,Ie,Ce);V.bindFramebuffer(w.READ_FRAMEBUFFER,null),V.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else jn?d.isDataTexture||d.isData3DTexture?w.texSubImage3D(Ue,fe,S,N,te,Ie,Ce,xe,Oe,ue,ne.data):X.isCompressedArrayTexture?w.compressedTexSubImage3D(Ue,fe,S,N,te,Ie,Ce,xe,Oe,ne.data):w.texSubImage3D(Ue,fe,S,N,te,Ie,Ce,xe,Oe,ue,ne):d.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,fe,S,N,Ie,Ce,Oe,ue,ne.data):d.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,fe,S,N,ne.width,ne.height,Oe,ne.data):w.texSubImage2D(w.TEXTURE_2D,fe,S,N,Ie,Ce,Oe,ue,ne);w.pixelStorei(w.UNPACK_ROW_LENGTH,Ee),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Ht),w.pixelStorei(w.UNPACK_SKIP_PIXELS,yt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ct),w.pixelStorei(w.UNPACK_SKIP_IMAGES,io),fe===0&&X.generateMipmaps&&w.generateMipmap(Ue),V.unbindTexture()},this.initRenderTarget=function(d){qe.get(d).__webglFramebuffer===void 0&&ve.setupRenderTarget(d)},this.initTexture=function(d){d.isCubeTexture?ve.setTextureCube(d,0):d.isData3DTexture?ve.setTexture3D(d,0):d.isDataArrayTexture||d.isCompressedArrayTexture?ve.setTexture2DArray(d,0):ve.setTexture2D(d,0),V.unbindTexture()},this.resetState=function(){P=0,z=0,b=null,V.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}};var uh={type:"change"},kf={type:"start"},fh={type:"end"},sa=new Ir,ah=new rn,Wy=Math.cos(70*Fn.DEG2RAD),Dt=new M,fn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Df=1e-6,ua=class extends Uo{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new M,this.cursor=new M,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Sr.ROTATE,MIDDLE:Sr.DOLLY,RIGHT:Sr.PAN},this.touches={ONE:Mr.ROTATE,TWO:Mr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new M,this._lastQuaternion=new on,this._lastTargetPosition=new M,this._quat=new on().setFromUnitVectors(e.up,new M(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ni,this._sphericalDelta=new Ni,this._scale=1,this._panOffset=new M,this._rotateStart=new se,this._rotateEnd=new se,this._rotateDelta=new se,this._panStart=new se,this._panEnd=new se,this._panDelta=new se,this._dollyStart=new se,this._dollyEnd=new se,this._dollyDelta=new se,this._dollyDirection=new M,this._mouse=new se,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=By.bind(this),this._onPointerDown=Ny.bind(this),this._onPointerUp=Ey.bind(this),this._onContextMenu=$y.bind(this),this._onMouseWheel=Uy.bind(this),this._onKeyDown=Vy.bind(this),this._onTouchStart=Qy.bind(this),this._onTouchMove=_y.bind(this),this._onMouseDown=Fy.bind(this),this._onMouseMove=Ry.bind(this),this._interceptControlDown=e4.bind(this),this._interceptControlUp=t4.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(uh),this.update(),this.state=lt.NONE}update(e=null){let t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=fn:n>Math.PI&&(n-=fn),i<-Math.PI?i+=fn:i>Math.PI&&(i-=fn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=s!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){let u=Dt.length();s=this._clampDistance(u*this._scale);let a=u-s;this.object.position.addScaledVector(this._dollyDirection,a),this.object.updateMatrixWorld(),o=!!a}else if(this.object.isOrthographicCamera){let u=new M(this._mouse.x,this._mouse.y,0);u.unproject(this.object);let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=a!==this.object.zoom;let f=new M(this._mouse.x,this._mouse.y,0);f.unproject(this.object),this.object.position.sub(f).add(u),this.object.updateMatrixWorld(),s=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(sa.origin.copy(this.object.position),sa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(sa.direction))<Wy?this.object.lookAt(this.target):(ah.setFromNormalAndCoplanarPoint(this.object.up,this.target),sa.intersectPlane(ah,this.target))))}else if(this.object.isOrthographicCamera){let s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Df||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Df||this._lastTargetPosition.distanceToSquared(this.target)>Df?(this.dispatchEvent(uh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?fn/60*this.autoRotateSpeed*e:fn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Dt.copy(i).sub(this.target);let o=Dt.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*o/n.clientHeight,this.object.matrix),this._panUp(2*t*o/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,o=t-n.top,s=n.width,u=n.height;this._mouse.x=i/s*2-1,this._mouse.y=-(o/u)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,o=Math.sqrt(n*n+i*i);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),o=.5*(e.pageY+n.y);this._rotateEnd.set(i,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,o=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let s=(e.pageX+t.x)*.5,u=(e.pageY+t.y)*.5;this._updateZoomParameters(s,u)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new se,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ny(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function By(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Ey(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fh),this.state=lt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Fy(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Sr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=lt.DOLLY;break;case Sr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=lt.ROTATE}break;case Sr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(kf)}function Ry(r){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Uy(r){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(r.preventDefault(),this.dispatchEvent(kf),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(fh))}function Vy(r){this.enabled!==!1&&this._handleKeyDown(r)}function Qy(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Mr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=lt.TOUCH_ROTATE;break;case Mr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Mr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=lt.TOUCH_DOLLY_PAN;break;case Mr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(kf)}function _y(r){switch(this._trackPointer(r),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=lt.NONE}}function $y(r){this.enabled!==!1&&r.preventDefault()}function e4(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function t4(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var ph={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},ui=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Zf(e)}),this.register(function(e){return new Wf(e)}),this.register(function(e){return new Ff(e)}),this.register(function(e){return new Rf(e)}),this.register(function(e){return new Uf(e)}),this.register(function(e){return new Vf(e)}),this.register(function(e){return new Nf(e)}),this.register(function(e){return new Bf(e)}),this.register(function(e){return new Ef(e)}),this.register(function(e){return new Qf(e)}),this.register(function(e){return new _f(e)}),this.register(function(e){return new $f(e)}),this.register(function(e){return new e6(e)}),this.register(function(e){return new t6(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,i){let o=new Tf,s=[];for(let u=0,a=this.pluginCallbacks.length;u<a;u++)s.push(this.pluginCallbacks[u](o));o.setPlugins(s),o.setTextureUtils(this.textureUtils),o.writeAsync(e,t,i).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(i,o){n.parse(e,i,o,t)})}},ut={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Jf="KHR_mesh_quantization",ln={};ln[Ut]=ut.NEAREST;ln[Hu]=ut.NEAREST_MIPMAP_NEAREST;ln[ei]=ut.NEAREST_MIPMAP_LINEAR;ln[wt]=ut.LINEAR;ln[Ei]=ut.LINEAR_MIPMAP_NEAREST;ln[An]=ut.LINEAR_MIPMAP_LINEAR;ln[In]=ut.CLAMP_TO_EDGE;ln[$t]=ut.REPEAT;ln[Li]=ut.MIRRORED_REPEAT;var hh={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},n4=new $e,ch=12,r4=1179937895,i4=2,qh=8,o4=1313821514,s4=5130562;function ns(r,e){return r.length===e.length&&r.every(function(t,n){return t===e[n]})}function u4(r){return new TextEncoder().encode(r).buffer}function a4(r){return ns(r.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function f4(r,e,t){let n={min:new Array(r.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(r.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let i=e;i<e+t;i++)for(let o=0;o<r.itemSize;o++){let s;r.itemSize>4?s=r.array[i*r.itemSize+o]:(o===0?s=r.getX(i):o===1?s=r.getY(i):o===2?s=r.getZ(i):o===3&&(s=r.getW(i)),r.normalized===!0&&(s=Fn.normalize(s,r.array))),n.min[o]=Math.min(n.min[o],s),n.max[o]=Math.max(n.max[o],s)}return n}function mh(r){return Math.ceil(r/4)*4}function Xf(r,e=0){let t=mh(r.byteLength);if(t!==r.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(r)),e!==0)for(let i=r.byteLength;i<t;i++)n[i]=e;return n.buffer}return r}function gh(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function p4(r,e){if(typeof OffscreenCanvas<"u"&&r instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),r.convertToBlob({type:e,quality:t})}else return new Promise(t=>r.toBlob(t,e))}var Tf=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r180"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let i=this,o=i.buffers,s=i.json;n=i.options;let u=i.extensionsUsed,a=i.extensionsRequired,f=new Blob(o,{type:"application/octet-stream"}),p=Object.keys(u),h=Object.keys(a);if(p.length>0&&(s.extensionsUsed=p),h.length>0&&(s.extensionsRequired=h),s.buffers&&s.buffers.length>0&&(s.buffers[0].byteLength=f.size),n.binary===!0){let q=new FileReader;q.readAsArrayBuffer(f),q.onloadend=function(){let c=Xf(q.result),m=new DataView(new ArrayBuffer(qh));m.setUint32(0,c.byteLength,!0),m.setUint32(4,s4,!0);let A=Xf(u4(JSON.stringify(s)),32),y=new DataView(new ArrayBuffer(qh));y.setUint32(0,A.byteLength,!0),y.setUint32(4,o4,!0);let g=new ArrayBuffer(ch),K=new DataView(g);K.setUint32(0,r4,!0),K.setUint32(4,i4,!0);let j=ch+y.byteLength+A.byteLength+m.byteLength+c.byteLength;K.setUint32(8,j,!0);let H=new Blob([g,y,A,m,c],{type:"application/octet-stream"}),I=new FileReader;I.readAsArrayBuffer(H),I.onloadend=function(){t(I.result)}}}else if(s.buffers&&s.buffers.length>0){let q=new FileReader;q.readAsDataURL(f),q.onloadend=function(){let c=q.result;s.buffers[0].uri=c,t(s)}}else t(s)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,i=this.extensionsUsed;try{let o=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&o.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let s in o.gltfExtensions)t.extensions[s]=o.gltfExtensions[s],i[s]=!0;delete o.gltfExtensions}Object.keys(o).length>0&&(t.extras=o)}catch(o){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+o.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let i=new Map;i.set(!0,this.uid++),i.set(!1,this.uid++),this.uids.set(e,i)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new M;for(let i=0,o=e.count;i<o;i++)if(Math.abs(n.fromBufferAttribute(e,i).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),i=new M;for(let o=0,s=n.count;o<s;o++)i.fromBufferAttribute(n,o),i.x===0&&i.y===0&&i.z===0?i.setX(1):i.normalize(),n.setXYZ(o,i.x,i.y,i.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,i={};(t.offset.x!==0||t.offset.y!==0)&&(i.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(i.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(i.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=i,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(c){return c.colorSpace===ft?function(A){return A<.04045?A*.0773993808:Math.pow(A*.9478672986+.0521327014,2.4)}:function(A){return A}}e instanceof Fr&&(e=await this.decompressTextureAsync(e)),t instanceof Fr&&(t=await this.decompressTextureAsync(t));let i=e?e.image:null,o=t?t.image:null,s=Math.max(i?i.width:0,o?o.width:0),u=Math.max(i?i.height:0,o?o.height:0),a=gh();a.width=s,a.height=u;let f=a.getContext("2d",{willReadFrequently:!0});f.fillStyle="#00ffff",f.fillRect(0,0,s,u);let p=f.getImageData(0,0,s,u);if(i){f.drawImage(i,0,0,s,u);let c=n(e),m=f.getImageData(0,0,s,u).data;for(let A=2;A<m.length;A+=4)p.data[A]=c(m[A]/256)*256}if(o){f.drawImage(o,0,0,s,u);let c=n(t),m=f.getImageData(0,0,s,u).data;for(let A=1;A<m.length;A+=4)p.data[A]=c(m[A]/256)*256}f.putImageData(p,0,0);let q=(e||t).clone();return q.source=new Kr(a),q.colorSpace=an,q.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),q}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,i,o){let s=this.json;s.bufferViews||(s.bufferViews=[]);let u;switch(t){case ut.BYTE:case ut.UNSIGNED_BYTE:u=1;break;case ut.SHORT:case ut.UNSIGNED_SHORT:u=2;break;default:u=4}let a=e.itemSize*u;o===ut.ARRAY_BUFFER&&(a=Math.ceil(a/4)*4);let f=mh(i*a),p=new DataView(new ArrayBuffer(f)),h=0;for(let m=n;m<n+i;m++){for(let A=0;A<e.itemSize;A++){let y;e.itemSize>4?y=e.array[m*e.itemSize+A]:(A===0?y=e.getX(m):A===1?y=e.getY(m):A===2?y=e.getZ(m):A===3&&(y=e.getW(m)),e.normalized===!0&&(y=Fn.normalize(y,e.array))),t===ut.FLOAT?p.setFloat32(h,y,!0):t===ut.INT?p.setInt32(h,y,!0):t===ut.UNSIGNED_INT?p.setUint32(h,y,!0):t===ut.SHORT?p.setInt16(h,y,!0):t===ut.UNSIGNED_SHORT?p.setUint16(h,y,!0):t===ut.BYTE?p.setInt8(h,y):t===ut.UNSIGNED_BYTE&&p.setUint8(h,y),h+=u}h%a!==0&&(h+=a-h%a)}let q={buffer:this.processBuffer(p.buffer),byteOffset:this.byteOffset,byteLength:f};return o!==void 0&&(q.target=o),o===ut.ARRAY_BUFFER&&(q.byteStride=a),this.byteOffset+=f,s.bufferViews.push(q),{id:s.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(i){let o=new FileReader;o.readAsArrayBuffer(e),o.onloadend=function(){let s=Xf(o.result),u={buffer:t.processBuffer(s),byteOffset:t.byteOffset,byteLength:s.byteLength};t.byteOffset+=s.byteLength,i(n.bufferViews.push(u)-1)}})}processAccessor(e,t,n,i){let o=this.json,s={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},u;if(e.array.constructor===Float32Array)u=ut.FLOAT;else if(e.array.constructor===Int32Array)u=ut.INT;else if(e.array.constructor===Uint32Array)u=ut.UNSIGNED_INT;else if(e.array.constructor===Int16Array)u=ut.SHORT;else if(e.array.constructor===Uint16Array)u=ut.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)u=ut.BYTE;else if(e.array.constructor===Uint8Array)u=ut.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(i===void 0||i===1/0)&&(i=e.count),i===0)return null;let a=f4(e,n,i),f;t!==void 0&&(f=e===t.index?ut.ELEMENT_ARRAY_BUFFER:ut.ARRAY_BUFFER);let p=this.processBufferView(e,u,n,i,f),h={bufferView:p.id,byteOffset:p.byteOffset,componentType:u,count:i,max:a.max,min:a.min,type:s[e.itemSize]};return e.normalized===!0&&(h.normalized=!0),o.accessors||(o.accessors=[]),o.accessors.push(h)-1}processImage(e,t,n,i="image/png"){if(e!==null){let o=this,s=o.cache,u=o.json,a=o.options,f=o.pending;s.images.has(e)||s.images.set(e,{});let p=s.images.get(e),h=i+":flipY/"+n.toString();if(p[h]!==void 0)return p[h];u.images||(u.images=[]);let q={mimeType:i},c=gh();c.width=Math.min(e.width,a.maxTextureSize),c.height=Math.min(e.height,a.maxTextureSize);let m=c.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,c.height),m.scale(1,-1)),e.data!==void 0){t!==un&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>a.maxTextureSize||e.height>a.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let y=new Uint8ClampedArray(e.height*e.width*4);for(let g=0;g<y.length;g+=4)y[g+0]=e.data[g+0],y[g+1]=e.data[g+1],y[g+2]=e.data[g+2],y[g+3]=e.data[g+3];m.putImageData(new ImageData(y,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)m.drawImage(e,0,0,c.width,c.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");a.binary===!0?f.push(p4(c,i).then(y=>o.processBufferViewImage(y)).then(y=>{q.bufferView=y})):q.uri=Yi.getDataURL(c,i);let A=u.images.push(q)-1;return p[h]=A,A}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:ln[e.magFilter],minFilter:ln[e.minFilter],wrapS:ln[e.wrapS],wrapT:ln[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,i=this.cache,o=this.json;if(i.textures.has(e))return i.textures.get(e);o.textures||(o.textures=[]),e instanceof Fr&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let s=e.userData.mimeType;s==="image/webp"&&(s="image/png");let u={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,s)};e.name&&(u.name=e.name),await this._invokeAllAsync(async function(f){f.writeTexture&&await f.writeTexture(e,u)});let a=o.textures.push(u)-1;return i.textures.set(e,a),a}async processMaterialAsync(e){let t=this.cache,n=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);let i={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let o=e.color.toArray().concat([e.opacity]);if(ns(o,[1,1,1,1])||(i.pbrMetallicRoughness.baseColorFactor=o),e.isMeshStandardMaterial?(i.pbrMetallicRoughness.metallicFactor=e.metalness,i.pbrMetallicRoughness.roughnessFactor=e.roughness):(i.pbrMetallicRoughness.metallicFactor=0,i.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let u=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),a={index:await this.processTextureAsync(u),texCoord:u.channel};this.applyTextureTransform(a,u),i.pbrMetallicRoughness.metallicRoughnessTexture=a}if(e.map){let u={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(u,e.map),i.pbrMetallicRoughness.baseColorTexture=u}if(e.emissive){let u=e.emissive;if(Math.max(u.r,u.g,u.b)>0&&(i.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let f={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(f,e.emissiveMap),i.emissiveTexture=f}}if(e.normalMap){let u={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(u.scale=e.normalScale.x),this.applyTextureTransform(u,e.normalMap),i.normalTexture=u}if(e.aoMap){let u={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(u.strength=e.aoMapIntensity),this.applyTextureTransform(u,e.aoMap),i.occlusionTexture=u}e.transparent?i.alphaMode="BLEND":e.alphaTest>0&&(i.alphaMode="MASK",i.alphaCutoff=e.alphaTest),e.side===Ot&&(i.doubleSided=!0),e.name!==""&&(i.name=e.name),this.serializeUserData(e,i),await this._invokeAllAsync(async function(u){u.writeMaterialAsync&&await u.writeMaterialAsync(e,i)});let s=n.materials.push(i)-1;return t.materials.set(e,s),s}async processMeshAsync(e){let t=this.cache,n=this.json,i=[e.geometry.uuid];if(Array.isArray(e.material))for(let H=0,I=e.material.length;H<I;H++)i.push(e.material[H].uuid);else i.push(e.material.uuid);let o=i.join(":");if(t.meshes.has(o))return t.meshes.get(o);let s=e.geometry,u;e.isLineSegments?u=ut.LINES:e.isLineLoop?u=ut.LINE_LOOP:e.isLine?u=ut.LINE_STRIP:e.isPoints?u=ut.POINTS:u=e.material.wireframe?ut.LINES:ut.TRIANGLES;let a={},f={},p=[],h=[],q={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},c=s.getAttribute("normal");c!==void 0&&!this.isNormalizedNormalAttribute(c)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),s.setAttribute("normal",this.createNormalizedNormalAttribute(c)));let m=null;for(let H in s.attributes){if(H.slice(0,5)==="morph")continue;let I=s.attributes[H];if(H=q[H]||H.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(H)||(H="_"+H),t.attributes.has(this.getUID(I))){f[H]=t.attributes.get(this.getUID(I));continue}m=null;let z=I.array;H==="JOINTS_0"&&!(z instanceof Uint16Array)&&!(z instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=new It(new Uint16Array(z),I.itemSize,I.normalized)):(z instanceof Uint32Array||z instanceof Int32Array)&&!H.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${H}" converted to type FLOAT.`),m=ui.Utils.toFloat32BufferAttribute(I));let b=this.processAccessor(m||I,s);b!==null&&(H.startsWith("_")||this.detectMeshQuantization(H,I),f[H]=b,t.attributes.set(this.getUID(I),b))}if(c!==void 0&&s.setAttribute("normal",c),Object.keys(f).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let H=[],I=[],P={};if(e.morphTargetDictionary!==void 0)for(let z in e.morphTargetDictionary)P[e.morphTargetDictionary[z]]=z;for(let z=0;z<e.morphTargetInfluences.length;++z){let b={},O=!1;for(let v in s.morphAttributes){if(v!=="position"&&v!=="normal"){O||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),O=!0);continue}let L=s.morphAttributes[v][z],G=v.toUpperCase(),D=s.attributes[v];if(t.attributes.has(this.getUID(L,!0))){b[G]=t.attributes.get(this.getUID(L,!0));continue}let k=L.clone();if(!s.morphTargetsRelative)for(let C=0,J=L.count;C<J;C++)for(let R=0;R<L.itemSize;R++)R===0&&k.setX(C,L.getX(C)-D.getX(C)),R===1&&k.setY(C,L.getY(C)-D.getY(C)),R===2&&k.setZ(C,L.getZ(C)-D.getZ(C)),R===3&&k.setW(C,L.getW(C)-D.getW(C));b[G]=this.processAccessor(k,s),t.attributes.set(this.getUID(D,!0),b[G])}h.push(b),H.push(e.morphTargetInfluences[z]),e.morphTargetDictionary!==void 0&&I.push(P[z])}a.weights=H,I.length>0&&(a.extras={},a.extras.targetNames=I)}let A=Array.isArray(e.material);if(A&&s.groups.length===0)return null;let y=!1;if(A&&s.index===null){let H=[];for(let I=0,P=s.attributes.position.count;I<P;I++)H[I]=I;s.setIndex(H),y=!0}let g=A?e.material:[e.material],K=A?s.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let H=0,I=K.length;H<I;H++){let P={mode:u,attributes:f};if(this.serializeUserData(s,P),h.length>0&&(P.targets=h),s.index!==null){let b=this.getUID(s.index);(K[H].start!==void 0||K[H].count!==void 0)&&(b+=":"+K[H].start+":"+K[H].count),t.attributes.has(b)?P.indices=t.attributes.get(b):(P.indices=this.processAccessor(s.index,s,K[H].start,K[H].count),t.attributes.set(b,P.indices)),P.indices===null&&delete P.indices}let z=await this.processMaterialAsync(g[K[H].materialIndex]);z!==null&&(P.material=z),p.push(P)}y===!0&&s.setIndex(null),a.primitives=p,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(H){H.writeMesh&&H.writeMesh(e,a)});let j=n.meshes.push(a)-1;return t.meshes.set(o,j),j}detectMeshQuantization(e,t){if(this.extensionsUsed[Jf])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let i=e.split("_",1)[0];ph[i]&&ph[i].includes(n)&&(this.extensionsUsed[Jf]=!0,this.extensionsRequired[Jf]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,i={type:n?"orthographic":"perspective"};return n?i.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:i.perspective={aspectRatio:e.aspect,yfov:Fn.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(i.name=e.type),t.cameras.push(i)-1}processAnimation(e,t){let n=this.json,i=this.nodeMap;n.animations||(n.animations=[]),e=ui.Utils.mergeMorphTargetTracks(e.clone(),t);let o=e.tracks,s=[],u=[];for(let f=0;f<o.length;++f){let p=o[f],h=mt.parseTrackName(p.name),q=mt.findNode(t,h.nodeName),c=hh[h.propertyName];if(h.objectName==="bones"&&(q.isSkinnedMesh===!0?q=q.skeleton.getBoneByName(h.objectIndex):q=void 0),!q||!c){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',p.name);continue}let m=1,A=p.values.length/p.times.length;c===hh.morphTargetInfluences&&(A/=q.morphTargetInfluences.length);let y;p.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(y="CUBICSPLINE",A/=3):p.getInterpolation()===Br?y="STEP":y="LINEAR",u.push({input:this.processAccessor(new It(p.times,m)),output:this.processAccessor(new It(p.values,A)),interpolation:y}),s.push({sampler:u.length-1,target:{node:i.get(q),path:c}})}let a={name:e.name||"clip_"+n.animations.length,samplers:u,channels:s};return this.serializeUserData(e,a),n.animations.push(a),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,i=t.nodes[n.get(e)],o=e.skeleton;if(o===void 0)return null;let s=e.skeleton.bones[0];if(s===void 0)return null;let u=[],a=new Float32Array(o.bones.length*16),f=new pt;for(let h=0;h<o.bones.length;++h)u.push(n.get(o.bones[h])),f.copy(o.boneInverses[h]),f.multiply(e.bindMatrix).toArray(a,h*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new It(a,16)),joints:u,skeleton:n.get(s)}),i.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,i=this.nodeMap;t.nodes||(t.nodes=[]);let o={};if(n.trs){let u=e.quaternion.toArray(),a=e.position.toArray(),f=e.scale.toArray();ns(u,[0,0,0,1])||(o.rotation=u),ns(a,[0,0,0])||(o.translation=a),ns(f,[1,1,1])||(o.scale=f)}else e.matrixAutoUpdate&&e.updateMatrix(),a4(e.matrix)===!1&&(o.matrix=e.matrix.elements);if(e.name!==""&&(o.name=String(e.name)),this.serializeUserData(e,o),e.isMesh||e.isLine||e.isPoints){let u=await this.processMeshAsync(e);u!==null&&(o.mesh=u)}else e.isCamera&&(o.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let s=t.nodes.push(o)-1;if(i.set(e,s),e.children.length>0){let u=[];for(let a=0,f=e.children.length;a<f;a++){let p=e.children[a];if(p.visible||n.onlyVisible===!1){let h=await this.processNodeAsync(p);h!==null&&u.push(h)}}u.length>0&&(o.children=u)}return await this._invokeAllAsync(function(u){u.writeNode&&u.writeNode(e,o)}),s}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let i={};e.name!==""&&(i.name=e.name),t.scenes.push(i);let o=[];for(let s=0,u=e.children.length;s<u;s++){let a=e.children[s];if(a.visible||n.onlyVisible===!1){let f=await this.processNodeAsync(a);f!==null&&o.push(f)}}o.length>0&&(i.nodes=o),this.serializeUserData(e,i)}async processObjectsAsync(e){let t=new br;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(i){i.beforeParse&&i.beforeParse(e)});let n=[];for(let i=0;i<e.length;i++)e[i]instanceof br?await this.processSceneAsync(e[i]):n.push(e[i]);n.length>0&&await this.processObjectsAsync(n);for(let i=0;i<this.skins.length;++i)this.processSkin(this.skins[i]);for(let i=0;i<t.animations.length;++i)this.processAnimation(t.animations[i],e[0]);await this._invokeAllAsync(function(i){i.afterParse&&i.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},Zf=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,i=n.json,o=n.extensionsUsed,s={};e.name&&(s.name=e.name),s.color=e.color.toArray(),s.intensity=e.intensity,e.isDirectionalLight?s.type="directional":e.isPointLight?(s.type="point",e.distance>0&&(s.range=e.distance)):e.isSpotLight&&(s.type="spot",e.distance>0&&(s.range=e.distance),s.spot={},s.spot.innerConeAngle=(1-e.penumbra)*e.angle,s.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),o[this.name]||(i.extensions=i.extensions||{},i.extensions[this.name]={lights:[]},o[this.name]=!0);let u=i.extensions[this.name].lights;u.push(s),t.extensions=t.extensions||{},t.extensions[this.name]={light:u.length-1}}},Wf=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let i=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},i[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Nf=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.clearcoatFactor=e.clearcoat,e.clearcoatMap){let s={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(s,e.clearcoatMap),o.clearcoatTexture=s}if(o.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let s={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(s,e.clearcoatRoughnessMap),o.clearcoatRoughnessTexture=s}if(e.clearcoatNormalMap){let s={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(s.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(s,e.clearcoatNormalMap),o.clearcoatNormalTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Bf=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let i=this.writer.extensionsUsed,o={};o.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Ef=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.iridescenceFactor=e.iridescence,e.iridescenceMap){let s={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(s,e.iridescenceMap),o.iridescenceTexture=s}if(o.iridescenceIor=e.iridescenceIOR,o.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],o.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let s={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(s,e.iridescenceThicknessMap),o.iridescenceThicknessTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Ff=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.transmissionFactor=e.transmission,e.transmissionMap){let s={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(s,e.transmissionMap),o.transmissionTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Rf=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.thicknessFactor=e.thickness,e.thicknessMap){let s={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(s,e.thicknessMap),o.thicknessTexture=s}e.attenuationDistance!==1/0&&(o.attenuationDistance=e.attenuationDistance),o.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Uf=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let i=this.writer.extensionsUsed,o={};o.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Vf=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(n4)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.specularIntensityMap){let s={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(s,e.specularIntensityMap),o.specularTexture=s}if(e.specularColorMap){let s={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(s,e.specularColorMap),o.specularColorTexture=s}o.specularFactor=e.specularIntensity,o.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Qf=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.sheenRoughnessMap){let s={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(s,e.sheenRoughnessMap),o.sheenRoughnessTexture=s}if(e.sheenColorMap){let s={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(s,e.sheenColorMap),o.sheenColorTexture=s}o.sheenRoughnessFactor=e.sheenRoughness,o.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},_f=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.anisotropyMap){let s={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(s,e.anisotropyMap),o.anisotropyTexture=s}o.anisotropyStrength=e.anisotropy,o.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},$f=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let i=this.writer.extensionsUsed,o={};o.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},e6=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.bumpMap){let s={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(s,e.bumpMap),o.bumpTexture=s}o.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},t6=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,i=e,o=new Float32Array(i.count*3),s=new Float32Array(i.count*4),u=new Float32Array(i.count*3),a=new pt,f=new M,p=new on,h=new M;for(let c=0;c<i.count;c++)i.getMatrixAt(c,a),a.decompose(f,p,h),f.toArray(o,c*3),p.toArray(s,c*4),h.toArray(u,c*3);let q={TRANSLATION:n.processAccessor(new It(o,3)),ROTATION:n.processAccessor(new It(s,4)),SCALE:n.processAccessor(new It(u,3))};i.instanceColor&&(q._COLOR_0=n.processAccessor(i.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:q},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};ui.Utils={insertKeyframe:function(r,e){let n=r.getValueSize(),i=new r.TimeBufferType(r.times.length+1),o=new r.ValueBufferType(r.values.length+n),s=r.createInterpolant(new r.ValueBufferType(n)),u;if(r.times.length===0){i[0]=e;for(let a=0;a<n;a++)o[a]=0;u=0}else if(e<r.times[0]){if(Math.abs(r.times[0]-e)<.001)return 0;i[0]=e,i.set(r.times,1),o.set(s.evaluate(e),0),o.set(r.values,n),u=0}else if(e>r.times[r.times.length-1]){if(Math.abs(r.times[r.times.length-1]-e)<.001)return r.times.length-1;i[i.length-1]=e,i.set(r.times,0),o.set(r.values,0),o.set(s.evaluate(e),r.values.length),u=i.length-1}else for(let a=0;a<r.times.length;a++){if(Math.abs(r.times[a]-e)<.001)return a;if(r.times[a]<e&&r.times[a+1]>e){i.set(r.times.slice(0,a+1),0),i[a+1]=e,i.set(r.times.slice(a+1),a+2),o.set(r.values.slice(0,(a+1)*n),0),o.set(s.evaluate(e),(a+1)*n),o.set(r.values.slice((a+1)*n),(a+2)*n),u=a+1;break}}return r.times=i,r.values=o,u},mergeMorphTargetTracks:function(r,e){let t=[],n={},i=r.tracks;for(let o=0;o<i.length;++o){let s=i[o],u=mt.parseTrackName(s.name),a=mt.findNode(e,u.nodeName);if(u.propertyName!=="morphTargetInfluences"||u.propertyIndex===void 0){t.push(s);continue}if(s.createInterpolant!==s.InterpolantFactoryMethodDiscrete&&s.createInterpolant!==s.InterpolantFactoryMethodLinear){if(s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),s=s.clone(),s.setInterpolation(Mi)}let f=a.morphTargetInfluences.length,p=a.morphTargetDictionary[u.propertyIndex];if(p===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+u.propertyIndex);let h;if(n[a.uuid]===void 0){h=s.clone();let c=new h.ValueBufferType(f*h.times.length);for(let m=0;m<h.times.length;m++)c[m*f+p]=h.values[m];h.name=(u.nodeName||"")+".morphTargetInfluences",h.values=c,n[a.uuid]=h,t.push(h);continue}let q=s.createInterpolant(new s.ValueBufferType(1));h=n[a.uuid];for(let c=0;c<h.times.length;c++)h.values[c*f+p]=q.evaluate(h.times[c]);for(let c=0;c<s.times.length;c++){let m=this.insertKeyframe(h,s.times[c]);h.values[m*f+p]=s.values[c]}}return r.tracks=t,r},toFloat32BufferAttribute:function(r){let e=new It(new Float32Array(r.count*r.itemSize),r.itemSize,!1);if(!r.normalized&&!r.isInterleavedBufferAttribute)return e.array.set(r.array),e;for(let t=0,n=r.count;t<n;t++)for(let i=0;i<r.itemSize;i++)e.setComponent(t,i,r.getComponent(t,i));return e}};var rs=class r extends Pe{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this.camera=new Jt;let n=this,i=t.color!==void 0?new $e(t.color):new $e(8355711),o=t.textureWidth||512,s=t.textureHeight||512,u=t.clipBias||0,a=t.shader||r.ReflectorShader,f=t.multisample!==void 0?t.multisample:4,p=new rn,h=new M,q=new M,c=new M,m=new pt,A=new M(0,0,-1),y=new vt,g=new M,K=new M,j=new vt,H=new pt,I=this.camera,P=new Pn(o,s,{samples:f,type:Hn}),z=new gn({name:a.name!==void 0?a.name:"unspecified",uniforms:ea.clone(a.uniforms),fragmentShader:a.fragmentShader,vertexShader:a.vertexShader});z.uniforms.tDiffuse.value=P.texture,z.uniforms.color.value=i,z.uniforms.textureMatrix.value=H,this.material=z,this.onBeforeRender=function(b,O,v){if(q.setFromMatrixPosition(n.matrixWorld),c.setFromMatrixPosition(v.matrixWorld),m.extractRotation(n.matrixWorld),h.set(0,0,1),h.applyMatrix4(m),g.subVectors(q,c),g.dot(h)>0===!0&&this.forceUpdate===!1)return;g.reflect(h).negate(),g.add(q),m.extractRotation(v.matrixWorld),A.set(0,0,-1),A.applyMatrix4(m),A.add(c),K.subVectors(q,A),K.reflect(h).negate(),K.add(q),I.position.copy(g),I.up.set(0,1,0),I.up.applyMatrix4(m),I.up.reflect(h),I.lookAt(K),I.far=v.far,I.updateMatrixWorld(),I.projectionMatrix.copy(v.projectionMatrix),H.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),H.multiply(I.projectionMatrix),H.multiply(I.matrixWorldInverse),H.multiply(n.matrixWorld),p.setFromNormalAndCoplanarPoint(h,q),p.applyMatrix4(I.matrixWorldInverse),y.set(p.normal.x,p.normal.y,p.normal.z,p.constant);let G=I.projectionMatrix;j.x=(Math.sign(y.x)+G.elements[8])/G.elements[0],j.y=(Math.sign(y.y)+G.elements[9])/G.elements[5],j.z=-1,j.w=(1+G.elements[10])/G.elements[14],y.multiplyScalar(2/y.dot(j)),G.elements[2]=y.x,G.elements[6]=y.y,G.elements[10]=y.z+1-u,G.elements[14]=y.w,n.visible=!1;let D=b.getRenderTarget(),k=b.xr.enabled,C=b.shadowMap.autoUpdate;b.xr.enabled=!1,b.shadowMap.autoUpdate=!1,b.setRenderTarget(P),b.state.buffers.depth.setMask(!0),b.autoClear===!1&&b.clear(),b.render(O,I),b.xr.enabled=k,b.shadowMap.autoUpdate=C,b.setRenderTarget(D);let J=v.viewport;J!==void 0&&b.state.viewport(J),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return P},this.dispose=function(){P.dispose(),n.material.dispose()}}};rs.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};async function is(r,e){for(let t=0;t<3;t++){let n=t&&!e.startsWith("data:")?e+(e.includes("?")?"&":"?")+"asset_retry="+t:e;try{return await r.loadAsync(n)}catch(i){if(t===2)throw i;await new Promise(o=>setTimeout(o,600*(t+1)))}}}var aa=class extends No{constructor(e){super(e),this.type=Hn}parse(e){let s=function(b,O){switch(b){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(O||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(O||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(O||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(O||""))}},h=function(b,O,v){O=O||1024;let G=b.pos,D=-1,k=0,C="",J=String.fromCharCode.apply(null,new Uint16Array(b.subarray(G,G+128)));for(;0>(D=J.indexOf(`
`))&&k<O&&G<b.byteLength;)C+=J,k+=J.length,G+=128,J+=String.fromCharCode.apply(null,new Uint16Array(b.subarray(G,G+128)));return-1<D?(v!==!1&&(b.pos+=k+D+1),C+J.slice(0,D)):!1},q=function(b){let O=/^#\?(\S+)/,v=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,L=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,G=/^\s*FORMAT=(\S+)\s*$/,D=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,k={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},C,J;for((b.pos>=b.byteLength||!(C=h(b)))&&s(1,"no header found"),(J=C.match(O))||s(3,"bad initial token"),k.valid|=1,k.programtype=J[1],k.string+=C+`
`;C=h(b),C!==!1;){if(k.string+=C+`
`,C.charAt(0)==="#"){k.comments+=C+`
`;continue}if((J=C.match(v))&&(k.gamma=parseFloat(J[1])),(J=C.match(L))&&(k.exposure=parseFloat(J[1])),(J=C.match(G))&&(k.valid|=2,k.format=J[1]),(J=C.match(D))&&(k.valid|=4,k.height=parseInt(J[1],10),k.width=parseInt(J[2],10)),k.valid&2&&k.valid&4)break}return k.valid&2||s(3,"missing format specifier"),k.valid&4||s(3,"missing image size specifier"),k},c=function(b,O,v){let L=O;if(L<8||L>32767||b[0]!==2||b[1]!==2||b[2]&128)return new Uint8Array(b);L!==(b[2]<<8|b[3])&&s(3,"wrong scanline width");let G=new Uint8Array(4*O*v);G.length||s(4,"unable to allocate buffer space");let D=0,k=0,C=4*L,J=new Uint8Array(4),R=new Uint8Array(C),W=v;for(;W>0&&k<b.byteLength;){k+4>b.byteLength&&s(1),J[0]=b[k++],J[1]=b[k++],J[2]=b[k++],J[3]=b[k++],(J[0]!=2||J[1]!=2||(J[2]<<8|J[3])!=L)&&s(3,"bad rgbe scanline format");let ae=0,ge;for(;ae<C&&k<b.byteLength;){ge=b[k++];let Le=ge>128;if(Le&&(ge-=128),(ge===0||ae+ge>C)&&s(3,"bad scanline data"),Le){let we=b[k++];for(let We=0;We<ge;We++)R[ae++]=we}else R.set(b.subarray(k,k+ge),ae),ae+=ge,k+=ge}let le=L;for(let Le=0;Le<le;Le++){let we=0;G[D]=R[Le+we],we+=L,G[D+1]=R[Le+we],we+=L,G[D+2]=R[Le+we],we+=L,G[D+3]=R[Le+we],D+=4}W--}return G},m=function(b,O,v,L){let G=b[O+3],D=Math.pow(2,G-128)/255;v[L+0]=b[O+0]*D,v[L+1]=b[O+1]*D,v[L+2]=b[O+2]*D,v[L+3]=1},A=function(b,O,v,L){let G=b[O+3],D=Math.pow(2,G-128)/255;v[L+0]=Pr.toHalfFloat(Math.min(b[O+0]*D,65504)),v[L+1]=Pr.toHalfFloat(Math.min(b[O+1]*D,65504)),v[L+2]=Pr.toHalfFloat(Math.min(b[O+2]*D,65504)),v[L+3]=Pr.toHalfFloat(1)},y=new Uint8Array(e);y.pos=0;let g=q(y),K=g.width,j=g.height,H=c(y.subarray(y.pos),K,j),I,P,z;switch(this.type){case tn:z=H.length/4;let b=new Float32Array(z*4);for(let v=0;v<z;v++)m(H,v*4,b,v*4);I=b,P=tn;break;case Hn:z=H.length/4;let O=new Uint16Array(z*4);for(let v=0;v<z;v++)A(H,v*4,O,v*4);I=O,P=Hn;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:K,height:j,data:I,header:g.string,gamma:g.gamma,exposure:g.exposure,type:P}}setDataType(e){return this.type=e,this}load(e,t,n,i){function o(s,u){switch(s.type){case tn:case Hn:s.colorSpace=ur,s.minFilter=wt,s.magFilter=wt,s.generateMipmaps=!1,s.flipY=!0;break}t&&t(s,u)}return super.load(e,o,n,i)}};var os={\u6728\u53F0\u9762_\u989C\u8272:"./jiaxin-room-assets/wood-color.jpg",\u6728\u53F0\u9762_\u6CD5\u7EBF:"./jiaxin-room-assets/wood-normal.jpg",\u6728\u53F0\u9762_\u7C97\u7CD9\u5EA6:"./jiaxin-room-assets/wood-roughness.jpg",\u5BA4\u5185\u6444\u5F71\u73AF\u5883:"./jiaxin-room-assets/room-light.hdr",\u5899\u9762_\u989C\u8272:"./jiaxin-room-assets/wall-color.jpg",\u5899\u9762_\u6CD5\u7EBF:"./jiaxin-room-assets/wall-normal.jpg",\u5899\u9762_\u7C97\u7CD9\u5EA6:"./jiaxin-room-assets/wall-roughness.jpg",\u5730\u576A_\u989C\u8272:"./jiaxin-room-assets/floor-color.jpg",\u5730\u576A_\u6CD5\u7EBF:"./jiaxin-room-assets/floor-normal.jpg",\u5730\u576A_\u7C97\u7CD9\u5EA6:"./jiaxin-room-assets/floor-roughness.jpg"};var n6={};function yh(r,e){let t=r*374761393+e*668265263+12017|0;return t=(t^t>>>13)*1274126177,((t^t>>>16)>>>0)/4294967295}function h4(r,e,t){let n=yh(e,t);return r==="\u6728\u7EB9"?.5+.12*Math.sin(t*.14+Math.sin(e*.026)*2.5)+.09*Math.sin(t*.75+e*.006)+n*.12:r==="\u62C9\u4E1D\u91D1\u5C5E"?.42+yh(1,t)*.18+n*.045:r==="\u6253\u5370\u5C42\u7EB9"?.5+.16*Math.cos(t*Math.PI/2)+n*.025:r==="\u5730\u576A"?.44+n*.12+.018*Math.sin(e*.04)*Math.sin(t*.032):r==="\u4E73\u80F6\u6F06"?.43+n*.15:.45+n*.09}function c4(r,e=256){let t=new Float32Array(e*e);for(let i=0;i<e;i++)for(let o=0;o<e;o++)t[i*e+o]=h4(r,o,i);let n={};for(let i of["\u989C\u8272","\u6CD5\u7EBF","\u7C97\u7CD9\u5EA6"]){let o=document.createElement("canvas");o.width=o.height=e;let s=o.getContext("2d"),u=s.createImageData(e,e);for(let f=0;f<e;f++)for(let p=0;p<e;p++){let h=f*e+p,q=h*4,c=t[h];if(i==="\u6CD5\u7EBF"){let m=r==="\u6253\u5370\u5C42\u7EB9"?.7:.23,A=(t[f*e+(p+1)%e]-t[f*e+(p-1+e)%e])*m,y=(t[(f+1)%e*e+p]-t[(f-1+e)%e*e+p])*m,g=1/Math.hypot(A,y,1);u.data[q]=(-A*g*.5+.5)*255,u.data[q+1]=(-y*g*.5+.5)*255,u.data[q+2]=(g*.5+.5)*255}else{let m=i==="\u989C\u8272"?231+(c-.5)*32:180+(c-.5)*60;u.data[q]=u.data[q+1]=u.data[q+2]=m}u.data[q+3]=255}s.putImageData(u,0,0),n6[r+"_"+i]=o;let a=new bt(o);a.wrapS=a.wrapT=$t,a.colorSpace=i==="\u989C\u8272"?ft:an,n[i]=a}return n}var q4={};function bn(r,e,t,n,i=[1,1]){let o=q4[r]??=c4(r),s={};for(let[a,f]of Object.entries(o))s[a]=f.clone(),s[a].repeat.set(...i),s[a].needsUpdate=!0;let u=new rt({color:e,metalness:t,roughness:n,map:s.\u989C\u8272,normalMap:s.\u6CD5\u7EBF,roughnessMap:s.\u7C97\u7CD9\u5EA6});return u.name=r+"\u6750\u8D28",u}var ce={plastic:bn("\u6CE8\u5851\u5851\u6599","#ecece6",0,.37,[2,2]),charcoal:bn("\u6CE8\u5851\u5851\u6599","#303438",.08,.43,[2,2]),aluminium:bn("\u62C9\u4E1D\u91D1\u5C5E","#cdd2d5",.88,.36,[1,4]),powderSteel:bn("\u6CE8\u5851\u5851\u6599","#535c60",.04,.42,[2,2]),wood:bn("\u6728\u7EB9","#bfac8b",0,.53,[2.4,1.6]),floor:bn("\u5730\u576A","#67717b",.03,.34,[7.4,6.5]),paint:bn("\u4E73\u80F6\u6F06","#eeeee8",0,.92,[3,3]),pei:bn("\u5730\u576A","#c3a564",.36,.56,[3,3]),rubber:bn("\u6CE8\u5851\u5851\u6599","#202326",0,.87,[2,2])};function Ah(r){return bn("\u6253\u5370\u5C42\u7EB9",r,0,.38,[1,10])}function Hh(){return Object.fromEntries(Object.entries(n6).map(([r,e])=>[r,e.toDataURL("image/png")]))}async function lh(r){let e=new Qr;for(let[t,n,i,o,s,u]of[["wood","\u6728\u53F0\u9762","#e2ceb3",[1.1,.7],.17,.56]]){let a=await Promise.all(["\u989C\u8272","\u6CD5\u7EBF","\u7C97\u7CD9\u5EA6"].map(async p=>{let h=await is(e,os[n+"_"+p]);return h.wrapS=h.wrapT=$t,h.repeat.set(...o),h.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy()),h.colorSpace=p==="\u989C\u8272"?ft:an,h}));if(t==="floor"||t==="paint"||t==="wood"){let p=document.createElement("canvas");p.width=p.height=1024;let h=p.getContext("2d");h.drawImage(a[0].image,0,0,1024,1024);let q=h.getImageData(0,0,1024,1024);for(let m=0;m<q.data.length;m+=4){let A=(q.data[m]+q.data[m+1]+q.data[m+2])/3,y=t==="floor"?243+(A-110)*.07:t==="paint"?250+(A-140)*.025:228+(A-100)*.5;q.data[m]=q.data[m+1]=q.data[m+2]=Math.max(140,Math.min(255,y))}h.putImageData(q,0,0);let c=new bt(p);c.colorSpace=ft,c.wrapS=c.wrapT=$t,c.repeat.set(...o),c.anisotropy=8,a[0]=c,n6["\u5B9E\u7269\u6821\u8272_"+n+"_\u989C\u8272"]=p}let f=new xt({color:i,map:a[0],normalMap:a[1],roughnessMap:a[2],normalScale:new se(s,s),roughness:u,metalness:0,clearcoat:t==="floor"?.18:t==="wood"?.12:0,clearcoatRoughness:.4});f.name="\u6444\u5F71PBR_"+n,ce[t]=f}for(let t of["plastic","charcoal"]){let n=ce[t];n.normalScale.set(.045,.045),n.roughness=t==="plastic"?.32:.38,n.color.set(t==="plastic"?"#e4e5e1":"#24292b")}ce.aluminium.normalScale.set(.08,.08),ce.aluminium.metalness=.98,ce.aluminium.roughness=.26,ce.pei.normalScale.set(.2,.2);for(let t of Object.values(ce))t.envMapIntensity=.65}async function vh(r){let e=await is(new aa,os.\u5BA4\u5185\u6444\u5F71\u73AF\u5883);e.mapping=Bi;let t=new $i(r);t.compileEquirectangularShader();let n=t.fromEquirectangular(e).texture;return e.dispose(),t.dispose(),n}var ss=new M;function xn(r,e,t,n,i,o){let s=2*Math.PI*i/4,u=Math.max(o-2*i,0),a=Math.PI/4;ss.copy(e),ss[n]=0,ss.normalize();let f=.5*s/(s+u),p=1-ss.angleTo(r)/a;return Math.sign(ss[t])===1?p*f:u/(s+u)+f+f*(1-p)}var pn=class r extends Lt{constructor(e=1,t=1,n=1,i=2,o=.1){let s=i*2+1;if(o=Math.min(e/2,t/2,n/2,o),super(1,1,1,s,s,s),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:o},s===1)return;let u=this.toNonIndexed();this.index=null,this.attributes.position=u.attributes.position,this.attributes.normal=u.attributes.normal,this.attributes.uv=u.attributes.uv;let a=new M,f=new M,p=new M(e,t,n).divideScalar(2).subScalar(o),h=this.attributes.position.array,q=this.attributes.normal.array,c=this.attributes.uv.array,m=h.length/6,A=new M,y=.5/s;for(let g=0,K=0;g<h.length;g+=3,K+=2)switch(a.fromArray(h,g),f.copy(a),f.x-=Math.sign(f.x)*y,f.y-=Math.sign(f.y)*y,f.z-=Math.sign(f.z)*y,f.normalize(),h[g+0]=p.x*Math.sign(a.x)+f.x*o,h[g+1]=p.y*Math.sign(a.y)+f.y*o,h[g+2]=p.z*Math.sign(a.z)+f.z*o,q[g+0]=f.x,q[g+1]=f.y,q[g+2]=f.z,Math.floor(g/m)){case 0:A.set(1,0,0),c[K+0]=xn(A,f,"z","y",o,n),c[K+1]=1-xn(A,f,"y","z",o,t);break;case 1:A.set(-1,0,0),c[K+0]=1-xn(A,f,"z","y",o,n),c[K+1]=1-xn(A,f,"y","z",o,t);break;case 2:A.set(0,1,0),c[K+0]=1-xn(A,f,"x","z",o,e),c[K+1]=xn(A,f,"z","x",o,n);break;case 3:A.set(0,-1,0),c[K+0]=1-xn(A,f,"x","z",o,e),c[K+1]=1-xn(A,f,"z","x",o,n);break;case 4:A.set(0,0,1),c[K+0]=1-xn(A,f,"x","y",o,e),c[K+1]=1-xn(A,f,"y","x",o,t);break;case 5:A.set(0,0,-1),c[K+0]=xn(A,f,"x","y",o,e),c[K+1]=1-xn(A,f,"y","x",o,t);break}}static fromJSON(e){return new r(e.width,e.height,e.depth,e.segments,e.radius)}};var Pt=ce.powderSteel.clone();Pt.name="\u767D\u8272\u55B7\u6D82\u8D27\u67B6\u94A2\u6750";Pt.color.set("#f4f4ef");Pt.metalness=.02;Pt.roughness=.46;Pt.normalScale.set(.055,.055);Pt.envMapIntensity=.65;var vn=new Map;function kn(r,e,t,n,i,o,s=""){let u=new Pe(e,t);return u.position.set(n,i,o),u.castShadow=!0,u.receiveShadow=!0,u.name=s,r.add(u),u}function Xe(r,e,t,n,i,o,s,u,a=.008){let f=[e,t,n,a].join(",");return vn.has(f)||vn.set(f,new pn(e,t,n,2,Math.min(a,e*.2,t*.2,n*.2))),kn(r,vn.get(f),u,i,o,s)}function On(r,e,t,n,i,o,s,u="y",a=32){let f=`c${e},${t},${a}`;vn.has(f)||vn.set(f,new Bt(e,e,t,a));let p=kn(r,vn.get(f),s,n,i,o);return u==="z"&&(p.rotation.x=Math.PI/2),u==="x"&&(p.rotation.z=Math.PI/2),p}function us(r,e,t,n){return kn(r,new Bn(new Yn(e.map(i=>new M(...i))),36,t,8,!1),n,0,0,0)}function Vn(r,e=512,t=256){let n=document.createElement("canvas");n.width=e,n.height=t,r(n.getContext("2d"),e,t);let i=new bt(n);return i.colorSpace=ft,i}function Un(r,e,t,n,i,o,s,u=0,a=0){let f=kn(r,new jt(t,n),new rt({map:e,roughness:.72,metalness:0,transparent:!0,side:Ot}),i,o,s);return f.rotation.set(a,u,0),f}var dh=Vn((r,e,t)=>{r.fillStyle="#12181d",r.fillRect(0,0,e,t),r.strokeStyle="#58b271",r.lineWidth=8,r.beginPath(),r.arc(94,104,65,-Math.PI/2,Math.PI*.9),r.stroke(),r.fillStyle="#eee",r.font="24px sans-serif",r.fillText("\u51C6\u5907\u5C31\u7EEA",182,55),r.font="19px sans-serif",r.fillText("\u55B7\u5634  25\xB0C",182,100),r.fillText("\u70ED\u5E8A  25\xB0C",182,135);for(let n=0;n<4;n++)r.fillStyle=n===0?"#3e9c61":"#59636c",r.fillRect(38+n*117,196,77,12)}),Oh=Vn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#41474b",r.fillRect(210,20,33,115),r.fillRect(250,20,33,115),r.save(),r.globalCompositeOperation="destination-out",r.lineWidth=12,r.strokeStyle="white",r.beginPath(),r.moveTo(210,95),r.lineTo(250,60),r.lineTo(283,87),r.stroke(),r.restore(),r.fillStyle="#41474b",r.font="28px sans-serif",r.textAlign="center",r.fillText("Bambu Lab",e/2,188)}),g4=Vn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#25282b",r.beginPath(),r.arc(e/2,t/2,114,0,Math.PI*2),r.fill(),r.strokeStyle="#979b9c",r.lineWidth=4;for(let n=16;n<108;n+=13)r.beginPath(),r.arc(e/2,t/2,n,0,Math.PI*2),r.stroke();for(let n=0;n<8;n++){let i=n*Math.PI/4;r.beginPath(),r.moveTo(e/2+Math.cos(i)*12,t/2+Math.sin(i)*12),r.lineTo(e/2+Math.cos(i)*110,t/2+Math.sin(i)*110),r.stroke()}r.fillStyle="#917a39",r.beginPath(),r.arc(e/2,t/2,25,0,Math.PI*2),r.fill()},256,256),m4=Vn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#e2e3dc",r.beginPath(),r.arc(e/2,t/2,e*.49,0,Math.PI*2),r.fill(),r.fillStyle="#bbc0ba";for(let n=0;n<29;n++)for(let i=0;i<29;i++){let o=12+i*8,s=12+n*8;Math.hypot(o-128,s-128)<111&&Math.hypot(o-128,s-128)>45&&r.fillRect(o,s,3,3)}r.strokeStyle="#bbbeb6",r.lineWidth=2;for(let n of[100,111])r.beginPath(),r.arc(128,128,n,0,Math.PI*2),r.stroke();r.fillStyle="#353b3e",r.font="bold 15px sans-serif",r.textAlign="center",r.fillText("Bambu Lab",128,57),r.font="12px sans-serif",r.fillText("1 kg \xB7 1.75 mm",128,200)},256,256),y4=Vn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#303436",r.beginPath(),r.arc(128,128,124,0,Math.PI*2),r.fill(),r.save(),r.globalCompositeOperation="destination-out";for(let n=0;n<6;n++)r.save(),r.translate(128,128),r.rotate(n*Math.PI/3),r.beginPath(),r.ellipse(0,-70,17,30,0,0,Math.PI*2),r.fill(),r.restore();r.restore(),r.fillStyle="#dce1db",r.font="12px sans-serif",r.textAlign="center",r.fillText("1.75 mm",128,117)},256,256),r6=new Map;function to(r){return r6.has(r)||r6.set(r,Ah(r)),r6.get(r)}function fa(r,e,t,n,i,o="z",s=!1){let u=new Te;u.name="\u5E26\u7ED5\u4E1D\u7EB9\u7406\u7684\u8017\u6750\u6599\u76D8",u.position.set(e,t,n),o==="x"&&(u.rotation.y=Math.PI/2),r.add(u),On(u,.094,.058,0,0,0,to(i),"z");let a=new Xo(.025,.101,40),f=new rt({map:s?y4:m4,transparent:!0,alphaTest:s?.4:0,side:Ot,roughness:.72});for(let h of[-.034,.034]){let q=kn(u,a,f,0,0,h);h<0&&(q.rotation.y=Math.PI)}let p=new Pe(new Bt(.026,.026,.071,28,1,!0),ce.charcoal);return p.rotation.x=Math.PI/2,u.add(p),u}function Kh(r){let e=new Te;e.name="\u62D3\u7AF9H2S\u6FC0\u5149\u7248_492x514x626\u6BEB\u7C73",r.add(e);let t=.8;Xe(e,.492,.045,.514,0,t+.0225,0,ce.charcoal,.007),Xe(e,.041,.584,.5,-.2255,t+.335,0,ce.plastic,.012),Xe(e,.041,.584,.5,.2255,t+.335,0,ce.plastic,.012),Xe(e,.424,.048,.464,0,t+.075,0,ce.charcoal),Xe(e,.423,.088,.514,0,t+.582,0,ce.charcoal),Xe(e,.424,.5,.034,0,t+.321,-.239,ce.charcoal);for(let p of[-.199,.199])Xe(e,.015,.494,.018,p,t+.294,.26,ce.charcoal,.002);for(let p of[t+.046,t+.538])Xe(e,.414,.016,.018,0,p,.26,ce.charcoal,.002);let n=new xt({color:"#103e15",transparent:!0,opacity:.56,roughness:.1,metalness:0,transmission:.4,thickness:.003,ior:1.5,side:Ot,depthWrite:!1});n.name="\u6FC0\u5149\u7EFF\u8272\u9632\u62A4\u73BB\u7483_\u5916\u89C2\u53C2\u7167",Xe(e,.38,.475,.004,0,t+.294,.271,n,.003),Xe(e,.012,.155,.014,.18,t+.28,.291,ce.charcoal,.004);for(let p of[t+.1,t+.48])On(e,.009,.02,-.198,p,.265,ce.aluminium,"y"),Xe(e,.014,.039,.017,-.2,p,.277,ce.charcoal,.003);Xe(e,.35,.016,.34,0,t+.21,0,ce.pei,.003),Xe(e,.365,.028,.36,0,t+.189,0,ce.charcoal);for(let p of[-.16,.16])On(e,.006,.4,p,t+.277,-.15,ce.aluminium);Xe(e,.353,.029,.029,0,t+.467,-.06,ce.aluminium,.002),Xe(e,.078,.077,.065,.07,t+.429,-.02,ce.charcoal);for(let p=0;p<12;p++)On(e,.0026,.003,-.158+p*.028,t+.467,-.044,ce.charcoal,"z",12);Xe(e,.328,.004,.019,0,t+.169,.174,new rt({color:"#d8d8c1",emissive:"#b7ffc5",emissiveIntensity:.25}));let i=new Te;i.name="\u5DE6\u4E0A\u89E6\u63A7\u5C4F",i.position.set(-.151,t+.595,.282),i.rotation.x=-.16,e.add(i),Xe(i,.145,.083,.023,0,0,0,ce.charcoal,.007),Un(i,dh,.131,.069,0,0,.0125),Un(e,Vn((p,h,q)=>{p.fillStyle="#2d3134",p.fillRect(0,0,h,q),p.fillStyle="#d4d7d8",p.font="48px sans-serif",p.textAlign="right",p.fillText("H2S",h-18,84)}),.115,.029,.137,t+.603,.26),Un(e,Oh,.17,.1,.247,t+.345,0,Math.PI/2),Un(e,Oh,.17,.1,-.247,t+.345,0,-Math.PI/2);for(let p of[-.19,.19])for(let h of[-.205,.205])Xe(e,.05,.012,.05,p,t+.006,h,ce.rubber,.003);for(let p=0;p<14;p++)Xe(e,.003,.095,.002,.06+p*.01,t+.41,-.259,ce.charcoal,4e-4);let o=new Te;o.name="AMS2Pro_372x280x226\u6BEB\u7C73",o.position.set(0,t+.626,-.025),e.add(o),Xe(o,.372,.098,.28,0,.049,0,ce.charcoal,.008);let s=new xt({color:"#4c5559",roughness:.13,metalness:0,transparent:!0,opacity:.39,transmission:.25,thickness:.003,ior:1.5,side:Ot,depthWrite:!1});s.name="AMS\u70DF\u7070\u900F\u660E\u7F69";let u=new Tt;u.moveTo(-.14,.091),u.lineTo(-.14,.143),u.bezierCurveTo(-.14,.214,-.1,.226,0,.226),u.bezierCurveTo(.1,.226,.14,.214,.14,.143),u.lineTo(.14,.091),u.closePath();let a=new Et(u,{depth:.36,bevelEnabled:!1,steps:1,curveSegments:20}),f=kn(o,a,s,-.18,0,0);f.rotation.y=Math.PI/2;for(let p=0;p<4;p++)fa(o,-.134+p*.089,.12,0,["#eeeede","#487bad","#669754","#be5b42"][p],"x"),Xe(o,.055,.043,.024,-.134+p*.089,.055,.147,ce.charcoal),On(o,.012,.009,-.134+p*.089,.078,.151,ce.aluminium,"z");return Xe(o,.36,.087,.003,0,.048,.144,s,.003),Un(o,Vn((p,h,q)=>{p.fillStyle="#252b30",p.fillRect(0,0,h,q),p.fillStyle="#dde4df",p.font="41px sans-serif",p.fillText("AMS 2 Pro",10,80)}),.107,.025,.11,.089,.151),e}function Ih(r,e){let t=new Te;t.name="\u62D3\u7AF9A2L_544x529x505\u6BEB\u7C73",t.position.x=e,r.add(t);let n=.8;Xe(t,.512,.067,.485,0,n+.049,.023,ce.plastic,.015),Xe(t,.49,.019,.46,0,n+.008,.023,ce.charcoal,.006);for(let o of[-.205,.205])for(let s of[-.19,.207])Xe(t,.038,.013,.039,o,n+.006,s,ce.rubber,.004);for(let o of[-.242,.242])Xe(t,.06,.452,.083,o,n+.279,-.19,ce.plastic,.009),Xe(t,.063,.095,.107,o,n+.068,-.193,ce.charcoal,.01),Xe(t,.009,.402,.009,o+.019,n+.291,-.145,ce.charcoal,.001),Xe(t,.012,.381,.005,o-.007,n+.282,-.142,ce.aluminium,.001);Xe(t,.48,.036,.049,0,n+.487,-.19,ce.aluminium,.004);for(let o of[-.244,.244])Xe(t,.067,.04,.055,o,n+.487,-.19,ce.charcoal,.008);Xe(t,.496,.025,.027,0,n+.312,-.126,ce.aluminium,.002);for(let o=0;o<17;o++)On(t,.0028,.003,-.223+o*.026,n+.312,-.11,ce.charcoal,"z",12);for(let o of[-.227,.227])Xe(t,.022,.401,.029,o,n+.274,-.15,ce.charcoal,.002);Xe(t,.329,.019,.325,0,n+.096,.013,ce.aluminium,.003),Xe(t,.33,.003,.32,0,n+.108,.013,ce.pei,6e-4);for(let o of[-.088,.088])On(t,.005,.423,o,n+.074,-.011,ce.aluminium,"z");Xe(t,.1,.094,.08,-.025,n+.307,-.089,ce.plastic,.006),Xe(t,.08,.027,.063,-.025,n+.25,-.083,ce.charcoal,.005),On(t,.004,.017,-.025,n+.228,-.061,new rt({color:"#d0aa58",metalness:.8,roughness:.33})),Un(t,g4,.047,.047,-.025,n+.315,-.047),Un(t,Vn((o,s,u)=>{o.fillStyle="#e4e6e0",o.fillRect(0,0,s,u),o.fillStyle="#576064",o.font="35px sans-serif",o.textAlign="center",o.fillText("Bambu Lab",s/2,90)}),.062,.016,-.025,n+.273,-.047),Xe(t,.077,.065,.084,.248,n+.311,-.135,ce.plastic,.009),Un(t,Vn((o,s,u)=>{o.fillStyle="#e6e8e0",o.fillRect(0,0,s,u),o.fillStyle="#4e565a",o.font="bold 52px sans-serif",o.fillText("A2L",40,86)}),.058,.024,.248,n+.326,-.091);let i=new Te;i.position.set(.176,n+.106,.219),i.rotation.x=-.63,t.add(i),Xe(i,.104,.063,.014,0,0,0,ce.charcoal,.004),Un(i,dh,.093,.053,0,0,.008);for(let o=0;o<8;o++)for(let s=0;s<4;s++)On(t,.0014,.002,.239,n+.038+s*.007,.087+o*.008,ce.charcoal,"x",8);return us(t,[[.248,n+.34,-.135],[.22,n+.62,-.14],[0,n+.692,-.14],[-.07,n+.5,-.1],[-.044,n+.36,-.1]],.004,ce.rubber),us(t,[[.274,n+.312,-.175],[.33,n+.24,-.195],[.33,n+.07,-.17],[.272,n+.035,-.15]],.0038,ce.rubber),us(t,[[-.04,n+.36,-.07],[-.032,n+.44,-.082],[-.015,n+.49,-.162]],.003,ce.plastic),Xe(t,.026,.036,.025,-.015,n+.476,-.174,ce.plastic,.005),Xe(t,.052,.014,.026,.206,n+.365,-.109,ce.plastic,.005),Xe(t,.071,.016,.045,-.253,n+.266,-.108,ce.charcoal,.003),t}function jh(r,e,t){let n=new Tt;return n.moveTo(-r/2+t,-e/2),n.lineTo(r/2-t,-e/2),n.quadraticCurveTo(r/2,-e/2,r/2,-e/2+t),n.lineTo(r/2,e/2-t),n.quadraticCurveTo(r/2,e/2,r/2-t,e/2),n.lineTo(-r/2+t,e/2),n.quadraticCurveTo(-r/2,e/2,-r/2,e/2-t),n.lineTo(-r/2,-e/2+t),n.quadraticCurveTo(-r/2,-e/2,-r/2+t,-e/2),n}var no=ce.plastic.clone();no.color.set("#c7ccc6");no.name="\u6D45\u7070\u5851\u6599\u5468\u8F6C\u76C6";no.roughness=.57;function A4(r,e,t,n){let u="\u7070\u8272\u5F00\u53E3\u5468\u8F6C\u76C6";if(!vn.has(u)){let p=jh(.51,.46,.018),h=jh(.51-.016,.46-.016,.014);p.holes.push(new sn(h.getPoints(24)));let q=new Et(p,{depth:.115,bevelEnabled:!1,curveSegments:6}),c=q.getAttribute("position");for(let m=0;m<c.count;m++){let A=.87+.13*c.getZ(m)/.115;c.setXY(m,c.getX(m)*A,c.getY(m)*A)}c.needsUpdate=!0,q.computeVertexNormals(),vn.set(u,q)}let a=new Te;a.name="\u5F00\u53E3\u6D45\u7070\u5206\u7C7B\u76C6",a.position.set(e,t,n),r.add(a);let f=kn(a,vn.get(u),no,0,0,0);f.rotation.x=-Math.PI/2,Xe(a,.51*.87,.008,.46*.87,0,.004,0,no,.006);for(let p of[-.46/2,.46/2])Xe(a,.51-.025,.006,.007,0,.115,p,no,.002);return a}function H4(r,e,t){let n="\u767D\u8272\u8D27\u67B6\u846B\u82A6\u5B54\u7ACB\u67F1";if(!vn.has(n)){let a=new Tt;a.moveTo(-.054/2,0),a.lineTo(.054/2,0),a.lineTo(.054/2,1.985),a.lineTo(-.054/2,1.985),a.closePath();for(let f=.055;f<1.94;f+=.07){let p=new sn;p.moveTo(-.0035,f-.011),p.lineTo(-.0035,f-.001),p.absarc(0,f+.004,.0065,Math.PI*1.15,Math.PI*1.85,!0),p.lineTo(.0035,f-.011),p.closePath(),a.holes.push(p)}vn.set(n,new Et(a,{depth:.0018,bevelEnabled:!1,curveSegments:5}))}let i=new Te;i.name="\u767D\u8272L\u5F62\u51B2\u5B54\u7ACB\u67F1",i.position.set(e,.011,t),e<0&&(i.rotation.y=Math.PI),r.add(i),kn(i,vn.get(n),Pt,0,0,.027);let o=kn(i,vn.get(n),Pt,.027,0,0);o.rotation.y=Math.PI/2,Xe(i,.068,.009,.065,0,-.006,0,ce.rubber,.002)}function Ph(r){r.userData={\u7528\u9014:"\u6253\u5370\u6210\u54C1\u6682\u653E",\u53C2\u7167:"\u7528\u6237\u56FE2\u767D\u8272\u51B2\u5B54\u7ACB\u67F1\u8D27\u67B6",\u5C42\u6570:5,\u5916\u5C3A\u5BF8\u7C73:[1.8,.6,2],\u4F4D\u7F6E:"\u4E1C\u5357\u89D2"};for(let e of[-.863,.863])for(let t of[-.267,.267])H4(r,e,t);for(let[e,t]of[0,1,2,3,4].map(n=>[n,.18+n*.39])){let n=new Te;n.name="\u6210\u54C1\u8D27\u67B6\u7B2C"+(e+1)+"\u5C42",n.position.y=t,r.add(n),Xe(n,1.73,.016,.56,0,0,0,Pt,.002);for(let a of[-.273,.273]){Xe(n,1.73,.066,.028,0,-.021,a,Pt,.002);for(let f of[-.035,-.015,.005])Xe(n,1.69,.004,.003,0,f,a+Math.sign(a)*.015,Pt,.001)}for(let a of[-.85,.85])Xe(n,.025,.052,.52,a,-.021,0,Pt,.002);for(let a of[-.57,0,.57])A4(n,a,.009,0);let i=["#919da6","#58a4a8","#e1bc6c","#c08098","#6684a5"][e],o=[];for(let a=0;a<=24;a++){let f=a*.007,p=.05+.025*Math.sin(a/24*Math.PI)+.008*Math.sin(a/24*8);o.push(new se(p,f))}kn(n,new Jo(o,48),to(i),-.61,.018,-.02);let s=new Tt;for(let a=0;a<64;a++){let f=a*Math.PI/32,p=a%4<2?.075:.059;a===0?s.moveTo(Math.cos(f)*p,Math.sin(f)*p):s.lineTo(Math.cos(f)*p,Math.sin(f)*p)}s.closePath();let u=new sn;u.absarc(0,0,.02,0,Math.PI*2,!0),s.holes.push(u);for(let a=0;a<2;a++){let f=kn(n,new Et(s,{depth:.022,bevelEnabled:!1}),to(i),-.1+a*.2,.018,0);f.rotation.x=-Math.PI/2}Xe(n,.14,.025,.17,.58,.0305,0,to(i),.003),Xe(n,.14,.145,.018,.58,.103,-.075,to(i),.003),On(n,.02,.004,.58,.12,-.063,ce.charcoal,"z"),Xe(n,.1,.085,.12,-.37,.0605,.08,to("#d5d5c8"),.004)}for(let e of[-.854,.854])us(r,[[e,.2,-.24],[e,1.96,.24]],.007,Pt),us(r,[[e,.2,.24],[e,1.96,-.24]],.007,Pt);return r}function l4(r,e,t,n,i,o,s="#326f51"){let u=Vn((f,p,h)=>{f.fillStyle="#f9faf5",f.fillRect(0,0,p,h),f.fillStyle=s,f.fillRect(0,0,16,h),f.fillStyle="#283b33",f.font='bold 32px "PingFang SC",sans-serif',f.textAlign="center",f.fillText(e,p/2,h*.65)},512,100),a=new Te;return a.name="\u8017\u6750\u6807\u7B7E_"+e,a.position.set(n,i,o),r.add(a),Xe(a,t,.055,.005,0,0,0,Pt,.001),Un(a,u,t-.006,.049,0,0,-.003,Math.PI),a}function bh(r,e){r.userData={\u53C2\u7167:"\u7528\u6237\u56FE1\u4E94\u5C42\u53CC\u5706\u6746\u79FB\u52A8\u6599\u76D8\u67B6",\u989C\u8272:"\u767D\u8272",\u5916\u5C3A\u5BF8\u7C73:[1.2,.5,2],\u5C42\u6570:5,\u6EDA\u8F6E\u67B6:!0};let t={};for(let n of[-.555,.555]){Xe(r,.055,.045,.49,n,.1275,0,Pt,.003);for(let i of[-.195,.195]){let o=new Te;o.name="\u4E07\u5411\u811A\u8F6E",o.position.set(n,.055,i),r.add(o),Xe(o,.052,.013,.055,0,.044,0,Pt,.002);for(let s of[-.02,.02])Xe(o,.008,.064,.024,s,.005,0,Pt,.001);On(o,.028,.031,0,-.027,0,ce.rubber,"x",24),On(o,.01,.033,0,-.027,0,ce.aluminium,"x",16)}}for(let n of[-.555,.555])for(let i of[-.17,.17])Xe(r,.028,1.85,.028,n,1.075,i,Pt,.002);for(let[n,i]of e.entries()){let o=.355+n*.345,s=new Te;s.name="\u6599\u76D8\u6EDA\u8F6E\u67B6\u7B2C"+(n+1)+"\u5C42",s.position.y=o,r.add(s);for(let a of[-.077,.077])On(s,.012,1.12,0,-.083,a,Pt,"x",32);for(let a of[-.555,.555])Xe(s,.026,.028,.34,a,-.083,0,Pt,.002);let u=12/i.length;for(let a=0;a<12;a++){let f=i[Math.floor(a/u)],p={PLA:["#e6e7dd","#48535c","#5395ab","#54845a"][Math.floor(a/3)%4],PETG:["#f2ead8","#2e3942","#82b2b9","#ae775d"][Math.floor(a/3)%4],TPU:"#966fbc",ABS:"#bc6061",ASA:"#cda64c",PA:"#4b5662",PC:"#afcbd0",PVA:"#d6cfaf"}[f];fa(s,(a-5.5)*.086,0,0,p,"x",!0),t[f]=(t[f]??0)+1}Xe(s,1.08,.038,.018,0,-.14,-.195,Pt,.002);for(let[a,f]of i.entries()){let p=1.04/i.length,h=(a-(i.length-1)/2)*p;l4(s,f+(i.length===1?" \xB7 \u5E38\u7528":" \xB7 \u7279\u6B8A"),p-.012,h,-.14,-.209,i.length===1?"#37805e":"#85713e")}}for(let n of[-.555,.555])Xe(r,.028,.03,.34,n,1.985,0,Pt,.002);return r.userData.\u5206\u7C7B\u5BB9\u91CF=t,r.userData.\u603B\u5BB9\u91CF=Object.values(t).reduce((n,i)=>n+i,0),r}var xh="data:image/png;base64,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";async function zh(){let r=new Image;return r.src=xh,await r.decode(),r}function Lh(r,e,t,n,i,o,s,u=0){let a=new Te;a.name="\u5899\u9762\u6807\u8BC6_"+t,a.position.set(...s),a.rotation.y=u,a.userData={\u5B89\u88C5:"\u5899\u9762\u8D34\u88C5",\u6807\u8BC6:t},r.add(a);let f=document.createElement("canvas");f.width=1536,f.height=Math.round(f.width*o/i);let p=f.getContext("2d");p.fillStyle="#f6f7f2",p.fillRect(0,0,f.width,f.height),p.fillStyle="#00a844",p.fillRect(0,0,19,f.height);let h=Math.min(f.height*.27,93),q=h*e.width/e.height;p.drawImage(e,35,15,q,h),p.fillStyle="#203d35",p.font=`600 ${Math.round(f.height*.25)}px "PingFang SC",sans-serif`,p.textAlign="center",p.fillText(t,f.width/2,f.height*.64,f.width-90),p.fillStyle="#65766d",p.font=`${Math.round(f.height*.13)}px "PingFang SC",sans-serif`,p.fillText(n,f.width/2,f.height*.88,f.width-90);let c=new bt(f);c.colorSpace=ft;let m=new Pe(new Lt(i,o,.012),ce.plastic);a.add(m);let A=new Pe(new jt(i-.012,o-.012),new rt({map:c,roughness:.73,metalness:0}));return A.position.z=.007,a.add(A),a}function Sh(r,{name:e,x:t,z:n,w:i,d:o}){let a=i+.24+.14,f=o+.12*2+.07*2,p=new Te;p.name="\u9EC4\u8272\u5B9A\u4F4D\u6846_"+e,p.position.set(t,.004,n),p.userData={lineWidth_m:.07,\u684C\u53F0:e,\u684C\u53F0\u5C3A\u5BF8\u7C73:[i,o],\u5185\u51C0\u7559\u7A7A\u7C73:.12},r.add(p);let h=new rt({color:"#edc329",roughness:.56,metalness:0});h.name="\u9EC4\u8272\u5730\u576A\u6CB9\u6F06";for(let q of[-f/2+.07/2,f/2-.07/2]){let c=new Pe(new Lt(a,.002,.07),h);c.position.z=q,p.add(c)}for(let q of[-a/2+.07/2,a/2-.07/2]){let c=new Pe(new Lt(.07,.002,f-.14),h);c.position.x=q,p.add(c)}return p}function v4(r){let e=r*374761393+668265263|0;return e=(e^e>>>13)*1274126177,((e^e>>>16)>>>0)/4294967295}function i6(r,e,t,n,i,o=0){let u=document.createElement("canvas");u.width=u.height=512;let a=u.getContext("2d"),f=a.createImageData(512,512);for(let q=0;q<512*512;q++){let c=250+(v4(q)-.5)*n;f.data[q*4]=f.data[q*4+1]=f.data[q*4+2]=c,f.data[q*4+3]=255}a.putImageData(f,0,0);let p=new bt(u);return p.wrapS=p.wrapT=$t,p.repeat.set(...i),p.colorSpace=ft,new xt({name:r,color:e,map:p,roughness:t,metalness:0,clearcoat:o,clearcoatRoughness:.32,envMapIntensity:.65})}var cr={wall:i6("\u5E73\u6ED1\u6696\u767D\u4E73\u80F6\u6F06","#efeee8",.88,2,[4,1.3]),floor:i6("\u5E73\u6ED1\u4E2D\u7070\u6D82\u88C5\u5730\u576A","#52595d",.36,3,[4.4,3.9],.12),ceiling:i6("\u6696\u767D\u7EC6\u7EB9\u540A\u9876\u677F","#e9e9e3",.91,5,[1,1])},Mh={wall:cr.wall.clone(),floor:cr.floor.clone()};async function Ch(r){let e=new Qr,t=Math.min(8,r.capabilities.getMaxAnisotropy());for(let[n,i,o,s,u,a]of[["wall","\u5899\u9762","#eeede6",[3,1],.012,.88],["floor","\u5730\u576A","#686e70",[3.6,3.2],.035,.53]]){let[f,p,h]=await Promise.all(["\u989C\u8272","\u6CD5\u7EBF","\u7C97\u7CD9\u5EA6"].map(y=>is(e,os[i+"_"+y]))),q=document.createElement("canvas");q.width=q.height=512;let c=q.getContext("2d");c.drawImage(f.image,0,0,512,512);let m=c.getImageData(0,0,512,512);for(let y=0;y<m.data.length;y+=4){let g=.2126*m.data[y]+.7152*m.data[y+1]+.0722*m.data[y+2],K=242+(g-128)*(n==="wall"?.065:.12);m.data[y]=m.data[y+1]=m.data[y+2]=K}c.putImageData(m,0,0);let A=new bt(q);A.colorSpace=ft,A.name=i+"\u6444\u5F71\u4F4E\u5BF9\u6BD4\u6821\u8272";for(let y of[A,p,h])y.wrapS=y.wrapT=$t,y.repeat.set(...s),y.anisotropy=t;p.name=i+"\u6444\u5F71\u5FAE\u6CD5\u7EBF",h.name=i+"\u6444\u5F71\u7C97\u7CD9\u5EA6",cr[n]=new xt({name:n==="wall"?"\u6696\u767D\u4E73\u80F6\u6F06_\u6444\u5F71\u5FAE\u8868\u9762":"\u7070\u8272\u6D82\u88C5\u5730\u576A_\u6444\u5F71\u5FAE\u8868\u9762",color:o,map:A,normalMap:p,normalScale:new se(u,u),roughnessMap:h,roughness:a,metalness:0,clearcoat:n==="floor"?.1:0,clearcoatRoughness:.48,envMapIntensity:.65}),f.dispose()}}function wh(r,e,t,n,i){let o=a=>{let f=document.createElement("canvas");f.width=f.height=512;let p=f.getContext("2d");p.fillStyle="white",p.fillRect(0,0,512,512),a(p);let h=new bt(f);return h.channel=1,h},s=a=>{a.geometry=a.geometry.clone(),a.geometry.setAttribute("uv1",a.geometry.attributes.uv.clone())};for(let a of[r,e])a.traverse(f=>{if(!f.isMesh||f.material!==cr.wall)return;let p=f.geometry.parameters.height,h=f.position.y-p/2,q=o(m=>{let A=Math.max(0,.18-h)*512/p;if(A>0){let y=m.createLinearGradient(0,512-Math.min(110,A),0,512);y.addColorStop(0,"white"),y.addColorStop(1,"#bdc0bc"),m.fillStyle=y,m.fillRect(0,512-Math.min(110,A),512,Math.min(110,A))}}),c=f.material.clone();c.aoMap=q,c.aoMapIntensity=.55,f.material=c,s(f)});let u=r.children.find(a=>a.isMesh&&a.material===cr.floor);u&&(u.material.aoMap=o(a=>{let f=512/(t+.3),p=512/(n+.3),h=(q,c)=>[(q+(t+.3)/2)*f,(c+(n+.3)/2)*p];for(let[q,c,m,A]of[[2.5,-2.65,1.16,.59],[3.68,.22,.54,1.36],[3.92,2.8,.36,.94],[1.7,3.57,.66,.31],[.35,3.57,.66,.31],[1.83,-1.65,.23,.23]]){let[y,g]=h(q,c);a.save(),a.translate(y,g),a.scale(m*f,A*p);let K=a.createRadialGradient(0,0,.05,0,0,1.15);K.addColorStop(0,"rgba(0,0,0,.16)"),K.addColorStop(.65,"rgba(0,0,0,.08)"),K.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=K,a.fillRect(-1.15,-1.15,2.3,2.3),a.restore()}for(let q of[0,512]){let c=a.createLinearGradient(q,0,q===0?16:496,0);c.addColorStop(0,"rgba(0,0,0,.18)"),c.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=c,a.fillRect(q===0?0:496,0,16,512);let m=a.createLinearGradient(0,q,0,q===0?16:496);m.addColorStop(0,"rgba(0,0,0,.18)"),m.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=m,a.fillRect(0,q===0?0:496,512,16)}}),u.material.aoMapIntensity=.65,s(u))}var O4=new rt({name:"\u767D\u8272\u540A\u9876T\u578B\u9F99\u9AA8",color:"#d8d9d3",metalness:.12,roughness:.65});function o6(r,e,t,n,i=0){let o=Math.ceil(e/.6),s=Math.ceil(t/.6),u=e/o,a=t/s,f=new bo(new Lt(u-.019,.015,a-.019),cr.ceiling,o*s),p=new pt;f.name="\u7EC6\u7EB9\u540A\u9876\u677F\u4E0E\u771F\u5B9E\u677F\u7F1D";let h=0;for(let c=0;c<o;c++)for(let m=0;m<s;m++)p.makeTranslation(i-e/2+(c+.5)*u,n+.0075,-t/2+(m+.5)*a),f.setMatrixAt(h++,p);f.receiveShadow=!0,r.add(f);let q=(c,m,A,y,g,K)=>{let j=new Pe(new Lt(c,m,A),O4);j.position.set(y,g,K),j.receiveShadow=!0,r.add(j)};for(let c=0;c<=o;c++)q(.019,.012,t,i-e/2+c*u,n-.002,0);for(let c=0;c<=s;c++)q(e,.012,.019,i,n-.002,-t/2+c*a)}function Gh(r,e,t){let n=new Te;n.name="\u897F\u4FA7\u76F8\u90BB\u4F1A\u8BAE\u5BA4_\u89C6\u9891\u80CC\u666F\u793A\u610F",n.userData={\u4F9D\u636E:"\u7528\u6237\u89C6\u989119.8\u81F321\u79D2",\u5C3A\u5BF8:"\u672A\u5B9E\u6D4B\uFF0C\u4EC5\u7528\u4F5C\u73BB\u7483\u5916\u4FA7\u666F\u6DF1\u793A\u610F",\u4E0D\u8BA1\u5165\u6253\u5370\u623F\u51C0\u5C3A\u5BF8:!0};let i=6.2,o=r-i/2,s=Mh.wall,u=(I,P,z,b,O,v,L)=>{let G=new Pe(new Lt(I,P,z),L);return G.position.set(b,O,v),G.castShadow=!0,G.receiveShadow=!0,n.add(G),G},a=new rt({color:"#394047",roughness:.72}),f=new rt({color:"#b8bec0",metalness:.85,roughness:.29}),p=new rt({color:"#d8d9d2",roughness:.52}),h=new rt({color:"#6f303b",roughness:.86}),q=new rt({color:"#353e43",roughness:.86});u(i,.12,e,o,-.06,0,Mh.floor),u(.12,t,e,o-i/2,t/2,0,s),u(i,t,.12,o,t/2,e/2,s),u(.025,.14,e,o-i/2+.075,.07,0,a),u(i,.14,.025,o,.07,e/2-.075,a);let c=1.13,m=.28,A=2.17,y=-e/2;u(i,m,.12,o,m/2,y,s),u(i,t-A,.12,o,(t+A)/2,y,s);let g=new Nn({color:"#ccd4cd"}),K=o-i/2;for(let I of[o-2,o,o+2]){let P=I-c/2,z=I+c/2;u(P-K,A-m,.12,(P+K)/2,(A+m)/2,y,s),K=z,u(c,A-m,.012,I,(A+m)/2,y,g);for(let b of[P,z])u(.045,A-m,.08,b,(A+m)/2,y+.02,p);for(let b of[m,1.03,1.54,A])u(c,.04,.08,I,b,y+.025,p);u(c+.3,.14,.06,I,2.36,y+.03,new rt({color:"#28536a",roughness:.8}));for(let b=0;b<15;b++)u(.05,.62,.14,I-.7+b*.1,.43,y+.25,p)}u(o+i/2-K,A-m,.12,(o+i/2+K)/2,(A+m)/2,y,s),o6(n,i,e,t,o);for(let I of[o-1.5,o+1.5])for(let P of[-2.45,0,2.45]){u(.56,.04,.56,I,t-.026,P,f),u(.5,.01,.5,I,t-.052,P,a);for(let z=0;z<3;z++)u(.43,.014,.06,I,t-.065,P+(z-1)*.135,p)}function j(I,P,z,b){let O=new Te;O.name="\u4F1A\u8BAE\u5BA4\u6D45\u8272\u62FC\u63A5\u957F\u684C",n.add(O),O.position.set(I,0,P);let v=(L,G,D,k,C,J,R)=>{let W=new Pe(new Lt(L,G,D),R);W.position.set(k,C,J),W.castShadow=W.receiveShadow=!0,O.add(W)};v(z,.035,b,0,.745,0,p),v(z-.06,.085,.035,0,.685,-b/2+.055,a);for(let L of[-z/2+.09,z/2-.09])for(let G of[-b/2+.09,b/2-.09])v(.033,.73,.033,L,.365,G,f)}function H(I,P,z,b){let O=new Te;O.name=b===h?"\u4F1A\u8BAE\u5BA4\u7EA2\u8272\u91D1\u5C5E\u67B6\u6905":"\u4F1A\u8BAE\u5BA4\u6DF1\u8272\u91D1\u5C5E\u67B6\u6905",O.position.set(I,0,P),O.rotation.y=z,n.add(O);let v=(D,k,C,J,R)=>{let W=new Pe(new pn(D,k,C,3,.013),b);return W.position.set(0,J,R),W.castShadow=W.receiveShadow=!0,O.add(W),W};v(.43,.052,.42,.446,0);let L=v(.425,.29,.052,.7,.19);L.rotation.x=.1;let G=(D,k,C=.012)=>{let J=new M(...k).sub(new M(...D)),R=new Pe(new Bt(C,C,J.length(),12),f);R.position.copy(new M(...D).add(new M(...k)).multiplyScalar(.5)),R.quaternion.setFromUnitVectors(new M(0,1,0),J.normalize()),R.castShadow=!0,O.add(R)};for(let D of[-.19,.19])G([D,.012,-.17],[D,.426,-.17]),G([D,.012,.17],[D,.846,.218]),G([D,.24,-.17],[D,.24,.182]);G([-.19,.42,-.17],[.19,.42,-.17])}for(let I of[-2.7,-.9,.9])j(o-i/2+.77,I,1.12,1.72),I>-2&&H(o-i/2+1.63,I,Math.PI/2,h);for(let I of[o-1,o+.55,o+2.1])j(I,-2.65,1.5,.72),H(I,-1.96,0,q);j(o-.35,1.97,2.8,.76);for(let I of[o-1.5,o-.6,o+.3])H(I,2.7,0,h);return n.visible=!1,n}var ai=.3,Jn={id:"N01",wall:"\u5317\u5899",x:1.6,z:-3.905,height:ai,datum:"\u8DDD\u897F\u58996.035\u7C73",use:"\u529E\u516CRJ45\u7F51\u7EDC\u9884\u7559"},fi=[{id:"P01",use:"H2S\u8BBE\u5907\u4E0E\u9644\u4EF6",wall:"\u5317\u5899",x:3.82,z:-3.905,height:ai,count:4,datum:"\u8DDD\u897F\u5899 8.255 \u7C73"},{id:"P02",use:"\u529E\u516C\u7535\u8111\u4E0E\u5C0F\u7535\u5668",wall:"\u5317\u5899",x:1.33,z:-3.905,height:ai,count:4,datum:"\u8DDD\u897F\u5899 5.765 \u7C73"},{id:"P03",use:"A2L 01\u4E0E\u9644\u4EF6",wall:"\u4E1C\u5899",x:4.435,z:-.44,height:ai,count:4,datum:"\u8DDD\u5317\u5899 3.465 \u7C73"},{id:"P04",use:"A2L 02\u4E0E\u9644\u4EF6",wall:"\u4E1C\u5899",x:4.435,z:.88,height:ai,count:4,datum:"\u8DDD\u5317\u5899 4.785 \u7C73"},{id:"P05",use:"\u5E72\u71E5\u673A / \u5907\u7528\u7535\u5668",wall:"\u4E1C\u5899",x:4.435,z:-1.6,height:ai,count:4,datum:"\u8DDD\u5317\u5899 2.305 \u7C73"},{id:"P06",use:"\u8017\u6750\u533A / \u5907\u7528\u7535\u5668",wall:"\u5357\u5899",x:-1.05,z:3.905,height:ai,count:4,datum:"\u8DDD\u897F\u5899 3.385 \u7C73"}],f6=[{id:"T01",table:"H2\u529E\u516C\u684C",x:1.6,z:-3.05},{id:"T02",table:"H2\u8BBE\u5907\u684C",x:3.35,z:-3.05},{id:"T03",table:"A2L 01\u684C",x:4.05,z:-.73},{id:"T04",table:"A2L 02\u684C",x:4.05,z:.59}].map(r=>({...r,diameter:.06,height:.8})),s6=new xt({name:"\u7535\u6E90\u9884\u7559\u9762\u677F_\u54D1\u5149\u767D",color:"#f0f0eb",roughness:.4,clearcoat:.13}),u6=new rt({color:"#33383a",roughness:.65});function a6(r,e=768,t=256){let n=document.createElement("canvas");n.width=e,n.height=t,r(n.getContext("2d"),e,t);let i=new bt(n);return i.colorSpace=ft,i.anisotropy=8,i}var Yh=a6((r,e,t)=>{r.fillStyle="#efefe9",r.fillRect(0,0,e,t),r.fillStyle="#272d31",r.fillRect(e*.31,t*.25,e*.045,t*.18),r.fillRect(e*.64,t*.25,e*.045,t*.18),r.fillRect(e*.48,t*.49,e*.045,t*.16),r.save(),r.translate(e*.34,t*.72),r.rotate(-.45),r.fillRect(-e*.027,-t*.08,e*.055,t*.16),r.restore(),r.save(),r.translate(e*.67,t*.72),r.rotate(.45),r.fillRect(-e*.027,-t*.08,e*.055,t*.16),r.restore()},256,256);function Dh(r){let e=new Te;e.name="\u7535\u6E90\u9884\u7559_\u516D\u7EC424\u5899\u63D2\u4F4D",e.userData={\u5899\u63D2\u7EC4:fi,\u7F51\u7EDC\u9884\u7559:Jn,\u684C\u5B54:f6,\u529E\u516C\u63D2\u7EBF\u677F\u4F4D:6,\u5B9A\u4F4D\u57FA\u51C6:"\u6CBF\u5899\u8DDD\u79BB\u5747\u4E3A\u63D2\u5EA7\u7EC4\u4E2D\u5FC3\uFF0C\u8DDD\u57300.30\u7C73\uFF1B\u9762\u677F\u4E2D\u5FC3\u8DDD92\u6BEB\u7C73\u4EC5\u4E3A\u793A\u610F\uFF0C\u6309\u9009\u5B9A\u9762\u677F\u590D\u6838",\u65BD\u5DE5\u8BF4\u660E:"\u6253\u5370\u673A\u5404\u63A5\u5BF9\u5E94\u5899\u63D2\uFF1B\u63D2\u7EBF\u677F\u7528\u4E8E\u7535\u8111\u53CA\u5C0F\u7535\u5668\u3002\u56DE\u8DEF\u3001\u63D2\u5EA7\u89C4\u683C\u3001\u7EBF\u5F84\u548C\u4FDD\u62A4\u88C5\u7F6E\u7531\u7535\u5DE5\u6309\u94ED\u724C\u6838\u5B9A\u3002"},r.add(e);for(let h of fi){let q=new Te;q.name=h.id+"_"+h.use,q.userData=h,q.position.set(h.x,h.height,h.z),q.rotation.y=h.wall==="\u5317\u5899"?0:h.wall==="\u4E1C\u5899"?-Math.PI/2:Math.PI,e.add(q);for(let A=0;A<h.count;A++){let y=new Pe(new pn(.086,.086,.014,3,.005),s6);y.position.set((A-1.5)*.092,0,.007),y.name=h.id+"_\u63D2\u5EA7\u4F4D"+(A+1),y.castShadow=y.receiveShadow=!0,q.add(y);let g=new Pe(new jt(.074,.074),new rt({map:Yh,roughness:.48}));g.position.set(y.position.x,0,.0145),q.add(g)}let c=a6((A,y,g)=>{A.fillStyle="#edf1ee",A.fillRect(0,0,y,g),A.strokeStyle="#93a69c",A.lineWidth=5,A.strokeRect(2,2,y-4,g-4),A.textAlign="center",A.fillStyle="#2e5144",A.font='bold 49px "PingFang SC",sans-serif',A.fillText(h.id+" \xB7 "+h.use,y/2,91),A.font='37px "PingFang SC",sans-serif',A.fillText("4 \u4F4D\u9884\u7559 \xB7 \u4E2D\u5FC3\u8DDD\u5730 0.30 m",y/2,165)}),m=new Pe(new jt(.49,.15),new rt({map:c,roughness:.72}));m.position.set(0,.175,.004),m.name=h.id+"_\u7535\u6E90\u5B9A\u4F4D\u5C0F\u6807\u724C",q.add(m)}let t=new Te;t.name="N01_\u529E\u516C\u5899\u9762RJ45\u7F51\u53E3",t.position.set(Jn.x,Jn.height,Jn.z),t.userData=Jn,e.add(t);let n=new Pe(new pn(.086,.086,.014,3,.005),s6);n.position.z=.007,n.castShadow=n.receiveShadow=!0,t.add(n);let i=new Tt;i.moveTo(-.011,-.009),i.lineTo(.011,-.009),i.lineTo(.011,.009),i.lineTo(-.011,.009),i.closePath();let o=new sn;o.moveTo(-.0085,-.0065),o.lineTo(-.0085,.0065),o.lineTo(.0085,.0065),o.lineTo(.0085,-.0065),o.closePath(),i.holes.push(o);let s=new Pe(new Et(i,{depth:.005,bevelEnabled:!1}),u6);s.position.z=.014,s.name="RJ45\u771F\u5B9E\u5F00\u53E3\u63D2\u5EA7\u6846",t.add(s);let u=new Pe(new jt(.017,.013),u6);u.position.z=.0145,t.add(u);let a=new rt({color:"#bdad63",metalness:.8,roughness:.35});for(let h=0;h<8;h++){let q=new Pe(new Lt(.001,.002,.002),a);q.position.set((h-3.5)*.0015,.004,.016),t.add(q)}let f=a6((h,q,c)=>{h.fillStyle="#efefe9",h.fillRect(0,0,q,c),h.fillStyle="#2e5144",h.textAlign="center",h.font="bold 100px sans-serif",h.fillText("N01 \xB7 RJ45",q/2,c*.64)}),p=new Pe(new jt(.068,.021),new rt({map:f,roughness:.65}));return p.position.set(0,-.027,.0145),t.add(p),e}function kh(r,e,t,n,i){let o=new Tt;o.moveTo(-e/2,-t/2),o.lineTo(e/2,-t/2),o.lineTo(e/2,t/2),o.lineTo(-e/2,t/2),o.closePath();for(let p of n){let h=new sn;h.absarc(p.x,-p.z,.03,0,Math.PI*2,!0),o.holes.push(h)}let s=new Et(o,{depth:.06,bevelEnabled:!1,curveSegments:32}),u=s.attributes.uv,a=s.attributes.position;for(let p=0;p<u.count;p++)u.setXY(p,(a.getX(p)+e/2)/e,(a.getY(p)+t/2)/t);s.rotateX(-Math.PI/2);let f=new Pe(s,i);f.position.y=.74,f.name="\u5B9E\u5B54\u6728\u684C\u9762_\u5B54\u5F8460\u6BEB\u7C73",f.userData={\u5B54\u5F84\u7C73:.06,\u5B54\u4F4D\u5C40\u90E8\u7C73:n},f.castShadow=f.receiveShadow=!0,r.add(f);for(let p of n){let h=new Pe(new Ur(.032,.003,8,40),u6);h.rotation.x=Math.PI/2,h.position.set(p.x,.8005,p.z),h.name=p.id+"_\u8D70\u7EBF\u5B54\u73AF\u5957",r.add(h);let q=new Pe(new Bt(.03,.03,.055,32,1,!0),new rt({color:"#33383a",roughness:.65,side:Ot}));q.position.set(p.x,.769,p.z),q.name=p.id+"_\u8D2F\u7A7F\u5B54\u5185\u58C1",r.add(q)}return f}function Jh(r){let e=new Te;e.name="\u529E\u516C\u684C6\u4F4D\u63D2\u7EBF\u677F_\u7535\u8111\u5C0F\u7535\u5668",e.position.set(-.62,.8,-.35),e.userData={\u63D2\u5EA7\u4F4D\u6570:6,\u7528\u9014:"\u7B14\u8BB0\u672C\u4E0E\u529E\u516C\u5C0F\u7535\u5668\uFF0C\u4E0D\u5171\u63A5\u4E09\u53F0\u6253\u5370\u673A"},r.add(e);let t=new Pe(new pn(.405,.027,.065,3,.007),s6);t.position.y=.0135,t.castShadow=t.receiveShadow=!0,e.add(t);for(let n=0;n<6;n++){let i=new Pe(new jt(.048,.048),new rt({map:Yh,roughness:.45}));i.rotation.x=-Math.PI/2,i.position.set(-.154+n*.0616,.0275,0),e.add(i)}return e}function Xh(r){let e=new Te;e.name="\u529E\u516C\u5B8C\u6574\u8FDE\u63A5_\u7F51\u53E3\u5145\u7535\u6709\u7EBF\u9F20\u6807",e.userData={\u8FDE\u63A5:"N01\u5899\u9762RJ45\u2192\u84DD\u8272\u7F51\u7EBF\u2192USB-C\u7F51\u7EDC\u96C6\u7EBF\u5668\u2192\u7B14\u8BB0\u672C\uFF1BP02\u5899\u63D2\u2192\u529E\u516C\u63D2\u6392\u2192\u5145\u7535\u5668\u2192\u7B14\u8BB0\u672C\uFF1BUSB\u6709\u7EBF\u9F20\u6807\u2192\u96C6\u7EBF\u5668",\u684C\u5B54:"\u7F51\u7EBF\u4E0E\u63D2\u6392\u7535\u6E90\u7EBF\u5206\u522B\u4ECET01\u5B54\u4E24\u4FA7\u901A\u8FC7",\u5382\u5BB6\u578B\u53F7:"\u672A\u6307\u5B9A\uFF0C\u89C4\u5212\u793A\u610F"},r.add(e);let t=(C,J,R)=>new M(C-r.position.x,J-r.position.y,R-r.position.z),n=(C,J,R,W,ae,ge,le,Le,we=.003)=>{let We=new Pe(new pn(C,J,R,3,Math.min(we,C*.2,J*.2,R*.2)),le);return We.position.copy(t(W,ae,ge)),We.name=Le,We.castShadow=We.receiveShadow=!0,e.add(We),We},i=(C,J,R,W,ae,ge,le)=>{let Le=new Tt;Le.moveTo(-W/2,-ae/2),Le.lineTo(W/2,-ae/2),Le.lineTo(W/2,ae/2),Le.lineTo(-W/2,ae/2),Le.closePath();let we=new sn;we.moveTo(-W*.34,-ae*.3),we.lineTo(-W*.34,ae*.3),we.lineTo(W*.34,ae*.3),we.lineTo(W*.34,-ae*.3),we.closePath(),Le.holes.push(we);let We=new Pe(new Et(Le,{depth:.002,bevelEnabled:!1}),ce.aluminium);return We.position.copy(t(C,J,R)),We.rotation.y=ge,We.name=le,e.add(We),We},o=ce.charcoal.clone();o.color.set("#303639"),o.roughness=.43;let s=ce.aluminium.clone();s.color.set("#a9afb2"),s.roughness=.31;let u=new xt({name:"\u767D\u8272\u5145\u7535\u5668\u6CE8\u5851\u5916\u58F3",color:"#edece7",roughness:.39,clearcoat:.1}),a=[];function f(C,J,R,W){let ae=new Yn(J.map(le=>t(...le)),!1,"centripetal"),ge=new Pe(new Bn(ae,90,R,10,!1),new rt({name:C+"\u62A4\u5957",color:W,roughness:.73}));return ge.name=C,ge.castShadow=ge.receiveShadow=!0,e.add(ge),a.push({name:C,points:J,r:R}),ge}n(.085,.018,.043,1.47,.809,-2.6,s,"USB-C\u7F51\u7EDC\u96C6\u7EBF\u5668"),i(1.47,.809,-2.622,.02,.014,Math.PI,"\u96C6\u7EBF\u5668RJ45\u63D2\u53E3"),i(1.455,.809,-2.578,.016,.009,0,"\u96C6\u7EBF\u5668USB-A\u9F20\u6807\u63D2\u53E3"),i(1.66,.808,-2.53,.012,.006,-Math.PI/2,"\u7B14\u8BB0\u672CUSB-C\u7F51\u5361\u63A5\u53E3"),i(1.66,.808,-2.495,.012,.006,-Math.PI/2,"\u7B14\u8BB0\u672CUSB-C\u5145\u7535\u63A5\u53E3"),n(.0118,.0078,.018,1.47,.809,-2.629,o,"\u7F51\u7EBFRJ45\u63D2\u5934_\u96C6\u7EBF\u5668"),n(.014,.01,.022,1.6,Jn.height,-3.878,o,"\u7F51\u7EBFRJ45\u63D2\u5934_\u5899\u9762N01"),n(.01,.012,.014,1.6,Jn.height,-3.864,new rt({color:"#416e99",roughness:.7}),"N01\u58C1\u7F51\u7EBF\u62A4\u5957"),n(.012,.008,.018,1.47,.809,-2.643,new rt({color:"#416e99",roughness:.7}),"\u84DD\u8272\u7F51\u7EBF\u62A4\u5957"),f("N01\u7F51\u7EBF_\u7A7FT01\u684C\u5B54",[[1.47,.809,-2.651],[1.455,.805,-2.78],[1.51,.805,-2.94],[1.61,.811,-3.05],[1.61,.69,-3.05],[1.61,.4,-3.2],[1.6,.25,-3.55],[1.6,.24,-3.862],[1.6,Jn.height,-3.86]],.0025,"#416e99"),n(.023,.01,.012,1.516,.809,-2.596,o,"\u7F51\u5361USB-C\u77ED\u7EBF\u51FA\u7EBF\u62A4\u5957"),n(.01,.008,.009,1.652,.808,-2.53,o,"USB-C\u7F51\u5361\u63D2\u5934"),n(.007,.003,.007,1.658,.808,-2.53,s,"USB-C\u7F51\u5361\u91D1\u5C5E\u7AEF\u5934"),f("\u7F51\u5361USB-C\u77ED\u7EBF",[[1.523,.809,-2.596],[1.57,.805,-2.565],[1.627,.805,-2.543],[1.647,.808,-2.53]],.0018,"#333b40");let p=fi.find(C=>C.id==="P02"),h=p.x+.138;n(.043,.04,.03,h,p.height-.012,-3.876,o,"\u529E\u516C\u63D2\u6392\u5899\u63D2\u63D2\u5934_P02"),n(.011,.019,.012,h,p.height-.032,-3.857,o,"\u63D2\u6392\u5899\u63D2\u5411\u4E0B\u51FA\u7EBF\u62A4\u5957"),f("\u529E\u516C\u63D2\u6392\u7535\u6E90\u7EBF_\u7A7FT01\u684C\u5B54",[[1.6775,.813,-3],[1.63,.811,-3.015],[1.59,.811,-3.05],[1.59,.69,-3.05],[1.59,.43,-3.2],[1.52,.25,-3.48],[h,.238,-3.857],[h,p.height-.029,-3.857]],.003,"#363d40"),n(.056,.043,.055,1.8492,.849,-3,u,"\u7B14\u8BB0\u672CUSB-C\u5145\u7535\u5668"),n(.009,.008,.015,1.8492,.849,-2.966,u,"\u5145\u7535\u5668USB-C\u51FA\u7EBF\u7AEF"),n(.01,.008,.009,1.652,.808,-2.495,u,"\u7B14\u8BB0\u672C\u5145\u7535USB-C\u63D2\u5934"),n(.007,.003,.007,1.658,.808,-2.495,s,"\u5145\u7535USB-C\u91D1\u5C5E\u7AEF\u5934"),f("\u7B14\u8BB0\u672CUSB-C\u5145\u7535\u7EBF",[[1.8492,.849,-2.96],[1.81,.811,-2.85],[1.62,.805,-2.71],[1.595,.805,-2.585],[1.621,.805,-2.525],[1.647,.808,-2.495]],.0018,"#d5d6ce");let q=new Tt,c=.3,m=.25,A=.014;q.moveTo(-c/2+A,-m/2),q.lineTo(c/2-A,-m/2),q.quadraticCurveTo(c/2,-m/2,c/2,-m/2+A),q.lineTo(c/2,m/2-A),q.quadraticCurveTo(c/2,m/2,c/2-A,m/2),q.lineTo(-c/2+A,m/2),q.quadraticCurveTo(-c/2,m/2,-c/2,m/2-A),q.lineTo(-c/2,-m/2+A),q.quadraticCurveTo(-c/2,-m/2,-c/2+A,-m/2);let y=document.createElement("canvas");y.width=y.height=512;let g=y.getContext("2d");g.fillStyle="#41464a",g.fillRect(0,0,512,512),g.strokeStyle="#383e42",g.lineWidth=.7;for(let C=0;C<512;C+=3)g.beginPath(),g.moveTo(C,0),g.lineTo(C,512),g.stroke(),g.beginPath(),g.moveTo(0,C),g.lineTo(512,C),g.stroke();let K=new bt(y);K.colorSpace=ft,K.anisotropy=8;let j=new Et(q,{depth:.003,bevelEnabled:!1,curveSegments:20}),H=j.attributes.uv,I=j.attributes.position;for(let C=0;C<H.count;C++)H.setXY(C,(I.getX(C)+c/2)/c,(I.getY(C)+m/2)/m);j.rotateX(-Math.PI/2);let P=new Pe(j,new xt({name:"\u9F20\u6807\u57AB\u6DF1\u7070\u7EC7\u7269",map:K,roughness:.94}));P.name="\u6DF1\u7070\u7EC7\u7269\u9F20\u6807\u57AB_300x250\u6BEB\u7C73",P.position.copy(t(2.25,.8,-2.43)),P.castShadow=P.receiveShadow=!0,e.add(P);let z=new Te;z.name="USB\u6709\u7EBF\u529E\u516C\u9F20\u6807",z.position.copy(t(2.25,.803,-2.43)),e.add(z);let b=new Tt;b.absellipse(0,0,.032,.055,0,Math.PI*2,!1);let O=new Et(b,{depth:.002,bevelEnabled:!1,curveSegments:32});O.rotateX(-Math.PI/2);let v=new Pe(O,ce.rubber);v.name="\u9F20\u6807\u692D\u5706\u5E95\u58F3",z.add(v);let L=new Pe(new To(1,32,20,0,Math.PI*2,0,Math.PI/2),o);L.scale.set(.032,.03,.055),L.position.y=.002,L.name="\u9F20\u6807\u66F2\u9762\u5916\u58F3",L.castShadow=L.receiveShadow=!0,z.add(L);let G=new Pe(new Bt(.006,.006,.01,20),ce.rubber);G.rotation.z=Math.PI/2,G.position.set(0,.028,-.027),G.name="\u9F20\u6807\u6EDA\u8F6E",z.add(G);let D=[[-.043,.021],[-.034,.026],[-.014,.031]],k=new Pe(new Bn(new Yn(D.map(([C,J])=>new M(0,J,C))),20,65e-5,6,!1),ce.rubber);return z.add(k),n(.014,.009,.022,1.455,.809,-2.5635,o,"\u9F20\u6807USB-A\u63D2\u5934"),n(.0104,.004,.013,1.455,.809,-2.578,s,"\u9F20\u6807USB-A\u91D1\u5C5E\u7AEF"),n(.009,.008,.012,2.25,.813,-2.484,o,"\u9F20\u6807\u51FA\u7EBF\u80F6\u5957"),f("\u6709\u7EBF\u9F20\u6807USB\u8FDE\u63A5\u7EBF",[[2.25,.814,-2.482],[2.19,.805,-2.58],[2.08,.805,-2.84],[1.97,.805,-2.92],[1.72,.805,-2.94],[1.51,.805,-2.85],[1.44,.805,-2.7],[1.445,.805,-2.61],[1.455,.809,-2.553]],.0015,"#30383b"),e.userData.\u8FDE\u63A5\u8DEF\u5F84\u7C73=a,e.userData.\u9F20\u6807\u57AB\u7C73={x:2.25,z:-2.43,w:.3,d:.25,\u539A\u5EA6:.003},e}var Th='<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1260" viewBox="0 0 1600 1260"><rect width="1600" height="1260" fill="#fafbf8"/><g font-family="PingFang SC,Microsoft YaHei,sans-serif" fill="#243b35"><text x="70" y="65" font-size="34">\u5609\u65B0 \xB7 3D\u6253\u5370\u623F\u95F4\u7535\u6E90\u9884\u7559\u5B9A\u4F4D\u56FE</text><text x="70" y="102" font-size="20">2026-10-08 \xB7 \u5355\u4F4D\uFF1A\u7C73 \xB7 \u623F\u95F4 8.87 \xD7 7.81 \xD7 2.64 \xB7 \u9884\u7559\u5B9A\u4F4D\u89C4\u5212\uFF0C\u73B0\u573A\u590D\u6838\u540E\u65BD\u5DE5</text><rect x="90" y="160" width="833.78" height="734.14" fill="#eef0ec" stroke="#6c7671" stroke-width="6"/><text x="90" y="140" font-size="21">\u5317\u5899 / \u7A97\u6237\u9762 \xB7 \u4E1C\u897F 8.87 m</text><text x="90" y="936" font-size="21">\u5357\u5899 \xB7 \u95E8\u5728\u897F\u5357\u89D2</text><path d="M90 160V894" stroke="#82c1c9" stroke-width="8"/><text x="30" y="545" font-size="21">\u897F</text><text x="945" y="545" font-size="21">\u4E1C</text><path d="M203.74 160.0h108.1" stroke="#9db9c3" stroke-width="10"/><path d="M452.8399999999999 160.0h108.1" stroke="#9db9c3" stroke-width="10"/><path d="M701.9399999999999 160.0h108.1" stroke="#9db9c3" stroke-width="10"/><path d="M97.51999999999992 894.14h95.88" stroke="#171d1a" stroke-width="10"/><text x="100.51999999999992" y="882.14" font-size="17">\u9ED1\u8272\u95E8</text><rect x="638.4899999999999" y="228.62" width="206.8" height="98.7" rx="3" fill="#e9e6dd" stroke="#b6a17a" stroke-width="2"/><text x="646.4899999999999" y="288.62" font-size="17">H2S\u6253\u5370 / \u529E\u516C</text><rect x="808.16" y="425.54999999999995" width="89.3" height="244.4" rx="3" fill="#e9e6dd" stroke="#b6a17a" stroke-width="2"/><text x="816.16" y="453.54999999999995" font-size="17">\u53CC\u673A\u53F0</text><rect x="847.17" y="705.67" width="56.4" height="169.20000000000002" rx="3" fill="#e9e6dd" stroke="#b6a17a" stroke-width="2"/><text x="855.17" y="733.67" font-size="17">\u6210\u54C1</text><rect x="610.29" y="839.15" width="112.8" height="47.0" rx="3" fill="#e9e6dd" stroke="#b6a17a" stroke-width="2"/><text x="618.29" y="867.15" font-size="17">\u5E38\u7528</text><rect x="483.39" y="839.15" width="112.8" height="47.0" rx="3" fill="#e9e6dd" stroke="#b6a17a" stroke-width="2"/><text x="491.39" y="867.15" font-size="17">\u5206\u7C7B</text><circle cx="657.29" cy="240.37" r="6" fill="#e9f6f5" stroke="#138d90" stroke-width="3"/><text x="645.29" y="262.37" font-size="15" fill="#138d90">T01</text><circle cx="821.79" cy="240.37" r="6" fill="#e9f6f5" stroke="#138d90" stroke-width="3"/><text x="809.79" y="262.37" font-size="15" fill="#138d90">T02</text><circle cx="887.5899999999999" cy="458.45" r="6" fill="#e9f6f5" stroke="#138d90" stroke-width="3"/><text x="875.5899999999999" y="480.45" font-size="15" fill="#138d90">T03</text><circle cx="887.5899999999999" cy="582.53" r="6" fill="#e9f6f5" stroke="#138d90" stroke-width="3"/><text x="875.5899999999999" y="604.53" font-size="15" fill="#138d90">T04</text><circle cx="865.9699999999999" cy="160.0" r="13" fill="#f4c961" stroke="#8a6830" stroke-width="2"/><text x="845.9699999999999" y="137.0" font-size="21">P01</text><circle cx="631.91" cy="160.0" r="13" fill="#f4c961" stroke="#8a6830" stroke-width="2"/><text x="611.91" y="137.0" font-size="21">P02</text><circle cx="923.78" cy="485.71" r="13" fill="#f4c961" stroke="#8a6830" stroke-width="2"/><text x="941.78" y="492.71" font-size="21">P03</text><circle cx="923.78" cy="609.79" r="13" fill="#f4c961" stroke="#8a6830" stroke-width="2"/><text x="941.78" y="616.79" font-size="21">P04</text><circle cx="923.78" cy="376.66999999999996" r="13" fill="#f4c961" stroke="#8a6830" stroke-width="2"/><text x="941.78" y="383.66999999999996" font-size="21">P05</text><circle cx="408.19" cy="894.14" r="13" fill="#f4c961" stroke="#8a6830" stroke-width="2"/><text x="390.19" y="929.14" font-size="21">P06</text><circle cx="678.91" cy="371.97" r="26" fill="#626a6b" stroke="#887047"/><text x="661.91" y="410.97" font-size="17">\u529E\u516C\u6905</text><text x="1040" y="163" font-size="26">\u5899\u63D2\u7EC4\u4E2D\u5FC3\u5B9A\u4F4D / \u6BCF\u7EC4 4 \u4F4D</text><text x="1040" y="217" font-size="22">P01  H2S / \u9644\u4EF6</text><text x="1040" y="249" font-size="20">\u5317\u5899 \xB7 \u8DDD\u897F\u5899 8.255 m</text><text x="1040" y="277" font-size="18" fill="#577367">\u8DDD\u5730 0.30 m \xB7 \u4F4D\u4E8E\u684C\u9762\u4E0B\u65B9</text><text x="1040" y="317" font-size="22">P02  \u529E\u516C\u7535\u8111</text><text x="1040" y="349" font-size="20">\u5317\u5899 \xB7 \u8DDD\u897F\u5899 5.765 m</text><text x="1040" y="377" font-size="18" fill="#577367">\u8DDD\u5730 0.30 m \xB7 \u4F4D\u4E8E\u684C\u9762\u4E0B\u65B9</text><text x="1040" y="417" font-size="22">P03  A2L 01</text><text x="1040" y="449" font-size="20">\u4E1C\u5899 \xB7 \u8DDD\u5317\u5899 3.465 m</text><text x="1040" y="477" font-size="18" fill="#577367">\u8DDD\u5730 0.30 m \xB7 \u4F4D\u4E8E\u684C\u9762\u4E0B\u65B9</text><text x="1040" y="517" font-size="22">P04  A2L 02</text><text x="1040" y="549" font-size="20">\u4E1C\u5899 \xB7 \u8DDD\u5317\u5899 4.785 m</text><text x="1040" y="577" font-size="18" fill="#577367">\u8DDD\u5730 0.30 m \xB7 \u4F4D\u4E8E\u684C\u9762\u4E0B\u65B9</text><text x="1040" y="617" font-size="22">P05  \u5E72\u71E5 / \u5907\u7528</text><text x="1040" y="649" font-size="20">\u4E1C\u5899 \xB7 \u8DDD\u5317\u5899 2.305 m</text><text x="1040" y="677" font-size="18" fill="#577367">\u8DDD\u5730 0.30 m \xB7 \u4F4D\u4E8E\u684C\u9762\u4E0B\u65B9</text><text x="1040" y="717" font-size="22">P06  \u8017\u6750 / \u5907\u7528</text><text x="1040" y="749" font-size="20">\u5357\u5899 \xB7 \u8DDD\u897F\u5899 3.385 m</text><text x="1040" y="777" font-size="18" fill="#577367">\u8DDD\u5730 0.30 m \xB7 \u4F4D\u4E8E\u684C\u9762\u4E0B\u65B9</text><circle cx="657.29" cy="160.0" r="7" fill="#5686a3"/><text x="669.29" y="191.0" font-size="18" fill="#386784">N01</text><text x="1040" y="920" font-size="20">N01 \u7F51\u7EDC\uFF1A\u5317\u5899\uFF0C\u8DDD\u897F\u5899 6.035 m</text><text x="1040" y="950" font-size="18">\u4E2D\u5FC3\u8DDD\u5730 0.30 m \xB7 USB-C\u96C6\u7EBF\u5668\u8FDE\u63A5</text><text x="1040" y="850" font-size="22">\u5899\u63D2\u4F4D\u5171 24\uFF1B\u529E\u516C\u63D2\u6392\u53E6 6 \u4F4D</text><text x="1040" y="882" font-size="20">\u6253\u5370\u673A\u5404\u63A5\u5BF9\u5E94\u5899\u63D2</text><text x="70" y="995" font-size="24">\u684C\u9762\u8D2F\u7A7F\u5B54\uFF1AT01\u2014T04\uFF0C\u5B54\u5F84 \xD860 mm\uFF0C\u684C\u9762\u9AD8\u5EA6 0.80 m</text><text x="70" y="1036" font-size="22">T01  \u8DDD\u897F\u5899 6.035 m\uFF1B\u8DDD\u5317\u5899 0.855 m</text><text x="810" y="1036" font-size="22">T02  \u8DDD\u897F\u5899 7.785 m\uFF1B\u8DDD\u5317\u5899 0.855 m</text><text x="70" y="1075" font-size="22">T03  \u8DDD\u897F\u5899 8.485 m\uFF1B\u8DDD\u5317\u5899 3.175 m</text><text x="810" y="1075" font-size="22">T04  \u8DDD\u897F\u5899 8.485 m\uFF1B\u8DDD\u5317\u5899 4.495 m</text><text x="70" y="1150" font-size="22">\u56FE\u4E2D\u5706\u70B9\u8868\u793A\u6574\u7EC4\u63D2\u5EA7\u4E2D\u5FC3\uFF1B\u9762\u677F\u4E2D\u5FC3\u8DDD 92 mm \u4E3A\u6A21\u578B\u793A\u610F\uFF0C\u6309\u8D2D\u4E70\u89C4\u683C\u590D\u6838\u3002</text><text x="70" y="1190" font-size="21">\u56DE\u8DEF\u3001\u63D2\u5EA7\u89C4\u683C\u3001\u7EBF\u5F84\u53CA\u4FDD\u62A4\u88C5\u7F6E\u7531\u73B0\u573A\u7535\u5DE5\u6309\u8BBE\u5907\u94ED\u724C\u6838\u5B9A\uFF1B\u95E8\u7A97\u53CA\u5BB6\u5177\u5C40\u90E8\u5C3A\u5BF8\u6309\u5B9E\u7269\u786E\u8BA4\u3002</text></g></svg>';var p6=new Map;function zt(r,e,t,n,i,o,s,u,a=.006,f=""){let p=[e,t,n,a].join(",");p6.has(p)||p6.set(p,new pn(e,t,n,3,Math.min(a,e*.22,t*.22,n*.22)));let h=new Pe(p6.get(p),u);return h.name=f,h.position.set(i,o,s),h.castShadow=h.receiveShadow=!0,r.add(h),h}function hn(r,e,t,n,i,o,s,u="y"){let a=new Pe(new Bt(e,e,t,24),s);return a.position.set(n,i,o),u==="x"&&(a.rotation.z=Math.PI/2),u==="z"&&(a.rotation.x=Math.PI/2),a.castShadow=a.receiveShadow=!0,r.add(a),a}function as(r,e=1024,t=512){let n=document.createElement("canvas");n.width=e,n.height=t,r(n.getContext("2d"),e,t);let i=new bt(n);return i.colorSpace=ft,i.anisotropy=8,i}function Zh(r,e,t,n,i){let o=new Te;o.name="\u897F\u5357\u89D2\u9ED1\u8272\u9632\u76D7\u95E8",o.position.set(e,0,t),o.userData={\u95E8\u6D1E\u5C3A\u5BF8\u7C73:[n,i],\u6750\u8D28:"\u9ED1\u8272\u55B7\u6D82\u94A2\u677F",\u7ED3\u6784:"\u5B9E\u5FC3\u95E8\u6247\u3001\u5305\u8FB9\u95E8\u6846\u3001\u538B\u578B\u7EBF\u3001\u732B\u773C\u3001\u9501\u5177\u53CA\u4E09\u94F0\u94FE\uFF0C\u6B3E\u5F0F\u4E3A\u793A\u610F"},r.add(o);let s=ce.charcoal.clone();s.name="\u9ED1\u8272\u9632\u76D7\u95E8\u55B7\u6D82\u94A2\u6750",s.color.set("#121619"),s.metalness=.28,s.roughness=.38,s.normalScale.set(.025,.025);let u=s.clone();u.color.set("#0d1114"),u.roughness=.45;for(let p of[-n/2,n/2])zt(o,.062,i,.11,p,i/2,-.01,u,.008,"\u9632\u76D7\u95E8\u5305\u8FB9\u6846");zt(o,n+.04,.062,.11,0,i,-.01,u,.008,"\u9632\u76D7\u95E8\u9876\u90E8\u6846"),zt(o,n-.04,.02,.11,0,.01,-.01,u,.003,"\u91D1\u5C5E\u95E8\u69DB"),zt(o,n-.07,i-.055,.075,0,i/2,.012,s,.009,"\u5B9E\u5FC3\u538B\u578B\u94A2\u95E8\u6247");for(let[p,h]of[[1.35,.95],[.46,.48]]){for(let c of[-.57/2,.57/2])zt(o,.009,h,.005,c,p,-.026,s,.001);for(let c of[p-h/2,p+h/2])zt(o,.57,.009,.005,0,c,-.026,s,.001)}let a=ce.aluminium.clone();a.color.set("#9da2a1"),a.roughness=.31,zt(o,.047,.245,.016,-.345,1.07,-.042,a,.007,"\u9632\u76D7\u95E8\u9501\u9762\u677F"),hn(o,.012,.032,-.345,1.095,-.059,a,"z"),hn(o,.008,.115,-.291,1.095,-.078,a,"x"),hn(o,.012,.016,-.345,1,-.057,ce.charcoal,"z");let f=new Pe(new Ur(.009,.0025,8,24),a);f.position.set(0,1.56,-.031),o.add(f),hn(o,.006,.009,0,1.56,-.028,ce.charcoal,"z");for(let p of[.38,1.05,1.77])hn(o,.014,.09,n/2-.03,p,-.025,u);return o}function Wh(r,e,t){let n=new Te;n.name="\u539F\u6709\u6696\u6C14\u7247",n.position.set(e,0,t),n.userData={\u4F9D\u636E:"\u7528\u6237\u89C6\u9891\u5317\u7A97\u4E0B\u7684\u67F1\u5F0F\u6696\u6C14",\u7EC6\u5316:"\u5706\u89D2\u94A2\u5236\u7ACB\u67F1\u3001\u524D\u540E\u67F1\u5217\u3001\u8FDE\u63A5\u8054\u7BB1\u3001\u7BA1\u53E3\u4E0E\u58C1\u6302\u652F\u67B6",\u5BBD\u7C73:1.76},r.add(n);let i=new xt({name:"\u6696\u6C14\u7C73\u767D\u70E4\u6F06\u94A2\u6750",color:"#e6e3d8",metalness:.12,roughness:.3,clearcoat:.28,clearcoatRoughness:.32,envMapIntensity:.65}),o=ce.aluminium.clone();o.color.set("#a7a99e"),o.roughness=.45;for(let s=0;s<17;s++){let u=-.82+s*.102;for(let a of[-.038,.038])zt(n,.048,.607,.07,u,.43,a,i,.01,"\u6696\u6C14\u5706\u89D2\u7ACB\u67F1");for(let a of[.16,.7])zt(n,.035,.025,.077,u,a,0,i,.006,"\u67F1\u95F4\u8FDE\u63A5\u9888")}for(let s of[.12,.74])zt(n,1.76,.045,.16,0,s,0,i,.012,"\u6696\u6C14\u6A2A\u5411\u8054\u7BB1");for(let s of[-.63,.63])for(let u of[.23,.62])zt(n,.055,.045,.03,s,u,-.268,o,.005,"\u5899\u9762\u56FA\u5B9A\u5E95\u5EA7"),zt(n,.018,.04,.24,s,u,-.15,o,.004,"\u6696\u6C14\u58C1\u6302\u652F\u67B6");for(let s of[-.849,.849])hn(n,.018,.042,s,.118,-.091,o,"z"),hn(n,.012,.048,s,.092,-.1,o),hn(n,.021,.018,s,.126,-.118,i,"z");return n}function Nh(r){let e=new Te;e.name="\u82F9\u679C\u7B14\u8BB0\u672C\u7535\u8111_\u529E\u516C\u533A\u793A\u610F",e.position.set(-.67,.8,.2),e.userData={\u7528\u9014:"H2S\u684C\u5DE6\u4FA7\u529E\u516C",\u5916\u5F62:"\u94F6\u8272\u82F9\u679C\u7B14\u8BB0\u672C\uFF0C\u6253\u5F00\u5C4F\u5E55\u3001\u952E\u76D8\u3001\u89E6\u63A7\u677F\u548C\u54AC\u53E3\u82F9\u679C\u6807\u5FD7",\u5C3A\u5BF8\u7C73:[.34,.24],\u578B\u53F7:"\u672A\u6307\u5B9A\uFF0C\u89C4\u5212\u793A\u610F"},r.add(e);let t=ce.aluminium.clone();t.name="\u7B14\u8BB0\u672C\u94F6\u8272\u9633\u6781\u94DD",t.color.set("#b9bdc1"),t.roughness=.25,zt(e,.34,.014,.24,0,.007,0,t,.004,"\u7B14\u8BB0\u672C\u94DD\u5408\u91D1\u5E95\u5EA7");let n=as((h,q,c)=>{h.fillStyle="#9a9fa3",h.fillRect(0,0,q,c);for(let m=0;m<6;m++)for(let A=0;A<15;A++){let y=12+A*66,g=10+m*51;h.fillStyle="#22262a",h.beginPath(),h.roundRect(y,g,58,43,5),h.fill(),h.fillStyle="#bec3c5",h.font="14px sans-serif",h.fillText(m===5?"":String.fromCharCode(65+(m*15+A)%26),y+22,g+26)}h.fillStyle="#b9bec1",h.fillRect(232,264,538,43),h.fillStyle="#272b2e",h.beginPath(),h.roundRect(252,268,498,37,4),h.fill()},1024,320),i=new Pe(new jt(.288,.09),new rt({map:n,roughness:.48}));i.rotation.x=-Math.PI/2,i.position.set(0,.0143,-.045),e.add(i);let o=ce.aluminium.clone();o.color.set("#a1a6aa"),o.roughness=.38,zt(e,.146,.001,.07,0,.0147,.061,o,.001,"\u5927\u89E6\u63A7\u677F");for(let h of[-.157,.157])for(let q=0;q<20;q++)zt(e,.008,5e-4,.0012,h,.0143,-.097+q*.005,o,1e-4,"\u626C\u58F0\u5668\u7F51\u5B54");hn(e,.006,.28,0,.014,-.111,ce.charcoal,"x");let s=new Te;s.name="\u6253\u5F00\u7684\u7B14\u8BB0\u672C\u5C4F\u5E55",s.position.set(0,.017,-.111),s.rotation.x=-.2,e.add(s),zt(s,.34,.217,.008,0,.1085,0,t,.004,"\u94DD\u5408\u91D1\u5C4F\u5E55\u80CC\u677F"),zt(s,.324,.198,.002,0,.1085,.0045,ce.charcoal,.002,"\u9ED1\u8272\u7A84\u8FB9\u6846");let u=as((h,q,c)=>{let m=h.createLinearGradient(0,0,q,c);m.addColorStop(0,"#668daa"),m.addColorStop(.46,"#214573"),m.addColorStop(1,"#836b99"),h.fillStyle=m,h.fillRect(0,0,q,c),h.fillStyle="#d5deeb",h.fillRect(0,0,q,19),h.fillStyle="#284257",h.font="12px sans-serif",h.fillText("\u8BBF\u8FBE    \u6587\u4EF6    \u7F16\u8F91    \u663E\u793A",20,14),h.fillStyle="#eef0f3",h.beginPath(),h.roundRect(q*.19,c*.14,q*.61,c*.6,12),h.fill(),h.fillStyle="#dde2e6",h.fillRect(q*.19,c*.14,q*.61,32);for(let A=0;A<3;A++)h.fillStyle=["#d76b63","#dcc16c","#7eaf81"][A],h.beginPath(),h.arc(q*.21+A*15,c*.14+16,5,0,Math.PI*2),h.fill();h.fillStyle="#354955",h.font='27px "PingFang SC",sans-serif',h.fillText("\u5609\u65B0 \xB7 \u529E\u516C\u5DE5\u4F5C\u533A",q*.25,c*.35),h.font="19px sans-serif",h.fillStyle="#71818a",h.fillText("\u6253\u5370\u8BA1\u5212  /  \u6587\u4EF6\u6574\u7406",q*.25,c*.44),h.fillStyle="rgba(227,233,241,.65)",h.beginPath(),h.roundRect(q*.31,c*.87,q*.38,47,15),h.fill();for(let A=0;A<7;A++)h.fillStyle=["#6ca9c4","#789dce","#9b92bd","#bb8d7c","#96b889","#d0b374","#788fa6"][A],h.beginPath(),h.roundRect(q*.33+A*47,c*.885,32,32,7),h.fill()},1024,640),a=new Pe(new jt(.309,.184),new xt({name:"\u7B14\u8BB0\u672C\u4EAE\u5C4F\u73BB\u7483",map:u,emissiveMap:u,emissive:"#ffffff",emissiveIntensity:.24,roughness:.18,clearcoat:.7,clearcoatRoughness:.15}));a.position.set(0,.111,.0058),s.add(a),zt(s,.014,.007,.002,0,.2,.006,ce.charcoal,.001,"\u6444\u50CF\u5934\u5F00\u53E3");let f=as((h,q,c)=>{h.clearRect(0,0,q,c),h.fillStyle="#62696d",h.beginPath(),h.moveTo(127,74),h.bezierCurveTo(107,58,66,64,58,105),h.bezierCurveTo(46,139,77,192,94,194),h.bezierCurveTo(110,197,118,185,129,185),h.bezierCurveTo(143,185,150,197,165,193),h.bezierCurveTo(182,187,200,157,203,143),h.bezierCurveTo(174,133,174,100,201,89),h.bezierCurveTo(189,64,153,60,127,74),h.fill(),h.beginPath(),h.moveTo(127,61),h.bezierCurveTo(127,33,147,17,164,17),h.bezierCurveTo(165,42,147,59,127,61),h.fill()},256,256),p=new Pe(new jt(.03,.03),new rt({map:f,transparent:!0,roughness:.4}));return p.rotation.y=Math.PI,p.position.set(0,.119,-.0045),s.add(p),e}function Bh(r,e,t){let n=new Te;n.name="\u9ED1\u8272\u7F51\u80CC\u4E94\u8F6E\u529E\u516C\u6905",n.position.set(e,0,t),n.userData={\u5EA7\u9AD8\u7C73:.48,\u6B3E\u5F0F:"\u9ED1\u8272\u8F6F\u57AB\u5EA7\u9762\u3001\u7F51\u80CC\u3001\u6276\u624B\u4E0E\u4E94\u722A\u811A\u8F6E\uFF0C\u89C4\u5212\u793A\u610F"},r.add(n);let i=ce.charcoal.clone();i.color.set("#22282b"),i.roughness=.52;let o=as((m,A,y)=>{m.fillStyle="#41464a",m.fillRect(0,0,A,y),m.strokeStyle="#343a3d",m.lineWidth=1;for(let g=0;g<A;g+=4)m.beginPath(),m.moveTo(g,0),m.lineTo(g,y),m.stroke();m.strokeStyle="#4c5255";for(let g=0;g<y;g+=4)m.beginPath(),m.moveTo(0,g),m.lineTo(A,g),m.stroke()},512,512),s=new xt({name:"\u529E\u516C\u6905\u9ED1\u8272\u7EC7\u7269\u8F6F\u57AB",map:o,roughness:.88,metalness:0});zt(n,.48,.055,.46,0,.4525,0,s,.022,"\u529E\u516C\u6905\u8F6F\u57AB\u5EA7\u9762"),zt(n,.32,.025,.29,0,.419,0,i,.01,"\u5EA7\u6905\u5E95\u90E8\u6258\u76D8"),hn(n,.027,.315,0,.2575,0,ce.aluminium),hn(n,.04,.08,0,.127,0,i),hn(n,.061,.033,0,.1,0,i);let u=(m,A,y,g)=>{let K=new M(...A).sub(new M(...m)),j=new Pe(new Bt(y,y,K.length(),16),g);j.position.copy(new M(...m).add(new M(...A)).multiplyScalar(.5)),j.quaternion.setFromUnitVectors(new M(0,1,0),K.normalize()),j.castShadow=j.receiveShadow=!0,n.add(j)};for(let m=0;m<5;m++){let A=m*Math.PI*2/5,y=.29*Math.cos(A),g=.29*Math.sin(A);u([0,.105,0],[y,.064,g],.017,i);let K=new Te;K.name="\u529E\u516C\u6905\u4E07\u5411\u811A\u8F6E",K.position.set(y,0,g),K.rotation.y=-A,n.add(K),zt(K,.032,.022,.025,0,.054,0,i,.005,"\u811A\u8F6E\u53C9\u67B6"),hn(K,.007,.032,0,.061,0,ce.aluminium);for(let j of[-.016,.016])hn(K,.025,.018,j,.025,0,ce.rubber,"x")}for(let m of[-.26,.26])u([m,.42,.1],[m,.667,.065],.014,i),zt(n,.061,.034,.3,m,.684,-.045,i,.012,"\u529E\u516C\u6905\u6276\u624B\u8F6F\u57AB");let a=new Te;a.name="\u900F\u5149\u7EC7\u7F51\u6905\u80CC",a.position.set(0,.799,.245),a.rotation.x=.13,n.add(a);let f=(m,A,y)=>{let g=new Tt;return g.moveTo(-m/2+y,-A/2),g.lineTo(m/2-y,-A/2),g.quadraticCurveTo(m/2,-A/2,m/2,-A/2+y),g.lineTo(m/2,A/2-y),g.quadraticCurveTo(m/2,A/2,m/2-y,A/2),g.lineTo(-m/2+y,A/2),g.quadraticCurveTo(-m/2,A/2,-m/2,A/2-y),g.lineTo(-m/2,-A/2+y),g.quadraticCurveTo(-m/2,-A/2,-m/2+y,-A/2),g},p=f(.49,.56,.06);p.holes.push(f(.41,.47,.045));let h=new Pe(new Et(p,{depth:.026,bevelEnabled:!1,curveSegments:16}),i);h.name="\u771F\u5B9E\u5F00\u53E3\u6905\u80CC\u6846",h.castShadow=h.receiveShadow=!0,a.add(h);let q=as((m,A,y)=>{m.clearRect(0,0,A,y),m.fillStyle="#343b3e";for(let g=0;g<A;g+=5)m.fillRect(g,0,1.8,y);for(let g=0;g<y;g+=5)m.fillRect(0,g,A,1.8)},256,256);q.wrapS=q.wrapT=$t,q.repeat.set(3,4);let c=new Pe(new jt(.41,.47),new rt({name:"\u9ED1\u8272\u900F\u5149\u7F51\u5E03",map:q,alphaTest:.4,side:Ot,roughness:.92}));c.position.z=.013,c.name="\u529E\u516C\u6905\u7F51\u5E03",c.castShadow=c.receiveShadow=!0,a.add(c);for(let m of[-.16,.16])u([m,.422,.13],[m,.545,.217],.012,i);return n}async function j4(){document.querySelector("#power-drawing").href="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(Th);let n=document.querySelector("#viewport"),i=new br;i.background=new $e("#dedfdd");let o=new Te;o.name="3D\u6253\u5370\u623F\u95F4\u89C4\u5212_\u7C73",i.add(o);let s=new Te,u=new Te,a=new Te,f=new Te,p=new Te,h=new Te;s.name="\u89C6\u9891\u53C2\u7167\u5EFA\u7B51_\u95E8\u7A97\u4F4D\u7F6E\u4F30\u7B97",u.name="\u89C4\u5212\u8BBE\u5907\u4E0E\u8017\u6750",a.name="\u540A\u9876",f.name="\u5357\u4FA7\u95E8\u5899",p.name="\u897F\u4FA7\u73BB\u7483\u9694\u65AD",h.name="\u5C3A\u5BF8\u8F85\u52A9",o.add(s,u,a,f,p),i.add(h);let q=new ia({antialias:!0,preserveDrawingBuffer:!0});q.setPixelRatio(Math.min(devicePixelRatio,2)),q.shadowMap.enabled=!0,q.shadowMap.type=au,q.outputColorSpace=ft,q.toneMapping=yu,q.toneMappingExposure=1,n.prepend(q.domElement);let c=new Jt(43,1,.03,120),m=new ua(c,q.domElement);m.enableDamping=!0,m.dampingFactor=.09,m.minDistance=.55,m.maxDistance=48,m.maxPolarAngle=Math.PI*.48,i.add(new Fo("#f8f8f3",.15)),i.add(new Bo("#f4f6f8","#555956",.85));let A=new Wi("#fffaed",2.3);A.position.set(1,11,-7),A.castShadow=!0,A.shadow.mapSize.set(2048,2048),Object.assign(A.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:30}),A.shadow.bias=-4e-4,A.shadow.normalBias=.012,A.shadow.radius=3,i.add(A);let y=new Wi("#eff4fa",.6);y.position.set(6,5,7),i.add(y);let g={};function K(S,N=0,te=.6){let ne=`${S}_${N}_${te}`;return g[ne]??=new rt({color:S,metalness:N,roughness:te})}let[j,H]=await Promise.all([vh(q),zh(),lh(q),Ch(q)]);i.environment=j,i.environmentIntensity=.8;let I=bn("\u6CE8\u5851\u5851\u6599","#e8e9e4",.12,.58),P=cr.wall,z=ce.powderSteel,b=ce.charcoal,O=ce.rubber,v=ce.wood,L=cr.floor,G=ce.aluminium,D=new xt({color:"#d0e0d9",transparent:!0,opacity:.17,roughness:.06,metalness:0,transmission:.16,thickness:.004,ior:1.52,depthWrite:!1,side:Ot});D.name="\u900F\u660E\u5EFA\u7B51\u73BB\u7483";let k=new Map;function C(S,N,te,ne,Oe,ue,Ue,Ee,Ht=!0){let yt=`${N},${te},${ne}`;k.has(yt)||k.set(yt,new Lt(N,te,ne));let Ct=new Pe(k.get(yt),Ee);return Ct.position.set(Oe,ue,Ue),Ct.castShadow=Ht,Ct.receiveShadow=!0,S.add(Ct),Ct}function J(S,N,te,ne,Oe,ue,Ue,Ee="y",Ht=24){let yt=new Pe(new Bt(N,N,te,Ht),Ue);return yt.position.set(ne,Oe,ue),Ee==="z"&&(yt.rotation.x=Math.PI/2),Ee==="x"&&(yt.rotation.z=Math.PI/2),yt.castShadow=!0,S.add(yt),yt}function R(S,N,te="#6d91a1",ne=!1){let Oe=new Xt().setFromPoints(N.map(Ue=>new M(...Ue))),ue=new xo(Oe,ne?new Zo({color:te,dashSize:.13,gapSize:.09}):new Er({color:te}));return ne&&ue.computeLineDistances(),S.add(ue),ue}function W(S,N="#253c47",te="#eef6f8",ne=512,Oe=128){let ue=document.createElement("canvas");ue.width=ne,ue.height=Oe;let Ue=ue.getContext("2d");Ue.fillStyle=N,Ue.fillRect(0,0,ne,Oe),Ue.fillStyle=te,Ue.font=`500 ${Oe*.43}px "PingFang SC",sans-serif`,Ue.textAlign="center",Ue.textBaseline="middle",Ue.fillText(S,ne/2,Oe/2);let Ee=new bt(ue);return Ee.colorSpace=ft,Ee}function ae(S,N,te,ne,Oe,ue,Ue,Ee,Ht=0){let yt=new Pe(new jt(te,ne),new Nn({map:W(N,Ee),side:Ot}));return yt.position.set(Oe,ue,Ue),yt.rotation.y=Ht,S.add(yt),yt}function ge(S,N,te=.05,ne="#71828c"){let Oe=new Yn(N.map(Ue=>new M(...Ue))),ue=new Pe(new Bn(Oe,40,te,8,!1),K(ne,.35,.7));return S.add(ue),ue}C(s,8.87+.3,.16,7.81+.3,0,-.08,0,L);let le=new rs(new jt(8.87,7.81),{textureWidth:Math.min(innerWidth,1024),textureHeight:Math.min(innerHeight,1024),color:10067870,clipBias:.004});le.name="\u5730\u576A\u5B9E\u65F6\u67D4\u548C\u53CD\u5C04",le.rotation.x=-Math.PI/2,le.position.y=.001,le.material.transparent=!0,le.material.depthWrite=!1,le.material.fragmentShader=le.material.fragmentShader.replace("gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );","gl_FragColor = vec4( blendOverlay( base.rgb, color ), 0.095 );").replace("texture2DProj( tDiffuse, vUv )","texture2DProj( tDiffuse, vUv, 4.0 )"),le.getRenderTarget().texture.generateMipmaps=!0,le.getRenderTarget().texture.minFilter=An,i.add(le),C(s,8.87+.5,.12,7.81+.5,0,-.22,0,K("#f0f5f7")),C(s,.15,2.64,7.81,-8.87/2-.075,2.64/2,0,P),C(s,.025,.15,7.81,-8.87/2+.014,.075,0,b);let Le=[-2.65,0,2.65],we=1.15,We=.27,et=2.17;C(s,8.87,.27,.15,0,.135,-7.81/2-.075,P),C(s,8.87,2.64-et,.15,0,(2.64+et)/2,-7.81/2-.075,P);let Q=-8.87/2;for(let S of Le){let N=S-we/2,te=S+we/2;C(s,N-Q,et-We,.15,(N+Q)/2,(et+We)/2,-7.81/2-.075,P),Q=te,C(s,we,et-We,.025,S,(et+We)/2,-7.81/2,D,!1);for(let ne of[-we/2,we/2])C(s,.052,et-We,.09,S+ne,(et+We)/2,-7.81/2+.015,I);for(let ne of[We,1.03,1.54,et])C(s,we,.04,.09,S,ne,-7.81/2+.015,I);C(s,we+.17,.055,.17,S,We,-7.81/2+.06,I),C(s,we+.32,.16,.06,S,2.36,-7.81/2+.045,K("#235774"));for(let ne of[.44,.66,.88])C(s,we,.018,.02,S,ne,-7.81/2+.065,z);Wh(s,S,-7.81/2+.28)}C(s,8.87/2-Q,et-We,.15,(8.87/2+Q)/2,(et+We)/2,-7.81/2-.075,P);for(let S of[.07,.14])J(s,.016,8.87-.2,0,S,-7.81/2+.2,G,"x");for(let S of[-3.61,-3.39])J(s,.025,2.64-.1,-4.22,(2.64-.1)/2,S,G);let re=1.02,be=2.13,Ye=8.87/2-re/2-.08,Ge=Ye-re/2,ot=Ye+re/2;C(f,Ge+8.87/2,2.64,.15,(Ge-8.87/2)/2,2.64/2,7.81/2+.075,P),C(f,8.87/2-ot,2.64,.15,(ot+8.87/2)/2,2.64/2,7.81/2+.075,P),C(f,re,2.64-be,.15,Ye,(2.64+be)/2,7.81/2+.075,P),Zh(f,Ye,7.81/2,re,be);let gt=2.75,w=1.1;C(p,.04,.06,7.81,8.87/2,.03,0,G),C(p,.06,.06,7.81,8.87/2,2.56,0,G);let ie=[-7.81/2,-2.6,-1.25,.1,1.45,gt-w/2,gt+w/2,7.81/2];for(let S of ie)C(p,.07,2.56,.05,8.87/2,1.28,S,I);for(let S=0;S<ie.length-1;S++){let N=ie[S],te=ie[S+1];C(p,.018,2.45,te-N-.06,8.87/2,1.28,(N+te)/2,D,!1),C(p,.07,.05,te-N,8.87/2,1.17,(N+te)/2,I),C(p,.07,.05,te-N,8.87/2,2.21,(N+te)/2,I)}C(p,.12,.28,.024,8.87/2-.025,1.18,gt-.32,b),R(s,[[8.87/2,.008,-7.81/2],[8.87/2,.008,7.81/2]],"#d6e7ed");let $=new Te;$.name="\u539F\u6709\u7ACB\u5F0F\u7A7A\u8C03_\u4F4D\u7F6E\u4F30\u7B97",s.add($),$.position.set(3.94,0,-3.41),C($,.5,1.8,.34,0,.9,0,I),C($,.44,.035,.28,0,.04,0,G);for(let S=0;S<9;S++)C($,.37,.012,.014,0,1.47+S*.022,.178,z,!1);C($,.09,.2,.014,0,1.18,.181,O),C($,.05,.025,.016,0,1.2,.19,K("#468f9f")),o6(a,8.87,7.81,2.64);for(let S of[-2.2,.1,2.4])for(let N of[-2.45,0,2.45]){C(a,.56,.05,.56,S,2.64-.035,N,G),C(a,.51,.012,.51,S,2.64-.063,N,b);for(let te=0;te<3;te++)C(a,.42,.015,.065,S,2.64-.077,N+(te-1)*.135,I,!1)}C(a,8.87,.18,.3,0,2.46,-3.18,P),C(a,.3,.18,7.81,3.7,2.46,0,P);let _=[],V=[];function Ae(S,N,te,ne=!1){kh(S,N,te,ne?[{id:"T01",x:-.9,z:-.4},{id:"T02",x:.85,z:-.4}]:[{id:"T03",x:-.95,z:-.37},{id:"T04",x:.37,z:-.37}],v);for(let Oe of[-N/2+.08,N/2-.08])for(let ue of[-te/2+.08,te/2-.08])C(S,.055,.72,.055,Oe,.38,ue,z),C(S,.075,.026,.075,Oe,.013,ue,O);for(let Oe of[-te/2+.08,te/2-.08])C(S,ne&&Oe>0?.77:N-.12,.045,.04,ne&&Oe>0?-.635:0,.31,Oe,z)}function qe(S,N,te,ne,Oe,ue="z"){return fa(S,N,te,ne,Oe,ue)}function ve(S){return Kh(S)}function Qe(S,N){return Ih(S,N)}let Ze=new Te;Ze.name="H2S\u72EC\u7ACB\u5DE5\u4F4D",Ze.position.set(-2.5,0,-2.65),u.add(Ze),Ae(Ze,2.2,1.05,!0);let x=ve(Ze);x.position.x=-.53,_.push({obj:Ze,id:"h2s"}),V.push({x:-2.5,z:-2.65,w:2.2,d:1.05});let l=new Te;l.name="A2L\u53CC\u673A\u957F\u53F0",l.position.set(-3.68,0,.22),l.rotation.y=Math.PI/2,u.add(l),Ae(l,2.6,.95),Qe(l,-.66),Qe(l,.66),_.push({obj:l,id:"a2l"}),V.push({x:-3.68,z:.22,w:.95,d:2.6});let T=new Te;T.name="\u767D\u8272\u8017\u6750\u6599\u76D8\u6EDA\u8F6E\u67B6_\u4E24\u7EC4120\u5377\u793A\u610F",u.add(T);let F=[["PLA","PLA","PLA","PETG","PETG"].map(S=>[S]),[["PLA"],["PETG"],["PETG"],["TPU","ABS","ASA"],["PA","PC","PVA"]]],oe=0,U={};for(let S=0;S<2;S++){let N=new Te;N.name=`\u767D\u8272\u6599\u76D8\u67B6${S+1}_1200x500x2000\u6BEB\u7C73`,N.position.set(-1.7+S*1.35,0,3.57),T.add(N),bh(N,F[S]),oe+=N.userData.\u603B\u5BB9\u91CF;for(let[te,ne]of Object.entries(N.userData.\u5206\u7C7B\u5BB9\u91CF))U[te]=(U[te]??0)+ne;V.push({x:N.position.x,z:3.57,w:1.2,d:.5})}_.push({obj:T,id:"racks"}),V.push({x:3.94,z:-3.41,w:.5,d:.34,fixed:!0});for(let S of Le)V.push({x:S,z:-7.81/2+.28,w:1.8,d:.2,fixed:!0});function Se(S){S.traverse(N=>{if(N.position.x=-N.position.x,N.isLine){let te=N.geometry.getAttribute("position");for(let ne=0;ne<te.count;ne++)te.setX(ne,-te.getX(ne));te.needsUpdate=!0,N.geometry.computeBoundingSphere()}})}Se(s),Se(a),Se(f),Se(p),Ze.position.x=-Ze.position.x;for(let S of Ze.children)S.name.startsWith("T0")||(S.position.x=-S.position.x);l.position.x=-l.position.x,l.rotation.y=-l.rotation.y;for(let S of T.children)S.position.x=-S.position.x;for(let S of V)S.x=-S.x;Nh(Ze),Jh(Ze);let ye=Xh(Ze),ze=Dh(o),ke=Bh(u,1.83,-1.65);V.push({x:1.83,z:-1.65,w:.7,d:.7}),wh(s,f,8.87,7.81,2.64);let he=Gh(-8.87/2,7.81,2.64);i.add(he);let je=new Te;je.name="\u4E1C\u5357\u89D2\u6210\u54C1\u4E94\u5C42\u8D27\u67B6_1800x600x2000\u6BEB\u7C73",je.position.set(3.92,0,2.8),je.rotation.y=-Math.PI/2,u.add(je),Ph(je),_.push({obj:je,id:"finished"}),V.push({x:3.92,z:2.8,w:.6,d:1.8});let Ne=new Te;Ne.name="\u684C\u4F4D\u9EC4\u8272\u6CB9\u6F06\u5B9A\u4F4D\u7EBF_\u5BBD70\u6BEB\u7C73",o.add(Ne);let Je=[{name:"H2S\u6253\u5370\u4E0E\u529E\u516C\u5DE5\u4F5C\u53F0",x:2.5,z:-2.65,w:2.2,d:1.05},{name:"A2L\u53CC\u673A\u5DE5\u4F5C\u53F0",x:3.68,z:.22,w:.95,d:2.6}],de=[{name:"\u4E1C\u5357\u89D2\u6210\u54C1\u8D27\u67B6",x:3.92,z:2.8,w:.6,d:1.8}];for(let S of[...Je,...de])Sh(Ne,S);let Ve=new Te;Ve.name="\u5609\u65B0\u5899\u9762\u8D34\u88C5\u6807\u8BC6",o.add(Ve);function Y(S,N,te,ne,Oe,ue,Ue){let Ee=Lh(Ve,H,S,N,te,ne,Oe,ue);return Ee.userData.\u5BF9\u5E94\u7269\u54C1=Ue,Ee}let me=Y("H2S \u6FC0\u5149\u5168\u80FD\u533A","H2S \xB7 01",.55,.16,[3.03,2.535,-3.894],0,x.name);me.userData.mount="north";for(let[S,N]of[[1,-.44],[2,.88]])Y("A2L \xB7 "+String(S).padStart(2,"0"),"\u53CC\u673A\u6253\u5370\u533A",.48,.18,[4.424,1.86,N],-Math.PI/2,"A2L\u6253\u5370\u673A"+S);Y("\u6253\u5370\u6210\u54C1\u6682\u653E\u533A","\u4E94\u5C42\u5206\u7C7B\u5B58\u653E",.64,.2,[4.424,2.18,2.8],-Math.PI/2,je.name);let He=T.children.map((S,N)=>{let te=Y(["\u5E38\u7528\u8017\u6750\u67B6","\u5E38\u7528 / \u7279\u6B8A\u8017\u6750\u67B6"][N],N===0?"PLA / PETG":"\u5E38\u7528\u4F18\u5148 \xB7 \u7279\u6B8A\u5206\u7C7B",.55,.18,[S.position.x,2.15,3.894],Math.PI,S.name);return te.userData.mount="south",te});function Me(S,N,te,ne,Oe){let ue=new Pe(new jt(S,N),new Nn({color:Oe,transparent:!0,opacity:.13,depthWrite:!1,side:Ot}));ue.rotation.x=-Math.PI/2,ue.position.set(te,.009,ne),h.add(ue)}let pe=2.53,ee=-2.7,De=3.4;for(let S of[pe-.6,pe+.6])R(h,[[S,.02,ee],[S,.02,De]],"#d8e9e5",!0);let _e=[];function at(S,N,te="",ne="measure"){let Oe=document.createElement("div");Oe.className=`label ${te}`,Oe.textContent=S,document.querySelector("#labels").append(Oe),_e.push({el:Oe,text:S,pos:new M(-N[0],N[1],N[2]),kind:ne})}function ht(S,N,te,ne){R(h,[S,N],"#7192a4");let Oe=N[0]-S[0],ue=N[2]-S[2],Ue=Math.hypot(Oe,ue),Ee=-ue/Ue*.09,Ht=Oe/Ue*.09;for(let yt of[S,N])R(h,[[yt[0]-Ee,yt[1],yt[2]-Ht],[yt[0]+Ee,yt[1],yt[2]+Ht]],"#7192a4");at(te,ne??[(S[0]+N[0])/2,S[1]+.06,(S[2]+N[2])/2],"measure")}ht([-8.87/2,.015,4.69],[8.87/2,.015,4.69],"\u4E1C\u897F 8.87 \u7C73"),ht([4.85,.015,-7.81/2],[4.85,.015,7.81/2],"\u5357\u5317 7.81 \u7C73"),R(h,[[-4.6,0,-3.6],[-4.6,2.64,-3.6]],"#7192a4"),at("\u51C0\u9AD8 2.64 \u7C73",[-4.55,2.85,0],"measure"),ht([pe-.6,.02,1.4],[pe+.6,.02,1.4],"\u901A\u884C\u5E26 1.20 \u7C73",[pe,.07,1.4]);for(let S of fi)at(S.id+(S.id==="P02"?" \xB7 4\u4F4D + N01\u7F51\u53E3":" \xB7 4\u4F4D")+" \xB7 \u9AD8 "+S.height.toFixed(2)+"m",[-S.x,S.height,S.z],"power-label","power");at("\u5317 \xB7 \u7A97\u6237\u9762",[0,2.51,-7.81/2],"direction","direction"),at("\u897F \xB7 \u73BB\u7483\u5899",[8.87/2,.22,-.85],"direction","direction"),at("\u4E1C \xB7 \u5B9E\u5899",[-8.87/2,2.6,.8],"direction","direction"),at("\u5357 \xB7 \u95E8\u5728\u897F\u5357\u89D2",[-2.7,.08,7.81/2+.18],"direction","direction"),at("\u95E8 \xB7 \u897F\u5357\u89D2",[Ye,.1,3.72],"","architecture"),h.scale.x=-1;let st="overview",Mt=-Math.PI/2,qr=0,Xn=!1,Zt=new Set,zn={x:0,y:0};function Gr(){he.visible=st==="walk";let S=st==="walk"||st==="overview"&&Xn;a.visible=S,f.visible=S,p.visible=st!=="plan",p.traverse(N=>{N.isMesh&&N!==p&&(N.visible=S)}),Ve.visible=st!=="plan",He.forEach(N=>N.visible=S),document.querySelector("#structure").checked=S,document.querySelector("#structure").disabled=st!=="overview"}function Qn(S){st=S,document.body.classList.toggle("walk",st==="walk"),document.querySelectorAll("[data-view]").forEach(N=>N.classList.toggle("active",N.dataset.view===st)),m.enabled=st!=="walk",zn.x=zn.y=0,Zt.clear(),X(),st==="overview"&&(m.enableRotate=!0,c.up.set(0,1,0),c.position.set(-11.1,10,12.6),m.target.set(0,.38,0),c.lookAt(m.target),m.update()),st==="plan"&&(m.enableRotate=!1,c.up.set(0,0,-1),c.position.set(0,15,0),m.target.set(0,0,0),c.lookAt(m.target),m.update()),st==="walk"&&(c.up.set(0,1,0),c.position.set(-2.6,1.6,2.75),Mt=-Math.PI/2,qr=-.06,pi()),Gr(),Ce(),document.querySelector("#hint").textContent=st==="walk"?"\u7535\u8111 W/A/S/D \u6216\u65B9\u5411\u952E\u79FB\u52A8 \xB7 \u62D6\u52A8\u8F6C\u5934 \xB7 \u624B\u673A\u5DE6\u6447\u6746\u53F3\u6ED1\u52A8":st==="plan"?"\u6B63\u4E0A\u65B9\u67E5\u770B \xB7 \u53CC\u6307\u7F29\u653E / \u62D6\u52A8\u5E73\u79FB \xB7 \u5C3A\u5BF8\u5355\u4F4D\uFF1A\u7C73":"\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u70B9\u51FB\u8BBE\u5907\u67E5\u770B"}function pi(){c.rotation.order="YXZ",c.rotation.set(qr,Mt,0)}let hi={power:["\u7535\u6E90\u9884\u7559\u5B9A\u4F4D","\u516D\u7EC4\u517124\u4E2A\u5899\u63D2\u4F4D\uFF0C\u7EC4\u4E2D\u5FC3\u8DDD\u57300.30\u7C73\uFF1B\u529E\u516C\u684C\u53E6\u8BBE6\u4F4D\u63D2\u7EBF\u677F\uFF0C\u4E24\u5F20\u684C\u5B50\u51714\u4E2A\u76F4\u5F8460\u6BEB\u7C73\u8D2F\u7A7F\u8D70\u7EBF\u5B54\u3002\u4F4D\u7F6E\u8DDD\u79BB\u89C1\u4E0B\u65B9\u7535\u6E90\u5B9A\u4F4D\u8868\uFF1B\u9762\u677F\u3001\u56DE\u8DEF\u53CA\u7EBF\u5F84\u7531\u7535\u5DE5\u6309\u8BBE\u5907\u94ED\u724C\u6838\u5B9A\u3002",[-7,6,7],[-1.5,1,0]],h2s:["H2S / \u529E\u516C\u5DE5\u4F4D","2.20 \xD7 1.05 \u7C73\u52A0\u957F\u684C\uFF0C\u5DE6\u4FA7\u8BBE\u94F6\u8272\u82F9\u679C\u7B14\u8BB0\u672C\u548C\u5EA7\u9AD8 0.48 \u7C73\u7F51\u80CC\u529E\u516C\u6905\uFF0C\u524D\u6A2A\u6746\u907F\u5F00\u529E\u516C\u819D\u90E8\u7A7A\u95F4\u3002\u684C\u9762\u52A0\u7F51\u5361\u3001\u5145\u7535\u5668\u3001\u6709\u7EBF\u9F20\u6807\u4E0E\u7EC7\u7269\u9F20\u6807\u57AB\uFF0C\u7F51\u7EBF\u548C\u63D2\u6392\u7535\u6E90\u7EBF\u7A7FT01\u5B54\u8FDE\u63A5\u5317\u5899\u3002\u4F9D\u636E\u4F60\u63D0\u4F9B\u7684\u7EFF\u8272\u73BB\u7483\u6FC0\u5149\u7248\u7167\u7247\u7EC6\u5316\uFF1A\u5706\u89D2\u4FA7\u677F\u3001\u5DE6\u4E0A\u89E6\u5C4F\u3001\u95E8\u6846\u3001\u5185\u90E8\u5BFC\u8F68\u3001\u6253\u5370\u5E73\u53F0\u4E0E AMS \u62F1\u5F62\u900F\u660E\u7F69\u3002\u6309\u4F60\u7684\u8981\u6C42\u4E0D\u8BBE\u7F6E\u5916\u63A5\u6392\u98CE\u8BBE\u65BD\u3002",[-1.5,2,-.55],[-2.5,1.06,-2.65]],a2l:["\u53CC\u673A\u6253\u5370\u533A","\u4E24\u53F0 A2L \u673A\u8EAB\u5404 544 \xD7 529 \xD7 505 \u6BEB\u7C73\uFF0C\u6CBF\u4E1C\u4FA7\u5B9E\u5899\u7F6E\u4E8E\u957F\u5DE5\u4F5C\u53F0\u3002\u6309\u4F60\u53D1\u7684\u7167\u7247\u7EC6\u5316\u5F00\u653E\u6846\u67B6\u3001\u7EBF\u6027\u5BFC\u8F68\u3001\u4F20\u52A8\u76AE\u5E26\u3001\u6253\u5370\u5934\u3001\u5F27\u5F62\u7EBF\u675F\u3001\u70ED\u5E8A\u548C\u53F3\u524D\u89E6\u5C4F\uFF1B\u7167\u7247\u4E2D\u7684\u5355\u673A\u914D\u7F6E\u4E0D\u52A0\u5916\u7F6E\u6599\u76D8\u6216 AMS\u3002",[-2,1.65,.9],[-3.68,1.05,.22]],racks:["\u8017\u6750\u5B58\u50A8\u533A","\u4E24\u7EC4\u767D\u8272\u4E94\u5C42\u53CC\u5706\u6746\u6EDA\u8F6E\u6599\u76D8\u67B6\uFF0C\u6BCF\u7EC4\u89C4\u5212 1.20 \xD7 0.50 \xD7 2.00 \u7C73\uFF0C\u914D\u4E07\u5411\u811A\u8F6E\uFF0C\u793A\u610F\u5171 120 \u5377\u3002PLA\u3001PETG \u5404 48 \u5377\uFF0C\u5171\u5360\u516B\u6210\uFF1B\u7279\u6B8A\u8017\u6750 TPU\u3001ABS\u3001ASA\u3001PA\u3001PC\u3001PVA \u5404 4 \u5377\uFF0C\u5E76\u8BBE\u72EC\u7ACB\u5206\u7C7B\u6807\u7B7E\u3002\u5B9E\u9645\u5BB9\u91CF\u9700\u6309\u8D2D\u4E70\u5C3A\u5BF8\u590D\u6838\u3002",[0,2.2,1.2],[-1.025,1.15,3.57]],finished:["\u6210\u54C1\u6682\u653E\u533A","\u4E1C\u5357\u89D2 1.80 \xD7 0.60 \xD7 2.00 \u7C73\u4E94\u5C42\u8D27\u67B6\uFF0C\u6CBF\u4E1C\u5899\u6446\u653E\u3002\u6BCF\u5C42\u5206\u7C7B\u5B58\u653E\u6253\u5370\u5236\u54C1\uFF0C\u6BCF\u5C42\u914D\u5F00\u53E3\u5206\u7C7B\u76C6\uFF1B\u5E26\u5609\u65B0 Logo \u7684\u5C0F\u5899\u724C\u6B63\u5BF9\u8D27\u67B6\u3002\u5236\u54C1\u4E3A\u793A\u610F\u3002",[-1.25,2.3,2.1],[-3.92,1.3,2.8]]};function ci(S){let[N,te,ne,Oe]=hi[S],ue=[-ne[0],ne[1],ne[2]],Ue=[-Oe[0],Oe[1],Oe[2]];if(document.querySelector("#details h2").textContent=N,document.querySelector("#details p").textContent=te,st==="walk"){let Ee=S==="h2s"?[-1.2,1.6,-1.35]:S==="a2l"?[-1.7,1.6,.22]:S==="finished"?[-2.7,1.6,2.8]:[-.35,1.6,1.65];Ee[0]=-Ee[0],c.position.set(...Ee);let Ht=new M(...Ue).sub(c.position);Mt=Math.atan2(-Ht.x,-Ht.z),qr=Math.atan2(Ht.y,Math.hypot(Ht.x,Ht.z)),pi(),Gr()}else Qn("overview"),c.position.set(...ue),m.target.set(...Ue),["finished","racks","h2s","power"].includes(S)&&c.position.sub(m.target).multiplyScalar(Math.max(S==="finished"?1.1:1,(S==="finished"||S==="h2s"?1.05:1.4)/c.aspect)).add(m.target),c.lookAt(m.target),m.update(),S==="racks"&&(f.visible=!0,He.forEach(Ee=>Ee.visible=!0));document.body.classList.remove("panel")}document.querySelectorAll("[data-view]").forEach(S=>S.onclick=()=>Qn(S.dataset.view)),document.querySelectorAll("[data-zone]").forEach(S=>S.onclick=()=>ci(S.dataset.zone)),document.querySelector("#structure").onchange=S=>{Xn=S.target.checked,Gr()},document.querySelector("#power").onchange=S=>ze.visible=S.target.checked,document.querySelector("#dimensions").onchange=S=>h.visible=S.target.checked,document.querySelector("#furnishing").onchange=S=>{u.visible=S.target.checked,Ne.visible=S.target.checked},document.querySelector("#panel-toggle").onclick=()=>document.body.classList.toggle("panel");let ro=new Ro,fs=new se,gr=null,Tn=null,Ln=null;q.domElement.addEventListener("pointerdown",S=>{gr={x:S.clientX,y:S.clientY},st==="walk"&&Tn===null&&(Tn=S.pointerId,Ln=gr,q.domElement.setPointerCapture(S.pointerId))}),q.domElement.addEventListener("pointermove",S=>{st==="walk"&&S.pointerId===Tn&&Ln&&(Mt-=(S.clientX-Ln.x)*.004,qr=Fn.clamp(qr-(S.clientY-Ln.y)*.004,-1.1,1.1),Ln={x:S.clientX,y:S.clientY},pi())}),q.domElement.addEventListener("pointerup",S=>{if(S.pointerId===Tn&&(Tn=null,Ln=null),!gr||Math.hypot(S.clientX-gr.x,S.clientY-gr.y)>6||st==="walk")return;let N=q.domElement.getBoundingClientRect();if(fs.set((S.clientX-N.left)/N.width*2-1,-(S.clientY-N.top)/N.height*2+1),ro.setFromCamera(fs,c),u.visible){let te=ro.intersectObjects(_.map(ne=>ne.obj),!0)[0];if(te){let ne=te.object;for(;ne;){let Oe=_.find(ue=>ue.obj===ne);if(Oe){ci(Oe.id);break}ne=ne.parent}}}}),q.domElement.addEventListener("pointercancel",()=>{Tn=null,Ln=null,gr=null}),window.addEventListener("keydown",S=>{st==="walk"&&["w","a","s","d","arrowup","arrowleft","arrowdown","arrowright"].includes(S.key.toLowerCase())&&(S.preventDefault(),Zt.add(S.key.toLowerCase()))}),window.addEventListener("keyup",S=>Zt.delete(S.key.toLowerCase()));let mr=document.querySelector("#joystick"),ps=mr.firstElementChild,d=null;function X(){zn.x=zn.y=0,d=null,ps.style.transform="translate(0,0)"}function B(S){if(S.pointerId!==d)return;let N=mr.getBoundingClientRect(),te=S.clientX-N.left-N.width/2,ne=S.clientY-N.top-N.height/2,Oe=Math.hypot(te,ne),ue=30;Oe>ue&&(te=te/Oe*ue,ne=ne/Oe*ue),ps.style.transform=`translate(${te}px,${ne}px)`,zn.x=te/ue,zn.y=-ne/ue}mr.addEventListener("pointerdown",S=>{S.preventDefault(),d===null&&(d=S.pointerId,mr.setPointerCapture(S.pointerId),B(S))}),mr.addEventListener("pointermove",B);for(let S of["pointerup","pointercancel","lostpointercapture"])mr.addEventListener(S,N=>{N.pointerId===d&&X()});window.addEventListener("blur",()=>{Zt.clear(),X(),Tn=null,Ln=null}),document.addEventListener("visibilitychange",()=>{document.hidden&&(Zt.clear(),X(),Tn=null,Ln=null)});function E(S,N){return S<-8.87/2+.22||S>8.87/2-.22||N<-7.81/2+.22||N>7.81/2-.22?!0:V.some(ne=>(u.visible||ne.fixed)&&Math.abs(S-ne.x)<ne.w/2+.22&&Math.abs(N-ne.z)<ne.d/2+.22)}function Z(S){let N=zn.y+(Zt.has("w")||Zt.has("arrowup")?1:0)-(Zt.has("s")||Zt.has("arrowdown")?1:0),te=zn.x+(Zt.has("d")||Zt.has("arrowright")?1:0)-(Zt.has("a")||Zt.has("arrowleft")?1:0),ne=Math.hypot(N,te);ne>1&&(N/=ne,te/=ne);let Oe=(-Math.sin(Mt)*N+Math.cos(Mt)*te)*S*1.7,ue=(-Math.cos(Mt)*N-Math.sin(Mt)*te)*S*1.7;E(c.position.x+Oe,c.position.z)||(c.position.x+=Oe),E(c.position.x,c.position.z+ue)||(c.position.z+=ue)}let fe=new M;function Ie(){for(let S of _e){if(S.kind==="power"){let ne=n.clientWidth<600?S.text.split(" \xB7 ")[0]+(S.text.startsWith("P02")?" \xB7 \u7F51\u53E3+4\u4F4D":" \xB7 4\u4F4D"):S.text;S.el.textContent!==ne&&(S.el.textContent=ne)}let N=(S.kind==="power"?st==="plan"&&document.querySelector("#power").checked:st!=="walk")&&!((st==="plan"||n.clientWidth<600)&&S.el.textContent.startsWith("\u51C0\u9AD8"))&&(S.kind!=="direction"||!(st==="plan"&&n.clientWidth<600&&document.querySelector("#power").checked))&&(S.kind!=="measure"||document.querySelector("#dimensions").checked)&&(S.kind!=="furniture"||u.visible);fe.copy(S.pos).project(c);let te=N&&fe.z>-1&&fe.z<1&&Math.abs(fe.x)<.98&&Math.abs(fe.y)<.98;S.el.style.display=te?"block":"none",te&&(S.el.style.left=`${(fe.x*.5+.5)*n.clientWidth}px`,S.el.style.top=`${(-fe.y*.5+.5)*n.clientHeight}px`)}}function Ce(){let S=n.clientWidth,N=n.clientHeight;if(q.setSize(S,N),c.aspect=S/N,c.updateProjectionMatrix(),st==="overview"&&!document.querySelector("#details h2").textContent.includes("\u5DE5\u4F4D")&&m.target.length()<1){let te=19.3*Math.max(1,1/c.aspect);c.position.copy(new M(-11.1,10,12.6).normalize().multiplyScalar(te)),m.update()}if(st==="plan"){let te=Math.max(10.569999999999999/c.aspect,10.11)/2;c.position.set(0,te/Math.tan(Fn.degToRad(c.fov/2))+2.64+1,0),c.lookAt(m.target),m.update()}}new ResizeObserver(Ce).observe(n);let xe=performance.now();function Fe(S){requestAnimationFrame(Fe);let N=Math.min((S-xe)/1e3,.035);xe=S,st==="walk"?Z(N):m.update(),q.render(i,c),Ie()}Qn("overview"),requestAnimationFrame(Fe),document.querySelector("#loading").remove();function Re(S){let N=document.querySelector("#toast");N.textContent=S,N.style.display="block",clearTimeout(Re.timer),Re.timer=setTimeout(()=>N.style.display="none",3500)}async function Be(){let S=document.querySelector("#export");S.disabled=!0,S.textContent="\u6B63\u5728\u5BFC\u51FA\u2026";let N=ze.visible;ze.visible=!0;let te={roof:a.visible,front:f.visible,glass:p.visible,furniture:u.visible,paint:Ne.visible};a.visible=f.visible=p.visible=u.visible=Ne.visible=Ve.visible=!0,He.forEach(ne=>ne.visible=!0),p.traverse(ne=>{ne.isMesh&&(ne.visible=!0)}),o.userData={\u5355\u4F4D:"\u7C73",\u623F\u95F4\u51C0\u5C3A\u5BF8:[8.87,7.81,2.64],H2S\u529E\u516C\u684C\u7C73:[2.2,1.05,.8],\u7535\u6E90\u9884\u7559:ze.userData,\u529E\u516C\u5BB6\u5177:"\u82F9\u679C\u7B14\u8BB0\u672C\u793A\u610F\u4E0E\u9ED1\u8272\u7F51\u80CC\u4E94\u8F6E\u529E\u516C\u6905\uFF0C\u5EA7\u9AD80.48\u7C73",\u529E\u516C\u8FDE\u63A5:ye.userData,\u95E8:"\u5357\u5899\u897F\u5357\u89D2\u9ED1\u8272\u9632\u76D7\u95E8",\u65B9\u4F4D:"\u5317\u4E3A\u7A97\u6237\u3001\u897F\u4E3A\u73BB\u7483\u5899\u3001\u95E8\u5728\u5357\u5899\u897F\u5357\u89D2\uFF0C\u7528\u6237\u5DF2\u786E\u8BA4",\u56FA\u5B9A\u8BBE\u65BD:"\u4F4D\u7F6E\u53CA\u5C40\u90E8\u5C3A\u5BF8\u6309\u7528\u6237\u89C6\u9891\u4F30\u7B97",\u8BBE\u5907:"H2S\u6FC0\u5149\u7248\u4E00\u53F0\u542BAMS2Pro\uFF0CA2L\u5355\u673A\u4E24\u53F0\uFF1B\u6309\u7528\u6237\u5B9E\u7269\u56FE\u7247\u4E0E\u5B98\u65B9\u53C2\u6570\u7EC6\u5316\uFF0C\u975E\u5382\u5BB6CAD",\u6210\u54C1\u6682\u653E\u8D27\u67B6:"\u4E1C\u5357\u89D21.80\xD70.60\xD72.00\u7C73\u4E94\u5C42\u8D27\u67B6\uFF0C\u5236\u54C1\u5F62\u72B6\u4E3A\u793A\u610F",\u5899\u9762\u6807\u8BC6:"\u5609\u65B0\u771F\u5B9ELogo\u53CA\u5404\u5206\u533A\u5899\u8D34\u6807\u8BC6",\u684C\u4F4D\u5B9A\u4F4D\u7EBF\u5BBD\u7C73:.07,\u5916\u63A5\u6392\u98CE:"\u6309\u7528\u6237\u8981\u6C42\u672A\u8BBE\u7F6E",\u8D27\u67B6:"\u4E24\u7EC4\u767D\u8272\u4E94\u5C42\u6EDA\u8F6E\u6599\u76D8\u67B6\uFF0C\u5E38\u752896\u5377\u3001\u7279\u6B8A24\u5377\u793A\u610F",\u7528\u9014:"\u7A7A\u95F4\u89C4\u5212\u6A21\u578B\uFF0C\u95E8\u7A97\u7EC6\u5C3A\u5BF8\u4E0E\u5BB6\u5177\u627F\u91CD\u9700\u73B0\u573A\u590D\u6838"};try{let ne=await new ui().parseAsync(o,{binary:!0,onlyVisible:!0}),Oe=URL.createObjectURL(new Blob([ne],{type:"model/gltf-binary"})),ue=document.createElement("a");ue.href=Oe,ue.download="\u5C0F\u4F0D_3D\u6253\u5370\u623F\u95F4\u89C4\u5212.glb",ue.click(),setTimeout(()=>URL.revokeObjectURL(Oe),5e3),Re("\u6A21\u578B\u5DF2\u5BFC\u51FA\uFF0C\u5355\u4F4D\u4E3A\u7C73\uFF0C\u53EF\u5BFC\u5165 Blender\u3002")}catch(ne){Re("\u6A21\u578B\u5BFC\u51FA\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),console.error(ne)}finally{ze.visible=N,a.visible=te.roof,f.visible=te.front,p.visible=te.glass,u.visible=te.furniture,Ne.visible=te.paint,Gr(),S.disabled=!1,S.textContent="\u4E0B\u8F7D 3D \u6A21\u578B"}}document.querySelector("#export").onclick=Be,window.roomPlanner={scene:i,model:o,conference:he,camera:c,renderer:q,orbit:m,materialCanvases:Hh,setView:Qn,focus:ci,blocked:E,exportModel:Be,getState:()=>({mode:st,size:[8.87,7.81,2.64],tableFootprints:Je,storageFootprints:de,paintLineWidth:.07,wallSigns:Ve.children.map(S=>S.name),externalExhaust:!1,directions:{north:"\u7A97\u6237",west:"\u73BB\u7483\u5899",east:"\u5B9E\u5899",south:"\u95E8\u6240\u5728\u5899"},door:{x:-Ye,z:7.81/2,width:re,corner:"\u897F\u5357",glassGap:.08},spoolCount:oe,materialCapacity:U,office:{table:[2.2,1.05,.8],laptop:[1.83,.8,-2.45],chair:[1.83,0,-1.65],seatHeight:.48,accessories:ye.userData},power:{points:fi,network:Jn,holes:f6,wallPositions:24,stripPositions:6,visible:ze.visible},conferenceVisible:he.visible,rackCount:T.children.length,roof:a.visible,front:f.visible,glass:p.visible,furniture:u.visible,position:c.position.toArray(),colliders:V,drawCalls:q.info.render.calls})}}j4().catch(r=>{console.error(r);let e=document.querySelector("#loading");e&&(e.textContent="\u6A21\u578B\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u7F51\u9875\u3002")});})();
