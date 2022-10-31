import { Item, GildedRose } from "../../app/gilded-rose";

describe("Gilded Rose", function () {
  it("decreases sellin and quality by 1 for normal item", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.name).toBe("+5 Dexterity Vest");
    expect(item.sellIn).toBe(9);
    expect(item.quality).toBe(19);
  });

  it("doesn't decrease quality below 0", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 0)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });

  it("decreases quality by 2 when sell by date is reached", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 10)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(8);
  });

  it("increases the quality of Aged Brie", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(11);
  });

  it("doesn't increase the quality of Aged Brie over 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(50);
  });

  it("doesn't change the sellin or quality of Sulfuras", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 80),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(80);
  });

  it("doesn't change the sellin or quality of Sulfuras (negative sellin)", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(80);
  });

  it("increases the quality of Backstage Passes", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 20),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(11);
    expect(item.quality).toBe(21);
  });

  it("increases the quality of Backstage Passes by 2 when there are 10 days or less left", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(10);
    expect(item.quality).toBe(22);
  });

  it("increases the quality of Backstage Passes by 3 when there are 5 days or less left", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(23);
  });

  it("doesn't increase the quality of Backstage Passes over 50", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(50);
  });

  it("changes quality of Backstage Passes to 0 after sellin date", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
    ]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });

  it("decreases conjured items quality twice as fast", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(2);
    expect(item.quality).toBe(4);
  });

  it("decreases conjured items quality twice as fast (after sellin date)", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 6)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(2);
  });

  it("doesn't decrease conjured items quality below 0", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 1)]);
    const items = gildedRose.updateQuality();
    const item = items[0];

    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });
});
