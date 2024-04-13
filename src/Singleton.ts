namespace Singleton {
  class Singleton {
    private static instance: Singleton;

    private constructor() {
      // Private constructor to prevent direct instantiation
    }

    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }

    public someMethod(): void {
      console.log('Singleton method called');
    }
  }

  let singleton1 = Singleton.getInstance();
  let singleton2 = Singleton.getInstance();

  console.log(singleton1 === singleton2); // Output: true
  singleton1.someMethod(); // Output: Singleton method called
}
