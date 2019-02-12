import Character from '../Character';
import { getRandomCoordsOnCanvas } from '../../utilities/randomNumberUtilities';
import { getWeaponByName } from '../../weapons';
import { getArmorByName } from '../../armor';
import mageAI from '../../AI/mageAI';

/**
 *
 */
export default class Mage extends Character {
  constructor(scene = {}, name = 'mage') {
    super(scene);
    this.setTeam(name);
    this.coords = getRandomCoordsOnCanvas(scene.scale.width, scene.scale.height);
    this.setPosition(this.coords[0], this.coords[1])
    this.setName(name);
    this.setCharacterClass('mage');
    this.setDodgeRating(.032);
    this.setAgilityToDodgeRatio(19.444);

    // mages start with bonus to intellect:
    const baseIntellect = this.getIntellect();
    const mageIntellectBonus = 3;
    this.setIntellect(baseIntellect + mageIntellectBonus);
    // and spirit:
    const baseSpirit = this.getSpirit();
    const mageSpiritBonus = 2;
    this.setSpirit(baseSpirit + mageSpiritBonus);

    // starting equipment
    const equipped = this.getEquipped();
    equipped.mainHand = getWeaponByName("Crooked Staff");
    equipped.chest = getArmorByName("Apprentice's Robe");
    equipped.legs = getArmorByName("Apprentice's Pants");
    equipped.feet = getArmorByName("Apprentice's Boots");
    this.setEquipped(equipped);

    // starting hp
    const startingHp = this.getStamina() * 10;
    this.setHp(startingHp);

    this.update = mageAI();
  }
}