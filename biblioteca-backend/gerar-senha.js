const bcrypt = require('bcrypt'); 

bcrypt.hash('minha-senha', 10).then(hash => console.log(hash));