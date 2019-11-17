const { roleData } = require('./roleAssignmentData');

/**
  playerList: array of strings.
    ex: [ 'wilson', 'vinh', 'bridget', 'steven', 'kelvin', 'andrew', 'richard' ]

  settings: object
    ex: settings: {
      numPeople: 7, // number
      numGood: 4, // number
      numEvil: 3, // number
      roles: {
        hasMerlin: true, //bool
        hasPercival: true, //bool
        hasTristan: false, //bool
        hasIseult: false, //bool
        hasTitania: false, //bool
        hasGenGood: true, //bool
        numGenGood: 2, //num

        hasAssassin: true, //bool
        hasMordred: true, //bool
        hasMorgana: true. //bool
        hasAgravaine: false, //bool
        hasColgrevance: false, //bool
        hasOberon: false, //bool
        hasNOberon: false, //bool
        hasGenEvil: false, //bool
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
          richard: { alignment: 'evil' }
        }
      },
      vinh: {
        role: 'Percival',
        sees: {
          wilson: { alignment: 'unknown' },
          richard: { alignment: 'unknown' }
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

}


const fakePlayerList = ['wilson', 'bridget', 'vinh', 'steven', 'kelvin', 'richard', 'andrew'];

const fakeSettings = {
  numPeople: 7, // number
  numGood: 4, // number
  numEvil: 3, // number
  roles: {
    hasMerlin: true, //bool
    hasPercival: true, //bool
    hasTristan: false, //bool
    hasIseult: false, //bool
    hasTitania: false, //bool
    hasGenGood: true, //bool
    numGenGood: 2, //num

    hasAssassin: true, //bool
    hasMordred: true, //bool
    hasMorgana: true, //bool
    hasAgravaine: false, //bool
    hasColgrevance: false, //bool
    hasOberon: false, //bool
    hasNOberon: false, //bool
    hasGenEvil: false, //bool
    numGenEvil: 0 //num
  }
};

const testRoleAssignment = createRoleAssignment(fakePlayerList, fakeSettings);
console.log(JSON.stringify(testRoleAssignment, null, 2))