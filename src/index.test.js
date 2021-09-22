import svParser from './parser.js'
import teststroll from '../data/teststroll.json'

describe('Parser unit tests', () => {
 let p

 beforeEach(() => {
   p = new svParser(teststroll)
   p.getVersion()
 })

 it('Should be ok', () => {
   expect(p).toBeDefined()
   expect(p.status.errors).toBe(0)
 })

 it('Should be version 2', () => {
     expect(p).toBeDefined()
     expect(p.status.version).toBe(2)
 })

})
