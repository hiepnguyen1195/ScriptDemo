import LinkedList from './linked-list'

describe('LinkedList', () => {
  it('add/extract elements to the end of the list with push/pop', () => {
    const list = new LinkedList<number>()
    list.push(10)
    list.push(20)
    expect(list.pop()).toBe(20)
    expect(list.pop()).toBe(10)
  })

  it('extract elements from the beginning of the list with shift', () => {
    const list = new LinkedList<number>()
    list.push(10)
    list.push(20)
    expect(list.shift()).toBe(10)
    expect(list.shift()).toBe(20)
  })

  it('add/extract elements from the beginning of the list with unshift/shift', () => {
    const list = new LinkedList<number>()
    list.unshift(10)
    list.unshift(20)
    expect(list.shift()).toBe(20)
    expect(list.shift()).toBe(10)
  })

  it('unshift/pop', () => {
    const list = new LinkedList<number>()
    list.unshift(10)
    list.unshift(20)
    expect(list.pop()).toBe(10)
    expect(list.pop()).toBe(20)
  })

  it('example', () => {
    const list = new LinkedList<number>()
    list.push(10)
    list.push(20)
    list.unshift(50)
    console.log(list);
    expect(list.pop()).toBe(20)
    expect(list.shift()).toBe(50)
    list.push(30)
    console.log(list);
    expect(list.shift()).toBe(10)
    list.unshift(40)
    list.push(50)
    expect(list.shift()).toBe(40)
    expect(list.pop()).toBe(50)
    expect(list.shift()).toBe(30)
  })

  it('can count its elements', () => {
    const list = new LinkedList<number>()
    expect(list.count()).toBe(0)
    list.push(10)
    expect(list.count()).toBe(1)
    list.push(20)
    expect(list.count()).toBe(2)
  })

  it('sets head/tail after popping last element', () => {
    const list = new LinkedList<number>()
    list.push(10)
    list.pop()
    list.unshift(20)
    expect(list.count()).toBe(1)
    expect(list.pop()).toBe(20)
  })

  it('sets head/tail after shifting last element', () => {
    const list = new LinkedList<number>()
    list.unshift(10)
    list.shift()
    list.push(20)
    expect(list.count()).toBe(1)
    expect(list.shift()).toBe(20)
  })

})