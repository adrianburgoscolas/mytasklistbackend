//ServerData provide an homogeneous data structure to communicate
//from server to client
module.exports.ServerData = class ServerData {
  data = {
    status: null,
    payload: null,
    error: {
      message: '',
      detail: ''
    }
  }

  constructor(status, data = {}){
    this.data.status = status
    this.data.payload = data
  }

  get Data() {
    return this.data
  }

  Error(message, detail) {
    this.data.error.message = message
    this.data.error.detail = detail
    return this.data
  }
}
