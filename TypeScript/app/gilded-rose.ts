export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateAgedItem(item: Item) {
    if (item.quality < 50) item.quality++;
  }

  updateBackstagePass(item: Item) {
    if (item.sellIn < 0) return (item.quality = 0);
    else {
      item.quality++;
      if (item.sellIn <= 10) {
        item.quality = item.sellIn <= 5 ? item.quality + 2 : item.quality + 1;
      }
      if (item.quality > 50) item.quality = 50;
    }
  }

  updateConjuredItem(item: Item) {
    item.quality = item.sellIn < 0 ? item.quality - 4 : item.quality - 2;
    if (item.quality < 0) item.quality = 0;
  }

  updateNormalItem(item: Item) {
    item.quality = item.sellIn < 0 ? item.quality - 2 : item.quality - 1;
    if (item.quality < 0) item.quality = 0;
  }

  updateQuality() {
    for (const item of this.items) {
      const isSulfuras = item.name.includes("Sulfuras");
      const isAgedBrie = item.name.includes("Aged Brie");
      const isBackstagePass = item.name.includes("Backstage passes");
      const isConjured = item.name.includes("Conjured");

      if (isSulfuras) continue;

      item.sellIn--;

      if (item.quality < 50 && item.quality > 0) {
        if (isAgedBrie) this.updateAgedItem(item);
        else if (isBackstagePass) this.updateBackstagePass(item);
        else if (isConjured) this.updateConjuredItem(item);
        else this.updateNormalItem(item);
      }
    }
    return this.items;
  }
}
