export const roleData = {
  // good
  merlin: {
    role: 'Merlin',
    alignment: 'good',
    sees: {
      morgana: {
        role: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        role: 'Agravaine',
        alignment: 'evil'
      },
      colgrevance: {
        role: 'Colgrevance',
        alignment: 'evil'
      },
      genericEvil: {
        role: 'Generic Evil',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      },
      assassin: {
        role: 'Assassin',
        alignment: 'evil'
      },
      oberon: {
        role: 'Oberon',
        alignment: 'evil'
      }
    },
    know: {},
    description: 'sees all players that are either Evil (except Mordred and NOberon) or are Lancelot; can be Assassinated.'
  },
  percival: {
    role: 'Percival',
    alignment: 'good',
    sees: {
      merlin: {
        role: 'merlin',
        alignment: 'unknown'
      },
      morgana: {
        role: 'morgana',
        alignment: 'unknown'
      }
    },
    description: 'sees Merlin and Morgana, but cannot distinguish which role each seen player has.'
  },
  tristan: {
    role: 'Tristan',
    alignment: 'good',
    sees: {
      iseult: {
        role: 'iseult',
        alignment: 'good'
      }
    },
    description: 'sees Iseult; always appear together; can be Assassinated as a pair. also known as the lovers or the twins'
  },
  iseult: {
    role: 'Iseult',
    alignment: 'good',
    sees: {
      tristan: {
        role: 'tristan',
        alignment: 'good'
      }
    },
    description: 'sees Tristan; always appear together; can be Assassinated as a pair. also known as the lovers or the twins'
  },
  titania: {
    role: 'Titania',
    alignment: 'good',
    sees: {},
    description: 'appears as Evil to Evil roles (except Colgrevance).'
  },
  genericGood: {
    role: 'Generic Good',
    alignment: 'good',
    sees: {},
    description: 'doesn\'t see anyone. The loyalest servant of King Arthur'
  },

  // bad
  assassin: {
    role: 'Assassin',
    alignment: 'evil',
    sees: {
      mordred: {
        role: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        role: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        role: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        role: 'Generic Evil',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      }
    },
    description: 'is hidden from Merlin.'
  },
  mordred: {
    role: 'Mordred',
    alignment: 'evil',
    sees: {
      morgana: {
        role: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        role: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        role: 'Generic Evil',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      },
      assassin: {
        role: 'Assassin',
        alignment: 'evil'
      }
    }
  },
  morgana: {
    role: 'Morgana',
    alignment: 'evil',
    sees: {
      mordred: {
        role: 'Mordred',
        alignment: 'evil'
      },
      agravaine: {
        role: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        role: 'Generic Evil',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      },
      assassin: {
        role: 'Assassin',
        alignment: 'evil'
      }
    },
    description: 'appears like Merlin to Percival.'
  },
  agravaine: {
    role: 'Agravaine',
    alignment: 'evil',
    sees: {
      mordred: {
        role: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        role: 'Morgana',
        alignment: 'evil'
      },
      genericEvil: {
        role: 'Generic Evil',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      },
      assassin: {
        role: 'Assassin',
        alignment: 'evil'
      }
    },
    description: 'must play Fails; may declare after having been on a successful mission to cause it to Fail instead.'
  },
  colgrevance: {
    role: 'Colgrevance',
    alignment: 'evil',
    sees: {
      mordred: {
        role: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        role: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        role: 'Agravaine',
        alignment: 'evil'
      },
      genericEvil: {
        role: 'Generic Evil',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      },
      assassin: {
        role: 'Assassin',
        alignment: 'evil'
      }
    },
    description: 'is hidden from other Evil roles; knows which player has each Evil role.'
  },
  genericEvil: {
    role: 'Generic Evil',
    alignment: 'evil',
    sees: {
      mordred: {
        role: 'Mordred',
        alignment: 'evil'
      },
      morgana: {
        role: 'Morgana',
        alignment: 'evil'
      },
      agravaine: {
        role: 'Agravaine',
        alignment: 'evil'
      },
      lancelot: {
        role: 'Lancelot',
        alignment: 'evil'
      },
      assassin: {
        role: 'Assassin',
        alignment: 'evil'
      }
    },
    description: 'An evil Minion of Mordred'
  },
  oberon: {
    role: 'Oberon',
    alignment: 'evil',
    sees: {},
    description: 'is hidden from other Evil roles, but is visible to Merlin'
  },
  noberon: {
    role: 'NOberon',
    alignment: 'evil',
    sees: {},
    description: 'is hidden from other Evil roles and is also hidden from Merlin'
  }
}
