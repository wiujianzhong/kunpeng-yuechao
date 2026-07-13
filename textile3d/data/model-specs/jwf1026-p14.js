import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 14,
    "item": 1,
    "recordKey": "jwf1026-p14-item-001",
    "code": "JWF1026-160(10)-0500-1A",
    "nameZh": "打手结合件",
    "quantity": {
      "value": 9,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ460×1836.5",
      "辊长1594"
    ]
  },
  {
    "pdfPage": 14,
    "item": 2,
    "recordKey": "jwf1026-p14-item-002",
    "code": "JWF1026-160(10)-0500-2A",
    "nameZh": "打手结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ460×1836.5",
      "辊长1594"
    ]
  },
  {
    "pdfPage": 14,
    "item": 3,
    "recordKey": "jwf1026-p14-item-003",
    "code": "JWF1026-160(10)-0500-3",
    "nameZh": "角板结合件",
    "quantity": {
      "value": 10,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "80×60×50"
    ]
  },
  {
    "pdfPage": 14,
    "item": 4,
    "recordKey": "jwf1026-p14-item-004",
    "code": "JWF1026-160(10)-0500-4",
    "nameZh": "法兰结合件",
    "quantity": {
      "value": 5,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "430×430×76"
    ]
  },
  {
    "pdfPage": 14,
    "item": 5,
    "recordKey": "jwf1026-p14-item-005",
    "code": "JWF1026-160(10)-0500-5",
    "nameZh": "张紧装置结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长178"
    ]
  },
  {
    "pdfPage": 14,
    "item": 6,
    "recordKey": "jwf1026-p14-item-006",
    "code": "JWF1026-160(10)-0500-6",
    "nameZh": "张紧装置结合件",
    "quantity": {
      "value": 5,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长136"
    ]
  },
  {
    "pdfPage": 14,
    "item": 7,
    "recordKey": "jwf1026-p14-item-007",
    "code": "JWF1026-160(10)-0500-7",
    "nameZh": "张紧装置结合件",
    "quantity": {
      "value": 4,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "高166"
    ]
  },
  {
    "pdfPage": 14,
    "item": 8,
    "recordKey": "jwf1026-p14-item-008",
    "code": "FA103-0202",
    "nameZh": "轴承盖",
    "quantity": {
      "value": 9,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ75×23"
    ]
  },
  {
    "pdfPage": 14,
    "item": 9,
    "recordKey": "jwf1026-p14-item-009",
    "code": "FA103-0204",
    "nameZh": "轴承盖",
    "quantity": {
      "value": 10,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ75×37.5"
    ]
  },
  {
    "pdfPage": 14,
    "item": 10,
    "recordKey": "jwf1026-p14-item-010",
    "code": "FA103B-0203",
    "nameZh": "轴承盖",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": []
  },
  {
    "pdfPage": 14,
    "item": 11,
    "recordKey": "jwf1026-p14-item-011",
    "code": "FA103-0210",
    "nameZh": "侧垫",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ85",
      "厚0.5"
    ]
  },
  {
    "pdfPage": 14,
    "item": 12,
    "recordKey": "jwf1026-p14-item-012",
    "code": "JWF1024-0701",
    "nameZh": "打手带轮（一）",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ232.1×35",
      "孔φ40"
    ]
  },
  {
    "pdfPage": 14,
    "item": 13,
    "recordKey": "jwf1026-p14-item-013",
    "code": "JWF1024-0702",
    "nameZh": "打手带轮（二）",
    "quantity": {
      "value": 8,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ232.1×85",
      "孔φ40"
    ]
  },
  {
    "pdfPage": 14,
    "item": 14,
    "recordKey": "jwf1026-p14-item-014",
    "code": "JWF1024-0707",
    "nameZh": "挡圈",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ55×6"
    ]
  }
];

export const jwf1026P14ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
