var test = require('tape'),
    colorize = require('tap-colorize');
var oppuml = require(__dirname+'/../');

test.createStream().pipe(colorize()).pipe(process.stdout);

test('!',function(t){
  var dt = {
    title: 'test',
    author: 'my name',
    content: {
      'Project': {
        'Task1': ['Task1-1',{'Task1-2':['Task1-2-1']}],
        'Task2': ['Task2-1','Task2-1-2']
      }
    }
  };

  var res = [
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
    '<opml version="1.0">',
    '<head title="test" ownerName="my name"></head>',
    '<body>',
    '<outline text="Project">',
    '<outline text="Task1">',
    '<outline text="Task1-1"></outline>',
    '<outline text="Task1-2">',
    '<outline text="Task1-2-1"></outline>',
    '</outline>',
    '</outline>',
    '<outline text="Task2">',
    '<outline text="Task2-1">',
    '</outline>',
    '<outline text="Task2-1-2">',
    '</outline>',
    '</outline>',
    '</outline>',
    '</body>',
    '</opml>'].join('');
  
  t.equal(oppuml(dt),res);
  t.end();
});
