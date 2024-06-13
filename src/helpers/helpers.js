const isEmptyObj = (_) =>
  Object.keys(_).length === 0 && _.constructor === Object
const isEmptyArray = (_) => Array.isArray(_) && _.length === 0
const binary2Text = (str, args = { zero: '😡', one: '🥺' }) => {
  const { zero, one } = args
  return str
    .replaceAll(zero, '0')
    .replaceAll(one, '1')
    .match(/.{1,8}/g)
    .map((i) => i)
    .map((i) => parseInt(i, 2))
    .map((i) => String.fromCharCode(i))
    .join('')
}
const text2Binary = (str, args = { zero: '😡', one: '🥺' }) => {
  const { zero, one } = args
  return [...str]
    .map((i) => i.charCodeAt().toString(2).padStart(8, '0'))
    .join('')
    .replaceAll('0', zero)
    .replaceAll('1', one)
}
const uniqueKey = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)
const abbreviateNumber = (number) => {
  const abbreviations = ['k', 'M', 'B', 'T']

  // iterar a través de las abreviaturas
  for (let i = abbreviations.length - 1; i >= 0; i--) {
    // convertir el número a la abreviatura
    const abbreviation = abbreviations[i]
    const abbreviationValue = Math.pow(10, (i + 1) * 3)
    if (number >= abbreviationValue) {
      return `${(number / abbreviationValue).toFixed(1)}${abbreviation}`
    }
  }

  return number.toString()
}
const respuestas = [
  'Si',
  'No',
  'Posiblemente',
  'Seguro que no',
  'Obviamente',
  'Es cierto',
  'Definitivamente',
  'Lo mas probable',
  'No tengo una respuesta para eso..',
  'No podria confirmartelo',
  'No cuentes con ello',
  'Es muy dudoso',
  'Creeria que si',
  'Diria que no',
  'Los astros aun no se alinean'
]
const randomAnswer = () =>
  respuestas[Math.floor(Math.random() * respuestas.length)]
module.exports = {
  isEmptyArray,
  isEmptyObj,
  binary2Text,
  text2Binary,
  uniqueKey,
  abbreviateNumber,
  randomAnswer
}
