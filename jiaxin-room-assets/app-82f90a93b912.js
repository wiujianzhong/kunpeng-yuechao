(()=>{/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Or={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},jr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Lh=0,Ta=1,xh=2;var Wa=1,_s=2,Yn=3,Vn=0,Wt=1,Ot=2,tr=0,Yr=1,ka=2,Na=3,Za=4,Ph=5,mr=100,zh=101,Ch=102,Sh=103,Mh=104,wh=200,Yh=201,Gh=202,Xh=203,As=204,Ls=205,Dh=206,Jh=207,Th=208,Wh=209,kh=210,Nh=211,Zh=212,Bh=213,Eh=214,$s=0,eu=1,tu=2,Gr=3,nu=4,ru=5,iu=6,ou=7,Ba=0,Fh=1,Rh=2,nr=0,Vh=1,Uh=2,Qh=3,su=4,_h=5,$h=6,e6=7;var Ea=300,Nr=301,Zr=302,wi=303,uu=304,Wo=306,gn=1e3,yn=1001,di=1002,Gt=1003,au=1004;var Br=1005;var It=1006,Yi=1007;var on=1008;var Pn=1009,Fa=1010,Ra=1011,Gi=1012,fu=1013,Ir=1014,kt=1015,sn=1016,hu=1017,pu=1018,Xi=1020,Va=35902,Ua=35899,Qa=1021,_a=1022,Ft=1023,Hi=1026,Di=1027,qu=1028,mu=1029,$a=1030,cu=1031;var yu=1033,ko=33776,No=33777,Zo=33778,Bo=33779,gu=35840,vu=35841,lu=35842,du=35843,Hu=36196,Ku=37492,bu=37496,Ou=37808,ju=37809,Iu=37810,Au=37811,Lu=37812,xu=37813,Pu=37814,zu=37815,Cu=37816,Su=37817,Mu=37818,wu=37819,Yu=37820,Gu=37821,Xu=36492,Du=36494,Ju=36495,Tu=36283,Wu=36284,ku=36285,Nu=36286;var Xr=2300,Ki=2301,Is=2302,La=2400,xa=2401,Pa=2402;var t6=3200,n6=3201;var ef=0,r6=1,Rt="",mt="srgb",Un="srgb-linear",ao="linear",qt="srgb";var Mr=7680;var za=519,i6=512,o6=513,s6=514,tf=515,u6=516,a6=517,f6=518,h6=519,Ca=35044;var nf="300 es",Ln=2e3,fo=2001;var Cn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let o=0,s=i.length;o<s;o++)i[o].call(this,e);e.target=null}}},wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qf=1234567,io=Math.PI/180,bi=180/Math.PI;function Er(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[r&255]+wt[r>>8&255]+wt[r>>16&255]+wt[r>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function $e(r,e,t){return Math.max(e,Math.min(t,r))}function rf(r,e){return(r%e+e)%e}function dp(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Hp(r,e,t){return r!==e?(t-r)/(e-r):0}function oo(r,e,t){return(1-t)*r+t*e}function Kp(r,e,t,n){return oo(r,e,1-Math.exp(-t*n))}function bp(r,e=1){return e-Math.abs(rf(r,e*2)-e)}function Op(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function jp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ip(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ap(r,e){return r+Math.random()*(e-r)}function Lp(r){return r*(.5-Math.random())}function xp(r){r!==void 0&&(Qf=r);let e=Qf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pp(r){return r*io}function zp(r){return r*bi}function Cp(r){return(r&r-1)===0&&r!==0}function Sp(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Mp(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function wp(r,e,t,n,i){let o=Math.cos,s=Math.sin,u=o(t/2),a=s(t/2),f=o((e+n)/2),h=s((e+n)/2),p=o((e-n)/2),m=s((e-n)/2),q=o((n-e)/2),g=s((n-e)/2);switch(i){case"XYX":r.set(u*h,a*p,a*m,u*f);break;case"YZY":r.set(a*m,u*h,a*p,u*f);break;case"ZXZ":r.set(a*p,a*m,u*h,u*f);break;case"XZX":r.set(u*h,a*g,a*q,u*f);break;case"YXY":r.set(a*q,u*h,a*g,u*f);break;case"ZYZ":r.set(a*g,a*q,u*h,u*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function gi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Tt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Gn={DEG2RAD:io,RAD2DEG:bi,generateUUID:Er,clamp:$e,euclideanModulo:rf,mapLinear:dp,inverseLerp:Hp,lerp:oo,damp:Kp,pingpong:bp,smoothstep:Op,smootherstep:jp,randInt:Ip,randFloat:Ap,randFloatSpread:Lp,seededRandom:xp,degToRad:Pp,radToDeg:zp,isPowerOfTwo:Cp,ceilPowerOfTwo:Sp,floorPowerOfTwo:Mp,setQuaternionFromProperEuler:wp,normalize:Tt,denormalize:gi},se=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*i+e.x,this.y=o*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,s,u){let a=n[i+0],f=n[i+1],h=n[i+2],p=n[i+3],m=o[s+0],q=o[s+1],g=o[s+2],v=o[s+3];if(u===0){e[t+0]=a,e[t+1]=f,e[t+2]=h,e[t+3]=p;return}if(u===1){e[t+0]=m,e[t+1]=q,e[t+2]=g,e[t+3]=v;return}if(p!==v||a!==m||f!==q||h!==g){let y=1-u,c=a*m+f*q+h*g+p*v,I=c>=0?1:-1,O=1-c*c;if(O>Number.EPSILON){let j=Math.sqrt(O),A=Math.atan2(j,c*I);y=Math.sin(y*A)/j,u=Math.sin(u*A)/j}let l=u*I;if(a=a*y+m*l,f=f*y+q*l,h=h*y+g*l,p=p*y+v*l,y===1-u){let j=1/Math.sqrt(a*a+f*f+h*h+p*p);a*=j,f*=j,h*=j,p*=j}}e[t]=a,e[t+1]=f,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,i,o,s){let u=n[i],a=n[i+1],f=n[i+2],h=n[i+3],p=o[s],m=o[s+1],q=o[s+2],g=o[s+3];return e[t]=u*g+h*p+a*q-f*m,e[t+1]=a*g+h*m+f*p-u*q,e[t+2]=f*g+h*q+u*m-a*p,e[t+3]=h*g-u*p-a*m-f*q,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,o=e._z,s=e._order,u=Math.cos,a=Math.sin,f=u(n/2),h=u(i/2),p=u(o/2),m=a(n/2),q=a(i/2),g=a(o/2);switch(s){case"XYZ":this._x=m*h*p+f*q*g,this._y=f*q*p-m*h*g,this._z=f*h*g+m*q*p,this._w=f*h*p-m*q*g;break;case"YXZ":this._x=m*h*p+f*q*g,this._y=f*q*p-m*h*g,this._z=f*h*g-m*q*p,this._w=f*h*p+m*q*g;break;case"ZXY":this._x=m*h*p-f*q*g,this._y=f*q*p+m*h*g,this._z=f*h*g+m*q*p,this._w=f*h*p-m*q*g;break;case"ZYX":this._x=m*h*p-f*q*g,this._y=f*q*p+m*h*g,this._z=f*h*g-m*q*p,this._w=f*h*p+m*q*g;break;case"YZX":this._x=m*h*p+f*q*g,this._y=f*q*p+m*h*g,this._z=f*h*g-m*q*p,this._w=f*h*p-m*q*g;break;case"XZY":this._x=m*h*p-f*q*g,this._y=f*q*p-m*h*g,this._z=f*h*g+m*q*p,this._w=f*h*p+m*q*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],o=t[8],s=t[1],u=t[5],a=t[9],f=t[2],h=t[6],p=t[10],m=n+u+p;if(m>0){let q=.5/Math.sqrt(m+1);this._w=.25/q,this._x=(h-a)*q,this._y=(o-f)*q,this._z=(s-i)*q}else if(n>u&&n>p){let q=2*Math.sqrt(1+n-u-p);this._w=(h-a)/q,this._x=.25*q,this._y=(i+s)/q,this._z=(o+f)/q}else if(u>p){let q=2*Math.sqrt(1+u-n-p);this._w=(o-f)/q,this._x=(i+s)/q,this._y=.25*q,this._z=(a+h)/q}else{let q=2*Math.sqrt(1+p-n-u);this._w=(s-i)/q,this._x=(o+f)/q,this._y=(a+h)/q,this._z=.25*q}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,o=e._z,s=e._w,u=t._x,a=t._y,f=t._z,h=t._w;return this._x=n*h+s*u+i*f-o*a,this._y=i*h+s*a+o*u-n*f,this._z=o*h+s*f+n*a-i*u,this._w=s*h-n*u-i*a-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,o=this._z,s=this._w,u=s*e._w+n*e._x+i*e._y+o*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=s,this._x=n,this._y=i,this._z=o,this;let a=1-u*u;if(a<=Number.EPSILON){let q=1-t;return this._w=q*s+t*this._w,this._x=q*n+t*this._x,this._y=q*i+t*this._y,this._z=q*o+t*this._z,this.normalize(),this}let f=Math.sqrt(a),h=Math.atan2(f,u),p=Math.sin((1-t)*h)/f,m=Math.sin(t*h)/f;return this._w=s*p+this._w*m,this._x=n*p+this._x*m,this._y=i*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},M=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_f.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_f.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,o=e.x,s=e.y,u=e.z,a=e.w,f=2*(s*i-u*n),h=2*(u*t-o*i),p=2*(o*n-s*t);return this.x=t+a*f+s*p-u*h,this.y=n+a*h+u*f-o*p,this.z=i+a*p+o*h-s*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,o=e.z,s=t.x,u=t.y,a=t.z;return this.x=i*a-o*u,this.y=o*s-n*a,this.z=n*u-i*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ta.copy(this).projectOnVector(e),this.sub(ta)}reflect(e){return this.sub(ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ta=new M,_f=new Bt,et=class r{constructor(e,t,n,i,o,s,u,a,f){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,u,a,f)}set(e,t,n,i,o,s,u,a,f){let h=this.elements;return h[0]=e,h[1]=i,h[2]=u,h[3]=t,h[4]=o,h[5]=a,h[6]=n,h[7]=s,h[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,o=this.elements,s=n[0],u=n[3],a=n[6],f=n[1],h=n[4],p=n[7],m=n[2],q=n[5],g=n[8],v=i[0],y=i[3],c=i[6],I=i[1],O=i[4],l=i[7],j=i[2],A=i[5],P=i[8];return o[0]=s*v+u*I+a*j,o[3]=s*y+u*O+a*A,o[6]=s*c+u*l+a*P,o[1]=f*v+h*I+p*j,o[4]=f*y+h*O+p*A,o[7]=f*c+h*l+p*P,o[2]=m*v+q*I+g*j,o[5]=m*y+q*O+g*A,o[8]=m*c+q*l+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],u=e[5],a=e[6],f=e[7],h=e[8];return t*s*h-t*u*f-n*o*h+n*u*a+i*o*f-i*s*a}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],u=e[5],a=e[6],f=e[7],h=e[8],p=h*s-u*f,m=u*a-h*o,q=f*o-s*a,g=t*p+n*m+i*q;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=p*v,e[1]=(i*f-h*n)*v,e[2]=(u*n-i*s)*v,e[3]=m*v,e[4]=(h*t-i*a)*v,e[5]=(i*o-u*t)*v,e[6]=q*v,e[7]=(n*a-f*t)*v,e[8]=(s*t-n*o)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,s,u){let a=Math.cos(o),f=Math.sin(o);return this.set(n*a,n*f,-n*(a*s+f*u)+s+e,-i*f,i*a,-i*(-f*s+a*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},na=new et;function of(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Oi(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function p6(){let r=Oi("canvas");return r.style.display="block",r}var $f={};function ji(r){r in $f||($f[r]=!0,console.warn(r))}function q6(r,e,t){return new Promise(function(n,i){function o(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}var eh=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),th=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yp(){let r={enabled:!0,workingColorSpace:Un,spaces:{},convert:function(i,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===qt&&(i.r=Rn(i.r),i.g=Rn(i.g),i.b=Rn(i.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[o].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===qt&&(i.r=vi(i.r),i.g=vi(i.g),i.b=vi(i.b))),i},workingToColorSpace:function(i,o){return this.convert(i,this.workingColorSpace,o)},colorSpaceToWorking:function(i,o){return this.convert(i,o,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Rt?ao:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,o=this.workingColorSpace){return i.fromArray(this.spaces[o].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,o,s){return i.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,o){return ji("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,o)},toWorkingColorSpace:function(i,o){return ji("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,o)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Un]:{primaries:e,whitePoint:n,transfer:ao,toXYZ:eh,fromXYZ:th,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:mt},outputColorSpaceConfig:{drawingBufferColorSpace:mt}},[mt]:{primaries:e,whitePoint:n,transfer:qt,toXYZ:eh,fromXYZ:th,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:mt}}}),r}var ft=Yp();function Rn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function vi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var ni,Ii=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ni===void 0&&(ni=Oi("canvas")),ni.width=e.width,ni.height=e.height;let i=ni.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ni}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Oi("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let s=0;s<o.length;s++)o[s]=Rn(o[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rn(t[n]/255)*255):t[n]=Rn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Gp=0,cr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=Er(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let s=0,u=i.length;s<u;s++)i[s].isDataTexture?o.push(ra(i[s].image)):o.push(ra(i[s]))}else o=ra(i);n.url=o}return t||(e.images[this.uuid]=n),n}};function ra(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ii.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xp=0,ia=new M,St=class r extends Cn{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=yn,i=yn,o=It,s=on,u=Ft,a=Pn,f=r.DEFAULT_ANISOTROPY,h=Rt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Er(),this.name="",this.source=new cr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=f,this.format=u,this.internalFormat=null,this.type=a,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ia).x}get height(){return this.source.getSize(ia).y}get depth(){return this.source.getSize(ia).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ea)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gn:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case di:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gn:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case di:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Ea;St.DEFAULT_ANISOTROPY=1;var yt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o,a=e.elements,f=a[0],h=a[4],p=a[8],m=a[1],q=a[5],g=a[9],v=a[2],y=a[6],c=a[10];if(Math.abs(h-m)<.01&&Math.abs(p-v)<.01&&Math.abs(g-y)<.01){if(Math.abs(h+m)<.1&&Math.abs(p+v)<.1&&Math.abs(g+y)<.1&&Math.abs(f+q+c-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let O=(f+1)/2,l=(q+1)/2,j=(c+1)/2,A=(h+m)/4,P=(p+v)/4,L=(g+y)/4;return O>l&&O>j?O<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(O),i=A/n,o=P/n):l>j?l<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(l),n=A/i,o=L/i):j<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(j),n=P/o,i=L/o),this.set(n,i,o,t),this}let I=Math.sqrt((y-g)*(y-g)+(p-v)*(p-v)+(m-h)*(m-h));return Math.abs(I)<.001&&(I=1),this.x=(y-g)/I,this.y=(p-v)/I,this.z=(m-h)/I,this.w=Math.acos((f+q+c-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xs=class extends Cn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let i={width:e,height:t,depth:n.depth},o=new St(i);this.textures=[];let s=n.count;for(let u=0;u<s;u++)this.textures[u]=o.clone(),this.textures[u].isRenderTargetTexture=!0,this.textures[u].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new cr(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends xs{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ho=class extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ps=class extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Sn=class{constructor(e=new M(1/0,1/0,1/0),t=new M(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,u=o.count;s<u;s++)e.isMesh===!0?e.getVertexPosition(s,jn):jn.fromBufferAttribute(o,s),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}let i=e.children;for(let o=0,s=i.length;o<s;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),ns.subVectors(this.max,Ui),ri.subVectors(e.a,Ui),ii.subVectors(e.b,Ui),oi.subVectors(e.c,Ui),sr.subVectors(ii,ri),ur.subVectors(oi,ii),Pr.subVectors(ri,oi);let t=[0,-sr.z,sr.y,0,-ur.z,ur.y,0,-Pr.z,Pr.y,sr.z,0,-sr.x,ur.z,0,-ur.x,Pr.z,0,-Pr.x,-sr.y,sr.x,0,-ur.y,ur.x,0,-Pr.y,Pr.x,0];return!oa(t,ri,ii,oi,ns)||(t=[1,0,0,0,1,0,0,0,1],!oa(t,ri,ii,oi,ns))?!1:(rs.crossVectors(sr,ur),t=[rs.x,rs.y,rs.z],oa(t,ri,ii,oi,ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wn=[new M,new M,new M,new M,new M,new M,new M,new M],jn=new M,ts=new Sn,ri=new M,ii=new M,oi=new M,sr=new M,ur=new M,Pr=new M,Ui=new M,ns=new M,rs=new M,zr=new M;function oa(r,e,t,n,i){for(let o=0,s=r.length-3;o<=s;o+=3){zr.fromArray(r,o);let u=i.x*Math.abs(zr.x)+i.y*Math.abs(zr.y)+i.z*Math.abs(zr.z),a=e.dot(zr),f=t.dot(zr),h=n.dot(zr);if(Math.max(-Math.max(a,f,h),Math.min(a,f,h))>u)return!1}return!0}var Dp=new Sn,Qi=new M,sa=new M,Qn=class{constructor(e=new M,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Dp.setFromPoints(e).getCenter(n);let i=0;for(let o=0,s=e.length;o<s;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);let t=Qi.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Qi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(sa)),this.expandByPoint(Qi.copy(e.center).sub(sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kn=new M,ua=new M,is=new M,ar=new M,aa=new M,os=new M,fa=new M,yr=class{constructor(e=new M,t=new M(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ua.copy(e).add(t).multiplyScalar(.5),is.copy(t).sub(e).normalize(),ar.copy(this.origin).sub(ua);let o=e.distanceTo(t)*.5,s=-this.direction.dot(is),u=ar.dot(this.direction),a=-ar.dot(is),f=ar.lengthSq(),h=Math.abs(1-s*s),p,m,q,g;if(h>0)if(p=s*a-u,m=s*u-a,g=o*h,p>=0)if(m>=-g)if(m<=g){let v=1/h;p*=v,m*=v,q=p*(p+s*m+2*u)+m*(s*p+m+2*a)+f}else m=o,p=Math.max(0,-(s*m+u)),q=-p*p+m*(m+2*a)+f;else m=-o,p=Math.max(0,-(s*m+u)),q=-p*p+m*(m+2*a)+f;else m<=-g?(p=Math.max(0,-(-s*o+u)),m=p>0?-o:Math.min(Math.max(-o,-a),o),q=-p*p+m*(m+2*a)+f):m<=g?(p=0,m=Math.min(Math.max(-o,-a),o),q=m*(m+2*a)+f):(p=Math.max(0,-(s*o+u)),m=p>0?o:Math.min(Math.max(-o,-a),o),q=-p*p+m*(m+2*a)+f);else m=s>0?-o:o,p=Math.max(0,-(s*m+u)),q=-p*p+m*(m+2*a)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),i&&i.copy(ua).addScaledVector(is,m),q}intersectSphere(e,t){kn.subVectors(e.center,this.origin);let n=kn.dot(this.direction),i=kn.dot(kn)-n*n,o=e.radius*e.radius;if(i>o)return null;let s=Math.sqrt(o-i),u=n-s,a=n+s;return a<0?null:u<0?this.at(a,t):this.at(u,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,s,u,a,f=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,i=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,i=(e.min.x-m.x)*f),h>=0?(o=(e.min.y-m.y)*h,s=(e.max.y-m.y)*h):(o=(e.max.y-m.y)*h,s=(e.min.y-m.y)*h),n>s||o>i||((o>n||isNaN(n))&&(n=o),(s<i||isNaN(i))&&(i=s),p>=0?(u=(e.min.z-m.z)*p,a=(e.max.z-m.z)*p):(u=(e.max.z-m.z)*p,a=(e.min.z-m.z)*p),n>a||u>i)||((u>n||n!==n)&&(n=u),(a<i||i!==i)&&(i=a),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,n,i,o){aa.subVectors(t,e),os.subVectors(n,e),fa.crossVectors(aa,os);let s=this.direction.dot(fa),u;if(s>0){if(i)return null;u=1}else if(s<0)u=-1,s=-s;else return null;ar.subVectors(this.origin,e);let a=u*this.direction.dot(os.crossVectors(ar,os));if(a<0)return null;let f=u*this.direction.dot(aa.cross(ar));if(f<0||a+f>s)return null;let h=-u*ar.dot(fa);return h<0?null:this.at(h/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},at=class r{constructor(e,t,n,i,o,s,u,a,f,h,p,m,q,g,v,y){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,u,a,f,h,p,m,q,g,v,y)}set(e,t,n,i,o,s,u,a,f,h,p,m,q,g,v,y){let c=this.elements;return c[0]=e,c[4]=t,c[8]=n,c[12]=i,c[1]=o,c[5]=s,c[9]=u,c[13]=a,c[2]=f,c[6]=h,c[10]=p,c[14]=m,c[3]=q,c[7]=g,c[11]=v,c[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/si.setFromMatrixColumn(e,0).length(),o=1/si.setFromMatrixColumn(e,1).length(),s=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,o=e.z,s=Math.cos(n),u=Math.sin(n),a=Math.cos(i),f=Math.sin(i),h=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){let m=s*h,q=s*p,g=u*h,v=u*p;t[0]=a*h,t[4]=-a*p,t[8]=f,t[1]=q+g*f,t[5]=m-v*f,t[9]=-u*a,t[2]=v-m*f,t[6]=g+q*f,t[10]=s*a}else if(e.order==="YXZ"){let m=a*h,q=a*p,g=f*h,v=f*p;t[0]=m+v*u,t[4]=g*u-q,t[8]=s*f,t[1]=s*p,t[5]=s*h,t[9]=-u,t[2]=q*u-g,t[6]=v+m*u,t[10]=s*a}else if(e.order==="ZXY"){let m=a*h,q=a*p,g=f*h,v=f*p;t[0]=m-v*u,t[4]=-s*p,t[8]=g+q*u,t[1]=q+g*u,t[5]=s*h,t[9]=v-m*u,t[2]=-s*f,t[6]=u,t[10]=s*a}else if(e.order==="ZYX"){let m=s*h,q=s*p,g=u*h,v=u*p;t[0]=a*h,t[4]=g*f-q,t[8]=m*f+v,t[1]=a*p,t[5]=v*f+m,t[9]=q*f-g,t[2]=-f,t[6]=u*a,t[10]=s*a}else if(e.order==="YZX"){let m=s*a,q=s*f,g=u*a,v=u*f;t[0]=a*h,t[4]=v-m*p,t[8]=g*p+q,t[1]=p,t[5]=s*h,t[9]=-u*h,t[2]=-f*h,t[6]=q*p+g,t[10]=m-v*p}else if(e.order==="XZY"){let m=s*a,q=s*f,g=u*a,v=u*f;t[0]=a*h,t[4]=-p,t[8]=f*h,t[1]=m*p+v,t[5]=s*h,t[9]=q*p-g,t[2]=g*p-q,t[6]=u*h,t[10]=v*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jp,e,Tp)}lookAt(e,t,n){let i=this.elements;return _t.subVectors(e,t),_t.lengthSq()===0&&(_t.z=1),_t.normalize(),fr.crossVectors(n,_t),fr.lengthSq()===0&&(Math.abs(n.z)===1?_t.x+=1e-4:_t.z+=1e-4,_t.normalize(),fr.crossVectors(n,_t)),fr.normalize(),ss.crossVectors(_t,fr),i[0]=fr.x,i[4]=ss.x,i[8]=_t.x,i[1]=fr.y,i[5]=ss.y,i[9]=_t.y,i[2]=fr.z,i[6]=ss.z,i[10]=_t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,o=this.elements,s=n[0],u=n[4],a=n[8],f=n[12],h=n[1],p=n[5],m=n[9],q=n[13],g=n[2],v=n[6],y=n[10],c=n[14],I=n[3],O=n[7],l=n[11],j=n[15],A=i[0],P=i[4],L=i[8],K=i[12],H=i[1],C=i[5],Y=i[9],X=i[13],D=i[2],w=i[6],N=i[10],U=i[14],B=i[3],ce=i[7],ve=i[11],de=i[15];return o[0]=s*A+u*H+a*D+f*B,o[4]=s*P+u*C+a*w+f*ce,o[8]=s*L+u*Y+a*N+f*ve,o[12]=s*K+u*X+a*U+f*de,o[1]=h*A+p*H+m*D+q*B,o[5]=h*P+p*C+m*w+q*ce,o[9]=h*L+p*Y+m*N+q*ve,o[13]=h*K+p*X+m*U+q*de,o[2]=g*A+v*H+y*D+c*B,o[6]=g*P+v*C+y*w+c*ce,o[10]=g*L+v*Y+y*N+c*ve,o[14]=g*K+v*X+y*U+c*de,o[3]=I*A+O*H+l*D+j*B,o[7]=I*P+O*C+l*w+j*ce,o[11]=I*L+O*Y+l*N+j*ve,o[15]=I*K+O*X+l*U+j*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],s=e[1],u=e[5],a=e[9],f=e[13],h=e[2],p=e[6],m=e[10],q=e[14],g=e[3],v=e[7],y=e[11],c=e[15];return g*(+o*a*p-i*f*p-o*u*m+n*f*m+i*u*q-n*a*q)+v*(+t*a*q-t*f*m+o*s*m-i*s*q+i*f*h-o*a*h)+y*(+t*f*p-t*u*q-o*s*p+n*s*q+o*u*h-n*f*h)+c*(-i*u*h-t*a*p+t*u*m+i*s*p-n*s*m+n*a*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],u=e[5],a=e[6],f=e[7],h=e[8],p=e[9],m=e[10],q=e[11],g=e[12],v=e[13],y=e[14],c=e[15],I=p*y*f-v*m*f+v*a*q-u*y*q-p*a*c+u*m*c,O=g*m*f-h*y*f-g*a*q+s*y*q+h*a*c-s*m*c,l=h*v*f-g*p*f+g*u*q-s*v*q-h*u*c+s*p*c,j=g*p*a-h*v*a-g*u*m+s*v*m+h*u*y-s*p*y,A=t*I+n*O+i*l+o*j;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/A;return e[0]=I*P,e[1]=(v*m*o-p*y*o-v*i*q+n*y*q+p*i*c-n*m*c)*P,e[2]=(u*y*o-v*a*o+v*i*f-n*y*f-u*i*c+n*a*c)*P,e[3]=(p*a*o-u*m*o-p*i*f+n*m*f+u*i*q-n*a*q)*P,e[4]=O*P,e[5]=(h*y*o-g*m*o+g*i*q-t*y*q-h*i*c+t*m*c)*P,e[6]=(g*a*o-s*y*o-g*i*f+t*y*f+s*i*c-t*a*c)*P,e[7]=(s*m*o-h*a*o+h*i*f-t*m*f-s*i*q+t*a*q)*P,e[8]=l*P,e[9]=(g*p*o-h*v*o-g*n*q+t*v*q+h*n*c-t*p*c)*P,e[10]=(s*v*o-g*u*o+g*n*f-t*v*f-s*n*c+t*u*c)*P,e[11]=(h*u*o-s*p*o-h*n*f+t*p*f+s*n*q-t*u*q)*P,e[12]=j*P,e[13]=(h*v*i-g*p*i+g*n*m-t*v*m-h*n*y+t*p*y)*P,e[14]=(g*u*i-s*v*i-g*n*a+t*v*a+s*n*y-t*u*y)*P,e[15]=(s*p*i-h*u*i+h*n*a-t*p*a-s*n*m+t*u*m)*P,this}scale(e){let t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),o=1-n,s=e.x,u=e.y,a=e.z,f=o*s,h=o*u;return this.set(f*s+n,f*u-i*a,f*a+i*u,0,f*u+i*a,h*u+n,h*a-i*s,0,f*a-i*u,h*a+i*s,o*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,s){return this.set(1,n,o,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,o=t._x,s=t._y,u=t._z,a=t._w,f=o+o,h=s+s,p=u+u,m=o*f,q=o*h,g=o*p,v=s*h,y=s*p,c=u*p,I=a*f,O=a*h,l=a*p,j=n.x,A=n.y,P=n.z;return i[0]=(1-(v+c))*j,i[1]=(q+l)*j,i[2]=(g-O)*j,i[3]=0,i[4]=(q-l)*A,i[5]=(1-(m+c))*A,i[6]=(y+I)*A,i[7]=0,i[8]=(g+O)*P,i[9]=(y-I)*P,i[10]=(1-(m+v))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,o=si.set(i[0],i[1],i[2]).length(),s=si.set(i[4],i[5],i[6]).length(),u=si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],In.copy(this);let f=1/o,h=1/s,p=1/u;return In.elements[0]*=f,In.elements[1]*=f,In.elements[2]*=f,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=p,In.elements[9]*=p,In.elements[10]*=p,t.setFromRotationMatrix(In),n.x=o,n.y=s,n.z=u,this}makePerspective(e,t,n,i,o,s,u=Ln,a=!1){let f=this.elements,h=2*o/(t-e),p=2*o/(n-i),m=(t+e)/(t-e),q=(n+i)/(n-i),g,v;if(a)g=o/(s-o),v=s*o/(s-o);else if(u===Ln)g=-(s+o)/(s-o),v=-2*s*o/(s-o);else if(u===fo)g=-s/(s-o),v=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return f[0]=h,f[4]=0,f[8]=m,f[12]=0,f[1]=0,f[5]=p,f[9]=q,f[13]=0,f[2]=0,f[6]=0,f[10]=g,f[14]=v,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,n,i,o,s,u=Ln,a=!1){let f=this.elements,h=2/(t-e),p=2/(n-i),m=-(t+e)/(t-e),q=-(n+i)/(n-i),g,v;if(a)g=1/(s-o),v=s/(s-o);else if(u===Ln)g=-2/(s-o),v=-(s+o)/(s-o);else if(u===fo)g=-1/(s-o),v=-o/(s-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return f[0]=h,f[4]=0,f[8]=0,f[12]=m,f[1]=0,f[5]=p,f[9]=0,f[13]=q,f[2]=0,f[6]=0,f[10]=g,f[14]=v,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},si=new M,In=new at,Jp=new M(0,0,0),Tp=new M(1,1,1),fr=new M,ss=new M,_t=new M,nh=new at,rh=new Bt,xn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,o=i[0],s=i[4],u=i[8],a=i[1],f=i[5],h=i[9],p=i[2],m=i[6],q=i[10];switch(t){case"XYZ":this._y=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-h,q),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(u,q),this._z=Math.atan2(a,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin($e(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,q),this._z=Math.atan2(-s,f)):(this._y=0,this._z=Math.atan2(a,o));break;case"ZYX":this._y=Math.asin(-$e(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,q),this._z=Math.atan2(a,o)):(this._x=0,this._z=Math.atan2(-s,f));break;case"YZX":this._z=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(u,q));break;case"XZY":this._z=Math.asin(-$e(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(u,o)):(this._x=Math.atan2(-h,q),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rh.setFromEuler(this),this.setFromQuaternion(rh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var Ai=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Wp=0,ih=new M,ui=new Bt,Nn=new at,us=new M,_i=new M,kp=new M,Np=new Bt,oh=new M(1,0,0),sh=new M(0,1,0),uh=new M(0,0,1),ah={type:"added"},Zp={type:"removed"},ai={type:"childadded",child:null},ha={type:"childremoved",child:null},Mt=class r extends Cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new M,t=new xn,n=new Bt,i=new M(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new at},normalMatrix:{value:new et}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ai,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(oh,e)}rotateY(e){return this.rotateOnAxis(sh,e)}rotateZ(e){return this.rotateOnAxis(uh,e)}translateOnAxis(e,t){return ih.copy(e).applyQuaternion(this.quaternion),this.position.add(ih.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(oh,e)}translateY(e){return this.translateOnAxis(sh,e)}translateZ(e){return this.translateOnAxis(uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?us.copy(e):us.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),_i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(_i,us,this.up):Nn.lookAt(us,_i,this.up),this.quaternion.setFromRotationMatrix(Nn),i&&(Nn.extractRotation(i.matrixWorld),ui.setFromRotationMatrix(Nn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ah),ai.child=e,this.dispatchEvent(ai),ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zp),ha.child=e,this.dispatchEvent(ha),ha.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ah),ai.child=e,this.dispatchEvent(ai),ai.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_i,e,kp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_i,Np,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(u=>({...u,boundingBox:u.boundingBox?u.boundingBox.toJSON():void 0,boundingSphere:u.boundingSphere?u.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(u=>({...u})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function o(u,a){return u[a.uuid]===void 0&&(u[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);let u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){let a=u.shapes;if(Array.isArray(a))for(let f=0,h=a.length;f<h;f++){let p=a[f];o(e.shapes,p)}else o(e.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let u=[];for(let a=0,f=this.material.length;a<f;a++)u.push(o(e.materials,this.material[a]));i.material=u}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let u=0;u<this.children.length;u++)i.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let u=0;u<this.animations.length;u++){let a=this.animations[u];i.animations.push(o(e.animations,a))}}if(t){let u=s(e.geometries),a=s(e.materials),f=s(e.textures),h=s(e.images),p=s(e.shapes),m=s(e.skeletons),q=s(e.animations),g=s(e.nodes);u.length>0&&(n.geometries=u),a.length>0&&(n.materials=a),f.length>0&&(n.textures=f),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),q.length>0&&(n.animations=q),g.length>0&&(n.nodes=g)}return n.object=i,n;function s(u){let a=[];for(let f in u){let h=u[f];delete h.metadata,a.push(h)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Mt.DEFAULT_UP=new M(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=new M,Zn=new M,pa=new M,Bn=new M,fi=new M,hi=new M,fh=new M,qa=new M,ma=new M,ca=new M,ya=new yt,ga=new yt,va=new yt,qr=class r{constructor(e=new M,t=new M,n=new M){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),An.subVectors(e,t),i.cross(An);let o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){An.subVectors(i,t),Zn.subVectors(n,t),pa.subVectors(e,t);let s=An.dot(An),u=An.dot(Zn),a=An.dot(pa),f=Zn.dot(Zn),h=Zn.dot(pa),p=s*f-u*u;if(p===0)return o.set(0,0,0),null;let m=1/p,q=(f*a-u*h)*m,g=(s*h-u*a)*m;return o.set(1-q-g,g,q)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,i,o,s,u,a){return this.getBarycoord(e,t,n,i,Bn)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(o,Bn.x),a.addScaledVector(s,Bn.y),a.addScaledVector(u,Bn.z),a)}static getInterpolatedAttribute(e,t,n,i,o,s){return ya.setScalar(0),ga.setScalar(0),va.setScalar(0),ya.fromBufferAttribute(e,t),ga.fromBufferAttribute(e,n),va.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(ya,o.x),s.addScaledVector(ga,o.y),s.addScaledVector(va,o.z),s}static isFrontFacing(e,t,n,i){return An.subVectors(n,t),Zn.subVectors(e,t),An.cross(Zn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),An.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,o){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,o=this.c,s,u;fi.subVectors(i,n),hi.subVectors(o,n),qa.subVectors(e,n);let a=fi.dot(qa),f=hi.dot(qa);if(a<=0&&f<=0)return t.copy(n);ma.subVectors(e,i);let h=fi.dot(ma),p=hi.dot(ma);if(h>=0&&p<=h)return t.copy(i);let m=a*p-h*f;if(m<=0&&a>=0&&h<=0)return s=a/(a-h),t.copy(n).addScaledVector(fi,s);ca.subVectors(e,o);let q=fi.dot(ca),g=hi.dot(ca);if(g>=0&&q<=g)return t.copy(o);let v=q*f-a*g;if(v<=0&&f>=0&&g<=0)return u=f/(f-g),t.copy(n).addScaledVector(hi,u);let y=h*g-q*p;if(y<=0&&p-h>=0&&q-g>=0)return fh.subVectors(o,i),u=(p-h)/(p-h+(q-g)),t.copy(i).addScaledVector(fh,u);let c=1/(y+v+m);return s=v*c,u=m*c,t.copy(n).addScaledVector(fi,s).addScaledVector(hi,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},m6={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},as={h:0,s:0,l:0};function la(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var Re=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ft.workingColorSpace){if(e=rf(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=la(s,o,e+1/3),this.g=la(s,o,e),this.b=la(s,o,e-1/3)}return ft.colorSpaceToWorking(this,i),this}setStyle(e,t=mt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=i[1],u=i[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=i[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mt){let n=m6[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mt){return ft.workingToColorSpace(Yt.copy(this),e),Math.round($e(Yt.r*255,0,255))*65536+Math.round($e(Yt.g*255,0,255))*256+Math.round($e(Yt.b*255,0,255))}getHexString(e=mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,i=Yt.g,o=Yt.b,s=Math.max(n,i,o),u=Math.min(n,i,o),a,f,h=(u+s)/2;if(u===s)a=0,f=0;else{let p=s-u;switch(f=h<=.5?p/(s+u):p/(2-s-u),s){case n:a=(i-o)/p+(i<o?6:0);break;case i:a=(o-n)/p+2;break;case o:a=(n-i)/p+4;break}a/=6}return e.h=a,e.s=f,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=mt){ft.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,i=Yt.b;return e!==mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+t,hr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hr),e.getHSL(as);let n=oo(hr.h,as.h,t),i=oo(hr.s,as.s,t),o=oo(hr.l,as.l,t);return this.setHSL(n,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*i,this.g=o[1]*t+o[4]*n+o[7]*i,this.b=o[2]*t+o[5]*n+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Re;Re.NAMES=m6;var Bp=0,_n=class extends Cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Er(),this.name="",this.type="Material",this.blending=Yr,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=As,this.blendDst=Ls,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=Gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yr&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==As&&(n.blendSrc=this.blendSrc),this.blendDst!==Ls&&(n.blendDst=this.blendDst),this.blendEquation!==mr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){let s=[];for(let u in o){let a=o[u];delete a.metadata,s.push(a)}return s}if(t){let o=i(e.textures),s=i(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Mn=class extends _n{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Fn=Ep();function Ep(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let a=0;a<256;++a){let f=a-127;f<-27?(n[a]=0,n[a|256]=32768,i[a]=24,i[a|256]=24):f<-14?(n[a]=1024>>-f-14,n[a|256]=1024>>-f-14|32768,i[a]=-f-1,i[a|256]=-f-1):f<=15?(n[a]=f+15<<10,n[a|256]=f+15<<10|32768,i[a]=13,i[a|256]=13):f<128?(n[a]=31744,n[a|256]=64512,i[a]=24,i[a|256]=24):(n[a]=31744,n[a|256]=64512,i[a]=13,i[a|256]=13)}let o=new Uint32Array(2048),s=new Uint32Array(64),u=new Uint32Array(64);for(let a=1;a<1024;++a){let f=a<<13,h=0;for(;(f&8388608)===0;)f<<=1,h-=8388608;f&=-8388609,h+=947912704,o[a]=f|h}for(let a=1024;a<2048;++a)o[a]=939524096+(a-1024<<13);for(let a=1;a<31;++a)s[a]=a<<23;s[31]=1199570944,s[32]=2147483648;for(let a=33;a<63;++a)s[a]=2147483648+(a-32<<23);s[63]=3347054592;for(let a=1;a<64;++a)a!==32&&(u[a]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:o,exponentTable:s,offsetTable:u}}function Fp(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=$e(r,-65504,65504),Fn.floatView[0]=r;let e=Fn.uint32View[0],t=e>>23&511;return Fn.baseTable[t]+((e&8388607)>>Fn.shiftTable[t])}function Rp(r){let e=r>>10;return Fn.uint32View[0]=Fn.mantissaTable[Fn.offsetTable[e]+(r&1023)]+Fn.exponentTable[e],Fn.floatView[0]}var gr=class{static toHalfFloat(e){return Fp(e)}static fromHalfFloat(e){return Rp(e)}},jt=new M,fs=new se,Vp=0,Kt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ca,this.updateRanges=[],this.gpuType=kt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),i=Tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),i=Tt(i,this.array),o=Tt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ca&&(e.usage=this.usage),e}};var po=class extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var qo=class extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var gt=class extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Up=0,cn=new at,da=new Mt,pi=new M,$t=new Sn,$i=new Sn,zt=new M,Xt=class r extends Cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=Er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(of(e)?qo:po)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let o=new et().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,n){return cn.makeTranslation(e,t,n),this.applyMatrix4(cn),this}scale(e,t,n){return cn.makeScale(e,t,n),this.applyMatrix4(cn),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,o=e.length;i<o;i++){let s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new gt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new M(-1/0,-1/0,-1/0),new M(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let o=t[n];$t.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new M,1/0);return}if(e){let n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let u=t[o];$i.setFromBufferAttribute(u),this.morphTargetsRelative?(zt.addVectors($t.min,$i.min),$t.expandByPoint(zt),zt.addVectors($t.max,$i.max),$t.expandByPoint(zt)):($t.expandByPoint($i.min),$t.expandByPoint($i.max))}$t.getCenter(n);let i=0;for(let o=0,s=e.count;o<s;o++)zt.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(zt));if(t)for(let o=0,s=t.length;o<s;o++){let u=t[o],a=this.morphTargetsRelative;for(let f=0,h=u.count;f<h;f++)zt.fromBufferAttribute(u,f),a&&(pi.fromBufferAttribute(e,f),zt.add(pi)),i=Math.max(i,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*n.count),4));let s=this.getAttribute("tangent"),u=[],a=[];for(let L=0;L<n.count;L++)u[L]=new M,a[L]=new M;let f=new M,h=new M,p=new M,m=new se,q=new se,g=new se,v=new M,y=new M;function c(L,K,H){f.fromBufferAttribute(n,L),h.fromBufferAttribute(n,K),p.fromBufferAttribute(n,H),m.fromBufferAttribute(o,L),q.fromBufferAttribute(o,K),g.fromBufferAttribute(o,H),h.sub(f),p.sub(f),q.sub(m),g.sub(m);let C=1/(q.x*g.y-g.x*q.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(p,-q.y).multiplyScalar(C),y.copy(p).multiplyScalar(q.x).addScaledVector(h,-g.x).multiplyScalar(C),u[L].add(v),u[K].add(v),u[H].add(v),a[L].add(y),a[K].add(y),a[H].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let L=0,K=I.length;L<K;++L){let H=I[L],C=H.start,Y=H.count;for(let X=C,D=C+Y;X<D;X+=3)c(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let O=new M,l=new M,j=new M,A=new M;function P(L){j.fromBufferAttribute(i,L),A.copy(j);let K=u[L];O.copy(K),O.sub(j.multiplyScalar(j.dot(K))).normalize(),l.crossVectors(A,K);let C=l.dot(a[L])<0?-1:1;s.setXYZW(L,O.x,O.y,O.z,C)}for(let L=0,K=I.length;L<K;++L){let H=I[L],C=H.start,Y=H.count;for(let X=C,D=C+Y;X<D;X+=3)P(e.getX(X+0)),P(e.getX(X+1)),P(e.getX(X+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,q=n.count;m<q;m++)n.setXYZ(m,0,0,0);let i=new M,o=new M,s=new M,u=new M,a=new M,f=new M,h=new M,p=new M;if(e)for(let m=0,q=e.count;m<q;m+=3){let g=e.getX(m+0),v=e.getX(m+1),y=e.getX(m+2);i.fromBufferAttribute(t,g),o.fromBufferAttribute(t,v),s.fromBufferAttribute(t,y),h.subVectors(s,o),p.subVectors(i,o),h.cross(p),u.fromBufferAttribute(n,g),a.fromBufferAttribute(n,v),f.fromBufferAttribute(n,y),u.add(h),a.add(h),f.add(h),n.setXYZ(g,u.x,u.y,u.z),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(y,f.x,f.y,f.z)}else for(let m=0,q=t.count;m<q;m+=3)i.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),s.fromBufferAttribute(t,m+2),h.subVectors(s,o),p.subVectors(i,o),h.cross(p),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(u,a){let f=u.array,h=u.itemSize,p=u.normalized,m=new f.constructor(a.length*h),q=0,g=0;for(let v=0,y=a.length;v<y;v++){u.isInterleavedBufferAttribute?q=a[v]*u.data.stride+u.offset:q=a[v]*h;for(let c=0;c<h;c++)m[g++]=f[q++]}return new Kt(m,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let u in i){let a=i[u],f=e(a,n);t.setAttribute(u,f)}let o=this.morphAttributes;for(let u in o){let a=[],f=o[u];for(let h=0,p=f.length;h<p;h++){let m=f[h],q=e(m,n);a.push(q)}t.morphAttributes[u]=a}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let u=0,a=s.length;u<a;u++){let f=s[u];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let a=this.parameters;for(let f in a)a[f]!==void 0&&(e[f]=a[f]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let f=n[a];e.data.attributes[a]=f.toJSON(e.data)}let i={},o=!1;for(let a in this.morphAttributes){let f=this.morphAttributes[a],h=[];for(let p=0,m=f.length;p<m;p++){let q=f[p];h.push(q.toJSON(e.data))}h.length>0&&(i[a]=h,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let u=this.boundingSphere;return u!==null&&(e.data.boundingSphere=u.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let f in i){let h=i[f];this.setAttribute(f,h.clone(t))}let o=e.morphAttributes;for(let f in o){let h=[],p=o[f];for(let m=0,q=p.length;m<q;m++)h.push(p[m].clone(t));this.morphAttributes[f]=h}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let f=0,h=s.length;f<h;f++){let p=s[f];this.addGroup(p.start,p.count,p.materialIndex)}let u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hh=new at,Cr=new yr,hs=new Qn,ph=new M,ps=new M,qs=new M,ms=new M,Ha=new M,cs=new M,qh=new M,ys=new M,st=class extends Mt{constructor(e=new Xt,t=new Mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){let u=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=o}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let u=this.morphTargetInfluences;if(o&&u){cs.set(0,0,0);for(let a=0,f=o.length;a<f;a++){let h=u[a],p=o[a];h!==0&&(Ha.fromBufferAttribute(p,e),s?cs.addScaledVector(Ha,h):cs.addScaledVector(Ha.sub(t),h))}t.add(cs)}return t}raycast(e,t){let n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hs.copy(n.boundingSphere),hs.applyMatrix4(o),Cr.copy(e.ray).recast(e.near),!(hs.containsPoint(Cr.origin)===!1&&(Cr.intersectSphere(hs,ph)===null||Cr.origin.distanceToSquared(ph)>(e.far-e.near)**2))&&(hh.copy(o).invert(),Cr.copy(e.ray).applyMatrix4(hh),!(n.boundingBox!==null&&Cr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Cr)))}_computeIntersections(e,t,n){let i,o=this.geometry,s=this.material,u=o.index,a=o.attributes.position,f=o.attributes.uv,h=o.attributes.uv1,p=o.attributes.normal,m=o.groups,q=o.drawRange;if(u!==null)if(Array.isArray(s))for(let g=0,v=m.length;g<v;g++){let y=m[g],c=s[y.materialIndex],I=Math.max(y.start,q.start),O=Math.min(u.count,Math.min(y.start+y.count,q.start+q.count));for(let l=I,j=O;l<j;l+=3){let A=u.getX(l),P=u.getX(l+1),L=u.getX(l+2);i=gs(this,c,e,n,f,h,p,A,P,L),i&&(i.faceIndex=Math.floor(l/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{let g=Math.max(0,q.start),v=Math.min(u.count,q.start+q.count);for(let y=g,c=v;y<c;y+=3){let I=u.getX(y),O=u.getX(y+1),l=u.getX(y+2);i=gs(this,s,e,n,f,h,p,I,O,l),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}else if(a!==void 0)if(Array.isArray(s))for(let g=0,v=m.length;g<v;g++){let y=m[g],c=s[y.materialIndex],I=Math.max(y.start,q.start),O=Math.min(a.count,Math.min(y.start+y.count,q.start+q.count));for(let l=I,j=O;l<j;l+=3){let A=l,P=l+1,L=l+2;i=gs(this,c,e,n,f,h,p,A,P,L),i&&(i.faceIndex=Math.floor(l/3),i.face.materialIndex=y.materialIndex,t.push(i))}}else{let g=Math.max(0,q.start),v=Math.min(a.count,q.start+q.count);for(let y=g,c=v;y<c;y+=3){let I=y,O=y+1,l=y+2;i=gs(this,s,e,n,f,h,p,I,O,l),i&&(i.faceIndex=Math.floor(y/3),t.push(i))}}}};function Qp(r,e,t,n,i,o,s,u){let a;if(e.side===Wt?a=n.intersectTriangle(s,o,i,!0,u):a=n.intersectTriangle(i,o,s,e.side===Vn,u),a===null)return null;ys.copy(u),ys.applyMatrix4(r.matrixWorld);let f=t.ray.origin.distanceTo(ys);return f<t.near||f>t.far?null:{distance:f,point:ys.clone(),object:r}}function gs(r,e,t,n,i,o,s,u,a,f){r.getVertexPosition(u,ps),r.getVertexPosition(a,qs),r.getVertexPosition(f,ms);let h=Qp(r,e,t,n,ps,qs,ms,qh);if(h){let p=new M;qr.getBarycoord(qh,ps,qs,ms,p),i&&(h.uv=qr.getInterpolatedAttribute(i,u,a,f,p,new se)),o&&(h.uv1=qr.getInterpolatedAttribute(o,u,a,f,p,new se)),s&&(h.normal=qr.getInterpolatedAttribute(s,u,a,f,p,new M),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let m={a:u,b:a,c:f,normal:new M,materialIndex:0};qr.getNormal(ps,qs,ms,m.normal),h.face=m,h.barycoord=p}return h}var At=class r extends Xt{constructor(e=1,t=1,n=1,i=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:s};let u=this;i=Math.floor(i),o=Math.floor(o),s=Math.floor(s);let a=[],f=[],h=[],p=[],m=0,q=0;g("z","y","x",-1,-1,n,t,e,s,o,0),g("z","y","x",1,-1,n,t,-e,s,o,1),g("x","z","y",1,1,e,n,t,i,s,2),g("x","z","y",1,-1,e,n,-t,i,s,3),g("x","y","z",1,-1,e,t,n,i,o,4),g("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(a),this.setAttribute("position",new gt(f,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(p,2));function g(v,y,c,I,O,l,j,A,P,L,K){let H=l/P,C=j/L,Y=l/2,X=j/2,D=A/2,w=P+1,N=L+1,U=0,B=0,ce=new M;for(let ve=0;ve<N;ve++){let de=ve*C-X;for(let We=0;We<w;We++){let Ne=We*H-Y;ce[v]=Ne*I,ce[y]=de*O,ce[c]=D,f.push(ce.x,ce.y,ce.z),ce[v]=0,ce[y]=0,ce[c]=A>0?1:-1,h.push(ce.x,ce.y,ce.z),p.push(We/P),p.push(1-ve/L),U+=1}}for(let ve=0;ve<L;ve++)for(let de=0;de<P;de++){let We=m+de+w*ve,Ne=m+de+w*(ve+1),_e=m+(de+1)+w*(ve+1),Ve=m+(de+1)+w*ve;a.push(We,Ne,Ve),a.push(Ne,_e,Ve),B+=6}u.addGroup(q,B,K),q+=B,m+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Fr(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Dt(r){let e={};for(let t=0;t<r.length;t++){let n=Fr(r[t]);for(let i in n)e[i]=n[i]}return e}function _p(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function sf(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}var Zu={clone:Fr,merge:Dt},$p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e7=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends _n{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$p,this.fragmentShader=e7,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fr(e.uniforms),this.uniformsGroups=_p(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},mo=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},pr=new M,mh=new se,ch=new se,Ct=class extends mo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=bi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bi*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){pr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pr.x,pr.y).multiplyScalar(-e/pr.z),pr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pr.x,pr.y).multiplyScalar(-e/pr.z)}getViewSize(e,t){return this.getViewBounds(e,mh,ch),t.subVectors(ch,mh)}setViewOffset(e,t,n,i,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(io*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i,s=this.view;if(this.view!==null&&this.view.enabled){let a=s.fullWidth,f=s.fullHeight;o+=s.offsetX*i/a,t-=s.offsetY*n/f,i*=s.width/a,n*=s.height/f}let u=this.filmOffset;u!==0&&(o+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},qi=-90,mi=1,zs=class extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ct(qi,mi,e,t);i.layers=this.layers,this.add(i);let o=new Ct(qi,mi,e,t);o.layers=this.layers,this.add(o);let s=new Ct(qi,mi,e,t);s.layers=this.layers,this.add(s);let u=new Ct(qi,mi,e,t);u.layers=this.layers,this.add(u);let a=new Ct(qi,mi,e,t);a.layers=this.layers,this.add(a);let f=new Ct(qi,mi,e,t);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,o,s,u,a]=t;for(let f of t)this.remove(f);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===fo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let f of t)this.add(f),f.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,u,a,f,h]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),q=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,o),e.setRenderTarget(n,1,i),e.render(t,s),e.setRenderTarget(n,2,i),e.render(t,u),e.setRenderTarget(n,3,i),e.render(t,a),e.setRenderTarget(n,4,i),e.render(t,f),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(p,m,q),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},co=class extends St{constructor(e=[],t=Nr,n,i,o,s,u,a,f,h){super(e,t,n,i,o,s,u,a,f,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cs=class extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new co(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new At(5,5,5),o=new en({name:"CubemapFromEquirect",uniforms:Fr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:tr});o.uniforms.tEquirect.value=t;let s=new st(i,o),u=t.minFilter;return t.minFilter===on&&(t.minFilter=It),new zs(1,10,this).update(e,s),t.minFilter=u,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(o)}},Qe=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},t7={type:"move"},Li=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new M,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new M),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new M,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new M),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,s=null,u=this._targetRay,a=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){s=!0;for(let v of e.hand.values()){let y=t.getJointPose(v,n),c=this._getHandJoint(f,v);y!==null&&(c.matrix.fromArray(y.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,c.jointRadius=y.radius),c.visible=y!==null}let h=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=h.position.distanceTo(p.position),q=.02,g=.005;f.inputState.pinching&&m>q+g?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=q-g&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(a.matrix.fromArray(o.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,o.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(o.linearVelocity)):a.hasLinearVelocity=!1,o.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(o.angularVelocity)):a.hasAngularVelocity=!1));u!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(u.matrix.fromArray(i.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,i.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(i.linearVelocity)):u.hasLinearVelocity=!1,i.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(i.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(t7)))}return u!==null&&(u.visible=i!==null),a!==null&&(a.visible=o!==null),f!==null&&(f.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var vr=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var yo=class extends St{constructor(e=null,t=1,n=1,i,o,s,u,a,f=Gt,h=Gt,p,m){super(null,s,u,a,f,h,i,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var go=class extends Kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ci=new at,yh=new at,vs=[],gh=new Sn,n7=new at,eo=new st,to=new Qn,vo=class extends st{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new go(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,n7)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ci),gh.copy(e.boundingBox).applyMatrix4(ci),this.boundingBox.union(gh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ci),to.copy(e.boundingSphere).applyMatrix4(ci),this.boundingSphere.union(to)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,o=n.length+1,s=e*o+1;for(let u=0;u<n.length;u++)n[u]=i[s+u]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(eo.geometry=this.geometry,eo.material=this.material,eo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),to.copy(this.boundingSphere),to.applyMatrix4(n),e.ray.intersectsSphere(to)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,ci),yh.multiplyMatrices(n,ci),eo.matrixWorld=yh,eo.raycast(e,vs);for(let s=0,u=vs.length;s<u;s++){let a=vs[s];a.instanceId=o,a.object=this,t.push(a)}vs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new go(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new yo(new Float32Array(i*this.count),i,this.count,qu,kt));let o=this.morphTexture.source.data.data,s=0;for(let f=0;f<n.length;f++)s+=n[f];let u=this.geometry.morphTargetsRelative?1:1-s,a=i*e;o[a]=u,o.set(n,a+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ka=new M,r7=new M,i7=new et,Zt=class{constructor(e=new M(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Ka.subVectors(n,t).cross(r7.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ka),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||i7.getNormalMatrix(e),i=this.coplanarPoint(Ka).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Sr=new Qn,o7=new se(.5,.5),ls=new M,xi=class{constructor(e=new Zt,t=new Zt,n=new Zt,i=new Zt,o=new Zt,s=new Zt){this.planes=[e,t,n,i,o,s]}set(e,t,n,i,o,s){let u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(i),u[4].copy(o),u[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){let i=this.planes,o=e.elements,s=o[0],u=o[1],a=o[2],f=o[3],h=o[4],p=o[5],m=o[6],q=o[7],g=o[8],v=o[9],y=o[10],c=o[11],I=o[12],O=o[13],l=o[14],j=o[15];if(i[0].setComponents(f-s,q-h,c-g,j-I).normalize(),i[1].setComponents(f+s,q+h,c+g,j+I).normalize(),i[2].setComponents(f+u,q+p,c+v,j+O).normalize(),i[3].setComponents(f-u,q-p,c-v,j-O).normalize(),n)i[4].setComponents(a,m,y,l).normalize(),i[5].setComponents(f-a,q-m,c-y,j-l).normalize();else if(i[4].setComponents(f-a,q-m,c-y,j-l).normalize(),t===Ln)i[5].setComponents(f+a,q+m,c+y,j+l).normalize();else if(t===fo)i[5].setComponents(a,m,y,l).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){Sr.center.set(0,0,0);let t=o7.distanceTo(e.center);return Sr.radius=.7071067811865476+t,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ls.x=i.normal.x>0?e.max.x:e.min.x,ls.y=i.normal.y>0?e.max.y:e.min.y,ls.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ls)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Dr=class extends _n{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ss=new M,Ms=new M,vh=new at,no=new yr,ds=new Qn,ba=new M,lh=new M,lo=class extends Mt{constructor(e=new Xt,t=new Dr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,o=t.count;i<o;i++)Ss.fromBufferAttribute(t,i-1),Ms.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ss.distanceTo(Ms);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ds.copy(n.boundingSphere),ds.applyMatrix4(i),ds.radius+=o,e.ray.intersectsSphere(ds)===!1)return;vh.copy(i).invert(),no.copy(e.ray).applyMatrix4(vh);let u=o/((this.scale.x+this.scale.y+this.scale.z)/3),a=u*u,f=this.isLineSegments?2:1,h=n.index,m=n.attributes.position;if(h!==null){let q=Math.max(0,s.start),g=Math.min(h.count,s.start+s.count);for(let v=q,y=g-1;v<y;v+=f){let c=h.getX(v),I=h.getX(v+1),O=Hs(this,e,no,a,c,I,v);O&&t.push(O)}if(this.isLineLoop){let v=h.getX(g-1),y=h.getX(q),c=Hs(this,e,no,a,v,y,g-1);c&&t.push(c)}}else{let q=Math.max(0,s.start),g=Math.min(m.count,s.start+s.count);for(let v=q,y=g-1;v<y;v+=f){let c=Hs(this,e,no,a,v,v+1,v);c&&t.push(c)}if(this.isLineLoop){let v=Hs(this,e,no,a,g-1,q,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){let u=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=o}}}}};function Hs(r,e,t,n,i,o,s){let u=r.geometry.attributes.position;if(Ss.fromBufferAttribute(u,i),Ms.fromBufferAttribute(u,o),t.distanceSqToSegment(Ss,Ms,ba,lh)>n)return;ba.applyMatrix4(r.matrixWorld);let f=e.ray.origin.distanceTo(ba);if(!(f<e.near||f>e.far))return{distance:f,point:lh.clone().applyMatrix4(r.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:r}}var Jr=class extends St{constructor(e,t,n,i,o,s,u,a,f,h,p,m){super(null,s,u,a,f,h,i,o,p,m),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var Et=class extends St{constructor(e,t,n,i,o,s,u,a,f){super(e,t,n,i,o,s,u,a,f),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ho=class extends St{constructor(e,t,n=Ir,i,o,s,u=Gt,a=Gt,f,h=Hi,p=1){if(h!==Hi&&h!==Di)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let m={width:e,height:t,depth:p};super(m,i,o,s,u,a,h,n,f),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ko=class extends St{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var wn=class r extends Xt{constructor(e=1,t=1,n=1,i=32,o=1,s=!1,u=0,a=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:o,openEnded:s,thetaStart:u,thetaLength:a};let f=this;i=Math.floor(i),o=Math.floor(o);let h=[],p=[],m=[],q=[],g=0,v=[],y=n/2,c=0;I(),s===!1&&(e>0&&O(!0),t>0&&O(!1)),this.setIndex(h),this.setAttribute("position",new gt(p,3)),this.setAttribute("normal",new gt(m,3)),this.setAttribute("uv",new gt(q,2));function I(){let l=new M,j=new M,A=0,P=(t-e)/n;for(let L=0;L<=o;L++){let K=[],H=L/o,C=H*(t-e)+e;for(let Y=0;Y<=i;Y++){let X=Y/i,D=X*a+u,w=Math.sin(D),N=Math.cos(D);j.x=C*w,j.y=-H*n+y,j.z=C*N,p.push(j.x,j.y,j.z),l.set(w,P,N).normalize(),m.push(l.x,l.y,l.z),q.push(X,1-H),K.push(g++)}v.push(K)}for(let L=0;L<i;L++)for(let K=0;K<o;K++){let H=v[K][L],C=v[K+1][L],Y=v[K+1][L+1],X=v[K][L+1];(e>0||K!==0)&&(h.push(H,C,X),A+=3),(t>0||K!==o-1)&&(h.push(C,Y,X),A+=3)}f.addGroup(c,A,0),c+=A}function O(l){let j=g,A=new se,P=new M,L=0,K=l===!0?e:t,H=l===!0?1:-1;for(let Y=1;Y<=i;Y++)p.push(0,y*H,0),m.push(0,H,0),q.push(.5,.5),g++;let C=g;for(let Y=0;Y<=i;Y++){let D=Y/i*a+u,w=Math.cos(D),N=Math.sin(D);P.x=K*N,P.y=y*H,P.z=K*w,p.push(P.x,P.y,P.z),m.push(0,H,0),A.x=w*.5+.5,A.y=N*.5*H+.5,q.push(A.x,A.y),g++}for(let Y=0;Y<i;Y++){let X=j+Y,D=C+Y;l===!0?h.push(D,D+1,X):h.push(D+1,D,X),L+=3}f.addGroup(c,L,l===!0?1:2),c+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var tn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),o=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),o+=n.distanceTo(i),t.push(o),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,o=n.length,s;t?s=t:s=e*n[o-1];let u=0,a=o-1,f;for(;u<=a;)if(i=Math.floor(u+(a-u)/2),f=n[i]-s,f<0)u=i+1;else if(f>0)a=i-1;else{a=i;break}if(i=a,n[i]===s)return i/(o-1);let h=n[i],m=n[i+1]-h,q=(s-h)/m;return(i+q)/(o-1)}getTangent(e,t){let i=e-1e-4,o=e+1e-4;i<0&&(i=0),o>1&&(o=1);let s=this.getPoint(i),u=this.getPoint(o),a=t||(s.isVector2?new se:new M);return a.copy(u).sub(s).normalize(),a}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new M,i=[],o=[],s=[],u=new M,a=new at;for(let q=0;q<=e;q++){let g=q/e;i[q]=this.getTangentAt(g,new M)}o[0]=new M,s[0]=new M;let f=Number.MAX_VALUE,h=Math.abs(i[0].x),p=Math.abs(i[0].y),m=Math.abs(i[0].z);h<=f&&(f=h,n.set(1,0,0)),p<=f&&(f=p,n.set(0,1,0)),m<=f&&n.set(0,0,1),u.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],u),s[0].crossVectors(i[0],o[0]);for(let q=1;q<=e;q++){if(o[q]=o[q-1].clone(),s[q]=s[q-1].clone(),u.crossVectors(i[q-1],i[q]),u.length()>Number.EPSILON){u.normalize();let g=Math.acos($e(i[q-1].dot(i[q]),-1,1));o[q].applyMatrix4(a.makeRotationAxis(u,g))}s[q].crossVectors(i[q],o[q])}if(t===!0){let q=Math.acos($e(o[0].dot(o[e]),-1,1));q/=e,i[0].dot(u.crossVectors(o[0],o[e]))>0&&(q=-q);for(let g=1;g<=e;g++)o[g].applyMatrix4(a.makeRotationAxis(i[g],q*g)),s[g].crossVectors(i[g],o[g])}return{tangents:i,normals:o,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Pi=class extends tn{constructor(e=0,t=0,n=1,i=1,o=0,s=Math.PI*2,u=!1,a=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=s,this.aClockwise=u,this.aRotation=a}getPoint(e,t=new se){let n=t,i=Math.PI*2,o=this.aEndAngle-this.aStartAngle,s=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(s?o=0:o=i),this.aClockwise===!0&&!s&&(o===i?o=-i:o=o-i);let u=this.aStartAngle+e*o,a=this.aX+this.xRadius*Math.cos(u),f=this.aY+this.yRadius*Math.sin(u);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=a-this.aX,q=f-this.aY;a=m*h-q*p+this.aX,f=m*p+q*h+this.aY}return n.set(a,f)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ws=class extends Pi{constructor(e,t,n,i,o,s){super(e,t,n,n,i,o,s),this.isArcCurve=!0,this.type="ArcCurve"}};function uf(){let r=0,e=0,t=0,n=0;function i(o,s,u,a){r=o,e=u,t=-3*o+3*s-2*u-a,n=2*o-2*s+u+a}return{initCatmullRom:function(o,s,u,a,f){i(s,u,f*(u-o),f*(a-s))},initNonuniformCatmullRom:function(o,s,u,a,f,h,p){let m=(s-o)/f-(u-o)/(f+h)+(u-s)/h,q=(u-s)/h-(a-s)/(h+p)+(a-u)/p;m*=h,q*=h,i(s,u,m,q)},calc:function(o){let s=o*o,u=s*o;return r+e*o+t*s+n*u}}}var Ks=new M,Oa=new uf,ja=new uf,Ia=new uf,lr=class extends tn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new M){let n=t,i=this.points,o=i.length,s=(o-(this.closed?0:1))*e,u=Math.floor(s),a=s-u;this.closed?u+=u>0?0:(Math.floor(Math.abs(u)/o)+1)*o:a===0&&u===o-1&&(u=o-2,a=1);let f,h;this.closed||u>0?f=i[(u-1)%o]:(Ks.subVectors(i[0],i[1]).add(i[0]),f=Ks);let p=i[u%o],m=i[(u+1)%o];if(this.closed||u+2<o?h=i[(u+2)%o]:(Ks.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){let q=this.curveType==="chordal"?.5:.25,g=Math.pow(f.distanceToSquared(p),q),v=Math.pow(p.distanceToSquared(m),q),y=Math.pow(m.distanceToSquared(h),q);v<1e-4&&(v=1),g<1e-4&&(g=v),y<1e-4&&(y=v),Oa.initNonuniformCatmullRom(f.x,p.x,m.x,h.x,g,v,y),ja.initNonuniformCatmullRom(f.y,p.y,m.y,h.y,g,v,y),Ia.initNonuniformCatmullRom(f.z,p.z,m.z,h.z,g,v,y)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(f.x,p.x,m.x,h.x,this.tension),ja.initCatmullRom(f.y,p.y,m.y,h.y,this.tension),Ia.initCatmullRom(f.z,p.z,m.z,h.z,this.tension));return n.set(Oa.calc(a),ja.calc(a),Ia.calc(a)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new M().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function dh(r,e,t,n,i){let o=(n-e)*.5,s=(i-t)*.5,u=r*r,a=r*u;return(2*t-2*n+o+s)*a+(-3*t+3*n-2*o-s)*u+o*r+t}function s7(r,e){let t=1-r;return t*t*e}function u7(r,e){return 2*(1-r)*r*e}function a7(r,e){return r*r*e}function so(r,e,t,n){return s7(r,e)+u7(r,t)+a7(r,n)}function f7(r,e){let t=1-r;return t*t*t*e}function h7(r,e){let t=1-r;return 3*t*t*r*e}function p7(r,e){return 3*(1-r)*r*r*e}function q7(r,e){return r*r*r*e}function uo(r,e,t,n,i){return f7(r,e)+h7(r,t)+p7(r,n)+q7(r,i)}var bo=class extends tn{constructor(e=new se,t=new se,n=new se,i=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new se){let n=t,i=this.v0,o=this.v1,s=this.v2,u=this.v3;return n.set(uo(e,i.x,o.x,s.x,u.x),uo(e,i.y,o.y,s.y,u.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ys=class extends tn{constructor(e=new M,t=new M,n=new M,i=new M){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new M){let n=t,i=this.v0,o=this.v1,s=this.v2,u=this.v3;return n.set(uo(e,i.x,o.x,s.x,u.x),uo(e,i.y,o.y,s.y,u.y),uo(e,i.z,o.z,s.z,u.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Oo=class extends tn{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Gs=class extends tn{constructor(e=new M,t=new M){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new M){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new M){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jo=class extends tn{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){let n=t,i=this.v0,o=this.v1,s=this.v2;return n.set(so(e,i.x,o.x,s.x),so(e,i.y,o.y,s.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Io=class extends tn{constructor(e=new M,t=new M,n=new M){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new M){let n=t,i=this.v0,o=this.v1,s=this.v2;return n.set(so(e,i.x,o.x,s.x),so(e,i.y,o.y,s.y),so(e,i.z,o.z,s.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ao=class extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let n=t,i=this.points,o=(i.length-1)*e,s=Math.floor(o),u=o-s,a=i[s===0?s:s-1],f=i[s],h=i[s>i.length-2?i.length-1:s+1],p=i[s>i.length-3?i.length-1:s+2];return n.set(dh(u,a.x,f.x,h.x,p.x),dh(u,a.y,f.y,h.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new se().fromArray(i))}return this}},Xs=Object.freeze({__proto__:null,ArcCurve:ws,CatmullRomCurve3:lr,CubicBezierCurve:bo,CubicBezierCurve3:Ys,EllipseCurve:Pi,LineCurve:Oo,LineCurve3:Gs,QuadraticBezierCurve:jo,QuadraticBezierCurve3:Io,SplineCurve:Ao}),Ds=class extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xs[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),o=0;for(;o<i.length;){if(i[o]>=n){let s=i[o]-n,u=this.curves[o],a=u.getLength(),f=a===0?0:1-s/a;return u.getPointAt(f,t)}o++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,o=this.curves;i<o.length;i++){let s=o[i],u=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,a=s.getPoints(u);for(let f=0;f<a.length;f++){let h=a[f];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Xs[i.type]().fromJSON(i))}return this}},$n=class extends Ds{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Oo(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let o=new jo(this.currentPoint.clone(),new se(e,t),new se(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,o,s){let u=new bo(this.currentPoint.clone(),new se(e,t),new se(n,i),new se(o,s));return this.curves.push(u),this.currentPoint.set(o,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ao(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,o,s){let u=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+u,t+a,n,i,o,s),this}absarc(e,t,n,i,o,s){return this.absellipse(e,t,n,n,i,o,s),this}ellipse(e,t,n,i,o,s,u,a){let f=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+f,t+h,n,i,o,s,u,a),this}absellipse(e,t,n,i,o,s,u,a){let f=new Pi(e,t,n,i,o,s,u,a);if(this.curves.length>0){let p=f.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(f);let h=f.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},er=class extends $n{constructor(e){super(e),this.uuid=Er(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new $n().fromJSON(i))}return this}};function m7(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,o=c6(r,0,i,t,!0),s=[];if(!o||o.next===o.prev)return s;let u,a,f;if(n&&(o=l7(r,e,o,t)),r.length>80*t){u=1/0,a=1/0;let h=-1/0,p=-1/0;for(let m=t;m<i;m+=t){let q=r[m],g=r[m+1];q<u&&(u=q),g<a&&(a=g),q>h&&(h=q),g>p&&(p=g)}f=Math.max(h-u,p-a),f=f!==0?32767/f:0}return Lo(o,s,t,u,a,f,0),s}function c6(r,e,t,n,i){let o;if(i===P7(r,e,t,n)>0)for(let s=e;s<t;s+=n)o=Hh(s/n|0,r[s],r[s+1],o);else for(let s=t-n;s>=e;s-=n)o=Hh(s/n|0,r[s],r[s+1],o);return o&&zi(o,o.next)&&(Po(o),o=o.next),o}function Tr(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(zi(t,t.next)||Ht(t.prev,t,t.next)===0)){if(Po(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Lo(r,e,t,n,i,o,s){if(!r)return;!s&&o&&O7(r,n,i,o);let u=r;for(;r.prev!==r.next;){let a=r.prev,f=r.next;if(o?y7(r,n,i,o):c7(r)){e.push(a.i,r.i,f.i),Po(r),r=f.next,u=f.next;continue}if(r=f,r===u){s?s===1?(r=g7(Tr(r),e),Lo(r,e,t,n,i,o,2)):s===2&&v7(r,e,t,n,i,o):Lo(Tr(r),e,t,n,i,o,1);break}}}function c7(r){let e=r.prev,t=r,n=r.next;if(Ht(e,t,n)>=0)return!1;let i=e.x,o=t.x,s=n.x,u=e.y,a=t.y,f=n.y,h=Math.min(i,o,s),p=Math.min(u,a,f),m=Math.max(i,o,s),q=Math.max(u,a,f),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=m&&g.y>=p&&g.y<=q&&ro(i,u,o,a,s,f,g.x,g.y)&&Ht(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function y7(r,e,t,n){let i=r.prev,o=r,s=r.next;if(Ht(i,o,s)>=0)return!1;let u=i.x,a=o.x,f=s.x,h=i.y,p=o.y,m=s.y,q=Math.min(u,a,f),g=Math.min(h,p,m),v=Math.max(u,a,f),y=Math.max(h,p,m),c=Sa(q,g,e,t,n),I=Sa(v,y,e,t,n),O=r.prevZ,l=r.nextZ;for(;O&&O.z>=c&&l&&l.z<=I;){if(O.x>=q&&O.x<=v&&O.y>=g&&O.y<=y&&O!==i&&O!==s&&ro(u,h,a,p,f,m,O.x,O.y)&&Ht(O.prev,O,O.next)>=0||(O=O.prevZ,l.x>=q&&l.x<=v&&l.y>=g&&l.y<=y&&l!==i&&l!==s&&ro(u,h,a,p,f,m,l.x,l.y)&&Ht(l.prev,l,l.next)>=0))return!1;l=l.nextZ}for(;O&&O.z>=c;){if(O.x>=q&&O.x<=v&&O.y>=g&&O.y<=y&&O!==i&&O!==s&&ro(u,h,a,p,f,m,O.x,O.y)&&Ht(O.prev,O,O.next)>=0)return!1;O=O.prevZ}for(;l&&l.z<=I;){if(l.x>=q&&l.x<=v&&l.y>=g&&l.y<=y&&l!==i&&l!==s&&ro(u,h,a,p,f,m,l.x,l.y)&&Ht(l.prev,l,l.next)>=0)return!1;l=l.nextZ}return!0}function g7(r,e){let t=r;do{let n=t.prev,i=t.next.next;!zi(n,i)&&g6(n,t,t.next,i)&&xo(n,i)&&xo(i,n)&&(e.push(n.i,t.i,i.i),Po(t),Po(t.next),t=r=i),t=t.next}while(t!==r);return Tr(t)}function v7(r,e,t,n,i,o){let s=r;do{let u=s.next.next;for(;u!==s.prev;){if(s.i!==u.i&&A7(s,u)){let a=v6(s,u);s=Tr(s,s.next),a=Tr(a,a.next),Lo(s,e,t,n,i,o,0),Lo(a,e,t,n,i,o,0);return}u=u.next}s=s.next}while(s!==r)}function l7(r,e,t,n){let i=[];for(let o=0,s=e.length;o<s;o++){let u=e[o]*n,a=o<s-1?e[o+1]*n:r.length,f=c6(r,u,a,n,!1);f===f.next&&(f.steiner=!0),i.push(I7(f))}i.sort(d7);for(let o=0;o<i.length;o++)t=H7(i[o],t);return t}function d7(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){let n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function H7(r,e){let t=K7(r,e);if(!t)return e;let n=v6(t,r);return Tr(n,n.next),Tr(t,t.next)}function K7(r,e){let t=e,n=r.x,i=r.y,o=-1/0,s;if(zi(r,t))return t;do{if(zi(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let p=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>o&&(o=p,s=t.x<t.next.x?t:t.next,p===n))return s}t=t.next}while(t!==e);if(!s)return null;let u=s,a=s.x,f=s.y,h=1/0;t=s;do{if(n>=t.x&&t.x>=a&&n!==t.x&&y6(i<f?n:o,i,a,f,i<f?o:n,i,t.x,t.y)){let p=Math.abs(i-t.y)/(n-t.x);xo(t,r)&&(p<h||p===h&&(t.x>s.x||t.x===s.x&&b7(s,t)))&&(s=t,h=p)}t=t.next}while(t!==u);return s}function b7(r,e){return Ht(r.prev,r,e.prev)<0&&Ht(e.next,r,r.next)<0}function O7(r,e,t,n){let i=r;do i.z===0&&(i.z=Sa(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,j7(i)}function j7(r){let e,t=1;do{let n=r,i;r=null;let o=null;for(e=0;n;){e++;let s=n,u=0;for(let f=0;f<t&&(u++,s=s.nextZ,!!s);f++);let a=t;for(;u>0||a>0&&s;)u!==0&&(a===0||!s||n.z<=s.z)?(i=n,n=n.nextZ,u--):(i=s,s=s.nextZ,a--),o?o.nextZ=i:r=i,i.prevZ=o,o=i;n=s}o.nextZ=null,t*=2}while(e>1);return r}function Sa(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function I7(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function y6(r,e,t,n,i,o,s,u){return(i-s)*(e-u)>=(r-s)*(o-u)&&(r-s)*(n-u)>=(t-s)*(e-u)&&(t-s)*(o-u)>=(i-s)*(n-u)}function ro(r,e,t,n,i,o,s,u){return!(r===s&&e===u)&&y6(r,e,t,n,i,o,s,u)}function A7(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!L7(r,e)&&(xo(r,e)&&xo(e,r)&&x7(r,e)&&(Ht(r.prev,r,e.prev)||Ht(r,e.prev,e))||zi(r,e)&&Ht(r.prev,r,r.next)>0&&Ht(e.prev,e,e.next)>0)}function Ht(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function zi(r,e){return r.x===e.x&&r.y===e.y}function g6(r,e,t,n){let i=Os(Ht(r,e,t)),o=Os(Ht(r,e,n)),s=Os(Ht(t,n,r)),u=Os(Ht(t,n,e));return!!(i!==o&&s!==u||i===0&&bs(r,t,e)||o===0&&bs(r,n,e)||s===0&&bs(t,r,n)||u===0&&bs(t,e,n))}function bs(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Os(r){return r>0?1:r<0?-1:0}function L7(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&g6(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function xo(r,e){return Ht(r.prev,r,r.next)<0?Ht(r,e,r.next)>=0&&Ht(r,r.prev,e)>=0:Ht(r,e,r.prev)<0||Ht(r,r.next,e)<0}function x7(r,e){let t=r,n=!1,i=(r.x+e.x)/2,o=(r.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&i<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function v6(r,e){let t=Ma(r.i,r.x,r.y),n=Ma(e.i,e.x,e.y),i=r.next,o=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function Hh(r,e,t,n){let i=Ma(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Po(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Ma(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function P7(r,e,t,n){let i=0;for(let o=e,s=t-n;o<t;o+=n)i+=(r[s]-r[o])*(r[o+1]+r[s+1]),s=o;return i}var wa=class{static triangulate(e,t,n=2){return m7(e,t,n)}},wr=class r{static area(e){let t=e.length,n=0;for(let i=t-1,o=0;o<t;i=o++)n+=e[i].x*e[o].y-e[o].x*e[i].y;return n*.5}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],o=[];Kh(e),bh(n,e);let s=e.length;t.forEach(Kh);for(let a=0;a<t.length;a++)i.push(s),s+=t[a].length,bh(n,t[a]);let u=wa.triangulate(n,i);for(let a=0;a<u.length;a+=3)o.push(u.slice(a,a+3));return o}};function Kh(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function bh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var dr=class r extends Xt{constructor(e=new er([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],o=[];for(let u=0,a=e.length;u<a;u++){let f=e[u];s(f)}this.setAttribute("position",new gt(i,3)),this.setAttribute("uv",new gt(o,2)),this.computeVertexNormals();function s(u){let a=[],f=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,m=t.bevelEnabled!==void 0?t.bevelEnabled:!0,q=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:q-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,y=t.bevelSegments!==void 0?t.bevelSegments:3,c=t.extrudePath,I=t.UVGenerator!==void 0?t.UVGenerator:z7,O,l=!1,j,A,P,L;c&&(O=c.getSpacedPoints(h),l=!0,m=!1,j=c.computeFrenetFrames(h,!1),A=new M,P=new M,L=new M),m||(y=0,q=0,g=0,v=0);let K=u.extractPoints(f),H=K.shape,C=K.holes;if(!wr.isClockWise(H)){H=H.reverse();for(let ie=0,ee=C.length;ie<ee;ie++){let $=C[ie];wr.isClockWise($)&&(C[ie]=$.reverse())}}function X(ie){let $=10000000000000001e-36,Q=ie[0];for(let ye=1;ye<=ie.length;ye++){let he=ye%ie.length,ge=ie[he],Ee=ge.x-Q.x,Te=ge.y-Q.y,x=Ee*Ee+Te*Te,d=Math.max(Math.abs(ge.x),Math.abs(ge.y),Math.abs(Q.x),Math.abs(Q.y)),W=$*d*d;if(x<=W){ie.splice(he,1),ye--;continue}Q=ge}}X(H),C.forEach(X);let D=C.length,w=H;for(let ie=0;ie<D;ie++){let ee=C[ie];H=H.concat(ee)}function N(ie,ee,$){return ee||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(ee,$)}let U=H.length;function B(ie,ee,$){let Q,ye,he,ge=ie.x-ee.x,Ee=ie.y-ee.y,Te=$.x-ie.x,x=$.y-ie.y,d=ge*ge+Ee*Ee,W=ge*x-Ee*Te;if(Math.abs(W)>Number.EPSILON){let R=Math.sqrt(d),oe=Math.sqrt(Te*Te+x*x),V=ee.x-Ee/R,Ye=ee.y+ge/R,me=$.x-x/oe,Le=$.y+Te/oe,xe=((me-V)*x-(Le-Ye)*Te)/(ge*x-Ee*Te);Q=V+ge*xe-ie.x,ye=Ye+Ee*xe-ie.y;let ue=Q*Q+ye*ye;if(ue<=2)return new se(Q,ye);he=Math.sqrt(ue/2)}else{let R=!1;ge>Number.EPSILON?Te>Number.EPSILON&&(R=!0):ge<-Number.EPSILON?Te<-Number.EPSILON&&(R=!0):Math.sign(Ee)===Math.sign(x)&&(R=!0),R?(Q=-Ee,ye=ge,he=Math.sqrt(d)):(Q=ge,ye=Ee,he=Math.sqrt(d/2))}return new se(Q/he,ye/he)}let ce=[];for(let ie=0,ee=w.length,$=ee-1,Q=ie+1;ie<ee;ie++,$++,Q++)$===ee&&($=0),Q===ee&&(Q=0),ce[ie]=B(w[ie],w[$],w[Q]);let ve=[],de,We=ce.concat();for(let ie=0,ee=D;ie<ee;ie++){let $=C[ie];de=[];for(let Q=0,ye=$.length,he=ye-1,ge=Q+1;Q<ye;Q++,he++,ge++)he===ye&&(he=0),ge===ye&&(ge=0),de[Q]=B($[Q],$[he],$[ge]);ve.push(de),We=We.concat(de)}let Ne;if(y===0)Ne=wr.triangulateShape(w,C);else{let ie=[],ee=[];for(let $=0;$<y;$++){let Q=$/y,ye=q*Math.cos(Q*Math.PI/2),he=g*Math.sin(Q*Math.PI/2)+v;for(let ge=0,Ee=w.length;ge<Ee;ge++){let Te=N(w[ge],ce[ge],he);Se(Te.x,Te.y,-ye),Q===0&&ie.push(Te)}for(let ge=0,Ee=D;ge<Ee;ge++){let Te=C[ge];de=ve[ge];let x=[];for(let d=0,W=Te.length;d<W;d++){let R=N(Te[d],de[d],he);Se(R.x,R.y,-ye),Q===0&&x.push(R)}Q===0&&ee.push(x)}}Ne=wr.triangulateShape(ie,ee)}let _e=Ne.length,Ve=g+v;for(let ie=0;ie<U;ie++){let ee=m?N(H[ie],We[ie],Ve):H[ie];l?(P.copy(j.normals[0]).multiplyScalar(ee.x),A.copy(j.binormals[0]).multiplyScalar(ee.y),L.copy(O[0]).add(P).add(A),Se(L.x,L.y,L.z)):Se(ee.x,ee.y,0)}for(let ie=1;ie<=h;ie++)for(let ee=0;ee<U;ee++){let $=m?N(H[ee],We[ee],Ve):H[ee];l?(P.copy(j.normals[ie]).multiplyScalar($.x),A.copy(j.binormals[ie]).multiplyScalar($.y),L.copy(O[ie]).add(P).add(A),Se(L.x,L.y,L.z)):Se($.x,$.y,p/h*ie)}for(let ie=y-1;ie>=0;ie--){let ee=ie/y,$=q*Math.cos(ee*Math.PI/2),Q=g*Math.sin(ee*Math.PI/2)+v;for(let ye=0,he=w.length;ye<he;ye++){let ge=N(w[ye],ce[ye],Q);Se(ge.x,ge.y,p+$)}for(let ye=0,he=C.length;ye<he;ye++){let ge=C[ye];de=ve[ye];for(let Ee=0,Te=ge.length;Ee<Te;Ee++){let x=N(ge[Ee],de[Ee],Q);l?Se(x.x,x.y+O[h-1].y,O[h-1].x+$):Se(x.x,x.y,p+$)}}}_(),re();function _(){let ie=i.length/3;if(m){let ee=0,$=U*ee;for(let Q=0;Q<_e;Q++){let ye=Ne[Q];we(ye[2]+$,ye[1]+$,ye[0]+$)}ee=h+y*2,$=U*ee;for(let Q=0;Q<_e;Q++){let ye=Ne[Q];we(ye[0]+$,ye[1]+$,ye[2]+$)}}else{for(let ee=0;ee<_e;ee++){let $=Ne[ee];we($[2],$[1],$[0])}for(let ee=0;ee<_e;ee++){let $=Ne[ee];we($[0]+U*h,$[1]+U*h,$[2]+U*h)}}n.addGroup(ie,i.length/3-ie,0)}function re(){let ie=i.length/3,ee=0;je(w,ee),ee+=w.length;for(let $=0,Q=C.length;$<Q;$++){let ye=C[$];je(ye,ee),ee+=ye.length}n.addGroup(ie,i.length/3-ie,1)}function je(ie,ee){let $=ie.length;for(;--$>=0;){let Q=$,ye=$-1;ye<0&&(ye=ie.length-1);for(let he=0,ge=h+y*2;he<ge;he++){let Ee=U*he,Te=U*(he+1),x=ee+Q+Ee,d=ee+ye+Ee,W=ee+ye+Te,R=ee+Q+Te;tt(x,d,W,R)}}}function Se(ie,ee,$){a.push(ie),a.push(ee),a.push($)}function we(ie,ee,$){ht(ie),ht(ee),ht($);let Q=i.length/3,ye=I.generateTopUV(n,i,Q-3,Q-2,Q-1);S(ye[0]),S(ye[1]),S(ye[2])}function tt(ie,ee,$,Q){ht(ie),ht(ee),ht(Q),ht(ee),ht($),ht(Q);let ye=i.length/3,he=I.generateSideWallUV(n,i,ye-6,ye-3,ye-2,ye-1);S(he[0]),S(he[1]),S(he[3]),S(he[1]),S(he[2]),S(he[3])}function ht(ie){i.push(a[ie*3+0]),i.push(a[ie*3+1]),i.push(a[ie*3+2])}function S(ie){o.push(ie.x),o.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return C7(t,n,e)}static fromJSON(e,t){let n=[];for(let o=0,s=e.shapes.length;o<s;o++){let u=t[e.shapes[o]];n.push(u)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Xs[i.type]().fromJSON(i)),new r(n,e.options)}},z7={generateTopUV:function(r,e,t,n,i){let o=e[t*3],s=e[t*3+1],u=e[n*3],a=e[n*3+1],f=e[i*3],h=e[i*3+1];return[new se(o,s),new se(u,a),new se(f,h)]},generateSideWallUV:function(r,e,t,n,i,o){let s=e[t*3],u=e[t*3+1],a=e[t*3+2],f=e[n*3],h=e[n*3+1],p=e[n*3+2],m=e[i*3],q=e[i*3+1],g=e[i*3+2],v=e[o*3],y=e[o*3+1],c=e[o*3+2];return Math.abs(u-h)<Math.abs(s-f)?[new se(s,1-a),new se(f,1-p),new se(m,1-g),new se(v,1-c)]:[new se(u,1-a),new se(h,1-p),new se(q,1-g),new se(y,1-c)]}};function C7(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){let o=r[n];t.shapes.push(o.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var zo=class r extends Xt{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=$e(i,0,Math.PI*2);let o=[],s=[],u=[],a=[],f=[],h=1/t,p=new M,m=new se,q=new M,g=new M,v=new M,y=0,c=0;for(let I=0;I<=e.length-1;I++)switch(I){case 0:y=e[I+1].x-e[I].x,c=e[I+1].y-e[I].y,q.x=c*1,q.y=-y,q.z=c*0,v.copy(q),q.normalize(),a.push(q.x,q.y,q.z);break;case e.length-1:a.push(v.x,v.y,v.z);break;default:y=e[I+1].x-e[I].x,c=e[I+1].y-e[I].y,q.x=c*1,q.y=-y,q.z=c*0,g.copy(q),q.x+=v.x,q.y+=v.y,q.z+=v.z,q.normalize(),a.push(q.x,q.y,q.z),v.copy(g)}for(let I=0;I<=t;I++){let O=n+I*h*i,l=Math.sin(O),j=Math.cos(O);for(let A=0;A<=e.length-1;A++){p.x=e[A].x*l,p.y=e[A].y,p.z=e[A].x*j,s.push(p.x,p.y,p.z),m.x=I/t,m.y=A/(e.length-1),u.push(m.x,m.y);let P=a[3*A+0]*l,L=a[3*A+1],K=a[3*A+0]*j;f.push(P,L,K)}}for(let I=0;I<t;I++)for(let O=0;O<e.length-1;O++){let l=O+I*e.length,j=l,A=l+e.length,P=l+e.length+1,L=l+1;o.push(j,A,L),o.push(P,L,A)}this.setIndex(o),this.setAttribute("position",new gt(s,3)),this.setAttribute("uv",new gt(u,2)),this.setAttribute("normal",new gt(f,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}};var nn=class r extends Xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let o=e/2,s=t/2,u=Math.floor(n),a=Math.floor(i),f=u+1,h=a+1,p=e/u,m=t/a,q=[],g=[],v=[],y=[];for(let c=0;c<h;c++){let I=c*m-s;for(let O=0;O<f;O++){let l=O*p-o;g.push(l,-I,0),v.push(0,0,1),y.push(O/u),y.push(1-c/a)}}for(let c=0;c<a;c++)for(let I=0;I<u;I++){let O=I+f*c,l=I+f*(c+1),j=I+1+f*(c+1),A=I+1+f*c;q.push(O,l,A),q.push(l,j,A)}this.setIndex(q),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(v,3)),this.setAttribute("uv",new gt(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Co=class r extends Xt{constructor(e=.5,t=1,n=32,i=1,o=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:o,thetaLength:s},n=Math.max(3,n),i=Math.max(1,i);let u=[],a=[],f=[],h=[],p=e,m=(t-e)/i,q=new M,g=new se;for(let v=0;v<=i;v++){for(let y=0;y<=n;y++){let c=o+y/n*s;q.x=p*Math.cos(c),q.y=p*Math.sin(c),a.push(q.x,q.y,q.z),f.push(0,0,1),g.x=(q.x/t+1)/2,g.y=(q.y/t+1)/2,h.push(g.x,g.y)}p+=m}for(let v=0;v<i;v++){let y=v*(n+1);for(let c=0;c<n;c++){let I=c+y,O=I,l=I+n+1,j=I+n+2,A=I+1;u.push(O,l,A),u.push(l,j,A)}}this.setIndex(u),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Wr=class r extends Xt{constructor(e=new Io(new M(-1,-1,0),new M(-1,1,0),new M(1,1,0)),t=64,n=1,i=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:o};let s=e.computeFrenetFrames(t,o);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let u=new M,a=new M,f=new se,h=new M,p=[],m=[],q=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new gt(p,3)),this.setAttribute("normal",new gt(m,3)),this.setAttribute("uv",new gt(q,2));function v(){for(let O=0;O<t;O++)y(O);y(o===!1?t:0),I(),c()}function y(O){h=e.getPointAt(O/t,h);let l=s.normals[O],j=s.binormals[O];for(let A=0;A<=i;A++){let P=A/i*Math.PI*2,L=Math.sin(P),K=-Math.cos(P);a.x=K*l.x+L*j.x,a.y=K*l.y+L*j.y,a.z=K*l.z+L*j.z,a.normalize(),m.push(a.x,a.y,a.z),u.x=h.x+n*a.x,u.y=h.y+n*a.y,u.z=h.z+n*a.z,p.push(u.x,u.y,u.z)}}function c(){for(let O=1;O<=t;O++)for(let l=1;l<=i;l++){let j=(i+1)*(O-1)+(l-1),A=(i+1)*O+(l-1),P=(i+1)*O+l,L=(i+1)*(O-1)+l;g.push(j,A,L),g.push(A,P,L)}}function I(){for(let O=0;O<=t;O++)for(let l=0;l<=i;l++)f.x=O/t,f.y=l/i,q.push(f.x,f.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new Xs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var lt=class extends _n{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ef,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ln=class extends lt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Js=class extends _n{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t6,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ts=class extends _n{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var So=class extends Dr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function js(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function S7(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var kr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],o=t[n-1];n:{e:{let s;t:{r:if(!(e<i)){for(let u=n+2;;){if(i===void 0){if(e<o)break r;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===u)break;if(o=i,i=t[++n],e<i)break e}s=t.length;break t}if(!(e>=o)){let u=t[1];e<u&&(n=2,o=u);for(let a=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){let u=n+s>>>1;e<t[u]?s=u:n=u+1}if(i=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,i)}return this.interpolate_(n,o,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=e*i;for(let s=0;s!==i;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ws=class extends kr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:La,endingEnd:La}}intervalChanged_(e,t,n){let i=this.parameterPositions,o=e-2,s=e+1,u=i[o],a=i[s];if(u===void 0)switch(this.getSettings_().endingStart){case xa:o=e,u=2*t-n;break;case Pa:o=i.length-2,u=t+i[o]-i[o+1];break;default:o=e,u=n}if(a===void 0)switch(this.getSettings_().endingEnd){case xa:s=e,a=2*n-t;break;case Pa:s=1,a=n+i[1]-i[0];break;default:s=e-1,a=t}let f=(n-t)*.5,h=this.valueSize;this._weightPrev=f/(t-u),this._weightNext=f/(a-n),this._offsetPrev=o*h,this._offsetNext=s*h}interpolate_(e,t,n,i){let o=this.resultBuffer,s=this.sampleValues,u=this.valueSize,a=e*u,f=a-u,h=this._offsetPrev,p=this._offsetNext,m=this._weightPrev,q=this._weightNext,g=(n-t)/(i-t),v=g*g,y=v*g,c=-m*y+2*m*v-m*g,I=(1+m)*y+(-1.5-2*m)*v+(-.5+m)*g+1,O=(-1-q)*y+(1.5+q)*v+.5*g,l=q*y-q*v;for(let j=0;j!==u;++j)o[j]=c*s[h+j]+I*s[f+j]+O*s[a+j]+l*s[p+j];return o}},ks=class extends kr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let o=this.resultBuffer,s=this.sampleValues,u=this.valueSize,a=e*u,f=a-u,h=(n-t)/(i-t),p=1-h;for(let m=0;m!==u;++m)o[m]=s[f+m]*p+s[a+m]*h;return o}},Ns=class extends kr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},rn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=js(t,this.TimeBufferType),this.values=js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:js(e.times,Array),values:js(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ns(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ks(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ws(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Xr:t=this.InterpolantFactoryMethodDiscrete;break;case Ki:t=this.InterpolantFactoryMethodLinear;break;case Is:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xr;case this.InterpolantFactoryMethodLinear:return Ki;case this.InterpolantFactoryMethodSmooth:return Is}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,o=0,s=i-1;for(;o!==i&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==i){o>=s&&(s=Math.max(s,1),o=s-1);let u=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*u,s*u)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let u=0;u!==o;u++){let a=n[u];if(typeof a=="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,u,a),e=!1;break}if(s!==null&&s>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,u,a,s),e=!1;break}s=a}if(i!==void 0&&S7(i))for(let u=0,a=i.length;u!==a;++u){let f=i[u];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,u,f),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Is,o=e.length-1,s=1;for(let u=1;u<o;++u){let a=!1,f=e[u],h=e[u+1];if(f!==h&&(u!==1||f!==e[0]))if(i)a=!0;else{let p=u*n,m=p-n,q=p+n;for(let g=0;g!==n;++g){let v=t[p+g];if(v!==t[m+g]||v!==t[q+g]){a=!0;break}}}if(a){if(u!==s){e[s]=e[u];let p=u*n,m=s*n;for(let q=0;q!==n;++q)t[m+q]=t[p+q]}++s}}if(o>0){e[s]=e[o];for(let u=o*n,a=s*n,f=0;f!==n;++f)t[a+f]=t[u+f];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};rn.prototype.ValueTypeName="";rn.prototype.TimeBufferType=Float32Array;rn.prototype.ValueBufferType=Float32Array;rn.prototype.DefaultInterpolation=Ki;var Hr=class extends rn{constructor(e,t,n){super(e,t,n)}};Hr.prototype.ValueTypeName="bool";Hr.prototype.ValueBufferType=Array;Hr.prototype.DefaultInterpolation=Xr;Hr.prototype.InterpolantFactoryMethodLinear=void 0;Hr.prototype.InterpolantFactoryMethodSmooth=void 0;var Zs=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}};Zs.prototype.ValueTypeName="color";var Bs=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}};Bs.prototype.ValueTypeName="number";var Es=class extends kr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let o=this.resultBuffer,s=this.sampleValues,u=this.valueSize,a=(n-t)/(i-t),f=e*u;for(let h=f+u;f!==h;f+=4)Bt.slerpFlat(o,0,s,f-u,s,f,a);return o}},Mo=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Es(this.times,this.values,this.getValueSize(),e)}};Mo.prototype.ValueTypeName="quaternion";Mo.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends rn{constructor(e,t,n){super(e,t,n)}};Kr.prototype.ValueTypeName="string";Kr.prototype.ValueBufferType=Array;Kr.prototype.DefaultInterpolation=Xr;Kr.prototype.InterpolantFactoryMethodLinear=void 0;Kr.prototype.InterpolantFactoryMethodSmooth=void 0;var Fs=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}};Fs.prototype.ValueTypeName="vector";var li={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Rs=class{constructor(e,t,n){let i=this,o=!1,s=0,u=0,a,f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){u++,o===!1&&i.onStart!==void 0&&i.onStart(h,s,u),o=!0},this.itemEnd=function(h){s++,i.onProgress!==void 0&&i.onProgress(h,s,u),s===u&&(o=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return a?a(h):h},this.setURLModifier=function(h){return a=h,this},this.addHandler=function(h,p){return f.push(h,p),this},this.removeHandler=function(h){let p=f.indexOf(h);return p!==-1&&f.splice(p,2),this},this.getHandler=function(h){for(let p=0,m=f.length;p<m;p+=2){let q=f[p],g=f[p+1];if(q.global&&(q.lastIndex=0),q.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},l6=new Rs,br=class{constructor(e){this.manager=e!==void 0?e:l6,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,o){n.load(e,i,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};br.DEFAULT_MATERIAL_NAME="__DEFAULT";var En={},Ya=class extends Error{constructor(e,t){super(e),this.response=t}},Vs=class extends br{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=li.get(`file:${e}`);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(En[e]!==void 0){En[e].push({onLoad:t,onProgress:n,onError:i});return}En[e]=[],En[e].push({onLoad:t,onProgress:n,onError:i});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),u=this.mimeType,a=this.responseType;fetch(s).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;let h=En[e],p=f.body.getReader(),m=f.headers.get("X-File-Size")||f.headers.get("Content-Length"),q=m?parseInt(m):0,g=q!==0,v=0,y=new ReadableStream({start(c){I();function I(){p.read().then(({done:O,value:l})=>{if(O)c.close();else{v+=l.byteLength;let j=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:q});for(let A=0,P=h.length;A<P;A++){let L=h[A];L.onProgress&&L.onProgress(j)}c.enqueue(l),I()}},O=>{c.error(O)})}}});return new Response(y)}else throw new Ya(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(a){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(h=>new DOMParser().parseFromString(h,u));case"json":return f.json();default:if(u==="")return f.text();{let p=/charset="?([^;"\s]*)"?/i.exec(u),m=p&&p[1]?p[1].toLowerCase():void 0,q=new TextDecoder(m);return f.arrayBuffer().then(g=>q.decode(g))}}}).then(f=>{li.add(`file:${e}`,f);let h=En[e];delete En[e];for(let p=0,m=h.length;p<m;p++){let q=h[p];q.onLoad&&q.onLoad(f)}}).catch(f=>{let h=En[e];if(h===void 0)throw this.manager.itemError(e),f;delete En[e];for(let p=0,m=h.length;p<m;p++){let q=h[p];q.onError&&q.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var yi=new WeakMap,Us=class extends br{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=li.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0);else{let p=yi.get(s);p===void 0&&(p=[],yi.set(s,p)),p.push({onLoad:t,onError:i})}return s}let u=Oi("img");function a(){h(),t&&t(this);let p=yi.get(this)||[];for(let m=0;m<p.length;m++){let q=p[m];q.onLoad&&q.onLoad(this)}yi.delete(this),o.manager.itemEnd(e)}function f(p){h(),i&&i(p),li.remove(`image:${e}`);let m=yi.get(this)||[];for(let q=0;q<m.length;q++){let g=m[q];g.onError&&g.onError(p)}yi.delete(this),o.manager.itemError(e),o.manager.itemEnd(e)}function h(){u.removeEventListener("load",a,!1),u.removeEventListener("error",f,!1)}return u.addEventListener("load",a,!1),u.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(u.crossOrigin=this.crossOrigin),li.add(`image:${e}`,u),o.manager.itemStart(e),u.src=e,u}};var wo=class extends br{constructor(e){super(e)}load(e,t,n,i){let o=this,s=new yo,u=new Vs(this.manager);return u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setPath(this.path),u.setWithCredentials(o.withCredentials),u.load(e,function(a){let f;try{f=o.parse(a)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}f.image!==void 0?s.image=f.image:f.data!==void 0&&(s.image.width=f.width,s.image.height=f.height,s.image.data=f.data),s.wrapS=f.wrapS!==void 0?f.wrapS:yn,s.wrapT=f.wrapT!==void 0?f.wrapT:yn,s.magFilter=f.magFilter!==void 0?f.magFilter:It,s.minFilter=f.minFilter!==void 0?f.minFilter:It,s.anisotropy=f.anisotropy!==void 0?f.anisotropy:1,f.colorSpace!==void 0&&(s.colorSpace=f.colorSpace),f.flipY!==void 0&&(s.flipY=f.flipY),f.format!==void 0&&(s.format=f.format),f.type!==void 0&&(s.type=f.type),f.mipmaps!==void 0&&(s.mipmaps=f.mipmaps,s.minFilter=on),f.mipmapCount===1&&(s.minFilter=It),f.generateMipmaps!==void 0&&(s.generateMipmaps=f.generateMipmaps),s.needsUpdate=!0,t&&t(s,f)},n,i),s}},Yo=class extends br{constructor(e){super(e)}load(e,t,n,i){let o=new St,s=new Us(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(u){o.image=u,o.needsUpdate=!0,t!==void 0&&t(o)},n,i),o}},Ci=class extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Go=class extends Ci{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Aa=new at,Oh=new M,jh=new M,Ga=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xi,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oh),jh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jh),t.updateMatrixWorld(),Aa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Aa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Aa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Xo=class extends mo{constructor(e=-1,t=1,n=1,i=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,o=n-e,s=n+e,u=i+t,a=i-t;if(this.view!==null&&this.view.enabled){let f=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,s=o+f*this.view.width,u-=h*this.view.offsetY,a=u-h*this.view.height}this.projectionMatrix.makeOrthographic(o,s,u,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Xa=class extends Ga{constructor(){super(new Xo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Si=class extends Ci{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Xa}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Do=class extends Ci{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Qs=class extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var af="\\[\\]\\.:\\/",M7=new RegExp("["+af+"]","g"),ff="[^"+af+"]",w7="[^"+af.replace("\\.","")+"]",Y7=/((?:WC+[\/:])*)/.source.replace("WC",ff),G7=/(WCOD+)?/.source.replace("WCOD",w7),X7=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ff),D7=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ff),J7=new RegExp("^"+Y7+G7+X7+D7+"$"),T7=["material","materials","bones","map"],Da=class{constructor(e,t,n){let i=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,o=n.length;i!==o;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},pt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(M7,"")}static parseTrackName(e){let t=J7.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let o=n.nodeName.substring(i+1);T7.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(o){for(let s=0;s<o.length;s++){let u=o[s];if(u.name===t||u.uuid===t)return u;let a=n(u.children);if(a)return a}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,o=n.length;i!==o;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,o=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let f=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===f){f=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}let s=e[i];if(s===void 0){let f=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+i+" but it wasn't found.",e);return}let u=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?u=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(u=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(o!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}a=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(a=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][u]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pt.Composite=Da;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var U3=new Float32Array(1);var Ih=new at,Jo=class{constructor(e,t,n=0,i=1/0){this.ray=new yr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ai,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ih.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ih),this}intersectObject(e,t=!0,n=[]){return Ja(e,this,n,t),n.sort(Ah),n}intersectObjects(e,t=!0,n=[]){for(let i=0,o=e.length;i<o;i++)Ja(e[i],this,n,t);return n.sort(Ah),n}};function Ah(r,e){return r.distance-e.distance}function Ja(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let o=r.children;for(let s=0,u=o.length;s<u;s++)Ja(o[s],e,t,!0)}}var Mi=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=$e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos($e(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var To=class extends Cn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function hf(r,e,t,n){let i=W7(n);switch(t){case Qa:return r*e;case qu:return r*e/i.components*i.byteLength;case mu:return r*e/i.components*i.byteLength;case $a:return r*e*2/i.components*i.byteLength;case cu:return r*e*2/i.components*i.byteLength;case _a:return r*e*3/i.components*i.byteLength;case Ft:return r*e*4/i.components*i.byteLength;case yu:return r*e*4/i.components*i.byteLength;case ko:case No:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Zo:case Bo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case vu:case du:return Math.max(r,16)*Math.max(e,8)/4;case gu:case lu:return Math.max(r,8)*Math.max(e,8)/2;case Hu:case Ku:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case bu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ou:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ju:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Iu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Au:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Lu:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case xu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Pu:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case zu:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Cu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Su:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Mu:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case wu:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Yu:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Gu:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Xu:case Du:case Ju:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Tu:case Wu:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ku:case Nu:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function W7(r){switch(r){case Pn:case Fa:return{byteLength:1,components:1};case Gi:case Ra:case sn:return{byteLength:2,components:1};case hu:case pu:return{byteLength:2,components:4};case Ir:case fu:case kt:return{byteLength:4,components:1};case Va:case Ua:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function k6(){let r=null,e=!1,t=null,n=null;function i(o,s){t(o,s),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function k7(r){let e=new WeakMap;function t(u,a){let f=u.array,h=u.usage,p=f.byteLength,m=r.createBuffer();r.bindBuffer(a,m),r.bufferData(a,f,h),u.onUploadCallback();let q;if(f instanceof Float32Array)q=r.FLOAT;else if(typeof Float16Array<"u"&&f instanceof Float16Array)q=r.HALF_FLOAT;else if(f instanceof Uint16Array)u.isFloat16BufferAttribute?q=r.HALF_FLOAT:q=r.UNSIGNED_SHORT;else if(f instanceof Int16Array)q=r.SHORT;else if(f instanceof Uint32Array)q=r.UNSIGNED_INT;else if(f instanceof Int32Array)q=r.INT;else if(f instanceof Int8Array)q=r.BYTE;else if(f instanceof Uint8Array)q=r.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)q=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:q,bytesPerElement:f.BYTES_PER_ELEMENT,version:u.version,size:p}}function n(u,a,f){let h=a.array,p=a.updateRanges;if(r.bindBuffer(f,u),p.length===0)r.bufferSubData(f,0,h);else{p.sort((q,g)=>q.start-g.start);let m=0;for(let q=1;q<p.length;q++){let g=p[m],v=p[q];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++m,p[m]=v)}p.length=m+1;for(let q=0,g=p.length;q<g;q++){let v=p[q];r.bufferSubData(f,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}a.clearUpdateRanges()}a.onUploadCallback()}function i(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function o(u){u.isInterleavedBufferAttribute&&(u=u.data);let a=e.get(u);a&&(r.deleteBuffer(a.buffer),e.delete(u))}function s(u,a){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){let h=e.get(u);(!h||h.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}let f=e.get(u);if(f===void 0)e.set(u,t(u,a));else if(f.version<u.version){if(f.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(f.buffer,u,a),f.version=u.version}}return{get:i,remove:o,update:s}}var N7=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Z7=`#ifdef USE_ALPHAHASH
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
#endif`,B7=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,E7=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F7=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,R7=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,V7=`#ifdef USE_AOMAP
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
#endif`,U7=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q7=`#ifdef USE_BATCHING
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
#endif`,_7=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$7=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eq=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tq=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,nq=`#ifdef USE_IRIDESCENCE
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
#endif`,rq=`#ifdef USE_BUMPMAP
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
#endif`,iq=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,oq=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sq=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uq=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aq=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fq=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hq=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pq=`#if defined( USE_COLOR_ALPHA )
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
#endif`,qq=`#define PI 3.141592653589793
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
} // validated`,mq=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cq=`vec3 transformedNormal = objectNormal;
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
#endif`,yq=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gq=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vq=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lq=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dq="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hq=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kq=`#ifdef USE_ENVMAP
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
#endif`,bq=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Oq=`#ifdef USE_ENVMAP
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
#endif`,jq=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Iq=`#ifdef USE_ENVMAP
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
#endif`,Aq=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lq=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xq=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pq=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zq=`#ifdef USE_GRADIENTMAP
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
}`,Cq=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sq=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mq=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wq=`uniform bool receiveShadow;
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
#endif`,Yq=`#ifdef USE_ENVMAP
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
#endif`,Gq=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xq=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dq=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jq=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tq=`PhysicalMaterial material;
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
#endif`,Wq=`struct PhysicalMaterial {
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
}`,kq=`
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
#endif`,Nq=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zq=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Eq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vq=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uq=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qq=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_q=`#if defined( USE_POINTS_UV )
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
#endif`,$q=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,em=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,im=`#ifdef USE_MORPHTARGETS
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
#endif`,om=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pm=`#ifdef USE_NORMALMAP
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
#endif`,qm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Om=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lm=`float getShadowMask() {
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
}`,xm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pm=`#ifdef USE_SKINNING
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
#endif`,zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cm=`#ifdef USE_SKINNING
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
#endif`,Sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ym=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Xm=`#ifdef USE_TRANSMISSION
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
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`#include <common>
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
}`,Vm=`#if DEPTH_PACKING == 3200
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
}`,Um=`#define DISTANCE
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
}`,Qm=`#define DISTANCE
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
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$m=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ec=`uniform float scale;
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
}`,tc=`uniform vec3 diffuse;
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
}`,nc=`#include <common>
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
}`,rc=`uniform vec3 diffuse;
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
}`,ic=`#define LAMBERT
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
}`,oc=`#define LAMBERT
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
}`,sc=`#define MATCAP
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
}`,uc=`#define MATCAP
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
}`,ac=`#define NORMAL
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
}`,fc=`#define NORMAL
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
}`,hc=`#define PHONG
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
}`,pc=`#define PHONG
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
}`,qc=`#define STANDARD
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
}`,mc=`#define STANDARD
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
}`,cc=`#define TOON
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
}`,yc=`#define TOON
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
}`,gc=`uniform float size;
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
}`,vc=`uniform vec3 diffuse;
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
}`,lc=`#include <common>
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
}`,dc=`uniform vec3 color;
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
}`,Hc=`uniform float rotation;
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
}`,Kc=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:N7,alphahash_pars_fragment:Z7,alphamap_fragment:B7,alphamap_pars_fragment:E7,alphatest_fragment:F7,alphatest_pars_fragment:R7,aomap_fragment:V7,aomap_pars_fragment:U7,batching_pars_vertex:Q7,batching_vertex:_7,begin_vertex:$7,beginnormal_vertex:eq,bsdfs:tq,iridescence_fragment:nq,bumpmap_pars_fragment:rq,clipping_planes_fragment:iq,clipping_planes_pars_fragment:oq,clipping_planes_pars_vertex:sq,clipping_planes_vertex:uq,color_fragment:aq,color_pars_fragment:fq,color_pars_vertex:hq,color_vertex:pq,common:qq,cube_uv_reflection_fragment:mq,defaultnormal_vertex:cq,displacementmap_pars_vertex:yq,displacementmap_vertex:gq,emissivemap_fragment:vq,emissivemap_pars_fragment:lq,colorspace_fragment:dq,colorspace_pars_fragment:Hq,envmap_fragment:Kq,envmap_common_pars_fragment:bq,envmap_pars_fragment:Oq,envmap_pars_vertex:jq,envmap_physical_pars_fragment:Yq,envmap_vertex:Iq,fog_vertex:Aq,fog_pars_vertex:Lq,fog_fragment:xq,fog_pars_fragment:Pq,gradientmap_pars_fragment:zq,lightmap_pars_fragment:Cq,lights_lambert_fragment:Sq,lights_lambert_pars_fragment:Mq,lights_pars_begin:wq,lights_toon_fragment:Gq,lights_toon_pars_fragment:Xq,lights_phong_fragment:Dq,lights_phong_pars_fragment:Jq,lights_physical_fragment:Tq,lights_physical_pars_fragment:Wq,lights_fragment_begin:kq,lights_fragment_maps:Nq,lights_fragment_end:Zq,logdepthbuf_fragment:Bq,logdepthbuf_pars_fragment:Eq,logdepthbuf_pars_vertex:Fq,logdepthbuf_vertex:Rq,map_fragment:Vq,map_pars_fragment:Uq,map_particle_fragment:Qq,map_particle_pars_fragment:_q,metalnessmap_fragment:$q,metalnessmap_pars_fragment:em,morphinstance_vertex:tm,morphcolor_vertex:nm,morphnormal_vertex:rm,morphtarget_pars_vertex:im,morphtarget_vertex:om,normal_fragment_begin:sm,normal_fragment_maps:um,normal_pars_fragment:am,normal_pars_vertex:fm,normal_vertex:hm,normalmap_pars_fragment:pm,clearcoat_normal_fragment_begin:qm,clearcoat_normal_fragment_maps:mm,clearcoat_pars_fragment:cm,iridescence_pars_fragment:ym,opaque_fragment:gm,packing:vm,premultiplied_alpha_fragment:lm,project_vertex:dm,dithering_fragment:Hm,dithering_pars_fragment:Km,roughnessmap_fragment:bm,roughnessmap_pars_fragment:Om,shadowmap_pars_fragment:jm,shadowmap_pars_vertex:Im,shadowmap_vertex:Am,shadowmask_pars_fragment:Lm,skinbase_vertex:xm,skinning_pars_vertex:Pm,skinning_vertex:zm,skinnormal_vertex:Cm,specularmap_fragment:Sm,specularmap_pars_fragment:Mm,tonemapping_fragment:wm,tonemapping_pars_fragment:Ym,transmission_fragment:Gm,transmission_pars_fragment:Xm,uv_pars_fragment:Dm,uv_pars_vertex:Jm,uv_vertex:Tm,worldpos_vertex:Wm,background_vert:km,background_frag:Nm,backgroundCube_vert:Zm,backgroundCube_frag:Bm,cube_vert:Em,cube_frag:Fm,depth_vert:Rm,depth_frag:Vm,distanceRGBA_vert:Um,distanceRGBA_frag:Qm,equirect_vert:_m,equirect_frag:$m,linedashed_vert:ec,linedashed_frag:tc,meshbasic_vert:nc,meshbasic_frag:rc,meshlambert_vert:ic,meshlambert_frag:oc,meshmatcap_vert:sc,meshmatcap_frag:uc,meshnormal_vert:ac,meshnormal_frag:fc,meshphong_vert:hc,meshphong_frag:pc,meshphysical_vert:qc,meshphysical_frag:mc,meshtoon_vert:cc,meshtoon_frag:yc,points_vert:gc,points_frag:vc,shadow_vert:lc,shadow_frag:dc,sprite_vert:Hc,sprite_frag:Kc},be={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Xn={basic:{uniforms:Dt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:Dt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Re(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:Dt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:Dt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:Dt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Re(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:Dt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:Dt([be.points,be.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:Dt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:Dt([be.common,be.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:Dt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:Dt([be.sprite,be.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:Dt([be.common,be.displacementmap,{referencePosition:{value:new M},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:Dt([be.lights,be.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};Xn.physical={uniforms:Dt([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var Bu={r:0,b:0,g:0},Rr=new xn,bc=new at;function Oc(r,e,t,n,i,o,s){let u=new Re(0),a=o===!0?0:1,f,h,p=null,m=0,q=null;function g(O){let l=O.isScene===!0?O.background:null;return l&&l.isTexture&&(l=(O.backgroundBlurriness>0?t:e).get(l)),l}function v(O){let l=!1,j=g(O);j===null?c(u,a):j&&j.isColor&&(c(j,1),l=!0);let A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(r.autoClear||l)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(O,l){let j=g(l);j&&(j.isCubeTexture||j.mapping===Wo)?(h===void 0&&(h=new st(new At(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:Fr(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Rr.copy(l.backgroundRotation),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,j.isCubeTexture&&j.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),h.material.uniforms.envMap.value=j,h.material.uniforms.flipEnvMap.value=j.isCubeTexture&&j.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=l.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(bc.makeRotationFromEuler(Rr)),h.material.toneMapped=ft.getTransfer(j.colorSpace)!==qt,(p!==j||m!==j.version||q!==r.toneMapping)&&(h.material.needsUpdate=!0,p=j,m=j.version,q=r.toneMapping),h.layers.enableAll(),O.unshift(h,h.geometry,h.material,0,0,null)):j&&j.isTexture&&(f===void 0&&(f=new st(new nn(2,2),new en({name:"BackgroundMaterial",uniforms:Fr(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(f)),f.material.uniforms.t2D.value=j,f.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,f.material.toneMapped=ft.getTransfer(j.colorSpace)!==qt,j.matrixAutoUpdate===!0&&j.updateMatrix(),f.material.uniforms.uvTransform.value.copy(j.matrix),(p!==j||m!==j.version||q!==r.toneMapping)&&(f.material.needsUpdate=!0,p=j,m=j.version,q=r.toneMapping),f.layers.enableAll(),O.unshift(f,f.geometry,f.material,0,0,null))}function c(O,l){O.getRGB(Bu,sf(r)),n.buffers.color.setClear(Bu.r,Bu.g,Bu.b,l,s)}function I(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0)}return{getClearColor:function(){return u},setClearColor:function(O,l=1){u.set(O),a=l,c(u,a)},getClearAlpha:function(){return a},setClearAlpha:function(O){a=O,c(u,a)},render:v,addToRenderList:y,dispose:I}}function jc(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=m(null),o=i,s=!1;function u(H,C,Y,X,D){let w=!1,N=p(X,Y,C);o!==N&&(o=N,f(o.object)),w=q(H,X,Y,D),w&&g(H,X,Y,D),D!==null&&e.update(D,r.ELEMENT_ARRAY_BUFFER),(w||s)&&(s=!1,l(H,C,Y,X),D!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function a(){return r.createVertexArray()}function f(H){return r.bindVertexArray(H)}function h(H){return r.deleteVertexArray(H)}function p(H,C,Y){let X=Y.wireframe===!0,D=n[H.id];D===void 0&&(D={},n[H.id]=D);let w=D[C.id];w===void 0&&(w={},D[C.id]=w);let N=w[X];return N===void 0&&(N=m(a()),w[X]=N),N}function m(H){let C=[],Y=[],X=[];for(let D=0;D<t;D++)C[D]=0,Y[D]=0,X[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:Y,attributeDivisors:X,object:H,attributes:{},index:null}}function q(H,C,Y,X){let D=o.attributes,w=C.attributes,N=0,U=Y.getAttributes();for(let B in U)if(U[B].location>=0){let ve=D[B],de=w[B];if(de===void 0&&(B==="instanceMatrix"&&H.instanceMatrix&&(de=H.instanceMatrix),B==="instanceColor"&&H.instanceColor&&(de=H.instanceColor)),ve===void 0||ve.attribute!==de||de&&ve.data!==de.data)return!0;N++}return o.attributesNum!==N||o.index!==X}function g(H,C,Y,X){let D={},w=C.attributes,N=0,U=Y.getAttributes();for(let B in U)if(U[B].location>=0){let ve=w[B];ve===void 0&&(B==="instanceMatrix"&&H.instanceMatrix&&(ve=H.instanceMatrix),B==="instanceColor"&&H.instanceColor&&(ve=H.instanceColor));let de={};de.attribute=ve,ve&&ve.data&&(de.data=ve.data),D[B]=de,N++}o.attributes=D,o.attributesNum=N,o.index=X}function v(){let H=o.newAttributes;for(let C=0,Y=H.length;C<Y;C++)H[C]=0}function y(H){c(H,0)}function c(H,C){let Y=o.newAttributes,X=o.enabledAttributes,D=o.attributeDivisors;Y[H]=1,X[H]===0&&(r.enableVertexAttribArray(H),X[H]=1),D[H]!==C&&(r.vertexAttribDivisor(H,C),D[H]=C)}function I(){let H=o.newAttributes,C=o.enabledAttributes;for(let Y=0,X=C.length;Y<X;Y++)C[Y]!==H[Y]&&(r.disableVertexAttribArray(Y),C[Y]=0)}function O(H,C,Y,X,D,w,N){N===!0?r.vertexAttribIPointer(H,C,Y,D,w):r.vertexAttribPointer(H,C,Y,X,D,w)}function l(H,C,Y,X){v();let D=X.attributes,w=Y.getAttributes(),N=C.defaultAttributeValues;for(let U in w){let B=w[U];if(B.location>=0){let ce=D[U];if(ce===void 0&&(U==="instanceMatrix"&&H.instanceMatrix&&(ce=H.instanceMatrix),U==="instanceColor"&&H.instanceColor&&(ce=H.instanceColor)),ce!==void 0){let ve=ce.normalized,de=ce.itemSize,We=e.get(ce);if(We===void 0)continue;let Ne=We.buffer,_e=We.type,Ve=We.bytesPerElement,_=_e===r.INT||_e===r.UNSIGNED_INT||ce.gpuType===fu;if(ce.isInterleavedBufferAttribute){let re=ce.data,je=re.stride,Se=ce.offset;if(re.isInstancedInterleavedBuffer){for(let we=0;we<B.locationSize;we++)c(B.location+we,re.meshPerAttribute);H.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let we=0;we<B.locationSize;we++)y(B.location+we);r.bindBuffer(r.ARRAY_BUFFER,Ne);for(let we=0;we<B.locationSize;we++)O(B.location+we,de/B.locationSize,_e,ve,je*Ve,(Se+de/B.locationSize*we)*Ve,_)}else{if(ce.isInstancedBufferAttribute){for(let re=0;re<B.locationSize;re++)c(B.location+re,ce.meshPerAttribute);H.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let re=0;re<B.locationSize;re++)y(B.location+re);r.bindBuffer(r.ARRAY_BUFFER,Ne);for(let re=0;re<B.locationSize;re++)O(B.location+re,de/B.locationSize,_e,ve,de*Ve,de/B.locationSize*re*Ve,_)}}else if(N!==void 0){let ve=N[U];if(ve!==void 0)switch(ve.length){case 2:r.vertexAttrib2fv(B.location,ve);break;case 3:r.vertexAttrib3fv(B.location,ve);break;case 4:r.vertexAttrib4fv(B.location,ve);break;default:r.vertexAttrib1fv(B.location,ve)}}}}I()}function j(){L();for(let H in n){let C=n[H];for(let Y in C){let X=C[Y];for(let D in X)h(X[D].object),delete X[D];delete C[Y]}delete n[H]}}function A(H){if(n[H.id]===void 0)return;let C=n[H.id];for(let Y in C){let X=C[Y];for(let D in X)h(X[D].object),delete X[D];delete C[Y]}delete n[H.id]}function P(H){for(let C in n){let Y=n[C];if(Y[H.id]===void 0)continue;let X=Y[H.id];for(let D in X)h(X[D].object),delete X[D];delete Y[H.id]}}function L(){K(),s=!0,o!==i&&(o=i,f(o.object))}function K(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:u,reset:L,resetDefaultState:K,dispose:j,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:y,disableUnusedAttributes:I}}function Ic(r,e,t){let n;function i(f){n=f}function o(f,h){r.drawArrays(n,f,h),t.update(h,n,1)}function s(f,h,p){p!==0&&(r.drawArraysInstanced(n,f,h,p),t.update(h,n,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,f,0,h,0,p);let q=0;for(let g=0;g<p;g++)q+=h[g];t.update(q,n,1)}function a(f,h,p,m){if(p===0)return;let q=e.get("WEBGL_multi_draw");if(q===null)for(let g=0;g<f.length;g++)s(f[g],h[g],m[g]);else{q.multiDrawArraysInstancedWEBGL(n,f,0,h,0,m,0,p);let g=0;for(let v=0;v<p;v++)g+=h[v]*m[v];t.update(g,n,1)}}this.setMode=i,this.render=o,this.renderInstances=s,this.renderMultiDraw=u,this.renderMultiDrawInstances=a}function Ac(r,e,t,n){let i;function o(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(P){return!(P!==Ft&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(P){let L=P===sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Pn&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==kt&&!L)}function a(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=t.precision!==void 0?t.precision:"highp",h=a(f);h!==f&&(console.warn("THREE.WebGLRenderer:",f,"not supported, using",h,"instead."),f=h);let p=t.logarithmicDepthBuffer===!0,m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),q=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),c=r.getParameter(r.MAX_VERTEX_ATTRIBS),I=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),l=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),j=g>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:a,textureFormatReadable:s,textureTypeReadable:u,precision:f,logarithmicDepthBuffer:p,reversedDepthBuffer:m,maxTextures:q,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:y,maxAttributes:c,maxVertexUniforms:I,maxVaryings:O,maxFragmentUniforms:l,vertexTextures:j,maxSamples:A}}function Lc(r){let e=this,t=null,n=0,i=!1,o=!1,s=new Zt,u=new et,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){let q=p.length!==0||m||n!==0||i;return i=m,n=p.length,q},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=h(p,m,0)},this.setState=function(p,m,q){let g=p.clippingPlanes,v=p.clipIntersection,y=p.clipShadows,c=r.get(p);if(!i||g===null||g.length===0||o&&!y)o?h(null):f();else{let I=o?0:n,O=I*4,l=c.clippingState||null;a.value=l,l=h(g,m,O,q);for(let j=0;j!==O;++j)l[j]=t[j];c.clippingState=l,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=I}};function f(){a.value!==t&&(a.value=t,a.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(p,m,q,g){let v=p!==null?p.length:0,y=null;if(v!==0){if(y=a.value,g!==!0||y===null){let c=q+v*4,I=m.matrixWorldInverse;u.getNormalMatrix(I),(y===null||y.length<c)&&(y=new Float32Array(c));for(let O=0,l=q;O!==v;++O,l+=4)s.copy(p[O]).applyMatrix4(I,u),s.normal.toArray(y,l),y[l+3]=s.constant}a.value=y,a.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,y}}function xc(r){let e=new WeakMap;function t(s,u){return u===wi?s.mapping=Nr:u===uu&&(s.mapping=Zr),s}function n(s){if(s&&s.isTexture){let u=s.mapping;if(u===wi||u===uu)if(e.has(s)){let a=e.get(s).texture;return t(a,s.mapping)}else{let a=s.image;if(a&&a.height>0){let f=new Cs(a.height);return f.fromEquirectangularTexture(r,s),e.set(s,f),s.addEventListener("dispose",i),t(f.texture,s.mapping)}else return null}}return s}function i(s){let u=s.target;u.removeEventListener("dispose",i);let a=e.get(u);a!==void 0&&(e.delete(u),a.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}var Ti=4,d6=[.125,.215,.35,.446,.526,.582],Qr=20,pf=new Xo,H6=new Re,qf=null,mf=0,cf=0,yf=!1,Ur=(1+Math.sqrt(5))/2,Ji=1/Ur,K6=[new M(-Ur,Ji,0),new M(Ur,Ji,0),new M(-Ji,0,Ur),new M(Ji,0,Ur),new M(0,Ur,-Ji),new M(0,Ur,Ji),new M(-1,1,-1),new M(1,1,-1),new M(-1,1,1),new M(1,1,1)],Pc=new M,ki=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,o={}){let{size:s=256,position:u=Pc}=o;qf=this._renderer.getRenderTarget(),mf=this._renderer.getActiveCubeFace(),cf=this._renderer.getActiveMipmapLevel(),yf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,i,a,u),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=j6(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=O6(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qf,mf,cf),this._renderer.xr.enabled=yf,e.scissorTest=!1,Eu(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Nr||e.mapping===Zr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qf=this._renderer.getRenderTarget(),mf=this._renderer.getActiveCubeFace(),cf=this._renderer.getActiveMipmapLevel(),yf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:sn,format:Ft,colorSpace:Un,depthBuffer:!1},i=b6(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=b6(e,t,n);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zc(o)),this._blurMaterial=Cc(o,e,t)}return i}_compileMaterial(e){let t=new st(this._lodPlanes[0],e);this._renderer.compile(t,pf)}_sceneToCubeUV(e,t,n,i,o){let a=new Ct(90,1,t,n),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,m=p.autoClear,q=p.toneMapping;p.getClearColor(H6),p.toneMapping=nr,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(i),p.clearDepth(),p.setRenderTarget(null));let v=new Mn({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),y=new st(new At,v),c=!1,I=e.background;I?I.isColor&&(v.color.copy(I),e.background=null,c=!0):(v.color.copy(H6),c=!0);for(let O=0;O<6;O++){let l=O%3;l===0?(a.up.set(0,f[O],0),a.position.set(o.x,o.y,o.z),a.lookAt(o.x+h[O],o.y,o.z)):l===1?(a.up.set(0,0,f[O]),a.position.set(o.x,o.y,o.z),a.lookAt(o.x,o.y+h[O],o.z)):(a.up.set(0,f[O],0),a.position.set(o.x,o.y,o.z),a.lookAt(o.x,o.y,o.z+h[O]));let j=this._cubeSize;Eu(i,l*j,O>2?j:0,j,j),p.setRenderTarget(i),c&&p.render(y,a),p.render(e,a)}y.geometry.dispose(),y.material.dispose(),p.toneMapping=q,p.autoClear=m,e.background=I}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Nr||e.mapping===Zr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=j6()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=O6());let o=i?this._cubemapMaterial:this._equirectMaterial,s=new st(this._lodPlanes[0],o),u=o.uniforms;u.envMap.value=e;let a=this._cubeSize;Eu(t,0,0,3*a,2*a),n.setRenderTarget(t),n.render(s,pf)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let o=1;o<i;o++){let s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),u=K6[(i-o-1)%K6.length];this._blur(e,o-1,o,s,u)}t.autoClear=n}_blur(e,t,n,i,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,i,"latitudinal",o),this._halfBlur(s,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,s,u){let a=this._renderer,f=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,p=new st(this._lodPlanes[i],f),m=f.uniforms,q=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*q):2*Math.PI/(2*Qr-1),v=o/g,y=isFinite(o)?1+Math.floor(h*v):Qr;y>Qr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Qr}`);let c=[],I=0;for(let P=0;P<Qr;++P){let L=P/v,K=Math.exp(-L*L/2);c.push(K),P===0?I+=K:P<y&&(I+=2*K)}for(let P=0;P<c.length;P++)c[P]=c[P]/I;m.envMap.value=e.texture,m.samples.value=y,m.weights.value=c,m.latitudinal.value=s==="latitudinal",u&&(m.poleAxis.value=u);let{_lodMax:O}=this;m.dTheta.value=g,m.mipInt.value=O-n;let l=this._sizeLods[i],j=3*l*(i>O-Ti?i-O+Ti:0),A=4*(this._cubeSize-l);Eu(t,j,A,3*l,2*l),a.setRenderTarget(t),a.render(p,pf)}};function zc(r){let e=[],t=[],n=[],i=r,o=r-Ti+1+d6.length;for(let s=0;s<o;s++){let u=Math.pow(2,i);t.push(u);let a=1/u;s>r-Ti?a=d6[s-r+Ti-1]:s===0&&(a=0),n.push(a);let f=1/(u-2),h=-f,p=1+f,m=[h,h,p,h,p,p,h,h,p,p,h,p],q=6,g=6,v=3,y=2,c=1,I=new Float32Array(v*g*q),O=new Float32Array(y*g*q),l=new Float32Array(c*g*q);for(let A=0;A<q;A++){let P=A%3*2/3-1,L=A>2?0:-1,K=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];I.set(K,v*g*A),O.set(m,y*g*A);let H=[A,A,A,A,A,A];l.set(H,c*g*A)}let j=new Xt;j.setAttribute("position",new Kt(I,v)),j.setAttribute("uv",new Kt(O,y)),j.setAttribute("faceIndex",new Kt(l,c)),e.push(j),i>Ti&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function b6(r,e,t){let n=new vn(r,e,t);return n.texture.mapping=Wo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eu(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Cc(r,e,t){let n=new Float32Array(Qr),i=new M(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Af(),fragmentShader:`

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
		`,blending:tr,depthTest:!1,depthWrite:!1})}function O6(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Af(),fragmentShader:`

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
		`,blending:tr,depthTest:!1,depthWrite:!1})}function j6(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Af(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:tr,depthTest:!1,depthWrite:!1})}function Af(){return`

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
	`}function Sc(r){let e=new WeakMap,t=null;function n(u){if(u&&u.isTexture){let a=u.mapping,f=a===wi||a===uu,h=a===Nr||a===Zr;if(f||h){let p=e.get(u),m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return t===null&&(t=new ki(r)),p=f?t.fromEquirectangular(u,p):t.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let q=u.image;return f&&q&&q.height>0||h&&q&&i(q)?(t===null&&(t=new ki(r)),p=f?t.fromEquirectangular(u):t.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",o),p.texture):null}}}return u}function i(u){let a=0,f=6;for(let h=0;h<f;h++)u[h]!==void 0&&a++;return a===f}function o(u){let a=u.target;a.removeEventListener("dispose",o);let f=e.get(a);f!==void 0&&(e.delete(a),f.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Mc(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ji("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function wc(r,e,t,n){let i={},o=new WeakMap;function s(p){let m=p.target;m.index!==null&&e.remove(m.index);for(let g in m.attributes)e.remove(m.attributes[g]);m.removeEventListener("dispose",s),delete i[m.id];let q=o.get(m);q&&(e.remove(q),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function u(p,m){return i[m.id]===!0||(m.addEventListener("dispose",s),i[m.id]=!0,t.memory.geometries++),m}function a(p){let m=p.attributes;for(let q in m)e.update(m[q],r.ARRAY_BUFFER)}function f(p){let m=[],q=p.index,g=p.attributes.position,v=0;if(q!==null){let I=q.array;v=q.version;for(let O=0,l=I.length;O<l;O+=3){let j=I[O+0],A=I[O+1],P=I[O+2];m.push(j,A,A,P,P,j)}}else if(g!==void 0){let I=g.array;v=g.version;for(let O=0,l=I.length/3-1;O<l;O+=3){let j=O+0,A=O+1,P=O+2;m.push(j,A,A,P,P,j)}}else return;let y=new(of(m)?qo:po)(m,1);y.version=v;let c=o.get(p);c&&e.remove(c),o.set(p,y)}function h(p){let m=o.get(p);if(m){let q=p.index;q!==null&&m.version<q.version&&f(p)}else f(p);return o.get(p)}return{get:u,update:a,getWireframeAttribute:h}}function Yc(r,e,t){let n;function i(m){n=m}let o,s;function u(m){o=m.type,s=m.bytesPerElement}function a(m,q){r.drawElements(n,q,o,m*s),t.update(q,n,1)}function f(m,q,g){g!==0&&(r.drawElementsInstanced(n,q,o,m*s,g),t.update(q,n,g))}function h(m,q,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,q,0,o,m,0,g);let y=0;for(let c=0;c<g;c++)y+=q[c];t.update(y,n,1)}function p(m,q,g,v){if(g===0)return;let y=e.get("WEBGL_multi_draw");if(y===null)for(let c=0;c<m.length;c++)f(m[c]/s,q[c],v[c]);else{y.multiDrawElementsInstancedWEBGL(n,q,0,o,m,0,v,0,g);let c=0;for(let I=0;I<g;I++)c+=q[I]*v[I];t.update(c,n,1)}}this.setMode=i,this.setIndex=u,this.render=a,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function Gc(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,u){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=u*(o/3);break;case r.LINES:t.lines+=u*(o/2);break;case r.LINE_STRIP:t.lines+=u*(o-1);break;case r.LINE_LOOP:t.lines+=u*o;break;case r.POINTS:t.points+=u*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Xc(r,e,t){let n=new WeakMap,i=new yt;function o(s,u,a){let f=s.morphTargetInfluences,h=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,p=h!==void 0?h.length:0,m=n.get(u);if(m===void 0||m.count!==p){let K=function(){P.dispose(),n.delete(u),u.removeEventListener("dispose",K)};m!==void 0&&m.texture.dispose();let q=u.morphAttributes.position!==void 0,g=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,y=u.morphAttributes.position||[],c=u.morphAttributes.normal||[],I=u.morphAttributes.color||[],O=0;q===!0&&(O=1),g===!0&&(O=2),v===!0&&(O=3);let l=u.attributes.position.count*O,j=1;l>e.maxTextureSize&&(j=Math.ceil(l/e.maxTextureSize),l=e.maxTextureSize);let A=new Float32Array(l*j*4*p),P=new ho(A,l,j,p);P.type=kt,P.needsUpdate=!0;let L=O*4;for(let H=0;H<p;H++){let C=y[H],Y=c[H],X=I[H],D=l*j*4*H;for(let w=0;w<C.count;w++){let N=w*L;q===!0&&(i.fromBufferAttribute(C,w),A[D+N+0]=i.x,A[D+N+1]=i.y,A[D+N+2]=i.z,A[D+N+3]=0),g===!0&&(i.fromBufferAttribute(Y,w),A[D+N+4]=i.x,A[D+N+5]=i.y,A[D+N+6]=i.z,A[D+N+7]=0),v===!0&&(i.fromBufferAttribute(X,w),A[D+N+8]=i.x,A[D+N+9]=i.y,A[D+N+10]=i.z,A[D+N+11]=X.itemSize===4?i.w:1)}}m={count:p,texture:P,size:new se(l,j)},n.set(u,m),u.addEventListener("dispose",K)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)a.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let q=0;for(let v=0;v<f.length;v++)q+=f[v];let g=u.morphTargetsRelative?1:1-q;a.getUniforms().setValue(r,"morphTargetBaseInfluence",g),a.getUniforms().setValue(r,"morphTargetInfluences",f)}a.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),a.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}return{update:o}}function Dc(r,e,t,n){let i=new WeakMap;function o(a){let f=n.render.frame,h=a.geometry,p=e.get(a,h);if(i.get(p)!==f&&(e.update(p),i.set(p,f)),a.isInstancedMesh&&(a.hasEventListener("dispose",u)===!1&&a.addEventListener("dispose",u),i.get(a)!==f&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,f))),a.isSkinnedMesh){let m=a.skeleton;i.get(m)!==f&&(m.update(),i.set(m,f))}return p}function s(){i=new WeakMap}function u(a){let f=a.target;f.removeEventListener("dispose",u),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:s}}var N6=new St,I6=new Ho(1,1),Z6=new ho,B6=new Ps,E6=new co,A6=[],L6=[],x6=new Float32Array(16),P6=new Float32Array(9),z6=new Float32Array(4);function Ni(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,o=A6[i];if(o===void 0&&(o=new Float32Array(i),A6[i]=o),e!==0){n.toArray(o,0);for(let s=1,u=0;s!==e;++s)u+=t,r[s].toArray(o,u)}return o}function Lt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function xt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Vu(r,e){let t=L6[e];t===void 0&&(t=new Int32Array(e),L6[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Jc(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Tc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2fv(this.addr,e),xt(t,e)}}function Wc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;r.uniform3fv(this.addr,e),xt(t,e)}}function kc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4fv(this.addr,e),xt(t,e)}}function Nc(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(Lt(t,n))return;z6.set(n),r.uniformMatrix2fv(this.addr,!1,z6),xt(t,n)}}function Zc(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(Lt(t,n))return;P6.set(n),r.uniformMatrix3fv(this.addr,!1,P6),xt(t,n)}}function Bc(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(Lt(t,n))return;x6.set(n),r.uniformMatrix4fv(this.addr,!1,x6),xt(t,n)}}function Ec(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Fc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2iv(this.addr,e),xt(t,e)}}function Rc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;r.uniform3iv(this.addr,e),xt(t,e)}}function Vc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4iv(this.addr,e),xt(t,e)}}function Uc(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Qc(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2uiv(this.addr,e),xt(t,e)}}function _c(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;r.uniform3uiv(this.addr,e),xt(t,e)}}function $c(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4uiv(this.addr,e),xt(t,e)}}function ey(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let o;this.type===r.SAMPLER_2D_SHADOW?(I6.compareFunction=tf,o=I6):o=N6,t.setTexture2D(e||o,i)}function ty(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||B6,i)}function ny(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||E6,i)}function ry(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Z6,i)}function iy(r){switch(r){case 5126:return Jc;case 35664:return Tc;case 35665:return Wc;case 35666:return kc;case 35674:return Nc;case 35675:return Zc;case 35676:return Bc;case 5124:case 35670:return Ec;case 35667:case 35671:return Fc;case 35668:case 35672:return Rc;case 35669:case 35673:return Vc;case 5125:return Uc;case 36294:return Qc;case 36295:return _c;case 36296:return $c;case 35678:case 36198:case 36298:case 36306:case 35682:return ey;case 35679:case 36299:case 36307:return ty;case 35680:case 36300:case 36308:case 36293:return ny;case 36289:case 36303:case 36311:case 36292:return ry}}function oy(r,e){r.uniform1fv(this.addr,e)}function sy(r,e){let t=Ni(e,this.size,2);r.uniform2fv(this.addr,t)}function uy(r,e){let t=Ni(e,this.size,3);r.uniform3fv(this.addr,t)}function ay(r,e){let t=Ni(e,this.size,4);r.uniform4fv(this.addr,t)}function fy(r,e){let t=Ni(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function hy(r,e){let t=Ni(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function py(r,e){let t=Ni(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function qy(r,e){r.uniform1iv(this.addr,e)}function my(r,e){r.uniform2iv(this.addr,e)}function cy(r,e){r.uniform3iv(this.addr,e)}function yy(r,e){r.uniform4iv(this.addr,e)}function gy(r,e){r.uniform1uiv(this.addr,e)}function vy(r,e){r.uniform2uiv(this.addr,e)}function ly(r,e){r.uniform3uiv(this.addr,e)}function dy(r,e){r.uniform4uiv(this.addr,e)}function Hy(r,e,t){let n=this.cache,i=e.length,o=Vu(t,i);Lt(n,o)||(r.uniform1iv(this.addr,o),xt(n,o));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||N6,o[s])}function Ky(r,e,t){let n=this.cache,i=e.length,o=Vu(t,i);Lt(n,o)||(r.uniform1iv(this.addr,o),xt(n,o));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||B6,o[s])}function by(r,e,t){let n=this.cache,i=e.length,o=Vu(t,i);Lt(n,o)||(r.uniform1iv(this.addr,o),xt(n,o));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||E6,o[s])}function Oy(r,e,t){let n=this.cache,i=e.length,o=Vu(t,i);Lt(n,o)||(r.uniform1iv(this.addr,o),xt(n,o));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||Z6,o[s])}function jy(r){switch(r){case 5126:return oy;case 35664:return sy;case 35665:return uy;case 35666:return ay;case 35674:return fy;case 35675:return hy;case 35676:return py;case 5124:case 35670:return qy;case 35667:case 35671:return my;case 35668:case 35672:return cy;case 35669:case 35673:return yy;case 5125:return gy;case 36294:return vy;case 36295:return ly;case 36296:return dy;case 35678:case 36198:case 36298:case 36306:case 35682:return Hy;case 35679:case 36299:case 36307:return Ky;case 35680:case 36300:case 36308:case 36293:return by;case 36289:case 36303:case 36311:case 36292:return Oy}}var vf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iy(t.type)}},lf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jy(t.type)}},df=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let o=0,s=i.length;o!==s;++o){let u=i[o];u.setValue(e,t[u.id],n)}}},gf=/(\w+)(\])?(\[|\.)?/g;function C6(r,e){r.seq.push(e),r.map[e.id]=e}function Iy(r,e,t){let n=r.name,i=n.length;for(gf.lastIndex=0;;){let o=gf.exec(n),s=gf.lastIndex,u=o[1],a=o[2]==="]",f=o[3];if(a&&(u=u|0),f===void 0||f==="["&&s+2===i){C6(t,f===void 0?new vf(u,r,e):new lf(u,r,e));break}else{let p=t.map[u];p===void 0&&(p=new df(u),C6(t,p)),t=p}}}var Wi=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let o=e.getActiveUniform(t,i),s=e.getUniformLocation(t,o.name);Iy(o,s,this)}}setValue(e,t,n,i){let o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,s=t.length;o!==s;++o){let u=t[o],a=n[u.id];a.needsUpdate!==!1&&u.setValue(e,a.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,o=e.length;i!==o;++i){let s=e[i];s.id in t&&n.push(s)}return n}};function S6(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var Ay=37297,Ly=0;function xy(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=i;s<o;s++){let u=s+1;n.push(`${u===e?">":" "} ${u}: ${t[s]}`)}return n.join(`
`)}var M6=new et;function Py(r){ft._getMatrix(M6,ft.workingColorSpace,r);let e=`mat3( ${M6.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(r)){case ao:return[e,"LinearTransferOETF"];case qt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function w6(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),o=(r.getShaderInfoLog(e)||"").trim();if(n&&o==="")return"";let s=/ERROR: 0:(\d+)/.exec(o);if(s){let u=parseInt(s[1]);return t.toUpperCase()+`

`+o+`

`+xy(r.getShaderSource(e),u)}else return o}function zy(r,e){let t=Py(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Cy(r,e){let t;switch(e){case Vh:t="Linear";break;case Uh:t="Reinhard";break;case Qh:t="Cineon";break;case su:t="ACESFilmic";break;case $h:t="AgX";break;case e6:t="Neutral";break;case _h:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Fu=new M;function Sy(){ft.getLuminanceCoefficients(Fu);let r=Fu.x.toFixed(4),e=Fu.y.toFixed(4),t=Fu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function My(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Eo).join(`
`)}function wy(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Yy(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let o=r.getActiveAttrib(e,i),s=o.name,u=1;o.type===r.FLOAT_MAT2&&(u=2),o.type===r.FLOAT_MAT3&&(u=3),o.type===r.FLOAT_MAT4&&(u=4),t[s]={type:o.type,location:r.getAttribLocation(e,s),locationSize:u}}return t}function Eo(r){return r!==""}function Y6(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function G6(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Gy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hf(r){return r.replace(Gy,Dy)}var Xy=new Map;function Dy(r,e){let t=nt[e];if(t===void 0){let n=Xy.get(e);if(n!==void 0)t=nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Hf(t)}var Jy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function X6(r){return r.replace(Jy,Ty)}function Ty(r,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function D6(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Wy(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Wa?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===_s?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function ky(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Nr:case Zr:e="ENVMAP_TYPE_CUBE";break;case Wo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ny(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Zr&&(e="ENVMAP_MODE_REFRACTION"),e}function Zy(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ba:e="ENVMAP_BLENDING_MULTIPLY";break;case Fh:e="ENVMAP_BLENDING_MIX";break;case Rh:e="ENVMAP_BLENDING_ADD";break}return e}function By(r){let e=r.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ey(r,e,t,n){let i=r.getContext(),o=t.defines,s=t.vertexShader,u=t.fragmentShader,a=Wy(t),f=ky(t),h=Ny(t),p=Zy(t),m=By(t),q=My(t),g=wy(o),v=i.createProgram(),y,c,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Eo).join(`
`),y.length>0&&(y+=`
`),c=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Eo).join(`
`),c.length>0&&(c+=`
`)):(y=[D6(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Eo).join(`
`),c=[D6(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==nr?"#define TONE_MAPPING":"",t.toneMapping!==nr?nt.tonemapping_pars_fragment:"",t.toneMapping!==nr?Cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,zy("linearToOutputTexel",t.outputColorSpace),Sy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Eo).join(`
`)),s=Hf(s),s=Y6(s,t),s=G6(s,t),u=Hf(u),u=Y6(u,t),u=G6(u,t),s=X6(s),u=X6(u),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[q,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,c=["#define varying in",t.glslVersion===nf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+c);let O=I+y+s,l=I+c+u,j=S6(i,i.VERTEX_SHADER,O),A=S6(i,i.FRAGMENT_SHADER,l);i.attachShader(v,j),i.attachShader(v,A),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function P(C){if(r.debug.checkShaderErrors){let Y=i.getProgramInfoLog(v)||"",X=i.getShaderInfoLog(j)||"",D=i.getShaderInfoLog(A)||"",w=Y.trim(),N=X.trim(),U=D.trim(),B=!0,ce=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(B=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,j,A);else{let ve=w6(i,j,"vertex"),de=w6(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+w+`
`+ve+`
`+de)}else w!==""?console.warn("THREE.WebGLProgram: Program Info Log:",w):(N===""||U==="")&&(ce=!1);ce&&(C.diagnostics={runnable:B,programLog:w,vertexShader:{log:N,prefix:y},fragmentShader:{log:U,prefix:c}})}i.deleteShader(j),i.deleteShader(A),L=new Wi(i,v),K=Yy(i,v)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let K;this.getAttributes=function(){return K===void 0&&P(this),K};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=i.getProgramParameter(v,Ay)),H},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ly++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=j,this.fragmentShader=A,this}var Fy=0,Kf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bf(e),t.set(e,n)),n}},bf=class{constructor(e){this.id=Fy++,this.code=e,this.usedTimes=0}};function Ry(r,e,t,n,i,o,s){let u=new Ai,a=new Kf,f=new Set,h=[],p=i.logarithmicDepthBuffer,m=i.vertexTextures,q=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(K){return f.add(K),K===0?"uv":`uv${K}`}function y(K,H,C,Y,X){let D=Y.fog,w=X.geometry,N=K.isMeshStandardMaterial?Y.environment:null,U=(K.isMeshStandardMaterial?t:e).get(K.envMap||N),B=U&&U.mapping===Wo?U.image.height:null,ce=g[K.type];K.precision!==null&&(q=i.getMaxPrecision(K.precision),q!==K.precision&&console.warn("THREE.WebGLProgram.getParameters:",K.precision,"not supported, using",q,"instead."));let ve=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,de=ve!==void 0?ve.length:0,We=0;w.morphAttributes.position!==void 0&&(We=1),w.morphAttributes.normal!==void 0&&(We=2),w.morphAttributes.color!==void 0&&(We=3);let Ne,_e,Ve,_;if(ce){let ot=Xn[ce];Ne=ot.vertexShader,_e=ot.fragmentShader}else Ne=K.vertexShader,_e=K.fragmentShader,a.update(K),Ve=a.getVertexShaderID(K),_=a.getFragmentShaderID(K);let re=r.getRenderTarget(),je=r.state.buffers.depth.getReversed(),Se=X.isInstancedMesh===!0,we=X.isBatchedMesh===!0,tt=!!K.map,ht=!!K.matcap,S=!!U,ie=!!K.aoMap,ee=!!K.lightMap,$=!!K.bumpMap,Q=!!K.normalMap,ye=!!K.displacementMap,he=!!K.emissiveMap,ge=!!K.metalnessMap,Ee=!!K.roughnessMap,Te=K.anisotropy>0,x=K.clearcoat>0,d=K.dispersion>0,W=K.iridescence>0,R=K.sheen>0,oe=K.transmission>0,V=Te&&!!K.anisotropyMap,Ye=x&&!!K.clearcoatMap,me=x&&!!K.clearcoatNormalMap,Le=x&&!!K.clearcoatRoughnessMap,xe=W&&!!K.iridescenceMap,ue=W&&!!K.iridescenceThicknessMap,Oe=R&&!!K.sheenColorMap,ke=R&&!!K.sheenRoughnessMap,De=!!K.specularMap,He=!!K.specularColorMap,Ue=!!K.specularIntensityMap,G=oe&&!!K.transmissionMap,ae=oe&&!!K.thicknessMap,le=!!K.gradientMap,Me=!!K.alphaMap,fe=K.alphaTest>0,te=!!K.alphaHash,Ge=!!K.extensions,Ae=nr;K.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Ae=r.toneMapping);let ut={shaderID:ce,shaderType:K.type,shaderName:K.name,vertexShader:Ne,fragmentShader:_e,defines:K.defines,customVertexShaderID:Ve,customFragmentShaderID:_,isRawShaderMaterial:K.isRawShaderMaterial===!0,glslVersion:K.glslVersion,precision:q,batching:we,batchingColor:we&&X._colorsTexture!==null,instancing:Se,instancingColor:Se&&X.instanceColor!==null,instancingMorph:Se&&X.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Un,alphaToCoverage:!!K.alphaToCoverage,map:tt,matcap:ht,envMap:S,envMapMode:S&&U.mapping,envMapCubeUVHeight:B,aoMap:ie,lightMap:ee,bumpMap:$,normalMap:Q,displacementMap:m&&ye,emissiveMap:he,normalMapObjectSpace:Q&&K.normalMapType===r6,normalMapTangentSpace:Q&&K.normalMapType===ef,metalnessMap:ge,roughnessMap:Ee,anisotropy:Te,anisotropyMap:V,clearcoat:x,clearcoatMap:Ye,clearcoatNormalMap:me,clearcoatRoughnessMap:Le,dispersion:d,iridescence:W,iridescenceMap:xe,iridescenceThicknessMap:ue,sheen:R,sheenColorMap:Oe,sheenRoughnessMap:ke,specularMap:De,specularColorMap:He,specularIntensityMap:Ue,transmission:oe,transmissionMap:G,thicknessMap:ae,gradientMap:le,opaque:K.transparent===!1&&K.blending===Yr&&K.alphaToCoverage===!1,alphaMap:Me,alphaTest:fe,alphaHash:te,combine:K.combine,mapUv:tt&&v(K.map.channel),aoMapUv:ie&&v(K.aoMap.channel),lightMapUv:ee&&v(K.lightMap.channel),bumpMapUv:$&&v(K.bumpMap.channel),normalMapUv:Q&&v(K.normalMap.channel),displacementMapUv:ye&&v(K.displacementMap.channel),emissiveMapUv:he&&v(K.emissiveMap.channel),metalnessMapUv:ge&&v(K.metalnessMap.channel),roughnessMapUv:Ee&&v(K.roughnessMap.channel),anisotropyMapUv:V&&v(K.anisotropyMap.channel),clearcoatMapUv:Ye&&v(K.clearcoatMap.channel),clearcoatNormalMapUv:me&&v(K.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&v(K.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(K.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&v(K.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&v(K.sheenColorMap.channel),sheenRoughnessMapUv:ke&&v(K.sheenRoughnessMap.channel),specularMapUv:De&&v(K.specularMap.channel),specularColorMapUv:He&&v(K.specularColorMap.channel),specularIntensityMapUv:Ue&&v(K.specularIntensityMap.channel),transmissionMapUv:G&&v(K.transmissionMap.channel),thicknessMapUv:ae&&v(K.thicknessMap.channel),alphaMapUv:Me&&v(K.alphaMap.channel),vertexTangents:!!w.attributes.tangent&&(Q||Te),vertexColors:K.vertexColors,vertexAlphas:K.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!w.attributes.uv&&(tt||Me),fog:!!D,useFog:K.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:K.flatShading===!0&&K.wireframe===!1,sizeAttenuation:K.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:je,skinning:X.isSkinnedMesh===!0,morphTargets:w.morphAttributes.position!==void 0,morphNormals:w.morphAttributes.normal!==void 0,morphColors:w.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:We,numDirLights:H.directional.length,numPointLights:H.point.length,numSpotLights:H.spot.length,numSpotLightMaps:H.spotLightMap.length,numRectAreaLights:H.rectArea.length,numHemiLights:H.hemi.length,numDirLightShadows:H.directionalShadowMap.length,numPointLightShadows:H.pointShadowMap.length,numSpotLightShadows:H.spotShadowMap.length,numSpotLightShadowsWithMaps:H.numSpotLightShadowsWithMaps,numLightProbes:H.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:K.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ae,decodeVideoTexture:tt&&K.map.isVideoTexture===!0&&ft.getTransfer(K.map.colorSpace)===qt,decodeVideoTextureEmissive:he&&K.emissiveMap.isVideoTexture===!0&&ft.getTransfer(K.emissiveMap.colorSpace)===qt,premultipliedAlpha:K.premultipliedAlpha,doubleSided:K.side===Ot,flipSided:K.side===Wt,useDepthPacking:K.depthPacking>=0,depthPacking:K.depthPacking||0,index0AttributeName:K.index0AttributeName,extensionClipCullDistance:Ge&&K.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&K.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:K.customProgramCacheKey()};return ut.vertexUv1s=f.has(1),ut.vertexUv2s=f.has(2),ut.vertexUv3s=f.has(3),f.clear(),ut}function c(K){let H=[];if(K.shaderID?H.push(K.shaderID):(H.push(K.customVertexShaderID),H.push(K.customFragmentShaderID)),K.defines!==void 0)for(let C in K.defines)H.push(C),H.push(K.defines[C]);return K.isRawShaderMaterial===!1&&(I(H,K),O(H,K),H.push(r.outputColorSpace)),H.push(K.customProgramCacheKey),H.join()}function I(K,H){K.push(H.precision),K.push(H.outputColorSpace),K.push(H.envMapMode),K.push(H.envMapCubeUVHeight),K.push(H.mapUv),K.push(H.alphaMapUv),K.push(H.lightMapUv),K.push(H.aoMapUv),K.push(H.bumpMapUv),K.push(H.normalMapUv),K.push(H.displacementMapUv),K.push(H.emissiveMapUv),K.push(H.metalnessMapUv),K.push(H.roughnessMapUv),K.push(H.anisotropyMapUv),K.push(H.clearcoatMapUv),K.push(H.clearcoatNormalMapUv),K.push(H.clearcoatRoughnessMapUv),K.push(H.iridescenceMapUv),K.push(H.iridescenceThicknessMapUv),K.push(H.sheenColorMapUv),K.push(H.sheenRoughnessMapUv),K.push(H.specularMapUv),K.push(H.specularColorMapUv),K.push(H.specularIntensityMapUv),K.push(H.transmissionMapUv),K.push(H.thicknessMapUv),K.push(H.combine),K.push(H.fogExp2),K.push(H.sizeAttenuation),K.push(H.morphTargetsCount),K.push(H.morphAttributeCount),K.push(H.numDirLights),K.push(H.numPointLights),K.push(H.numSpotLights),K.push(H.numSpotLightMaps),K.push(H.numHemiLights),K.push(H.numRectAreaLights),K.push(H.numDirLightShadows),K.push(H.numPointLightShadows),K.push(H.numSpotLightShadows),K.push(H.numSpotLightShadowsWithMaps),K.push(H.numLightProbes),K.push(H.shadowMapType),K.push(H.toneMapping),K.push(H.numClippingPlanes),K.push(H.numClipIntersection),K.push(H.depthPacking)}function O(K,H){u.disableAll(),H.supportsVertexTextures&&u.enable(0),H.instancing&&u.enable(1),H.instancingColor&&u.enable(2),H.instancingMorph&&u.enable(3),H.matcap&&u.enable(4),H.envMap&&u.enable(5),H.normalMapObjectSpace&&u.enable(6),H.normalMapTangentSpace&&u.enable(7),H.clearcoat&&u.enable(8),H.iridescence&&u.enable(9),H.alphaTest&&u.enable(10),H.vertexColors&&u.enable(11),H.vertexAlphas&&u.enable(12),H.vertexUv1s&&u.enable(13),H.vertexUv2s&&u.enable(14),H.vertexUv3s&&u.enable(15),H.vertexTangents&&u.enable(16),H.anisotropy&&u.enable(17),H.alphaHash&&u.enable(18),H.batching&&u.enable(19),H.dispersion&&u.enable(20),H.batchingColor&&u.enable(21),H.gradientMap&&u.enable(22),K.push(u.mask),u.disableAll(),H.fog&&u.enable(0),H.useFog&&u.enable(1),H.flatShading&&u.enable(2),H.logarithmicDepthBuffer&&u.enable(3),H.reversedDepthBuffer&&u.enable(4),H.skinning&&u.enable(5),H.morphTargets&&u.enable(6),H.morphNormals&&u.enable(7),H.morphColors&&u.enable(8),H.premultipliedAlpha&&u.enable(9),H.shadowMapEnabled&&u.enable(10),H.doubleSided&&u.enable(11),H.flipSided&&u.enable(12),H.useDepthPacking&&u.enable(13),H.dithering&&u.enable(14),H.transmission&&u.enable(15),H.sheen&&u.enable(16),H.opaque&&u.enable(17),H.pointsUvs&&u.enable(18),H.decodeVideoTexture&&u.enable(19),H.decodeVideoTextureEmissive&&u.enable(20),H.alphaToCoverage&&u.enable(21),K.push(u.mask)}function l(K){let H=g[K.type],C;if(H){let Y=Xn[H];C=Zu.clone(Y.uniforms)}else C=K.uniforms;return C}function j(K,H){let C;for(let Y=0,X=h.length;Y<X;Y++){let D=h[Y];if(D.cacheKey===H){C=D,++C.usedTimes;break}}return C===void 0&&(C=new Ey(r,H,K,o),h.push(C)),C}function A(K){if(--K.usedTimes===0){let H=h.indexOf(K);h[H]=h[h.length-1],h.pop(),K.destroy()}}function P(K){a.remove(K)}function L(){a.dispose()}return{getParameters:y,getProgramCacheKey:c,getUniforms:l,acquireProgram:j,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:L}}function Vy(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let u=r.get(s);return u===void 0&&(u={},r.set(s,u)),u}function n(s){r.delete(s)}function i(s,u,a){r.get(s)[u]=a}function o(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:o}}function Uy(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function J6(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function T6(){let r=[],e=0,t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function s(p,m,q,g,v,y){let c=r[e];return c===void 0?(c={id:p.id,object:p,geometry:m,material:q,groupOrder:g,renderOrder:p.renderOrder,z:v,group:y},r[e]=c):(c.id=p.id,c.object=p,c.geometry=m,c.material=q,c.groupOrder=g,c.renderOrder=p.renderOrder,c.z=v,c.group=y),e++,c}function u(p,m,q,g,v,y){let c=s(p,m,q,g,v,y);q.transmission>0?n.push(c):q.transparent===!0?i.push(c):t.push(c)}function a(p,m,q,g,v,y){let c=s(p,m,q,g,v,y);q.transmission>0?n.unshift(c):q.transparent===!0?i.unshift(c):t.unshift(c)}function f(p,m){t.length>1&&t.sort(p||Uy),n.length>1&&n.sort(m||J6),i.length>1&&i.sort(m||J6)}function h(){for(let p=e,m=r.length;p<m;p++){let q=r[p];if(q.id===null)break;q.id=null,q.object=null,q.geometry=null,q.material=null,q.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:u,unshift:a,finish:h,sort:f}}function Qy(){let r=new WeakMap;function e(n,i){let o=r.get(n),s;return o===void 0?(s=new T6,r.set(n,[s])):i>=o.length?(s=new T6,o.push(s)):s=o[i],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function _y(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new M,color:new Re};break;case"SpotLight":t={position:new M,direction:new M,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new M,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new M,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new M,halfWidth:new M,halfHeight:new M};break}return r[e.id]=t,t}}}function $y(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var e3=0;function t3(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function n3(r){let e=new _y,t=$y(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)n.probe.push(new M);let i=new M,o=new at,s=new at;function u(f){let h=0,p=0,m=0;for(let K=0;K<9;K++)n.probe[K].set(0,0,0);let q=0,g=0,v=0,y=0,c=0,I=0,O=0,l=0,j=0,A=0,P=0;f.sort(t3);for(let K=0,H=f.length;K<H;K++){let C=f[K],Y=C.color,X=C.intensity,D=C.distance,w=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=Y.r*X,p+=Y.g*X,m+=Y.b*X;else if(C.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(C.sh.coefficients[N],X);P++}else if(C.isDirectionalLight){let N=e.get(C);if(N.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let U=C.shadow,B=t.get(C);B.shadowIntensity=U.intensity,B.shadowBias=U.bias,B.shadowNormalBias=U.normalBias,B.shadowRadius=U.radius,B.shadowMapSize=U.mapSize,n.directionalShadow[q]=B,n.directionalShadowMap[q]=w,n.directionalShadowMatrix[q]=C.shadow.matrix,I++}n.directional[q]=N,q++}else if(C.isSpotLight){let N=e.get(C);N.position.setFromMatrixPosition(C.matrixWorld),N.color.copy(Y).multiplyScalar(X),N.distance=D,N.coneCos=Math.cos(C.angle),N.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),N.decay=C.decay,n.spot[v]=N;let U=C.shadow;if(C.map&&(n.spotLightMap[j]=C.map,j++,U.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[v]=U.matrix,C.castShadow){let B=t.get(C);B.shadowIntensity=U.intensity,B.shadowBias=U.bias,B.shadowNormalBias=U.normalBias,B.shadowRadius=U.radius,B.shadowMapSize=U.mapSize,n.spotShadow[v]=B,n.spotShadowMap[v]=w,l++}v++}else if(C.isRectAreaLight){let N=e.get(C);N.color.copy(Y).multiplyScalar(X),N.halfWidth.set(C.width*.5,0,0),N.halfHeight.set(0,C.height*.5,0),n.rectArea[y]=N,y++}else if(C.isPointLight){let N=e.get(C);if(N.color.copy(C.color).multiplyScalar(C.intensity),N.distance=C.distance,N.decay=C.decay,C.castShadow){let U=C.shadow,B=t.get(C);B.shadowIntensity=U.intensity,B.shadowBias=U.bias,B.shadowNormalBias=U.normalBias,B.shadowRadius=U.radius,B.shadowMapSize=U.mapSize,B.shadowCameraNear=U.camera.near,B.shadowCameraFar=U.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=w,n.pointShadowMatrix[g]=C.shadow.matrix,O++}n.point[g]=N,g++}else if(C.isHemisphereLight){let N=e.get(C);N.skyColor.copy(C.color).multiplyScalar(X),N.groundColor.copy(C.groundColor).multiplyScalar(X),n.hemi[c]=N,c++}}y>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=m;let L=n.hash;(L.directionalLength!==q||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==y||L.hemiLength!==c||L.numDirectionalShadows!==I||L.numPointShadows!==O||L.numSpotShadows!==l||L.numSpotMaps!==j||L.numLightProbes!==P)&&(n.directional.length=q,n.spot.length=v,n.rectArea.length=y,n.point.length=g,n.hemi.length=c,n.directionalShadow.length=I,n.directionalShadowMap.length=I,n.pointShadow.length=O,n.pointShadowMap.length=O,n.spotShadow.length=l,n.spotShadowMap.length=l,n.directionalShadowMatrix.length=I,n.pointShadowMatrix.length=O,n.spotLightMatrix.length=l+j-A,n.spotLightMap.length=j,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,L.directionalLength=q,L.pointLength=g,L.spotLength=v,L.rectAreaLength=y,L.hemiLength=c,L.numDirectionalShadows=I,L.numPointShadows=O,L.numSpotShadows=l,L.numSpotMaps=j,L.numLightProbes=P,n.version=e3++)}function a(f,h){let p=0,m=0,q=0,g=0,v=0,y=h.matrixWorldInverse;for(let c=0,I=f.length;c<I;c++){let O=f[c];if(O.isDirectionalLight){let l=n.directional[p];l.direction.setFromMatrixPosition(O.matrixWorld),i.setFromMatrixPosition(O.target.matrixWorld),l.direction.sub(i),l.direction.transformDirection(y),p++}else if(O.isSpotLight){let l=n.spot[q];l.position.setFromMatrixPosition(O.matrixWorld),l.position.applyMatrix4(y),l.direction.setFromMatrixPosition(O.matrixWorld),i.setFromMatrixPosition(O.target.matrixWorld),l.direction.sub(i),l.direction.transformDirection(y),q++}else if(O.isRectAreaLight){let l=n.rectArea[g];l.position.setFromMatrixPosition(O.matrixWorld),l.position.applyMatrix4(y),s.identity(),o.copy(O.matrixWorld),o.premultiply(y),s.extractRotation(o),l.halfWidth.set(O.width*.5,0,0),l.halfHeight.set(0,O.height*.5,0),l.halfWidth.applyMatrix4(s),l.halfHeight.applyMatrix4(s),g++}else if(O.isPointLight){let l=n.point[m];l.position.setFromMatrixPosition(O.matrixWorld),l.position.applyMatrix4(y),m++}else if(O.isHemisphereLight){let l=n.hemi[v];l.direction.setFromMatrixPosition(O.matrixWorld),l.direction.transformDirection(y),v++}}}return{setup:u,setupView:a,state:n}}function W6(r){let e=new n3(r),t=[],n=[];function i(h){f.camera=h,t.length=0,n.length=0}function o(h){t.push(h)}function s(h){n.push(h)}function u(){e.setup(t)}function a(h){e.setupView(t,h)}let f={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:f,setupLights:u,setupLightsView:a,pushLight:o,pushShadow:s}}function r3(r){let e=new WeakMap;function t(i,o=0){let s=e.get(i),u;return s===void 0?(u=new W6(r),e.set(i,[u])):o>=s.length?(u=new W6(r),s.push(u)):u=s[o],u}function n(){e=new WeakMap}return{get:t,dispose:n}}var i3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,o3=`uniform sampler2D shadow_pass;
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
}`;function s3(r,e,t){let n=new xi,i=new se,o=new se,s=new yt,u=new Js({depthPacking:n6}),a=new Ts,f={},h=t.maxTextureSize,p={[Vn]:Wt,[Wt]:Vn,[Ot]:Ot},m=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:i3,fragmentShader:o3}),q=m.clone();q.defines.HORIZONTAL_PASS=1;let g=new Xt;g.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new st(g,m),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wa;let c=this.type;this.render=function(A,P,L){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||A.length===0)return;let K=r.getRenderTarget(),H=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),Y=r.state;Y.setBlending(tr),Y.buffers.depth.getReversed()===!0?Y.buffers.color.setClear(0,0,0,0):Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);let X=c!==Yn&&this.type===Yn,D=c===Yn&&this.type!==Yn;for(let w=0,N=A.length;w<N;w++){let U=A[w],B=U.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);let ce=B.getFrameExtents();if(i.multiply(ce),o.copy(B.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/ce.x),i.x=o.x*ce.x,B.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/ce.y),i.y=o.y*ce.y,B.mapSize.y=o.y)),B.map===null||X===!0||D===!0){let de=this.type!==Yn?{minFilter:Gt,magFilter:Gt}:{};B.map!==null&&B.map.dispose(),B.map=new vn(i.x,i.y,de),B.map.texture.name=U.name+".shadowMap",B.camera.updateProjectionMatrix()}r.setRenderTarget(B.map),r.clear();let ve=B.getViewportCount();for(let de=0;de<ve;de++){let We=B.getViewport(de);s.set(o.x*We.x,o.y*We.y,o.x*We.z,o.y*We.w),Y.viewport(s),B.updateMatrices(U,de),n=B.getFrustum(),l(P,L,B.camera,U,this.type)}B.isPointLightShadow!==!0&&this.type===Yn&&I(B,L),B.needsUpdate=!1}c=this.type,y.needsUpdate=!1,r.setRenderTarget(K,H,C)};function I(A,P){let L=e.update(v);m.defines.VSM_SAMPLES!==A.blurSamples&&(m.defines.VSM_SAMPLES=A.blurSamples,q.defines.VSM_SAMPLES=A.blurSamples,m.needsUpdate=!0,q.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new vn(i.x,i.y)),m.uniforms.shadow_pass.value=A.map.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(P,null,L,m,v,null),q.uniforms.shadow_pass.value=A.mapPass.texture,q.uniforms.resolution.value=A.mapSize,q.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(P,null,L,q,v,null)}function O(A,P,L,K){let H=null,C=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)H=C;else if(H=L.isPointLight===!0?a:u,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let Y=H.uuid,X=P.uuid,D=f[Y];D===void 0&&(D={},f[Y]=D);let w=D[X];w===void 0&&(w=H.clone(),D[X]=w,P.addEventListener("dispose",j)),H=w}if(H.visible=P.visible,H.wireframe=P.wireframe,K===Yn?H.side=P.shadowSide!==null?P.shadowSide:P.side:H.side=P.shadowSide!==null?P.shadowSide:p[P.side],H.alphaMap=P.alphaMap,H.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,H.map=P.map,H.clipShadows=P.clipShadows,H.clippingPlanes=P.clippingPlanes,H.clipIntersection=P.clipIntersection,H.displacementMap=P.displacementMap,H.displacementScale=P.displacementScale,H.displacementBias=P.displacementBias,H.wireframeLinewidth=P.wireframeLinewidth,H.linewidth=P.linewidth,L.isPointLight===!0&&H.isMeshDistanceMaterial===!0){let Y=r.properties.get(H);Y.light=L}return H}function l(A,P,L,K,H){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&H===Yn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);let X=e.update(A),D=A.material;if(Array.isArray(D)){let w=X.groups;for(let N=0,U=w.length;N<U;N++){let B=w[N],ce=D[B.materialIndex];if(ce&&ce.visible){let ve=O(A,ce,K,H);A.onBeforeShadow(r,A,P,L,X,ve,B),r.renderBufferDirect(L,null,X,ve,A,B),A.onAfterShadow(r,A,P,L,X,ve,B)}}}else if(D.visible){let w=O(A,D,K,H);A.onBeforeShadow(r,A,P,L,X,w,null),r.renderBufferDirect(L,null,X,w,A,null),A.onAfterShadow(r,A,P,L,X,w,null)}}let Y=A.children;for(let X=0,D=Y.length;X<D;X++)l(Y[X],P,L,K,H)}function j(A){A.target.removeEventListener("dispose",j);for(let L in f){let K=f[L],H=A.target.uuid;H in K&&(K[H].dispose(),delete K[H])}}}var u3={[$s]:eu,[tu]:iu,[nu]:ou,[Gr]:ru,[eu]:$s,[iu]:tu,[ou]:nu,[ru]:Gr};function a3(r,e){function t(){let G=!1,ae=new yt,le=null,Me=new yt(0,0,0,0);return{setMask:function(fe){le!==fe&&!G&&(r.colorMask(fe,fe,fe,fe),le=fe)},setLocked:function(fe){G=fe},setClear:function(fe,te,Ge,Ae,ut){ut===!0&&(fe*=Ae,te*=Ae,Ge*=Ae),ae.set(fe,te,Ge,Ae),Me.equals(ae)===!1&&(r.clearColor(fe,te,Ge,Ae),Me.copy(ae))},reset:function(){G=!1,le=null,Me.set(-1,0,0,0)}}}function n(){let G=!1,ae=!1,le=null,Me=null,fe=null;return{setReversed:function(te){if(ae!==te){let Ge=e.get("EXT_clip_control");te?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),ae=te;let Ae=fe;fe=null,this.setClear(Ae)}},getReversed:function(){return ae},setTest:function(te){te?re(r.DEPTH_TEST):je(r.DEPTH_TEST)},setMask:function(te){le!==te&&!G&&(r.depthMask(te),le=te)},setFunc:function(te){if(ae&&(te=u3[te]),Me!==te){switch(te){case $s:r.depthFunc(r.NEVER);break;case eu:r.depthFunc(r.ALWAYS);break;case tu:r.depthFunc(r.LESS);break;case Gr:r.depthFunc(r.LEQUAL);break;case nu:r.depthFunc(r.EQUAL);break;case ru:r.depthFunc(r.GEQUAL);break;case iu:r.depthFunc(r.GREATER);break;case ou:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Me=te}},setLocked:function(te){G=te},setClear:function(te){fe!==te&&(ae&&(te=1-te),r.clearDepth(te),fe=te)},reset:function(){G=!1,le=null,Me=null,fe=null,ae=!1}}}function i(){let G=!1,ae=null,le=null,Me=null,fe=null,te=null,Ge=null,Ae=null,ut=null;return{setTest:function(ot){G||(ot?re(r.STENCIL_TEST):je(r.STENCIL_TEST))},setMask:function(ot){ae!==ot&&!G&&(r.stencilMask(ot),ae=ot)},setFunc:function(ot,hn,vt){(le!==ot||Me!==hn||fe!==vt)&&(r.stencilFunc(ot,hn,vt),le=ot,Me=hn,fe=vt)},setOp:function(ot,hn,vt){(te!==ot||Ge!==hn||Ae!==vt)&&(r.stencilOp(ot,hn,vt),te=ot,Ge=hn,Ae=vt)},setLocked:function(ot){G=ot},setClear:function(ot){ut!==ot&&(r.clearStencil(ot),ut=ot)},reset:function(){G=!1,ae=null,le=null,Me=null,fe=null,te=null,Ge=null,Ae=null,ut=null}}}let o=new t,s=new n,u=new i,a=new WeakMap,f=new WeakMap,h={},p={},m=new WeakMap,q=[],g=null,v=!1,y=null,c=null,I=null,O=null,l=null,j=null,A=null,P=new Re(0,0,0),L=0,K=!1,H=null,C=null,Y=null,X=null,D=null,w=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,U=0,B=r.getParameter(r.VERSION);B.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(B)[1]),N=U>=1):B.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),N=U>=2);let ce=null,ve={},de=r.getParameter(r.SCISSOR_BOX),We=r.getParameter(r.VIEWPORT),Ne=new yt().fromArray(de),_e=new yt().fromArray(We);function Ve(G,ae,le,Me){let fe=new Uint8Array(4),te=r.createTexture();r.bindTexture(G,te),r.texParameteri(G,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(G,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ge=0;Ge<le;Ge++)G===r.TEXTURE_3D||G===r.TEXTURE_2D_ARRAY?r.texImage3D(ae,0,r.RGBA,1,1,Me,0,r.RGBA,r.UNSIGNED_BYTE,fe):r.texImage2D(ae+Ge,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,fe);return te}let _={};_[r.TEXTURE_2D]=Ve(r.TEXTURE_2D,r.TEXTURE_2D,1),_[r.TEXTURE_CUBE_MAP]=Ve(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),_[r.TEXTURE_2D_ARRAY]=Ve(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),_[r.TEXTURE_3D]=Ve(r.TEXTURE_3D,r.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),u.setClear(0),re(r.DEPTH_TEST),s.setFunc(Gr),$(!1),Q(Ta),re(r.CULL_FACE),ie(tr);function re(G){h[G]!==!0&&(r.enable(G),h[G]=!0)}function je(G){h[G]!==!1&&(r.disable(G),h[G]=!1)}function Se(G,ae){return p[G]!==ae?(r.bindFramebuffer(G,ae),p[G]=ae,G===r.DRAW_FRAMEBUFFER&&(p[r.FRAMEBUFFER]=ae),G===r.FRAMEBUFFER&&(p[r.DRAW_FRAMEBUFFER]=ae),!0):!1}function we(G,ae){let le=q,Me=!1;if(G){le=m.get(ae),le===void 0&&(le=[],m.set(ae,le));let fe=G.textures;if(le.length!==fe.length||le[0]!==r.COLOR_ATTACHMENT0){for(let te=0,Ge=fe.length;te<Ge;te++)le[te]=r.COLOR_ATTACHMENT0+te;le.length=fe.length,Me=!0}}else le[0]!==r.BACK&&(le[0]=r.BACK,Me=!0);Me&&r.drawBuffers(le)}function tt(G){return g!==G?(r.useProgram(G),g=G,!0):!1}let ht={[mr]:r.FUNC_ADD,[zh]:r.FUNC_SUBTRACT,[Ch]:r.FUNC_REVERSE_SUBTRACT};ht[Sh]=r.MIN,ht[Mh]=r.MAX;let S={[wh]:r.ZERO,[Yh]:r.ONE,[Gh]:r.SRC_COLOR,[As]:r.SRC_ALPHA,[kh]:r.SRC_ALPHA_SATURATE,[Th]:r.DST_COLOR,[Dh]:r.DST_ALPHA,[Xh]:r.ONE_MINUS_SRC_COLOR,[Ls]:r.ONE_MINUS_SRC_ALPHA,[Wh]:r.ONE_MINUS_DST_COLOR,[Jh]:r.ONE_MINUS_DST_ALPHA,[Nh]:r.CONSTANT_COLOR,[Zh]:r.ONE_MINUS_CONSTANT_COLOR,[Bh]:r.CONSTANT_ALPHA,[Eh]:r.ONE_MINUS_CONSTANT_ALPHA};function ie(G,ae,le,Me,fe,te,Ge,Ae,ut,ot){if(G===tr){v===!0&&(je(r.BLEND),v=!1);return}if(v===!1&&(re(r.BLEND),v=!0),G!==Ph){if(G!==y||ot!==K){if((c!==mr||l!==mr)&&(r.blendEquation(r.FUNC_ADD),c=mr,l=mr),ot)switch(G){case Yr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ka:r.blendFunc(r.ONE,r.ONE);break;case Na:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Za:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Yr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ka:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Na:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Za:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}I=null,O=null,j=null,A=null,P.set(0,0,0),L=0,y=G,K=ot}return}fe=fe||ae,te=te||le,Ge=Ge||Me,(ae!==c||fe!==l)&&(r.blendEquationSeparate(ht[ae],ht[fe]),c=ae,l=fe),(le!==I||Me!==O||te!==j||Ge!==A)&&(r.blendFuncSeparate(S[le],S[Me],S[te],S[Ge]),I=le,O=Me,j=te,A=Ge),(Ae.equals(P)===!1||ut!==L)&&(r.blendColor(Ae.r,Ae.g,Ae.b,ut),P.copy(Ae),L=ut),y=G,K=!1}function ee(G,ae){G.side===Ot?je(r.CULL_FACE):re(r.CULL_FACE);let le=G.side===Wt;ae&&(le=!le),$(le),G.blending===Yr&&G.transparent===!1?ie(tr):ie(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),s.setFunc(G.depthFunc),s.setTest(G.depthTest),s.setMask(G.depthWrite),o.setMask(G.colorWrite);let Me=G.stencilWrite;u.setTest(Me),Me&&(u.setMask(G.stencilWriteMask),u.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),u.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),he(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?re(r.SAMPLE_ALPHA_TO_COVERAGE):je(r.SAMPLE_ALPHA_TO_COVERAGE)}function $(G){H!==G&&(G?r.frontFace(r.CW):r.frontFace(r.CCW),H=G)}function Q(G){G!==Lh?(re(r.CULL_FACE),G!==C&&(G===Ta?r.cullFace(r.BACK):G===xh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):je(r.CULL_FACE),C=G}function ye(G){G!==Y&&(N&&r.lineWidth(G),Y=G)}function he(G,ae,le){G?(re(r.POLYGON_OFFSET_FILL),(X!==ae||D!==le)&&(r.polygonOffset(ae,le),X=ae,D=le)):je(r.POLYGON_OFFSET_FILL)}function ge(G){G?re(r.SCISSOR_TEST):je(r.SCISSOR_TEST)}function Ee(G){G===void 0&&(G=r.TEXTURE0+w-1),ce!==G&&(r.activeTexture(G),ce=G)}function Te(G,ae,le){le===void 0&&(ce===null?le=r.TEXTURE0+w-1:le=ce);let Me=ve[le];Me===void 0&&(Me={type:void 0,texture:void 0},ve[le]=Me),(Me.type!==G||Me.texture!==ae)&&(ce!==le&&(r.activeTexture(le),ce=le),r.bindTexture(G,ae||_[G]),Me.type=G,Me.texture=ae)}function x(){let G=ve[ce];G!==void 0&&G.type!==void 0&&(r.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function d(){try{r.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function W(){try{r.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function R(){try{r.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function oe(){try{r.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function V(){try{r.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ye(){try{r.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{r.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Le(){try{r.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function xe(){try{r.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ue(){try{r.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Oe(G){Ne.equals(G)===!1&&(r.scissor(G.x,G.y,G.z,G.w),Ne.copy(G))}function ke(G){_e.equals(G)===!1&&(r.viewport(G.x,G.y,G.z,G.w),_e.copy(G))}function De(G,ae){let le=f.get(ae);le===void 0&&(le=new WeakMap,f.set(ae,le));let Me=le.get(G);Me===void 0&&(Me=r.getUniformBlockIndex(ae,G.name),le.set(G,Me))}function He(G,ae){let Me=f.get(ae).get(G);a.get(ae)!==Me&&(r.uniformBlockBinding(ae,Me,G.__bindingPointIndex),a.set(ae,Me))}function Ue(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ce=null,ve={},p={},m=new WeakMap,q=[],g=null,v=!1,y=null,c=null,I=null,O=null,l=null,j=null,A=null,P=new Re(0,0,0),L=0,K=!1,H=null,C=null,Y=null,X=null,D=null,Ne.set(0,0,r.canvas.width,r.canvas.height),_e.set(0,0,r.canvas.width,r.canvas.height),o.reset(),s.reset(),u.reset()}return{buffers:{color:o,depth:s,stencil:u},enable:re,disable:je,bindFramebuffer:Se,drawBuffers:we,useProgram:tt,setBlending:ie,setMaterial:ee,setFlipSided:$,setCullFace:Q,setLineWidth:ye,setPolygonOffset:he,setScissorTest:ge,activeTexture:Ee,bindTexture:Te,unbindTexture:x,compressedTexImage2D:d,compressedTexImage3D:W,texImage2D:xe,texImage3D:ue,updateUBOMapping:De,uniformBlockBinding:He,texStorage2D:me,texStorage3D:Le,texSubImage2D:R,texSubImage3D:oe,compressedTexSubImage2D:V,compressedTexSubImage3D:Ye,scissor:Oe,viewport:ke,reset:Ue}}function f3(r,e,t,n,i,o,s){let u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new se,h=new WeakMap,p,m=new WeakMap,q=!1;try{q=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,d){return q?new OffscreenCanvas(x,d):Oi("canvas")}function v(x,d,W){let R=1,oe=Te(x);if((oe.width>W||oe.height>W)&&(R=W/Math.max(oe.width,oe.height)),R<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){let V=Math.floor(R*oe.width),Ye=Math.floor(R*oe.height);p===void 0&&(p=g(V,Ye));let me=d?g(V,Ye):p;return me.width=V,me.height=Ye,me.getContext("2d").drawImage(x,0,0,V,Ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+V+"x"+Ye+")."),me}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),x;return x}function y(x){return x.generateMipmaps}function c(x){r.generateMipmap(x)}function I(x){return x.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?r.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function O(x,d,W,R,oe=!1){if(x!==null){if(r[x]!==void 0)return r[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let V=d;if(d===r.RED&&(W===r.FLOAT&&(V=r.R32F),W===r.HALF_FLOAT&&(V=r.R16F),W===r.UNSIGNED_BYTE&&(V=r.R8)),d===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(V=r.R8UI),W===r.UNSIGNED_SHORT&&(V=r.R16UI),W===r.UNSIGNED_INT&&(V=r.R32UI),W===r.BYTE&&(V=r.R8I),W===r.SHORT&&(V=r.R16I),W===r.INT&&(V=r.R32I)),d===r.RG&&(W===r.FLOAT&&(V=r.RG32F),W===r.HALF_FLOAT&&(V=r.RG16F),W===r.UNSIGNED_BYTE&&(V=r.RG8)),d===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(V=r.RG8UI),W===r.UNSIGNED_SHORT&&(V=r.RG16UI),W===r.UNSIGNED_INT&&(V=r.RG32UI),W===r.BYTE&&(V=r.RG8I),W===r.SHORT&&(V=r.RG16I),W===r.INT&&(V=r.RG32I)),d===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(V=r.RGB8UI),W===r.UNSIGNED_SHORT&&(V=r.RGB16UI),W===r.UNSIGNED_INT&&(V=r.RGB32UI),W===r.BYTE&&(V=r.RGB8I),W===r.SHORT&&(V=r.RGB16I),W===r.INT&&(V=r.RGB32I)),d===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(V=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(V=r.RGBA16UI),W===r.UNSIGNED_INT&&(V=r.RGBA32UI),W===r.BYTE&&(V=r.RGBA8I),W===r.SHORT&&(V=r.RGBA16I),W===r.INT&&(V=r.RGBA32I)),d===r.RGB&&(W===r.UNSIGNED_INT_5_9_9_9_REV&&(V=r.RGB9_E5),W===r.UNSIGNED_INT_10F_11F_11F_REV&&(V=r.R11F_G11F_B10F)),d===r.RGBA){let Ye=oe?ao:ft.getTransfer(R);W===r.FLOAT&&(V=r.RGBA32F),W===r.HALF_FLOAT&&(V=r.RGBA16F),W===r.UNSIGNED_BYTE&&(V=Ye===qt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(V=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(V=r.RGB5_A1)}return(V===r.R16F||V===r.R32F||V===r.RG16F||V===r.RG32F||V===r.RGBA16F||V===r.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function l(x,d){let W;return x?d===null||d===Ir||d===Xi?W=r.DEPTH24_STENCIL8:d===kt?W=r.DEPTH32F_STENCIL8:d===Gi&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):d===null||d===Ir||d===Xi?W=r.DEPTH_COMPONENT24:d===kt?W=r.DEPTH_COMPONENT32F:d===Gi&&(W=r.DEPTH_COMPONENT16),W}function j(x,d){return y(x)===!0||x.isFramebufferTexture&&x.minFilter!==Gt&&x.minFilter!==It?Math.log2(Math.max(d.width,d.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?d.mipmaps.length:1}function A(x){let d=x.target;d.removeEventListener("dispose",A),L(d),d.isVideoTexture&&h.delete(d)}function P(x){let d=x.target;d.removeEventListener("dispose",P),H(d)}function L(x){let d=n.get(x);if(d.__webglInit===void 0)return;let W=x.source,R=m.get(W);if(R){let oe=R[d.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&K(x),Object.keys(R).length===0&&m.delete(W)}n.remove(x)}function K(x){let d=n.get(x);r.deleteTexture(d.__webglTexture);let W=x.source,R=m.get(W);delete R[d.__cacheKey],s.memory.textures--}function H(x){let d=n.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),n.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let R=0;R<6;R++){if(Array.isArray(d.__webglFramebuffer[R]))for(let oe=0;oe<d.__webglFramebuffer[R].length;oe++)r.deleteFramebuffer(d.__webglFramebuffer[R][oe]);else r.deleteFramebuffer(d.__webglFramebuffer[R]);d.__webglDepthbuffer&&r.deleteRenderbuffer(d.__webglDepthbuffer[R])}else{if(Array.isArray(d.__webglFramebuffer))for(let R=0;R<d.__webglFramebuffer.length;R++)r.deleteFramebuffer(d.__webglFramebuffer[R]);else r.deleteFramebuffer(d.__webglFramebuffer);if(d.__webglDepthbuffer&&r.deleteRenderbuffer(d.__webglDepthbuffer),d.__webglMultisampledFramebuffer&&r.deleteFramebuffer(d.__webglMultisampledFramebuffer),d.__webglColorRenderbuffer)for(let R=0;R<d.__webglColorRenderbuffer.length;R++)d.__webglColorRenderbuffer[R]&&r.deleteRenderbuffer(d.__webglColorRenderbuffer[R]);d.__webglDepthRenderbuffer&&r.deleteRenderbuffer(d.__webglDepthRenderbuffer)}let W=x.textures;for(let R=0,oe=W.length;R<oe;R++){let V=n.get(W[R]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),s.memory.textures--),n.remove(W[R])}n.remove(x)}let C=0;function Y(){C=0}function X(){let x=C;return x>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+i.maxTextures),C+=1,x}function D(x){let d=[];return d.push(x.wrapS),d.push(x.wrapT),d.push(x.wrapR||0),d.push(x.magFilter),d.push(x.minFilter),d.push(x.anisotropy),d.push(x.internalFormat),d.push(x.format),d.push(x.type),d.push(x.generateMipmaps),d.push(x.premultiplyAlpha),d.push(x.flipY),d.push(x.unpackAlignment),d.push(x.colorSpace),d.join()}function w(x,d){let W=n.get(x);if(x.isVideoTexture&&ge(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&W.__version!==x.version){let R=x.image;if(R===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(R.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_(W,x,d);return}}else x.isExternalTexture&&(W.__webglTexture=x.sourceTexture?x.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+d)}function N(x,d){let W=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&W.__version!==x.version){_(W,x,d);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+d)}function U(x,d){let W=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&W.__version!==x.version){_(W,x,d);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+d)}function B(x,d){let W=n.get(x);if(x.version>0&&W.__version!==x.version){re(W,x,d);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+d)}let ce={[gn]:r.REPEAT,[yn]:r.CLAMP_TO_EDGE,[di]:r.MIRRORED_REPEAT},ve={[Gt]:r.NEAREST,[au]:r.NEAREST_MIPMAP_NEAREST,[Br]:r.NEAREST_MIPMAP_LINEAR,[It]:r.LINEAR,[Yi]:r.LINEAR_MIPMAP_NEAREST,[on]:r.LINEAR_MIPMAP_LINEAR},de={[i6]:r.NEVER,[h6]:r.ALWAYS,[o6]:r.LESS,[tf]:r.LEQUAL,[s6]:r.EQUAL,[f6]:r.GEQUAL,[u6]:r.GREATER,[a6]:r.NOTEQUAL};function We(x,d){if(d.type===kt&&e.has("OES_texture_float_linear")===!1&&(d.magFilter===It||d.magFilter===Yi||d.magFilter===Br||d.magFilter===on||d.minFilter===It||d.minFilter===Yi||d.minFilter===Br||d.minFilter===on)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(x,r.TEXTURE_WRAP_S,ce[d.wrapS]),r.texParameteri(x,r.TEXTURE_WRAP_T,ce[d.wrapT]),(x===r.TEXTURE_3D||x===r.TEXTURE_2D_ARRAY)&&r.texParameteri(x,r.TEXTURE_WRAP_R,ce[d.wrapR]),r.texParameteri(x,r.TEXTURE_MAG_FILTER,ve[d.magFilter]),r.texParameteri(x,r.TEXTURE_MIN_FILTER,ve[d.minFilter]),d.compareFunction&&(r.texParameteri(x,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(x,r.TEXTURE_COMPARE_FUNC,de[d.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(d.magFilter===Gt||d.minFilter!==Br&&d.minFilter!==on||d.type===kt&&e.has("OES_texture_float_linear")===!1)return;if(d.anisotropy>1||n.get(d).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(x,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(d.anisotropy,i.getMaxAnisotropy())),n.get(d).__currentAnisotropy=d.anisotropy}}}function Ne(x,d){let W=!1;x.__webglInit===void 0&&(x.__webglInit=!0,d.addEventListener("dispose",A));let R=d.source,oe=m.get(R);oe===void 0&&(oe={},m.set(R,oe));let V=D(d);if(V!==x.__cacheKey){oe[V]===void 0&&(oe[V]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,W=!0),oe[V].usedTimes++;let Ye=oe[x.__cacheKey];Ye!==void 0&&(oe[x.__cacheKey].usedTimes--,Ye.usedTimes===0&&K(d)),x.__cacheKey=V,x.__webglTexture=oe[V].texture}return W}function _e(x,d,W){return Math.floor(Math.floor(x/W)/d)}function Ve(x,d,W,R){let V=x.updateRanges;if(V.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,d.width,d.height,W,R,d.data);else{V.sort((ue,Oe)=>ue.start-Oe.start);let Ye=0;for(let ue=1;ue<V.length;ue++){let Oe=V[Ye],ke=V[ue],De=Oe.start+Oe.count,He=_e(ke.start,d.width,4),Ue=_e(Oe.start,d.width,4);ke.start<=De+1&&He===Ue&&_e(ke.start+ke.count-1,d.width,4)===He?Oe.count=Math.max(Oe.count,ke.start+ke.count-Oe.start):(++Ye,V[Ye]=ke)}V.length=Ye+1;let me=r.getParameter(r.UNPACK_ROW_LENGTH),Le=r.getParameter(r.UNPACK_SKIP_PIXELS),xe=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,d.width);for(let ue=0,Oe=V.length;ue<Oe;ue++){let ke=V[ue],De=Math.floor(ke.start/4),He=Math.ceil(ke.count/4),Ue=De%d.width,G=Math.floor(De/d.width),ae=He,le=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ue),r.pixelStorei(r.UNPACK_SKIP_ROWS,G),t.texSubImage2D(r.TEXTURE_2D,0,Ue,G,ae,le,W,R,d.data)}x.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,me),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Le),r.pixelStorei(r.UNPACK_SKIP_ROWS,xe)}}function _(x,d,W){let R=r.TEXTURE_2D;(d.isDataArrayTexture||d.isCompressedArrayTexture)&&(R=r.TEXTURE_2D_ARRAY),d.isData3DTexture&&(R=r.TEXTURE_3D);let oe=Ne(x,d),V=d.source;t.bindTexture(R,x.__webglTexture,r.TEXTURE0+W);let Ye=n.get(V);if(V.version!==Ye.__version||oe===!0){t.activeTexture(r.TEXTURE0+W);let me=ft.getPrimaries(ft.workingColorSpace),Le=d.colorSpace===Rt?null:ft.getPrimaries(d.colorSpace),xe=d.colorSpace===Rt||me===Le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,d.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,d.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let ue=v(d.image,!1,i.maxTextureSize);ue=Ee(d,ue);let Oe=o.convert(d.format,d.colorSpace),ke=o.convert(d.type),De=O(d.internalFormat,Oe,ke,d.colorSpace,d.isVideoTexture);We(R,d);let He,Ue=d.mipmaps,G=d.isVideoTexture!==!0,ae=Ye.__version===void 0||oe===!0,le=V.dataReady,Me=j(d,ue);if(d.isDepthTexture)De=l(d.format===Di,d.type),ae&&(G?t.texStorage2D(r.TEXTURE_2D,1,De,ue.width,ue.height):t.texImage2D(r.TEXTURE_2D,0,De,ue.width,ue.height,0,Oe,ke,null));else if(d.isDataTexture)if(Ue.length>0){G&&ae&&t.texStorage2D(r.TEXTURE_2D,Me,De,Ue[0].width,Ue[0].height);for(let fe=0,te=Ue.length;fe<te;fe++)He=Ue[fe],G?le&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,He.width,He.height,Oe,ke,He.data):t.texImage2D(r.TEXTURE_2D,fe,De,He.width,He.height,0,Oe,ke,He.data);d.generateMipmaps=!1}else G?(ae&&t.texStorage2D(r.TEXTURE_2D,Me,De,ue.width,ue.height),le&&Ve(d,ue,Oe,ke)):t.texImage2D(r.TEXTURE_2D,0,De,ue.width,ue.height,0,Oe,ke,ue.data);else if(d.isCompressedTexture)if(d.isCompressedArrayTexture){G&&ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Me,De,Ue[0].width,Ue[0].height,ue.depth);for(let fe=0,te=Ue.length;fe<te;fe++)if(He=Ue[fe],d.format!==Ft)if(Oe!==null)if(G){if(le)if(d.layerUpdates.size>0){let Ge=hf(He.width,He.height,d.format,d.type);for(let Ae of d.layerUpdates){let ut=He.data.subarray(Ae*Ge/He.data.BYTES_PER_ELEMENT,(Ae+1)*Ge/He.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,Ae,He.width,He.height,1,Oe,ut)}d.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,He.width,He.height,ue.depth,Oe,He.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,fe,De,He.width,He.height,ue.depth,0,He.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else G?le&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,fe,0,0,0,He.width,He.height,ue.depth,Oe,ke,He.data):t.texImage3D(r.TEXTURE_2D_ARRAY,fe,De,He.width,He.height,ue.depth,0,Oe,ke,He.data)}else{G&&ae&&t.texStorage2D(r.TEXTURE_2D,Me,De,Ue[0].width,Ue[0].height);for(let fe=0,te=Ue.length;fe<te;fe++)He=Ue[fe],d.format!==Ft?Oe!==null?G?le&&t.compressedTexSubImage2D(r.TEXTURE_2D,fe,0,0,He.width,He.height,Oe,He.data):t.compressedTexImage2D(r.TEXTURE_2D,fe,De,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):G?le&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,He.width,He.height,Oe,ke,He.data):t.texImage2D(r.TEXTURE_2D,fe,De,He.width,He.height,0,Oe,ke,He.data)}else if(d.isDataArrayTexture)if(G){if(ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Me,De,ue.width,ue.height,ue.depth),le)if(d.layerUpdates.size>0){let fe=hf(ue.width,ue.height,d.format,d.type);for(let te of d.layerUpdates){let Ge=ue.data.subarray(te*fe/ue.data.BYTES_PER_ELEMENT,(te+1)*fe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,ue.width,ue.height,1,Oe,ke,Ge)}d.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Oe,ke,ue.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,De,ue.width,ue.height,ue.depth,0,Oe,ke,ue.data);else if(d.isData3DTexture)G?(ae&&t.texStorage3D(r.TEXTURE_3D,Me,De,ue.width,ue.height,ue.depth),le&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Oe,ke,ue.data)):t.texImage3D(r.TEXTURE_3D,0,De,ue.width,ue.height,ue.depth,0,Oe,ke,ue.data);else if(d.isFramebufferTexture){if(ae)if(G)t.texStorage2D(r.TEXTURE_2D,Me,De,ue.width,ue.height);else{let fe=ue.width,te=ue.height;for(let Ge=0;Ge<Me;Ge++)t.texImage2D(r.TEXTURE_2D,Ge,De,fe,te,0,Oe,ke,null),fe>>=1,te>>=1}}else if(Ue.length>0){if(G&&ae){let fe=Te(Ue[0]);t.texStorage2D(r.TEXTURE_2D,Me,De,fe.width,fe.height)}for(let fe=0,te=Ue.length;fe<te;fe++)He=Ue[fe],G?le&&t.texSubImage2D(r.TEXTURE_2D,fe,0,0,Oe,ke,He):t.texImage2D(r.TEXTURE_2D,fe,De,Oe,ke,He);d.generateMipmaps=!1}else if(G){if(ae){let fe=Te(ue);t.texStorage2D(r.TEXTURE_2D,Me,De,fe.width,fe.height)}le&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Oe,ke,ue)}else t.texImage2D(r.TEXTURE_2D,0,De,Oe,ke,ue);y(d)&&c(R),Ye.__version=V.version,d.onUpdate&&d.onUpdate(d)}x.__version=d.version}function re(x,d,W){if(d.image.length!==6)return;let R=Ne(x,d),oe=d.source;t.bindTexture(r.TEXTURE_CUBE_MAP,x.__webglTexture,r.TEXTURE0+W);let V=n.get(oe);if(oe.version!==V.__version||R===!0){t.activeTexture(r.TEXTURE0+W);let Ye=ft.getPrimaries(ft.workingColorSpace),me=d.colorSpace===Rt?null:ft.getPrimaries(d.colorSpace),Le=d.colorSpace===Rt||Ye===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,d.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,d.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let xe=d.isCompressedTexture||d.image[0].isCompressedTexture,ue=d.image[0]&&d.image[0].isDataTexture,Oe=[];for(let te=0;te<6;te++)!xe&&!ue?Oe[te]=v(d.image[te],!0,i.maxCubemapSize):Oe[te]=ue?d.image[te].image:d.image[te],Oe[te]=Ee(d,Oe[te]);let ke=Oe[0],De=o.convert(d.format,d.colorSpace),He=o.convert(d.type),Ue=O(d.internalFormat,De,He,d.colorSpace),G=d.isVideoTexture!==!0,ae=V.__version===void 0||R===!0,le=oe.dataReady,Me=j(d,ke);We(r.TEXTURE_CUBE_MAP,d);let fe;if(xe){G&&ae&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Me,Ue,ke.width,ke.height);for(let te=0;te<6;te++){fe=Oe[te].mipmaps;for(let Ge=0;Ge<fe.length;Ge++){let Ae=fe[Ge];d.format!==Ft?De!==null?G?le&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge,0,0,Ae.width,Ae.height,De,Ae.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge,Ue,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge,0,0,Ae.width,Ae.height,De,He,Ae.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge,Ue,Ae.width,Ae.height,0,De,He,Ae.data)}}}else{if(fe=d.mipmaps,G&&ae){fe.length>0&&Me++;let te=Te(Oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Me,Ue,te.width,te.height)}for(let te=0;te<6;te++)if(ue){G?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Oe[te].width,Oe[te].height,De,He,Oe[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ue,Oe[te].width,Oe[te].height,0,De,He,Oe[te].data);for(let Ge=0;Ge<fe.length;Ge++){let ut=fe[Ge].image[te].image;G?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge+1,0,0,ut.width,ut.height,De,He,ut.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge+1,Ue,ut.width,ut.height,0,De,He,ut.data)}}else{G?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,De,He,Oe[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ue,De,He,Oe[te]);for(let Ge=0;Ge<fe.length;Ge++){let Ae=fe[Ge];G?le&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge+1,0,0,De,He,Ae.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ge+1,Ue,De,He,Ae.image[te])}}}y(d)&&c(r.TEXTURE_CUBE_MAP),V.__version=oe.version,d.onUpdate&&d.onUpdate(d)}x.__version=d.version}function je(x,d,W,R,oe,V){let Ye=o.convert(W.format,W.colorSpace),me=o.convert(W.type),Le=O(W.internalFormat,Ye,me,W.colorSpace),xe=n.get(d),ue=n.get(W);if(ue.__renderTarget=d,!xe.__hasExternalTextures){let Oe=Math.max(1,d.width>>V),ke=Math.max(1,d.height>>V);oe===r.TEXTURE_3D||oe===r.TEXTURE_2D_ARRAY?t.texImage3D(oe,V,Le,Oe,ke,d.depth,0,Ye,me,null):t.texImage2D(oe,V,Le,Oe,ke,0,Ye,me,null)}t.bindFramebuffer(r.FRAMEBUFFER,x),he(d)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,R,oe,ue.__webglTexture,0,ye(d)):(oe===r.TEXTURE_2D||oe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,R,oe,ue.__webglTexture,V),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Se(x,d,W){if(r.bindRenderbuffer(r.RENDERBUFFER,x),d.depthBuffer){let R=d.depthTexture,oe=R&&R.isDepthTexture?R.type:null,V=l(d.stencilBuffer,oe),Ye=d.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=ye(d);he(d)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,V,d.width,d.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,V,d.width,d.height):r.renderbufferStorage(r.RENDERBUFFER,V,d.width,d.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ye,r.RENDERBUFFER,x)}else{let R=d.textures;for(let oe=0;oe<R.length;oe++){let V=R[oe],Ye=o.convert(V.format,V.colorSpace),me=o.convert(V.type),Le=O(V.internalFormat,Ye,me,V.colorSpace),xe=ye(d);W&&he(d)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,Le,d.width,d.height):he(d)?u.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,Le,d.width,d.height):r.renderbufferStorage(r.RENDERBUFFER,Le,d.width,d.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(x,d){if(d&&d.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,x),!(d.depthTexture&&d.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let R=n.get(d.depthTexture);R.__renderTarget=d,(!R.__webglTexture||d.depthTexture.image.width!==d.width||d.depthTexture.image.height!==d.height)&&(d.depthTexture.image.width=d.width,d.depthTexture.image.height=d.height,d.depthTexture.needsUpdate=!0),w(d.depthTexture,0);let oe=R.__webglTexture,V=ye(d);if(d.depthTexture.format===Hi)he(d)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0,V):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0);else if(d.depthTexture.format===Di)he(d)?u.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0,V):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function tt(x){let d=n.get(x),W=x.isWebGLCubeRenderTarget===!0;if(d.__boundDepthTexture!==x.depthTexture){let R=x.depthTexture;if(d.__depthDisposeCallback&&d.__depthDisposeCallback(),R){let oe=()=>{delete d.__boundDepthTexture,delete d.__depthDisposeCallback,R.removeEventListener("dispose",oe)};R.addEventListener("dispose",oe),d.__depthDisposeCallback=oe}d.__boundDepthTexture=R}if(x.depthTexture&&!d.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");let R=x.texture.mipmaps;R&&R.length>0?we(d.__webglFramebuffer[0],x):we(d.__webglFramebuffer,x)}else if(W){d.__webglDepthbuffer=[];for(let R=0;R<6;R++)if(t.bindFramebuffer(r.FRAMEBUFFER,d.__webglFramebuffer[R]),d.__webglDepthbuffer[R]===void 0)d.__webglDepthbuffer[R]=r.createRenderbuffer(),Se(d.__webglDepthbuffer[R],x,!1);else{let oe=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=d.__webglDepthbuffer[R];r.bindRenderbuffer(r.RENDERBUFFER,V),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,V)}}else{let R=x.texture.mipmaps;if(R&&R.length>0?t.bindFramebuffer(r.FRAMEBUFFER,d.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,d.__webglFramebuffer),d.__webglDepthbuffer===void 0)d.__webglDepthbuffer=r.createRenderbuffer(),Se(d.__webglDepthbuffer,x,!1);else{let oe=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=d.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,V),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,V)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ht(x,d,W){let R=n.get(x);d!==void 0&&je(R.__webglFramebuffer,x,x.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&tt(x)}function S(x){let d=x.texture,W=n.get(x),R=n.get(d);x.addEventListener("dispose",P);let oe=x.textures,V=x.isWebGLCubeRenderTarget===!0,Ye=oe.length>1;if(Ye||(R.__webglTexture===void 0&&(R.__webglTexture=r.createTexture()),R.__version=d.version,s.memory.textures++),V){W.__webglFramebuffer=[];for(let me=0;me<6;me++)if(d.mipmaps&&d.mipmaps.length>0){W.__webglFramebuffer[me]=[];for(let Le=0;Le<d.mipmaps.length;Le++)W.__webglFramebuffer[me][Le]=r.createFramebuffer()}else W.__webglFramebuffer[me]=r.createFramebuffer()}else{if(d.mipmaps&&d.mipmaps.length>0){W.__webglFramebuffer=[];for(let me=0;me<d.mipmaps.length;me++)W.__webglFramebuffer[me]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(Ye)for(let me=0,Le=oe.length;me<Le;me++){let xe=n.get(oe[me]);xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture(),s.memory.textures++)}if(x.samples>0&&he(x)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let me=0;me<oe.length;me++){let Le=oe[me];W.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[me]);let xe=o.convert(Le.format,Le.colorSpace),ue=o.convert(Le.type),Oe=O(Le.internalFormat,xe,ue,Le.colorSpace,x.isXRRenderTarget===!0),ke=ye(x);r.renderbufferStorageMultisample(r.RENDERBUFFER,ke,Oe,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,W.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),x.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),Se(W.__webglDepthRenderbuffer,x,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(V){t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture),We(r.TEXTURE_CUBE_MAP,d);for(let me=0;me<6;me++)if(d.mipmaps&&d.mipmaps.length>0)for(let Le=0;Le<d.mipmaps.length;Le++)je(W.__webglFramebuffer[me][Le],x,d,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Le);else je(W.__webglFramebuffer[me],x,d,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);y(d)&&c(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ye){for(let me=0,Le=oe.length;me<Le;me++){let xe=oe[me],ue=n.get(xe),Oe=r.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(Oe=x.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Oe,ue.__webglTexture),We(Oe,xe),je(W.__webglFramebuffer,x,xe,r.COLOR_ATTACHMENT0+me,Oe,0),y(xe)&&c(Oe)}t.unbindTexture()}else{let me=r.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(me=x.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,R.__webglTexture),We(me,d),d.mipmaps&&d.mipmaps.length>0)for(let Le=0;Le<d.mipmaps.length;Le++)je(W.__webglFramebuffer[Le],x,d,r.COLOR_ATTACHMENT0,me,Le);else je(W.__webglFramebuffer,x,d,r.COLOR_ATTACHMENT0,me,0);y(d)&&c(me),t.unbindTexture()}x.depthBuffer&&tt(x)}function ie(x){let d=x.textures;for(let W=0,R=d.length;W<R;W++){let oe=d[W];if(y(oe)){let V=I(x),Ye=n.get(oe).__webglTexture;t.bindTexture(V,Ye),c(V),t.unbindTexture()}}}let ee=[],$=[];function Q(x){if(x.samples>0){if(he(x)===!1){let d=x.textures,W=x.width,R=x.height,oe=r.COLOR_BUFFER_BIT,V=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ye=n.get(x),me=d.length>1;if(me)for(let xe=0;xe<d.length;xe++)t.bindFramebuffer(r.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer);let Le=x.texture.mipmaps;Le&&Le.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ye.__webglFramebuffer);for(let xe=0;xe<d.length;xe++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(oe|=r.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(oe|=r.STENCIL_BUFFER_BIT)),me){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ye.__webglColorRenderbuffer[xe]);let ue=n.get(d[xe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ue,0)}r.blitFramebuffer(0,0,W,R,0,0,W,R,oe,r.NEAREST),a===!0&&(ee.length=0,$.length=0,ee.push(r.COLOR_ATTACHMENT0+xe),x.depthBuffer&&x.resolveDepthBuffer===!1&&(ee.push(V),$.push(V),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,$)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ee))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let xe=0;xe<d.length;xe++){t.bindFramebuffer(r.FRAMEBUFFER,Ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,Ye.__webglColorRenderbuffer[xe]);let ue=n.get(d[xe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,ue,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ye.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&a){let d=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[d])}}}function ye(x){return Math.min(i.maxSamples,x.samples)}function he(x){let d=n.get(x);return x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&d.__useRenderToTexture!==!1}function ge(x){let d=s.render.frame;h.get(x)!==d&&(h.set(x,d),x.update())}function Ee(x,d){let W=x.colorSpace,R=x.format,oe=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||W!==Un&&W!==Rt&&(ft.getTransfer(W)===qt?(R!==Ft||oe!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),d}function Te(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(f.width=x.naturalWidth||x.width,f.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(f.width=x.displayWidth,f.height=x.displayHeight):(f.width=x.width,f.height=x.height),f}this.allocateTextureUnit=X,this.resetTextureUnits=Y,this.setTexture2D=w,this.setTexture2DArray=N,this.setTexture3D=U,this.setTextureCube=B,this.rebindTextures=ht,this.setupRenderTarget=S,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=je,this.useMultisampledRTT=he}function h3(r,e){function t(n,i=Rt){let o,s=ft.getTransfer(i);if(n===Pn)return r.UNSIGNED_BYTE;if(n===hu)return r.UNSIGNED_SHORT_4_4_4_4;if(n===pu)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Va)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ua)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fa)return r.BYTE;if(n===Ra)return r.SHORT;if(n===Gi)return r.UNSIGNED_SHORT;if(n===fu)return r.INT;if(n===Ir)return r.UNSIGNED_INT;if(n===kt)return r.FLOAT;if(n===sn)return r.HALF_FLOAT;if(n===Qa)return r.ALPHA;if(n===_a)return r.RGB;if(n===Ft)return r.RGBA;if(n===Hi)return r.DEPTH_COMPONENT;if(n===Di)return r.DEPTH_STENCIL;if(n===qu)return r.RED;if(n===mu)return r.RED_INTEGER;if(n===$a)return r.RG;if(n===cu)return r.RG_INTEGER;if(n===yu)return r.RGBA_INTEGER;if(n===ko||n===No||n===Zo||n===Bo)if(s===qt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===ko)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===No)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Bo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===ko)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===No)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Bo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gu||n===vu||n===lu||n===du)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===gu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===du)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Hu||n===Ku||n===bu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Hu||n===Ku)return s===qt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===bu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ou||n===ju||n===Iu||n===Au||n===Lu||n===xu||n===Pu||n===zu||n===Cu||n===Su||n===Mu||n===wu||n===Yu||n===Gu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Ou)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ju)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Iu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Au)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Su)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gu)return s===qt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xu||n===Du||n===Ju)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Xu)return s===qt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Du)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ju)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tu||n===Wu||n===ku||n===Nu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Tu)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Wu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ku)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var p3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q3=`
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

}`,Of=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ko(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new en({vertexShader:p3,fragmentShader:q3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},jf=class extends Cn{constructor(e,t){super();let n=this,i=null,o=1,s=null,u="local-floor",a=1,f=null,h=null,p=null,m=null,q=null,g=null,v=typeof XRWebGLBinding<"u",y=new Of,c={},I=t.getContextAttributes(),O=null,l=null,j=[],A=[],P=new se,L=null,K=new Ct;K.viewport=new yt;let H=new Ct;H.viewport=new yt;let C=[K,H],Y=new Qs,X=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(_){let re=j[_];return re===void 0&&(re=new Li,j[_]=re),re.getTargetRaySpace()},this.getControllerGrip=function(_){let re=j[_];return re===void 0&&(re=new Li,j[_]=re),re.getGripSpace()},this.getHand=function(_){let re=j[_];return re===void 0&&(re=new Li,j[_]=re),re.getHandSpace()};function w(_){let re=A.indexOf(_.inputSource);if(re===-1)return;let je=j[re];je!==void 0&&(je.update(_.inputSource,_.frame,f||s),je.dispatchEvent({type:_.type,data:_.inputSource}))}function N(){i.removeEventListener("select",w),i.removeEventListener("selectstart",w),i.removeEventListener("selectend",w),i.removeEventListener("squeeze",w),i.removeEventListener("squeezestart",w),i.removeEventListener("squeezeend",w),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",U);for(let _=0;_<j.length;_++){let re=A[_];re!==null&&(A[_]=null,j[_].disconnect(re))}X=null,D=null,y.reset();for(let _ in c)delete c[_];e.setRenderTarget(O),q=null,m=null,p=null,i=null,l=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(_){o=_,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(_){u=_,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||s},this.setReferenceSpace=function(_){f=_},this.getBaseLayer=function(){return m!==null?m:q},this.getBinding=function(){return p===null&&v&&(p=new XRWebGLBinding(i,t)),p},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(_){if(i=_,i!==null){if(O=e.getRenderTarget(),i.addEventListener("select",w),i.addEventListener("selectstart",w),i.addEventListener("selectend",w),i.addEventListener("squeeze",w),i.addEventListener("squeezestart",w),i.addEventListener("squeezeend",w),i.addEventListener("end",N),i.addEventListener("inputsourceschange",U),I.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let je=null,Se=null,we=null;I.depth&&(we=I.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,je=I.stencil?Di:Hi,Se=I.stencil?Xi:Ir);let tt={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:o};p=this.getBinding(),m=p.createProjectionLayer(tt),i.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),l=new vn(m.textureWidth,m.textureHeight,{format:Ft,type:Pn,depthTexture:new Ho(m.textureWidth,m.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,je),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{let je={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:o};q=new XRWebGLLayer(i,t,je),i.updateRenderState({baseLayer:q}),e.setPixelRatio(1),e.setSize(q.framebufferWidth,q.framebufferHeight,!1),l=new vn(q.framebufferWidth,q.framebufferHeight,{format:Ft,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1})}l.isXRRenderTarget=!0,this.setFoveation(a),f=null,s=await i.requestReferenceSpace(u),Ve.setContext(i),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function U(_){for(let re=0;re<_.removed.length;re++){let je=_.removed[re],Se=A.indexOf(je);Se>=0&&(A[Se]=null,j[Se].disconnect(je))}for(let re=0;re<_.added.length;re++){let je=_.added[re],Se=A.indexOf(je);if(Se===-1){for(let tt=0;tt<j.length;tt++)if(tt>=A.length){A.push(je),Se=tt;break}else if(A[tt]===null){A[tt]=je,Se=tt;break}if(Se===-1)break}let we=j[Se];we&&we.connect(je)}}let B=new M,ce=new M;function ve(_,re,je){B.setFromMatrixPosition(re.matrixWorld),ce.setFromMatrixPosition(je.matrixWorld);let Se=B.distanceTo(ce),we=re.projectionMatrix.elements,tt=je.projectionMatrix.elements,ht=we[14]/(we[10]-1),S=we[14]/(we[10]+1),ie=(we[9]+1)/we[5],ee=(we[9]-1)/we[5],$=(we[8]-1)/we[0],Q=(tt[8]+1)/tt[0],ye=ht*$,he=ht*Q,ge=Se/(-$+Q),Ee=ge*-$;if(re.matrixWorld.decompose(_.position,_.quaternion,_.scale),_.translateX(Ee),_.translateZ(ge),_.matrixWorld.compose(_.position,_.quaternion,_.scale),_.matrixWorldInverse.copy(_.matrixWorld).invert(),we[10]===-1)_.projectionMatrix.copy(re.projectionMatrix),_.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let Te=ht+ge,x=S+ge,d=ye-Ee,W=he+(Se-Ee),R=ie*S/x*Te,oe=ee*S/x*Te;_.projectionMatrix.makePerspective(d,W,R,oe,Te,x),_.projectionMatrixInverse.copy(_.projectionMatrix).invert()}}function de(_,re){re===null?_.matrixWorld.copy(_.matrix):_.matrixWorld.multiplyMatrices(re.matrixWorld,_.matrix),_.matrixWorldInverse.copy(_.matrixWorld).invert()}this.updateCamera=function(_){if(i===null)return;let re=_.near,je=_.far;y.texture!==null&&(y.depthNear>0&&(re=y.depthNear),y.depthFar>0&&(je=y.depthFar)),Y.near=H.near=K.near=re,Y.far=H.far=K.far=je,(X!==Y.near||D!==Y.far)&&(i.updateRenderState({depthNear:Y.near,depthFar:Y.far}),X=Y.near,D=Y.far),Y.layers.mask=_.layers.mask|6,K.layers.mask=Y.layers.mask&3,H.layers.mask=Y.layers.mask&5;let Se=_.parent,we=Y.cameras;de(Y,Se);for(let tt=0;tt<we.length;tt++)de(we[tt],Se);we.length===2?ve(Y,K,H):Y.projectionMatrix.copy(K.projectionMatrix),We(_,Y,Se)};function We(_,re,je){je===null?_.matrix.copy(re.matrixWorld):(_.matrix.copy(je.matrixWorld),_.matrix.invert(),_.matrix.multiply(re.matrixWorld)),_.matrix.decompose(_.position,_.quaternion,_.scale),_.updateMatrixWorld(!0),_.projectionMatrix.copy(re.projectionMatrix),_.projectionMatrixInverse.copy(re.projectionMatrixInverse),_.isPerspectiveCamera&&(_.fov=bi*2*Math.atan(1/_.projectionMatrix.elements[5]),_.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(m===null&&q===null))return a},this.setFoveation=function(_){a=_,m!==null&&(m.fixedFoveation=_),q!==null&&q.fixedFoveation!==void 0&&(q.fixedFoveation=_)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(Y)},this.getCameraTexture=function(_){return c[_]};let Ne=null;function _e(_,re){if(h=re.getViewerPose(f||s),g=re,h!==null){let je=h.views;q!==null&&(e.setRenderTargetFramebuffer(l,q.framebuffer),e.setRenderTarget(l));let Se=!1;je.length!==Y.cameras.length&&(Y.cameras.length=0,Se=!0);for(let S=0;S<je.length;S++){let ie=je[S],ee=null;if(q!==null)ee=q.getViewport(ie);else{let Q=p.getViewSubImage(m,ie);ee=Q.viewport,S===0&&(e.setRenderTargetTextures(l,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(l))}let $=C[S];$===void 0&&($=new Ct,$.layers.enable(S),$.viewport=new yt,C[S]=$),$.matrix.fromArray(ie.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(ie.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(ee.x,ee.y,ee.width,ee.height),S===0&&(Y.matrix.copy($.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),Se===!0&&Y.cameras.push($)}let we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){p=n.getBinding();let S=p.getDepthInformation(je[0]);S&&S.isValid&&S.texture&&y.init(S,i.renderState)}if(we&&we.includes("camera-access")&&v){e.state.unbindTexture(),p=n.getBinding();for(let S=0;S<je.length;S++){let ie=je[S].camera;if(ie){let ee=c[ie];ee||(ee=new Ko,c[ie]=ee);let $=p.getCameraImage(ie);ee.sourceTexture=$}}}}for(let je=0;je<j.length;je++){let Se=A[je],we=j[je];Se!==null&&we!==void 0&&we.update(Se,re,f||s)}Ne&&Ne(_,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}let Ve=new k6;Ve.setAnimationLoop(_e),this.setAnimationLoop=function(_){Ne=_},this.dispose=function(){}}},Vr=new xn,m3=new at;function c3(r,e){function t(y,c){y.matrixAutoUpdate===!0&&y.updateMatrix(),c.value.copy(y.matrix)}function n(y,c){c.color.getRGB(y.fogColor.value,sf(r)),c.isFog?(y.fogNear.value=c.near,y.fogFar.value=c.far):c.isFogExp2&&(y.fogDensity.value=c.density)}function i(y,c,I,O,l){c.isMeshBasicMaterial||c.isMeshLambertMaterial?o(y,c):c.isMeshToonMaterial?(o(y,c),p(y,c)):c.isMeshPhongMaterial?(o(y,c),h(y,c)):c.isMeshStandardMaterial?(o(y,c),m(y,c),c.isMeshPhysicalMaterial&&q(y,c,l)):c.isMeshMatcapMaterial?(o(y,c),g(y,c)):c.isMeshDepthMaterial?o(y,c):c.isMeshDistanceMaterial?(o(y,c),v(y,c)):c.isMeshNormalMaterial?o(y,c):c.isLineBasicMaterial?(s(y,c),c.isLineDashedMaterial&&u(y,c)):c.isPointsMaterial?a(y,c,I,O):c.isSpriteMaterial?f(y,c):c.isShadowMaterial?(y.color.value.copy(c.color),y.opacity.value=c.opacity):c.isShaderMaterial&&(c.uniformsNeedUpdate=!1)}function o(y,c){y.opacity.value=c.opacity,c.color&&y.diffuse.value.copy(c.color),c.emissive&&y.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity),c.map&&(y.map.value=c.map,t(c.map,y.mapTransform)),c.alphaMap&&(y.alphaMap.value=c.alphaMap,t(c.alphaMap,y.alphaMapTransform)),c.bumpMap&&(y.bumpMap.value=c.bumpMap,t(c.bumpMap,y.bumpMapTransform),y.bumpScale.value=c.bumpScale,c.side===Wt&&(y.bumpScale.value*=-1)),c.normalMap&&(y.normalMap.value=c.normalMap,t(c.normalMap,y.normalMapTransform),y.normalScale.value.copy(c.normalScale),c.side===Wt&&y.normalScale.value.negate()),c.displacementMap&&(y.displacementMap.value=c.displacementMap,t(c.displacementMap,y.displacementMapTransform),y.displacementScale.value=c.displacementScale,y.displacementBias.value=c.displacementBias),c.emissiveMap&&(y.emissiveMap.value=c.emissiveMap,t(c.emissiveMap,y.emissiveMapTransform)),c.specularMap&&(y.specularMap.value=c.specularMap,t(c.specularMap,y.specularMapTransform)),c.alphaTest>0&&(y.alphaTest.value=c.alphaTest);let I=e.get(c),O=I.envMap,l=I.envMapRotation;O&&(y.envMap.value=O,Vr.copy(l),Vr.x*=-1,Vr.y*=-1,Vr.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Vr.y*=-1,Vr.z*=-1),y.envMapRotation.value.setFromMatrix4(m3.makeRotationFromEuler(Vr)),y.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=c.reflectivity,y.ior.value=c.ior,y.refractionRatio.value=c.refractionRatio),c.lightMap&&(y.lightMap.value=c.lightMap,y.lightMapIntensity.value=c.lightMapIntensity,t(c.lightMap,y.lightMapTransform)),c.aoMap&&(y.aoMap.value=c.aoMap,y.aoMapIntensity.value=c.aoMapIntensity,t(c.aoMap,y.aoMapTransform))}function s(y,c){y.diffuse.value.copy(c.color),y.opacity.value=c.opacity,c.map&&(y.map.value=c.map,t(c.map,y.mapTransform))}function u(y,c){y.dashSize.value=c.dashSize,y.totalSize.value=c.dashSize+c.gapSize,y.scale.value=c.scale}function a(y,c,I,O){y.diffuse.value.copy(c.color),y.opacity.value=c.opacity,y.size.value=c.size*I,y.scale.value=O*.5,c.map&&(y.map.value=c.map,t(c.map,y.uvTransform)),c.alphaMap&&(y.alphaMap.value=c.alphaMap,t(c.alphaMap,y.alphaMapTransform)),c.alphaTest>0&&(y.alphaTest.value=c.alphaTest)}function f(y,c){y.diffuse.value.copy(c.color),y.opacity.value=c.opacity,y.rotation.value=c.rotation,c.map&&(y.map.value=c.map,t(c.map,y.mapTransform)),c.alphaMap&&(y.alphaMap.value=c.alphaMap,t(c.alphaMap,y.alphaMapTransform)),c.alphaTest>0&&(y.alphaTest.value=c.alphaTest)}function h(y,c){y.specular.value.copy(c.specular),y.shininess.value=Math.max(c.shininess,1e-4)}function p(y,c){c.gradientMap&&(y.gradientMap.value=c.gradientMap)}function m(y,c){y.metalness.value=c.metalness,c.metalnessMap&&(y.metalnessMap.value=c.metalnessMap,t(c.metalnessMap,y.metalnessMapTransform)),y.roughness.value=c.roughness,c.roughnessMap&&(y.roughnessMap.value=c.roughnessMap,t(c.roughnessMap,y.roughnessMapTransform)),c.envMap&&(y.envMapIntensity.value=c.envMapIntensity)}function q(y,c,I){y.ior.value=c.ior,c.sheen>0&&(y.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen),y.sheenRoughness.value=c.sheenRoughness,c.sheenColorMap&&(y.sheenColorMap.value=c.sheenColorMap,t(c.sheenColorMap,y.sheenColorMapTransform)),c.sheenRoughnessMap&&(y.sheenRoughnessMap.value=c.sheenRoughnessMap,t(c.sheenRoughnessMap,y.sheenRoughnessMapTransform))),c.clearcoat>0&&(y.clearcoat.value=c.clearcoat,y.clearcoatRoughness.value=c.clearcoatRoughness,c.clearcoatMap&&(y.clearcoatMap.value=c.clearcoatMap,t(c.clearcoatMap,y.clearcoatMapTransform)),c.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=c.clearcoatRoughnessMap,t(c.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),c.clearcoatNormalMap&&(y.clearcoatNormalMap.value=c.clearcoatNormalMap,t(c.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),c.side===Wt&&y.clearcoatNormalScale.value.negate())),c.dispersion>0&&(y.dispersion.value=c.dispersion),c.iridescence>0&&(y.iridescence.value=c.iridescence,y.iridescenceIOR.value=c.iridescenceIOR,y.iridescenceThicknessMinimum.value=c.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=c.iridescenceThicknessRange[1],c.iridescenceMap&&(y.iridescenceMap.value=c.iridescenceMap,t(c.iridescenceMap,y.iridescenceMapTransform)),c.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=c.iridescenceThicknessMap,t(c.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),c.transmission>0&&(y.transmission.value=c.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),c.transmissionMap&&(y.transmissionMap.value=c.transmissionMap,t(c.transmissionMap,y.transmissionMapTransform)),y.thickness.value=c.thickness,c.thicknessMap&&(y.thicknessMap.value=c.thicknessMap,t(c.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=c.attenuationDistance,y.attenuationColor.value.copy(c.attenuationColor)),c.anisotropy>0&&(y.anisotropyVector.value.set(c.anisotropy*Math.cos(c.anisotropyRotation),c.anisotropy*Math.sin(c.anisotropyRotation)),c.anisotropyMap&&(y.anisotropyMap.value=c.anisotropyMap,t(c.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=c.specularIntensity,y.specularColor.value.copy(c.specularColor),c.specularColorMap&&(y.specularColorMap.value=c.specularColorMap,t(c.specularColorMap,y.specularColorMapTransform)),c.specularIntensityMap&&(y.specularIntensityMap.value=c.specularIntensityMap,t(c.specularIntensityMap,y.specularIntensityMapTransform))}function g(y,c){c.matcap&&(y.matcap.value=c.matcap)}function v(y,c){let I=e.get(c).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function y3(r,e,t,n){let i={},o={},s=[],u=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function a(I,O){let l=O.program;n.uniformBlockBinding(I,l)}function f(I,O){let l=i[I.id];l===void 0&&(g(I),l=h(I),i[I.id]=l,I.addEventListener("dispose",y));let j=O.program;n.updateUBOMapping(I,j);let A=e.render.frame;o[I.id]!==A&&(m(I),o[I.id]=A)}function h(I){let O=p();I.__bindingPointIndex=O;let l=r.createBuffer(),j=I.__size,A=I.usage;return r.bindBuffer(r.UNIFORM_BUFFER,l),r.bufferData(r.UNIFORM_BUFFER,j,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,l),l}function p(){for(let I=0;I<u;I++)if(s.indexOf(I)===-1)return s.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(I){let O=i[I.id],l=I.uniforms,j=I.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let A=0,P=l.length;A<P;A++){let L=Array.isArray(l[A])?l[A]:[l[A]];for(let K=0,H=L.length;K<H;K++){let C=L[K];if(q(C,A,K,j)===!0){let Y=C.__offset,X=Array.isArray(C.value)?C.value:[C.value],D=0;for(let w=0;w<X.length;w++){let N=X[w],U=v(N);typeof N=="number"||typeof N=="boolean"?(C.__data[0]=N,r.bufferSubData(r.UNIFORM_BUFFER,Y+D,C.__data)):N.isMatrix3?(C.__data[0]=N.elements[0],C.__data[1]=N.elements[1],C.__data[2]=N.elements[2],C.__data[3]=0,C.__data[4]=N.elements[3],C.__data[5]=N.elements[4],C.__data[6]=N.elements[5],C.__data[7]=0,C.__data[8]=N.elements[6],C.__data[9]=N.elements[7],C.__data[10]=N.elements[8],C.__data[11]=0):(N.toArray(C.__data,D),D+=U.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,Y,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function q(I,O,l,j){let A=I.value,P=O+"_"+l;if(j[P]===void 0)return typeof A=="number"||typeof A=="boolean"?j[P]=A:j[P]=A.clone(),!0;{let L=j[P];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return j[P]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(I){let O=I.uniforms,l=0,j=16;for(let P=0,L=O.length;P<L;P++){let K=Array.isArray(O[P])?O[P]:[O[P]];for(let H=0,C=K.length;H<C;H++){let Y=K[H],X=Array.isArray(Y.value)?Y.value:[Y.value];for(let D=0,w=X.length;D<w;D++){let N=X[D],U=v(N),B=l%j,ce=B%U.boundary,ve=B+ce;l+=ce,ve!==0&&j-ve<U.storage&&(l+=j-ve),Y.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=l,l+=U.storage}}}let A=l%j;return A>0&&(l+=j-A),I.__size=l,I.__cache={},this}function v(I){let O={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(O.boundary=4,O.storage=4):I.isVector2?(O.boundary=8,O.storage=8):I.isVector3||I.isColor?(O.boundary=16,O.storage=12):I.isVector4?(O.boundary=16,O.storage=16):I.isMatrix3?(O.boundary=48,O.storage=48):I.isMatrix4?(O.boundary=64,O.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),O}function y(I){let O=I.target;O.removeEventListener("dispose",y);let l=s.indexOf(O.__bindingPointIndex);s.splice(l,1),r.deleteBuffer(i[O.id]),delete i[O.id],delete o[O.id]}function c(){for(let I in i)r.deleteBuffer(i[I]);s=[],i={},o={}}return{bind:a,update:f,dispose:c}}var Ru=class{constructor(e={}){let{canvas:t=p6(),context:n=null,depth:i=!0,stencil:o=!1,alpha:s=!1,antialias:u=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:f=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1}=e;this.isWebGLRenderer=!0;let q;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");q=n.getContextAttributes().alpha}else q=s;let g=new Uint32Array(4),v=new Int32Array(4),y=null,c=null,I=[],O=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=nr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let l=this,j=!1;this._outputColorSpace=mt;let A=0,P=0,L=null,K=-1,H=null,C=new yt,Y=new yt,X=null,D=new Re(0),w=0,N=t.width,U=t.height,B=1,ce=null,ve=null,de=new yt(0,0,N,U),We=new yt(0,0,N,U),Ne=!1,_e=new xi,Ve=!1,_=!1,re=new at,je=new M,Se=new yt,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},tt=!1;function ht(){return L===null?B:1}let S=n;function ie(b,J){return t.getContext(b,J)}try{let b={alpha:!0,depth:i,stencil:o,antialias:u,premultipliedAlpha:a,preserveDrawingBuffer:f,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",fe,!1),S===null){let J="webgl2";if(S=ie(J,b),S===null)throw ie(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ee,$,Q,ye,he,ge,Ee,Te,x,d,W,R,oe,V,Ye,me,Le,xe,ue,Oe,ke,De,He,Ue;function G(){ee=new Mc(S),ee.init(),De=new h3(S,ee),$=new Ac(S,ee,e,De),Q=new a3(S,ee),$.reversedDepthBuffer&&m&&Q.buffers.depth.setReversed(!0),ye=new Gc(S),he=new Vy,ge=new f3(S,ee,Q,he,$,De,ye),Ee=new xc(l),Te=new Sc(l),x=new k7(S),He=new jc(S,x),d=new wc(S,x,ye,He),W=new Dc(S,d,x,ye),ue=new Xc(S,$,ge),me=new Lc(he),R=new Ry(l,Ee,Te,ee,$,He,me),oe=new c3(l,he),V=new Qy,Ye=new r3(ee),xe=new Oc(l,Ee,Te,Q,W,q,a),Le=new s3(l,W,$),Ue=new y3(S,ye,$,Q),Oe=new Ic(S,ee,ye),ke=new Yc(S,ee,ye),ye.programs=R.programs,l.capabilities=$,l.extensions=ee,l.properties=he,l.renderLists=V,l.shadowMap=Le,l.state=Q,l.info=ye}G();let ae=new jf(l,S);this.xr=ae,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let b=ee.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ee.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(b){b!==void 0&&(B=b,this.setSize(N,U,!1))},this.getSize=function(b){return b.set(N,U)},this.setSize=function(b,J,Z=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=b,U=J,t.width=Math.floor(b*B),t.height=Math.floor(J*B),Z===!0&&(t.style.width=b+"px",t.style.height=J+"px"),this.setViewport(0,0,b,J)},this.getDrawingBufferSize=function(b){return b.set(N*B,U*B).floor()},this.setDrawingBufferSize=function(b,J,Z){N=b,U=J,B=Z,t.width=Math.floor(b*Z),t.height=Math.floor(J*Z),this.setViewport(0,0,b,J)},this.getCurrentViewport=function(b){return b.copy(C)},this.getViewport=function(b){return b.copy(de)},this.setViewport=function(b,J,Z,F){b.isVector4?de.set(b.x,b.y,b.z,b.w):de.set(b,J,Z,F),Q.viewport(C.copy(de).multiplyScalar(B).round())},this.getScissor=function(b){return b.copy(We)},this.setScissor=function(b,J,Z,F){b.isVector4?We.set(b.x,b.y,b.z,b.w):We.set(b,J,Z,F),Q.scissor(Y.copy(We).multiplyScalar(B).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(b){Q.setScissorTest(Ne=b)},this.setOpaqueSort=function(b){ce=b},this.setTransparentSort=function(b){ve=b},this.getClearColor=function(b){return b.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(b=!0,J=!0,Z=!0){let F=0;if(b){let T=!1;if(L!==null){let pe=L.texture.format;T=pe===yu||pe===cu||pe===mu}if(T){let pe=L.texture.type,Ke=pe===Pn||pe===Ir||pe===Gi||pe===Xi||pe===hu||pe===pu,ze=xe.getClearColor(),Pe=xe.getClearAlpha(),z=ze.r,k=ze.g,E=ze.b;Ke?(g[0]=z,g[1]=k,g[2]=E,g[3]=Pe,S.clearBufferuiv(S.COLOR,0,g)):(v[0]=z,v[1]=k,v[2]=E,v[3]=Pe,S.clearBufferiv(S.COLOR,0,v))}else F|=S.COLOR_BUFFER_BIT}J&&(F|=S.DEPTH_BUFFER_BIT),Z&&(F|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),xe.dispose(),V.dispose(),Ye.dispose(),he.dispose(),Ee.dispose(),Te.dispose(),W.dispose(),He.dispose(),Ue.dispose(),R.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",vt),ae.removeEventListener("sessionend",Kn),pn.stop()};function le(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),j=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),j=!1;let b=ye.autoReset,J=Le.enabled,Z=Le.autoUpdate,F=Le.needsUpdate,T=Le.type;G(),ye.autoReset=b,Le.enabled=J,Le.autoUpdate=Z,Le.needsUpdate=F,Le.type=T}function fe(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function te(b){let J=b.target;J.removeEventListener("dispose",te),Ge(J)}function Ge(b){Ae(b),he.remove(b)}function Ae(b){let J=he.get(b).programs;J!==void 0&&(J.forEach(function(Z){R.releaseProgram(Z)}),b.isShaderMaterial&&R.releaseShaderCache(b))}this.renderBufferDirect=function(b,J,Z,F,T,pe){J===null&&(J=we);let Ke=T.isMesh&&T.matrixWorld.determinant()<0,ze=On(b,J,Z,F,T);Q.setMaterial(F,Ke);let Pe=Z.index,z=1;if(F.wireframe===!0){if(Pe=d.getWireframeAttribute(Z),Pe===void 0)return;z=2}let k=Z.drawRange,E=Z.attributes.position,ne=k.start*z,qe=(k.start+k.count)*z;pe!==null&&(ne=Math.max(ne,pe.start*z),qe=Math.min(qe,(pe.start+pe.count)*z)),Pe!==null?(ne=Math.max(ne,0),qe=Math.min(qe,Pe.count)):E!=null&&(ne=Math.max(ne,0),qe=Math.min(qe,E.count));let Xe=qe-ne;if(Xe<0||Xe===1/0)return;He.setup(T,F,ze,Z,Pe);let Ze,Be=Oe;if(Pe!==null&&(Ze=x.get(Pe),Be=ke,Be.setIndex(Ze)),T.isMesh)F.wireframe===!0?(Q.setLineWidth(F.wireframeLinewidth*ht()),Be.setMode(S.LINES)):Be.setMode(S.TRIANGLES);else if(T.isLine){let Ce=F.linewidth;Ce===void 0&&(Ce=1),Q.setLineWidth(Ce*ht()),T.isLineSegments?Be.setMode(S.LINES):T.isLineLoop?Be.setMode(S.LINE_LOOP):Be.setMode(S.LINE_STRIP)}else T.isPoints?Be.setMode(S.POINTS):T.isSprite&&Be.setMode(S.TRIANGLES);if(T.isBatchedMesh)if(T._multiDrawInstances!==null)ji("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Be.renderMultiDrawInstances(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount,T._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))Be.renderMultiDraw(T._multiDrawStarts,T._multiDrawCounts,T._multiDrawCount);else{let Ce=T._multiDrawStarts,Fe=T._multiDrawCounts,rt=T._multiDrawCount,Ut=Pe?x.get(Pe).bytesPerElement:1,ti=he.get(F).currentProgram.getUniforms();for(let Qt=0;Qt<rt;Qt++)ti.setValue(S,"_gl_DrawID",Qt),Be.render(Ce[Qt]/Ut,Fe[Qt])}else if(T.isInstancedMesh)Be.renderInstances(ne,Xe,T.count);else if(Z.isInstancedBufferGeometry){let Ce=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Fe=Math.min(Z.instanceCount,Ce);Be.renderInstances(ne,Xe,Fe)}else Be.render(ne,Xe)};function ut(b,J,Z){b.transparent===!0&&b.side===Ot&&b.forceSinglePass===!1?(b.side=Wt,b.needsUpdate=!0,Ar(b,J,Z),b.side=Vn,b.needsUpdate=!0,Ar(b,J,Z),b.side=Ot):Ar(b,J,Z)}this.compile=function(b,J,Z=null){Z===null&&(Z=b),c=Ye.get(Z),c.init(J),O.push(c),Z.traverseVisible(function(T){T.isLight&&T.layers.test(J.layers)&&(c.pushLight(T),T.castShadow&&c.pushShadow(T))}),b!==Z&&b.traverseVisible(function(T){T.isLight&&T.layers.test(J.layers)&&(c.pushLight(T),T.castShadow&&c.pushShadow(T))}),c.setupLights();let F=new Set;return b.traverse(function(T){if(!(T.isMesh||T.isPoints||T.isLine||T.isSprite))return;let pe=T.material;if(pe)if(Array.isArray(pe))for(let Ke=0;Ke<pe.length;Ke++){let ze=pe[Ke];ut(ze,Z,T),F.add(ze)}else ut(pe,Z,T),F.add(pe)}),c=O.pop(),F},this.compileAsync=function(b,J,Z=null){let F=this.compile(b,J,Z);return new Promise(T=>{function pe(){if(F.forEach(function(Ke){he.get(Ke).currentProgram.isReady()&&F.delete(Ke)}),F.size===0){T(b);return}setTimeout(pe,10)}ee.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let ot=null;function hn(b){ot&&ot(b)}function vt(){pn.stop()}function Kn(){pn.start()}let pn=new k6;pn.setAnimationLoop(hn),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(b){ot=b,ae.setAnimationLoop(b),b===null?pn.stop():pn.start()},ae.addEventListener("sessionstart",vt),ae.addEventListener("sessionend",Kn),this.render=function(b,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(J),J=ae.getCamera()),b.isScene===!0&&b.onBeforeRender(l,b,J,L),c=Ye.get(b,O.length),c.init(J),O.push(c),re.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),_e.setFromProjectionMatrix(re,Ln,J.reversedDepth),_=this.localClippingEnabled,Ve=me.init(this.clippingPlanes,_),y=V.get(b,I.length),y.init(),I.push(y),ae.enabled===!0&&ae.isPresenting===!0){let pe=l.xr.getDepthSensingMesh();pe!==null&&rr(pe,J,-1/0,l.sortObjects)}rr(b,J,0,l.sortObjects),y.finish(),l.sortObjects===!0&&y.sort(ce,ve),tt=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,tt&&xe.addToRenderList(y,b),this.info.render.frame++,Ve===!0&&me.beginShadows();let Z=c.state.shadowsArray;Le.render(Z,b,J),Ve===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();let F=y.opaque,T=y.transmissive;if(c.setupLights(),J.isArrayCamera){let pe=J.cameras;if(T.length>0)for(let Ke=0,ze=pe.length;Ke<ze;Ke++){let Pe=pe[Ke];_o(F,T,b,Pe)}tt&&xe.render(b);for(let Ke=0,ze=pe.length;Ke<ze;Ke++){let Pe=pe[Ke];$r(y,b,Pe,Pe.viewport)}}else T.length>0&&_o(F,T,b,J),tt&&xe.render(b),$r(y,b,J);L!==null&&P===0&&(ge.updateMultisampleRenderTarget(L),ge.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(l,b,J),He.resetDefaultState(),K=-1,H=null,O.pop(),O.length>0?(c=O[O.length-1],Ve===!0&&me.setGlobalState(l.clippingPlanes,c.state.camera)):c=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function rr(b,J,Z,F){if(b.visible===!1)return;if(b.layers.test(J.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(J);else if(b.isLight)c.pushLight(b),b.castShadow&&c.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||_e.intersectsSprite(b)){F&&Se.setFromMatrixPosition(b.matrixWorld).applyMatrix4(re);let Ke=W.update(b),ze=b.material;ze.visible&&y.push(b,Ke,ze,Z,Se.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||_e.intersectsObject(b))){let Ke=W.update(b),ze=b.material;if(F&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Se.copy(b.boundingSphere.center)):(Ke.boundingSphere===null&&Ke.computeBoundingSphere(),Se.copy(Ke.boundingSphere.center)),Se.applyMatrix4(b.matrixWorld).applyMatrix4(re)),Array.isArray(ze)){let Pe=Ke.groups;for(let z=0,k=Pe.length;z<k;z++){let E=Pe[z],ne=ze[E.materialIndex];ne&&ne.visible&&y.push(b,Ke,ne,Z,Se.z,E)}}else ze.visible&&y.push(b,Ke,ze,Z,Se.z,null)}}let pe=b.children;for(let Ke=0,ze=pe.length;Ke<ze;Ke++)rr(pe[Ke],J,Z,F)}function $r(b,J,Z,F){let T=b.opaque,pe=b.transmissive,Ke=b.transparent;c.setupLightsView(Z),Ve===!0&&me.setGlobalState(l.clippingPlanes,Z),F&&Q.viewport(C.copy(F)),T.length>0&&ir(T,J,Z),pe.length>0&&ir(pe,J,Z),Ke.length>0&&ir(Ke,J,Z),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function _o(b,J,Z,F){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;c.state.transmissionRenderTarget[F.id]===void 0&&(c.state.transmissionRenderTarget[F.id]=new vn(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?sn:Pn,minFilter:on,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));let pe=c.state.transmissionRenderTarget[F.id],Ke=F.viewport||C;pe.setSize(Ke.z*l.transmissionResolutionScale,Ke.w*l.transmissionResolutionScale);let ze=l.getRenderTarget(),Pe=l.getActiveCubeFace(),z=l.getActiveMipmapLevel();l.setRenderTarget(pe),l.getClearColor(D),w=l.getClearAlpha(),w<1&&l.setClearColor(16777215,.5),l.clear(),tt&&xe.render(Z);let k=l.toneMapping;l.toneMapping=nr;let E=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),c.setupLightsView(F),Ve===!0&&me.setGlobalState(l.clippingPlanes,F),ir(b,Z,F),ge.updateMultisampleRenderTarget(pe),ge.updateRenderTargetMipmap(pe),ee.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let qe=0,Xe=J.length;qe<Xe;qe++){let Ze=J[qe],Be=Ze.object,Ce=Ze.geometry,Fe=Ze.material,rt=Ze.group;if(Fe.side===Ot&&Be.layers.test(F.layers)){let Ut=Fe.side;Fe.side=Wt,Fe.needsUpdate=!0,Ri(Be,Z,F,Ce,Fe,rt),Fe.side=Ut,Fe.needsUpdate=!0,ne=!0}}ne===!0&&(ge.updateMultisampleRenderTarget(pe),ge.updateRenderTargetMipmap(pe))}l.setRenderTarget(ze,Pe,z),l.setClearColor(D,w),E!==void 0&&(F.viewport=E),l.toneMapping=k}function ir(b,J,Z){let F=J.isScene===!0?J.overrideMaterial:null;for(let T=0,pe=b.length;T<pe;T++){let Ke=b[T],ze=Ke.object,Pe=Ke.geometry,z=Ke.group,k=Ke.material;k.allowOverride===!0&&F!==null&&(k=F),ze.layers.test(Z.layers)&&Ri(ze,J,Z,Pe,k,z)}}function Ri(b,J,Z,F,T,pe){b.onBeforeRender(l,J,Z,F,T,pe),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),T.onBeforeRender(l,J,Z,F,b,pe),T.transparent===!0&&T.side===Ot&&T.forceSinglePass===!1?(T.side=Wt,T.needsUpdate=!0,l.renderBufferDirect(Z,J,F,T,b,pe),T.side=Vn,T.needsUpdate=!0,l.renderBufferDirect(Z,J,F,T,b,pe),T.side=Ot):l.renderBufferDirect(Z,J,F,T,b,pe),b.onAfterRender(l,J,Z,F,T,pe)}function Ar(b,J,Z){J.isScene!==!0&&(J=we);let F=he.get(b),T=c.state.lights,pe=c.state.shadowsArray,Ke=T.state.version,ze=R.getParameters(b,T.state,pe,J,Z),Pe=R.getProgramCacheKey(ze),z=F.programs;F.environment=b.isMeshStandardMaterial?J.environment:null,F.fog=J.fog,F.envMap=(b.isMeshStandardMaterial?Te:Ee).get(b.envMap||F.environment),F.envMapRotation=F.environment!==null&&b.envMap===null?J.environmentRotation:b.envMapRotation,z===void 0&&(b.addEventListener("dispose",te),z=new Map,F.programs=z);let k=z.get(Pe);if(k!==void 0){if(F.currentProgram===k&&F.lightsStateVersion===Ke)return bn(b,ze),k}else ze.uniforms=R.getUniforms(b),b.onBeforeCompile(ze,l),k=R.acquireProgram(ze,Pe),z.set(Pe,k),F.uniforms=ze.uniforms;let E=F.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(E.clippingPlanes=me.uniform),bn(b,ze),F.needsLights=$o(b),F.lightsStateVersion=Ke,F.needsLights&&(E.ambientLightColor.value=T.state.ambient,E.lightProbe.value=T.state.probe,E.directionalLights.value=T.state.directional,E.directionalLightShadows.value=T.state.directionalShadow,E.spotLights.value=T.state.spot,E.spotLightShadows.value=T.state.spotShadow,E.rectAreaLights.value=T.state.rectArea,E.ltc_1.value=T.state.rectAreaLTC1,E.ltc_2.value=T.state.rectAreaLTC2,E.pointLights.value=T.state.point,E.pointLightShadows.value=T.state.pointShadow,E.hemisphereLights.value=T.state.hemi,E.directionalShadowMap.value=T.state.directionalShadowMap,E.directionalShadowMatrix.value=T.state.directionalShadowMatrix,E.spotShadowMap.value=T.state.spotShadowMap,E.spotLightMatrix.value=T.state.spotLightMatrix,E.spotLightMap.value=T.state.spotLightMap,E.pointShadowMap.value=T.state.pointShadowMap,E.pointShadowMatrix.value=T.state.pointShadowMatrix),F.currentProgram=k,F.uniformsList=null,k}function Tn(b){if(b.uniformsList===null){let J=b.currentProgram.getUniforms();b.uniformsList=Wi.seqWithValue(J.seq,b.uniforms)}return b.uniformsList}function bn(b,J){let Z=he.get(b);Z.outputColorSpace=J.outputColorSpace,Z.batching=J.batching,Z.batchingColor=J.batchingColor,Z.instancing=J.instancing,Z.instancingColor=J.instancingColor,Z.instancingMorph=J.instancingMorph,Z.skinning=J.skinning,Z.morphTargets=J.morphTargets,Z.morphNormals=J.morphNormals,Z.morphColors=J.morphColors,Z.morphTargetsCount=J.morphTargetsCount,Z.numClippingPlanes=J.numClippingPlanes,Z.numIntersection=J.numClipIntersection,Z.vertexAlphas=J.vertexAlphas,Z.vertexTangents=J.vertexTangents,Z.toneMapping=J.toneMapping}function On(b,J,Z,F,T){J.isScene!==!0&&(J=we),ge.resetTextureUnits();let pe=J.fog,Ke=F.isMeshStandardMaterial?J.environment:null,ze=L===null?l.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Un,Pe=(F.isMeshStandardMaterial?Te:Ee).get(F.envMap||Ke),z=F.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,k=!!Z.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),E=!!Z.morphAttributes.position,ne=!!Z.morphAttributes.normal,qe=!!Z.morphAttributes.color,Xe=nr;F.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Xe=l.toneMapping);let Ze=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Be=Ze!==void 0?Ze.length:0,Ce=he.get(F),Fe=c.state.lights;if(Ve===!0&&(_===!0||b!==H)){let Jt=b===H&&F.id===K;me.setState(F,b,Jt)}let rt=!1;F.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Fe.state.version||Ce.outputColorSpace!==ze||T.isBatchedMesh&&Ce.batching===!1||!T.isBatchedMesh&&Ce.batching===!0||T.isBatchedMesh&&Ce.batchingColor===!0&&T.colorTexture===null||T.isBatchedMesh&&Ce.batchingColor===!1&&T.colorTexture!==null||T.isInstancedMesh&&Ce.instancing===!1||!T.isInstancedMesh&&Ce.instancing===!0||T.isSkinnedMesh&&Ce.skinning===!1||!T.isSkinnedMesh&&Ce.skinning===!0||T.isInstancedMesh&&Ce.instancingColor===!0&&T.instanceColor===null||T.isInstancedMesh&&Ce.instancingColor===!1&&T.instanceColor!==null||T.isInstancedMesh&&Ce.instancingMorph===!0&&T.morphTexture===null||T.isInstancedMesh&&Ce.instancingMorph===!1&&T.morphTexture!==null||Ce.envMap!==Pe||F.fog===!0&&Ce.fog!==pe||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==me.numPlanes||Ce.numIntersection!==me.numIntersection)||Ce.vertexAlphas!==z||Ce.vertexTangents!==k||Ce.morphTargets!==E||Ce.morphNormals!==ne||Ce.morphColors!==qe||Ce.toneMapping!==Xe||Ce.morphTargetsCount!==Be)&&(rt=!0):(rt=!0,Ce.__version=F.version);let Ut=Ce.currentProgram;rt===!0&&(Ut=Ar(F,J,T));let ti=!1,Qt=!1,Vi=!1,dt=Ut.getUniforms(),qn=Ce.uniforms;if(Q.useProgram(Ut.program)&&(ti=!0,Qt=!0,Vi=!0),F.id!==K&&(K=F.id,Qt=!0),ti||H!==b){Q.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),dt.setValue(S,"projectionMatrix",b.projectionMatrix),dt.setValue(S,"viewMatrix",b.matrixWorldInverse);let Nt=dt.map.cameraPosition;Nt!==void 0&&Nt.setValue(S,je.setFromMatrixPosition(b.matrixWorld)),$.logarithmicDepthBuffer&&dt.setValue(S,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&dt.setValue(S,"isOrthographic",b.isOrthographicCamera===!0),H!==b&&(H=b,Qt=!0,Vi=!0)}if(T.isSkinnedMesh){dt.setOptional(S,T,"bindMatrix"),dt.setOptional(S,T,"bindMatrixInverse");let Jt=T.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),dt.setValue(S,"boneTexture",Jt.boneTexture,ge))}T.isBatchedMesh&&(dt.setOptional(S,T,"batchingTexture"),dt.setValue(S,"batchingTexture",T._matricesTexture,ge),dt.setOptional(S,T,"batchingIdTexture"),dt.setValue(S,"batchingIdTexture",T._indirectTexture,ge),dt.setOptional(S,T,"batchingColorTexture"),T._colorsTexture!==null&&dt.setValue(S,"batchingColorTexture",T._colorsTexture,ge));let mn=Z.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&ue.update(T,Z,Ut),(Qt||Ce.receiveShadow!==T.receiveShadow)&&(Ce.receiveShadow=T.receiveShadow,dt.setValue(S,"receiveShadow",T.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(qn.envMap.value=Pe,qn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&J.environment!==null&&(qn.envMapIntensity.value=J.environmentIntensity),Qt&&(dt.setValue(S,"toneMappingExposure",l.toneMappingExposure),Ce.needsLights&&or(qn,Vi),pe&&F.fog===!0&&oe.refreshFogUniforms(qn,pe),oe.refreshMaterialUniforms(qn,F,B,U,c.state.transmissionRenderTarget[b.id]),Wi.upload(S,Tn(Ce),qn,ge)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Wi.upload(S,Tn(Ce),qn,ge),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&dt.setValue(S,"center",T.center),dt.setValue(S,"modelViewMatrix",T.modelViewMatrix),dt.setValue(S,"normalMatrix",T.normalMatrix),dt.setValue(S,"modelMatrix",T.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){let Jt=F.uniformsGroups;for(let Nt=0,ea=Jt.length;Nt<ea;Nt++){let xr=Jt[Nt];Ue.update(xr,Ut),Ue.bind(xr,Ut)}}return Ut}function or(b,J){b.ambientLightColor.needsUpdate=J,b.lightProbe.needsUpdate=J,b.directionalLights.needsUpdate=J,b.directionalLightShadows.needsUpdate=J,b.pointLights.needsUpdate=J,b.pointLightShadows.needsUpdate=J,b.spotLights.needsUpdate=J,b.spotLightShadows.needsUpdate=J,b.rectAreaLights.needsUpdate=J,b.hemisphereLights.needsUpdate=J}function $o(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,J,Z){let F=he.get(b);F.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),he.get(b.texture).__webglTexture=J,he.get(b.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:Z,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,J){let Z=he.get(b);Z.__webglFramebuffer=J,Z.__useDefaultFramebuffer=J===void 0};let Lr=S.createFramebuffer();this.setRenderTarget=function(b,J=0,Z=0){L=b,A=J,P=Z;let F=!0,T=null,pe=!1,Ke=!1;if(b){let Pe=he.get(b);if(Pe.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(S.FRAMEBUFFER,null),F=!1;else if(Pe.__webglFramebuffer===void 0)ge.setupRenderTarget(b);else if(Pe.__hasExternalTextures)ge.rebindTextures(b,he.get(b.texture).__webglTexture,he.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let E=b.depthTexture;if(Pe.__boundDepthTexture!==E){if(E!==null&&he.has(E)&&(b.width!==E.image.width||b.height!==E.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ge.setupDepthRenderbuffer(b)}}let z=b.texture;(z.isData3DTexture||z.isDataArrayTexture||z.isCompressedArrayTexture)&&(Ke=!0);let k=he.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(k[J])?T=k[J][Z]:T=k[J],pe=!0):b.samples>0&&ge.useMultisampledRTT(b)===!1?T=he.get(b).__webglMultisampledFramebuffer:Array.isArray(k)?T=k[Z]:T=k,C.copy(b.viewport),Y.copy(b.scissor),X=b.scissorTest}else C.copy(de).multiplyScalar(B).floor(),Y.copy(We).multiplyScalar(B).floor(),X=Ne;if(Z!==0&&(T=Lr),Q.bindFramebuffer(S.FRAMEBUFFER,T)&&F&&Q.drawBuffers(b,T),Q.viewport(C),Q.scissor(Y),Q.setScissorTest(X),pe){let Pe=he.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+J,Pe.__webglTexture,Z)}else if(Ke){let Pe=J;for(let z=0;z<b.textures.length;z++){let k=he.get(b.textures[z]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+z,k.__webglTexture,Z,Pe)}}else if(b!==null&&Z!==0){let Pe=he.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Pe.__webglTexture,Z)}K=-1},this.readRenderTargetPixels=function(b,J,Z,F,T,pe,Ke,ze=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=he.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ke!==void 0&&(Pe=Pe[Ke]),Pe){Q.bindFramebuffer(S.FRAMEBUFFER,Pe);try{let z=b.textures[ze],k=z.format,E=z.type;if(!$.textureFormatReadable(k)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$.textureTypeReadable(E)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=b.width-F&&Z>=0&&Z<=b.height-T&&(b.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+ze),S.readPixels(J,Z,F,T,De.convert(k),De.convert(E),pe))}finally{let z=L!==null?he.get(L).__webglFramebuffer:null;Q.bindFramebuffer(S.FRAMEBUFFER,z)}}},this.readRenderTargetPixelsAsync=async function(b,J,Z,F,T,pe,Ke,ze=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=he.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ke!==void 0&&(Pe=Pe[Ke]),Pe)if(J>=0&&J<=b.width-F&&Z>=0&&Z<=b.height-T){Q.bindFramebuffer(S.FRAMEBUFFER,Pe);let z=b.textures[ze],k=z.format,E=z.type;if(!$.textureFormatReadable(k))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$.textureTypeReadable(E))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ne=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,ne),S.bufferData(S.PIXEL_PACK_BUFFER,pe.byteLength,S.STREAM_READ),b.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+ze),S.readPixels(J,Z,F,T,De.convert(k),De.convert(E),0);let qe=L!==null?he.get(L).__webglFramebuffer:null;Q.bindFramebuffer(S.FRAMEBUFFER,qe);let Xe=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await q6(S,Xe,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,ne),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,pe),S.deleteBuffer(ne),S.deleteSync(Xe),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,J=null,Z=0){let F=Math.pow(2,-Z),T=Math.floor(b.image.width*F),pe=Math.floor(b.image.height*F),Ke=J!==null?J.x:0,ze=J!==null?J.y:0;ge.setTexture2D(b,0),S.copyTexSubImage2D(S.TEXTURE_2D,Z,0,0,Ke,ze,T,pe),Q.unbindTexture()};let ei=S.createFramebuffer(),es=S.createFramebuffer();this.copyTextureToTexture=function(b,J,Z=null,F=null,T=0,pe=null){pe===null&&(T!==0?(ji("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=T,T=0):pe=0);let Ke,ze,Pe,z,k,E,ne,qe,Xe,Ze=b.isCompressedTexture?b.mipmaps[pe]:b.image;if(Z!==null)Ke=Z.max.x-Z.min.x,ze=Z.max.y-Z.min.y,Pe=Z.isBox3?Z.max.z-Z.min.z:1,z=Z.min.x,k=Z.min.y,E=Z.isBox3?Z.min.z:0;else{let mn=Math.pow(2,-T);Ke=Math.floor(Ze.width*mn),ze=Math.floor(Ze.height*mn),b.isDataArrayTexture?Pe=Ze.depth:b.isData3DTexture?Pe=Math.floor(Ze.depth*mn):Pe=1,z=0,k=0,E=0}F!==null?(ne=F.x,qe=F.y,Xe=F.z):(ne=0,qe=0,Xe=0);let Be=De.convert(J.format),Ce=De.convert(J.type),Fe;J.isData3DTexture?(ge.setTexture3D(J,0),Fe=S.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(ge.setTexture2DArray(J,0),Fe=S.TEXTURE_2D_ARRAY):(ge.setTexture2D(J,0),Fe=S.TEXTURE_2D),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,J.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,J.unpackAlignment);let rt=S.getParameter(S.UNPACK_ROW_LENGTH),Ut=S.getParameter(S.UNPACK_IMAGE_HEIGHT),ti=S.getParameter(S.UNPACK_SKIP_PIXELS),Qt=S.getParameter(S.UNPACK_SKIP_ROWS),Vi=S.getParameter(S.UNPACK_SKIP_IMAGES);S.pixelStorei(S.UNPACK_ROW_LENGTH,Ze.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Ze.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,z),S.pixelStorei(S.UNPACK_SKIP_ROWS,k),S.pixelStorei(S.UNPACK_SKIP_IMAGES,E);let dt=b.isDataArrayTexture||b.isData3DTexture,qn=J.isDataArrayTexture||J.isData3DTexture;if(b.isDepthTexture){let mn=he.get(b),Jt=he.get(J),Nt=he.get(mn.__renderTarget),ea=he.get(Jt.__renderTarget);Q.bindFramebuffer(S.READ_FRAMEBUFFER,Nt.__webglFramebuffer),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,ea.__webglFramebuffer);for(let xr=0;xr<Pe;xr++)dt&&(S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,he.get(b).__webglTexture,T,E+xr),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,he.get(J).__webglTexture,pe,Xe+xr)),S.blitFramebuffer(z,k,Ke,ze,ne,qe,Ke,ze,S.DEPTH_BUFFER_BIT,S.NEAREST);Q.bindFramebuffer(S.READ_FRAMEBUFFER,null),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(T!==0||b.isRenderTargetTexture||he.has(b)){let mn=he.get(b),Jt=he.get(J);Q.bindFramebuffer(S.READ_FRAMEBUFFER,ei),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,es);for(let Nt=0;Nt<Pe;Nt++)dt?S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,mn.__webglTexture,T,E+Nt):S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,mn.__webglTexture,T),qn?S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,Jt.__webglTexture,pe,Xe+Nt):S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,Jt.__webglTexture,pe),T!==0?S.blitFramebuffer(z,k,Ke,ze,ne,qe,Ke,ze,S.COLOR_BUFFER_BIT,S.NEAREST):qn?S.copyTexSubImage3D(Fe,pe,ne,qe,Xe+Nt,z,k,Ke,ze):S.copyTexSubImage2D(Fe,pe,ne,qe,z,k,Ke,ze);Q.bindFramebuffer(S.READ_FRAMEBUFFER,null),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else qn?b.isDataTexture||b.isData3DTexture?S.texSubImage3D(Fe,pe,ne,qe,Xe,Ke,ze,Pe,Be,Ce,Ze.data):J.isCompressedArrayTexture?S.compressedTexSubImage3D(Fe,pe,ne,qe,Xe,Ke,ze,Pe,Be,Ze.data):S.texSubImage3D(Fe,pe,ne,qe,Xe,Ke,ze,Pe,Be,Ce,Ze):b.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,pe,ne,qe,Ke,ze,Be,Ce,Ze.data):b.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,pe,ne,qe,Ze.width,Ze.height,Be,Ze.data):S.texSubImage2D(S.TEXTURE_2D,pe,ne,qe,Ke,ze,Be,Ce,Ze);S.pixelStorei(S.UNPACK_ROW_LENGTH,rt),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Ut),S.pixelStorei(S.UNPACK_SKIP_PIXELS,ti),S.pixelStorei(S.UNPACK_SKIP_ROWS,Qt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Vi),pe===0&&J.generateMipmaps&&S.generateMipmap(Fe),Q.unbindTexture()},this.initRenderTarget=function(b){he.get(b).__webglFramebuffer===void 0&&ge.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ge.setTextureCube(b,0):b.isData3DTexture?ge.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ge.setTexture2DArray(b,0):ge.setTexture2D(b,0),Q.unbindTexture()},this.resetState=function(){A=0,P=0,L=null,Q.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}};var F6={type:"change"},xf={type:"start"},V6={type:"end"},Uu=new yr,R6=new Zt,g3=Math.cos(70*Gn.DEG2RAD),Pt=new M,Vt=2*Math.PI,ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lf=1e-6,Qu=class extends To{constructor(e,t=null){super(e,t),this.state=ct.NONE,this.target=new M,this.cursor=new M,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Or.ROTATE,MIDDLE:Or.DOLLY,RIGHT:Or.PAN},this.touches={ONE:jr.ROTATE,TWO:jr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new M,this._lastQuaternion=new Bt,this._lastTargetPosition=new M,this._quat=new Bt().setFromUnitVectors(e.up,new M(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mi,this._sphericalDelta=new Mi,this._scale=1,this._panOffset=new M,this._rotateStart=new se,this._rotateEnd=new se,this._rotateDelta=new se,this._panStart=new se,this._panEnd=new se,this._panDelta=new se,this._dollyStart=new se,this._dollyEnd=new se,this._dollyDelta=new se,this._dollyDirection=new M,this._mouse=new se,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=l3.bind(this),this._onPointerDown=v3.bind(this),this._onPointerUp=d3.bind(this),this._onContextMenu=A3.bind(this),this._onMouseWheel=b3.bind(this),this._onKeyDown=O3.bind(this),this._onTouchStart=j3.bind(this),this._onTouchMove=I3.bind(this),this._onMouseDown=H3.bind(this),this._onMouseMove=K3.bind(this),this._interceptControlDown=L3.bind(this),this._interceptControlUp=x3.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(F6),this.update(),this.state=ct.NONE}update(e=null){let t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Vt:n>Math.PI&&(n-=Vt),i<-Math.PI?i+=Vt:i>Math.PI&&(i-=Vt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let o=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),o=s!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){let u=Pt.length();s=this._clampDistance(u*this._scale);let a=u-s;this.object.position.addScaledVector(this._dollyDirection,a),this.object.updateMatrixWorld(),o=!!a}else if(this.object.isOrthographicCamera){let u=new M(this._mouse.x,this._mouse.y,0);u.unproject(this.object);let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),o=a!==this.object.zoom;let f=new M(this._mouse.x,this._mouse.y,0);f.unproject(this.object),this.object.position.sub(f).add(u),this.object.updateMatrixWorld(),s=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(Uu.origin.copy(this.object.position),Uu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Uu.direction))<g3?this.object.lookAt(this.target):(R6.setFromNormalAndCoplanarPoint(this.object.up,this.target),Uu.intersectPlane(R6,this.target))))}else if(this.object.isOrthographicCamera){let s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),o=!0)}return this._scale=1,this._performCursorZoom=!1,o||this._lastPosition.distanceToSquared(this.object.position)>Lf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lf||this._lastTargetPosition.distanceToSquared(this.target)>Lf?(this.dispatchEvent(F6),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Vt/60*this.autoRotateSpeed*e:Vt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Pt.copy(i).sub(this.target);let o=Pt.length();o*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*o/n.clientHeight,this.object.matrix),this._panUp(2*t*o/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,o=t-n.top,s=n.width,u=n.height;this._mouse.x=i/s*2-1,this._mouse.y=-(o/u)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Vt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Vt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Vt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Vt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Vt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,o=Math.sqrt(n*n+i*i);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),o=.5*(e.pageY+n.y);this._rotateEnd.set(i,o)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Vt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,o=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,o),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let s=(e.pageX+t.x)*.5,u=(e.pageY+t.y)*.5;this._updateZoomParameters(s,u)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new se,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function v3(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function l3(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function d3(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(V6),this.state=ct.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function H3(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Or.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ct.DOLLY;break;case Or.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ct.ROTATE}break;case Or.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ct.PAN}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(xf)}function K3(r){switch(this.state){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function b3(r){this.enabled===!1||this.enableZoom===!1||this.state!==ct.NONE||(r.preventDefault(),this.dispatchEvent(xf),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(V6))}function O3(r){this.enabled!==!1&&this._handleKeyDown(r)}function j3(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case jr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ct.TOUCH_ROTATE;break;case jr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ct.TOUCH_PAN;break;default:this.state=ct.NONE}break;case 2:switch(this.touches.TWO){case jr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ct.TOUCH_DOLLY_PAN;break;case jr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ct.TOUCH_DOLLY_ROTATE;break;default:this.state=ct.NONE}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(xf)}function I3(r){switch(this._trackPointer(r),this.state){case ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ct.NONE}}function A3(r){this.enabled!==!1&&r.preventDefault()}function L3(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function x3(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var U6={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},_r=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Sf(e)}),this.register(function(e){return new Mf(e)}),this.register(function(e){return new Xf(e)}),this.register(function(e){return new Df(e)}),this.register(function(e){return new Jf(e)}),this.register(function(e){return new Tf(e)}),this.register(function(e){return new wf(e)}),this.register(function(e){return new Yf(e)}),this.register(function(e){return new Gf(e)}),this.register(function(e){return new Wf(e)}),this.register(function(e){return new kf(e)}),this.register(function(e){return new Nf(e)}),this.register(function(e){return new Zf(e)}),this.register(function(e){return new Bf(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,i){let o=new Cf,s=[];for(let u=0,a=this.pluginCallbacks.length;u<a;u++)s.push(this.pluginCallbacks[u](o));o.setPlugins(s),o.setTextureUtils(this.textureUtils),o.writeAsync(e,t,i).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(i,o){n.parse(e,i,o,t)})}},it={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Pf="KHR_mesh_quantization",un={};un[Gt]=it.NEAREST;un[au]=it.NEAREST_MIPMAP_NEAREST;un[Br]=it.NEAREST_MIPMAP_LINEAR;un[It]=it.LINEAR;un[Yi]=it.LINEAR_MIPMAP_NEAREST;un[on]=it.LINEAR_MIPMAP_LINEAR;un[yn]=it.CLAMP_TO_EDGE;un[gn]=it.REPEAT;un[di]=it.MIRRORED_REPEAT;var Q6={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},P3=new Re,_6=12,z3=1179937895,C3=2,$6=8,S3=1313821514,M3=5130562;function Ro(r,e){return r.length===e.length&&r.every(function(t,n){return t===e[n]})}function w3(r){return new TextEncoder().encode(r).buffer}function Y3(r){return Ro(r.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function G3(r,e,t){let n={min:new Array(r.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(r.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let i=e;i<e+t;i++)for(let o=0;o<r.itemSize;o++){let s;r.itemSize>4?s=r.array[i*r.itemSize+o]:(o===0?s=r.getX(i):o===1?s=r.getY(i):o===2?s=r.getZ(i):o===3&&(s=r.getW(i)),r.normalized===!0&&(s=Gn.normalize(s,r.array))),n.min[o]=Math.min(n.min[o],s),n.max[o]=Math.max(n.max[o],s)}return n}function tp(r){return Math.ceil(r/4)*4}function zf(r,e=0){let t=tp(r.byteLength);if(t!==r.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(r)),e!==0)for(let i=r.byteLength;i<t;i++)n[i]=e;return n.buffer}return r}function ep(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function X3(r,e){if(typeof OffscreenCanvas<"u"&&r instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),r.convertToBlob({type:e,quality:t})}else return new Promise(t=>r.toBlob(t,e))}var Cf=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r180"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let i=this,o=i.buffers,s=i.json;n=i.options;let u=i.extensionsUsed,a=i.extensionsRequired,f=new Blob(o,{type:"application/octet-stream"}),h=Object.keys(u),p=Object.keys(a);if(h.length>0&&(s.extensionsUsed=h),p.length>0&&(s.extensionsRequired=p),s.buffers&&s.buffers.length>0&&(s.buffers[0].byteLength=f.size),n.binary===!0){let m=new FileReader;m.readAsArrayBuffer(f),m.onloadend=function(){let q=zf(m.result),g=new DataView(new ArrayBuffer($6));g.setUint32(0,q.byteLength,!0),g.setUint32(4,M3,!0);let v=zf(w3(JSON.stringify(s)),32),y=new DataView(new ArrayBuffer($6));y.setUint32(0,v.byteLength,!0),y.setUint32(4,S3,!0);let c=new ArrayBuffer(_6),I=new DataView(c);I.setUint32(0,z3,!0),I.setUint32(4,C3,!0);let O=_6+y.byteLength+v.byteLength+g.byteLength+q.byteLength;I.setUint32(8,O,!0);let l=new Blob([c,y,v,g,q],{type:"application/octet-stream"}),j=new FileReader;j.readAsArrayBuffer(l),j.onloadend=function(){t(j.result)}}}else if(s.buffers&&s.buffers.length>0){let m=new FileReader;m.readAsDataURL(f),m.onloadend=function(){let q=m.result;s.buffers[0].uri=q,t(s)}}else t(s)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,i=this.extensionsUsed;try{let o=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&o.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let s in o.gltfExtensions)t.extensions[s]=o.gltfExtensions[s],i[s]=!0;delete o.gltfExtensions}Object.keys(o).length>0&&(t.extras=o)}catch(o){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+o.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let i=new Map;i.set(!0,this.uid++),i.set(!1,this.uid++),this.uids.set(e,i)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new M;for(let i=0,o=e.count;i<o;i++)if(Math.abs(n.fromBufferAttribute(e,i).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),i=new M;for(let o=0,s=n.count;o<s;o++)i.fromBufferAttribute(n,o),i.x===0&&i.y===0&&i.z===0?i.setX(1):i.normalize(),n.setXYZ(o,i.x,i.y,i.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,i={};(t.offset.x!==0||t.offset.y!==0)&&(i.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(i.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(i.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=i,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(q){return q.colorSpace===mt?function(v){return v<.04045?v*.0773993808:Math.pow(v*.9478672986+.0521327014,2.4)}:function(v){return v}}e instanceof Jr&&(e=await this.decompressTextureAsync(e)),t instanceof Jr&&(t=await this.decompressTextureAsync(t));let i=e?e.image:null,o=t?t.image:null,s=Math.max(i?i.width:0,o?o.width:0),u=Math.max(i?i.height:0,o?o.height:0),a=ep();a.width=s,a.height=u;let f=a.getContext("2d",{willReadFrequently:!0});f.fillStyle="#00ffff",f.fillRect(0,0,s,u);let h=f.getImageData(0,0,s,u);if(i){f.drawImage(i,0,0,s,u);let q=n(e),g=f.getImageData(0,0,s,u).data;for(let v=2;v<g.length;v+=4)h.data[v]=q(g[v]/256)*256}if(o){f.drawImage(o,0,0,s,u);let q=n(t),g=f.getImageData(0,0,s,u).data;for(let v=1;v<g.length;v+=4)h.data[v]=q(g[v]/256)*256}f.putImageData(h,0,0);let m=(e||t).clone();return m.source=new cr(a),m.colorSpace=Rt,m.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),m}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,i,o){let s=this.json;s.bufferViews||(s.bufferViews=[]);let u;switch(t){case it.BYTE:case it.UNSIGNED_BYTE:u=1;break;case it.SHORT:case it.UNSIGNED_SHORT:u=2;break;default:u=4}let a=e.itemSize*u;o===it.ARRAY_BUFFER&&(a=Math.ceil(a/4)*4);let f=tp(i*a),h=new DataView(new ArrayBuffer(f)),p=0;for(let g=n;g<n+i;g++){for(let v=0;v<e.itemSize;v++){let y;e.itemSize>4?y=e.array[g*e.itemSize+v]:(v===0?y=e.getX(g):v===1?y=e.getY(g):v===2?y=e.getZ(g):v===3&&(y=e.getW(g)),e.normalized===!0&&(y=Gn.normalize(y,e.array))),t===it.FLOAT?h.setFloat32(p,y,!0):t===it.INT?h.setInt32(p,y,!0):t===it.UNSIGNED_INT?h.setUint32(p,y,!0):t===it.SHORT?h.setInt16(p,y,!0):t===it.UNSIGNED_SHORT?h.setUint16(p,y,!0):t===it.BYTE?h.setInt8(p,y):t===it.UNSIGNED_BYTE&&h.setUint8(p,y),p+=u}p%a!==0&&(p+=a-p%a)}let m={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:f};return o!==void 0&&(m.target=o),o===it.ARRAY_BUFFER&&(m.byteStride=a),this.byteOffset+=f,s.bufferViews.push(m),{id:s.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(i){let o=new FileReader;o.readAsArrayBuffer(e),o.onloadend=function(){let s=zf(o.result),u={buffer:t.processBuffer(s),byteOffset:t.byteOffset,byteLength:s.byteLength};t.byteOffset+=s.byteLength,i(n.bufferViews.push(u)-1)}})}processAccessor(e,t,n,i){let o=this.json,s={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},u;if(e.array.constructor===Float32Array)u=it.FLOAT;else if(e.array.constructor===Int32Array)u=it.INT;else if(e.array.constructor===Uint32Array)u=it.UNSIGNED_INT;else if(e.array.constructor===Int16Array)u=it.SHORT;else if(e.array.constructor===Uint16Array)u=it.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)u=it.BYTE;else if(e.array.constructor===Uint8Array)u=it.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(i===void 0||i===1/0)&&(i=e.count),i===0)return null;let a=G3(e,n,i),f;t!==void 0&&(f=e===t.index?it.ELEMENT_ARRAY_BUFFER:it.ARRAY_BUFFER);let h=this.processBufferView(e,u,n,i,f),p={bufferView:h.id,byteOffset:h.byteOffset,componentType:u,count:i,max:a.max,min:a.min,type:s[e.itemSize]};return e.normalized===!0&&(p.normalized=!0),o.accessors||(o.accessors=[]),o.accessors.push(p)-1}processImage(e,t,n,i="image/png"){if(e!==null){let o=this,s=o.cache,u=o.json,a=o.options,f=o.pending;s.images.has(e)||s.images.set(e,{});let h=s.images.get(e),p=i+":flipY/"+n.toString();if(h[p]!==void 0)return h[p];u.images||(u.images=[]);let m={mimeType:i},q=ep();q.width=Math.min(e.width,a.maxTextureSize),q.height=Math.min(e.height,a.maxTextureSize);let g=q.getContext("2d",{willReadFrequently:!0});if(n===!0&&(g.translate(0,q.height),g.scale(1,-1)),e.data!==void 0){t!==Ft&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>a.maxTextureSize||e.height>a.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let y=new Uint8ClampedArray(e.height*e.width*4);for(let c=0;c<y.length;c+=4)y[c+0]=e.data[c+0],y[c+1]=e.data[c+1],y[c+2]=e.data[c+2],y[c+3]=e.data[c+3];g.putImageData(new ImageData(y,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)g.drawImage(e,0,0,q.width,q.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");a.binary===!0?f.push(X3(q,i).then(y=>o.processBufferViewImage(y)).then(y=>{m.bufferView=y})):m.uri=Ii.getDataURL(q,i);let v=u.images.push(m)-1;return h[p]=v,v}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:un[e.magFilter],minFilter:un[e.minFilter],wrapS:un[e.wrapS],wrapT:un[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,i=this.cache,o=this.json;if(i.textures.has(e))return i.textures.get(e);o.textures||(o.textures=[]),e instanceof Jr&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let s=e.userData.mimeType;s==="image/webp"&&(s="image/png");let u={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,s)};e.name&&(u.name=e.name),await this._invokeAllAsync(async function(f){f.writeTexture&&await f.writeTexture(e,u)});let a=o.textures.push(u)-1;return i.textures.set(e,a),a}async processMaterialAsync(e){let t=this.cache,n=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);let i={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let o=e.color.toArray().concat([e.opacity]);if(Ro(o,[1,1,1,1])||(i.pbrMetallicRoughness.baseColorFactor=o),e.isMeshStandardMaterial?(i.pbrMetallicRoughness.metallicFactor=e.metalness,i.pbrMetallicRoughness.roughnessFactor=e.roughness):(i.pbrMetallicRoughness.metallicFactor=0,i.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let u=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),a={index:await this.processTextureAsync(u),texCoord:u.channel};this.applyTextureTransform(a,u),i.pbrMetallicRoughness.metallicRoughnessTexture=a}if(e.map){let u={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(u,e.map),i.pbrMetallicRoughness.baseColorTexture=u}if(e.emissive){let u=e.emissive;if(Math.max(u.r,u.g,u.b)>0&&(i.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let f={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(f,e.emissiveMap),i.emissiveTexture=f}}if(e.normalMap){let u={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(u.scale=e.normalScale.x),this.applyTextureTransform(u,e.normalMap),i.normalTexture=u}if(e.aoMap){let u={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(u.strength=e.aoMapIntensity),this.applyTextureTransform(u,e.aoMap),i.occlusionTexture=u}e.transparent?i.alphaMode="BLEND":e.alphaTest>0&&(i.alphaMode="MASK",i.alphaCutoff=e.alphaTest),e.side===Ot&&(i.doubleSided=!0),e.name!==""&&(i.name=e.name),this.serializeUserData(e,i),await this._invokeAllAsync(async function(u){u.writeMaterialAsync&&await u.writeMaterialAsync(e,i)});let s=n.materials.push(i)-1;return t.materials.set(e,s),s}async processMeshAsync(e){let t=this.cache,n=this.json,i=[e.geometry.uuid];if(Array.isArray(e.material))for(let l=0,j=e.material.length;l<j;l++)i.push(e.material[l].uuid);else i.push(e.material.uuid);let o=i.join(":");if(t.meshes.has(o))return t.meshes.get(o);let s=e.geometry,u;e.isLineSegments?u=it.LINES:e.isLineLoop?u=it.LINE_LOOP:e.isLine?u=it.LINE_STRIP:e.isPoints?u=it.POINTS:u=e.material.wireframe?it.LINES:it.TRIANGLES;let a={},f={},h=[],p=[],m={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},q=s.getAttribute("normal");q!==void 0&&!this.isNormalizedNormalAttribute(q)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),s.setAttribute("normal",this.createNormalizedNormalAttribute(q)));let g=null;for(let l in s.attributes){if(l.slice(0,5)==="morph")continue;let j=s.attributes[l];if(l=m[l]||l.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(l)||(l="_"+l),t.attributes.has(this.getUID(j))){f[l]=t.attributes.get(this.getUID(j));continue}g=null;let P=j.array;l==="JOINTS_0"&&!(P instanceof Uint16Array)&&!(P instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),g=new Kt(new Uint16Array(P),j.itemSize,j.normalized)):(P instanceof Uint32Array||P instanceof Int32Array)&&!l.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${l}" converted to type FLOAT.`),g=_r.Utils.toFloat32BufferAttribute(j));let L=this.processAccessor(g||j,s);L!==null&&(l.startsWith("_")||this.detectMeshQuantization(l,j),f[l]=L,t.attributes.set(this.getUID(j),L))}if(q!==void 0&&s.setAttribute("normal",q),Object.keys(f).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let l=[],j=[],A={};if(e.morphTargetDictionary!==void 0)for(let P in e.morphTargetDictionary)A[e.morphTargetDictionary[P]]=P;for(let P=0;P<e.morphTargetInfluences.length;++P){let L={},K=!1;for(let H in s.morphAttributes){if(H!=="position"&&H!=="normal"){K||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),K=!0);continue}let C=s.morphAttributes[H][P],Y=H.toUpperCase(),X=s.attributes[H];if(t.attributes.has(this.getUID(C,!0))){L[Y]=t.attributes.get(this.getUID(C,!0));continue}let D=C.clone();if(!s.morphTargetsRelative)for(let w=0,N=C.count;w<N;w++)for(let U=0;U<C.itemSize;U++)U===0&&D.setX(w,C.getX(w)-X.getX(w)),U===1&&D.setY(w,C.getY(w)-X.getY(w)),U===2&&D.setZ(w,C.getZ(w)-X.getZ(w)),U===3&&D.setW(w,C.getW(w)-X.getW(w));L[Y]=this.processAccessor(D,s),t.attributes.set(this.getUID(X,!0),L[Y])}p.push(L),l.push(e.morphTargetInfluences[P]),e.morphTargetDictionary!==void 0&&j.push(A[P])}a.weights=l,j.length>0&&(a.extras={},a.extras.targetNames=j)}let v=Array.isArray(e.material);if(v&&s.groups.length===0)return null;let y=!1;if(v&&s.index===null){let l=[];for(let j=0,A=s.attributes.position.count;j<A;j++)l[j]=j;s.setIndex(l),y=!0}let c=v?e.material:[e.material],I=v?s.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let l=0,j=I.length;l<j;l++){let A={mode:u,attributes:f};if(this.serializeUserData(s,A),p.length>0&&(A.targets=p),s.index!==null){let L=this.getUID(s.index);(I[l].start!==void 0||I[l].count!==void 0)&&(L+=":"+I[l].start+":"+I[l].count),t.attributes.has(L)?A.indices=t.attributes.get(L):(A.indices=this.processAccessor(s.index,s,I[l].start,I[l].count),t.attributes.set(L,A.indices)),A.indices===null&&delete A.indices}let P=await this.processMaterialAsync(c[I[l].materialIndex]);P!==null&&(A.material=P),h.push(A)}y===!0&&s.setIndex(null),a.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(l){l.writeMesh&&l.writeMesh(e,a)});let O=n.meshes.push(a)-1;return t.meshes.set(o,O),O}detectMeshQuantization(e,t){if(this.extensionsUsed[Pf])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let i=e.split("_",1)[0];U6[i]&&U6[i].includes(n)&&(this.extensionsUsed[Pf]=!0,this.extensionsRequired[Pf]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,i={type:n?"orthographic":"perspective"};return n?i.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:i.perspective={aspectRatio:e.aspect,yfov:Gn.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(i.name=e.type),t.cameras.push(i)-1}processAnimation(e,t){let n=this.json,i=this.nodeMap;n.animations||(n.animations=[]),e=_r.Utils.mergeMorphTargetTracks(e.clone(),t);let o=e.tracks,s=[],u=[];for(let f=0;f<o.length;++f){let h=o[f],p=pt.parseTrackName(h.name),m=pt.findNode(t,p.nodeName),q=Q6[p.propertyName];if(p.objectName==="bones"&&(m.isSkinnedMesh===!0?m=m.skeleton.getBoneByName(p.objectIndex):m=void 0),!m||!q){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let g=1,v=h.values.length/h.times.length;q===Q6.morphTargetInfluences&&(v/=m.morphTargetInfluences.length);let y;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(y="CUBICSPLINE",v/=3):h.getInterpolation()===Xr?y="STEP":y="LINEAR",u.push({input:this.processAccessor(new Kt(h.times,g)),output:this.processAccessor(new Kt(h.values,v)),interpolation:y}),s.push({sampler:u.length-1,target:{node:i.get(m),path:q}})}let a={name:e.name||"clip_"+n.animations.length,samplers:u,channels:s};return this.serializeUserData(e,a),n.animations.push(a),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,i=t.nodes[n.get(e)],o=e.skeleton;if(o===void 0)return null;let s=e.skeleton.bones[0];if(s===void 0)return null;let u=[],a=new Float32Array(o.bones.length*16),f=new at;for(let p=0;p<o.bones.length;++p)u.push(n.get(o.bones[p])),f.copy(o.boneInverses[p]),f.multiply(e.bindMatrix).toArray(a,p*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new Kt(a,16)),joints:u,skeleton:n.get(s)}),i.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,i=this.nodeMap;t.nodes||(t.nodes=[]);let o={};if(n.trs){let u=e.quaternion.toArray(),a=e.position.toArray(),f=e.scale.toArray();Ro(u,[0,0,0,1])||(o.rotation=u),Ro(a,[0,0,0])||(o.translation=a),Ro(f,[1,1,1])||(o.scale=f)}else e.matrixAutoUpdate&&e.updateMatrix(),Y3(e.matrix)===!1&&(o.matrix=e.matrix.elements);if(e.name!==""&&(o.name=String(e.name)),this.serializeUserData(e,o),e.isMesh||e.isLine||e.isPoints){let u=await this.processMeshAsync(e);u!==null&&(o.mesh=u)}else e.isCamera&&(o.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let s=t.nodes.push(o)-1;if(i.set(e,s),e.children.length>0){let u=[];for(let a=0,f=e.children.length;a<f;a++){let h=e.children[a];if(h.visible||n.onlyVisible===!1){let p=await this.processNodeAsync(h);p!==null&&u.push(p)}}u.length>0&&(o.children=u)}return await this._invokeAllAsync(function(u){u.writeNode&&u.writeNode(e,o)}),s}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let i={};e.name!==""&&(i.name=e.name),t.scenes.push(i);let o=[];for(let s=0,u=e.children.length;s<u;s++){let a=e.children[s];if(a.visible||n.onlyVisible===!1){let f=await this.processNodeAsync(a);f!==null&&o.push(f)}}o.length>0&&(i.nodes=o),this.serializeUserData(e,i)}async processObjectsAsync(e){let t=new vr;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(i){i.beforeParse&&i.beforeParse(e)});let n=[];for(let i=0;i<e.length;i++)e[i]instanceof vr?await this.processSceneAsync(e[i]):n.push(e[i]);n.length>0&&await this.processObjectsAsync(n);for(let i=0;i<this.skins.length;++i)this.processSkin(this.skins[i]);for(let i=0;i<t.animations.length;++i)this.processAnimation(t.animations[i],e[0]);await this._invokeAllAsync(function(i){i.afterParse&&i.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},Sf=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,i=n.json,o=n.extensionsUsed,s={};e.name&&(s.name=e.name),s.color=e.color.toArray(),s.intensity=e.intensity,e.isDirectionalLight?s.type="directional":e.isPointLight?(s.type="point",e.distance>0&&(s.range=e.distance)):e.isSpotLight&&(s.type="spot",e.distance>0&&(s.range=e.distance),s.spot={},s.spot.innerConeAngle=(1-e.penumbra)*e.angle,s.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),o[this.name]||(i.extensions=i.extensions||{},i.extensions[this.name]={lights:[]},o[this.name]=!0);let u=i.extensions[this.name].lights;u.push(s),t.extensions=t.extensions||{},t.extensions[this.name]={light:u.length-1}}},Mf=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let i=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},i[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},wf=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.clearcoatFactor=e.clearcoat,e.clearcoatMap){let s={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(s,e.clearcoatMap),o.clearcoatTexture=s}if(o.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let s={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(s,e.clearcoatRoughnessMap),o.clearcoatRoughnessTexture=s}if(e.clearcoatNormalMap){let s={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(s.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(s,e.clearcoatNormalMap),o.clearcoatNormalTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Yf=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let i=this.writer.extensionsUsed,o={};o.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Gf=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.iridescenceFactor=e.iridescence,e.iridescenceMap){let s={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(s,e.iridescenceMap),o.iridescenceTexture=s}if(o.iridescenceIor=e.iridescenceIOR,o.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],o.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let s={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(s,e.iridescenceThicknessMap),o.iridescenceThicknessTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Xf=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.transmissionFactor=e.transmission,e.transmissionMap){let s={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(s,e.transmissionMap),o.transmissionTexture=s}t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Df=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,o={};if(o.thicknessFactor=e.thickness,e.thicknessMap){let s={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(s,e.thicknessMap),o.thicknessTexture=s}e.attenuationDistance!==1/0&&(o.attenuationDistance=e.attenuationDistance),o.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Jf=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let i=this.writer.extensionsUsed,o={};o.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Tf=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(P3)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.specularIntensityMap){let s={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(s,e.specularIntensityMap),o.specularTexture=s}if(e.specularColorMap){let s={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(s,e.specularColorMap),o.specularColorTexture=s}o.specularFactor=e.specularIntensity,o.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Wf=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.sheenRoughnessMap){let s={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(s,e.sheenRoughnessMap),o.sheenRoughnessTexture=s}if(e.sheenColorMap){let s={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(s,e.sheenColorMap),o.sheenColorTexture=s}o.sheenRoughnessFactor=e.sheenRoughness,o.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},kf=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.anisotropyMap){let s={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(s,e.anisotropyMap),o.anisotropyTexture=s}o.anisotropyStrength=e.anisotropy,o.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Nf=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let i=this.writer.extensionsUsed,o={};o.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Zf=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,i=n.extensionsUsed,o={};if(e.bumpMap){let s={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(s,e.bumpMap),o.bumpTexture=s}o.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=o,i[this.name]=!0}},Bf=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,i=e,o=new Float32Array(i.count*3),s=new Float32Array(i.count*4),u=new Float32Array(i.count*3),a=new at,f=new M,h=new Bt,p=new M;for(let q=0;q<i.count;q++)i.getMatrixAt(q,a),a.decompose(f,h,p),f.toArray(o,q*3),h.toArray(s,q*4),p.toArray(u,q*3);let m={TRANSLATION:n.processAccessor(new Kt(o,3)),ROTATION:n.processAccessor(new Kt(s,4)),SCALE:n.processAccessor(new Kt(u,3))};i.instanceColor&&(m._COLOR_0=n.processAccessor(i.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:m},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};_r.Utils={insertKeyframe:function(r,e){let n=r.getValueSize(),i=new r.TimeBufferType(r.times.length+1),o=new r.ValueBufferType(r.values.length+n),s=r.createInterpolant(new r.ValueBufferType(n)),u;if(r.times.length===0){i[0]=e;for(let a=0;a<n;a++)o[a]=0;u=0}else if(e<r.times[0]){if(Math.abs(r.times[0]-e)<.001)return 0;i[0]=e,i.set(r.times,1),o.set(s.evaluate(e),0),o.set(r.values,n),u=0}else if(e>r.times[r.times.length-1]){if(Math.abs(r.times[r.times.length-1]-e)<.001)return r.times.length-1;i[i.length-1]=e,i.set(r.times,0),o.set(r.values,0),o.set(s.evaluate(e),r.values.length),u=i.length-1}else for(let a=0;a<r.times.length;a++){if(Math.abs(r.times[a]-e)<.001)return a;if(r.times[a]<e&&r.times[a+1]>e){i.set(r.times.slice(0,a+1),0),i[a+1]=e,i.set(r.times.slice(a+1),a+2),o.set(r.values.slice(0,(a+1)*n),0),o.set(s.evaluate(e),(a+1)*n),o.set(r.values.slice((a+1)*n),(a+2)*n),u=a+1;break}}return r.times=i,r.values=o,u},mergeMorphTargetTracks:function(r,e){let t=[],n={},i=r.tracks;for(let o=0;o<i.length;++o){let s=i[o],u=pt.parseTrackName(s.name),a=pt.findNode(e,u.nodeName);if(u.propertyName!=="morphTargetInfluences"||u.propertyIndex===void 0){t.push(s);continue}if(s.createInterpolant!==s.InterpolantFactoryMethodDiscrete&&s.createInterpolant!==s.InterpolantFactoryMethodLinear){if(s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),s=s.clone(),s.setInterpolation(Ki)}let f=a.morphTargetInfluences.length,h=a.morphTargetDictionary[u.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+u.propertyIndex);let p;if(n[a.uuid]===void 0){p=s.clone();let q=new p.ValueBufferType(f*p.times.length);for(let g=0;g<p.times.length;g++)q[g*f+h]=p.values[g];p.name=(u.nodeName||"")+".morphTargetInfluences",p.values=q,n[a.uuid]=p,t.push(p);continue}let m=s.createInterpolant(new s.ValueBufferType(1));p=n[a.uuid];for(let q=0;q<p.times.length;q++)p.values[q*f+h]=m.evaluate(p.times[q]);for(let q=0;q<s.times.length;q++){let g=this.insertKeyframe(p,s.times[q]);p.values[g*f+h]=s.values[q]}}return r.tracks=t,r},toFloat32BufferAttribute:function(r){let e=new Kt(new Float32Array(r.count*r.itemSize),r.itemSize,!1);if(!r.normalized&&!r.isInterleavedBufferAttribute)return e.array.set(r.array),e;for(let t=0,n=r.count;t<n;t++)for(let i=0;i<r.itemSize;i++)e.setComponent(t,i,r.getComponent(t,i));return e}};var Vo=class r extends st{constructor(e,t={}){super(e),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this.camera=new Ct;let n=this,i=t.color!==void 0?new Re(t.color):new Re(8355711),o=t.textureWidth||512,s=t.textureHeight||512,u=t.clipBias||0,a=t.shader||r.ReflectorShader,f=t.multisample!==void 0?t.multisample:4,h=new Zt,p=new M,m=new M,q=new M,g=new at,v=new M(0,0,-1),y=new yt,c=new M,I=new M,O=new yt,l=new at,j=this.camera,A=new vn(o,s,{samples:f,type:sn}),P=new en({name:a.name!==void 0?a.name:"unspecified",uniforms:Zu.clone(a.uniforms),fragmentShader:a.fragmentShader,vertexShader:a.vertexShader});P.uniforms.tDiffuse.value=A.texture,P.uniforms.color.value=i,P.uniforms.textureMatrix.value=l,this.material=P,this.onBeforeRender=function(L,K,H){if(m.setFromMatrixPosition(n.matrixWorld),q.setFromMatrixPosition(H.matrixWorld),g.extractRotation(n.matrixWorld),p.set(0,0,1),p.applyMatrix4(g),c.subVectors(m,q),c.dot(p)>0===!0&&this.forceUpdate===!1)return;c.reflect(p).negate(),c.add(m),g.extractRotation(H.matrixWorld),v.set(0,0,-1),v.applyMatrix4(g),v.add(q),I.subVectors(m,v),I.reflect(p).negate(),I.add(m),j.position.copy(c),j.up.set(0,1,0),j.up.applyMatrix4(g),j.up.reflect(p),j.lookAt(I),j.far=H.far,j.updateMatrixWorld(),j.projectionMatrix.copy(H.projectionMatrix),l.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),l.multiply(j.projectionMatrix),l.multiply(j.matrixWorldInverse),l.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(p,m),h.applyMatrix4(j.matrixWorldInverse),y.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let Y=j.projectionMatrix;O.x=(Math.sign(y.x)+Y.elements[8])/Y.elements[0],O.y=(Math.sign(y.y)+Y.elements[9])/Y.elements[5],O.z=-1,O.w=(1+Y.elements[10])/Y.elements[14],y.multiplyScalar(2/y.dot(O)),Y.elements[2]=y.x,Y.elements[6]=y.y,Y.elements[10]=y.z+1-u,Y.elements[14]=y.w,n.visible=!1;let X=L.getRenderTarget(),D=L.xr.enabled,w=L.shadowMap.autoUpdate;L.xr.enabled=!1,L.shadowMap.autoUpdate=!1,L.setRenderTarget(A),L.state.buffers.depth.setMask(!0),L.autoClear===!1&&L.clear(),L.render(K,j),L.xr.enabled=D,L.shadowMap.autoUpdate=w,L.setRenderTarget(X);let N=H.viewport;N!==void 0&&L.state.viewport(N),n.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return A},this.dispose=function(){A.dispose(),n.material.dispose()}}};Vo.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};var _u=class extends wo{constructor(e){super(e),this.type=sn}parse(e){let s=function(L,K){switch(L){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(K||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(K||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(K||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(K||""))}},p=function(L,K,H){K=K||1024;let Y=L.pos,X=-1,D=0,w="",N=String.fromCharCode.apply(null,new Uint16Array(L.subarray(Y,Y+128)));for(;0>(X=N.indexOf(`
`))&&D<K&&Y<L.byteLength;)w+=N,D+=N.length,Y+=128,N+=String.fromCharCode.apply(null,new Uint16Array(L.subarray(Y,Y+128)));return-1<X?(H!==!1&&(L.pos+=D+X+1),w+N.slice(0,X)):!1},m=function(L){let K=/^#\?(\S+)/,H=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,C=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,Y=/^\s*FORMAT=(\S+)\s*$/,X=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,D={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},w,N;for((L.pos>=L.byteLength||!(w=p(L)))&&s(1,"no header found"),(N=w.match(K))||s(3,"bad initial token"),D.valid|=1,D.programtype=N[1],D.string+=w+`
`;w=p(L),w!==!1;){if(D.string+=w+`
`,w.charAt(0)==="#"){D.comments+=w+`
`;continue}if((N=w.match(H))&&(D.gamma=parseFloat(N[1])),(N=w.match(C))&&(D.exposure=parseFloat(N[1])),(N=w.match(Y))&&(D.valid|=2,D.format=N[1]),(N=w.match(X))&&(D.valid|=4,D.height=parseInt(N[1],10),D.width=parseInt(N[2],10)),D.valid&2&&D.valid&4)break}return D.valid&2||s(3,"missing format specifier"),D.valid&4||s(3,"missing image size specifier"),D},q=function(L,K,H){let C=K;if(C<8||C>32767||L[0]!==2||L[1]!==2||L[2]&128)return new Uint8Array(L);C!==(L[2]<<8|L[3])&&s(3,"wrong scanline width");let Y=new Uint8Array(4*K*H);Y.length||s(4,"unable to allocate buffer space");let X=0,D=0,w=4*C,N=new Uint8Array(4),U=new Uint8Array(w),B=H;for(;B>0&&D<L.byteLength;){D+4>L.byteLength&&s(1),N[0]=L[D++],N[1]=L[D++],N[2]=L[D++],N[3]=L[D++],(N[0]!=2||N[1]!=2||(N[2]<<8|N[3])!=C)&&s(3,"bad rgbe scanline format");let ce=0,ve;for(;ce<w&&D<L.byteLength;){ve=L[D++];let We=ve>128;if(We&&(ve-=128),(ve===0||ce+ve>w)&&s(3,"bad scanline data"),We){let Ne=L[D++];for(let _e=0;_e<ve;_e++)U[ce++]=Ne}else U.set(L.subarray(D,D+ve),ce),ce+=ve,D+=ve}let de=C;for(let We=0;We<de;We++){let Ne=0;Y[X]=U[We+Ne],Ne+=C,Y[X+1]=U[We+Ne],Ne+=C,Y[X+2]=U[We+Ne],Ne+=C,Y[X+3]=U[We+Ne],X+=4}B--}return Y},g=function(L,K,H,C){let Y=L[K+3],X=Math.pow(2,Y-128)/255;H[C+0]=L[K+0]*X,H[C+1]=L[K+1]*X,H[C+2]=L[K+2]*X,H[C+3]=1},v=function(L,K,H,C){let Y=L[K+3],X=Math.pow(2,Y-128)/255;H[C+0]=gr.toHalfFloat(Math.min(L[K+0]*X,65504)),H[C+1]=gr.toHalfFloat(Math.min(L[K+1]*X,65504)),H[C+2]=gr.toHalfFloat(Math.min(L[K+2]*X,65504)),H[C+3]=gr.toHalfFloat(1)},y=new Uint8Array(e);y.pos=0;let c=m(y),I=c.width,O=c.height,l=q(y.subarray(y.pos),I,O),j,A,P;switch(this.type){case kt:P=l.length/4;let L=new Float32Array(P*4);for(let H=0;H<P;H++)g(l,H*4,L,H*4);j=L,A=kt;break;case sn:P=l.length/4;let K=new Uint16Array(P*4);for(let H=0;H<P;H++)v(l,H*4,K,H*4);j=K,A=sn;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:I,height:O,data:j,header:c.string,gamma:c.gamma,exposure:c.exposure,type:A}}setDataType(e){return this.type=e,this}load(e,t,n,i){function o(s,u){switch(s.type){case kt:case sn:s.colorSpace=Un,s.minFilter=It,s.magFilter=It,s.generateMipmaps=!1,s.flipY=!0;break}t&&t(s,u)}return super.load(e,o,n,i)}};var Ef={\u6728\u53F0\u9762_\u989C\u8272:"./jiaxin-room-assets/wood-color.jpg",\u6728\u53F0\u9762_\u6CD5\u7EBF:"./jiaxin-room-assets/wood-normal.jpg",\u6728\u53F0\u9762_\u7C97\u7CD9\u5EA6:"./jiaxin-room-assets/wood-roughness.jpg",\u5BA4\u5185\u6444\u5F71\u73AF\u5883:"./jiaxin-room-assets/room-light.hdr"};var Ff={};function np(r,e){let t=r*374761393+e*668265263+12017|0;return t=(t^t>>>13)*1274126177,((t^t>>>16)>>>0)/4294967295}function D3(r,e,t){let n=np(e,t);return r==="\u6728\u7EB9"?.5+.12*Math.sin(t*.14+Math.sin(e*.026)*2.5)+.09*Math.sin(t*.75+e*.006)+n*.12:r==="\u62C9\u4E1D\u91D1\u5C5E"?.42+np(1,t)*.18+n*.045:r==="\u6253\u5370\u5C42\u7EB9"?.5+.16*Math.cos(t*Math.PI/2)+n*.025:r==="\u5730\u576A"?.44+n*.12+.018*Math.sin(e*.04)*Math.sin(t*.032):r==="\u4E73\u80F6\u6F06"?.43+n*.15:.45+n*.09}function J3(r,e=256){let t=new Float32Array(e*e);for(let i=0;i<e;i++)for(let o=0;o<e;o++)t[i*e+o]=D3(r,o,i);let n={};for(let i of["\u989C\u8272","\u6CD5\u7EBF","\u7C97\u7CD9\u5EA6"]){let o=document.createElement("canvas");o.width=o.height=e;let s=o.getContext("2d"),u=s.createImageData(e,e);for(let f=0;f<e;f++)for(let h=0;h<e;h++){let p=f*e+h,m=p*4,q=t[p];if(i==="\u6CD5\u7EBF"){let g=r==="\u6253\u5370\u5C42\u7EB9"?.7:.23,v=(t[f*e+(h+1)%e]-t[f*e+(h-1+e)%e])*g,y=(t[(f+1)%e*e+h]-t[(f-1+e)%e*e+h])*g,c=1/Math.hypot(v,y,1);u.data[m]=(-v*c*.5+.5)*255,u.data[m+1]=(-y*c*.5+.5)*255,u.data[m+2]=(c*.5+.5)*255}else{let g=i==="\u989C\u8272"?231+(q-.5)*32:180+(q-.5)*60;u.data[m]=u.data[m+1]=u.data[m+2]=g}u.data[m+3]=255}s.putImageData(u,0,0),Ff[r+"_"+i]=o;let a=new Et(o);a.wrapS=a.wrapT=gn,a.colorSpace=i==="\u989C\u8272"?mt:Rt,n[i]=a}return n}var T3={};function dn(r,e,t,n,i=[1,1]){let o=T3[r]??=J3(r),s={};for(let[a,f]of Object.entries(o))s[a]=f.clone(),s[a].repeat.set(...i),s[a].needsUpdate=!0;let u=new lt({color:e,metalness:t,roughness:n,map:s.\u989C\u8272,normalMap:s.\u6CD5\u7EBF,roughnessMap:s.\u7C97\u7CD9\u5EA6});return u.name=r+"\u6750\u8D28",u}var Ie={plastic:dn("\u6CE8\u5851\u5851\u6599","#ecece6",0,.37,[2,2]),charcoal:dn("\u6CE8\u5851\u5851\u6599","#303438",.08,.43,[2,2]),aluminium:dn("\u62C9\u4E1D\u91D1\u5C5E","#cdd2d5",.88,.36,[1,4]),powderSteel:dn("\u6CE8\u5851\u5851\u6599","#535c60",.04,.42,[2,2]),wood:dn("\u6728\u7EB9","#bfac8b",0,.53,[2.4,1.6]),floor:dn("\u5730\u576A","#67717b",.03,.34,[7.4,6.5]),paint:dn("\u4E73\u80F6\u6F06","#eeeee8",0,.92,[3,3]),pei:dn("\u5730\u576A","#c3a564",.36,.56,[3,3]),rubber:dn("\u6CE8\u5851\u5851\u6599","#202326",0,.87,[2,2])};function rp(r){return dn("\u6253\u5370\u5C42\u7EB9",r,0,.38,[1,10])}function ip(){return Object.fromEntries(Object.entries(Ff).map(([r,e])=>[r,e.toDataURL("image/png")]))}async function op(r){let e=new Yo;for(let[t,n,i,o,s,u]of[["wood","\u6728\u53F0\u9762","#e2ceb3",[1.1,.7],.17,.56]]){let a=await Promise.all(["\u989C\u8272","\u6CD5\u7EBF","\u7C97\u7CD9\u5EA6"].map(async h=>{let p=await e.loadAsync(Ef[n+"_"+h]);return p.wrapS=p.wrapT=gn,p.repeat.set(...o),p.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy()),p.colorSpace=h==="\u989C\u8272"?mt:Rt,p}));if(t==="floor"||t==="paint"||t==="wood"){let h=document.createElement("canvas");h.width=h.height=1024;let p=h.getContext("2d");p.drawImage(a[0].image,0,0,1024,1024);let m=p.getImageData(0,0,1024,1024);for(let g=0;g<m.data.length;g+=4){let v=(m.data[g]+m.data[g+1]+m.data[g+2])/3,y=t==="floor"?243+(v-110)*.07:t==="paint"?250+(v-140)*.025:228+(v-100)*.5;m.data[g]=m.data[g+1]=m.data[g+2]=Math.max(140,Math.min(255,y))}p.putImageData(m,0,0);let q=new Et(h);q.colorSpace=mt,q.wrapS=q.wrapT=gn,q.repeat.set(...o),q.anisotropy=8,a[0]=q,Ff["\u5B9E\u7269\u6821\u8272_"+n+"_\u989C\u8272"]=h}let f=new ln({color:i,map:a[0],normalMap:a[1],roughnessMap:a[2],normalScale:new se(s,s),roughness:u,metalness:0,clearcoat:t==="floor"?.18:t==="wood"?.12:0,clearcoatRoughness:.4});f.name="\u6444\u5F71PBR_"+n,Ie[t]=f}for(let t of["plastic","charcoal"]){let n=Ie[t];n.normalScale.set(.045,.045),n.roughness=t==="plastic"?.32:.38,n.color.set(t==="plastic"?"#e4e5e1":"#24292b")}Ie.aluminium.normalScale.set(.08,.08),Ie.aluminium.metalness=.98,Ie.aluminium.roughness=.26,Ie.pei.normalScale.set(.2,.2);for(let t of Object.values(Ie))t.envMapIntensity=.65}async function sp(r){let e=await new _u().loadAsync(Ef.\u5BA4\u5185\u6444\u5F71\u73AF\u5883);e.mapping=wi;let t=new ki(r);t.compileEquirectangularShader();let n=t.fromEquirectangular(e).texture;return e.dispose(),t.dispose(),n}var Uo=new M;function Hn(r,e,t,n,i,o){let s=2*Math.PI*i/4,u=Math.max(o-2*i,0),a=Math.PI/4;Uo.copy(e),Uo[n]=0,Uo.normalize();let f=.5*s/(s+u),h=1-Uo.angleTo(r)/a;return Math.sign(Uo[t])===1?h*f:u/(s+u)+f+f*(1-h)}var Zi=class r extends At{constructor(e=1,t=1,n=1,i=2,o=.1){let s=i*2+1;if(o=Math.min(e/2,t/2,n/2,o),super(1,1,1,s,s,s),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:o},s===1)return;let u=this.toNonIndexed();this.index=null,this.attributes.position=u.attributes.position,this.attributes.normal=u.attributes.normal,this.attributes.uv=u.attributes.uv;let a=new M,f=new M,h=new M(e,t,n).divideScalar(2).subScalar(o),p=this.attributes.position.array,m=this.attributes.normal.array,q=this.attributes.uv.array,g=p.length/6,v=new M,y=.5/s;for(let c=0,I=0;c<p.length;c+=3,I+=2)switch(a.fromArray(p,c),f.copy(a),f.x-=Math.sign(f.x)*y,f.y-=Math.sign(f.y)*y,f.z-=Math.sign(f.z)*y,f.normalize(),p[c+0]=h.x*Math.sign(a.x)+f.x*o,p[c+1]=h.y*Math.sign(a.y)+f.y*o,p[c+2]=h.z*Math.sign(a.z)+f.z*o,m[c+0]=f.x,m[c+1]=f.y,m[c+2]=f.z,Math.floor(c/g)){case 0:v.set(1,0,0),q[I+0]=Hn(v,f,"z","y",o,n),q[I+1]=1-Hn(v,f,"y","z",o,t);break;case 1:v.set(-1,0,0),q[I+0]=1-Hn(v,f,"z","y",o,n),q[I+1]=1-Hn(v,f,"y","z",o,t);break;case 2:v.set(0,1,0),q[I+0]=1-Hn(v,f,"x","z",o,e),q[I+1]=Hn(v,f,"z","x",o,n);break;case 3:v.set(0,-1,0),q[I+0]=1-Hn(v,f,"x","z",o,e),q[I+1]=1-Hn(v,f,"z","x",o,n);break;case 4:v.set(0,0,1),q[I+0]=1-Hn(v,f,"x","y",o,e),q[I+1]=1-Hn(v,f,"y","x",o,t);break;case 5:v.set(0,0,-1),q[I+0]=Hn(v,f,"x","y",o,e),q[I+1]=1-Hn(v,f,"y","x",o,t);break}}static fromJSON(e){return new r(e.width,e.height,e.depth,e.segments,e.radius)}};var bt=Ie.powderSteel.clone();bt.name="\u767D\u8272\u55B7\u6D82\u8D27\u67B6\u94A2\u6750";bt.color.set("#f4f4ef");bt.metalness=.02;bt.roughness=.46;bt.normalScale.set(.055,.055);bt.envMapIntensity=.65;var an=new Map;function zn(r,e,t,n,i,o,s=""){let u=new st(e,t);return u.position.set(n,i,o),u.castShadow=!0,u.receiveShadow=!0,u.name=s,r.add(u),u}function Je(r,e,t,n,i,o,s,u,a=.008){let f=[e,t,n,a].join(",");return an.has(f)||an.set(f,new Zi(e,t,n,2,Math.min(a,e*.2,t*.2,n*.2))),zn(r,an.get(f),u,i,o,s)}function fn(r,e,t,n,i,o,s,u="y",a=32){let f=`c${e},${t},${a}`;an.has(f)||an.set(f,new wn(e,e,t,a));let h=zn(r,an.get(f),s,n,i,o);return u==="z"&&(h.rotation.x=Math.PI/2),u==="x"&&(h.rotation.z=Math.PI/2),h}function Qo(r,e,t,n){return zn(r,new Wr(new lr(e.map(i=>new M(...i))),36,t,8,!1),n,0,0,0)}function Jn(r,e=512,t=256){let n=document.createElement("canvas");n.width=e,n.height=t,r(n.getContext("2d"),e,t);let i=new Et(n);return i.colorSpace=mt,i}function Dn(r,e,t,n,i,o,s,u=0,a=0){let f=zn(r,new nn(t,n),new lt({map:e,roughness:.72,metalness:0,transparent:!0,side:Ot}),i,o,s);return f.rotation.set(a,u,0),f}var fp=Jn((r,e,t)=>{r.fillStyle="#12181d",r.fillRect(0,0,e,t),r.strokeStyle="#58b271",r.lineWidth=8,r.beginPath(),r.arc(94,104,65,-Math.PI/2,Math.PI*.9),r.stroke(),r.fillStyle="#eee",r.font="24px sans-serif",r.fillText("\u51C6\u5907\u5C31\u7EEA",182,55),r.font="19px sans-serif",r.fillText("\u55B7\u5634  25\xB0C",182,100),r.fillText("\u70ED\u5E8A  25\xB0C",182,135);for(let n=0;n<4;n++)r.fillStyle=n===0?"#3e9c61":"#59636c",r.fillRect(38+n*117,196,77,12)}),up=Jn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#41474b",r.fillRect(210,20,33,115),r.fillRect(250,20,33,115),r.save(),r.globalCompositeOperation="destination-out",r.lineWidth=12,r.strokeStyle="white",r.beginPath(),r.moveTo(210,95),r.lineTo(250,60),r.lineTo(283,87),r.stroke(),r.restore(),r.fillStyle="#41474b",r.font="28px sans-serif",r.textAlign="center",r.fillText("Bambu Lab",e/2,188)}),W3=Jn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#25282b",r.beginPath(),r.arc(e/2,t/2,114,0,Math.PI*2),r.fill(),r.strokeStyle="#979b9c",r.lineWidth=4;for(let n=16;n<108;n+=13)r.beginPath(),r.arc(e/2,t/2,n,0,Math.PI*2),r.stroke();for(let n=0;n<8;n++){let i=n*Math.PI/4;r.beginPath(),r.moveTo(e/2+Math.cos(i)*12,t/2+Math.sin(i)*12),r.lineTo(e/2+Math.cos(i)*110,t/2+Math.sin(i)*110),r.stroke()}r.fillStyle="#917a39",r.beginPath(),r.arc(e/2,t/2,25,0,Math.PI*2),r.fill()},256,256),k3=Jn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#e2e3dc",r.beginPath(),r.arc(e/2,t/2,e*.49,0,Math.PI*2),r.fill(),r.fillStyle="#bbc0ba";for(let n=0;n<29;n++)for(let i=0;i<29;i++){let o=12+i*8,s=12+n*8;Math.hypot(o-128,s-128)<111&&Math.hypot(o-128,s-128)>45&&r.fillRect(o,s,3,3)}r.strokeStyle="#bbbeb6",r.lineWidth=2;for(let n of[100,111])r.beginPath(),r.arc(128,128,n,0,Math.PI*2),r.stroke();r.fillStyle="#353b3e",r.font="bold 15px sans-serif",r.textAlign="center",r.fillText("Bambu Lab",128,57),r.font="12px sans-serif",r.fillText("1 kg \xB7 1.75 mm",128,200)},256,256),N3=Jn((r,e,t)=>{r.clearRect(0,0,e,t),r.fillStyle="#303436",r.beginPath(),r.arc(128,128,124,0,Math.PI*2),r.fill(),r.save(),r.globalCompositeOperation="destination-out";for(let n=0;n<6;n++)r.save(),r.translate(128,128),r.rotate(n*Math.PI/3),r.beginPath(),r.ellipse(0,-70,17,30,0,0,Math.PI*2),r.fill(),r.restore();r.restore(),r.fillStyle="#dce1db",r.font="12px sans-serif",r.textAlign="center",r.fillText("1.75 mm",128,117)},256,256),Rf=new Map;function Bi(r){return Rf.has(r)||Rf.set(r,rp(r)),Rf.get(r)}function $u(r,e,t,n,i,o="z",s=!1){let u=new Qe;u.name="\u5E26\u7ED5\u4E1D\u7EB9\u7406\u7684\u8017\u6750\u6599\u76D8",u.position.set(e,t,n),o==="x"&&(u.rotation.y=Math.PI/2),r.add(u),fn(u,.094,.058,0,0,0,Bi(i),"z");let a=new Co(.025,.101,40),f=new lt({map:s?N3:k3,transparent:!0,alphaTest:s?.4:0,side:Ot,roughness:.72});for(let p of[-.034,.034]){let m=zn(u,a,f,0,0,p);p<0&&(m.rotation.y=Math.PI)}let h=new st(new wn(.026,.026,.071,28,1,!0),Ie.charcoal);return h.rotation.x=Math.PI/2,u.add(h),u}function hp(r){let e=new Qe;e.name="\u62D3\u7AF9H2S\u6FC0\u5149\u7248_492x514x626\u6BEB\u7C73",r.add(e);let t=.8;Je(e,.492,.045,.514,0,t+.0225,0,Ie.charcoal,.007),Je(e,.041,.584,.5,-.2255,t+.335,0,Ie.plastic,.012),Je(e,.041,.584,.5,.2255,t+.335,0,Ie.plastic,.012),Je(e,.424,.048,.464,0,t+.075,0,Ie.charcoal),Je(e,.423,.088,.514,0,t+.582,0,Ie.charcoal),Je(e,.424,.5,.034,0,t+.321,-.239,Ie.charcoal);for(let h of[-.199,.199])Je(e,.015,.494,.018,h,t+.294,.26,Ie.charcoal,.002);for(let h of[t+.046,t+.538])Je(e,.414,.016,.018,0,h,.26,Ie.charcoal,.002);let n=new ln({color:"#103e15",transparent:!0,opacity:.56,roughness:.1,metalness:0,transmission:.4,thickness:.003,ior:1.5,side:Ot,depthWrite:!1});n.name="\u6FC0\u5149\u7EFF\u8272\u9632\u62A4\u73BB\u7483_\u5916\u89C2\u53C2\u7167",Je(e,.38,.475,.004,0,t+.294,.271,n,.003),Je(e,.012,.155,.014,.18,t+.28,.291,Ie.charcoal,.004);for(let h of[t+.1,t+.48])fn(e,.009,.02,-.198,h,.265,Ie.aluminium,"y"),Je(e,.014,.039,.017,-.2,h,.277,Ie.charcoal,.003);Je(e,.35,.016,.34,0,t+.21,0,Ie.pei,.003),Je(e,.365,.028,.36,0,t+.189,0,Ie.charcoal);for(let h of[-.16,.16])fn(e,.006,.4,h,t+.277,-.15,Ie.aluminium);Je(e,.353,.029,.029,0,t+.467,-.06,Ie.aluminium,.002),Je(e,.078,.077,.065,.07,t+.429,-.02,Ie.charcoal);for(let h=0;h<12;h++)fn(e,.0026,.003,-.158+h*.028,t+.467,-.044,Ie.charcoal,"z",12);Je(e,.328,.004,.019,0,t+.169,.174,new lt({color:"#d8d8c1",emissive:"#b7ffc5",emissiveIntensity:.25}));let i=new Qe;i.name="\u5DE6\u4E0A\u89E6\u63A7\u5C4F",i.position.set(-.151,t+.595,.282),i.rotation.x=-.16,e.add(i),Je(i,.145,.083,.023,0,0,0,Ie.charcoal,.007),Dn(i,fp,.131,.069,0,0,.0125),Dn(e,Jn((h,p,m)=>{h.fillStyle="#2d3134",h.fillRect(0,0,p,m),h.fillStyle="#d4d7d8",h.font="48px sans-serif",h.textAlign="right",h.fillText("H2S",p-18,84)}),.115,.029,.137,t+.603,.26),Dn(e,up,.17,.1,.247,t+.345,0,Math.PI/2),Dn(e,up,.17,.1,-.247,t+.345,0,-Math.PI/2);for(let h of[-.19,.19])for(let p of[-.205,.205])Je(e,.05,.012,.05,h,t+.006,p,Ie.rubber,.003);for(let h=0;h<14;h++)Je(e,.003,.095,.002,.06+h*.01,t+.41,-.259,Ie.charcoal,4e-4);let o=new Qe;o.name="AMS2Pro_372x280x226\u6BEB\u7C73",o.position.set(0,t+.626,-.025),e.add(o),Je(o,.372,.098,.28,0,.049,0,Ie.charcoal,.008);let s=new ln({color:"#4c5559",roughness:.13,metalness:0,transparent:!0,opacity:.39,transmission:.25,thickness:.003,ior:1.5,side:Ot,depthWrite:!1});s.name="AMS\u70DF\u7070\u900F\u660E\u7F69";let u=new er;u.moveTo(-.14,.091),u.lineTo(-.14,.143),u.bezierCurveTo(-.14,.214,-.1,.226,0,.226),u.bezierCurveTo(.1,.226,.14,.214,.14,.143),u.lineTo(.14,.091),u.closePath();let a=new dr(u,{depth:.36,bevelEnabled:!1,steps:1,curveSegments:20}),f=zn(o,a,s,-.18,0,0);f.rotation.y=Math.PI/2;for(let h=0;h<4;h++)$u(o,-.134+h*.089,.12,0,["#eeeede","#487bad","#669754","#be5b42"][h],"x"),Je(o,.055,.043,.024,-.134+h*.089,.055,.147,Ie.charcoal),fn(o,.012,.009,-.134+h*.089,.078,.151,Ie.aluminium,"z");return Je(o,.36,.087,.003,0,.048,.144,s,.003),Dn(o,Jn((h,p,m)=>{h.fillStyle="#252b30",h.fillRect(0,0,p,m),h.fillStyle="#dde4df",h.font="41px sans-serif",h.fillText("AMS 2 Pro",10,80)}),.107,.025,.11,.089,.151),e}function pp(r,e){let t=new Qe;t.name="\u62D3\u7AF9A2L_544x529x505\u6BEB\u7C73",t.position.x=e,r.add(t);let n=.8;Je(t,.512,.067,.485,0,n+.049,.023,Ie.plastic,.015),Je(t,.49,.019,.46,0,n+.008,.023,Ie.charcoal,.006);for(let o of[-.205,.205])for(let s of[-.19,.207])Je(t,.038,.013,.039,o,n+.006,s,Ie.rubber,.004);for(let o of[-.242,.242])Je(t,.06,.452,.083,o,n+.279,-.19,Ie.plastic,.009),Je(t,.063,.095,.107,o,n+.068,-.193,Ie.charcoal,.01),Je(t,.009,.402,.009,o+.019,n+.291,-.145,Ie.charcoal,.001),Je(t,.012,.381,.005,o-.007,n+.282,-.142,Ie.aluminium,.001);Je(t,.48,.036,.049,0,n+.487,-.19,Ie.aluminium,.004);for(let o of[-.244,.244])Je(t,.067,.04,.055,o,n+.487,-.19,Ie.charcoal,.008);Je(t,.496,.025,.027,0,n+.312,-.126,Ie.aluminium,.002);for(let o=0;o<17;o++)fn(t,.0028,.003,-.223+o*.026,n+.312,-.11,Ie.charcoal,"z",12);for(let o of[-.227,.227])Je(t,.022,.401,.029,o,n+.274,-.15,Ie.charcoal,.002);Je(t,.329,.019,.325,0,n+.096,.013,Ie.aluminium,.003),Je(t,.33,.003,.32,0,n+.108,.013,Ie.pei,6e-4);for(let o of[-.088,.088])fn(t,.005,.423,o,n+.074,-.011,Ie.aluminium,"z");Je(t,.1,.094,.08,-.025,n+.307,-.089,Ie.plastic,.006),Je(t,.08,.027,.063,-.025,n+.25,-.083,Ie.charcoal,.005),fn(t,.004,.017,-.025,n+.228,-.061,new lt({color:"#d0aa58",metalness:.8,roughness:.33})),Dn(t,W3,.047,.047,-.025,n+.315,-.047),Dn(t,Jn((o,s,u)=>{o.fillStyle="#e4e6e0",o.fillRect(0,0,s,u),o.fillStyle="#576064",o.font="35px sans-serif",o.textAlign="center",o.fillText("Bambu Lab",s/2,90)}),.062,.016,-.025,n+.273,-.047),Je(t,.077,.065,.084,.248,n+.311,-.135,Ie.plastic,.009),Dn(t,Jn((o,s,u)=>{o.fillStyle="#e6e8e0",o.fillRect(0,0,s,u),o.fillStyle="#4e565a",o.font="bold 52px sans-serif",o.fillText("A2L",40,86)}),.058,.024,.248,n+.326,-.091);let i=new Qe;i.position.set(.176,n+.106,.219),i.rotation.x=-.63,t.add(i),Je(i,.104,.063,.014,0,0,0,Ie.charcoal,.004),Dn(i,fp,.093,.053,0,0,.008);for(let o=0;o<8;o++)for(let s=0;s<4;s++)fn(t,.0014,.002,.239,n+.038+s*.007,.087+o*.008,Ie.charcoal,"x",8);return Qo(t,[[.248,n+.34,-.135],[.22,n+.62,-.14],[0,n+.692,-.14],[-.07,n+.5,-.1],[-.044,n+.36,-.1]],.004,Ie.rubber),Qo(t,[[.274,n+.312,-.175],[.33,n+.24,-.195],[.33,n+.07,-.17],[.272,n+.035,-.15]],.0038,Ie.rubber),Qo(t,[[-.04,n+.36,-.07],[-.032,n+.44,-.082],[-.015,n+.49,-.162]],.003,Ie.plastic),Je(t,.026,.036,.025,-.015,n+.476,-.174,Ie.plastic,.005),Je(t,.052,.014,.026,.206,n+.365,-.109,Ie.plastic,.005),Je(t,.071,.016,.045,-.253,n+.266,-.108,Ie.charcoal,.003),t}function ap(r,e,t){let n=new er;return n.moveTo(-r/2+t,-e/2),n.lineTo(r/2-t,-e/2),n.quadraticCurveTo(r/2,-e/2,r/2,-e/2+t),n.lineTo(r/2,e/2-t),n.quadraticCurveTo(r/2,e/2,r/2-t,e/2),n.lineTo(-r/2+t,e/2),n.quadraticCurveTo(-r/2,e/2,-r/2,e/2-t),n.lineTo(-r/2,-e/2+t),n.quadraticCurveTo(-r/2,-e/2,-r/2+t,-e/2),n}var Ei=Ie.plastic.clone();Ei.color.set("#c7ccc6");Ei.name="\u6D45\u7070\u5851\u6599\u5468\u8F6C\u76C6";Ei.roughness=.57;function Z3(r,e,t,n){let u="\u7070\u8272\u5F00\u53E3\u5468\u8F6C\u76C6";if(!an.has(u)){let h=ap(.51,.46,.018),p=ap(.51-.016,.46-.016,.014);h.holes.push(new $n(p.getPoints(24)));let m=new dr(h,{depth:.115,bevelEnabled:!1,curveSegments:6}),q=m.getAttribute("position");for(let g=0;g<q.count;g++){let v=.87+.13*q.getZ(g)/.115;q.setXY(g,q.getX(g)*v,q.getY(g)*v)}q.needsUpdate=!0,m.computeVertexNormals(),an.set(u,m)}let a=new Qe;a.name="\u5F00\u53E3\u6D45\u7070\u5206\u7C7B\u76C6",a.position.set(e,t,n),r.add(a);let f=zn(a,an.get(u),Ei,0,0,0);f.rotation.x=-Math.PI/2,Je(a,.51*.87,.008,.46*.87,0,.004,0,Ei,.006);for(let h of[-.46/2,.46/2])Je(a,.51-.025,.006,.007,0,.115,h,Ei,.002);return a}function B3(r,e,t){let n="\u767D\u8272\u8D27\u67B6\u846B\u82A6\u5B54\u7ACB\u67F1";if(!an.has(n)){let a=new er;a.moveTo(-.054/2,0),a.lineTo(.054/2,0),a.lineTo(.054/2,1.985),a.lineTo(-.054/2,1.985),a.closePath();for(let f=.055;f<1.94;f+=.07){let h=new $n;h.moveTo(-.0035,f-.011),h.lineTo(-.0035,f-.001),h.absarc(0,f+.004,.0065,Math.PI*1.15,Math.PI*1.85,!0),h.lineTo(.0035,f-.011),h.closePath(),a.holes.push(h)}an.set(n,new dr(a,{depth:.0018,bevelEnabled:!1,curveSegments:5}))}let i=new Qe;i.name="\u767D\u8272L\u5F62\u51B2\u5B54\u7ACB\u67F1",i.position.set(e,.011,t),e<0&&(i.rotation.y=Math.PI),r.add(i),zn(i,an.get(n),bt,0,0,.027);let o=zn(i,an.get(n),bt,.027,0,0);o.rotation.y=Math.PI/2,Je(i,.068,.009,.065,0,-.006,0,Ie.rubber,.002)}function qp(r){r.userData={\u7528\u9014:"\u6253\u5370\u6210\u54C1\u6682\u653E",\u53C2\u7167:"\u7528\u6237\u56FE2\u767D\u8272\u51B2\u5B54\u7ACB\u67F1\u8D27\u67B6",\u5C42\u6570:5,\u5916\u5C3A\u5BF8\u7C73:[1.8,.6,2],\u4F4D\u7F6E:"\u4E1C\u5357\u89D2"};for(let e of[-.863,.863])for(let t of[-.267,.267])B3(r,e,t);for(let[e,t]of[0,1,2,3,4].map(n=>[n,.18+n*.39])){let n=new Qe;n.name="\u6210\u54C1\u8D27\u67B6\u7B2C"+(e+1)+"\u5C42",n.position.y=t,r.add(n),Je(n,1.73,.016,.56,0,0,0,bt,.002);for(let a of[-.273,.273]){Je(n,1.73,.066,.028,0,-.021,a,bt,.002);for(let f of[-.035,-.015,.005])Je(n,1.69,.004,.003,0,f,a+Math.sign(a)*.015,bt,.001)}for(let a of[-.85,.85])Je(n,.025,.052,.52,a,-.021,0,bt,.002);for(let a of[-.57,0,.57])Z3(n,a,.009,0);let i=["#919da6","#58a4a8","#e1bc6c","#c08098","#6684a5"][e],o=[];for(let a=0;a<=24;a++){let f=a*.007,h=.05+.025*Math.sin(a/24*Math.PI)+.008*Math.sin(a/24*8);o.push(new se(h,f))}zn(n,new zo(o,48),Bi(i),-.61,.018,-.02);let s=new er;for(let a=0;a<64;a++){let f=a*Math.PI/32,h=a%4<2?.075:.059;a===0?s.moveTo(Math.cos(f)*h,Math.sin(f)*h):s.lineTo(Math.cos(f)*h,Math.sin(f)*h)}s.closePath();let u=new $n;u.absarc(0,0,.02,0,Math.PI*2,!0),s.holes.push(u);for(let a=0;a<2;a++){let f=zn(n,new dr(s,{depth:.022,bevelEnabled:!1}),Bi(i),-.1+a*.2,.018,0);f.rotation.x=-Math.PI/2}Je(n,.14,.025,.17,.58,.0305,0,Bi(i),.003),Je(n,.14,.145,.018,.58,.103,-.075,Bi(i),.003),fn(n,.02,.004,.58,.12,-.063,Ie.charcoal,"z"),Je(n,.1,.085,.12,-.37,.0605,.08,Bi("#d5d5c8"),.004)}for(let e of[-.854,.854])Qo(r,[[e,.2,-.24],[e,1.96,.24]],.007,bt),Qo(r,[[e,.2,.24],[e,1.96,-.24]],.007,bt);return r}function E3(r,e,t,n,i,o,s="#326f51"){let u=Jn((f,h,p)=>{f.fillStyle="#f9faf5",f.fillRect(0,0,h,p),f.fillStyle=s,f.fillRect(0,0,16,p),f.fillStyle="#283b33",f.font='bold 32px "PingFang SC",sans-serif',f.textAlign="center",f.fillText(e,h/2,p*.65)},512,100),a=new Qe;return a.name="\u8017\u6750\u6807\u7B7E_"+e,a.position.set(n,i,o),r.add(a),Je(a,t,.055,.005,0,0,0,bt,.001),Dn(a,u,t-.006,.049,0,0,-.003,Math.PI),a}function mp(r,e){r.userData={\u53C2\u7167:"\u7528\u6237\u56FE1\u4E94\u5C42\u53CC\u5706\u6746\u79FB\u52A8\u6599\u76D8\u67B6",\u989C\u8272:"\u767D\u8272",\u5916\u5C3A\u5BF8\u7C73:[1.2,.5,2],\u5C42\u6570:5,\u6EDA\u8F6E\u67B6:!0};let t={};for(let n of[-.555,.555]){Je(r,.055,.045,.49,n,.1275,0,bt,.003);for(let i of[-.195,.195]){let o=new Qe;o.name="\u4E07\u5411\u811A\u8F6E",o.position.set(n,.055,i),r.add(o),Je(o,.052,.013,.055,0,.044,0,bt,.002);for(let s of[-.02,.02])Je(o,.008,.064,.024,s,.005,0,bt,.001);fn(o,.028,.031,0,-.027,0,Ie.rubber,"x",24),fn(o,.01,.033,0,-.027,0,Ie.aluminium,"x",16)}}for(let n of[-.555,.555])for(let i of[-.17,.17])Je(r,.028,1.85,.028,n,1.075,i,bt,.002);for(let[n,i]of e.entries()){let o=.355+n*.345,s=new Qe;s.name="\u6599\u76D8\u6EDA\u8F6E\u67B6\u7B2C"+(n+1)+"\u5C42",s.position.y=o,r.add(s);for(let a of[-.077,.077])fn(s,.012,1.12,0,-.083,a,bt,"x",32);for(let a of[-.555,.555])Je(s,.026,.028,.34,a,-.083,0,bt,.002);let u=12/i.length;for(let a=0;a<12;a++){let f=i[Math.floor(a/u)],h={PLA:["#e6e7dd","#48535c","#5395ab","#54845a"][Math.floor(a/3)%4],PETG:["#f2ead8","#2e3942","#82b2b9","#ae775d"][Math.floor(a/3)%4],TPU:"#966fbc",ABS:"#bc6061",ASA:"#cda64c",PA:"#4b5662",PC:"#afcbd0",PVA:"#d6cfaf"}[f];$u(s,(a-5.5)*.086,0,0,h,"x",!0),t[f]=(t[f]??0)+1}Je(s,1.08,.038,.018,0,-.14,-.195,bt,.002);for(let[a,f]of i.entries()){let h=1.04/i.length,p=(a-(i.length-1)/2)*h;E3(s,f+(i.length===1?" \xB7 \u5E38\u7528":" \xB7 \u7279\u6B8A"),h-.012,p,-.14,-.209,i.length===1?"#37805e":"#85713e")}}for(let n of[-.555,.555])Je(r,.028,.03,.34,n,1.985,0,bt,.002);return r.userData.\u5206\u7C7B\u5BB9\u91CF=t,r.userData.\u603B\u5BB9\u91CF=Object.values(t).reduce((n,i)=>n+i,0),r}var cp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACDgAAAITCAYAAADosT6HAAAACXBIWXMAACxKAAAsSgF3enRNAAAgAElEQVR4nOzdTWxdVZov7rVJ5Q4SJHuShg4D+zbJJBO7usmED9mNuqV0D3CqlFL/R8Shewgk9AjEVSUpXQSjjtNVw9vEYdYqq0gYdCF1i7JVwARuY0+YhKq2B5ULN4NrS4RJhM5f67CcMo4/zt7na388j2QFEvt477X3OWefvX7rfbNWqxUYrAML09OGHGiY9W/PLC476AAAAAAAABQl4NAjBxamx0MI8WsyhDC65c/4NVGLnQTonY0QwmbgIf65vvnnt2cWF40zAAAAAAAA2wk4FJAqMExvCTQIMAD01mYAIoYdVuOf355ZXDXGAAAAAAAAzSXgsI8DC9OxAsPpFGSYFmYAGJqNFHhYTIEHLS8AAAAAAAAaRMBhB6lCw2mBBoBS2ww83FDhAQAAAAAAoP4EHJIDC9OnU6ghfo2UYqMAyGMlhDAfAw/CDgAAAAAAAPXT6IBDqtQwK9QAUDubYYf5b88srju8AAAAAAAA1de4gMOBhenxFGqIX2Ml2CQA+utmCjrcMM4AAAAAAADV1ZiAw5ZqDWdLsDkADN5aCGFOVQcAAAAAAIBqqn3A4cDCdAw1XAghTJRgcwAYvo3UvmLu2zOLq44HAAAAAABANdQ24JCCDZe0oQBgD9fje4WgAwAAAAAAQPnVLuAg2ABAAYIOAAAAAAAAJVebgMOBhenTqbe6YAMARV1NQYd1IwgAAAAAAFAulQ84HFiYnkzBhqkSbA4A1bcR31e+PbN4ybEEAAAAAAAoj8oGHA4sTI+mVhTnS7A5ANTPWghh9tszi4uOLQAAAAAAwPBVMuCQ2lHMhxBGSrA5ANTbzRR00LYCAAAAAABgiCoVcDiwMD2egg3aUQAwSBsp5HDDqAMAAAAAAAxHZQIOBxamZ2NPdFUbABgi1RwAAAAAAACGpPQBhwML06OpasNMCTYHAFRzAAAAAAAAGIKHyjzoBxamp0MIy8INAJRIrCT07oGF6TkHBQAAAAAAYHBKW8HhwML0pRDCxRJsCgDsZiWEcPrbM4urRggAAAAAAKC/Shdw0JICgIrRsgIAAAAAAGAAStWi4sDC9GQIYVG4AYAK2WxZcclBAwAAAAAA6J/SVHA4sDA9HUK4kSaKAKCKrn97ZnHWkQMAAAAAAOi9UgQcDixMx8mga0PfEADo3koIYfrbM4vrxhIAAAAAAKB3ht6iIpX0Fm4AoC4mYrulAwvT444oAAAAAABA7wy1gsOBhen5EMJZxxOAGtpIlRyWHVwAAAAAAIDuDa2Cg3ADADU3kio5TDrQAAAAAAAA3RtKwEG4AYCGEHIAAAAAAADokYEHHIQbAGgYIQcAAAAAAIAeGGjAQbgBgIYScgAAAAAAAOjSwAIOwg0ANJyQAwAAAAAAQBeyVqvV9/E7sDA9F0I470ABQNgIIYx/e2Zx3VAAAAAAAAB0ru8VHA4sTM8KNwDAfZuVHEYNCQAAAAAAQOf6GnA4sDB9OoRwzfEAgO+ZCCHcMCQAAAAAAACd61vAIfUYn3csAGBHUwcWpr1PAgAAAAAAdChrtVo9H6tUdns5hDDmQADAns59e2ZR0AEAAAAAAGAf/argcEO4AQA6ci1VPQIAAAAAAGAPPQ84HFiYvhTLbht0AOjYYqp+BAAAAAAAwC56GnA4sDA9HUK4aLABIJeRVP0IAAAAAACAXfQs4JBWnpqcAYBiplIVJAAAAAAAAHbQywoON9IKVACgmIsHFqYnjR0AAAAAAMCDehJwOLAwfSGuPDW+ANC1G6kqEgAAAAAAAFt0HXA4sDA9HkJQUhsAemPM+yoAAAAAAMCDelHBYV5rCgDoqfMHFqanDSkAAAAAAMAfdRVw0JoCAPpmXqsKAAAAAACAPyoccEiTLkpoA0B/xFYVF4wtAAAAAADAd7qp4DCnNQUA9NXFAwvT44YYAAAAAACgYMAh9QU/a/wAoO/mDTEAAAAAAEDxCg5zxg4ABmIqBQsBAAAAAAAaLXfA4cDC9GwIYaLpAwcAA6SKAwAAAAAA0Hi5Ag4HFqZHQwiXmj5oADBgYylgCAAAAAAA0Fh5KzhciJMsThcAGLhLKWgIAAAAAADQSB0HHNKkygWnCQAMxZj3YQAAAAAAoMnyVHCIkyojzhYAGJoLqjgAAAAAAABN1VHAQfUGACiFGDScdSgAAAAAAIAm6rSCw6zqDQBQCgKHAAAAAABAI3UacDCZAgDlMHZgYVoVBwAAAAAAoHH2DTikSZQxpwYAlIbgIQAAAAAA0DidVHCwShQAymXiwML0tGMCAAAAAAA0yZ4BhwML05MhhClnBACUjgAiAAAAAADQKPtVcFACGwDK6eyBhelRxwYAAAAAAGiK/QIOp50JAFBaqjgAAAAAAACNsWvA4cDCdJw0GXEqAEBpqbQEAAAAAAA0xl4VHFRvAIByGzuwMD3pGAEAAAAAAE2wY8Ah9fSecQYAQOlpUwEAAAAAADTCbhUcVG8AgGrwng0AAAAAADSCgAMAVJs2FQAAAAAAQCM8EHDQngIAKkebCgAAAAAAoPZ2quCgegMAVIv3bgAAAAAAoPZ2CjhMO+wAUCmxTcW4QwYAAAAAANSZCg4AUA/evwEAAAAAgFr7XsDhwML0ZAhhxCEHgMpRgQkAAAAAAKi17RUcTI4AQDV5DwcAAAAAAGpNwAEA6mEkVWICAAAAAACoJQEHAKgP7+MAAAAAAEBt3Q84pFWfIw41AFSWCg4AAAAAAEBtba3gYFIEAKpNBQcAAAAAAKC2BBwAoD7GDixMjzqeAAAAAABAHQk4AEC9eD8HAAAAAABqaWvAYcohBoDKE3AAAAAAAABqqR1wOLAwPe7wAkAteE8HAAAAAABq6Qdpp0yGQA2MHnw4TIweu78j00c6W8i9+s2XYfXul2Hj3tdhef0LpwJUmwoOAAAAAABALW0GHEyGQIVMjh5rBxnGDz0apo78MIz+t4fDxMjjPduBjXt320GHlfVbYXkj/vmF4ANUh/d0AAAAAACgljYDDqMOL5TX1JHJdjWGGGaYOjLR9+0cOXi4/Xu2/q4Yeli6sxwW73wWbt7+sF3xASilEYcFAAAAAACoo6zVaoUDC9OLcQ7VEYZyGD/8aJg5+nSYPvLD8NzRp0p5VNa++Src/MNvw/W191V3gPL54bdnFpcdFwAAAAAAoE5+4GhCOYwefDjMPPZ0ODv2NwOp0tCtsUOPhJePn2l/xbDD1Vu/VNkBykNlJgAAAAAAoHY2KzisK2kNwxGrNVw8MRtmjj7Tbg1Rde+svR/mV99vt7MAhubct2cW5w0/AAAAAABQJ5sVHIQbYMCmjkyGiyfOVaJaQx7Pj51qfy3dWQmXP78m6ADDMW7cAQAAAACAutGiAgasrsGG7eL+fTA1J+gAAAAAAAAA9ET20C+nJkMInxlO6K+mBBt2E4MO/7jy87C8/kU5NxDq5fq3ZxZnHVMAAAAAAKBOHgohjDqi0D+jBx8O106+2q5m0NRwQ0gVHf73X/2v9ljEMQH6SosKAAAAAACgdh5ySKF/zh8/E37/t/8anh87ZZSTOBZxTOLYAAAAAAAAAHRKwAH6YPzwo+GDqavhnyZeDCMHDxvibeKYxLGJYxTHCgAAAAAAAGA/Ag7QYzNHnw7/+Vf/0uh2FJ2KYxTH6uy4ChcAAAAAAADA3gQcoIeuTLwYfvXk/1S1IYc4Vm8/8Wp498k3wujBhyuz3QAAAAAAAMBgCThAD8Q2C//51/8SXj5+xnAW9NzRp9pjODl6rJLbDwAAAAAAAPSXgAN0aerIZLvNwsTI44ayS2OHHgkfTF3VsgIAAAAAAAB4gIADdCFOxH8wNaclRQ9ttqy4eGK2NvsEAAAAAAAAdO8HxhCKuXby1fD8mEoD/fLTE7Pt1h/nPnmrnjsIAAAAAAAA5CLgADmNHnw4XDv5Wnju6FOGrs82AyRCDgAAAAAAAIAWFZBDDDd8MH1VuGGAYsjhg6mr7bEHAAAAAAAAmkvAAToU2yXEcMPEyOOGbMCmjky0x17IAQAAAAAAAJpLwAE6MDl6LPznX/2LcMMQxbG/MvliY/cfAAAAAAAAmk7AAfYRww2xRcLIwcOGashiu4prJ19t9BgAAAAAAABAUwk4wB6EG8onhhyuTKjkAAAAAAAAAE0j4AC7EG4or5ePnwlnx081fRgAAAAAAACgUQQcYAfCDeX39hOvhqkjk00fBgAAAAAAAGgMAQfYZvTgw+Htk68JN1TAu0++EcYPP9r0YQAAAAAAAIBGEHCALWK44YPpq2Fi5HHDUgExhPKrJ99o+jAAAAAAAABAIwg4wBbXTr4m3FAx8XhdmXix6cMAAAAAAAAAtSfgAEmcJH/u6FOGo4JePn4mTB2ZbPowAAAAAAAAQK0JOEAI4ez4qfYkOdX17pNvtFuMAAAAAAAAAPUk4EDjTY4eC1cmXmr6MFTeyMHD7RYjAAAAAAAAQD0JONBoccX/2ydfa0+OU32xxcjM0acdSQAAAAAAAKghAQca7eKJ2TAx8njTh6FWrky+pFUFAAAAAAAA1JCAA40VV/q/fPyME6Bmxg490g6uAAAAAAAAAPUi4EAjxRX+106+5uDXVAyujB9+tOnDAAAAAAAAALUi4EAjxXDDyMHDDn6Nvf2EAAsAAAAAAADUiYADjRNbUzx39CkHvuamjkyEqSOTTR8GAAAAAAAAqA0BBxpFa4pmcawBAAAAAACgPgQcaJSLJ2a1pmiQsUOPhLPjp5o+DAAAAAAAAFALAg40RmxX8PLxMw54w1w8ca7pQwAAAAAAAAC1IOBAY1yZfMnBbiBVHAAAAAAAAKAeBBxohDjBPTHyuIPdUKo4AAAAAAAAQPUJOFB7owcfDlcmVG9oMlUcAAAAAAAAoPoEHKi988fPhJGDhx3oElm/93VYvfvlQDfo7NjflHxUAAAAAAAAgL0IOFBr44cfDT89Mesgl8jN2x+GH3/8ehj9bw8PdKOmjkyEydFjJR8dAAAAAAAAYDcCDtTaReGGUrl6ayGc++TN8E8TL7VbhwxarOYBAAAAAAAAVJOAA7UVqzc8P3bKAS6Jc5+8Ff5x5Rfh3SffGFolhZmjzwwlWAEAAAAAAAB0T8CB2roy8ZKDWxIx3PDO2vvtdiFTRyaHtlEjBw+HmceeLtnoAAAAAAAAAJ34gVGiCuKq+4m06n96nwny9Xtfh+kjPwzPHX3KsS2BzXDD2KFHStEi4vzxn4Trq++XYGQAAAAAAACAPAQcKJ24wj+GGGKLibFDfxqmjkw4SBW1GW6ILp44V4r2EBMjj7fPrdW7Xw59WwAAAAAAAIDOCTgwdJOjx8LZsVNh6k9+2J58ph6u3lq4H26I1RvOjp8qzX6dP3YmvLLyi+/93dbWGWvffCkAAQAAAAAAACUj4MBQxMnk2fFTYeboM2Hk4GEHoWZu3v4w/OOWAMHMY8+UagdfPn4mTIweDyvrt9rbFgMYu1m6s3L/X5bufNb+c/HOshAEAAAAAAAADJiAAwMT2xPEVfznj/9kzwllqm15/Ytw7pM3v7cPsUJH2cTWJ520P9n6PZv//dMt/x4DEDH4EEMPS3eWnb0AAAAAAADQJwIO9N344UfDxROzqjU0wPq9r8MLn7wZNu7dvb+z8ZjHNiR1tRmU2Aw9vHf7o3Dj9m/DzT982B4PAAAAAAAAoDcEHOibWLHhyuSL4fkSrt6nPy5/Ph9WNn73vceuc7hhJ88dfar9tTFxN9y8/dtw9dZCu6oFAAAAAAAA0J2HjB/9ECs2/P5v/1W4oUFie4Z/vrXwwA5PjB5v5HjEyhXx/P/ff/W/wgdTV8PUkckSbBUAAAAAAABUl4ADPRUncf/zr/8l/PTErHYUDRJbMZz75M0ddzhW8mi62MLig6k5QQcAAAAAAADogoADPXNl4sX2JO7EyOMGtWFiG4a1b75q+jDsa2vQoWmtOwAAAAAAAKBbAg50LU7UxqoNLx8/YzAbaPXul+Fnn883fRhyiUGH2LoitnJR4QIAAAAAAAA6I+BAV86On2qvRle1obku7xNuiO0r2Fls5RLDQdpWAAAAAAAAwP4EHCgstqR4+4lXw8jBwwaxoWJ44Z219/fc+ZX1W00fpj2NHXqk3bYiVnMAAAAAAAAAdifgQG6xpP61k69qSUG4vrp3uCFaurNioDoQqznEaihaVgAAAAAAAMDOBBzIJU6+fjB9NTw/dsrAEW7e/m1Hg3Dz9ocGqwNTRybC7//2X8Pk6LHSbysAAAAAAAAMmoADHdsMN0yMPG7QaOu0OsONPwg4dCq2fImVHM6OCxEBAAAAAADAVgIOdES4ge2W7ix3PCbvrL0fVu9+aQw7FEMObz/xqpADAAAAAAAAbCHgwL6EG9jJ+r2vc43LKys/N445xZDDxROzldpmAAAAAAAA6BcBB/Yk3MBulte/yDU2793+KNy8rVVFXj89MRuunXy1WhsNAAAAAAAAfSDgwJ6uTL4o3NAAMaxw9dZC33f03CdvalVRwPNjp8KViRcrt90AAAAAAADQSwIO7CqWxo8Tq9Tb5c/nw1/8xz+0q3X028a9u+HHH7+eu70FIbx8/Ew4O+75CAAAAAAAQHMJOLCjmaNPt0vjU2/nPnkrXL31y/CrJ/9n7snz6SOThcZmZeN34dnF80IOBbz9xKtCDgAAAAAAADSWgAMPGD/8aLh28jUDU2MxXPDn//734ebt34YPpq62Ay15jXRR8UHIobgYcpgcPVbVzQcAAAAAAIDCBBx4wK+efCOMHDxsYGoqhgpiuCCGDN598o3Ck+XdTrLH3x9DFsvrXzRm7HslhlJiEAkAAAAAAACaRMCB77l4YjZMjDxuUGoqhgn+7N/+rh0uiJUApgq2mdj03NGnuvr5tW++Cs8unRdyyCkGkGIQCQAAAAAAAJpEwIH74mT3T0/MGpCaiiGCGCbYuHc3vHz8TDg7fqrrHT199JmuHyNuT9yu66vv13bs+yEGka5MvFi/HQMAAAAAAIBdCDhw35XJlwxGTW0NN/RyYnzmsad78jhxu1749C0hh5xiUGXmaG+OAQAAAAAAAJSdgANtWlPU19ZwQ/T2ydd6tq+jBx8Oz491XwliUww5nPvkrZ49XhNcO/la+zgAAAAAAABA3Qk4EMYPPxrOH/+Jgaih1btffi/cEFf8T44e6+mOXuxxW5N31t4PP/r49bB+7+uePm5djRw83A45AAAAAAAAQN0JONCeoI6TpNRLDAj8+OPX74cb4jHudRghpIBML6s4RO/d/ig8u3heyKFDzx19KkwdmazEtgIAAAAAAEBRAg4NFydFez05TTnEcMPKxu/ub0us0tGvVgZXJl/seUgmbvuf/dvftVtssD9VHAAAAAAAAKg7AYeGu3jiXNOHoJZeWflFWLqzcn/XYvjg/PEzfdvVGJzox7kUq0/EFhtCDvsbO/RIXyp0AAAAAAAAQFkIODRYrN4wdWSi6cNQOzdvfxj++dbC93Zr5ugzfavesCkGKPpxPsWQw1/8xz+E66vv9/yx66afVToAAAAAAABg2AQcGkz1hvpZvftlOPfJmw/sVz+rN2z19hOv9bxVxaYXPn2rHd5gd3HsY7sQAAAAAAAAqCMBh4ZSvaGeXvj0zXbFg61i64LJ0WMD2d/xw4+Gaydf69vjx/CGdhV7e37sVPs4AAAAAAAAQN0IODTU7Pippg9B7cQWDkt3Vh7YrZnHnhnors4cfTr89MRsXx47hjeeXTof1u993ZfHr4uLfRp/AAAAAAAAGCYBhwaKq7vjKm/qI074v7Ly8x33Z/rI5MD3M06w9+sciyGHH3/8el8euy7i2I8efLjpwwAAAAAAAEDNCDg00Fnhhtq5emvhgdYUm6aGEHCIrky+GCZGHu/LY8dKFXGf2d3542eMDgAAAAAAALUi4NBA54//pOlDUCurd78MP/t8fsddGjv0yNBW8sff+8H01b6FHC5/fq297+zM8xwAAAAAAIC6EXBomJmjT4eRg4ebPgy1cnmXcEM0MXpsqLvaz5BDrFixW1sOQvt5fnZctRYAAAAAAADqQ8ChYWbH/6bpQ1Ar6/e+Du+svb/rLk2OHh/67vYz5PDe7Y/C0p3lnj9uXZwd83wHAAAAAACgPgQcGiROND939KmmD0OtXL21sOfuDKs9xXb9DDnEVhXsbOrIRBg//KjRAQAAAAAAoBYEHBpk5rGnmz4EtXN99dd77tLkkFtUbNWvkMPSnRVVHPZwdkybCgAAAAAAAOpBwKFBTh99pulDUCs3b38Y1r75qlK71K+Qw/zq7m06mu6stjQAAAAAAADUhIBDg0wdmWz6ENTKjT98WMnd6UfI4ebt3/bssepm7NAjparkAQAAAAAAAEUJODREDDeMHDzc9GGolSpP6vc65LBx7267ogU7E24CAAAAAACgDgQcGmLaBGetLK9/0Z7U38/6va9Lu9u9DjnEMWFn2lQAAAAAAABQBwIODTF15IdNH4JaWbqz3NHulH3SP4YcfvXkGz2pLrK8fqsn21RHMUQSxxoAAAAAAACqTMChIaaOTDR9CGql0+BCFSb9xw8/Gj6Yutp1yGGjxNUqykCbCgAAAAAAAKpOwKEBJkePNX0Iamelw+DCSkXaNsRz9NrJ10qwJfWlTQ0AAAAAAABVJ+DQAGOHHm36ENTOysbvOtqltW++Kn2bik0zR58OPz0xW46NqaGpP9GmBgAAAAAAgGoTcGgAFRzqZT1nK4bra+9XZv8vnpjVTqVPJkYer+V+AQAAAAAA0BwCDg0wOXq86UNQK3nbTlxf/XWldv/tJ4q1qhg79Kc935a6mdKmAgAAAAAAgAoTcGiAkYMPN30ISuXm7Q8Hujkb9+6G66vVqeIwfvjRQq0q4s+xN9VcAAAAAAAAqDIBhwYwqTl8sa3E1VsL4c///e+Hsi2XP79WrgHZx/njZ3L/zLTqBPsaPyQEAgAAAAAAQHUJODTAyMHDTR+CoYnBhsufz4c/+7e/a7eK+NWTb4SZo08PfHPWvvmqvR1VMXrw4fD82KlcW6v9wv4mtKsBAAAAAACgwgQcoE82gw0/+3w+zBx9JnwwfXWobRSu3vplWL37ZWUO9+nHOg+CPHf0qb5uS11o4wEAAAAAAECVCTjUnFXtg3fz9of3gw0b9+6Gf5p4MVw7+Wq7KsEwxW154dM3KzOOeSpdnD76TF+3pS7GDj3S9CEAAAAAAACgwgQcoEdiO4offfx6+PHH/6PdEiK2Bvlgai6cP36mNEO8dGclXL21UIIt6czUkYl9vy+O89nxfO0sAAAAAAAAgOoRcIAe2Kza8N7tj9oP9l244WpfKmhMjB7r6ucvf36tMq0qJkaP7/s9Z8f/ZiDbUhequgAAAAAAAFBVAg7QhVi14dwnb7WrNsQWEGFLuGGyyyDCbrptdVGlVhWd7Ov5Y+WpkAEAAAAAAAD0j4ADFLS8/kV4dvF8eGft/fsP0O9ww6aJkce7+vnYquLy5/O93KSheH7sVBg//Gjl9wMAAAAAAADYn4ADFLB0Zzk8u3Q+rGz87v4PDyrcEI31YFL/Z5/Pt0MaVXbxxGyltx8AAAAAAADonIAD5HR99f3w7NKF+y0pNg0q3BBNjh7vyeP8+OPX2202ymp5/dauW/by8TOqNwAAAAAAAECDCDhADldvLYQXPn3rgR94+4lXBxZuiKaPTPbkcda++Sqc++TNnjxWP6zd/XLHR43VMlRvAAAAAAAAgGYRcIAOnfvkrfCPK7944JtjJYGz46cGOoxTPQo4RO/d/qhdlaJsYmWJrS1Atroy8VIYPfhw6bYZAKosy7LeXWAAAAAAAPSBgEPNbZS4/UCVxHDDO2sPhgAmRh4PVyZeHMqeTB2Z6NljvbLy87C8/kXPHq8Xbv7hwx0fJe73oAMlAFBHWZaNZlk2m2XZfJZl6yGEz7IsG3ewAaCc0nt3fN8edYgAAICmEnCoubJNWldRrG6wU7ghtkn41ZNvDG2PZo4+07PH2rh3N7zwyZvtqgllcX3t1w9sybDHHACqLlZpyLLsUpZlyyGE/xdCuBZCOBvfZtOuqeLQBzE4EsMktdsxgBpJ4YH1sr5ep1DDYnrfXhRKBIYlfpbIsmwxfa6YdiAAOpPuDbjvAj3wA4MIu4vhhhc+fWvHf7944lwYP/zo0EZv5ujTO7bMKCq2g3hl+Rfh2slXB70rD1i9+2VYurPywN+/++QbWlN0ae2bLyu9/UBvpA9TuVb+tVqtRcNfPWky5HQIYTr9ObLPTsTvu9H0ceuF9DyL4xknytqlt7IsW/VcAiitzffJa3HSLr5+l+U1e0u4YbOUY/wzTjBOt1qt5SFvHtA8m69FU/EWaZZlG+k1qv3ldQng+1Iw9VIKqt5M151AFwQcGmDtm6/C2KFHmj4MucXqF7uFG2KbhPPHzwx1+2K4IrbIiMGEXomVKiZHjw193y5/Pv/A3739xKth6ohwY7dieAQghDCXbkblkRm4asmyLB7n8zk32gqsLmRZtjVMMrbDI10yxgCltbVyQ3wN/02WZUvxtXuYQYcUmLuxw/vKSKrkIOQADMwu1WPi69FM+grbAg/LAr5AU6V7BLObr4/JTAyvtlqtdScGFKdFRQOY0MwvjtmzS7vPB/zTxEul2M7zx3/S88eMVSGG2dok/u7tLUFiuOHs+KmhbRMAYc0QNMZE0wcgjziplErzxgmmViw4lUIlO4UboillfAHKJ03Y7RT+nEpBh/lhtIRI7TIW93hf2Qw5WA0ADEonr4WbgYcr6TW0la6XtWwDai+GGtK143q6RzCzwz57PYQuCTg0wNo3/6fpQ5Dbjz9+PWzcu7vjjz0/dqpd5aAMZh57OowcPNyX/V+/9/VQ9vCFT9783v8LN/ROrOYCkORdQbNq4Cqp0EopE/A7S73ZT28LNPwmluXNWRHl0iC3G4CO7HeTOZYT/q9YHSm1i+ir9J4TKzFd66C9lJADMEhFP+rHy1QAACAASURBVCvE62WrlYHa2WXhw9l9ruEuOBOgO1pUNIAKDvm8svKLPds+XDxRnnDd6MGH21UcfrZDS4duxInwc5+8Gd598o2B7s/2sRdu6C2vBQDN0mq1bqTysPtNjGw3XTQcURdp8moyjcVk+tpt9WxesYpD7Ove2ws4ALrR6U3mWKVnNoUP5vpRWjgFFeZzVlW6H3JotVqCqTmlMZ+r1EbTjdgywcRScUUDDkvx80kZdgConxgwaLVaw1pMMJsCDXmMpTZjWvhAQQIODTDMdgNVs3RnOfzzrYVdtzpWbxg//Gip9ur88TPh6q1f7lpxoqj3bn8Urq++P7CAwc3bH94f+1iV4oOpq6WplFEXG0OqygHUghvl1XWjwAftxqwA3RJkmEzldjf/O28oJK9LafKqr1I1jt/0+/dQGn/pBhnkl0qm53ndH0nVey5kWXahl4G11Kf53YI/HrfrRrpZbpV0PqM5qzFBkxX9rCDcOwDp+r9KFfnWW63WvgGz1CaqqSX9V4Xj95auny6ma7rZIXwmKnLfJaRz2uc3KEjAoQHWvrFquxOxJcO5be0RtitT9YZN/ariENoVFX4epo5M9j3UEUM4m2P/3NGnwrWTr7X3i16P8y0jCmxazjkSAg7VtVjgg3atWlRsabkxmSYwJkswkTE2oBUmJriaZSDHe0swqLIEQdim6GtxDBRci/2Ve7gqOZ6bS128R02kx9CuIp+818bQSKnaSZEg8IYJ2oGZTiG8qrjZYQWd8YrtVy8tCQjt63T6hlh18TdZlsUxuzSoa/5UPXOtQNXH2AJzVDB1Z3tU2Frd5z7lumu7SljttvKcgEMDqODQmcufz7dbM+ymjNUbNsUqDtdXf73n9hcRq0L8+OPXw3/+9b/0bdtjsCT+jhhoiMGGmaNP9+13Nd2qsBPwRz48NceN1L87j5G4QqaMJa7TB9ytvc/H01fYEl7Y/PtetZTol7jyty/lzTe1Wq3lLMvKsK8MQDzeAxrnyYpXBrlppRSb0kq/ou8XsQ3U6V7ePE/vCbGP83zBlYDRRPz5VqvV1JWuucVx934JHSkahNaagt10em64h8GOUvh6+zXT1Jagw/yAAlbzBUI4I6mKgzZZO9ttYYqqW/VwuYugedtDTR/Bpli6s9L0IdhTDIHs1Zoimh1Qq4YiYjjgyuRLfXnslY3ftcMf/RIfO1ag+P3f/qtwQ5+t3hVwAGiaNFFS5EKwdCs/syyLE0ifpYnVza9r6SbCxdQXfSp9lT3cENLNDDcyqJwaVD/o6EZ6nPiOFWBSsKpx4n6n/a/7JHnRm2ox3NC3vskpnHC9i4c4G9tn9HCTAIKAA33Q0bkxwCAv1XN6jy2e2qy2FRcX9Pm6vugEius1KEgFh4ZYuvNZmDoy0fRh2NU/rvx8z38fO/RIu1VDmcVwQGzv8N7tj3q+lbH9RXz8ydFjPX/sKxMv9vwx2dnSHZ8FoIgt5e2jZaXjqm9bFYCuS6JVwGIqWZ3HpBuRA3E2rbK1mhwGp9PXttnN1UFbVnYvbfn3nZ63yxVZYbh9gmprNZzt5cdrWxa5i+oNm+GGvn7AiiGHdO4VreRwJcuy1R62z4C6cHOkuCIBhw2vQ+xiyf2VjmgZurdOwrgjaUHE+dRK4kZqYdGz8y/eV8qy7HqB67bYvrJvoVmoMwGHhtCmYnfXV9/ft8JFrDBQBbHFw5/929+1W0v02gufvNnXVhX0V6zEART2vTLcO5Sv3ajgTbLRDr5nq9ltQY+q6KRNQdcl0SpgMX2Yz6OKx7uq5mPoxs09GIjrXT7Xpnb5b6qp6Pv/6UGtJE0hh3jdNlPwITbfY0yOwB+55iogfR4cKfCjwg3sxrnRGe/hu4itNQu0KxhLoYh+3Acq2mJsVgs9yE/AoSGs3N7d5c/3b0tdldYJsVVFDDn8+OP/0fPH3mxVcfGENp5VtLJ+q+lDAP000oD+b2MVKfnPzop8UG5kSfYhGUutKlxkQf+5cUhblmWXCl7bvDKEFXazBasxhXSdeiOtDDSpC3RjrzLwezGJzW6cG3Sr6GfouX5cF8VrxCzLVgpcs8XKjpcEUiGfh4xXM6zf+3rfKgVNFKs3rH3z1Z57PjHyeBg//GhlRieGMZ4fO9WXx75665dh9e6XfXls+mtRyAmgsdIH97Wc+z+SVkMwGPGGRtGbxkDn3EgnpIoIRfod32y1WnODHsH0Pn46VQ0rYqIB1aqA/tOeohqqEuZcM5lLDxQJOGykBQb9UvSxLXigabp+vxJwaJCbt3/b9CF4QCfVG6b+5IcD365uXZl8sR3M6LXY+uKVlZ9XbjxQxQWAQh8cBBzy2Ui96je/Lm/5+lEI4S+3fP33VquVbfty8xf666YV7CRzBcqsrw3zxnOaBCoahFtLJZMBCknB5yJVZFROYjc++9CVLMtmC1bjutHPzwStVmu+YCi1SPgWGk2LigYxwfl9N29/uG/1huh0RdpTbBVbVbx98rXw7NL5diihl967/VH7XJo6onJ1VcTzXOUNgHJIH8LHU+/fnS7Olvv0YXu5QC/I6W5uSsae3/GyZJd/3vpv8yVevbO2pefp1rHY/O/1QfVh78JGzom8vyzdHjTXb3LsedGV3UWtVbB1kRvpbPaQL9QbedgBmVT2OIbmLub4sZtl2PaKyPt+CU2iPQW9ViR453WarYoGTwdR1Wou5/VaSFU0Z1NAAuiAgEODLK9/0Z7oHDv0SNOHoi22W+hEVSfyJ0ePhSsTL4UXPn2r548dK198MHW1549Lfyzd+czIApRH/BA+tdfWZFlWlo29mGVZ3g/lRSxuCRHsZXW/scthKX3r6pbfvZyCJ1UILeSxnGfchtBbnl3kfC0Y9Dm7KuBARRUpG3yzLK+NrVbrUgoQzuzzrXES6NIwWmpUWK73y9j1VGWM0sgTCKSYIu0pggoOldCLcHMMwJzP8f0bBT9v5XmdLvtr9FzBqij8cTFFkXsD1we0uKJIwCGk8IVrC+iQgEPD3PzDb8PLx880fRjaq9mX7qzs+31TR6p9nXF2/FS4cfu37aoLvRTHThWH6rjxhw+bPgQA1EPeGxHX089s3lhd1ecVGmvFCnayLLtUcDKhbCWDZ9Mkz24ho1i14YL3vL5bFQoshxKFg2spy7LRDkJVO1nxOlR+vXgdy7Isb4WPQYROS/0anWWZ69LuFL02G0T1hvi8Ws+y7HqBqmFjsdqY6wvojIBDw1xfe1/AIY1DJyZGjw97U7t27eRr4c///e87aseRhyoO1RBblMR2LADQQPNuDEBp9HIVXZxoeTfnz1gJ1XBppV+RlXSDWunXsXTTPE4mbS/Vt5baUXjvA3qpaHsKr0XNkbfCh6pa+QhDbJFl2XjBdmODvqa7VHA7L3VRNadu1nepvrndsufJUM0WPNe7JuDQMNpUfOf66q87+r7xQ4/2f2P6bPTgw+2Qw7NLvV10oopDNXR6rgP7WtvhQnp9n5LgZb6hE1+8r+T4/iqU4N3vA+BkmhTb/ncA9F/PVtHF3rQFfswkC0WvYway0i+vWNo7y7JX0vVcbEcxF9tXlHFboYRMguRTNOBgErsBUoWPXNWRWq2WcyOfOrVP7IVSV2/YFMMUBas4TKni8J3UykbYo+Ti+TqsLRRwaKCrt34Z/mnixcbu/2bIoxOTo8eGvbk9EUMIz4+dCu90WLmiU3O3fingUHJXv1ho+hBA11qtVu1qnhYo41qFEryN//AH0BB5J1rWCvZ53m5ll0mx/QKPZbbbzagiPY1Lq4vWFKWr3rBVq9WaS9d088NqwZImtvLeFNjpvBtPX3FfVFyh3wb+mp2qyMyl/91rFWoo+LlmuR+vA120p+hJ64NhSsdse0B+P5uvZdttPtaFHl2TlEneia2bNdt/Bii9JhUJOw/rmm6u4Mr2Wfe4aICur1sEHBoolqtvcsCh0/YUod2ioh4Bh+jK5Ivh5u3ftlsW9Mp7tz8Kq3e/DOOHq1/poo5ilY14fAAAoA4KTrQUWiXYarWsFqqBLlpTRGezLBtKudWcrhQIr5aVm/klkirm7DRZuyuVRHY1uiU8tl+IrNBrVtleB7Isa5VgM8omb2CiCrSnYJBi9YaRAr9vKO9NqeLWUoHwcLwGvVTmoC10qxeBPwGHBooTnnFi+rmjTzVy/5f+7/Y2lbuL7R3qIu7LlYmXwgufvtXTPYqBkYsnigQn6bdYrQUAAGqkSOjAhGlDpUCMiRQobjbnpMxGWdu6QIMMekJUwIGBSNd1RdpTDLsiV3xf/E3BnzPpAnt4yOA001xDJz5juGNl43cdfe/YoUf6vj2Ddnb8VJg6UqQy5+6ur/66suMxLJ2eg92IbVhitRYAAKiRvO0pNvR5brRYFnis6YMAA6RPPAzZICdy04RznhvNK8NqqUQtFKneMPTgXWrXs1TgR2MVh1xVlKBpBBwaaunOcnsCtF/eWXs//Pjj/9H+s0zifneqrm0XLp4419PHi+eRNgid+4v/+Ifw5//+9+HZpQt9DTpc/vxa3x4bAACGJG/AQfWGhsqy7HTBnscAQGfyXpfNG1eK6KJ6w1xJ2jwUDVmoigR7EHBosH5MgMYJ2zhxe+6Tt0q5enx544sSbMVwTR2Z7Hl7EpUCOrd+7+v298awTQw6/Ozz3l/bb9y7G27+wTEBAKA+siybLrBqS/WGBkqr3UyiQPeExIC9aE/BoBSt3jBXhiOkigP0h4BDg8UJ0DgR2itxojZO2G5WSZgcPRZmjj5TqgFeWb9Vgq0YvisTL/V0GxbvfFbNgRiCXz35Rhg9+PD9X3z58/l2VYdeVnO4euuX94MUAADQB8NYCZV3lWAwOddYNwrcBAe6V4ZVssDg5Ak4rJVkJT0Vkyb4LxbY6rmStURRxQF67AcGtLniBGicCP3pidmuxiCGJH708evfa/8QJ3DfPvlaGDl4uFTju3RnpePvnRg93tdtGabYfiNWcXjv9kc92YqVdZUxOjUx8nj4/d/+a3h26XxYTuMW/3x28Xy4eGI2vHz8TNe/43rJWsMA8D3xgml9lx7FHU3EpfT/0GVZNhkv+zrYjt2+b/Pv9WGF6qlCwGHFjfTmybJsLmc/cKB3vOZCQ6TPgmM59rYX1Rvia8yUc6xxikzwl6Z6w6Z4HyfLspshhJmcPxqrOFzyuQYeJODQcFdvLYTzx39SOIgQAwM//vj1B1aLx1XqcSK3TJZzTsJvXWVfRxeO/6RnAYe1b76q9Vj1Wny+fTB19Xshh/gcemXlF2HxznK41kU46J2198Pq3S/Lu/NQI/EDRkqRby8zt7rPzb3dJrcHaTLn7xpPpcGHYbTD7d3t++LfLbdarWFt//e0Wq0ifSNLqdVqdXoeW0ENdCWt3MpzEz0og9w8WZbFEMz5po8DAAxA3uBpL1pHmeBtmBSkOVtgry+VrHrDpgsFAg4hPX9KcU8LykTAoeG6qeIQJ1LPffLWA39/7eSrYepI+RZMbCjZ/z1TRybbIZRetUaIE/WxLQmd2SnkEN28/WH48//4+8IhoRhaAgZu+wqCOq4oOFvwQyU1kWVZuwLDkG8SuKEFzVWkPYWAQ4OkG+C9mDyhuawMBuhcnmuzjRzheNiqSBWG2A6lVNUbNsUqDFmWXS9wf20qLjoqSzVPKAsBBwpVcXjh07fC9dUHy+CfHT8Vnh87VcpBXbyT7zqqCavg43GPx7IXBEjy2y3kEM+92LIiVnKIrUQ6FSuq5K1UAkA1pVWqo61Wa1CTOfH3XcuybCVVZLgxhA/XAg7FLPZzwibLspiUHt/yV7udF8slXUXTtRQA2qmCzPa/n1datLC8iXw30hskPQfj++FIF3t9udVqlabHcZZleV+7S7X9FeX1GaADqbJWntWNQqfklu55FPkcW/broUtFq1Ko4gDfJ+BArioOG/fuhldWfr5juGHm6NPh7Sderc2Arn3zf0qwFf0VAynxeMbjynDsFnKIz8sfffx6uyJKp6Ghy59fcxQBaizdSLqQwgbtUu1xAmRAE6abK3Qm0tf5LMtCatESb1gtmkxsrNltN54u7jYQ6ZxpssU+TqDV9vmXJq/zlgh0I71Z5gqcI8D+Fvd6Xye3tV2uA5ZTG8Pd7NcCsZfie+67BR/vR/vsR91MpvHayfi2AHDY43urKO8k6zCuyy5mWeb1q9qKVGFYGeAikEJSFYfLBd5fYxWH2bLvHwySgANtsYrD2fG/CWOHHtl1QOIk+PZJ2E2xNUFcbV5mS3c+c7B3MHP0mXa7EYZnt5BDFNvAxOoj+4WH1r75KizlrFICQDXEUoR79Gq8VGBlcxG73cSa2pzczrJsLd0I36zw0KQbnDBsdX6+aU/BrrIsu6CNFlB2qfLZ9gnv0smyrOjK5+utVqtp771NLhWftz2F6zJySa9FYwVG7UJFRnoubWve6mOXsixzrwWShwwEIa0W32v1917hhtGDD7cnZ/O0uKA8Tj/2tKNRAvH58/bJ19rPp+1ixZT9Womo3gBQPzHYkEpU/2aXcEN0NlV26JtUGrKTD95jaZIpvin9vyzLltPKa4BuFCnFqj9tA6QA4JWmjwNAL6TPFEVWvG9UaFKRLqXPd7t9Nt2JazJy2VK5Mq+lIbTRLCQFFIoEysa83sIfCThwX5xEXdn43QMDsm+4Ybqe4Yad9reOYmsR4ZRymBh5vP182sleIYdYvWGntjEAVFP8QL8l2NBJz8l+95gssno63uictbIA6IG8r0E3vfbUX7r5bUUoQO8UKQcfzXnfbZQqtKeg2uYKVDYIA6ps2TOtVmsutS7K62K/F7lAVQg48D2vLP/8e/+/V7ghim0p4qRsHcV9b4rYpoJyiM+nayd3bkexW8jh+uqvHT2AGok9GXOWsD3d50oJRQIOp1utlt5JQFfSCv28NzitFKy59J53o+DNb6B/THJXVHq/zbMqf9NaF8EIqinvZ0MBBzqWqkcWeS26mu6jVE3RUMZ8Xc6qVLlU5c8hy7JssorBmR+UYBsokdjDf+nOSpg6MrFvuOH88TPhuaNP1frwxX2fHD1Wgi3pr+kjk+Gdte4qAEw0YJwG5fmxU+1z7+qthQd+42alhref+C4EEZ+nO30fAJV3KbV66MRIKlPY80oOOdpTbHW5KqUhgdIrErByI73+4mTaRNMHAUpIuLW6ioYULqne0Dh5rs1U1aJjaZK7yGvRxgCqWvZFvG+SZdlSh5U7t5qK92parVYdPvfEyqXx+O/0bysdhieXhSzbOqmws9e5drlqzyUBBx7wwqdvhisTL7V7+u8Wbpg6Mhn+aeLF2g/e2jdfNiLgEI9nt2K7EnonPr9i4Gin52AMOUyOHAsvHz8Trt76ZVi/97WRh+GYt0q0Mir3QafVas1nWZanNONsnz6I5C1ButZqtSp5cwEopbwBh5WKrt6iQ1mWxUDfWeMF0BvpdbVIaCy+59ZmFTH7KxB+d7+EPOJ9hLECI1b1oFW8l/NfBX4u3jMar3mIqNP3prwBEWpCwIEHrN79Mvzo49d3HZg4kR1bUzRBnFyeOfp07fd0/PCjYeTg4cJtOWLFD3rvV0++Ef783/9+xwDDKyu/aH8Bw5MmUEyi0E8x4HCxw8cfy7Jstg83GfNOLl7o8e8HGiqVyMx7k1P1hhpLEytXmj4OVRNL3sawqfARlE9aMV00nOy6v3m0p6AvUpuc8wUeOy6wqHSbnHh9lGXZ1QL7P5LuGRVtcwGVJ+BAbhdPzIaxQ480YuCW12+VYCsGI1aqiO1JipgYPV778RmG+DyLzzdBBoDGmks3DjtdJXOhl70Y04REnsnFpZqUSATKQXsK7kvvSf1cKRz7/5apAlHeHriD2v44GbpXCcjdgkmVK3kLDTFfoB1dSK0HrM5vnjzXZqpq0ZEUtCp6jVeXyf1LaV/yvh6fzbJs3usxTSXgQC6xlUEsi98UsUVAU8SQQtGAw3QPWlyws/h8u3H7w0adiwB8J5YazLLsRo5S3BNxAqjVavXqTSPvzQITF3RjKefPTua4AdRp785e/k66V6RFjovmGtpy47ufz7+pipe3rfr2N0KstrVDBbhVk4DfSUGm0S1/Ff972fj0R1oxPVPgwTdUb2ieAu0pht2+5HoJtmEvcwVbw9RR0dYUtQlapXs/8Rrh3QI/fqMBrSpgRwIO5NKU1hSbYsuG2LIjtnCou9h6pKgpAYe+ujL5UrtVBQCNNJez1/iFHq5iyLtCx6qBZppP/XV3Ov59m7TJsmwxx2TehUGen2nCYKvNFc8maDqUJrTzTrqo3lBf8yYBqIlrO+1GlmW77V2cSB5mcGu0g+/Zai7Lsr0mWIq0HvpL75+91+WK6Tmhk0bKW1lr2J8NV8v8+XSf18rG6KI1Re2CVrEaZpZlSwUCqyPp9bxI9TuoNAEHOlb11hRjh/40Ld7KJ66cHz98argbPwDjh4qFOJ47+lRX4Qj2NzHyeDh//Ey4emvBaAE0TFyNnPND7ul4w7Lb9H6B9hSV7ntJca1Wq8wro4Zil5upJt/z0Z6CtizL5gquMA7p5reqK1TZSMUqcwgiVceFgiumY7UkVduaKc+1mapa7EvQakdxscp/Ffi5mVgBwmdzmuYhR5xOxAns88d/UumxKlqF4cbt3/Z8W8qo6PicPvpM3YemFC6eOCdIAhUQex9nWdbyNbSvulYQyPMhdaRHyf08VSDWfJAGeixve4oNVWTqJ5XqLbKqL6TVDcJ3ANukIPPFguOiNUUDFWhPIXRKJ4q2pqht0CqFNi4X/PG59PoOjSHgQEeuTL4YRg4ervRgFa1Q8N7tj3q+LXURz4mZx55u+jAMRBzrWMUBgOZJ4YGNHDveixuPeUISwg1Ar+UNarmRXjPpBm3RgMJGD9s1AdRN0Wv3pVhC3dnQSHmvy3w+ZE8pNFM0xFrra7wU3lgr8KPtVhWpMgY0ghYV7Cuu7H9+rPotGopWKIhu3v4wzBw1kb/dzNFnVBUYoFhFJbapWL/3dWP2GYD74s3Esx0Ox0ScGCpaFrRAewo3sICeKbBKMOQJOMRqSzv89fo+fe7Xm1ZqOcuy8dQvfyeT23rzr/aykk+6MbvYRXuJS6nFk17EAFuk98AirUQEx5pNewp6psvWFDcbUrUtvt7+psDPTaSxdQ1MIwg4sK/zx+qxanxi9Fjhn73xBwGHnVw84bPNIG1Wcbj8uXkkgAaayxFwCOkDcdFKDnne4G/WtPclMDx5b8ht5FxRWqgsd5ZlRX6sKZZ6FXbrQbghvi9pTQGwTZetKeL1/qz3wj+qa4n87QoET7UMYz83Cl7nNSZoFUMcWZZdLVjlYiaG2ZryGkWzCTiwp7g6/+z439RikOK+jB16JKx981Xun31n7f12m446VytYvJMvXDt1ZKKrqhgUo4oDQDOllahrHVZWWNpnJfJ+8kwulrlM7WRJb8JOb/v/rSuhL1jxBA88R/bjRnq9zBVcXRxSOV8pfIBtUnism+v2iS5em+uqKZOH2obRM1mWxUUYUwUfL07arzfoaFxKz7881TU3XcyyrKcV1gZkLQXqdrKcqu6R316V+Yo+H0tBwIE9nR0/1V41XhexikORgEN08w8ftseD71w8cc5IDEF8PsbzMIYcAGicOOlzZYed3kg3km502xc3Z3uKjZJ/YN5prMpOv0warUCLnOBGen2k0ul5qhVtFd8LT3dx43upZGGZ2ZzPhX5u/143RbcaNQEKpXWp4CQZ5Ak45K2qRYOk6/yin9GXmlahK17TZllWtFVFNJdl2XLZF1C0Wi2lgShMwIE9xdXidTI5ejy8d/ujQnt0+fNrtQ44LK/f6vh7nzv6VJg6MtnX7WF3m1UcAGicG9tuCNyMJcF7fBMpz8pXN6+AXiuy+t5rUQ2kG7hFS6eHHlTAWSxTKd8sy6ZzTkaWavs3ZVm2GY7QzgqGJLUYKFLmnIZL7815Wgm4JmNHPagi08gKXV22qojP3fjzk9qKUlcPObLsZnL0WLulQ51MdzEpHys/LOVs41AlK+tfdLy1VyZequ04VEF8XgqYADRP+lC6EkK4HkL4761W63QfVsjUpT0FUE15yyDfbFip2jrr5sb1uQqW4G2EeO0Sb867sQ7DkUJGXh97b61uO7QL7Snolfkuqshcbvh1xKUuXnNiyOFGCphA7ajgwK7OjtWvWkG3k8KxisMHU1d7tj1lsXr3y45bd/z0xGwYP/xo7cagambHT9U6cAMNctnB3td4F+Wqhy6VYZzdoVfgnv0D42TALn/ft4RbgfYUu97ASitP97LTv1exRyTQI9pTNFur1ZpOq4znc64Wve69g5pY6aC39Hq6huyFbiqm7Ob6tmodkx2239LepH9u5HxNpTO1n2xNE6IzOX5Eewp2lGXZhZzn0lYrZaxQNUipVUW8Rv6s4K+dSJUcpgXDqRsBB3Y189gztRyc2F6haJuKpTsr7Unluq2e73SiPFYOOH/8TN+3h/3NHI3Pz7eMFFRc0z+odSJNlFc24JBu2OYuJ5hlpW9DOJJlWavHjynwA82mPUXDxYmRFHS50eFkZww3NLJkMZX1lzGkMOx+2KnsfD/M7xbSLbCNoykgYWVHQVmWzQmO0AXVG+hauq670sXjuM777hp5Ocuyy12EEydSiDjv8xpKTYsKdlTH9hSbpo/8sKufj1Uc6ubG7d92tEfXTr4WRg8+XLv9r6KRg4fDzNGnmz4MAADUh/YUbLY0iDfD9yudGFe7XzBiVElq11GGCfvSh6zj63saL6/zBaTVvkV6tsMmAQe6koJq3YTeLpfkPbMU0gKppS62ZSbLMlXPqBUBB3ZU5/7+3U4Kb1ZxqIv1e193VNEitqao83lRRdOOBwAANZAmYrSn4L5WqxXDC+d2GZEYblBmFwrIsuxSF33QqYC0YtokFoVlWTZeoKVA7dt2DNF+7R/LarGLFjkDaU0R3xNTEKMq4memjS629ayQA3Ui4MCOuq1yeEkzjwAAIABJREFUUGbjhx8NEyOPd7WFdaricPMPH+77PVNHJsLFE+WpCHX58/mwvP5FCbZkuKb+pL7PUwAAGqVIudSelEGnvFqt1nwq6b/1Rm7871nhBsgvTeKofFJj6RjPdzGpCNF6gUnU+YpNFNNHaRK9mxY5fZ+ISEGe2PJhNYX/Si9d/3bbZkLIgdr4gUPJTuq+Uv/88Z+EFz59q/DPxyoO11ffD2fHT/V0u4Zhv7BGbFXyqyffKM32xooTP/t8vlSBi2GJQZ3YMiSOCQAAVFiRG+IXupyo26nE63K6qT9IcVXeVI7ftzbElbnj6WurPNueWyxRn2XZ9JZVgNPKFUNhl0x8196NLicVrzd0Jf6syiZ/FCdRt733dqJsPf5n0z6UVW0nX7Isi8+ns108xCsDutbbPFfjOX4xbfeFVqtV6ipx6dr4cgpnFBVDDvGxTLBQaQIOPGBy9Fi7v3+dzTz2dAifdreDMRgQHydOMFdVDGmsffPVrlsfz4MYbijTPsaKE7GiBN+ZGD1Wq5YpAAA00myaUMkz8XY+rj7KewO01WplZRrgtGIsT0hgdRAle8skHuM0STEu3FAu+0weTe4QXhpN7UcYsNS24HzO37ohEFEdaUVut6Gz+L7auApJ6bVMwGGL9N4bJ4B/k+PHYo//SyW5ThlzTAcvPZe6KX291Gq15ga04dsn9+P58m6WZTEEfanMr4XxOZbe1/O2ktlKyIHKE3DgAWOHHq39oMQJ++fHToV31t4v/BgxGBBbJVyZeLGn2zZIe1VviOGGD6autgMvZXL11i+1Zthi+sikgAMA7OyVtBq7F+ZyrIZb2WdV+fbJoK0ropVcp5HSSsG8N9FDWilY7/KDtKVgQz8/+MSVe92shBu2qmz/TpVTGIwiE0ZzXa4QZUB6sGKafBpxzZ5Wip/LOWEd348WmxiUabo04d5N9YONQbSmCH9sT7Hb5/sYFPtNBYIOs6nKSjcrQc+msTit/RtVJODAA8o2od0vs+PdBRyif761EE4ffbqSLT2u3lrYs3rDtZOvle5ciBP5Kxu/a7cY4TuTo8eNBADsbLlXNyOyLMvzYX99n99by5t9qefu5kXxcpNvkKSbRJuhlUaPRR4Fy61OZFl2YYArvQAqJ01+513Zfz1dswg4lFwKCHazYpr8GrPSqNVqzadV+XkCNDfi9bBr4OZInwVvdFn1Z7bVag2qRU4nrVQ2gw5xAcNcfC4MYLs6lgLiszlbyewk7me7JZznLFUj4MADmjJhGkMJsdXB0p2Vrh7n3Cdvhv/863+pVKuK1btf7lq9IVZuiOGGmaNPD3y79vPK8s/b31HFQEm/jFS4RQoAUCuTW1ffx3KX26z1uKdzngvCuZwhlTz2mzD6y7qGWvohlVs9nXMl0qXUqsINOYBt0qRTkRDYpS1hPUoqrZgu1aQb9RNL2KdzrdPrs5F0XnYyiUzFpfeZxS5bglxvtVrdVH/IK0+liHjeX8uybC6FOG4MeFt3VbCVzE4mUshhVjs4qkTAgQc0acL04olz4dml7to/xioIryz/Ilw7+WrPtqvfXvj0zbBx7+4Dv6WsbSmi66vvt6s3jB16JIwfrn8blU41peIK1FWWZS0HF2iIYfbB7aZsJ4MXbzh+luO3jqTJO/1jAR40V2Bl5+W4ijZVJKKk0oRztyt3oVPTKazc6fk2o8pWY3TbJmG/Fo89tU97ir2MpEomp8tUoaRgK5mdbIYcTmsxQ1U85EixXZMmTDerOHQrtrq4efvDYe9OR2Jrip2qVsTgQFnDDev3vr5fcWLmsWeGvj1lEkMpANAQSjhBA6RVQ5dz7unZVD4ZgKRAWfmQeqCbkCy5NEEn3MDApMncvBUZLglK9URpr3FjFbUuww0bqTXFIMMC3YYpLpStclxqn3G9Bw81ktpyDCxwAt1QwYEHNG3CtBdVHEJqVVHWgMCm5fUvwj+u/OKBv48hj189+UZp22zEUEaslBGdHTs19O0BgBxWd5io2zcN38vEfJZll/L0T261Wg/0Fij4e/e7ETO+rfTxfvs82oPNAqphsyJDnqofl8p8AxhgkFLJ8CKtC0o3ccP39ajXPeSWVopfzvHZcrPKllYVNZTCDXlDdNtdGEJLhG7Ox6UUJiid1Eom9OCYRFdSlSDXBJSagAONt1nFYaeqBnnElg8vxJDD9NVSBgViuOHZpfMP/P3Lx8+EKxMvDmWbOhG3+2eff3fdMDHyuJYMAFRKLO+bJt0aR1lDoKh4Iy2tHHo3x0NMpb6xepEDfDepmLc11IrX0HLb0ute+y2GotVqXUo9/zs9B2dSyfsbjlh99CjccH3Q7znp3O2mbWLZW+JdSJUve/EeEY/vZPp8NegQyp5SZRjtCTs3n+5N1o6AA4QQ3n7itfD4r/+/rodiZeN37UoO7z75RqmGNbZ4iOGLGMLYFCt1XDv5Wpg5+vSwN29Pcbs3nT/+k7JuJgAA0EPxRniWZUsxuJDjUS8VXLEMUBtpAqfIxJOS1CUm3ECJxNeY5RxVROayLFu0ErweehRuWBnSe043k+KXyz5JnELi0z18r4iP8VmWZa+0Wq2yta/quEop7fOhlgGHh0qwDZRIrGbQROOHHw0/PdGb0Nd7tz8K5z55qzSjGMMNzy6eb4cvNj139Knw+7/919KHG15Z+cX97Y6BjLPj2lMAAECD5K2AMxZXGTlBgKbqojXFVdW3yku4gTIpUKVwbAiT2XEyOsv71eFjLxV57C6+StOCrUfhho0Ykhl04CWt+p8p+ONrsXpJjzepL9K4Tqdx7pXYsmIxjWEZ9rGWk/Xkp4IDJOePnwnXV38d1r75qusheWft/XZo4mKPQhNFxfYOP/749fv7NHbokXBl8qXSBxuim7c/DP98a+H+/6veAAAAzZJ6PaviwCBcL9l5M5dzIrNM27/TRExcTTOaVvzSXzdyrKretNHUlmpVINxAGcXV3ClU2ul5eSHLsjlVHKqrR+GGkMINw5ig7maiplIB6m2VHPJeE+wmfh5bTs/jMlwzbPRw36goAQdIRg8+HH715BvhL/7jH3oyJD/7fD6MH3p0aFUHYkDg3Ja2FLFCRQxxxP0su9W7X7a3fVOs3hC3HQAAaJy5nAGHsdQrVsiBPFbLtHo9y7K8E0Bl2n5VAIYky7JLOV8vN82adCyntFr2hnADJRUnfT/rcNNG0jVd2SeK8wZray+FrOZ6FG54ZYjXK0WriNysYoWjVuv/Z+99Yqy4rn3/vf0LGWD/1M2TuHHIoPthmHjSTbAn/qPuWFjCd2A6Fjh3FBrnJ5jY6SYTsPwUmuhFhknoTjzBujHdHt0YFHdH7xcjgew+suOJIfSZMGng9hmY2A+9H30kwyDWVf20ilW4OFTVqdq1d9Xeu74fqYMDfc6pU7Vr195rfdd3BSsGRA70PsdY3DRZ83lZwb2aG28FxmhRAR6gdavZYvrRwW3aWlUQr106IRbWzmt7v7wcvzovXvn8f4Tihp8P7RbXX/qP0E3CBXEDtdQg14lImCHYvcGFYwcAAFIx67QiFEL8d5rWhRA/qdgC0fiPEOKnZIUrhNjho3UjAAAAPQRBQImdTsE3QyUyAKBRcBJDpR/1Es+zwDKklKOclIC4AVgJJVDZQSgv+22xuC+JD98hFzEHGR3ihgVy/qjgsB+CE/IqSf5uDe1VtMH3qO52FYLbznwipZyo8euBnPgsYoWDAwA9kBCgdeuKaN1qazk1JHKgpH0VDgSROICOnYQN9F2oVYYr0PG/sDwl2t3r94+Y2mrU3eoDAACqhoNZ07FN5CT9nWeL0lneFE1JKTtcmbSI3r9AI7DBrpZ1rnhaTzj3SX9XliL27YcNjodBtl7vJbJjR0WsHuh6nyrwTnBxAAA0Bk5AqYgUuq7ZbjcF3g/qrLoFwBQUt5goMFYnLReiLueoCh+q6FhqheeheU0iq3bNQgHVz56tqZ2GNgw5OZCwaabmc7MGBwcAgQMACVCriq1//dkDLgJl+FX7HbGyfk2cefqosdNN7/9Ca0rs2fK8uP7Sm04JGyIOr7zzgLiBOPP0m3UeEgAAVAqrn6cTFulD/PdeVKSyej4eFAiFDj1ih3lWmwOgBKyWqyVWHVIJBe3bVwyLp1D5ap75ggIHwQF0CBwAAE1ANWmB1hQWwomoxZKJqC6Piz3enihgBdzrf7aAg8w09/B3eu4hYZnp78Bth1bqcNnRNA9FUIxnvK5rzt9FRaTRIZdWA4dUORpFDh0LWlNEOC08AXpAiwrwELqS+i5D7RA+HpsTAxse1fYt3u+cFz/9/K3QpcAE1F7k77v+GIooXBQ3HPjiRHiO4pALxdjmpII4AADwB9oYU8JfSkmL8w8zFMjHPLFzFH2EGpHY4QqdEynlNFelAQAAaCgcEC1igUyMceUZSICfr7CVBcBxpJSq1bVoTWEhLAT/RIO4YRxuZqBCirQdGGDHB1vJm7g1usbk2A8VucxXHQ9hYUXZeSiC5qOJmgUtqiIFZ1tTJKGhXQW1mB2F6yqwCQgcwEOQEwAQYnRwmzg18obWM/GXm38LWzCs3flK+xmmFhguChvCthStqYfEDdSa4tTo67UdFwAAmIY2rLxxJGHDmZw2h85Xoia4N2QxxBW7t7kqBAAAQHNRScRpsV5nMUBYoei62JCqt6SUK/x8xbMVAIfhdbVKX/QOWlPYB+8Nz2g4sOkSTnjUUz1o2g9szsuhIES1OXGcNxFvej0YuScM1BAHWiuRBO9lok5nTl63q9zfLR9FgIoiB/rdA0EQTFvmvAIHh3zoupetBC0qwEN0DTkMuMj+4d3hUb926YS2o6cWDD+++Iuw9cKeLc8152QmEIoblqceakshuE0IOWmAbJLOHQDAGWYVLEPHPOgprqqeh804qKz9AQARsb7m847Pvc5DQUYpZbdgNdmkpiD6JH9u1E6p5dqY4LE8w98hYsiDdQVwFLZKjlhHa7Ji8PlTTYbXXU0LemAnDhWxSi8HMKeDmpgtMIZHKPFcc//+RNjKP8+vGnNwSHDm2UNi2yAIKhGm0hwipVzkGEyZNjcHLKj2V40/eSsC5DE+ynvcfg5QXW4vYuMaTWX+OOyBu9EnBX/f6/U1BA7gIVbWV8XLW57FiWFMiByoDcgrn/8P8cvte8WxJycbmcgnpxBybkhqifLeU0dDBw3Qn/V/QpAEgMNM8oK8qO0fVY8uuhiULOjeEOcAgt4AgKqJBX6GWGAmkDSoncWCCaABasNQpgKLK796g39jPCZmOPhrdS9pCopzgDdpzTEDEWHIZE/CvW6KJk5sO/6IwZztE1oQMuYn9nxS4TjW1fbA4rNlxTYjvUDcAGqDk6adAvv9CYudpNo57kkjAocMZ55TUsrlquZvXtdO8BrylMJb1D4f8RpeRTg2Z6P4Rif0/XjdmPX8sVncoMqK6y02cgqwGgMEDuAh0KLiYUjksNK9Jn6/ek7r+9L7LX35aejmMLa5Oe1h51bPiV+130n8t58P7b4vKgH96dz9B84SAI5CG0bevH5Y8BsMcDWqqhK9Fjh4pxLAmEOgDijQxkkDZeD5ebYnIXwGIofaKSpwEBxAL2Mxm1XBRUH8Y/QjpSRr5hmbAqIcuJztE6T32cWhSM/qIUURpi24fvwgJ7GEuEpv9KUgCJzaQ/hMj5CyLNgzARtY7HGKymLSYoHDWg6Bg/a2Jrz/yHLmITez0SpFteQaQW3aEvZFWSxYMh+pPO+6rsXaVOGY5Djft0njeRKCSGA7EDiAh2h3IXBI4tTI62J0YJtWJwcRJqi/Fi+0psPE/qnR1712c1i785V47dLbonUrOedA5+DM00crPy6XoXMKAHAXttueKxAEiKBEyrxjqvJphUAs9T20uT9nIXjz+Akn35OCEuuK9nH9XleoP2iOClCVCsvBjCqXMa4m1BlIgO0yUEZKOZsxL0PkUCP83Cx6AGWrwvNa1JLwYj+3r5ipszqIK9aKtMLy1cWhOVUEoBGUFDd0fLbcdo0UIaUqCz7tmYDTFBE4UJuKQUsdsFbyrKFo36xrvceCp36CjyE+x5U6HnHLipWczx+aj2p/1pRwb5hpUgsn/q7jCW2SjpdxwKsIxHwABA7gYShhSkn3oY0/wNnpwUS7ioj3O+fF0s1PxdT2fWHbCt8g14bjV88ktqQQEDcos3wLQkoAPGCGq0uLVu7Mu2Lly5vLYwVf1uHz4iNZ1SBlelzqomhPPwC8gBNHaRUscUjksIKKltpoFayaG+Jqt8LXi4PNRZ/PdGyfSCkPV9UrOSLmllQ0oOuziwMAXlCylQFVpE40KWljMwmJpDJYkUwEgCm61hov6bJlirzfI7L4LwWvN/OK18a42KXS+55bkND3vZLxazbNRyrFE52q1+62QNeNRSyn+DxY72LBY9KCIwF18gjOPkiijTYVqZDI4b2njoqBDY9qf29K/v/m6rzY+tefiYW189rfvw5at1bEjy/8ImxJAXGDfnCvAuA+HGhUqbgZs7TXchJFN4kIwgIAKoXn07UCifNlDkaC6lEJhKteK9WK2G5NjgiDJZJmsK0HwFJKihuIaYjy6odE35xAgrgBeInC/t3WtXTe+bJ0QQa7uVwp6Oayn4VSlcLPkQMpn2nNfFTCvaHRTjgs7jgAtyfgEhA4gEQWb36KE5MBiRw+HpszInIQ3LaCXCIiocP6t98Y+RyTkLDhhdZU2H6j3b2e+kkQN6hD48TFsQEAeBi2fltSODXWq8s5aVjUlQBBWJBEkYptl9q3gJqRUk6zc0mRwOIARA61ofJ8UL1OqoHr2TpEety6akHx5UMcZPeJQc++D2ggGsQNx+HOUj9Sygl+fqlex14gbgC20ilwXFauo3k91c3xqyOcTFeC111nFF9el8iBPvN4z1/bNh+piHZbDrRkMA5d3zrb7AFQFAgcQCIt2N73ZXRwm7jxr38SIwNPGPuMuNDhcPudsH2I7Szd/Oy+sKF1q515tL9+chLihhIsfQkhEgBloYBhmQ2pZlTU4iM2JyM4IFt0071gWxAWCUwngcABFGE5ZxCzF4gcakAx6Fb4GvHzVaU3erdmAeKM4ngWHro46EokAlALGsQNCy7YTPsM7zdpb/Oh4jMlCYgbgM0U2YfZLETMu95UctWUUs6WEDdE1CVymIkV6Fg1H8G9AYBm8T1cb5AEJdKp6t5k8t4HBjc8Jv7+4h/FgS9OiPc75lpKUGuH36+eC3/GNo+I/UMviT0/ei78fBug8ULChrnVs6Eoox/kfHHm6TfFni3PNWOgGGIZQiQAdDDKfbJ734oUWnkqL1dy/l5eOgq9vmcsEmn0otK7fF1KaTIQ2y8AMZxyzGjuB4CncP/OacUgYyRyGIfzTKW0Cyb8VEQoqsHa6TpbLFHVIQfNjym8PHRxQLU3APXD4rn5EuKGNpLg9cJOdvMK+6EsTCcT8+6DfWNUowAF5KeIQ1/VrOR0opwsUtQRKwIp6nKZRKeAEEM3k7zmtU1Ep3I8C9jHAeAmEDiAVBbWPhK/G3kdJygH5EIw8aPnxIEv3g7FCCYhV4TQGeGSEC9veVZMbHlejG0eFcOPPl7pd6bWCEtffha2M/nLzb/lfh2JZt57+s3QAQOoQ+OMRCUAAGPkDSTasCEfUkxi2MqUR98FaMJiEQ/wBErocjJJZQ6igPg8ixyamBSog6LnuVDSgucclWd8xxJxwCxXoqkka0g4uYixDEB98PNouUTCta1aVQzKwwnMGQP7mioqpaebaE8upVy2PNkOqmc5Z5xljNaN3NYiEw3CtQgSNszUuebkdaJV4gZF94auhw5mADQGCBxAKpQ8hcAhP+RG8PddfxSvXXq7b2sGXZCwIBIXkHBg7F92iPHNo2JkYJsRwQO1LiHXAGqNQA4fRfnl9r3iFMaUFpZuoj0FAACARlFU4IC+kaAwQRBMc2BMpaJqJObkgMSw+6ja1FoRIKUxyG5IpxRePsTf3+lgL1dOF6GFZ4cxRlNsyJFMTKBkT3bByRo8i2rCkGuDQFsKAKqFhD4JTp9pTPZbN0kpJ3huKOMU0mVhQ52t0GxGZe06m0ecAgCwEwgcQCrUdoAS9dQSAeSDRAUfj82JudVz4vjVM8bdHOKQ4IB+qI2F4DYQ5JIwMrhdDG98/L5jwsjgtszWFnTdO3e/Ch0aVtaviZX1VdHhliWqkPji1OgbodME0MPil3BvAAAAAAAwwGSJfucQOVgMVc0VsJ+dUPgmtrg3hFDwm1uvqCTZSOwz27BxvGyhzTJoGNxepkzVP8QNNcGuDbOKvd/7MUciTNfPEWgMPonXWjm/T6bAQdPcPsvJeMzvCbA7hop7g1ViEX6WTKBdHAD5gMABZLLQ+QgCBwWmtu8V+4d3i8Mr74j3O+drOQYSV9xvZ1ETJLKY2r5PHHsSInOddO5+jfYUAAAAmgZslkElcOX7ZAlr8BF+LZS99pFUQf4QXGGnIgqwMTk+o1gJPuCBi0Ou620D7LZRtN3YT5poI+8rnNBYLJkYjMQN6CNeD6OK4rh+HECiC4DayDsvD9H6MQiCxfhfampJscCuDXAZyEZFqDBtk2AkPl6klGtY5wHQn0dwjkAWC2vnK3Uh8AlySTjz9FHx8dhsI0UiPx/aLW78658gbjAAtQgBAAAAQDoIBoAycHJINUnRMpTgAA9SOAlYYF5Q2cBY5d4QwcfUUXz5NCddXcV3kRGS2J7ALQ3WIG5wG37GUJurJY1fBOIG4BScoPWJInvKB1xW2EXrSglxQ5vFjJMQN2TDz9Giz1Cr1u4xgX00XuYdX4cDUAlwcAB9mVs9K36NJLUy1JaB2la0bq2EbSvqdFSoAhI2kKiB2nUAM8xdO4czCwAA/kMLBl3VBMMFq5Fbmj53sGS1Shw4OIBK4b67h4UQp3J+LiWXJnsrt4B+TAbPpZQ0X+5ReKnNTgcUYP9Q4XU+uDh4Cyyq/UDRvaMXiBssge/LCQ299rtsUQ7BLnCNomu0rs3fj+ZVKWUn5156jNeRgu9/VdFal50FIG7Kj4p7gxXJroz2RkO8Bkd7IgAygMAB9GWhcx4CBw34LnSAsKEa/nLzb2LtzldN+KoAAOAjFHj+CX+v9aoC0UWD50EQVCIm4CRlVJXQryqlSPWCarUyAA8QBMFszn6uc2wdi4RjNagE+vIG0L1xb4gg0Y2UMm8P6V7IxcHVfs/zBSsv66yORGK6YWiyLRcQN9gJz7ujbG9f9BrjmgKXKbqPdGGcL+fYC0QscnGBqrgJe4qCsPNB0Xm2ZYOALPacSBPQTEkpFyF2AyAdCBxAXyiZ+n7nfJjABuWJhA50Xo9fnRdLNz91tg3I0MYfiP3DL4mp7XvDlhzAPLOrZ3GWATBLWuX6mubA93DNgXTwIEmBGJ3uAyEcqMDmlCkYuC1yLXBvAZ1MczVa0hjssGsD7uuK4ConlRYgeecbFfGECw4HdIyfKLzOWRcHtnN25XmAREaD0OTaIJAItxuag9g2PakyN402OzdgLQtcpegazYWxvljgHlaNH7TYtQHzeXFU1qi1r2sLrAWoVcUoRC8AJAOBA8gFJeIhcNALOR2cefqoEOKoWFg7LxZvfhpW59vOwIZHxZ4tz4vJ4d2hWANUB7l+kAMIAEAfnJSSVZ9SKWXAibEV/qHjWMGmBYCHUbCjx30EtEHzMltNr/RUYx0PggDW/dWjavnddxHNFWBF39tq94YIbrnSRBcHX9HVSgpUSCzZrUNAC3GDA/C8OSmlpD+n+hxxi8UNmGuBkyiuo6wXCbMjS7eEK0MWXXZsUGmx0HhYJFCkFSexUKc4ndcC8wWOG60qAMgAAgeQC3Ib+P3qOfHL7Xtxwgywf3h3+LP+7Tdi6cvPxPKtFaucHcipYc+Pnhfjm0fFni3PWXBEzYRamwAAvGKIf/ZEym3eON8XPNAjGIFLEAuIjzc06Dmc43fi4J4BWuEqzAmugIdrQ01IKef5malCnuul0p7CJZFL41wcALCBjP7aqlQpbijSIgykEAQBCcXoeqUFdSjhht7AwHVU1gmurKeLuDjkZYFdGyBqUoCfrU45r5FgOIfYLQm0qgAgBQgcQG7IxYHaEVAFPzADtXmIxA7k7LCyfi2s2Kc/2+urot29XsmZH9s8IkYGt4vRgW2hSwO5TYB6gXsDAN7RSVFsD3B15f0KSylDg4k5CoxhGDSWGa72C5OsNm5sKcBgMDgDBwdQO1wB/xO47VQPVwSqVGhFdKn6LusX2CmmqLtBlwPeTgAXB6vBRs9TpJSROEhX5W/Vzg2w7dQEuf3ws6Y3uXXABScgALLgxG3RdVrboXYs8xoFDhBL62FW4dk6V/OYK/PsRqsKABKAwAHkhtwF5lbPil8/CVFxVYwObgt/4lCSmxw11u5+Ff7ZufuP8F8pAZ4XcmSIRAskZCBhBbkzDGx47KHPA3YA9wYAvGOtYAAAfVgbCrs3RMko2sB/IqW0xho/ZrG4bjAIXvR9kSgCRkAgshqklMN8349zL2dVYUNEHhGCiojQxYQ/XBwshFvhNP00eAW7/qgk/LJo1+DmVbSfPsiAnRyG2Y0IbUaAF5SoSndG2MMi0bQilSKgxZ0GWCxWVHDSrXsdy0K3cUWxDFpVAJAABA6gEJGLAyXIQT2Qo8LYZpz8JgH3BgCASxWiQDtJm/BjvDGerKsCgS0hZ2LBrCHqgWkoYFNU4ABBEACWwomdJMX8OP85aqDHcea8xPOZSpDUuX7JLrk48FgZ75nT15EMDPGyeo/XNr0MO1rdPu66uIETSCNVfV6DmOTE7iQqcYHLlBRydV0SODDzUWtRBdp8z2MNoweVNbgtwuRp3u+oPF/RqgKAHiBwAIU58MXb4uMx52I5ADjLa5fexsUDoNm4ZN0INMJBo7QkFP39Clm397Ne1w0HvOcTNuUkvFg2sOEuFDTD/WIWvv7xzcBaiqhk3bCbRpG+4KMVVkcYs57wAAAgAElEQVQP808vgz1inekmBjnp/uSWEzoTf1nksaJVqYRadDgx5YqLw3BSv/oc93LL2BHZA81prgW3hxXv+5aDSbCoUn+Rj73sfFd5n3YWfqmc9yLP5kbC1xHOGMA5Yg5bExpEXC66YM0qCBxC14AgCJBI0USfGEkaHVuEyezaRXuhZUVRN1pVABADAgdQGKok//3qOfHL7Xtx8gAwzG+uzoetSAAAjQbq7ObSbxNOG+IPpZRLHPg2ntjnzXhWv8tFCn7p2nCnVHNm0YTEVt0M9gSVVCrBq+aUpeexqcwkJa4N0MmZjFfpweisvbBLLg6KuDAnlWWoQpEQUITvtVF2YlMdlwtBEFTSJ5ZFDVHyclIx8TIK5znnmVRYf/tAkji1kUgp53vOx6BmNxdrks1F4MT0QgHXLxI3jEJ8rx2VsTNj09qVRO5SymnF/dAQ2sYB8B0QOAAlqFXFnh89j1YVABikc/drMbd6DqcYAOCiLS8oCW948yYvqI/vOLeIMBIs4qD3bI6AzgCPWV2VaUUDrAggAWA53H92poIEbV/7b0U3iSUPgtWuuDgA4DQ8B41zwrBoK5zDZdd1Usq12BzXSVkn6RQFYR3mPiq94YFfLBsWorrcniXPfjhigMViWDNpQnH/0Lax1RXvh8YV59xj3KoCLU+K80mFzo6gAiBwAEqsf/sNWlUAYBi6x+heAwB4Sd4KkY4Nmxaq1uyxVnedeZv7ObOYoGgghAIop1gYMaFz3PDxLBeo3NlDx6FJbFF03CGwDoAbzBp21jiQs12OSnsK5zfBDXBxAMAqyIWBA+p5EhldTgDqcEKIO+ZU4fyBdRgAjsOJ1wkW0etmzkA7w8rgyvsi6ydTLRwbB7dIUVm3q7ymKqY53qHikDLvWYwOACUgcADKUKsKss//9ZOVuOUB0CioDQzdYwCAemFFdbyCfIX7yj+AwoY1b3DRFovXUc8sn22vophRtAUWhmzvVxQC4jNcVVA20F10047gEQBuMG9Q4HAgj4iNn/FFA4odj4LUcHEAoEJyihxI3DCuS6haoWNOBAQOAPjBNMdBVPekSZADls3J5rwUXT9RC0e0qihPVpvMNJZsXrdz2xNKrF1RePkIO3hiPQ4azSNNPwGgHNSqonWrjbMIgEba3evicPsdnFIA7IA29cdiPx/yZvaBHyllUOSnwDebKvreij+wZLIE7tU8VeJopg24fqioWQfKtlfhKo2iAXmoAwFwAK7+XzBwpLnEDYxKQNCbICIHfDuKL59mdx8AQLH7jtZUaUE0+vthA+u4quatLhJ4APgB38s6YwRtxT2ldfD6qVXguAZY5IB1kyIsSlZxFLFeUMPP/OOKL5/mmAkAjQUCB1CaVz5/S3Tufo0TCYAGut/eCe8pAACoGFS920MZUcBxE603OIgzp/DSMa4aVGW84Os6sEwHwCl0zlfdIuIGDpQWdSbqWuSspAvVOXrAhaAxAJYyzvNJnIUgCEZNrGN4Xuz9PBP4Nj8C0HRmNc0dbXam8WmfVnT9NOJDi7M6YGGIyp7huCuiO3ZhKCKaiShdVAKA60DgAEqz/u03YUKWErMAgHIc+OJtsXbnK5xFAEDV9KsUQ9K4AqSU04r9FwXbLxqr0GM7URXbrmPsSqFC0dfBvQEAhyjpIBAnCpwXCfCpzJfzvomo+JzBxQGACuF5JF7JfICdHUxSRQIENtkAeATPVWXnjpaH4gYVFwdiP+/3QTGmFVwduw4KSiYVBUVj3OYCgEYCgQPQwsr6tTAxCwBQ5zdX58XSzc9wBgEAlZND2e5b4tg6JT9bC6oGhquy/JxQ3HSrBsaKOjhA4ACAe5St+D3OVc+5739F9wbhceUdXBwAqJggCBbZHWuHCfetBEzPX85UygIAClFm7iBnGu/EDTFU1k+nkIzODxdKHFN46bRr446foapr8lmIjkFT+R6uPNAFJWZfu3RCvPfUUZxTAAryfue8OH4VrlIAgFpQscJzGksDsPOcLCoKCQ4mq9jA03njlhOnCr50hKpVgiDIHSDjDXpRNwu0WgHAPWjum1I46hbPfSrzuUrwcMnX5B0lV6WUs4rPIHJxmDX0DFor0ZO4aiYUHZjaMZFPkQB+K/bMG1XsSy04wW57AsDbpDm7Y1X1WbSGa5dwCstiwaSLGACgPhTnji4nmL0OcpKLg5RygZwZCr6UktErRcS5DUZlDLVdHXsUL5FSTigIsQdYjATxDEhCRdjvDBA4AK0srJ0P3w4iBwDy07rVFge+OIEzBgCoC7SfqBm2qlTddExWGRwpsemekVIuFkgQFnVviKxCQb20c8wp6x65beQZp6OKieNGQPOXlLJTwHqWErszqvc73BtSmVWskItcHLQnN0tWslUGjymVc0cJoInouSilLPIey/GEspRyXiHBIngOm0DlfWNYNiBwOA5xAwDes1hg7mhXvT+tmRkWORZZ69PvkjhiHCKHdLiwQuWZ5bq72CTvlYvuH6kFyjxiIqBpQOAAtAORAwD5aXevi1c+fwtnDABQJ9hU1wjbLqoGho+zxXHVqGy6B7gCI69woajAoV3DeWgqdO1/guCJOpwQxdz7HYt9XBw6/DuzGhKxKvNtuwHjfZYDwra5OFgNP8NVn8OqDiQPEQTBpJRSKIgcKHFAIqPJmtYToFr6zbVFWGCxGcQx/nG4oWuUWUMOJz6wnEPI1+V1WqMET+xwoSISpfXWIq0jmrh+6keJ1hQLrq/ZS7hmCp7HRg0clk/kKciwHa8dGYoCgQMwAkQOAPSHxA0vLE+J9W+/wdkCAPjEQo12wiqb4LpRbU3RqiuAVGLTPcZJlDyWkRMF3xvJ9orgIBzOdwkgDnmIpDYVbR5ni7rOF9wb0qH7ml0AVJKfxlwcbIaD78uKz/A53YKCEiIHOv4PpZRzVbZMALVQNmndYpFEEUcu4B4rTVynSCmRZE6BWzFk/coCt6Tw7hxKKYf7zXe0J6c9bgE3soihmJMDxt+DqLSY6Hrg3hDCrpmTCqIrag06A2elTKZdf8ZJKQMLDsMaIHAAxoDIAYB0IG4AAFiE7sV9bbZ4Be2da4erPVQqhToKAgCtlGhVMcutKlKDOBRIUggQIWEMgKNwm4rjUfsSg88QlWBf1/ce0jFmS1R3N8rFgZ9/ZQSKRgLwLHJYUxR8TrEIqEnW4o2ChUxFvnKbRRGL3BYFCTgAmktvO7EuPwd1uGtZCbeRnMjpLEjJ6E8UvscIRA4PUiJGMuPZOaQxdUXhddPcqsJ7IaKUctCCwwA1A4EDMEokcjg18oYY2PAoTjYAEDcA4BprXK0kEhKoawWdCuYLJG2Pa0jYqmyw00CgWzOcHFFNJE1YsnmfVth0D3ASbTLjd1TEGxA4AOAwpiuN4N7QH3bnWVBwABA8t08oVtw5BSc8VGyDBSeMjQoUuZKU1qdnFF5OCYUrJDhC9Z+3tBLmwi6v9df4zxUWmyHZBgCIWONYRpvXRpmCdZfhpOlskfUQu1zMKe7vIXJgSsRIqJ2cV2t2FoCrjKko3lJrQUxFoB0HgMABmIdEDu31a+LjsTmIHEDj+cvNv4kDX7wNcQMAjsBVm6WD9ZxYyStuiPpXltrcFqzQ6gcCnBphhwLVcXXYlsrKEpvu/VxVkCZKKLoZbzU9GASAEAIVLNmoBj0bI3Bg5hUFDoIdMrwVOKgkPHqg9V0lyQtav/I6UEXkQBxja+RJtNTxjunY82INrSYAADmhuWPd9zmD20/Nxx0E8rSpYGbY7UHFfaDxIoeSMZKs4gkn4XXnsqLgYw+JRXS3QwPuQnObrw5tj1hwDKABrKxfE1v/+rOwch2ApvJ+57z46edvQdwAQDMpUgXXGIvnmmhZcAyLirbWSxZWJsxw0qYoid+DN/JFq6yRfAEAFSypKPawJRaa9jzmZLbqc3KIz7V3cMJjxQVxQwSLdA+UeAsS5n4ipVzmpAPwAApu033OPxA3AABywXOH7+KGSd5X9q4Zcz0D+RlfZh0UiRwaJ1rm76waI5lzLXFL35fELPwzwz+LvOYiR7VACHFbCPFhiY+ZRQsHEMPbsQCBA6gMSur++MIvxO9Xz+Gkg8bxq/Y74sAXJ3DhAWggbLOXN2HbrbpaFJV51ULOBYqJtraNlQkcyFGxsR7he6MXle+IyoRs8vSNBaAoTiQ8ObCnarXfVIv+Mi4MXp0zDkDPcjumvE5cvUTihsqD7xpEDoLXsP9J65cGCB2QCAAAgIbBz/pFdj1KSrDnFhHzs/5wiTNIcYI1FlY2gphTgUqMpGPb2pOuHQsXJmLiheUE8cIn/HOMf/bwmkt1vdnLEDuvAOA1aFEBKudw+x2xfGtFnHn6TbSsAN7T/fZO6NrQuoX29QA0Ed6sFUkUwL3BY7gqRKX6s8s20VaODXKV4J7keTfjJNaYThHXFBU4dH212gPAclxJdBaZm+IsNbW6mdsbzCiet9DFgRPrTsPPbNXzEFGbuCGCr+daicrIiP3cYmqB16s+PnvhhAMAAA2CW4nO93nWF3o28N54tITr0wA7OUz63mKgpLhBVBkjYZFntP+JCgjif1fUhbIKjnFrUF/3NHAYAxA4gHpYuvmZ+PHFX4j3nnpTjG1WfYYBYDfUkuWVz98Sa3e+wpUCoLnMFwgmV+7eAKqDgyeqvbCnHUgkzOT4fjTGZ9LabHDQoOjCEO4NAIBEOGiqWrnU9OfxPFeTqTBT0gWiVvh5PaMhUE1VhRM2PL9JUMjfa7mkyEHEhA7UymTeBzELAACAZhErRNmT44uriN+m+XWqSQ96Vn8opaT2C15W4WsQN8zpcCN1VLhQhHmPHR2bKnA4rvAab4X7EDiA2qCk7wutKTG1fa849uQBuDkAr/jN1Xlx/CpiPQA0Ga78y7NhjoB7g6dwBYdqIn7OheQBV4hOZgQA2pzoydpYqQRvIHAAAKQxq5jMbaF9U3juVAUO5OIw6mA/ZF3CBsHPvHGb1nV0PTiIXyaZEIfO0xi38JhnsQMclQAAAFgN71mLrBELPzPp+c/tGFdKCguneH0y6dMzVoO4oZ0l/OD3j4QpcbHCKLejGtS0FnIBWqtN+O4G0iSCIGhqG8VEIHAAtTO3ek4srJ0PW1a8vOVZXBDgNOTa8NoXb4uV9Wu4kAA0GE5oF6n+7GCR6iex6hCVwEbmxt1CZriPZC8L7ELRL9EzofCVmp6EBAAkUNIauPEqZQ7MLxQ8h5ETlVNWuJzomNYY6F6yta0UH9MoixKmNL3tAL8XJWHafP8sNqTFyzAnngAAAFSDcishnq9nVZ739Nqi4ld6DvJnXin6eT3Q8V6RUh73oSiGz0nZtlnL3E5NxEQLwgO3BVPMeloYMpjjd4DnQOAArGD922/ETz9/S4xtHhWnRt8QIwNP4MIA54BrAwBAfJfQLrph05rE5mPIQxcXzTiqlQld16wE2QK71RNYWAiCYLLfaznBVLTP+RJcTwAAKai2mOjAcv8+szkFDh1uP+TMeWMnA1p7TWpo2RDHCStpOkYp5XIJAWYatN45RT8xscOyx84O+0sIqQAAABSnsMCBn/kzJefrcRVhPbsnHSjRqjIOOWtNUmLf1bUqixJUHcLi6BJpNoUhHje+FVUpC56Admq7Fo/gWgKbaN1aET++8Avx2qUTonP3a1wb4AStW23xxEf/BnEDACButVckUbtkwC4u7+ISVsIGkVLOl6gInXA0eR9/GOYSNzB5fy8ObBYBAA/Rp11OP+oI/FlZfcRJ6XbGr5Cg7adBEAy7EGinNRqNDSklfa//5OC4ruQ+iRIPuOS6xGvPYb6OJojEDlR1SlWss3A7AAAA8xQodnAK/l5F4izDvB//Tw1iNOXkHa+RDpT8/Aj6/mdIpOjSM5WOlddfOsQNQI1pFvsAYILaBA5wcABWQi0r6Gf/8G5x7MkDYmjjD3ChgHVQO4rDK38IhTkAAMAsFkxod3W7N1gAWR83fjyw/bNqIOWwq/3fKYDDlRnLecUNbCVfNBnZRZU1ACCDjoIrTF3zikp7nqqYTag6bLFjgxPPKe6BTc+jPYY+ou1qb2wWUlLSYZrFPTrdHOIMxdpYdFkMvMhrhSa0sgAA2I9PiT9fq5qLrpd0OuyUEhPwHllocnIQvHf+hN0TrV2TsQhjBq0jrGCA1/U27zuKAsGGBXA8r+i+WxsQOACrgdAB2Ai5ixy/eiYcmwAAEMHVAUU3bjMeBnZPWXAMNjDLwaWiY4IcPVSt1W1hsqA7iIrIB+4NAIBEWKQwz0HV6QKJ7crnXk4s1xYQ6gcH5Gc5KEqJ/GkXhA0saoh+TCXtiTley1XtuKS1OpfWHbyOnTcoBIkY4M8IP0dK2YnEDix4QOspAEAdWPssBvep07Gg9LPJgMhBxIQO1rUL4zUuYkP66HKMZa3E+nYP7Y9cLaZJAPO2HdRatAeBA3CCSOgwtnlUTG/fJ17e8iwuHKgcakWx0PkIwgYAwAOwVeKiQiK7ZTCRDSVzzbBwZbzgxr6t2KrBtu+ee8PMNokq1TUQOBiCHTgAcB6ei5ZjvZezgoFd0wKHHivhcf5xoaKNzt267a45FYoaBI+XSQMtxvKivTqXhQUTPE7nKwwa33d3EPeuYztyePAoAA8AsBh+fgC7r9GgZkeGvHRZOKBljWhI5CBirStm+Rk+a0EhzbxhdygfabOYZoX/DNdBveshbsenOoZmfXB58bUVj2vwWKxjbr4PBA7AKagVAP0MP/q42LPlOTG1fR9cHXJC7RSIkYEnHDhau3i/c17Mr51HKwoAwEPwonq5YFsKwRtlk4EUCBzSqfTccFVkZMWclSyIkiUmKhdt7s+pkkzv1JhUagLojQq8ggO8k/zMnmYhWe98PKsy/0opFyuoeK8VW12F+HpO8DOuClFDxJLB53XtcBB9mMVu0zUkJkb4Z4qTQC0O9MPhAeikKXslJIDyobIfwVxULXUUARxXXR9mYVDkIPiZHbWEarHIYLGOZyd9Jic/P6z6sy2n1SNiCF0ZighSeAxNK8QhiRF6rQeuob624nECbksxYUPsCAIH4CRrd74Sc6vnwp/RwW1i/9BusedHz0PswJDTQHt9VSzfWhHt7rXwfMUhJ4zxzaNidHC7GBnchvOWALWhmFs9G7o1rH/7jXXHBwCoH17QLSsGfk0Hxm1OaNdN5TZ21Jebx0uW9bOR/t2cALKyQriEe4PVVcQAADvh5y4lMWY44DoTeyaoBvmKtMAAJeFnaSRoqPrZ1uFndSNcBYIgmOFK0NmaK7PG+CdyeKBWXqi2BmVpisABCaAMeJ80q5gkRAVURcQEqlWxYLqVKCeo17gIwpSQMHp+UsHFaB2ODlSUwEILFxzLdNHhNhLRzwo7oeleP9I98Ynia2mNN++yaJTPp7TgUJyC91J5xY/DPeulKM5s1f0MgQNwnpX1a2Jl/R1xuP1OKHag5P2eLc+Lsc0q61P36H57J3QWWGFBQx6XgVbP75EjxsjAtlD0MDK4vTHnrhcSNSx9+alY6JwPxxUAAKTBiZFZxc3onKnq81iQJu+CM+8mC44QJYlZP88nJAqOG3QksFkMoNoKAQIHAEApuN3CPD/Ph1UDfBQsllIuVJwAbkxSpcelYbzGXrtGqjhth7/vJLs5zNRtQRtZhdt/5gAAVSKlXOd9eWTvHiUWI1ZijgtRcme4YvcfoM50Rc//FgsbKhEy0udwW6h+To9lmOPvVOf6hdba/1nj55sgqZXEuomClTR4/KjuQQZ4PVWlcAjYgcn5pigdHW8CgQPwintih2uhs4OIORWMbd7hTdKeWk3cd2fg71sWcnign6Wbn91/p7jLA/33wIZH6/vSBiG3i6Wbn7JIBKIGAEA2MQGBaoC3FQRBrk0EW85NpgRpBG+moqqcQf5vU0paCBw0EQTBJLesiCwpaUz0Ddaz20H8OqwkBSpivzfMG1YrF0CsHFe5j5Ys6CfaD1TLAeAILHQoS9WJX6+T7Px8mGRBQ93PsBa7Ntj+3DFKrM1L3UKHiSqTBwAAZ5hlm+zomWG8urQpbj51w2sC0xbolGSbrqMFYszpUaXtaRYdW56ZNYmBdVC6lUQFzJQQalEbk9mmr3EbyGQJ5w/daJmfIHAAXvOdU8G9uBU5PFBLhtGBbaFTAf1/WxP3lHi/9+cVsXb3K21ihvyf/6DLQ+SOce/PHc62tSCBSOt/X7nvdoH2EwCAvPDGs4zatc2bj7zQw+sU/26TLP28J9Z3c6bgmHjAwpLfw1VU7eDrcm8oIlpAJRhoAujrzXDgdqnCVhVNSPBO1jyXNqodRV5qFjocxvUAAKQwX3Ef8DYuhHlYuG9y3u+yu4HqvlQLXLQwmuL0qAKNz3HLXKemLXVMiYsY7reUcMWxi/cgsyXmv3m0t20WJZ0/dKNlfofAATSKyOFhIfalBzc8FooeqE3D8MbHQ8eCgQ2Phf/fRBKf2iCQWwJBTgyUYKefSLyQp8VEHaz0CCyi80YuD/fO1Q+tc8mgc31PGPKd4wUEDQAAFTiQWyZo0mUFfe6NEv1uBQmTRlkt20Rkj573kDRsXvOixSYuC7biVBHtdOqorGEgWgC2U7XgoJk97dKZr1Dg4HWSl6sZSeDwYQ0fb0Wyw3Z6hA7TFQhSliq6JkUdyzoJDmugHiAGbzA1CA0htnIf61pPxZweVVuhEgv0PpoPrTQc26oiltFLt1e8wK0kfLqHZ3kdplKINUaxGQhIG4ctgiMtsT0IHEDjoYT3PbeC9DNxz+nhsfv/PxJDpBEXLIgw0f7VfVGDL3x33h4UZETCB4LED9H5IgFERFkhRPfbOw+5WZDThWAhRnRsAABQFnZtmC+ZyOmygl4lAGo6YYLJ0i1meTNiciNSRaBe1YUBCSc1EPRvBhAc1AiJr6SUnQp6mi65UlVWBj6fVVYXdfkZY1Wyw3Z4bTvNQodJQ33Su/zeVVD02OfztBkD5pFSBjjNjadKoWFdjnKNgoUrMzFXSx0ssJDRSnEaOz2uKMagWjaKG2KYFDjEnRh8FDGkwuKRmVgL1KLMosVms4iNGZ1za1EWdM3DEDgAkIOHk+k4a2nExQVFRAa9IhK4LQAA6kRKOcjWu1MlDyMSNygJCTjA3zWV0Da06ftJXZvJvMFNsrt0sddgRZUPRh0SeCOlkvzoIpgIALCcRQ3rhn40Seg1zba5pkUjtSc72NmoCFYJ11gUEgpE+LtMa0w0TkJ0AgDoh+l9c4yW6t6+Qoq60VgLufdIKSc0PPda/Ky3PunNTlbj/FzNK/Qs2g61cjiWUVa82omJGFa4nUTjnZRYGDOtKHgfIec0dhgFDYHnVhPC5Dx0Od6uBQgcAABW0CsiAQCAumBb5DK2gBGlxA0xFg1VMC7k+B1fGXbVUpgqBXkjYip4Z0zgwH1UpxVfPo8ER2W0GvI9XQDuG24xb1jgsNAkC1kOhNOa7BNDH2F1Faer8Bhd5mf+ZAnbZMGOJXW1pgIAuIepfXMc1b1MlXgjcGAmOZmtsv+lmMy0a8lb3vdSy4pFXl9mffeuQ2LAIqKNSMywzEIGtFHIZrrEmnkGxSSNpIzzRxkmde6/IHAAAAAAAGDYuUFH8liXuEEYDNQUqQKFZZ1dmHJxaBlO9PQLzmSB9hQVEQRB0UpiYAhYbrsFV9yZqh5tOZJU0QoFsw20qoCwoQL4/FLgdIarbycUrmPjxjwAmhls2Ak1LXA47oB7g3eUaFUxx897Z0Xy7EwyzGM7Tfg848q45LVyO8VpoMNihvAH67Ri8Jq5pSiQp+syiIKSZsHOHzqK+/ISCc60ipcfMXrIAAAAAAAOwQv6cbb4U6WtUdwgeIOnm6LBmaYFx2xnljcHujHWR5qrcFWr0bX15wMAAMPofmZ3+Zk93uCg47SGZ16XEx3/nfpT45lSLRTI5L7gm4QQh3Ous+dwnYBBmrK3UbErdxmTFd60HzG2VwLZkJ16gRgN/d6OIAimfVg70XdgAfrhhPVQm8+NS8SdAuhaHefrNcxrtHk8/5UpKgxtcYvZCYgbGktV80eL4+TanUIgcAAAAAAAiMEbyFHFFg66xQ2R6EKnZfxhBGfctu3kMaF7YzBnyvaRq07KbJycG6/sBgMAaB5ln/9dfuZTsPenQRAMNv2Zzc881WdIhxMCw5zo8CZgzv25nYLX2LO8zt7BopNOyndo+loVmAXudB5iYN8ccZxFWqBe8iRv6VqN+ui0wUKG0Z4x7qLT0SI//3fwtXLGgcJ2+DzmiWPS2usAC6jR+qPZmG5N0oqNNSP3OVpUAAAAAAAkQEEMKaUoYHO5YDDwsVyyF3ub32PWczX8T3L+ng/nYFZjr3cauyaDI2Vs72p3b5BSqgTBRw1XkQEA7GS5QAuhbqy38Br3F0aANwEKfrMT0FDOl1Bwdx5BW3vhsU5rj+lYC4sJXi8soJIQAKDISsl9c5wW22nj2WwBfdpWtbmvu9fXivfF49Fz08V1Dn8HtKAyx0xGDLPLsZlZrLOA+K4FUFrbGFXaLJxYrCKWB4EDAAAAAEAKLHJYy5GsOGDCaitG3oRJlCxZiSVLGhPcb9h3XSvRYzGiyz07TdvSTXLSYqZAcirChgpOuDEAEMPFyvEKSQsWtvi5vBYJGmC/Wxh6HpzJeNESVwUuOhi0VXnOePNs4l68YT9eFrJUvp6D8xIA3rBcUgTe5floFsIGK5mJieEi5gyL9a0j/twEIA7HiZKEQEss2ML+A/SyWFLgEBXUhT9V78MgcAAAAAAAyICrBtdSguodVs4bDX5wtUL8r9qcRFmOJUxWTC0kuecjsI95RYFDpcr9WEuNeU6MzuQ87trdGwAAiahYQDfiXqb1AAcVIWTQz2KCI1ArJmpw+TyrOgV5l9wwLBjOAi0LAPADlWdBi5/Ziz6IGri1lZdtfjh5O8vFH112bUCiH4AHibs4dPg+gasZSKPIc68TK6pbNhmHzgsEDgAAAAAAfaBgK0C1gfsAACAASURBVAsM4iKHJd4oVLWY+4kNi0dgFUnJnjS6scBdXcmDyGVjPKfQAf23SyKlHHb6C4BC0H1VRfCKg/8QvqWAPt1moPWPlHKGx56rTg3AXiDccpui164plflFz4vIcCJyAhYaph1qb5EAWkO5ySyL0lCNDkACLAQ6Lr4TPAGQRdJzvxM9J2N/WhmPhsABAAAAACAHMZHDbB2VAlBcg1442bOYYD8YBTOjzciybcG7HEIHuDfoAQIHAIA3cEsl022VXAEiI41AuOU2cJtLpsHn5XjM5RD7aM/gBNtE088DAFlA2AAKQM/Kwxw/XHdN+AeBAwAAAABATrjyvbbqdwB64UphZ6uFY0KHCU5aDfE/2bQhV+nLbYuwQKUiFVhCEASpJYgAAK9YQwU6AADoAYk9AAAAIB9cWOSsgBwCBwAAAAAAAECtsCPKItuPC8vcG1a4RUwRrDh+VKQCAID9QEALAAAAAAAAAMWAwAEAAAAAAABgBTZWXLHYAu0yAAAAAAAAAAAAAACwgEdwEQAAAAAAAAAAAAAAAAAAAAAAAABgOxA4AAAAAAAAAAAAAAAAAAAAAAAAAMB6IHAAAAAAAAAAAAAAAAAAAAAAAAAAgPVA4AAAAAAAAAAAAAAAAAAAAAAAAAAA64HAAQAAAAAAAAAAAAAAAAAAAAAAAADWA4EDAAAAAAAAAAAAAAAAAAAAAAAAAKwHAgcAAAAAAAAAAAAAAAAAAAAAAAAAWM/3cInyMzq4TQxseKzv73e//UasrF+z58ABAAAAAAAAAAAAAAAAAAAAAAAAx4HAIYGxzaNifPOoGH70cTG08YdibPNIqfdr3WqHf3bu/kOs3flKrMcEEK1bKwa+AQAAAAAAAAAAAAAAAAAAAAAAAOAXEDiwM8OeLc+Jsc07SosZkvjuPdPfu929Ltb/+c19EcTyrRWIHwAAAAAAAAAAAAAAAAAAAAAAAACmsQIHcmfYP7Rb7B9+SQxt/EHtxzMy8ET0X+H/jt1qixdaU7UeEwAAAAAAAAAAAAAAAAAAAAAAAGALjRM4UPuJ6e37xMtbnrXgaAAAAAAAAAAAAAAAAAAAAAAAAACQh8YIHEjYcOzJA0ZaUAAAAAAAAAAAAAAAAAAAAAAAAADALN4LHKgVxamRN+DYAAAAAAAAAAAAAAAAAAAAAAAAADiM1wKHqe17Q9eGgQ2PWnA0xYDTBAAAAAAAAAAAAAAAAAAAAAAAAPAdXgocBjc8Jv78zG8hEgAAAAAAAAAAAAAAAAAAAAAAAAA8wTuBw9jmUfHhM7910rUBAAAAAAAAAAAAAAAAAAAAAAAAAMl4JXDYP7xbvPfUUQuOBAAAAAAAAAAAAAAAAAAAAAAAAAA6ecSXs3nm6aPeiRtGB7dZcBQAAAAAAAAAAAAAAAAAAAAAAABA/Xjh4EDihp8P7a71GNrd62L9n9888Hdjm0dKvefAhsdKHhUAAAAAAAAAAAAAAAAAAAAAAADgB84LHKoUN3Tufi3a69fEyvqqWL61Ijp3vxJrd77K9dqxzaPhn+ObR8XghsfEyOD20KFhYMOjho8aAAAAAAAAAAAAAAAAAAAAAAAAcB+nBQ6nRl43Lm4gUcPC2kdi6eZnYmX9mvL7tG6tPPBnxD2xw7ZQ+DD86OOh8GFk4Akdhw4AAAAAAAAAAAAAAAAAAAAAAAB4g7MCh/3Du8Uvt+819v6tW21x/OqZhwQJuln/9pvwM3o/h9wd8rpDAAAAAAAAAAAAAIDmIaXcJYS4kPDFjwZBcBJDArgCxjIAADQLzPv2gmsDspBSBgn/fDEIgherPHFOChwo+f/eU0eNvHe7e10cXvmDcWFDP8q4RQAAAADAHqSUW4UQtDHYxH+K2J+93Oj5uUw/QRDcxiUFAAAAAAAAAP+RUu4UQuzs2UNG/7+X27xvJC5G/z8IgssYKgAAAADwFecEDtTS4c/P/Fb7+3a/vRM6NsytntP+3gAAAABoFqx03sfBqK0FvvzWpN+XUlJw6iz9BEFwA8MJAADuIaU8IoQ4kXA6Kq8eAAAAAABQRUp5kPePu1KEDGkkCumllLd5D0lrorO4MAA0g5TKauLFIAguYhgAAHzBOYHDsScnxdDGH2h9T3JteO2Lt+GaAAAAAIBScFDqSEFRQx6iCp4TUkoKTr2LjSkAAAAAAAAAuAu7/R3knyKihjxsit6bxQ4neR8Jd0AAAAAAOI9TAoexzaPil9v3an1PEje8sDwl1r/9Ruv7+gI5ZowMbsv1bepu61E1w48+LoY2Pn7/Uzt3vxJrd76y8tji2HScqmR9v4jut99AtATC50YaTZuzgFmklPu4gli3sCEJ+qx9LHQ4CkcHAAAAAAAAAHAHKeUmFsYfqeigN/F+9YiU8iT6pwMAAADAdZwSOJwafUPr+0HccA9KAFLCeHjj42J0cLsY2PCYGB3cJgY2PKr0fq1bbU4ur4rlWyuivX7Ni3NM52liy3Ni7F92iJGBJ1J/r3P3a/HK529VklynY6JrRT9DG38oxjaP5H4ttWWhY2yvr4qV7rXwOtkoCKDvRt9zfPMOMfTo45nnPg26JpGoo3XrSvgnjU0fxB7gO/ZseY7Hy45Ccxg9Czp3vgrnrPCe6F7DuAC54cDUB3Er0AoJW2BIKQ/BchQAAAAAAAAA7IfF8acNODbkYRO7AtIx0D7yMoYMAAAAAFzEGYHD/uHdSonNNJoobhgOk8Pb7icA71XB6233IcKk+70k+8tbnhW/5r/7y82/icWbn4qlLz8zds5pjOwfeknptb9q/yE1uU/ve+zJA7nPFf0eiURMQcczseX5MOmvKkIh6LV0reKiCBI9LN38VMyvna+1up3G5v6h3WL/8Etaxii9R/Q+0ff9dezfSZRDQo/D7XcKv/fHY3Olju2F1lSp1+eB7vnfjagLxFTPTZl7UuQ8N/TdprbvFXu2PK98P9CzhX5ozoogUczSl5+KuWvnIHYAqUgpqWXEhZyBKXJZuMh/UhDpRpLzgpQy6re6NdZ/NYtQYCGlPIoqHAAAAACARnKb15m9wIYeAMuQUp4o4NrQu4cUvW0KWXC/k/9v1NZwV449Kv3eJRbLv4txAgCoCaxh7AXXBliPMwIHSjDrghJXTRA3UHuJPT96ToxvHg0FDSbEDHmhxCH9dEfuiIW1j4wkDcmBooiDQZwkQQIlTt97+k2twhpV6FpSEndq+75SooZ+0Hv/fGh3+EP3yfGrZ8TC2vnKvicJG449ORl+fpWojhtR8rVVQeO7zHFGrhdFKXNP9oMEPvRcMPX+NF9SSyT6IQFMlggKNBMp5UGuuunHu9znNFdlTE/A6iQHrPZxECyr/QVV4WwNguAQhiQAAAAAQHPgdeaLuOQA2EsB57/bvIc8m2cPGQRBPAF1fy/JDg30WQf7vMVpKaWAyAEAUAdYw9gLrg1wAScEDlQFrDM5T+0DfBc3UHL+8q5/t+BIHoQS6FHS8DdX58Xc6jlt14Laa+iCxAS/G3ld2/upUpWwIQm659576mj42YdX/mDc0YHu81Mjb1T+PSNIXFE1JCLxGZ33ZATdE6dGX69UBEMiCppPf796TsnJAvhHTnEDBYhOJrk0FIEDVqFIgj83S+hwUEp5A04OAAAA8tJT+RnSWx0KACgG7isAQByeEy70zgs93Ob9o5a9HLcwPCulpPc7waL5NCByAAAAUDlYM4OyuCFwKGFx3gsl1ZtQhTsyuM2Co8jm109Ohsnzn37+lpbkua62EGeePlq5g0ASVKF+5uk3a3XeEGzf//HYrNHkrg3nvI7z7HvrA92tWuie+PCZ39YmgiFh1ti/7GhceyPwINyWIkvcQIGpV00syCngJKU8y5+fFqAiJ4fL2BAAAADIyb6E55rEyQOgFLivAABxTvcRN9Ae7xCL27XCgvtX2dHhdEbritMslsc+EgAAQFVgzQxK8Yjtp4+qqnVZkLe718Xxq/Na3st2qC2FC1CikpLnVL1vA7aIG6hNA52XusUNcSi5+/cX/xhW0OvElnMO7IbmCLon6hI3RISCn/E57fcBcANqAcGVN2mQfdsTJoNCFPQKguBVdnVI4wNWQQMAAAD9wPMCAP3gvgIAhEgpj/RxTzhK+zsT4oY47OjwFO9Z08A+EgAAQJXgmQNKYb3AYWrbXm3vRTb7TWHEgDW8SagVwljNooxTI9Xa3qdBCX9yt7AR3cldar/hsrih7jGbl7KCp2XD7Un6QfcmzRG2QPcBtckAjSSr4iXsTWc6MBURBMGhDJHDJrYhBQAAAPrRrxc4AKA4uK8AACRu2NVnX3aoyvaC7OZA/dTT2ihiHwkAAKBKsGYGpbBe4LDnR89reZ/3O+e1tEFwBUrAuQa1Y6iLiS3PhQ4FdeOCm4EukQO5sxx78oC249LBaMWtXdrrq5V+nouQm4kN92YvdJ/u2fKcXQcFjMKVN2kL7xtVihtiHM0ITh3kdhoAAABAFqiaAUA/uK8AaDjshJDV2pCcG7Jc+YzAe9ZXubViEgdZmAEAAACYBmtmUAqrBQ6UANVl0d+U1hTCoaryXuha19WqAuKGYpDI4c/P/LbUe1Diuu52A70MVNx2YP3bbyr9vKop216I5gNb3UyIU6NvWHAUoAo4OHUk5aPCAFEN4oYoOHUo41dQfQMAAKAfEMMBoB/cVwCAg0KIrSln4d0qnRt6CYKA3AezPj9t7wsAAADoBGtmUIrv2Xz6dFXH/uXm38Tana+0vJcLkDCkKO3u9bCanM7Tyvq1BxKvnbv3zt3Qxgfflz5neOPjocuGLseIiS3Pi4W180qvVfnetkDJfp3iBhrzK+urD11LalUwOrg9FMGUFRdQ8pqOW0U8RNfK5dYUoBpsakuRBImy6Dm1dPMz+w4O6OZEhqr4JAeIaiEIgotSync5gBaHjuksRgIAAIA04PQDgH5wXwEA+gjkb7ATX62QwIKdGpLcGm7Td6hDxA8AAKAZYM0MdGC1wGF88w4t7zO72qz4/vDG7ER/99s7YbuO5VtXwgR43tYdvSKR1q17f1KCmxLmHz7z29JJ85e3PKv8Wl1uH1VD505HlXrn7tfi+NUzYunLz1KdAeLXmqrjqUVEmfNGx03JXRpHRTBp7U/nIT5WB7//mJMtW2yiSe19ijI5/BIEDp4jpdyaIB6IuFxn5U2Mk3yMt1nU8G6dogsAAADOAEtQAPSD+woAcDBjLjhqkXDgZEzgQPvIi/QnhA0AAAAqAGtmUBqrBQ4jGvrhU7Kzacm5sQRhSOtWW7RuXVFKRueBzvELrSnx8dhcaZHD6OA2I8doI4MbHguFIWX5zdX5wk4K5JRBYohTo6+XclP43cgb4bUvgi7xEvF+57xY/PKz0Gmk37ih803zSuQ+QvdKvBUOOVwUmS9GS85RyxAOOI+rLYFAIfZl/LIVNiNBENyQUr7IggsEowAAAOQFVTMA6Af3FQAgzb3hYhAE1lThsRvgIT6uGxYcEgAAgOaANTMojbUCB0pE6qjIX/ryUy3H4xKUsCVhB313SqBSwraKXv+UXD7c/kNpW/mBDY9pOybboRYPZQQh5MZB4gJVQQiNiwNf3GvRripyoFYVYwWFATrES9RW5ZXP3yrUfoa+byu8J6K/+U4UQt8haseSl0FHxmodx1l1yxia89rr18LWLBH3BC3bwzFqCrp/myTKaihZwamLtpwSm44FAACAM6T1BgcAqIP7CoAGI6XMcm9417YzEwSBdccEAACgEWDNDEpjrcBBRwKUWGygdTglvIskfXVCjgDiqVo+2jiUUF9Y+yizrQclOkmg0c6R7KTf/eX2vcqHXVbcEIdEDoMb/m/lFiHU6qKIi0NZ8RJdixeWp7QKd3x2eqEkf9UM9WmVowMSNcytng2dafrNedQWZeJHz5VyK0mjSaKspiGl3JcRnGpW/6vv2nXs5E3Izj52cjf457ILzhJ8rbem9aDlth/aRSTc9zY6p1mbu4t8HLVUV3Ef4V05r310rJfRKqUaco6j27H7EYKoCrH8+lgfVHJlnsxLXc+bXlydNxxZizQ6WMv9lKNrkzTO49yI/Vx0zYkM9xFIIW3c37DJvcFW6nxONmn+8o0C+9VoTsZ1A6nwczI+npKI3/9a4h6xdUXWGL7o0fjFXrQCCq5XnRtb1gocdFX/NrF3fF3iBnG/Qr5ttGK6aqgFArV/yHNei4gNqLVDGXSJGyLIfYNcDFQcJeh60z1b1dg7vPKHSlxJTNN14DvQ/WwbJO45fvWMmFs9l/vISARBP/Sa955+U4wMPKHtW5FYqYnPmoaQFtS43ZRKF97YHeRWHcqbDynlWV4kGztvUkpy2zjR89d0rf5byu9v4u92JEfvv8u8YdFxnPt4bGUJaHrZFXv9Da7+Omt648QVaLv6tGqp7FillEHS3wdBIMu+d47Ppu91IeGfqI/yyZLvfSFhvqHg7aGM10T3ZlaVYC/7+LW3WaT1LkQo/XH9+qQcf7/XJN5rGZS+D3o+3+p50obnTZPmDRvXIrbdVyafUQU+f1/BezbpfaLx/24VwWHcR0rvY3xN7zI836etmxsjbnBlXyYcnb983BOlzMckCsoM3inuV+//Lua0+ql4TPV7xkfPyaJrPLrnT6qMI4V1RXzPc9aw6Kv0tcFetB6xA3+HfU2YGx+x4BgSGdZQ/WtjYg64A1WHv9CaDt0NdCfuSUhQRgTym6vz2i3x6Tsu3VRv6TK1Td2Noii+JJPR1qA45N6x9a8/KyRuiEPn/McXfhEKl3ThSqsSoETaItz74BRtsqSUHwghrnOgqayymhbKp6WU13mTVBWJmxGuzrnEgTflQFYRaINB318I8UHBoHgvW/m46Vye4ICg7mPdxcd6uuCGKOtY09q9gHtq+aRzl3RtNtF1j92bKtc/CiJfklKeNjGGPAPXpyJcmicTqPp54/249Ggt4i2UCOB79kLJezZiJ19rukYXKrhOuI+Kg/som6xz0nT3Bmv2ZcKP+cs3khK0qfNVbM1Ydr8an9MONu6s+02SkDDtGb+TE/GniybjY+8bjaM0x4ekzz1Scl1B45fmmw+wpy+P43vRkJ7voGtutPp5Zq3AQUfCqB3rxQ6qow73BhIM6ISSqJQENZVIn96uPr+Q8IIcJUygmjQmxv5lR6Hv4AOjNbR+aDIkSqD7Uod7BwmX/nLzb00/pSAD3pSkbai9tnfnjf2lkovhNLbyBqy3oqcy+NpeqMoOjwPiF3iDofszoyCatmvF19/E+aGN3SVsvBPJVcUZG7s6xSJRoiV3IKaB4PoYxrV5Mi+Gnzdej0vf1yKuw0LIS5wIMLWe2hUL2pv6DNxH6uA+SibVyhyuWQ9T9b5M+DV/NRJeM542sGaMEtQXsF/1hlwW+7H4h44k7lZ+tmeKZVh8eCnB6UaVfdjTq+PDXpS/wweG5kar13vWtqjQ0TPeBwt715jaXl0VvylI3PDC8pSx8UOtHF7e8qzy68ma3xRU3U72/yptKsjyn4RJec5be/2aGNr4A+VvQS0BbHA/GGhA5b5qGw26RjohMQKJEnRy4Iu3xY1//ZPSeAeNIGtj4K3AgTdip3P+etRzsJc8G8MjtADPsgfUBQWxIsu+WBCtKteGIp+XdD779fkT/N4UPNPRKiHP9b8c683Xexz9+kVG5+OpMsfZRHKOpcsJgZw892O0aX0RwXc1cH3UcW2ezKLO500Sro5LH9ciPpFiPZ9F2jXKWi/ECW2CpZSHgiCovAIe91FfcB89SNoe0muBfF7qfk42bf7yAUoERxbvLDy40CdWI1Ku26YcrxM8713HvshbHrhvczwre5/veccRiWVuJ933Oea+2wkCzDxzTrSmeCIIglziDuDHXlTheZq0Juk3xo7w57xq2/iyVuCgg2X0RK8USmgee/KA09+BkvuvfP6WUXHMni3PlXr90pefaTuWJEg4oOrCMTK4LZfrxfKtK6VEHjTOfvr5W8qvtwES0lTF4PfVhRgrik44Ots20LkiMYJu6D5fWPtI/NIDYRYwQtoC9bKvmwVerGZt7m6wterFfj3++L329bF1I1vQyxp7uuW5LqdTjifqmdq7YdnKv1+4bx5vlrOsVm9zX77M88mBnF05egCe4ADz0aLHKvpffzrWo9xDsO95ZnX6wZTAONk/nlA9zgZxfw7iyq+kDWveMZTnftzEgZgXERDJhUvX52xGYiUtyF/0/lQKALs2T/YcVz8qe970vEeIq/OGQ2sRa+8rk3DVbD8L78t8fi7nuEbRvRtdq7T1dxQYPlRBL2DcRw+/V9VrepdJE4XU0oO7Rqx7TjZk/vIROq83+ogbon73ea5bfL2Ydc0g/vaT++Mn41l5NvaMTJzLON6xq8+cQs/2B96Dx/EHCXPf5di6InGO4zVJ9DzOnG+EEC9adPWwF/0OXXvR+GfnETdcjI3p1Gdoju+xi8+XVaJWrwUOoDooaX/m6Te1VEK3a6zMJ3eEtTtfGf2M/cMvKb+2datttTPJaE6Bw8LaefG7kdeVP4fEEfuHd4fv4yrr/6zuOpK7hsu89sXbxsb93LVzEDiANNJU2T5vcLMCoYWUxhwIuCylPMmWbGmWvrTAz5U0z0FmsIsrdnqv60X+brqr5nZmbJTou9J5eTfP9+bfCTfZpPjmDW3aRpBU1TcUg2dp70nnplDQnSsVzmZURBzh646AUTrxoEVvEKToGIrfj1njZyf/u7EKd49w5vpkzQdpVpMmXQ5in+3iPBlhzfOmBx/mDSfWIrbeVybJkRyke/BkkTEev3fp+vK64UhG4J6SBZnnXwO4j2LUtKZ3kj7W4E1b81r1nGzQ/OUzJxLGzGUeM7kdUvh3L8auWdpadBOq4f0lJjSIQ+PpUJ55IBbveJefuUnz/6aEZHBv+4Db/Jl9HV44MU3P4pN93GjINWafLa4x2Is+hI69aPw7ZIkbLvKzLdccmfI9jvS8/0E+fmv2NY9YcAzAYSih/eEzvxV/fuZ/arN5ryuB37n7tZhbPWf0M6g9RZlkc+vWFa3Ho/sz8lbt0zV+v1NOnPDeU0dDkQPwGxonJtuRkKCJ7v1S73HXrCgK1EZq/1QfLwlv7tO+81Oqi1daILM6OU3huylHJU1peAPbG5CljaQJS+BNGZuMSCxwUiVQwufzJLd4SHv9iaK9F2OVLGnHqxTU4U1bmjrd+HX3gYQAsPIYio2fLMX9EfSdzQ+ujxouzpN5qfJ5k4ar49L3tYjL9EkO3ubx9WrZMU7rhiAInuhTuXea1y1GwX30ILiPctGvjQmo4TnZxPnLN3g+7r2GJGx4qoi4oRfeqz6RcX8mJcGBH/SKkd7l8VRoHuDffzFjDB1k54VoHMfvf3rNEypChDxriqLv2SR82Ivyd0hzQhI8R76oOkf2fI/e8W1sL60CBA6gMCRqmNq+V/z9xT+Ky7v+vVSrAZuYWzUvbBvbPFrq9VUkUkcHtxv/DBG6ZcyHLUHKQCKHqRqr7+leUKVrsROHDnS1qKBxYpqyri2mXV9AbaQtEn21F00L+mipouHgQZpCuYrNV6+t7lMGq2ey7Fa1BO5iG+mkDdOmDLV4GmmBtqNlK1Z4U5S0qTqIRHo2HAyJX0stY6iP8AQJipzg+pTCxXkyL1U+bx7C8XHp+1rESWJtp5KIgvPKCaYkcgTuPzC5hsB9lA7uo0xSg/2oAH+Ayp6TTZy/PGRriiBGS/Uw35tZCepdnJgGnsDP+Pg1JXGDsuU+j6Gs1x9MEHaVKiQR/dcUO21KQFuID3vRJCekCJ1zJLk1PJWw9styC6sUtKgAfaGkPCVyxzfvCP9bl1ODTsokmiOqaHcwXlLgQK8f3vi4tuNJYkTDucwDJYWpJUiZVhUEvZ6u/+GVdyp3/yhzL6ysr2o9FlMs52g5ksSIBqEMuTdUIR4g15KxzSPGPwe4Q5+NgHfBKd7gJfay1Gw7djSlj9umCiz04oGtXLaDKnBFzr6El9K4eVVncJO+A/UFFUJcSvhnCsQcLBAsTBI43NAY8Dub8hn7MoLkTSJtXMQrhrSOIbq3OeibdO+jTcWD4PpoxOF5Mi+VPG98G5cNWYs4R6w6LIkbZYPzWdC9SXbuKZ8fJQrK9jDGfaQG7qNiaE2ge0BV+zLf5y/fSBsHvRbyh3Sv3WgcxNaLSS1GyGEnl1U9sIq063Uh9t8Xy4gbInjPcTQlab2LjyUax1FbCh3j6d2EFgIR++Ae9DA+7EX5O6QJr44aEg0e5TVmtM60RkADgQN4CBIxUCJ9LBQ0uJH0K1st3rrVriQ5Xjbp+/Mhv1oyUEsQEs6UdQGh80Ln9pXP30I1fQ9lXUPqZPHLz5w9duA8WRUVPjo4bOJg6s6eJLSJwMHZlCqanZwEN8HOWKDirOFK2rQg2iHumaiVPhvpgwWuYWIwXOOxno3dV+EmW3e1lOOknev4dTExht5NGbNbKUliYsw6Cq6PXlydJ/NQ5fPGt3Hp+1rEVdJ6EwvdQeAkOEm4M+V6RQmnMmMc95ECuI9ACap8Tvo+fzWF+DU0NmZ4XjvUk/yO2AQBuJOk3V/RHNTPeaEoZ1P2Gzt71hUndQm7eNy+m5LsRjucZHzYi6aJGy5qFrTeh8faqyzWsMqFyOsWFWWr5ZsCJUCPPTkpPh6bE/+1d1l8PDYrfv3kZKMqmqmCuwpGBp6o+6tax4Ev3hbt7vXSh0Xn9u+7/ij2bHnOu3PUVJZuQuAA7MPHIAQtuKmnLvdnk9xj7ZCh4GTae5rcfMU3EsYqZbgaL6ni46LhSrZ3U6oTytoSahMgRP37+OcixA2FOWtiDHGAMC24i4BIfnB9cuLhPNlLJc+bnDg1LhuwFnEOdgMw2u4gJ0czxpxp23DcR+ngPnoYzCH9qWpfhvnLP3Qnox+C96hpyUa08POPkzrje/xe/eIcuh2VRMbzGC0qevBhL8q/n7beMD1H3rBR6OW1wAEkM/zo42L/8G7x4TO/JvHGiAAAIABJREFUFf/fnv/XKkGDjkS3Cqo2/EXQ0UbDR8g544XlKS3XnlpG/PmZ/xkKdmxnZf1a0y99JuSqAgCoBw6OGqkoyUhsV7H5Ml0lk2RzJ0xXsXH1UdpnpB0TcAuTm8i0sZO08QfJ4PrkpynzpA1VmU6PS4/XIi6RlswxEZxPhe/ftM/bZ7iXPe6j9PfGfQTKYPo5ifnLP05W1CIi7Xpt1SyKBfVy21CrzH4CB+3zDwu2Eu8NbmUAvsOHvWja862q/WeWSLcWrBU4tDX0p6cWC+Ae1MKBRA1/f/GP4vpL/yHee+po2BaAEsI2sf5P820ikujcNd/WYKBkGw0XUBWK6BQ5ECTYOfP00dKtS7Io+95VtEQRGoQ1qvdG2c+tylUFAFALiRUzXGljEmMWqBycSuzjZ9h6NSLtM8ok7rAZtoPLhqvM0t4bAbx84PrkxNN5suhnVQXGZX/qWou4RNq9Ucf4Tgumps0rOsB91B/cR/mAc9nDmJ5Hmj5/+Ugl144ThGnzM66XP5w1JJjpt24wlUivypXGWTzai9b6fOP7pu697gNYK3DQkfxDxfw9twZK9P6fPf8rFDWgRUIya3fMCxxMJtttoYxQRLfI4edDu8XH43PGzvuII/NL2e+vem+UFU9V4aoCAKiNtI2kyWDoDcNB6lqU4BEZqv2tJYLMO1FVZAWmx1Cayh/XPh+4PvnxcZ5MwvTzJg8Yl/2pYy3iDFzxl3YuKg9q9ql8MyXIxH3UH9xHQAWjz0nMX15iKhmdBq6X/5gSnmVV0Jscxyha6I/ze1FusZG0Tqx6/1nJOcvL92w6mDhrGirqKcFGIocmWsGTsIFs+inJ2wTo+9qO74Kb7rd3SgtFIpHDqdHXtYxdEvTc+Nc/iRdaU41tCeHCvZFEtyKHCwBALdRh2216AZ62Ialyk3ExZdO2K0cw72JCwGYT299Z12OvYZi2S7wopUz6JwRD8oHrkx/X58m82BDwwbjsT90tRGwn7VperDjJFCdtrnBS4ID7qFEYE61wMt/UmDFV1Wr6OYn5yz+qdkGhMXoi4e/DAoAaxxHQRBAERuYhcgBJebYLw3sejMn++LAXTXu+Vbr/JDGFlPKGLYJWewUOmirqxzaPNi6xScIGsuivGqq8X1j7SOwffqlyp4ihjT9Ufm3n7tdaj8UUdH4Pr/zB2uPTlZAmkcOBL+6tI3WIHEjodHnXv4vXLp0QC2vnNRyhHtoVzUtl7o06cWnebsFtAoCi1BEMNb1pSQtOVblZupyyWcoTVE0SOBAnpJRVWfaBh7ltQR9/kA6uTzFcnyeLfEadYFzmA+com7T7tU6rfQrenk74+01U+aZ53OM+ygfOUT5MilZ2piRidXDRkONBXfuypsxfPlLpteMk9e2U9eFOtJ1xHtNzUNrYgcChXnzYi6atJ+rYf16GwKEPuhJG45t3iLnVcwaP1B7IIeC9p9+sVFwQiRqWbn52X5SyZ8vztp+qB6iiPYUOlr78tFGJVBI5UJsCaq2iA3qf4Y2Pi+NX5+v+aiE62vDkwVUHBwAA0IzpoFHiRqNim7i077grhwsDBS+PpGysTrNl3klUq1QOemnaDa5PMVyfJ8t+RlVgXAId2BAEfgBag2RUi23VfO/hPgIqYJ2cD9PPyabPX75Rl+DscspYgsDBfUzP1Wljx+TnYg7pjw97UZueb2lijcp5xIaDSENHL/6XtzxrrAe/TZBTxcdjc5WIG+i6/Kr9jnjio38TP77wi1BAoksk0Lp1Rcv7AD8gx4WdF/+fsP2FDsjZ5MzTegQTrjC08QfKR6o6B9N8VIbWrXalZ7cJzwigDyklbNsLQjaOZJ8a/dSh8jXc59WWPsPKG2YWLmRtqEj8cF1KeZr7/oFqqCpQjkSOGrg+OfFhnsxLxUGyJDAuE7BhLeIKfe7Xuq97WmBY9/oc91ECuI/6gvVUDmrclzVl/vKNuq4bRAz+Usu1tWCP0Fh82ItmfYcaRWBWYK2Dgwgt3Fe1JOz3D+/22sWBvp+uKvc0qI0DOQjMXesvZhjbPGL0WJrKckNt8KlVwda//kx8PK5HwBO1vYjaYKgyXjKJXwVlE/fr/6zGZaJuRga3N+J7gkJkLQ6N9VB1AQpschAmCsRECuKtFgc5TQepU3v5cfC3KtKCY7mCZkEQnORN08GUX9nE/3aQLTvP8qbmImxVjVHVphEVh2rg+uTHi3kyBzZcK+/HpaNrEZfICqDWPcbTqiJNfE4V4D5qBjif31HXvqxJ85dv2JYUhiAFAPfwYS+a9h0aL8ayWuBACV0dPfintu/zVuBAbSlOjbxh5L0jUcNC57xT/fCL0rn7j0o+x+dzaBpq50BuIadGXhe/3L639KfRvELJ+8Ptd2z/6qUYGdzm8NEDUB/cczHt8xsncOCK/V3842KArq6gCG1SLtT02XFyj9kgCA7x2E8TOURsiv8OW67GBQ9ImAMA8uDcPNkHVGYZwoO1iA/YEEBNW18g4ZQD3Ee1YfJc03OnbMVblsBZN02uxsf8pUZd+8q0z210wQsAnuHbXrRK4OCQh6UvPxPiqfLvQxbtZJne8qwCnqqzqS3FwIZHtb1nU0QNcXS11+gHJenLMO7hGC4KCRJWutdCUU/ZcU9CCXovaoNRNTra7+Rh1FGBA7n3AGABt1MWmY0IBnIl/xHuqYZNfINgkQMFAU8XuPbReAnh19PPWbg7AAAAUAFrkdpwMdmG8ZEC7qNKSQ3203UwsSYOguBi2eQ9V69WJXAwDeYvoAvsYQEANmFVLJqKmjIKAyvlESuOIgVKCOvqxX7syQMGjrBeTo2+rk3c8H7nvHihNR22AgiTyI6JG1xoi9EtKXAA9yBBwgutKdH99k7pM0JCieFHH6/8zA5vrOYz9w+/VMnn9FL2nJYVA1UJicKAt6QFqLwWOHBvXUpsX+dAFwIuDSQIAnJjeIIrwlSCOxQopV5Q16WUH3DFIAAAANAXrEUAKA/uo1rIWjOjSh8AAAAAqmAdl4LVDg7EQucjLclreo/9w7trqdY2AVVm62jfQZXkr3z+ljYXg7IV4z67RpT9bmObdwgh5rUdj8vQuSQxzsfjc2Jk4Anlb0ICIRI5/PTztyo9GzpdV9IgkUGZc1PqsysScOhi8PuPKb9TVQ4woBbSemR6G5zi6p0Pci6cb/M5usz/faPHxvFGWpWSlPIIJ7+BxXCbiZP0E7M0Vqn+o9fs4zYWh7jSDAAAAEhaI2AtAkBJcB/VA7c5bLQLIAAAAABAlVgvcKA2Fd2RO1oSgpTIJIt/HxJSU9v3ln6P36+eC90adDKwQT1RKByr3FaBqr2pZYoKJNKhtiS+n6O80Hl4YXmqtMjh5S3PhsKcogKUOpwfinDsyUmrj88m6hKCAOtJq8DZSRVRnPz1BinlQW5JkAUFPqmy/2IQBOgz3h8dPXGtgB0d6IfaV+xksUP0Z5E2FheklCeDIPDivAAASuPNPAnKg7UIAOXBfVQ7aSL5XSwcBgAAAIA9z2zsRR2HBA5rNn8FSmIu3fxUi1sBiST+/MxvxY8v/ELLsdXJni3Pl/r01y6d8MbNoixVCgba69eUBQ7Enh89h+sWQ5fIgQRDB74oVngwtPGHyp8nQsHKaCi4MgGJL7Q4vKyvGjm+fvjs5FIhZgZXs8gK9u3ioKAXcHV+ViCUvutRE31jPee2j24FHAi/f38oCB6OsEjokPmjBQBYjpfzJCgO1iJWgYS3o+A+soKLaQIHH0XyFoL5CwAAQF5c2oti7ZbCI/+1d9lqgQNx/Ko+W35Kgp552m1hDiVGyzha/OXm35Akj1FlMnX51pVSr98/9JK2Y/EFEjlQm5Xut3eUv1FZwZAK45tHjb23LveGutxC4FKihXUPvkOtcBI3LQCVFLRyEgq09QmEUkuBVxEIBWnQvRIEwUkeJ/9NCPGqEOLdPifsIPeFBgAA0HCwFnEGm9u0NV4ohfvIGrIS7Psadi5sAvMXKEramMEcCgCoA6sEklzoZAWP2HIgWVBLifc7+hLyVNnsssihbGL0wBdvazuWXgZLtqjwnbIV+9SmYsxgYtxVaI4gpxdVSDBU9XndP2xGrLJ/eLcW94YyjA5ur/XzAdBImkuDT8GpExkV9xQI7ZeoBhntTJp4bqidBbszPNFH6HCQe0S7QiOvJwCawDwJssBaxC7SAqh5W1KZxBuRsQFwH1kAV4J6L5K3GMxf5ql67WbbWhECBwDcw+e96NaaPteG52pIJHDo1HwcfTm88k6pCu1eKAH49xf/aH0ffd2Qe4PJ6ujRwW2lXt+5+1Xln1kl5BbRuft1qU888/SbEJIksPjlZ6VeX/U4olYle7Y8p/U96TucGnlD63uqMODQ+Cw/Z/1D27FoBi0q9JBWTbGJLWCdhiu9DqZ8h6MIhOYjoxLOmgV/HdB5YaFDViuKYv2hEFACwEkwT4I0sBaxD3YxS8SCaq20OaPR6wPcR9aRKpKXUtaViGgEDZq/mjTn1bVWTBsvaDMDgGN4shdNe77Vta6wzsHB+jYVlJQ/fvWM1vekdhV/3/XHsP9+U1ipqad+XqgSvyguJVOJpS/VnQYEJ8ZJ5AAepKxwpw7RyKnRN7R9LiXqPx6bK9W+xhZUhE6qlJ0/VOasikCLCg1QJXrGBjYtiFgLFNjk4GYR0kQat3O0GAAPkrjZcMyhwAgcVE8TOewsGGysM5iHSnMAyoF5EiSBtYidpAVR634WwjI8GdxHdpEmcBC27SE9pQnzV5P2RHWtE/G8AcAvnN6LBkGQKq6qScBnnYODE4mQudVzonWrrfU9KRn4u5HXxY1//VNo7V43lOxECwK/WdDQbuXlLc863WbFBGVbt9QBiVU+Hp8rLXKgucsXcYOwWzTgEtYLFx0iLSi4y7KFMAXLrkspTxSoDEpbBJ/NWjxrwMdkFuzXM2CRQ5ojSunxUNGGDhV3AJQD8yRIAmsRO7EuQZix7r6dVbXdEHAfWQS3qUh75h2Ei4NxGjt/+bonqjp5x4Ujid+T728AgHv4sBdNm3/q+A7WrAEjgYMzVtavfP6W1lYVEZRofO+po6HQ4dTI68bt6qk1BgkZKDF57MlJ8eEzvw1bZvyfPf9LfDw2a+xzxzbvMPbeIB/UpkKHUIfarJDIoa52FUXau9A4N9kOhs7B/uGXjL1/Eq1bV7S8DznJqAqs6HvTfEVzl03ihsHvo4VK3fzX3mUIHPSRVfV0xIYD5A34EVbQHmGhw+kcAoy04ITpqgQfk1m2VgrZRFY1W1mMqsf5HsO1BKAcmCdBEliL2ElaALXOFm1p61okm3Af2cjJlGPaZMse0mOaPH/5uieqOpGWNlbwvAHAXXzYixorGiqCbfGx7/GfziRCyIb+hdaUsWplEjr8cvve8Kdz9+swiUkJafppr1/LZYNPidyhjfeSuSSUoCTkvb/7If/5g8zXt7vXM/99rYR9+9jmkfAYTFVIuyigaN2qXt9D7VZ0CFlI5DAyuF289sXb4Rg1zZ4tz4mJHz0n9mx5XsytnhXHr87n+sRTI2+E9yuN7db/vhK6WOg83lOjr/e9r/pRtsVFGejckEiBztPSzU/F8q2VcL5JO0c0r+wf2h2KOmx0bSDRhivUJRAyTMfHL1UX1KtNSvluip0ouTjs41YWdXIkIZhxkPu8PpFRuZUWADFWBcfVFz72XE8NpNHi33D1nCukBdl3ZQSBe0k7jzsNB5zqDIgC4AuYJ0ESWIvYSdr9uqnGtS8STungPrIMci+TUh5JEZ+Qi8NZVIIbownzV9P2RPsK7Bd1kJa4wz0LgLv4sBfNiqlViVXxMecEDoIr4A+3/xAmBE1CCVNKIP986MEPoSTt+j8fTIZSwlFXorH3vXtpl0wMk2PEgS9OlHoPE5hw5rAVElWQiwMJTspCyeTLu/5dvN85HwoOdIpXaFyTqIGEK73HulxAGEL3LL2ejpV+SEBE1ztK5tP5UDluckE59uQBLeexqODChKCE5pB7c853bg4ktIqfGx3fFXyHabeemoB7g35OZvRLJaeEi3Uthjm4mFYFdLLPcdURlPSy7yxZi0opb6QEMfdV1f/Y8o2ZjirCyymbKdNWqRA4AFASzJMgBaxFLITukQyB70HDrkwPIaU8mDJ33K76WCwF95Gd0B7ydMqRfdBHiA4Uacj81bQ90U5q7ULFJ6Y/iCuT0+Y3PG8AcBQf9qIk0JNS3k5Y95GA7yC3hq0Cq9aAkcDBmRYVEQtr58P/Mi1ySMJ0dXI/63tKrFJyWFVQQclTSipH59AWVBPGJlsfmOS1S2+L6y/9h7ZPiBLjJMBZWPsoFA0UOad0HkcGtoUJ3yRBQy+dEk4iIiGZT4n8e64Fq6FLSZrgYXzzKLd42VHatSGC7qeiTh7trnnHDMFCK13f0wV0tG+pkjqdPzJYtvGgXIZdHE6mCAloYfmBEOLFqr8ib77Tgma3cyzQ0xb3RuB+sz4HQ+l8JylIj1SxWeLxcIkDeu+qbJpYMHPDULBVh31y2nEZU6xzqxf0mAZAD87Pk0A7WIvYy9kMB7NdFVefp4l5z+I+DsF9ZCHs4rAvZR1Jz6MLQoinmn6eDOH7/NXEPRGdx0MVfE7a3HaxCoEFAMAoPuxF055vlYg0+FlgVVuPUODwX3uX1/+vc+NdyjnWf0j5iRL0kf29L+RpQUGV7/Eq76KQMGR44+NibvWcrQm63AxvdFPgQAn8X7XfEb8beV3r+5IAJ/6ekeNI5+4/HhANjA5uFwMbHhOD339MSbSju81JlMh/ecuzWt83D3Q/FYW+P4kyfBYfVNH2xHUsPUdwcDDDSV4wJgUPKVByOgiCKjbccU5nLCyPlgiYmLK2tM8+Si9nU77jVrKoDYLAtK3maR6fdAxHWJSTummKVads5Z8oYHWoKvU6UyRQlDYutxoMVqJPMgD6cGqeBLWCtUjN0DOVXMpSElonqkrMZtj8i4oty10E91H9HGUhQ5LLxs6a9pD3YXGzd9ezAfNXE/dE1NqF1mwmW+9szRKkmPpcAEBl+LAXrbuFclqRXW18L/bBVL48ZtsB9oNEDlT1/fHYnDcihzyJ4/m186UEDsSvn5wUU9v3hcld+kwSOlCyjir4e/vSR8nwOC+0ph56T1fdFOqCBCbjm3cYTep/J17Q19qgaJU9iSt0fr5uqLWHCnOrZ7ULVHRSVoChIn7ytOWDa0DgYAC2ujzEAaokaMMtqgpQUTAsq5dnTmuyyylBH+1qXLbm9Nrmn50+0jYbJ7iViZGATML53cSbpn19AnhJmztTyu+0cZVb4MDnOMtWUGswj4OScG8AQBOOzpPALFiL2M3JtOtTRWI2Rys2VNPeA/eRpbAl9tGMhEC4hywpTleCqzA/yGhx4rr4z9v5q8F7otOG12ynU+6HyxVavwMADOHDXpTXFWkCPqMtlKWUJ6p0DMvLI7Hfc9bSmpLyW//6M+eszdNo56gIJjt9Sl6WJWoTQGIHStR+PDYb/kn/P/5DCXhqWRD9pFW8N8lKXxcHvng7dFlwiXuChfzodnvQye9XzykfHwmsqL2FjdCYOrzyh8qPrFcIZTvU6sQ3/mvvMlpUGIIrIbJ6Y1GA6jRXxhuB3ltKeSHDOpEWsq/m/Oy0oMo+rl7QQkJlkLGqCws4mREM/MDE2OCNUlrQNHW88qYnSd29iwOeukm1+yz4OWmK9IM6jzth3CKoBXwk8TlgaA6IcGaeBJXg41qkjvvKCLz2TatmO8j3lhH4mqVVvt+Ae8MDYE1vMZwYzVpH0n10gc+vcXg/eSLj/hK8Pq/NWUIHDZi/mrgn2smFHtrpI+LAWhEAM2Avqja/pL0mq41xKfg7xEV7VbZ6yiQucCjWgN4yqNKYHAV+o1iJbRN5q6brSF5GkMDCB2xITodjd3nKKZGDzYKFItA5V3VvEHztjl89U8ehZ0LjmsaUi+1niopnwEP4ofSzGLYs6xegumRiQc7veSlj402L9BcLqHXPZizstSyK+ZjjwZ2LPts7ciVOWsBqKwcvdQaaszZKJ3PYk6ZdC60buwx7VpXes1n3nxaBUWzcRtzm65oUyIfDA3CZtKSYsXHt4DwJzOLjWqTy+8owac8/wc9d7fb2Cdesl1fRWuYBsKa3HHYLyFrD7uTnn9E2APxMvNSn3QDZZRfZU9qMz/NXU/ZEvYm8g7pFDnzfpY0FrBUBMAf2ogrzC7tMpH2HfQbmyKTvYI3wyxuBQwQlK5/46N+cdXMoctxLNz8Tf7n5N6PHkwQlT030nW/duqL9PfthS/9810QOywUFLjYm2mkcv/L5W6WPjdqM2DTfhOKGlpviBuGReKZG/FCfWU6OAFW0KD6toxKH3kNK+QEHF9IW2pG4IXclVUYFv+AqfuVFMVcGHekJ7tx2vRIoDyyCSTuvO1kAU8raN1Z5lXaNyEaz74aD+/MljZlNujZ2vBlKCxgVrgDiDWna67aWrYBLGLciZiOLZArwjbRnxkGdgZ1eXJongVk8XYvUcl+Zgq/RqxnPQOohrGvNkKey/JDJHuwugjW9G+TYQ25ii+zrdM51iY2ja0jvG+v/ncbRqlouVoHP81fD9kRJIodLZWMtdN05zpK2V8VaEQCz/P/t3T+MXMd9B/BZX9LIAUQWShSlECFHTRrSodIkDrgJyDZigJVbnZxALiVVYZDCkoEgSkcBbsxGx5TSISErC/AhXsJGGusQXqNG8oFX2CkMmHdA4CLA4oLZm0c9rnbf7Z/3duftfj7AQqIg3s3O+ztvvu83xqJzSn+3qv8+XbQP03f4aFy4Iad78ScBh0GvH9fsPlptc+oRJ8jiBN9fP3h77Uv/r2J5g0nVGy60rDR9buKE9J/++O+GSybk7ui3s01C5xIkKcTlXeI5oq7J9BiUyOFcE9sQl+vJrb9ZKstTLMkUD6hCqZrDp+mh0tQD8BRqiH/n0/SWTdXN9czhhpJbFQ8oipviqW/sSw9BPx3zoODWBq2V/N2KwcbFVCHhx7MOmtJDmNi/v6h48yr+3hsztnWcYmA3V/nW1NYfNvTmdFVZwSdvwM3yYDh+z/Tgd3S/vZMGwLCOJj3YKc5TTU7Gtuk8SbPW7V5klcdVI1Kf3ajYTvFNu1+kcO/Mb92l+973zzluQ5octGTUeO7pWyCNIc+7r3wp9flv4sRCuked6bwRj8N0LxwnqH+Tfl7VzyjGk2t3z7vm56+NGBOl3zt6z1iMVWd+qSTdK75/znOWdb1XfC3tE8v4tO5+h6UzFl1M1bXtaunaNus9RPm6Nvr9y9eCLEIOvzPy5zhz/eKK2lK7OBEfJ4xffeFb4a2XXwvXnrucfZtnnXCNk+Lf+fm/hP+89kF49ne/3li7yu796qdj//vlC3+8lN8/at3W0H/n4Afh3q9+Fj78s38MLz7zBxm06GmxQkCb37KPVU9iMKjOCgdFBY64zf7mhb+o7efO4t+OPgnvPPzByis3dJ+7stLfP6srKzpvNUjAYYniA6pOp7OfBv9VDw2upk+8UQyltcr2SzejF4v/Z8ZybPuLvAkS32rpdDrxxv6jirbHG/vD1O7DMTexF9MDs+tV61Zu0gPp1K830lsvkx64XE9v1T1Ofbs/YYBwNfXx9YqfVdifcZmSYXm7tA+MCyJcLJVvLao9HI4LJqQHZ1dLn6qBYFVJvWnafNjpdG5VhCcupuMyvgW3V9p3R/ulaO/1CcfwvjVXWWfp+N+fcG4pHoo8OfbTMVT+f4tj5+rp6Wlnlq5q03mSZq3bvcgqj6smpe91I117Jx1nb6bJ9PIxO+76W2yv4jo8zYNX4YYK7unbI751mc4RPzxnDBnS/fTwnrpiHBlK18GXpjyeyu6k7bq218V1PX9t2Jho0j1jsd2qzm3BveITc728MKf9iiUIwFh0QaXv8FHFtag4R+6n7/C44jsU94CTftadkSpP477DwlWMZzUacIgTI68uuxFNi0s5xE+cyHrr5V549YW/XFoYYFazlv4P6e34+Nb2v//5Py8lxDGpggP19nEM58T9NYZzctpf59n+JxkslxCrNrz32Yfh7qNPGvn5MVjwt//1T8Nt9r0/eWNp2ywGTmJgI57jmF2u14I5HaVqTCxRfFBRCjlMG0y4PvLPed2q4y2KuExBxQR34aUFBsOj7dyIssKlwcb75/TdxfLDywV8nB6ezTxQSvvxxYrynBfL3yE9YJ1XLQO61OYwxdrSVQ/pq+yNWSN3r8VrqMMkt0bWVx5Vx/lprDadJ2nWGt6LrOy4atLIJGFV++s6ZsOiYd5N4p6+PdK22pvi+jeqrnFkSPe1i1RUa5V1PX9typhoisnIRc5tZe4VYbmMRReQrm2vnBPUCOUX7+Y0Gm6YpJbltWbxtZH/996yG7BMMQjwxs/fH4YBvvPp+8M3uePkYC5iW2Yt/V8YvkH+4K3h94oTuU2JJfCbent/1W+e5yb2x3uf7TzZX3NYAiHuWzuPfjTz34vH3tW9vx9WGWhy/xwn/r7Yf7Efmwo3lH3w+e7wd33/s51Gzy/xZ38/7R9NhRvmPR8tYp6QF0+o3rAi8Yby9PT0RipxtoyEenz74xt1lohMb5TcqLn9j9PDkI0t7x8HLmkQ8O0G943D1M+jD55mkrZT1Rq1dYgPxl+pa0CX9tvvNtDm+LDXG95shDSxsbL1ttt0nqRZ63QvsurjqknpmP12w8dsSNuuuG8wkT4l9/TtUbr+3ago092EvRQ2vrEp4YbCup6/NmVMlNpxY5FKgBWKbeZeEZbIWHRx6Tu8cs5yZfMqzo3ZjmuequAQ3/zc2u0erdMyFePEieM40VlMdl577sqwrHpc6iBWeWj6jd444RpDAgfHnw/bEif04kRiHcGB4nvFZTlu/tG3ht+pzmUO7lZMbsfvECdc5zXvJO3dox+FB7/+77n+7qMVTODOqry/Xvr680/218sXXg6Xn/1Go7/7wa8Phvvpw5MvwsFNVvnYAAAL+klEQVTxF8OgwryKgFFIywKcfY9vDpc2qXspjniM3f/lT8Pdo08WavO8inBK/MRjcXh++f1v1rK9YtDlg88/Dvd/+bNzQ0GLHpPznJOGAYUFfueyQxWL9E9YUQikgoDDiqUHC3fSGm11p4wP04OvO02teRsHFin5+2ZaK27e5O3jFML4Vw8HzsS3tOL2i2uapr6tYy3Bw/Rw5+MaAwPF22Rvpk9dax4W+0Pt+256a2kv9euib+3spcHbLA8il16CD+qWjqPD9PbfStbLbct5kmat071IDsdVk0aO2ddqfJv3MG27O47b+binb5c0ubOX1sgujqe6zxnFcfVxU2PJNlnH89emjIlSv94qfddFt51rDqyYsWg9YhA1LelRPM9bpJrC4/QMuuo5XhYVTjunp6dP/Yet3W6c7Xl9ZS3KQJxEfvGZ55+sJR9DAoWqJSCK4EKhCDDET5xkPUn/XIWz4MbvPfnN8c8XSn8OU7w5HSe4VVnITwwKxH320jPPp333D4dtPC+sEysAFPvj0W//Z7jvFvtqXYGbWVxLx9ssx11xzJ0dW58P235w8sXS2z6L+D2L46/4jpO+XwwzHP/f/w7PJfH4jMuDOAapcHHQ6x/roHykkv+vlUqBzTLoPyyt77a37DfXSm2/XrEW56hiXc/KhwPp4d248MdCD9wqfu7j3NYK7nQ6V0t9O+2AoFgrb29Z+0Sn07leWkdwloHLYamtS5tYLO0Ds/TrXqmdlftf6o+vHMeLvtFYse/uL+PNujSI/8ox3pY3NSdtl7qO/U3bPun3TXPuP0yf4XrH6aFQne3I9jyZw/VmE/bLNt6LVPy+Ro+rVe8PI22YZV36sIr7m4LjaKKVHUc57Ms5KF0DZz2eCnvl+/FlhxraNC4LLT1/VWnjmCj9zHFl6iuX5ZzzuxbbbL/u+9dcdDqdf8igKVNdC5o676/qerKKsfU69aGxaH3Sy3dF+6e5rj0euRZUPsereA6z1MDYuIDDzRDCfyyrAQDAwg4Gvf4V3Zi/NECourF8nGMZ3vRwdFJAI8s2t8kU+8V+Dm+UnLMfDOX08PmcfrXfwhTSg4snVnWMt+U8SXPW6V4kl+OqaaPfc9SmlcfPgXv69kqTLecFVFwLa7JO5682jInmDTiM+TnGf7BGjEXrc851rbX3D18JOISzkMNX/yMAkKt3Br3+bVsHAAAAgLaoK+AAwGb52oRve99+AACtcc+mAgAAAAAA1t2kgIOJEgBoh7g8xSPbCgAAAAAAWHcCDgDQbju2HwAAAAAAsAnGBhwGvf5xCOGuPQAAsieUCAAAAAAAbIRJFRyCCRMAyN4Dy1MAAAAAAACbYmLAYdDrx4DDkT0BALJleQoAAAAAAGBjVFVwCCZOACBbJ6otAQAAAAAAm0TAAQDa6d6g1z+27QAAAAAAgE1RGXBI63rftzcAQHbetUkAAAAAAIBNcl4Fh+i2PQIAsvIghRABAAAAAAA2xrkBh0Gv3w8hHNglACAbqjcAAAAAAAAbZ5oKDkEVBwDIxlEKHwIAAAAAAGyUqQIOg15/J06o2DUAYOVUbwAAAAAAADbStBUcggkVAFi5oxQ6BAAAAAAA2DhTBxxUcQCAlRM2BAAAAGBdPA4h7I35PLaFAZikc3p6OnXnbO12t0MIH+pNAFi6WL3hkm4HAAAAAAA21SxLVBRVHA7sLQCwdNu6HAAAAAAA2GQzBRySt+0xALBUDwa9fl+XAwAAAAAAm2zmgEOaYHlgrwGApREuBAAAAAAANt48FRyCMtkAsDR3B73+Q90NAAAAAABsurkCDoNe/1EI4b1N7zwAaNiJ6g0AAAAAAABn5q3gEN0OIRzpRwBozLuDXv9Y9wIAAAAAAITQOT09nbsbtna73RDCT/QjANTuwaDX7+pWAAAAAACAM4tUcIhLVfRDCPf1JQDUKi5Nsa1LAQAAAAAAvrRQwCHZThMxAEA94tIUj/QlAAAAAADAlxYOOKS1wb1lCgD1iEtT3NaXAAAAAAAAT6ujgkMMOdwLIXygbwFgIZamAAAAAAAAmKCWgEPybgjhQEcDwNy2LU0BAAAAAAAwXm0Bh9JSFSf6GgBmdjdVRAIAAAAAAGCMOis4xJDDwxDC2zoaAGZy4PoJAAAAAABQrXN6elp7F23tdndCCK/rewA4V6x8dMXSFAAAAAAAANUaCTiEs5BDrOZwWf8DQKW/GvT6fV0EAAAAAABQrdYlKkZ0QwhH+h8AJnpDuAEAAAAAAGA6jQUcBr3+cQjhZiq9DQA87e6g19/RJwAAAAAAANNpbImKwtZuN1Zy+IntAQBP3B/0+jd1BwAAAAAAwPSaXKJiKJXefsM2AYChgxDCtq4AAAAAAACYTeMBh3AWctgRcgCAYbihm5ZxAgAAAAAAYAZLCTgEIQcAEG4AAAAAAABYwNICDkHIAYDNJdwAAAAAAACwoKUGHIKQAwCbR7gBAAAAAACgBksPOAQhBwA2h3ADAAAAAABATVYScAhCDgCsP+EGAAAAAACAGq0s4BCeDjmc2KgArJH7wg0AAAAAAAD16pyenq68S7d2u1dCCP0QwrMrbwwALObuoNff1ocAAAAAAAD1WmkFh8Kg138Y33RN5bwBoK3eEW4AAAAAAABoRhYVHApbu90LIYS4bMWrebQIAKYSl1raHvT693QXAAAAAABAM7IKOBS2drvvhhC+l0drAKDSQQo3PNRNAAAAAAAAzcky4BDOQg43UzWHZzNoDgCMczeE8Pag1z/WOwAAAAAAAM3KNuAQzkIOl1LI4VoGzQGAwkkKNuzoEQAAAAAAgOXIOuBQsGQFABmxJAUAAAAAAMAKtCLgEM5CDldSNYfLGTQHgM303qDXf9e2BwAAAAAAWL7WBBwKqjkAsAKqNgAAAAAAAKxY6wIO4ctqDrdDCNcyaA4A6+skXm9UbQAAAAAAAFi9VgYcClu73e0UdHg2jxYBsEbuhxDeHvT6j2xUAAAAAACA1Wt1wCGchRwuhBDim7VvZdAcANrvIAUb+rYlAAAAAABAPlofcChs7XYvpaDD63m0CICWOYrXkUGvv2PDAQAAAAAA5GdtAg6Frd3ulbRsxbU8WgRA5k5SsOG2DQUAAAAAAJCvtQs4FLZ2u91YYjyE8GoeLQIgM0ep8s+9Qa9/bOMAAAAAAADkbW0DDgVLVwAwwlIUAAAAAAAALbT2AYfC1m73QqrosB1CeDGPVgGwRPfjEkaDXr+v0wEAAAAAANpnYwIOZVu73Zsp6GD5CoD1Fqs1xEoNO4Ne/5FtDQAAAAAA0F4bGXAopKoO2+lzOY9WAbCgkxDCvRRqUK0BAAAAAABgTWx0wKFsa7d7KYRwM32u5dMyAKYQKzXEMMO9Qa9/T4cBAAAAAACsHwGHMVJlhxh06KbPi9k1EoAHpVDDw43vDQAAAAAAgDUn4DCFVN2hK/AAsDJx2YmHKdDQt/QEAAAAAADA5hFwmEOq8HAlhR0upY9lLQDqEZebeJTCDDHU8EiFBgAAAAAAAAQcalQKPhT/DKU/h/TPy63/ogDzKaowFOK/H6fP8N8FGQAAAAAAAJhEwAEAAAAAAAAAyN7XbCIAAAAAAAAAIHcCDgAAAAAAAABA9gQcAAAAAAAAAIDsCTgAAAAAAAAAANkTcAAAAAAAAAAAsifgAAAAAAAAAABkT8ABAAAAAAAAAMiegAMAAAAAAAAAkD0BBwAAAAAAAAAgewIOAAAAAAAAAED2BBwAAAAAAAAAgOwJOAAAAAAAAAAA2RNwAAAAAAAAAACyJ+AAAAAAAAAAAGRPwAEAAAAAAAAAyJ6AAwAAAAAAAACQPQEHAAAAAAAAACB7Ag4AAAAAAAAAQPYEHAAAAAAAAACA7Ak4AAAAAAAAAADZE3AAAAAAAAAAALIn4AAAAAAAAAAAZE/AAQAAAAAAAADInoADAAAAAAAAAJA9AQcAAAAAAAAAIHsCDgAAAAAAAABA9gQcAAAAAAAAAIDsCTgAAAAAAAAAANkTcAAAAAAAAAAAsifgAAAAAAAAAABkT8ABAAAAAAAAAMiegAMAAAAAAAAAkD0BBwAAAAAAAAAgewIOAAAAAAAAAEDeQgj/D4ABRh6ANz5MAAAAAElFTkSuQmCC";async function yp(){let r=new Image;return r.src=cp,await r.decode(),r}function gp(r,e,t,n,i,o,s,u=0){let a=new Qe;a.name="\u5899\u9762\u6807\u8BC6_"+t,a.position.set(...s),a.rotation.y=u,a.userData={\u5B89\u88C5:"\u5899\u9762\u8D34\u88C5",\u6807\u8BC6:t},r.add(a);let f=document.createElement("canvas");f.width=1536,f.height=Math.round(f.width*o/i);let h=f.getContext("2d");h.fillStyle="#f6f7f2",h.fillRect(0,0,f.width,f.height),h.fillStyle="#00a844",h.fillRect(0,0,19,f.height);let p=Math.min(f.height*.27,93),m=p*e.width/e.height;h.drawImage(e,35,15,m,p),h.fillStyle="#203d35",h.font=`600 ${Math.round(f.height*.25)}px "PingFang SC",sans-serif`,h.textAlign="center",h.fillText(t,f.width/2,f.height*.64,f.width-90),h.fillStyle="#65766d",h.font=`${Math.round(f.height*.13)}px "PingFang SC",sans-serif`,h.fillText(n,f.width/2,f.height*.88,f.width-90);let q=new Et(f);q.colorSpace=mt;let g=new st(new At(i,o,.012),Ie.plastic);a.add(g);let v=new st(new nn(i-.012,o-.012),new lt({map:q,roughness:.73,metalness:0}));return v.position.z=.007,a.add(v),a}function vp(r,{name:e,x:t,z:n,w:i,d:o}){let a=i+.24+.14,f=o+.12*2+.07*2,h=new Qe;h.name="\u9EC4\u8272\u5B9A\u4F4D\u6846_"+e,h.position.set(t,.004,n),h.userData={lineWidth_m:.07,\u684C\u53F0:e,\u684C\u53F0\u5C3A\u5BF8\u7C73:[i,o],\u5185\u51C0\u7559\u7A7A\u7C73:.12},r.add(h);let p=new lt({color:"#edc329",roughness:.56,metalness:0});p.name="\u9EC4\u8272\u5730\u576A\u6CB9\u6F06";for(let m of[-f/2+.07/2,f/2-.07/2]){let q=new st(new At(a,.002,.07),p);q.position.z=m,h.add(q)}for(let m of[-a/2+.07/2,a/2-.07/2]){let q=new st(new At(.07,.002,f-.14),p);q.position.x=m,h.add(q)}return h}function F3(r){let e=r*374761393+668265263|0;return e=(e^e>>>13)*1274126177,((e^e>>>16)>>>0)/4294967295}function Vf(r,e,t,n,i,o=0){let u=document.createElement("canvas");u.width=u.height=512;let a=u.getContext("2d"),f=a.createImageData(512,512);for(let m=0;m<512*512;m++){let q=250+(F3(m)-.5)*n;f.data[m*4]=f.data[m*4+1]=f.data[m*4+2]=q,f.data[m*4+3]=255}a.putImageData(f,0,0);let h=new Et(u);return h.wrapS=h.wrapT=gn,h.repeat.set(...i),h.colorSpace=mt,new ln({name:r,color:e,map:h,roughness:t,metalness:0,clearcoat:o,clearcoatRoughness:.32,envMapIntensity:.65})}var Fi={wall:Vf("\u5E73\u6ED1\u6696\u767D\u4E73\u80F6\u6F06","#efeee8",.88,2,[4,1.3]),floor:Vf("\u5E73\u6ED1\u4E2D\u7070\u6D82\u88C5\u5730\u576A","#52595d",.36,3,[4.4,3.9],.12),ceiling:Vf("\u6696\u767D\u7EC6\u7EB9\u540A\u9876\u677F","#e9e9e3",.91,5,[1,1])},R3=new lt({name:"\u767D\u8272\u540A\u9876T\u578B\u9F99\u9AA8",color:"#d8d9d3",metalness:.12,roughness:.65});function Uf(r,e,t,n,i=0){let o=Math.ceil(e/.6),s=Math.ceil(t/.6),u=e/o,a=t/s,f=new vo(new At(u-.019,.015,a-.019),Fi.ceiling,o*s),h=new at;f.name="\u7EC6\u7EB9\u540A\u9876\u677F\u4E0E\u771F\u5B9E\u677F\u7F1D";let p=0;for(let q=0;q<o;q++)for(let g=0;g<s;g++)h.makeTranslation(i-e/2+(q+.5)*u,n+.0075,-t/2+(g+.5)*a),f.setMatrixAt(p++,h);f.receiveShadow=!0,r.add(f);let m=(q,g,v,y,c,I)=>{let O=new st(new At(q,g,v),R3);O.position.set(y,c,I),O.receiveShadow=!0,r.add(O)};for(let q=0;q<=o;q++)m(.019,.012,t,i-e/2+q*u,n-.002,0);for(let q=0;q<=s;q++)m(e,.012,.019,i,n-.002,-t/2+q*a)}function lp(r,e,t){let n=new Qe;n.name="\u897F\u4FA7\u76F8\u90BB\u4F1A\u8BAE\u5BA4_\u89C6\u9891\u80CC\u666F\u793A\u610F",n.userData={\u4F9D\u636E:"\u7528\u6237\u89C6\u989119.8\u81F321\u79D2",\u5C3A\u5BF8:"\u672A\u5B9E\u6D4B\uFF0C\u4EC5\u7528\u4F5C\u73BB\u7483\u5916\u4FA7\u666F\u6DF1\u793A\u610F",\u4E0D\u8BA1\u5165\u6253\u5370\u623F\u51C0\u5C3A\u5BF8:!0};let i=6.2,o=r-i/2,s=Fi.wall,u=(j,A,P,L,K,H,C)=>{let Y=new st(new At(j,A,P),C);return Y.position.set(L,K,H),Y.castShadow=!0,Y.receiveShadow=!0,n.add(Y),Y},a=new lt({color:"#394047",roughness:.72}),f=new lt({color:"#b8bec0",metalness:.85,roughness:.29}),h=new lt({color:"#d8d9d2",roughness:.52}),p=new lt({color:"#6f303b",roughness:.86}),m=new lt({color:"#353e43",roughness:.86});u(i,.12,e,o,-.06,0,Fi.floor),u(.12,t,e,o-i/2,t/2,0,s),u(i,t,.12,o,t/2,e/2,s),u(.025,.14,e,o-i/2+.075,.07,0,a),u(i,.14,.025,o,.07,e/2-.075,a);let q=1.13,g=.28,v=2.17,y=-e/2;u(i,g,.12,o,g/2,y,s),u(i,t-v,.12,o,(t+v)/2,y,s);let c=new Mn({color:"#ccd4cd"}),I=o-i/2;for(let j of[o-2,o,o+2]){let A=j-q/2,P=j+q/2;u(A-I,v-g,.12,(A+I)/2,(v+g)/2,y,s),I=P,u(q,v-g,.012,j,(v+g)/2,y,c);for(let L of[A,P])u(.045,v-g,.08,L,(v+g)/2,y+.02,h);for(let L of[g,1.03,1.54,v])u(q,.04,.08,j,L,y+.025,h);u(q+.3,.14,.06,j,2.36,y+.03,new lt({color:"#28536a",roughness:.8}));for(let L=0;L<15;L++)u(.05,.62,.14,j-.7+L*.1,.43,y+.25,h)}u(o+i/2-I,v-g,.12,(o+i/2+I)/2,(v+g)/2,y,s),Uf(n,i,e,t,o);for(let j of[o-1.5,o+1.5])for(let A of[-2.45,0,2.45]){u(.56,.04,.56,j,t-.026,A,f),u(.5,.01,.5,j,t-.052,A,a);for(let P=0;P<3;P++)u(.43,.014,.06,j,t-.065,A+(P-1)*.135,h)}function O(j,A,P,L){let K=new Qe;K.name="\u4F1A\u8BAE\u5BA4\u6D45\u8272\u62FC\u63A5\u957F\u684C",n.add(K),K.position.set(j,0,A);let H=(C,Y,X,D,w,N,U)=>{let B=new st(new At(C,Y,X),U);B.position.set(D,w,N),B.castShadow=B.receiveShadow=!0,K.add(B)};H(P,.035,L,0,.745,0,h),H(P-.06,.085,.035,0,.685,-L/2+.055,a);for(let C of[-P/2+.09,P/2-.09])for(let Y of[-L/2+.09,L/2-.09])H(.033,.73,.033,C,.365,Y,f)}function l(j,A,P,L){let K=new Qe;K.name=L===p?"\u4F1A\u8BAE\u5BA4\u7EA2\u8272\u91D1\u5C5E\u67B6\u6905":"\u4F1A\u8BAE\u5BA4\u6DF1\u8272\u91D1\u5C5E\u67B6\u6905",K.position.set(j,0,A),K.rotation.y=P,n.add(K);let H=(X,D,w,N,U)=>{let B=new st(new Zi(X,D,w,3,.013),L);return B.position.set(0,N,U),B.castShadow=B.receiveShadow=!0,K.add(B),B};H(.43,.052,.42,.446,0);let C=H(.425,.29,.052,.7,.19);C.rotation.x=.1;let Y=(X,D,w=.012)=>{let N=new M(...D).sub(new M(...X)),U=new st(new wn(w,w,N.length(),12),f);U.position.copy(new M(...X).add(new M(...D)).multiplyScalar(.5)),U.quaternion.setFromUnitVectors(new M(0,1,0),N.normalize()),U.castShadow=!0,K.add(U)};for(let X of[-.19,.19])Y([X,.012,-.17],[X,.426,-.17]),Y([X,.012,.17],[X,.846,.218]),Y([X,.24,-.17],[X,.24,.182]);Y([-.19,.42,-.17],[.19,.42,-.17])}for(let j of[-2.7,-.9,.9])O(o-i/2+.77,j,1.12,1.72),l(o-i/2+1.63,j,Math.PI/2,p);for(let j of[o-1,o+.55,o+2.1])O(j,-2.65,1.5,.72),l(j,-1.96,0,m);O(o-.6,1.97,2.8,.76);for(let j of[o-1.5,o-.6,o+.3])l(j,2.7,0,p);return n.visible=!1,n}async function V3(){let n=document.querySelector("#viewport"),i=new vr;i.background=new Re("#dedfdd");let o=new Qe;o.name="3D\u6253\u5370\u623F\u95F4\u89C4\u5212_\u7C73",i.add(o);let s=new Qe,u=new Qe,a=new Qe,f=new Qe,h=new Qe,p=new Qe;s.name="\u89C6\u9891\u53C2\u7167\u5EFA\u7B51_\u95E8\u7A97\u4F4D\u7F6E\u4F30\u7B97",u.name="\u89C4\u5212\u8BBE\u5907\u4E0E\u8017\u6750",a.name="\u540A\u9876",f.name="\u5357\u4FA7\u95E8\u5899",h.name="\u897F\u4FA7\u73BB\u7483\u9694\u65AD",p.name="\u5C3A\u5BF8\u8F85\u52A9",o.add(s,u,a,f,h),i.add(p);let m=new Ru({antialias:!0,preserveDrawingBuffer:!0});m.setPixelRatio(Math.min(devicePixelRatio,2)),m.shadowMap.enabled=!0,m.shadowMap.type=_s,m.outputColorSpace=mt,m.toneMapping=su,m.toneMappingExposure=1,n.prepend(m.domElement);let q=new Ct(43,1,.03,120),g=new Qu(q,m.domElement);g.enableDamping=!0,g.dampingFactor=.09,g.minDistance=.55,g.maxDistance=48,g.maxPolarAngle=Math.PI*.48,i.add(new Do("#f8f8f3",.15)),i.add(new Go("#f4f6f8","#555956",.85));let v=new Si("#fffaed",2.3);v.position.set(1,11,-7),v.castShadow=!0,v.shadow.mapSize.set(2048,2048),Object.assign(v.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:30}),v.shadow.bias=-4e-4,v.shadow.normalBias=.012,v.shadow.radius=3,i.add(v);let y=new Si("#eff4fa",.6);y.position.set(6,5,7),i.add(y);let c={};function I(z,k=0,E=.6){let ne=`${z}_${k}_${E}`;return c[ne]??=new lt({color:z,metalness:k,roughness:E})}let[O,l]=await Promise.all([sp(m),yp(),op(m)]);i.environment=O,i.environmentIntensity=.8;let j=dn("\u6CE8\u5851\u5851\u6599","#e8e9e4",.12,.58),A=Fi.wall,P=Ie.powderSteel,L=Ie.charcoal,K=Ie.rubber,H=Ie.wood,C=Fi.floor,Y=Ie.aluminium,X=new ln({color:"#d0e0d9",transparent:!0,opacity:.17,roughness:.06,metalness:0,transmission:.16,thickness:.004,ior:1.52,depthWrite:!1,side:Ot});X.name="\u900F\u660E\u5EFA\u7B51\u73BB\u7483";let D=new Map;function w(z,k,E,ne,qe,Xe,Ze,Be,Ce=!0){let Fe=`${k},${E},${ne}`;D.has(Fe)||D.set(Fe,new At(k,E,ne));let rt=new st(D.get(Fe),Be);return rt.position.set(qe,Xe,Ze),rt.castShadow=Ce,rt.receiveShadow=!0,z.add(rt),rt}function N(z,k,E,ne,qe,Xe,Ze,Be="y",Ce=24){let Fe=new st(new wn(k,k,E,Ce),Ze);return Fe.position.set(ne,qe,Xe),Be==="z"&&(Fe.rotation.x=Math.PI/2),Be==="x"&&(Fe.rotation.z=Math.PI/2),Fe.castShadow=!0,z.add(Fe),Fe}function U(z,k,E="#6d91a1",ne=!1){let qe=new Xt().setFromPoints(k.map(Ze=>new M(...Ze))),Xe=new lo(qe,ne?new So({color:E,dashSize:.13,gapSize:.09}):new Dr({color:E}));return ne&&Xe.computeLineDistances(),z.add(Xe),Xe}function B(z,k="#253c47",E="#eef6f8",ne=512,qe=128){let Xe=document.createElement("canvas");Xe.width=ne,Xe.height=qe;let Ze=Xe.getContext("2d");Ze.fillStyle=k,Ze.fillRect(0,0,ne,qe),Ze.fillStyle=E,Ze.font=`500 ${qe*.43}px "PingFang SC",sans-serif`,Ze.textAlign="center",Ze.textBaseline="middle",Ze.fillText(z,ne/2,qe/2);let Be=new Et(Xe);return Be.colorSpace=mt,Be}function ce(z,k,E,ne,qe,Xe,Ze,Be,Ce=0){let Fe=new st(new nn(E,ne),new Mn({map:B(k,Be),side:Ot}));return Fe.position.set(qe,Xe,Ze),Fe.rotation.y=Ce,z.add(Fe),Fe}function ve(z,k,E=.05,ne="#71828c"){let qe=new lr(k.map(Ze=>new M(...Ze))),Xe=new st(new Wr(qe,40,E,8,!1),I(ne,.35,.7));return z.add(Xe),Xe}w(s,8.87+.3,.16,7.81+.3,0,-.08,0,C);let de=new Vo(new nn(8.87,7.81),{textureWidth:Math.min(innerWidth,1024),textureHeight:Math.min(innerHeight,1024),color:10067870,clipBias:.004});de.name="\u5730\u576A\u5B9E\u65F6\u67D4\u548C\u53CD\u5C04",de.rotation.x=-Math.PI/2,de.position.y=.001,de.material.transparent=!0,de.material.depthWrite=!1,de.material.fragmentShader=de.material.fragmentShader.replace("gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );","gl_FragColor = vec4( blendOverlay( base.rgb, color ), 0.065 );").replace("texture2DProj( tDiffuse, vUv )","texture2DProj( tDiffuse, vUv, 3.5 )"),de.getRenderTarget().texture.generateMipmaps=!0,de.getRenderTarget().texture.minFilter=on,i.add(de),w(s,8.87+.5,.12,7.81+.5,0,-.22,0,I("#f0f5f7")),w(s,.15,2.64,7.81,-8.87/2-.075,2.64/2,0,A),w(s,.025,.15,7.81,-8.87/2+.014,.075,0,L);let We=[-2.65,0,2.65],Ne=1.15,_e=.27,Ve=2.17;w(s,8.87,.27,.15,0,.135,-7.81/2-.075,A),w(s,8.87,2.64-Ve,.15,0,(2.64+Ve)/2,-7.81/2-.075,A);let _=-8.87/2;for(let z of We){let k=z-Ne/2,E=z+Ne/2;w(s,k-_,Ve-_e,.15,(k+_)/2,(Ve+_e)/2,-7.81/2-.075,A),_=E,w(s,Ne,Ve-_e,.025,z,(Ve+_e)/2,-7.81/2,X,!1);for(let qe of[-Ne/2,Ne/2])w(s,.052,Ve-_e,.09,z+qe,(Ve+_e)/2,-7.81/2+.015,j);for(let qe of[_e,1.03,1.54,Ve])w(s,Ne,.04,.09,z,qe,-7.81/2+.015,j);w(s,Ne+.17,.055,.17,z,_e,-7.81/2+.06,j),w(s,Ne+.32,.16,.06,z,2.36,-7.81/2+.045,I("#235774"));for(let qe of[.44,.66,.88])w(s,Ne,.018,.02,z,qe,-7.81/2+.065,P);let ne=new Qe;ne.name="\u539F\u6709\u6696\u6C14\u7247",s.add(ne);for(let qe=0;qe<17;qe++)w(ne,.048,.63,.15,z-.82+qe*.102,.43,-7.81/2+.28,j);for(let qe of[.12,.74])w(ne,1.76,.045,.16,z,qe,-7.81/2+.28,j)}w(s,8.87/2-_,Ve-_e,.15,(8.87/2+_)/2,(Ve+_e)/2,-7.81/2-.075,A);for(let z of[.07,.14])N(s,.016,8.87-.2,0,z,-7.81/2+.2,Y,"x");for(let z of[-3.61,-3.39])N(s,.025,2.64-.1,-4.22,(2.64-.1)/2,z,Y);let re=1.02,je=2.13,Se=8.87/2-re/2-.08,we=Se-re/2,tt=Se+re/2;w(f,we+8.87/2,2.64,.15,(we-8.87/2)/2,2.64/2,7.81/2+.075,A),w(f,8.87/2-tt,2.64,.15,(tt+8.87/2)/2,2.64/2,7.81/2+.075,A),w(f,re,2.64-je,.15,Se,(2.64+je)/2,7.81/2+.075,A);for(let z of[we,tt])w(f,.06,je,.1,z,je/2,7.81/2-.015,P);w(f,re,.06,.1,Se,je,7.81/2-.015,P),w(f,re-.07,je-.03,.055,Se,je/2,7.81/2+.02,I("#c5c1a0")),w(f,.15,.71,.07,Se+.04,1.45,7.81/2+.017,X),w(f,.15,.02,.1,Se-.32,1.02,7.81/2-.035,Y);let ht=2.75,S=1.1;w(h,.04,.06,7.81,8.87/2,.03,0,Y),w(h,.06,.06,7.81,8.87/2,2.56,0,Y);let ie=[-7.81/2,-2.6,-1.25,.1,1.45,ht-S/2,ht+S/2,7.81/2];for(let z of ie)w(h,.07,2.56,.05,8.87/2,1.28,z,j);for(let z=0;z<ie.length-1;z++){let k=ie[z],E=ie[z+1];w(h,.018,2.45,E-k-.06,8.87/2,1.28,(k+E)/2,X,!1),w(h,.07,.05,E-k,8.87/2,1.17,(k+E)/2,j),w(h,.07,.05,E-k,8.87/2,2.21,(k+E)/2,j)}w(h,.12,.28,.024,8.87/2-.025,1.18,ht-.32,L),U(s,[[8.87/2,.008,-7.81/2],[8.87/2,.008,7.81/2]],"#d6e7ed");let ee=new Qe;ee.name="\u539F\u6709\u7ACB\u5F0F\u7A7A\u8C03_\u4F4D\u7F6E\u4F30\u7B97",s.add(ee),ee.position.set(3.94,0,-3.41),w(ee,.5,1.8,.34,0,.9,0,j),w(ee,.44,.035,.28,0,.04,0,Y);for(let z=0;z<9;z++)w(ee,.37,.012,.014,0,1.47+z*.022,.178,P,!1);w(ee,.09,.2,.014,0,1.18,.181,K),w(ee,.05,.025,.016,0,1.2,.19,I("#468f9f")),Uf(a,8.87,7.81,2.64);for(let z of[-2.2,.1,2.4])for(let k of[-2.45,0,2.45]){w(a,.56,.05,.56,z,2.64-.035,k,Y),w(a,.51,.012,.51,z,2.64-.063,k,L);for(let E=0;E<3;E++)w(a,.42,.015,.065,z,2.64-.077,k+(E-1)*.135,j,!1)}w(a,8.87,.18,.3,0,2.46,-3.18,A),w(a,.3,.18,7.81,3.7,2.46,0,A);let $=[],Q=[];function ye(z,k,E){w(z,k,.06,E,0,.77,0,H);for(let ne of[-k/2+.08,k/2-.08])for(let qe of[-E/2+.08,E/2-.08])w(z,.055,.72,.055,ne,.38,qe,P),w(z,.075,.026,.075,ne,.013,qe,K);for(let ne of[-E/2+.08,E/2-.08])w(z,k-.12,.045,.04,0,.31,ne,P)}function he(z,k,E,ne,qe,Xe="z"){return $u(z,k,E,ne,qe,Xe)}function ge(z){return hp(z)}function Ee(z,k){return pp(z,k)}let Te=new Qe;Te.name="H2S\u72EC\u7ACB\u5DE5\u4F4D",Te.position.set(-2.8,0,-2.65),u.add(Te),ye(Te,1.6,1.05);let x=ge(Te);x.position.x=-.23,w(Te,.29,.025,.35,.43,.83,.04,L);for(let z=0;z<3;z++)w(Te,.3,.013,.35,.43,.855+z*.017,.04,I("#cebb94"));$.push({obj:Te,id:"h2s"}),Q.push({x:-2.8,z:-2.65,w:1.6,d:1.05});let d=new Qe;d.name="A2L\u53CC\u673A\u957F\u53F0",d.position.set(-3.68,0,.22),d.rotation.y=Math.PI/2,u.add(d),ye(d,2.6,.95),Ee(d,-.66),Ee(d,.66),$.push({obj:d,id:"a2l"}),Q.push({x:-3.68,z:.22,w:.95,d:2.6});let W=new Qe;W.name="\u767D\u8272\u8017\u6750\u6599\u76D8\u6EDA\u8F6E\u67B6_\u4E24\u7EC4120\u5377\u793A\u610F",u.add(W);let R=[["PLA","PLA","PLA","PETG","PETG"].map(z=>[z]),[["PLA"],["PETG"],["PETG"],["TPU","ABS","ASA"],["PA","PC","PVA"]]],oe=0,V={};for(let z=0;z<2;z++){let k=new Qe;k.name=`\u767D\u8272\u6599\u76D8\u67B6${z+1}_1200x500x2000\u6BEB\u7C73`,k.position.set(-1.7+z*1.35,0,3.57),W.add(k),mp(k,R[z]),oe+=k.userData.\u603B\u5BB9\u91CF;for(let[E,ne]of Object.entries(k.userData.\u5206\u7C7B\u5BB9\u91CF))V[E]=(V[E]??0)+ne;Q.push({x:k.position.x,z:3.57,w:1.2,d:.5})}$.push({obj:W,id:"racks"}),Q.push({x:3.94,z:-3.41,w:.5,d:.34,fixed:!0});for(let z of We)Q.push({x:z,z:-7.81/2+.28,w:1.8,d:.2,fixed:!0});function Ye(z){z.traverse(k=>{if(k.position.x=-k.position.x,k.isLine){let E=k.geometry.getAttribute("position");for(let ne=0;ne<E.count;ne++)E.setX(ne,-E.getX(ne));E.needsUpdate=!0,k.geometry.computeBoundingSphere()}})}Ye(s),Ye(a),Ye(f),Ye(h),Te.position.x=-Te.position.x;for(let z of Te.children)z.position.x=-z.position.x;d.position.x=-d.position.x,d.rotation.y=-d.rotation.y;for(let z of W.children)z.position.x=-z.position.x;for(let z of Q)z.x=-z.x;let me=lp(-8.87/2,7.81,2.64);i.add(me);let Le=new Qe;Le.name="\u4E1C\u5357\u89D2\u6210\u54C1\u4E94\u5C42\u8D27\u67B6_1800x600x2000\u6BEB\u7C73",Le.position.set(3.92,0,2.8),Le.rotation.y=-Math.PI/2,u.add(Le),qp(Le),$.push({obj:Le,id:"finished"}),Q.push({x:3.92,z:2.8,w:.6,d:1.8});let xe=new Qe;xe.name="\u684C\u4F4D\u9EC4\u8272\u6CB9\u6F06\u5B9A\u4F4D\u7EBF_\u5BBD70\u6BEB\u7C73",o.add(xe);let ue=[{name:"H2S\u72EC\u7ACB\u5DE5\u4F5C\u53F0",x:2.8,z:-2.65,w:1.6,d:1.05},{name:"A2L\u53CC\u673A\u5DE5\u4F5C\u53F0",x:3.68,z:.22,w:.95,d:2.6}],Oe=[{name:"\u4E1C\u5357\u89D2\u6210\u54C1\u8D27\u67B6",x:3.92,z:2.8,w:.6,d:1.8}];for(let z of[...ue,...Oe])vp(xe,z);let ke=new Qe;ke.name="\u5609\u65B0\u5899\u9762\u8D34\u88C5\u6807\u8BC6",o.add(ke);function De(z,k,E,ne,qe,Xe,Ze){let Be=gp(ke,l,z,k,E,ne,qe,Xe);return Be.userData.\u5BF9\u5E94\u7269\u54C1=Ze,Be}let He=De("H2S \u6FC0\u5149\u5168\u80FD\u533A","H2S \xB7 01",.55,.16,[3.03,2.535,-3.894],0,x.name);He.userData.mount="north";for(let[z,k]of[[1,-.44],[2,.88]])De("A2L \xB7 "+String(z).padStart(2,"0"),"\u53CC\u673A\u6253\u5370\u533A",.48,.18,[4.424,1.86,k],-Math.PI/2,"A2L\u6253\u5370\u673A"+z);De("\u6253\u5370\u6210\u54C1\u6682\u653E\u533A","\u4E94\u5C42\u5206\u7C7B\u5B58\u653E",.64,.2,[4.424,2.18,2.8],-Math.PI/2,Le.name);let Ue=W.children.map((z,k)=>{let E=De(["\u5E38\u7528\u8017\u6750\u67B6","\u5E38\u7528 / \u7279\u6B8A\u8017\u6750\u67B6"][k],k===0?"PLA / PETG":"\u5E38\u7528\u4F18\u5148 \xB7 \u7279\u6B8A\u5206\u7C7B",.55,.18,[z.position.x,2.15,3.894],Math.PI,z.name);return E.userData.mount="south",E});function G(z,k,E,ne,qe){let Xe=new st(new nn(z,k),new Mn({color:qe,transparent:!0,opacity:.13,depthWrite:!1,side:Ot}));Xe.rotation.x=-Math.PI/2,Xe.position.set(E,.009,ne),p.add(Xe)}let ae=2.53,le=-2.7,Me=3.4;for(let z of[ae-.6,ae+.6])U(p,[[z,.02,le],[z,.02,Me]],"#d8e9e5",!0);let fe=[];function te(z,k,E="",ne="measure"){let qe=document.createElement("div");qe.className=`label ${E}`,qe.textContent=z,document.querySelector("#labels").append(qe),fe.push({el:qe,pos:new M(-k[0],k[1],k[2]),kind:ne})}function Ge(z,k,E,ne){U(p,[z,k],"#7192a4");let qe=k[0]-z[0],Xe=k[2]-z[2],Ze=Math.hypot(qe,Xe),Be=-Xe/Ze*.09,Ce=qe/Ze*.09;for(let Fe of[z,k])U(p,[[Fe[0]-Be,Fe[1],Fe[2]-Ce],[Fe[0]+Be,Fe[1],Fe[2]+Ce]],"#7192a4");te(E,ne??[(z[0]+k[0])/2,z[1]+.06,(z[2]+k[2])/2],"measure")}Ge([-8.87/2,.015,4.69],[8.87/2,.015,4.69],"\u4E1C\u897F 8.87 \u7C73"),Ge([4.85,.015,-7.81/2],[4.85,.015,7.81/2],"\u5357\u5317 7.81 \u7C73"),U(p,[[-4.6,0,-3.6],[-4.6,2.64,-3.6]],"#7192a4"),te("\u51C0\u9AD8 2.64 \u7C73",[-4.55,2.85,0],"measure"),Ge([ae-.6,.02,1.4],[ae+.6,.02,1.4],"\u901A\u884C\u5E26 1.20 \u7C73",[ae,.07,1.4]),te("\u5317 \xB7 \u7A97\u6237\u9762",[0,2.51,-7.81/2],"direction","direction"),te("\u897F \xB7 \u73BB\u7483\u5899",[8.87/2,.22,-.85],"direction","direction"),te("\u4E1C \xB7 \u5B9E\u5899",[-8.87/2,2.6,.8],"direction","direction"),te("\u5357 \xB7 \u95E8\u5728\u897F\u5357\u89D2",[-2.7,.08,7.81/2+.18],"direction","direction"),te("\u95E8 \xB7 \u897F\u5357\u89D2",[Se,.1,3.72],"","architecture"),p.scale.x=-1;let Ae="overview",ut=-Math.PI/2,ot=0,hn=!1,vt=new Set,Kn={x:0,y:0};function pn(){me.visible=Ae==="walk";let z=Ae==="walk"||Ae==="overview"&&hn;a.visible=z,f.visible=z,h.visible=Ae!=="plan",h.traverse(k=>{k.isMesh&&k!==h&&(k.visible=z)}),ke.visible=Ae!=="plan",Ue.forEach(k=>k.visible=z),document.querySelector("#structure").checked=z,document.querySelector("#structure").disabled=Ae!=="overview"}function rr(z){Ae=z,document.body.classList.toggle("walk",Ae==="walk"),document.querySelectorAll("[data-view]").forEach(k=>k.classList.toggle("active",k.dataset.view===Ae)),g.enabled=Ae!=="walk",Kn.x=Kn.y=0,vt.clear(),ei(),Ae==="overview"&&(g.enableRotate=!0,q.up.set(0,1,0),q.position.set(-11.1,10,12.6),g.target.set(0,.38,0),q.lookAt(g.target),g.update()),Ae==="plan"&&(g.enableRotate=!1,q.up.set(0,0,-1),q.position.set(0,15,0),g.target.set(0,0,0),q.lookAt(g.target),g.update()),Ae==="walk"&&(q.up.set(0,1,0),q.position.set(-2.6,1.6,2.75),ut=-Math.PI/2,ot=-.06,$r()),pn(),T(),document.querySelector("#hint").textContent=Ae==="walk"?"\u7535\u8111 W/A/S/D \u6216\u65B9\u5411\u952E\u79FB\u52A8 \xB7 \u62D6\u52A8\u8F6C\u5934 \xB7 \u624B\u673A\u5DE6\u6447\u6746\u53F3\u6ED1\u52A8":Ae==="plan"?"\u6B63\u4E0A\u65B9\u67E5\u770B \xB7 \u53CC\u6307\u7F29\u653E / \u62D6\u52A8\u5E73\u79FB \xB7 \u5C3A\u5BF8\u5355\u4F4D\uFF1A\u7C73":"\u62D6\u52A8\u65CB\u8F6C \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u70B9\u51FB\u8BBE\u5907\u67E5\u770B"}function $r(){q.rotation.order="YXZ",q.rotation.set(ot,ut,0)}let _o={h2s:["\u6FC0\u5149 / \u5168\u80FD\u5DE5\u4F4D","\u4F9D\u636E\u4F60\u63D0\u4F9B\u7684\u7EFF\u8272\u73BB\u7483\u6FC0\u5149\u7248\u7167\u7247\u7EC6\u5316\uFF1A\u5706\u89D2\u4FA7\u677F\u3001\u5DE6\u4E0A\u89E6\u5C4F\u3001\u95E8\u6846\u3001\u5185\u90E8\u5BFC\u8F68\u3001\u6253\u5370\u5E73\u53F0\u4E0E AMS \u62F1\u5F62\u900F\u660E\u7F69\u3002\u6309\u4F60\u7684\u8981\u6C42\u4E0D\u8BBE\u7F6E\u5916\u63A5\u6392\u98CE\u8BBE\u65BD\u3002",[-1.8,1.8,-1.2],[-3.03,1.15,-2.65]],a2l:["\u53CC\u673A\u6253\u5370\u533A","\u4E24\u53F0 A2L \u673A\u8EAB\u5404 544 \xD7 529 \xD7 505 \u6BEB\u7C73\uFF0C\u6CBF\u4E1C\u4FA7\u5B9E\u5899\u7F6E\u4E8E\u957F\u5DE5\u4F5C\u53F0\u3002\u6309\u4F60\u53D1\u7684\u7167\u7247\u7EC6\u5316\u5F00\u653E\u6846\u67B6\u3001\u7EBF\u6027\u5BFC\u8F68\u3001\u4F20\u52A8\u76AE\u5E26\u3001\u6253\u5370\u5934\u3001\u5F27\u5F62\u7EBF\u675F\u3001\u70ED\u5E8A\u548C\u53F3\u524D\u89E6\u5C4F\uFF1B\u7167\u7247\u4E2D\u7684\u5355\u673A\u914D\u7F6E\u4E0D\u52A0\u5916\u7F6E\u6599\u76D8\u6216 AMS\u3002",[-2,1.65,.9],[-3.68,1.05,.22]],racks:["\u8017\u6750\u5B58\u50A8\u533A","\u4E24\u7EC4\u767D\u8272\u4E94\u5C42\u53CC\u5706\u6746\u6EDA\u8F6E\u6599\u76D8\u67B6\uFF0C\u6BCF\u7EC4\u89C4\u5212 1.20 \xD7 0.50 \xD7 2.00 \u7C73\uFF0C\u914D\u4E07\u5411\u811A\u8F6E\uFF0C\u793A\u610F\u5171 120 \u5377\u3002PLA\u3001PETG \u5404 48 \u5377\uFF0C\u5171\u5360\u516B\u6210\uFF1B\u7279\u6B8A\u8017\u6750 TPU\u3001ABS\u3001ASA\u3001PA\u3001PC\u3001PVA \u5404 4 \u5377\uFF0C\u5E76\u8BBE\u72EC\u7ACB\u5206\u7C7B\u6807\u7B7E\u3002\u5B9E\u9645\u5BB9\u91CF\u9700\u6309\u8D2D\u4E70\u5C3A\u5BF8\u590D\u6838\u3002",[0,2.2,1.2],[-1.025,1.15,3.57]],finished:["\u6210\u54C1\u6682\u653E\u533A","\u4E1C\u5357\u89D2 1.80 \xD7 0.60 \xD7 2.00 \u7C73\u4E94\u5C42\u8D27\u67B6\uFF0C\u6CBF\u4E1C\u5899\u6446\u653E\u3002\u6BCF\u5C42\u5206\u7C7B\u5B58\u653E\u6253\u5370\u5236\u54C1\uFF0C\u6BCF\u5C42\u914D\u5F00\u53E3\u5206\u7C7B\u76C6\uFF1B\u5E26\u5609\u65B0 Logo \u7684\u5C0F\u5899\u724C\u6B63\u5BF9\u8D27\u67B6\u3002\u5236\u54C1\u4E3A\u793A\u610F\u3002",[-1.25,2.3,2.1],[-3.92,1.3,2.8]]};function ir(z){let[k,E,ne,qe]=_o[z],Xe=[-ne[0],ne[1],ne[2]],Ze=[-qe[0],qe[1],qe[2]];if(document.querySelector("#details h2").textContent=k,document.querySelector("#details p").textContent=E,Ae==="walk"){let Be=z==="h2s"?[-1.2,1.6,-1.35]:z==="a2l"?[-1.7,1.6,.22]:z==="finished"?[-2.7,1.6,2.8]:[-.35,1.6,1.65];Be[0]=-Be[0],q.position.set(...Be);let Ce=new M(...Ze).sub(q.position);ut=Math.atan2(-Ce.x,-Ce.z),ot=Math.atan2(Ce.y,Math.hypot(Ce.x,Ce.z)),$r(),pn()}else rr("overview"),q.position.set(...Xe),g.target.set(...Ze),(z==="finished"||z==="racks")&&q.position.sub(g.target).multiplyScalar(Math.max(z==="finished"?1.1:1,(z==="finished"?1.05:1.4)/q.aspect)).add(g.target),q.lookAt(g.target),g.update(),z==="racks"&&(f.visible=!0,Ue.forEach(Be=>Be.visible=!0));document.body.classList.remove("panel")}document.querySelectorAll("[data-view]").forEach(z=>z.onclick=()=>rr(z.dataset.view)),document.querySelectorAll("[data-zone]").forEach(z=>z.onclick=()=>ir(z.dataset.zone)),document.querySelector("#structure").onchange=z=>{hn=z.target.checked,pn()},document.querySelector("#dimensions").onchange=z=>p.visible=z.target.checked,document.querySelector("#furnishing").onchange=z=>{u.visible=z.target.checked,xe.visible=z.target.checked},document.querySelector("#panel-toggle").onclick=()=>document.body.classList.toggle("panel");let Ri=new Jo,Ar=new se,Tn=null,bn=null,On=null;m.domElement.addEventListener("pointerdown",z=>{Tn={x:z.clientX,y:z.clientY},Ae==="walk"&&bn===null&&(bn=z.pointerId,On=Tn,m.domElement.setPointerCapture(z.pointerId))}),m.domElement.addEventListener("pointermove",z=>{Ae==="walk"&&z.pointerId===bn&&On&&(ut-=(z.clientX-On.x)*.004,ot=Gn.clamp(ot-(z.clientY-On.y)*.004,-1.1,1.1),On={x:z.clientX,y:z.clientY},$r())}),m.domElement.addEventListener("pointerup",z=>{if(z.pointerId===bn&&(bn=null,On=null),!Tn||Math.hypot(z.clientX-Tn.x,z.clientY-Tn.y)>6||Ae==="walk")return;let k=m.domElement.getBoundingClientRect();if(Ar.set((z.clientX-k.left)/k.width*2-1,-(z.clientY-k.top)/k.height*2+1),Ri.setFromCamera(Ar,q),u.visible){let E=Ri.intersectObjects($.map(ne=>ne.obj),!0)[0];if(E){let ne=E.object;for(;ne;){let qe=$.find(Xe=>Xe.obj===ne);if(qe){ir(qe.id);break}ne=ne.parent}}}}),m.domElement.addEventListener("pointercancel",()=>{bn=null,On=null,Tn=null}),window.addEventListener("keydown",z=>{Ae==="walk"&&["w","a","s","d","arrowup","arrowleft","arrowdown","arrowright"].includes(z.key.toLowerCase())&&(z.preventDefault(),vt.add(z.key.toLowerCase()))}),window.addEventListener("keyup",z=>vt.delete(z.key.toLowerCase()));let or=document.querySelector("#joystick"),$o=or.firstElementChild,Lr=null;function ei(){Kn.x=Kn.y=0,Lr=null,$o.style.transform="translate(0,0)"}function es(z){if(z.pointerId!==Lr)return;let k=or.getBoundingClientRect(),E=z.clientX-k.left-k.width/2,ne=z.clientY-k.top-k.height/2,qe=Math.hypot(E,ne),Xe=30;qe>Xe&&(E=E/qe*Xe,ne=ne/qe*Xe),$o.style.transform=`translate(${E}px,${ne}px)`,Kn.x=E/Xe,Kn.y=-ne/Xe}or.addEventListener("pointerdown",z=>{z.preventDefault(),Lr===null&&(Lr=z.pointerId,or.setPointerCapture(z.pointerId),es(z))}),or.addEventListener("pointermove",es);for(let z of["pointerup","pointercancel","lostpointercapture"])or.addEventListener(z,k=>{k.pointerId===Lr&&ei()});window.addEventListener("blur",()=>{vt.clear(),ei(),bn=null,On=null}),document.addEventListener("visibilitychange",()=>{document.hidden&&(vt.clear(),ei(),bn=null,On=null)});function b(z,k){return z<-8.87/2+.22||z>8.87/2-.22||k<-7.81/2+.22||k>7.81/2-.22?!0:Q.some(ne=>(u.visible||ne.fixed)&&Math.abs(z-ne.x)<ne.w/2+.22&&Math.abs(k-ne.z)<ne.d/2+.22)}function J(z){let k=Kn.y+(vt.has("w")||vt.has("arrowup")?1:0)-(vt.has("s")||vt.has("arrowdown")?1:0),E=Kn.x+(vt.has("d")||vt.has("arrowright")?1:0)-(vt.has("a")||vt.has("arrowleft")?1:0),ne=Math.hypot(k,E);ne>1&&(k/=ne,E/=ne);let qe=(-Math.sin(ut)*k+Math.cos(ut)*E)*z*1.7,Xe=(-Math.cos(ut)*k-Math.sin(ut)*E)*z*1.7;b(q.position.x+qe,q.position.z)||(q.position.x+=qe),b(q.position.x,q.position.z+Xe)||(q.position.z+=Xe)}let Z=new M;function F(){for(let z of fe){let k=Ae!=="walk"&&!((Ae==="plan"||n.clientWidth<600)&&z.el.textContent.startsWith("\u51C0\u9AD8"))&&(z.kind!=="measure"||document.querySelector("#dimensions").checked)&&(z.kind!=="furniture"||u.visible);Z.copy(z.pos).project(q);let E=k&&Z.z>-1&&Z.z<1&&Math.abs(Z.x)<.98&&Math.abs(Z.y)<.98;z.el.style.display=E?"block":"none",E&&(z.el.style.left=`${(Z.x*.5+.5)*n.clientWidth}px`,z.el.style.top=`${(-Z.y*.5+.5)*n.clientHeight}px`)}}function T(){let z=n.clientWidth,k=n.clientHeight;if(m.setSize(z,k),q.aspect=z/k,q.updateProjectionMatrix(),Ae==="overview"&&!document.querySelector("#details h2").textContent.includes("\u5DE5\u4F4D")&&g.target.length()<1){let E=19.3*Math.max(1,1/q.aspect);q.position.copy(new M(-11.1,10,12.6).normalize().multiplyScalar(E)),g.update()}if(Ae==="plan"){let E=Math.max(10.569999999999999/q.aspect,10.11)/2;q.position.set(0,E/Math.tan(Gn.degToRad(q.fov/2))+2.64+1,0),q.lookAt(g.target),g.update()}}new ResizeObserver(T).observe(n);let pe=performance.now();function Ke(z){requestAnimationFrame(Ke);let k=Math.min((z-pe)/1e3,.035);pe=z,Ae==="walk"?J(k):g.update(),m.render(i,q),F()}rr("overview"),requestAnimationFrame(Ke),document.querySelector("#loading").remove();function ze(z){let k=document.querySelector("#toast");k.textContent=z,k.style.display="block",clearTimeout(ze.timer),ze.timer=setTimeout(()=>k.style.display="none",3500)}async function Pe(){let z=document.querySelector("#export");z.disabled=!0,z.textContent="\u6B63\u5728\u5BFC\u51FA\u2026";let k={roof:a.visible,front:f.visible,glass:h.visible,furniture:u.visible,paint:xe.visible};a.visible=f.visible=h.visible=u.visible=xe.visible=ke.visible=!0,Ue.forEach(E=>E.visible=!0),h.traverse(E=>{E.isMesh&&(E.visible=!0)}),o.userData={\u5355\u4F4D:"\u7C73",\u623F\u95F4\u51C0\u5C3A\u5BF8:[8.87,7.81,2.64],\u65B9\u4F4D:"\u5317\u4E3A\u7A97\u6237\u3001\u897F\u4E3A\u73BB\u7483\u5899\u3001\u95E8\u5728\u5357\u5899\u897F\u5357\u89D2\uFF0C\u7528\u6237\u5DF2\u786E\u8BA4",\u56FA\u5B9A\u8BBE\u65BD:"\u4F4D\u7F6E\u53CA\u5C40\u90E8\u5C3A\u5BF8\u6309\u7528\u6237\u89C6\u9891\u4F30\u7B97",\u8BBE\u5907:"H2S\u6FC0\u5149\u7248\u4E00\u53F0\u542BAMS2Pro\uFF0CA2L\u5355\u673A\u4E24\u53F0\uFF1B\u6309\u7528\u6237\u5B9E\u7269\u56FE\u7247\u4E0E\u5B98\u65B9\u53C2\u6570\u7EC6\u5316\uFF0C\u975E\u5382\u5BB6CAD",\u6210\u54C1\u6682\u653E\u8D27\u67B6:"\u4E1C\u5357\u89D21.80\xD70.60\xD72.00\u7C73\u4E94\u5C42\u8D27\u67B6\uFF0C\u5236\u54C1\u5F62\u72B6\u4E3A\u793A\u610F",\u5899\u9762\u6807\u8BC6:"\u5609\u65B0\u771F\u5B9ELogo\u53CA\u5404\u5206\u533A\u5899\u8D34\u6807\u8BC6",\u684C\u4F4D\u5B9A\u4F4D\u7EBF\u5BBD\u7C73:.07,\u5916\u63A5\u6392\u98CE:"\u6309\u7528\u6237\u8981\u6C42\u672A\u8BBE\u7F6E",\u8D27\u67B6:"\u4E24\u7EC4\u767D\u8272\u4E94\u5C42\u6EDA\u8F6E\u6599\u76D8\u67B6\uFF0C\u5E38\u752896\u5377\u3001\u7279\u6B8A24\u5377\u793A\u610F",\u7528\u9014:"\u7A7A\u95F4\u89C4\u5212\u6A21\u578B\uFF0C\u95E8\u7A97\u7EC6\u5C3A\u5BF8\u4E0E\u5BB6\u5177\u627F\u91CD\u9700\u73B0\u573A\u590D\u6838"};try{let E=await new _r().parseAsync(o,{binary:!0,onlyVisible:!0}),ne=URL.createObjectURL(new Blob([E],{type:"model/gltf-binary"})),qe=document.createElement("a");qe.href=ne,qe.download="\u5C0F\u4F0D_3D\u6253\u5370\u623F\u95F4\u89C4\u5212.glb",qe.click(),setTimeout(()=>URL.revokeObjectURL(ne),5e3),ze("\u6A21\u578B\u5DF2\u5BFC\u51FA\uFF0C\u5355\u4F4D\u4E3A\u7C73\uFF0C\u53EF\u5BFC\u5165 Blender\u3002")}catch(E){ze("\u6A21\u578B\u5BFC\u51FA\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),console.error(E)}finally{a.visible=k.roof,f.visible=k.front,h.visible=k.glass,u.visible=k.furniture,xe.visible=k.paint,pn(),z.disabled=!1,z.textContent="\u4E0B\u8F7D 3D \u6A21\u578B"}}document.querySelector("#export").onclick=Pe,window.roomPlanner={scene:i,model:o,conference:me,camera:q,renderer:m,orbit:g,materialCanvases:ip,setView:rr,focus:ir,blocked:b,exportModel:Pe,getState:()=>({mode:Ae,size:[8.87,7.81,2.64],tableFootprints:ue,storageFootprints:Oe,paintLineWidth:.07,wallSigns:ke.children.map(z=>z.name),externalExhaust:!1,directions:{north:"\u7A97\u6237",west:"\u73BB\u7483\u5899",east:"\u5B9E\u5899",south:"\u95E8\u6240\u5728\u5899"},door:{x:-Se,z:7.81/2,width:re,corner:"\u897F\u5357",glassGap:.08},spoolCount:oe,materialCapacity:V,conferenceVisible:me.visible,rackCount:W.children.length,roof:a.visible,front:f.visible,glass:h.visible,furniture:u.visible,position:q.position.toArray(),colliders:Q,drawCalls:m.info.render.calls})}}V3().catch(r=>{console.error(r);let e=document.querySelector("#loading");e&&(e.textContent="\u6A21\u578B\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u7F51\u9875\u3002")});})();
