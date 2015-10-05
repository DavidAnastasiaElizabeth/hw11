var database = {};

database.users = [
	{username:'Anastasia', password:'doglady', bio:'dog lover, pizza eater.'},
	{username:'Elizabeth', password:'catlady', bio:'cat lover, cookie eater.'},
	{username:'David', password:'one', bio:'dragon lover, gangsta.'}
];

database.posts = [
  { title:'Twitter is okay...TEAM DAE TWITTER is AmAzInG',
    author:'David'
  },
  { title:'Twitter should honstly consider a rebuild based on this model',
    author:'Anastasia'
  },
  { title:'Team DAE Twitter rules',
    author:'Elizabeth'
  },
  { title:'Team Dae is going to participate in a clone-a-thon',
    author:'David'
  },
  { title:'Twitter...more like DAEitter',
    author:'Anastasia'
  }
];

module.exports = database;
