const roleData = require('./roleAssignmentData');

/**
  playerList: array of strings.
    ex: [ 'wilson', 'vinh', 'bridget', 'steven', 'kelvin', 'richard', 'andrew' ]

  settings: object
    ex: settings: {
      numPeople: 7, // number
      numGood: 4, // number
      numEvil: 3, // number
      roles: {
        merlin: true, //bool
        percival: true, //bool
        tristan: false, //bool
        iseult: false, //bool
        titania: false, //bool
        genGood: true, //bool
        numGenGood: 2, //num

        assassin: true, //bool
        mordred: true, //bool
        morgana: true, //bool
        agravaine: false, //bool
        colgrevance: false, //bool
        oberon: false, //bool
        noberon: false, //bool
        genEvil: false, //bool
        numGenEvil: 0 //num
      }
    }



    OUTPUT:
    large object with peoples names and data
    {
      wilson: {
        role: 'Merlin',
        sees: {
          kelvin: { alignment: 'evil' },
          andrew: { alignment: 'evil' }
        }
      },
      vinh: {
        role: 'Percival',
        sees: {
          wilson: { alignment: 'unknown' },
          andrew: { alignment: 'unknown' }
        }
      },
      bridget: {
        role: 'Generic Good',
        sees: {}
      },
      steven: {
        role: 'Generic Good',
        sees: {}
      },
      kelvin: {
        role: 'Assassin',
        sees: {
          richard: { alignment: 'evil' },
          andrew: { alignment: 'evil' }
        }
      },
      richard: {
        role: 'Mordred',
        sees: {
          kelvin: { alignment: 'evil' },
          andrew: { alignment: 'evil }
        }
      },
      andrew: {
        role: 'Morgana',
        sees: {
          kelvin: { alignment: 'evil' },
          richard: { alignment: 'evil }
        }
      }
    }
 */

function createRoleAssignment(playerList, settings) {
  /**
    1. compare list of good roles with numGood, compare list of evil roles with numEvil, compare total with numPeople
    2. generate list of roles, ['merlin', 'percival', 'genericGood1', 'genericgood2', 'assassin', 'mordred', 'morgana' ]
    - 3. // shuffle role or person array
    4. assign each person with a role, this should be an object
    5. assign data to each person's role

   */

  return {}
}

function settingsRoleNumberCheck(arr,settings) {
  let goodCounter = 0;
  let badCounter = 0;
  let total = 0;
 
  for(i=0; i<arr.length; i++){
    if(roleData[arr[i]].alignment === 'good'){
      goodCounter++;
    }
    else{
      badCounter++
    }
  }
  
  total = goodCounter + badCounter;
  if(goodCounter===settings.numGood
    &&badCounter===settings.numEvil
    &&(total===settings.numPeople)){
     return 'Number check pass!';
    }
  else{
    return 'Someone fucked up';
  } 
}

function generateRoleList(settings){
  result = []
  if(!settings.roles){
    return 'Error: no roles!';
  }
  for (const key of Object.keys(settings.roles)) {
    if (settings.roles[key] === true){
        if(roleData[key].alignment === 'good'){
          if(key === 'genericGood'){
            for(i=0; i<settings.roles.numGenGood; i++){
              result.push(key)
            }
          }
          else{
            result.push(key);
          }
        }
        if(roleData[key].alignment === 'evil'){
          if(key === 'genericEvil'){
            for(i=0; i<settings.roles.numGenEvil; i++){
              result.push(key)
            }
          }
          else{
            result.push(key);
          }
        }
           
   }
  }
  return result;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function assignRoles(playerList,roleList){
  obj={};
  for(i=0; i<playerList.length; i++){
    obj[playerList[i]] = roleList[i];
  }
  return obj;
}


const fakePlayerList = ['wilson', 'bridget', 'vinh', 'steven', 'kelvin', 'richard', 'andrew'];

const fakeSettings = {
  numPeople: 7, // number
  numGood: 4, // number
  numEvil: 3, // number
  roles: {
    merlin: true, //bool
    percival: true, //bool
    tristan: false, //bool
    iseult: false, //bool
    titania: false, //bool
    genericGood: true, //bool
    numGenGood: 2, //num

    assassin: true, //bool
    mordred: true, //bool
    morgana: true, //bool
    agravaine: false, //bool
    colgrevance: false, //bool
    oberon: false, //bool
    noberon: false, //bool
    genericEvil: false, //bool
    numGenEvil: 0 //num
  }
};

// const testRoleAssignment = createRoleAssignment(fakePlayerList, fakeSettings);
// console.log(JSON.stringify(testRoleAssignment, null, 2));



// for (const key of Object.keys(obj)) {
//   console.log(key, obj[key]);
// }

roleArr = generateRoleList(fakeSettings);
console.log(roleArr);
console.log(settingsRoleNumberCheck(roleArr,fakeSettings));
shufflePlayerList = shuffle(fakePlayerList);
console.log(assignRoles(shufflePlayerList,roleArr));
