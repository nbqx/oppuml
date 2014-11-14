var oppuml = require('./');

var data = {
  title: 'title',
  author: 'authorName',
  content: {
    'Project': {
      'Task1': [
        {
          'Task1-1':{
            'Task1-1-1': [
              'Task1-1-1-1',
              {
                'Task1-1-1-2':[
                  'Task1-1-1-2-1'
                ]
              }
            ]
          }
        },
        'Task1-2'
      ],
      'Task2': {
        'Task2-1': ['Task2-1-1']
      }
    }
  }
};

// sync
console.log(oppuml(data));

// stream
var fs = require('fs'),
    JSONStream = require('JSONStream');

fs.createReadStream(__dirname+'/test/sample.json')
  .pipe(JSONStream.parse())
  .pipe(oppuml.createStream())
  .pipe(process.stdout);
