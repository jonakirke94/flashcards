class Bucket {
  constructor(items, level, weight) {
    this.items = items;
    this.level = level;
    this.weight = weight;
  }

  pick() {
    // Pick the LRU item
    const item = [...this.items].sort((a, b) => b.seen - a.seen)[
      this.items.length - 1
    ];

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

export class Engine {
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
      new Bucket([], 0, 1000),
      new Bucket([], 1, 500),
      new Bucket([], 2, 250),
      new Bucket([], 3, 125),
      new Bucket(allQuestions, 4, 62.5),
    ];

    this.streak = 0;
  }

  next() {
    const bucket = this.selectBucket();
    return bucket.pick();
  }

  move(item, increment, onStreakHandler) {
    const bucket = this.buckets.find((bucket) => bucket.level === item.level);

    // if increment is positive the answer was marked as correct. Increase streak by one otherwise reset to zero
    this.streak = increment > 0 ? this.streak + 1 : 0;

    // if the user is on a streak that is divisible of 5 i.e 5/10/15 trigger a streak
    if (this.streak % 5 === 0 && this.streak > 0) {
      onStreakHandler(this.streak);
    }

    // If the item is already at the highest level, don't move it
    if (item.level === this.buckets.length - 1 && increment > 0) {
      return;
    }

    // If the item is already at the the lowest level, don't move it
    if (item.level === 0 && increment < 0) {
      return;
    }

    bucket.remove(item);

    const newBucket = this.buckets[item.level + increment];

    newBucket.add(item);
  }

  selectBucket() {
    // Select a bucket by using a weighted random
    // A straightforward algo for picking an item at random:
    // 1. Calculate sum of all the weights
    // 2. Pick a random number that is 0 or greater and is less than the sum of the weights
    // 3. Iterate through the buckets one at a time, subtracting their weight from your random number until you get the bucket where the random number is less than the bucket's weight

    const nonEmptyBuckets = [...this.buckets].filter(
      (bucket) => !bucket.isEmpty()
    );

    const sumOfWeights = [...nonEmptyBuckets].reduce((acc, bucket) => {
      return (acc += bucket.weight);
    }, 0);

    // Pick a random number between 1 and sum of weights
    let rnd1 = Math.random() * sumOfWeights;

    let rnd = rnd1 + 1;

    for (const bucket of nonEmptyBuckets) {
      const isLessThan = rnd <= bucket.weight;
      // isLessThan < 1 is an edge case where the random number is just above the bucket's weight
      if (isLessThan || isLessThan < 1) {
        return bucket;
      }

      rnd -= bucket.weight;
    }

    console.error("No bucket found. Should never reach here", rnd);
  }
}
