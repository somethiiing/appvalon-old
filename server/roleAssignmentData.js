module.exports = {
  // good
  merlin: {
    roleTitle: 'Merlin',
    alignment: 'good',
    sees: {
      morgana: {
        roleTitle: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        roleTitle: 'Agravaine',
        alignment: 'evil'
      },
      colgrevance: {
        roleTitle: 'Colgrevance',
        alignment: 'evil'
      },
      genericEvil: {
        roleTitle: 'Generic Evil',
        alignment: 'evil'
      },
      assassin: {
        roleTitle: 'Assassin',
        alignment: 'evil'
      },
      oberon: {
        roleTitle: 'Oberon',
        alignment: 'evil'
      }
    },
    know: {},
    description: 'sees all players that are either Evil (except Mordred and NOberon) or are Lancelot; can be Assassinated.'
  },
  percival: {
    roleTitle: 'Percival',
    alignment: 'good',
    sees: {
      merlin: {
        roleTitle: 'merlin',
        alignment: 'unknown'
      },
      morgana: {
        roleTitle: 'morgana',
        alignment: 'unknown'
      }
    },
    description: 'sees Merlin and Morgana, but cannot distinguish which role each seen player has.'
  },
  tristan: {
    roleTitle: 'Tristan',
    alignment: 'good',
    sees: {
      iseult: {
        roleTitle: 'iseult',
        alignment: 'good'
      }
    },
    description: 'sees Iseult; always appear together; can be Assassinated as a pair. also known as the lovers or the twins'
  },
  iseult: {
    roleTitle: 'Iseult',
    alignment: 'good',
    sees: {
      tristan: {
        roleTitle: 'tristan',
        alignment: 'good'
      }
    },
    description: 'sees Tristan; always appear together; can be Assassinated as a pair. also known as the lovers or the twins'
  },
  titania: {
    roleTitle: 'Titania',
    alignment: 'good',
    sees: {},
    description: 'appears as Evil to Evil roles (except Colgrevance).'
  },
  genericGood: {
    roleTitle: 'Generic Good',
    alignment: 'good',
    sees: {},
    description: 'doesn\'t see anyone. The loyalest servant of King Arthur'
  },

  // bad
  assassin: {
    roleTitle: 'Assassin',
    alignment: 'evil',
    sees: {
      mordred: {
        roleTitle: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        roleTitle: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        roleTitle: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        roleTitle: 'Generic Evil',
        alignment: 'evil'
      },
      titania: {
        roleTitle: 'Titania',
        alignment: 'evil'
      }
    },
    description: 'is practically generic evil. Gets final say in assassination. If assassin is not present, then evil makes a consensus on who to kill'
  },
  mordred: {
    roleTitle: 'Mordred',
    alignment: 'evil',
    sees: {
      morgana: {
        roleTitle: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        roleTitle: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        roleTitle: 'Generic Evil',
        alignment: 'evil'
      },
      assassin: {
        roleTitle: 'Assassin',
        alignment: 'evil'
      },
      titania: {
        roleTitle: 'Titania',
        alignment: 'evil'
      }
    },
    description: 'hidden from Merlin'
  },
  morgana: {
    roleTitle: 'Morgana',
    alignment: 'evil',
    sees: {
      mordred: {
        roleTitle: 'Mordred',
        alignment: 'evil'
      },
      agravaine: {
        roleTitle: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        roleTitle: 'Generic Evil',
        alignment: 'evil'
      },
      assassin: {
        roleTitle: 'Assassin',
        alignment: 'evil'
      },
      titania: {
        roleTitle: 'Titania',
        alignment: 'evil'
      }
    },
    description: 'appears like Merlin to Percival.'
  },
  agravaine: {
    roleTitle: 'Agravaine',
    alignment: 'evil',
    sees: {
      mordred: {
        roleTitle: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        roleTitle: 'Morgana',
        alignment: 'evil'
      },
      genericEvil: {
        roleTitle: 'Generic Evil',
        alignment: 'evil'
      },
      assassin: {
        roleTitle: 'Assassin',
        alignment: 'evil'
      },
      titania: {
        roleTitle: 'Titania',
        alignment: 'evil'
      }
    },
    description: 'must play Fails; may declare after having been on a successful mission to cause it to Fail instead.'
  },
  colgrevance: {
    roleTitle: 'Colgrevance',
    alignment: 'evil',
    sees: {
      mordred: {
        roleTitle: 'Mordred',
        alignment: 'evil',
        knowsRole: true
      },
      morgana: {
        roleTitle: 'Morgana',
        alignment: 'evil',
        knowsRole: true
      },
      agravaine: {
        roleTitle: 'Agravaine',
        alignment: 'evil',
        knowsRole: true
      },
      genericEvil: {
        roleTitle: 'Generic Evil',
        alignment: 'evil',
        knowsRole: true
      },
      assassin: {
        roleTitle: 'Assassin',
        alignment: 'evil',
        knowsRole: true
      },
      titania: {
        roleTitle: 'Titania',
        alignment: 'evil',
        knowsRole: true
      }
    },
    description: 'is hidden from other Evil roles; knows which player has each Evil role.'
  },
  genericEvil: {
    roleTitle: 'Generic Evil',
    alignment: 'evil',
    sees: {
      mordred: {
        roleTitle: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        roleTitle: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        roleTitle: 'Agravaine',
        alignment: 'evil'
      },
      assassin: {
        roleTitle: 'Assassin',
        alignment: 'evil'
      },
      titania: {
        roleTitle: 'Titania',
        alignment: 'evil'
      }
    },
    description: 'An evil Minion of Mordred'
  },
  oberon: {
    roleTitle: 'Oberon',
    alignment: 'evil',
    sees: {},
    description: 'is hidden from other Evil roles, but is visible to Merlin'
  },
  noberon: {
    roleTitle: 'NOberon',
    alignment: 'evil',
    sees: {},
    description: 'is hidden from other Evil roles and is also hidden from Merlin'
  }
}
