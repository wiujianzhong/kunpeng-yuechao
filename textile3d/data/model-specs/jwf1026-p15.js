import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 15,
    "item": 1,
    "recordKey": "jwf1026-p15-item-001",
    "code": "JWF1026-160(10)-0520A",
    "nameZh": "φ178带轮",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ183.5×112"
    ]
  },
  {
    "pdfPage": 15,
    "item": 2,
    "recordKey": "jwf1026-p15-item-002",
    "code": "JWF1026-160(10)-0521",
    "nameZh": "φ215带轮",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ220.6×112"
    ]
  },
  {
    "pdfPage": 15,
    "item": 3,
    "recordKey": "jwf1026-p15-item-003",
    "code": "JWF1026-160(10)-0522",
    "nameZh": "φ235带轮",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ240.6×112"
    ]
  },
  {
    "pdfPage": 15,
    "item": 4,
    "recordKey": "jwf1026-p15-item-004",
    "code": "JWF1026-160(10)-0523",
    "nameZh": "支架",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "98×45×25"
    ]
  },
  {
    "pdfPage": 15,
    "item": 5,
    "recordKey": "jwf1026-p15-item-005",
    "code": "MM6-1302A",
    "nameZh": "压盘",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "R48"
    ]
  },
  {
    "pdfPage": 15,
    "item": 6,
    "recordKey": "jwf1026-p15-item-006",
    "code": "JWF1024-0704",
    "nameZh": "电机带轮（一）",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ148.1×112",
      "孔φ42"
    ]
  },
  {
    "pdfPage": 15,
    "item": 7,
    "recordKey": "jwf1026-p15-item-007",
    "code": "JWF1024-0705",
    "nameZh": "电机带轮（二）",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ120.1×112",
      "孔φ42"
    ]
  },
  {
    "pdfPage": 15,
    "item": 8,
    "recordKey": "jwf1026-p15-item-008",
    "code": "ZFA031-0522",
    "nameZh": "轴承座",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ165/φ85"
    ]
  }
];

export const jwf1026P15ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
