namespace Generics {
  // Without generics
  function merge(ojbA: object, objB: object) {
    return Object.assign(ojbA, objB);
  }
  const mergeObj = merge({ name: 'Max' }, { age: 30 });
  console.log(mergeObj);
  // console.log(mergeObj.age); // error, Property 'age' does not exist on type 'object'

  // With generics
  function merge2<T extends object, U extends object>(objA: T, objB: U) {
    // returns the intersection of T & U
    return Object.assign(objA, objB); // Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object.
  }
  // Merging two different objects
  const mergeObj2 = merge2({ name: 'Max' }, { age: 30 });
  console.log(mergeObj2); // { name: 'Max', age: 30 }

  // Specifying the types when calling the generic function
  const mergeObj3 = merge2<{ name: string }, { age: number }>(
    { name: 'Max' },
    { age: 30 }
  );
  console.log(mergeObj3); // { name: 'Max', age: 30 }

  function addParameter<Key, Value>(key: Key, value: Value) {
    let map = new Map<Key, Value>();
    map.set(key, value);
    return map;
  }

  // Template Literal Stings
  type APIEndpoint = 'users' | 'posts' | 'comments';

  type EndpointURL<T extends APIEndpoint> = `https://api.example.com/${T}`;

  const userEndpoint: EndpointURL<'users'> = 'https://api.example.com/users';
  const postEndpoint: EndpointURL<'posts'> = 'https://api.example.com/posts';
  const commentEndpoint: EndpointURL<'comments'> =
    'https://api.example.com/comments';

  // Mapped Union Types
  type EventConfig<Events extends { kind: string }> = {
    [E in Events as E['kind']]: (event: E) => void;
  };

  type SquareEvent = { kind: 'square'; x: number; y: number };
  type CircleEvent = { kind: 'circle'; radius: number };

  type Config = EventConfig<SquareEvent | CircleEvent>;
}
