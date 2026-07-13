import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 13,
    "item": 1,
    "recordKey": "jwf1026-p13-item-001",
    "code": "JWF1026-160(10)-0409A",
    "nameZh": "螺杆",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "M20×860"
    ]
  },
  {
    "pdfPage": 13,
    "item": 2,
    "recordKey": "jwf1026-p13-item-002",
    "code": "JWF1026-160(10)-0410",
    "nameZh": "电机托板",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "200×140×50"
    ]
  },
  {
    "pdfPage": 13,
    "item": 3,
    "recordKey": "jwf1026-p13-item-003",
    "code": "JWF1026-160(10)-0411",
    "nameZh": "底板",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "190×30×12"
    ]
  },
  {
    "pdfPage": 13,
    "item": 4,
    "recordKey": "jwf1026-p13-item-004",
    "code": "JWF1026-160(10)-0412",
    "nameZh": "毛刷板",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "162.5×95"
    ]
  },
  {
    "pdfPage": 13,
    "item": 5,
    "recordKey": "jwf1026-p13-item-005",
    "code": "JWF1026-160(10)-0413",
    "nameZh": "链轮（26T）",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ89×42",
      "26齿"
    ]
  },
  {
    "pdfPage": 13,
    "item": 6,
    "recordKey": "jwf1026-p13-item-006",
    "code": "JWF1026-160(10)-0451",
    "nameZh": "支板",
    "quantity": {
      "value": 6,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "166×60"
    ]
  },
  {
    "pdfPage": 13,
    "item": 7,
    "recordKey": "jwf1026-p13-item-007",
    "code": "JWF1026-160(10)-0462",
    "nameZh": "轴承座",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "131.5×106.5",
      "孔φ76"
    ]
  },
  {
    "pdfPage": 13,
    "item": 8,
    "recordKey": "jwf1026-p13-item-008",
    "code": "FA028C-160-0401",
    "nameZh": "轴",
    "quantity": {
      "value": 5,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "M16×638"
    ]
  },
  {
    "pdfPage": 13,
    "item": 9,
    "recordKey": "jwf1026-p13-item-009",
    "code": "FA028B-1505",
    "nameZh": "链轮（26T）",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ133×40",
      "26齿"
    ]
  },
  {
    "pdfPage": 13,
    "item": 10,
    "recordKey": "jwf1026-p13-item-010",
    "code": "FA028B-1506",
    "nameZh": "链轮（15T）",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ83×39",
      "15齿"
    ]
  }
];

export const jwf1026P13ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
