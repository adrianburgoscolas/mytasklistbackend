const { expect } = require('chai')
const { ServerData } = require('../utils/datastruct')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
chai.use(chaiHttp)
let id = ''

//Server Data Struct Unit Test
describe('Server Data Struct Unit Test', () => {
  it('Test create a new instance', function(done) {
    const dataStruct = new ServerData(200)
    expect(dataStruct).to.be.instanceof(ServerData)
    done()
  })

  it('Test an instance of ServerData datastruct', function(done) {
    const dataStruct = new ServerData(200, {info: 'server info'})
    expect(dataStruct.Data.payload).to.deep.equal({info: 'server info'})
    expect(dataStruct.Data.status).to.be.equal(200)
    done()
  })

  it('Test an instance of ServerData Error info', function(done) {
    const dataStruct = new ServerData(500)
      dataStruct.Error("Error happened", "Bad Connection")
      expect(dataStruct.Data.payload).to.deep.equal({})
    expect(dataStruct.Data.status).to.be.equal(500)
    done()
  })
})

//Test CRUD operations
describe('API Integration Test', () => {
  it('Test Create operation', function(done) {
    this.timeout(10000)
    chai
      .request(app)
      .post("/api/addtask")
      .send({ 'text': 'hello world' })
      .end((_, res) => {
          expect(res).to.have.status(200);
        id = res.body.payload._id
        console.log(id)
        done();
      });
  })

  it('Test Retrieve operation', function(done) {
    chai
      .request(app)
      .get("/api/alltask")
      .end((_, res) => {
          expect(res).to.have.status(200);
        done();
      });
  })

  it('Test Update operation', function(done) {
    chai
      .request(app)
      .patch("/api/updatetask")
      .send({ 'id': id,'text': 'hello world 2.0' })
      .end((_, res) => {
          expect(res).to.have.status(200);
        done();
      });
  })

  it('Test Delete operation', function(done) {
    chai
      .request(app)
      .delete("/api/deltask")
      .send({ 'id': id })
      .end((_, res) => {
          expect(res).to.have.status(200);
        done();
      });
  })
})
