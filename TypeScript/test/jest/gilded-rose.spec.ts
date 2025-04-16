import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should decrease sellIn and quality by 1 for normal items', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it('should not decrease quality below 0', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should increase quality of Aged Brie as it ages', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(31);
  });

  it('should not increase quality of Aged Brie above 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should increase quality of Backstage passes as sellIn approaches', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it('should increase quality of Backstage passes by 2 when 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it('should increase quality of Backstage passes by 3 when 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it('should drop quality of Backstage passes to 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should not change quality or sellIn of Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });

  it('should degrade quality of Conjured items twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(18);
  });
});
