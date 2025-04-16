import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should decrease sellIn and quality for normal items', () => {
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

  it('should increase quality of Aged Brie as it gets older', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(31);
  });

  it('should not increase quality above 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should handle Backstage passes quality increase correctly', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21); // +1 when sellIn > 10
    expect(items[1].quality).toBe(22); // +2 when 6 <= sellIn <= 10
    expect(items[2].quality).toBe(23); // +3 when sellIn <= 5
  });

  it('should drop Backstage passes quality to 0 after the concert', () => {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should not change quality or sellIn for Sulfuras', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(80);
  });

  it('should degrade quality twice as fast after sellIn date passes', () => {
    const gildedRose = new GildedRose([new Item('Normal Item', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  it('should increase Aged Brie quality faster after sellIn date passes', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(32);
  });

  it('should handle multiple items correctly', () => {
    const gildedRose = new GildedRose([
      new Item('Normal Item', 5, 10),
      new Item('Aged Brie', 2, 0),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
    expect(items[1].sellIn).toBe(1);
    expect(items[1].quality).toBe(1);
    expect(items[2].sellIn).toBe(0);
    expect(items[2].quality).toBe(80);
    expect(items[3].sellIn).toBe(14);
    expect(items[3].quality).toBe(21);
  });
});
