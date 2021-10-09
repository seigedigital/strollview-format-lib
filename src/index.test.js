import svParser from './parser.js'

global.fetch = jest.fn((uri) => {
        const jsonfiles = {
            'https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff': '../data/2-01.json',
            'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00039006/manifest': '../data/2-02.json',
            'https://cdm16214.contentdm.oclc.org/iiif/info/medieval/101/manifest.json': '../data/2-03.json',
            'https://iiif.bodleian.ox.ac.uk/iiif/manifest/b73ca01f-aac8-4916-a7c6-3c8e67939a66.json': '../data/2-04.json',
            'https://staedelmuseum.iiif.cloud/manifests/0102/1000': '../data/2-05.json',
            'https://strollid.manducus.net/leanderseige/d3a26d2b8fd49019542c0a9dbf9f3c2b': '../data/1-01.json',
            'https://iiif.ub.uni-leipzig.de/0000032643/manifest.json': '../data/1-02.json',
            'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00087481/manifest': '../data/1-03.json',
            'https://sammlung.belvedere.at/apis/iiif/presentation/v2/1-objects-7952/manifest': '../data/1-04.json',
            'https://ids.si.edu/ids/manifest/NMAH-JN2016-01017': '../data/1-05.json'
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

// Version 2 Tests

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
     expect(p.data.creator).toBe("Leander")
     expect(p.data.rights).toBe("http://creativecommons.org/licenses/by/4.0/")
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
                    // console.log(p.status)
                    // console.log(p.data)
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

// Version 1 Tests

 describe('Part 5', () => {
  let p

  beforeEach(() => {
    p = new svParser("https://strollid.manducus.net/leanderseige/d3a26d2b8fd49019542c0a9dbf9f3c2b")
    // p = new svParser("https://strollid.manducus.net/leanderseige/12c7f5ee5c6245cf5a401743a59247ff")
    p.fetchStroll()
  })

  it('Fetched: Should be no errors.', () => {
    expect(p).toBeDefined()
    expect(p.status.errors).toBe(0)
  })

  it('Fetched: should be version 1.', () => {
      expect(p).toBeDefined()
      expect(p.status.version).toBe(1)
  })

  it('Fetched: should be 7 pages.', () => {
      expect(p).toBeDefined()
      expect(p.status.pages).toBe(8)
      expect(p.data.label).toBe("Demo ")
      expect(p.data.creator).toBe("Leander Seige")
      expect(p.data.rights).toBe("http://creativecommons.org/licenses/by-sa/4.0/")
  })

 })

 describe('Part 6', () => {
  let p

  beforeEach(() => {
    p = new svParser("https://strollid.manducus.net/leanderseige/d3a26d2b8fd49019542c0a9dbf9f3c2b")
    p.fetchStroll().then(()=>{
        p.next()
        p.next()
    })
  })

  it('Fetched: Should be no errors.', () => {
    expect(p).toBeDefined()
    expect(p.status.cursor).toBe(2)
    expect(p.status.pages).toBe(8)
  })
})


describe('Part 7', () => {
   let p

   beforeEach(() => {
     p = new svParser("https://strollid.manducus.net/leanderseige/d3a26d2b8fd49019542c0a9dbf9f3c2b")
     p.fetchStroll().then(()=>{
         let d=true
         while(d) {
             d = p.next()
             if(d) {
                 p.getCanvas(d.n).then((res) => {
                     // console.log(p.status)
                     // console.log(p.data)
                 })
             }
         }
     })
   })

   it('Fetched: Should be 2 errors.', () => {
     expect(p).toBeDefined()
     expect(p.status.errors).toBe(1)
     console.log(p.status)
   })
})
