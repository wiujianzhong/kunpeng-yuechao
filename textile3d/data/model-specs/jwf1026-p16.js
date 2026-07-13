import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 16,
    "item": 1,
    "recordKey": "jwf1026-p16-item-001",
    "code": "JWF1026-160(10)-0600-2",
    "nameZh": "张紧装置结合件",
    "quantity": {
      "value": 7,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "115×84"
    ]
  },
  {
    "pdfPage": 16,
    "item": 2,
    "recordKey": "jwf1026-p16-item-002",
    "code": "JWF1026-160(10)-0600-5",
    "nameZh": "护板结合件",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "497×170"
    ]
  },
  {
    "pdfPage": 16,
    "item": 3,
    "recordKey": "jwf1026-p16-item-003",
    "code": "FA028-160-0700-1",
    "nameZh": "给棉罗拉结合件",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1790×1570"
    ]
  },
  {
    "pdfPage": 16,
    "item": 4,
    "recordKey": "jwf1026-p16-item-004",
    "code": "FA028B-0500-3",
    "nameZh": "电机托板结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "350×360×50"
    ]
  },
  {
    "pdfPage": 16,
    "item": 5,
    "recordKey": "jwf1026-p16-item-005",
    "code": "FA028C-160(10)-0300-2",
    "nameZh": "链轮结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ146.8×56.5",
      "孔φ55"
    ]
  },
  {
    "pdfPage": 16,
    "item": 6,
    "recordKey": "jwf1026-p16-item-006",
    "code": "FA028C-160(10)-0300-3",
    "nameZh": "链轮结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ162×56.5",
      "孔φ55"
    ]
  },
  {
    "pdfPage": 16,
    "item": 7,
    "recordKey": "jwf1026-p16-item-007",
    "code": "FA028C-160(10)-0300-4",
    "nameZh": "链轮结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ187.2×56.5",
      "孔φ55"
    ]
  },
  {
    "pdfPage": 16,
    "item": 8,
    "recordKey": "jwf1026-p16-item-008",
    "code": "FA028C-160(10)-0300-1",
    "nameZh": "链轮结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ166×76.5",
      "孔φ55"
    ]
  },
  {
    "pdfPage": 16,
    "item": 9,
    "recordKey": "jwf1026-p16-item-009",
    "code": "MM6-0700-2",
    "nameZh": "密封装置结合件",
    "quantity": {
      "value": 40,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ206×28.5"
    ]
  },
  {
    "pdfPage": 16,
    "item": 10,
    "recordKey": "jwf1026-p16-item-010",
    "code": "FA028-0507",
    "nameZh": "链轮（41齿）",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ207.38×51",
      "孔φ40",
      "41齿"
    ]
  },
  {
    "pdfPage": 16,
    "item": 11,
    "recordKey": "jwf1026-p16-item-011",
    "code": "FA028-0704",
    "nameZh": "轴承座",
    "quantity": {
      "value": 40,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ145×50"
    ]
  },
  {
    "pdfPage": 16,
    "item": 12,
    "recordKey": "jwf1026-p16-item-012",
    "code": "JWF1026-160(10)-0601A",
    "nameZh": "加强板结合件",
    "quantity": {
      "value": 10,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "485×260"
    ]
  },
  {
    "pdfPage": 16,
    "item": 13,
    "recordKey": "jwf1026-p16-item-013",
    "code": "JWF1026-160(10)-0602",
    "nameZh": "底板",
    "quantity": {
      "value": 10,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "270×200"
    ]
  }
];

export const jwf1026P16ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
