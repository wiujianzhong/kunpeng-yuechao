import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 18,
    "item": 1,
    "recordKey": "jwf1026-p18-item-001",
    "code": "TZH1107-10X3",
    "nameZh": "密封条",
    "quantity": {
      "value": 1120,
      "unit": "dm",
      "meaning": "单台设备柔性件长度用量"
    },
    "dimensions": [
      "10×3",
      "L=1120 dm"
    ]
  },
  {
    "pdfPage": 18,
    "item": 2,
    "recordKey": "jwf1026-p18-item-002",
    "code": "TF2121A-00",
    "nameZh": "维修窗",
    "quantity": {
      "value": 24,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "410×440"
    ]
  },
  {
    "pdfPage": 18,
    "item": 3,
    "recordKey": "jwf1026-p18-item-003",
    "code": "MM6-2217",
    "nameZh": "玻璃φ45",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ45/φ40×6"
    ]
  }
];

export const jwf1026P18ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
