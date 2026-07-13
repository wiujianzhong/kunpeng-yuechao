// JWF1206厂家PDF第45页：集棉器结合件。
// 本页先用完整600dpi原格核对正视/右侧轮廓，断裂线与尺寸线均不建实体。
import {jwf1206P38P49Verified} from '../jwf1206-p38-p49-verified.js';
import {annulus,box,buildPageSpecs,cylinder,extrude,hole,spec} from './jwf1206-rebuild-p38-p55-helpers.js';

const rows=jwf1206P38P49Verified.filter(part=>part.page===45);

function panelBetween([y1,z1],[y2,z2],material='paintedMetal'){
  const length=Math.hypot(y2-y1,z2-z1);
  const rotation=Math.atan2(z2-z1,y2-y1);
  return box([1036,length,4],material,[0,(y1+y2)/2,(z1+z2)/2],[rotation,0,0]);
}

function foldedCollectorShell(){
  // 右侧视图不是一个封闭厚框，而是后壁与上下连续折面组成的薄壁壳。
  // 六块板都沿1036方向延伸，端点在同一右侧轮廓坐标系内连续相接。
  return [
    panelBetween([322,16],[-322,16]),
    panelBetween([322,16],[250,-20]),
    panelBetween([250,-20],[208,-8]),
    panelBetween([208,-8],[-155,-8]),
    panelBetween([-155,-8],[-195,-14]),
    panelBetween([-195,-14],[-322,5]),
    box([1036,8,6],'darkMetal',[0,-150,-8]),
    box([1036,8,6],'darkMetal',[0,-195,-13]),
  ];
}

function centralFormerAssembly(){
  const tray=extrude([[-205,-58],[205,-58],[205,58],[-205,58]],6,{
    holes:[hole(-182,-38,7),hole(-90,38,7),hole(90,38,7),hole(182,-38,7)],
    position:[0,85,24],material:'paintedMetal',
  });
  const formerPlate=extrude([[-112,-62],[112,-62],[88,15],[76,142],[-76,142],[-88,15]],6,{
    holes:[hole(0,-5,48)],position:[0,142,28],material:'paintedMetal',
  });
  return [
    tray,
    formerPlate,
    box([12,210,6],'darkMetal',[-112,190,32]),
    box([12,210,6],'darkMetal',[112,190,32]),
    box([236,12,6],'darkMetal',[0,292,32]),
    box([150,10,6],'darkMetal',[-104,55,32],[0,0,.46]),
    box([150,10,6],'darkMetal',[104,55,32],[0,0,-.46]),
    annulus(132,82,14,{axis:'z',position:[0,135,40],material:'darkMetal'}),
    cylinder(40,42,'z','metal',[0,135,62]),
    box([105,18,12],'darkMetal',[0,31,30]),
  ];
}

const builders={
  'jwf1206-p45-item-001':part=>spec(part,{
    level:'轮廓级',
    views:['正视总图','右侧折弯轮廓'],
    assumptions:[
      '总长1036按厂家明确标注；正视总高、右侧深度及板厚均只按完整原格比例估算',
      '两条竖向波浪线是断裂画法，不是壳体折边或实体缝；中心线、尺寸线和表格线全部排除',
      '主体按右侧视图建立为沿1036方向延伸的连续薄壁折弯壳，不再用实心大板和厚盒拼成箱体',
      '中央集棉口、上方框架、左右斜撑、安装托板和四孔按正视轮廓建立；未标局部尺寸不作尺寸级承诺',
    ],
    material:'paintedMetal',
    primitives:[...foldedCollectorShell(),...centralFormerAssembly()],
  }),
};

export const jwf1206P45ModelSpecs=buildPageSpecs(rows,builders,45);
export default jwf1206P45ModelSpecs;
