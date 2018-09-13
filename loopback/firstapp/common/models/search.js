'use strict';

module.exports = function(Search) {
  Search.disableRemoteMethodByName('invoke', true);
  Search.disableRemoteMethodByName('search', true);

  Search.getSearch = function(req,q,cb){

    const handleResponse = (err, res) => {
      if(err){
        cb(err);
      }else{
        cb(null, res);
      }
    }
    const x3TraceId = req.get('X-B3-TraceId');
    const x3SpanId = req.get('X-B3-SpanId');
    
    Search.search(q,x3TraceId, x3SpanId, handleResponse);
  }
  Search.remoteMethod("getSearch", {
    "http": {"verb": "get", "path": "/"},
    "accepts": [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'q', type: 'string', required: true, },
    ],
    "returns": {arg: "search", type: "Search"}
  });
}
