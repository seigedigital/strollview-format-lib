import svParser from './parser.js'

global.fetch = jest.fn((uri) => {
        const jsonfiles = {
            'https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff': '../data/01.json',
            'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00039006/manifest': '../data/02.json',
            'https://cdm16214.contentdm.oclc.org/iiif/info/medieval/101/manifest.json': '../data/03.json',
            'https://iiif.bodleian.ox.ac.uk/iiif/manifest/b73ca01f-aac8-4916-a7c6-3c8e67939a66.json': '../data/04.json',
            'https://staedelmuseum.iiif.cloud/manifests/0102/1000': '../data/05.json',
        }
        return Promise.resolve({
            json: () => {
                // console.log("uri: "+uri)
                const data = require (jsonfiles[uri])
                return Promise.resolve(data)
            }
        })
    }
)

describe('Part 1', () => {
 let p

 beforeEach(() => {
   p = new svParser("https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff")
   p.getVersion()
 })

 it('Basics: should be no errors.', () => {
   expect(p).toBeDefined()
   expect(p.status.errors).toBe(0)
 })

 it('Basics: should be version 0.', () => {
     expect(p).toBeDefined()
     expect(p.status.version).toBe(0)
 })

})

describe('Part 2', () => {
 let p

 beforeEach(() => {
   p = new svParser("https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff")
   p.fetchStroll()
 })

 it('Fetched: Should be no errors.', () => {
   expect(p).toBeDefined()
   expect(p.status.errors).toBe(0)
 })

 it('Fetched: should be version 2.', () => {
     expect(p).toBeDefined()
     expect(p.status.version).toBe(2)
 })

 it('Fetched: should be 7 pages.', () => {
     expect(p).toBeDefined()
     expect(p.status.pages).toBe(7)
     expect(p.data.label).toBe("DDD AAA")
 })

})

describe('Part 3', () => {
 let p

 beforeEach(() => {
   p = new svParser("https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff")
   p.fetchStroll().then(()=>{
       p.next()
       p.next()
   })
 })

 it('Fetched: Should be no errors.', () => {
   expect(p).toBeDefined()
   expect(p.status.cursor).toBe(2)
   expect(p.status.pages).toBe(7)
 })

 describe('Part 4', () => {
  let p

  beforeEach(() => {
    p = new svParser("https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff")
    p.fetchStroll().then(()=>{
        let d=true
        while(d) {
            d = p.next()
            if(d) {
                p.getCanvas(d.n).then((res) => {
                    console.log(p.status)
                    console.log(p.data)
                })
            }
        }
    })
  })

  it('Fetched: Should be no errors.', () => {
    expect(p).toBeDefined()
    expect(p.status.errors).toBe(1)
  })
 })

})
