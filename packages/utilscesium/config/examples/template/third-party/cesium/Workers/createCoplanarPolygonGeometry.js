define(["./arrayRemoveDuplicates-80a91d16","./BoundingRectangle-5c5351e9","./Transforms-2b29b0e1","./Matrix2-c6c16658","./RuntimeError-5b082e8f","./ComponentDatatype-3d0a0aac","./CoplanarPolygonGeometryLibrary-1ceeac7e","./when-4bbc8319","./GeometryAttribute-ae8695fa","./GeometryAttributes-7827a6c2","./GeometryInstance-0b07c761","./GeometryPipeline-a7c181f2","./IndexDatatype-ddbc25a7","./PolygonGeometryLibrary-523d2ee4","./PolygonPipeline-3e1487ac","./VertexFormat-7b982b01","./combine-e9466e32","./WebGLConstants-508b9636","./OrientedBoundingBox-b7eb4ee2","./EllipsoidTangentPlane-8f8bfba5","./AxisAlignedBoundingBox-a2b6f6e8","./IntersectionTests-b1d28bc7","./Plane-26e67b94","./AttributeCompression-f7a901f9","./EncodedCartesian3-b1495e46","./ArcType-fc72c06c","./EllipsoidRhumbLine-c6741351"],(function(e,t,n,o,a,r,i,s,l,c,p,y,u,m,d,g,b,h,f,x,C,P,A,w,F,G,L){"use strict";const E=new o.Cartesian3,v=new t.BoundingRectangle,T=new o.Cartesian2,D=new o.Cartesian2,_=new o.Cartesian3,V=new o.Cartesian3,k=new o.Cartesian3,R=new o.Cartesian3,I=new o.Cartesian3,M=new o.Cartesian3,B=new n.Quaternion,H=new o.Matrix3,O=new o.Matrix3,z=new o.Cartesian3;function S(e,t,a,i,s,p,y,m){const g=e.positions;let b=d.PolygonPipeline.triangulate(e.positions2D,e.holes);b.length<3&&(b=[0,1,2]);const h=u.IndexDatatype.createTypedArray(g.length,b.length);h.set(b);let f=H;if(0!==i){let e=n.Quaternion.fromAxisAngle(p,i,B);if(f=o.Matrix3.fromQuaternion(e,f),t.tangent||t.bitangent){e=n.Quaternion.fromAxisAngle(p,-i,B);const a=o.Matrix3.fromQuaternion(e,O);y=o.Cartesian3.normalize(o.Matrix3.multiplyByVector(a,y,y),y),t.bitangent&&(m=o.Cartesian3.normalize(o.Cartesian3.cross(p,y,m),m))}}else f=o.Matrix3.clone(o.Matrix3.IDENTITY,f);const x=D;t.st&&(x.x=a.x,x.y=a.y);const C=g.length,P=3*C,A=new Float64Array(P),w=t.normal?new Float32Array(P):void 0,F=t.tangent?new Float32Array(P):void 0,G=t.bitangent?new Float32Array(P):void 0,L=t.st?new Float32Array(2*C):void 0;let v=0,_=0,V=0,k=0,R=0;for(let e=0;e<C;e++){const n=g[e];if(A[v++]=n.x,A[v++]=n.y,A[v++]=n.z,t.st){const e=s(o.Matrix3.multiplyByVector(f,n,E),T);o.Cartesian2.subtract(e,x,e);const t=r.CesiumMath.clamp(e.x/a.width,0,1),i=r.CesiumMath.clamp(e.y/a.height,0,1);L[R++]=t,L[R++]=i}t.normal&&(w[_++]=p.x,w[_++]=p.y,w[_++]=p.z),t.tangent&&(F[k++]=y.x,F[k++]=y.y,F[k++]=y.z),t.bitangent&&(G[V++]=m.x,G[V++]=m.y,G[V++]=m.z)}const I=new c.GeometryAttributes;return t.position&&(I.position=new l.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:A})),t.normal&&(I.normal=new l.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w})),t.tangent&&(I.tangent=new l.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:F})),t.bitangent&&(I.bitangent=new l.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:G})),t.st&&(I.st=new l.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:L})),new l.Geometry({attributes:I,indices:h,primitiveType:l.PrimitiveType.TRIANGLES})}function N(e){const t=(e=s.defaultValue(e,s.defaultValue.EMPTY_OBJECT)).polygonHierarchy,n=s.defaultValue(e.vertexFormat,g.VertexFormat.DEFAULT);this._vertexFormat=g.VertexFormat.clone(n),this._polygonHierarchy=t,this._stRotation=s.defaultValue(e.stRotation,0),this._ellipsoid=o.Ellipsoid.clone(s.defaultValue(e.ellipsoid,o.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=m.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+g.VertexFormat.packedLength+o.Ellipsoid.packedLength+2}N.fromPositions=function(e){return new N({polygonHierarchy:{positions:(e=s.defaultValue(e,s.defaultValue.EMPTY_OBJECT)).positions},vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid})},N.pack=function(e,t,n){return n=s.defaultValue(n,0),n=m.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,n),o.Ellipsoid.pack(e._ellipsoid,t,n),n+=o.Ellipsoid.packedLength,g.VertexFormat.pack(e._vertexFormat,t,n),n+=g.VertexFormat.packedLength,t[n++]=e._stRotation,t[n]=e.packedLength,t};const Q=o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),j=new g.VertexFormat,U={polygonHierarchy:{}};return N.unpack=function(e,t,n){t=s.defaultValue(t,0);const a=m.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=a.startingIndex,delete a.startingIndex;const r=o.Ellipsoid.unpack(e,t,Q);t+=o.Ellipsoid.packedLength;const i=g.VertexFormat.unpack(e,t,j);t+=g.VertexFormat.packedLength;const l=e[t++],c=e[t];return s.defined(n)||(n=new N(U)),n._polygonHierarchy=a,n._ellipsoid=o.Ellipsoid.clone(r,n._ellipsoid),n._vertexFormat=g.VertexFormat.clone(i,n._vertexFormat),n._stRotation=l,n.packedLength=c,n},N.createGeometry=function(t){const a=t._vertexFormat,s=t._polygonHierarchy,c=t._stRotation;let d=s.positions;if(d=e.arrayRemoveDuplicates(d,o.Cartesian3.equalsEpsilon,!0),d.length<3)return;let g=_,b=V,h=k,f=I;const x=M;if(!i.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(d,R,f,x))return;if(g=o.Cartesian3.cross(f,x,g),g=o.Cartesian3.normalize(g,g),!o.Cartesian3.equalsEpsilon(R,o.Cartesian3.ZERO,r.CesiumMath.EPSILON6)){const e=t._ellipsoid.geodeticSurfaceNormal(R,z);o.Cartesian3.dot(g,e)<0&&(g=o.Cartesian3.negate(g,g),f=o.Cartesian3.negate(f,f))}const C=i.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(R,f,x),P=i.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(R,f,x);a.tangent&&(b=o.Cartesian3.clone(f,b)),a.bitangent&&(h=o.Cartesian3.clone(x,h));const A=m.PolygonGeometryLibrary.polygonsFromHierarchy(s,C,!1),w=A.hierarchy,F=A.polygons;if(0===w.length)return;d=w[0].outerRing;const G=n.BoundingSphere.fromPoints(d),L=m.PolygonGeometryLibrary.computeBoundingRectangle(g,P,d,c,v),E=[];for(let e=0;e<F.length;e++){const t=new p.GeometryInstance({geometry:S(F[e],a,L,c,P,g,b,h)});E.push(t)}const T=y.GeometryPipeline.combineInstances(E)[0];T.attributes.position.values=new Float64Array(T.attributes.position.values),T.indices=u.IndexDatatype.createTypedArray(T.attributes.position.values.length/3,T.indices);const D=T.attributes;return a.position||delete D.position,new l.Geometry({attributes:D,indices:T.indices,primitiveType:T.primitiveType,boundingSphere:G})},function(e,t){return s.defined(t)&&(e=N.unpack(e,t)),N.createGeometry(e)}}));
