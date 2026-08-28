export const profile = {
  name: '吴甜甜',
  englishRole: 'FINANCE GIRL',
  role: '财务主管',
  company: '阿兴纺织有限公司',
  direction: '企业财务 / 财务管理',
}

const imagePath = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`

export const photos = {
  hero: imagePath('hero.jpg'),
  work: imagePath('work.jpg'),
  life: imagePath('life.jpg'),
  atmosphere: imagePath('atmosphere.jpg'),
  gallery01: imagePath('gallery-01.jpg'),
  gallery02: imagePath('gallery-02.jpg'),
  gallery03: imagePath('gallery-03.jpg'),
}

export const financeStates = [
  ['账目状态', '必须平', 'BALANCED'],
  ['Excel 熟练度', '条件反射', 'CTRL + S'],
  ['月底生存指数', '■■■■□', '80% MAYBE'],
  ['咖啡需求', '随结账日增长', 'EXPONENTIAL'],
  ['看到 ¥0.01', '无法忽略', 'ABSOLUTELY NOT'],
] as const

export const formulas = [
  {
    formula: '=SUM(今天的快乐)',
    result: '#VALUE!',
    note: '可能是月底，也可能是公式引用错了。',
  },
  {
    formula: '=IF(账平了,"下班","继续核对")',
    result: '继续核对',
    note: 'Excel 从不撒谎，只是偶尔让人沉默。',
  },
] as const
