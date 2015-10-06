var database = {};

database.users = [
	{username:'Anastasia', password:'doglady', bio:'dog lover, pizza eater.'},
	{username:'Elizabeth', password:'catlady', bio:'cat lover, cookie eater.'},
	{username:'David', password:'one', bio:'dragon lover, gangsta.'}
];

database.posts = [
  { title:'Twitter is okay...TEAM DAE TWITTER is AmAzInG',
    author:'David',
    timestamp: Date.now(),
    id: 0
  },
  { title:'Twitter should honstly consider a rebuild based on this model',
    author:'Anastasia',
    timestamp: Date.now(),
    id: 1
  },
  { title:'Team DAE Twitter rules',
    author:'Elizabeth',
    timestamp: Date.now(),
    id: 2
  },
  { title:'Team Dae is going to participate in a clone-a-thon',
    author:'David',
    timestamp: Date.now(),
    id: 3
  },
  { title:'Twitter...more like DAEitter',
    author:'Anastasia',
    timestamp: Date.now(),
    id: 4
  }
];

module.exports = database;
