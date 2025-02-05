export function groupByCity(users, cityMap = new Map(), index = 0) {
    if (index >= users.length) return cityMap;
  
    const user = users[index];
    const { city } = user;
  
    if (!cityMap.has(city)) {
      cityMap.set(city, []);
    }
  
    cityMap.get(city).push(user);
  
    return groupByCity(users, cityMap, index + 1);
  }  

// chat gpt example input
const users = [
    { id: 1, name: 'Alice', city: 'Paris' },
    { id: 2, name: 'Bob', city: 'London' },
    { id: 3, name: 'Charlie', city: 'Paris' },
    { id: 4, name: 'David', city: 'Berlin' },
    { id: 5, name: 'Eve', city: 'Rome' },
    { id: 6, name: 'Frank', city: 'Madrid' },
    { id: 7, name: 'Grace', city: 'Paris' },
    { id: 8, name: 'Hank', city: 'Berlin' },
    { id: 9, name: 'Ivy', city: 'Rome' },
    { id: 10, name: 'Jack', city: 'London' },
    { id: 11, name: 'Karen', city: 'Madrid' },
    { id: 12, name: 'Leo', city: 'Paris' },
    { id: 13, name: 'Mia', city: 'Berlin' },
    { id: 14, name: 'Nathan', city: 'London' },
    { id: 15, name: 'Olivia', city: 'Rome' },
    { id: 16, name: 'Paul', city: 'Madrid' },
    { id: 17, name: 'Quincy', city: 'Paris' },
    { id: 18, name: 'Rachel', city: 'Berlin' },
    { id: 19, name: 'Sam', city: 'Rome' },
    { id: 20, name: 'Tina', city: 'Madrid' },
    { id: 21, name: 'Uma', city: 'London' },
    { id: 22, name: 'Victor', city: 'Paris' },
    { id: 23, name: 'Wendy', city: 'Berlin' },
    { id: 24, name: 'Xavier', city: 'Rome' },
    { id: 25, name: 'Yara', city: 'Madrid' },
    { id: 26, name: 'Zane', city: 'Paris' },
    { id: 27, name: 'Amy', city: 'Berlin' },
    { id: 28, name: 'Brian', city: 'Rome' },
    { id: 29, name: 'Cindy', city: 'London' },
    { id: 30, name: 'Derek', city: 'Madrid' },
  ];  

console.log(groupByCity(users));