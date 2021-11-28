class Bucket {
  constructor(items, level, weight) {
    this.items = items;
    this.level = level;
    this.weight = weight;
  }

  pick() {
    console.log("Selecting from bucket level: ", this.level);
    // Pick the LRU item
    const item = this.items.sort((a, b) => b.seen - a.seen)[0];
    console.log(item.seen, "SEEN");
    return {
      ...item,
      level: this.level,
      seen: (item.seen += 1),
    };
  }

  isEmpty() {
    return this.items.length === 0;
  }

  remove(item) {
    this.items = this.items.filter((i) => i.id !== item.id);
  }

  add(item) {
    this.items.push(item);
  }
}

export class QuestionProvider {
  constructor(deck) {
    if (!deck) {
      throw new Error("Deck is required");
    }

    let uid = 1;

    const allQuestions = deck.map((item) => {
      return {
        ...item,
        seen: 0,
        id: uid++,
      };
    });

    this.buckets = [
      // All items go into the first bucket initially
      // Use zero-index for ease of use
      new Bucket(allQuestions, 0, 53.125),
      new Bucket([], 1, 25),
      new Bucket([], 2, 12.5),
      new Bucket([], 3, 6.225),
      new Bucket([], 4, 3.125),
    ];
  }

  next() {
    const bucket = this.selectBucket();
    return bucket.pick();
  }

  move(item, increment) {
    const bucket = this.buckets.find((bucket) => bucket.level === item.level);

    bucket.remove(item);

    // If the item is already at the highest level, don't move it
    if (item.level === this.buckets.length - 1 && increment > 0) {
      return;
    }

    // If the item is already at the the lowest level, don't move it
    if (item.level === 0 && increment < 0) {
      return;
    }

    const newBucket = this.buckets[item.level + increment];

    console.log("The new bucket level!", newBucket.level);
    newBucket.add(item);
  }

  selectBucket() {
    console.log("Running select bucket");
    // Select a bucket by using a weighted random
    // A straightforward algo for picking an item at random:
    // 1. Calculate sum of all the weights
    // 2. Pick a random number that is 0 or greater and is less than the sum of the weights
    // 3. Iterate through the buckets one at a time, subtracting their weight from your random number until you get the bucket where the random number is less than the bucket's weight

    // Total sum is always 100 in our case
    const sumOfWeights = 100;

    // Pick a random number between 1 and 100
    let rnd = Math.random() * sumOfWeights + 1;

    for (const bucket of this.buckets) {
      if (rnd <= bucket.weight) {
        if (bucket.isEmpty()) {
          return this.selectBucket();
        }

        return bucket;
      }

      rnd -= bucket.weight;
    }
  }
}
