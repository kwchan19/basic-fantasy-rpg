import Character from '../Character';
import { getWeaponByName } from '../../loot/weapons';
import { getArmorByName } from '../../loot/armor';
import OrcAI from './OrcAI';
import MobAbilities from './MobAbilities';
import createLoot from '../../loot/createLoot';
import Anims from '../Managers/Anims';


/**
 *
 */
export default class Orc extends Character {
  constructor(scene = {}, x = 0, y = 0) {
    super(scene, x, y)
    this.ability = new MobAbilities(this);
    this.animations = new Anims(this, 'orc-mask', 'orc');

    // starting texture and size;
    this.setTexture('orc-mask-idle', 0).setSize(22, 16);


    this.setTeam('mob');
    this.setName('orc');
    this.setCharacterClass('mob');
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(20);
    this.stat.setStrAPR(.5)


    // starting equipment
    const equipped = this.equipment.equipped();
    equipped.mainHand = getWeaponByName("Deadman Dagger");
    this.equipment.setEquipped(equipped);

    // starting hp
    this.stat.setBaseHp(10);
    const startingHp = (this.stat.baseStamina() * 10) + this.stat.baseHp();
    this.stat.setHp(startingHp);

    // starting loot
    const loot = createLoot(this.getName());
    this.setLoot(loot);

    this.AI = OrcAI();
    this.classUpdate = function() {
      // block in case update runs extra tick before
    }
  }
}
