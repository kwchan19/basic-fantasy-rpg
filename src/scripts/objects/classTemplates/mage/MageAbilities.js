import spellHitTable from '../../../hitTables/spellHitTable';
import { getConsumableByName } from '../../../loot/consumables';
import wand from './abilities/wand';
import arcaneIntellect from './abilities/arcaneIntellect';

export default class MageAbilities {
  constructor(character) {
    let abilities = ['wand'];

    this.wand = wand.bind(character);
    this.arcaneIntellect = arcaneIntellect.bind(character);
    
    /**
     * Conjure Water - Conjures 2 bottle of water, providing
     * the mage and his allies with something to drink.
     *
     * level: 1
     *
     * requires: level 4
     *
     * @returns {void}
     */
    this.conjureWater = function() {
      character.timer.setCastTimer(0);
      const castTime = 3 * 60; //seconds
      const manaCost = 60;
      if (character.mana.mana() - manaCost > 0) {
        const cast = {
          name: 'Conjure Water',
          castTime,
          cast: () => {
            character.mana.spendMana(manaCost);
            character.inventory.add(getConsumableByName("Conjured Water"))
          }
        }
        character.timer.setSpell(cast);
      }
    }

    /**
     * Conjure Food - Conjures 2 bottle of food, providing
     * the mage and his allies with something to eat.
     *
     * level: 1
     *
     * requires: level 4
     *
     * @returns {void}
     */
    this.conjureFood = function() {
      const castTime = 3 * 60; //seconds * frames
      const manaCost = 60;
      if (character.mana.mana() - manaCost > 0) {
        const cast = {
          name: 'Conjure Food',
          castTime,
          cast: () => {
            character.mana.spendMana(manaCost);
            character.inventory.add(getConsumableByName("Conjured Food"))
          }
        }
        character.timer.setSpell(cast);
      }
    }

    /**
     * Arcane Missiles -
     *
     * level: 1
     *
     * requires: level 8
     *
     * @returns {void}
     */
    this.arcaneMissiles = function() {
      // check for cooldown: fix timer to work with spells
      // const canCast = character.timer.checkAbilityTimer('arcaneMissiles');
      // if (!canCast) return;

      // check if there is a target
      const target = character.target.currentTarget();
      if (!target) return console.log("I need a target");

      // check that target isnt friendly
      if (target.team() === character.team()) return console.log("I cant do that")

      // check if target is in range
      const range = 300;
      const inRange = character.target.rangeCheck(target, range);
      if (!inRange) return console.log("I need to get closer");

      // check mana
      const manaCost = 85;
      const paidMana = character.mana.spendMana(manaCost);
      if (!paidMana) return;
      const duration = 3;
      const interval = 1;
      // channeled, .132 is spell coefficient
      const dmgTick = .132 * character.stat.spellPower();
      // create buff item:
      const combatObject = {
        attacker: character.getName(),
        target: target.getName(),
        status: 'hit',
        type: 'magic',
        range: 'ranged',
        damageType: 'arcane',
        amount: dmgTick,
        bonusThreat: 0,
        mitigationAmount: 0,
        hand: 'main',
        time: Date.now()
      }
      target.buffs.add({
        name: 'arcaneMissiles',
        duration: duration * 60,
        interval: interval * 60,
        channel: true,
        combatObject,
        attacker: character
      });
    }

    this.polymorph = function() {
      // Transforms the enemy into a sheep, forcing it to wander around for up to 20 sec.
      // While wandering, the sheep cannot attack or cast spells but will regenerate very quickly.
      // Any damage will transform the target back into its normal form.
      // Only one target can be polymorphed at a time. Only works on Beasts, Humanoids and Critters.
      // requires level 8
    }

    this.fireball = function() {
      // requires level 1
      // Hurls a fiery ball that causes 14 to 22 Fire damage
      // and an additional 2 Fire damage over 4 sec.
    }

    this.fireBlast = function() {
      // requires level 6
      // Blasts the enemy for 24 to 32 Fire damage.
    }

    this.frostArmor = function() {
      // requires level 1
      // ncreases Armor by 30. If an enemy strikes the caster, they may have
      // their movement slowed by 30% and the time between their attacks
      // increased by 25% for 5 sec. Only one type of Armor spell can be
      // active on the Mage at any time. Lasts 30 min.
    }

    this.frostbolt = function() {
      // requires level 4
      // Launches a bolt of frost at the enemy, causing 18 to 20 Frost
      // damage and slowing movement speed by 40% for 5 sec.
    }



    /**
    * getAbilities
    *
    * @returns {array}  characters abilitees
    */
    this.getAbilities = function() {
      return abilities;
    }

    /**
    * setAbilities - spells character knows
    *
    * @param  {array} newAbilities
    * @returns {void}
    */
    this.setAbilities = function(newAbilities) {
      abilities = newAbilities;
    }

  }
}
