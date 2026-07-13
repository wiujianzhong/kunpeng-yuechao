import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 17,
    "item": 1,
    "recordKey": "jwf1026-p17-item-001",
    "code": "FA028C-120-0500-2",
    "nameZh": "棉箱墙板结合件",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "2370×498"
    ]
  },
  {
    "pdfPage": 17,
    "item": 2,
    "recordKey": "jwf1026-p17-item-002",
    "code": "FA028C-120-0500-11",
    "nameZh": "大视窗结合件",
    "quantity": {
      "value": 20,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "810×410"
    ]
  },
  {
    "pdfPage": 17,
    "item": 3,
    "recordKey": "jwf1026-p17-item-003",
    "code": "FA028C-160-0500-4A",
    "nameZh": "网眼板结合件",
    "quantity": {
      "value": 5,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1700×1120×40"
    ]
  },
  {
    "pdfPage": 17,
    "item": 4,
    "recordKey": "jwf1026-p17-item-004",
    "code": "FA028C-160-0500-5",
    "nameZh": "封板结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "2515×950"
    ]
  },
  {
    "pdfPage": 17,
    "item": 5,
    "recordKey": "jwf1026-p17-item-005",
    "code": "FA028C-160-0500-6",
    "nameZh": "封板结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "2515×950"
    ]
  },
  {
    "pdfPage": 17,
    "item": 6,
    "recordKey": "jwf1026-p17-item-006",
    "code": "FA028C-160-0500-7",
    "nameZh": "封板结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "2515×850"
    ]
  },
  {
    "pdfPage": 17,
    "item": 7,
    "recordKey": "jwf1026-p17-item-007",
    "code": "FA028C-160-0500-8",
    "nameZh": "封板结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "2515×850"
    ]
  },
  {
    "pdfPage": 17,
    "item": 8,
    "recordKey": "jwf1026-p17-item-008",
    "code": "FA028C-160-0500-9",
    "nameZh": "撑挡结合件",
    "quantity": {
      "value": 4,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "799×87×40"
    ]
  },
  {
    "pdfPage": 17,
    "item": 9,
    "recordKey": "jwf1026-p17-item-009",
    "code": "FA028C-160-0500-10A",
    "nameZh": "网眼板结合件",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1700×1240×21"
    ]
  },
  {
    "pdfPage": 17,
    "item": 10,
    "recordKey": "jwf1026-p17-item-010",
    "code": "FA028-160-1705",
    "nameZh": "连接板",
    "quantity": {
      "value": 14,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1600×66"
    ]
  },
  {
    "pdfPage": 17,
    "item": 11,
    "recordKey": "jwf1026-p17-item-011",
    "code": "FA028C-120-0504A",
    "nameZh": "大托架",
    "quantity": {
      "value": 50,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "280×50×21"
    ]
  },
  {
    "pdfPage": 17,
    "item": 12,
    "recordKey": "jwf1026-p17-item-012",
    "code": "FA028C-120-0526",
    "nameZh": "小托架",
    "quantity": {
      "value": 24,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "70×50×25"
    ]
  },
  {
    "pdfPage": 17,
    "item": 13,
    "recordKey": "jwf1026-p17-item-013",
    "code": "FA028C-160-0501",
    "nameZh": "网眼下板",
    "quantity": {
      "value": 7,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1700×1250×2"
    ]
  }
];

export const jwf1026P17ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
