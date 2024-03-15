define(["./when-4bbc8319","./Matrix2-c6c16658","./arrayRemoveDuplicates-80a91d16","./BoundingRectangle-5c5351e9","./Transforms-2b29b0e1","./ComponentDatatype-3d0a0aac","./PolylineVolumeGeometryLibrary-f8d870e7","./RuntimeError-5b082e8f","./GeometryAttribute-ae8695fa","./GeometryAttributes-7827a6c2","./IndexDatatype-ddbc25a7","./PolygonPipeline-3e1487ac","./combine-e9466e32","./WebGLConstants-508b9636","./EllipsoidTangentPlane-8f8bfba5","./AxisAlignedBoundingBox-a2b6f6e8","./IntersectionTests-b1d28bc7","./Plane-26e67b94","./PolylinePipeline-1d7a1678","./EllipsoidGeodesic-2e7ba57d","./EllipsoidRhumbLine-c6741351"],(function(e,t,n,i,o,a,r,l,s,p,c,d,u,y,g,h,f,m,E,b,P){"use strict";function _(n){const i=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).polylinePositions,o=n.shapePositions;this._positions=i,this._shape=o,this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(n.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,r.CornerType.ROUNDED),this._granularity=e.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";let l=1+i.length*t.Cartesian3.packedLength;l+=1+o.length*t.Cartesian2.packedLength,this.packedLength=l+t.Ellipsoid.packedLength+2}_.pack=function(n,i,o){let a;o=e.defaultValue(o,0);const r=n._positions;let l=r.length;for(i[o++]=l,a=0;a<l;++a,o+=t.Cartesian3.packedLength)t.Cartesian3.pack(r[a],i,o);const s=n._shape;for(l=s.length,i[o++]=l,a=0;a<l;++a,o+=t.Cartesian2.packedLength)t.Cartesian2.pack(s[a],i,o);return t.Ellipsoid.pack(n._ellipsoid,i,o),o+=t.Ellipsoid.packedLength,i[o++]=n._cornerType,i[o]=n._granularity,i};const k=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),C={polylinePositions:void 0,shapePositions:void 0,ellipsoid:k,height:void 0,cornerType:void 0,granularity:void 0};_.unpack=function(n,i,o){let a;i=e.defaultValue(i,0);let r=n[i++];const l=new Array(r);for(a=0;a<r;++a,i+=t.Cartesian3.packedLength)l[a]=t.Cartesian3.unpack(n,i);r=n[i++];const s=new Array(r);for(a=0;a<r;++a,i+=t.Cartesian2.packedLength)s[a]=t.Cartesian2.unpack(n,i);const p=t.Ellipsoid.unpack(n,i,k);i+=t.Ellipsoid.packedLength;const c=n[i++],d=n[i];return e.defined(o)?(o._positions=l,o._shape=s,o._ellipsoid=t.Ellipsoid.clone(p,o._ellipsoid),o._cornerType=c,o._granularity=d,o):(C.polylinePositions=l,C.shapePositions=s,C.cornerType=c,C.granularity=d,new _(C))};const L=new i.BoundingRectangle;return _.createGeometry=function(e){const l=e._positions,u=n.arrayRemoveDuplicates(l,t.Cartesian3.equalsEpsilon);let y=e._shape;if(y=r.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y),u.length<2||y.length<3)return;d.PolygonPipeline.computeWindingOrder2D(y)===d.WindingOrder.CLOCKWISE&&y.reverse();const g=i.BoundingRectangle.fromPoints(y,L);return function(e,t){const n=new p.GeometryAttributes;n.position=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});const i=t.length,r=n.position.values.length/3,l=e.length/3/i,d=c.IndexDatatype.createTypedArray(r,2*i*(l+1));let u,y,g=0;u=0;let h=u*i;for(y=0;y<i-1;y++)d[g++]=y+h,d[g++]=y+h+1;for(d[g++]=i-1+h,d[g++]=h,u=l-1,h=u*i,y=0;y<i-1;y++)d[g++]=y+h,d[g++]=y+h+1;for(d[g++]=i-1+h,d[g++]=h,u=0;u<l-1;u++){const e=i*u,t=e+i;for(y=0;y<i;y++)d[g++]=y+e,d[g++]=y+t}return new s.Geometry({attributes:n,indices:c.IndexDatatype.createTypedArray(r,d),boundingSphere:o.BoundingSphere.fromVertices(e),primitiveType:s.PrimitiveType.LINES})}(r.PolylineVolumeGeometryLibrary.computePositions(u,y,g,e,!1),y)},function(n,i){return e.defined(i)&&(n=_.unpack(n,i)),n._ellipsoid=t.Ellipsoid.clone(n._ellipsoid),_.createGeometry(n)}}));
