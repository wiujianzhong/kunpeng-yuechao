import {createJwf1026Spec} from './jwf1026-cell-factory.js';

const parts=[
  {
    "pdfPage": 11,
    "item": 1,
    "recordKey": "jwf1026-p11-item-001",
    "code": "JWF1026-160(10)-0400-1",
    "nameZh": "托板结合件",
    "quantity": {
      "value": 6,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "1599×392×55"
    ]
  },
  {
    "pdfPage": 11,
    "item": 2,
    "recordKey": "jwf1026-p11-item-002",
    "code": "JWF1026-160(10)-0400-2",
    "nameZh": "输棉帘辊结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "φ66×1590",
      "轴端φ35/φ20"
    ]
  },
  {
    "pdfPage": 11,
    "item": 3,
    "recordKey": "jwf1026-p11-item-003",
    "code": "JWF1026-160(10)-0400-3",
    "nameZh": "挡条结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长599",
      "截面32×18×12"
    ]
  },
  {
    "pdfPage": 11,
    "item": 4,
    "recordKey": "jwf1026-p11-item-004",
    "code": "JWF1026-160(10)-0400-4",
    "nameZh": "挡条结合件",
    "quantity": {
      "value": 4,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长2008",
      "截面32×18×12"
    ]
  },
  {
    "pdfPage": 11,
    "item": 5,
    "recordKey": "jwf1026-p11-item-005",
    "code": "JWF1026-160(10)-0400-5",
    "nameZh": "挡条结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长1139",
      "截面32×18×12"
    ]
  },
  {
    "pdfPage": 11,
    "item": 6,
    "recordKey": "jwf1026-p11-item-006",
    "code": "JWF1026-160(10)-0400-6",
    "nameZh": "挡条结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长1139",
      "截面32×18×12"
    ]
  },
  {
    "pdfPage": 11,
    "item": 7,
    "recordKey": "jwf1026-p11-item-007",
    "code": "JWF1026-160(10)-0400-7",
    "nameZh": "挡条结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长599",
      "截面32×18×12"
    ]
  },
  {
    "pdfPage": 11,
    "item": 8,
    "recordKey": "jwf1026-p11-item-008",
    "code": "JWF1026-160(10)-0400-8A",
    "nameZh": "张紧装置结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长65.4"
    ]
  },
  {
    "pdfPage": 11,
    "item": 9,
    "recordKey": "jwf1026-p11-item-009",
    "code": "JWF1026-160(10)-0400-9",
    "nameZh": "毛刷结合件",
    "quantity": {
      "value": 4,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "445×45"
    ]
  },
  {
    "pdfPage": 11,
    "item": 10,
    "recordKey": "jwf1026-p11-item-010",
    "code": "JWF1026-160(10)-0400-10",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长1100",
      "高80.5"
    ]
  },
  {
    "pdfPage": 11,
    "item": 11,
    "recordKey": "jwf1026-p11-item-011",
    "code": "JWF1026-160(10)-0400-11",
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
    "pdfPage": 11,
    "item": 12,
    "recordKey": "jwf1026-p11-item-012",
    "code": "JWF1026-160(10)-0400-12",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 2,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "长1300",
      "高56"
    ]
  },
  {
    "pdfPage": 11,
    "item": 13,
    "recordKey": "jwf1026-p11-item-013",
    "code": "JWF1026-160(10)-0400-13",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": []
  },
  {
    "pdfPage": 11,
    "item": 14,
    "recordKey": "jwf1026-p11-item-014",
    "code": "JWF1026-160(10)-0400-14",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": []
  },
  {
    "pdfPage": 11,
    "item": 15,
    "recordKey": "jwf1026-p11-item-015",
    "code": "JWF1026-160(10)-0400-15",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "120×155"
    ]
  },
  {
    "pdfPage": 11,
    "item": 16,
    "recordKey": "jwf1026-p11-item-016",
    "code": "JWF1026-160(10)-0400-16",
    "nameZh": "密封结合件",
    "quantity": {
      "value": 1,
      "unit": "件",
      "meaning": "单台设备用量"
    },
    "dimensions": [
      "120×155"
    ]
  }
];

export const jwf1026P11ModelSpecs=Object.fromEntries(parts.map(part=>[part.code||part.recordKey,createJwf1026Spec(part)]));
