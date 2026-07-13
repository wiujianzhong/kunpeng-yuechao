import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 12,
    "item": 1,
    "recordKey": "jwf1026-p12-item-001",
    "code": "JWF1026-160(10)-0400-25",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长2000",
      "高80.5"
    ]
  },
  {
    "pdfPage": 12,
    "item": 2,
    "recordKey": "jwf1026-p12-item-002",
    "code": "FA028-160-0400-1",
    "nameZh": "托辊结合件",
    "quantity": {
      "value": 5,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ80×1658",
      "孔φ35"
    ]
  },
  {
    "pdfPage": 12,
    "item": 3,
    "recordKey": "jwf1026-p12-item-003",
    "code": "FA028B-0400-1A",
    "nameZh": "轴结合件",
    "quantity": {
      "value": 5,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ100×1746",
      "轴端φ30"
    ]
  },
  {
    "pdfPage": 12,
    "item": 4,
    "recordKey": "jwf1026-p12-item-004",
    "code": "FA028B-0400-2A",
    "nameZh": "轴结合件",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ100×1765",
      "轴端φ30/φ25"
    ]
  },
  {
    "pdfPage": 12,
    "item": 5,
    "recordKey": "jwf1026-p12-item-005",
    "code": "FA028C-160(10)-0400-1",
    "nameZh": "输棉帘轴结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ100×1796",
      "轴端φ25"
    ]
  },
  {
    "pdfPage": 12,
    "item": 6,
    "recordKey": "jwf1026-p12-item-006",
    "code": "MM6-1300-1",
    "nameZh": "计数盘结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ60/φ25×22"
    ]
  },
  {
    "pdfPage": 12,
    "item": 7,
    "recordKey": "jwf1026-p12-item-007",
    "code": "JWF1026-160(10)-0401",
    "nameZh": "平帘",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "周长5700",
      "宽1580"
    ]
  },
  {
    "pdfPage": 12,
    "item": 8,
    "recordKey": "jwf1026-p12-item-008",
    "code": "JWF1026-160(10)-0402",
    "nameZh": "压棉帘",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1580×1500"
    ]
  },
  {
    "pdfPage": 12,
    "item": 9,
    "recordKey": "jwf1026-p12-item-009",
    "code": "JWF1026-160(10)-0403",
    "nameZh": "斜帘",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1580×1500"
    ]
  },
  {
    "pdfPage": 12,
    "item": 10,
    "recordKey": "jwf1026-p12-item-010",
    "code": "JWF1026-160(10)-0404",
    "nameZh": "托板",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1020×60×20"
    ]
  },
  {
    "pdfPage": 12,
    "item": 11,
    "recordKey": "jwf1026-p12-item-011",
    "code": "JWF1026-160(10)-0405A",
    "nameZh": "螺杆",
    "quantity": {
      "value": 4,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "M20×2030"
    ]
  },
  {
    "pdfPage": 12,
    "item": 12,
    "recordKey": "jwf1026-p12-item-012",
    "code": "JWF1026-160(10)-0406",
    "nameZh": "挡圈",
    "quantity": {
      "value": 6,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "35×30×14"
    ]
  },
  {
    "pdfPage": 12,
    "item": 13,
    "recordKey": "jwf1026-p12-item-013",
    "code": "JWF1026-160(10)-0407",
    "nameZh": "滑轨",
    "quantity": {
      "value": 12,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "170×50×38"
    ]
  },
  {
    "pdfPage": 12,
    "item": 14,
    "recordKey": "jwf1026-p12-item-014",
    "code": "JWF1026-160(10)-0408",
    "nameZh": "支座",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "99×80×61.5"
    ]
  }
];

export const jwf1026P12ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
